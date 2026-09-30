/**
 * Private-state container and witness implementations for Equilux v2, shared
 * by the API server and the CLI demo. Everything in here stays local: witnesses
 * feed circuit executions and never touch the public ledger.
 *
 * In production each party runs its own prover with only its own secret — the
 * employee holds `employeeSecret` and the `rowNonce` from their payslip, the payroll provider `providerSecret`, the
 * employer `employerSecret` and the payroll. The local demo API plays all three
 * roles from one process, so one container holds every field.
 */
import type { Witnesses } from "../build/contract/index.js";
import { buildClaim, buildVariableClaim, padOpenings, padRecords, type ReportClaim, type RowOpening, type VariableClaim } from "./claims.js";

export type PayrollSlot = ReturnType<typeof padRecords>[number];

export interface EquiluxPrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint, bigint]; // salary, variable pay, gender (0 = woman, 1 = man), category 0..3
  rowNonce: Uint8Array; // blinds the employee's payroll row; delivered with the payslip
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  councilSecret: Uint8Array;
  openings: RowOpening[]; // the works council's view of the payroll, 16 slots
  payroll: PayrollSlot[]; // exactly 16 slots (Vector<16>)
  claim: ReportClaim;
  variableClaim: VariableClaim;
}

export const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

export const initialPrivateState = (employerSecret: Uint8Array, providerSecret: Uint8Array, councilSecret: Uint8Array): EquiluxPrivateState => ({
  employeeSecret: new Uint8Array(32),
  employeeRecord: [0n, 0n, 0n, 0n],
  rowNonce: new Uint8Array(32),
  employerSecret,
  providerSecret,
  councilSecret,
  openings: padOpenings([]),
  payroll: padRecords([]),
  claim: buildClaim([]),
  variableClaim: buildVariableClaim([]),
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
};

export { padRecords, buildClaim };
