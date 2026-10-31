/**
 * Circuit-level tests for Equilux v4: these drive the COMPILER-GENERATED
 * contract module (build/contract/index.js) through @midnight-ntwrk/compact-runtime
 * (real persistentHash, real Merkle tree, real disclose semantics, real ledger
 * state transitions). `pnpm compile` (or `pnpm compile:fast`) must have run first.
 *
 * v4 is batched: the payroll is committed and opened 16 rows at a time, and each
 * report is proven as begin → one batch per 16 records → finish, over sealed
 * running totals. The harness drives those steps the way the employer's software
 * does, keeping the sealed totals privately.
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import { Contract, ledger, pureCircuits, type Ledger, type Witnesses } from "../build/contract/index.js";
import {
  addLevelBatch, addPayBatch, addVarBatch, assignBands, buildClaim, buildLevelClaim, buildVariableClaim, chunk, padOpenings, padRecords, padRows,
  zeroLevelTotals, zeroPayTotals, zeroVarTotals,
  type LevelClaim, type LevelTotals, type PayRecord, type PayTotals, type ReportClaim, type RowOpening, type VariableClaim, type VarTotals,
} from "../deploy/claims.js";

type Slot = ReturnType<typeof padRecords>[number];

interface PrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint, bigint, bigint];
  rowNonce: Uint8Array;
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  councilSecret: Uint8Array;
  openings: RowOpening[];
  payroll: Slot[];
  claim: ReportClaim;
  variableClaim: VariableClaim;
  paySeal: { totals: PayTotals; claim: ReportClaim; salt: Uint8Array };
  variableSeal: { totals: VarTotals; claim: VariableClaim; salt: Uint8Array };
  levelClaim: LevelClaim;
  levelSeal: { totals: LevelTotals; claim: LevelClaim; salt: Uint8Array };
  nextSalt: Uint8Array;
}

const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

const EMPLOYER_SK = bytes32("employer-secret");
const PROVIDER_SK = bytes32("payroll-provider-secret");
const COUNCIL_SK = bytes32("works-council-secret");
const COIN_PK = "0".repeat(64);

const rec = (name: string, salary: number, gender: 0 | 1, category: number, variable = 0, level = 0): PayRecord => ({
  salary: BigInt(salary), variable: BigInt(variable), gender: BigInt(gender), category: BigInt(category), level: BigInt(level), sk: bytes32(name),
});

// Basic pay: Engineering (0) and Sales (1) have ≥3 of each gender → disclosed;
// Operations (2) has one woman and one man → suppressed.
// Variable pay: 5 women and 7 men receive it. In Sales both groups have 3
// recipients → disclosed; in Engineering only 2 women do → suppressed.
// Job levels (for the level report): 0 under 50k, 1 for 50-59k, 2 for 60-69k, 3 from 70k. Engineering's
// women all sit on level 2 and its men on level 3: the level mix shows it, which is the point of publishing it.
const TEAM: PayRecord[] = [
  rec("ada", 60_000, 0, 0, 3_000, 2), rec("bea", 62_000, 0, 0, 4_000, 2), rec("cai", 64_000, 0, 0, 0, 2),
  rec("dan", 70_000, 1, 0, 6_000, 3), rec("eli", 72_000, 1, 0, 7_000, 3), rec("fox", 74_000, 1, 0, 5_000, 3),
  rec("gia", 50_000, 0, 1, 2_000, 1), rec("hal", 52_000, 0, 1, 2_500, 1), rec("ivy", 54_000, 0, 1, 3_000, 1),
  rec("jon", 53_000, 1, 1, 2_500, 1), rec("kai", 54_000, 1, 1, 3_500, 1), rec("leo", 55_000, 1, 1, 3_000, 1),
  rec("mia", 40_000, 0, 2, 0, 0), rec("ned", 45_000, 1, 2, 1_000, 0),
];

/** A deterministic company of n people across four categories, men paid a little more on average. */
function company(n: number): PayRecord[] {
  let s = 0x2f6b1d3;
  const rnd = () => ((s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 2 ** 32);
  const base = [62_000, 51_000, 41_000, 88_000];
  return Array.from({ length: n }, (_, i) => {
    const category = i % 4;
    const gender = (i * 7 + (i >> 3)) % 2 as 0 | 1;
    const salary = Math.round((base[category] * (0.85 + rnd() * 0.3) * (gender ? 1.06 : 1)) / 100) * 100;
    const variable = rnd() < 0.6 ? Math.round((salary * (0.03 + rnd() * 0.07)) / 50) * 50 : 0;
    const level = Math.min(3, Math.floor(rnd() * 3.2 + (gender ? 0.5 : 0)));
    return rec(`emp-${i}`, salary, gender, category, variable, level);
  });
}

// The nonce the provider prints on each employee's payslip.
const nonceOf = (r: PayRecord) => {
  const n = new Uint8Array(32);
  n.set(r.sk.slice(0, 28), 4);
  n.set([0x72, 0x6f, 0x77, 0x3a]); // "row:"
  return n;
};
const row = (r: PayRecord, nonce = nonceOf(r)) => pureCircuits.payrollRow(r.salary, r.variable, r.gender, r.category, r.level, nonce);
const openingsOf = (team: PayRecord[]) => padOpenings(team.map((r) => ({ salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, level: r.level, nonce: nonceOf(r) })));

const witnesses: Witnesses<PrivateState> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  payrollRowNonce: ({ privateState }) => [privateState, privateState.rowNonce],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  providerSecret: ({ privateState }) => [privateState, privateState.providerSecret],
  councilSecret: ({ privateState }) => [privateState, privateState.councilSecret],
  payrollOpenings: ({ privateState }) => [privateState, privateState.openings],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  reportClaim: ({ privateState }) => [privateState, privateState.claim],
  variableClaim: ({ privateState }) => [privateState, privateState.variableClaim],
  paySeal: ({ privateState }) => [privateState, privateState.paySeal],
  variableSeal: ({ privateState }) => [privateState, privateState.variableSeal],
  freshSalt: ({ privateState }) => [privateState, privateState.nextSalt],
  levelClaim: ({ privateState }) => [privateState, privateState.levelClaim],
  levelSeal: ({ privateState }) => [privateState, privateState.levelSeal],
};

