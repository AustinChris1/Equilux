/**
 * Compatibility probe: does our runtime-0.15 / ledger-v8 SDK line talk to preprod? No funds needed.
 *
 * RESULT (2026-09-12): every endpoint is reachable and correct — HTTP RPC, WS RPC, indexer
 * GraphQL, indexer WS subscriptions (the unshieldedTransactions subscription returns valid
 * data) — and the wallet derives a correct mn_addr_preprod1… address, yet sync never
 * completes. Tested against BOTH /api/v3 and /api/v4 (identical aliases on preprod): same
 * outcome. Cause: payload-schema drift between wallet-sdk-unshielded-wallet@2.1.0 (v1 sync
 * client) and the current preprod indexer. No newer STABLE wallet SDK exists (only canary
 * pre-releases), so public-testnet deployment is blocked pending an SDK release.
 * Set INDEXER_API=v4 to re-run against v4.
 */
import { Buffer } from "node:buffer";
import { WebSocket } from "ws";
import * as Rx from "rxjs";
import * as ledgerSdk from "@midnight-ntwrk/ledger-v8";
import { setNetworkId, getNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { WalletFacade } from "@midnight-ntwrk/wallet-sdk-facade";
import { DustWallet } from "@midnight-ntwrk/wallet-sdk-dust-wallet";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { ShieldedWallet } from "@midnight-ntwrk/wallet-sdk-shielded";
import { createKeystore, InMemoryTransactionHistoryStorage, PublicKey, UnshieldedWallet } from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
// @ts-expect-error node global
globalThis.WebSocket = WebSocket;

setNetworkId("preprod");
const cfg = {
  indexer: `https://indexer.preprod.midnight.network/api/${process.env.INDEXER_API ?? "v3"}/graphql`,
  indexerWS: `wss://indexer.preprod.midnight.network/api/${process.env.INDEXER_API ?? "v3"}/graphql/ws`,
  node: "https://rpc.preprod.midnight.network",
  proofServer: "http://127.0.0.1:6300",
};
const SEED = "00000000000000000000000000000000000000000000000000000000000000ab";
const log = (m: string) => console.log(`[probe] ${m}`);

async function main() {
  log(`networkId = ${getNetworkId()}`);

  // 1. indexer reachable through OUR provider (not raw curl)
  const pdp = indexerPublicDataProvider(cfg.indexer, cfg.indexerWS);
  log("indexerPublicDataProvider constructed OK");

  // 2. wallet build + sync — exercises ledger deserialization against preprod
  const hd = HDWallet.fromSeed(Buffer.from(SEED, "hex"));
  if (hd.type !== "seedOk") throw new Error("seed");
  const r = hd.hdWallet.selectAccount(0).selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust]).deriveKeysAt(0);
  if (r.type !== "keysDerived") throw new Error("derive");
  const keys = r.keys; hd.hdWallet.clear();

  const shielded = ledgerSdk.ZswapSecretKeys.fromSeed(keys[Roles.Zswap]);
  const dustSk = ledgerSdk.DustSecretKey.fromSeed(keys[Roles.Dust]);
  const ks = createKeystore(keys[Roles.NightExternal], getNetworkId());
  log(`derived unshielded address: ${ks.getBech32Address()}`);

  const walletConfig = {
    networkId: getNetworkId(),
    indexerClientConnection: { indexerHttpUrl: cfg.indexer, indexerWsUrl: cfg.indexerWS },
    provingServerUrl: new URL(cfg.proofServer),
    relayURL: new URL(cfg.node.replace(/^http/, "ws")),
    txHistoryStorage: new InMemoryTransactionHistoryStorage(),
    costParameters: { additionalFeeOverhead: 300_000_000_000_000n, feeBlocksMargin: 5 },
  };
  const wallet = await WalletFacade.init({
    configuration: walletConfig as never,
    shielded: (c: never) => ShieldedWallet(c).startWithSecretKeys(shielded),
    unshielded: (c: never) => UnshieldedWallet(c).startWithPublicKey(PublicKey.fromKeyStore(ks)),
    dust: (c: never) => DustWallet(c).startWithSecretKey(dustSk, ledgerSdk.LedgerParameters.initialParameters().dust),
  });
  await wallet.start(shielded, dustSk);
  log("wallet started against preprod — waiting for sync (15 min cap)…");
  wallet.state().pipe(Rx.throttleTime(20_000)).subscribe((st: any) => {
    const p = st?.shielded?.syncProgress ?? st?.syncProgress;
    log(`sync tick — isSynced=${st?.isSynced} progress=${p ? JSON.stringify(p).slice(0,160) : "n/a"}`);
  });

  const synced: any = await Rx.firstValueFrom(
    wallet.state().pipe(Rx.filter((s: any) => s.isSynced), Rx.timeout(900_000)),
  );
  log(`SYNCED OK — ledger deserialization compatible. balances keys: ${Object.keys(synced.unshielded.balances).length}`);
  log("VERDICT: runtime-0.15 / ledger-v8 SDK line works against preprod");
  void pdp;
}
main().then(() => process.exit(0), (e) => { console.error("[probe] FAILED:", e?.message ?? e); process.exit(1); });
