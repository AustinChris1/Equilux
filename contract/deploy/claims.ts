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
  cuts: bigint[]; // v4: quartile cut points on total pay (see quartileCuts)
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
    cuts: quartileCuts(records),
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

// ── v4: batches of 16 and sealed running totals ─────────────────────────────

export const BATCH = SLOTS;

/** Splits a company into reporting batches of 16 (the last one may be shorter). */
export const chunk = <T>(xs: T[], size = BATCH): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size));
  return out;
};

/**
 * Quartile cut points on total pay (basic + variable) for the bands from assignBands:
 * cuts[b-1] is the total at sorted position ⌊b·n/4⌋, so every record in band b has
 * cuts[b-1] ≤ total ≤ cuts[b]. The circuit checks exactly this, batch by batch.
 */
export function quartileCuts(records: PayRecord[]): bigint[] {
  const totals = records.map((r) => r.salary + r.variable).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const n = totals.length;
  if (n === 0) return [0n, 0n, 0n];
  return [1, 2, 3].map((b) => totals[Math.min(n - 1, Math.floor((b * n) / 4))]);
}

export interface PayTotals {
  n: bigint; nW: bigint; nM: bigint; sumW: bigint; sumM: bigint;
  belowW: bigint; upToW: bigint; belowM: bigint; upToM: bigint;
  catW: bigint[]; catM: bigint[]; catSumW: bigint[]; catSumM: bigint[];
}
export interface VarTotals {
  n: bigint; nW: bigint; nM: bigint; rW: bigint; rM: bigint; sW: bigint; sM: bigint;
  belowW: bigint; upToW: bigint; belowM: bigint; upToM: bigint;
  catRW: bigint[]; catRM: bigint[]; catSW: bigint[]; catSM: bigint[];
  bandW: bigint[]; bandM: bigint[]; below: bigint[];
}
const z4 = () => [0n, 0n, 0n, 0n];
export const zeroPayTotals = (): PayTotals => ({
  n: 0n, nW: 0n, nM: 0n, sumW: 0n, sumM: 0n, belowW: 0n, upToW: 0n, belowM: 0n, upToM: 0n,
  catW: z4(), catM: z4(), catSumW: z4(), catSumM: z4(),
});
export const zeroVarTotals = (): VarTotals => ({
  n: 0n, nW: 0n, nM: 0n, rW: 0n, rM: 0n, sW: 0n, sM: 0n, belowW: 0n, upToW: 0n, belowM: 0n, upToM: 0n,
  catRW: z4(), catRM: z4(), catSW: z4(), catSM: z4(), bandW: z4(), bandM: z4(), below: [0n, 0n, 0n],
});

const count = (xs: PayRecord[], f: (r: PayRecord) => boolean) => BigInt(xs.filter(f).length);
const total = (xs: PayRecord[], f: (r: PayRecord) => boolean, v: (r: PayRecord) => bigint) => xs.filter(f).reduce((a, r) => a + v(r), 0n);

/** The totals after one pay-report batch: mirrors reportBatch, field for field. */
export function addPayBatch(t: PayTotals, claim: ReportClaim, batch: PayRecord[]): PayTotals {
  const W = (r: PayRecord) => r.gender === 0n, M = (r: PayRecord) => r.gender === 1n;
  const cat = (c: number, g: (r: PayRecord) => boolean) => (r: PayRecord) => g(r) && r.category === BigInt(c);
  return {
    n: t.n + BigInt(batch.length),
    nW: t.nW + count(batch, W), nM: t.nM + count(batch, M),
    sumW: t.sumW + total(batch, W, (r) => r.salary), sumM: t.sumM + total(batch, M, (r) => r.salary),
    belowW: t.belowW + count(batch, (r) => W(r) && r.salary < claim.medianWomen),
    upToW: t.upToW + count(batch, (r) => W(r) && r.salary <= claim.medianWomen),
    belowM: t.belowM + count(batch, (r) => M(r) && r.salary < claim.medianMen),
    upToM: t.upToM + count(batch, (r) => M(r) && r.salary <= claim.medianMen),
    catW: t.catW.map((x, c) => x + count(batch, cat(c, W))),
    catM: t.catM.map((x, c) => x + count(batch, cat(c, M))),
    catSumW: t.catSumW.map((x, c) => x + total(batch, cat(c, W), (r) => r.salary)),
    catSumM: t.catSumM.map((x, c) => x + total(batch, cat(c, M), (r) => r.salary)),
  };
}

/** The totals after one variable-pay batch: mirrors variableBatch. `bands` are this batch's bands. */
export function addVarBatch(t: VarTotals, claim: VariableClaim, batch: PayRecord[], bands: bigint[]): VarTotals {
  const W = (r: PayRecord) => r.gender === 0n, M = (r: PayRecord) => r.gender === 1n;
  const got = (g: (r: PayRecord) => boolean) => (r: PayRecord) => g(r) && r.variable > 0n;
  const inCat = (c: number, g: (r: PayRecord) => boolean) => (r: PayRecord) => got(g)(r) && r.category === BigInt(c);
  const banded = batch.map((r, i) => ({ r, b: bands[i] }));
  return {
    n: t.n + BigInt(batch.length),
    nW: t.nW + count(batch, W), nM: t.nM + count(batch, M),
    rW: t.rW + count(batch, got(W)), rM: t.rM + count(batch, got(M)),
    sW: t.sW + total(batch, got(W), (r) => r.variable), sM: t.sM + total(batch, got(M), (r) => r.variable),
    belowW: t.belowW + count(batch, (r) => got(W)(r) && r.variable < claim.medianWomen),
    upToW: t.upToW + count(batch, (r) => got(W)(r) && r.variable <= claim.medianWomen),
    belowM: t.belowM + count(batch, (r) => got(M)(r) && r.variable < claim.medianMen),
    upToM: t.upToM + count(batch, (r) => got(M)(r) && r.variable <= claim.medianMen),
    catRW: t.catRW.map((x, c) => x + count(batch, inCat(c, W))),
    catRM: t.catRM.map((x, c) => x + count(batch, inCat(c, M))),
    catSW: t.catSW.map((x, c) => x + total(batch, inCat(c, W), (r) => r.variable)),
    catSM: t.catSM.map((x, c) => x + total(batch, inCat(c, M), (r) => r.variable)),
    bandW: t.bandW.map((x, b) => x + BigInt(banded.filter(({ r, b: rb }) => W(r) && rb === BigInt(b)).length)),
    bandM: t.bandM.map((x, b) => x + BigInt(banded.filter(({ r, b: rb }) => M(r) && rb === BigInt(b)).length)),
    below: t.below.map((x, i) => x + BigInt(banded.filter(({ b }) => b < BigInt(i + 1)).length)),
  };
}
