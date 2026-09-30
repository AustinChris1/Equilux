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
 */
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
  type CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import { Contract, ledger, pureCircuits, type Witnesses } from "../../../contract/build/contract/index.js";
import { assignBands, buildClaim, buildVariableClaim, padOpenings, padRecords, padRows, type PayRecord, type ReportClaim, type RowOpening, type VariableClaim } from "../../../contract/deploy/claims";
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

const KEY = "equilux.browser-contract.v4";

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
};

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
    if (!this.ctx) throw new Error("No contract deployed yet — deploy from the Employer tab");
    const c = this.contract.impureCircuits;
    switch (a.k) {
      case "roster": {
        this.set({});
        this.ctx = c.declareRoster(this.ctx, padRows(a.rows.map(fromHex)), BigInt(a.rows.length)).context;
        return a.rows.length;
      }
      case "confirm": {
        this.set({ openings: padOpenings(a.rows.map(toOpening)) });
        this.ctx = c.confirmPayroll(this.ctx).context;
        return a.rows.length;
      }
      case "enroll": {
        const r = toRecord(a.row);
        this.set({ employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(a.row.nonce) });
        const res = c.enroll(this.ctx);
        this.ctx = res.context;
        return toHex(res.result);
      }
      case "publish": {
        const recs = a.rows.map(toRecord);
        this.set({ payroll: padRecords(recs), claim: buildClaim(recs) });
        const res = c.publishReport(this.ctx);
        this.ctx = res.context;
        return res.result;
      }
      case "publishVariable": {
        const recs = a.rows.map(toRecord);
        this.set({ payroll: padRecords(recs, assignBands(recs)), variableClaim: buildVariableClaim(recs) });
        const res = c.publishVariablePay(this.ctx);
        this.ctx = res.context;
        return res.result;
      }
    }
  }

  /** A cheating publish: runs the circuit with a tampered witness or claim, never recorded. */
  tryCheat(rows: Row[], tamper?: Tamper): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const recs = rows.map(toRecord);
    this.set({ payroll: padRecords(recs), claim: applyTamper(buildClaim(recs), tamper) });
    try {
      this.contract.impureCircuits.publishReport(this.ctx);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this report — it was not actually a cheat");
  }

  /** A cheating variable-pay publish: the real circuit, a tampered claim or bands, never recorded. */
  tryCheatVariable(rows: Row[], tamper?: VariableTamper): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const recs = rows.map(toRecord);
    const bands = assignBands(recs);
    if (tamper?.swapBands) {
      const top = bands.indexOf(3n), bottom = bands.indexOf(0n);
      [bands[top], bands[bottom]] = [bands[bottom], bands[top]];
    }
    this.set({ payroll: padRecords(recs, bands), variableClaim: applyVariableTamper(buildVariableClaim(recs), tamper) });
    try {
      this.contract.impureCircuits.publishVariablePay(this.ctx);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this report — it was not actually a cheat");
  }

  /** A cheating council confirmation (e.g. a row left unopened): the real circuit, never recorded. */
  tryConfirm(rows: Row[]): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    this.set({ openings: padOpenings(rows.map(toOpening)) });
    try {
      this.contract.impureCircuits.confirmPayroll(this.ctx);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this confirmation — it was not actually a cheat");
  }

  /** A cheating enrollment: runs the real enroll circuit, never recorded. */
  tryEnroll(row: Row): never {
    if (!this.ctx) throw new Error("No contract deployed yet");
    const r = toRecord(row);
    this.set({ employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(row.nonce) });
    try {
      this.contract.impureCircuits.enroll(this.ctx);
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
    throw new Error("the circuit accepted this enrollment — it was not actually a cheat");
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
    const l = ledger(this.ctx.currentQueryContext.state);
    const n = (x: bigint) => Number(x);
    const rep = l.latestReport;
    return {
      contractAddress: this.address,
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
}
