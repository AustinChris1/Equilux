import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpDown, Coins, Equal, EyeOff, Ghost, Gift, Loader2, Lock, ScanEye, Shuffle, TrendingDown, UserMinus, Euro } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

export type CheatId = "omit" | "pay" | "mean" | "median" | "category" | "vmean" | "vmedian" | "bands" | "inflate" | "ghost" | "skip";
export type CheatResult = { state: "running" } | { state: "rejected"; message: string } | { state: "accepted" };

export interface Cheat { id: CheatId; title: string; why: string; locked: string | null }

const ICONS: Record<CheatId, typeof Ghost> = {
  omit: UserMinus, pay: TrendingDown, mean: Equal, median: ArrowUpDown, category: EyeOff,
  vmean: Gift, vmedian: Coins, bands: Shuffle, inflate: Euro, ghost: Ghost, skip: ScanEye,
};

/** Every trick a dishonest party might try, each sent to the real contract code, each refused. */
export function CheatBoard({ cheats, results, onTry, busy }: { cheats: Cheat[]; results: Partial<Record<CheatId, CheatResult>>; onTry: (id: CheatId) => void; busy: boolean }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cheats.map((c) => {
        const Icon = ICONS[c.id];
        const r = results[c.id];
        const rejected = r?.state === "rejected";
        return (
          <li key={c.id}>
            <motion.button onClick={() => onTry(c.id)} disabled={busy || !!c.locked || r?.state === "running"}
              variants={{ rest: { transform: "translateX(0px)" }, knock: { transform: ["translateX(0px)", "translateX(-9px)", "translateX(7px)", "translateX(-3px)", "translateX(0px)"] } }}
              initial={false} animate={rejected && !reduce ? "knock" : "rest"} transition={{ duration: 0.32, ease: EASE }}
              className={`relative flex h-full min-h-[132px] w-full flex-col overflow-hidden rounded-xl p-4 text-left ring-1 transition-[background-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                rejected ? "bg-[#460809]/45 ring-[#ff6467]/45" : c.locked ? "bg-cream/[0.03] ring-gold/8" : "bg-cream/6 ring-gold/12 hover:bg-cream/10 hover:ring-gold/35"}`}>
              <span className="flex items-center gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${rejected ? "bg-[#ff6467]/20 text-[#ffa2a2]" : c.locked ? "bg-cream/6 text-sage/60" : "bg-gold/15 text-gold"}`}>
                  {r?.state === "running" ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
                </span>
                <span className={`text-[15px] font-semibold leading-snug ${c.locked ? "text-sage" : "text-cream"} ${rejected ? "pr-20" : ""}`}>{c.title}</span>
              </span>
              <span className="mt-auto pt-3 text-[13px] leading-snug">
                {rejected
                  ? <><span className="block text-[#ffc9c9]">{c.why}</span>
                      <span className="mt-1.5 block font-mono text-[11px] leading-snug text-[#ffa2a2]/80" title="Equilux's own message">“{(r as { message: string }).message}”</span></>
                  : c.locked
                    ? <span className="inline-flex items-center gap-1.5 text-sage"><Lock size={12} /> {c.locked}</span>
                    : r?.state === "accepted" ? <span className="text-gold">Equilux's rules let it through.</span> : <span className="text-sage">Tap to try it</span>}
              </span>
              <AnimatePresence>
                {rejected && (
                  <motion.span key="stamp" aria-hidden="true"
                    className="absolute right-3 top-3 rounded-md border-2 border-[#ff6467] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffa2a2]"
                    initial={reduce ? false : { opacity: 0, transform: "rotate(-10deg) scale(1.6)" }} animate={{ opacity: 1, transform: "rotate(-10deg) scale(1)" }}
                    transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.22 }}>
                    rejected
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}
