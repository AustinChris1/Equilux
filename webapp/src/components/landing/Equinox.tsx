import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, FileLock2, Lock, Search, ShieldCheck, UserCheck, Users, X } from "lucide-react";
import { LogoMark } from "../Logo";
import { EASE_OUT, FIGURES, PEOPLE, euro, pseudoHash } from "./data";
import { useScramble } from "./useScramble";

const STEPS = [
  { icon: FileLock2, title: "Payroll is committed", line: "The provider hashes every payroll row. Salaries never leave payroll." },
  { icon: Users, title: "The works council checks it", line: "It opens every row; the circuit recomputes each hash." },
  { icon: UserCheck, title: "Each employee seals their pay", line: "A record must match its row. An inflated salary matches nothing." },
  { icon: ShieldCheck, title: "One proof covers everyone", line: "All seven Article 9 figures, verified inside the circuit." },
  { icon: Search, title: "Anyone verifies", line: "Read the report from the chain. No salary is on it." },
];

function Row({ i, step, sealed }: { i: number; step: number; sealed: boolean }) {
  const p = PEOPLE[i];
  const value = useScramble(sealed ? `${pseudoHash(p.name).slice(0, 6)}…${pseudoHash(p.name).slice(-4)}` : euro(p.salary));
  const council = step >= 1;
  const bound = step >= 2;
  return (
    <div className="flex h-8 items-center gap-2.5 rounded-md bg-cream/[0.06] px-2.5 font-mono text-[11px] text-cream/90 md:h-9">
      <UserCheck size={13} className={`shrink-0 transition-colors duration-300 ${bound ? "text-gold" : "text-sage/50"}`} />
      <span className="w-9 truncate text-sage sm:w-12">{p.name}</span>
      <span className="flex-1 truncate tabular-nums">{value}</span>
      {sealed && <Lock size={11} className="hidden shrink-0 text-gold/80 sm:block" aria-hidden="true" />}
      <span className={`grid size-4 shrink-0 place-items-center rounded-full transition-[opacity,transform] duration-300 ${council ? "scale-100 bg-gold/20 opacity-100" : "scale-75 opacity-0"}`}
        style={{ transitionDelay: council ? `${i * 35}ms` : "0ms" }}>
        <Check size={10} className="text-gold" />
      </span>
    </div>
  );
}

