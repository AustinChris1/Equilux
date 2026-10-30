/**
 * The REAL compiled Equilux contract, executed in the browser.
 *
 * `contract/build/contract/index.js` is the module the Compact compiler emits;
 * it runs on Midnight's own WebAssembly runtime (@midnight-ntwrk/compact-runtime
 * → onchain-runtime-v3). Every circuit call here is the same code, the same
 * persistentHash, the same Merkle tree and the same assertions as on-chain.
 * What is NOT here: zero-knowledge proof generation and a consensus network —
 * those need a proof server and a node (the Live workspace mode).
 *
 * Contract state is not serializable, but circuits are deterministic, so we
 * persist the list of successful actions and replay them on load.
 *
 * Contract v4 is batched: the provider commits rows and the council opens them
 * 16 at a time, and each report is begin, one batch per 16 records, finish, over
 * sealed running totals. One action here runs every batch of its step.
 */
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import { Contract, ledger, pureCircuits, type Witnesses } from "../../../contract/build/contract/index.js";
import {
  addPayBatch, addVarBatch, assignBands, buildClaim, buildVariableClaim, chunk, padOpenings, padRecords, padRows, zeroPayTotals, zeroVarTotals,
  type PayRecord, type PayTotals, type ReportClaim, type RowOpening, type VariableClaim, type VarTotals,
} from "../../../contract/deploy/claims";
import type { LedgerView, Tamper, VariableTamper } from "./api";

interface PS {
  employeeSecret: Uint8Array;
  employeeRecord: [bigint, bigint, bigint, bigint];
  rowNonce: Uint8Array;
  employerSecret: Uint8Array;
  providerSecret: Uint8Array;
  councilSecret: Uint8Array;
  openings: RowOpening[];
  payroll: ReturnType<typeof padRecords>;
  claim: ReportClaim;
  variableClaim: VariableClaim;
  paySeal: { totals: PayTotals; claim: ReportClaim; salt: Uint8Array };
  variableSeal: { totals: VarTotals; claim: VariableClaim; salt: Uint8Array };
  nextSalt: Uint8Array;
}

/** One employee's record. `nonce` (hex) is the payslip nonce blinding their payroll row. */
export interface Row { salary: number; variable: number; gender: 0 | 1; category: number; secret: string; nonce: string }

export type Action =
  | { k: "deploy"; employerSecret: string; providerSecret: string; councilSecret: string }
  | { k: "roster"; rows: string[] } // the provider's payroll-row hashes (hex)
  | { k: "confirm"; rows: Row[] }   // the works council opens every row
  | { k: "enroll"; row: Row }
  | { k: "publish"; rows: Row[] }
  | { k: "publishVariable"; rows: Row[] };

const KEY = "equilux.browser-contract.v5";

export const bytes32 = (seed: string): Uint8Array => {
  const b = new Uint8Array(32);
  const e = new TextEncoder().encode(seed);
  b.set(e.slice(0, 32));
  return b;
};
const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
const fromHex = (h: string) => new Uint8Array(h.match(/../g)!.map((x) => parseInt(x, 16)));

const witnesses: Witnesses<PS> = {
  employeeSecret: ({ privateState }) => [privateState, privateState.employeeSecret],
  employeeRecord: ({ privateState }) => [privateState, privateState.employeeRecord],
  councilSecret: ({ privateState }) => [privateState, privateState.councilSecret],
  payrollOpenings: ({ privateState }) => [privateState, privateState.openings],
  variableClaim: ({ privateState }) => [privateState, privateState.variableClaim],
  payrollRowNonce: ({ privateState }) => [privateState, privateState.rowNonce],
  employerSecret: ({ privateState }) => [privateState, privateState.employerSecret],
  providerSecret: ({ privateState }) => [privateState, privateState.providerSecret],
  payrollRecords: ({ privateState }) => [privateState, privateState.payroll],
  reportClaim: ({ privateState }) => [privateState, privateState.claim],
  paySeal: ({ privateState }) => [privateState, privateState.paySeal],
  variableSeal: ({ privateState }) => [privateState, privateState.variableSeal],
  freshSalt: ({ privateState }) => [privateState, privateState.nextSalt],
};
const salt = () => crypto.getRandomValues(new Uint8Array(32));

