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
  variable: bigint; // annual variable / complementary pay; 0n if none
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

export const EMPTY_SLOT = { salary: 0n, variable: 0n, gender: 0n, category: 0n, sk: new Uint8Array(32), active: false, band: 0n };

/** Pads to the circuit's 16 slots. `bands` (from assignBands) is only needed for publishVariablePay. */
export const padRecords = (records: PayRecord[], bands?: bigint[]) => [
  ...records.map((r, i) => ({ salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, sk: r.sk, active: true, band: bands?.[i] ?? 0n })),
  ...Array(SLOTS - records.length).fill(EMPTY_SLOT),
];

export interface VariableClaim {
  meanGapBps: bigint;
  medianWomen: bigint;
  medianMen: bigint;
  medianGapBps: bigint;
  catGapBps: bigint[];
}

/**
 * Honest variable-pay claim, mirroring publishVariablePay: gaps among the
 * workers who receive variable pay, defined only when both genders do.
 */
export function buildVariableClaim(records: PayRecord[]): VariableClaim {
  const got = (g: bigint) => records.filter((r) => r.gender === g && r.variable > 0n).map((r) => r.variable);
  const w = got(0n), m = got(1n);
  const defined = w.length > 0 && m.length > 0;
  const medianWomen = defined ? lowerMedian(w) : 0n;
  const medianMen = defined ? lowerMedian(m) : 0n;
  const catGapBps: bigint[] = [];
  for (let c = 0; c < CATEGORIES; c++) {
    const cw = records.filter((r) => r.category === BigInt(c) && r.gender === 0n && r.variable > 0n).map((r) => r.variable);
    const cm = records.filter((r) => r.category === BigInt(c) && r.gender === 1n && r.variable > 0n).map((r) => r.variable);
    catGapBps.push(cw.length >= K_ANONYMITY && cm.length >= K_ANONYMITY ? gapBps(sum(cw), BigInt(cw.length), sum(cm), BigInt(cm.length)).bps : 0n);
  }
  return {
    meanGapBps: defined ? gapBps(sum(w), BigInt(w.length), sum(m), BigInt(m.length)).bps : 0n,
    medianWomen,
    medianMen,
    medianGapBps: defined ? gapBps(medianWomen, 1n, medianMen, 1n).bps : 0n,
    catGapBps,
  };
}

/**
 * Quartile band per record, by total pay (basic + variable), lowest first.
 * Band b holds sorted positions [⌊b·n/4⌋, ⌊(b+1)·n/4⌋) — the split the circuit checks.
 */
export function assignBands(records: PayRecord[]): bigint[] {
  const n = records.length;
  const order = records.map((r, i) => ({ i, total: r.salary + r.variable })).sort((a, b) => (a.total < b.total ? -1 : a.total > b.total ? 1 : a.i - b.i));
  const bands = new Array<bigint>(n).fill(0n);
  order.forEach(({ i }, pos) => {
    let b = 0;
    while (b < 3 && pos >= Math.floor(((b + 1) * n) / 4)) b++;
    bands[i] = BigInt(b);
  });
  return bands;
}

/** What the works council opens for confirmPayroll, padded to 16. */
export interface RowOpening { salary: bigint; variable: bigint; gender: bigint; category: bigint; nonce: Uint8Array; active: boolean }
export const padOpenings = (rows: Omit<RowOpening, "active">[]): RowOpening[] => [
  ...rows.map((r) => ({ ...r, active: true })),
  ...Array.from({ length: SLOTS - rows.length }, () => ({ salary: 0n, variable: 0n, gender: 0n, category: 0n, nonce: new Uint8Array(32), active: false })),
];

/** The provider's payroll-row hashes, padded to the circuit's Vector<16>. */
export const padRows = (rows: Uint8Array[]): Uint8Array[] => [
  ...rows,
  ...Array.from({ length: SLOTS - rows.length }, () => new Uint8Array(32)),
];
