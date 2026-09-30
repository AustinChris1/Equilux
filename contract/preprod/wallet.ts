/**
 * The deploy wallet on Midnight's public preprod testnet.
 *
 * Built on the release-candidate wallet SDK (facade 5.0.0-rc.0), the first line
 * that syncs today's preprod (node 1.0, ledger-v8). The seed lives in `.seed`
 * and the synced state in `.state/`, both local and gitignored: preprod runs
 * ledger-v8, where the dust wallet can only sync by replaying every dust event,
 * so the first sync takes hours and every later start resumes from `.state/`.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { WebSocket } from "ws";
import { WalletFacade, WalletEntrySchema } from "@midnight-ntwrk/wallet-sdk-facade";
import { ShieldedWallet } from "@midnight-ntwrk/wallet-sdk-shielded";
import { UnshieldedWallet, PublicKey, createKeystore } from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import { DustWallet } from "@midnight-ntwrk/wallet-sdk-dust-wallet";
import { InMemoryTransactionHistoryStorage } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { WalletSeeds } from "@midnight-ntwrk/wallet-sdk-hd";

// @ts-expect-error node global for the indexer subscriptions
globalThis.WebSocket = WebSocket;

export const PREPROD = {
  networkId: "preprod",
  indexer: "https://indexer.preprod.midnight.network/api/v4/graphql",
  indexerWS: "wss://indexer.preprod.midnight.network/api/v4/graphql/ws",
  node: "wss://rpc.preprod.midnight.network",
  proofServer: process.env.PROOF_SERVER ?? "http://127.0.0.1:6300",
  faucet: "https://faucet.preprod.midnight.network",
};

const DIR = import.meta.dirname;
const SEED_FILE = join(DIR, ".seed");
const STATE_DIR = join(DIR, ".state");

/** The deploy wallet's master seed, created once. */
export function loadSeed(): Uint8Array {
  if (!existsSync(SEED_FILE)) writeFileSync(SEED_FILE, randomBytes(32).toString("hex"), { mode: 0o600 });
  return new Uint8Array(Buffer.from(readFileSync(SEED_FILE, "utf8").trim(), "hex"));
}

export function deriveWallet(seed = loadSeed()) {
  const seeds = WalletSeeds.fromMasterSeed(seed);
  const keystore = createKeystore({ kind: "schnorr", secret: seeds.unshielded } as never, PREPROD.networkId as never);
  return { seeds, keystore, address: keystore.getBech32Address().toString() };
}

const statePath = (k: string) => join(STATE_DIR, `${k}.json`);
const saved = (k: string) => (existsSync(statePath(k)) ? readFileSync(statePath(k), "utf8") : null);

/** Builds the facade, resuming from `.state/` when a previous sync saved one. */
export async function openWallet(log: (m: string) => void = console.log) {
  const { seeds, keystore, address } = deriveWallet();
  const configuration = {
    networkId: PREPROD.networkId,
    indexerClientConnection: { indexerHttpUrl: PREPROD.indexer, indexerWsUrl: PREPROD.indexerWS },
    provingServerUrl: new URL(PREPROD.proofServer),
    relayURL: new URL(PREPROD.node),
    txHistoryStorage: new InMemoryTransactionHistoryStorage(WalletEntrySchema as never),
    costParameters: { additionalFeeOverhead: 300_000_000_000_000n, feeBlocksMargin: 5 },
  };
  const [sh, un, du] = [saved("shielded"), saved("unshielded"), saved("dust")];
  log(sh && un && du ? "resuming from saved wallet state" : "no saved state: first sync from genesis (the dust replay takes hours)");
  const facade = await WalletFacade.init({
    configuration: configuration as never,
    shielded: (c: any) => (sh ? ShieldedWallet(c).restore(sh) : ShieldedWallet(c).startWithSeed(seeds.shielded)),
    unshielded: (c: any) => (un ? UnshieldedWallet(c).restore(un) : UnshieldedWallet(c).startWithPublicKey(PublicKey.fromKeyStore(keystore))),
    dust: (c: any) => (du ? DustWallet(c).restore(du) : DustWallet(c).startWithSeed(seeds.dust)),
  } as never);
  if (sh && un && du) {
    // A restored wallet may still be on the ledger-v8 variant, which facade.start's
    // v9-only key objects cannot serve; the seed answers for either side.
    const f = facade as any;
    await Promise.all([f.shielded.startWithSeed(seeds.shielded), f.unshielded.start(), f.dust.startWithSeed(seeds.dust), f.pendingTransactionsService.start()]);
  } else {
    await facade.start(seeds);
  }

  const persist = async () => {
    mkdirSync(STATE_DIR, { recursive: true });
    const [a, b, c] = await Promise.all([facade.shielded.serializeState(), facade.unshielded.serializeState(), facade.dust.serializeState()]);
    writeFileSync(statePath("shielded"), String(a));
    writeFileSync(statePath("unshielded"), String(b));
    writeFileSync(statePath("dust"), String(c));
  };
  return { facade, keystore, address, seeds, persist };
}
