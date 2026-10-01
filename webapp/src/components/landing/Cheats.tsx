import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Ghost, ListX, Percent, TrendingDown, TrendingUp, X } from "lucide-react";
import { EASE_OUT } from "./data";

/** Each cheat and the exact message the circuit answers it with. */
const CHEATS = [
  { icon: ListX, who: "Employer", try: "Leave someone out", msg: "payroll witness must cover every enrolled employee" },
  { icon: TrendingDown, who: "Employer", try: "Lower a man's pay by €8,000", msg: "record does not match what its employee enrolled" },
  { icon: Percent, who: "Employer", try: "Claim the gap is 0.00%", msg: "claimed gap too low" },
  { icon: TrendingUp, who: "Employee", try: "Claim €5,000 more", msg: "record does not match any payroll row from the provider" },
  { icon: Ghost, who: "Employer", try: "Invent an employee", msg: "record does not match any payroll row from the provider" },
];

export function Cheats() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <section id="cheats" className="relative mx-2 mt-2 rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-6 gap-y-10 px-5 py-20 md:px-8 md:py-24">
        <div className="col-span-12 md:col-span-5">
          <h2 className="display text-4xl leading-[1.05] text-cream md:text-5xl">Try to cheat.</h2>
          <p className="mt-4 max-w-sm text-[15px] text-sage">Pick a lie. The circuit refuses it, in its own words.</p>
          <a href="/app" className="mt-8 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
            Run all seven for real <ArrowRight size={14} />
          </a>
        </div>
        <div className="col-span-12 md:col-span-7">
          <div className="grid gap-2 sm:grid-cols-2">
            {CHEATS.map((c, i) => (
              <button key={c.try} onClick={() => setPicked(i)} aria-pressed={picked === i}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-[background-color,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  picked === i ? "bg-red-950/40 ring-1 ring-red-400/50" : "bg-cream/[0.05] ring-1 ring-gold/10 hover:bg-cream/[0.08] hover:ring-gold/30"}`}>
                <c.icon size={17} className={picked === i ? "text-red-300" : "text-gold"} />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-sage">{c.who}</span>
                  <span className="text-[14px] text-cream">{c.try}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 min-h-[76px]" aria-live="polite">
            <AnimatePresence mode="wait">
              {picked !== null && (
                <motion.div key={picked} className="flex items-start gap-3 rounded-xl bg-night-deep p-4 ring-1 ring-red-400/40"
                  initial={{ opacity: 0, transform: "translateX(-6px)" }}
                  animate={{ opacity: 1, transform: ["translateX(-6px)", "translateX(5px)", "translateX(-3px)", "translateX(0px)"] }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.32, ease: EASE_OUT }}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-950/60"><X size={15} className="text-red-300" /></span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-red-300">Circuit rejected</span>
                    <span className="font-mono text-[13px] text-cream">{CHEATS[picked].msg}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
