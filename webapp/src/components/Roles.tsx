import { Reveal } from "./Reveal";

const roles = [
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    alt: "Documents and charts spread across a desk",
    who: "For the employer",
    title: "File a report no one can dispute",
    body: "The CPO publishes the mandated report with a proof attached — and never hands the raw payroll to an auditor, a vendor, or a spreadsheet that leaks.",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    alt: "Colleagues working together around a laptop",
    who: "For every employee",
    title: "Check you were counted",
    body: "A wallet holds your inclusion receipt and answers one question the law now lets you ask — what does my category earn? — without exposing you or anyone else.",
  },
  {
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    alt: "A fountain pen resting on signed documents",
    who: "For the regulator",
    title: "Verify in seconds, not audits",
    body: "One proof replaces a payroll subpoena. The enforcement body checks validity on-chain and sees the 5% flag the moment a category gap demands action.",
  },
];

export function Roles() {
  return (
    <section className="mx-2 mt-2 rounded-[28px] bg-cream text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="overline text-moss">One proof · three readers</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Three dashboards, one truth.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {roles.map((r, i) => (
            <Reveal key={r.who} delay={0.1 * i} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-night/10 bg-paper">
                <div className="duotone h-52">
                  <img src={r.img} alt={r.alt} loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dim">{r.who}</div>
                  <h3 className="display mt-3 text-2xl">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-moss">{r.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
