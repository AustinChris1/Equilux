import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Cpu, ExternalLink, Fuel, Globe, Loader2, LogOut, Users, Wallet, X } from "lucide-react";
import type { WalletChoice } from "../../lib/wallet-detect";

const EASE = [0.23, 1, 0.32, 1] as const;

export interface WalletState {
  name: string;
  icon: string;
  prover: "wallet" | "local";
  /** true = has DUST, false = empty, null = unknown */
  fuel: boolean | null;
}

/** The dApp-standard wallet control: a gold button that becomes the connected wallet. */
export function WalletButton({ wallets, wallet, connecting, onConnect, onDisconnect, teamSize, onSmallTeam, locked }: {
  wallets: WalletChoice[];
  wallet: WalletState | null;
  connecting: boolean;
  onConnect: (w: WalletChoice) => void;
  onDisconnect: () => void;
  teamSize: number;
  onSmallTeam: () => void;
  locked: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  // once a connection lands, open the checklist so the fee fuel status is seen
  useEffect(() => { if (wallet && !connecting) setOpen(true); }, [wallet, connecting]);

  return (
    <div ref={ref} className="relative">
      {wallet ? (
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-lg bg-night py-1.5 pl-1.5 pr-2.5 text-[13px] font-medium text-cream ring-1 ring-gold/30 transition-colors hover:ring-gold/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          {wallet.icon ? <img src={wallet.icon} alt="" className="size-6 rounded-md" /> : <span className="grid size-6 place-items-center rounded-md bg-gold text-night"><Wallet size={14} /></span>}
          <span className="hidden sm:inline">{wallet.name}</span>
          <span className={`size-2 rounded-full ${wallet.fuel === false ? "bg-[#ff6467]" : "bg-gold"}`} aria-hidden="true" />
          <span className="text-sage">Testnet</span>
          <ChevronDown size={14} className={`text-sage transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} disabled={connecting}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-[13px] font-semibold text-night transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          {connecting ? <Loader2 size={15} className="animate-spin" /> : <Wallet size={15} />}
          {connecting ? "Connecting…" : "Connect wallet"}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label={wallet ? "Your wallet" : "Connect a wallet"}
            initial={{ opacity: 0, transform: "translateY(-6px) scale(0.98)" }} animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-4px) scale(0.98)" }} transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(92vw,360px)] origin-top-right rounded-2xl bg-night p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] ring-1 ring-gold/20">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[17px] font-semibold text-cream">{wallet ? "Live on Midnight testnet" : "Connect a wallet"}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid size-7 place-items-center rounded-md text-sage hover:bg-cream/6 hover:text-cream"><X size={15} /></button>
            </div>

            {!wallet ? (
              <>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sage">Play the same story on Midnight's test network. Every step becomes a real transaction you approve.</p>
                <div className="mt-3 flex flex-col gap-2">
                  {wallets.map((w) => (
                    <button key={w.key} onClick={() => onConnect(w)} disabled={connecting}
                      className="flex items-center gap-3 rounded-xl bg-cream/6 p-3 text-left transition-colors hover:bg-cream/10 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-gold">
                      {w.icon ? <img src={w.icon} alt="" className="size-9 rounded-lg" /> : <span className="grid size-9 place-items-center rounded-lg bg-gold text-night"><Wallet size={18} /></span>}
                      <span className="flex-1 text-[14px] font-medium text-cream">{w.name}</span>
                      {connecting ? <Loader2 size={15} className="animate-spin text-gold" /> : <span className="text-[12px] font-semibold text-gold">Connect</span>}
                    </button>
                  ))}
                  {wallets.length === 0 && (
                    <div className="rounded-xl bg-cream/6 p-3 text-[13px] text-sage">
                      No Midnight wallet found in this browser.
                      <div className="mt-2 flex gap-2">
                        <a href="https://www.lace.io" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3 py-1.5 text-[12px] font-semibold text-night">Get Lace <ExternalLink size={12} /></a>
                      </div>
                    </div>
                  )}
                </div>
                <ul className="mt-4 flex flex-col gap-2 text-[12px] text-sage">
                  <li className="flex items-center gap-2"><Globe size={14} className="shrink-0 text-gold" /> Set the wallet's network to Preprod</li>
                  <li className="flex items-center gap-2"><Fuel size={14} className="shrink-0 text-gold" /> Free test tokens: <a href="https://faucet.preprod.midnight.network" target="_blank" rel="noreferrer" className="text-cream underline decoration-gold/40 underline-offset-4 hover:text-gold">Midnight faucet</a></li>
                </ul>
              </>
            ) : (
              <>
                <ul className="mt-3 flex flex-col gap-2.5">
                  <Row ok icon={Globe} label="Network" value="Midnight Preprod" />
                  <Row ok={wallet.fuel !== false} icon={Fuel} label="Fee fuel (DUST)" value={wallet.fuel === null ? "Unknown" : wallet.fuel ? "Ready" : "Empty"} />
                  <Row ok icon={Cpu} label="Math proofs" value={wallet.prover === "wallet" ? `Made by ${wallet.name}` : "Your proof server"} />
                </ul>
                {wallet.fuel === false && (
                  <ol className="mt-3 flex flex-col gap-2 rounded-xl bg-[#460809]/40 p-3 text-[12px] text-[#ffc9c9] ring-1 ring-[#ff6467]/30">
                    <li className="flex gap-2"><span className="font-semibold">1</span> Get tNIGHT from the <a href="https://faucet.preprod.midnight.network" target="_blank" rel="noreferrer" className="underline underline-offset-4">faucet</a></li>
                    <li className="flex gap-2"><span className="font-semibold">2</span> In {wallet.name}, turn on DUST generation for your tNIGHT</li>
                    <li className="flex gap-2"><span className="font-semibold">3</span> Wait a few minutes; this turns gold by itself</li>
                  </ol>
                )}
                {teamSize > 6 && !locked && (
                  <button onClick={onSmallTeam}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl bg-cream/6 p-3 text-left text-[13px] text-cream transition-colors hover:bg-cream/10">
                    <Users size={18} className="shrink-0 text-gold" />
                    <span className="flex-1">Use a 6-person team <span className="block text-[12px] text-sage">11 approvals instead of {teamSize + 5}</span></span>
                  </button>
                )}
                <button onClick={() => { onDisconnect(); setOpen(false); }}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-sage hover:text-gold">
                  <LogOut size={13} /> Back to practice mode
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ ok, icon: Icon, label, value }: { ok: boolean; icon: typeof Globe; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 text-[13px]">
      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${ok ? "bg-gold/12 text-gold" : "bg-[#460809]/50 text-[#ffa2a2]"}`}><Icon size={15} /></span>
      <span className="flex-1 text-sage">{label}</span>
      <span className={`inline-flex items-center gap-1.5 font-medium ${ok ? "text-cream" : "text-[#ffa2a2]"}`}>{ok ? <Check size={13} className="text-gold" /> : <X size={13} />}{value}</span>
    </li>
  );
}
