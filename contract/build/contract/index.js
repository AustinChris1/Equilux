import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(1n, 1);

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_3 = __compactRuntime.CompactTypeBoolean;

class _EnrolledRecord_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      salary: _descriptor_0.fromValue(value_0),
      gender: _descriptor_1.fromValue(value_0),
      sk: _descriptor_2.fromValue(value_0),
      active: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.salary).concat(_descriptor_1.toValue(value_0.gender).concat(_descriptor_2.toValue(value_0.sk).concat(_descriptor_3.toValue(value_0.active))));
  }
}

const _descriptor_4 = new _EnrolledRecord_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _PayReport_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment())))));
  }
  fromValue(value_0) {
    return {
      round: _descriptor_0.fromValue(value_0),
      headcountWomen: _descriptor_6.fromValue(value_0),
      headcountMen: _descriptor_6.fromValue(value_0),
      meanGapBps: _descriptor_6.fromValue(value_0),
      gapFavorsMen: _descriptor_3.fromValue(value_0),
      meanGapAtOrAbove5pct: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.round).concat(_descriptor_6.toValue(value_0.headcountWomen).concat(_descriptor_6.toValue(value_0.headcountMen).concat(_descriptor_6.toValue(value_0.meanGapBps).concat(_descriptor_3.toValue(value_0.gapFavorsMen).concat(_descriptor_3.toValue(value_0.meanGapAtOrAbove5pct))))));
  }
}

const _descriptor_7 = new _PayReport_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_3.fromValue(value_0),
      value: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_some).concat(_descriptor_7.toValue(value_0.value));
  }
}

const _descriptor_8 = new _Maybe_0();

const _descriptor_9 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_9.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.field);
  }
}

const _descriptor_10 = new _MerkleTreeDigest_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_10.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_10.fromValue(value_0),
      goes_left: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_10.toValue(value_0.sibling).concat(_descriptor_3.toValue(value_0.goes_left));
  }
}

const _descriptor_11 = new _MerkleTreePathEntry_0();

const _descriptor_12 = new __compactRuntime.CompactTypeVector(5, _descriptor_11);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_12.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_2.fromValue(value_0),
      path: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.leaf).concat(_descriptor_12.toValue(value_0.path));
  }
}

const _descriptor_13 = new _MerkleTreePath_0();

const _descriptor_14 = new __compactRuntime.CompactTypeVector(16, _descriptor_4);

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_1.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_1.toValue(value_0[1]));
  }
}

const _descriptor_15 = new _tuple_0();

const _descriptor_16 = new __compactRuntime.CompactTypeVector(4, _descriptor_2);

const _descriptor_17 = new __compactRuntime.CompactTypeVector(3, _descriptor_2);

const _descriptor_18 = new __compactRuntime.CompactTypeVector(2, _descriptor_2);

const _descriptor_19 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_19.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_19.fromValue(value_0),
      data: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_19.toValue(value_0.domain_sep).concat(_descriptor_2.toValue(value_0.data));
  }
}

const _descriptor_20 = new _LeafPreimage_0();

const _descriptor_21 = new __compactRuntime.CompactTypeVector(2, _descriptor_9);

class _Either_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_3.fromValue(value_0),
      left: _descriptor_2.fromValue(value_0),
      right: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_left).concat(_descriptor_2.toValue(value_0.left).concat(_descriptor_2.toValue(value_0.right)));
  }
}

const _descriptor_22 = new _Either_0();

const _descriptor_23 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_24 = new _ContractAddress_0();

