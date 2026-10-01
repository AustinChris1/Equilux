
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
    items: ["Payroll provider as a third party: every salary bound to its payroll row", "Works council confirms the payroll before enrollment", "All seven Article 9 indicators, incl. variable pay and quartiles", "k = 3 category pay (Article 7), small groups suppressed", "The compiled contract runs in the browser — no Docker", "Personio / DATEV CSV import", "Deployed and proven on Midnight's public preprod testnet", "Verify page and Article 9 filing pack"],
  },
  {
    wave: "Wave 3",
    dates: "Oct 27 — Nov 16",
    status: "Planned",
    items: ["Lace wallet writes from the site", "Mainnet when Midnight opens it", "One named pilot: a works council and an EU employer"],
  },
];

const FILL = { Delivered: 1, Building: 0.6, Planned: 0 } as const;

/** The three waves along the seal: solid, filling, hollow. Items open on demand. */
export function Roadmap() {
  return (
    <section id="roadmap" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">Built in the open, wave by wave.</h2>
        <ol className="mt-14 grid gap-x-3 gap-y-10 md:grid-cols-3">
          {waves.map((w) => {
            const fill = FILL[w.status as keyof typeof FILL] ?? 0;
            return (
              <li key={w.wave}>
                <div className="relative h-3 overflow-hidden rounded-full border-2 border-night" aria-hidden="true">
                  <div className="absolute inset-y-0 left-0 bg-night" style={{ width: `${fill * 100}%` }} />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="display text-3xl">{w.wave}</h3>
                  <span className={`rounded-md px-2 py-1 text-[12px] font-semibold ${w.status === "Building" ? "bg-night text-gold" : "bg-night/10 text-night/80"}`}>{w.status}</span>
                </div>
                <p className="mt-1 text-[13px] font-medium text-night/75">{w.dates}</p>
                <details className="group mt-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[14px] font-medium underline decoration-night/30 underline-offset-4 hover:decoration-night">
                    {w.items.length} deliverables <span className="transition-transform duration-200 ease-out group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <ul className="mt-3 flex flex-col gap-2 text-[14px] leading-snug text-night/85">
                    {w.items.map((it) => (
                      <li key={it} className="flex gap-2.5"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-night" />{it}</li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
