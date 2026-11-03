/**
 * Walletless enrollment, the employee's side, in a Web Worker so the page stays responsive.
 *
 * Builds the `enroll` transaction against the contract's live public state and proves it with Midnight's
 * WASM prover (zkir-v2): no wallet, no proof server. Inputs: the employee's own record, payslip nonce and
 * secret, which never leave this worker. Output: a proven, unbalanced transaction for a sponsor (the
 * employer's wallet) to pay the fee for and submit. It expires an hour after it is made.
 */
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { createUnprovenCallTxFromInitialStates } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { createProofProvider } from "@midnight-ntwrk/midnight-js/types";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { provingProvider } from "@midnight-ntwrk/zkir-v2";
import { Contract } from "../../../contract/build/contract/index.js";
import { initialPrivateState, witnesses, type EquiluxPrivateState } from "../../../contract/deploy/witnesses";

export interface EnrollRequest {
  contract: string;
  record: { salary: string; variable: string; gender: string; category: string; level: string };
  nonce: number[]; secret: number[];
  indexer: string; keysUrl: string;
}
export type EnrollMessage =
  | { kind: "step"; step: "state" | "build" | "keys" | "prove"; }
  | { kind: "done"; tx: string; commitment: string; seconds: number }
  | { kind: "error"; message: string };

const ZERO = "00".repeat(32);
const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
const post = (m: EnrollMessage) => (self as unknown as Worker).postMessage(m);

self.onmessage = async (e: MessageEvent<EnrollRequest>) => {
  const r = e.data;
  try {
    setNetworkId("preprod");
    post({ kind: "step", step: "state" });
    const publicData = indexerPublicDataProvider(r.indexer, r.indexer.replace(/^http/, "ws"), WebSocket as never);
    const states = await publicData.queryZSwapAndContractState(r.contract as never);
    if (!states) throw new Error("This contract was not found on Midnight preprod.");
    const [zswapChainState, contractState] = states;

    post({ kind: "step", step: "build" });
    const zk = new FetchZkConfigProvider<"enroll">(r.keysUrl, fetch.bind(self));
    const compiledContract = CompiledContract.make("equilux", Contract).pipe(CompiledContract.withWitnesses(witnesses as never), CompiledContract.withCompiledFileAssets(r.keysUrl));
    const nobody = new Uint8Array(32); // the employee holds no employer, provider or council key
    const ps: EquiluxPrivateState = {
      ...initialPrivateState(nobody, nobody, nobody),
      employeeSecret: new Uint8Array(r.secret), rowNonce: new Uint8Array(r.nonce),
      employeeRecord: [BigInt(r.record.salary), BigInt(r.record.variable), BigInt(r.record.gender), BigInt(r.record.category), BigInt(r.record.level)],
    };
    const call: any = await createUnprovenCallTxFromInitialStates(zk as never, {
      compiledContract, circuitId: "enroll", args: [], coinPublicKey: ZERO, initialContractState: contractState,
      initialZswapChainState: zswapChainState, contractAddress: r.contract, initialPrivateState: ps,
    } as never, ZERO);

    post({ kind: "step", step: "keys" });
    const t0 = performance.now();
    const keys = {
      async lookupKey(loc: string) {
        return { proverKey: await zk.getProverKey(loc as never), verifierKey: await zk.getVerifierKey(loc as never), ir: await zk.getZKIR(loc as never) };
      },
      async getParams(k: number) {
        post({ kind: "step", step: "prove" });
        const res = await fetch(`${r.keysUrl}/params/bls_midnight_2p${k}`);
        if (!res.ok) throw new Error(`proving parameters k=${k} not found (${res.status})`);
        return new Uint8Array(await res.arrayBuffer());
      },
    };
    const proven = await createProofProvider(provingProvider(keys) as never).proveTx(call.private.unprovenTx);
    post({ kind: "done", tx: toHex(proven.serialize()), commitment: toHex(call.private.result as Uint8Array), seconds: Math.round((performance.now() - t0) / 1000) });
  } catch (err) {
    const m = err instanceof Error ? err.message : String(err);
    const idx = m.indexOf("failed assert:");
    post({ kind: "error", message: idx >= 0 ? m.slice(idx + "failed assert:".length).trim() : m });
  }
};