function Count({ to, decimals = 2, suffix = "%" }: { to: number; decimals?: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setV(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return <>{v.toFixed(decimals)}{suffix}</>;
}

function Stage({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [sealed, setSealed] = useState(false);
  const stamped = useRef(false);
  if (step >= 3) stamped.current = true; // the proof lands once; scrolling back does not replay it

  useEffect(() => {
    if (!inView || sealed) return;
    const t = setTimeout(() => setSealed(true), 700);
    return () => clearTimeout(t);
  }, [inView, sealed]);
  const isSealed = sealed || step > 0;

  return (
    <div ref={ref} className="relative h-[340px] md:h-[420px]">
      {/* the payroll */}
      <motion.div
        className="grid grid-cols-2 gap-1.5 md:gap-2"
        animate={step >= 4 ? { opacity: 0, transform: "scale(0.94)" } : step === 3 ? { opacity: 0.12, transform: "scale(0.94)" } : { opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        aria-hidden={step >= 3}
      >
        {PEOPLE.map((_, i) => <Row key={i} i={i} step={step} sealed={isSealed} />)}
      </motion.div>

      {/* the council's sweep */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div key="sweep" className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-gold/25 to-transparent"
            initial={{ transform: "translateY(-40px)", opacity: 0 }} animate={{ transform: "translateY(320px)", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, ease: "linear" }} />
        )}
      </AnimatePresence>

      {/* a cheat bouncing off */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div key="cheat" className="absolute left-1/2 top-1/2 flex w-[min(92%,22rem)] items-start gap-2.5 rounded-lg bg-night-deep/95 p-3.5 font-mono text-[11px] text-cream shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-red-400/40"
            initial={{ opacity: 0, transform: "translate(-50%, -40%) scale(0.96)" }} animate={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
            exit={{ opacity: 0, transform: "translate(-50%, -55%) scale(0.98)" }} transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.5 }}>
            <X size={15} className="mt-0.5 shrink-0 text-red-300" />
            <span>Ana enrolls <span className="text-red-200">€65,000</span>, payroll says €60,000<br /><span className="text-red-300">rejected · record does not match any payroll row</span></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* one proof */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div key="proof" className="absolute inset-0 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="relative grid place-items-center">
              <LogoMark size={150} className="text-gold" />
              <motion.span
                className="absolute -right-10 -top-4 rounded-md border-2 border-gold px-3 py-1 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-gold"
                initial={stamped.current ? false : { opacity: 0, transform: "rotate(-10deg) scale(1.5)" }}
                animate={{ opacity: 1, transform: "rotate(-10deg) scale(1)" }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.25 }}>
                proven
              </motion.span>
              <p className="mt-6 font-mono text-[11px] text-sage">14 records · 6 circuits · 0 salaries disclosed</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the report, in daylight */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div key="report" className="absolute inset-0 flex items-center"
            initial={{ opacity: 0, transform: "translateY(16px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}>
            <div className="w-full rounded-2xl bg-night p-5 text-cream shadow-[0_30px_60px_-24px_rgba(32,43,34,0.6)] md:p-7">
              <div className="flex items-center justify-between font-mono text-[11px] text-sage">
                <span>Pay-gap report · demo company · round 1</span>
                <ShieldCheck size={15} className="text-gold" />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
                {[
                  ["Mean gap", FIGURES.meanGap],
                  ["Median gap", FIGURES.medianGap],
                  ["Variable-pay gap", FIGURES.variableMeanGap],
                  ["Engineering", FIGURES.engineeringGap],
                ].map(([label, v]) => (
                  <div key={label as string}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage">{label}</dt>
                    <dd className="display mt-1 text-3xl md:text-4xl"><Count to={v as number} /></dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gold/12 pt-4 font-mono text-[11px]">
                <span className="text-sage">salaries on chain: <span className="text-gold">0</span></span>
                <a href="/verify" className="inline-flex items-center gap-1.5 text-gold hover:underline">Verify a report <ArrowRight size={13} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The signature: a pinned stage that turns from night to day as the protocol runs. */
export function Equinox() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(4, Math.max(0, Math.floor(v * 5)))));
  const bg = useTransform(scrollYProgress, [0, 0.62, 0.8, 1], ["#131a15", "#202b22", "#ffd85f", "#ffd85f"]);
  const day = step === 4;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / 5), behavior: "smooth" });
  };

  return (
    <section id="protocol" ref={ref} aria-label="How it works" className="relative mx-2 mt-2 md:mx-3 md:mt-3" style={{ height: "520vh" }}>
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 flex h-dvh flex-col overflow-hidden rounded-[28px]">
        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-12 content-center gap-x-6 gap-y-5 px-5 pt-16 md:gap-y-8 md:px-8 md:pt-0">
          <div className="col-span-12 md:col-span-5">
            <h2 className={`display hidden text-5xl leading-[1.05] transition-colors duration-500 md:block ${day ? "text-night" : "text-cream"}`}>
              From sealed to proven.
            </h2>
            <ol className="flex flex-col gap-1 md:mt-7 md:gap-1.5">
              {STEPS.map((s, i) => {
                const active = i === step;
                return (
                  <li key={s.title}>
                    <button onClick={() => goTo(i)} aria-current={active ? "step" : undefined}
                      className={`group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-300 ${active ? (day ? "bg-night/8" : "bg-cream/[0.07]") : ""}`}>
                      <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        active ? (day ? "bg-night text-gold" : "bg-gold text-night") : i < step ? (day ? "bg-night/15 text-night" : "bg-gold/20 text-gold") : (day ? "bg-night/8 text-night/50" : "bg-cream/8 text-sage")}`}>
                        <s.icon size={14} />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[15px] font-medium transition-colors duration-300 ${active ? (day ? "text-night" : "text-cream") : day ? "text-night/55" : "text-sage"}`}>{s.title}</span>
                        <AnimatePresence initial={false}>
                          {active && (
                            <motion.span className={`block overflow-hidden text-[13px] leading-snug ${day ? "text-night/75" : "text-sage"}`}
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: EASE_OUT }}>
                              <span className="block pt-1">{s.line}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Stage step={step} />
          </div>
        </div>

        {/* the seal as a horizon: the solid bar fills as the night turns to day */}
        <div className="mx-auto mb-6 w-full max-w-6xl px-5 md:px-8" aria-hidden="true">
          <div className={`h-2 overflow-hidden rounded-full ${day ? "bg-night/10" : "bg-cream/8"}`}>
            <motion.div className={`h-full origin-left rounded-full ${day ? "bg-night" : "bg-gold"}`} style={{ scaleX: scrollYProgress }} />
          </div>
          <div className={`mt-1.5 h-1.5 rounded-full border ${day ? "border-night/40" : "border-gold/40"}`} />
        </div>
      </motion.div>
    </section>
  );
}
