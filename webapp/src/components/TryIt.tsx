import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  "The payroll provider commits fourteen payroll rows, hashed.",
  "Every employee proves their sealed record matches their row.",
  "The employer publishes the report; the regulator reads it.",
  "Then try seven ways to cheat. The circuit rejects each one.",
];

/** Landing band that sends visitors to /app, where the real contract runs. */
export function TryIt() {
  return (
    <section id="try" className="grain relative mx-2 mt-2 overflow-hidden rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <h2 className="display max-w-xl text-4xl leading-[1.05] text-cream md:text-5xl">
              Run the whole protocol in your browser.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-sage">
              The app executes the compiled Compact contract on Midnight's WebAssembly runtime: the same circuits and
              assertions as on-chain, no install, about two seconds end to end.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <ol className="mt-8 flex max-w-lg flex-col gap-3.5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 text-[15px] leading-snug text-cream/90">
                  <span className="mt-px font-mono text-[12px] tabular-nums text-gold">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href="/app"
              className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Open the app
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <a href="/app" className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" aria-label="Open the app">
            <img
              src="/regulator.webp"
              width={1282}
              height={1040}
              loading="lazy"
              alt="The regulator's view in the Equilux app: mean gap 9.69%, median gap 1.81%, and a per-category table where Engineering is flagged at 13.88% and Operations is suppressed."
              className="w-full rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-gold/15 transition-transform duration-300 ease-out hover:-translate-y-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
