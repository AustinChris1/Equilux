/**
 * Private-state container and witness implementations for Equilux v4, shared
 * by the API server and the CLI demo. Everything in here stays local: witnesses
 * feed circuit executions and never touch the public ledger.
 *
 * In production each party runs its own prover with only its own secret — the
 * employee holds `employeeSecret` and the `rowNonce` from their payslip, the payroll provider `providerSecret`, the
 * employer `employerSecret` and the payroll. The local demo API plays all three
 * roles from one process, so one container holds every field.
 */
import type { Witnesses } from "../build/contract/index.js";
import {
  addLevelBatch, addPayBatch, addVarBatch, buildClaim, buildLevelClaim, buildVariableClaim, chunk, padOpenings, padRecords, padRows,
  zeroLevelTotals, zeroPayTotals, zeroVarTotals,
  type LevelClaim, type LevelTotals, type PayTotals, type ReportClaim, type RowOpening, type VariableClaim, type VarTotals,
} from "./claims.js";

export type PayrollSlot = ReturnType<typeof padRecords>[number];

export interface EquiluxPrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint, bigint, bigint]; // salary, variable pay, gender (0 = woman, 1 = man), category 0..3, level 0..3
  rowNonce: Uint8Array; // blinds the employee's payroll row; delivered with the payslip
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  councilSecret: Uint8Array;
  openings: RowOpening[]; // the works council's view of the payroll, 16 slots
  payroll: PayrollSlot[]; // exactly 16 slots (Vector<16>)
  claim: ReportClaim;
  variableClaim: VariableClaim;
  // v4: the employer's sealed running totals for the report in progress, and the salt for the next seal
  paySeal: { totals: PayTotals; claim: ReportClaim; salt: Uint8Array };
  variableSeal: { totals: VarTotals; claim: VariableClaim; salt: Uint8Array };
  levelClaim: LevelClaim;
  levelSeal: { totals: LevelTotals; claim: LevelClaim; salt: Uint8Array };
  nextSalt: Uint8Array;
}

export const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

export const initialPrivateState = (employerSecret: Uint8Array, providerSecret: Uint8Array, councilSecret: Uint8Array): EquiluxPrivateState => ({
  employeeSecret: new Uint8Array(32),
  employeeRecord: [0n, 0n, 0n, 0n, 0n],
  rowNonce: new Uint8Array(32),
  employerSecret,
  providerSecret,
  councilSecret,
  openings: padOpenings([]),
  payroll: padRecords([]),
  claim: buildClaim([]),
  variableClaim: buildVariableClaim([]),
  paySeal: { totals: zeroPayTotals(), claim: buildClaim([]), salt: new Uint8Array(32) },
  variableSeal: { totals: zeroVarTotals(), claim: buildVariableClaim([]), salt: new Uint8Array(32) },
  levelClaim: buildLevelClaim([]),
  levelSeal: { totals: zeroLevelTotals(), claim: buildLevelClaim([]), salt: new Uint8Array(32) },
  nextSalt: new Uint8Array(32),
});