let saltCounter = 0;
const nextSalt = () => bytes32(`salt-${++saltCounter}`);

class Harness {
  readonly contract = new Contract<PrivateState, Witnesses<PrivateState>>(witnesses);
  ctx: CircuitContext<PrivateState>;

  constructor() {
    const initialPS: PrivateState = {
      employeeSecret: new Uint8Array(32),
      employeeRecord: [0n, 0n, 0n, 0n, 0n],
      rowNonce: new Uint8Array(32),
      employerSecret: EMPLOYER_SK,
      providerSecret: PROVIDER_SK,
      councilSecret: COUNCIL_SK,
      openings: padOpenings([]),
      payroll: padRecords([]),
      claim: buildClaim([]),
      variableClaim: buildVariableClaim([]),
      paySeal: { totals: zeroPayTotals(), claim: buildClaim([]), salt: new Uint8Array(32) },
      variableSeal: { totals: zeroVarTotals(), claim: buildVariableClaim([]), salt: new Uint8Array(32) },
      levelClaim: buildLevelClaim([]),
      levelSeal: { totals: zeroLevelTotals(), claim: buildLevelClaim([]), salt: new Uint8Array(32) },
      nextSalt: new Uint8Array(32),
    };
    const { currentContractState, currentPrivateState, currentZswapLocalState } = this.contract.initialState(
      createConstructorContext(initialPS, COIN_PK),
      pureCircuits.publicKey(EMPLOYER_SK),
      pureCircuits.publicKey(PROVIDER_SK),
      pureCircuits.publicKey(COUNCIL_SK),
    );
    this.ctx = createCircuitContext(sampleContractAddress(), currentZswapLocalState, currentContractState, currentPrivateState);
  }

  get ledger(): Ledger {
    return ledger(this.ctx.currentQueryContext.state);
  }

  private setPS(patch: Partial<PrivateState>) {
    this.ctx = { ...this.ctx, currentPrivateState: { ...this.ctx.currentPrivateState, ...patch } };
  }

  declareHeadcount(n: number, providerSk = PROVIDER_SK) {
    this.setPS({ providerSecret: providerSk });
    this.ctx = this.contract.impureCircuits.declareRoster(this.ctx, BigInt(n)).context;
  }

  addRows(team: PayRecord[], providerSk = PROVIDER_SK, count = team.length) {
    this.setPS({ providerSecret: providerSk });
    this.ctx = this.contract.impureCircuits.addPayrollRows(this.ctx, padRows(team.map((r) => row(r))), BigInt(count)).context;
  }

  /** The provider declares the headcount and commits every row, 16 per batch; by default the council then opens them all. */
  declareRoster(team: PayRecord[], providerSk = PROVIDER_SK, headcount = team.length, confirm = true) {
    this.declareHeadcount(headcount, providerSk);
    for (const b of chunk(team)) this.addRows(b, providerSk);
    if (confirm) for (const b of chunk(team)) this.confirm(openingsOf(b));
  }

  /** The works council opens up to 16 committed rows. */
  confirm(openings: RowOpening[], councilSk = COUNCIL_SK) {
    this.setPS({ councilSecret: councilSk, openings });
    this.ctx = this.contract.impureCircuits.confirmPayroll(this.ctx).context;
  }

