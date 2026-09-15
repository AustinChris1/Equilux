import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, CircleAlert, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  SAMPLE_PAYROLL,
  enrollmentNullifier,
  fmtBps,
  publishReport,
  recordCommitment,
  shortHash,
  trueGapBps,
  type Employee,
  type Enrollment,
  type PayReport,
} from "../lib/protocol";

type Stage = "idle" | "enrolled" | "attested" | "done";

export function Demo() {
  const [payroll, setPayroll] = useState<Employee[]>(SAMPLE_PAYROLL);
  const [stage, setStage] = useState<Stage>("idle");
  const [enrollments, setEnrollments] = useState<Map<string, Enrollment>>(new Map());
  const [attested, setAttested] = useState<Set<string>>(new Set());
  const [omitOne, setOmitOne] = useState(false);
  const [lowball, setLowball] = useState(false);
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<PayReport | null>(null);
  const [rejection, setRejection] = useState<string | null>(null);

  const honestClaim = useMemo(() => trueGapBps(payroll), [payroll]);

  const setSalary = (id: string, salary: number) => {
    if (stage !== "idle") return;
    setPayroll((p) => p.map((e) => (e.id === id ? { ...e, salary } : e)));
  };

  const enrollAll = async () => {
    setBusy(true);
    const next = new Map<string, Enrollment>();
    for (const e of payroll) {
      next.set(e.id, {
        commitment: await recordCommitment(e, 1),
        nullifier: await enrollmentNullifier(e, 1),
      });
    }
    setEnrollments(next);
    setStage("enrolled");
    setBusy(false);
  };

  const attestAll = () => {
    setAttested(new Set([...enrollments.values()].map((x) => x.commitment)));
    setStage("attested");
  };

  const publish = async () => {
    setBusy(true);
    setReport(null);
    setRejection(null);
    const witness = omitOne ? payroll.slice(0, -1) : payroll;
    const claim = lowball ? 0n : trueGapBps(witness);
    const res = await publishReport(witness, enrollments, attested, enrollments.size, claim);
    if (res.ok && res.report) {
      setReport(res.report);
      setStage("done");
    } else {
      setRejection(res.error ?? "rejected");
    }
    setBusy(false);
  };

  const reset = () => {
    setPayroll(SAMPLE_PAYROLL);
    setStage("idle");
    setEnrollments(new Map());
    setAttested(new Set());
    setReport(null);
    setRejection(null);
    setOmitOne(false);
    setLowball(false);
  };

  const stepClass = (active: boolean, done: boolean) =>
    `chip ${done ? "bg-gold/15 text-gold" : active ? "bg-cream/10 text-cream" : "bg-cream/5 text-sage/60"}`;

  return (
    <section id="demo" className="grain relative mx-2 mt-2 rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-gold">Sandbox · in-browser replica, no proofs</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] text-cream md:text-6xl">
            File a proven report. Then try to cheat.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-sage">
            Linear sandbox of the same circuit rules (sample company; edit salaries). Prefer the
            Workspace above for the three-role flow — including on the hosted Vercel site.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* payroll — the private side */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
                  Private payroll · never leaves this panel
                </span>
                <span className="chip bg-cream/5 text-sage">{payroll.length} records</span>
              </div>
              <div className="mt-4 flex flex-col divide-y divide-gold/8">
                {payroll.map((e) => {
                  const enr = enrollments.get(e.id);
                  return (
                    <div key={e.id} className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-3 py-2.5">
                      <div>
                        <div className="text-[14px] font-medium text-cream">{e.name}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage/70">
                          {e.role} · {e.gender === 0 ? "W" : "M"}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-sage">€</span>
                        <input
                          type="number"
                          value={e.salary}
                          step={1000}
                          min={0}
                          disabled={stage !== "idle"}
                          onChange={(ev) => setSalary(e.id, Number(ev.target.value) || 0)}
                          className="w-24 rounded-md border border-gold/15 bg-night px-2 py-1 font-mono text-[12px] text-cream outline-none focus:border-gold/50 disabled:opacity-50"
                        />
                      </div>
                      <div className="justify-self-end">
                        {enr ? (
                          <span
                            className={`chip ${attested.has(enr.commitment) ? "bg-gold/15 text-gold" : "bg-cream/8 text-cream/70"}`}
                            title={enr.commitment}
                          >
                            {attested.has(enr.commitment) && <BadgeCheck size={11} />}
                            {shortHash(enr.commitment)}
                          </span>
                        ) : (
                          <span className="chip bg-cream/5 text-sage/50">unsealed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* protocol console — the public side */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-gold/15 bg-night-deep/40 p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
                Public ledger · what the chain sees
              </span>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className={stepClass(stage === "idle", stage !== "idle")}>1 · enroll</span>
                <span className={stepClass(stage === "enrolled", stage === "attested" || stage === "done")}>2 · attest</span>
                <span className={stepClass(stage === "attested", stage === "done")}>3 · publish + prove</span>
              </div>

              <div className="mt-5 flex flex-col gap-2 font-mono text-[11px] text-sage">
                <div className="flex justify-between border-b border-gold/8 pb-2">
                  <span>commitments (Merkle leaves)</span>
                  <span className="text-cream">{enrollments.size}</span>
                </div>
                <div className="flex justify-between border-b border-gold/8 pb-2">
                  <span>nullifiers</span>
                  <span className="text-cream">{enrollments.size}</span>
                </div>
                <div className="flex justify-between border-b border-gold/8 pb-2">
                  <span>employer attestations</span>
                  <span className="text-cream">{attested.size}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>salaries visible on-chain</span>
                  <span className="text-gold">0</span>
                </div>
              </div>

              {stage === "attested" && (
                <div className="mt-4 rounded-lg border border-gold/12 bg-night p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">
                    Adversarial toggles
                  </div>
                  <label className="mt-2.5 flex cursor-pointer items-center gap-2.5 text-[13px] text-cream/85">
                    <input type="checkbox" checked={omitOne} onChange={(e) => setOmitOne(e.target.checked)} className="accent-[#FFD85F]" />
                    Omit one employee from the witness
                  </label>
                  <label className="mt-2 flex cursor-pointer items-center gap-2.5 text-[13px] text-cream/85">
                    <input type="checkbox" checked={lowball} onChange={(e) => setLowball(e.target.checked)} className="accent-[#FFD85F]" />
                    Claim the gap is 0.00%
                  </label>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {stage === "idle" && (
                  <button onClick={enrollAll} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                    <Play size={13} /> Employees enroll
                  </button>
                )}
                {stage === "enrolled" && (
                  <button onClick={attestAll} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5">
                    <BadgeCheck size={13} /> Employer attests
                  </button>
                )}
                {stage === "attested" && (
                  <button onClick={publish} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                    <ShieldCheck size={13} /> Publish report
                  </button>
                )}
                {(stage !== "idle" || report || rejection) && (
                  <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-gold/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:border-gold/60 hover:text-gold">
                    <RotateCcw size={13} /> Reset
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {rejection && (
                  <motion.div
                    key="rejection"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-950/30 p-3.5 text-[13px] leading-relaxed text-red-200"
                  >
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    <span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em]">circuit rejected · </span>
                      {rejection}
                    </span>
                  </motion.div>
                )}
                {report && (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-lg border border-gold/25 bg-night p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">
                        PayReport · round {report.round}
                      </span>
                      <span className="chip bg-gold/15 text-gold">
                        <ShieldCheck size={11} /> proven
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2.5">
                      <span className="display text-4xl text-cream">{fmtBps(report.meanGapBps)}</span>
                      <span className="font-mono text-[11px] text-sage">
                        mean gap · favors {report.gapFavorsMen ? "men" : "women"}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
                      <div className="rounded-md bg-cream/5 p-2 text-center">
                        <div className="text-cream">{report.headcountWomen}</div>
                        <div className="text-sage/70">women</div>
                      </div>
                      <div className="rounded-md bg-cream/5 p-2 text-center">
                        <div className="text-cream">{report.headcountMen}</div>
                        <div className="text-sage/70">men</div>
                      </div>
                      <div className={`rounded-md p-2 text-center ${report.meanGapAtOrAbove5pct ? "bg-cream/10 text-cream" : "bg-gold/10 text-gold"}`}>
                        <div>{report.meanGapAtOrAbove5pct ? "mean ≥ 5%" : "mean < 5%"}</div>
                        <div className="opacity-70">company-wide</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {stage === "attested" && !rejection && (
                <p className="mt-4 font-mono text-[10px] leading-relaxed text-sage/60">
                  honest claim for this payroll: {fmtBps(honestClaim)} — the circuit accepts exactly this value and rejects every other.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