const toRecord = (r: Row): PayRecord => ({
  salary: BigInt(r.salary), variable: BigInt(r.variable), gender: BigInt(r.gender), category: BigInt(r.category), sk: bytes32(r.secret),
});
const toOpening = (r: Row) => ({ salary: BigInt(r.salary), variable: BigInt(r.variable), gender: BigInt(r.gender), category: BigInt(r.category), nonce: fromHex(r.nonce) });

/** The payroll provider's hiding hash of one row — computed where the payroll lives. */
export const payrollRowHash = (r: Row): string =>
  toHex(pureCircuits.payrollRow(BigInt(r.salary), BigInt(r.variable), BigInt(r.gender), BigInt(r.category), fromHex(r.nonce)));

export const newNonce = (): string => toHex(crypto.getRandomValues(new Uint8Array(32)));

/** Turns a thrown circuit assertion into its human message. */
export function circuitMessage(e: unknown): string {
  const m = e instanceof Error ? e.message : String(e);
  const i = m.indexOf("failed assert:");
  return i >= 0 ? m.slice(i + "failed assert:".length).trim() : m;
}

function applyTamper(claim: ReportClaim, t?: Tamper): ReportClaim {
  if (!t) return claim;
  const c = { ...claim, catMeanWomen: [...claim.catMeanWomen], catMeanMen: [...claim.catMeanMen], catGapBps: [...claim.catGapBps] };
  if (t.meanGapBps != null) c.meanGapBps = BigInt(t.meanGapBps);
  if (t.medianWomen != null) c.medianWomen = BigInt(t.medianWomen);
  if (t.categoryGap) c.catGapBps[t.categoryGap.category] = BigInt(t.categoryGap.bps);
  return c;
}

function applyVariableTamper(claim: VariableClaim, t?: VariableTamper): VariableClaim {
  if (!t) return claim;
  const c = { ...claim, catGapBps: [...claim.catGapBps] };
  if (t.meanGapBps != null) c.meanGapBps = BigInt(t.meanGapBps);
  if (t.medianWomen != null) c.medianWomen = BigInt(t.medianWomen);
  return c;
}

export class BrowserContract {
  private contract = new Contract<PS, Witnesses<PS>>(witnesses);
  private ctx: CircuitContext<PS> | null = null;
  private base: PS | null = null;
  address: string | null = null;
  actions: Action[] = [];

