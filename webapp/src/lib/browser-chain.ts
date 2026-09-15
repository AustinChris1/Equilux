/**
 * In-browser ledger that applies the same assertions as the Compact circuits.
 * Used on the hosted site (Vercel) where Docker / a Midnight node is unreachable.
 * Session-scoped so a refresh keeps the "deployed" contract.
 */
import {
  enrollmentNullifier,
  publishReport,
  recordCommitment,
  sha256Hex,
  trueGapBps,
  type Employee,
  type Enrollment,
  type PayReport,
} from "./protocol";
import type { LedgerView, PayReportOnChain } from "./api";

export interface BrowserRecord {
  id: string;
  name: string;
  salary: number;
  gender: 0 | 1;
  secret: string;
  commitment: string;
  nullifier: string;
}

export interface BrowserChain {
  contractAddress: string | null;
  employerPk: string;
  employerSecret: string;
  round: number;
  enrolled: BrowserRecord[];
  attested: string[];
  latestReport: PayReportOnChain | null;
}

const KEY = "equilux.browser-chain.v1";

export function emptyChain(): BrowserChain {
  return {
    contractAddress: null,
    employerPk: "",
    employerSecret: "",
    round: 1,
    enrolled: [],
    attested: [],
    latestReport: null,
  };
}

export function loadChain(): BrowserChain {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as BrowserChain;
  } catch {
    /* ignore */
  }
  return emptyChain();
}

export function saveChain(chain: BrowserChain) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(chain));
  } catch {
    /* ignore quota */
  }
}

export function toLedgerView(chain: BrowserChain): LedgerView | null {
  if (!chain.contractAddress) return null;
  return {
    contractAddress: chain.contractAddress,
    enrolled: chain.enrolled.length,
    nullifiers: chain.enrolled.length,
    attested: chain.attested.length,
    round: chain.round,
    employerPk: chain.employerPk,
    latestReport: chain.latestReport,
  };
}

const asReport = (r: PayReport): PayReportOnChain => r;

export async function chainDeploy(chain: BrowserChain, employerSecret: string): Promise<BrowserChain> {
  if (chain.contractAddress) return chain;
  const employerPk = await sha256Hex("equilux:pk:", employerSecret);
  const contractAddress = await sha256Hex("equilux:addr:", employerSecret, String(Date.now()));
  return {
    ...emptyChain(),
    contractAddress,
    employerPk,
    employerSecret,
    round: 1,
  };
}

export async function chainEnroll(
  chain: BrowserChain,
  person: { id: string; name: string; salary: number; gender: 0 | 1; secret: string },
): Promise<{ chain: BrowserChain; commitment: string }> {
  if (!chain.contractAddress) throw new Error("No contract deployed yet — deploy from the Employer tab");
  const emp: Employee = { ...person, role: "" };
  const nullifier = await enrollmentNullifier(emp, chain.round);
  if (chain.enrolled.some((e) => e.nullifier === nullifier)) {
    throw new Error("already enrolled this round");
  }
  const commitment = await recordCommitment(emp, chain.round);
  return {
    commitment,
    chain: {
      ...chain,
      enrolled: [...chain.enrolled, { ...person, commitment, nullifier }],
    },
  };
}

export function chainAttest(chain: BrowserChain, commitment: string): BrowserChain {
  if (!chain.contractAddress) throw new Error("No contract deployed yet — deploy from the Employer tab");
  if (!/^[0-9a-f]{64}$/i.test(commitment)) throw new Error("commitment must be 32-byte hex");
  const cm = commitment.toLowerCase();
  if (chain.attested.includes(cm)) throw new Error("already attested");
  return { ...chain, attested: [...chain.attested, cm] };
}

export function chainReceipt(chain: BrowserChain, commitment: string): boolean {
  if (!chain.contractAddress) throw new Error("No contract deployed yet — deploy from the Employer tab");
  return chain.enrolled.some((e) => e.commitment === commitment.toLowerCase() || e.commitment === commitment);
}

export async function chainPublish(
  chain: BrowserChain,
  witness: { id: string; name: string; salary: number; gender: 0 | 1; secret: string }[],
  claimedGapBps?: number,
): Promise<{ chain: BrowserChain; report: PayReportOnChain; claimedGapBps: number }> {
  if (!chain.contractAddress) throw new Error("No contract deployed yet — deploy from the Employer tab");
  const enrollments = new Map<string, Enrollment>();
  for (const e of chain.enrolled) enrollments.set(e.id, { commitment: e.commitment, nullifier: e.nullifier });
  const attested = new Set(chain.attested);
  const payroll: Employee[] = witness.map((p) => ({ ...p, role: "" }));
  const claim = claimedGapBps != null ? BigInt(claimedGapBps) : trueGapBps(payroll);
  const res = await publishReport(payroll, enrollments, attested, chain.enrolled.length, claim, chain.round);
  if (!res.ok || !res.report) throw new Error(res.error ?? "rejected");
  return {
    report: asReport(res.report),
    claimedGapBps: Number(claim),
    chain: { ...chain, latestReport: asReport(res.report) },
  };
}
