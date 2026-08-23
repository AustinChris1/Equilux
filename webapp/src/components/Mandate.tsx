import { Reveal } from "./Reveal";

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
    <section id="mandate" className="mx-2 mt-2 rounded-[28px] bg-gold text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-night/70">The mandate · Directive (EU) 2023/970</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            The law now demands a number companies cannot prove.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-night/75">
            The EU Pay Transparency Directive makes gender pay gap reporting mandatory across the Union — and gives
            every employee the right to ask what their category earns. But the report is a spreadsheet the employer
            fills in alone. Nobody can verify it without seeing everyone's salary. That is the exact gap between
            <span className="font-medium"> trust me</span> and <span className="font-medium">prove it</span> that
            zero-knowledge was invented for.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.stat} delay={0.1 * i} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-night/15 p-6">
                <div className="display text-4xl md:text-5xl">{f.stat}</div>
                <p className="mt-4 text-[15px] leading-relaxed text-night/75">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
