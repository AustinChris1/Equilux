import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2, CircleAlert, Landmark, Loader2, RefreshCw, ShieldCheck, UserRound, Wifi, WifiOff } from "lucide-react";
import { Reveal } from "./Reveal";
import { API_BASE, fmtPct, getStatus, runJob, short, type Job, type LedgerView, type Status } from "../lib/api";

type Role = "employer" | "employee" | "regulator";

interface Person {
  id: string;
  name: string;
  role: string;
  salary: number;
  gender: 0 | 1;
  secret: string;
  commitment?: string;
  enrollBlock?: number;
  attested?: boolean;
  attestBlock?: number;
  receiptBlock?: number;
}

const STORAGE = "equilux.workspace.v1";
const newSecret = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").slice(0, 24);

const SEED: Omit<Person, "id" | "secret">[] = [
  { name: "A. Serrano", role: "Engineer", salary: 62_000, gender: 0 },
  { name: "B. Keller", role: "Engineer", salary: 71_000, gender: 1 },
  { name: "C. Okafor", role: "Designer", salary: 55_000, gender: 0 },
  { name: "D. Novak", role: "Sales", salary: 68_000, gender: 1 },
];

function loadRoster(): Person[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw) as Person[];
  } catch { /* ignore */ }
  return SEED.map((p) => ({ ...p, id: newSecret().slice(0, 8), secret: newSecret() }));
}

function Btn({ onClick, disabled, children, ghost }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; ghost?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        ghost
          ? "inline-flex items-center gap-2 rounded-lg border border-gold/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-40"
          : "inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      }
    >
      {children}
    </button>
  );
}