  /** The employee seals their record, opening it against their payroll row. */
  enroll(r: PayRecord, nonce: Uint8Array = nonceOf(r)): Uint8Array {
    this.setPS({ employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category, r.level], rowNonce: nonce });
    const res = this.contract.impureCircuits.enroll(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  // ── the pay report, step by step ──

  beginPay(claim: ReportClaim, employerSk = EMPLOYER_SK) {
    const salt = nextSalt();
    this.setPS({ claim, employerSecret: employerSk, nextSalt: salt });
    this.ctx = this.contract.impureCircuits.beginReport(this.ctx).context;
    this.setPS({ paySeal: { totals: zeroPayTotals(), claim, salt } });
  }

  /** One batch. `sealTotals` lets a test present different totals than the real ones. */
  payBatch(batch: PayRecord[], sealTotals?: PayTotals) {
    const prev = this.ctx.currentPrivateState.paySeal;
    const salt = nextSalt();
    this.setPS({ payroll: padRecords(batch), nextSalt: salt, paySeal: sealTotals ? { ...prev, totals: sealTotals } : prev });
    this.ctx = this.contract.impureCircuits.reportBatch(this.ctx).context;
    this.setPS({ paySeal: { totals: addPayBatch(prev.totals, prev.claim, batch), claim: prev.claim, salt } });
  }

  finishPay() {
    const res = this.contract.impureCircuits.finishReport(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  publish(records: PayRecord[], claim: ReportClaim = buildClaim(records), employerSk = EMPLOYER_SK) {
    this.beginPay(claim, employerSk);
    for (const b of chunk(records)) this.payBatch(b);
    return this.finishPay();
  }

  // ── the variable-pay report, step by step ──

  beginVar(claim: VariableClaim, employerSk = EMPLOYER_SK) {
    const salt = nextSalt();
    this.setPS({ variableClaim: claim, employerSecret: employerSk, nextSalt: salt });
    this.ctx = this.contract.impureCircuits.beginVariableReport(this.ctx).context;
    this.setPS({ variableSeal: { totals: zeroVarTotals(), claim, salt } });
  }

  varBatch(batch: PayRecord[], bands: bigint[]) {
    const prev = this.ctx.currentPrivateState.variableSeal;
    const salt = nextSalt();
    this.setPS({ payroll: padRecords(batch, bands), nextSalt: salt });
    this.ctx = this.contract.impureCircuits.variableBatch(this.ctx).context;
    this.setPS({ variableSeal: { totals: addVarBatch(prev.totals, prev.claim, batch, bands), claim: prev.claim, salt } });
  }

  finishVar() {
    const res = this.contract.impureCircuits.finishVariableReport(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  publishVariable(records: PayRecord[], claim: VariableClaim = buildVariableClaim(records), bands = assignBands(records), employerSk = EMPLOYER_SK) {
    this.beginVar(claim, employerSk);
    const batches = chunk(records), bandBatches = chunk(bands);
    batches.forEach((b, i) => this.varBatch(b, bandBatches[i]));
    return this.finishVar();
  }

  // ── the level report ──

  publishLevels(records: PayRecord[], claim: LevelClaim = buildLevelClaim(records), employerSk = EMPLOYER_SK) {
    let salt = nextSalt();
    this.setPS({ levelClaim: claim, employerSecret: employerSk, nextSalt: salt });
    this.ctx = this.contract.impureCircuits.beginLevelReport(this.ctx).context;
    let seal = { totals: zeroLevelTotals(), claim, salt };
    for (const b of chunk(records)) {
      salt = nextSalt();
      this.setPS({ payroll: padRecords(b), levelSeal: seal, nextSalt: salt });
      this.ctx = this.contract.impureCircuits.levelBatch(this.ctx).context;
      seal = { totals: addLevelBatch(seal.totals, b), claim, salt };
    }
    this.setPS({ levelSeal: seal });
    const res = this.contract.impureCircuits.finishLevelReport(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  checkReceipt(cm: Uint8Array): boolean {
    const path = this.ledger.commitments.findPathForLeaf(cm);
    if (!path) return false;
    const res = this.contract.impureCircuits.checkReceipt(this.ctx, path);
    this.ctx = res.context;
    return res.result;
  }

  /** Full honest setup: payroll rows committed and opened, everyone enrolled. */
  onboard(team: PayRecord[]) {
    this.declareRoster(team);
    for (const r of team) this.enroll(r);
  }
}

describe("roster and roles", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); });

  it("initializes public state with three role keys and no roster", () => {
    expect(h.ledger.round).toBe(1n);
    expect(h.ledger.rosterDeclared).toBe(false);
    expect(h.ledger.declaredHeadcount).toBe(0n);
    expect(h.ledger.employerPk).toEqual(pureCircuits.publicKey(EMPLOYER_SK));
    expect(h.ledger.providerPk).toEqual(pureCircuits.publicKey(PROVIDER_SK));
    expect(h.ledger.councilPk).toEqual(pureCircuits.publicKey(COUNCIL_SK));
    expect(h.ledger.payrollConfirmed).toBe(false);
    expect(h.ledger.latestReport.is_some).toBe(false);
    expect(h.ledger.latestVariableReport.is_some).toBe(false);
  });

  it("only the payroll provider can declare and commit the payroll, not the employer", () => {
    expect(() => h.declareHeadcount(4, bytes32("intruder"))).toThrow(/not the payroll provider/);
    expect(() => h.declareHeadcount(4, EMPLOYER_SK)).toThrow(/not the payroll provider/);
    h.declareHeadcount(4);
    expect(() => h.addRows(TEAM.slice(0, 4), EMPLOYER_SK)).toThrow(/not the payroll provider/);
    h.addRows(TEAM.slice(0, 4));
    expect(h.ledger.declaredHeadcount).toBe(4n);
    expect(h.ledger.payrollRows.size()).toBe(4n);
    expect(h.ledger.rosterDeclared).toBe(true);
    expect(h.ledger.payrollRows.member(row(TEAM[0]))).toBe(true);
  });

  it("the headcount is declared once and must fit the instance (512)", () => {
    expect(() => h.declareHeadcount(0)).toThrow(/must not be empty/);
    expect(() => h.declareHeadcount(513)).toThrow(/512-person/);
    h.declareHeadcount(512);
    expect(() => h.declareHeadcount(3)).toThrow(/already declared/);
  });

  it("rows are committed in batches until the headcount is reached, never past it", () => {
    h.declareHeadcount(20);
    h.addRows(TEAM.slice(0, 10));
    expect(h.ledger.committedRows).toBe(10n);
    expect(h.ledger.rosterDeclared).toBe(false);
    expect(() => h.addRows(TEAM.slice(0, 1).map((r) => ({ ...r, sk: bytes32("x") })), PROVIDER_SK, 11)).toThrow(/more payroll rows than the declared headcount/);
    h.addRows([...TEAM.slice(10), ...company(6)]);
    expect(h.ledger.committedRows).toBe(20n);
    expect(h.ledger.rosterDeclared).toBe(true);
    expect(() => h.addRows([rec("late", 1, 0, 0)])).toThrow(/already committed/);
  });

  it("rejects a payroll with the same row twice, within or across batches", () => {
    h.declareHeadcount(4);
    expect(() => h.addRows([TEAM[0], TEAM[0]])).toThrow(/duplicate payroll row/);
    h.addRows([TEAM[0]]);
    expect(() => h.addRows([TEAM[0]])).toThrow(/duplicate payroll row/);
  });

  it("padding past the batch count is ignored", () => {
    h.declareHeadcount(2);
    h.addRows(TEAM.slice(0, 2));
    expect(h.ledger.payrollRows.size()).toBe(2n);
  });

  it("enrollment needs a confirmed roster and stops at its headcount", () => {
    expect(() => h.enroll(TEAM[0])).toThrow(/roster not yet declared/);
    h.declareRoster(TEAM.slice(0, 2));
    h.enroll(TEAM[0]);
    h.enroll(TEAM[1]);
    // a third person matches no payroll row: the rows are the cap
    expect(() => h.enroll(TEAM[2])).toThrow(/does not match any payroll row/);
    expect(h.ledger.enrolled).toBe(2n);
  });
});

describe("binding: every counted record is a provider payroll row", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.declareRoster(TEAM); });

  it("an employee's record opens to their payroll row and claims it", () => {
    const cm = h.enroll(TEAM[0]);
    expect(h.ledger.claimedRows.member(row(TEAM[0]))).toBe(true);
    expect(h.ledger.bound.member(cm)).toBe(true);
  });

  it("an employee cannot enroll a higher salary than payroll says", () => {
    expect(() => h.enroll({ ...TEAM[0], salary: 65_000n })).toThrow(/does not match any payroll row/);
  });

  it("gender, category and job level are bound too", () => {
    expect(() => h.enroll({ ...TEAM[0], category: 1n })).toThrow(/does not match any payroll row/);
    expect(() => h.enroll({ ...TEAM[0], gender: 1n })).toThrow(/does not match any payroll row/);
    expect(() => h.enroll({ ...TEAM[0], level: 3n })).toThrow(/does not match any payroll row/);
  });

  it("the right salary without the payslip nonce does not open the row", () => {
    expect(() => h.enroll(TEAM[0], bytes32("guessed-nonce"))).toThrow(/does not match any payroll row/);
  });

  it("the employer cannot enroll an invented employee", () => {
    expect(() => h.enroll(rec("ghost", 60_000, 0, 0))).toThrow(/does not match any payroll row/);
  });

  it("a payroll row can be claimed only once", () => {
    // Whoever holds Ada's payslip nonce could claim her row, once. Ada then
    // cannot enroll and sees it at once; the counted figure is still payroll's.
    h.enroll({ ...TEAM[0], sk: bytes32("impostor") }, nonceOf(TEAM[0]));
    expect(() => h.enroll(TEAM[0])).toThrow(/payroll row is already enrolled/);
  });
});

