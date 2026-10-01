import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, Search, ShieldCheck } from "lucide-react";
import { useScramble } from "./landing/useScramble";
import { EASE_OUT, FIGURES, pseudoHash } from "./landing/data";

const enter = (delay: number) => ({
  initial: { opacity: 0, transform: "translateY(18px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

// 14 sealed payroll points scattered in the night sky (fixed so the layout is stable)
const STARS = [
  [8, 14], [22, 6], [37, 18], [51, 9], [66, 15], [81, 7], [92, 20],
  [14, 34], [29, 27], [45, 38], [60, 29], [74, 36], [88, 31], [5, 46],
];

/** A salary on a portrait that seals into a hash, and back, on a slow loop. */
function SealingChip({ salary, seed, delay }: { salary: string; seed: string; delay: number }) {
  const reduce = useReducedMotion();
  const [sealed, setSealed] = useState(false);
  useEffect(() => {
    if (reduce) { setSealed(true); return; }
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setSealed(true);
      id = setInterval(() => setSealed((s) => !s), 3400);
    }, delay);
    return () => { clearTimeout(start); if (id) clearInterval(id); };
  }, [delay, reduce]);
  const text = useScramble(sealed ? `${pseudoHash(seed).slice(0, 8)}…` : salary);
  return (
    <span className="chip relative z-10 bg-night-deep/90 text-cream shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] ring-1 ring-gold/25 backdrop-blur-sm">
      {sealed ? <Lock size={11} className="text-gold" /> : <span className="size-[11px] rounded-full border border-cream/40" />}
      <span className="tabular-nums">{text}</span>
    </span>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], ["translateY(0px)", "translateY(-50px)"]);

  return (
    <section id="top" className="relative mx-2 mt-2 overflow-hidden rounded-[28px] bg-night-deep md:mx-3 md:mt-3">
      {/* the night sky: 14 sealed payroll points */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map(([x, y], i) => (
          <span key={i} className="twinkle absolute size-1.5 rounded-full bg-gold/70"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 0.37) % 3}s` }} />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-6 gap-y-14 px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36 lg:min-h-[92vh]">
        <div className="col-span-12 md:col-span-5">
          <motion.h1 {...enter(0.05)} className="display text-5xl leading-[1.02] text-cream md:text-[4.4rem]">
            Pay, proven equal.
            <span className="block text-gold">No salary revealed.</span>
          </motion.h1>
          <motion.p {...enter(0.2)} className="mt-6 max-w-md text-lg leading-relaxed text-sage">
            Prove a gender pay-gap report came from the real payroll, on Midnight, without revealing one salary.
          </motion.p>
          <motion.div {...enter(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="/app" className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-[15px] font-semibold text-night transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              Open the app <ArrowRight size={15} className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </a>
            <a href="/verify" className="inline-flex items-center gap-2 rounded-lg px-4 py-3.5 text-[15px] font-medium text-cream/85 ring-1 ring-gold/25 transition-colors hover:text-gold hover:ring-gold/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <Search size={14} /> Verify a report
            </a>
          </motion.div>
        </div>

        {/* two people, their pay sealed */}
        <motion.div style={{ transform: drift }} className="relative col-span-12 h-[440px] md:col-span-7 md:h-[540px]" aria-hidden="true">
          <motion.figure {...enter(0.25)} className="duotone absolute right-0 top-0 h-[58%] w-[74%] rounded-2xl">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop" alt="" className="rounded-2xl" />
          </motion.figure>
          <div className="absolute right-4 top-[47%]"><SealingChip salary="€62,000" seed="Bea" delay={1100} /></div>
          <motion.figure {...enter(0.4)} className="duotone absolute bottom-[8%] left-0 h-[44%] w-[60%] rounded-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop" alt="" className="rounded-2xl" />
          </motion.figure>
          <div className="absolute bottom-[10%] left-4"><SealingChip salary="€72,000" seed="Eli" delay={1800} /></div>
          <motion.div {...enter(0.6)} className="absolute bottom-0 right-2 w-[220px] rounded-xl bg-night/95 p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] ring-1 ring-gold/20">
            <div className="flex items-center justify-between text-[12px] font-medium text-sage">
              Report · round 1 <ShieldCheck size={14} className="text-gold" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="display text-3xl text-cream">{FIGURES.meanGap.toFixed(2)}%</span>
              <span className="text-[12px] font-semibold text-gold">proven</span>
            </div>
            <div className="mt-1 text-[12px] text-sage">mean gap · favors men</div>
          </motion.div>
        </motion.div>

        {/* the Equals Seal as the horizon: the solid bar is what gets published, the hollow one the sealed payroll */}
        <div className="col-span-12">
          <ul className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[14px] text-sage">
            {[["7", "Article 9 indicators proven"], ["45", "tests on the compiled circuits"], ["0", "salaries disclosed"]].map(([n, label]) => (
              <li key={label}><span className="display mr-2 text-2xl text-cream">{n}</span>{label}</li>
            ))}
          </ul>
          <motion.div className="mt-4 h-3 origin-left rounded-full bg-gold" initial={{ transform: "scaleX(0)" }} animate={{ transform: "scaleX(1)" }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE_OUT }} aria-hidden="true" />
          <div className="mt-2 h-2.5 rounded-full border-2 border-gold/50" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