const _descriptor_25 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.employeeSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named employeeSecret');
    }
    if (typeof(witnesses_0.employeeRecord) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named employeeRecord');
    }
    if (typeof(witnesses_0.employerSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named employerSecret');
    }
    if (typeof(witnesses_0.payrollRecords) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named payrollRecords');
    }
    if (typeof(witnesses_0.claimedGapBps) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named claimedGapBps');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      publicKey(context, ...args_1) {
        return { result: pureCircuits.publicKey(...args_1), context };
      },
      enroll: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`enroll: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('enroll',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 89 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._enroll_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      attest: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`attest: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cm_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('attest',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 106 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cm_0.buffer instanceof ArrayBuffer && cm_0.BYTES_PER_ELEMENT === 1 && cm_0.length === 32)) {
          __compactRuntime.typeError('attest',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 106 char 1',
                                     'Bytes<32>',
                                     cm_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(cm_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._attest_0(context, partialProofData, cm_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      checkReceipt: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`checkReceipt: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const path_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('checkReceipt',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 114 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(path_0) === 'object' && path_0.leaf.buffer instanceof ArrayBuffer && path_0.leaf.BYTES_PER_ELEMENT === 1 && path_0.leaf.length === 32 && Array.isArray(path_0.path) && path_0.path.length === 5 && path_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
          __compactRuntime.typeError('checkReceipt',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 114 char 1',
                                     'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<5, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                     path_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_13.toValue(path_0),
            alignment: _descriptor_13.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkReceipt_0(context, partialProofData, path_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      publishReport: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`publishReport: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('publishReport',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 141 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._publishReport_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_7.toValue(result_0), alignment: _descriptor_7.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      enroll: this.circuits.enroll,
      attest: this.circuits.attest,
      checkReceipt: this.circuits.checkReceipt,
      publishReport: this.circuits.publishReport
    };
    this.provableCircuits = {
      enroll: this.circuits.enroll,
      attest: this.circuits.attest,
      checkReceipt: this.circuits.checkReceipt,
      publishReport: this.circuits.publishReport
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const employerPkInit_0 = args_0[1];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(employerPkInit_0.buffer instanceof ArrayBuffer && employerPkInit_0.BYTES_PER_ELEMENT === 1 && employerPkInit_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'equilux.compact line 53 char 1',
                                 'Bytes<32>',
                                 employerPkInit_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('enroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('attest', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkReceipt', new __compactRuntime.ContractOperation());
    state_0.setOperation('publishReport', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(0n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(1n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(2n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(3n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(5)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                        alignment: _descriptor_5.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(4n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(5n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(6n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue({ is_some: false, value: { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false } }),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(0n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(employerPkInit_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(1n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_6.toValue(tmp_0),
                                                                alignment: _descriptor_6.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._none_0();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(6n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_1),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false } };
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_1({ domain_sep:
                                                                                    new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                  data:
                                                                                    path_0.leaf })),
                              path_0.path) };
  }
  _merkleTreePathEntryRoot_0(recursiveDigest_0, entry_0) {
    const left_0 = entry_0.goes_left ? recursiveDigest_0 : entry_0.sibling.field;
    const right_0 = entry_0.goes_left ?
                    entry_0.sibling.field :
                    recursiveDigest_0;
    return this._transientHash_0([left_0, right_0]);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_21, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_16, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_17, value_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _employeeSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.employeeSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('employeeSecret',
                                 'return value',
                                 'equilux.compact line 61 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _employeeRecord_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.employeeRecord(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 4294967295n && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 1n)) {
      __compactRuntime.typeError('employeeRecord',
                                 'return value',
                                 'equilux.compact line 62 char 1',
                                 '[Uint<0..4294967296>, Uint<0..2>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_15.toValue(result_0),
      alignment: _descriptor_15.alignment()
    });
    return result_0;
  }
  _employerSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.employerSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('employerSecret',
                                 'return value',
                                 'equilux.compact line 63 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _payrollRecords_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.payrollRecords(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 16 && result_0.every((t) => typeof(t) === 'object' && typeof(t.salary) === 'bigint' && t.salary >= 0n && t.salary <= 4294967295n && typeof(t.gender) === 'bigint' && t.gender >= 0n && t.gender <= 1n && t.sk.buffer instanceof ArrayBuffer && t.sk.BYTES_PER_ELEMENT === 1 && t.sk.length === 32 && typeof(t.active) === 'boolean'))) {
      __compactRuntime.typeError('payrollRecords',
                                 'return value',
                                 'equilux.compact line 64 char 1',
                                 'Vector<16, struct EnrolledRecord<salary: Uint<0..4294967296>, gender: Uint<0..2>, sk: Bytes<32>, active: Boolean>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_14.toValue(result_0),
      alignment: _descriptor_14.alignment()
    });
    return result_0;
  }
  _claimedGapBps_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.claimedGapBps(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 65535n)) {
      __compactRuntime.typeError('claimedGapBps',
                                 'return value',
                                 'equilux.compact line 65 char 1',
                                 'Uint<0..65536>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _publicKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _recordCommitment_0(salary_0, gender_0, sk_0, r_0) {
    return this._persistentHash_2([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 114, 101, 99, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        r_0,
                                                                        'equilux.compact line 76 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        __compactRuntime.addField(__compactRuntime.mulField(salary_0,
                                                                                                                            2n),
                                                                                                  gender_0),
                                                                        'equilux.compact line 77 char 6'),
                                   sk_0]);
  }
  _enrollmentNullifier_0(sk_0, r_0) {
    return this._persistentHash_3([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 110, 117, 108, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        r_0,
                                                                        'equilux.compact line 82 char 73'),
                                   sk_0]);
  }
  _enroll_0(context, partialProofData) {
    const sk_0 = this._employeeSecret_0(context, partialProofData);
    const __compact_pattern_tmp1_0 = this._employeeRecord_0(context,
                                                            partialProofData);
    const salary_0 = __compact_pattern_tmp1_0[0];
    const gender_0 = __compact_pattern_tmp1_0[1];
    const r_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_25.toValue(1n),
                                                                                                      alignment: _descriptor_25.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value);
    const nul_0 = this._enrollmentNullifier_0(sk_0, r_0);
    __compactRuntime.assert(!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_25.toValue(4n),
                                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(nul_0),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'already enrolled this round');
    const cm_0 = this._recordCommitment_0(salary_0, gender_0, sk_0, r_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(4n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(nul_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(3n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(0n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(1n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_2.toValue(cm_0),
                                                                                                alignment: _descriptor_2.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(1n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(2n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_6.toValue(tmp_0),
                                                                alignment: _descriptor_6.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return cm_0;
  }
  _attest_0(context, partialProofData, cm_0) {
    __compactRuntime.assert(this._equal_0(this._publicKey_0(this._employerSecret_0(context,
                                                                                   partialProofData)),
                                          _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_25.toValue(0n),
                                                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the employer');
    __compactRuntime.assert(!_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_25.toValue(5n),
                                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'already attested');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_25.toValue(5n),
                                                                  alignment: _descriptor_25.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _checkReceipt_0(context, partialProofData, path_0) {
    const tmp_0 = this._merkleTreePathRoot_0(path_0);
    return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_25.toValue(3n),
                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_25.toValue(0n),
                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                      'root',
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_10.alignment() }).encode() } },
                                                                      'eq',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _womenSalary_0(rec_0) {
    if (rec_0.active && this._equal_1(rec_0.gender, 0n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _menSalary_0(rec_0) {
    if (rec_0.active && this._equal_2(rec_0.gender, 1n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _womenCount_0(rec_0) {
    if (rec_0.active && this._equal_3(rec_0.gender, 0n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _menCount_0(rec_0) {
    if (rec_0.active && this._equal_4(rec_0.gender, 1n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _activeCount_0(rec_0) { if (rec_0.active) { return 1n; } else { return 0n; } }
  _publishReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_5(this._publicKey_0(this._employerSecret_0(context,
                                                                                   partialProofData)),
                                          _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_25.toValue(0n),
                                                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the employer');
    const recs_0 = this._payrollRecords_0(context, partialProofData);
    const r_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_25.toValue(1n),
                                                                                                      alignment: _descriptor_25.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value);
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_0, i_0) =>
                    {
                      if (recs_0[i_0].active) {
                        const cm_0 = this._recordCommitment_0(recs_0[i_0].salary,
                                                              recs_0[i_0].gender,
                                                              recs_0[i_0].sk,
                                                              r_0);
                        __compactRuntime.assert(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_25.toValue(5n),
                                                                                                                                      alignment: _descriptor_25.alignment() } }] } },
                                                                                                           { push: { storage: false,
                                                                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                                                                                                                  alignment: _descriptor_2.alignment() }).encode() } },
                                                                                                           'member',
                                                                                                           { popeq: { cached: true,
                                                                                                                      result: undefined } }]).value),
                                                'record not attested by employer');
                        let tmp_0;
                        __compactRuntime.assert((tmp_0 = this._enrollmentNullifier_0(recs_0[i_0].sk,
                                                                                     r_0),
                                                 _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_25.toValue(4n),
                                                                                                                                       alignment: _descriptor_25.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                                                                                                                   alignment: _descriptor_2.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value)),
                                                'record not enrolled');
                      }
                      return t_0;
                    }),
                   [],
                   [0n,
                    1n,
                    2n,
                    3n,
                    4n,
                    5n,
                    6n,
                    7n,
                    8n,
                    9n,
                    10n,
                    11n,
                    12n,
                    13n,
                    14n,
                    15n]);
    this._folder_3(context,
                   partialProofData,
                   ((context, partialProofData, t_1, i_1) =>
                    {
                      this._folder_2(context,
                                     partialProofData,
                                     ((context, partialProofData, t_2, j_0) =>
                                      {
                                        if (i_1 < j_0 && recs_0[i_1].active
                                            &&
                                            recs_0[j_0].active)
                                        {
                                          __compactRuntime.assert(!this._equal_6(recs_0[i_1].sk,
                                                                                 recs_0[j_0].sk),
                                                                  'duplicate record in payroll witness');
                                        }
                                        return t_2;
                                      }),
                                     [],
                                     [0n,
                                      1n,
                                      2n,
                                      3n,
                                      4n,
                                      5n,
                                      6n,
                                      7n,
                                      8n,
                                      9n,
                                      10n,
                                      11n,
                                      12n,
                                      13n,
                                      14n,
                                      15n]);
                      return t_1;
                    }),
                   [],
                   [0n,
                    1n,
                    2n,
                    3n,
                    4n,
                    5n,
                    6n,
                    7n,
                    8n,
                    9n,
                    10n,
                    11n,
                    12n,
                    13n,
                    14n,
                    15n]);
    const nActive_0 = this._folder_4(context,
                                     partialProofData,
                                     ((context, partialProofData, acc_0, rec_0) =>
                                      {
                                        return ((t1) => {
                                                 if (t1 > 65535n) {
                                                   throw new __compactRuntime.CompactError('equilux.compact line 167 char 38: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                 }
                                                 return t1;
                                               })(acc_0
                                                  +
                                                  this._activeCount_0(rec_0));
                                      }),
                                     0n,
                                     recs_0);
    __compactRuntime.assert(nActive_0
                            ===
                            _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_25.toValue(2n),
                                                                                                                  alignment: _descriptor_25.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'payroll witness must cover every enrolled employee');
    const cntW_0 = this._folder_5(context,
                                  partialProofData,
                                  ((context, partialProofData, acc_1, rec_1) =>
                                   {
                                     return ((t1) => {
                                              if (t1 > 255n) {
                                                throw new __compactRuntime.CompactError('equilux.compact line 170 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                              }
                                              return t1;
                                            })(acc_1 + this._womenCount_0(rec_1));
                                   }),
                                  0n,
                                  recs_0);
    const cntM_0 = this._folder_6(context,
                                  partialProofData,
                                  ((context, partialProofData, acc_2, rec_2) =>
                                   {
                                     return ((t1) => {
                                              if (t1 > 255n) {
                                                throw new __compactRuntime.CompactError('equilux.compact line 171 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                              }
                                              return t1;
                                            })(acc_2 + this._menCount_0(rec_2));
                                   }),
                                  0n,
                                  recs_0);
    __compactRuntime.assert(cntW_0 !== 0n, 'no women in reporting set');
    __compactRuntime.assert(cntM_0 !== 0n, 'no men in reporting set');
    const sumW_0 = this._folder_7(context,
                                  partialProofData,
                                  ((context, partialProofData, acc_3, rec_3) =>
                                   {
                                     return ((t1) => {
                                              if (t1 > 1099511627775n) {
                                                throw new __compactRuntime.CompactError('equilux.compact line 175 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                              }
                                              return t1;
                                            })(acc_3
                                               +
                                               this._womenSalary_0(rec_3));
                                   }),
                                  0n,
                                  recs_0);
    const sumM_0 = this._folder_8(context,
                                  partialProofData,
                                  ((context, partialProofData, acc_4, rec_4) =>
                                   {
                                     return ((t1) => {
                                              if (t1 > 1099511627775n) {
                                                throw new __compactRuntime.CompactError('equilux.compact line 176 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                              }
                                              return t1;
                                            })(acc_4 + this._menSalary_0(rec_4));
                                   }),
                                  0n,
                                  recs_0);
    let t_3;
    const favorsMen_0 = (t_3 = sumM_0 * cntW_0, t_3 >= sumW_0 * cntM_0);
    let t_6, t_7, t_4, t_5;
    const diff_0 = favorsMen_0 ?
                   (t_6 = sumM_0 * cntW_0,
                    (t_7 = sumW_0 * cntM_0,
                     (__compactRuntime.assert(t_6 >= t_7,
                                              'result of subtraction would be negative'),
                      t_6 - t_7)))
                   :
                   (t_4 = sumW_0 * cntM_0,
                    (t_5 = sumM_0 * cntW_0,
                     (__compactRuntime.assert(t_4 >= t_5,
                                              'result of subtraction would be negative'),
                      t_4 - t_5)));
    const base_0 = favorsMen_0 ? sumM_0 * cntW_0 : sumW_0 * cntM_0;
    const g_0 = this._claimedGapBps_0(context, partialProofData);
    let t_8;
    __compactRuntime.assert((t_8 = g_0 * base_0, t_8 <= diff_0 * 10000n),
                            'claimed gap too high');
    let t_9;
    __compactRuntime.assert((t_9 = diff_0 * 10000n, t_9 < (g_0 + 1n) * base_0),
                            'claimed gap too low');
    const report_0 = { round:
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('equilux.compact line 190 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_25.toValue(1n),
                                                                                                                  alignment: _descriptor_25.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)),
                       headcountWomen: cntW_0,
                       headcountMen: cntM_0,
                       meanGapBps: g_0,
                       gapFavorsMen: favorsMen_0,
                       meanGapAtOrAbove5pct: g_0 >= 500n };
    const tmp_1 = this._some_0(report_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(6n),
                                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_1),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return report_0;
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 5; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_3(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_4(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_5(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_6(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_7(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_8(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get employerPk() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_25.toValue(0n),
                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get round() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_25.toValue(1n),
                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get enrolled() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_25.toValue(2n),
                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    commitments: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(3n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(1n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(32n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'equilux.compact line 48 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(3n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(0n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          'root',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_10.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'equilux.compact line 48 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'equilux.compact line 48 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(5, _descriptor_2).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_2.toValue(leaf_0),      alignment: _descriptor_2.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'equilux.compact line 48 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(5, _descriptor_2).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_2.toValue(leaf_0),      alignment: _descriptor_2.alignment()    }  )?.value);
      }
    },
    nullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(4n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(4n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'equilux.compact line 49 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(4n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map((elem) => _descriptor_2.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    attested: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(5n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(5n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'equilux.compact line 50 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(5n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map((elem) => _descriptor_2.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get latestReport() {
      return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_25.toValue(6n),
                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  employeeSecret: (...args) => undefined,
  employeeRecord: (...args) => undefined,
  employerSecret: (...args) => undefined,
  payrollRecords: (...args) => undefined,
  claimedGapBps: (...args) => undefined
});
export const pureCircuits = {
  publicKey: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`publicKey: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 1',
                                 'equilux.compact line 69 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._publicKey_0(sk_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
