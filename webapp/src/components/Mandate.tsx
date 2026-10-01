import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT, FIGURES } from "./landing/data";

const DUE = new Date("2027-06-07T00:00:00Z");
const ENACTED = new Date("2023-06-06T00:00:00Z"); // Directive (EU) 2023/970 in force

/** The deadline as a horizon, the 5% line as a threshold, and the zero ways to check. */
export function Mandate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const now = Date.now();
  const days = Math.max(0, Math.ceil((DUE.getTime() - now) / 86_400_000));
  const elapsed = Math.min(1, Math.max(0, (now - ENACTED.getTime()) / (DUE.getTime() - ENACTED.getTime())));
  const gapScale = 16; // the bar spans 0–16%
  const draw = (delay = 0) => ({
    initial: reduce ? false : { transform: "scaleX(0)" },
    animate: inView ? { transform: "scaleX(1)" } : undefined,
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section id="mandate" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div ref={ref} className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">The law now demands a number companies cannot prove.</h2>
        <p className="mt-4 text-[14px] font-medium text-night/75">Directive (EU) 2023/970 · EU Pay Transparency</p>

        {/* the deadline */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <span className="text-[13px] font-medium text-night/75">Today</span>
            <span className="text-right">
              <span className="display block text-4xl md:text-6xl">7 June 2027</span>
              <span className="text-[13px] font-medium text-night/75">{days.toLocaleString("en-US")} days left</span>
            </span>
          </div>
          <div className="relative mt-3 h-2.5 rounded-full bg-night/12">
            <motion.div className="absolute inset-y-0 left-0 origin-left rounded-full bg-night" style={{ width: `${elapsed * 100}%` }} {...draw()} />
          </div>
          <p className="mt-3 max-w-2xl text-[15px] text-night/80">
            First pay-gap reports are due from every EU employer with 250+ people, computed from 2026 pay data. Employers of 150+ follow on the same date.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {/* the 5% line */}
          <div>
            <div className="display text-5xl md:text-6xl">5%</div>
            <div className="relative mt-5 h-9">
              <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-night/12">
                <motion.div className="absolute inset-y-0 left-0 origin-left rounded-full bg-night/70"
                  style={{ width: `${(FIGURES.engineeringGap / gapScale) * 100}%` }} {...draw(0.3)} />
              </div>
              <div className="absolute inset-y-0 w-0.5 bg-red-700" style={{ left: `${(5 / gapScale) * 100}%` }} aria-hidden="true" />
              <span className="absolute -bottom-5 -translate-x-1/2 text-[12px] font-semibold text-red-800" style={{ left: `${(5 / gapScale) * 100}%` }}>5%</span>
              <span className="absolute -top-6 -translate-x-full whitespace-nowrap text-[12px] font-medium text-night/75" style={{ left: `${(FIGURES.engineeringGap / gapScale) * 100}%` }}>
                demo Engineering {FIGURES.engineeringGap}%
              </span>
            </div>
            <p className="mt-8 text-[15px] text-night/80">
              An unexplained gap of five percent or more in any worker category forces a joint pay assessment with worker representatives.
            </p>
          </div>
          {/* zero ways to check */}
          <div>
            <div className="display text-5xl md:text-6xl">0</div>
            <div className="mt-5 flex h-9 items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => <span key={i} className="h-6 flex-1 rounded-sm border-2 border-dashed border-night/30" />)}
            </div>
            <p className="mt-8 text-[15px] text-night/80">
              Ways, today, for an employee or regulator to check the published numbers came from the real, complete payroll. Reports are self-declared.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
