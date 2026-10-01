/**
 * Equilux v3 on Midnight's PUBLIC PREPROD testnet: the same 14-person company as
 * the live site and the local demo, with real proofs, finalized on preprod.
 *
 *   npm run sync   (once, hours: the first dust replay on ledger-v8)
 *   npm run deploy
 *
 * Contract calls use the stable midnight-js line the contract was compiled for;
 * balancing, signing and submission go through the release-candidate wallet that
 * can read preprod. Transactions cross between the two as serialized bytes, since
 * each side carries its own copy of the ledger library. Every transaction is
 * recorded in deployment.json for /verify and the docs.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as Rx from "rxjs";
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { ProtocolVersion, WalletTransaction } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { Contract, ledger, pureCircuits } from "../build/contract/index.js";
import { assignBands, buildClaim, buildVariableClaim, padOpenings, padRecords, padRows, type PayRecord } from "../deploy/claims.js";
import { bytes32, initialPrivateState, witnesses, type EquiluxPrivateState } from "../deploy/witnesses.js";
import { PREPROD, openWallet } from "./wallet.js";

setNetworkId("preprod");

const DIR = import.meta.dirname;
const RECORD = join(DIR, "deployment.json");
const log = (m: string) => console.log(`[preprod ${new Date().toISOString().slice(11, 19)}] ${m}`);
const PRIVATE_STATE_ID = "equilux-preprod";

// The same company as the live site (see deploy/standalone-demo.ts).
const person = (name: string, salary: number, gender: 0 | 1, category: number, variable = 0) => ({
  name,
  rec: { salary: BigInt(salary), variable: BigInt(variable), gender: BigInt(gender), category: BigInt(category), sk: bytes32(`preprod:${name}`) } as PayRecord,
  nonce: bytes32(`preprod-payslip:${name}`),
});
const TEAM = [
  person("ada", 60_000, 0, 0, 3_000), person("bea", 62_000, 0, 0, 4_000), person("cai", 64_000, 0, 0),
  person("dan", 70_000, 1, 0, 6_000), person("eli", 72_000, 1, 0, 7_000), person("fox", 74_000, 1, 0, 5_000),
  person("gia", 50_000, 0, 1, 2_000), person("hal", 52_000, 0, 1, 2_500), person("ivy", 54_000, 0, 1, 3_000),
  person("jon", 53_000, 1, 1, 2_500), person("kai", 54_000, 1, 1, 3_500), person("leo", 55_000, 1, 1, 3_000),
  person("mia", 40_000, 0, 2), person("ned", 45_000, 1, 2, 1_000),
];
const rowOf = ({ rec, nonce }: (typeof TEAM)[number]) => pureCircuits.payrollRow(rec.salary, rec.variable, rec.gender, rec.category, nonce);

const EMPLOYER_SK = bytes32("preprod:acme-employer");
const PROVIDER_SK = bytes32("preprod:payroll-provider");
const COUNCIL_SK = bytes32("preprod:works-council");

type Step = { step: string; txId?: string; txHash?: string; block?: number };
const record: { network: string; contract?: string; startedAt: string; steps: Step[] } =
  existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")) : { network: "preprod", startedAt: new Date().toISOString(), steps: [] };
const save = () => writeFileSync(RECORD, JSON.stringify(record, null, 2));
const done = (step: string) => record.steps.some((s) => s.step === step);
const note = (step: string, res: any) => {
  const pub = res?.public ?? res?.deployTxData?.public;
  record.steps.push({ step, txId: pub?.txId, txHash: pub?.txHash, block: pub?.blockHeight != null ? Number(pub.blockHeight) : undefined });
  save();
  log(`${step} ✓ (block ${pub?.blockHeight ?? "?"}, tx ${String(pub?.txId ?? "").slice(0, 16)}…)`);
};

async function main() {
  // ── wallet ───────────────────────────────────────────────────────────────
  const { facade, keystore, persist } = await openWallet(log);
  log("waiting for the wallet to be level with preprod…");
  let state: any = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
  await persist();
  const night = Object.values(state.unshielded.balances ?? {}).reduce((a: bigint, b: any) => a + BigInt(b), 0n);
  log(`synced · tNIGHT ${night} · dust coins ${state.dust.availableCoins.length}`);
  if (night === 0n) throw new Error(`no tNIGHT yet; fund ${keystore.getBech32Address()} at ${PREPROD.faucet}`);

  const dustNow = (s: any) => { try { return BigInt(s.dust.balance(new Date())); } catch { return 0n; } };
  if (dustNow(state) === 0n) {
    const utxos = state.unshielded.availableCoins.filter((c: any) => c.meta?.registeredForDustGeneration !== true);
    if (utxos.length > 0) {
      const { fee } = await facade.estimateRegistration(utxos);
      log(`registering ${utxos.length} NIGHT UTXO(s) for dust generation (fee ${fee}); waiting until generation covers it…`);
      await facade.waitForGeneratedDust(utxos, fee, { timeoutMs: 60 * 60_000 });
      const recipe = await facade.registerNightUtxosForDustGeneration(utxos, keystore.getPublicKey(), keystore.signDataAsync);
      const id = await facade.submitTransaction(await facade.finalizeRecipe(recipe));
      log(`dust registration submitted (${String(id).slice(0, 16)}…)`);
    }
    log("waiting for dust to accrue…");
    state = await Rx.firstValueFrom(facade.state().pipe(Rx.throttleTime(10_000), Rx.filter((s: any) => s.isSynced && dustNow(s) > 0n)));
    await persist();
    log(`dust ready: ${dustNow(state)}`);
  }

  // ── midnight-js providers, bridged onto the RC wallet ──────────────────────
  // The RC wallet takes transactions as handles stamped with the protocol version
  // that built them; ours are ledger-v8 transactions at preprod's current version.
  const pvRes = await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "{ block { protocolVersion } }" }) });
  const pv = ProtocolVersion.ProtocolVersion(BigInt((await pvRes.json()).data.block.protocolVersion));
  log(`preprod protocol version ${pv}`);
  const toWalletTx = (tx: any) =>
    WalletTransaction.adopt("Unbound", Transaction.deserialize("signature", "proof", "pre-binding", tx.serialize()) as never, pv);
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
  const zkConfigProvider = new NodeZkConfigProvider<"declareRoster" | "confirmPayroll" | "enroll" | "checkReceipt" | "publishReport" | "publishVariablePay">(buildDir);
  const accountId = walletProvider.getCoinPublicKey();
  const providers = {
    privateStateProvider: levelPrivateStateProvider<typeof PRIVATE_STATE_ID>({
      privateStateStoreName: "equilux-preprod-private-state",
      accountId,
      privateStoragePasswordProvider: () => `${Buffer.from(accountId, "hex").toString("base64")}!`,
    }),
    publicDataProvider: indexerPublicDataProvider(PREPROD.indexer.replace("/v4/", "/v3/"), PREPROD.indexerWS.replace("/v4/", "/v3/")),
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

  // ── the protocol, resumable step by step ──────────────────────────────────
  let d: any;
  if (!record.contract) {
    log("deploying Equilux v3 (proving)…");
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

  if (!done("declareRoster")) {
    await setPS(base);
    note("declareRoster", await d.callTx.declareRoster(padRows(TEAM.map(rowOf)), BigInt(TEAM.length)));
  }
  if (!done("confirmPayroll")) {
    await setPS({ ...base, openings: padOpenings(TEAM.map(({ rec, nonce }) => ({ salary: rec.salary, variable: rec.variable, gender: rec.gender, category: rec.category, nonce }))) });
    note("confirmPayroll", await d.callTx.confirmPayroll());
  }
  for (const t of TEAM) {
    const step = `enroll:${t.name}`;
    if (done(step)) continue;
    await setPS({ ...base, employeeSecret: t.rec.sk, employeeRecord: [t.rec.salary, t.rec.variable, t.rec.gender, t.rec.category], rowNonce: t.nonce });
    note(step, await d.callTx.enroll());
    await persist();
  }
  const records = TEAM.map((t) => t.rec);
  if (!done("publishReport")) {
    await setPS({ ...base, payroll: padRecords(records), claim: buildClaim(records) });
    note("publishReport", await d.callTx.publishReport());
  }
  if (!done("publishVariablePay")) {
    await setPS({ ...base, payroll: padRecords(records, assignBands(records)), variableClaim: buildVariableClaim(records) });
    note("publishVariablePay", await d.callTx.publishVariablePay());
  }
  await persist();

  const cs = await providers.publicDataProvider.queryContractState(record.contract!);
  const l: any = ledger(cs!.data);
  const r = l.latestReport.value, v = l.latestVariableReport.value;
  log("──────────────────────────────────────────────");
  log(`preprod contract ${record.contract}`);
  log(`mean ${Number(r.meanGapBps) / 100}% · median ${Number(r.medianGapBps) / 100}% · variable mean ${Number(v.meanGapBps) / 100}% · variable median ${Number(v.medianGapBps) / 100}%`);
  log(`payroll rows ${l.payrollRows.size()} · council confirmed ${l.payrollConfirmed} · enrolled ${l.enrolled} · salaries on chain: NONE`);
  log(`verify: https://equilux-lac.vercel.app/verify?network=preprod&contract=${record.contract}`);
  log("──────────────────────────────────────────────");
  record.steps.push({ step: "complete" });
  save();
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