  static restore(): BrowserContract {
    const bc = new BrowserContract();
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "[]") as Action[];
      for (const a of saved) bc.apply(a, false);
    } catch {
      bc.reset();
    }
    return bc;
  }

  reset() {
    this.ctx = null; this.base = null; this.address = null; this.actions = [];
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  }

  private persist() {
    try { sessionStorage.setItem(KEY, JSON.stringify(this.actions)); } catch { /* ignore */ }
  }

  private set(patch: Partial<PS>) {
    this.ctx = { ...this.ctx!, currentPrivateState: { ...this.base!, ...patch } };
  }

  /** `ctx` with this step's private inputs; contexts are values, so a scratch run never touches the real one. */
  private with(ctx: CircuitContext<PS>, patch: Partial<PS>): CircuitContext<PS> {
    return { ...ctx, currentPrivateState: { ...this.base!, ...patch } };
  }

  private get c() { return this.contract.impureCircuits; }

  /** The provider declares the headcount and commits every row, 16 per transaction. */
  private roster(ctx: CircuitContext<PS>, rows: string[]) {
    let x = this.c.declareRoster(this.with(ctx, {}), BigInt(rows.length)).context;
    for (const b of chunk(rows)) x = this.c.addPayrollRows(this.with(x, {}), padRows(b.map(fromHex)), BigInt(b.length)).context;
    return x;
  }

  /** The works council opens rows, 16 per transaction. */
  private confirm(ctx: CircuitContext<PS>, rows: Row[]) {
    let x = ctx;
    for (const b of chunk(rows)) x = this.c.confirmPayroll(this.with(x, { openings: padOpenings(b.map(toOpening)) })).context;
    return x;
  }

  /** The pay report: begin, one batch per 16 records over sealed totals, finish. */
  private payReport(ctx: CircuitContext<PS>, recs: PayRecord[], claim: ReportClaim) {
    const s0 = salt();
    let x = this.c.beginReport(this.with(ctx, { claim, nextSalt: s0 })).context;
    let seal = { totals: zeroPayTotals(), claim, salt: s0 };
    for (const b of chunk(recs)) {
      const s1 = salt();
      x = this.c.reportBatch(this.with(x, { payroll: padRecords(b), paySeal: seal, nextSalt: s1 })).context;
      seal = { totals: addPayBatch(seal.totals, claim, b), claim, salt: s1 };
    }
    return this.c.finishReport(this.with(x, { paySeal: seal }));
  }

  /** The variable-pay report, the same way; bands ride on the records. */
  private varReport(ctx: CircuitContext<PS>, recs: PayRecord[], claim: VariableClaim, bands: bigint[]) {
    const s0 = salt();
    let x = this.c.beginVariableReport(this.with(ctx, { variableClaim: claim, nextSalt: s0 })).context;
    let seal = { totals: zeroVarTotals(), claim, salt: s0 };
    const bandBatches = chunk(bands);
    chunk(recs).forEach((b, i) => {
      const s1 = salt();
      x = this.c.variableBatch(this.with(x, { payroll: padRecords(b, bandBatches[i]), variableSeal: seal, nextSalt: s1 })).context;
      seal = { totals: addVarBatch(seal.totals, claim, b, bandBatches[i]), claim, salt: s1 };
    });
    return this.c.finishVariableReport(this.with(x, { variableSeal: seal }));
  }

  /** Runs one action through the real circuits; throws the circuit's message on rejection. */
  apply(a: Action, record = true): unknown {
    let result: unknown;
    try {
      result = this.run(a);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    if (record) { this.actions.push(a); this.persist(); }
    else this.actions.push(a);
    return result;
  }

  private run(a: Action): unknown {
    if (a.k === "deploy") {
      if (this.ctx) throw new Error("contract already deployed");
      const eSk = bytes32(a.employerSecret), pSk = bytes32(a.providerSecret), cSk = bytes32(a.councilSecret);
      this.base = {
        employeeSecret: new Uint8Array(32), employeeRecord: [0n, 0n, 0n, 0n], rowNonce: new Uint8Array(32),
        employerSecret: eSk, providerSecret: pSk, councilSecret: cSk, openings: padOpenings([]),
        payroll: padRecords([]), claim: buildClaim([]), variableClaim: buildVariableClaim([]),
        paySeal: { totals: zeroPayTotals(), claim: buildClaim([]), salt: new Uint8Array(32) },
        variableSeal: { totals: zeroVarTotals(), claim: buildVariableClaim([]), salt: new Uint8Array(32) },
        nextSalt: new Uint8Array(32),
      };
      const init = this.contract.initialState(
        createConstructorContext(this.base, "0".repeat(64)),
        pureCircuits.publicKey(eSk),
        pureCircuits.publicKey(pSk),
        pureCircuits.publicKey(cSk),
      );
      this.address = sampleContractAddress();
      this.ctx = createCircuitContext(this.address, init.currentZswapLocalState, init.currentContractState, init.currentPrivateState);
      return this.address;
    }
    if (!this.ctx) throw new Error("No contract deployed yet");
    switch (a.k) {
      case "roster":
        this.ctx = this.roster(this.ctx, a.rows);
        return a.rows.length;
      case "confirm":
        this.ctx = this.confirm(this.ctx, a.rows);
        return a.rows.length;
      case "enroll": {
        const r = toRecord(a.row);
        const res = this.c.enroll(this.with(this.ctx, { employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(a.row.nonce) }));
        this.ctx = res.context;
        return toHex(res.result);
      }
      case "publish": {
        const recs = a.rows.map(toRecord);
        const res = this.payReport(this.ctx, recs, buildClaim(recs));
        this.ctx = res.context;
        return res.result;
      }
      case "publishVariable": {
        const recs = a.rows.map(toRecord);
        const res = this.varReport(this.ctx, recs, buildVariableClaim(recs), assignBands(recs));
        this.ctx = res.context;
        return res.result;
      }
    }
  }

  /** A cheating pay report: the real circuits on a scratch context, never recorded. */
  tryCheat(rows: Row[], tamper?: Tamper): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const recs = rows.map(toRecord);
    try {
      this.payReport(this.ctx, recs, applyTamper(buildClaim(recs), tamper));
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this report: it was not actually a cheat");
  }

  /** A cheating variable-pay report: the real circuits, a tampered claim or bands, never recorded. */
  tryCheatVariable(rows: Row[], tamper?: VariableTamper): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const recs = rows.map(toRecord);
    const bands = assignBands(recs);
    if (tamper?.swapBands) {
      const top = bands.indexOf(3n), bottom = bands.indexOf(0n);
      [bands[top], bands[bottom]] = [bands[bottom], bands[top]];
    }
    try {
      this.varReport(this.ctx, recs, applyVariableTamper(buildVariableClaim(recs), tamper), bands);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this report: it was not actually a cheat");
  }

  /**
   * A council that leaves rows unopened. In v4 opening is batched, so skipping a row is not an error by
   * itself: the payroll simply never counts as confirmed. The cheat opens the rows given, then shows the
   * real enroll circuit refusing the first of them. Scratch context, never recorded.
   */
  tryConfirm(rows: Row[]): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    try {
      const x = this.confirm(this.ctx, rows);
      const r = toRecord(rows[0]);
      this.c.enroll(this.with(x, { employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(rows[0].nonce) }));
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this confirmation: it was not actually a cheat");
  }

  /** A cheating enrollment: runs the real enroll circuit, never recorded. */
  tryEnroll(row: Row): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const r = toRecord(row);
    try {
      this.c.enroll(this.with(this.ctx, { employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(row.nonce) }));
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this enrollment: it was not actually a cheat");
  }

  /** Real checkReceipt circuit over the Merkle path from the current tree. */
  receipt(commitment: string): boolean {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const l = ledger(this.ctx.currentQueryContext.state);
    const path = l.commitments.findPathForLeaf(fromHex(commitment));
    if (!path) throw new Error("commitment is not in the on-chain tree");
    this.set({});
    const res = this.contract.impureCircuits.checkReceipt(this.ctx, path);
    this.ctx = res.context;
    return res.result;
  }

  view(): LedgerView | null {
    if (!this.ctx || !this.address) return null;
    return ledgerView(ledger(this.ctx.currentQueryContext.state), this.address);
  }
}

