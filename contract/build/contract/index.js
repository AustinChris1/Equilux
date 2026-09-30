import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _CategoryStats_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment())))))));
  }
  fromValue(value_0) {
    return {
      headcountWomen: _descriptor_3.fromValue(value_0),
      headcountMen: _descriptor_3.fromValue(value_0),
      disclosed: _descriptor_1.fromValue(value_0),
      meanWomen: _descriptor_2.fromValue(value_0),
      meanMen: _descriptor_2.fromValue(value_0),
      meanGapBps: _descriptor_4.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0),
      gapAtOrAbove5pct: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.headcountWomen).concat(_descriptor_3.toValue(value_0.headcountMen).concat(_descriptor_1.toValue(value_0.disclosed).concat(_descriptor_2.toValue(value_0.meanWomen).concat(_descriptor_2.toValue(value_0.meanMen).concat(_descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen).concat(_descriptor_1.toValue(value_0.gapAtOrAbove5pct))))))));
  }
}

const _descriptor_5 = new _CategoryStats_0();

const _descriptor_6 = new __compactRuntime.CompactTypeVector(4, _descriptor_5);

class _PayReport_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      round: _descriptor_2.fromValue(value_0),
      headcountWomen: _descriptor_3.fromValue(value_0),
      headcountMen: _descriptor_3.fromValue(value_0),
      meanGapBps: _descriptor_4.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0),
      meanGapAtOrAbove5pct: _descriptor_1.fromValue(value_0),
      medianGapBps: _descriptor_4.fromValue(value_0),
      medianFavorsMen: _descriptor_1.fromValue(value_0),
      categories: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.round).concat(_descriptor_3.toValue(value_0.headcountWomen).concat(_descriptor_3.toValue(value_0.headcountMen).concat(_descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen).concat(_descriptor_1.toValue(value_0.meanGapAtOrAbove5pct).concat(_descriptor_4.toValue(value_0.medianGapBps).concat(_descriptor_1.toValue(value_0.medianFavorsMen).concat(_descriptor_6.toValue(value_0.categories)))))))));
  }
}

const _descriptor_7 = new _PayReport_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_7.toValue(value_0.value));
  }
}

const _descriptor_8 = new _Maybe_0();

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _QuartileBand_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      women: _descriptor_3.fromValue(value_0),
      men: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.women).concat(_descriptor_3.toValue(value_0.men));
  }
}

const _descriptor_10 = new _QuartileBand_0();

const _descriptor_11 = new __compactRuntime.CompactTypeVector(4, _descriptor_10);

class _VariableCategoryStats_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      recipientsWomen: _descriptor_3.fromValue(value_0),
      recipientsMen: _descriptor_3.fromValue(value_0),
      disclosed: _descriptor_1.fromValue(value_0),
      meanGapBps: _descriptor_4.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.recipientsWomen).concat(_descriptor_3.toValue(value_0.recipientsMen).concat(_descriptor_1.toValue(value_0.disclosed).concat(_descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen)))));
  }
}

const _descriptor_12 = new _VariableCategoryStats_0();

const _descriptor_13 = new __compactRuntime.CompactTypeVector(4, _descriptor_12);

class _VariablePayReport_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_11.alignment().concat(_descriptor_13.alignment())))))))))));
  }
  fromValue(value_0) {
    return {
      round: _descriptor_2.fromValue(value_0),
      headcountWomen: _descriptor_3.fromValue(value_0),
      headcountMen: _descriptor_3.fromValue(value_0),
      recipientsWomen: _descriptor_3.fromValue(value_0),
      recipientsMen: _descriptor_3.fromValue(value_0),
      gapDefined: _descriptor_1.fromValue(value_0),
      meanGapBps: _descriptor_4.fromValue(value_0),
      meanFavorsMen: _descriptor_1.fromValue(value_0),
      medianGapBps: _descriptor_4.fromValue(value_0),
      medianFavorsMen: _descriptor_1.fromValue(value_0),
      quartiles: _descriptor_11.fromValue(value_0),
      categories: _descriptor_13.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.round).concat(_descriptor_3.toValue(value_0.headcountWomen).concat(_descriptor_3.toValue(value_0.headcountMen).concat(_descriptor_3.toValue(value_0.recipientsWomen).concat(_descriptor_3.toValue(value_0.recipientsMen).concat(_descriptor_1.toValue(value_0.gapDefined).concat(_descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.meanFavorsMen).concat(_descriptor_4.toValue(value_0.medianGapBps).concat(_descriptor_1.toValue(value_0.medianFavorsMen).concat(_descriptor_11.toValue(value_0.quartiles).concat(_descriptor_13.toValue(value_0.categories))))))))))));
  }
}

const _descriptor_14 = new _VariablePayReport_0();

class _Maybe_1 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_14.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_14.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_14.toValue(value_0.value));
  }
}

const _descriptor_15 = new _Maybe_1();

const _descriptor_16 = new __compactRuntime.CompactTypeUnsignedInteger(1n, 1);

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(3n, 1);

class _EnrolledRecord_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_16.alignment().concat(_descriptor_17.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_17.alignment()))))));
  }
  fromValue(value_0) {
    return {
      salary: _descriptor_2.fromValue(value_0),
      variable: _descriptor_2.fromValue(value_0),
      gender: _descriptor_16.fromValue(value_0),
      category: _descriptor_17.fromValue(value_0),
      sk: _descriptor_0.fromValue(value_0),
      active: _descriptor_1.fromValue(value_0),
      band: _descriptor_17.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.salary).concat(_descriptor_2.toValue(value_0.variable).concat(_descriptor_16.toValue(value_0.gender).concat(_descriptor_17.toValue(value_0.category).concat(_descriptor_0.toValue(value_0.sk).concat(_descriptor_1.toValue(value_0.active).concat(_descriptor_17.toValue(value_0.band)))))));
  }
}

const _descriptor_18 = new _EnrolledRecord_0();

const _descriptor_19 = new __compactRuntime.CompactTypeVector(16, _descriptor_18);

const _descriptor_20 = new __compactRuntime.CompactTypeVector(4, _descriptor_4);

class _VariableClaim_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_20.alignment()))));
  }
  fromValue(value_0) {
    return {
      meanGapBps: _descriptor_4.fromValue(value_0),
      medianWomen: _descriptor_2.fromValue(value_0),
      medianMen: _descriptor_2.fromValue(value_0),
      medianGapBps: _descriptor_4.fromValue(value_0),
      catGapBps: _descriptor_20.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_2.toValue(value_0.medianWomen).concat(_descriptor_2.toValue(value_0.medianMen).concat(_descriptor_4.toValue(value_0.medianGapBps).concat(_descriptor_20.toValue(value_0.catGapBps)))));
  }
}

const _descriptor_21 = new _VariableClaim_0();

const _descriptor_22 = new __compactRuntime.CompactTypeUnsignedInteger(1099511627775n, 5);

class _tuple_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_1.fromValue(value_0),
      _descriptor_1.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0[0]).concat(_descriptor_1.toValue(value_0[1]));
  }
}

const _descriptor_23 = new _tuple_0();

const _descriptor_24 = new __compactRuntime.CompactTypeUnsignedInteger(7n, 1);

const _descriptor_25 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_25.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_25.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_25.toValue(value_0.field);
  }
}

