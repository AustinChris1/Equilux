/**
 * Equilux v2 end-to-end on a LOCAL MIDNIGHT NETWORK, as one scripted run.
 *
 * Deploys the compiled contract to a standalone Midnight node (docker), then
 * runs the full three-party protocol with REAL zero-knowledge proofs:
 *
 *   1. deploy(employerPk, providerPk)
 *   2. declareRoster(n)      — the payroll provider fixes the headcount
 *   3. enroll ×n             — each employee seals salary, gender, category
 *   4. attest ×n             — the payroll provider co-signs each record
 *   5. publishReport         — mean, median and per-category gaps, proven
 *   6. read the PayReport back from the indexer
 *
 * Prereq: pnpm network:up        Run: pnpm demo:standalone
 */
import { Buffer } from "node:buffer";
import { pureCircuits } from "../build/contract/index.js";
import { connectMidnight, initialPrivateState } from "./client.js";
import { buildClaim, padRecords, type PayRecord } from "./claims.js";
import { bytes32 } from "./witnesses.js";

const EMPLOYER_SK = bytes32("acme:employer-root-secret");
const PROVIDER_SK = bytes32("payroll-provider:personio");
const CATEGORY = ["Engineering", "Sales", "Operations", "—"];

const person = (name: string, salary: number, gender: 0 | 1, category: number) => ({
  name, rec: { salary: BigInt(salary), gender: BigInt(gender), category: BigInt(category), sk: bytes32(`demo:${name}`) } as PayRecord,
});

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
  const roster: any = await d.callTx.declareRoster(BigInt(TEAM.length));
  log(`payroll provider declared a roster of ${TEAM.length} (block ${roster.public.blockHeight})`);

  const commitments: Uint8Array[] = [];
  for (const { name, rec } of TEAM) {
    await mn.setPrivateState({ ...base, employeeSecret: rec.sk, employeeRecord: [rec.salary, rec.gender, rec.category] });
    const res: any = await d.callTx.enroll();
    commitments.push(res.private.result);
    log(`enrolled ${name.padEnd(3)} — commitment ${short(res.private.result)} (block ${res.public.blockHeight})`);
  }

  await mn.setPrivateState(base);
  for (const [i, cm] of commitments.entries()) {
    const res: any = await d.callTx.attest(cm);
    log(`provider attested ${TEAM[i].name} (block ${res.public.blockHeight})`);
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
  log(`  roster ${l.declaredHeadcount} · enrolled ${l.enrolled} · attested ${l.attested.size()} · salaries on chain: NONE`);
  log("──────────────────────────────────────────────");
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
