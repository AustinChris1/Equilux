import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _QuartileBand_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      women: _descriptor_2.fromValue(value_0),
      men: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.women).concat(_descriptor_2.toValue(value_0.men));
  }
}

const _descriptor_5 = new _QuartileBand_0();

const _descriptor_6 = new __compactRuntime.CompactTypeVector(4, _descriptor_5);

class _VariableCategoryStats_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      recipientsWomen: _descriptor_2.fromValue(value_0),
      recipientsMen: _descriptor_2.fromValue(value_0),
      disclosed: _descriptor_1.fromValue(value_0),
      meanGapBps: _descriptor_2.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.recipientsWomen).concat(_descriptor_2.toValue(value_0.recipientsMen).concat(_descriptor_1.toValue(value_0.disclosed).concat(_descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen)))));
  }
}

const _descriptor_7 = new _VariableCategoryStats_0();

const _descriptor_8 = new __compactRuntime.CompactTypeVector(4, _descriptor_7);

class _VariablePayReport_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment().concat(_descriptor_8.alignment())))))))))));
  }
  fromValue(value_0) {
    return {
      round: _descriptor_4.fromValue(value_0),
      headcountWomen: _descriptor_2.fromValue(value_0),
      headcountMen: _descriptor_2.fromValue(value_0),
      recipientsWomen: _descriptor_2.fromValue(value_0),
      recipientsMen: _descriptor_2.fromValue(value_0),
      gapDefined: _descriptor_1.fromValue(value_0),
      meanGapBps: _descriptor_2.fromValue(value_0),
      meanFavorsMen: _descriptor_1.fromValue(value_0),
      medianGapBps: _descriptor_2.fromValue(value_0),
      medianFavorsMen: _descriptor_1.fromValue(value_0),
      quartiles: _descriptor_6.fromValue(value_0),
      categories: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.round).concat(_descriptor_2.toValue(value_0.headcountWomen).concat(_descriptor_2.toValue(value_0.headcountMen).concat(_descriptor_2.toValue(value_0.recipientsWomen).concat(_descriptor_2.toValue(value_0.recipientsMen).concat(_descriptor_1.toValue(value_0.gapDefined).concat(_descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.meanFavorsMen).concat(_descriptor_2.toValue(value_0.medianGapBps).concat(_descriptor_1.toValue(value_0.medianFavorsMen).concat(_descriptor_6.toValue(value_0.quartiles).concat(_descriptor_8.toValue(value_0.categories))))))))))));
  }
}

const _descriptor_9 = new _VariablePayReport_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_9.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_9.toValue(value_0.value));
  }
}

const _descriptor_10 = new _Maybe_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(281474976710655n, 6);

const _descriptor_12 = new __compactRuntime.CompactTypeVector(4, _descriptor_2);

const _descriptor_13 = new __compactRuntime.CompactTypeVector(4, _descriptor_11);

const _descriptor_14 = new __compactRuntime.CompactTypeVector(3, _descriptor_2);

class _VarTotals_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_11.alignment().concat(_descriptor_11.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_12.alignment().concat(_descriptor_12.alignment().concat(_descriptor_13.alignment().concat(_descriptor_13.alignment().concat(_descriptor_12.alignment().concat(_descriptor_12.alignment().concat(_descriptor_14.alignment())))))))))))))))));
  }
  fromValue(value_0) {
    return {
      n: _descriptor_2.fromValue(value_0),
      nW: _descriptor_2.fromValue(value_0),
      nM: _descriptor_2.fromValue(value_0),
      rW: _descriptor_2.fromValue(value_0),
      rM: _descriptor_2.fromValue(value_0),
      sW: _descriptor_11.fromValue(value_0),
      sM: _descriptor_11.fromValue(value_0),
      belowW: _descriptor_2.fromValue(value_0),
      upToW: _descriptor_2.fromValue(value_0),
      belowM: _descriptor_2.fromValue(value_0),
      upToM: _descriptor_2.fromValue(value_0),
      catRW: _descriptor_12.fromValue(value_0),
      catRM: _descriptor_12.fromValue(value_0),
      catSW: _descriptor_13.fromValue(value_0),
      catSM: _descriptor_13.fromValue(value_0),
      bandW: _descriptor_12.fromValue(value_0),
      bandM: _descriptor_12.fromValue(value_0),
      below: _descriptor_14.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.n).concat(_descriptor_2.toValue(value_0.nW).concat(_descriptor_2.toValue(value_0.nM).concat(_descriptor_2.toValue(value_0.rW).concat(_descriptor_2.toValue(value_0.rM).concat(_descriptor_11.toValue(value_0.sW).concat(_descriptor_11.toValue(value_0.sM).concat(_descriptor_2.toValue(value_0.belowW).concat(_descriptor_2.toValue(value_0.upToW).concat(_descriptor_2.toValue(value_0.belowM).concat(_descriptor_2.toValue(value_0.upToM).concat(_descriptor_12.toValue(value_0.catRW).concat(_descriptor_12.toValue(value_0.catRM).concat(_descriptor_13.toValue(value_0.catSW).concat(_descriptor_13.toValue(value_0.catSM).concat(_descriptor_12.toValue(value_0.bandW).concat(_descriptor_12.toValue(value_0.bandM).concat(_descriptor_14.toValue(value_0.below))))))))))))))))));
  }
}

const _descriptor_15 = new _VarTotals_0();

const _descriptor_16 = new __compactRuntime.CompactTypeUnsignedInteger(8589934591n, 5);

const _descriptor_17 = new __compactRuntime.CompactTypeVector(3, _descriptor_16);

class _VariableClaim_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_12.alignment().concat(_descriptor_17.alignment())))));
  }
  fromValue(value_0) {
    return {
      meanGapBps: _descriptor_2.fromValue(value_0),
      medianWomen: _descriptor_4.fromValue(value_0),
      medianMen: _descriptor_4.fromValue(value_0),
      medianGapBps: _descriptor_2.fromValue(value_0),
      catGapBps: _descriptor_12.fromValue(value_0),
      cuts: _descriptor_17.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_4.toValue(value_0.medianWomen).concat(_descriptor_4.toValue(value_0.medianMen).concat(_descriptor_2.toValue(value_0.medianGapBps).concat(_descriptor_12.toValue(value_0.catGapBps).concat(_descriptor_17.toValue(value_0.cuts))))));
  }
}

const _descriptor_18 = new _VariableClaim_0();

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

const _descriptor_19 = new _tuple_0();

const _descriptor_20 = new __compactRuntime.CompactTypeUnsignedInteger(3n, 1);

const _descriptor_21 = new __compactRuntime.CompactTypeUnsignedInteger(1n, 1);

class _EnrolledRecord_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_21.alignment().concat(_descriptor_20.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_20.alignment()))))));
  }
  fromValue(value_0) {
    return {
      salary: _descriptor_4.fromValue(value_0),
      variable: _descriptor_4.fromValue(value_0),
      gender: _descriptor_21.fromValue(value_0),
      category: _descriptor_20.fromValue(value_0),
      sk: _descriptor_0.fromValue(value_0),
      active: _descriptor_1.fromValue(value_0),
      band: _descriptor_20.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.salary).concat(_descriptor_4.toValue(value_0.variable).concat(_descriptor_21.toValue(value_0.gender).concat(_descriptor_20.toValue(value_0.category).concat(_descriptor_0.toValue(value_0.sk).concat(_descriptor_1.toValue(value_0.active).concat(_descriptor_20.toValue(value_0.band)))))));
  }
}

const _descriptor_22 = new _EnrolledRecord_0();

const _descriptor_23 = new __compactRuntime.CompactTypeVector(16, _descriptor_22);

const _descriptor_24 = new __compactRuntime.CompactTypeUnsignedInteger(7n, 1);

class _CategoryStats_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment())))))));
  }
  fromValue(value_0) {
    return {
      headcountWomen: _descriptor_2.fromValue(value_0),
      headcountMen: _descriptor_2.fromValue(value_0),
      disclosed: _descriptor_1.fromValue(value_0),
      meanWomen: _descriptor_4.fromValue(value_0),
      meanMen: _descriptor_4.fromValue(value_0),
      meanGapBps: _descriptor_2.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0),
      gapAtOrAbove5pct: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.headcountWomen).concat(_descriptor_2.toValue(value_0.headcountMen).concat(_descriptor_1.toValue(value_0.disclosed).concat(_descriptor_4.toValue(value_0.meanWomen).concat(_descriptor_4.toValue(value_0.meanMen).concat(_descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen).concat(_descriptor_1.toValue(value_0.gapAtOrAbove5pct))))))));
  }
}

const _descriptor_25 = new _CategoryStats_0();

const _descriptor_26 = new __compactRuntime.CompactTypeVector(4, _descriptor_25);

class _PayReport_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_26.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      round: _descriptor_4.fromValue(value_0),
      headcountWomen: _descriptor_2.fromValue(value_0),
      headcountMen: _descriptor_2.fromValue(value_0),
      meanGapBps: _descriptor_2.fromValue(value_0),
      gapFavorsMen: _descriptor_1.fromValue(value_0),
      meanGapAtOrAbove5pct: _descriptor_1.fromValue(value_0),
      medianGapBps: _descriptor_2.fromValue(value_0),
      medianFavorsMen: _descriptor_1.fromValue(value_0),
      categories: _descriptor_26.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.round).concat(_descriptor_2.toValue(value_0.headcountWomen).concat(_descriptor_2.toValue(value_0.headcountMen).concat(_descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_1.toValue(value_0.gapFavorsMen).concat(_descriptor_1.toValue(value_0.meanGapAtOrAbove5pct).concat(_descriptor_2.toValue(value_0.medianGapBps).concat(_descriptor_1.toValue(value_0.medianFavorsMen).concat(_descriptor_26.toValue(value_0.categories)))))))));
  }
}

const _descriptor_27 = new _PayReport_0();

class _Maybe_1 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_27.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_27.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_27.toValue(value_0.value));
  }
}

