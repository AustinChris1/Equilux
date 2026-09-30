import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck, Building2, CircleAlert, Cpu, FileSpreadsheet, Landmark, Loader2, Play, RefreshCw,
  RotateCcw, ShieldCheck, Upload, UserRound, Wifi,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { fmtPct, getStatus, resolveApiBase, runJob, short, type LedgerView, type Status, type Tamper } from "../lib/api";
import { BrowserContract, type Row } from "../lib/browser-contract";
import { parsePayrollCsv } from "../../../contract/deploy/payroll-csv";

type Role = "employer" | "provider" | "employee" | "regulator";
type Mode = "checking" | "live" | "browser";

interface Person {
  id: string;
  name: string;
  salary: number;
  gender: 0 | 1;
  category: number;
  secret: string;
  commitment?: string;
  enrollBlock?: number;
  attested?: boolean;
  receipt?: boolean;
}

const STORAGE = "equilux.workspace.v2";
const newSecret = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").slice(0, 24);

const DEFAULT_CATEGORIES = ["Engineering", "Sales", "Operations", "Design"];

// Engineering and Sales have ≥3 women and ≥3 men → their pay is disclosed.
// Operations has one of each → suppressed by the k = 3 threshold.
const SEED: [string, number, 0 | 1, number][] = [
  ["Ana Serrano", 60_000, 0, 0], ["Bea Keller", 62_000, 0, 0], ["Chidi Okafor", 64_000, 0, 0],
  ["Dan Novak", 70_000, 1, 0], ["Eli Laurent", 72_000, 1, 0], ["Felix Braun", 74_000, 1, 0],
  ["Gia Diallo", 50_000, 0, 1], ["Hana Vidal", 52_000, 0, 1], ["Ivy Moreau", 54_000, 0, 1],
  ["Jon Weber", 53_000, 1, 1], ["Kai Sato", 54_000, 1, 1], ["Leo Rossi", 55_000, 1, 1],
  ["Mia Costa", 40_000, 0, 2], ["Ned Fischer", 45_000, 1, 2],
];

const SAMPLE_CSV = `First name,Last name,Gender,Department,Annual salary
Ana,Serrano,female,Engineering,60000
Bea,Keller,female,Engineering,62000
Chidi,Okafor,female,Engineering,64000
Dan,Novak,male,Engineering,70000
Eli,Laurent,male,Engineering,72000
Felix,Braun,male,Engineering,74000
Gia,Diallo,female,Sales,50000
Hana,Vidal,female,Sales,52000
Ivy,Moreau,female,Sales,54000
Jon,Weber,male,Sales,53000
Kai,Sato,male,Sales,54000
Leo,Rossi,male,Sales,55000
Mia,Costa,female,Operations,40000
Ned,Fischer,male,Operations,45000`;

const seedPeople = (): Person[] =>
  SEED.map(([name, salary, gender, category]) => ({ id: newSecret().slice(0, 8), name, salary, gender, category, secret: newSecret() }));

interface Saved { people: Person[]; categories: string[] }
function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw) as Saved;
  } catch { /* ignore */ }
  return { people: seedPeople(), categories: DEFAULT_CATEGORIES };
}
const stripProgress = (ps: Person[]) => ps.map(({ id, name, salary, gender, category, secret }) => ({ id, name, salary, gender, category, secret }));

function Btn({ onClick, disabled, children, ghost }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; ghost?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        ghost
          ? "inline-flex items-center gap-2 rounded-lg border border-gold/25 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-40"
          : "inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      }
    >
      {children}
    </button>
  );
}

const Step = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">
    <span className="text-gold">{n}</span> · {children}
  </div>
);

const toRow = (p: Person): Row => ({ salary: p.salary, gender: p.gender, category: p.category, secret: p.secret });

