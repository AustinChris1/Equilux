import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CircleAlert, Download, KeyRound, Loader2, ShieldCheck, Wallet } from "lucide-react";
import type { PayslipRecord } from "../lib/employee-check";
import { toBytes32 } from "../lib/employee-check";
import { newSecret, proveEnrollment, type ProveStep } from "../lib/walletless";

const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");

type Phase =
  | { k: "idle" }
  | { k: "proving"; step: ProveStep | "start" }
  | { k: "waiting"; id: string; since: number }
  | { k: "done"; block: number | null; txId: string }
  | { k: "error"; message: string };

const STEP_TEXT: Record<ProveStep | "start", string> = {
  start: "Starting…",
  state: "Reading the contract from Midnight…",
  build: "Preparing your confirmation…",
  keys: "Downloading the proving keys (about 15 MB, once)…",
  prove: "Making the proof in your browser (one to two minutes)…",
};

/**
 * Walletless enrollment for one employee: the browser makes the proof with a secret it creates and keeps;
 * the employer's wallet pays the fee (api/sponsor.js hands the proven transaction over).
 */
export function ConfirmCard({ contract, record, nonce, onConfirmed }: { contract: string; record: PayslipRecord; nonce: string; onConfirmed: (secretHex: string) => void }) {
  const [phase, setPhase] = useState<Phase>({ k: "idle" });
  const [receipt, setReceipt] = useState<{ secret: string; commitment: string } | null>(null);
  const [now, setNow] = useState(Date.now());
  const stopped = useRef(false);
  useEffect(() => () => { stopped.current = true; }, []);

  // while waiting for the sponsor, ask every 5 seconds
  useEffect(() => {
    if (phase.k !== "waiting") return;
    const t = setInterval(async () => {
      setNow(Date.now());
      const r = await fetch(`/api/sponsor?contract=${contract}&id=${phase.id}`).then((x) => x.json()).catch(() => null);
      if (stopped.current || !r) return;
      if (r.status === "done") { setPhase({ k: "done", block: r.block, txId: r.txId }); if (receipt) onConfirmed(receipt.secret); }
      else if (r.status === "failed") setPhase({ k: "error", message: `Your employer's wallet could not submit it: ${r.error || "unknown reason"}. Confirm again to make a fresh proof.` });
      else if (r.status === "expired") setPhase({ k: "error", message: "Nobody paid the fee within the hour, so the confirmation expired. Confirm again when your employer is ready." });
    }, 5000);
    return () => clearInterval(t);
  }, [phase, contract, receipt, onConfirmed]);

  const confirm = async () => {
    setPhase({ k: "proving", step: "start" });
    try {
      const secret = newSecret();
      const proven = await proveEnrollment(contract, {
        salary: String(record.salary), variable: String(record.variable), gender: String(record.gender), category: String(record.category), level: String(record.level),
      }, toBytes32(nonce), secret, (step) => setPhase({ k: "proving", step }));
      const rc = { secret: toHex(secret), commitment: proven.commitment };
      setReceipt(rc);
      try { localStorage.setItem(`equilux.receipt.${contract}`, JSON.stringify(rc)); } catch { /* the download still works */ }
      const res = await fetch("/api/sponsor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contract, tx: proven.tx, commitment: proven.commitment }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Could not hand the confirmation to your employer.");
      setPhase({ k: "waiting", id: body.id, since: Date.now() });
    } catch (e) {
      setPhase({ k: "error", message: e instanceof Error ? e.message : String(e) });
    }
  };

  const download = () => {
    if (!receipt) return;
    const blob = new Blob([JSON.stringify({ kind: "equilux.receipt.v1", network: "preprod", contract, ...receipt, note: "Keep this file private. The secret proves this record is yours; /check uses it." }, null, 2)], { type: "application/json" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "equilux-receipt.json" });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const left = phase.k === "waiting" ? Math.min(60, Math.max(0, 60 - Math.floor((Math.max(now, phase.since) - phase.since) / 60_000))) : 0;
  return (
    <section aria-labelledby="confirm" className="mt-6 rounded-2xl bg-gold p-5 text-night md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h2 id="confirm" className="display text-2xl">Confirm your record, no wallet</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-night/80">
            Your row is sealed and the works council checked it; it just needs your confirmation. Your browser makes the proof itself.
            A secret key is created here and never leaves this device. The small network fee is paid for you, automatically.
          </p>
        </div>
        {phase.k === "idle" || phase.k === "error" ? (
          <button onClick={confirm} className="inline-flex items-center gap-2 rounded-lg bg-night px-5 py-3 text-[14px] font-semibold text-gold transition-transform active:scale-[0.97]">
            <ShieldCheck size={16} /> {phase.k === "error" ? "Confirm again" : "Confirm my record"}
          </button>
        ) : null}
      </div>

      {phase.k === "proving" && <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium" role="status"><Loader2 size={15} className="animate-spin" /> {STEP_TEXT[phase.step]}</p>}
      {phase.k === "waiting" && (
        <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium" role="status">
          <Wallet size={15} /> Proof made. The fee is paid automatically, usually within 15 to 30 minutes; you can leave this page open ({left} min left before it expires)…
        </p>
      )}
      {phase.k === "done" && (
        <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold" role="status">
          <BadgeCheck size={16} /> Confirmed on Midnight{phase.block ? ` in block ${phase.block.toLocaleString("en-US")}` : ""}. You are counted in the next report.
        </p>
      )}
      {phase.k === "error" && <p role="alert" className="mt-4 flex items-start gap-2 text-[14px] font-medium text-red-900"><CircleAlert size={16} className="mt-0.5 shrink-0" /> {phase.message}</p>}

      {receipt && (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-night/15 pt-4 text-[13px]">
          <KeyRound size={15} /> <span>Your secret is saved in this browser. Keep a copy: it is how you check your record later.</span>
          <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md bg-night/10 px-3 py-1.5 font-semibold hover:bg-night/15"><Download size={14} /> Download receipt</button>
        </div>
      )}
    </section>
  );
}
