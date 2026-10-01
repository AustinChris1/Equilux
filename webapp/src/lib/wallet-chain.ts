/**
 * The workspace on Midnight's preprod testnet, written through the visitor's
 * own wallet (Lace, 1AM, or any wallet with the Midnight DApp connector).
 *
 * The same steps as the local API server (contract/deploy/server.ts), answered
 * in the page: the circuit runs here, the proof is made by the wallet's prover
 * (in-browser for 1AM) or by the proof server on this computer (Lace), and the
 * wallet pays the fee, signs and submits. The proving keys come from GitHub
 * Pages (.github/workflows/keys.yml). Loaded only when a visitor connects.
 */
import type { ConnectedAPI } from "@midnight-ntwrk/dapp-connector-api";
import { createCircuitContext } from "@midnight-ntwrk/compact-runtime";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { CostModel, Transaction, type FinalizedTransaction } from "@midnight-ntwrk/ledger-v8";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js/contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js/network-id";
import type { MidnightProvider, PrivateStateProvider, ProofProvider, WalletProvider } from "@midnight-ntwrk/midnight-js/types";
import { dappConnectorProofProvider } from "@midnight-ntwrk/midnight-js-dapp-connector-proof-provider";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { Contract, ledger, pureCircuits } from "../../../contract/build/contract/index.js";
import { assignBands, buildClaim, buildVariableClaim, padOpenings, padRecords, padRows, type PayRecord, type ReportClaim, type VariableClaim } from "../../../contract/deploy/claims";
import { bytes32, initialPrivateState, witnesses, type EquiluxPrivateState } from "../../../contract/deploy/witnesses";
import { ledgerView } from "./browser-contract";
import type { LedgerView, Tamper, VariableTamper } from "./api";
import type { WalletChoice } from "./wallet-detect";

export const KEYS_URL = "https://austinchris1.github.io/Equilux";
export const LOCAL_PROOF_SERVER = "http://localhost:6300";
export const PROOF_SERVER_CMD = "docker run -p 6300:6300 midnightntwrk/proof-server:8.0.3 midnight-proof-server -v";
const NETWORK = "preprod";
const STORAGE = "equilux.wallet-chain.v1";
const PRIVATE_STATE_ID = "equiluxPrivateState";

type Circuit = "declareRoster" | "confirmPayroll" | "enroll" | "checkReceipt" | "publishReport" | "publishVariablePay";
type Log = (lines: string[]) => void;

const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
const fromHex = (h: string) => new Uint8Array((h.match(/../g) ?? []).map((x) => parseInt(x, 16)));
const isHex32 = (s: string) => /^[0-9a-f]{64}$/.test(s);

/** Bech32m → raw bytes (the wallet hands out keys as Bech32m; midnight-js wants hex). */
function bech32Bytes(s: string): Uint8Array {
  const CH = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
  const sep = s.lastIndexOf("1");
  const words = [...s.slice(sep + 1, -6).toLowerCase()].map((c) => {
    const v = CH.indexOf(c);
    if (v < 0) throw new Error(`not a Bech32m string: ${s.slice(0, 24)}…`);
    return v;
  });
  const out: number[] = [];
  let acc = 0, bits = 0;
  for (const w of words) {
    acc = (acc << 5) | w; bits += 5;
    while (bits >= 8) { bits -= 8; out.push((acc >> bits) & 0xff); }
  }
  return new Uint8Array(out);
}

/** Private state lives only in this tab; each step sets exactly what its circuit needs. */
function memoryPrivateState(): PrivateStateProvider<typeof PRIVATE_STATE_ID, EquiluxPrivateState> {
  const states = new Map<string, EquiluxPrivateState>();
  const keys = new Map<string, unknown>();
  const unsupported = () => Promise.reject(new Error("not supported in the browser workspace"));
  return {
    setContractAddress() {},
    set: async (id, s) => { states.set(id, s); },
    get: async (id) => states.get(id) ?? null,
    remove: async (id) => { states.delete(id); },
    clear: async () => { states.clear(); },
    setSigningKey: async (a, k) => { keys.set(a, k); },
    getSigningKey: async (a) => (keys.get(a) as never) ?? null,
    removeSigningKey: async (a) => { keys.delete(a); },
    clearSigningKeys: async () => { keys.clear(); },
    exportPrivateStates: unsupported,
    importPrivateStates: unsupported,
    exportSigningKeys: unsupported,
    importSigningKeys: unsupported,
  } as PrivateStateProvider<typeof PRIVATE_STATE_ID, EquiluxPrivateState>;
}

const circuitMessage = (e: unknown): string => {
  const m = e instanceof Error ? e.message : String(e);
  const idx = m.indexOf("failed assert:");
  return idx >= 0 ? m.slice(idx + "failed assert:".length).trim() : m;
};

