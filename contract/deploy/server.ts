/**
 * Equilux local API — exposes the deployed contract on a Midnight network to
 * the web workspace. Every write goes through the real circuits and the proof
 * server; every read comes from the indexer. Circuit assertions (an omitted
 * employee, a false gap claim, a duplicate enrollment) surface as HTTP 400
 * with the circuit's own message.
 *
 *   pnpm network:up && pnpm app:server      → http://127.0.0.1:8787
 */
import http from "node:http";
import { Buffer } from "node:buffer";
import { createCircuitContext } from "@midnight-ntwrk/compact-runtime";
import { Contract, pureCircuits } from "../build/contract/index.js";
import { connectMidnight, initialPrivateState } from "./client.js";
import { bytes32, padPayroll, witnesses, type EquiluxPrivateState } from "./witnesses.js";

/**
 * Execute a circuit locally against the LIVE on-chain state before handing it
 * to midnight-js. Assertion failures surface here in milliseconds with the
 * circuit's own message, and a rejected witness never enters the proving /
 * balancing pipeline (which does not recover cleanly from a mid-flight throw).
 */
const localContract = new Contract<EquiluxPrivateState, typeof witnesses>(witnesses);
async function dryRun(circuit: "enroll" | "attest" | "publishReport" | "checkReceipt", ps: EquiluxPrivateState, ...args: unknown[]) {
  const cs = await mn!.providers.publicDataProvider.queryContractState(contractAddress!);
  if (!cs) throw new Error("contract state not found via indexer");
  const ctx = createCircuitContext(contractAddress!, mn!.providers.walletProvider.getCoinPublicKey(), cs as any, ps);
  const fn = (localContract.impureCircuits as any)[circuit];
  return fn(ctx, ...args); // throws `failed assert: …` on a rejected witness
}

const PORT = Number(process.env.PORT ?? 8787);
const hex = (b: Uint8Array) => Buffer.from(b).toString("hex");
const fromHex = (h: string) => new Uint8Array(Buffer.from(h, "hex"));

type Job = { id: string; kind: string; status: "running" | "done" | "error"; startedAt: number; log: string[]; result?: unknown; error?: string };
const jobs = new Map<string, Job>();
const startupLog: string[] = [];
const log = (m: string) => { const line = `${new Date().toISOString().slice(11, 19)} ${m}`; startupLog.push(line); console.log(`[equilux-api] ${m}`); };

let mn: Awaited<ReturnType<typeof connectMidnight>> | null = null;
let deployed: any = null;
let contractAddress: string | null = null;
let employerSk: Uint8Array | null = null;
let ready = false;

const trueGapBps = (rows: { salary: bigint; gender: bigint }[]) => {
  const w = rows.filter((r) => r.gender === 0n), m = rows.filter((r) => r.gender === 1n);
  const sumW = w.reduce((a, r) => a + r.salary, 0n), sumM = m.reduce((a, r) => a + r.salary, 0n);
  const cntW = BigInt(w.length), cntM = BigInt(m.length);
  const favorsMen = sumM * cntW >= sumW * cntM;
  const diff = favorsMen ? sumM * cntW - sumW * cntM : sumW * cntM - sumM * cntW;
  const base = favorsMen ? sumM * cntW : sumW * cntM;
  return base === 0n ? 0n : (diff * 10000n) / base;
};

const circuitMessage = (e: unknown): string => {
  const m = e instanceof Error ? e.message : String(e);
  // compact-runtime wraps assertion failures; surface the human part
  const idx = m.indexOf("failed assert:");
  return idx >= 0 ? m.slice(idx + "failed assert:".length).trim() : m;
};

