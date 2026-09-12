import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const proves = [
  "The published gap was computed from every enrolled, employer-attested record — not a convenient subset.",
  "No record was invented: each carries an employee-held secret and an employer attestation.",
  "Nobody was counted twice — enrollment nullifiers make duplicates unprovable.",
  "The disclosed figure is exact. The circuit accepts one value and rejects every other, including one basis point off.",
  "Each employee can verify their own record was inside the numbers, without seeing anyone else's.",
];

const doesNot = [
  {
    head: "The employer already has the payroll",
    body: "It must, to run payroll at all. Equilux hides salaries from the public, from colleagues, from the regulator and from us — not from HR. Wave 3 moves attestation to the payroll provider so HR never assembles the full table.",
  },
  {
    head: "This is not yet the Article 10 trigger",
    body: "Our 5% flag is the company-wide mean. The Directive's trigger is an unjustified gap within a category of workers — categories arrive in Wave 2, and the ledger field is named for what it actually measures.",
  },
  {
    head: "One of Article 9's seven metrics",
    body: "The full return also requires median gaps, variable-pay gaps, the share receiving variable pay, and quartile composition. Wave 1 proves the mean.",
  },
  {
    head: "A sized instance, not a production deployment",
    body: "This build fixes 32 commitment slots and a 16-record witness — right for a demo company, not a 250-person employer. Sizing is a compile-time parameter per company band.",
  },
  {
    head: "Binary gender markers",
    body: "As the Directive's reporting annex is written today. That is a reporting category, not a claim about identity.",
  },
];

export function Scope() {
  return (
    <section id="scope" className="mx-2 mt-2 rounded-[28px] bg-paper text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-moss">Threat model · scope</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Honest about what a proof can prove.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-moss">
            A compliance tool that overstates itself is worse than none — the first auditor who
            reads the circuit would find the gap. So here is the boundary, drawn precisely.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dim">
              What the circuit proves
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {proves.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-night/80">
                  <Check size={17} className="mt-0.5 shrink-0 text-gold-deep" strokeWidth={2.2} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-moss/70">
              What it does not claim
            </h3>
            <ul className="mt-5 flex flex-col gap-5">
              {doesNot.map((d) => (
                <li key={d.head} className="flex gap-3">
                  <Minus size={17} className="mt-0.5 shrink-0 text-moss/50" strokeWidth={2.2} />
                  <div>
                    <div className="text-[15px] font-medium text-night">{d.head}</div>
                    <p className="mt-1 text-[14px] leading-relaxed text-moss">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
