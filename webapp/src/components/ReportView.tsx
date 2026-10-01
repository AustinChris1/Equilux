import type { PayReportOnChain, VariablePayReportOnChain } from "../lib/api";
import { motion } from "framer-motion";
import { fmtPct } from "../lib/api";

const pctOf = (a: number, b: number) => (b === 0 ? "—" : `${Math.round((a / b) * 100)}%`);

/** The published figures — all seven Article 9 indicators when both reports are on-chain. */
export function ReportView({ rep, vrep, categories }: { rep: PayReportOnChain; vrep: VariablePayReportOnChain | null; categories: string[] }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative rounded-lg border border-gold/25 bg-night p-4">
          <motion.span aria-hidden="true"
            className="absolute right-3 top-3 rounded border-[1.5px] border-gold px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-gold"
            initial={{ opacity: 0, transform: "rotate(-8deg) scale(1.4)" }} animate={{ opacity: 1, transform: "rotate(-8deg) scale(1)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}>
            proven
          </motion.span>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Mean gap</div>
          <div className="display mt-1 text-3xl text-cream">{fmtPct(rep.meanGapBps)}</div>
          <div className="font-mono text-[10px] text-sage">favors {rep.gapFavorsMen ? "men" : "women"}</div>
        </div>
        <div className="rounded-lg border border-gold/25 bg-night p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Median gap</div>
          <div className="display mt-1 text-3xl text-cream">{fmtPct(rep.medianGapBps)}</div>
          <div className="font-mono text-[10px] text-sage">favors {rep.medianFavorsMen ? "men" : "women"}</div>
        </div>
        <div className="rounded-lg border border-gold/25 bg-night p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Headcount</div>
          <div className="display mt-1 text-3xl text-cream">{rep.headcountWomen + rep.headcountMen}</div>
          <div className="font-mono text-[10px] text-sage">{rep.headcountWomen} women · {rep.headcountMen} men</div>
        </div>
      </div>

      {vrep && (
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-gold/15 bg-night p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Variable pay</div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
              <dt className="text-sage">Mean gap</dt>
              <dd className="font-mono text-cream">{vrep.gapDefined ? `${fmtPct(vrep.meanGapBps)} · favors ${vrep.meanFavorsMen ? "men" : "women"}` : "not defined"}</dd>
              <dt className="text-sage">Median gap</dt>
              <dd className="font-mono text-cream">{vrep.gapDefined ? `${fmtPct(vrep.medianGapBps)} · favors ${vrep.medianFavorsMen ? "men" : "women"}` : "not defined"}</dd>
              <dt className="text-sage">Receive it</dt>
              <dd className="font-mono text-cream">
                women {vrep.recipientsWomen}/{vrep.headcountWomen} ({pctOf(vrep.recipientsWomen, vrep.headcountWomen)}) · men {vrep.recipientsMen}/{vrep.headcountMen} ({pctOf(vrep.recipientsMen, vrep.headcountMen)})
              </dd>
            </dl>
          </div>
          <div className="rounded-lg border border-gold/15 bg-night p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage">Pay quartiles · women and men</div>
            <ol className="mt-3 flex flex-col-reverse gap-2">
              {vrep.quartiles.map((q, i) => {
                const total = q.women + q.men || 1;
                return (
                  <li key={i} className="grid grid-cols-[4.5rem_1fr_3.5rem] items-center gap-3 font-mono text-[11px]">
                    <span className="text-sage">{["Lower", "Lower mid", "Upper mid", "Upper"][i]}</span>
                    <span className="flex h-2.5 overflow-hidden rounded-full bg-cream/8" role="img" aria-label={`${q.women} women, ${q.men} men`}>
                      <span className="bg-gold" style={{ width: `${(q.women / total) * 100}%` }} />
                      <span className="bg-sage/60" style={{ width: `${(q.men / total) * 100}%` }} />
                    </span>
                    <span className="text-right text-cream tabular-nums">{q.women}W {q.men}M</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-2 font-mono text-[10px] text-sage/70">By total pay, basic plus variable. <span className="text-gold">■</span> women · <span className="text-sage">■</span> men</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gold/15">
        <table className="w-full min-w-130 text-left font-mono text-[12px]">
          <thead className="bg-cream/5 text-[10px] uppercase tracking-[0.14em] text-sage">
            <tr><th className="px-3 py-2">Worker category</th><th className="px-3 py-2">W / M</th><th className="px-3 py-2">Mean pay W · M</th><th className="px-3 py-2">Gap</th><th className="px-3 py-2"></th>{vrep && <th className="px-3 py-2">Variable-pay gap</th>}</tr>
          </thead>
          <tbody>
            {rep.categories.map((c, i) => (c.headcountWomen + c.headcountMen === 0 ? null : (
              <tr key={i} className="border-t border-gold/8 text-cream">
                <td className="px-3 py-2.5">{categories[i]}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-sage">{c.headcountWomen} / {c.headcountMen}</td>
                {c.disclosed ? (
                  <>
                    <td className="px-3 py-2.5">€{c.meanWomen.toLocaleString()} · €{c.meanMen.toLocaleString()}</td>
                    <td className="px-3 py-2.5">{fmtPct(c.meanGapBps)}</td>
                    <td className="px-3 py-2.5">{c.gapAtOrAbove5pct
                      ? <span className="chip bg-red-950/50 text-red-200">≥ 5% · assess</span>
                      : <span className="chip bg-gold/10 text-gold">&lt; 5%</span>}</td>
                  </>
                ) : (
                  <td colSpan={3} className="px-3 py-2.5 text-sage/70">suppressed — fewer than 3 in a group, so no one's pay can be inferred</td>
                )}
                {vrep && (
                  <td className="whitespace-nowrap px-3 py-2.5">
                    {vrep.categories[i].disclosed
                      ? fmtPct(vrep.categories[i].meanGapBps)
                      : <span className="text-sage/70" title="fewer than 3 recipients in a group">suppressed · {vrep.categories[i].recipientsWomen}W/{vrep.categories[i].recipientsMen}M</span>}
                  </td>
                )}
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </>
  );
}