const _descriptor_26 = new _MerkleTreeDigest_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_26.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_26.fromValue(value_0),
      goes_left: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_26.toValue(value_0.sibling).concat(_descriptor_1.toValue(value_0.goes_left));
  }
}

const _descriptor_27 = new _MerkleTreePathEntry_0();

const _descriptor_28 = new __compactRuntime.CompactTypeVector(5, _descriptor_27);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_28.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_0.fromValue(value_0),
      path: _descriptor_28.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.leaf).concat(_descriptor_28.toValue(value_0.path));
  }
}

const _descriptor_29 = new _MerkleTreePath_0();

const _descriptor_30 = new __compactRuntime.CompactTypeVector(16, _descriptor_0);

const _descriptor_31 = new __compactRuntime.CompactTypeVector(4, _descriptor_2);

class _ReportClaim_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_31.alignment().concat(_descriptor_31.alignment().concat(_descriptor_20.alignment()))))));
  }
  fromValue(value_0) {
    return {
      meanGapBps: _descriptor_4.fromValue(value_0),
      medianWomen: _descriptor_2.fromValue(value_0),
      medianMen: _descriptor_2.fromValue(value_0),
      medianGapBps: _descriptor_4.fromValue(value_0),
      catMeanWomen: _descriptor_31.fromValue(value_0),
      catMeanMen: _descriptor_31.fromValue(value_0),
      catGapBps: _descriptor_20.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.meanGapBps).concat(_descriptor_2.toValue(value_0.medianWomen).concat(_descriptor_2.toValue(value_0.medianMen).concat(_descriptor_4.toValue(value_0.medianGapBps).concat(_descriptor_31.toValue(value_0.catMeanWomen).concat(_descriptor_31.toValue(value_0.catMeanMen).concat(_descriptor_20.toValue(value_0.catGapBps)))))));
  }
}

const _descriptor_32 = new _ReportClaim_0();

class _RowOpening_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_16.alignment().concat(_descriptor_17.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())))));
  }
  fromValue(value_0) {
    return {
      salary: _descriptor_2.fromValue(value_0),
      variable: _descriptor_2.fromValue(value_0),
      gender: _descriptor_16.fromValue(value_0),
      category: _descriptor_17.fromValue(value_0),
      nonce: _descriptor_0.fromValue(value_0),
      active: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.salary).concat(_descriptor_2.toValue(value_0.variable).concat(_descriptor_16.toValue(value_0.gender).concat(_descriptor_17.toValue(value_0.category).concat(_descriptor_0.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.active))))));
  }
}

const _descriptor_33 = new _RowOpening_0();

const _descriptor_34 = new __compactRuntime.CompactTypeVector(16, _descriptor_33);

class _tuple_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_16.alignment().concat(_descriptor_17.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_2.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_16.fromValue(value_0),
      _descriptor_17.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0[0]).concat(_descriptor_2.toValue(value_0[1]).concat(_descriptor_16.toValue(value_0[2]).concat(_descriptor_17.toValue(value_0[3]))));
  }
}

const _descriptor_35 = new _tuple_1();

const _descriptor_36 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

const _descriptor_37 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_37.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_37.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_37.toValue(value_0.domain_sep).concat(_descriptor_0.toValue(value_0.data));
  }
}

const _descriptor_38 = new _LeafPreimage_0();

const _descriptor_39 = new __compactRuntime.CompactTypeVector(5, _descriptor_0);

const _descriptor_40 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_41 = new __compactRuntime.CompactTypeVector(4, _descriptor_0);

const _descriptor_42 = new __compactRuntime.CompactTypeVector(2, _descriptor_25);

class _Either_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_1.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_43 = new _Either_0();

