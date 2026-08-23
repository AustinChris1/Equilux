/**
 * Circuit-level tests: these drive the COMPILER-GENERATED contract module
 * (build/contract/index.js) through @midnight-ntwrk/compact-runtime — real
 * persistentHash, real Merkle tree, real disclose semantics, real ledger
 * state transitions. `pnpm compile` must have run first.
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  ledger,
  pureCircuits,
  type Ledger,
  type Witnesses,
} from "../build/contract/index.js";

type PayrollEntry = { salary: bigint; gender: bigint; sk: Uint8Array; active: boolean };

interface PrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint]; // salary, gender
  employerSecret: Uint8Array;
  payroll: PayrollEntry[];
  claimedGapBps: bigint;
}

const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

const EMPLOYER_SK = bytes32("employer-secret");
const COIN_PK = "0".repeat(64);

const EMPTY_SLOT: PayrollEntry = { salary: 0n, gender: 0n, sk: new Uint8Array(32), active: false };

// 2 women (60k, 70k) and 2 men (80k, 90k): means 65k vs 85k → gap 2352 bps
const TEAM = [
  { salary: 60_000n, gender: 0n, sk: bytes32("alice") },
  { salary: 80_000n, gender: 1n, sk: bytes32("bob") },
  { salary: 70_000n, gender: 0n, sk: bytes32("carol") },
  { salary: 90_000n, gender: 1n, sk: bytes32("dan") },
];

const witnesses: Witnesses<PrivateState> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  claimedGapBps: ({ privateState }) => [privateState, privateState.claimedGapBps],
};

class Harness {
  readonly contract = new Contract<PrivateState, Witnesses<PrivateState>>(witnesses);
  ctx: CircuitContext<PrivateState>;

  constructor() {
    const initialPS: PrivateState = {
      employeeSecret: new Uint8Array(32),
      employeeRecord: [0n, 0n],
      employerSecret: EMPLOYER_SK,
      payroll: Array(16).fill(EMPTY_SLOT),
      claimedGapBps: 0n,
    };
    const employerPk = pureCircuits.publicKey(EMPLOYER_SK);
    const { currentContractState, currentPrivateState, currentZswapLocalState } =
      this.contract.initialState(createConstructorContext(initialPS, COIN_PK), employerPk);
    this.ctx = createCircuitContext(
      sampleContractAddress(),
      currentZswapLocalState,
      currentContractState,
      currentPrivateState,
    );
  }

  get ledger(): Ledger {
    return ledger(this.ctx.currentQueryContext.state);
  }

  private setPS(patch: Partial<PrivateState>) {
    this.ctx = { ...this.ctx, currentPrivateState: { ...this.ctx.currentPrivateState, ...patch } };
  }

  enroll(rec: { salary: bigint; gender: bigint; sk: Uint8Array }): Uint8Array {
    this.setPS({ employeeSecret: rec.sk, employeeRecord: [rec.salary, rec.gender] });
    const res = this.contract.impureCircuits.enroll(this.ctx);
    this.ctx = res.context;
    return res.result;
  }

  attest(cm: Uint8Array, employerSk: Uint8Array = EMPLOYER_SK): void {
    this.setPS({ employerSecret: employerSk });
    const res = this.contract.impureCircuits.attest(this.ctx, cm);
    this.ctx = res.context;
  }

  publishReport(payroll: PayrollEntry[], claimedGapBps: bigint, employerSk: Uint8Array = EMPLOYER_SK) {
    const padded = [...payroll, ...Array(16 - payroll.length).fill(EMPTY_SLOT)];
    this.setPS({ payroll: padded, claimedGapBps, employerSecret: employerSk });
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
}

const active = (t: (typeof TEAM)[number]): PayrollEntry => ({ ...t, active: true });

describe("generated circuits via compact-runtime", () => {
  let h: Harness;
  beforeEach(() => {
    h = new Harness();
  });

  it("initializes public state", () => {
    expect(h.ledger.round).toBe(1n);
    expect(h.ledger.enrolled).toBe(0n);
    expect(h.ledger.latestReport.is_some).toBe(false);
  });

  it("enroll inserts a commitment and nullifier; receipts verify", () => {
    const cm = h.enroll(TEAM[0]);
    expect(h.ledger.enrolled).toBe(1n);
    expect(h.ledger.nullifiers.size()).toBe(1n);
    expect(h.checkReceipt(cm)).toBe(true);
  });

  it("rejects double enrollment", () => {
    h.enroll(TEAM[0]);
    expect(() => h.enroll(TEAM[0])).toThrow(/already enrolled/);
  });

  it("only the employer can attest", () => {
    const cm = h.enroll(TEAM[0]);
    expect(() => h.attest(cm, bytes32("intruder"))).toThrow(/not the employer/);
    h.attest(cm);
    expect(h.ledger.attested.member(cm)).toBe(true);
  });

  it("publishes a proven report for the full attested payroll", () => {
    for (const t of TEAM) h.attest(h.enroll(t));
    const report = h.publishReport(TEAM.map(active), 2352n);
    expect(report.headcountWomen).toBe(2n);
    expect(report.headcountMen).toBe(2n);
    expect(report.meanGapBps).toBe(2352n);
    expect(report.gapFavorsMen).toBe(true);
    expect(report.breachesThreshold).toBe(true);
    expect(h.ledger.latestReport.is_some).toBe(true);
    expect(h.ledger.latestReport.value.meanGapBps).toBe(2352n);
  });

  it("rejects a false gap claim", () => {
    for (const t of TEAM) h.attest(h.enroll(t));
    expect(() => h.publishReport(TEAM.map(active), 0n)).toThrow(/claimed gap/);
    expect(() => h.publishReport(TEAM.map(active), 2353n)).toThrow(/claimed gap/);
  });

  it("rejects a payroll that omits an enrolled employee", () => {
    for (const t of TEAM) h.attest(h.enroll(t));
    const cherryPicked = TEAM.slice(1).map(active); // drop a woman
    expect(() => h.publishReport(cherryPicked, 588n)).toThrow(/every enrolled employee/);
  });

  it("rejects records the employer never attested", () => {
    for (const t of TEAM) h.enroll(t);
    expect(() => h.publishReport(TEAM.map(active), 2352n)).toThrow(/not attested/);
  });

  it("rejects duplicate records in the witness", () => {
    for (const t of TEAM) h.attest(h.enroll(t));
    const padded = [TEAM[0], TEAM[0], TEAM[1], TEAM[2]].map(active);
    expect(() => h.publishReport(padded, 0n)).toThrow(/duplicate record/);
  });
});