async function readLedger() {
  if (!mn || !contractAddress) return null;
  const l: any = await mn.readLedger(contractAddress);
  if (!l) return null;
  const rep = l.latestReport;
  return {
    contractAddress,
    enrolled: Number(l.enrolled),
    nullifiers: Number(l.nullifiers.size()),
    attested: Number(l.attested.size()),
    round: Number(l.round),
    employerPk: hex(l.employerPk),
    latestReport: rep.is_some
      ? {
          round: Number(rep.value.round),
          headcountWomen: Number(rep.value.headcountWomen),
          headcountMen: Number(rep.value.headcountMen),
          meanGapBps: Number(rep.value.meanGapBps),
          gapFavorsMen: Boolean(rep.value.gapFavorsMen),
          meanGapAtOrAbove5pct: Boolean(rep.value.meanGapAtOrAbove5pct),
        }
      : null,
  };
}

function runJob(kind: string, fn: (j: Job) => Promise<unknown>): Job {
  const job: Job = { id: Math.random().toString(36).slice(2, 10), kind, status: "running", startedAt: Date.now(), log: [] };
  jobs.set(job.id, job);
  const jlog = (m: string) => { job.log.push(m); log(`[${kind} ${job.id}] ${m}`); };
  (async () => {
    try {
      job.result = await fn(Object.assign(job, { jlog }) as Job & { jlog: typeof jlog });
      job.status = "done";
      jlog("done");
    } catch (e) {
      job.status = "error";
      job.error = circuitMessage(e);
      jlog(`rejected: ${job.error}`);
    }
  })();
  return job;
}

const requireReady = () => { if (!ready || !mn) throw new Error("Midnight connection not ready yet"); };
const requireDeployed = () => { requireReady(); if (!deployed || !employerSk) throw new Error("No contract deployed yet — deploy from the Employer tab"); };

