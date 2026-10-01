import { Check, Minus, Plus } from "lucide-react";

const proves = [
  { head: "Nobody left out", body: "The report covers exactly the payroll rows the provider committed before anyone enrolled — no one can be left out, not even by never enrolling." },
  { head: "The council saw every row", body: "The works council opened every committed payroll row before enrollment began, so the provider cannot slip in a row the council has not seen." },
  { head: "Every salary is payroll's", body: "Every counted salary is the payroll provider's own figure, confirmed by the employee it belongs to: the employer cannot invent a person or change anyone's pay, and no employee can inflate their own." },
  { head: "Nobody counted twice", body: "Nobody was counted twice — enrollment nullifiers make duplicates unprovable." },
  { head: "Every figure is exact", body: "All seven Article 9 indicators are exact: mean and median gaps on basic and on variable pay, who receives variable pay, the gender mix of each pay quartile, and every category's gap. The circuit accepts one value and rejects every other, including one basis point off." },
  { head: "No small-group leaks", body: "No category's pay is published unless both groups have at least three people, so no colleague's salary can be worked out." },
  { head: "You can check you were counted", body: "Each employee can verify their own record was inside the numbers, without seeing anyone else's." },
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

function Item({ head, body, ok }: { head: string; body: string; ok: boolean }) {
  return (
    <details className="group border-t border-night/10 py-1 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-2.5 text-[15px] font-medium text-night">
        {ok
          ? <span className="grid size-6 shrink-0 place-items-center rounded-full bg-night text-gold"><Check size={13} strokeWidth={2.4} /></span>
          : <span className="grid size-6 shrink-0 place-items-center rounded-full bg-night/8 text-night/45"><Minus size={13} strokeWidth={2.4} /></span>}
        <span className="flex-1">{head}</span>
        <Plus size={15} className="shrink-0 text-night/40 transition-transform duration-200 ease-out group-open:rotate-45" aria-hidden="true" />
      </summary>
      <p className="pb-3 pl-9 text-[14px] leading-relaxed text-moss">{body}</p>
    </details>
  );
}

export function Scope() {
  return (
    <section id="scope" className="mx-2 mt-2 rounded-[28px] bg-paper text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">Honest about what a proof can prove.</h2>
        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          <div>
            <h3 className="display text-xl">What the circuit proves</h3>
            <div className="mt-4">{proves.map((p) => <Item key={p.head} head={p.head} body={p.body} ok />)}</div>
          </div>
          <div>
            <h3 className="display text-xl">What it does not claim</h3>
            <div className="mt-4">{doesNot.map((d) => <Item key={d.head} head={d.head} body={d.body} ok={false} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
