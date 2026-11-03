/**
 * Walletless enrollment from the page: runs the employee's proof in a worker (walletless.worker.ts).
 * The secret is made here, in the employee's browser, and kept only here: whoever sponsors the fee
 * receives a proven transaction, never the secret, so nobody else can confirm a record for them.
 */
import type { EnrollMessage, EnrollRequest } from "./walletless.worker";
import { INDEXERS } from "./chain-read";

export const KEYS_URL = "https://austinchris1.github.io/Equilux";

export interface Proven { tx: string; commitment: string; seconds: number }
export type ProveStep = Extract<EnrollMessage, { kind: "step" }>["step"];

/** A fresh 32-byte secret, from the browser's cryptographic random source. */
export const newSecret = () => crypto.getRandomValues(new Uint8Array(32));

export function proveEnrollment(contract: string, record: EnrollRequest["record"], nonce: Uint8Array, secret: Uint8Array, onStep: (s: ProveStep) => void): Promise<Proven> {
  const worker = new Worker(new URL("./walletless.worker.ts", import.meta.url), { type: "module" });
  const indexer = new URL(INDEXERS.preprod.url, location.href).href;
  return new Promise((resolve, reject) => {
    worker.onmessage = (e: MessageEvent<EnrollMessage>) => {
      const m = e.data;
      if (m.kind === "step") onStep(m.step);
      else { worker.terminate(); m.kind === "done" ? resolve(m) : reject(new Error(m.message)); }
    };
    worker.onerror = (e) => { worker.terminate(); reject(new Error(e.message || "the proving worker failed")); };
    const req: EnrollRequest = { contract, record, nonce: [...nonce], secret: [...secret], indexer, keysUrl: KEYS_URL };
    worker.postMessage(req);
  });
}
