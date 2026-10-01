
const waves = [
  {
    wave: "Wave 1",
    dates: "Aug 27 — Sep 16",
    status: "Delivered",
    items: ["Compact contract, 4 circuits with proving keys", "Proven end to end on a Midnight network", "Employer / employee / regulator workspace"],
  },
  {
    wave: "Wave 2",
    dates: "Sep 27 — Oct 17",
    status: "Building",
    items: ["Payroll provider as a third party: every salary bound to its payroll row", "Works council confirms the payroll before enrollment", "All seven Article 9 indicators, incl. variable pay and quartiles", "k = 3 category pay (Article 7), small groups suppressed", "The compiled contract runs in the browser — no Docker", "Personio / DATEV CSV import"],
  },
  {
    wave: "Wave 3",
    dates: "Oct 27 — Nov 16",
    status: "Planned",
    items: ["Public testnet deployment and Lace wallet writes", "Article 9 filing pack: proof hash + verify URL", "One named pilot: a works council and an EU employer"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">Built in the open, wave by wave.</h2>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {waves.map((w) => (
            <div key={w.wave} className="h-full">
              <div className={`flex h-full flex-col rounded-2xl p-7 ${w.status === "Building" ? "bg-night text-cream" : "border border-night/15"}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="display text-3xl">{w.wave}</h3>
                  <span className={`chip ${w.status === "Building" ? "bg-gold/15 text-gold" : "bg-night/8 text-night/60"}`}>{w.status}</span>
                </div>
                <div className={`mt-2 font-mono text-xs tracking-[0.14em] ${w.status === "Building" ? "text-sage" : "text-night/60"}`}>
                  {w.dates}
                </div>
                <ul className={`mt-6 flex flex-col gap-3 text-[15px] leading-relaxed ${w.status === "Building" ? "text-sage" : "text-night/75"}`}>
                  {w.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${w.status === "Building" ? "bg-gold" : "bg-night/50"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