export function Workspace() {
  const initial = useMemo(load, []);
  const [status, setStatus] = useState<Status | null>(null);
  const [mode, setMode] = useState<Mode>("checking");
  const [role, setRole] = useState<Role>("employer");
  const [people, setPeople] = useState<Person[]>(initial.people);
  const [categories, setCategories] = useState<string[]>(initial.categories);
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);
  const [liveLedger, setLiveLedger] = useState<LedgerView | null>(null);
  const [employerSecret, setEmployerSecret] = useState("acme:employer-root-secret");
  const [providerSecret, setProviderSecret] = useState("payroll-provider:personio");
  const [cheat, setCheat] = useState<"none" | "omit" | "mean" | "median" | "category">("none");
  const [csvNote, setCsvNote] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const bcRef = useRef<BrowserContract | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const apiBase = resolveApiBase();

  if (!bcRef.current && typeof window !== "undefined") bcRef.current = BrowserContract.restore();
  const bc = bcRef.current!;

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify({ people, categories })); } catch { /* ignore */ } }, [people, categories]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [log]);

  const refresh = useCallback(async () => {
    if (!apiBase) { setMode("browser"); return; }
    try {
      const s = await getStatus();
      setStatus(s);
      setMode("live");
      if (s.ledger) setLiveLedger(s.ledger);
    } catch {
      setMode("browser");
    }
  }, [apiBase]);

  useEffect(() => {
    refresh();
    if (!apiBase) return;
    const t = setInterval(refresh, busy ? 4000 : 8000);
    return () => clearInterval(t);
  }, [refresh, busy, apiBase]);

  // browser mode: if the replayed contract is gone (new session), clear per-person progress
  useEffect(() => {
    if (mode === "browser" && !bc.address) setPeople((ps) => (ps.some((p) => p.commitment) ? stripProgress(ps) : ps));
  }, [mode, bc]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const browserLedger = useMemo(() => (mode === "browser" ? bc.view() : null), [mode, tick, bc]);
  const ledger = mode === "live" ? liveLedger : browserLedger;
  const deployed = mode === "live" ? status?.contractAddress ?? null : bc.address;
  const ready = mode === "browser" || !!status?.ready;
  const rosterDeclared = !!ledger?.rosterDeclared;

  const push = (lines: string[]) => setLog((l) => [...l, ...lines].slice(-80));
  const patch = (id: string, p: Partial<Person>) => setPeople((ps) => ps.map((x) => (x.id === id ? { ...x, ...p } : x)));

  /** One protocol step, in either mode. Browser: the compiled circuit, in-page. Live: API → proof → chain. */
  async function step<T>(label: string, browser: () => T, live: { path: string; body: unknown }): Promise<T | undefined> {
    setBusy(label);
    setLastError(null);
    push([`▶ ${label}`]);
    try {
      if (mode === "live") {
        const j = await runJob<T>(live.path, live.body, push);
        if (j.status === "error") throw new Error(j.error ?? "rejected");
        return j.result;
      }
      await new Promise((r) => setTimeout(r, 30));
      const out = browser();
      push(["compiled circuit executed in this browser — assertions passed"]);
      setTick((t) => t + 1);
      return out;
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setLastError(m);
      push([`✗ ${m}`]);
      return undefined;
    } finally {
      setBusy(null);
      if (mode === "live") refresh();
    }
  }

  const deploy = () =>
    step("Deploy contract", () => bc.apply({ k: "deploy", employerSecret, providerSecret }), { path: "/api/deploy", body: { employerSecret, providerSecret } });

  const declareRoster = () =>
    step(`Declare roster of ${people.length}`, () => bc.apply({ k: "roster", headcount: people.length }), { path: "/api/roster", body: { headcount: people.length } });

  const enroll = async (p: Person) => {
    const r = await step<string | { commitment: string; blockHeight: number }>(
      `Enroll ${p.name}`, () => bc.apply({ k: "enroll", row: toRow(p) }) as string, { path: "/api/enroll", body: toRow(p) });
    if (r) patch(p.id, typeof r === "string" ? { commitment: r } : { commitment: r.commitment, enrollBlock: r.blockHeight });
    return !!r;
  };

  const attest = async (p: Person) => {
    if (!p.commitment) return false;
    const r = await step(`Attest ${p.name}`, () => bc.apply({ k: "attest", commitment: p.commitment! }), { path: "/api/attest", body: { commitment: p.commitment } });
    if (r !== undefined) patch(p.id, { attested: true });
    return r !== undefined;
  };

  const receipt = async (p: Person) => {
    if (!p.commitment) return;
    const r = await step(`Verify receipt · ${p.name}`, () => bc.receipt(p.commitment!), { path: "/api/receipt", body: { commitment: p.commitment } });
    if (r !== undefined) patch(p.id, { receipt: true });
  };

  const publish = async () => {
    const attested = people.filter((p) => p.attested);
    let rows = attested.map(toRow);
    let tamper: Tamper | undefined;
    if (cheat === "omit") rows = rows.slice(1);
    if (cheat === "mean") tamper = { meanGapBps: 0 };
    if (cheat === "median") tamper = { medianWomen: Math.max(...attested.filter((p) => p.gender === 0).map((p) => p.salary)) };
    if (cheat === "category") tamper = { categoryGap: { category: 0, bps: 0 } };
    const label = cheat === "none" ? "Publish the report" : `Publish with a cheat (${cheat})`;
    await step(label, () => (cheat === "none" ? bc.apply({ k: "publish", rows }) : bc.tryCheat(rows, tamper)), { path: "/api/publish", body: { payroll: rows, tamper } });
  };

  /** One-click: every step of the protocol in order. */
  const autopilot = async () => {
    if (!deployed && (await deploy()) === undefined) return;
    if (!rosterDeclared && (await declareRoster()) === undefined) return;
    let current = people;
    for (const p of current.filter((x) => !x.commitment)) if (!(await enroll(p))) return;
    setPeople((ps) => { current = ps; return ps; });
    await new Promise((r) => setTimeout(r, 0));
    for (const p of current.filter((x) => x.commitment && !x.attested)) if (!(await attest(p))) return;
    setCheat("none");
    await new Promise((r) => setTimeout(r, 0));
    await step("Publish the report", () => bc.apply({ k: "publish", rows: current.filter((p) => p.commitment).map(toRow) }),
      { path: "/api/publish", body: { payroll: current.filter((p) => p.commitment).map(toRow) } });
    setRole("regulator");
  };

  const importCsv = (text: string, source: string) => {
    const { rows, categories: cats, errors } = parsePayrollCsv(text);
    if (rows.length === 0) { setCsvNote(`Nothing imported — ${errors.join("; ")}`); return; }
    const capped = rows.slice(0, 16);
    setPeople(capped.map((r) => ({ id: newSecret().slice(0, 8), name: r.name, salary: r.salary, gender: r.gender, category: r.category, secret: newSecret() })));
    setCategories([...cats, ...DEFAULT_CATEGORIES.slice(cats.length)].slice(0, 4));
    setCsvNote(`${capped.length} employees imported from ${source}${rows.length > 16 ? " (capped at 16 for this instance)" : ""}${errors.length ? ` · ${errors.length} row(s) skipped: ${errors[0]}` : ""}`);
    push([`imported ${capped.length} payroll rows from ${source} — parsed locally, nothing sent anywhere`]);
  };

  const onFile = (f: File | undefined) => { if (f) f.text().then((t) => importCsv(t, f.name)); };

  const reset = () => {
    bc.reset();
    setTick((t) => t + 1);
    setPeople((ps) => stripProgress(ps));
    setLog([]);
    setLastError(null);
    setCheat("none");
  };

  const counts = {
    enrolled: people.filter((p) => p.commitment).length,
    attested: people.filter((p) => p.attested).length,
  };
  const locked = !!deployed && rosterDeclared; // the roster is fixed once declared

  const tabs: { id: Role; label: string; icon: typeof Building2 }[] = [
    { id: "employer", label: "Employer", icon: Building2 },
    { id: "provider", label: "Payroll provider", icon: FileSpreadsheet },
    { id: "employee", label: "Employee", icon: UserRound },
    { id: "regulator", label: "Regulator", icon: Landmark },
  ];

  const rep = ledger?.latestReport ?? null;

  return (
    <section id="workspace" className="grain relative mx-2 mt-2 rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <Reveal><div className="overline text-gold">Workspace · four parties, one contract</div></Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] text-cream md:text-6xl">Run it for real.</h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sage">
            The payroll provider fixes the roster and vouches for each record. Employees seal their own pay. The employer
            publishes the Directive's figures — mean, median and per worker category — and the circuit checks every one.
            Then try to cheat.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-gold/15 bg-night-deep/50 px-4 py-3 font-mono text-[11px] text-sage">
            {mode === "checking" ? <Loader2 size={14} className="animate-spin" /> : mode === "live" ? <Wifi size={14} className="text-gold" /> : <Cpu size={14} className="text-gold" />}
            <span className="text-cream">
              {mode === "checking" ? "checking…" : mode === "live"
                ? (status?.ready ? `live · ${status.network} · real proofs` : "connecting to the local Midnight node…")
                : "compiled contract running in this browser · real circuits, no proofs"}
            </span>
            {deployed && <span className="chip bg-gold/12 text-gold" title={deployed}>contract {short(deployed, 8)}</span>}
            {ledger && (
              <span className="chip bg-cream/6">
                roster {ledger.rosterDeclared ? ledger.declaredHeadcount : "—"} · enrolled {ledger.enrolled} · attested {ledger.attested}
              </span>
            )}
            <button onClick={refresh} className="ml-auto inline-flex items-center gap-1.5 text-sage hover:text-gold"><RefreshCw size={12} /> refresh</button>
          </div>
        </Reveal>

        {mode !== "checking" && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Btn onClick={autopilot} disabled={!ready || !!busy}>
              {busy ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Run the full flow
            </Btn>
            <Btn onClick={reset} ghost disabled={!!busy || mode === "live"}><RotateCcw size={12} /> Reset</Btn>
            <span className="font-mono text-[11px] text-sage/70">
              {mode === "browser"
                ? "Deploy → roster → enroll everyone → attest → publish, in about a second."
                : "Each step is proven and finalized — expect 20–90 s per action."}
            </span>
          </div>
        )}

        {mode !== "checking" && (
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setRole(t.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${role === t.id ? "bg-gold text-night" : "bg-cream/6 text-sage hover:text-cream"}`}>
                    <t.icon size={13} /> {t.label}
                  </button>
                ))}
              </div>

              {/* ── EMPLOYER ─────────────────────────────────────────── */}
              {role === "employer" && (
                <div className="mt-6 flex flex-col gap-7">
                  <div>
                    <Step n="1">Deploy the reporting contract</Step>
                    <p className="mt-2 text-[14px] text-sage">Two keys go on-chain as hashes: the employer's, and the payroll provider's. The employer cannot attest its own data.</p>
                    {deployed ? (
                      <p className="mt-3 font-mono text-[12px] text-gold"><BadgeCheck size={13} className="mr-1.5 inline" />deployed · {short(deployed, 10)}</p>
                    ) : (
                      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                        <input value={employerSecret} onChange={(e) => setEmployerSecret(e.target.value)} aria-label="Employer secret"
                          className="rounded-md border border-gold/15 bg-night px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                        <input value={providerSecret} onChange={(e) => setProviderSecret(e.target.value)} aria-label="Payroll provider secret"
                          className="rounded-md border border-gold/15 bg-night px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                        <Btn onClick={deploy} disabled={!ready || !!busy}><ShieldCheck size={13} /> Deploy</Btn>
                      </div>
                    )}
                  </div>

                  <div>
                    <Step n="4">Publish the report</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      Witness: {counts.attested} provider-attested record(s) of {ledger?.declaredHeadcount ?? people.length} on the roster.
                      The circuit recomputes every figure and rejects anything that doesn't match.
                    </p>
                    <div className="mt-3 rounded-lg border border-gold/12 bg-night p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Try to cheat — sent to the real circuit</div>
                      <div className="mt-2.5 grid gap-1.5 text-[13px] text-cream/85">
                        {([
                          ["none", "Publish honestly"],
                          ["omit", "Leave one attested employee out of the report"],
                          ["mean", "Claim the mean gap is 0.00%"],
                          ["median", "Inflate the women's median salary"],
                          ["category", `Hide the ${categories[0]} gap (claim 0%)`],
                        ] as const).map(([k, text]) => (
                          <label key={k} className="flex cursor-pointer items-center gap-2.5">
                            <input type="radio" name="cheat" checked={cheat === k} onChange={() => setCheat(k)} className="accent-gold" />
                            {text}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Btn onClick={publish} disabled={!deployed || !!busy || counts.attested === 0}>
                        <ShieldCheck size={13} /> {cheat === "none" ? "Publish" : "Publish (cheating)"}{mode === "live" ? " + prove" : ""}
                      </Btn>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PAYROLL PROVIDER ─────────────────────────────────── */}
              {role === "provider" && (
                <div className="mt-6 flex flex-col gap-7">
                  <div>
                    <Step n="2a">Import the payroll</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      Personio and DATEV exports work as-is (commas or semicolons, <span className="font-mono">62.000,00</span> amounts, German headers).
                      Parsed in this browser — no salary leaves it.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                      <Btn onClick={() => fileRef.current?.click()} ghost disabled={locked || !!busy}><Upload size={12} /> Upload CSV</Btn>
                      <Btn onClick={() => importCsv(SAMPLE_CSV, "a sample Personio export")} ghost disabled={locked || !!busy}><FileSpreadsheet size={12} /> Load sample export</Btn>
                    </div>
                    {locked && <p className="mt-2 font-mono text-[11px] text-sage/70">The roster is declared — the payroll is fixed for this round.</p>}
                    {csvNote && <p className="mt-2 font-mono text-[11px] text-gold/90">{csvNote}</p>}
                  </div>

                  <div>
                    <Step n="2b">Declare the roster</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      Commits the headcount from payroll <em>before</em> anyone enrolls. The report must cover exactly this many people,
                      so nobody can be quietly left out.
                    </p>
                    <div className="mt-3">
                      {rosterDeclared
                        ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> roster of {ledger?.declaredHeadcount} declared</span>
                        : <Btn onClick={declareRoster} disabled={!deployed || !!busy}><ShieldCheck size={13} /> Declare roster of {people.length}</Btn>}
                    </div>
                  </div>

                  <div>
                    <Step n="3b">Attest enrolled records</Step>
                    <div className="mt-3 flex max-h-72 flex-col divide-y divide-gold/8 overflow-auto pr-1">
                      {people.filter((p) => p.commitment).length === 0 && <p className="py-2 text-[14px] text-sage/70">No enrollments yet — employees enroll first.</p>}
                      {people.filter((p) => p.commitment).map((p) => (
                        <div key={p.id} className="flex items-center justify-between gap-3 py-2">
                          <div>
                            <div className="text-[14px] text-cream">{p.name}</div>
                            <div className="font-mono text-[10px] text-sage/70" title={p.commitment}>{short(p.commitment!, 8)}</div>
                          </div>
                          {p.attested
                            ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> attested</span>
                            : <Btn onClick={() => attest(p)} disabled={!!busy} ghost>Attest</Btn>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── EMPLOYEE ─────────────────────────────────────────── */}
              {role === "employee" && (
                <div className="mt-6">
                  <Step n="3a">Seal your record</Step>
                  <p className="mt-2 text-[14px] text-sage">
                    Salary, gender marker and worker category become one commitment and one nullifier — that is all the chain sees.
                    Then verify your receipt: a Merkle proof that you were counted.
                  </p>
                  {!rosterDeclared && <p className="mt-2 text-[13px] text-sage/80">Enrollment opens once the payroll provider declares the roster.</p>}
                  <div className="mt-3 flex max-h-96 flex-col divide-y divide-gold/8 overflow-auto pr-1">
                    {people.map((p) => (
                      <div key={p.id} className="grid grid-cols-[1.4fr_0.8fr_auto] items-center gap-3 py-2">
                        <div>
                          <div className="text-[14px] text-cream">{p.name}</div>
                          <div className="font-mono text-[10px] text-sage/70">{categories[p.category]} · {p.gender === 0 ? "W" : "M"}</div>
                        </div>
                        <div className="font-mono text-[12px] text-cream">€{p.salary.toLocaleString()}</div>
                        <div className="flex justify-end">
                          {!p.commitment ? (
                            <Btn onClick={() => enroll(p)} disabled={!rosterDeclared || !!busy} ghost>Enroll</Btn>
                          ) : p.receipt ? (
                            <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> counted</span>
                          ) : (
                            <Btn onClick={() => receipt(p)} disabled={!!busy} ghost>Verify receipt</Btn>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── REGULATOR ────────────────────────────────────────── */}
              {role === "regulator" && (
                <div className="mt-6">
                  <Step n="5">What the report shows — and nothing else</Step>
                  {!rep ? (
                    <p className="mt-3 text-[14px] text-sage/70">No report published yet. Try “Run the full flow”.</p>
                  ) : (
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg border border-gold/25 bg-night p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Mean gap</div>
                          <div className="display mt-1 text-3xl text-cream">{fmtPct(rep.meanGapBps)}</div>
                          <div className="font-mono text-[10px] text-sage">favors {rep.gapFavorsMen ? "men" : "women"}</div>
                        </div>
                        <div className="rounded-lg border border-gold/25 bg-night p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Median gap</div>
                          <div className="display mt-1 text-3xl text-cream">{fmtPct(rep.medianGapBps)}</div>
                          <div className="font-mono text-[10px] text-sage">favors {rep.medianFavorsMen ? "men" : "women"}</div>
                        </div>
                        <div className="rounded-lg border border-gold/25 bg-night p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Headcount</div>
                          <div className="display mt-1 text-3xl text-cream">{rep.headcountWomen + rep.headcountMen}</div>
                          <div className="font-mono text-[10px] text-sage">{rep.headcountWomen} women · {rep.headcountMen} men</div>
                        </div>
                      </div>

                      <div className="overflow-x-auto rounded-lg border border-gold/15">
                        <table className="w-full min-w-130 text-left font-mono text-[12px]">
                          <thead className="bg-cream/5 text-[10px] uppercase tracking-[0.14em] text-sage">
                            <tr><th className="px-3 py-2">Worker category</th><th className="px-3 py-2">W / M</th><th className="px-3 py-2">Mean pay W · M</th><th className="px-3 py-2">Gap</th><th className="px-3 py-2"></th></tr>
                          </thead>
                          <tbody>
                            {rep.categories.map((c, i) => (c.headcountWomen + c.headcountMen === 0 ? null : (
                              <tr key={i} className="border-t border-gold/8 text-cream">
                                <td className="px-3 py-2.5">{categories[i]}</td>
                                <td className="whitespace-nowrap px-3 py-2.5 text-sage">{c.headcountWomen} / {c.headcountMen}</td>
                                {c.disclosed ? (
                                  <>
                                    <td className="px-3 py-2.5">€{c.meanWomen.toLocaleString()} · €{c.meanMen.toLocaleString()}</td>
                                    <td className="px-3 py-2.5">{fmtPct(c.meanGapBps)}</td>
                                    <td className="px-3 py-2.5">{c.gapAtOrAbove5pct
                                      ? <span className="chip bg-red-950/50 text-red-200">≥ 5% · assess</span>
                                      : <span className="chip bg-gold/10 text-gold">&lt; 5%</span>}</td>
                                  </>
                                ) : (
                                  <td colSpan={3} className="px-3 py-2.5 text-sage/70">suppressed — fewer than 3 in a group, so no one's pay can be inferred</td>
                                )}
                              </tr>
                            )))}
                          </tbody>
                        </table>
                      </div>
                      <p className="font-mono text-[10px] leading-relaxed text-sage/70">
                        A category at ≥ 5% triggers an Article 10 joint pay assessment only if the gap is also unjustified by objective,
                        gender-neutral criteria — a human judgement the circuit does not make. Salaries on chain: <span className="text-gold">0</span>.
                        {mode === "live" && ` Proven on-chain · contract ${short(ledger!.contractAddress, 8)}.`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── ACTIVITY ───────────────────────────────────────────── */}
            <div className="flex flex-col rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">Activity</span>
              <div ref={logRef} className="mt-3 h-72 overflow-auto rounded-lg bg-night p-3 font-mono text-[11px] leading-relaxed text-sage">
                {log.length === 0
                  ? <span className="text-sage/50">{mode === "live" ? status?.startupLog?.slice(-3).join("\n") || "waiting for the first action…" : "waiting for the first action…"}</span>
                  : log.map((l, i) => <div key={i} className={l.startsWith("▶") ? "text-cream" : l.startsWith("✗") || l.startsWith("rejected") ? "text-red-300" : ""}>{l}</div>)}
              </div>
              <AnimatePresence mode="wait">
                {lastError && (
                  <motion.div key={lastError} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-950/30 p-3.5 text-[13px] leading-relaxed text-red-200">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span><span className="font-mono text-[11px] uppercase tracking-[0.14em]">circuit rejected · </span>{lastError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-sage/60">
                {mode === "live"
                  ? "Each write: local circuit execution → proof from the proof server → finalized on the node → read back from the indexer."
                  : "This page runs the compiled Compact contract on Midnight's WebAssembly runtime — the same circuits and assertions as on-chain. Proofs and consensus need a node: run pnpm network:up && pnpm app:server locally and this page switches to live mode."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
