import { useEffect, useRef, useState } from "react";
import { BadgeCheck, CircleAlert, CircleX, FileJson, Loader2, Search } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { ReportView } from "./components/ReportView";
import type { LedgerView } from "./lib/api";
import { INDEXERS, readContract, type ChainNetwork } from "./lib/chain-read";
import { compareFiling, type Comparison, type FilingPack } from "./lib/filing";

/** /verify — anyone reads a published report from the chain and checks a filing against it. */
export default function VerifyPage() {
  const params = new URLSearchParams(location.search);
  const [network, setNetwork] = useState<ChainNetwork>(params.get("network") === "local" ? "local" : "preprod");
  const [address, setAddress] = useState(params.get("contract") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<LedgerView | null>(null);
  const [pack, setPack] = useState<FilingPack | null>(null);
  const [packError, setPackError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { document.title = "Verify a report · Equilux"; }, []);

  const verify = async (net = network, addr = address) => {
    if (!addr.trim()) return;
    setBusy(true); setError(null); setView(null);
    try {
      const v = await readContract(net, addr);
      setView(v);
      history.replaceState(null, "", `/verify?network=${net}&contract=${v.contractAddress}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (params.get("contract")) verify(); }, []);

  const loadPack = (f: File | undefined) => {
    if (!f) return;
    f.text().then((t) => {
      try {
        const p = JSON.parse(t) as FilingPack;
        if (p.schema !== "equilux.filing.v1") throw new Error("not an Equilux filing pack");
        setPack(p); setPackError(null);
        if (p.contract && p.network !== "browser-session" && !view) {
          const net = p.network as ChainNetwork;
          setNetwork(net); setAddress(p.contract);
          verify(net, p.contract);
        }
      } catch (e) {
        setPack(null); setPackError(`Could not read that file: ${e instanceof Error ? e.message : e}`);
      }
    });
  };

  const rows: Comparison[] = pack && view ? compareFiling(pack, view) : [];
  const mismatches = rows.filter((r) => !r.ok).length;
  const labels = pack?.categoryLabels ?? ["Category 1", "Category 2", "Category 3", "Category 4"];

  const checks = view ? [
    { ok: true, text: `The contract decodes as an Equilux reporting contract · round ${view.round}` },
    { ok: view.rosterDeclared, text: view.rosterDeclared ? `The payroll provider committed ${view.payrollRows} payroll rows` : "No payroll committed yet" },
    { ok: view.payrollConfirmed, text: view.payrollConfirmed ? "The works council opened every row and confirmed the payroll" : "The works council has not confirmed the payroll" },
    { ok: view.rosterDeclared && view.enrolled === view.payrollRows, text: `${view.enrolled} of ${view.payrollRows} rows enrolled by the employee they belong to` },
    { ok: !!view.latestReport, text: view.latestReport ? "Pay-gap report published: Article 9(1)(a), (c), (g)" : "No pay-gap report published" },
    { ok: !!view.latestVariableReport, text: view.latestVariableReport ? "Variable-pay report published: Article 9(1)(b), (d), (e), (f), (g)" : "No variable-pay report published" },
  ] : [];

  return (
    <div className="min-h-dvh bg-night-deep">
      <AppHeader current="verify" />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 md:px-6 md:pt-8">
        <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-cream">Verify a pay-gap report</h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-sage">
          Enter the contract an employer reported under. This page reads its public state straight from the Midnight indexer
          and decodes it with the compiled contract. A figure is on-chain only because the network accepted a zero-knowledge
          proof of how it was computed. Then load the employer's filing pack to check every figure in it against the chain.
        </p>

        <form className="mt-6 grid gap-2.5 rounded-2xl bg-night p-4 ring-1 ring-gold/12 sm:grid-cols-[auto_1fr_auto]" onSubmit={(e) => { e.preventDefault(); verify(); }}>
          <select value={network} onChange={(e) => setNetwork(e.target.value as ChainNetwork)} aria-label="Network"
            className="rounded-md border border-gold/15 bg-night-deep px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50">
            {(Object.keys(INDEXERS) as ChainNetwork[]).map((k) => <option key={k} value={k}>{INDEXERS[k].label}</option>)}
          </select>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Contract address (hex)" aria-label="Contract address" spellCheck={false}
            className="min-w-0 rounded-md border border-gold/15 bg-night-deep px-3 py-2 font-mono text-[12px] text-cream outline-none placeholder:text-sage/50 focus:border-gold/50" />
          <button type="submit" disabled={busy || !address.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2 text-[13px] font-semibold text-night transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />} Verify
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-sage">
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => loadPack(e.target.files?.[0])} />
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded text-sage hover:text-gold">
            <FileJson size={13} /> {pack ? "Load another filing pack" : "Load a filing pack (.json)"}
          </button>
          {pack && <span className="text-cream">filing for contract {pack.contract.slice(0, 10)}… · round {pack.round} · {pack.network}</span>}
        </div>

        {error && (
          <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-lg bg-red-950/30 p-3.5 text-[13px] text-red-200 ring-1 ring-red-400/30">
            <CircleAlert size={16} className="mt-0.5 shrink-0" /> {error}
          </div>
        )}
        {packError && <p className="mt-3 text-[13px] text-red-200">{packError}</p>}
        {pack?.network === "browser-session" && (
          <p className="mt-3 max-w-2xl text-[13px] text-sage">
            This filing came from the in-browser demo, which runs the contract without a chain. There is nothing on a network to
            check it against; a filing from the local node or from preprod can be verified.
          </p>
        )}

        {view && (
          <div className="mt-8 flex flex-col gap-8">
            <section aria-labelledby="checks">
              <h2 id="checks" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">What the chain says</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {checks.map((c) => (
                  <li key={c.text} className="flex items-start gap-2.5 text-[14px] text-cream">
                    {c.ok ? <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold" /> : <CircleX size={16} className="mt-0.5 shrink-0 text-sage/60" />}
                    <span className={c.ok ? "" : "text-sage"}>{c.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[12px] break-all text-sage">contract {view.contractAddress}</p>
            </section>

            {pack && pack.network !== "browser-session" && (
              <section aria-labelledby="filing">
                <h2 id="filing" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">The filing against the chain</h2>
                <p className={`mt-2 text-[15px] ${mismatches ? "text-red-200" : "text-gold"}`}>
                  {pack.contract !== view.contractAddress
                    ? "This filing names a different contract."
                    : mismatches ? `${mismatches} figure(s) in the filing do not match the chain.` : `All ${rows.length} figures in the filing match the chain.`}
                </p>
                <div className="mt-3 overflow-x-auto rounded-lg border border-gold/15">
                  <table className="w-full min-w-120 text-left font-mono text-[12px]">
                    <thead className="bg-cream/5 font-sans text-[12px] font-semibold text-sage">
                      <tr><th className="px-3 py-2">Figure</th><th className="px-3 py-2">Filed</th><th className="px-3 py-2">On chain</th><th className="px-3 py-2" /></tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.key} className="border-t border-gold/8 text-cream">
                          <td className="px-3 py-2 text-sage">{r.key}</td>
                          <td className="px-3 py-2">{r.filed}</td>
                          <td className="px-3 py-2">{r.onChain}</td>
                          <td className="px-3 py-2">{r.ok ? <BadgeCheck size={14} className="text-gold" aria-label="matches" /> : <CircleX size={14} className="text-red-300" aria-label="does not match" />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {view.latestReport && (
              <section aria-labelledby="figures" className="flex flex-col gap-4">
                <h2 id="figures" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-sage">The published figures</h2>
                <ReportView rep={view.latestReport} vrep={view.latestVariableReport} categories={labels} />
                {!pack && <p className="text-[12px] text-sage">Category names are not stored on-chain; load the employer's filing pack to see them.</p>}
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
