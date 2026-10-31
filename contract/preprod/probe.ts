/**
 * A short check before the long preprod run, against Blockfrost (Midnight's own preprod indexer and
 * RPC closed on 2026-10-09). Reports, without printing the key:
 *   1. the indexer answers, with preprod's height and protocol version;
 *   2. the node RPC answers;
 *   3. midnight-js's indexer provider reads the Wave 2 contract's state;
 *   4. the wallet SDK syncs: progress after PROBE_MINUTES (default 15) of a fresh sync.
 * Exits 0 only when 1 to 3 pass and the sync moved forward without errors.
 */
import * as Rx from "rxjs";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { PREPROD, openWallet, redact } from "./wallet.js";

setNetworkId("preprod");
const log = (m: string) => console.log(`[probe ${new Date().toISOString().slice(11, 19)}] ${redact(m)}`);
const WAVE2_CONTRACT = "598b346e40e5233c605936b9430a80362773b778918b0a899d9bae025257d1cb";
const MINUTES = Number(process.env.PROBE_MINUTES ?? 15);
const results: Record<string, string> = {};

try {
  const r = await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "{ block { height protocolVersion } }" }) });
  const j: any = await r.json();
  results.indexer = j?.data?.block ? `ok · height ${j.data.block.height} · protocol ${j.data.block.protocolVersion}` : `FAIL ${r.status} ${JSON.stringify(j).slice(0, 200)}`;
} catch (e: any) { results.indexer = `FAIL ${e?.message ?? e}`; }
log(`indexer: ${results.indexer}`);

try {
  const http = PREPROD.node.replace(/^wss:/, "https:");
  const r = await fetch(http, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "system_chain", params: [] }) });
  const j: any = await r.json();
  results.rpc = j?.result ? `ok · ${j.result}` : `FAIL ${r.status}`;
} catch (e: any) { results.rpc = `FAIL ${e?.message ?? e}`; }
log(`rpc: ${results.rpc}`);

try {
  const pdp = indexerPublicDataProvider(PREPROD.indexer, PREPROD.indexerWS);
  const cs: any = await pdp.queryContractState(WAVE2_CONTRACT);
  results.provider = cs ? "ok · the Wave 2 contract's state read through midnight-js" : "FAIL · no state returned";
} catch (e: any) { results.provider = `FAIL ${e?.message ?? e}`; }
log(`midnight-js indexer provider: ${results.provider}`);

const errors: string[] = [];
let first = "", last = "";
try {
  const { facade, address } = await openWallet(log);
  log(`wallet ${address}: syncing for ${MINUTES} minutes`);
  const snap = (s: any) => JSON.stringify({ synced: s?.isSynced, shielded: s?.shielded?.state?.progress ?? s?.shielded?.progress, dust: s?.dust?.state?.progress ?? s?.dust?.progress },
    (_k, v) => (typeof v === "bigint" ? v.toString() : v)).slice(0, 300);
  const sub = facade.state().pipe(Rx.throttleTime(60_000)).subscribe({
    next: (s: any) => { last = snap(s); if (!first) first = last; log(`sync ${last}`); },
    error: (e: any) => errors.push(String(e?.message ?? e)),
  });
  await new Promise((r) => setTimeout(r, MINUTES * 60_000));
  sub.unsubscribe();
} catch (e: any) { errors.push(String(e?.message ?? e)); }
results.wallet = errors.length ? `FAIL ${errors[0].slice(0, 300)}` : first && last && first !== last ? `ok · moving: ${first} → ${last}` : `UNCLEAR · no progress seen (${last})`;
log(`wallet sync: ${results.wallet}`);

const pass = results.indexer.startsWith("ok") && results.rpc.startsWith("ok") && results.provider.startsWith("ok") && results.wallet.startsWith("ok");
log(pass ? "PROBE PASSED: the long run can start" : "PROBE DID NOT PASS: see above");
process.exit(pass ? 0 : 1);
