import { useState } from "react";
import { ArrowRight, Building2, Check, Loader2, Lock, Users, Wallet } from "lucide-react";

const ROLES = [
  { id: "hr", label: "HR or compliance" },
  { id: "council", label: "Works council" },
  { id: "payroll", label: "Payroll provider" },
  { id: "employee", label: "Employee" },
  { id: "other", label: "Something else" },
];
const SIZES = ["<150", "150-249", "250-999", "1000+"];
const WHO = [
  { icon: Building2, head: "Employers", body: "Your 2027 report, proven from your payroll, in a form staff and regulators can check." },
  { icon: Users, head: "Works councils", body: "Check every payroll row without seeing names, before the report goes out." },
  { icon: Wallet, head: "Payroll providers", body: "Offer it to your clients: you commit the rows you already hold." },
];

/** Landing band: ask for a free pilot. Requests go to a private store (api/pilot.js); nothing is shown publicly. */
export function Pilot() {
  const [f, setF] = useState({ role: "hr", size: "250-999", org: "", name: "", email: "", country: "", note: "", consent: false, website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));

  const send = async () => {
    setState("sending"); setError(null);
    try {
      const res = await fetch("/api/pilot", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(f) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Could not send that; please try again.");
      setState("sent");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setState("idle");
    }
  };

  const input = "w-full rounded-lg border border-gold/15 bg-night-deep px-3.5 py-2.5 text-[14px] text-cream outline-none placeholder:text-sage/50 focus:border-gold/50";
  return (
    <section id="pilot" className="mx-2 mt-2 rounded-[28px] bg-night text-cream md:mx-3 md:mt-3">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="rounded-md bg-gold px-2 py-1 text-[12px] font-semibold text-night">Free pilots, 2026–27</span>
          <h2 className="display mt-4 text-4xl leading-[1.05] md:text-6xl">Run your first report with us.</h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-sage">
            The first reports are due in June 2027, on 2026 pay. We are looking for a few organisations to try Equilux on their
            own payroll export, in the browser, where nothing is uploaded, and to tell us what it would have to do, and cost, to be worth it.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {WHO.map((w) => (
              <li key={w.head} className="flex gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/12 text-gold"><w.icon size={18} /></span>
                <div><div className="text-[15px] font-medium text-cream">{w.head}</div><p className="mt-0.5 text-[14px] leading-relaxed text-sage">{w.body}</p></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-night-deep/60 p-5 ring-1 ring-gold/15 md:p-7">
          {state === "sent" ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 py-10" role="status">
              <span className="grid size-12 place-items-center rounded-full bg-gold text-night"><Check size={22} /></span>
              <h3 className="display text-3xl">Thank you.</h3>
              <p className="max-w-sm text-[15px] leading-relaxed text-sage">We have your request and will reply by email with a pilot plan.</p>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <fieldset>
                <legend className="text-[13px] font-medium text-sage">I am</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button key={r.id} type="button" onClick={() => setF((x) => ({ ...x, role: r.id }))} aria-pressed={f.role === r.id}
                      className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${f.role === r.id ? "bg-gold text-night" : "bg-cream/8 text-cream/85 hover:bg-cream/15"}`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-[13px] text-sage">Organisation<input required value={f.org} onChange={set("org")} className={`${input} mt-1.5`} autoComplete="organization" /></label>
                <label className="text-[13px] text-sage">Employees
                  <select value={f.size} onChange={set("size")} className={`${input} mt-1.5`}>{SIZES.map((s) => <option key={s} value={s}>{s.replace("-", " to ")}</option>)}</select>
                </label>
                <label className="text-[13px] text-sage">Your name<input value={f.name} onChange={set("name")} className={`${input} mt-1.5`} autoComplete="name" /></label>
                <label className="text-[13px] text-sage">Work email<input required type="email" value={f.email} onChange={set("email")} className={`${input} mt-1.5`} autoComplete="email" /></label>
              </div>
              <label className="text-[13px] text-sage">Country<input value={f.country} onChange={set("country")} className={`${input} mt-1.5`} autoComplete="country-name" /></label>
              <label className="text-[13px] text-sage">Anything we should know? (optional)<textarea value={f.note} onChange={set("note")} rows={3} className={`${input} mt-1.5 resize-y`} /></label>
              {/* honeypot: hidden from people, filled by bots */}
              <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} className="hidden" aria-hidden="true" />
              <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-sage">
                <input type="checkbox" checked={f.consent} onChange={(e) => setF((x) => ({ ...x, consent: e.target.checked }))} className="mt-1 accent-[#ffd85f]" />
                <span>Store this request so the Equilux team can reply to me. It is used for nothing else and deleted on request.</span>
              </label>
              {error && <p role="alert" className="text-[13px] text-red-200">{error}</p>}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-[12px] text-sage"><Lock size={12} className="text-gold" /> Never shown on this site</span>
                <button type="submit" disabled={state === "sending" || !f.consent}
                  className="group inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-[14px] font-semibold text-night transition-transform active:scale-[0.97] disabled:opacity-50">
                  {state === "sending" ? <Loader2 size={15} className="animate-spin" /> : null} Ask for a pilot
                  <ArrowRight size={15} className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