export function Workspace() {
  const [status, setStatus] = useState<Status | null>(null);
  const [online, setOnline] = useState<"checking" | "offline" | "online">("checking");
  const [role, setRole] = useState<Role>("employer");
  const [roster, setRoster] = useState<Person[]>(loadRoster);
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastReport, setLastReport] = useState<LedgerView | null>(null);
  const [employerSecret, setEmployerSecret] = useState("acme:employer-root-secret");
  const [omitLast, setOmitLast] = useState(false);
  const [lowball, setLowball] = useState(false);
  const [draft, setDraft] = useState({ name: "", role: "", salary: 60000, gender: 0 as 0 | 1 });
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem(STORAGE, JSON.stringify(roster)); }, [roster]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [log]);

  const refresh = useCallback(async () => {
    try {
      const s = await getStatus();
      setStatus(s);
      setOnline("online");
      if (s.ledger) setLastReport(s.ledger);
    } catch {
      setOnline("offline");
    }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, busy ? 4000 : 8000);
    return () => clearInterval(t);
  }, [refresh, busy]);

  const ledger = status?.ledger ?? lastReport;
  const deployedAddr = status?.contractAddress ?? null;
  const ready = online === "online" && !!status?.ready;

  const push = (lines: string[]) => setLog((l) => [...l, ...lines].slice(-60));

  async function exec<T>(label: string, path: string, body: unknown, after?: (j: Job<T>) => void) {
    if (busy) return;
    setBusy(label);
    setLastError(null);
    push([`▶ ${label}`]);
    try {
      const j = await runJob<T>(path, body, push);
      if (j.status === "error") {
        setLastError(j.error ?? "rejected");
      } else {
        after?.(j);
      }
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setLastError(m);
      push([`✗ ${m}`]);
    } finally {
      setBusy(null);
      refresh();
    }
  }

  const deploy = () =>
    exec<{ contractAddress: string; blockHeight: number }>("Deploy contract", "/api/deploy", { employerSecret });

  const enroll = (p: Person) =>
    exec<{ commitment: string; blockHeight: number }>(`Enroll ${p.name}`, "/api/enroll", { salary: p.salary, gender: p.gender, secret: p.secret }, (j) => {
      setRoster((r) => r.map((x) => (x.id === p.id ? { ...x, commitment: j.result!.commitment, enrollBlock: j.result!.blockHeight } : x)));
    });

  const attest = (p: Person) =>
    exec<{ blockHeight: number }>(`Attest ${p.name}`, "/api/attest", { commitment: p.commitment }, (j) => {
      setRoster((r) => r.map((x) => (x.id === p.id ? { ...x, attested: true, attestBlock: j.result!.blockHeight } : x)));
    });

  const receipt = (p: Person) =>
    exec<{ included: boolean; blockHeight: number }>(`Verify receipt ${p.name}`, "/api/receipt", { commitment: p.commitment }, (j) => {
      setRoster((r) => r.map((x) => (x.id === p.id ? { ...x, receiptBlock: j.result!.blockHeight } : x)));
    });

  const publish = () => {
    const attested = roster.filter((p) => p.commitment && p.attested);
    const witness = omitLast ? attested.slice(0, -1) : attested;
    exec<{ ledger: LedgerView; claimedGapBps: number }>("Publish report", "/api/publish", {
      payroll: witness.map((p) => ({ salary: p.salary, gender: p.gender, secret: p.secret })),
      ...(lowball ? { claimedGapBps: 0 } : {}),
    }, (j) => setLastReport(j.result!.ledger));
  };

  const addPerson = () => {
    if (!draft.name.trim() || draft.salary <= 0) return;
    setRoster((r) => [...r, { id: newSecret().slice(0, 8), secret: newSecret(), name: draft.name.trim(), role: draft.role.trim() || "—", salary: draft.salary, gender: draft.gender }]);
    setDraft({ name: "", role: "", salary: 60000, gender: 0 });
  };

  const resetRoster = () => { localStorage.removeItem(STORAGE); setRoster(loadRoster()); setLastError(null); setLog([]); };

  const counts = useMemo(() => ({
    enrolled: roster.filter((p) => p.commitment).length,
    attested: roster.filter((p) => p.attested).length,
    pending: roster.filter((p) => p.commitment && !p.attested).length,
  }), [roster]);

  const tabs: { id: Role; label: string; icon: typeof Building2 }[] = [
    { id: "employer", label: "Employer", icon: Building2 },
    { id: "employee", label: "Employee", icon: UserRound },
    { id: "regulator", label: "Regulator", icon: Landmark },
  ];

  return (
    <section id="workspace" className="grain relative mx-2 mt-2 rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <Reveal><div className="overline text-gold">Workspace · the live contract</div></Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] text-cream md:text-6xl">Run it for real.</h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sage">
            Three roles, one contract on a Midnight network. Every action below is a real circuit
            call proven by the proof server and finalized on-chain; every number in the regulator
            view is read back from the indexer. Names and salaries stay in this browser — only
            commitments leave it.
          </p>
        </Reveal>

        {/* connection strip */}
        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-gold/15 bg-night-deep/50 px-4 py-3 font-mono text-[11px] text-sage">
            {online === "online" ? <Wifi size={14} className="text-gold" /> : online === "offline" ? <WifiOff size={14} className="text-red-300" /> : <Loader2 size={14} className="animate-spin" />}
            <span className="text-cream">{online === "online" ? (status?.ready ? "connected · " + status.network : "connecting to the network…") : online === "offline" ? "no local API at " + API_BASE : "checking…"}</span>
            {deployedAddr && <span className="chip bg-gold/12 text-gold" title={deployedAddr}>contract {short(deployedAddr, 10)}</span>}
            {ledger && <span className="chip bg-cream/6">enrolled {ledger.enrolled} · nullifiers {ledger.nullifiers} · attested {ledger.attested}</span>}
            <button onClick={refresh} className="ml-auto inline-flex items-center gap-1.5 text-sage hover:text-gold"><RefreshCw size={12} /> refresh</button>
          </div>
        </Reveal>

        {online === "offline" && (
          <Reveal delay={0.26}>
            <div className="mt-6 grid gap-5 rounded-2xl border border-gold/15 p-6 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="display text-2xl text-cream">Start the network, then this page talks to the contract.</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-sage">
                  The workspace needs a Midnight node, indexer and proof server on your machine plus the
                  small local API that wraps the deployed contract. Two commands in <span className="font-mono text-cream">contract/</span>:
                </p>
                <pre className="mt-4 rounded-lg bg-night-deep p-4 font-mono text-[12px] leading-relaxed text-cream">pnpm network:up{"\n"}pnpm app:server</pre>
                <p className="mt-3 text-[13px] leading-relaxed text-sage/80">
                  Docker required. The first start syncs the genesis wallet and generates the fee token (about a minute).
                  This page re-checks every few seconds.
                </p>
              </div>
              <div className="rounded-xl border border-gold/12 bg-night-deep/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">No Docker right now?</div>
                <p className="mt-2 text-[14px] leading-relaxed text-sage">
                  The sandbox below runs the same protocol rules in your browser — same commitments, nullifiers and
                  assertions — without proofs.
                </p>
                <a href="#demo" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-gold underline decoration-gold/40 underline-offset-4">Open the sandbox ↓</a>
              </div>
            </div>
          </Reveal>
        )}

        {online === "online" && (
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {/* left: role panel */}
            <div className="rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button key={t.id} onClick={() => setRole(t.id)} className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${role === t.id ? "bg-gold text-night" : "bg-cream/6 text-sage hover:text-cream"}`}>
                    <t.icon size={13} /> {t.label}
                  </button>
                ))}
              </div>

              {/* EMPLOYER */}
              {role === "employer" && (
                <div className="mt-6 flex flex-col gap-6">
                  {!deployedAddr ? (
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">1 · Deploy the reporting contract</div>
                      <p className="mt-2 text-[14px] text-sage">The employer's secret never leaves this machine; only its hash goes on-chain as the attestation key.</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <input value={employerSecret} onChange={(e) => setEmployerSecret(e.target.value)} className="w-72 rounded-md border border-gold/15 bg-night px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                        <Btn onClick={deploy} disabled={!ready || !!busy}>{busy === "Deploy contract" ? <Loader2 size={13} className="animate-spin" /> : <ShieldCheck size={13} />} Deploy</Btn>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">2 · Attest enrolled records ({counts.pending} pending)</div>
                        <div className="mt-3 flex flex-col divide-y divide-gold/8">
                          {roster.filter((p) => p.commitment).length === 0 && <p className="py-3 text-[14px] text-sage/70">No enrollments yet — switch to the Employee tab and enroll someone.</p>}
                          {roster.filter((p) => p.commitment).map((p) => (
                            <div key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                              <div>
                                <div className="text-[14px] text-cream">{p.name} <span className="text-sage/60">· {p.role}</span></div>
                                <div className="font-mono text-[10px] text-sage/70" title={p.commitment}>{short(p.commitment!, 10)} · block {p.enrollBlock}</div>
                              </div>
                              {p.attested ? <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> attested · block {p.attestBlock}</span>
                                : <Btn onClick={() => attest(p)} disabled={!!busy} ghost>{busy === `Attest ${p.name}` ? <Loader2 size={12} className="animate-spin" /> : null} Attest</Btn>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">3 · Publish the proven report</div>
                        <p className="mt-2 text-[14px] text-sage">Witness: {counts.attested} attested record(s). The circuit requires the witness to cover every enrolled record on-chain ({ledger?.enrolled ?? 0}).</p>
                        <div className="mt-3 rounded-lg border border-gold/12 bg-night p-3.5">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Adversarial toggles — sent to the real circuit</div>
                          <label className="mt-2.5 flex cursor-pointer items-center gap-2.5 text-[13px] text-cream/85"><input type="checkbox" checked={omitLast} onChange={(e) => setOmitLast(e.target.checked)} className="accent-[#FFD85F]" /> Omit one attested employee from the witness</label>
                          <label className="mt-2 flex cursor-pointer items-center gap-2.5 text-[13px] text-cream/85"><input type="checkbox" checked={lowball} onChange={(e) => setLowball(e.target.checked)} className="accent-[#FFD85F]" /> Claim the gap is 0.00%</label>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <Btn onClick={publish} disabled={!!busy || counts.attested === 0}>{busy === "Publish report" ? <Loader2 size={13} className="animate-spin" /> : <ShieldCheck size={13} />} Publish + prove</Btn>
                          <Btn onClick={resetRoster} ghost disabled={!!busy}>Reset local roster</Btn>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* EMPLOYEE */}
              {role === "employee" && (
                <div className="mt-6 flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Enroll — seal your record on-chain</div>
                    <p className="mt-2 text-[14px] text-sage">Your salary and gender marker become one commitment and one nullifier. The secret below is what makes the receipt yours; it stays in this browser.</p>
                    {!deployedAddr && <p className="mt-2 text-[13px] text-red-300">No contract deployed yet — the employer deploys first.</p>}
                    <div className="mt-3 flex flex-col divide-y divide-gold/8">
                      {roster.map((p) => (
                        <div key={p.id} className="grid grid-cols-[1.3fr_0.7fr_auto] items-center gap-3 py-2.5">
                          <div>
                            <div className="text-[14px] text-cream">{p.name} <span className="text-sage/60">· {p.role} · {p.gender === 0 ? "W" : "M"}</span></div>
                            <div className="font-mono text-[10px] text-sage/60">secret {short(p.secret, 6)}{p.commitment ? ` · commitment ${short(p.commitment, 6)}` : ""}</div>
                          </div>
                          <div className="font-mono text-[12px] text-cream">€{p.salary.toLocaleString()}</div>
                          <div className="flex justify-end gap-2">
                            {!p.commitment ? (
                              <Btn onClick={() => enroll(p)} disabled={!deployedAddr || !!busy} ghost>{busy === `Enroll ${p.name}` ? <Loader2 size={12} className="animate-spin" /> : null} Enroll</Btn>
                            ) : p.receiptBlock ? (
                              <span className="chip bg-gold/15 text-gold"><BadgeCheck size={11} /> receipt verified · block {p.receiptBlock}</span>
                            ) : (
                              <Btn onClick={() => receipt(p)} disabled={!!busy} ghost>{busy === `Verify receipt ${p.name}` ? <Loader2 size={12} className="animate-spin" /> : null} Verify receipt</Btn>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-gold/12 bg-night p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Add a person to this company</div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <input placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="w-40 rounded-md border border-gold/15 bg-night-deep px-3 py-1.5 text-[13px] text-cream outline-none focus:border-gold/50" />
                      <input placeholder="Role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="w-32 rounded-md border border-gold/15 bg-night-deep px-3 py-1.5 text-[13px] text-cream outline-none focus:border-gold/50" />
                      <input type="number" step={1000} min={1} value={draft.salary} onChange={(e) => setDraft({ ...draft, salary: Number(e.target.value) || 0 })} className="w-28 rounded-md border border-gold/15 bg-night-deep px-3 py-1.5 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                      <select value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: Number(e.target.value) as 0 | 1 })} className="rounded-md border border-gold/15 bg-night-deep px-2 py-1.5 text-[13px] text-cream">
                        <option value={0}>Woman</option><option value={1}>Man</option>
                      </select>
                      <Btn onClick={addPerson} ghost disabled={roster.length >= 16}>Add</Btn>
                    </div>
                  </div>
                </div>
              )}

              {/* REGULATOR */}
              {role === "regulator" && (
                <div className="mt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">What the chain shows — and nothing else</div>
                  {!ledger ? <p className="mt-3 text-[14px] text-sage/70">No contract deployed yet.</p> : (
                    <div className="mt-3 flex flex-col gap-2 font-mono text-[12px] text-sage">
                      <div className="flex justify-between border-b border-gold/8 pb-2"><span>contract</span><span className="text-cream" title={ledger.contractAddress}>{short(ledger.contractAddress, 12)}</span></div>
                      <div className="flex justify-between border-b border-gold/8 pb-2"><span>employer key (hash)</span><span className="text-cream">{short(ledger.employerPk, 10)}</span></div>
                      <div className="flex justify-between border-b border-gold/8 pb-2"><span>enrolled · nullifiers · attested</span><span className="text-cream">{ledger.enrolled} · {ledger.nullifiers} · {ledger.attested}</span></div>
                      <div className="flex justify-between border-b border-gold/8 pb-2"><span>salaries visible on-chain</span><span className="text-gold">0</span></div>
                      <div className="mt-3">
                        {ledger.latestReport ? (
                          <div className="rounded-lg border border-gold/25 bg-night p-4">
                            <div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.18em] text-sage">PayReport · round {ledger.latestReport.round}</span><span className="chip bg-gold/15 text-gold"><ShieldCheck size={11} /> proven on-chain</span></div>
                            <div className="mt-3 flex items-baseline gap-2.5"><span className="display text-4xl text-cream">{fmtPct(ledger.latestReport.meanGapBps)}</span><span className="text-[11px]">mean gap · favors {ledger.latestReport.gapFavorsMen ? "men" : "women"}</span></div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                              <div className="rounded-md bg-cream/5 p-2 text-center"><div className="text-cream">{ledger.latestReport.headcountWomen}</div><div className="text-sage/70">women</div></div>
                              <div className="rounded-md bg-cream/5 p-2 text-center"><div className="text-cream">{ledger.latestReport.headcountMen}</div><div className="text-sage/70">men</div></div>
                              <div className={`rounded-md p-2 text-center ${ledger.latestReport.meanGapAtOrAbove5pct ? "bg-cream/10 text-cream" : "bg-gold/10 text-gold"}`}><div>{ledger.latestReport.meanGapAtOrAbove5pct ? "mean ≥ 5%" : "mean < 5%"}</div><div className="opacity-70">company-wide</div></div>
                            </div>
                          </div>
                        ) : <p className="text-[13px] text-sage/70">No report published yet.</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* right: activity */}
            <div className="flex flex-col rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">Activity · proofs and finality</span>
              <div ref={logRef} className="mt-3 h-64 overflow-auto rounded-lg bg-night p-3 font-mono text-[11px] leading-relaxed text-sage">
                {log.length === 0 ? <span className="text-sage/50">{status?.startupLog?.slice(-3).join("\n") || "waiting for the first action…"}</span> : log.map((l, i) => <div key={i} className={l.startsWith("▶") ? "text-cream" : l.startsWith("✗") || l.startsWith("rejected") ? "text-red-300" : ""}>{l}</div>)}
              </div>
              <AnimatePresence mode="wait">
                {lastError && (
                  <motion.div key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-950/30 p-3.5 text-[13px] leading-relaxed text-red-200">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span><span className="font-mono text-[11px] uppercase tracking-[0.14em]">circuit rejected · </span>{lastError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-sage/60">
                Each write: local circuit execution → proof from the proof server → transaction finalized on the node → state read back from the indexer. Expect 20–90 seconds per action.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
