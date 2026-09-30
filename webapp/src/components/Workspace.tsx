import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck, Building2, CircleAlert, Cpu, FileSpreadsheet, Landmark, Loader2, Play, RefreshCw,
  RotateCcw, ShieldCheck, Upload, UserRound, Users, Wifi,
} from "lucide-react";
import { fmtPct, getStatus, resolveApiBase, runJob, short, type LedgerView, type Status, type Tamper, type VariableTamper } from "../lib/api";
import { BrowserContract, newNonce, payrollRowHash, type Row } from "../lib/browser-contract";
import { parsePayrollCsv } from "../../../contract/deploy/payroll-csv";

type Role = "employer" | "provider" | "council" | "employee" | "regulator";
type Mode = "checking" | "live" | "browser";

interface Person {
  id: string;
  name: string;
  salary: number;
  variable: number; // annual variable pay (bonus); 0 if none
  gender: 0 | 1;
  category: number;
  secret: string;
  nonce: string; // payslip nonce from the provider — blinds this person's payroll row
  commitment?: string;
  enrollBlock?: number;
  receipt?: boolean;
}

const STORAGE = "equilux.workspace.v4";
const newSecret = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").slice(0, 24);

const DEFAULT_CATEGORIES = ["Engineering", "Sales", "Operations", "Design"];

// Engineering and Sales have ≥3 women and ≥3 men → their pay is disclosed.
// Operations has one of each → suppressed by the k = 3 threshold.
// Variable pay: 5 of 7 women and 7 of 7 men receive it.
const SEED: [string, number, number, 0 | 1, number][] = [
  ["Ana Serrano", 60_000, 3_000, 0, 0], ["Bea Keller", 62_000, 4_000, 0, 0], ["Chidi Okafor", 64_000, 0, 0, 0],
  ["Dan Novak", 70_000, 6_000, 1, 0], ["Eli Laurent", 72_000, 7_000, 1, 0], ["Felix Braun", 74_000, 5_000, 1, 0],
  ["Gia Diallo", 50_000, 2_000, 0, 1], ["Hana Vidal", 52_000, 2_500, 0, 1], ["Ivy Moreau", 54_000, 3_000, 0, 1],
  ["Jon Weber", 53_000, 2_500, 1, 1], ["Kai Sato", 54_000, 3_500, 1, 1], ["Leo Rossi", 55_000, 3_000, 1, 1],
  ["Mia Costa", 40_000, 0, 0, 2], ["Ned Fischer", 45_000, 1_000, 1, 2],
];

const SAMPLE_CSV = `First name,Last name,Gender,Department,Annual salary,Bonus
${SEED.map(([n, sal, v, g, c]) => `${n.replace(" ", ",")},${g === 0 ? "female" : "male"},${["Engineering", "Sales", "Operations"][c]},${sal},${v || ""}`).join("\n")}`;

const seedPeople = (): Person[] =>
  SEED.map(([name, salary, variable, gender, category]) => ({ id: newSecret().slice(0, 8), name, salary, variable, gender, category, secret: newSecret(), nonce: newNonce() }));

interface Saved { people: Person[]; categories: string[] }
function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw) as Saved;
  } catch { /* ignore */ }
  return { people: seedPeople(), categories: DEFAULT_CATEGORIES };
}
const stripProgress = (ps: Person[]) => ps.map(({ id, name, salary, variable, gender, category, secret, nonce }) => ({ id, name, salary, variable, gender, category, secret, nonce }));

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

