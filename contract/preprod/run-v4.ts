/**
 * Equilux v4 (batched) on Midnight's PUBLIC PREPROD testnet: a 32-person sample company,
 * so every batched step runs more than once (2 batches of 16), with real proofs.
 *
 *   npm run sync       (the first sync against Blockfrost replays preprod's history: hours)
 *   npm run deploy-v4
 *
 * Resumable: every transaction is written to deployment-v4.json as it lands, and a rerun skips
 * finished steps. A report phase (begin, batches, finish) that was interrupted is started again
 * from a fresh begin: the contract allows a new report at any time and counts everyone afresh.
 * Before any phase is sent, all of its steps run locally, chained on the live contract state.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as Rx from "rxjs";
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { ProtocolVersion, WalletTransaction } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { createCircuitContext } from "@midnight-ntwrk/compact-runtime";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { Contract, ledger, pureCircuits } from "../build/contract/index.js";
import { assignBands, buildClaim, buildLevelClaim, buildVariableClaim, type PayRecord } from "../deploy/claims.js";
import {
  bytes32, confirmSteps, initialPrivateState, levelReportSteps, payReportSteps, rosterSteps, variableReportSteps, witnesses,
  type Circuit, type EquiluxPrivateState, type Step,
} from "../deploy/witnesses.js";
import { PREPROD, openWallet, redact } from "./wallet.js";

setNetworkId("preprod");

const DIR = import.meta.dirname;
const RECORD = join(DIR, "deployment-v4.json");
const log = (m: string) => console.log(`[preprod-v4 ${new Date().toISOString().slice(11, 19)}] ${redact(m)}`);
const PRIVATE_STATE_ID = "equilux-preprod-v4";
const SIZE = Number(process.env.COMPANY_SIZE ?? 32);

/** The same generator as the tests and the app: invented people, four categories, a pay gap. */
function company(n: number) {
  let s = 0x2f6b1d3;
  const rnd = () => ((s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 2 ** 32);
  const base = [62_000, 51_000, 41_000, 88_000];
  return Array.from({ length: n }, (_, i) => {
    const category = i % 4;
    const gender = ((i * 7 + (i >> 3)) % 2) as 0 | 1;
    const salary = Math.round((base[category] * (0.85 + rnd() * 0.3) * (gender ? 1.06 : 1)) / 100) * 100;
    const variable = rnd() < 0.6 ? Math.round((salary * (0.03 + rnd() * 0.07)) / 50) * 50 : 0;
    const level = Math.min(3, Math.floor(rnd() * 3.2 + (gender ? 0.5 : 0)));
    const name = `p${String(i).padStart(3, "0")}`;
    return {
      name,
      rec: { salary: BigInt(salary), variable: BigInt(variable), gender: BigInt(gender), category: BigInt(category), level: BigInt(level), sk: bytes32(`preprod-v4:${name}`) } as PayRecord,
      nonce: bytes32(`preprod-v4-payslip:${name}`),
    };
  });
}
const TEAM = company(SIZE);
const rowOf = ({ rec, nonce }: (typeof TEAM)[number]) => pureCircuits.payrollRow(rec.salary, rec.variable, rec.gender, rec.category, rec.level, nonce);

const EMPLOYER_SK = bytes32("preprod-v4:acme-employer");
const PROVIDER_SK = bytes32("preprod-v4:payroll-provider");
const COUNCIL_SK = bytes32("preprod-v4:works-council");

type Rec = { step: string; txId?: string; txHash?: string; block?: number };
const record: { network: string; contractVersion: string; companySize: number; contract?: string; startedAt: string; steps: Rec[] } =
  existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")) : { network: "preprod", contractVersion: "v4", companySize: SIZE, startedAt: new Date().toISOString(), steps: [] };
const save = () => writeFileSync(RECORD, JSON.stringify(record, null, 2));
const done = (step: string) => record.steps.some((s) => s.step === step);
const note = (step: string, res: any) => {
  const pub = res?.public ?? res?.deployTxData?.public;
  record.steps.push({ step, txId: pub?.txId, txHash: pub?.txHash, block: pub?.blockHeight != null ? Number(pub.blockHeight) : undefined });
  save();
  log(`${step} ✓ (block ${pub?.blockHeight ?? "?"}, tx ${String(pub?.txId ?? "").slice(0, 16)}…)`);
};

async function main() {
  const { facade, keystore, persist } = await openWallet(log);
  log("waiting for the wallet to be level with preprod…");
  let state: any = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
  await persist();
  const dustNow = (s: any) => { try { return BigInt(s.dust.balance(new Date())); } catch { return 0n; } };
  log(`synced · dust ${dustNow(state)}`);
  if (dustNow(state) === 0n) throw new Error("the deploy wallet has no DUST: designate its tNIGHT for DUST generation first");

  const pvRes = await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "{ block { protocolVersion } }" }) });
  const pv = ProtocolVersion.ProtocolVersion(BigInt((await pvRes.json()).data.block.protocolVersion));
  log(`preprod protocol version ${pv}`);
  const toWalletTx = (tx: any) => WalletTransaction.adopt("Unbound", Transaction.deserialize("signature", "proof", "pre-binding", tx.serialize()) as never, pv);
  const toFinalTx = (tx: any) =>
    WalletTransaction.is(tx) ? tx : WalletTransaction.adopt("Finalized", Transaction.deserialize("signature", "proof", "binding", tx.serialize()) as never, pv);
  const walletProvider = {
    getCoinPublicKey: () => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => state.shielded.encryptionPublicKey.toHexString(),
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await facade.balanceUnboundTransaction(toWalletTx(tx) as never, { ttl: ttl ?? new Date(Date.now() + 30 * 60_000) });
      const signed = await facade.signRecipe(recipe, keystore.signDataAsync);
      return facade.finalizeRecipe(signed);
    },
    submitTx: (tx: any) => facade.submitTransaction(toFinalTx(tx) as never) as any,
  };
  const buildDir = join(DIR, "..", "build");
  const zkConfigProvider = new NodeZkConfigProvider<Circuit>(buildDir);
  const accountId = walletProvider.getCoinPublicKey();
  const providers = {
    privateStateProvider: levelPrivateStateProvider<typeof PRIVATE_STATE_ID>({
      privateStateStoreName: "equilux-preprod-v4-private-state",
      accountId,
      privateStoragePasswordProvider: () => `${Buffer.from(accountId, "hex").toString("base64")}!`,
    }),
    publicDataProvider: indexerPublicDataProvider(PREPROD.indexer, PREPROD.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(PREPROD.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
  const compiledContract = CompiledContract.make("equilux", Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(buildDir),
  );
  const base = initialPrivateState(EMPLOYER_SK, PROVIDER_SK, COUNCIL_SK);
  const setPS = (ps: EquiluxPrivateState) => providers.privateStateProvider.set(PRIVATE_STATE_ID, ps);
  const local = new Contract<EquiluxPrivateState>(witnesses);

  /** Runs every step locally, chained on live state: nothing is sent unless all of them pass. */
  const simulate = async (steps: Step[]) => {
    const cs = await providers.publicDataProvider.queryContractState(record.contract!);
    if (!cs) throw new Error("contract state not found via the indexer");
    let ctx = createCircuitContext(record.contract!, accountId, cs as never, steps[0].ps);
    for (const st of steps) ctx = (local.impureCircuits as any)[st.circuit]({ ...ctx, currentPrivateState: st.ps }, ...st.args).context;
  };
  const send = async (st: Step, name: string) => {
    await setPS(st.ps);
    note(name, await d.callTx[st.circuit](...st.args));
    await persist();
  };

  // ── deploy ───────────────────────────────────────────────────────────────
  let d: any;
  if (!record.contract) {
    log(`deploying Equilux v4 for a ${SIZE}-person sample company (proving)…`);
    d = await deployContract(providers as any, {
      compiledContract,
      args: [pureCircuits.publicKey(EMPLOYER_SK), pureCircuits.publicKey(PROVIDER_SK), pureCircuits.publicKey(COUNCIL_SK)],
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: base,
    } as any);
    record.contract = d.deployTxData.public.contractAddress;
    note("deploy", d.deployTxData);
    log(`contract ${record.contract}`);
  } else {
    d = await findDeployedContract(providers as any, { contractAddress: record.contract, compiledContract, privateStateId: PRIVATE_STATE_ID, initialPrivateState: base } as any);
    log(`resuming contract ${record.contract}`);
  }

  // ── roster and council: deterministic steps, resumable one by one ─────────
  const roster = rosterSteps(base, TEAM.map(rowOf));
  for (const [i, st] of roster.entries()) {
    const name = i === 0 ? "declareRoster" : `addPayrollRows:${i}`;
    if (done(name)) continue;
    await simulate([st]);
    await send(st, name);
  }
  const council = confirmSteps(base, TEAM.map(({ rec, nonce }) => ({ salary: rec.salary, variable: rec.variable, gender: rec.gender, category: rec.category, level: rec.level, nonce })));
  for (const [i, st] of council.entries()) {
    const name = `confirmPayroll:${i + 1}`;
    if (done(name)) continue;
    await simulate([st]);
    await send(st, name);
  }

  // ── enrollment, one employee per transaction ──────────────────────────────
  for (const t of TEAM) {
    const name = `enroll:${t.name}`;
    if (done(name)) continue;
    await send({ circuit: "enroll", ps: { ...base, employeeSecret: t.rec.sk, employeeRecord: [t.rec.salary, t.rec.variable, t.rec.gender, t.rec.category, t.rec.level], rowNonce: t.nonce }, args: [], label: name }, name);
  }

  // ── the reports: whole phases, simulated first, restarted if interrupted ───
  const records = TEAM.map((t) => t.rec);
  const phase = async (kind: string, steps: Step[]) => {
    if (done(`${kind}:complete`)) return;
    const attempt = record.steps.filter((s) => s.step.startsWith(`${kind}:begin`)).length + 1;
    await simulate(steps);
    log(`${kind}: ${steps.length} steps passed locally; sending (attempt ${attempt})`);
    for (const [i, st] of steps.entries()) {
      const name = i === 0 ? `${kind}:begin#${attempt}` : i === steps.length - 1 ? `${kind}:finish#${attempt}` : `${kind}:batch${i}#${attempt}`;
      await send(st, name);
    }
    record.steps.push({ step: `${kind}:complete` });
    save();
  };
  await phase("payReport", payReportSteps(base, records, buildClaim(records)));
  await phase("variableReport", variableReportSteps(base, records, buildVariableClaim(records), assignBands(records)));
  await phase("levelReport", levelReportSteps(base, records, buildLevelClaim(records)));

  const cs = await providers.publicDataProvider.queryContractState(record.contract!);
  const l: any = ledger(cs!.data);
  const r = l.latestReport.value, v = l.latestVariableReport.value;
  log("──────────────────────────────────────────────");
  log(`preprod contract ${record.contract} (v4, ${SIZE} people, ${Math.ceil(SIZE / 16)} batches)`);
  log(`mean ${Number(r.meanGapBps) / 100}% · median ${Number(r.medianGapBps) / 100}% · variable mean ${Number(v.meanGapBps) / 100}%`);
  const lv = l.latestLevelReport.value;
  log(`level-adjusted gap ${Number(lv.adjustedGapBps) / 100}% over ${lv.adjustedCovers} people · level mix ${lv.levels.map((x: any) => `${x.women}W/${x.men}M`).join(" ")}`);
  log(`payroll rows ${l.payrollRows.size()} · council opened ${l.openedRows} · enrolled ${l.enrolled} · salaries on chain: NONE`);
  log(`verify: https://equilux-lac.vercel.app/verify?network=preprod&contract=${record.contract}`);
  log("──────────────────────────────────────────────");
  record.steps.push({ step: "complete" });
  save();
}

main().then(() => process.exit(0), (e) => { console.error(redact(String(e?.stack ?? e))); process.exit(1); });