describe("enrollment and receipts", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.declareRoster(TEAM); });

  it("enroll inserts one commitment and one nullifier; the receipt verifies", () => {
    const cm = h.enroll(TEAM[0]);
    expect(h.ledger.enrolled).toBe(1n);
    expect(h.ledger.nullifiers.size()).toBe(1n);
    expect(h.checkReceipt(cm)).toBe(true);
  });

  it("rejects double enrollment", () => {
    h.enroll(TEAM[0]);
    expect(() => h.enroll(TEAM[0])).toThrow(/already enrolled/);
  });

  it("rejects a zero salary", () => {
    const h2 = new Harness();
    const zed = rec("zed", 0, 0, 0);
    h2.declareRoster([zed]);
    expect(() => h2.enroll(zed)).toThrow(/salary must be positive/);
  });

  it("variable pay is bound too", () => {
    expect(() => h.enroll({ ...TEAM[0], variable: 9_000n })).toThrow(/does not match any payroll row/);
  });

  it("the category is part of the commitment", () => {
    const a1 = rec("same", 50_000, 0, 0);
    const b1 = rec("same", 50_000, 0, 1);
    const h1 = new Harness();
    h1.declareRoster([a1]);
    const a = h1.enroll(a1);
    const h2 = new Harness();
    h2.declareRoster([b1]);
    const b = h2.enroll(b1);
    expect(Buffer.from(a).equals(Buffer.from(b))).toBe(false);
  });
});

