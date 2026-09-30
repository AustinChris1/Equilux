/**
 * Circuit-level tests for Equilux v2: these drive the COMPILER-GENERATED
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
import { buildClaim, padRecords, type PayRecord, type ReportClaim } from "../deploy/claims.js";

type Slot = ReturnType<typeof padRecords>[number];

interface PrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint];
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  payroll: Slot[];
  claim: ReportClaim;
}

const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

const EMPLOYER_SK = bytes32("employer-secret");
const PROVIDER_SK = bytes32("payroll-provider-secret");
const COIN_PK = "0".repeat(64);

const rec = (name: string, salary: number, gender: 0 | 1, category: number): PayRecord => ({
  salary: BigInt(salary), gender: BigInt(gender), category: BigInt(category), sk: bytes32(name),
});

// Category 0 (engineering) and 1 (sales) have ≥3 of each gender → disclosed.
// Category 2 (operations) has one woman and one man → must be suppressed.
const TEAM: PayRecord[] = [
  rec("ada", 60_000, 0, 0), rec("bea", 62_000, 0, 0), rec("cai", 64_000, 0, 0),
  rec("dan", 70_000, 1, 0), rec("eli", 72_000, 1, 0), rec("fox", 74_000, 1, 0),
  rec("gia", 50_000, 0, 1), rec("hal", 52_000, 0, 1), rec("ivy", 54_000, 0, 1),
  rec("jon", 53_000, 1, 1), rec("kai", 54_000, 1, 1), rec("leo", 55_000, 1, 1),
  rec("mia", 40_000, 0, 2), rec("ned", 45_000, 1, 2),
];

const witnesses: Witnesses<PrivateState> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  providerSecret: ({ privateState }) => [privateState, privateState.providerSecret],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  reportClaim: ({ privateState }) => [privateState, privateState.claim],
};

class Harness {
  readonly contract = new Contract<PrivateState, Witnesses<PrivateState>>(witnesses);
  ctx: CircuitContext<PrivateState>;

  constructor() {
    const initialPS: PrivateState = {
      employeeSecret: new Uint8Array(32),
      employeeRecord: [0n, 0n, 0n],
      employerSecret: EMPLOYER_SK,
      providerSecret: PROVIDER_SK,
      payroll: padRecords([]),
      claim: buildClaim([]),
    };
    const { currentContractState, currentPrivateState, currentZswapLocalState } = this.contract.initialState(
      createConstructorContext(initialPS, COIN_PK),
      pureCircuits.publicKey(EMPLOYER_SK),
      pureCircuits.publicKey(PROVIDER_SK),
    );
    this.ctx = createCircuitContext(sampleContractAddress(), currentZswapLocalState, currentContractState, currentPrivateState);
  }

  get ledger(): Ledger {
    return ledger(this.ctx.currentQueryContext.state);
  }

  private setPS(patch: Partial<PrivateState>) {
    this.ctx = { ...this.ctx, currentPrivateState: { ...this.ctx.currentPrivateState, ...patch } };
  }

  declareRoster(n: number, providerSk = PROVIDER_SK) {
    this.setPS({ providerSecret: providerSk });
    this.ctx = this.contract.impureCircuits.declareRoster(this.ctx, BigInt(n)).context;
  }

  enroll(r: PayRecord): Uint8Array {
    this.setPS({ employeeSecret: r.sk, employeeRecord: [r.salary, r.gender, r.category] });
    const res = this.contract.impureCircuits.enroll(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  attest(cm: Uint8Array, providerSk = PROVIDER_SK) {
    this.setPS({ providerSecret: providerSk });
    this.ctx = this.contract.impureCircuits.attest(this.ctx, cm).context;
  }

  publish(records: PayRecord[], claim: ReportClaim = buildClaim(records), employerSk = EMPLOYER_SK) {
    this.setPS({ payroll: padRecords(records), claim, employerSecret: employerSk });
    const res = this.contract.impureCircuits.publishReport(this.ctx);
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

  /** Full honest setup: roster declared, everyone enrolled and attested. */
  onboard(team: PayRecord[]) {
    this.declareRoster(team.length);
    for (const r of team) this.attest(this.enroll(r));
  }
}

describe("roster and roles", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); });

  it("initializes public state with two role keys and no roster", () => {
    expect(h.ledger.round).toBe(1n);
    expect(h.ledger.rosterDeclared).toBe(false);
    expect(h.ledger.employerPk).toEqual(pureCircuits.publicKey(EMPLOYER_SK));
    expect(h.ledger.providerPk).toEqual(pureCircuits.publicKey(PROVIDER_SK));
    expect(h.ledger.latestReport.is_some).toBe(false);
  });

  it("only the payroll provider can declare the roster", () => {
    expect(() => h.declareRoster(4, bytes32("intruder"))).toThrow(/not the payroll provider/);
    expect(() => h.declareRoster(4, EMPLOYER_SK)).toThrow(/not the payroll provider/);
    h.declareRoster(4);
    expect(h.ledger.declaredHeadcount).toBe(4n);
  });

  it("the roster is declared once and must fit the instance", () => {
    expect(() => h.declareRoster(0)).toThrow(/must not be empty/);
    expect(() => h.declareRoster(17)).toThrow(/16-record/);
    h.declareRoster(3);
    expect(() => h.declareRoster(3)).toThrow(/already declared/);
  });

  it("enrollment needs a declared roster and stops at its headcount", () => {
    expect(() => h.enroll(TEAM[0])).toThrow(/roster not yet declared/);
    h.declareRoster(2);
    h.enroll(TEAM[0]);
    h.enroll(TEAM[1]);
    expect(() => h.enroll(TEAM[2])).toThrow(/roster is full/);
  });

  it("the employer cannot attest its own data — only the provider can", () => {
    h.declareRoster(1);
    const cm = h.enroll(TEAM[0]);
    expect(() => h.attest(cm, EMPLOYER_SK)).toThrow(/not the payroll provider/);
    h.attest(cm);
    expect(h.ledger.attested.member(cm)).toBe(true);
  });
});

describe("enrollment and receipts", () => {
  let h: Harness;
  beforeEach(() => { h = new Harness(); h.declareRoster(TEAM.length); });

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
    expect(() => h.enroll(rec("zed", 0, 0, 0))).toThrow(/salary must be positive/);
  });

  it("the category is part of the commitment", () => {
    const a = h.enroll(rec("same", 50_000, 0, 0));
    const h2 = new Harness();
    h2.declareRoster(1);
    const b = h2.enroll(rec("same", 50_000, 0, 1));
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

  it("rejects records the provider never attested", () => {
    const h2 = new Harness();
    h2.declareRoster(TEAM.length);
    for (const r of TEAM) h2.enroll(r);
    expect(() => h2.publish(TEAM)).toThrow(/not attested by the payroll provider/);
  });

  it("rejects duplicate records in the witness", () => {
    const padded = [TEAM[0], TEAM[0], ...TEAM.slice(2)];
    expect(() => h.publish(padded, buildClaim(padded))).toThrow(/duplicate record/);
  });

  it("rejects a report when not everyone on the declared roster has enrolled", () => {
    const h2 = new Harness();
    h2.declareRoster(TEAM.length); // payroll says 14 people
    const present = TEAM.slice(0, 12); // only 12 enrolled — 2 stayed silent
    for (const r of present) h2.attest(h2.enroll(r));
    expect(() => h2.publish(present)).toThrow(/does not match the payroll provider's roster/);
  });
});
