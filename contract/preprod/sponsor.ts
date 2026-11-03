/**
 * The sponsor alone: pays the fee for an enrollment that an employee proved in their BROWSER (the /check page's
 * worker), and submits it. Input: the proven transaction as hex (env TX_HEX) and a label (env LABEL). The sponsor
 * never sees a secret: it gets the proven transaction, nothing else. The transaction must be under an hour old.
 *
 *   TX_HEX=… LABEL=w1 npm run sponsor      (in CI: workflow "Preprod v4", mode "sponsor", input tx)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as Rx from "rxjs";
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { ProtocolVersion, WalletTransaction } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { PREPROD, openWallet, redact } from "./wallet.js";

setNetworkId("preprod");
const RECORD = join(import.meta.dirname, "deployment-walletless.json");
const log = (m: string) => console.log(`[sponsor ${new Date().toISOString().slice(11, 19)}] ${redact(m)}`);
const hex = (process.env.TX_HEX ?? "").trim();
const label = (process.env.LABEL ?? "browser").replace(/[^a-z0-9-]/gi, "").slice(0, 20) || "browser";
if (!/^[0-9a-f]+$/i.test(hex)) throw new Error("TX_HEX: the proven transaction, as hex");
const bytes = new Uint8Array(hex.match(/../g)!.map((x) => parseInt(x, 16)));

const { facade, keystore, persist } = await openWallet(log);
let state: any = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
await persist();
const pvRes = await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "{ block { protocolVersion } }" }) });
const pv = ProtocolVersion.ProtocolVersion(BigInt((await pvRes.json()).data.block.protocolVersion));
const publicData = indexerPublicDataProvider(PREPROD.indexer, PREPROD.indexerWS);

let txId: unknown;
for (let attempt = 1; ; attempt++) {
  await new Promise((r) => setTimeout(r, 20_000));
  state = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
  try {
    const tx = WalletTransaction.adopt("Unbound", Transaction.deserialize("signature", "proof", "pre-binding", bytes) as never, pv);
    const recipe = await facade.balanceUnboundTransaction(tx as never, { ttl: new Date(Date.now() + 30 * 60_000) });
    const signed = await facade.signRecipe(recipe, keystore.signDataAsync);
    txId = await facade.submitTransaction((await facade.finalizeRecipe(signed)) as never);
    break;
  } catch (e) {
    log(`attempt ${attempt} refused (${String((e as Error)?.message ?? e).slice(0, 140)})`);
    if (attempt >= 4) throw e;
  }
}
log(`fee paid, submitted tx ${String(txId).slice(0, 16)}…; waiting for the block`);
const fin: any = await publicData.watchForTxData(txId as never);
if (fin.status !== "SucceedEntirely") throw new Error(`refused on chain: ${fin.status}`);
await persist();
const record = existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, "utf8")) : { network: "preprod", steps: [] };
record.steps.push({ step: `enroll:${label}:browser`, txId: fin.txId, txHash: fin.txHash, block: Number(fin.blockHeight), note: "proof made in Chrome by the /check page's worker (zkir-v2 WASM); fee paid by the sponsor wallet" });
writeFileSync(RECORD, JSON.stringify(record, null, 2));
log(`enroll:${label}:browser ✓ block ${fin.blockHeight} · tx ${fin.txId}`);
process.exit(0);
