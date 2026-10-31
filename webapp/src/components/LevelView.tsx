import type { LevelReportOnChain } from "../lib/api";
import { fmtPct } from "../lib/api";

/**
 * The gap inside equal job levels (contract v4): each level's women/men mix, its gap where both
 * groups have at least three people, and the level-adjusted gap. The mix is shown first on purpose:
 * a small gap inside levels says nothing about who gets promoted to which level.
 */
export function LevelView({ lrep, labels }: { lrep: LevelReportOnChain; labels?: string[] }) {
  const name = (i: number) => labels?.[i] || `Level ${i + 1}`;
  const max = Math.max(1, ...lrep.levels.map((l) => l.women + l.men));
  return (
    <div className="rounded-lg border border-gold/15 bg-night p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">Inside equal job levels</div>
        <div className="text-[13px] text-cream">
          {lrep.adjustedCovers > 0
            ? <>Level-adjusted gap <span className="font-semibold text-gold">{fmtPct(lrep.adjustedGapBps)}</span> {lrep.adjustedFavorsMen ? "favors men" : "favors women"} · over {lrep.adjustedCovers} people</>
            : <>No level has at least three women and three men: no level gap can be shown</>}
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {lrep.levels.map((l, i) => (l.women + l.men === 0 ? null : (
          <li key={i} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-[13px]">
            <span className="text-sage">{name(i)}</span>
            <span className="flex h-2.5 overflow-hidden rounded-full bg-cream/8" aria-label={`${l.women} women, ${l.men} men`}>
              <span className="h-full bg-gold" style={{ width: `${(l.women / max) * 100}%` }} />
              <span className="h-full bg-sage/70" style={{ width: `${(l.men / max) * 100}%` }} />
            </span>
            <span className="text-right tabular-nums text-cream">
              {l.women}W · {l.men}M{" "}
              <span className="text-sage">{l.disclosed ? `· ${fmtPct(l.gapBps)} ${l.gapFavorsMen ? "→ men" : "→ women"}` : "· too few to show"}</span>
            </span>
          </li>
        )))}
      </ul>
      <p className="mt-3 text-[12px] leading-relaxed text-sage">
        A small gap inside levels does not prove the levels themselves are fair: who reaches which level matters
        too, which is why each level's mix of women and men is published. Judging that stays with people.
      </p>
    </div>
  );
}
