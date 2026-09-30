import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type CategoryStats = { headcountWomen: bigint;
                              headcountMen: bigint;
                              disclosed: boolean;
                              meanWomen: bigint;
                              meanMen: bigint;
                              meanGapBps: bigint;
                              gapFavorsMen: boolean;
                              gapAtOrAbove5pct: boolean
                            };

export type PayReport = { round: bigint;
                          headcountWomen: bigint;
                          headcountMen: bigint;
                          meanGapBps: bigint;
                          gapFavorsMen: boolean;
                          meanGapAtOrAbove5pct: boolean;
                          medianGapBps: bigint;
                          medianFavorsMen: boolean;
                          categories: CategoryStats[]
                        };

export type VariableCategoryStats = { recipientsWomen: bigint;
                                      recipientsMen: bigint;
                                      disclosed: boolean;
                                      meanGapBps: bigint;
                                      gapFavorsMen: boolean
                                    };

export type QuartileBand = { women: bigint; men: bigint };

export type VariablePayReport = { round: bigint;
                                  headcountWomen: bigint;
                                  headcountMen: bigint;
                                  recipientsWomen: bigint;
                                  recipientsMen: bigint;
                                  gapDefined: boolean;
                                  meanGapBps: bigint;
                                  meanFavorsMen: boolean;
                                  medianGapBps: bigint;
                                  medianFavorsMen: boolean;
                                  quartiles: QuartileBand[];
                                  categories: VariableCategoryStats[]
                                };

export type EnrolledRecord = { salary: bigint;
                               variable: bigint;
                               gender: bigint;
                               category: bigint;
                               sk: Uint8Array;
                               active: boolean;
                               band: bigint
                             };

export type RowOpening = { salary: bigint;
                           variable: bigint;
                           gender: bigint;
                           category: bigint;
                           nonce: Uint8Array;
                           active: boolean
                         };

export type VariableClaim = { meanGapBps: bigint;
                              medianWomen: bigint;
                              medianMen: bigint;
                              medianGapBps: bigint;
                              catGapBps: bigint[]
                            };

export type ReportClaim = { meanGapBps: bigint;
                            medianWomen: bigint;
                            medianMen: bigint;
                            medianGapBps: bigint;
                            catMeanWomen: bigint[];
                            catMeanMen: bigint[];
                            catGapBps: bigint[]
                          };

export type Witnesses<PS> = {
  employeeSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  employeeRecord(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, [bigint,
                                                                              bigint,
                                                                              bigint,
                                                                              bigint]];
  payrollRowNonce(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  employerSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  providerSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  councilSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  payrollOpenings(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, RowOpening[]];
  payrollRecords(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, EnrolledRecord[]];
  reportClaim(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, ReportClaim];
  variableClaim(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, VariableClaim];
}

export type ImpureCircuits<PS> = {
  declareRoster(context: __compactRuntime.CircuitContext<PS>,
                rows_0: Uint8Array[],
                headcount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  confirmPayroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
  publishVariablePay(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, VariablePayReport>;
}

export type ProvableCircuits<PS> = {
  declareRoster(context: __compactRuntime.CircuitContext<PS>,
                rows_0: Uint8Array[],
                headcount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  confirmPayroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
  publishVariablePay(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, VariablePayReport>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
  payrollRow(salary_0: bigint,
             variable_0: bigint,
             gender_0: bigint,
             category_0: bigint,
             nonce_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  publicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  payrollRow(context: __compactRuntime.CircuitContext<PS>,
             salary_0: bigint,
             variable_0: bigint,
             gender_0: bigint,
             category_0: bigint,
             nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  declareRoster(context: __compactRuntime.CircuitContext<PS>,
                rows_0: Uint8Array[],
                headcount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  confirmPayroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  enroll(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  checkReceipt(context: __compactRuntime.CircuitContext<PS>,
               path_0: { leaf: Uint8Array,
                         path: { sibling: { field: bigint }, goes_left: boolean
                               }[]
                       }): __compactRuntime.CircuitResults<PS, boolean>;
  publishReport(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, PayReport>;
  publishVariablePay(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, VariablePayReport>;
}

export type Ledger = {
  readonly employerPk: Uint8Array;
  readonly providerPk: Uint8Array;
  readonly councilPk: Uint8Array;
  readonly round: bigint;
  readonly rosterDeclared: boolean;
  readonly payrollConfirmed: boolean;
  readonly declaredHeadcount: bigint;
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
  payrollRows: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  claimedRows: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  bound: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly latestReport: { is_some: boolean, value: PayReport };
  readonly latestVariableReport: { is_some: boolean, value: VariablePayReport };
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
               employerPkInit_0: Uint8Array,
               providerPkInit_0: Uint8Array,
               councilPkInit_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
