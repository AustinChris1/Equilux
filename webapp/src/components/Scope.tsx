import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const proves = [
  "The report covers exactly the headcount the payroll provider declared before anyone enrolled — no one can be left out, not even by never enrolling.",
  "No record was invented: each carries an employee-held secret and an attestation from the payroll provider — never from the employer itself.",
  "Nobody was counted twice — enrollment nullifiers make duplicates unprovable.",
  "Every disclosed figure — mean gap, median gap, each category's pay and gap — is exact. The circuit accepts one value and rejects every other, including one basis point off.",
  "No category's pay is published unless both groups have at least three people, so no colleague's salary can be worked out.",
  "Each employee can verify their own record was inside the numbers, without seeing anyone else's.",
];

const doesNot = [
  {
    head: "The employer already has the payroll",
    body: "It must, to run payroll at all. Equilux hides salaries from the public, from colleagues, from the regulator and from us — not from HR. What changed in Wave 2: the employer can no longer vouch for its own data; the payroll provider does.",
  },
  {
    head: "The roster is only as honest as the payroll provider",
    body: "The provider declares the headcount from its payroll system. A provider colluding with the employer could under-declare it. Separating the two parties is the point — a works-council co-signature on the roster is the next step.",
  },
  {
    head: "It does not decide what is justified",
    body: "Article 10 triggers a joint pay assessment when a category gap of 5% or more is also unjustified by objective, gender-neutral criteria. The circuit proves the gap and flags ≥ 5%; justification is a human judgement it does not make.",
  },
  {
    head: "Three of Article 9's seven indicators",
    body: "Proven today: the mean gap, the median gap, and the gap by worker category on basic pay. Still to come: variable-pay gaps (mean and median), the share receiving variable pay, and quartile composition.",
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
