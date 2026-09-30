/**
 * Equilux API — exposes the deployed v2 contract on a Midnight network to the
 * web workspace and to HRIS / payroll integrations. Every write goes through
 * the real circuits and the proof server; every read comes from the indexer.
 * Circuit assertions surface with the circuit's own message.
 *
 *   pnpm network:up && pnpm app:server      → http://127.0.0.1:8787
 *
 * Integration surface (what a Personio / DATEV / Workday plugin calls):
 *   POST /api/deploy        { employerSecret, providerSecret, councilSecret }
 *   POST /api/roster        { rows: [hex32…] }  — provider: one hiding hash per payroll row
 *   POST /api/confirm       { openings: [{ salary, variable, gender, category, nonce }] } — works council
 *   POST /api/enroll        { salary, variable, gender, category, secret, rowNonce } — employee
 *   POST /api/publish       { payroll: [...], tamper? }          — employer: basic-pay report
 *   POST /api/publish-variable { payroll: [...], tamper? }       — employer: variable pay + quartiles
 *   POST /api/receipt       { commitment }                       — employee
 *   POST /api/import/csv    { csv }        → parsed payroll rows (no chain write)
 *   GET  /api/status · /api/ledger · /api/jobs/:id
 * Writes return 202 { jobId }; poll /api/jobs/:id for the proof + finality log.
 */
import http from "node:http";
import { Buffer } from "node:buffer";
import { createCircuitContext } from "@midnight-ntwrk/compact-runtime";
import { Contract, pureCircuits } from "../build/contract/index.js";
import { connectMidnight, initialPrivateState } from "./client.js";
import { assignBands, buildClaim, buildVariableClaim, padOpenings, padRecords, padRows, type PayRecord, type ReportClaim, type VariableClaim } from "./claims.js";
import { bytes32, witnesses, type EquiluxPrivateState } from "./witnesses.js";
import { parsePayrollCsv } from "./payroll-csv.js";

/**
 * Execute a circuit locally against the LIVE on-chain state before handing it
 * to midnight-js. Assertion failures surface here in milliseconds with the
 * circuit's own message, and a rejected witness never enters the proving /
 * balancing pipeline (which does not recover cleanly from a mid-flight throw).
 */
