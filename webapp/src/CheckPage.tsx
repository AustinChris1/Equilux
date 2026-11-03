import { useEffect, useState } from "react";
import { BadgeCheck, CircleAlert, CircleDashed, CircleX, ClipboardCheck, FileCheck2, Loader2, Lock, Search, UserCheck, Users } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { ConfirmCard } from "./components/ConfirmCard";
import { fmtPct } from "./lib/api";
import { track } from "./lib/track";
import { checkEmployee, PREPROD_SAMPLE_CONTRACT, toBytes32, type EmployeeCheck, type PayslipRecord } from "./lib/employee-check";

/** What a payslip link carries, after the #: never sent to any server. */
interface Form { contract: string; salary: string; variable: string; gender: "0" | "1"; category: string; level: string; nonce: string; secret: string }

// p004 of the Wave 3 preprod run (contract/preprod/run-v4.ts): a woman in category 1, level 1
const SAMPLE: Form = {
  contract: PREPROD_SAMPLE_CONTRACT, salary: "61400", variable: "3450", gender: "0", category: "1", level: "1",
  nonce: "preprod-v4-payslip:p004", secret: "preprod-v4:p004",
};
const EMPTY: Form = { contract: PREPROD_SAMPLE_CONTRACT, salary: "", variable: "0", gender: "0", category: "1", level: "1", nonce: "", secret: "" };

const fromHash = (): Form | null => {
  const h = new URLSearchParams(location.hash.slice(1));
  if (!h.get("s")) return null;
  return {
    contract: new URLSearchParams(location.search).get("contract") ?? PREPROD_SAMPLE_CONTRACT,
    salary: h.get("s") ?? "", variable: h.get("v") ?? "0", gender: h.get("g") === "1" ? "1" : "0",
    category: String(Number(h.get("c") ?? 0) + 1), level: String(Number(h.get("l") ?? 0) + 1),
    nonce: h.get("n") ?? "", secret: h.get("k") ?? "",
  };
};

/** The link a payroll portal would put on a payslip (exported for the app's employee step). */
export const payslipLink = (contract: string, r: PayslipRecord, nonce: string, secret?: string) =>
  `/check?contract=${contract}#s=${r.salary}&v=${r.variable}&g=${r.gender}&c=${r.category}&l=${r.level}&n=${encodeURIComponent(nonce)}${secret ? `&k=${encodeURIComponent(secret)}` : ""}`;

const euro = (n: number) => `€${n.toLocaleString("en-US")}`;

