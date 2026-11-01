/**
 * The employee's own check, with no wallet and no fee: from what is on their payslip (their pay record and
 * the payroll-row nonce) and their own secret, recompute the hashes the contract stored and look each one up
 * in the contract's public state. Every hash is computed by the compiled contract's own code.
 *
 * Nothing leaves the page: the record and the secret stay here; the page only downloads public state.
 */
import { convertFieldToBytes } from "@midnight-ntwrk/compact-runtime";
import { Contract, ledger, pureCircuits } from "../../../contract/build/contract/index.js";
import { bytes32, witnesses } from "../../../contract/deploy/witnesses";
import { fetchContractData, type ChainNetwork } from "./chain-read";

export interface PayslipRecord { salary: number; variable: number; gender: 0 | 1; category: number; level: number }

export interface EmployeeCheck {
  round: number;
  rowCommitted: boolean;   // the payroll provider committed this exact row
  councilOpened: boolean;  // the works council opened it against the payroll
  enrolled: boolean | null; // the employee enrolled this record (null: no secret given)
  counted: { pay: number | null; variable: number | null; levels: number | null } | null; // report number it was counted in
  reportsBegun: number;
  category: { disclosed: boolean; women: number; men: number; meanWomen: number; meanMen: number; gapBps: number; favorsMen: boolean; flagged: boolean } | null;
  level: { disclosed: boolean; women: number; men: number; gapBps: number; favorsMen: boolean } | null;
}

/** A secret or nonce as typed: 64 hex characters as bytes, anything else through the app's bytes32. */
export const toBytes32 = (s: string): Uint8Array => {
  const t = s.trim();
  return /^(0x)?[0-9a-fA-F]{64}$/.test(t)
    ? new Uint8Array(t.replace(/^0x/, "").match(/../g)!.map((x) => parseInt(x, 16)))
    : bytes32(t);
};

const pad32 = (s: string) => { const b = new Uint8Array(32); b.set(new TextEncoder().encode(s)); return b; };
const COUNT_DOMAIN = pad32("equilux:cnt:v4:");
const KINDS = { pay: 0n, variable: 1n, levels: 2n } as const;

export async function checkEmployee(network: ChainNetwork, address: string, rec: PayslipRecord, nonce: Uint8Array, secret?: Uint8Array): Promise<EmployeeCheck> {
  const { data } = await fetchContractData(network, address);
  let l: ReturnType<typeof ledger>;
  try { l = ledger(data); } catch { throw new Error("This contract is not a Wave 3 (v4) Equilux contract; the employee check reads v4 contracts."); }

  const [salary, variable, gender, category, level] = [rec.salary, rec.variable, rec.gender, rec.category, rec.level].map((x) => BigInt(x));
  const row = pureCircuits.payrollRow(salary, variable, gender, category, level, nonce);
  const round = BigInt(l.round);
  const reportsBegun = Number(l.reportSeq);

  let enrolled: boolean | null = null;
  let counted: EmployeeCheck["counted"] = null;
  if (secret) {
    // the internal helpers of the compiled contract: the same code the circuits run
    const c = new Contract(witnesses as never) as any;
    const cm: Uint8Array = c._recordCommitment_0(salary, variable, gender, category, level, secret, round);
    enrolled = l.bound.member(cm);
    const find = (kind: bigint) => {
      for (let seq = reportsBegun; seq >= 1; seq--) {
        const tag = c._persistentHash_5([COUNT_DOMAIN, convertFieldToBytes(32, BigInt(seq), "check"), convertFieldToBytes(32, kind, "check"), cm]);
        if (l.counted.member(tag)) return seq;
      }
      return null;
    };
    counted = { pay: find(KINDS.pay), variable: find(KINDS.variable), levels: find(KINDS.levels) };
  }

  const rep = l.latestReport.is_some ? l.latestReport.value : null;
  const cat = rep ? rep.categories[rec.category] : null;
  const lrep = l.latestLevelReport.is_some ? l.latestLevelReport.value : null;
  const lv = lrep ? lrep.levels[rec.level] : null;
  return {
    round: Number(round),
    rowCommitted: l.payrollRows.member(row),
    councilOpened: l.councilOpened.member(row),
    enrolled,
    counted,
    reportsBegun,
    category: cat ? {
      disclosed: cat.disclosed, women: Number(cat.headcountWomen), men: Number(cat.headcountMen),
      meanWomen: Number(cat.meanWomen), meanMen: Number(cat.meanMen), gapBps: Number(cat.meanGapBps), favorsMen: cat.gapFavorsMen, flagged: cat.gapAtOrAbove5pct,
    } : null,
    level: lv ? { disclosed: lv.disclosed, women: Number(lv.women), men: Number(lv.men), gapBps: Number(lv.gapBps), favorsMen: lv.gapFavorsMen } : null,
  };
}

/** One of the 32 people of the Wave 3 preprod run (contract/preprod/run-v4.ts), for trying the page. */
export const PREPROD_SAMPLE_CONTRACT = "7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f";