describe("works council: opens every committed payroll row", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.declareRoster(TEAM, PROVIDER_SK, TEAM.length, false); });

  it("enrollment stays closed until the council has opened every row", () => {
    expect(() => h.enroll(TEAM[0])).toThrow(/not yet confirmed by the works council/);
    h.confirm(openingsOf(TEAM.slice(0, 8)));
    expect(h.ledger.payrollConfirmed).toBe(false);
    expect(() => h.enroll(TEAM[0])).toThrow(/not yet confirmed by the works council/);
    h.confirm(openingsOf(TEAM.slice(8)));
    expect(h.ledger.payrollConfirmed).toBe(true);
    h.enroll(TEAM[0]);
  });

  it("only the works council can confirm, not the provider or the employer", () => {
    expect(() => h.confirm(openingsOf(TEAM), PROVIDER_SK)).toThrow(/not the works council/);
    expect(() => h.confirm(openingsOf(TEAM), EMPLOYER_SK)).toThrow(/not the works council/);
  });

  it("a row the provider never committed cannot be opened", () => {
    const wrong = openingsOf([{ ...TEAM[0], salary: 61_000n }, ...TEAM.slice(1)]);
    expect(() => h.confirm(wrong)).toThrow(/not in the committed payroll/);
  });

  it("the same row cannot be opened twice to pad the count, within or across batches", () => {
    expect(() => h.confirm(openingsOf([TEAM[0], TEAM[0], ...TEAM.slice(2)]))).toThrow(/opened twice/);
    h.confirm(openingsOf(TEAM.slice(0, 5)));
    expect(() => h.confirm(openingsOf(TEAM.slice(4, 9)))).toThrow(/opened twice/);
  });

  it("an empty opening batch is refused", () => {
    expect(() => h.confirm(openingsOf([]))).toThrow(/opened no rows/);
  });

  it("confirms once per round", () => {
    h.confirm(openingsOf(TEAM));
    expect(() => h.confirm(openingsOf(TEAM))).toThrow(/already confirmed/);
  });
});

describe("pay report: proven statistics", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("publishes mean, median and per-category figures for the full set", () => {
    const claim = buildClaim(TEAM);
    const report = h.publish(TEAM, claim);
    expect(report.headcountWomen).toBe(7n);
    expect(report.headcountMen).toBe(7n);
    expect(report.meanGapBps).toBe(claim.meanGapBps);
    expect(report.meanGapBps).toBe(969n); // 9.69%, as in Wave 2
    expect(report.gapFavorsMen).toBe(true);
    expect(report.medianGapBps).toBe(claim.medianGapBps);
    expect(report.medianFavorsMen).toBe(true);
    expect(h.ledger.latestReport.is_some).toBe(true);
    expect(h.ledger.payOpen).toBe(false);
  });

  it("the lower median is exact: women 54k, men 55k", () => {
    const claim = buildClaim(TEAM);
    expect(claim.medianWomen).toBe(54_000n);
    expect(claim.medianMen).toBe(55_000n);
    h.publish(TEAM, claim);
  });

  it("discloses a category only when both cohorts reach k = 3", () => {
    const report = h.publish(TEAM);
    const [eng, sales, ops, empty] = report.categories;
    expect(eng.disclosed).toBe(true);
    expect(eng.meanWomen).toBe(62_000n);
    expect(eng.meanMen).toBe(72_000n);
    expect(eng.gapAtOrAbove5pct).toBe(true); // 13.88%
    expect(sales.disclosed).toBe(true);
    expect(sales.meanGapBps).toBe(370n); // 3.70%, below the 5% line
    expect(sales.gapAtOrAbove5pct).toBe(false);
    expect(ops.disclosed).toBe(false); // 1 woman, 1 man → suppressed
    expect(ops.headcountWomen).toBe(1n);
    expect(ops.meanWomen).toBe(0n);
    expect(ops.meanMen).toBe(0n);
    expect(empty.headcountWomen + empty.headcountMen).toBe(0n);
  });
});

