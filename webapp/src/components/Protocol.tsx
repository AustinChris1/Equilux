import { Users, PenLine, Sigma, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: Users,
    title: "Commit the roster",
    body: "Before the reporting period closes, the payroll provider or worker representatives commit a roster root on Midnight. From that moment, the employer cannot quietly omit an inconvenient employee from the report.",
    tag: "Public state · roster root",
  },
  {
    icon: PenLine,
    title: "Co-sign every salary",
    body: "Each pay record — salary and gender marker — becomes a private commitment co-signed by employee and employer. No invented records, no cherry-picking; nullifiers stop anyone being counted twice.",
    tag: "Private state · sealed records",
  },
  {
    icon: Sigma,
    title: "Prove the report in-circuit",
    body: "A Compact contract computes the mean pay gap inside the zero-knowledge circuit, over the committed dataset and nothing else — no division, just cross-multiplied bounds the prover cannot fake. Median, quartiles and per-category gaps are Wave 2.",
    tag: "Compact contract · ZK circuit",
  },
  {
    icon: BadgeCheck,
    title: "Verify, don't audit",
    body: "The chain publishes only the aggregates and a proof they are honest. The regulator verifies in seconds. Every employee holds a private receipt proving their record was inside the numbers.",
    tag: "Public state · proof + aggregates",
  },
];

export function Protocol() {
  return (
    <section id="protocol" className="mx-2 mt-2 rounded-[28px] bg-paper text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-moss">The protocol · four moves</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Both sides sign. The circuit does the math. Everyone can check.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}>
              <div className="grid gap-5 border-t border-night/10 py-10 md:grid-cols-[80px_1fr_1.4fr_auto] md:items-start md:gap-8">
                <div className="font-mono text-sm text-gold-dim">0{i + 1}</div>
                <div className="flex items-center gap-3">
                  <s.icon size={22} className="shrink-0 text-gold-deep" strokeWidth={1.75} />
                  <h3 className="display text-2xl md:text-3xl">{s.title}</h3>
                </div>
                <p className="max-w-xl text-[15px] leading-relaxed text-moss">{s.body}</p>
                <div className="chip self-start bg-night/5 text-moss/90">{s.tag}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-moss/80">
            Midnight's dual-ledger model is the whole trick: salaries live in private state and never leave it;
            the roster root, the aggregates and the proof live in public state where anyone can verify them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