/** /check — an employee checks their own record against the chain, with no wallet and no fee. */
export default function CheckPage() {
  const [form, setForm] = useState<Form>(() => fromHash() ?? EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmployeeCheck | null>(null);
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => { document.title = "Check your record · Equilux"; }, []);

  const check = async (f = form) => {
    setBusy(true); setError(null); setResult(null);
    try {
      const salary = Number(f.salary), variable = Number(f.variable || 0);
      if (!Number.isInteger(salary) || salary <= 0) throw new Error("Enter your annual base salary as on your payslip, in whole euros.");
      if (!f.nonce.trim()) throw new Error("Enter the payroll code printed on your payslip.");
      const rec: PayslipRecord = { salary, variable, gender: f.gender === "1" ? 1 : 0, category: Number(f.category) - 1, level: Number(f.level) - 1 };
      setResult(await checkEmployee("preprod", f.contract, rec, toBytes32(f.nonce), f.secret.trim() ? toBytes32(f.secret) : undefined));
      track("check");
      // the details stay out of the address bar once checked
      history.replaceState(null, "", `/check?contract=${f.contract}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  // a payslip link checks straight away
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (fromHash()) check(); }, []);

  const trySample = () => { setForm(SAMPLE); check(SAMPLE); };

  const steps = result ? [
    { icon: FileCheck2, ok: result.rowCommitted, title: "The payroll provider committed your row",
      body: result.rowCommitted ? "Your pay, exactly as on your payslip, is one of the sealed rows on the chain." : "No sealed row matches these details. Check them against your payslip; if they match, the report left you out: raise it with the works council." },
    { icon: Users, ok: result.councilOpened, title: "The works council checked it",
      body: result.councilOpened ? "The council opened your row against the payroll before anyone could enroll." : "The council has not opened this row." },
    { icon: UserCheck, ok: result.enrolled, title: "You confirmed it",
      body: result.enrolled == null ? "Add your own secret below to check this step." : result.enrolled ? "Your sealed record is the one bound to your row." : "No record of yours is bound to a row: you have not enrolled, or a detail differs." },
    ...(["pay", "variable", "levels"] as const).map((k) => ({
      icon: ClipboardCheck,
      ok: result.counted ? result.counted[k] != null : null,
      title: `Counted in the ${k === "pay" ? "pay-gap report" : k === "variable" ? "variable-pay report" : "job-level report"}`,
      body: !result.counted ? "Needs your secret, like the step above." : result.counted[k] != null ? `Your record is inside report #${result.counted[k]} on this contract, once.` : "Not counted in a published report of this kind.",
    })),
  ] : [];

  const input = "min-w-0 rounded-md border border-gold/15 bg-night-deep px-3 py-2 text-[13px] text-cream outline-none placeholder:text-sage/50 focus:border-gold/50";
  return (
    <div className="min-h-dvh bg-night-deep">
      <AppHeader current="check" />
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 md:px-6 md:pt-8">
        <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-cream">Check your own record</h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-sage">
          From your payslip: was your pay in the report, exactly once? <span className="text-cream">No wallet, no fee.</span> This page
          recomputes your sealed codes with the compiled contract and looks them up in the contract's public state.
        </p>
        <p className="mt-2 inline-flex items-center gap-2 text-[12px] text-sage"><Lock size={12} className="text-gold" /> Your details never leave this page; it only downloads public data.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button onClick={trySample} disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[13px] font-semibold text-night transition-transform hover:-translate-y-0.5 disabled:opacity-50">
            <BadgeCheck size={14} /> Try an employee from the testnet run
          </button>
          <span className="text-[13px] text-sage">one of the 32 people of the Wave 3 report on Midnight preprod</span>
        </div>

        <form className="mt-5 grid gap-3 rounded-2xl bg-night p-4 ring-1 ring-gold/12 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(e) => { e.preventDefault(); check(); }}>
          <label className="flex flex-col gap-1 text-[12px] text-sage">Annual base salary (€)<input inputMode="numeric" value={form.salary} onChange={set("salary")} className={input} placeholder="61400" /></label>
          <label className="flex flex-col gap-1 text-[12px] text-sage">Variable pay (€)<input inputMode="numeric" value={form.variable} onChange={set("variable")} className={input} /></label>
          <label className="flex flex-col gap-1 text-[12px] text-sage">Reported as
            <select value={form.gender} onChange={set("gender")} className={input}><option value="0">Woman</option><option value="1">Man</option></select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1 text-[12px] text-sage">Category
              <select value={form.category} onChange={set("category")} className={input}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select>
            </label>
            <label className="flex flex-col gap-1 text-[12px] text-sage">Job level
              <select value={form.level} onChange={set("level")} className={input}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select>
            </label>
          </div>
          <label className="flex flex-col gap-1 text-[12px] text-sage sm:col-span-2">Payroll code (on your payslip)<input value={form.nonce} onChange={set("nonce")} className={`${input} font-mono`} spellCheck={false} /></label>
          <label className="flex flex-col gap-1 text-[12px] text-sage sm:col-span-2">Your secret (optional: checks that you enrolled and were counted)<input type="password" value={form.secret} onChange={set("secret")} className={`${input} font-mono`} spellCheck={false} autoComplete="off" /></label>
          <label className="flex flex-col gap-1 text-[12px] text-sage sm:col-span-2 lg:col-span-3">Report contract (Midnight preprod)<input value={form.contract} onChange={set("contract")} className={`${input} font-mono text-[11px]`} spellCheck={false} /></label>
          <button type="submit" disabled={busy}
            className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-cream/90 px-4 py-2 text-[13px] font-semibold text-night transition-transform hover:-translate-y-0.5 disabled:opacity-50">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />} Check
          </button>
        </form>

        {error && (
          <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-lg bg-red-950/30 p-3.5 text-[13px] text-red-200 ring-1 ring-red-400/30">
            <CircleAlert size={16} className="mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {result && result.rowCommitted && result.councilOpened && !result.rowClaimed && (
          <ConfirmCard contract={form.contract} nonce={form.nonce}
            record={{ salary: Number(form.salary), variable: Number(form.variable || 0), gender: form.gender === "1" ? 1 : 0, category: Number(form.category) - 1, level: Number(form.level) - 1 }}
            onConfirmed={(secretHex) => { const f = { ...form, secret: secretHex }; setForm(f); setTimeout(() => check(f), 4000); }} />
        )}

        {result && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <section aria-labelledby="journey" className="rounded-2xl bg-night p-5 ring-1 ring-gold/12">
              <h2 id="journey" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">Your record, step by step</h2>
              <ol className="mt-4 flex flex-col">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-3.5 pb-5 last:pb-0">
                    {i < steps.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-gold/15" aria-hidden="true" />}
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${s.ok ? "bg-gold text-night" : s.ok === false ? "bg-red-950/50 text-red-200" : "bg-cream/8 text-sage"}`}>
                      {s.ok ? <s.icon size={15} /> : s.ok === false ? <CircleX size={15} /> : <CircleDashed size={15} />}
                    </span>
                    <div>
                      <div className={`text-[14px] font-medium ${s.ok ? "text-cream" : "text-sage"}`}>{s.title}</div>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-sage">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="peers" className="flex flex-col gap-4">
              <h2 id="peers" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">What people like you earn</h2>
              <div className="rounded-2xl bg-night p-5 ring-1 ring-gold/12">
                <div className="text-[13px] text-sage">Your category ({form.category}), on average · Article 7</div>
                {result.category?.disclosed ? (
                  <>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div><div className="display text-2xl text-cream">{euro(result.category.meanWomen)}</div><div className="text-[12px] text-sage">women · {result.category.women}</div></div>
                      <div><div className="display text-2xl text-cream">{euro(result.category.meanMen)}</div><div className="text-[12px] text-sage">men · {result.category.men}</div></div>
                    </div>
                    <div className="mt-3 text-[13px] text-cream">
                      Gap <span className="font-semibold text-gold">{fmtPct(result.category.gapBps)}</span> {result.category.favorsMen ? "favors men" : "favors women"}
                      {result.category.flagged && <span className="ml-2 rounded bg-gold/15 px-1.5 py-0.5 text-[11px] text-gold">≥ 5%: to be assessed</span>}
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-[13px] text-sage">{result.category ? `Too few people to show pay (${result.category.women} women, ${result.category.men} men): fewer than 3 in a group.` : "No pay-gap report published yet."}</p>
                )}
              </div>
              <div className="rounded-2xl bg-night p-5 ring-1 ring-gold/12">
                <div className="text-[13px] text-sage">Your job level ({form.level})</div>
                {result.level ? (
                  <>
                    <div className="mt-2 text-[14px] text-cream">{result.level.women} women · {result.level.men} men</div>
                    <div className="mt-1 text-[13px] text-sage">
                      {result.level.disclosed ? <>Gap inside the level <span className="font-semibold text-gold">{fmtPct(result.level.gapBps)}</span> {result.level.favorsMen ? "favors men" : "favors women"}</> : "Too few people to show a gap"}
                    </div>
                  </>
                ) : <p className="mt-2 text-[13px] text-sage">No job-level report published yet.</p>}
              </div>
              <a href={`/verify?network=preprod&contract=${form.contract}`} className="text-[13px] text-gold hover:underline">See the whole report →</a>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
