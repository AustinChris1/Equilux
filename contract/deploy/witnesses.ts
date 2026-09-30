/**
 * Private-state container and witness implementations for Equilux v2, shared
 * by the API server and the CLI demo. Everything in here stays local: witnesses
 * feed circuit executions and never touch the public ledger.
 *
 * In production each party runs its own prover with only its own secret — the
 * employee holds `employeeSecret`, the payroll provider `providerSecret`, the
 * employer `employerSecret` and the payroll. The local demo API plays all three
 * roles from one process, so one container holds every field.
 */
import type { Witnesses } from "../build/contract/index.js";
import { buildClaim, padRecords, type ReportClaim } from "./claims.js";

export type PayrollSlot = ReturnType<typeof padRecords>[number];

export interface EquiluxPrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint]; // salary, gender (0 = woman, 1 = man), category 0..3
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  payroll: PayrollSlot[]; // exactly 16 slots (Vector<16>)
  claim: ReportClaim;
}

export const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

export const initialPrivateState = (employerSecret: Uint8Array, providerSecret: Uint8Array): EquiluxPrivateState => ({
  employeeSecret: new Uint8Array(32),
  employeeRecord: [0n, 0n, 0n],
  employerSecret,
  providerSecret,
  payroll: padRecords([]),
  claim: buildClaim([]),
});

export const witnesses: Witnesses<EquiluxPrivateState> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  providerSecret: ({ privateState }) => [privateState, privateState.providerSecret],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  reportClaim: ({ privateState }) => [privateState, privateState.claim],
};

export { padRecords, buildClaim };
