import { useEffect, useState } from "react";
import { BadgeCheck, Copy, ExternalLink, Loader2, Wallet } from "lucide-react";
import type { WalletSession } from "../lib/wallet-chain";

type Person = { id: string; name: string; salary: number; variable: number; gender: 0 | 1; category: number; level: number; nonce: string; commitment?: string };
type Entry = { id: string; at: number; status: "waiting" | "done" | "failed"; tx: string; block?: number | null };

/** The payslip link an employee opens: their payroll details after the #, which browsers never send to a server. No secret. */
const payslipLink = (contract: string, p: Person) =>
  `${location.origin}/check?contract=${contract}#s=${p.salary}&v=${p.variable}&g=${p.gender}&c=${p.category}&l=${p.level}&n=${p.nonce}`;

/**
 * Walletless enrollment, the employer's side (wallet mode): payslip links for the employees, and the confirmations
 * they made in their own browsers, waiting for this wallet to pay the fee.
 */
export function SponsorPanel({ session, contract, people, log, onPaid }: { session: WalletSession; contract: string; people: Person[]; log: (l: string[]) => void; onPaid: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(true);
  const [paying, setPaying] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    const load = () => fetch(`/api/sponsor?contract=${contract}`).then((r) => r.json()).then((b) => { if (live) { setEntries(b.entries ?? []); setOpen(b.open !== false); } }).catch(() => {});
    load();
    const t = setInterval(load, 8000);
    return () => { live = false; clearInterval(t); };
  }, [contract]);

  const waiting = entries.filter((e) => e.status === "waiting");
  const payAll = async () => {
    for (const e of waiting) {
      setPaying(e.id);
      log([`▶ paying the fee for a walletless confirmation (${e.id.slice(0, 8)}…): approve in ${session.walletName}`]);
      try {
        const r = await session.sponsor(e.tx, log);
        await fetch("/api/sponsor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contract, id: e.id, status: "done", txId: r.txId, block: r.blockHeight }) });
      } catch (err) {
        const m = err instanceof Error ? err.message : String(err);
        log([`✗ ${m}`]);
        await fetch("/api/sponsor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contract, id: e.id, status: "failed", error: m }) });
      }
    }
    setPaying(null);
    onPaid();
  };
  const copy = (p: Person) => { navigator.clipboard?.writeText(payslipLink(contract, p)); setCopied(p.id); setTimeout(() => setCopied(null), 1500); };

  return (
    <div className="mb-5 rounded-xl bg-night-deep/60 p-4 ring-1 ring-gold/15">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[13px] font-semibold text-cream">No wallet for employees</div>
          <p className="mt-0.5 max-w-xl text-[13px] text-sage">Send each person their payslip link. They confirm in their own browser, which makes the proof; your wallet only pays the fee.</p>
        </div>
        <button onClick={payAll} disabled={!waiting.length || !!paying}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[13px] font-semibold text-night disabled:opacity-50">
          {paying ? <Loader2 size={14} className="animate-spin" /> : <Wallet size={14} />}
          {waiting.length ? `Pay the fees (${waiting.length} waiting)` : "Nothing waiting"}
        </button>
      </div>
      {!open && <p className="mt-2 text-[12px] text-red-200">Walletless confirmation is not switched on for this site yet (no store connected).</p>}
      <ul className="mt-3 flex flex-wrap gap-2">
        {people.filter((p) => !p.commitment).slice(0, 24).map((p) => (
          <li key={p.id} className="inline-flex items-center gap-1 rounded-md bg-cream/[0.06] pl-2.5 text-[12px] text-cream/90">
            {p.name}
            <button onClick={() => copy(p)} title="Copy payslip link" className="grid size-7 place-items-center text-sage hover:text-gold">{copied === p.id ? <BadgeCheck size={13} /> : <Copy size={13} />}</button>
            <a href={payslipLink(contract, p)} target="_blank" rel="noreferrer" title="Open payslip link" className="grid size-7 place-items-center text-sage hover:text-gold"><ExternalLink size={13} /></a>
          </li>
        ))}
      </ul>
    </div>
  );
}
