import { LockKeyhole, Receipt, ShieldCheck, EyeOff } from "lucide-react";
import { Reveal } from "./Reveal";

const guarantees = [
  {
    icon: LockKeyhole,
    n: "01",
    title: "Roster integrity",
    body: "The reporting set is committed before the report exists. Omitting the lowest-paid team after the fact is cryptographically impossible, not just against the rules.",
  },
  {
    icon: Receipt,
    n: "02",
    title: "Inclusion receipts",
    body: "Every worker holds a private receipt proving their record was counted — without revealing their salary, role or identity to anyone. Not even to Equilux.",
  },
  {
    icon: ShieldCheck,
    n: "03",
    title: "Proven statistics",
    body: "The published gaps and quartiles carry a zero-knowledge proof that they were computed, correctly, from the committed payroll. A regulator verifies instead of auditing.",
  },
  {
    icon: EyeOff,
    n: "04",
    title: "Cohort-safe queries",
    body: "Employees get their legal right to category-level pay data — behind a minimum cohort threshold, so a three-person team can never be used to reverse a colleague's salary.",
  },
];

export function Guarantees() {
  return (
    <section id="guarantees" className="grain relative mx-2 mt-2 rounded-[28px] bg-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-gold">Four cryptographic guarantees</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] text-cream md:text-6xl">
            Trust neither side. <span className="text-gold">Verify both.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {guarantees.map((g, i) => (
            <Reveal key={g.n} delay={0.08 * i} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-gold/15 p-7 transition-colors hover:border-gold/40 md:p-8">
                <div className="flex items-center justify-between">
                  <g.icon size={24} className="text-gold" strokeWidth={1.6} />
                  <span className="font-mono text-xs tracking-[0.2em] text-sage">GUARANTEE {g.n}</span>
                </div>
                <h3 className="display mt-6 text-2xl text-cream md:text-3xl">{g.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-sage">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