interface Saved { address: string; employerSecret: string; providerSecret: string; councilSecret: string }
const loadSaved = (): Saved | null => { try { return JSON.parse(localStorage.getItem(STORAGE) ?? "null"); } catch { return null; } };
const save = (s: Saved | null) => { try { s ? localStorage.setItem(STORAGE, JSON.stringify(s)) : localStorage.removeItem(STORAGE); } catch { /* ignore */ } };

type Row = { salary: number; variable?: number; gender: number; category?: number; secret: string };
const toRecord = (r: Row): PayRecord => ({
  salary: BigInt(r.salary), variable: BigInt(r.variable ?? 0), gender: BigInt(r.gender), category: BigInt(r.category ?? 0), sk: bytes32(String(r.secret)),
});

function applyTamper(claim: ReportClaim, tamper?: Tamper): ReportClaim {
  if (!tamper) return claim;
  const c = { ...claim, catMeanWomen: [...claim.catMeanWomen], catMeanMen: [...claim.catMeanMen], catGapBps: [...claim.catGapBps] };
  if (tamper.meanGapBps != null) c.meanGapBps = BigInt(tamper.meanGapBps);
  if (tamper.medianWomen != null) c.medianWomen = BigInt(tamper.medianWomen);
  if (tamper.categoryGap != null) c.catGapBps[Number(tamper.categoryGap.category)] = BigInt(tamper.categoryGap.bps);
  return c;
}
function applyVariableTamper(claim: VariableClaim, tamper?: VariableTamper): VariableClaim {
  if (!tamper) return claim;
  const c = { ...claim, catGapBps: [...claim.catGapBps] };
  if (tamper.meanGapBps != null) c.meanGapBps = BigInt(tamper.meanGapBps);
  if (tamper.medianWomen != null) c.medianWomen = BigInt(tamper.medianWomen);
  return c;
}

export interface WalletSession {
  walletName: string;
  prover: "wallet" | "local";
  address: string | null;
  run<T = unknown>(path: string, body: any, log: Log): Promise<T>;
  readLedger(): Promise<LedgerView | null>;
  forget(): void;
}

