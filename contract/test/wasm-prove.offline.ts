// Proves an `enroll` transaction with Midnight's WASM prover (zkir-v2): no proof server, no wallet. This is what an
// employee's browser does for walletless enrollment. Offline: a 4-person company is rostered and approved locally,
// then employee 0's enrollment is built and proven. Run: node --max-old-space-size=8192 --import tsx test/wasm-prove.offline.ts
// Params (bls_midnight_2p<k>, public) are cached in contract/.params; if a download fails, fetch them with curl from
// https://srs.midnight.network/ into that folder.
import { join } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { createCircuitContext, sampleSigningKey } from "@midnight-ntwrk/compact-runtime";
import { ZswapChainState } from "@midnight-ntwrk/ledger-v8";
import { createUnprovenCallTxFromInitialStates, createUnprovenDeployTxFromVerifierKeys } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { createProofProvider } from "@midnight-ntwrk/midnight-js/types";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { Contract, pureCircuits } from "../build/contract/index.js";
import { bytes32, confirmSteps, initialPrivateState, rosterSteps, witnesses, type EquiluxPrivateState } from "../deploy/witnesses.js";

const zkir: any = await import(pathToFileURL(join(import.meta.dirname, "../preprod/node_modules/@midnight-ntwrk/zkir-v2/midnight_zkir_wasm_fs.js")).href);
setNetworkId("preprod");
const buildDir = join(import.meta.dirname, "..", "build");
const zk = new NodeZkConfigProvider<any>(buildDir);
const compiledContract = CompiledContract.make("equilux", Contract).pipe(CompiledContract.withWitnesses(witnesses as never), CompiledContract.withCompiledFileAssets(buildDir));
const E = bytes32("e"), P = bytes32("p"), Cn = bytes32("c");
const base = initialPrivateState(E, P, Cn);
const COIN = "00".repeat(32), ENC = "00".repeat(32);

// the deployed state (with verifier keys), then roster + council run locally
const dep: any = await createUnprovenDeployTxFromVerifierKeys(zk as never, COIN, {
  compiledContract, args: [pureCircuits.publicKey(E), pureCircuits.publicKey(P), pureCircuits.publicKey(Cn)], signingKey: sampleSigningKey(),
  privateStateId: "x", initialPrivateState: base,
} as never, ENC);
const address = dep.public.contractAddress;
const cs = dep.public.initialContractState;
const team = [0, 1, 2, 3].map((i) => ({ salary: BigInt(50_000 + i * 1000), variable: 0n, gender: BigInt(i % 2), category: 0n, level: 0n, sk: bytes32(`emp${i}`), nonce: bytes32(`nonce${i}`) }));
const local = new Contract<EquiluxPrivateState>(witnesses);
let ctx: any = createCircuitContext(address, COIN, cs, base);
const rows = team.map((t) => pureCircuits.payrollRow(t.salary, t.variable, t.gender, t.category, t.level, t.nonce));
for (const st of [...rosterSteps(base, rows), ...confirmSteps(base, team.map((t) => ({ salary: t.salary, variable: t.variable, gender: t.gender, category: t.category, level: t.level, nonce: t.nonce })))])
  ctx = (local.impureCircuits as any)[st.circuit]({ ...ctx, currentPrivateState: st.ps }, ...st.args).context;
cs.data = ctx.currentQueryContext.state;
console.log("state ready: roster declared and approved for 4 people");

// employee 0 enrolls: the private state holds only their record, nonce and secret
const t = team[0];
const ps: EquiluxPrivateState = { ...base, employeeSecret: t.sk, employeeRecord: [t.salary, t.variable, t.gender, t.category, t.level], rowNonce: t.nonce };
const call: any = await createUnprovenCallTxFromInitialStates(zk as never, {
  compiledContract, circuitId: "enroll", args: [], coinPublicKey: COIN, initialContractState: cs, initialZswapChainState: new ZswapChainState(), contractAddress: address, initialPrivateState: ps,
} as never, ENC);
const unproven = call.private.unprovenTx;
console.log("unproven enroll tx built");

// the WASM prover: keys from build/, params from Midnight's public SRS
const seen: string[] = [];
const keys = {
  async lookupKey(loc: string) { seen.push(loc); return { proverKey: await zk.getProverKey(loc as never), verifierKey: await zk.getVerifierKey(loc as never), ir: await zk.getZKIR(loc as never) }; },
  async getParams(k: number) { seen.push(`params k=${k}`); const dir = join(import.meta.dirname, "..", ".params"), f = join(dir, `bls_midnight_2p${k}`); if (!existsSync(f)) { mkdirSync(dir, { recursive: true }); writeFileSync(f, new Uint8Array(await (await fetch(`https://srs.midnight.network/bls_midnight_2p${k}`)).arrayBuffer())); } return new Uint8Array(readFileSync(f)); },
};
const t0 = Date.now();
const proven = await createProofProvider(zkir.provingProvider(keys) as never).proveTx(unproven);
console.log(`PROVEN in ${((Date.now() - t0) / 1000).toFixed(1)} s · key lookups: ${seen.join(", ")} · ${proven.serialize().length} bytes`);
