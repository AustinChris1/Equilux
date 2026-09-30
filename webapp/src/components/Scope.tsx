import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const proves = [
  "The report covers exactly the payroll rows the provider committed before anyone enrolled — no one can be left out, not even by never enrolling.",
  "The works council opened every committed payroll row before enrollment began, so the provider cannot slip in a row the council has not seen.",
  "Every counted salary is the payroll provider's own figure, confirmed by the employee it belongs to: the employer cannot invent a person or change anyone's pay, and no employee can inflate their own.",
  "Nobody was counted twice — enrollment nullifiers make duplicates unprovable.",
  "All seven Article 9 indicators are exact: mean and median gaps on basic and on variable pay, who receives variable pay, the gender mix of each pay quartile, and every category's gap. The circuit accepts one value and rejects every other, including one basis point off.",
  "No category's pay is published unless both groups have at least three people, so no colleague's salary can be worked out.",
  "Each employee can verify their own record was inside the numbers, without seeing anyone else's.",
];

const doesNot = [
  {
    head: "The employer already has the payroll",
    body: "It must, to run payroll at all. Equilux hides salaries from the public, from colleagues, from the regulator and from us — not from HR. What changed in Wave 2: every counted salary is bound to the payroll provider's row, so the employer can no longer supply its own figures.",
  },
  {
    head: "The payroll is only as honest as the provider and the council",
    body: "A payroll provider and works council both colluding with the employer could commit false rows or leave someone off payroll. The two are separate parties with separate keys, and each employee enrolls against their own row, so a wrong salary is visible to the person it belongs to.",
  },
  {
    head: "It does not decide what is justified",
    body: "Article 10 triggers a joint pay assessment when a category gap of 5% or more is also unjustified by objective, gender-neutral criteria. The circuit proves the gap and flags ≥ 5%; justification is a human judgement it does not make.",
  },
  {
    head: "Annual pay, and one reading of the quartiles",
    body: "All seven Article 9 indicators are proven, on annual basic and variable pay. Variable-pay gaps are measured among the people who receive it. National transpositions may define pay (hourly rates, allowances) or tied earners at a quartile boundary differently; the circuit uses annual figures and lets the employer place ties.",
  },
  {
    head: "A sized instance, not a production deployment",
    body: "This build fixes a 16-record witness, 32 commitment slots and 4 worker categories — right for a demo company, not a 250-person employer. Sizing is a compile-time parameter per company band.",
  },
  {
    head: "Not yet on the public testnet",
    body: "Proven end to end on a local Midnight network. Midnight's current wallet SDK fails while syncing the public preprod chain (a WebAssembly error inside the SDK); deployment follows its fix.",
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
