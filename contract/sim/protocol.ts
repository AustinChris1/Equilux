/**
 * Equilux protocol simulator.
 *
 * Mirrors the semantics of `src/equilux.compact` in plain TypeScript so the
 * protocol rules can be exercised and tested off-circuit: same commitment and
 * nullifier scheme, same completeness / integrity / distinctness checks, and
 * the same division-free cross-multiplication verification of the mean gap.
 *
 * The hash is SHA-256 here; in-circuit it is Compact's persistentHash. The
 * binding structure (domain-separated preimages) is identical.
 */
import { createHash } from "node:crypto";

export type Gender = 0 | 1; // 0 = woman, 1 = man

export interface PayRecord {
  salary: bigint; // annualized, minor units
  gender: Gender;
  sk: string; // employee enrollment secret (hex)
}

export interface PayReport {
  round: number;
  headcountWomen: number;
  headcountMen: number;
  meanGapBps: number;
  gapFavorsMen: boolean;
  meanGapAtOrAbove5pct: boolean;
}

const h = (...parts: (string | Uint8Array)[]) => {
  const hash = createHash("sha256");
  for (const p of parts) hash.update(p);
  return hash.digest("hex");
};

export const recordCommitment = (rec: PayRecord, round: number) =>
  h("equilux:rec:", String(round), String(rec.salary * 2n + BigInt(rec.gender)), rec.sk);

export const enrollmentNullifier = (sk: string, round: number) =>
  h("equilux:nul:", String(round), sk);

export const publicKey = (sk: string) => h("equilux:pk:", sk);

/** Division-free gap verification, exactly as the circuit performs it. */
export function verifyGapClaim(
  sumW: bigint,
  cntW: bigint,
  sumM: bigint,
  cntM: bigint,
  claimedBps: bigint,
): { ok: boolean; favorsMen: boolean } {
  const favorsMen = sumM * cntW >= sumW * cntM;
  const diff = favorsMen ? sumM * cntW - sumW * cntM : sumW * cntM - sumM * cntW;
  const base = favorsMen ? sumM * cntW : sumW * cntM;
  const ok =
    claimedBps * base <= diff * 10000n && diff * 10000n < (claimedBps + 1n) * base;
  return { ok, favorsMen };
}

/** The honest prover's computation of the claim the circuit will verify. */
export function trueGapBps(sumW: bigint, cntW: bigint, sumM: bigint, cntM: bigint): bigint {
  const favorsMen = sumM * cntW >= sumW * cntM;
  const diff = favorsMen ? sumM * cntW - sumW * cntM : sumW * cntM - sumM * cntW;
  const base = favorsMen ? sumM * cntW : sumW * cntM;
  return (diff * 10000n) / base;
}

export class EquiluxSim {
  readonly employerPk: string;
  round = 1;
  enrolled = 0;
  readonly commitments: string[] = []; // public Merkle leaves (tree omitted in sim)
  readonly nullifiers = new Set<string>();
  readonly attested = new Set<string>();
  latestReport: PayReport | null = null;

  constructor(private employerSk: string) {
    this.employerPk = publicKey(employerSk);
  }

  /** Employee circuit: seal a pay record into the reporting set. */
  enroll(rec: PayRecord): string {
    const nul = enrollmentNullifier(rec.sk, this.round);
    if (this.nullifiers.has(nul)) throw new Error("already enrolled this round");
    const cm = recordCommitment(rec, this.round);
    this.nullifiers.add(nul);
    this.commitments.push(cm);
    this.enrolled++;
    return cm;
  }

  /** Employer circuit: co-sign a commitment recognized from payroll. */
  attest(employerSk: string, cm: string): void {
    if (publicKey(employerSk) !== this.employerPk) throw new Error("not the employer");
    if (this.attested.has(cm)) throw new Error("already attested");
    this.attested.add(cm);
  }

  /** Inclusion receipt check (sim: leaf membership). */
  checkReceipt(cm: string): boolean {
    return this.commitments.includes(cm);
  }

  /** Employer circuit: publish the report, enforcing every circuit assertion. */
  publishReport(employerSk: string, payroll: PayRecord[], claimedGapBps: bigint): PayReport {
    if (publicKey(employerSk) !== this.employerPk) throw new Error("not the employer");

    for (const rec of payroll) {
      const cm = recordCommitment(rec, this.round);
      if (!this.attested.has(cm)) throw new Error("record not attested by employer");
      if (!this.nullifiers.has(enrollmentNullifier(rec.sk, this.round)))
        throw new Error("record not enrolled");
    }

    const sks = new Set(payroll.map((r) => r.sk));
    if (sks.size !== payroll.length) throw new Error("duplicate record in payroll witness");

    if (payroll.length !== this.enrolled)
      throw new Error("payroll witness must cover every enrolled employee");

    const women = payroll.filter((r) => r.gender === 0);
    const men = payroll.filter((r) => r.gender === 1);
    if (women.length === 0) throw new Error("no women in reporting set");
    if (men.length === 0) throw new Error("no men in reporting set");

    const sumW = women.reduce((a, r) => a + r.salary, 0n);
    const sumM = men.reduce((a, r) => a + r.salary, 0n);
    const cntW = BigInt(women.length);
    const cntM = BigInt(men.length);

    const { ok, favorsMen } = verifyGapClaim(sumW, cntW, sumM, cntM, claimedGapBps);
    if (!ok) throw new Error("claimed gap does not match payroll");

    const report: PayReport = {
      round: this.round,
      headcountWomen: women.length,
      headcountMen: men.length,
      meanGapBps: Number(claimedGapBps),
      gapFavorsMen: favorsMen,
      meanGapAtOrAbove5pct: claimedGapBps >= 500n,
    };
    this.latestReport = report;
    return report;
  }
}
