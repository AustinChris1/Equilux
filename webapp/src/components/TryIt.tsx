import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/** Landing band that sends visitors to /app, where the real contract runs. */
export function TryIt() {
  return (
    <section id="try" className="relative mx-2 mt-2 overflow-hidden rounded-[28px] bg-paper md:mx-3 md:mt-3">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <h2 className="display max-w-xl text-4xl leading-[1.05] text-night md:text-5xl">
              See it run, in your browser.
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href="/app"
              className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-night px-6 py-3.5 text-[15px] font-semibold text-gold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
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
              width={1304}
              height={1774}
              loading="lazy"
              alt="The regulator's view in the Equilux app: mean gap 9.69%, median gap 1.81%, and a per-category table where Engineering is flagged at 13.88% and Operations is suppressed."
              className="max-h-[620px] w-full rounded-2xl object-cover object-top shadow-[0_24px_60px_-20px_rgba(32,43,34,0.45)] ring-1 ring-night/10 transition-transform duration-300 ease-out hover:-translate-y-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