const _descriptor_28 = new _Maybe_1();

const _descriptor_29 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_29.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_29.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_29.toValue(value_0.field);
  }
}

const _descriptor_30 = new _MerkleTreeDigest_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_30.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_30.fromValue(value_0),
      goes_left: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_30.toValue(value_0.sibling).concat(_descriptor_1.toValue(value_0.goes_left));
  }
}

const _descriptor_31 = new _MerkleTreePathEntry_0();

const _descriptor_32 = new __compactRuntime.CompactTypeVector(10, _descriptor_31);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_32.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_0.fromValue(value_0),
      path: _descriptor_32.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.leaf).concat(_descriptor_32.toValue(value_0.path));
  }
}

const _descriptor_33 = new _MerkleTreePath_0();

const _descriptor_34 = new __compactRuntime.CompactTypeVector(16, _descriptor_0);

const _descriptor_35 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class _PayTotals_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_11.alignment().concat(_descriptor_11.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_12.alignment().concat(_descriptor_12.alignment().concat(_descriptor_13.alignment().concat(_descriptor_13.alignment()))))))))))));
  }
  fromValue(value_0) {
    return {
      n: _descriptor_2.fromValue(value_0),
      nW: _descriptor_2.fromValue(value_0),
      nM: _descriptor_2.fromValue(value_0),
      sumW: _descriptor_11.fromValue(value_0),
      sumM: _descriptor_11.fromValue(value_0),
      belowW: _descriptor_2.fromValue(value_0),
      upToW: _descriptor_2.fromValue(value_0),
      belowM: _descriptor_2.fromValue(value_0),
      upToM: _descriptor_2.fromValue(value_0),
      catW: _descriptor_12.fromValue(value_0),
      catM: _descriptor_12.fromValue(value_0),
      catSumW: _descriptor_13.fromValue(value_0),
      catSumM: _descriptor_13.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.n).concat(_descriptor_2.toValue(value_0.nW).concat(_descriptor_2.toValue(value_0.nM).concat(_descriptor_11.toValue(value_0.sumW).concat(_descriptor_11.toValue(value_0.sumM).concat(_descriptor_2.toValue(value_0.belowW).concat(_descriptor_2.toValue(value_0.upToW).concat(_descriptor_2.toValue(value_0.belowM).concat(_descriptor_2.toValue(value_0.upToM).concat(_descriptor_12.toValue(value_0.catW).concat(_descriptor_12.toValue(value_0.catM).concat(_descriptor_13.toValue(value_0.catSumW).concat(_descriptor_13.toValue(value_0.catSumM)))))))))))));
  }
}

const _descriptor_36 = new _PayTotals_0();

const _descriptor_37 = new __compactRuntime.CompactTypeVector(4, _descriptor_4);

class _ReportClaim_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_37.alignment().concat(_descriptor_37.alignment().concat(_descriptor_12.alignment()))))));
  }
  fromValue(value_0) {
    return {
      meanGapBps: _descriptor_2.fromValue(value_0),
      medianWomen: _descriptor_4.fromValue(value_0),
      medianMen: _descriptor_4.fromValue(value_0),
      medianGapBps: _descriptor_2.fromValue(value_0),
      catMeanWomen: _descriptor_37.fromValue(value_0),
      catMeanMen: _descriptor_37.fromValue(value_0),
      catGapBps: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.meanGapBps).concat(_descriptor_4.toValue(value_0.medianWomen).concat(_descriptor_4.toValue(value_0.medianMen).concat(_descriptor_2.toValue(value_0.medianGapBps).concat(_descriptor_37.toValue(value_0.catMeanWomen).concat(_descriptor_37.toValue(value_0.catMeanMen).concat(_descriptor_12.toValue(value_0.catGapBps)))))));
  }
}

const _descriptor_38 = new _ReportClaim_0();

class _PaySeal_0 {
  alignment() {
    return _descriptor_36.alignment().concat(_descriptor_38.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      totals: _descriptor_36.fromValue(value_0),
      claim: _descriptor_38.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_36.toValue(value_0.totals).concat(_descriptor_38.toValue(value_0.claim).concat(_descriptor_0.toValue(value_0.salt)));
  }
}

const _descriptor_39 = new _PaySeal_0();

class _VarSeal_0 {
  alignment() {
    return _descriptor_15.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      totals: _descriptor_15.fromValue(value_0),
      claim: _descriptor_18.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_15.toValue(value_0.totals).concat(_descriptor_18.toValue(value_0.claim).concat(_descriptor_0.toValue(value_0.salt)));
  }
}

const _descriptor_40 = new _VarSeal_0();

class _RowOpening_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_21.alignment().concat(_descriptor_20.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())))));
  }
  fromValue(value_0) {
    return {
      salary: _descriptor_4.fromValue(value_0),
      variable: _descriptor_4.fromValue(value_0),
      gender: _descriptor_21.fromValue(value_0),
      category: _descriptor_20.fromValue(value_0),
      nonce: _descriptor_0.fromValue(value_0),
      active: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.salary).concat(_descriptor_4.toValue(value_0.variable).concat(_descriptor_21.toValue(value_0.gender).concat(_descriptor_20.toValue(value_0.category).concat(_descriptor_0.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.active))))));
  }
}

const _descriptor_41 = new _RowOpening_0();

const _descriptor_42 = new __compactRuntime.CompactTypeVector(16, _descriptor_41);

class _tuple_1 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_21.alignment().concat(_descriptor_20.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_4.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_21.fromValue(value_0),
      _descriptor_20.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_21.toValue(value_0[2]).concat(_descriptor_20.toValue(value_0[3]))));
  }
}

const _descriptor_43 = new _tuple_1();

const _descriptor_44 = new __compactRuntime.CompactTypeVector(4, _descriptor_0);

const _descriptor_45 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

const _descriptor_46 = new __compactRuntime.CompactTypeVector(5, _descriptor_0);

const _descriptor_47 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_48 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_48.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_48.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_48.toValue(value_0.domain_sep).concat(_descriptor_0.toValue(value_0.data));
  }
}

const _descriptor_49 = new _LeafPreimage_0();

const _descriptor_50 = new __compactRuntime.CompactTypeVector(2, _descriptor_29);

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

const _descriptor_51 = new _Either_0();

const _descriptor_52 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

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

