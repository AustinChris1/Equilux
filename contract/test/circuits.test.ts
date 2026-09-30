/**
 * Circuit-level tests for Equilux v3: these drive the COMPILER-GENERATED
 * contract module (build/contract/index.js) through @midnight-ntwrk/compact-runtime
 * — real persistentHash, real Merkle tree, real disclose semantics, real ledger
 * state transitions. `pnpm compile` (or `pnpm compile:fast`) must have run first.
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import { Contract, ledger, pureCircuits, type Ledger, type Witnesses } from "../build/contract/index.js";
import { assignBands, buildClaim, buildVariableClaim, padOpenings, padRecords, padRows, type PayRecord, type ReportClaim, type RowOpening, type VariableClaim } from "../deploy/claims.js";

type Slot = ReturnType<typeof padRecords>[number];

interface PrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint, bigint];
  rowNonce: Uint8Array;
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  councilSecret: Uint8Array;
  openings: RowOpening[];
  payroll: Slot[];
  claim: ReportClaim;
  variableClaim: VariableClaim;
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

const rec = (name: string, salary: number, gender: 0 | 1, category: number, variable = 0): PayRecord => ({
  salary: BigInt(salary), variable: BigInt(variable), gender: BigInt(gender), category: BigInt(category), sk: bytes32(name),
});

// Basic pay: Engineering (0) and Sales (1) have ≥3 of each gender → disclosed;
// Operations (2) has one woman and one man → suppressed.
// Variable pay: 5 women and 7 men receive it. In Sales both groups have 3
// recipients → disclosed; in Engineering only 2 women do → suppressed.
const TEAM: PayRecord[] = [
  rec("ada", 60_000, 0, 0, 3_000), rec("bea", 62_000, 0, 0, 4_000), rec("cai", 64_000, 0, 0),
  rec("dan", 70_000, 1, 0, 6_000), rec("eli", 72_000, 1, 0, 7_000), rec("fox", 74_000, 1, 0, 5_000),
  rec("gia", 50_000, 0, 1, 2_000), rec("hal", 52_000, 0, 1, 2_500), rec("ivy", 54_000, 0, 1, 3_000),
  rec("jon", 53_000, 1, 1, 2_500), rec("kai", 54_000, 1, 1, 3_500), rec("leo", 55_000, 1, 1, 3_000),
  rec("mia", 40_000, 0, 2), rec("ned", 45_000, 1, 2, 1_000),
];

// The nonce the provider prints on each employee's payslip.
const nonceOf = (r: PayRecord) => {
  const n = new Uint8Array(32);
  n.set(r.sk.slice(0, 28), 4);
  n.set([0x72, 0x6f, 0x77, 0x3a]); // "row:"
  return n;
};
const row = (r: PayRecord, nonce = nonceOf(r)) => pureCircuits.payrollRow(r.salary, r.variable, r.gender, r.category, nonce);
const openingsOf = (team: PayRecord[]) => padOpenings(team.map((r) => ({ salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, nonce: nonceOf(r) })));

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
};

class Harness {
  readonly contract = new Contract<PrivateState, Witnesses<PrivateState>>(witnesses);
  ctx: CircuitContext<PrivateState>;

  constructor() {
    const initialPS: PrivateState = {
      employeeSecret: new Uint8Array(32),
      employeeRecord: [0n, 0n, 0n, 0n],
      rowNonce: new Uint8Array(32),
      employerSecret: EMPLOYER_SK,
      providerSecret: PROVIDER_SK,
      councilSecret: COUNCIL_SK,
      openings: padOpenings([]),
      payroll: padRecords([]),
      claim: buildClaim([]),
      variableClaim: buildVariableClaim([]),
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

  /** The provider commits one hiding hash per payroll row; by default the council then confirms it. */
  declareRoster(team: PayRecord[], providerSk = PROVIDER_SK, headcount = team.length, confirm = true) {
    this.setPS({ providerSecret: providerSk });
    this.ctx = this.contract.impureCircuits.declareRoster(this.ctx, padRows(team.map((r) => row(r))), BigInt(headcount)).context;
    if (confirm && headcount > 0 && headcount <= 16) this.confirm(openingsOf(team));
  }

  /** The works council opens every committed row. */
  confirm(openings: RowOpening[], councilSk = COUNCIL_SK) {
    this.setPS({ councilSecret: councilSk, openings });
    this.ctx = this.contract.impureCircuits.confirmPayroll(this.ctx).context;
  }

  /** The employee seals their record, opening it against their payroll row. */
  enroll(r: PayRecord, nonce: Uint8Array = nonceOf(r)): Uint8Array {
    this.setPS({ employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: nonce });
    const res = this.contract.impureCircuits.enroll(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  publish(records: PayRecord[], claim: ReportClaim = buildClaim(records), employerSk = EMPLOYER_SK) {
    this.setPS({ payroll: padRecords(records), claim, employerSecret: employerSk });
    const res = this.contract.impureCircuits.publishReport(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  publishVariable(records: PayRecord[], claim: VariableClaim = buildVariableClaim(records), bands = assignBands(records), employerSk = EMPLOYER_SK) {
    this.setPS({ payroll: padRecords(records, bands), variableClaim: claim, employerSecret: employerSk });
    const res = this.contract.impureCircuits.publishVariablePay(this.ctx);
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

  /** Full honest setup: payroll rows committed, everyone enrolled. */
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
    expect(h.ledger.employerPk).toEqual(pureCircuits.publicKey(EMPLOYER_SK));
    expect(h.ledger.providerPk).toEqual(pureCircuits.publicKey(PROVIDER_SK));
    expect(h.ledger.councilPk).toEqual(pureCircuits.publicKey(COUNCIL_SK));
    expect(h.ledger.payrollConfirmed).toBe(false);
    expect(h.ledger.latestReport.is_some).toBe(false);
    expect(h.ledger.latestVariableReport.is_some).toBe(false);
  });

  it("only the payroll provider can commit the payroll — not the employer", () => {
    const four = TEAM.slice(0, 4);
    expect(() => h.declareRoster(four, bytes32("intruder"))).toThrow(/not the payroll provider/);
    expect(() => h.declareRoster(four, EMPLOYER_SK)).toThrow(/not the payroll provider/);
    h.declareRoster(four);
    expect(h.ledger.declaredHeadcount).toBe(4n);
    expect(h.ledger.payrollRows.size()).toBe(4n);
    expect(h.ledger.payrollRows.member(row(TEAM[0]))).toBe(true);
  });

  it("the roster is declared once and must fit the instance", () => {
    expect(() => h.declareRoster([])).toThrow(/must not be empty/);
    expect(() => h.declareRoster(TEAM, PROVIDER_SK, 17)).toThrow(/16-record/);
    h.declareRoster(TEAM.slice(0, 3));
    expect(() => h.declareRoster(TEAM.slice(0, 3))).toThrow(/already declared/);
  });

  it("rejects a payroll with the same row twice", () => {
    expect(() => h.declareRoster([TEAM[0], TEAM[0]])).toThrow(/duplicate payroll row/);
  });

  it("padding past the headcount is ignored", () => {
    h.declareRoster(TEAM.slice(0, 2));
    expect(h.ledger.payrollRows.size()).toBe(2n);
  });

  it("enrollment needs a declared roster and stops at its headcount", () => {
    expect(() => h.enroll(TEAM[0])).toThrow(/roster not yet declared/);
    h.declareRoster(TEAM.slice(0, 2));
    h.enroll(TEAM[0]);
    h.enroll(TEAM[1]);
    // a third person matches no payroll row — the rows are the cap
    expect(() => h.enroll(TEAM[2])).toThrow(/does not match any payroll row/);
    expect(h.ledger.enrolled).toBe(2n);
  });
});

describe("binding — every counted record is a provider payroll row", () => {
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

  it("gender and category are bound too", () => {
    expect(() => h.enroll({ ...TEAM[0], category: 1n })).toThrow(/does not match any payroll row/);
    expect(() => h.enroll({ ...TEAM[0], gender: 1n })).toThrow(/does not match any payroll row/);
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

describe("publishReport — proven statistics", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("publishes mean, median and per-category figures for the full set", () => {
    const claim = buildClaim(TEAM);
    const report = h.publish(TEAM, claim);
    expect(report.headcountWomen).toBe(7n);
    expect(report.headcountMen).toBe(7n);
    expect(report.meanGapBps).toBe(claim.meanGapBps);
    expect(report.gapFavorsMen).toBe(true);
    expect(report.medianGapBps).toBe(claim.medianGapBps);
    expect(report.medianFavorsMen).toBe(true);
    expect(h.ledger.latestReport.is_some).toBe(true);
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
    expect(sales.meanGapBps).toBe(370n); // 3.70% — below the 5% line
    expect(sales.gapAtOrAbove5pct).toBe(false);
    expect(ops.disclosed).toBe(false); // 1 woman, 1 man → suppressed
    expect(ops.headcountWomen).toBe(1n);
    expect(ops.meanWomen).toBe(0n);
    expect(ops.meanMen).toBe(0n);
    expect(empty.headcountWomen + empty.headcountMen).toBe(0n);
  });
});

describe("publishReport — every lie is rejected", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.onboard(TEAM); });

  it("rejects a publish by anyone but the employer", () => {
    expect(() => h.publish(TEAM, buildClaim(TEAM), PROVIDER_SK)).toThrow(/not the employer/);
  });

  it("rejects a payroll that omits an enrolled employee", () => {
    const cherryPicked = TEAM.slice(1);
    expect(() => h.publish(cherryPicked, buildClaim(cherryPicked))).toThrow(/every enrolled employee/);
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

  it("rejects a payroll witness that changes anyone's pay", () => {
    const lowered = [{ ...TEAM[3], salary: 60_000n }, ...TEAM.filter((_, i) => i !== 3)];
    expect(() => h.publish(lowered, buildClaim(lowered))).toThrow(/does not match what its employee enrolled/);
  });

  it("rejects duplicate records in the witness", () => {
    const padded = [TEAM[0], TEAM[0], ...TEAM.slice(2)];
    expect(() => h.publish(padded, buildClaim(padded))).toThrow(/duplicate record/);
  });

  it("rejects a report when not everyone on the declared roster has enrolled", () => {
    const h2 = new Harness();
    h2.declareRoster(TEAM); // payroll says 14 people
    const present = TEAM.slice(0, 12); // only 12 enrolled — 2 stayed silent
    for (const r of present) h2.enroll(r);
    expect(() => h2.publish(present)).toThrow(/does not match the payroll provider's roster/);
  });
});

describe("works council — confirms every committed payroll row", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.declareRoster(TEAM, PROVIDER_SK, TEAM.length, false); });

  it("enrollment stays closed until the council confirms", () => {
    expect(() => h.enroll(TEAM[0])).toThrow(/not yet confirmed by the works council/);
    h.confirm(openingsOf(TEAM));
    expect(h.ledger.payrollConfirmed).toBe(true);
    h.enroll(TEAM[0]);
  });

  it("only the works council can confirm — not the provider or the employer", () => {
    expect(() => h.confirm(openingsOf(TEAM), PROVIDER_SK)).toThrow(/not the works council/);
    expect(() => h.confirm(openingsOf(TEAM), EMPLOYER_SK)).toThrow(/not the works council/);
  });

  it("the council must open every committed row", () => {
    expect(() => h.confirm(openingsOf(TEAM.slice(1)))).toThrow(/open every committed payroll row/);
  });

  it("a row the provider never committed cannot be opened", () => {
    const wrong = openingsOf([{ ...TEAM[0], salary: 61_000n }, ...TEAM.slice(1)]);
    expect(() => h.confirm(wrong)).toThrow(/not in the committed payroll/);
  });

  it("the same row cannot be opened twice to pad the count", () => {
    const twice = openingsOf([TEAM[0], TEAM[0], ...TEAM.slice(2)]);
    expect(() => h.confirm(twice)).toThrow(/opened twice/);
  });

  it("confirms once per round", () => {
    h.confirm(openingsOf(TEAM));
    expect(() => h.confirm(openingsOf(TEAM))).toThrow(/already confirmed/);
  });
});

describe("publishVariablePay — the rest of Article 9", () => {
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
    expect(() => h.publishVariable(TEAM, undefined, TEAM.map(() => 0n))).toThrow(/split the workforce into quarters/);
  });

  it("rejects a witness that changes anyone's variable pay", () => {
    const edited = [{ ...TEAM[3], variable: 1_000n }, ...TEAM.filter((_, i) => i !== 3)];
    expect(() => h.publishVariable(edited)).toThrow(/does not match what its employee enrolled/);
  });

  it("rejects a publish by anyone but the employer", () => {
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
