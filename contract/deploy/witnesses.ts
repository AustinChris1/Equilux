/**
 * Private-state container and witness implementations for the Equilux
 * contract, shared by the deployment CLI. Everything in here stays local:
 * witnesses feed circuit executions and never touch the public ledger.
 */
import type { Witnesses } from "../build/contract/index.js";

export type PayrollEntry = { salary: bigint; gender: bigint; sk: Uint8Array; active: boolean };

export interface EquiluxPrivateState {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint]; // salary, gender (0 = woman, 1 = man)
  employerSecret: Uint8Array;
  payroll: PayrollEntry[]; // exactly 16 slots (Vector<16>)
  claimedGapBps: bigint;
}

export const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  for (let i = 0; i < seed.length && i < 32; i++) b[i] = seed.charCodeAt(i);
  return b;
};

export const EMPTY_SLOT: PayrollEntry = {
  salary: 0n,
  gender: 0n,
  sk: new Uint8Array(32),
  active: false,
};

export const padPayroll = (records: PayrollEntry[]): PayrollEntry[] => [
  ...records,
  ...Array(16 - records.length).fill(EMPTY_SLOT),
];

export const initialPrivateState = (employerSecret: Uint8Array): EquiluxPrivateState => ({
  employeeSecret: new Uint8Array(32),
  employeeRecord: [0n, 0n],
  employerSecret,
  payroll: padPayroll([]),
  claimedGapBps: 0n,
});

export const witnesses: Witnesses<EquiluxPrivateState> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  claimedGapBps: ({ privateState }) => [privateState, privateState.claimedGapBps],
};
