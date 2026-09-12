import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type PayReport = { round: bigint;
                          headcountWomen: bigint;
                          headcountMen: bigint;
                          meanGapBps: bigint;
                          gapFavorsMen: boolean;
                          meanGapAtOrAbove5pct: boolean
                        };

export type Witnesses<PS> = {
  employeeSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  employeeRecord(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, [bigint,
                                                                              bigint]];
  employerSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  payrollRecords(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, { salary: bigint,
                                                                               gender: bigint,
                                                                               sk: Uint8Array,
                                                                               active: boolean
                                                                             }[]];
  claimedGapBps(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
}

export type ImpureCircuits<PS> = {
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  attest(context: __compactRuntime.CircuitContext<PS>, cm_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
}

export type ProvableCircuits<PS> = {
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  attest(context: __compactRuntime.CircuitContext<PS>, cm_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  attest(context: __compactRuntime.CircuitContext<PS>, cm_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
}

export type Ledger = {
  readonly employerPk: Uint8Array;
  readonly round: bigint;
  readonly enrolled: bigint;
  commitments: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined
  };
  nullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  attested: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly latestReport: { is_some: boolean, value: PayReport };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               employerPkInit_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
