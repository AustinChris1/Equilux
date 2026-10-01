import { Check, Minus } from "lucide-react";

const ROLES = [
  { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop", who: "Employer", does: "Files a report no one can dispute" },
  { img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop", who: "Employee", does: "Proves they were counted" },
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop", who: "Regulator", does: "Verifies in seconds, not audits" },
];

const COLS = ["Public", "Colleagues", "Regulator", "Employer HR", "Equilux"];
const ROWS: { what: string; sees: boolean[]; note?: string }[] = [
  { what: "Any individual salary", sees: [false, false, false, true, false], note: "HR runs payroll, so it already holds salaries." },
  { what: "All seven Article 9 figures", sees: [true, true, true, true, true] },
  { what: "Category pay by gender (Art. 7)", sees: [true, true, true, true, true], note: "Only for groups of three or more." },
  { what: "That you were counted", sees: [false, false, false, false, false], note: "Only you, with your Merkle receipt." },
];

export function WhoSees() {
  return (
    <section id="who-sees" className="mx-2 mt-2 rounded-[28px] bg-paper text-night md:mx-3 md:mt-3">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="display max-w-3xl text-4xl leading-[1.05] md:text-6xl">Who sees what.</h2>

        <div className="mt-10 grid grid-cols-3 gap-3">
          {ROLES.map((r) => (
            <figure key={r.who} className="group relative overflow-hidden rounded-2xl">
              <div className="duotone aspect-[4/3] w-full">
                <img src={r.img} alt="" loading="lazy" className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night/90 to-transparent p-3 md:p-4">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-gold">{r.who}</span>
                <span className="hidden text-[14px] text-cream sm:block">{r.does}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl bg-cream/60 ring-1 ring-night/10">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="text-[12px] font-semibold text-night/75">
                <th className="px-4 py-3 font-medium" />
                {COLS.map((c) => <th key={c} className="px-3 py-3 text-center font-medium">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.what} className="border-t border-night/8">
                  <th className="px-4 py-3.5 text-[14px] font-medium">
                    {r.what}
                    {r.note && <span className="mt-0.5 block text-[12px] font-normal text-night/75">{r.note}</span>}
                  </th>
                  {r.sees.map((s, i) => (
                    <td key={i} className="px-3 py-3.5 text-center">
                      {s
                        ? <span className="inline-grid size-7 place-items-center rounded-full bg-night text-gold"><Check size={14} aria-label="sees" /></span>
                        : <span className="inline-grid size-7 place-items-center rounded-full bg-night/6 text-night/35"><Minus size={14} aria-label="does not see" /></span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