/** Public contract state → the view the workspace and the verify page render. */
export function ledgerView(l: ReturnType<typeof ledger>, contractAddress: string): LedgerView {
  const n = (x: bigint) => Number(x);
  const rep = l.latestReport;
  return {
    contractAddress,
    rosterDeclared: l.rosterDeclared,
    payrollConfirmed: l.payrollConfirmed,
    declaredHeadcount: n(l.declaredHeadcount),
    enrolled: n(l.enrolled),
    nullifiers: n(l.nullifiers.size()),
    payrollRows: n(l.payrollRows.size()),
    bound: n(l.bound.size()),
    round: n(l.round),
    employerPk: toHex(l.employerPk),
    providerPk: toHex(l.providerPk),
    councilPk: toHex(l.councilPk),
    latestVariableReport: l.latestVariableReport.is_some
      ? (() => {
          const v = l.latestVariableReport.value;
          return {
            round: n(v.round), headcountWomen: n(v.headcountWomen), headcountMen: n(v.headcountMen),
            recipientsWomen: n(v.recipientsWomen), recipientsMen: n(v.recipientsMen), gapDefined: v.gapDefined,
            meanGapBps: n(v.meanGapBps), meanFavorsMen: v.meanFavorsMen, medianGapBps: n(v.medianGapBps), medianFavorsMen: v.medianFavorsMen,
            quartiles: v.quartiles.map((q) => ({ women: n(q.women), men: n(q.men) })),
            categories: v.categories.map((c) => ({
              recipientsWomen: n(c.recipientsWomen), recipientsMen: n(c.recipientsMen), disclosed: c.disclosed,
              meanGapBps: n(c.meanGapBps), gapFavorsMen: c.gapFavorsMen,
            })),
          };
        })()
      : null,
    latestReport: rep.is_some
      ? {
          round: n(rep.value.round),
          headcountWomen: n(rep.value.headcountWomen),
          headcountMen: n(rep.value.headcountMen),
          meanGapBps: n(rep.value.meanGapBps),
          gapFavorsMen: rep.value.gapFavorsMen,
          meanGapAtOrAbove5pct: rep.value.meanGapAtOrAbove5pct,
          medianGapBps: n(rep.value.medianGapBps),
          medianFavorsMen: rep.value.medianFavorsMen,
          categories: rep.value.categories.map((c) => ({
            headcountWomen: n(c.headcountWomen), headcountMen: n(c.headcountMen), disclosed: c.disclosed,
            meanWomen: n(c.meanWomen), meanMen: n(c.meanMen), meanGapBps: n(c.meanGapBps),
            gapFavorsMen: c.gapFavorsMen, gapAtOrAbove5pct: c.gapAtOrAbove5pct,
          })),
        }
      : null,
  };
}
