/**
 * The automatic sponsor: walletless enrollment at team scale, with nobody clicking.
 *
 * Every 15 minutes (.github/workflows/autosponsor.yml) this syncs the project's sponsor wallet and pays the
 * network fee for every employee confirmation waiting in the queue (/api/sponsor), then reports each outcome
 * back so the employee's page shows it. Employees never touch a wallet, and nobody has to approve each one.
 *
 * It pays only for genuine Equilux enrollments: the transaction must be exactly one `enroll` call, to a contract
 * whose on-chain `enroll` verifier key is Equilux's published key. The wallet syncs on every run, even when
 * nothing is waiting, so it never falls hours behind (a stale wallet would take longer than a proof stays valid).
 */
import * as Rx from "rxjs";
import { ContractState, Transaction } from "@midnight-ntwrk/ledger-v8";
import { ProtocolVersion, WalletTransaction } from "@midnight-ntwrk/wallet-sdk-abstractions";
import { PREPROD, openWallet, redact } from "./wallet.js";

const SITE = process.env.SITE ?? "https://equilux-lac.vercel.app";
const KEYS = "https://austinchris1.github.io/Equilux/keys";
const MAX_PER_RUN = 20;
const log = (m: string) => console.log(`[autosponsor ${new Date().toISOString().slice(11, 19)}] ${redact(m)}`);
const hex = (h: string) => new Uint8Array(h.match(/../g)!.map((x) => parseInt(x, 16)));
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const gql = async (query: string) => (await (await fetch(PREPROD.indexer, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query }) })).json()) as any;
const report = (contract: string, id: string, body: Record<string, unknown>) =>
  fetch(`${SITE}/api/sponsor`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contract, id, ...body }) }).catch(() => null);

type Entry = { contract: string; id: string; at: number; tx: string };
const queue: Entry[] = ((await (await fetch(`${SITE}/api/sponsor?waiting=all`)).json()) as any).entries ?? [];
log(`${queue.length} confirmation(s) waiting`);

const { facade, keystore, persist } = await openWallet(log);
await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
await persist();
log("wallet synced");
if (!queue.length) process.exit(0);

const pv = ProtocolVersion.ProtocolVersion(BigInt((await gql("{ block { protocolVersion } }")).data.block.protocolVersion));
const equiluxKey = new Uint8Array(await (await fetch(`${KEYS}/enroll.verifier`)).arrayBuffer());
const same = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((x, i) => x === b[i]);
const genuine = new Map<string, boolean>();
async function isEquilux(contract: string) {
  if (!genuine.has(contract)) {
    const r = await gql(`query { contractAction(address: "${contract}") { state } }`);
    const state = r?.data?.contractAction?.state;
    const vk = state ? ContractState.deserialize(hex(state)).operation("enroll")?.verifierKey : undefined;
    genuine.set(contract, !!vk && same(vk, equiluxKey));
  }
  return genuine.get(contract)!;
}

for (const e of queue.slice(0, MAX_PER_RUN)) {
  const tag = `${e.contract.slice(0, 8)}…/${e.id.slice(0, 8)}`;
  try {
    const tx = Transaction.deserialize("signature", "proof", "pre-binding", hex(e.tx));
    const calls = [...(tx.intents?.values() ?? [])].flatMap((i: any) => i.actions);
    const entry = (a: any) => (typeof a.entryPoint === "string" ? a.entryPoint : new TextDecoder().decode(a.entryPoint));
    if (calls.length !== 1 || calls[0].address !== e.contract || entry(calls[0]) !== "enroll") throw new Error("not a single enroll call to this contract");
    if (!(await isEquilux(e.contract))) throw new Error("not an Equilux contract");

    // pay the fee from a freshly synced wallet; a refusal (e.g. a stale DUST snapshot) gets a resync and another try
    let txId = "";
    for (let attempt = 1; ; attempt++) {
      await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s: any) => s.isSynced)));
      try {
        const unbound = WalletTransaction.adopt("Unbound", Transaction.deserialize("signature", "proof", "pre-binding", hex(e.tx)) as never, pv);
        const recipe = await facade.balanceUnboundTransaction(unbound as never, { ttl: new Date(Date.now() + 30 * 60_000) });
        txId = String(await facade.submitTransaction((await facade.finalizeRecipe(await facade.signRecipe(recipe, keystore.signDataAsync))) as never));
        break;
      } catch (err) {
        log(`${tag}: attempt ${attempt} refused (${String((err as Error)?.message ?? err).slice(0, 120)})`);
        if (attempt >= 3) throw err;
        await sleep(20_000);
      }
    }
    // wait for the block
    let block: number | null = null, status = "";
    for (let i = 0; i < 24 && !status; i++) {
      await sleep(5_000);
      const r = await gql(`{ transactions(offset: { identifier: "${txId}" }) { block { height } ... on RegularTransaction { transactionResult { status } } } }`);
      const t = r?.data?.transactions?.[0];
      if (t?.transactionResult?.status) { status = t.transactionResult.status; block = t.block?.height ?? null; }
    }
    if (status !== "SUCCESS") throw new Error(`on chain: ${status || "not seen within 2 minutes"}`);
    await report(e.contract, e.id, { status: "done", txId, block });
    log(`${tag}: paid · block ${block} · tx ${txId.slice(0, 16)}…`);
  } catch (err) {
    const m = String((err as Error)?.message ?? err).slice(0, 200);
    await report(e.contract, e.id, { status: "failed", error: m });
    log(`${tag}: not paid (${m})`);
  }
}
await persist();
process.exit(0);
