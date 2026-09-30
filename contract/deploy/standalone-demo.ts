/**
 * Equilux v2 end-to-end on a LOCAL MIDNIGHT NETWORK, as one scripted run.
 *
 * Deploys the compiled contract to a standalone Midnight node (docker), then
 * runs the full three-party protocol with REAL zero-knowledge proofs:
 *
 *   1. deploy(employerPk, providerPk)
 *   2. declareRoster(rows)   — the payroll provider commits one hiding hash per
 *                              payroll row, in one transaction
 *   3. enroll ×n             — each employee seals salary, gender, category and
 *                              proves it opens to their (unclaimed) payroll row
 *   4. an inflated salary is rejected — it matches no payroll row
 *   5. publishReport         — mean, median and per-category gaps, proven
 *   6. read the PayReport back from the indexer
 *
 * Prereq: pnpm network:up        Run: pnpm demo:standalone
 */
import { Buffer } from "node:buffer";
import { createCircuitContext } from "@midnight-ntwrk/compact-runtime";
import { Contract, pureCircuits } from "../build/contract/index.js";
import { connectMidnight, initialPrivateState } from "./client.js";
import { buildClaim, padRecords, padRows, type PayRecord } from "./claims.js";
import { bytes32, witnesses } from "./witnesses.js";

const EMPLOYER_SK = bytes32("acme:employer-root-secret");
const PROVIDER_SK = bytes32("payroll-provider:personio");
const CATEGORY = ["Engineering", "Sales", "Operations", "—"];

const person = (name: string, salary: number, gender: 0 | 1, category: number) => ({
  name,
  rec: { salary: BigInt(salary), gender: BigInt(gender), category: BigInt(category), sk: bytes32(`demo:${name}`) } as PayRecord,
  nonce: bytes32(`payslip-nonce:${name}`), // printed on the payslip by the provider
});
const rowOf = ({ rec, nonce }: (typeof TEAM)[number]) => pureCircuits.payrollRow(rec.salary, rec.gender, rec.category, nonce);

// Engineering and Sales have ≥3 of each gender (disclosed); Operations has
// one of each (suppressed by the k = 3 threshold).
const TEAM = [
  person("ada", 60_000, 0, 0), person("bea", 62_000, 0, 0), person("cai", 64_000, 0, 0),
  person("dan", 70_000, 1, 0), person("eli", 72_000, 1, 0), person("fox", 74_000, 1, 0),
  person("gia", 50_000, 0, 1), person("hal", 52_000, 0, 1), person("ivy", 54_000, 0, 1),
  person("jon", 53_000, 1, 1), person("kai", 54_000, 1, 1), person("leo", 55_000, 1, 1),
  person("mia", 40_000, 0, 2), person("ned", 45_000, 1, 2),
];

const log = (msg: string) => console.log(`[equilux] ${msg}`);
const short = (b: Uint8Array) => `${Buffer.from(b).toString("hex").slice(0, 10)}…`;
const pct = (bps: bigint) => `${(Number(bps) / 100).toFixed(2)}%`;

async function main() {
  const mn = await connectMidnight(log);
  const base = initialPrivateState(EMPLOYER_SK, PROVIDER_SK);

  const d: any = await mn.deploy(pureCircuits.publicKey(EMPLOYER_SK), pureCircuits.publicKey(PROVIDER_SK), base);
  const address = d.deployTxData.public.contractAddress;
  log(`deployed at ${address} (block ${d.deployTxData.public.blockHeight})`);

  await mn.setPrivateState(base);
  const roster: any = await d.callTx.declareRoster(padRows(TEAM.map(rowOf)), BigInt(TEAM.length));
  log(`payroll provider committed ${TEAM.length} payroll rows (block ${roster.public.blockHeight})`);

  for (const t of TEAM) {
    const { name, rec, nonce } = t;
    await mn.setPrivateState({ ...base, employeeSecret: rec.sk, employeeRecord: [rec.salary, rec.gender, rec.category], rowNonce: nonce });
    const res: any = await d.callTx.enroll();
    log(`enrolled ${name.padEnd(3)} — opens payroll row ${short(rowOf(t))} · commitment ${short(res.private.result)} (block ${res.public.blockHeight})`);
    if (name === "ada") {
      // the same employee (fresh secret) claims a higher salary: no payroll row matches
      // executed against the live on-chain state; a rejected witness never reaches the prover
      const cs = await mn.providers.publicDataProvider.queryContractState(address);
      const inflated: [bigint, bigint, bigint] = [rec.salary + 5_000n, rec.gender, rec.category];
      const ps = { ...base, employeeSecret: bytes32("demo:ada-2"), employeeRecord: inflated, rowNonce: nonce };
      const ctx = createCircuitContext(address, mn.providers.walletProvider.getCoinPublicKey(), cs as any, ps);
      try {
        new Contract<typeof ps, typeof witnesses>(witnesses).impureCircuits.enroll(ctx);
        throw new Error("inflated salary was accepted");
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        if (m.includes("was accepted")) throw e;
        log(`ada claims €${inflated[0]} instead → REJECTED: ${m.slice(m.indexOf("failed assert:") + 14).trim()}`);
      }
    }
  }

  const records = TEAM.map((t) => t.rec);
  await mn.setPrivateState({ ...base, payroll: padRecords(records), claim: buildClaim(records) });
  const pub: any = await d.callTx.publishReport();
  log(`publishReport proven & finalized (tx ${pub.public.txId}, block ${pub.public.blockHeight})`);

  const l: any = await mn.readLedger(address);
  const r = l.latestReport.value;
  log("──────────────────────────────────────────────");
  log(`on-chain PayReport (round ${r.round}) — ${r.headcountWomen} women · ${r.headcountMen} men`);
  log(`  mean gap     ${pct(r.meanGapBps)} (favors ${r.gapFavorsMen ? "men" : "women"})`);
  log(`  median gap   ${pct(r.medianGapBps)} (favors ${r.medianFavorsMen ? "men" : "women"})`);
  r.categories.forEach((c: any, i: number) => {
    if (c.headcountWomen + c.headcountMen === 0n) return;
    log(c.disclosed
      ? `  ${CATEGORY[i].padEnd(12)} women €${c.meanWomen} · men €${c.meanMen} · gap ${pct(c.meanGapBps)}${c.gapAtOrAbove5pct ? "  ≥5% → assess" : ""}`
      : `  ${CATEGORY[i].padEnd(12)} ${c.headcountWomen}W/${c.headcountMen}M — suppressed (cohort < 3)`);
  });
  log(`  payroll rows ${l.payrollRows.size()} · enrolled ${l.enrolled} · bound ${l.bound.size()} · salaries on chain: NONE`);
  log("──────────────────────────────────────────────");
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
