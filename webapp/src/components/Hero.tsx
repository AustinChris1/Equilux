import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ShieldCheck } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yImgA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yImgB = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative mx-2 mt-2 overflow-hidden rounded-[28px] bg-night md:mx-3 md:mt-3"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-32 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:pb-20 md:pt-40 lg:min-h-[92vh]">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.h1
            {...fadeUp(0.1)}
            className="display max-w-2xl text-5xl leading-[1.02] text-cream md:text-[4.6rem]"
          >
            Pay, proven equal.
            <span className="block text-gold">No salary revealed.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-sage">
            Equilux is the first employee-verifiable pay-transparency reporting protocol.
            Companies prove their legally required gender pay gap report was computed from the
            complete, real payroll — while every individual salary stays sealed in zero-knowledge.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5"
            >
              Run the protocol
              <ArrowDown size={15} />
            </a>
            <a
              href="#mandate"
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/70 underline decoration-gold/40 underline-offset-8 transition-colors hover:text-gold"
            >
              Why now — Directive (EU) 2023/970
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.6)} className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-gold/10 pt-6">
            {[
              ["4", "circuits compiling"],
              ["12", "protocol tests passing"],
              ["0", "salaries ever disclosed"],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="display text-3xl text-cream">{n}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sage">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* editorial image composition */}
        <div className="relative hidden h-[560px] md:block" aria-hidden="true">
          <motion.figure
            style={{ y: yImgA }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="duotone absolute right-0 top-0 h-[300px] w-[78%] rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
              alt=""
              className="rounded-2xl"
            />
          </motion.figure>
          <motion.figure
            style={{ y: yImgB }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="duotone absolute bottom-10 left-0 h-[240px] w-[62%] rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop"
              alt=""
              className="rounded-2xl"
            />
          </motion.figure>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="absolute bottom-0 right-6 w-[240px] rounded-xl border border-gold/20 bg-night-deep/95 p-4 shadow-2xl backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage">Report · Round 1</span>
              <ShieldCheck size={14} className="text-gold" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="display text-3xl text-cream">15.16%</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">proven</span>
            </div>
            <div className="mt-1 font-mono text-[10px] text-sage">mean gap · favors men</div>
            <div className="mt-3 border-t border-gold/10 pt-2 font-mono text-[10px] text-sage/70">
              salaries disclosed: <span className="text-gold">none</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
