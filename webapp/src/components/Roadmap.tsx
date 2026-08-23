import { Reveal } from "./Reveal";

const waves = [
  {
    wave: "Wave 1",
    dates: "Aug 27 — Sep 16",
    status: "Building",
    items: ["Compact contract compiling — 4 circuits with proving keys", "Protocol simulator with 12 passing tests", "Interactive in-browser demo of the full enroll → attest → prove flow"],
  },
  {
    wave: "Wave 2",
    dates: "Sep 27 — Oct 17",
    status: "Planned",
    items: ["Cohort-threshold category queries", "Employer, employee and regulator dashboards", "Simulation and test suite hardening"],
  },
  {
    wave: "Wave 3",
    dates: "Oct 27 — Nov 16",
    status: "Planned",
    items: ["Roster-integrity ceremony with payroll-provider attestation", "The 5% joint-assessment flag, automated", "Pilot-ready packaging for EU compliance teams"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-night/70">The Midnight Buildathon · three waves</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Built in the open, wave by wave.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {waves.map((w, i) => (
            <Reveal key={w.wave} delay={0.1 * i} className="h-full">
              <div className={`flex h-full flex-col rounded-2xl p-7 ${i === 0 ? "bg-night text-cream" : "border border-night/15"}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="display text-3xl">{w.wave}</h3>
                  <span className={`chip ${i === 0 ? "bg-gold/15 text-gold" : "bg-night/8 text-night/60"}`}>{w.status}</span>
                </div>
                <div className={`mt-2 font-mono text-xs tracking-[0.14em] ${i === 0 ? "text-sage" : "text-night/60"}`}>
                  {w.dates}
                </div>
                <ul className={`mt-6 flex flex-col gap-3 text-[15px] leading-relaxed ${i === 0 ? "text-sage" : "text-night/75"}`}>
                  {w.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-gold" : "bg-night/50"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