const _descriptor_53 = new _ContractAddress_0();

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
    if (typeof(witnesses_0.paySeal) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named paySeal');
    }
    if (typeof(witnesses_0.variableSeal) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named variableSeal');
    }
    if (typeof(witnesses_0.freshSalt) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named freshSalt');
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
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`declareRoster: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const headcount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('declareRoster',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 311 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(headcount_0) === 'bigint' && headcount_0 >= 0n && headcount_0 <= 65535n)) {
          __compactRuntime.typeError('declareRoster',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 311 char 1',
                                     'Uint<0..65536>',
                                     headcount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(headcount_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._declareRoster_0(context,
                                               partialProofData,
                                               headcount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addPayrollRows: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`addPayrollRows: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const rows_0 = args_1[1];
        const count_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addPayrollRows',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 323 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(rows_0) && rows_0.length === 16 && rows_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError('addPayrollRows',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 323 char 1',
                                     'Vector<16, Bytes<32>>',
                                     rows_0)
        }
        if (!(typeof(count_0) === 'bigint' && count_0 >= 0n && count_0 <= 255n)) {
          __compactRuntime.typeError('addPayrollRows',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'equilux.compact line 323 char 1',
                                     'Uint<0..256>',
                                     count_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_34.toValue(rows_0).concat(_descriptor_35.toValue(count_0)),
            alignment: _descriptor_34.alignment().concat(_descriptor_35.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addPayrollRows_0(context,
                                                partialProofData,
                                                rows_0,
                                                count_0);
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
                                     'equilux.compact line 345 char 1',
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
                                     'equilux.compact line 369 char 1',
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
                                     'equilux.compact line 399 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(path_0) === 'object' && path_0.leaf.buffer instanceof ArrayBuffer && path_0.leaf.BYTES_PER_ELEMENT === 1 && path_0.leaf.length === 32 && Array.isArray(path_0.path) && path_0.path.length === 10 && path_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
          __compactRuntime.typeError('checkReceipt',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'equilux.compact line 399 char 1',
                                     'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<10, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                     path_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_33.toValue(path_0),
            alignment: _descriptor_33.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkReceipt_0(context, partialProofData, path_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      beginReport: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`beginReport: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('beginReport',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 548 char 1',
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
        const result_0 = this._beginReport_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      reportBatch: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`reportBatch: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('reportBatch',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 568 char 1',
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
        const result_0 = this._reportBatch_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      finishReport: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`finishReport: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('finishReport',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 607 char 1',
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
        const result_0 = this._finishReport_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_27.toValue(result_0), alignment: _descriptor_27.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      beginVariableReport: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`beginVariableReport: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('beginVariableReport',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 650 char 1',
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
        const result_0 = this._beginVariableReport_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      variableBatch: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`variableBatch: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('variableBatch',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 679 char 1',
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
        const result_0 = this._variableBatch_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      finishVariableReport: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`finishVariableReport: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('finishVariableReport',
                                     'argument 1 (as invoked from Typescript)',
                                     'equilux.compact line 759 char 1',
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
        const result_0 = this._finishVariableReport_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_9.toValue(result_0), alignment: _descriptor_9.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      declareRoster: this.circuits.declareRoster,
      addPayrollRows: this.circuits.addPayrollRows,
      confirmPayroll: this.circuits.confirmPayroll,
      enroll: this.circuits.enroll,
      checkReceipt: this.circuits.checkReceipt,
      beginReport: this.circuits.beginReport,
      reportBatch: this.circuits.reportBatch,
      finishReport: this.circuits.finishReport,
      beginVariableReport: this.circuits.beginVariableReport,
      variableBatch: this.circuits.variableBatch,
      finishVariableReport: this.circuits.finishVariableReport
    };
    this.provableCircuits = {
      declareRoster: this.circuits.declareRoster,
      addPayrollRows: this.circuits.addPayrollRows,
      confirmPayroll: this.circuits.confirmPayroll,
      enroll: this.circuits.enroll,
      checkReceipt: this.circuits.checkReceipt,
      beginReport: this.circuits.beginReport,
      reportBatch: this.circuits.reportBatch,
      finishReport: this.circuits.finishReport,
      beginVariableReport: this.circuits.beginVariableReport,
      variableBatch: this.circuits.variableBatch,
      finishVariableReport: this.circuits.finishVariableReport
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
                                 'equilux.compact line 230 char 1',
                                 'Bytes<32>',
                                 employerPkInit_0)
    }
    if (!(providerPkInit_0.buffer instanceof ArrayBuffer && providerPkInit_0.BYTES_PER_ELEMENT === 1 && providerPkInit_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'equilux.compact line 230 char 1',
                                 'Bytes<32>',
                                 providerPkInit_0)
    }
    if (!(councilPkInit_0.buffer instanceof ArrayBuffer && councilPkInit_0.BYTES_PER_ELEMENT === 1 && councilPkInit_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 3 (argument 4 as invoked from Typescript)',
                                 'equilux.compact line 230 char 1',
                                 'Bytes<32>',
                                 councilPkInit_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('declareRoster', new __compactRuntime.ContractOperation());
    state_0.setOperation('addPayrollRows', new __compactRuntime.ContractOperation());
    state_0.setOperation('confirmPayroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('enroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkReceipt', new __compactRuntime.ContractOperation());
    state_0.setOperation('beginReport', new __compactRuntime.ContractOperation());
    state_0.setOperation('reportBatch', new __compactRuntime.ContractOperation());
    state_0.setOperation('finishReport', new __compactRuntime.ContractOperation());
    state_0.setOperation('beginVariableReport', new __compactRuntime.ContractOperation());
    state_0.setOperation('variableBatch', new __compactRuntime.ContractOperation());
    state_0.setOperation('finishVariableReport', new __compactRuntime.ContractOperation());
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
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(0n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(1n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(2n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(3n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(4n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(6n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(9n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(10n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(10)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                        alignment: _descriptor_3.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(0n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(1n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(2n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(3n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(4n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(6n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(9n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(10n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(11n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(12n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(13n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue({ is_some: false, value: { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false, medianGapBps: 0n, medianFavorsMen: false, categories: new Array(4).fill({ headcountWomen: 0n, headcountMen: 0n, disclosed: false, meanWomen: 0n, meanMen: 0n, meanGapBps: 0n, gapFavorsMen: false, gapAtOrAbove5pct: false }) } }),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(14n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue({ is_some: false, value: { round: 0n, headcountWomen: 0n, headcountMen: 0n, recipientsWomen: 0n, recipientsMen: 0n, gapDefined: false, meanGapBps: 0n, meanFavorsMen: false, medianGapBps: 0n, medianFavorsMen: false, quartiles: new Array(4).fill({ women: 0n, men: 0n }), categories: new Array(4).fill({ recipientsWomen: 0n, recipientsMen: 0n, disclosed: false, meanGapBps: 0n, gapFavorsMen: false }) } }),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(0n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(employerPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(1n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(2n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(councilPkInit_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(3n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_2.toValue(tmp_0),
                                                                alignment: _descriptor_2.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(4n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_2),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(6n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_3),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_4),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(10n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_5 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(9n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_5),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_6 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(12n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_6),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_7 = this._none_0();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(13n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(tmp_7),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_8 = this._none_1();
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(14n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_8),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
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
               { round: 0n, headcountWomen: 0n, headcountMen: 0n, meanGapBps: 0n, gapFavorsMen: false, meanGapAtOrAbove5pct: false, medianGapBps: 0n, medianFavorsMen: false, categories: new Array(4).fill({ headcountWomen: 0n, headcountMen: 0n, disclosed: false, meanWomen: 0n, meanMen: 0n, meanGapBps: 0n, gapFavorsMen: false, gapAtOrAbove5pct: false }) } };
  }
  _none_1() {
    return { is_some: false,
             value:
               { round: 0n, headcountWomen: 0n, headcountMen: 0n, recipientsWomen: 0n, recipientsMen: 0n, gapDefined: false, meanGapBps: 0n, meanFavorsMen: false, medianGapBps: 0n, medianFavorsMen: false, quartiles: new Array(4).fill({ women: 0n, men: 0n }), categories: new Array(4).fill({ recipientsWomen: 0n, recipientsMen: 0n, disclosed: false, meanGapBps: 0n, gapFavorsMen: false }) } };
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
    const result_0 = __compactRuntime.transientHash(_descriptor_50, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_47, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_49, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_39, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_46, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_44, value_0);
    return result_0;
  }
  _persistentHash_5(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_45, value_0);
    return result_0;
  }
  _persistentHash_6(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_40, value_0);
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
                                 'equilux.compact line 251 char 1',
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
                                 'equilux.compact line 252 char 1',
                                 '[Uint<0..4294967296>, Uint<0..4294967296>, Uint<0..2>, Uint<0..4>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_43.toValue(result_0),
      alignment: _descriptor_43.alignment()
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
                                 'equilux.compact line 253 char 1',
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
                                 'equilux.compact line 254 char 1',
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
                                 'equilux.compact line 255 char 1',
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
                                 'equilux.compact line 256 char 1',
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
                                 'equilux.compact line 257 char 1',
                                 'Vector<16, struct RowOpening<salary: Uint<0..4294967296>, variable: Uint<0..4294967296>, gender: Uint<0..2>, category: Uint<0..4>, nonce: Bytes<32>, active: Boolean>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_42.toValue(result_0),
      alignment: _descriptor_42.alignment()
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
                                 'equilux.compact line 258 char 1',
                                 'Vector<16, struct EnrolledRecord<salary: Uint<0..4294967296>, variable: Uint<0..4294967296>, gender: Uint<0..2>, category: Uint<0..4>, sk: Bytes<32>, active: Boolean, band: Uint<0..4>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_23.toValue(result_0),
      alignment: _descriptor_23.alignment()
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
                                 'equilux.compact line 259 char 1',
                                 'struct ReportClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catMeanWomen: Vector<4, Uint<0..4294967296>>, catMeanMen: Vector<4, Uint<0..4294967296>>, catGapBps: Vector<4, Uint<0..65536>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_38.toValue(result_0),
      alignment: _descriptor_38.alignment()
    });
    return result_0;
  }
  _variableClaim_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.variableClaim(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.meanGapBps) === 'bigint' && result_0.meanGapBps >= 0n && result_0.meanGapBps <= 65535n && typeof(result_0.medianWomen) === 'bigint' && result_0.medianWomen >= 0n && result_0.medianWomen <= 4294967295n && typeof(result_0.medianMen) === 'bigint' && result_0.medianMen >= 0n && result_0.medianMen <= 4294967295n && typeof(result_0.medianGapBps) === 'bigint' && result_0.medianGapBps >= 0n && result_0.medianGapBps <= 65535n && Array.isArray(result_0.catGapBps) && result_0.catGapBps.length === 4 && result_0.catGapBps.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.cuts) && result_0.cuts.length === 3 && result_0.cuts.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 8589934591n))) {
      __compactRuntime.typeError('variableClaim',
                                 'return value',
                                 'equilux.compact line 260 char 1',
                                 'struct VariableClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catGapBps: Vector<4, Uint<0..65536>>, cuts: Vector<3, Uint<0..8589934592>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_18.toValue(result_0),
      alignment: _descriptor_18.alignment()
    });
    return result_0;
  }
  _paySeal_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.paySeal(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.totals) === 'object' && typeof(result_0.totals.n) === 'bigint' && result_0.totals.n >= 0n && result_0.totals.n <= 65535n && typeof(result_0.totals.nW) === 'bigint' && result_0.totals.nW >= 0n && result_0.totals.nW <= 65535n && typeof(result_0.totals.nM) === 'bigint' && result_0.totals.nM >= 0n && result_0.totals.nM <= 65535n && typeof(result_0.totals.sumW) === 'bigint' && result_0.totals.sumW >= 0n && result_0.totals.sumW <= 281474976710655n && typeof(result_0.totals.sumM) === 'bigint' && result_0.totals.sumM >= 0n && result_0.totals.sumM <= 281474976710655n && typeof(result_0.totals.belowW) === 'bigint' && result_0.totals.belowW >= 0n && result_0.totals.belowW <= 65535n && typeof(result_0.totals.upToW) === 'bigint' && result_0.totals.upToW >= 0n && result_0.totals.upToW <= 65535n && typeof(result_0.totals.belowM) === 'bigint' && result_0.totals.belowM >= 0n && result_0.totals.belowM <= 65535n && typeof(result_0.totals.upToM) === 'bigint' && result_0.totals.upToM >= 0n && result_0.totals.upToM <= 65535n && Array.isArray(result_0.totals.catW) && result_0.totals.catW.length === 4 && result_0.totals.catW.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.catM) && result_0.totals.catM.length === 4 && result_0.totals.catM.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.catSumW) && result_0.totals.catSumW.length === 4 && result_0.totals.catSumW.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 281474976710655n) && Array.isArray(result_0.totals.catSumM) && result_0.totals.catSumM.length === 4 && result_0.totals.catSumM.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 281474976710655n) && typeof(result_0.claim) === 'object' && typeof(result_0.claim.meanGapBps) === 'bigint' && result_0.claim.meanGapBps >= 0n && result_0.claim.meanGapBps <= 65535n && typeof(result_0.claim.medianWomen) === 'bigint' && result_0.claim.medianWomen >= 0n && result_0.claim.medianWomen <= 4294967295n && typeof(result_0.claim.medianMen) === 'bigint' && result_0.claim.medianMen >= 0n && result_0.claim.medianMen <= 4294967295n && typeof(result_0.claim.medianGapBps) === 'bigint' && result_0.claim.medianGapBps >= 0n && result_0.claim.medianGapBps <= 65535n && Array.isArray(result_0.claim.catMeanWomen) && result_0.claim.catMeanWomen.length === 4 && result_0.claim.catMeanWomen.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 4294967295n) && Array.isArray(result_0.claim.catMeanMen) && result_0.claim.catMeanMen.length === 4 && result_0.claim.catMeanMen.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 4294967295n) && Array.isArray(result_0.claim.catGapBps) && result_0.claim.catGapBps.length === 4 && result_0.claim.catGapBps.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && result_0.salt.buffer instanceof ArrayBuffer && result_0.salt.BYTES_PER_ELEMENT === 1 && result_0.salt.length === 32)) {
      __compactRuntime.typeError('paySeal',
                                 'return value',
                                 'equilux.compact line 261 char 1',
                                 'struct PaySeal<totals: struct PayTotals<n: Uint<0..65536>, nW: Uint<0..65536>, nM: Uint<0..65536>, sumW: Uint<0..281474976710656>, sumM: Uint<0..281474976710656>, belowW: Uint<0..65536>, upToW: Uint<0..65536>, belowM: Uint<0..65536>, upToM: Uint<0..65536>, catW: Vector<4, Uint<0..65536>>, catM: Vector<4, Uint<0..65536>>, catSumW: Vector<4, Uint<0..281474976710656>>, catSumM: Vector<4, Uint<0..281474976710656>>>, claim: struct ReportClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catMeanWomen: Vector<4, Uint<0..4294967296>>, catMeanMen: Vector<4, Uint<0..4294967296>>, catGapBps: Vector<4, Uint<0..65536>>>, salt: Bytes<32>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_39.toValue(result_0),
      alignment: _descriptor_39.alignment()
    });
    return result_0;
  }
  _variableSeal_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.variableSeal(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.totals) === 'object' && typeof(result_0.totals.n) === 'bigint' && result_0.totals.n >= 0n && result_0.totals.n <= 65535n && typeof(result_0.totals.nW) === 'bigint' && result_0.totals.nW >= 0n && result_0.totals.nW <= 65535n && typeof(result_0.totals.nM) === 'bigint' && result_0.totals.nM >= 0n && result_0.totals.nM <= 65535n && typeof(result_0.totals.rW) === 'bigint' && result_0.totals.rW >= 0n && result_0.totals.rW <= 65535n && typeof(result_0.totals.rM) === 'bigint' && result_0.totals.rM >= 0n && result_0.totals.rM <= 65535n && typeof(result_0.totals.sW) === 'bigint' && result_0.totals.sW >= 0n && result_0.totals.sW <= 281474976710655n && typeof(result_0.totals.sM) === 'bigint' && result_0.totals.sM >= 0n && result_0.totals.sM <= 281474976710655n && typeof(result_0.totals.belowW) === 'bigint' && result_0.totals.belowW >= 0n && result_0.totals.belowW <= 65535n && typeof(result_0.totals.upToW) === 'bigint' && result_0.totals.upToW >= 0n && result_0.totals.upToW <= 65535n && typeof(result_0.totals.belowM) === 'bigint' && result_0.totals.belowM >= 0n && result_0.totals.belowM <= 65535n && typeof(result_0.totals.upToM) === 'bigint' && result_0.totals.upToM >= 0n && result_0.totals.upToM <= 65535n && Array.isArray(result_0.totals.catRW) && result_0.totals.catRW.length === 4 && result_0.totals.catRW.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.catRM) && result_0.totals.catRM.length === 4 && result_0.totals.catRM.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.catSW) && result_0.totals.catSW.length === 4 && result_0.totals.catSW.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 281474976710655n) && Array.isArray(result_0.totals.catSM) && result_0.totals.catSM.length === 4 && result_0.totals.catSM.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 281474976710655n) && Array.isArray(result_0.totals.bandW) && result_0.totals.bandW.length === 4 && result_0.totals.bandW.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.bandM) && result_0.totals.bandM.length === 4 && result_0.totals.bandM.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.totals.below) && result_0.totals.below.length === 3 && result_0.totals.below.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && typeof(result_0.claim) === 'object' && typeof(result_0.claim.meanGapBps) === 'bigint' && result_0.claim.meanGapBps >= 0n && result_0.claim.meanGapBps <= 65535n && typeof(result_0.claim.medianWomen) === 'bigint' && result_0.claim.medianWomen >= 0n && result_0.claim.medianWomen <= 4294967295n && typeof(result_0.claim.medianMen) === 'bigint' && result_0.claim.medianMen >= 0n && result_0.claim.medianMen <= 4294967295n && typeof(result_0.claim.medianGapBps) === 'bigint' && result_0.claim.medianGapBps >= 0n && result_0.claim.medianGapBps <= 65535n && Array.isArray(result_0.claim.catGapBps) && result_0.claim.catGapBps.length === 4 && result_0.claim.catGapBps.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 65535n) && Array.isArray(result_0.claim.cuts) && result_0.claim.cuts.length === 3 && result_0.claim.cuts.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 8589934591n) && result_0.salt.buffer instanceof ArrayBuffer && result_0.salt.BYTES_PER_ELEMENT === 1 && result_0.salt.length === 32)) {
      __compactRuntime.typeError('variableSeal',
                                 'return value',
                                 'equilux.compact line 262 char 1',
                                 'struct VarSeal<totals: struct VarTotals<n: Uint<0..65536>, nW: Uint<0..65536>, nM: Uint<0..65536>, rW: Uint<0..65536>, rM: Uint<0..65536>, sW: Uint<0..281474976710656>, sM: Uint<0..281474976710656>, belowW: Uint<0..65536>, upToW: Uint<0..65536>, belowM: Uint<0..65536>, upToM: Uint<0..65536>, catRW: Vector<4, Uint<0..65536>>, catRM: Vector<4, Uint<0..65536>>, catSW: Vector<4, Uint<0..281474976710656>>, catSM: Vector<4, Uint<0..281474976710656>>, bandW: Vector<4, Uint<0..65536>>, bandM: Vector<4, Uint<0..65536>>, below: Vector<3, Uint<0..65536>>>, claim: struct VariableClaim<meanGapBps: Uint<0..65536>, medianWomen: Uint<0..4294967296>, medianMen: Uint<0..4294967296>, medianGapBps: Uint<0..65536>, catGapBps: Vector<4, Uint<0..65536>>, cuts: Vector<3, Uint<0..8589934592>>>, salt: Bytes<32>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_40.toValue(result_0),
      alignment: _descriptor_40.alignment()
    });
    return result_0;
  }
  _freshSalt_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.freshSalt(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('freshSalt',
                                 'return value',
                                 'equilux.compact line 263 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
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
                                                                        'equilux.compact line 274 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        __compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(salary_0,
                                                                                                                                                      8n),
                                                                                                                            __compactRuntime.mulField(category_0,
                                                                                                                                                      2n)),
                                                                                                  gender_0),
                                                                        'equilux.compact line 275 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        variable_0,
                                                                        'equilux.compact line 276 char 6'),
                                   sk_0]);
  }
  _payrollRow_0(salary_0, variable_0, gender_0, category_0, nonce_0) {
    return this._persistentHash_4([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 114, 111, 119, 58, 118, 51, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        __compactRuntime.addField(__compactRuntime.addField(__compactRuntime.mulField(salary_0,
                                                                                                                                                      8n),
                                                                                                                            __compactRuntime.mulField(category_0,
                                                                                                                                                      2n)),
                                                                                                  gender_0),
                                                                        'equilux.compact line 285 char 6'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        variable_0,
                                                                        'equilux.compact line 286 char 6'),
                                   nonce_0]);
  }
  _enrollmentNullifier_0(sk_0, r_0) {
    return this._persistentHash_5([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 110, 117, 108, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        r_0,
                                                                        'equilux.compact line 291 char 73'),
                                   sk_0]);
  }
  _countTag_0(context, partialProofData, kind_0, cm_0) {
    return this._persistentHash_4([new Uint8Array([101, 113, 117, 105, 108, 117, 120, 58, 99, 110, 116, 58, 118, 52, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                                  partialProofData,
                                                                                                                                  [
                                                                                                                                   { dup: { n: 0 } },
                                                                                                                                   { idx: { cached: false,
                                                                                                                                            pushPath: false,
                                                                                                                                            path: [
                                                                                                                                                   { tag: 'value',
                                                                                                                                                     value: { value: _descriptor_35.toValue(1n),
                                                                                                                                                              alignment: _descriptor_35.alignment() } },
                                                                                                                                                   { tag: 'value',
                                                                                                                                                     value: { value: _descriptor_35.toValue(5n),
                                                                                                                                                              alignment: _descriptor_35.alignment() } }] } },
                                                                                                                                   { popeq: { cached: false,
                                                                                                                                              result: undefined } }]).value),
                                                                        'equilux.compact line 297 char 34'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        kind_0,
                                                                        'equilux.compact line 297 char 69'),
                                   cm_0]);
  }
  _sealPay_0(s_0) { return this._persistentHash_2(s_0); }
  _sealVar_0(s_0) { return this._persistentHash_6(s_0); }
  _declareRoster_0(context, partialProofData, headcount_0) {
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
                                                                                                                       value: { value: _descriptor_35.toValue(0n),
                                                                                                                                alignment: _descriptor_35.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(1n),
                                                                                                                                alignment: _descriptor_35.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the payroll provider');
    __compactRuntime.assert(this._equal_1(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(0n),
                                                                                                                                alignment: _descriptor_35.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(4n),
                                                                                                                                alignment: _descriptor_35.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value),
                                          0n),
                            'roster already declared this round');
    const n_0 = headcount_0;
    __compactRuntime.assert(n_0 > 0n, 'roster must not be empty');
    __compactRuntime.assert(n_0 <= 512n,
                            "roster exceeds this instance's 512-person size");
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(4n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(n_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _addPayrollRows_0(context, partialProofData, rows_0, count_0) {
    __compactRuntime.assert(this._equal_2(this._publicKey_0(this._providerSecret_0(context,
                                                                                   partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(0n),
                                                                                                                                alignment: _descriptor_35.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(1n),
                                                                                                                                alignment: _descriptor_35.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'not the payroll provider');
    let t_0;
    __compactRuntime.assert((t_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_35.toValue(0n),
                                                                                                                         alignment: _descriptor_35.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_35.toValue(4n),
                                                                                                                         alignment: _descriptor_35.alignment() } }] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }]).value),
                             t_0 > 0n),
                            'roster not yet declared by the payroll provider');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(6n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value),
                            'every payroll row is already committed');
    const k_0 = count_0;
    __compactRuntime.assert(k_0 > 0n && k_0 <= 16n,
                            'a batch holds 1 to 16 payroll rows');
    const after_0 = ((t1) => {
                      if (t1 > 65535n) {
                        throw new __compactRuntime.CompactError('equilux.compact line 329 char 17: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                      }
                      return t1;
                    })(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_35.toValue(0n),
                                                                                                             alignment: _descriptor_35.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_35.toValue(5n),
                                                                                                             alignment: _descriptor_35.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value)
                       +
                       k_0);
    __compactRuntime.assert(after_0
                            <=
                            _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(4n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'more payroll rows than the declared headcount');
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_1, i_0) =>
                    {
                      if (i_0 < k_0) {
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
                                                                                                                               value: { value: _descriptor_35.toValue(1n),
                                                                                                                                        alignment: _descriptor_35.alignment() } },
                                                                                                                             { tag: 'value',
                                                                                                                               value: { value: _descriptor_35.toValue(1n),
                                                                                                                                        alignment: _descriptor_35.alignment() } }] } },
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
                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                      alignment: _descriptor_35.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
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
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(after_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this._equal_3(after_0,
                                _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 0 } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_35.toValue(0n),
                                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_35.toValue(4n),
                                                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                                                           { popeq: { cached: false,
                                                                                                      result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(6n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_2),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _confirmPayroll_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_4(this._publicKey_0(this._councilSecret_0(context,
                                                                                  partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(0n),
                                                                                                                                alignment: _descriptor_35.alignment() } },
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_35.toValue(2n),
                                                                                                                                alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(6n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(8n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                                                                           { push: { storage: false,
                                                                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(h_0),
                                                                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                           'member',
                                                                                                           { popeq: { cached: true,
                                                                                                                      result: undefined } }]).value),
                                                'an opened row is not in the committed payroll');
                        __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_35.toValue(1n),
                                                                                                                                       alignment: _descriptor_35.alignment() } },
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_35.toValue(2n),
                                                                                                                                       alignment: _descriptor_35.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(h_0),
                                                                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value),
                                                'the same payroll row was opened twice');
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                      alignment: _descriptor_35.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_35.toValue(2n),
                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(h_0),
                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
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
    const opened_0 = this._folder_3(context,
                                    partialProofData,
                                    ((context, partialProofData, acc_0, o_0) =>
                                     {
                                       return ((t1) => {
                                                if (t1 > 65535n) {
                                                  throw new __compactRuntime.CompactError('equilux.compact line 359 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                }
                                                return t1;
                                              })(acc_0 + (o_0.active ? 1n : 0n));
                                     }),
                                    0n,
                                    rows_0);
    __compactRuntime.assert(opened_0 > 0n, 'the council opened no rows');
    const after_0 = ((t1) => {
                      if (t1 > 65535n) {
                        throw new __compactRuntime.CompactError('equilux.compact line 361 char 17: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                      }
                      return t1;
                    })(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_35.toValue(0n),
                                                                                                             alignment: _descriptor_35.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_35.toValue(7n),
                                                                                                             alignment: _descriptor_35.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value)
                       +
                       opened_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(after_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this._equal_5(after_0,
                                _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 0 } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_35.toValue(0n),
                                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_35.toValue(4n),
                                                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                                                           { popeq: { cached: false,
                                                                                                      result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
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
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(6n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(8n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
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
    const r_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_35.toValue(0n),
                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_35.toValue(3n),
                                                                                                      alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(3n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(3n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(row_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(4n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nul_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(10n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
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
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 3 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(0n),
                                                                  alignment: _descriptor_35.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(9n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_2.toValue(tmp_0),
                                                                alignment: _descriptor_2.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_35.toValue(10n),
                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                      'root',
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_30.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_30.alignment() }).encode() } },
                                                                      'eq',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _womenSalary_0(rec_0) {
    if (rec_0.active && this._equal_6(rec_0.gender, 0n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _menSalary_0(rec_0) {
    if (rec_0.active && this._equal_7(rec_0.gender, 1n)) {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _womenCount_0(rec_0) {
    if (rec_0.active && this._equal_8(rec_0.gender, 0n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _menCount_0(rec_0) {
    if (rec_0.active && this._equal_9(rec_0.gender, 1n)) {
      return 1n;
    } else {
      return 0n;
    }
  }
  _activeCount_0(rec_0) { if (rec_0.active) { return 1n; } else { return 0n; } }
  _inCategory_0(rec_0, c_0, g_0) {
    if (rec_0.active && this._equal_10(rec_0.category, c_0)
        &&
        this._equal_11(rec_0.gender, g_0))
    {
      return 1n;
    } else {
      return 0n;
    }
  }
  _salaryInCategory_0(rec_0, c_0, g_0) {
    if (rec_0.active && this._equal_12(rec_0.category, c_0)
        &&
        this._equal_13(rec_0.gender, g_0))
    {
      return rec_0.salary;
    } else {
      return 0n;
    }
  }
  _strictlyBelow_0(rec_0, g_0, m_0) {
    let t_0;
    if (rec_0.active && this._equal_14(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_15(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_16(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_17(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_18(rec_0.category, c_0)
        &&
        this._equal_19(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_20(rec_0.category, c_0)
        &&
        this._equal_21(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_22(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_23(rec_0.gender, g_0)
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
    if (rec_0.active && this._equal_24(rec_0.gender, g_0)
        &&
        this._equal_25(rec_0.band, b_0))
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
  _bandFloor_0(b_0, cuts_0) {
    if (this._equal_26(b_0, 0n)) {
      return 0n;
    } else {
      if (this._equal_27(b_0, 1n)) {
        return cuts_0[0];
      } else {
        if (this._equal_28(b_0, 2n)) {
          return cuts_0[1];
        } else {
          return cuts_0[2];
        }
      }
    }
  }
  _bandCeilingOk_0(b_0, total_0, cuts_0) {
    if (this._equal_29(b_0, 0n)) {
      return total_0 <= cuts_0[0];
    } else {
      if (this._equal_30(b_0, 1n)) {
        return total_0 <= cuts_0[1];
      } else {
        if (this._equal_31(b_0, 2n)) {
          return total_0 <= cuts_0[2];
        } else {
          return true;
        }
      }
    }
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
  _categoryStats_0(nW_0, nM_0, sW_0, sM_0, meanW_0, meanM_0, g_0) {
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
  _variableCategoryStats_0(nW_0, nM_0, sW_0, sM_0, g_0) {
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
  _countBatch_0(context, partialProofData, recs_0, kind_0) {
    const r_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_35.toValue(0n),
                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_35.toValue(3n),
                                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value);
    this._folder_4(context,
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
                                                                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                                                                      alignment: _descriptor_35.alignment() } },
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_35.toValue(4n),
                                                                                                                                      alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                                              value: { value: _descriptor_35.toValue(1n),
                                                                                                                                       alignment: _descriptor_35.alignment() } },
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_35.toValue(0n),
                                                                                                                                       alignment: _descriptor_35.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value)),
                                                'record not enrolled');
                        const tag_0 = this._countTag_0(context,
                                                       partialProofData,
                                                       kind_0,
                                                       cm_0);
                        __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_35.toValue(1n),
                                                                                                                                       alignment: _descriptor_35.alignment() } },
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_35.toValue(6n),
                                                                                                                                       alignment: _descriptor_35.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value),
                                                'record already counted in this report');
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_35.toValue(1n),
                                                                                      alignment: _descriptor_35.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_35.toValue(6n),
                                                                                      alignment: _descriptor_35.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
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
    this._folder_6(context,
                   partialProofData,
                   ((context, partialProofData, t_1, i_1) =>
                    {
                      this._folder_5(context,
                                     partialProofData,
                                     ((context, partialProofData, t_2, j_0) =>
                                      {
                                        if (i_1 < j_0 && recs_0[i_1].active
                                            &&
                                            recs_0[j_0].active)
                                        {
                                          __compactRuntime.assert(!this._equal_32(recs_0[i_1].sk,
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
    const k_0 = this._folder_7(context,
                               partialProofData,
                               ((context, partialProofData, acc_0, rec_0) =>
                                {
                                  return ((t1) => {
                                           if (t1 > 65535n) {
                                             throw new __compactRuntime.CompactError('equilux.compact line 541 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                           }
                                           return t1;
                                         })(acc_0 + this._activeCount_0(rec_0));
                                }),
                               0n,
                               recs_0);
    __compactRuntime.assert(k_0 > 0n, 'an empty reporting batch'); return k_0;
  }
  _beginReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_33(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(8n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'payroll not yet confirmed by the works council');
    const tmp_0 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('equilux.compact line 551 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_35.toValue(1n),
                                                                                                           alignment: _descriptor_35.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_35.toValue(5n),
                                                                                                           alignment: _descriptor_35.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value)
                     +
                     1n);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const zero_0 = { n: 0n,
                     nW: 0n,
                     nM: 0n,
                     sumW: 0n,
                     sumM: 0n,
                     belowW: 0n,
                     upToW: 0n,
                     belowM: 0n,
                     upToM: 0n,
                     catW: [0n, 0n, 0n, 0n],
                     catM: [0n, 0n, 0n, 0n],
                     catSumW: [0n, 0n, 0n, 0n],
                     catSumM: [0n, 0n, 0n, 0n] };
    const tmp_1 = this._sealPay_0({ totals: zero_0,
                                    claim:
                                      this._reportClaim_0(context,
                                                          partialProofData),
                                    salt:
                                      this._freshSalt_0(context,
                                                        partialProofData) });
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(9n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_2),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _catCount_0(recs_0, c_0, g_0) {
    return this._folder_8(((acc_0, rec_0) =>
                           {
                             return ((t1) => {
                                      if (t1 > 65535n) {
                                        throw new __compactRuntime.CompactError('equilux.compact line 562 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                      }
                                      return t1;
                                    })(acc_0
                                       +
                                       this._inCategory_0(rec_0, c_0, g_0));
                           }),
                          0n,
                          recs_0);
  }
  _catSum_0(recs_0, c_0, g_0) {
    return this._folder_9(((acc_0, rec_0) =>
                           {
                             return ((t1) => {
                                      if (t1 > 281474976710655n) {
                                        throw new __compactRuntime.CompactError('equilux.compact line 565 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                      }
                                      return t1;
                                    })(acc_0
                                       +
                                       this._salaryInCategory_0(rec_0, c_0, g_0));
                           }),
                          0n,
                          recs_0);
  }
  _reportBatch_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_34(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(7n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'no pay report in progress');
    const prev_0 = this._paySeal_0(context, partialProofData);
    __compactRuntime.assert(this._equal_35(this._sealPay_0(prev_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(1n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(8n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'sealed totals do not match the report in progress');
    const recs_0 = this._payrollRecords_0(context, partialProofData);
    const k_0 = this._countBatch_0(context, partialProofData, recs_0, 0n);
    const t_0 = prev_0.totals;
    const c_0 = prev_0.claim;
    const next_0 = { n:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 579 char 8: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.n + k_0),
                     nW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 580 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.nW
                          +
                          this._folder_17(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_7,
                                            rec_7) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 580 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_7
                                                       +
                                                       this._womenCount_0(rec_7));
                                           }),
                                          0n,
                                          recs_0)),
                     nM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 581 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.nM
                          +
                          this._folder_15(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_5,
                                            rec_5) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 581 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_5
                                                       +
                                                       this._menCount_0(rec_5));
                                           }),
                                          0n,
                                          recs_0)),
                     sumW:
                       ((t1) => {
                         if (t1 > 281474976710655n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 582 char 11: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                         }
                         return t1;
                       })(t_0.sumW
                          +
                          this._folder_16(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_6,
                                            rec_6) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 281474976710655n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 582 char 40: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                                      }
                                                      return t1;
                                                    })(acc_6
                                                       +
                                                       this._womenSalary_0(rec_6));
                                           }),
                                          0n,
                                          recs_0)),
                     sumM:
                       ((t1) => {
                         if (t1 > 281474976710655n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 583 char 11: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                         }
                         return t1;
                       })(t_0.sumM
                          +
                          this._folder_13(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_3,
                                            rec_3) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 281474976710655n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 583 char 40: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                                      }
                                                      return t1;
                                                    })(acc_3
                                                       +
                                                       this._menSalary_0(rec_3));
                                           }),
                                          0n,
                                          recs_0)),
                     belowW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 584 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.belowW
                          +
                          this._folder_14(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_4,
                                            rec_4) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 584 char 44: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_4
                                                       +
                                                       this._strictlyBelow_0(rec_4,
                                                                             0n,
                                                                             c_0.medianWomen));
                                           }),
                                          0n,
                                          recs_0)),
                     upToW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 585 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.upToW
                          +
                          this._folder_11(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_1,
                                            rec_1) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 585 char 42: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_1
                                                       +
                                                       this._atOrBelow_0(rec_1,
                                                                         0n,
                                                                         c_0.medianWomen));
                                           }),
                                          0n,
                                          recs_0)),
                     belowM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 586 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.belowM
                          +
                          this._folder_12(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_2,
                                            rec_2) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 586 char 44: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_2
                                                       +
                                                       this._strictlyBelow_0(rec_2,
                                                                             1n,
                                                                             c_0.medianMen));
                                           }),
                                          0n,
                                          recs_0)),
                     upToM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 587 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.upToM
                          +
                          this._folder_10(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_0,
                                            rec_0) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 587 char 42: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_0
                                                       +
                                                       this._atOrBelow_0(rec_0,
                                                                         1n,
                                                                         c_0.medianMen));
                                           }),
                                          0n,
                                          recs_0)),
                     catW:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 588 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catW[0] + this._catCount_0(recs_0, 0n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 588 char 60: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catW[1] + this._catCount_0(recs_0, 1n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 589 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catW[2] + this._catCount_0(recs_0, 2n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 589 char 60: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catW[3] + this._catCount_0(recs_0, 3n, 0n))],
                     catM:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 590 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catM[0] + this._catCount_0(recs_0, 0n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 590 char 60: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catM[1] + this._catCount_0(recs_0, 1n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 591 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catM[2] + this._catCount_0(recs_0, 2n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 591 char 60: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catM[3] + this._catCount_0(recs_0, 3n, 1n))],
                     catSumW:
                       [((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 592 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumW[0] + this._catSum_0(recs_0, 0n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 592 char 64: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumW[1] + this._catSum_0(recs_0, 1n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 593 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumW[2] + this._catSum_0(recs_0, 2n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 593 char 64: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumW[3] + this._catSum_0(recs_0, 3n, 0n))],
                     catSumM:
                       [((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 594 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumM[0] + this._catSum_0(recs_0, 0n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 594 char 64: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumM[1] + this._catSum_0(recs_0, 1n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 595 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumM[2] + this._catSum_0(recs_0, 2n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 595 char 64: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSumM[3] + this._catSum_0(recs_0, 3n, 1n))] };
    let t_1;
    __compactRuntime.assert((t_1 = next_0.n,
                             t_1
                             <=
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(4n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value)),
                            'more records than the declared headcount');
    const tmp_0 = this._sealPay_0({ totals: next_0,
                                    claim: c_0,
                                    salt:
                                      this._freshSalt_0(context,
                                                        partialProofData) });
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(8n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = next_0.n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(9n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _finishReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_36(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(7n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'no pay report in progress');
    const s_0 = this._paySeal_0(context, partialProofData);
    __compactRuntime.assert(this._equal_37(this._sealPay_0(s_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(1n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(8n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'sealed totals do not match the report in progress');
    const t_0 = s_0.totals;
    const claim_0 = s_0.claim;
    __compactRuntime.assert(this._equal_38(t_0.n,
                                           _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(4n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            "reporting set does not match the payroll provider's roster");
    __compactRuntime.assert(t_0.n
                            ===
                            _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(9n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'payroll witness must cover every enrolled employee');
    __compactRuntime.assert(t_0.nW !== 0n, 'no women in reporting set');
    __compactRuntime.assert(t_0.nM !== 0n, 'no men in reporting set');
    const favorsMen_0 = this._verifyGap_0(t_0.sumW,
                                          t_0.nW,
                                          t_0.sumM,
                                          t_0.nM,
                                          claim_0.meanGapBps);
    let t_1;
    __compactRuntime.assert((t_1 = t_0.belowW * 2n, t_1 < t_0.nW),
                            'claimed median is too high');
    let t_2;
    __compactRuntime.assert((t_2 = t_0.upToW * 2n, t_2 >= t_0.nW),
                            'claimed median is too low');
    let t_3;
    __compactRuntime.assert((t_3 = t_0.belowM * 2n, t_3 < t_0.nM),
                            'claimed median is too high');
    let t_4;
    __compactRuntime.assert((t_4 = t_0.upToM * 2n, t_4 >= t_0.nM),
                            'claimed median is too low');
    const medianFavorsMen_0 = this._verifyGap_0(claim_0.medianWomen,
                                                1n,
                                                claim_0.medianMen,
                                                1n,
                                                claim_0.medianGapBps);
    let t_5;
    const report_0 = { round:
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('equilux.compact line 628 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(3n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)),
                       headcountWomen: t_0.nW,
                       headcountMen: t_0.nM,
                       meanGapBps: claim_0.meanGapBps,
                       gapFavorsMen: favorsMen_0,
                       meanGapAtOrAbove5pct:
                         (t_5 = claim_0.meanGapBps, t_5 >= 500n),
                       medianGapBps: claim_0.medianGapBps,
                       medianFavorsMen: medianFavorsMen_0,
                       categories:
                         [this._categoryStats_0(t_0.catW[0],
                                                t_0.catM[0],
                                                t_0.catSumW[0],
                                                t_0.catSumM[0],
                                                claim_0.catMeanWomen[0],
                                                claim_0.catMeanMen[0],
                                                claim_0.catGapBps[0]),
                          this._categoryStats_0(t_0.catW[1],
                                                t_0.catM[1],
                                                t_0.catSumW[1],
                                                t_0.catSumM[1],
                                                claim_0.catMeanWomen[1],
                                                claim_0.catMeanMen[1],
                                                claim_0.catGapBps[1]),
                          this._categoryStats_0(t_0.catW[2],
                                                t_0.catM[2],
                                                t_0.catSumW[2],
                                                t_0.catSumM[2],
                                                claim_0.catMeanWomen[2],
                                                claim_0.catMeanMen[2],
                                                claim_0.catGapBps[2]),
                          this._categoryStats_0(t_0.catW[3],
                                                t_0.catM[3],
                                                t_0.catSumW[3],
                                                t_0.catSumM[3],
                                                claim_0.catMeanWomen[3],
                                                claim_0.catMeanMen[3],
                                                claim_0.catGapBps[3])] };
    const tmp_0 = this._some_0(report_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(13n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_28.toValue(tmp_0),
                                                                                              alignment: _descriptor_28.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(7n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return report_0;
  }
  _beginVariableReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_39(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(8n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'payroll not yet confirmed by the works council');
    const claim_0 = this._variableClaim_0(context, partialProofData);
    let t_0, t_1;
    __compactRuntime.assert((t_1 = claim_0.cuts[0], t_1 <= claim_0.cuts[1])
                            &&
                            (t_0 = claim_0.cuts[1], t_0 <= claim_0.cuts[2]),
                            'quartile cut points are out of order');
    const tmp_0 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('equilux.compact line 655 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_35.toValue(1n),
                                                                                                           alignment: _descriptor_35.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_35.toValue(5n),
                                                                                                           alignment: _descriptor_35.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value)
                     +
                     1n);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(5n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const zero_0 = { n: 0n,
                     nW: 0n,
                     nM: 0n,
                     rW: 0n,
                     rM: 0n,
                     sW: 0n,
                     sM: 0n,
                     belowW: 0n,
                     upToW: 0n,
                     belowM: 0n,
                     upToM: 0n,
                     catRW: [0n, 0n, 0n, 0n],
                     catRM: [0n, 0n, 0n, 0n],
                     catSW: [0n, 0n, 0n, 0n],
                     catSM: [0n, 0n, 0n, 0n],
                     bandW: [0n, 0n, 0n, 0n],
                     bandM: [0n, 0n, 0n, 0n],
                     below: [0n, 0n, 0n] };
    const tmp_1 = this._sealVar_0({ totals: zero_0,
                                    claim: claim_0,
                                    salt:
                                      this._freshSalt_0(context,
                                                        partialProofData) });
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(11n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(10n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(12n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_2),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _recvCount_0(recs_0, c_0, g_0) {
    return this._folder_18(((acc_0, rec_0) =>
                            {
                              return ((t1) => {
                                       if (t1 > 65535n) {
                                         throw new __compactRuntime.CompactError('equilux.compact line 667 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                       }
                                       return t1;
                                     })(acc_0
                                        +
                                        this._receivesIn_0(rec_0, c_0, g_0));
                            }),
                           0n,
                           recs_0);
  }
  _recvSum_0(recs_0, c_0, g_0) {
    return this._folder_19(((acc_0, rec_0) =>
                            {
                              return ((t1) => {
                                       if (t1 > 281474976710655n) {
                                         throw new __compactRuntime.CompactError('equilux.compact line 670 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                       }
                                       return t1;
                                     })(acc_0
                                        +
                                        this._variableIn_0(rec_0, c_0, g_0));
                            }),
                           0n,
                           recs_0);
  }
  _bandCount_0(recs_0, b_0, g_0) {
    return this._folder_20(((acc_0, rec_0) =>
                            {
                              return ((t1) => {
                                       if (t1 > 65535n) {
                                         throw new __compactRuntime.CompactError('equilux.compact line 673 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                       }
                                       return t1;
                                     })(acc_0 + this._inBand_0(rec_0, b_0, g_0));
                            }),
                           0n,
                           recs_0);
  }
  _belowCount_0(recs_0, b_0) {
    return this._folder_21(((acc_0, rec_0) =>
                            {
                              return ((t1) => {
                                       if (t1 > 65535n) {
                                         throw new __compactRuntime.CompactError('equilux.compact line 676 char 29: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                       }
                                       return t1;
                                     })(acc_0 + this._belowBand_0(rec_0, b_0));
                            }),
                           0n,
                           recs_0);
  }
  _variableBatch_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_40(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(10n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'no variable-pay report in progress');
    const prev_0 = this._variableSeal_0(context, partialProofData);
    __compactRuntime.assert(this._equal_41(this._sealVar_0(prev_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(1n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(11n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'sealed totals do not match the report in progress');
    const recs_0 = this._payrollRecords_0(context, partialProofData);
    const k_0 = this._countBatch_0(context, partialProofData, recs_0, 1n);
    const t_0 = prev_0.totals;
    const c_0 = prev_0.claim;
    this._folder_22(context,
                    partialProofData,
                    ((context, partialProofData, t_1, i_0) =>
                     {
                       if (recs_0[i_0].active) {
                         const total_0 = recs_0[i_0].salary
                                         +
                                         recs_0[i_0].variable;
                         __compactRuntime.assert(total_0
                                                 >=
                                                 this._bandFloor_0(recs_0[i_0].band,
                                                                   c_0.cuts)
                                                 &&
                                                 this._bandCeilingOk_0(recs_0[i_0].band,
                                                                       ((t1) => {
                                                                         if (t1 > 8589934591n) {
                                                                           throw new __compactRuntime.CompactError('equilux.compact line 694 char 86: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 8589934591');
                                                                         }
                                                                         return t1;
                                                                       })(total_0),
                                                                       c_0.cuts),
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
    const next_0 = { n:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 700 char 8: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.n + k_0),
                     nW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 701 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.nW
                          +
                          this._folder_32(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_9,
                                            rec_9) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 701 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_9
                                                       +
                                                       this._womenCount_0(rec_9));
                                           }),
                                          0n,
                                          recs_0)),
                     nM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 702 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.nM
                          +
                          this._folder_30(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_7,
                                            rec_7) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 702 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_7
                                                       +
                                                       this._menCount_0(rec_7));
                                           }),
                                          0n,
                                          recs_0)),
                     rW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 703 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.rW
                          +
                          this._folder_31(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_8,
                                            rec_8) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 703 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_8
                                                       +
                                                       this._receives_0(rec_8,
                                                                        0n));
                                           }),
                                          0n,
                                          recs_0)),
                     rM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 704 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.rM
                          +
                          this._folder_28(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_5,
                                            rec_5) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 704 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_5
                                                       +
                                                       this._receives_0(rec_5,
                                                                        1n));
                                           }),
                                          0n,
                                          recs_0)),
                     sW:
                       ((t1) => {
                         if (t1 > 281474976710655n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 705 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                         }
                         return t1;
                       })(t_0.sW
                          +
                          this._folder_29(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_6,
                                            rec_6) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 281474976710655n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 705 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                                      }
                                                      return t1;
                                                    })(acc_6
                                                       +
                                                       this._variableOf_0(rec_6,
                                                                          0n));
                                           }),
                                          0n,
                                          recs_0)),
                     sM:
                       ((t1) => {
                         if (t1 > 281474976710655n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 706 char 9: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                         }
                         return t1;
                       })(t_0.sM
                          +
                          this._folder_26(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_3,
                                            rec_3) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 281474976710655n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 706 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                                                      }
                                                      return t1;
                                                    })(acc_3
                                                       +
                                                       this._variableOf_0(rec_3,
                                                                          1n));
                                           }),
                                          0n,
                                          recs_0)),
                     belowW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 707 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.belowW
                          +
                          this._folder_27(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_4,
                                            rec_4) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 707 char 44: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_4
                                                       +
                                                       this._variableBelow_0(rec_4,
                                                                             0n,
                                                                             c_0.medianWomen));
                                           }),
                                          0n,
                                          recs_0)),
                     upToW:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 708 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.upToW
                          +
                          this._folder_24(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_1,
                                            rec_1) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 708 char 42: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_1
                                                       +
                                                       this._variableAtOrBelow_0(rec_1,
                                                                                 0n,
                                                                                 c_0.medianWomen));
                                           }),
                                          0n,
                                          recs_0)),
                     belowM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 709 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.belowM
                          +
                          this._folder_25(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_2,
                                            rec_2) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 709 char 44: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_2
                                                       +
                                                       this._variableBelow_0(rec_2,
                                                                             1n,
                                                                             c_0.medianMen));
                                           }),
                                          0n,
                                          recs_0)),
                     upToM:
                       ((t1) => {
                         if (t1 > 65535n) {
                           throw new __compactRuntime.CompactError('equilux.compact line 710 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                         }
                         return t1;
                       })(t_0.upToM
                          +
                          this._folder_23(context,
                                          partialProofData,
                                          ((context,
                                            partialProofData,
                                            acc_0,
                                            rec_0) =>
                                           {
                                             return ((t1) => {
                                                      if (t1 > 65535n) {
                                                        throw new __compactRuntime.CompactError('equilux.compact line 710 char 42: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                      }
                                                      return t1;
                                                    })(acc_0
                                                       +
                                                       this._variableAtOrBelow_0(rec_0,
                                                                                 1n,
                                                                                 c_0.medianMen));
                                           }),
                                          0n,
                                          recs_0)),
                     catRW:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 711 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRW[0] + this._recvCount_0(recs_0, 0n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 711 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRW[1] + this._recvCount_0(recs_0, 1n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 712 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRW[2] + this._recvCount_0(recs_0, 2n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 712 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRW[3] + this._recvCount_0(recs_0, 3n, 0n))],
                     catRM:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 713 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRM[0] + this._recvCount_0(recs_0, 0n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 713 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRM[1] + this._recvCount_0(recs_0, 1n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 714 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRM[2] + this._recvCount_0(recs_0, 2n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 714 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.catRM[3] + this._recvCount_0(recs_0, 3n, 1n))],
                     catSW:
                       [((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 715 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSW[0] + this._recvSum_0(recs_0, 0n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 715 char 61: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSW[1] + this._recvSum_0(recs_0, 1n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 716 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSW[2] + this._recvSum_0(recs_0, 2n, 0n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 716 char 61: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSW[3] + this._recvSum_0(recs_0, 3n, 0n))],
                     catSM:
                       [((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 717 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSM[0] + this._recvSum_0(recs_0, 0n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 717 char 61: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSM[1] + this._recvSum_0(recs_0, 1n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 718 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSM[2] + this._recvSum_0(recs_0, 2n, 1n)),
                        ((t1) => {
                          if (t1 > 281474976710655n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 718 char 61: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 281474976710655');
                          }
                          return t1;
                        })(t_0.catSM[3] + this._recvSum_0(recs_0, 3n, 1n))],
                     bandW:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 719 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandW[0] + this._bandCount_0(recs_0, 0n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 719 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandW[1] + this._bandCount_0(recs_0, 1n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 720 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandW[2] + this._bandCount_0(recs_0, 2n, 0n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 720 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandW[3] + this._bandCount_0(recs_0, 3n, 0n))],
                     bandM:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 721 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandM[0] + this._bandCount_0(recs_0, 0n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 721 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandM[1] + this._bandCount_0(recs_0, 1n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 722 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandM[2] + this._bandCount_0(recs_0, 2n, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 722 char 63: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.bandM[3] + this._bandCount_0(recs_0, 3n, 1n))],
                     below:
                       [((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 723 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.below[0] + this._belowCount_0(recs_0, 1n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 723 char 61: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.below[1] + this._belowCount_0(recs_0, 2n)),
                        ((t1) => {
                          if (t1 > 65535n) {
                            throw new __compactRuntime.CompactError('equilux.compact line 724 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                          }
                          return t1;
                        })(t_0.below[2] + this._belowCount_0(recs_0, 3n))] };
    let t_2;
    __compactRuntime.assert((t_2 = next_0.n,
                             t_2
                             <=
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_35.toValue(4n),
                                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value)),
                            'more records than the declared headcount');
    const tmp_0 = this._sealVar_0({ totals: next_0,
                                    claim: c_0,
                                    salt:
                                      this._freshSalt_0(context,
                                                        partialProofData) });
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(11n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = next_0.n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(12n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _variableGaps_0(t_0, claim_0) {
    let t_1, t_2;
    if ((t_2 = t_0.rW, t_2 > 0n) && (t_1 = t_0.rM, t_1 > 0n)) {
      const meanFavorsMen_0 = this._verifyGap_0(t_0.sW,
                                                t_0.rW,
                                                t_0.sM,
                                                t_0.rM,
                                                claim_0.meanGapBps);
      let t_3;
      __compactRuntime.assert((t_3 = t_0.belowW * 2n, t_3 < t_0.rW),
                              'claimed variable-pay median is too high');
      let t_4;
      __compactRuntime.assert((t_4 = t_0.upToW * 2n, t_4 >= t_0.rW),
                              'claimed variable-pay median is too low');
      let t_5;
      __compactRuntime.assert((t_5 = t_0.belowM * 2n, t_5 < t_0.rM),
                              'claimed variable-pay median is too high');
      let t_6;
      __compactRuntime.assert((t_6 = t_0.upToM * 2n, t_6 >= t_0.rM),
                              'claimed variable-pay median is too low');
      const medianFavorsMen_0 = this._verifyGap_0(claim_0.medianWomen,
                                                  1n,
                                                  claim_0.medianMen,
                                                  1n,
                                                  claim_0.medianGapBps);
      return [meanFavorsMen_0, medianFavorsMen_0];
    } else {
      __compactRuntime.assert(this._equal_42(claim_0.meanGapBps, 0n)
                              &&
                              this._equal_43(claim_0.medianGapBps, 0n),
                              'no variable-pay gap exists without recipients of both genders');
      return [false, false];
    }
  }
  _quarterOk_0(c_0, b_0, n_0) {
    let t_0, t_1;
    __compactRuntime.assert((t_1 = 4n * c_0, t_1 <= b_0 * n_0)
                            &&
                            (t_0 = b_0 * n_0, t_0 < 4n * c_0 + 4n),
                            'quartile bands do not split the workforce into quarters');
    return [];
  }
  _finishVariableReport_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_44(this._publicKey_0(this._employerSecret_0(context,
                                                                                    partialProofData)),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
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
                                                                                                         value: { value: _descriptor_35.toValue(1n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(10n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'no variable-pay report in progress');
    const s_0 = this._variableSeal_0(context, partialProofData);
    __compactRuntime.assert(this._equal_45(this._sealVar_0(s_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(1n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(11n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'sealed totals do not match the report in progress');
    const t_0 = s_0.totals;
    const claim_0 = s_0.claim;
    __compactRuntime.assert(this._equal_46(t_0.n,
                                           _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(0n),
                                                                                                                                 alignment: _descriptor_35.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_35.toValue(4n),
                                                                                                                                 alignment: _descriptor_35.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            "reporting set does not match the payroll provider's roster");
    __compactRuntime.assert(t_0.n
                            ===
                            _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(9n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'payroll witness must cover every enrolled employee');
    let t_1, t_2;
    const defined_0 = (t_2 = t_0.rW, t_2 > 0n) && (t_1 = t_0.rM, t_1 > 0n);
    const __compact_pattern_tmp1_0 = this._variableGaps_0(t_0, claim_0);
    const meanFavorsMen_0 = __compact_pattern_tmp1_0[0];
    const medianFavorsMen_0 = __compact_pattern_tmp1_0[1];
    this._quarterOk_0(t_0.below[0], 1n, t_0.n);
    this._quarterOk_0(t_0.below[1], 2n, t_0.n);
    this._quarterOk_0(t_0.below[2], 3n, t_0.n);
    const report_0 = { round:
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('equilux.compact line 777 char 12: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(0n),
                                                                                                                  alignment: _descriptor_35.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_35.toValue(3n),
                                                                                                                  alignment: _descriptor_35.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)),
                       headcountWomen: t_0.nW,
                       headcountMen: t_0.nM,
                       recipientsWomen: t_0.rW,
                       recipientsMen: t_0.rM,
                       gapDefined: defined_0,
                       meanGapBps: claim_0.meanGapBps,
                       meanFavorsMen: meanFavorsMen_0,
                       medianGapBps: claim_0.medianGapBps,
                       medianFavorsMen: medianFavorsMen_0,
                       quartiles:
                         [{ women: t_0.bandW[0], men: t_0.bandM[0] },
                          { women: t_0.bandW[1], men: t_0.bandM[1] },
                          { women: t_0.bandW[2], men: t_0.bandM[2] },
                          { women: t_0.bandW[3], men: t_0.bandM[3] }],
                       categories:
                         [this._variableCategoryStats_0(t_0.catRW[0],
                                                        t_0.catRM[0],
                                                        t_0.catSW[0],
                                                        t_0.catSM[0],
                                                        claim_0.catGapBps[0]),
                          this._variableCategoryStats_0(t_0.catRW[1],
                                                        t_0.catRM[1],
                                                        t_0.catSW[1],
                                                        t_0.catSM[1],
                                                        claim_0.catGapBps[1]),
                          this._variableCategoryStats_0(t_0.catRW[2],
                                                        t_0.catRM[2],
                                                        t_0.catSW[2],
                                                        t_0.catSM[2],
                                                        claim_0.catGapBps[2]),
                          this._variableCategoryStats_0(t_0.catRW[3],
                                                        t_0.catRM[3],
                                                        t_0.catSW[3],
                                                        t_0.catSM[3],
                                                        claim_0.catGapBps[3])] };
    const tmp_0 = this._some_1(report_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(14n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_0),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_35.toValue(1n),
                                                                  alignment: _descriptor_35.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_35.toValue(10n),
                                                                                              alignment: _descriptor_35.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return report_0;
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 10; i++) { x = f(x, a0[i]); }
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
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
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
  _equal_24(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_25(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_26(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_27(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_28(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_29(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_30(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_31(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_4(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_32(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
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
  _equal_33(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_8(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_9(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_34(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_35(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_10(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_11(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_12(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_13(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_14(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_15(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_16(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_17(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_36(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_37(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_38(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_39(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_18(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_19(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_20(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _folder_21(f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_40(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_41(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_22(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
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
  _equal_42(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_43(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_44(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_45(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_46(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
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
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(2n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get round() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(3n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get declaredHeadcount() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(4n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get committedRows() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(5n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
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
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(6n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get openedRows() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(7n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(8n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get enrolled() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(0n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(9n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(10n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(1024n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
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
                                     'equilux.compact line 213 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(10n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'root',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_30.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_30.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[10];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[10];
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
                                     'equilux.compact line 213 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'equilux.compact line 213 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[0].asArray()[10];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'equilux.compact line 213 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[0].asArray()[10];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 214 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(0n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[0];
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 215 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    councilOpened: {
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(2n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(2n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 216 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(2n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[2];
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(3n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(3n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 217 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(3n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[3];
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(4n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(4n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 218 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(4n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get reportSeq() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(5n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    counted: {
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(6n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(6n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
                                     'equilux.compact line 220 char 1',
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
                                                                                            value: { value: _descriptor_35.toValue(1n),
                                                                                                     alignment: _descriptor_35.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_35.toValue(6n),
                                                                                                     alignment: _descriptor_35.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get payOpen() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(7n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get paySealed() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(8n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get payProcessed() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(9n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get varOpen() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(10n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get varSealed() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(11n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get varProcessed() {
      return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(1n),
                                                                                                   alignment: _descriptor_35.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_35.toValue(12n),
                                                                                                   alignment: _descriptor_35.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get latestReport() {
      return _descriptor_28.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_35.toValue(1n),
                                                                                                    alignment: _descriptor_35.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_35.toValue(13n),
                                                                                                    alignment: _descriptor_35.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    get latestVariableReport() {
      return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_35.toValue(1n),
                                                                                                    alignment: _descriptor_35.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_35.toValue(14n),
                                                                                                    alignment: _descriptor_35.alignment() } }] } },
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
  variableClaim: (...args) => undefined,
  paySeal: (...args) => undefined,
  variableSeal: (...args) => undefined,
  freshSalt: (...args) => undefined
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
                                 'equilux.compact line 267 char 1',
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
                                 'equilux.compact line 282 char 1',
                                 'Uint<0..4294967296>',
                                 salary_0)
    }
    if (!(typeof(variable_0) === 'bigint' && variable_0 >= 0n && variable_0 <= 4294967295n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 2',
                                 'equilux.compact line 282 char 1',
                                 'Uint<0..4294967296>',
                                 variable_0)
    }
    if (!(typeof(gender_0) === 'bigint' && gender_0 >= 0n && gender_0 <= 1n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 3',
                                 'equilux.compact line 282 char 1',
                                 'Uint<0..2>',
                                 gender_0)
    }
    if (!(typeof(category_0) === 'bigint' && category_0 >= 0n && category_0 <= 3n)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 4',
                                 'equilux.compact line 282 char 1',
                                 'Uint<0..4>',
                                 category_0)
    }
    if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
      __compactRuntime.typeError('payrollRow',
                                 'argument 5',
                                 'equilux.compact line 282 char 1',
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
