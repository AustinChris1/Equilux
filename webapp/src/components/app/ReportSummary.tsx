import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Gift, Scale, ShieldCheck, Users } from "lucide-react";
import type { PayReportOnChain, VariablePayReportOnChain } from "../../lib/api";
import { fmtPct } from "../../lib/api";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Who earns less, in words anyone can read. */
function gapSentence(bps: number, favorsMen: boolean, where: string) {
  if (bps === 0) return { big: "0%", text: `No gap between women and men, ${where}` };
  return { big: fmtPct(bps), text: `less pay for ${favorsMen ? "women" : "men"}, ${where}` };
}

/** The published report, on the day ground: plain sentences over the proven figures. */
export function ReportSummary({ rep, vrep, categories }: { rep: PayReportOnChain; vrep: VariablePayReportOnChain | null; categories: string[] }) {
  const reduce = useReducedMotion();
  const mean = gapSentence(rep.meanGapBps, rep.gapFavorsMen, "on average");
  const median = gapSentence(rep.medianGapBps, rep.medianFavorsMen, "at the middle salary");
  const flagged = rep.categories
    .map((c, i) => ({ ...c, name: categories[i] ?? `Group ${i + 1}` }))
    .filter((c) => c.headcountWomen + c.headcountMen > 0);

  return (
    <motion.div className="relative overflow-hidden rounded-2xl bg-gold p-5 text-night md:p-7"
      initial={reduce ? false : { clipPath: "inset(100% 0 0 0 round 16px)" }} animate={{ clipPath: "inset(0% 0 0 0 round 16px)" }}
      transition={{ duration: 0.7, ease: EASE }}>
      <motion.span aria-hidden="true"
        className="absolute right-5 top-5 rounded-md border-2 border-night px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.16em]"
        initial={reduce ? false : { opacity: 0, transform: "rotate(-8deg) scale(1.5)" }} animate={{ opacity: 1, transform: "rotate(-8deg) scale(1)" }}
        transition={{ duration: 0.35, ease: EASE, delay: reduce ? 0 : 0.75 }}>
        proven
      </motion.span>

      <div className="grid gap-6 sm:grid-cols-2">
        {[mean, median].map((g, i) => (
          <div key={i}>
            <Scale size={22} className="text-night/70" />
            <div className="display mt-2 text-5xl leading-none md:text-6xl">{g.big}</div>
            <p className="mt-2 text-[15px] font-medium">{g.text}</p>
          </div>
        ))}
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {flagged.map((c) => (
          <li key={c.name} className="flex items-center gap-3 rounded-xl bg-night/8 px-3.5 py-2.5 text-[14px]">
            {!c.disclosed
              ? <Users size={17} className="shrink-0 text-night/60" />
              : c.gapAtOrAbove5pct ? <AlertTriangle size={17} className="shrink-0 text-[#9f0712]" /> : <ShieldCheck size={17} className="shrink-0 text-night/70" />}
            <span className="flex-1 font-medium">{c.name}</span>
            <span className={c.disclosed && c.gapAtOrAbove5pct ? "font-semibold text-[#9f0712]" : "text-night/75"}>
              {!c.disclosed ? "too few people to show" : `${fmtPct(c.meanGapBps)}${c.gapAtOrAbove5pct ? " · over 5%, must be checked" : ""}`}
            </span>
          </li>
        ))}
      </ul>

      {vrep && (
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-night/15 pt-4 text-[14px]">
          <span className="inline-flex items-center gap-2"><Gift size={17} className="text-night/70" />
            Bonus gap <strong className="font-semibold">{vrep.gapDefined ? fmtPct(vrep.meanGapBps) : "none"}</strong></span>
          <span>{vrep.recipientsWomen} of {vrep.headcountWomen} women and {vrep.recipientsMen} of {vrep.headcountMen} men get a bonus</span>
        </div>
      )}
    </motion.div>
  );
}
