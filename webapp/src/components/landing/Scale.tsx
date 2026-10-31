import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { BATCH, EASE_OUT, MAX_PEOPLE, V4_RUN, V4_VERIFY, transactionsFor } from "./data";

const SIZES = [32, 150, 250, 512];

/**
 * Wave 3: a company of any size up to 512, counted sixteen at a time. Each column is one batch;
 * between batches the running totals are locked (only a seal of them is on the chain).
 */
export function Scale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(250);
  const batches = Math.ceil(n / BATCH);
  const [filled, setFilled] = useState(0);

  // fill the batches one after another while the grid is on screen, then hold, then start again
  useEffect(() => {
    if (reduce || !inView) { setFilled(batches); return; }
    setFilled(0);
    let b = 0;
    const id = setInterval(() => {
      b += 1;
      if (b <= batches) setFilled(b);
      else if (b > batches + 18) { b = 0; setFilled(0); }
    }, Math.max(45, 900 / batches));
    return () => clearInterval(id);
  }, [batches, inView, reduce]);

  const done = filled >= batches;
  return (
    <section id="scale" className="mx-2 mt-2 rounded-[28px] bg-paper text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <span className="rounded-md bg-night px-2 py-1 text-[12px] font-semibold text-gold">New in Wave 3</span>
            <h2 className="display mt-4 text-4xl leading-[1.05] md:text-[3.4rem]">Any company up to {MAX_PEOPLE}. Sixteen at a time.</h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-moss">
              The law starts at 150 employees. Each report is proven in batches of 16, and between batches the running
              totals stay locked: the chain only holds a seal of them, so nobody can work out the first sixteen salaries.
            </p>

            <div className="mt-8">
              <div className="flex items-baseline justify-between text-[13px] font-medium text-moss">
                <label htmlFor="company-size">Company size</label>
                <span className="display text-2xl text-night tabular-nums">{n} people</span>
              </div>
              <input id="company-size" type="range" min={16} max={MAX_PEOPLE} step={1} value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="mt-3 w-full accent-[#202b22]" />
              <div className="mt-2 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button key={s} type="button" onClick={() => setN(s)}
                    className={`rounded-md px-2.5 py-1 text-[12px] font-semibold transition-colors ${s === n ? "bg-night text-gold" : "bg-night/8 text-night/75 hover:bg-night/15"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {[[batches, "batches of 16"], [transactionsFor(n), "transactions in all"], [n, "of them by employees"]].map(([v, label]) => (
                  <div key={label as string} className="rounded-xl bg-night/5 p-3">
                    <dd className="display text-2xl tabular-nums">{v}</dd>
                    <dt className="mt-0.5 text-[12px] leading-snug text-moss">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* one column per batch, one dot per person */}
          <div ref={ref} className="col-span-12 flex flex-col justify-center lg:col-span-7">
            <div className="relative rounded-2xl bg-night p-5 md:p-7" role="img"
              aria-label={`${n} people in ${batches} batches of 16, counted one batch at a time`}>
              <div className="flex items-center justify-between text-[12px] font-medium text-sage">
                <span>Pay-gap report · {n} people</span>
                <span className="tabular-nums">batch {Math.min(filled, batches)} of {batches}</span>
              </div>
              <div className="mt-5 grid items-start" style={{ gridTemplateColumns: `repeat(${batches}, minmax(0, 1fr))`, columnGap: batches > 20 ? 3 : 6 }}>
                {Array.from({ length: batches }, (_, b) => {
                  const size = Math.min(BATCH, n - b * BATCH);
                  const lit = b < filled;
                  return (
                    <span key={b} className={`flex flex-col items-center gap-[3px] rounded-md py-1 transition-colors duration-300 ${b === filled - 1 && !done ? "bg-gold/15" : ""}`}>
                      {Array.from({ length: BATCH }, (_, i) => (
                        <span key={i} className={`aspect-square w-full max-w-[11px] rounded-full transition-colors duration-300 ${i >= size ? "opacity-0" : lit ? "bg-gold" : "bg-cream/15"}`} />
                      ))}
                    </span>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gold/12 pt-4 text-[13px]">
                <span className="inline-flex items-center gap-2 text-sage"><Lock size={13} className="text-gold" /> totals between batches: sealed</span>
                <motion.span
                  className="rounded-md border-2 border-gold px-2.5 py-0.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-gold"
                  initial={false}
                  animate={{ opacity: done ? 1 : 0, transform: done ? "rotate(-6deg) scale(1)" : "rotate(-6deg) scale(1.4)" }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}>
                  proven
                </motion.span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <a href={V4_VERIFY} className="group rounded-xl bg-gold p-4 text-night ring-1 ring-night/10 transition-transform duration-150 ease-out active:scale-[0.98]">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-night/70">On Midnight's testnet</div>
                <div className="mt-1 text-[15px] font-medium">
                  {V4_RUN.people} people · {V4_RUN.batches} batches · {V4_RUN.transactions} transactions
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold">
                  Verify it <ArrowRight size={13} className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </div>
              </a>
              <a href="/app" className="group rounded-xl bg-night/5 p-4 text-night ring-1 ring-night/10 transition-transform duration-150 ease-out active:scale-[0.98]">
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-moss">In your browser</div>
                <div className="mt-1 text-[15px] font-medium">A 250-person company, all three reports</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold">
                  Try it <ArrowRight size={13} className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