/** Connect to a wallet on preprod and wire midnight-js to it. */
export async function connectWallet(choice: WalletChoice, log: Log): Promise<WalletSession> {
  const initial = window.midnight?.[choice.key];
  if (!initial) throw new Error(`${choice.name} is no longer available in this page`);
  log([`asking ${choice.name} to connect to Midnight ${NETWORK}…`]);
  let api: ConnectedAPI;
  try {
    api = await initial.connect(NETWORK);
  } catch (e) {
    throw new Error(`${choice.name} did not connect: ${e instanceof Error ? e.message : e}. In the wallet, switch the network to Preprod and approve the connection.`);
  }
  const status = await api.getConnectionStatus().catch(() => null);
  if (status && status.status === "connected" && status.networkId !== NETWORK) {
    throw new Error(`${choice.name} is on "${status.networkId}". Switch it to Preprod, then connect again.`);
  }
  setNetworkId(NETWORK);
  const config = await api.getConfiguration();
  const keys = await api.getShieldedAddresses();
  const coinPk = toHex(bech32Bytes(keys.shieldedCoinPublicKey));
  const encPk = toHex(bech32Bytes(keys.shieldedEncryptionPublicKey));
  if (coinPk.length !== 64 || encPk.length !== 64) throw new Error(`unexpected key format from the wallet (${keys.shieldedCoinPublicKey.slice(0, 24)}…)`);
  const dust = await api.getDustBalance().catch(() => null);
  log([
    `connected · indexer ${new URL(config.indexerUri).host}`,
    dust ? `fee balance: ${dust.balance.toLocaleString()} DUST (cap ${dust.cap.toLocaleString()})` : "fee balance: unknown",
  ]);
  if (dust && dust.balance === 0n) log(["⚠ no DUST yet: in the wallet, make sure your tNIGHT is generating DUST, then wait a few minutes"]);

  const zk = new FetchZkConfigProvider<Circuit>(KEYS_URL, fetch.bind(window));

  // Proving: the wallet's own prover when it has one (1AM), else the proof server on this computer (Lace).
  let proofProvider: ProofProvider;
  let prover: WalletSession["prover"] = "local";
  try {
    if (typeof api.getProvingProvider !== "function") throw new Error("no in-wallet prover");
    proofProvider = await dappConnectorProofProvider(api, zk, CostModel.initialCostModel());
    prover = "wallet";
    log([`proofs: made by ${choice.name}`]);
  } catch {
    const uri = (config.proverServerUri || LOCAL_PROOF_SERVER).replace(/\/$/, "");
    const alive = await fetch(`${uri}/health`, { mode: "no-cors" }).then(() => true, () => false);
    if (!alive) {
      throw new Error(`${choice.name} needs a proof server on this computer and none answered at ${uri}. Start Docker, run "${PROOF_SERVER_CMD}", then connect again. If the browser asks to allow access to local devices, allow it.`);
    }
    proofProvider = httpClientProofProvider(uri, zk, { timeout: 15 * 60_000 });
    log([`proofs: made by the proof server at ${uri}`]);
  }

  const timedProof: ProofProvider = {
    async proveTx(tx, cfg) {
      const t0 = Date.now();
      log(["making the zero-knowledge proof (first time: downloads the circuit keys, up to ~80 MB)…"]);
      const out = await proofProvider.proveTx(tx, cfg);
      log([`proof made in ${Math.round((Date.now() - t0) / 1000)} s`]);
      return out;
    },
  };

  const wallet: WalletProvider & MidnightProvider = {
    getCoinPublicKey: () => coinPk as never,
    getEncryptionPublicKey: () => encPk as never,
    async balanceTx(tx) {
      log([`approve the transaction in ${choice.name} (it pays the fee in DUST)…`]);
      const { tx: out } = await api.balanceUnsealedTransaction(toHex(tx.serialize()));
      return Transaction.deserialize("signature", "proof", "binding", fromHex(out)) as FinalizedTransaction;
    },
    async submitTx(tx) {
      await api.submitTransaction(toHex(tx.serialize()));
      const id = tx.identifiers()[0];
      log([`submitted · tx ${id.slice(0, 16)}… · waiting for the block`]);
      return id;
    },
  };

  const providers = {
    privateStateProvider: memoryPrivateState(),
    publicDataProvider: indexerPublicDataProvider(config.indexerUri, config.indexerWsUri, window.WebSocket as never),
    zkConfigProvider: zk,
    proofProvider: timedProof,
    walletProvider: wallet,
    midnightProvider: wallet,
  };

  const compiledContract = CompiledContract.make("equilux", Contract).pipe(
    CompiledContract.withWitnesses(witnesses as never),
    CompiledContract.withCompiledFileAssets(KEYS_URL),
  );
  const localContract = new Contract<EquiluxPrivateState>(witnesses);

  let saved = loadSaved();
  let deployed: any = null;
  let secrets: { e: Uint8Array; p: Uint8Array; c: Uint8Array } | null = null;
  const baseState = () => initialPrivateState(secrets!.e, secrets!.p, secrets!.c);

  if (saved) {
    secrets = { e: bytes32(saved.employerSecret), p: bytes32(saved.providerSecret), c: bytes32(saved.councilSecret) };
    try {
      log([`rejoining your contract ${saved.address.slice(0, 12)}…`]);
      deployed = await findDeployedContract(providers as never, {
        contractAddress: saved.address, compiledContract, privateStateId: PRIVATE_STATE_ID, initialPrivateState: baseState(),
      } as never);
    } catch (e) {
      log([`could not rejoin it (${circuitMessage(e)}); deploy a new one from the Employer tab`]);
      saved = null; secrets = null; save(null);
    }
  }

  const requireDeployed = () => { if (!deployed || !saved) throw new Error("No contract deployed yet: deploy from the Employer tab"); };

  /** Run the circuit locally against live state first: a rejected witness fails in milliseconds, with no fee. */
  async function dryRun(circuit: Circuit, ps: EquiluxPrivateState, ...args: unknown[]) {
    const cs = await providers.publicDataProvider.queryContractState(saved!.address);
    if (!cs) throw new Error("contract state not found via the indexer");
    const ctx = createCircuitContext(saved!.address, coinPk, cs as never, ps);
    (localContract.impureCircuits as any)[circuit](ctx, ...args);
  }

  async function call(circuit: Circuit, ps: EquiluxPrivateState, args: unknown[], log: Log) {
    await dryRun(circuit, ps, ...args);
    await providers.privateStateProvider.set(PRIVATE_STATE_ID, ps);
    log([`circuit ${circuit} ran in this page: assertions passed`]);
    return deployed.callTx[circuit](...args);
  }

  const n = (x: unknown) => Number(x);
  const readLedger = async (): Promise<LedgerView | null> => {
    if (!saved) return null;
    const cs = await providers.publicDataProvider.queryContractState(saved.address);
    return cs ? ledgerView(ledger(cs.data as never), saved.address) : null;
  };

  async function run(path: string, body: any, log: Log): Promise<any> {
    try {
      switch (path) {
        case "/api/deploy": {
          if (deployed && saved) return { contractAddress: saved.address, alreadyDeployed: true };
          const s = { employerSecret: String(body.employerSecret), providerSecret: String(body.providerSecret), councilSecret: String(body.councilSecret) };
          const e = bytes32(s.employerSecret), p = bytes32(s.providerSecret), c = bytes32(s.councilSecret);
          log([`deploying: employer ${toHex(pureCircuits.publicKey(e)).slice(0, 10)}…, payroll provider ${toHex(pureCircuits.publicKey(p)).slice(0, 10)}…, works council ${toHex(pureCircuits.publicKey(c)).slice(0, 10)}…`]);
          const d: any = await deployContract(providers as never, {
            compiledContract, args: [pureCircuits.publicKey(e), pureCircuits.publicKey(p), pureCircuits.publicKey(c)],
            privateStateId: PRIVATE_STATE_ID, initialPrivateState: initialPrivateState(e, p, c),
          } as never);
          deployed = d; secrets = { e, p, c };
          saved = { address: d.deployTxData.public.contractAddress, ...s };
          save(saved);
          log([`deployed at ${saved.address} (block ${d.deployTxData.public.blockHeight})`]);
          return { contractAddress: saved.address, txId: d.deployTxData.public.txId, blockHeight: n(d.deployTxData.public.blockHeight) };
        }
        case "/api/roster": {
          requireDeployed();
          const hashes = (body.rows as string[]).map(String);
          if (hashes.length === 0 || hashes.length > 16 || !hashes.every(isHex32)) throw new Error("rows must be 1–16 payroll-row hashes");
          const rows = padRows(hashes.map(fromHex));
          const headcount = BigInt(hashes.length);
          const res: any = await call("declareRoster", baseState(), [rows, headcount], log);
          log([`${headcount} payroll rows committed by the payroll provider (block ${res.public.blockHeight})`]);
          return { headcount: n(headcount), txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
        }
        case "/api/confirm": {
          requireDeployed();
          const raw = body.openings as { salary: number; variable?: number; gender: number; category: number; nonce: string }[];
          const openings = padOpenings(raw.map((o) => ({ salary: BigInt(o.salary), variable: BigInt(o.variable ?? 0), gender: BigInt(o.gender), category: BigInt(o.category), nonce: fromHex(String(o.nonce)) })));
          const res: any = await call("confirmPayroll", { ...baseState(), openings }, [], log);
          log([`payroll confirmed by the works council (block ${res.public.blockHeight})`]);
          return { txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
        }
        case "/api/enroll": {
          requireDeployed();
          if (!isHex32(String(body.rowNonce))) throw new Error("rowNonce (from the payslip) must be 32-byte hex");
          const r = toRecord(body);
          const ps: EquiluxPrivateState = { ...baseState(), employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(body.rowNonce) };
          const res: any = await call("enroll", ps, [], log);
          const cm = toHex(res.private.result);
          log([`enrolled · commitment ${cm.slice(0, 12)}… (block ${res.public.blockHeight})`]);
          return { commitment: cm, txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
        }
        case "/api/publish": {
          requireDeployed();
          const recs = (body.payroll as Row[]).map(toRecord);
          const claim = applyTamper(buildClaim(recs), body.tamper);
          const res: any = await call("publishReport", { ...baseState(), payroll: padRecords(recs), claim }, [], log);
          log([`report published (block ${res.public.blockHeight})`]);
          return { txId: res.public.txId, blockHeight: n(res.public.blockHeight), ledger: await readLedger() };
        }
        case "/api/publish-variable": {
          requireDeployed();
          const recs = (body.payroll as Row[]).map(toRecord);
          const bands = assignBands(recs);
          if (body.tamper?.swapBands) {
            const top = bands.indexOf(3n), bottom = bands.indexOf(0n);
            if (top >= 0 && bottom >= 0) [bands[top], bands[bottom]] = [bands[bottom], bands[top]];
          }
          const claim = applyVariableTamper(buildVariableClaim(recs), body.tamper);
          const res: any = await call("publishVariablePay", { ...baseState(), payroll: padRecords(recs, bands), variableClaim: claim }, [], log);
          log([`variable-pay report published (block ${res.public.blockHeight})`]);
          return { txId: res.public.txId, blockHeight: n(res.public.blockHeight), ledger: await readLedger() };
        }
        case "/api/receipt": {
          requireDeployed();
          const cs = await providers.publicDataProvider.queryContractState(saved!.address);
          const path = cs ? ledger(cs.data as never).commitments.findPathForLeaf(fromHex(String(body.commitment))) : undefined;
          if (!path) throw new Error("commitment is not in the on-chain tree");
          const res: any = await call("checkReceipt", baseState(), [path], log);
          log([`receipt verified on-chain: ${Boolean(res.private.result)} (block ${res.public.blockHeight})`]);
          return { included: Boolean(res.private.result), txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
        }
        default:
          throw new Error(`unknown step ${path}`);
      }
    } catch (e) {
      throw new Error(circuitMessage(e));
    }
  }

  return {
    walletName: choice.name,
    prover,
    get address() { return saved?.address ?? null; },
    run,
    readLedger,
    forget() { save(null); saved = null; deployed = null; secrets = null; },
  };
}
