/**
 * Honest report claims for Equilux v2.
 *
 * The circuit never trusts a figure — it verifies each one. This module is the
 * prover-side arithmetic that produces the exact values the circuit accepts,
 * mirroring its checks one for one:
 *   gap    — verifyGap: favorsMen = sumM·nW ≥ sumW·nM, g = ⌊diff·10000 / base⌋
 *   median — verifyMedian: the LOWER median, x[⌊(n−1)/2⌋] of the sorted cohort
 *   mean   — verifyMean: ⌊sum / n⌋
 *   k-anon — a category's pay figures are published only when both cohorts ≥ K
 */

export const CATEGORIES = 4;
export const K_ANONYMITY = 3;
export const SLOTS = 16;

export interface PayRecord {
  salary: bigint;
  gender: bigint; // 0 = woman, 1 = man
  category: bigint; // 0..3
  sk: Uint8Array;
}

export interface ReportClaim {
  meanGapBps: bigint;
  medianWomen: bigint;
  medianMen: bigint;
  medianGapBps: bigint;
  catMeanWomen: bigint[];
  catMeanMen: bigint[];
  catGapBps: bigint[];
}

export function gapBps(sumW: bigint, nW: bigint, sumM: bigint, nM: bigint): { bps: bigint; favorsMen: boolean } {
  const favorsMen = sumM * nW >= sumW * nM;
  const diff = favorsMen ? sumM * nW - sumW * nM : sumW * nM - sumM * nW;
  const base = favorsMen ? sumM * nW : sumW * nM;
  return { bps: base === 0n ? 0n : (diff * 10000n) / base, favorsMen };
}

export function lowerMedian(values: bigint[]): bigint {
  if (values.length === 0) return 0n;
  const sorted = [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return sorted[Math.floor((sorted.length - 1) / 2)];
}

const sum = (xs: bigint[]) => xs.reduce((a, b) => a + b, 0n);

export function buildClaim(records: PayRecord[]): ReportClaim {
  const w = records.filter((r) => r.gender === 0n).map((r) => r.salary);
  const m = records.filter((r) => r.gender === 1n).map((r) => r.salary);

  const mean = gapBps(sum(w), BigInt(w.length), sum(m), BigInt(m.length));
  const medianWomen = lowerMedian(w);
  const medianMen = lowerMedian(m);
  const median = gapBps(medianWomen, 1n, medianMen, 1n);

  const catMeanWomen: bigint[] = [];
  const catMeanMen: bigint[] = [];
  const catGapBps: bigint[] = [];
  for (let c = 0; c < CATEGORIES; c++) {
    const cw = records.filter((r) => r.category === BigInt(c) && r.gender === 0n).map((r) => r.salary);
    const cm = records.filter((r) => r.category === BigInt(c) && r.gender === 1n).map((r) => r.salary);
    if (cw.length >= K_ANONYMITY && cm.length >= K_ANONYMITY) {
      catMeanWomen.push(sum(cw) / BigInt(cw.length));
      catMeanMen.push(sum(cm) / BigInt(cm.length));
      catGapBps.push(gapBps(sum(cw), BigInt(cw.length), sum(cm), BigInt(cm.length)).bps);
    } else {
      catMeanWomen.push(0n);
      catMeanMen.push(0n);
      catGapBps.push(0n);
    }
  }

  return { meanGapBps: mean.bps, medianWomen, medianMen, medianGapBps: median.bps, catMeanWomen, catMeanMen, catGapBps };
}

export const EMPTY_SLOT = { salary: 0n, gender: 0n, category: 0n, sk: new Uint8Array(32), active: false };

export const padRecords = (records: PayRecord[]) => [
  ...records.map((r) => ({ ...r, active: true })),
  ...Array(SLOTS - records.length).fill(EMPTY_SLOT),
];