const localContract = new Contract<EquiluxPrivateState, typeof witnesses>(witnesses);
type CircuitName = "declareRoster" | "confirmPayroll" | "enroll" | "publishReport" | "publishVariablePay" | "checkReceipt";
async function dryRun(circuit: CircuitName, ps: EquiluxPrivateState, ...args: unknown[]) {
  const cs = await mn!.providers.publicDataProvider.queryContractState(contractAddress!);
  if (!cs) throw new Error("contract state not found via indexer");
  const ctx = createCircuitContext(contractAddress!, mn!.providers.walletProvider.getCoinPublicKey(), cs as any, ps);
  return (localContract.impureCircuits as any)[circuit](ctx, ...args); // throws `failed assert: …`
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
let providerSk: Uint8Array | null = null;
let councilSk: Uint8Array | null = null;
let ready = false;

const baseState = () => initialPrivateState(employerSk!, providerSk!, councilSk!);

const circuitMessage = (e: unknown): string => {
  const m = e instanceof Error ? e.message : String(e);
  const idx = m.indexOf("failed assert:");
  return idx >= 0 ? m.slice(idx + "failed assert:".length).trim() : m;
};

const n = (x: unknown) => Number(x);

async function readLedger() {
  if (!mn || !contractAddress) return null;
  const l: any = await mn.readLedger(contractAddress);
  if (!l) return null;
  const rep = l.latestReport;
  return {
    contractAddress,
    rosterDeclared: Boolean(l.rosterDeclared),
    payrollConfirmed: Boolean(l.payrollConfirmed),
    declaredHeadcount: n(l.declaredHeadcount),
    enrolled: n(l.enrolled),
    nullifiers: n(l.nullifiers.size()),
    payrollRows: n(l.payrollRows.size()),
    bound: n(l.bound.size()),
    round: n(l.round),
    employerPk: hex(l.employerPk),
    providerPk: hex(l.providerPk),
    councilPk: hex(l.councilPk),
    latestVariableReport: l.latestVariableReport.is_some ? variableView(l.latestVariableReport.value) : null,
    latestReport: rep.is_some
      ? {
          round: n(rep.value.round),
          headcountWomen: n(rep.value.headcountWomen),
          headcountMen: n(rep.value.headcountMen),
          meanGapBps: n(rep.value.meanGapBps),
          gapFavorsMen: Boolean(rep.value.gapFavorsMen),
          meanGapAtOrAbove5pct: Boolean(rep.value.meanGapAtOrAbove5pct),
          medianGapBps: n(rep.value.medianGapBps),
          medianFavorsMen: Boolean(rep.value.medianFavorsMen),
          categories: (rep.value.categories as any[]).map((c) => ({
            headcountWomen: n(c.headcountWomen),
            headcountMen: n(c.headcountMen),
            disclosed: Boolean(c.disclosed),
            meanWomen: n(c.meanWomen),
            meanMen: n(c.meanMen),
            meanGapBps: n(c.meanGapBps),
            gapFavorsMen: Boolean(c.gapFavorsMen),
            gapAtOrAbove5pct: Boolean(c.gapAtOrAbove5pct),
          })),
        }
      : null,
  };
}

function variableView(v: any) {
  return {
    round: n(v.round),
    headcountWomen: n(v.headcountWomen),
    headcountMen: n(v.headcountMen),
    recipientsWomen: n(v.recipientsWomen),
    recipientsMen: n(v.recipientsMen),
    gapDefined: Boolean(v.gapDefined),
    meanGapBps: n(v.meanGapBps),
    meanFavorsMen: Boolean(v.meanFavorsMen),
    medianGapBps: n(v.medianGapBps),
    medianFavorsMen: Boolean(v.medianFavorsMen),
    quartiles: (v.quartiles as any[]).map((q) => ({ women: n(q.women), men: n(q.men) })),
    categories: (v.categories as any[]).map((c) => ({
      recipientsWomen: n(c.recipientsWomen),
      recipientsMen: n(c.recipientsMen),
      disclosed: Boolean(c.disclosed),
      meanGapBps: n(c.meanGapBps),
      gapFavorsMen: Boolean(c.gapFavorsMen),
    })),
  };
}

function runJob(kind: string, fn: (j: Job & { jlog: (m: string) => void }) => Promise<unknown>): Job {
  const job: Job = { id: Math.random().toString(36).slice(2, 10), kind, status: "running", startedAt: Date.now(), log: [] };
  jobs.set(job.id, job);
  const jlog = (m: string) => { job.log.push(m); log(`[${kind} ${job.id}] ${m}`); };
  (async () => {
    try {
      job.result = await fn(Object.assign(job, { jlog }));
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
const requireDeployed = () => { requireReady(); if (!deployed) throw new Error("No contract deployed yet — deploy from the Employer tab"); };
const isHex32 = (s: string) => /^[0-9a-f]{64}$/.test(s);

type Row = { salary: number | string; variable?: number | string; gender: number; category?: number; secret: string };
const toRecord = (r: Row): PayRecord => ({
  salary: BigInt(r.salary), variable: BigInt(r.variable ?? 0), gender: BigInt(r.gender), category: BigInt(r.category ?? 0), sk: bytes32(String(r.secret)),
});

/** Adversarial edits for the variable-pay report. */
function applyVariableTamper(claim: VariableClaim, tamper: any): VariableClaim {
  if (!tamper) return claim;
  const c = { ...claim, catGapBps: [...claim.catGapBps] };
  if (tamper.meanGapBps != null) c.meanGapBps = BigInt(tamper.meanGapBps);
  if (tamper.medianWomen != null) c.medianWomen = BigInt(tamper.medianWomen);
  return c;
}

/** Adversarial edits used by the workspace's "try to cheat" toggles. */
function applyTamper(claim: ReportClaim, tamper: any): ReportClaim {
  if (!tamper) return claim;
  const c = { ...claim, catMeanWomen: [...claim.catMeanWomen], catMeanMen: [...claim.catMeanMen], catGapBps: [...claim.catGapBps] };
  if (tamper.meanGapBps != null) c.meanGapBps = BigInt(tamper.meanGapBps);
  if (tamper.medianWomen != null) c.medianWomen = BigInt(tamper.medianWomen);
  if (tamper.categoryGap != null) c.catGapBps[Number(tamper.categoryGap.category)] = BigInt(tamper.categoryGap.bps);
  return c;
}

async function handle(method: string, url: URL, body: any): Promise<{ status: number; data: unknown }> {
  const p = url.pathname;

  if (method === "GET" && p === "/api/status") {
    return { status: 200, data: { ready, network: "undeployed (local Midnight standalone)", contractAddress, startupLog: startupLog.slice(-8), ledger: ready && contractAddress ? await readLedger() : null } };
  }
  if (method === "GET" && p === "/api/ledger") { requireDeployed(); return { status: 200, data: await readLedger() }; }
  if (method === "GET" && p.startsWith("/api/jobs/")) {
    const j = jobs.get(p.slice("/api/jobs/".length));
    return j ? { status: 200, data: j } : { status: 404, data: { error: "no such job" } };
  }

  // HRIS export → payroll rows. Pure parsing; nothing touches the chain.
  if (method === "POST" && p === "/api/import/csv") {
    return { status: 200, data: parsePayrollCsv(String(body?.csv ?? "")) };
  }

  if (method === "POST" && p === "/api/deploy") {
    requireReady();
    if (deployed) return { status: 200, data: { contractAddress, alreadyDeployed: true } };
    const eSecret = String(body?.employerSecret ?? "acme:employer-root-secret");
    const pSecret = String(body?.providerSecret ?? "payroll-provider:personio");
    const cSecret = String(body?.councilSecret ?? "works-council:acme");
    const job = runJob("deploy", async (j) => {
      const eSk = bytes32(eSecret), pSk = bytes32(pSecret), cSk = bytes32(cSecret);
      const ePk = pureCircuits.publicKey(eSk), pPk = pureCircuits.publicKey(pSk), cPk = pureCircuits.publicKey(cSk);
      j.jlog(`deploying — employer ${hex(ePk).slice(0, 10)}…, payroll provider ${hex(pPk).slice(0, 10)}…, works council ${hex(cPk).slice(0, 10)}… (proving)`);
      const d: any = await mn!.deploy(ePk, pPk, cPk, initialPrivateState(eSk, pSk, cSk));
      deployed = d; employerSk = eSk; providerSk = pSk; councilSk = cSk;
      contractAddress = d.deployTxData.public.contractAddress;
      j.jlog(`deployed at ${contractAddress} (block ${d.deployTxData.public.blockHeight})`);
      return { contractAddress, txId: d.deployTxData.public.txId, blockHeight: n(d.deployTxData.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/roster") {
    requireDeployed();
    // The provider hashes its payroll rows locally; only the hashes arrive here.
    const hashes = ((body?.rows ?? []) as string[]).map(String);
    if (hashes.length === 0 || hashes.length > 16 || !hashes.every(isHex32)) {
      return { status: 400, data: { error: "rows must be 1–16 payroll-row hashes (32-byte hex)" } };
    }
    const rows = padRows(hashes.map(fromHex));
    const headcount = BigInt(hashes.length);
    const job = runJob("roster", async (j) => {
      await dryRun("declareRoster", baseState(), rows, headcount);
      await mn!.setPrivateState(baseState());
      j.jlog(`local execution ok — proving declareRoster (${headcount} payroll rows)…`);
      const res: any = await deployed.callTx.declareRoster(rows, headcount);
      j.jlog(`${headcount} payroll rows committed by the payroll provider (block ${res.public.blockHeight})`);
      return { headcount: n(headcount), txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/confirm") {
    requireDeployed();
    const raw = (body?.openings ?? []) as { salary: number; variable?: number; gender: number; category: number; nonce: string }[];
    if (raw.length === 0 || raw.length > 16 || !raw.every((o) => isHex32(String(o.nonce)))) {
      return { status: 400, data: { error: "openings must be 1–16 rows, each with a 32-byte hex nonce" } };
    }
    const openings = padOpenings(raw.map((o) => ({ salary: BigInt(o.salary), variable: BigInt(o.variable ?? 0), gender: BigInt(o.gender), category: BigInt(o.category), nonce: fromHex(String(o.nonce)) })));
    const job = runJob("confirm", async (j) => {
      const ps: EquiluxPrivateState = { ...baseState(), openings };
      await dryRun("confirmPayroll", ps);
      await mn!.setPrivateState(ps);
      j.jlog(`local execution ok — proving confirmPayroll (${raw.length} rows opened by the works council)…`);
      const res: any = await deployed.callTx.confirmPayroll();
      j.jlog(`payroll confirmed by the works council (block ${res.public.blockHeight})`);
      return { txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/enroll") {
    requireDeployed();
    const secret = String(body?.secret ?? "");
    const rowNonce = String(body?.rowNonce ?? "");
    if (!secret) return { status: 400, data: { error: "secret required" } };
    if (!isHex32(rowNonce)) return { status: 400, data: { error: "rowNonce (from the payslip) must be 32-byte hex" } };
    const r = toRecord({ salary: body?.salary ?? 0, variable: body?.variable ?? 0, gender: body?.gender ?? 0, category: body?.category ?? 0, secret });
    const job = runJob("enroll", async (j) => {
      const ps: EquiluxPrivateState = { ...baseState(), employeeSecret: r.sk, employeeRecord: [r.salary, r.variable, r.gender, r.category], rowNonce: fromHex(rowNonce) };
      await dryRun("enroll", ps);
      await mn!.setPrivateState(ps);
      j.jlog("local execution ok — proving enroll…");
      const res: any = await deployed.callTx.enroll();
      const cm = hex(res.private.result);
      j.jlog(`enrolled — commitment ${cm.slice(0, 12)}… (block ${res.public.blockHeight})`);
      return { commitment: cm, txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/publish") {
    requireDeployed();
    const rows = (body?.payroll ?? []) as Row[];
    if (rows.length === 0 || rows.length > 16) return { status: 400, data: { error: "payroll must have 1–16 records" } };
    const recs = rows.map(toRecord);
    const claim = applyTamper(buildClaim(recs), body?.tamper);
    const job = runJob("publish", async (j) => {
      const ps: EquiluxPrivateState = { ...baseState(), payroll: padRecords(recs), claim };
      j.jlog(`checking the witness against on-chain state (${recs.length} record(s), mean gap claim ${n(claim.meanGapBps) / 100}%)…`);
      await dryRun("publishReport", ps);
      await mn!.setPrivateState(ps);
      j.jlog("local execution ok — proving publishReport…");
      const res: any = await deployed.callTx.publishReport();
      j.jlog(`published (block ${res.public.blockHeight})`);
      return { txId: res.public.txId, blockHeight: n(res.public.blockHeight), ledger: await readLedger() };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/publish-variable") {
    requireDeployed();
    const rows = (body?.payroll ?? []) as Row[];
    if (rows.length === 0 || rows.length > 16) return { status: 400, data: { error: "payroll must have 1–16 records" } };
    const recs = rows.map(toRecord);
    const bands = assignBands(recs);
    if (body?.tamper?.swapBands) {
      const top = bands.indexOf(3n), bottom = bands.indexOf(0n);
      if (top >= 0 && bottom >= 0) [bands[top], bands[bottom]] = [bands[bottom], bands[top]];
    }
    const claim = applyVariableTamper(buildVariableClaim(recs), body?.tamper);
    const job = runJob("publish-variable", async (j) => {
      const ps: EquiluxPrivateState = { ...baseState(), payroll: padRecords(recs, bands), variableClaim: claim };
      j.jlog(`checking the variable-pay witness against on-chain state (${recs.length} record(s))…`);
      await dryRun("publishVariablePay", ps);
      await mn!.setPrivateState(ps);
      j.jlog("local execution ok — proving publishVariablePay…");
      const res: any = await deployed.callTx.publishVariablePay();
      j.jlog(`variable-pay report published (block ${res.public.blockHeight})`);
      return { txId: res.public.txId, blockHeight: n(res.public.blockHeight), ledger: await readLedger() };
    });
    return { status: 202, data: { jobId: job.id } };
  }

  if (method === "POST" && p === "/api/receipt") {
    requireDeployed();
    const cm = String(body?.commitment ?? "");
    if (!isHex32(cm)) return { status: 400, data: { error: "commitment must be 32-byte hex" } };
    const job = runJob("receipt", async (j) => {
      const l: any = await mn!.readLedger(contractAddress!);
      const path = l?.commitments.findPathForLeaf(fromHex(cm));
      if (!path) throw new Error("commitment is not in the on-chain tree");
      await dryRun("checkReceipt", baseState(), path);
      await mn!.setPrivateState(baseState());
      j.jlog("local execution ok — proving checkReceipt (Merkle inclusion)…");
      const res: any = await deployed.callTx.checkReceipt(path);
      const ok = Boolean(res.private.result);
      j.jlog(`receipt verified on-chain: ${ok} (block ${res.public.blockHeight})`);
      return { included: ok, txId: res.public.txId, blockHeight: n(res.public.blockHeight) };
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

const HOST = process.env.HOST ?? "0.0.0.0";
server.listen(PORT, HOST, async () => {
  log(`API listening on http://${HOST === "0.0.0.0" ? "127.0.0.1" : HOST}:${PORT}`);
  try {
    mn = await connectMidnight(log);
    ready = true;
    log("ready — open the workspace on the site");
  } catch (e) {
    log(`FAILED to connect to the local network: ${e instanceof Error ? e.message : e}`);
  }
});
