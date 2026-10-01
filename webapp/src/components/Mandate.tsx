
const facts = [
  {
    stat: "7 June 2027",
    body: "First pay-gap reports are due from every EU employer with 250+ people — computed from 2026 pay data. Employers of 150+ follow on the same date.",
  },
  {
    stat: "5%",
    body: "An unexplained gap of five percent or more in any worker category forces a joint pay assessment with worker representatives.",
  },
  {
    stat: "0",
    body: "Ways, today, for an employee or regulator to check the published numbers came from the real, complete payroll. Reports are self-declared.",
  },
];

export function Mandate() {
  return (
    <section id="mandate" className="mx-2 mt-2 rounded-[28px] bg-night text-cream md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">
          The law now demands a number <span className="text-gold">companies cannot prove.</span>
        </h2>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-sage">Directive (EU) 2023/970 · EU Pay Transparency</p>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {facts.map((f) => (
            <div key={f.stat} className="flex flex-col rounded-2xl bg-cream/[0.05] p-6 ring-1 ring-gold/12">
              <div className="display text-5xl text-gold md:text-6xl">{f.stat}</div>
              <p className="mt-4 text-[14px] leading-relaxed text-sage">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