export const witnesses: Witnesses<EquiluxPrivateState> = {
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

export { padRecords, buildClaim };

// ── v4: each phase is a list of transactions, planned up front ──────────────
// Seals and salts are computed before anything is sent, so a local simulation
// of the whole phase and the transactions that follow use the very same inputs.


export type Circuit =
  | "declareRoster" | "addPayrollRows" | "confirmPayroll" | "enroll" | "checkReceipt"
  | "beginReport" | "reportBatch" | "finishReport" | "beginVariableReport" | "variableBatch" | "finishVariableReport"
  | "beginLevelReport" | "levelBatch" | "finishLevelReport";

export interface Step { circuit: Circuit; ps: EquiluxPrivateState; args: unknown[]; label: string }

const randomSalt = () => globalThis.crypto.getRandomValues(new Uint8Array(32));

/** The provider declares the headcount, then commits the rows 16 per transaction. */
export function rosterSteps(base: EquiluxPrivateState, rows: Uint8Array[]): Step[] {
  const batches = chunk(rows);
  return [
    { circuit: "declareRoster", ps: base, args: [BigInt(rows.length)], label: `declare ${rows.length} payroll rows` },
    ...batches.map((b, i) => ({ circuit: "addPayrollRows" as const, ps: base, args: [padRows(b), BigInt(b.length)], label: `commit rows, batch ${i + 1} of ${batches.length}` })),
  ];
}

/** The works council opens the rows 16 per transaction. */
export function confirmSteps(base: EquiluxPrivateState, openings: Omit<RowOpening, "active">[]): Step[] {
  const batches = chunk(openings);
  return batches.map((b, i) => ({ circuit: "confirmPayroll" as const, ps: { ...base, openings: padOpenings(b) }, args: [], label: `council opens rows, batch ${i + 1} of ${batches.length}` }));
}

/** The pay report: begin, one batch per 16 records over sealed totals, finish. */
export function payReportSteps(base: EquiluxPrivateState, recs: Parameters<typeof padRecords>[0], claim: ReportClaim, salt = randomSalt): Step[] {
  const s0 = salt();
  const steps: Step[] = [{ circuit: "beginReport", ps: { ...base, claim, nextSalt: s0 }, args: [], label: "begin the pay report" }];
  let seal = { totals: zeroPayTotals(), claim, salt: s0 };
  const batches = chunk(recs);
  batches.forEach((b, i) => {
    const s1 = salt();
    steps.push({ circuit: "reportBatch", ps: { ...base, payroll: padRecords(b), paySeal: seal, nextSalt: s1 }, args: [], label: `pay report, batch ${i + 1} of ${batches.length}` });
    seal = { totals: addPayBatch(seal.totals, claim, b), claim, salt: s1 };
  });
  steps.push({ circuit: "finishReport", ps: { ...base, paySeal: seal }, args: [], label: "finish: verify every figure and publish" });
  return steps;
}

/** The variable-pay report, the same way; `bands` are per record, in order. */
export function variableReportSteps(base: EquiluxPrivateState, recs: Parameters<typeof padRecords>[0], claim: VariableClaim, bands: bigint[], salt = randomSalt): Step[] {
  const s0 = salt();
  const steps: Step[] = [{ circuit: "beginVariableReport", ps: { ...base, variableClaim: claim, nextSalt: s0 }, args: [], label: "begin the variable-pay report" }];
  let seal = { totals: zeroVarTotals(), claim, salt: s0 };
  const batches = chunk(recs), bandBatches = chunk(bands);
  batches.forEach((b, i) => {
    const s1 = salt();
    steps.push({ circuit: "variableBatch", ps: { ...base, payroll: padRecords(b, bandBatches[i]), variableSeal: seal, nextSalt: s1 }, args: [], label: `variable-pay report, batch ${i + 1} of ${batches.length}` });
    seal = { totals: addVarBatch(seal.totals, claim, b, bandBatches[i]), claim, salt: s1 };
  });
  steps.push({ circuit: "finishVariableReport", ps: { ...base, variableSeal: seal }, args: [], label: "finish: verify every figure and publish" });
  return steps;
}

/** The level report: begin, one batch per 16 records over sealed totals, finish. */
export function levelReportSteps(base: EquiluxPrivateState, recs: Parameters<typeof padRecords>[0], claim: LevelClaim, salt = randomSalt): Step[] {
  const s0 = salt();
  const steps: Step[] = [{ circuit: "beginLevelReport", ps: { ...base, levelClaim: claim, nextSalt: s0 }, args: [], label: "begin the level report" }];
  let seal = { totals: zeroLevelTotals(), claim, salt: s0 };
  const batches = chunk(recs);
  batches.forEach((b, i) => {
    const s1 = salt();
    steps.push({ circuit: "levelBatch", ps: { ...base, payroll: padRecords(b), levelSeal: seal, nextSalt: s1 }, args: [], label: `level report, batch ${i + 1} of ${batches.length}` });
    seal = { totals: addLevelBatch(seal.totals, b), claim, salt: s1 };
  });
  steps.push({ circuit: "finishLevelReport", ps: { ...base, levelSeal: seal }, args: [], label: "finish: verify every level and publish" });
  return steps;
}
