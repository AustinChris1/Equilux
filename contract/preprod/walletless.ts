/**
 * Walletless enrollment on Midnight's PUBLIC PREPROD testnet: the evidence run.
 *
 *   npm run walletless   (after npm run sync; in CI: workflow "Preprod v4", mode "walletless")
 *
 * A small fresh v4 contract (4 people) is deployed; the payroll provider declares the roster and the works council
 * approves it (each with a wallet, as in real life: here the deploy wallet plays them). Then one employee enrolls
 * WITHOUT A WALLET:
 *   1. the employee's proof is made with Midnight's WASM prover (zkir-v2), the exact code the browser runs: no proof
 *      server, no wallet, nothing but the employee's record, payslip nonce and secret;
 *   2. the proven, unbalanced transaction is handed to the SPONSOR (the employer's wallet), which only adds the fee
 *      (DUST) and submits. The sponsor never gets the secret: it receives the proven transaction, not the witness.
 * Resumable like run-v4.ts: every landed transaction is recorded in deployment-walletless.json.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import * as Rx from "rxjs";
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { ProtocolVersion, WalletTransaction } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { createCircuitContext, sampleSigningKey } from "@midnight-ntwrk/compact-runtime";
import { createUnprovenCallTxFromInitialStates, createUnprovenDeployTx, findDeployedContract, submitInsertVerifierKeyTx, submitTx } from "@midnight-ntwrk/midnight-js/contracts";
import { getNetworkId, setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { createProofProvider } from "@midnight-ntwrk/midnight-js/types";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { Contract, ledger, pureCircuits } from "../build/contract/index.js";
import { bytes32, confirmSteps, initialPrivateState, rosterSteps, witnesses, type Circuit, type EquiluxPrivateState, type Step } from "../deploy/witnesses.js";
import { PREPROD, openWallet, redact } from "./wallet.js";

const { LedgerParameters } = (await import("../node_modules/@midnight-ntwrk/ledger-v8/midnight_ledger_wasm_fs.js" as string)) as typeof import("@midnight-ntwrk/ledger-v8");
// Midnight's WASM prover: what the employee's browser runs
const zkir: any = await import(pathToFileURL(join(import.meta.dirname, "node_modules/@midnight-ntwrk/zkir-v2/midnight_zkir_wasm_fs.js")).href);

setNetworkId("preprod");
const DIR = import.meta.dirname;
const RECORD = join(DIR, "deployment-walletless.json");
const log = (m: string) => console.log(`[walletless ${new Date().toISOString().slice(11, 19)}] ${redact(m)}`);
const PRIVATE_STATE_ID = "equilux-preprod-walletless";

// a small invented company; employee 0 enrolls walletless
const TEAM = [0, 1, 2, 3].map((i) => {
  const name = `w${i}`;
  return { name, salary: BigInt(48_000 + i * 3_100), variable: BigInt(i % 2 ? 2_000 : 0), gender: BigInt(i % 2), category: 0n, level: BigInt(i % 2), sk: bytes32(`walletless:${name}`), nonce: bytes32(`walletless-payslip:${name}`) };
});
const EMPLOYER_SK = bytes32("walletless:employer");
const PROVIDER_SK = bytes32("walletless:payroll-provider");
const COUNCIL_SK = bytes32("walletless:works-council");

type Rec = { step: string; txId?: string; txHash?: string; block?: number; note?: string };
const record: { network: string; contractVersion: string; contract?: string; startedAt: string; steps: Rec[] } =
  existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")) : { network: "preprod", contractVersion: "v4", startedAt: new Date().toISOString(), steps: [] };
const save = () => writeFileSync(RECORD, JSON.stringify(record, null, 2));
const done = (step: string) => record.steps.some((s) => s.step === step);
const note = (step: string, pub: any, extra?: string) => {
  record.steps.push({ step, txId: pub?.txId, txHash: pub?.txHash, block: pub?.blockHeight != null ? Number(pub.blockHeight) : undefined, note: extra });
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
  if (dustNow(state) === 0n) throw new Error("the sponsor wallet has no DUST");

  const pvRes = await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "{ block { protocolVersion } }" }) });
  const pv = ProtocolVersion.ProtocolVersion(BigInt((await pvRes.json()).data.block.protocolVersion));
  const toWalletTx = (tx: any) => WalletTransaction.adopt("Unbound", Transaction.deserialize("signature", "proof", "pre-binding", tx.serialize()) as never, pv);
  const toFinalTx = (tx: any) =>
    WalletTransaction.is(tx) ? tx : WalletTransaction.adopt("Finalized", Transaction.deserialize("signature", "proof", "binding", tx.serialize()) as never, pv);
  // the sponsor: balances (pays DUST) and submits; this is all the employer's wallet does for a walletless enrollment
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
      privateStateStoreName: "equilux-preprod-walletless-private-state",
      accountId,
      privateStoragePasswordProvider: () => `${Buffer.from(accountId, "hex").toString("base64")}!`,
    }),
    publicDataProvider: indexerPublicDataProvider(PREPROD.indexer, PREPROD.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(PREPROD.proofServer, zkConfigProvider), // the employer, provider and council have their own provers
    walletProvider,
    midnightProvider: walletProvider,
  };
  const compiledContract = CompiledContract.make("equilux", Contract).pipe(CompiledContract.withWitnesses(witnesses), CompiledContract.withCompiledFileAssets(buildDir));
  const base = initialPrivateState(EMPLOYER_SK, PROVIDER_SK, COUNCIL_SK);
  const local = new Contract<EquiluxPrivateState>(witnesses);
  const circuits = Object.keys(local.impureCircuits) as Circuit[];

  // ── deploy in parts (as run-v4.ts: a block cannot hold all 14 keys) ───────────
  if (!record.contract) {
    const signingKey = sampleSigningKey();
    const full: any = await createUnprovenDeployTx(providers as any, {
      compiledContract, args: [pureCircuits.publicKey(EMPLOYER_SK), pureCircuits.publicKey(PROVIDER_SK), pureCircuits.publicKey(COUNCIL_SK)],
      signingKey, privateStateId: PRIVATE_STATE_ID, initialPrivateState: base,
    } as any);
    const tx = full.private.unprovenTx, intent = tx.intents.get(1), deploy = intent.actions[0], st = deploy.initialState;
    const build = (keep: string[]) => {
      const s = new st.constructor();
      s.data = st.data;
      s.maintenanceAuthority = st.maintenanceAuthority;
      for (const id of keep) s.setOperation(id, st.operation(id));
      const dep = new deploy.constructor(s);
      return { address: dep.address as string, tx: tx.constructor.fromParts(getNetworkId(), tx.guaranteedOffer, undefined, intent.constructor.new(intent.ttl).addDeploy(dep)) };
    };
    const written = (keep: string[]) => Number(build(keep).tx.cost(LedgerParameters.initialParameters()).bytesWritten);
    const keep: string[] = [];
    for (const id of circuits) if (written([...keep, id]) <= 20_000) keep.push(id); else break;
    const part = build(keep);
    const res: any = await submitTx(providers as any, { unprovenTx: part.tx });
    if (res.status !== "SucceedEntirely") throw new Error(`deploy failed on chain: ${res.status}`);
    record.contract = part.address;
    providers.privateStateProvider.setContractAddress(part.address as never);
    await providers.privateStateProvider.set(PRIVATE_STATE_ID, full.private.initialPrivateState);
    await providers.privateStateProvider.setSigningKey(part.address as never, signingKey);
    note("deploy", res);
  }
  providers.privateStateProvider.setContractAddress(record.contract as never);
  const deployed = await providers.publicDataProvider.queryContractState(record.contract!);
  for (const id of circuits) {
    if (deployed?.operation(id)) continue;
    note(`verifierKey:${id}`, await submitInsertVerifierKeyTx(providers as any, compiledContract as any, record.contract!, id, await zkConfigProvider.getVerifierKey(id)));
    await persist();
  }
  const d: any = await findDeployedContract(providers as any, { contractAddress: record.contract, compiledContract, privateStateId: PRIVATE_STATE_ID, initialPrivateState: base } as any);
  log(`contract ${record.contract}`);

  // ── roster and council, each with its own wallet in real life ───────────────
  const simulate = async (steps: Step[]) => {
    const cs = await providers.publicDataProvider.queryContractState(record.contract!);
    let ctx = createCircuitContext(record.contract!, accountId, cs as never, steps[0].ps);
    for (const st of steps) ctx = (local.impureCircuits as any)[st.circuit]({ ...ctx, currentPrivateState: st.ps }, ...st.args).context;
  };
  const rows = TEAM.map((t) => pureCircuits.payrollRow(t.salary, t.variable, t.gender, t.category, t.level, t.nonce));
  const steps: [string, Step][] = [
    ...rosterSteps(base, rows).map((st, i) => [i === 0 ? "declareRoster" : `addPayrollRows:${i}`, st] as [string, Step]),
    ...confirmSteps(base, TEAM.map((t) => ({ salary: t.salary, variable: t.variable, gender: t.gender, category: t.category, level: t.level, nonce: t.nonce })))
      .map((st, i) => [`confirmPayroll:${i + 1}`, st] as [string, Step]),
  ];
  for (const [name, st] of steps) {
    if (done(name)) continue;
    await simulate([st]);
    await providers.privateStateProvider.set(PRIVATE_STATE_ID, st.ps);
    note(name, (await d.callTx[st.circuit](...st.args)).public);
    await persist();
  }

  // ── the walletless enrollment ─────────────────────────────────────────────
  const emp = TEAM[0];
  if (!done(`enroll:${emp.name}:walletless`)) {
    // 1. THE EMPLOYEE: build and prove with the WASM prover. Inputs: own record, payslip nonce, own secret, public state.
    const states = await providers.publicDataProvider.queryZSwapAndContractState(record.contract! as never);
    if (!states) throw new Error("contract state not found");
    const [zswapChainState, contractState] = states;
    const ps: EquiluxPrivateState = { ...base, employerSecret: new Uint8Array(32), providerSecret: new Uint8Array(32), councilSecret: new Uint8Array(32),
      employeeSecret: emp.sk, employeeRecord: [emp.salary, emp.variable, emp.gender, emp.category, emp.level], rowNonce: emp.nonce };
    const call: any = await createUnprovenCallTxFromInitialStates(zkConfigProvider as never, {
      compiledContract, circuitId: "enroll", args: [], coinPublicKey: accountId, initialContractState: contractState, initialZswapChainState: zswapChainState,
      contractAddress: record.contract, initialPrivateState: ps,
    } as never, walletProvider.getEncryptionPublicKey());
    const paramsDir = join(DIR, "..", ".params");
    const keys = {
      async lookupKey(loc: string) { return { proverKey: await zkConfigProvider.getProverKey(loc as never), verifierKey: await zkConfigProvider.getVerifierKey(loc as never), ir: await zkConfigProvider.getZKIR(loc as never) }; },
      async getParams(k: number) {
        const f = join(paramsDir, `bls_midnight_2p${k}`);
        if (!existsSync(f)) { mkdirSync(paramsDir, { recursive: true }); writeFileSync(f, new Uint8Array(await (await fetch(`https://srs.midnight.network/bls_midnight_2p${k}`)).arrayBuffer())); }
        return new Uint8Array(readFileSync(f));
      },
    };
    const t0 = Date.now();
    const proven = await createProofProvider(zkir.provingProvider(keys) as never).proveTx(call.private.unprovenTx);
    const proveSecs = ((Date.now() - t0) / 1000).toFixed(0);
    const handed = proven.serialize(); // all that leaves the employee: a proven transaction, no witness
    log(`employee proved the enrollment with the WASM prover in ${proveSecs} s (${handed.length} bytes handed to the sponsor)`);

    // 2. THE SPONSOR: receives only the proven transaction bytes, pays the fee and submits
    // The fee is a DUST spend proven against the sponsor wallet's view of the chain. The first run was refused
    // with 170 (InvalidDustSpendProof): the wallet's indexer connection dropped while the employee was proving, so
    // it paid from a stale snapshot. So: let the wallet catch up right before paying, and on a refusal catch up
    // and pay again. The employee's proven transaction stays valid for an hour.
    let txId: unknown;
    for (let attempt = 1; ; attempt++) {
      await new Promise((r) => setTimeout(r, 20_000));
      state = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
      try {
        const received = Transaction.deserialize("signature", "proof", "pre-binding", handed);
        txId = await walletProvider.submitTx(await walletProvider.balanceTx(received));
        break;
      } catch (e) {
        log(`sponsor attempt ${attempt} refused (${String((e as Error)?.message ?? e).slice(0, 120)})`);
        if (attempt >= 4) throw e;
      }
    }
    log(`sponsor paid the fee and submitted tx ${String(txId).slice(0, 16)}…; waiting for the block`);
    const fin: any = await providers.publicDataProvider.watchForTxData(txId as never);
    if (fin.status !== "SucceedEntirely") throw new Error(`the walletless enrollment failed on chain: ${fin.status}`);
    note(`enroll:${emp.name}:walletless`, fin, `proof by the WASM prover in ${proveSecs} s; fee paid by the sponsor wallet`);
    await persist();
  }

  const l: any = ledger((await providers.publicDataProvider.queryContractState(record.contract!))!.data);
  log("──────────────────────────────────────────────");
  log(`contract ${record.contract} · rows ${l.payrollRows.size()} · council opened ${l.openedRows} · enrolled ${l.enrolled}`);
  log(`walletless enrollment: ${JSON.stringify(record.steps.find((s) => s.step.endsWith(":walletless")))}`);
  log(`check it: https://equilux-lac.vercel.app/check?contract=${record.contract}`);
  log("──────────────────────────────────────────────");
}

main().then(() => process.exit(0), (e) => { console.error(redact(String(e?.stack ?? e))); process.exit(1); });