describe("pay report: every lie is rejected", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("rejects a report by anyone but the employer", () => {
    expect(() => h.publish(TEAM, buildClaim(TEAM), PROVIDER_SK)).toThrow(/not the employer/);
  });

  it("rejects a report that omits an enrolled employee", () => {
    const cherryPicked = TEAM.slice(1);
    expect(() => h.publish(cherryPicked, buildClaim(cherryPicked))).toThrow(/does not match the payroll provider's roster/);
  });

  it("rejects a false mean gap, one basis point either way", () => {
    const claim = buildClaim(TEAM);
    expect(() => h.publish(TEAM, { ...claim, meanGapBps: claim.meanGapBps + 1n })).toThrow(/claimed gap too high/);
    expect(() => h.publish(TEAM, { ...claim, meanGapBps: claim.meanGapBps - 1n })).toThrow(/claimed gap too low/);
  });

  it("rejects a false median", () => {
    const claim = buildClaim(TEAM);
    expect(() => h.publish(TEAM, { ...claim, medianWomen: 62_000n })).toThrow(/median is too high/);
    expect(() => h.publish(TEAM, { ...claim, medianMen: 53_000n })).toThrow(/median is too low/);
  });

  it("rejects a false category mean", () => {
    const claim = buildClaim(TEAM);
    const bad = [...claim.catMeanWomen];
    bad[0] = 65_000n;
    expect(() => h.publish(TEAM, { ...claim, catMeanWomen: bad })).toThrow(/category mean too high/);
  });

  it("rejects a false category gap", () => {
    const claim = buildClaim(TEAM);
    const bad = [...claim.catGapBps];
    bad[1] = 0n;
    expect(() => h.publish(TEAM, { ...claim, catGapBps: bad })).toThrow(/claimed gap too low/);
  });

  it("rejects a batch that changes anyone's pay", () => {
    const lowered = [{ ...TEAM[3], salary: 60_000n }, ...TEAM.filter((_, i) => i !== 3)];
    expect(() => h.publish(lowered, buildClaim(lowered))).toThrow(/does not match what its employee enrolled/);
  });

  it("rejects duplicate records in a batch", () => {
    const padded = [TEAM[0], TEAM[0], ...TEAM.slice(2)];
    expect(() => h.publish(padded, buildClaim(padded))).toThrow(/duplicate record|already counted/);
  });

  it("rejects a report when not everyone on the declared roster has enrolled", () => {
    const h2 = new Harness();
    h2.declareRoster(TEAM); // payroll says 14 people
    const present = TEAM.slice(0, 12); // only 12 enrolled: 2 stayed silent
    for (const r of present) h2.enroll(r);
    expect(() => h2.publish(present)).toThrow(/does not match the payroll provider's roster/);
  });
});

describe("batched reports: sealed totals", () => {
  const big = company(40);
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(big); });

  it("a 40-person company proves in three batches and matches a direct computation", () => {
    const claim = buildClaim(big);
    const r = h.publish(big, claim);
    expect(r.meanGapBps).toBe(claim.meanGapBps);
    expect(r.headcountWomen + r.headcountMen).toBe(40n);
    expect(h.ledger.payProcessed).toBe(40n);
  });

  it("the running totals never appear in public state: only a 32-byte seal that changes every batch", () => {
    h.beginPay(buildClaim(big));
    const s0 = Buffer.from(h.ledger.paySealed).toString("hex");
    h.payBatch(big.slice(0, 16));
    const s1 = Buffer.from(h.ledger.paySealed).toString("hex");
    expect(s1).not.toBe(s0);
    expect(h.ledger.paySealed.length).toBe(32);
    expect(h.ledger.payProcessed).toBe(16n);
    // the ledger has no sum or median field at all, only the seal and a processed count
    expect(Object.keys(h.ledger).filter((k) => /sum|median|mean/i.test(k))).toEqual([]);
  });

  it("rejects a batch that presents different running totals than the seal", () => {
    h.beginPay(buildClaim(big));
    h.payBatch(big.slice(0, 16));
    const real = h.ctx.currentPrivateState.paySeal.totals;
    expect(() => h.payBatch(big.slice(16, 32), { ...real, sumW: real.sumW - 10_000n })).toThrow(/sealed totals do not match/);
  });

  it("rejects counting the same employee in two batches", () => {
    h.beginPay(buildClaim(big));
    h.payBatch(big.slice(0, 16));
    expect(() => h.payBatch([big[3], ...big.slice(16, 31)])).toThrow(/already counted in this report/);
  });

  it("rejects finishing before every batch is in", () => {
    h.beginPay(buildClaim(big));
    h.payBatch(big.slice(0, 16));
    h.payBatch(big.slice(16, 32));
    expect(() => h.finishPay()).toThrow(/does not match the payroll provider's roster/);
  });

  it("rejects a batch or a finish with no report begun", () => {
    expect(() => h.payBatch(big.slice(0, 16))).toThrow(/no pay report in progress/);
    expect(() => h.finishPay()).toThrow(/no pay report in progress/);
  });

  it("a report can be begun again; the new one counts everyone afresh", () => {
    h.beginPay(buildClaim(big));
    h.payBatch(big.slice(0, 16));
    const r = h.publish(big); // begins a new report
    expect(r.headcountWomen + r.headcountMen).toBe(40n);
  });

  it("a false median is caught even when the records are spread over batches", () => {
    const claim = buildClaim(big);
    expect(() => h.publish(big, { ...claim, medianWomen: claim.medianWomen + 5_000n })).toThrow(/median is too high/);
  });

  it("variable-pay quartile bands stay in pay order across batches", () => {
    const bands = assignBands(big);
    // swap the bands of the lowest earner in batch 1 and the highest earner in batch 3
    const tot = (i: number) => big[i].salary + big[i].variable;
    const pick = (from: number, to: number, better: (a: bigint, b: bigint) => boolean) => {
      let best = from;
      for (let i = from; i < to; i++) if (better(tot(i), tot(best))) best = i;
      return best;
    };
    const low = pick(0, 16, (a, b) => a < b), high = pick(32, 40, (a, b) => a > b);
    expect(bands[low]).toBeLessThan(bands[high]);
    [bands[low], bands[high]] = [bands[high], bands[low]];
    expect(() => h.publishVariable(big, undefined, bands)).toThrow(/out of pay order/);
  });

  it("quartile cut points must be in order", () => {
    const claim = buildVariableClaim(big);
    expect(() => h.publishVariable(big, { ...claim, cuts: [claim.cuts[2], claim.cuts[1], claim.cuts[0]] })).toThrow(/cut points are out of order/);
  });
});

