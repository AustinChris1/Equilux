/**
 * The Article 9 filing pack: the published figures in a plain JSON document an
 * employer hands to the monitoring body, with the contract that proves them.
 * Anyone can re-read the contract and check every figure on /verify.
 */
import type { LedgerView } from "./api";

export interface FilingPack {
  schema: "equilux.filing.v1";
  directive: "Directive (EU) 2023/970, Article 9(1)";
  network: "preprod" | "local" | "browser-session";
  contract: string;
  round: number;
  generatedAt: string;
  verifyUrl: string | null;
  categoryLabels: string[];
  indicators: Record<string, string | number | boolean>;
}

const pct = (bps: number) => (bps / 100).toFixed(2);

/** Flat, named figures, so a filing and the chain can be compared field by field. */
export function indicatorsOf(v: LedgerView): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  const r = v.latestReport;
  if (r) {
    out["headcount.women"] = r.headcountWomen;
    out["headcount.men"] = r.headcountMen;
    out["a.meanGapPct"] = pct(r.meanGapBps);
    out["a.favorsMen"] = r.gapFavorsMen;
    out["c.medianGapPct"] = pct(r.medianGapBps);
    out["c.favorsMen"] = r.medianFavorsMen;
    r.categories.forEach((c, i) => {
      if (c.headcountWomen + c.headcountMen === 0) return;
      out[`g.category${i + 1}.headcount`] = `${c.headcountWomen}W/${c.headcountMen}M`;
      out[`g.category${i + 1}.basicGapPct`] = c.disclosed ? pct(c.meanGapBps) : "suppressed (k < 3)";
      if (c.disclosed) out[`g.category${i + 1}.meanPay`] = `${c.meanWomen}/${c.meanMen}`;
    });
  }
  const vr = v.latestVariableReport;
  if (vr) {
    out["b.variableMeanGapPct"] = vr.gapDefined ? pct(vr.meanGapBps) : "not defined";
    out["d.variableMedianGapPct"] = vr.gapDefined ? pct(vr.medianGapBps) : "not defined";
    out["e.receiveVariable.women"] = `${vr.recipientsWomen}/${vr.headcountWomen}`;
    out["e.receiveVariable.men"] = `${vr.recipientsMen}/${vr.headcountMen}`;
    vr.quartiles.forEach((q, i) => { out[`f.quartile${i + 1}`] = `${q.women}W/${q.men}M`; });
    vr.categories.forEach((c, i) => {
      if (c.recipientsWomen + c.recipientsMen === 0) return;
      out[`g.category${i + 1}.variableGapPct`] = c.disclosed ? pct(c.meanGapBps) : "suppressed (k < 3)";
    });
  }
  return out;
}

export function buildFilingPack(v: LedgerView, network: FilingPack["network"], categoryLabels: string[]): FilingPack {
  const origin = typeof location !== "undefined" ? location.origin : "https://equilux-lac.vercel.app";
  const verifyUrl = network === "browser-session" ? null : `${origin}/verify?network=${network}&contract=${v.contractAddress}`;
  return {
    schema: "equilux.filing.v1",
    directive: "Directive (EU) 2023/970, Article 9(1)",
    network,
    contract: v.contractAddress,
    round: v.round,
    generatedAt: new Date().toISOString(),
    verifyUrl,
    categoryLabels,
    indicators: indicatorsOf(v),
  };
}

export function downloadFilingPack(pack: FilingPack) {
  const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `equilux-article9-round${pack.round}-${pack.contract.slice(0, 8)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export interface Comparison { key: string; filed: string; onChain: string; ok: boolean }

/** Every figure in the filing against the chain, plus any figure the filing left out. */
export function compareFiling(pack: FilingPack, v: LedgerView): Comparison[] {
  const chain = indicatorsOf(v);
  const keys = [...new Set([...Object.keys(pack.indicators ?? {}), ...Object.keys(chain)])].sort();
  return keys.map((key) => {
    const filed = key in (pack.indicators ?? {}) ? String(pack.indicators[key]) : "— (missing from filing)";
    const onChain = key in chain ? String(chain[key]) : "— (not on chain)";
    return { key, filed, onChain, ok: filed === onChain };
  });
}
