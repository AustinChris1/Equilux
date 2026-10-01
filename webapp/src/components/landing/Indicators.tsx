import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, Coins, Equal, Layers, Percent, TrendingUp, Users } from "lucide-react";
import { EASE_OUT, FIGURES } from "./data";

type Card = { letter: string; icon: typeof Percent; label: string; figure: React.ReactNode; note: string; small?: boolean };

const pct = (n: number) => `${n.toFixed(2)}%`;

function Quartiles() {
  return (
    <span className="flex h-9 w-full items-end gap-1" role="img" aria-label="Quartiles, lowest to highest: 2W 1M, 2W 2M, 2W 1M, 1W 3M">
      {FIGURES.quartiles.map((q, i) => {
        const t = q.w + q.m;
        return (
          <span key={i} className="flex h-full flex-1 flex-col-reverse overflow-hidden rounded-sm">
            <span className="bg-night" style={{ height: `${(q.w / t) * 100}%` }} />
            <span className="bg-night/25" style={{ height: `${(q.m / t) * 100}%` }} />
          </span>
        );
      })}
    </span>
  );
}

const CARDS: Card[] = [
  { letter: "a", icon: Percent, label: "Mean pay gap", figure: pct(FIGURES.meanGap), note: "favors men" },
  { letter: "b", icon: Coins, label: "Mean gap, variable pay", figure: pct(FIGURES.variableMeanGap), note: "among recipients" },
  { letter: "c", icon: Equal, label: "Median pay gap", figure: pct(FIGURES.medianGap), note: "lower median, no sorting in-circuit" },
  { letter: "d", icon: TrendingUp, label: "Median gap, variable pay", figure: pct(FIGURES.variableMedianGap), note: "among recipients" },
  { letter: "e", icon: Users, label: "Receive variable pay", figure: "71% · 100%", note: "women 5 of 7 · men 7 of 7", small: true },
  { letter: "f", icon: Layers, label: "Pay quartiles", figure: <Quartiles />, note: "women dark, men light, lowest to highest" },
  { letter: "g", icon: BadgeCheck, label: "Gap per worker category", figure: pct(FIGURES.engineeringGap), note: "Engineering · ≥ 5% flagged · small groups suppressed" },
];

/** Article 9(1)(a)–(g): a numbered card grid that fills as each indicator is shown proven. */
export function Indicators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  return (
    <section id="indicators" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid grid-cols-12 items-end gap-6">
          <h2 className="display col-span-12 text-4xl leading-[1.05] md:col-span-7 md:text-6xl">All seven Article 9 figures. Proven.</h2>
          <div className="col-span-12 flex items-center gap-4 md:col-span-5 md:justify-end">
            <p className="text-[14px] font-medium text-night/75">Demo company · 14 people · proven on Midnight's public testnet</p>
            <motion.span
              className="shrink-0 rounded-md border-2 border-night px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.16em]"
              initial={reduce ? false : { opacity: 0, transform: "rotate(-8deg) scale(1.5)" }}
              animate={inView ? { opacity: 1, transform: "rotate(-8deg) scale(1)" } : undefined}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 + 7 * 0.09 + 0.3 }}>
              all 7 proven
            </motion.span>
          </div>
        </div>
        <div ref={ref} className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CARDS.map((c, i) => (
            <article
              key={c.letter}
              className={`relative isolate flex min-h-[176px] flex-col overflow-hidden rounded-2xl p-5 ring-1 ring-night/20 ${i === 6 ? "col-span-2" : ""}`}
            >
              {/* the card fills from the bottom as its figure is shown proven */}
              <motion.span aria-hidden="true" className="absolute inset-0 -z-10 bg-paper"
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={inView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 + i * 0.09 }} />
              <div className="flex items-center justify-between">
                <span className="grid size-8 place-items-center rounded-full bg-night text-[13px] font-semibold text-gold">{c.letter}</span>
                <c.icon size={18} className="text-night/60" aria-hidden="true" />
              </div>
              <div className={`display mt-auto pt-6 ${c.small ? "text-2xl md:text-[1.9rem]" : "text-3xl md:text-[2.1rem]"}`}>{c.figure}</div>
              <h3 className="mt-2 text-[14px] font-medium">{c.label}</h3>
              <p className="mt-0.5 text-[12px] text-night/75">{c.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