describe("variable-pay report: the rest of Article 9", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("publishes recipients, variable-pay mean and median gaps", () => {
    const claim = buildVariableClaim(TEAM);
    const r = h.publishVariable(TEAM, claim);
    expect(r.headcountWomen).toBe(7n);
    expect(r.recipientsWomen).toBe(5n); // (e): 5 of 7 women
    expect(r.recipientsMen).toBe(7n);   // (e): 7 of 7 men
    expect(r.gapDefined).toBe(true);
    expect(r.meanGapBps).toBe(claim.meanGapBps);
    expect(r.meanFavorsMen).toBe(true);
    expect(claim.medianWomen).toBe(3_000n);
    expect(claim.medianMen).toBe(3_500n);
    expect(r.medianGapBps).toBe(claim.medianGapBps);
    expect(h.ledger.latestVariableReport.is_some).toBe(true);
  });

  it("splits the workforce into pay quartiles of 3, 4, 3 and 4", () => {
    const r = h.publishVariable(TEAM);
    const sizes = r.quartiles.map((q) => Number(q.women + q.men));
    expect(sizes).toEqual([3, 4, 3, 4]);
    // by total pay: bottom mia, ned, gia · top bea, dan, eli, fox
    expect(r.quartiles[0]).toEqual({ women: 2n, men: 1n });
    expect(r.quartiles[3]).toEqual({ women: 1n, men: 3n });
  });

  it("variable pay per category, suppressed below three recipients", () => {
    const [eng, sales, ops] = h.publishVariable(TEAM).categories;
    expect(eng.disclosed).toBe(false); // only 2 women in Engineering receive variable pay
    expect(eng.recipientsWomen).toBe(2n);
    expect(sales.disclosed).toBe(true);
    expect(sales.meanGapBps).toBe(buildVariableClaim(TEAM).catGapBps[1]);
    expect(ops.disclosed).toBe(false);
  });

  it("rejects a false variable-pay gap, one basis point either way", () => {
    const claim = buildVariableClaim(TEAM);
    expect(() => h.publishVariable(TEAM, { ...claim, meanGapBps: claim.meanGapBps + 1n })).toThrow(/claimed gap too high/);
    expect(() => h.publishVariable(TEAM, { ...claim, meanGapBps: claim.meanGapBps - 1n })).toThrow(/claimed gap too low/);
  });

  it("rejects a false variable-pay median", () => {
    const claim = buildVariableClaim(TEAM);
    expect(() => h.publishVariable(TEAM, { ...claim, medianWomen: 4_000n })).toThrow(/variable-pay median is too high/);
  });

  it("rejects quartile bands out of pay order", () => {
    const bands = assignBands(TEAM);
    const top = TEAM.findIndex((r) => r.salary === 74_000n);
    const bottom = TEAM.findIndex((r) => r.salary === 40_000n);
    [bands[top], bands[bottom]] = [bands[bottom], bands[top]];
    expect(() => h.publishVariable(TEAM, undefined, bands)).toThrow(/out of pay order/);
  });

  it("rejects bands that are not quarters", () => {
    // every record in band 0 with cut points that let them all in
    const claim = { ...buildVariableClaim(TEAM), cuts: [10n ** 9n, 10n ** 9n, 10n ** 9n] };
    expect(() => h.publishVariable(TEAM, claim, TEAM.map(() => 0n))).toThrow(/split the workforce into quarters/);
  });

  it("rejects a batch that changes anyone's variable pay", () => {
    const edited = [{ ...TEAM[3], variable: 1_000n }, ...TEAM.filter((_, i) => i !== 3)];
    expect(() => h.publishVariable(edited)).toThrow(/does not match what its employee enrolled/);
  });

  it("rejects a report by anyone but the employer", () => {
    expect(() => h.publishVariable(TEAM, undefined, undefined, PROVIDER_SK)).toThrow(/not the employer/);
  });

  it("with no women receiving variable pay, no gap may be claimed", () => {
    const noBonusForWomen = TEAM.map((r) => (r.gender === 0n ? { ...r, variable: 0n } : r));
    const h2 = new Harness();
    h2.onboard(noBonusForWomen);
    expect(() => h2.publishVariable(noBonusForWomen, { ...buildVariableClaim(noBonusForWomen), meanGapBps: 1_000n })).toThrow(/without recipients of both genders/);
    const r = h2.publishVariable(noBonusForWomen);
    expect(r.gapDefined).toBe(false);
    expect(r.recipientsWomen).toBe(0n);
  });
});

