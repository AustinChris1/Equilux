/**
 * Shared Midnight connection for the local network: genesis wallet, providers,
 * compiled contract. Used by the API server (server.ts). The CLI demo
 * (standalone-demo.ts) keeps its own inline copy so it stays a single file.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import { WebSocket } from "ws";
import * as Rx from "rxjs";
import * as ledgerSdk from "@midnight-ntwrk/ledger-v8";
import { unshieldedToken } from "@midnight-ntwrk/ledger-v8";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId, getNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import type { MidnightProvider, WalletProvider } from "@midnight-ntwrk/midnight-js/types";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { WalletFacade } from "@midnight-ntwrk/wallet-sdk-facade";
import { DustWallet } from "@midnight-ntwrk/wallet-sdk-dust-wallet";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { ShieldedWallet } from "@midnight-ntwrk/wallet-sdk-shielded";
import {
  createKeystore,
  InMemoryTransactionHistoryStorage,
  PublicKey,
  UnshieldedWallet,
  type UnshieldedKeystore,
} from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import { Contract, ledger } from "../build/contract/index.js";
import { initialPrivateState, witnesses, type EquiluxPrivateState } from "./witnesses.js";

// @ts-expect-error node global for GraphQL subscriptions
globalThis.WebSocket = WebSocket;

setNetworkId("undeployed");

export const config = {
  indexer: process.env.MN_INDEXER ?? "http://127.0.0.1:8088/api/v3/graphql",
  indexerWS: process.env.MN_INDEXER_WS ?? "ws://127.0.0.1:8088/api/v3/graphql/ws",
  node: process.env.MN_NODE ?? "http://127.0.0.1:9944",
  proofServer: process.env.MN_PROOF_SERVER ?? "http://127.0.0.1:6300",
};

const GENESIS_MINT_WALLET_SEED = "0000000000000000000000000000000000000000000000000000000000000001";
export const PRIVATE_STATE_ID = "equiluxPrivateState";

export type Log = (msg: string) => void;

const deriveKeysFromSeed = (seed: string) => {
  const hd = HDWallet.fromSeed(Buffer.from(seed, "hex"));
  if (hd.type !== "seedOk") throw new Error("bad seed");
  const res = hd.hdWallet.selectAccount(0).selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust]).deriveKeysAt(0);
  if (res.type !== "keysDerived") throw new Error("key derivation failed");
  hd.hdWallet.clear();
  return res.keys;
};

const signTransactionIntents = (
  tx: { intents?: Map<number, any> },
  signFn: (payload: Uint8Array) => ledgerSdk.Signature,
  proofMarker: "proof" | "pre-proof",
): void => {
  if (!tx.intents || tx.intents.size === 0) return;
  for (const segment of tx.intents.keys()) {
    const intent = tx.intents.get(segment);
    if (!intent) continue;
    const cloned = ledgerSdk.Intent.deserialize<ledgerSdk.SignatureEnabled, ledgerSdk.Proofish, ledgerSdk.PreBinding>(
      "signature", proofMarker, "pre-binding", intent.serialize(),
    );
    const signature = signFn(cloned.signatureData(segment));
    if (cloned.fallibleUnshieldedOffer) {
      const sigs = cloned.fallibleUnshieldedOffer.inputs.map(
        (_: ledgerSdk.UtxoSpend, i: number) => cloned.fallibleUnshieldedOffer!.signatures.at(i) ?? signature,
      );
      cloned.fallibleUnshieldedOffer = cloned.fallibleUnshieldedOffer.addSignatures(sigs);
    }
    if (cloned.guaranteedUnshieldedOffer) {
      const sigs = cloned.guaranteedUnshieldedOffer.inputs.map(
        (_: ledgerSdk.UtxoSpend, i: number) => cloned.guaranteedUnshieldedOffer!.signatures.at(i) ?? signature,
      );
      cloned.guaranteedUnshieldedOffer = cloned.guaranteedUnshieldedOffer.addSignatures(sigs);
    }
    tx.intents.set(segment, cloned);
  }
};

async function buildWallet(log: Log) {
  const keys = deriveKeysFromSeed(GENESIS_MINT_WALLET_SEED);
  const shieldedSecretKeys = ledgerSdk.ZswapSecretKeys.fromSeed(keys[Roles.Zswap]);
  const dustSecretKey = ledgerSdk.DustSecretKey.fromSeed(keys[Roles.Dust]);
  const unshieldedKeystore = createKeystore(keys[Roles.NightExternal], getNetworkId());
  const walletConfig = {
    networkId: getNetworkId(),
    indexerClientConnection: { indexerHttpUrl: config.indexer, indexerWsUrl: config.indexerWS },
    provingServerUrl: new URL(config.proofServer),
    relayURL: new URL(config.node.replace(/^http/, "ws")),
    txHistoryStorage: new InMemoryTransactionHistoryStorage(),
    costParameters: { additionalFeeOverhead: 300_000_000_000_000n, feeBlocksMargin: 5 },
  };
  const wallet = await WalletFacade.init({
    configuration: walletConfig as never,
    shielded: (cfg: never) => ShieldedWallet(cfg).startWithSecretKeys(shieldedSecretKeys),
    unshielded: (cfg: never) => UnshieldedWallet(cfg).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore)),
    dust: (cfg: never) => DustWallet(cfg).startWithSecretKey(dustSecretKey, ledgerSdk.LedgerParameters.initialParameters().dust),
  });
  await wallet.start(shieldedSecretKeys, dustSecretKey);
  log("syncing wallet with the local network…");
  const synced: any = await Rx.firstValueFrom(wallet.state().pipe(Rx.filter((s: any) => s.isSynced)));
  const balance = synced.unshielded.balances[unshieldedToken().raw] ?? 0n;
  log(`wallet synced — ${balance.toLocaleString()} NIGHT`);
  await registerForDust(wallet, unshieldedKeystore, log);
  return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
}

async function registerForDust(wallet: WalletFacade, keystore: UnshieldedKeystore, log: Log) {
  const state: any = await Rx.firstValueFrom(wallet.state().pipe(Rx.filter((s: any) => s.isSynced)));
  if (state.dust.availableCoins.length > 0 && state.dust.balance(new Date()) > 0n) {
    log("dust (fee token) available");
    return;
  }
  const utxos = state.unshielded.availableCoins.filter((c: any) => c.meta?.registeredForDustGeneration !== true);
  if (utxos.length > 0) {
    log(`registering ${utxos.length} NIGHT UTXO(s) for dust generation…`);
    const recipe = await wallet.registerNightUtxosForDustGeneration(
      utxos, keystore.getPublicKey(), (payload: Uint8Array) => keystore.signData(payload),
    );
    await wallet.submitTransaction(await wallet.finalizeRecipe(recipe));
  }
  log("waiting for dust to accrue…");
  await Rx.firstValueFrom(wallet.state().pipe(
    Rx.throttleTime(5_000),
    Rx.filter((s: any) => s.isSynced && s.dust.balance(new Date()) > 0n),
  ));
  log("dust ready");
}

export async function connectMidnight(log: Log) {
  const ctx = await buildWallet(log);
  const state: any = await Rx.firstValueFrom(ctx.wallet.state().pipe(Rx.filter((s: any) => s.isSynced)));
  const walletAndMidnightProvider: WalletProvider & MidnightProvider = {
    getCoinPublicKey: () => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => state.shielded.encryptionPublicKey.toHexString(),
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await ctx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: ctx.shieldedSecretKeys, dustSecretKey: ctx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      const signFn = (payload: Uint8Array) => ctx.unshieldedKeystore.signData(payload);
      signTransactionIntents(recipe.baseTransaction, signFn, "proof");
      if (recipe.balancingTransaction) signTransactionIntents(recipe.balancingTransaction, signFn, "pre-proof");
      return ctx.wallet.finalizeRecipe(recipe);
    },
    submitTx: (tx: any) => ctx.wallet.submitTransaction(tx) as any,
  };

  const here = path.resolve(fileURLToPath(import.meta.url), "..");
  const buildDir = path.resolve(here, "..", "build");
  const zkConfigProvider = new NodeZkConfigProvider<"enroll" | "attest" | "checkReceipt" | "publishReport">(buildDir);
  const accountId = walletAndMidnightProvider.getCoinPublicKey();
  const storagePassword = `${Buffer.from(accountId, "hex").toString("base64")}!`;
  const providers = {
    privateStateProvider: levelPrivateStateProvider<typeof PRIVATE_STATE_ID>({
      privateStateStoreName: "equilux-private-state",
      accountId,
      privateStoragePasswordProvider: () => storagePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };

  const compiledContract = CompiledContract.make("equilux", Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(buildDir),
  );

  return {
    providers,
    async deploy(employerPk: Uint8Array, initial: EquiluxPrivateState) {
      return deployContract(providers as any, {
        compiledContract,
        args: [employerPk],
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: initial,
      } as any);
    },
    async join(contractAddress: string, initial: EquiluxPrivateState) {
      return findDeployedContract(providers as any, {
        contractAddress,
        compiledContract,
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: initial,
      } as any);
    },
    async setPrivateState(ps: EquiluxPrivateState) {
      await providers.privateStateProvider.set(PRIVATE_STATE_ID, ps);
    },
    async readLedger(contractAddress: string) {
      const cs = await providers.publicDataProvider.queryContractState(contractAddress);
      return cs ? ledger(cs.data) : null;
    },
  };
}

export { initialPrivateState };