const toRow = (p: Person): Row => ({ salary: p.salary, variable: p.variable, gender: p.gender, category: p.category, secret: p.secret, nonce: p.nonce });
const openingOf = (r: Row) => ({ salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, nonce: r.nonce });
const enrollBody = (r: Row) => ({ ...r, rowNonce: r.nonce });

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
  const [councilSecret, setCouncilSecret] = useState("works-council:acme");
  const [cheat, setCheat] = useState<"none" | "omit" | "pay" | "mean" | "median" | "category">("none");
  const [vCheat, setVCheat] = useState<"none" | "mean" | "median" | "bands">("none");
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
  const payrollConfirmed = !!ledger?.payrollConfirmed;

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
    step("Deploy contract", () => bc.apply({ k: "deploy", employerSecret, providerSecret, councilSecret }), { path: "/api/deploy", body: { employerSecret, providerSecret, councilSecret } });

  /** The provider hashes each payroll row where the payroll lives; only the hashes go on-chain. */
  const declareRoster = () => {
    const rows = people.map((p) => payrollRowHash(toRow(p)));
    return step(`Commit ${rows.length} payroll rows`, () => bc.apply({ k: "roster", rows }), { path: "/api/roster", body: { rows } });
  };

  /** The works council opens every committed row; `skipOne` is the cheat that leaves one unopened. */
  const confirmPayroll = (skipOne = false) => {
    const rows = people.map(toRow).slice(skipOne ? 1 : 0);
    return step(skipOne ? "Council confirms without opening one row" : `Works council opens ${rows.length} rows and confirms`,
      () => (skipOne ? bc.tryConfirm(rows) : bc.apply({ k: "confirm", rows })), { path: "/api/confirm", body: { openings: rows.map(openingOf) } });
  };

  const enroll = async (p: Person) => {
    const r = await step<string | { commitment: string; blockHeight: number }>(
      `Enroll ${p.name}`, () => bc.apply({ k: "enroll", row: toRow(p) }) as string, { path: "/api/enroll", body: enrollBody(toRow(p)) });
    if (r) patch(p.id, typeof r === "string" ? { commitment: r } : { commitment: r.commitment, enrollBlock: r.blockHeight });
    return !!r;
  };

  /** Enrollment cheats: the binding to the provider's payroll rows rejects both. */
  const cheatEnroll = async (kind: "inflate" | "ghost") => {
    const who = people[0];
    const row: Row = kind === "inflate"
      ? { ...toRow(who), salary: who.salary + 5_000, secret: newSecret() }
      : { salary: 58_000, variable: 0, gender: 1, category: 0, secret: newSecret(), nonce: newNonce() };
    const label = kind === "inflate"
      ? `${who.name} enrolls €${(who.salary + 5_000).toLocaleString()} — payroll says €${who.salary.toLocaleString()}`
      : "The employer enrolls an invented employee";
    await step(label, () => bc.tryEnroll(row), { path: "/api/enroll", body: enrollBody(row) });
  };

  const receipt = async (p: Person) => {
    if (!p.commitment) return;
    const r = await step(`Verify receipt · ${p.name}`, () => bc.receipt(p.commitment!), { path: "/api/receipt", body: { commitment: p.commitment } });
    if (r !== undefined) patch(p.id, { receipt: true });
  };

  const publish = async () => {
    const enrolledPeople = people.filter((p) => p.commitment);
    let rows = enrolledPeople.map(toRow);
    let tamper: Tamper | undefined;
    if (cheat === "omit") rows = rows.slice(1);
    if (cheat === "pay") {
      const i = rows.findIndex((r) => r.gender === 1);
      rows = rows.map((r, j) => (j === i ? { ...r, salary: r.salary - 8_000 } : r));
    }
    if (cheat === "mean") tamper = { meanGapBps: 0 };
    if (cheat === "median") tamper = { medianWomen: Math.max(...enrolledPeople.filter((p) => p.gender === 0).map((p) => p.salary)) };
    if (cheat === "category") tamper = { categoryGap: { category: 0, bps: 0 } };
    const label = cheat === "none" ? "Publish the report" : `Publish with a cheat (${cheat})`;
    await step(label, () => (cheat === "none" ? bc.apply({ k: "publish", rows }) : bc.tryCheat(rows, tamper)), { path: "/api/publish", body: { payroll: rows, tamper } });
  };

  const publishVariable = async () => {
    const rows = people.filter((p) => p.commitment).map(toRow);
    let tamper: VariableTamper | undefined;
    if (vCheat === "mean") tamper = { meanGapBps: 0 };
    if (vCheat === "median") tamper = { medianWomen: Math.max(...rows.filter((r) => r.gender === 0).map((r) => r.variable)) };
    if (vCheat === "bands") tamper = { swapBands: true };
    const label = vCheat === "none" ? "Publish the variable-pay report" : `Publish variable pay with a cheat (${vCheat})`;
    await step(label, () => (vCheat === "none" ? bc.apply({ k: "publishVariable", rows }) : bc.tryCheatVariable(rows, tamper)),
      { path: "/api/publish-variable", body: { payroll: rows, tamper } });
  };

  /** One-click: every step of the protocol in order. */
  const autopilot = async () => {
    if (!deployed && (await deploy()) === undefined) return;
    if (!rosterDeclared && (await declareRoster()) === undefined) return;
    if (!payrollConfirmed && (await confirmPayroll()) === undefined) return;
    let current = people;
    for (const p of current.filter((x) => !x.commitment)) if (!(await enroll(p))) return;
    setPeople((ps) => { current = ps; return ps; });
    setCheat("none");
    await new Promise((r) => setTimeout(r, 0));
    const rows = current.filter((p) => p.commitment).map(toRow);
    if ((await step("Publish the report", () => bc.apply({ k: "publish", rows }), { path: "/api/publish", body: { payroll: rows } })) === undefined) return;
    setVCheat("none");
    await step("Publish the variable-pay report", () => bc.apply({ k: "publishVariable", rows }), { path: "/api/publish-variable", body: { payroll: rows } });
    setRole("regulator");
  };

  const importCsv = (text: string, source: string) => {
    const { rows, categories: cats, errors } = parsePayrollCsv(text);
    if (rows.length === 0) { setCsvNote(`Nothing imported — ${errors.join("; ")}`); return; }
    const capped = rows.slice(0, 16);
    setPeople(capped.map((r) => ({ id: newSecret().slice(0, 8), name: r.name, salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, secret: newSecret(), nonce: newNonce() })));
    setCategories([...cats, ...DEFAULT_CATEGORIES.slice(cats.length)].slice(0, 4));
    setCsvNote(`${capped.length} employees imported from ${source}${rows.length > 16 ? " (capped at 16 for this instance)" : ""}${errors.length ? ` · ${errors.length} row(s) skipped: ${errors[0]}` : ""}`);
    push([`imported ${capped.length} payroll rows from ${source} — parsed locally, nothing sent anywhere`, "a payslip nonce generated for each row — it goes to that employee only"]);
  };

  const onFile = (f: File | undefined) => { if (f) f.text().then((t) => importCsv(t, f.name)); };

  const reset = () => {
    bc.reset();
    setTick((t) => t + 1);
    setPeople((ps) => stripProgress(ps));
    setLog([]);
    setLastError(null);
    setCheat("none");
    setVCheat("none");
  };

  const counts = { enrolled: people.filter((p) => p.commitment).length };
  const locked = !!deployed && rosterDeclared; // the roster is fixed once declared

  const tabs: { id: Role; label: string; icon: typeof Building2 }[] = [
    { id: "employer", label: "Employer", icon: Building2 },
    { id: "provider", label: "Payroll provider", icon: FileSpreadsheet },
    { id: "council", label: "Works council", icon: Users },
    { id: "employee", label: "Employee", icon: UserRound },
    { id: "regulator", label: "Regulator", icon: Landmark },
  ];

  const rep = ledger?.latestReport ?? null;
  const vrep = ledger?.latestVariableReport ?? null;
  const pctOf = (a: number, b: number) => (b === 0 ? "—" : `${Math.round((a / b) * 100)}%`);

  return (
    <div id="workspace" className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-6 md:pt-8">
      <div className="flex flex-col gap-5 border-b border-gold/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-cream">Pay-gap report workspace</h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-sage">
            The payroll provider commits every payroll row, hashed, and the works council checks each one. Employees seal their
            pay and prove it matches their row. The employer publishes all seven Article 9 figures, and the circuit checks every
            one. Then try to cheat.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <Btn onClick={reset} ghost disabled={mode !== "browser" || !!busy}><RotateCcw size={12} /> Reset</Btn>
          <Btn onClick={autopilot} disabled={mode === "checking" || !ready || !!busy}>
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Run the full flow
          </Btn>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-sage" aria-live="polite">
        <span className="inline-flex items-start gap-2 text-cream">
          <span className="mt-px shrink-0">{mode === "checking" ? <Loader2 size={13} className="animate-spin" /> : mode === "live" ? <Wifi size={13} className="text-gold" /> : <Cpu size={13} className="text-gold" />}</span>
          {mode === "checking" ? "Looking for a local Midnight node…" : mode === "live"
            ? (status?.ready ? `Live · ${status.network} · real proofs` : "Connecting to the local Midnight node…")
            : "Compiled contract running in this browser · real circuits, no proofs"}
        </span>
        {deployed && <span className="chip bg-gold/12 text-gold" title={deployed}>contract {short(deployed, 8)}</span>}
        {ledger && (
          <span className="chip bg-cream/6">
            payroll rows {ledger.rosterDeclared ? ledger.payrollRows : "—"} · enrolled {ledger.enrolled} · bound {ledger.bound}
          </span>
        )}
        {busy && <span className="text-gold">{busy}…</span>}
        {mode === "live" && <button onClick={refresh} className="ml-auto inline-flex items-center gap-1.5 rounded text-sage hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"><RefreshCw size={12} /> Refresh</button>}
      </div>

        {mode === "checking" ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]" aria-hidden="true">
            <div className="h-[520px] animate-pulse rounded-2xl bg-night-soft/40" />
            <div className="h-[520px] animate-pulse rounded-2xl bg-night-soft/30" />
          </div>
        ) : (
          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-2xl bg-night p-5 ring-1 ring-gold/12 md:p-6">
              <div role="tablist" aria-label="Party" className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button key={t.id} role="tab" aria-selected={role === t.id} onClick={() => setRole(t.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${role === t.id ? "bg-gold text-night" : "bg-cream/6 text-sage hover:text-cream"}`}>
                    <t.icon size={13} /> {t.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {lastError && (
                  <motion.div key={lastError} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 flex items-start gap-2.5 rounded-lg bg-red-950/30 p-3.5 text-[13px] leading-relaxed text-red-200 ring-1 ring-red-400/30">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span><span className="font-mono text-[11px] uppercase tracking-[0.14em]">Circuit rejected · </span>{lastError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── EMPLOYER ─────────────────────────────────────────── */}
              {role === "employer" && (
                <div className="mt-6 flex flex-col gap-7">
                  <div>
                    <Step n="1">Deploy the reporting contract</Step>
                    <p className="mt-2 text-[14px] text-sage">Three keys go on-chain as hashes: the employer's, the payroll provider's and the works council's. Only the provider can commit payroll; only the council can confirm it.</p>
                    {deployed ? (
                      <p className="mt-3 font-mono text-[12px] text-gold"><BadgeCheck size={13} className="mr-1.5 inline" />deployed · {short(deployed, 10)}</p>
                    ) : (
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {([["Employer secret", employerSecret, setEmployerSecret], ["Payroll provider secret", providerSecret, setProviderSecret], ["Works council secret", councilSecret, setCouncilSecret]] as const).map(([label, value, set]) => (
                          <input key={label} value={value} onChange={(e) => set(e.target.value)} aria-label={label} title={label}
                            className="min-w-0 rounded-md border border-gold/15 bg-night px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                        ))}
                        <div className="sm:col-span-3"><Btn onClick={deploy} disabled={!ready || !!busy}><ShieldCheck size={13} /> Deploy</Btn></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Step n="5a">Publish the pay-gap report</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      Witness: {counts.enrolled} enrolled record(s), each bound to a payroll row, of {ledger?.declaredHeadcount ?? people.length} on the roster.
                      The circuit recomputes every figure and rejects anything that doesn't match.
                    </p>
                    <div className="mt-3 rounded-lg border border-gold/12 bg-night p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Try to cheat — sent to the real circuit</div>
                      <div className="mt-2.5 grid gap-1.5 text-[13px] text-cream/85">
                        {([
                          ["none", "Publish honestly"],
                          ["omit", "Leave one employee out of the report"],
                          ["pay", "Report one man's salary €8,000 lower"],
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
                      <Btn onClick={publish} disabled={!deployed || !!busy || counts.enrolled === 0}>
                        <ShieldCheck size={13} /> {cheat === "none" ? "Publish" : "Publish (cheating)"}{mode === "live" ? " + prove" : ""}
                      </Btn>
                    </div>
                  </div>

                  <div>
                    <Step n="5b">Publish the variable-pay report</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      The rest of Article 9 over the same bound set: gaps in variable pay, who receives it, and the gender mix of each
                      pay quartile. The employer places each record in a quartile band; the circuit checks the bands are in pay order.
                    </p>
                    <div className="mt-3 rounded-lg border border-gold/12 bg-night p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Try to cheat — sent to the real circuit</div>
                      <div className="mt-2.5 grid gap-1.5 text-[13px] text-cream/85">
                        {([
                          ["none", "Publish honestly"],
                          ["mean", "Claim the variable-pay gap is 0.00%"],
                          ["median", "Inflate the women's median bonus"],
                          ["bands", "Swap the top and bottom earners' quartile bands"],
                        ] as const).map(([k, text]) => (
                          <label key={k} className="flex cursor-pointer items-center gap-2.5">
                            <input type="radio" name="vcheat" checked={vCheat === k} onChange={() => setVCheat(k)} className="accent-gold" />
                            {text}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Btn onClick={publishVariable} disabled={!deployed || !!busy || counts.enrolled === 0}>
                        <ShieldCheck size={13} /> {vCheat === "none" ? "Publish" : "Publish (cheating)"}{mode === "live" ? " + prove" : ""}
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
                    {locked && <p className="mt-2 font-mono text-[11px] text-sage/70">The payroll is committed — fixed for this round.</p>}
                    {csvNote && <p className="mt-2 font-mono text-[11px] text-gold/90">{csvNote}</p>}
                  </div>

                  <div>
                    <Step n="2b">Commit the payroll</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      One transaction, <em>before</em> anyone enrolls: a hiding hash of each row — basic pay, variable pay, gender marker,
                      category and a payslip nonce. The salaries stay here; each employee gets their nonce with their payslip. The report must then
                      cover exactly these rows, so nobody can be left out, invented, or have their pay changed.
                    </p>
                    <div className="mt-3">
                      {rosterDeclared
                        ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> {ledger?.payrollRows} payroll rows committed</span>
                        : <Btn onClick={declareRoster} disabled={!deployed || !!busy}><ShieldCheck size={13} /> Commit {people.length} payroll rows</Btn>}
                    </div>
                  </div>

                  <div>
                    <Step n="2c">What the chain holds</Step>
                    <div className="mt-3 flex max-h-72 flex-col divide-y divide-gold/8 overflow-auto pr-1">
                      {people.map((p) => (
                        <div key={p.id} className="flex items-center justify-between gap-3 py-2">
                          <div>
                            <div className="text-[14px] text-cream">{p.name}</div>
                            <div className="font-mono text-[10px] text-sage/70">row {short(payrollRowHash(toRow(p)), 8)}</div>
                          </div>
                          {!rosterDeclared
                            ? <span className="font-mono text-[10px] text-sage/60">not committed</span>
                            : p.commitment
                              ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> confirmed by employee</span>
                              : <span className="font-mono text-[10px] text-sage/70">{payrollConfirmed ? "awaiting employee" : "awaiting works council"}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── WORKS COUNCIL ────────────────────────────────────── */}
              {role === "council" && (
                <div className="mt-6 flex flex-col gap-7">
                  <div>
                    <Step n="3">Confirm the payroll</Step>
                    <p className="mt-2 text-[14px] text-sage">
                      The works council receives the payroll export with its nonces and proves it can open every committed row:
                      the circuit recomputes each hash. The provider cannot commit a row the council has not seen, and the council
                      checks the headcount against the workforce it represents. Enrollment opens only after this.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {payrollConfirmed
                        ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> payroll confirmed by the works council</span>
                        : <Btn onClick={() => confirmPayroll()} disabled={!rosterDeclared || !!busy}><ShieldCheck size={13} /> Open {people.length} rows and confirm</Btn>}
                    </div>
                    {!rosterDeclared && <p className="mt-2 text-[13px] text-sage/80">Waiting for the payroll provider to commit the payroll.</p>}
                  </div>
                  {rosterDeclared && !payrollConfirmed && (
                    <div className="rounded-lg border border-gold/12 bg-night p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Try to cheat — sent to the real circuit</div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <Btn onClick={() => confirmPayroll(true)} disabled={!!busy} ghost>Confirm without opening one row</Btn>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── EMPLOYEE ─────────────────────────────────────────── */}
              {role === "employee" && (
                <div className="mt-6">
                  <Step n="4">Seal your record</Step>
                  <p className="mt-2 text-[14px] text-sage">
                    Enrolling proves your salary, gender marker and category open to your payroll row (with the nonce from your
                    payslip) — without revealing them. The chain sees one commitment and one nullifier. Then verify your receipt: a
                    Merkle proof that you were counted.
                  </p>
                  {!payrollConfirmed && <p className="mt-2 text-[13px] text-sage/80">Enrollment opens once the provider commits the payroll and the works council confirms it.</p>}
                  {payrollConfirmed && people.length > 0 && (
                    <div className="mt-3 rounded-lg border border-gold/12 bg-night p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Try to cheat — sent to the real circuit</div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <Btn onClick={() => cheatEnroll("inflate")} disabled={!!busy} ghost>{people[0].name.split(" ")[0]} claims €5,000 more</Btn>
                        <Btn onClick={() => cheatEnroll("ghost")} disabled={!!busy} ghost>Enroll an invented employee</Btn>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 flex max-h-96 flex-col divide-y divide-gold/8 overflow-auto pr-1">
                    {people.map((p) => (
                      <div key={p.id} className="grid grid-cols-[1.4fr_0.8fr_auto] items-center gap-3 py-2">
                        <div>
                          <div className="text-[14px] text-cream">{p.name}</div>
                          <div className="font-mono text-[10px] text-sage/70">{categories[p.category]} · {p.gender === 0 ? "W" : "M"}</div>
                        </div>
                        <div className="font-mono text-[12px] text-cream">€{p.salary.toLocaleString()}{p.variable > 0 && <span className="block text-[10px] text-sage">+ €{p.variable.toLocaleString()} variable</span>}</div>
                        <div className="flex justify-end">
                          {!p.commitment ? (
                            <Btn onClick={() => enroll(p)} disabled={!payrollConfirmed || !!busy} ghost>Enroll</Btn>
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
                  <Step n="6">What the reports show — and nothing else</Step>
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

                      {vrep && (
                        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
                          <div className="rounded-lg border border-gold/15 bg-night p-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Variable pay</div>
                            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
                              <dt className="text-sage">Mean gap</dt>
                              <dd className="font-mono text-cream">{vrep.gapDefined ? `${fmtPct(vrep.meanGapBps)} · favors ${vrep.meanFavorsMen ? "men" : "women"}` : "not defined"}</dd>
                              <dt className="text-sage">Median gap</dt>
                              <dd className="font-mono text-cream">{vrep.gapDefined ? `${fmtPct(vrep.medianGapBps)} · favors ${vrep.medianFavorsMen ? "men" : "women"}` : "not defined"}</dd>
                              <dt className="text-sage">Receive it</dt>
                              <dd className="font-mono text-cream">
                                women {vrep.recipientsWomen}/{vrep.headcountWomen} ({pctOf(vrep.recipientsWomen, vrep.headcountWomen)}) · men {vrep.recipientsMen}/{vrep.headcountMen} ({pctOf(vrep.recipientsMen, vrep.headcountMen)})
                              </dd>
                            </dl>
                          </div>
                          <div className="rounded-lg border border-gold/15 bg-night p-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Pay quartiles · women and men</div>
                            <ol className="mt-3 flex flex-col-reverse gap-2">
                              {vrep.quartiles.map((q, i) => {
                                const total = q.women + q.men || 1;
                                return (
                                  <li key={i} className="grid grid-cols-[4.5rem_1fr_3.5rem] items-center gap-3 font-mono text-[11px]">
                                    <span className="text-sage">{["Lower", "Lower mid", "Upper mid", "Upper"][i]}</span>
                                    <span className="flex h-2.5 overflow-hidden rounded-full bg-cream/8" role="img" aria-label={`${q.women} women, ${q.men} men`}>
                                      <span className="bg-gold" style={{ width: `${(q.women / total) * 100}%` }} />
                                      <span className="bg-sage/60" style={{ width: `${(q.men / total) * 100}%` }} />
                                    </span>
                                    <span className="text-right text-cream tabular-nums">{q.women}W {q.men}M</span>
                                  </li>
                                );
                              })}
                            </ol>
                            <p className="mt-2 font-mono text-[10px] text-sage/70">By total pay, basic plus variable. <span className="text-gold">■</span> women · <span className="text-sage">■</span> men</p>
                          </div>
                        </div>
                      )}

                      <div className="overflow-x-auto rounded-lg border border-gold/15">
                        <table className="w-full min-w-130 text-left font-mono text-[12px]">
                          <thead className="bg-cream/5 text-[10px] uppercase tracking-[0.14em] text-sage">
                            <tr><th className="px-3 py-2">Worker category</th><th className="px-3 py-2">W / M</th><th className="px-3 py-2">Mean pay W · M</th><th className="px-3 py-2">Gap</th><th className="px-3 py-2"></th>{vrep && <th className="px-3 py-2">Variable-pay gap</th>}</tr>
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
                                {vrep && (
                                  <td className="whitespace-nowrap px-3 py-2.5">
                                    {vrep.categories[i].disclosed
                                      ? fmtPct(vrep.categories[i].meanGapBps)
                                      : <span className="text-sage/70" title="fewer than 3 recipients in a group">suppressed · {vrep.categories[i].recipientsWomen}W/{vrep.categories[i].recipientsMen}M</span>}
                                  </td>
                                )}
                              </tr>
                            )))}
                          </tbody>
                        </table>
                      </div>
                      <p className="font-mono text-[10px] leading-relaxed text-sage/70">
                        A category at ≥ 5% triggers an Article 10 joint pay assessment only if the gap is also unjustified by objective,
                        gender-neutral criteria — a human judgement the circuit does not make. {vrep ? "All seven Article 9 indicators shown." : "Publish the variable-pay report for the other four Article 9 indicators."} Salaries on chain: <span className="text-gold">0</span>.
                        {mode === "live" && ` Proven on-chain · contract ${short(ledger!.contractAddress, 8)}.`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── ACTIVITY ───────────────────────────────────────────── */}
            <aside className="flex flex-col rounded-2xl bg-night-deep/60 p-5 ring-1 ring-gold/10 lg:sticky lg:top-20">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">Activity</h2>
              <div ref={logRef} className="mt-3 h-72 overflow-auto rounded-lg bg-night p-3 font-mono text-[11px] leading-relaxed text-sage lg:h-[26rem]">
                {log.length === 0
                  ? <span className="text-sage/60">{mode === "live" ? status?.startupLog?.slice(-3).join("\n") || "Every circuit call appears here. Start with Run the full flow, or deploy from the Employer tab." : "Every circuit call appears here. Start with Run the full flow, or deploy from the Employer tab."}</span>
                  : log.map((l, i) => <div key={i} className={l.startsWith("▶") ? "text-cream" : l.startsWith("✗") || l.startsWith("rejected") ? "text-red-300" : ""}>{l}</div>)}
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-sage/75">
                {mode === "live"
                  ? "Each write: local circuit execution, a proof from the proof server, finality on the node, then a read back from the indexer."
                  : <>This page runs the compiled Compact contract on Midnight's WebAssembly runtime: the same circuits and assertions as on-chain, without proof generation. For real proofs, run <code className="font-mono text-[11px] text-cream/80">pnpm network:up &amp;&amp; pnpm app:server</code> locally and this page switches to live mode.</>}
              </p>
            </aside>
          </div>
        )}
    </div>
  );
}