const _descriptor_44 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_45 = new _ContractAddress_0();

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
    if (typeof(witnesses_0.payrollRowNonce) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named payrollRowNonce');
    }
    if (typeof(witnesses_0.employerSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named employerSecret');
    }
    if (typeof(witnesses_0.providerSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named providerSecret');
    }
    if (typeof(witnesses_0.councilSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named councilSecret');
    }
    if (typeof(witnesses_0.payrollOpenings) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named payrollOpenings');
    }
    if (typeof(witnesses_0.payrollRecords) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named payrollRecords');
    }
    if (typeof(witnesses_0.reportClaim) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named reportClaim');
    }
    if (typeof(witnesses_0.variableClaim) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named variableClaim');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      publicKey(context, ...args_1) {
        return { result: pureCircuits.publicKey(...args_1), context };
      },
      payrollRow(context, ...args_1) {
        return { result: pureCircuits.payrollRow(...args_1), context };
      },
      declareRoster: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`declareRoster: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const rows_0 = args_1[1];
        const headcount_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('declareRoster',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 220 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(rows_0) && rows_0.length === 16 && rows_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError('declareRoster',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 220 char 1',
                                     'Vector<16, Bytes<32>>',
                                     rows_0)
        }
        if (!(typeof(headcount_0) === 'bigint' && headcount_0 >= 0n && headcount_0 <= 65535n)) {
          __compactRuntime.typeError('declareRoster',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'equilux.compact line 220 char 1',
                                     'Uint<0..65536>',
                                     headcount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_30.toValue(rows_0).concat(_descriptor_4.toValue(headcount_0)),
            alignment: _descriptor_30.alignment().concat(_descriptor_4.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._declareRoster_0(context,
                                               partialProofData,
                                               rows_0,
                                               headcount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      confirmPayroll: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`confirmPayroll: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('confirmPayroll',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 241 char 1',
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
        const result_0 = this._confirmPayroll_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      enroll: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`enroll: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('enroll',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 269 char 1',
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
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
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
                                     'equilux.compact line 299 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(path_0) === 'object' && path_0.leaf.buffer instanceof ArrayBuffer && path_0.leaf.BYTES_PER_ELEMENT === 1 && path_0.leaf.length === 32 && Array.isArray(path_0.path) && path_0.path.length === 5 && path_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
          __compactRuntime.typeError('checkReceipt',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 299 char 1',
                                     'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<5, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                     path_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_29.toValue(path_0),
            alignment: _descriptor_29.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkReceipt_0(context, partialProofData, path_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
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
                                     'equilux.compact line 486 char 1',
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
      },
      publishVariablePay: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`publishVariablePay: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('publishVariablePay',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 542 char 1',
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
        const result_0 = this._publishVariablePay_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_14.toValue(result_0), alignment: _descriptor_14.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      declareRoster: this.circuits.declareRoster,
      confirmPayroll: this.circuits.confirmPayroll,
      enroll: this.circuits.enroll,
      checkReceipt: this.circuits.checkReceipt,
      publishReport: this.circuits.publishReport,
      publishVariablePay: this.circuits.publishVariablePay
    };
    this.provableCircuits = {
      declareRoster: this.circuits.declareRoster,
      confirmPayroll: this.circuits.confirmPayroll,
      enroll: this.circuits.enroll,
      checkReceipt: this.circuits.checkReceipt,
      publishReport: this.circuits.publishReport,
      publishVariablePay: this.circuits.publishVariablePay
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const employerPkInit_0 = args_0[1];
    const providerPkInit_0 = args_0[2];
    const councilPkInit_0 = args_0[3];
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
                                 'equilux.compact line 159 char 1',
                                 'Bytes<32>',
                                 employerPkInit_0)
    }
    if (!(providerPkInit_0.buffer instanceof ArrayBuffer && providerPkInit_0.BYTES_PER_ELEMENT === 1 && providerPkInit_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'equilux.compact line 159 char 1',
                                 'Bytes<32>',
                                 providerPkInit_0)
    }
    if (!(councilPkInit_0.buffer instanceof ArrayBuffer && councilPkInit_0.BYTES_PER_ELEMENT === 1 && councilPkInit_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 3 (argument 4 as invoked from Typescript)',
                                 'equilux.compact line 159 char 1',
                                 'Bytes<32>',
                                 councilPkInit_0)
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
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('declareRoster', new __compactRuntime.ContractOperation());
    state_0.setOperation('confirmPayroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('enroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkReceipt', new __compactRuntime.ContractOperation());
    state_0.setOperation('publishReport', new __compactRuntime.ContractOperation());
    state_0.setOperation('publishVariablePay', new __compactRuntime.ContractOperation());
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
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(1n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(2n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(3n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(4n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(5n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(6n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(7n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(8n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(5)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                        alignment: _descriptor_9.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(9n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(10n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(11n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(12n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(13n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue({ is_some: false, value: { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false, medianGapBps: 0n, medianFavorsMen: false, categories: new Array(4).fill({ headcountWomen: 0n, headcountMen: 0n, disclosed: false, meanWomen: 0n, meanMen: 0n, meanGapBps: 0n, gapFavorsMen: false, gapAtOrAbove5pct: false }) } }),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(14n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue({ is_some: false, value: { round: 0n, headcountWomen: 0n, headcountMen: 0n, recipientsWomen: 0n, recipientsMen: 0n, gapDefined: false, meanGapBps: 0n, meanFavorsMen: false, medianGapBps: 0n, medianFavorsMen: false, quartiles: new Array(4).fill({ women: 0n, men: 0n }), categories: new Array(4).fill({ recipientsWomen: 0n, recipientsMen: 0n, disclosed: false, meanGapBps: 0n, gapFavorsMen: false }) } }),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(employerPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(1n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(2n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(councilPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(3n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_4.toValue(tmp_0),
                                                                alignment: _descriptor_4.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(4n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(5n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_1 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(6n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_2 = this._none_1();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(13n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_2),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_3 = this._none_0();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(14n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(tmp_3),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _some_1(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { round: 0n, headcountWomen: 0n, headcountMen: 0n, recipientsWomen: 0n, recipientsMen: 0n, gapDefined: false, meanGapBps: 0n, meanFavorsMen: false, medianGapBps: 0n, medianFavorsMen: false, quartiles: new Array(4).fill({ women: 0n, men: 0n }), categories: new Array(4).fill({ recipientsWomen: 0n, recipientsMen: 0n, disclosed: false, meanGapBps: 0n, gapFavorsMen: false }) } };
  }
  _none_1() {
    return { is_some: false,
             value:
               { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false, medianGapBps: 0n, medianFavorsMen: false, categories: new Array(4).fill({ headcountWomen: 0n, headcountMen: 0n, disclosed: false, meanWomen: 0n, meanMen: 0n, meanGapBps: 0n, gapFavorsMen: false, gapAtOrAbove5pct: false }) } };
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_2({ domain_sep:
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
    const result_0 = __compactRuntime.transientHash(_descriptor_42, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_40, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_41, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_38, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_39, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_36, value_0);
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
                                 'equilux.compact line 173 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _employeeRecord_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.employeeRecord(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 4  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 4294967295n && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 4294967295n && typeof(result_0[2]) === 'bigint' && result_0[2] >= 0n && result_0[2] <= 1n && typeof(result_0[3]) === 'bigint' && result_0[3] >= 0n && result_0[3] <= 3n)) {
      __compactRuntime.typeError('employeeRecord',
                                 'return value',
                                 'equilux.compact line 174 char 1',
                                 '[Uint<0..4294967296>, Uint<0..4294967296>, Uint<0..2>, Uint<0..4>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_35.toValue(result_0),
      alignment: _descriptor_35.alignment()
    });
    return result_0;
  }
  _payrollRowNonce_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.payrollRowNonce(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('payrollRowNonce',
                                 'return value',
                                 'equilux.compact line 175 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
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
                                 'equilux.compact line 176 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _providerSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.providerSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('providerSecret',
                                 'return value',
                                 'equilux.compact line 177 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _councilSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.councilSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('councilSecret',
                                 'return value',
                                 'equilux.compact line 178 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _payrollOpenings_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.payrollOpenings(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 16 && result_0.every((t) => typeof(t) === 'object' && typeof(t.salary) === 'bigint' && t.salary >= 0n && t.salary <= 4294967295n && typeof(t.variable) === 'bigint' && t.variable >= 0n && t.variable <= 4294967295n && typeof(t.gender) === 'bigint' && t.gender >= 0n && t.gender <= 1n && typeof(t.category) === 'bigint' && t.category >= 0n && t.category <= 3n && t.nonce.buffer instanceof ArrayBuffer && t.nonce.BYTES_PER_ELEMENT === 1 && t.nonce.length === 32 && typeof(t.active) === 'boolean'))) {
      __compactRuntime.typeError('payrollOpenings',
                                 'return value',
                                 'equilux.compact line 179 char 1',
                                 'Vector<16, struct RowOpening<salary: Uint<0..4294967296>, variable: Uint<0..4294967296>, gender: Uint<0..2>, category: Uint<0..4>, nonce: Bytes<32>, active: Boolean>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_34.toValue(result_0),
      alignment: _descriptor_34.alignment()
    });
    return result_0;
  }
  _payrollRecords_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.payrollRecords(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 16 && result_0.every((t) => typeof(t) === 'object' && typeof(t.salary) === 'bigint' && t.salary >= 0n && t.salary <= 4294967295n && typeof(t.variable) === 'bigint' && t.variable >= 0n && t.variable <= 4294967295n && typeof(t.gender) === 'bigint' && t.gender >= 0n && t.gender <= 1n && typeof(t.category) === 'bigint' && t.category >= 0n && t.category <= 3n && t.sk.buffer instanceof ArrayBuffer && t.sk.BYTES_PER_ELEMENT === 1 && t.sk.length === 32 && typeof(t.active) === 'boolean' && typeof(t.band) === 'bigint' && t.band >= 0n && t.band <= 3n))) {
      __compactRuntime.typeError('payrollRecords',
                                 'return value',
                                 'equilux.compact line 180 char 1',
                                 'Vector<16, struct EnrolledRecord<salary: Uint<0..4294967296>, variable: Uint<0..4294967296>, gender: Uint<0..2>, category: Uint<0..4>, sk: Bytes<32>, active: Boolean, band: Uint<0..4>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_19.toValue(result_0),
      alignment: _descriptor_19.alignment()
    });
    return result_0;
  }
  _reportClaim_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.reportClaim(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.meanGapBps) === 'bigint' && result_0.meanGapBps >= 0n && result_0.meanGapBps <= 65535n && typeof(result_0.medianWomen) === 'bigint' && result_0.medianWomen >= 0n && result_0.medianWomen <= 4294967295n && typeof(result_0.medianMen) === 'bigint' && result_0.medianMen >= 0n && result_0.medianMen <= 4294967295n && typeof(result_0.medianGapBps) === 'bigint' && result_0.medianGapBps >= 0n && result_0.medianGapBps <= 65535n && Array.isArray(result_0.catMeanWomen) && result_0.catMeanWomen.length === 4 && result_0.catMeanWomen.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 4294967295n) && Array.isArray(result_0.catMeanMen) && result_0.catMeanMen.length === 4 && result_0.catMeanMen.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 4294967295n) && Array.isArray(result_0.catGapBps) && result_0.catGapBps.length === 4 && result_0.catGapBps.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n))) {
      __compactRuntime.typeError('reportClaim',
                                 'return value',
                                 'equilux.compact line 181 char 1',
                                 'struct ReportClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catMeanWomen: Vector<4, Uint<0..4294967296>>, catMeanMen: Vector<4, Uint<0..4294967296>>, catGapBps: Vector<4, Uint<0..65536>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_32.toValue(result_0),
      alignment: _descriptor_32.alignment()
    });
    return result_0;
  }
  _variableClaim_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.variableClaim(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.meanGapBps) === 'bigint' && result_0.meanGapBps >= 0n && result_0.meanGapBps <= 65535n && typeof(result_0.medianWomen) === 'bigint' && result_0.medianWomen >= 0n && result_0.medianWomen <= 4294967295n && typeof(result_0.medianMen) === 'bigint' && result_0.medianMen >= 0n && result_0.medianMen <= 4294967295n && typeof(result_0.medianGapBps) === 'bigint' && result_0.medianGapBps >= 0n && result_0.medianGapBps <= 65535n && Array.isArray(result_0.catGapBps) && result_0.catGapBps.length === 4 && result_0.catGapBps.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n))) {
      __compactRuntime.typeError('variableClaim',
                                 'return value',
                                 'equilux.compact line 182 char 1',
                                 'struct VariableClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catGapBps: Vector<4, Uint<0..65536>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_21.toValue(result_0),
      alignment: _descriptor_21.alignment()
    });
    return result_0;
  }
  _publicKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _recordCommitment_0(salary_0, variable_0, gender_0, category_0, sk_0, r_0) {
    return this._persistentHash_3([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 114, 101, 99, 58, 118, 51, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        r_0,
                                                                        'equilux.compact line 193 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        __compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(salary_0,
                                                                                                                                                      8n),
                                                                                                                            __compactRuntime.mulField(category_0,
                                                                                                                                                      2n)),
                                                                                                  gender_0),
                                                                        'equilux.compact line 194 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        variable_0,
                                                                        'equilux.compact line 195 char 6'),
                                   sk_0]);
  }
  _payrollRow_0(salary_0, variable_0, gender_0, category_0, nonce_0) {
    return this._persistentHash_1([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 114, 111, 119, 58, 118, 51, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        __compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(salary_0,
                                                                                                                                                      8n),
                                                                                                                            __compactRuntime.mulField(category_0,
                                                                                                                                                      2n)),
                                                                                                  gender_0),
                                                                        'equilux.compact line 204 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        variable_0,
                                                                        'equilux.compact line 205 char 6'),
                                   nonce_0]);
  }
  _enrollmentNullifier_0(sk_0, r_0) {
    return this._persistentHash_4([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 110, 117, 108, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        r_0,
                                                                        'equilux.compact line 210 char 73'),
                                   sk_0]);
  }
  _declareRoster_0(context, partialProofData, rows_0, headcount_0) {
    __compactRuntime.assert(this._equal_0(this._publicKey_0(this._providerSecret_0(context,
                                                                                   partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_3.toValue(1n),
                                                                                                                                alignment: _descriptor_3.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the payroll provider');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(4n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'roster already declared this round');
    const n_0 = headcount_0;
    __compactRuntime.assert(n_0 > 0n, 'roster must not be empty');
    __compactRuntime.assert(n_0 <= 16n,
                            "roster exceeds this instance's 16-record size");
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_0, i_0) =>
                    {
                      if (i_0 < n_0) {
                        let tmp_0;
                        __compactRuntime.assert(!(tmp_0 = rows_0[i_0],
                                                  _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                            partialProofData,
                                                                                                            [
                                                                                                             { dup: { n: 0 } },
                                                                                                             { idx: { cached: false,
                                                                                                                      pushPath: false,
                                                                                                                      path: [
                                                                                                                             { tag: 'value',
                                                                                                                               value: { value: _descriptor_3.toValue(10n),
                                                                                                                                        alignment: _descriptor_3.alignment() } }] } },
                                                                                                             { push: { storage: false,
                                                                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                                                    alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                             'member',
                                                                                                             { popeq: { cached: true,
                                                                                                                        result: undefined } }]).value)),
                                                'duplicate payroll row');
                        const tmp_1 = rows_0[i_0];
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_3.toValue(10n),
                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 1 } }]);
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
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(4n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(6n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(n_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _confirmPayroll_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_1(this._publicKey_0(this._councilSecret_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_3.toValue(2n),
                                                                                                                                alignment: _descriptor_3.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the works council');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(4n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'roster not yet declared by the payroll provider');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(5n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'payroll already confirmed this round');
    const rows_0 = this._payrollOpenings_0(context, partialProofData);
    this._folder_2(context,
                   partialProofData,
                   ((context, partialProofData, t_0, i_0) =>
                    {
                      if (rows_0[i_0].active) {
                        const h_0 = this._payrollRow_0(rows_0[i_0].salary,
                                                       rows_0[i_0].variable,
                                                       rows_0[i_0].gender,
                                                       rows_0[i_0].category,
                                                       rows_0[i_0].nonce);
                        __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_3.toValue(10n),
                                                                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                                                                           { push: { storage: false,
                                                                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(h_0),
                                                                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                           'member',
                                                                                                           { popeq: { cached: true,
                                                                                                                      result: undefined } }]).value),
                                                'an opened row is not in the committed payroll');
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
    this._folder_4(context,
                   partialProofData,
                   ((context, partialProofData, t_1, i_1) =>
                    {
                      this._folder_3(context,
                                     partialProofData,
                                     ((context, partialProofData, t_2, j_0) =>
                                      {
                                        if (i_1 < j_0 && rows_0[i_1].active
                                            &&
                                            rows_0[j_0].active)
                                        {
                                          __compactRuntime.assert(!this._equal_2(rows_0[i_1].nonce,
                                                                                 rows_0[j_0].nonce),
                                                                  'the same payroll row was opened twice');
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
    const opened_0 = this._folder_5(context,
                                    partialProofData,
                                    ((context, partialProofData, acc_0, o_0) =>
                                     {
                                       return ((t1) => {
                                                if (t1 > 65535n) {
                                                  throw new __compactRuntime.CompactError('equilux.compact line 261 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                }
                                                return t1;
                                              })(acc_0 + (o_0.active ? 1n : 0n));
                                     }),
                                    0n,
                                    rows_0);
    __compactRuntime.assert(this._equal_3(opened_0,
                                          _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_3.toValue(6n),
                                                                                                                                alignment: _descriptor_3.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'the council must open every committed payroll row');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(5n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _enroll_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(4n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'roster not yet declared by the payroll provider');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(5n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'payroll not yet confirmed by the works council');
    const sk_0 = this._employeeSecret_0(context, partialProofData);
    const __compact_pattern_tmp2_0 = this._employeeRecord_0(context,
                                                            partialProofData);
    const salary_0 = __compact_pattern_tmp2_0[0];
    const variable_0 = __compact_pattern_tmp2_0[1];
    const gender_0 = __compact_pattern_tmp2_0[2];
    const category_0 = __compact_pattern_tmp2_0[3];
    __compactRuntime.assert(salary_0 > 0n, 'salary must be positive');
    const r_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_3.toValue(3n),
                                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value);
    const nul_0 = this._enrollmentNullifier_0(sk_0, r_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(9n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'already enrolled this round');
    const row_0 = this._payrollRow_0(salary_0,
                                     variable_0,
                                     gender_0,
                                     category_0,
                                     this._payrollRowNonce_0(context,
                                                             partialProofData));
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(10n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(row_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'record does not match any payroll row from the provider');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(11n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(row_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'this payroll row is already enrolled');
    const cm_0 = this._recordCommitment_0(salary_0,
                                          variable_0,
                                          gender_0,
                                          category_0,
                                          sk_0,
                                          r_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(11n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(row_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_3.toValue(12n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_3.toValue(9n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
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
                                                         value: { value: _descriptor_3.toValue(8n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
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
                                                         value: { value: _descriptor_3.toValue(7n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_4.toValue(tmp_0),
                                                                alignment: _descriptor_4.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return cm_0;
  }
  _checkReceipt_0(context, partialProofData, path_0) {
    const tmp_0 = this._merkleTreePathRoot_0(path_0);
    return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_3.toValue(8n),
                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_3.toValue(0n),
                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                      'root',
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_26.alignment() }).encode() } },
                                                                      'eq',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _womenSalary_0(rec_0) {
    if (rec_0.active && this._equal_4(rec_0.gender, 0n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _menSalary_0(rec_0) {
    if (rec_0.active && this._equal_5(rec_0.gender, 1n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _womenCount_0(rec_0) {
    if (rec_0.active && this._equal_6(rec_0.gender, 0n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _menCount_0(rec_0) {
    if (rec_0.active && this._equal_7(rec_0.gender, 1n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _activeCount_0(rec_0) { if (rec_0.active) { return 1n; } else { return 0n; } }
  _inCategory_0(rec_0, c_0, g_0) {
    if (rec_0.active && this._equal_8(rec_0.category, c_0)
        &&
        this._equal_9(rec_0.gender, g_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _salaryInCategory_0(rec_0, c_0, g_0) {
    if (rec_0.active && this._equal_10(rec_0.category, c_0)
        &&
        this._equal_11(rec_0.gender, g_0))
    {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _strictlyBelow_0(rec_0, g_0, m_0) {
    let t_0;
    if (rec_0.active && this._equal_12(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.salary, t_0 < m_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _atOrBelow_0(rec_0, g_0, m_0) {
    let t_0;
    if (rec_0.active && this._equal_13(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.salary, t_0 <= m_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _receives_0(rec_0, g_0) {
    let t_0;
    if (rec_0.active && this._equal_14(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.variable, t_0 > 0n))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _variableOf_0(rec_0, g_0) {
    let t_0;
    if (rec_0.active && this._equal_15(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.variable, t_0 > 0n))
    {
      return rec_0.variable;
    } else {
      return 0n;
    }
  }
  _receivesIn_0(rec_0, c_0, g_0) {
    let t_0;
    if (rec_0.active && this._equal_16(rec_0.category, c_0)
        &&
        this._equal_17(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.variable, t_0 > 0n))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _variableIn_0(rec_0, c_0, g_0) {
    let t_0;
    if (rec_0.active && this._equal_18(rec_0.category, c_0)
        &&
        this._equal_19(rec_0.gender, g_0)
        &&
        (t_0 = rec_0.variable, t_0 > 0n))
    {
      return rec_0.variable;
    } else {
      return 0n;
    }
  }
  _variableBelow_0(rec_0, g_0, m_0) {
    let t_0, t_1;
    if (rec_0.active && this._equal_20(rec_0.gender, g_0)
        &&
        (t_1 = rec_0.variable, t_1 > 0n)
        &&
        (t_0 = rec_0.variable, t_0 < m_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _variableAtOrBelow_0(rec_0, g_0, m_0) {
    let t_0, t_1;
    if (rec_0.active && this._equal_21(rec_0.gender, g_0)
        &&
        (t_1 = rec_0.variable, t_1 > 0n)
        &&
        (t_0 = rec_0.variable, t_0 <= m_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _inBand_0(rec_0, b_0, g_0) {
    if (rec_0.active && this._equal_22(rec_0.gender, g_0)
        &&
        this._equal_23(rec_0.band, b_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _belowBand_0(rec_0, b_0) {
    let t_0;
    if (rec_0.active && (t_0 = rec_0.band, t_0 < b_0)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _bandCount_0(recs_0, b_0, g_0) {
    return this._folder_6(((acc_0, rec_0) =>
                           {
                             return ((t1) => {
                                      if (t1 > 255n) {
                                        throw new __compactRuntime.CompactError('equilux.compact line 359 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                      }
                                      return t1;
                                    })(acc_0 + this._inBand_0(rec_0, b_0, g_0));
                           }),
                          0n,
                          recs_0);
  }
  _verifyMedian_0(recs_0, g_0, m_0, n_0) {
    const below_0 = this._folder_7(((acc_0, rec_0) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 369 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_0
                                                +
                                                this._strictlyBelow_0(rec_0,
                                                                      g_0,
                                                                      m_0));
                                    }),
                                   0n,
                                   recs_0);
    const upTo_0 = this._folder_8(((acc_1, rec_1) =>
                                   {
                                     return ((t1) => {
                                              if (t1 > 255n) {
                                                throw new __compactRuntime.CompactError('equilux.compact line 370 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                              }
                                              return t1;
                                            })(acc_1
                                               +
                                               this._atOrBelow_0(rec_1, g_0, m_0));
                                   }),
                                  0n,
                                  recs_0);
    let t_0;
    __compactRuntime.assert((t_0 = below_0 * 2n, t_0 < n_0),
                            'claimed median is too high');
    let t_1;
    __compactRuntime.assert((t_1 = upTo_0 * 2n, t_1 >= n_0),
                            'claimed median is too low');
    return [];
  }
  _verifyGap_0(sumW_0, nW_0, sumM_0, nM_0, g_0) {
    let t_0; const favorsMen_0 = (t_0 = sumM_0 * nW_0, t_0 >= sumW_0 * nM_0);
    let t_3, t_4, t_1, t_2;
    const diff_0 = favorsMen_0 ?
                   (t_3 = sumM_0 * nW_0,
                    (t_4 = sumW_0 * nM_0,
                     (__compactRuntime.assert(t_3 >= t_4,
                                              'result of subtraction would be negative'),
                      t_3 - t_4)))
                   :
                   (t_1 = sumW_0 * nM_0,
                    (t_2 = sumM_0 * nW_0,
                     (__compactRuntime.assert(t_1 >= t_2,
                                              'result of subtraction would be negative'),
                      t_1 - t_2)));
    const base_0 = favorsMen_0 ? sumM_0 * nW_0 : sumW_0 * nM_0;
    let t_5;
    __compactRuntime.assert((t_5 = g_0 * base_0, t_5 <= diff_0 * 10000n),
                            'claimed gap too high');
    let t_6;
    __compactRuntime.assert((t_6 = diff_0 * 10000n, t_6 < (g_0 + 1n) * base_0),
                            'claimed gap too low');
    return favorsMen_0;
  }
  _verifyMean_0(sum_0, n_0, mean_0) {
    let t_0;
    __compactRuntime.assert((t_0 = mean_0 * n_0, t_0 <= sum_0),
                            'claimed category mean too high');
    __compactRuntime.assert(sum_0 < (mean_0 + 1n) * n_0,
                            'claimed category mean too low');
    return [];
  }
  _categoryStats_0(recs_0, c_0, meanW_0, meanM_0, g_0) {
    const nW_0 = this._folder_9(((acc_0, rec_0) =>
                                 {
                                   return ((t1) => {
                                            if (t1 > 255n) {
                                              throw new __compactRuntime.CompactError('equilux.compact line 394 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                            }
                                            return t1;
                                          })(acc_0
                                             +
                                             this._inCategory_0(rec_0, c_0, 0n));
                                 }),
                                0n,
                                recs_0);
    const nM_0 = this._folder_10(((acc_1, rec_1) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 395 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(acc_1
                                              +
                                              this._inCategory_0(rec_1, c_0, 1n));
                                  }),
                                 0n,
                                 recs_0);
    const sW_0 = this._folder_11(((acc_2, rec_2) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 396 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_2
                                              +
                                              this._salaryInCategory_0(rec_2,
                                                                       c_0,
                                                                       0n));
                                  }),
                                 0n,
                                 recs_0);
    const sM_0 = this._folder_12(((acc_3, rec_3) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 397 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_3
                                              +
                                              this._salaryInCategory_0(rec_3,
                                                                       c_0,
                                                                       1n));
                                  }),
                                 0n,
                                 recs_0);
    if (nW_0 >= 3n && nM_0 >= 3n) {
      this._verifyMean_0(sW_0, nW_0, meanW_0);
      this._verifyMean_0(sM_0, nM_0, meanM_0);
      const favorsMen_0 = this._verifyGap_0(sW_0, nW_0, sM_0, nM_0, g_0);
      return { headcountWomen: nW_0,
               headcountMen: nM_0,
               disclosed: true,
               meanWomen: meanW_0,
               meanMen: meanM_0,
               meanGapBps: g_0,
               gapFavorsMen: favorsMen_0,
               gapAtOrAbove5pct: g_0 >= 500n };
    } else {
      return { headcountWomen: nW_0,
               headcountMen: nM_0,
               disclosed: false,
               meanWomen: 0n,
               meanMen: 0n,
               meanGapBps: 0n,
               gapFavorsMen: false,
               gapAtOrAbove5pct: false };
    }
  }
  _verifyVariableMedian_0(recs_0, g_0, m_0, n_0) {
    const below_0 = this._folder_13(((acc_0, rec_0) =>
                                     {
                                       return ((t1) => {
                                                if (t1 > 255n) {
                                                  throw new __compactRuntime.CompactError('equilux.compact line 419 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                                }
                                                return t1;
                                              })(acc_0
                                                 +
                                                 this._variableBelow_0(rec_0,
                                                                       g_0,
                                                                       m_0));
                                     }),
                                    0n,
                                    recs_0);
    const upTo_0 = this._folder_14(((acc_1, rec_1) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 420 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_1
                                                +
                                                this._variableAtOrBelow_0(rec_1,
                                                                          g_0,
                                                                          m_0));
                                    }),
                                   0n,
                                   recs_0);
    let t_0;
    __compactRuntime.assert((t_0 = below_0 * 2n, t_0 < n_0),
                            'claimed variable-pay median is too high');
    let t_1;
    __compactRuntime.assert((t_1 = upTo_0 * 2n, t_1 >= n_0),
                            'claimed variable-pay median is too low');
    return [];
  }
  _variableCategoryStats_0(recs_0, c_0, g_0) {
    const nW_0 = this._folder_15(((acc_0, rec_0) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 426 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(acc_0
                                              +
                                              this._receivesIn_0(rec_0, c_0, 0n));
                                  }),
                                 0n,
                                 recs_0);
    const nM_0 = this._folder_16(((acc_1, rec_1) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 427 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(acc_1
                                              +
                                              this._receivesIn_0(rec_1, c_0, 1n));
                                  }),
                                 0n,
                                 recs_0);
    const sW_0 = this._folder_17(((acc_2, rec_2) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 428 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_2
                                              +
                                              this._variableIn_0(rec_2, c_0, 0n));
                                  }),
                                 0n,
                                 recs_0);
    const sM_0 = this._folder_18(((acc_3, rec_3) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 429 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_3
                                              +
                                              this._variableIn_0(rec_3, c_0, 1n));
                                  }),
                                 0n,
                                 recs_0);
    if (nW_0 >= 3n && nM_0 >= 3n) {
      const favorsMen_0 = this._verifyGap_0(sW_0, nW_0, sM_0, nM_0, g_0);
      return { recipientsWomen: nW_0,
               recipientsMen: nM_0,
               disclosed: true,
               meanGapBps: g_0,
               gapFavorsMen: favorsMen_0 };
    } else {
      return { recipientsWomen: nW_0,
               recipientsMen: nM_0,
               disclosed: false,
               meanGapBps: 0n,
               gapFavorsMen: false };
    }
  }
  _variableGaps_0(recs_0, claim_0, rW_0, rM_0, sW_0, sM_0) {
    if (rW_0 > 0n && rM_0 > 0n) {
      const meanFavorsMen_0 = this._verifyGap_0(sW_0,
                                                rW_0,
                                                sM_0,
                                                rM_0,
                                                claim_0.meanGapBps);
      this._verifyVariableMedian_0(recs_0, 0n, claim_0.medianWomen, rW_0);
      this._verifyVariableMedian_0(recs_0, 1n, claim_0.medianMen, rM_0);
      const medianFavorsMen_0 = this._verifyGap_0(claim_0.medianWomen,
                                                  1n,
                                                  claim_0.medianMen,
                                                  1n,
                                                  claim_0.medianGapBps);
      return [meanFavorsMen_0, medianFavorsMen_0];
    } else {
      __compactRuntime.assert(this._equal_24(claim_0.meanGapBps, 0n)
                              &&
                              this._equal_25(claim_0.medianGapBps, 0n),
                              'no variable-pay gap exists without recipients of both genders');
      return [false, false];
    }
  }
  _verifyPayrollWitness_0(context, partialProofData, recs_0) {
    const r_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_3.toValue(3n),
                                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value);
    this._folder_19(context,
                    partialProofData,
                    ((context, partialProofData, t_0, i_0) =>
                     {
                       if (recs_0[i_0].active) {
                         const cm_0 = this._recordCommitment_0(recs_0[i_0].salary,
                                                               recs_0[i_0].variable,
                                                               recs_0[i_0].gender,
                                                               recs_0[i_0].category,
                                                               recs_0[i_0].sk,
                                                               r_0);
                         __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_3.toValue(12n),
                                                                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value),
                                                 'record does not match what its employee enrolled');
                         let tmp_0;
                         __compactRuntime.assert((tmp_0 = this._enrollmentNullifier_0(recs_0[i_0].sk,
                                                                                      r_0),
                                                  _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                            partialProofData,
                                                                                                            [
                                                                                                             { dup: { n: 0 } },
                                                                                                             { idx: { cached: false,
                                                                                                                      pushPath: false,
                                                                                                                      path: [
                                                                                                                             { tag: 'value',
                                                                                                                               value: { value: _descriptor_3.toValue(9n),
                                                                                                                                        alignment: _descriptor_3.alignment() } }] } },
                                                                                                             { push: { storage: false,
                                                                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                                                    alignment: _descriptor_0.alignment() }).encode() } },
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
    this._folder_21(context,
                    partialProofData,
                    ((context, partialProofData, t_1, i_1) =>
                     {
                       this._folder_20(context,
                                       partialProofData,
                                       ((context, partialProofData, t_2, j_0) =>
                                        {
                                          if (i_1 < j_0 && recs_0[i_1].active
                                              &&
                                              recs_0[j_0].active)
                                          {
                                            __compactRuntime.assert(!this._equal_26(recs_0[i_1].sk,
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
    const nActive_0 = this._folder_22(context,
                                      partialProofData,
                                      ((context, partialProofData, acc_0, rec_0) =>
                                       {
                                         return ((t1) => {
                                                  if (t1 > 65535n) {
                                                    throw new __compactRuntime.CompactError('equilux.compact line 473 char 38: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
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
                            _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(7n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'payroll witness must cover every enrolled employee');
    __compactRuntime.assert(this._equal_27(nActive_0,
                                           _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_3.toValue(6n),
                                                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            "reporting set does not match the payroll provider's roster");
    return [];
  }
  _publishReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_28(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'not the employer');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(4n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'roster not yet declared by the payroll provider');
    const recs_0 = this._payrollRecords_0(context, partialProofData);
    const claim_0 = this._reportClaim_0(context, partialProofData);
    this._verifyPayrollWitness_0(context, partialProofData, recs_0);
    const cntW_0 = this._folder_23(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_0, rec_0) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 494 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_0
                                                +
                                                this._womenCount_0(rec_0));
                                    }),
                                   0n,
                                   recs_0);
    const cntM_0 = this._folder_24(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_1, rec_1) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 495 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_1 + this._menCount_0(rec_1));
                                    }),
                                   0n,
                                   recs_0);
    __compactRuntime.assert(cntW_0 !== 0n, 'no women in reporting set');
    __compactRuntime.assert(cntM_0 !== 0n, 'no men in reporting set');
    const sumW_0 = this._folder_25(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_2, rec_2) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 1099511627775n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 499 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                               }
                                               return t1;
                                             })(acc_2
                                                +
                                                this._womenSalary_0(rec_2));
                                    }),
                                   0n,
                                   recs_0);
    const sumM_0 = this._folder_26(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_3, rec_3) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 1099511627775n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 500 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                               }
                                               return t1;
                                             })(acc_3 + this._menSalary_0(rec_3));
                                    }),
                                   0n,
                                   recs_0);
    const favorsMen_0 = this._verifyGap_0(sumW_0,
                                          cntW_0,
                                          sumM_0,
                                          cntM_0,
                                          claim_0.meanGapBps);
    this._verifyMedian_0(recs_0, 0n, claim_0.medianWomen, cntW_0);
    this._verifyMedian_0(recs_0, 1n, claim_0.medianMen, cntM_0);
    const medianFavorsMen_0 = this._verifyGap_0(claim_0.medianWomen,
                                                1n,
                                                claim_0.medianMen,
                                                1n,
                                                claim_0.medianGapBps);
    const categories_0 = [this._categoryStats_0(recs_0,
                                                0n,
                                                claim_0.catMeanWomen[0],
                                                claim_0.catMeanMen[0],
                                                claim_0.catGapBps[0]),
                          this._categoryStats_0(recs_0,
                                                1n,
                                                claim_0.catMeanWomen[1],
                                                claim_0.catMeanMen[1],
                                                claim_0.catGapBps[1]),
                          this._categoryStats_0(recs_0,
                                                2n,
                                                claim_0.catMeanWomen[2],
                                                claim_0.catMeanMen[2],
                                                claim_0.catGapBps[2]),
                          this._categoryStats_0(recs_0,
                                                3n,
                                                claim_0.catMeanWomen[3],
                                                claim_0.catMeanMen[3],
                                                claim_0.catGapBps[3])];
    let t_0;
    const report_0 = { round:
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('equilux.compact line 519 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(3n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)),
                       headcountWomen: cntW_0,
                       headcountMen: cntM_0,
                       meanGapBps: claim_0.meanGapBps,
                       gapFavorsMen: favorsMen_0,
                       meanGapAtOrAbove5pct:
                         (t_0 = claim_0.meanGapBps, t_0 >= 500n),
                       medianGapBps: claim_0.medianGapBps,
                       medianFavorsMen: medianFavorsMen_0,
                       categories: categories_0 };
    const tmp_0 = this._some_0(report_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(13n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return report_0;
  }
  _publishVariablePay_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_29(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'not the employer');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(4n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'roster not yet declared by the payroll provider');
    const recs_0 = this._payrollRecords_0(context, partialProofData);
    const claim_0 = this._variableClaim_0(context, partialProofData);
    this._verifyPayrollWitness_0(context, partialProofData, recs_0);
    const cntW_0 = this._folder_27(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_0, rec_0) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 550 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_0
                                                +
                                                this._womenCount_0(rec_0));
                                    }),
                                   0n,
                                   recs_0);
    const cntM_0 = this._folder_28(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_1, rec_1) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('equilux.compact line 551 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(acc_1 + this._menCount_0(rec_1));
                                    }),
                                   0n,
                                   recs_0);
    const rW_0 = this._folder_29(context,
                                 partialProofData,
                                 ((context, partialProofData, acc_2, rec_2) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 552 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(acc_2
                                              +
                                              this._receives_0(rec_2, 0n));
                                  }),
                                 0n,
                                 recs_0);
    const rM_0 = this._folder_30(context,
                                 partialProofData,
                                 ((context, partialProofData, acc_3, rec_3) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 553 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(acc_3
                                              +
                                              this._receives_0(rec_3, 1n));
                                  }),
                                 0n,
                                 recs_0);
    const sW_0 = this._folder_31(context,
                                 partialProofData,
                                 ((context, partialProofData, acc_4, rec_4) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 554 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_4
                                              +
                                              this._variableOf_0(rec_4, 0n));
                                  }),
                                 0n,
                                 recs_0);
    const sM_0 = this._folder_32(context,
                                 partialProofData,
                                 ((context, partialProofData, acc_5, rec_5) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 1099511627775n) {
                                               throw new __compactRuntime.CompactError('equilux.compact line 555 char 33: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 1099511627775');
                                             }
                                             return t1;
                                           })(acc_5
                                              +
                                              this._variableOf_0(rec_5, 1n));
                                  }),
                                 0n,
                                 recs_0);
    const defined_0 = rW_0 > 0n && rM_0 > 0n;
    const __compact_pattern_tmp1_0 = this._variableGaps_0(recs_0,
                                                          claim_0,
                                                          rW_0,
                                                          rM_0,
                                                          sW_0,
                                                          sM_0);
    const meanFavorsMen_0 = __compact_pattern_tmp1_0[0];
    const medianFavorsMen_0 = __compact_pattern_tmp1_0[1];
    this._folder_34(context,
                    partialProofData,
                    ((context, partialProofData, t_0, i_0) =>
                     {
                       this._folder_33(context,
                                       partialProofData,
                                       ((context, partialProofData, t_1, j_0) =>
                                        {
                                          let t_2;
                                          if (!this._equal_30(i_0, j_0)
                                              &&
                                              recs_0[i_0].active
                                              &&
                                              recs_0[j_0].active
                                              &&
                                              (t_2 = recs_0[i_0].band,
                                               t_2 < recs_0[j_0].band))
                                          {
                                            let t_3;
                                            __compactRuntime.assert((t_3 = recs_0[i_0].salary
                                                                           +
                                                                           recs_0[i_0].variable,
                                                                     t_3
                                                                     <=
                                                                     recs_0[j_0].salary
                                                                     +
                                                                     recs_0[j_0].variable),
                                                                    'quartile bands are out of pay order');
                                          }
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
    const n_0 = this._folder_35(context,
                                partialProofData,
                                ((context, partialProofData, acc_6, rec_6) =>
                                 {
                                   return ((t1) => {
                                            if (t1 > 65535n) {
                                              throw new __compactRuntime.CompactError('equilux.compact line 571 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                            }
                                            return t1;
                                          })(acc_6 + this._activeCount_0(rec_6));
                                 }),
                                0n,
                                recs_0);
    this._folder_37(context,
                    partialProofData,
                    ((context, partialProofData, t_4, b_0) =>
                     {
                       const c_0 = this._folder_36(context,
                                                   partialProofData,
                                                   ((context,
                                                     partialProofData,
                                                     acc_7,
                                                     rec_7) =>
                                                    {
                                                      return ((t1) => {
                                                               if (t1 > 65535n) {
                                                                 throw new __compactRuntime.CompactError('equilux.compact line 573 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                               }
                                                               return t1;
                                                             })(acc_7
                                                                +
                                                                this._belowBand_0(rec_7,
                                                                                  b_0));
                                                    }),
                                                   0n,
                                                   recs_0);
                       let t_5, t_6;
                       __compactRuntime.assert((t_6 = 4n * c_0, t_6 <= b_0 * n_0)
                                               &&
                                               (t_5 = b_0 * n_0,
                                                t_5 < 4n * c_0 + 4n),
                                               'quartile bands do not split the workforce into quarters');
                       return t_4;
                     }),
                    [],
                    [1n, 2n, 3n]);
    const quartiles_0 = [{ women: this._bandCount_0(recs_0, 0n, 0n),
                           men: this._bandCount_0(recs_0, 0n, 1n) },
                         { women: this._bandCount_0(recs_0, 1n, 0n),
                           men: this._bandCount_0(recs_0, 1n, 1n) },
                         { women: this._bandCount_0(recs_0, 2n, 0n),
                           men: this._bandCount_0(recs_0, 2n, 1n) },
                         { women: this._bandCount_0(recs_0, 3n, 0n),
                           men: this._bandCount_0(recs_0, 3n, 1n) }];
    const report_0 = { round:
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('equilux.compact line 584 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(3n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)),
                       headcountWomen: cntW_0,
                       headcountMen: cntM_0,
                       recipientsWomen: rW_0,
                       recipientsMen: rM_0,
                       gapDefined: defined_0,
                       meanGapBps: claim_0.meanGapBps,
                       meanFavorsMen: meanFavorsMen_0,
                       medianGapBps: claim_0.medianGapBps,
                       medianFavorsMen: medianFavorsMen_0,
                       quartiles: quartiles_0,
                       categories:
                         [this._variableCategoryStats_0(recs_0,
                                                        0n,
                                                        claim_0.catGapBps[0]),
                          this._variableCategoryStats_0(recs_0,
                                                        1n,
                                                        claim_0.catGapBps[1]),
                          this._variableCategoryStats_0(recs_0,
                                                        2n,
                                                        claim_0.catGapBps[2]),
                          this._variableCategoryStats_0(recs_0,
                                                        3n,
                                                        claim_0.catGapBps[3])] };
    const tmp_0 = this._some_1(report_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(14n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(tmp_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
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
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
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
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_17(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_18(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_19(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_20(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_21(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_22(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_23(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_6(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_7(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_8(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_9(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_10(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_11(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_12(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_13(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_14(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_15(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_16(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_17(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_18(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_24(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_25(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_19(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_26(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_20(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_21(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_22(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_27(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_28(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_23(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_24(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_25(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_26(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_29(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_27(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_28(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_29(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_30(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_31(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_32(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_30(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_33(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_34(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_35(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_36(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_37(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 3; i++) { x = f(context, partialProofData, x, a0[i]); }
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
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(0n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get providerPk() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(1n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get councilPk() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(2n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get round() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(3n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get rosterDeclared() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(4n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get payrollConfirmed() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(5n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get declaredHeadcount() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(6n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get enrolled() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(7n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    commitments: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(8n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(1n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(32n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
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
                                     'equilux.compact line 151 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(8n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(0n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'root',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_26.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_26.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
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
                                     'equilux.compact line 151 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'equilux.compact line 151 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(5, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'equilux.compact line 151 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(5, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      }
    },
    nullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(9n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(9n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
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
                                     'equilux.compact line 152 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(9n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[9];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    payrollRows: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(10n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(10n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
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
                                     'equilux.compact line 153 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(10n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[10];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    claimedRows: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(11n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(11n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
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
                                     'equilux.compact line 154 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(11n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[11];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    bound: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(12n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                                                 alignment: _descriptor_9.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(12n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
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
                                     'equilux.compact line 155 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(12n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[12];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
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
                                                                                          value: { value: _descriptor_3.toValue(13n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get latestVariableReport() {
      return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_3.toValue(14n),
                                                                                                    alignment: _descriptor_3.alignment() } }] } },
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
  payrollRowNonce: (...args) => undefined,
  employerSecret: (...args) => undefined,
  providerSecret: (...args) => undefined,
  councilSecret: (...args) => undefined,
  payrollOpenings: (...args) => undefined,
  payrollRecords: (...args) => undefined,
  reportClaim: (...args) => undefined,
  variableClaim: (...args) => undefined
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
                                 'equilux.compact line 186 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._publicKey_0(sk_0);
  },
  payrollRow: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`payrollRow: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const salary_0 = args_0[0];
    const variable_0 = args_0[1];
    const gender_0 = args_0[2];
    const category_0 = args_0[3];
    const nonce_0 = args_0[4];
    if (!(typeof(salary_0) === 'bigint' && salary_0 >= 0n && salary_0 <= 4294967295n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 1',
                                 'equilux.compact line 201 char 1',
                                 'Uint<0..4294967296>',
                                 salary_0)
    }
    if (!(typeof(variable_0) === 'bigint' && variable_0 >= 0n && variable_0 <= 4294967295n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 2',
                                 'equilux.compact line 201 char 1',
                                 'Uint<0..4294967296>',
                                 variable_0)
    }
    if (!(typeof(gender_0) === 'bigint' && gender_0 >= 0n && gender_0 <= 1n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 3',
                                 'equilux.compact line 201 char 1',
                                 'Uint<0..2>',
                                 gender_0)
    }
    if (!(typeof(category_0) === 'bigint' && category_0 >= 0n && category_0 <= 3n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 4',
                                 'equilux.compact line 201 char 1',
                                 'Uint<0..4>',
                                 category_0)
    }
    if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 5',
                                 'equilux.compact line 201 char 1',
                                 'Bytes<32>',
                                 nonce_0)
    }
    return _dummyContract._payrollRow_0(salary_0,
                                        variable_0,
                                        gender_0,
                                        category_0,
                                        nonce_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