describe("level report: the gap inside equal job levels", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("publishes each level's mix, the gaps where both groups reach k = 3, and the adjusted gap", () => {
    const claim = buildLevelClaim(TEAM);
    const r = h.publishLevels(TEAM, claim);
    const mix = r.levels.map((l) => [Number(l.women), Number(l.men)]);
    expect(mix).toEqual([[1, 1], [3, 3], [3, 0], [0, 3]]); // Engineering's women on level 2, its men on level 3
    expect(r.levels[1].disclosed).toBe(true);
    expect(r.levels[1].gapBps).toBe(370n); // 52k vs 54k: 3.70%
    expect(r.levels[2].disclosed).toBe(false); // no men on level 2: no gap can be shown
    expect(r.adjustedGapBps).toBe(370n);
    expect(r.adjustedCovers).toBe(6n); // only level 1 enters the adjusted gap
    expect(r.adjustedFavorsMen).toBe(true);
    expect(h.ledger.latestLevelReport.is_some).toBe(true);
  });

  it("rejects a false level gap or a false adjusted gap", () => {
    const claim = buildLevelClaim(TEAM);
    const bad = [...claim.gapBps];
    bad[1] = 0n;
    expect(() => h.publishLevels(TEAM, { ...claim, gapBps: bad })).toThrow(/claimed gap too low/);
    expect(() => h.publishLevels(TEAM, { ...claim, adjustedGapBps: 0n })).toThrow(/level-adjusted gap is wrong/);
  });

  it("refuses a gap for a level with fewer than three women or men", () => {
    const claim = buildLevelClaim(TEAM);
    const bad = [...claim.gapBps];
    bad[2] = 100n;
    expect(() => h.publishLevels(TEAM, { ...claim, gapBps: bad })).toThrow(/fewer than three women or men/);
  });

  it("rejects a batch that moves anyone to another level", () => {
    const moved = [{ ...TEAM[0], level: 3n }, ...TEAM.slice(1)];
    expect(() => h.publishLevels(moved)).toThrow(/does not match what its employee enrolled/);
  });
});

describe("company size: 250 employees, the Directive's annual-report threshold", () => {
  it("roster, council, 250 enrollments and both reports, in batches of 16", () => {
    const staff = company(250);
    const h = new Harness();
    h.onboard(staff);
    expect(h.ledger.committedRows).toBe(250n);
    expect(h.ledger.openedRows).toBe(250n);
    expect(h.ledger.enrolled).toBe(250n);

    const claim = buildClaim(staff);
    const pay = h.publish(staff, claim);
    expect(pay.headcountWomen + pay.headcountMen).toBe(250n);
    expect(pay.meanGapBps).toBe(claim.meanGapBps);
    expect(pay.medianGapBps).toBe(claim.medianGapBps);
    pay.categories.forEach((c, i) => expect(c.meanGapBps).toBe(claim.catGapBps[i]));

    const vclaim = buildVariableClaim(staff);
    const variable = h.publishVariable(staff, vclaim);
    expect(variable.meanGapBps).toBe(vclaim.meanGapBps);
    const sizes = variable.quartiles.map((q) => Number(q.women + q.men));
    expect(sizes).toEqual([62, 63, 62, 63]); // ⌊b·250/4⌋ boundaries

    const lclaim = buildLevelClaim(staff);
    const levels = h.publishLevels(staff, lclaim);
    expect(levels.adjustedGapBps).toBe(lclaim.adjustedGapBps);
    expect(levels.levels.reduce((a, l) => a + l.women + l.men, 0n)).toBe(250n);
  }, 600_000);
});