async function handle(method: string, url: URL, body: any): Promise<{ status: number; data: unknown }> {
  const p = url.pathname;

  if (method === "GET" && p === "/api/status") {
    return { status: 200, data: { ready, network: "undeployed (local Midnight standalone)", contractAddress, startupLog: startupLog.slice(-8), ledger: ready && contractAddress ? await readLedger() : null } };
  }
  if (method === "GET" && p === "/api/ledger") {
    requireDeployed();
    return { status: 200, data: await readLedger() };
  }
  if (method === "GET" && p.startsWith("/api/jobs/")) {
    const j = jobs.get(p.slice("/api/jobs/".length));
    return j ? { status: 200, data: j } : { status: 404, data: { error: "no such job" } };
  }

  if (method === "POST" && p === "/api/deploy") {
    requireReady();
    if (deployed) return { status: 200, data: { contractAddress, alreadyDeployed: true } };
    const secret = String(body?.employerSecret ?? "acme:employer-root-secret");
    const job = runJob("deploy", async (j: any) => {
      const sk = bytes32(secret);
      const pk = pureCircuits.publicKey(sk);
      j.jlog(`deploying with employerPk ${hex(pk).slice(0, 12)}… (proving)`);
      const d: any = await mn!.deploy(pk, initialPrivateState(sk));
      deployed = d; employerSk = sk;
      contractAddress = d.deployTxData.public.contractAddress;
      j.jlog(`deployed at ${contractAddress} (block ${d.deployTxData.public.blockHeight})`);
      return { contractAddress, txId: d.deployTxData.public.txId, blockHeight: Number(d.deployTxData.public.blockHeight), employerPk: hex(pk) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/enroll") {
    requireDeployed();
    const salary = BigInt(body?.salary ?? 0), gender = BigInt(body?.gender ?? 0);
    const secret = String(body?.secret ?? "");
    if (!secret) return { status: 400, data: { error: "secret required" } };
    if (salary <= 0n) return { status: 400, data: { error: "salary must be positive" } };
    const job = runJob("enroll", async (j: any) => {
      const ps: EquiluxPrivateState = { ...initialPrivateState(employerSk!), employeeSecret: bytes32(secret), employeeRecord: [salary, gender] };
      await dryRun("enroll", ps);
      await mn!.setPrivateState(ps);
      j.jlog("local execution ok — proving enroll…");
      const res: any = await deployed.callTx.enroll();
      const cm = hex(res.private.result);
      j.jlog(`enrolled — commitment ${cm.slice(0, 12)}… (block ${res.public.blockHeight})`);
      return { commitment: cm, txId: res.public.txId, blockHeight: Number(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/attest") {
    requireDeployed();
    const cm = String(body?.commitment ?? "");
    if (!/^[0-9a-f]{64}$/.test(cm)) return { status: 400, data: { error: "commitment must be 32-byte hex" } };
    const job = runJob("attest", async (j: any) => {
      await dryRun("attest", initialPrivateState(employerSk!), fromHex(cm));
      await mn!.setPrivateState(initialPrivateState(employerSk!));
      j.jlog("local execution ok — proving attest…");
      const res: any = await deployed.callTx.attest(fromHex(cm));
      j.jlog(`attested (block ${res.public.blockHeight})`);
      return { commitment: cm, txId: res.public.txId, blockHeight: Number(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/publish") {
    requireDeployed();
    const rows = (body?.payroll ?? []) as { salary: number | string; gender: number; secret: string }[];
    if (rows.length === 0 || rows.length > 16) return { status: 400, data: { error: "payroll must have 1–16 records" } };
    const recs = rows.map((r) => ({ salary: BigInt(r.salary), gender: BigInt(r.gender), sk: bytes32(String(r.secret)), active: true }));
    const claim = body?.claimedGapBps != null ? BigInt(body.claimedGapBps) : trueGapBps(recs);
    const job = runJob("publish", async (j: any) => {
      const ps: EquiluxPrivateState = { ...initialPrivateState(employerSk!), payroll: padPayroll(recs), claimedGapBps: claim };
      j.jlog(`checking witness against on-chain state (${recs.length} record(s), claim ${Number(claim) / 100}%)…`);
      await dryRun("publishReport", ps);
      await mn!.setPrivateState(ps);
      j.jlog("local execution ok — proving publishReport…");
      const res: any = await deployed.callTx.publishReport();
      j.jlog(`published (block ${res.public.blockHeight})`);
      return { txId: res.public.txId, blockHeight: Number(res.public.blockHeight), claimedGapBps: Number(claim), ledger: await readLedger() };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/receipt") {
    requireDeployed();
    const cm = String(body?.commitment ?? "");
    if (!/^[0-9a-f]{64}$/.test(cm)) return { status: 400, data: { error: "commitment must be 32-byte hex" } };
    const job = runJob("receipt", async (j: any) => {
      const l: any = await mn!.readLedger(contractAddress!);
      const path = l?.commitments.findPathForLeaf(fromHex(cm));
      if (!path) throw new Error("commitment is not in the on-chain tree");
      await dryRun("checkReceipt", initialPrivateState(employerSk!), path);
      await mn!.setPrivateState(initialPrivateState(employerSk!));
      j.jlog("local execution ok — proving checkReceipt (Merkle inclusion)…");
      const res: any = await deployed.callTx.checkReceipt(path);
      const ok = Boolean(res.private.result);
      j.jlog(`receipt verified on-chain: ${ok} (block ${res.public.blockHeight})`);
      return { included: ok, txId: res.public.txId, blockHeight: Number(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  return { status: 404, data: { error: "not found" } };
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  let body: any = null;
  if (req.method === "POST") {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    try { body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}; } catch { body = {}; }
  }
  try {
    const { status, data } = await handle(req.method ?? "GET", url, body);
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify(data, (_k, v) => (typeof v === "bigint" ? Number(v) : v)));
  } catch (e) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: circuitMessage(e) }));
  }
});

server.listen(PORT, "127.0.0.1", async () => {
  log(`API listening on http://127.0.0.1:${PORT}`);
  try {
    mn = await connectMidnight(log);
    ready = true;
    log("ready — open the workspace on the site");
  } catch (e) {
    log(`FAILED to connect to the local network: ${e instanceof Error ? e.message : e}`);
  }
});
