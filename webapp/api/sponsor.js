// The hand-off for walletless enrollment. An employee's browser posts a PROVEN enrollment transaction (never
// the secret it was made with); the employer's app lists what is waiting for its contract, pays the fee from its
// wallet, submits, and reports the outcome here; the employee's page polls for it. A proven transaction expires an
// hour after it is made, so entries live 60 minutes.
import { clientIp, hasStore, json, redis } from "./_store.js";

const HEX = /^[0-9a-f]+$/;
const keyOf = (contract) => `equilux:sponsor:${contract}`;
const okContract = (c) => typeof c === "string" && /^[0-9a-f]{64,70}$/.test(c);

export async function POST(request) {
  if (!hasStore()) return json({ error: "Walletless confirmation is not switched on for this deployment yet." }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ error: "Not JSON." }, 400); }
  if (!okContract(b.contract)) return json({ error: "Unknown contract." }, 400);
  const key = keyOf(b.contract);

  // the sponsor reports an outcome
  if (b.id && b.status) {
    const raw = (await redis(["HGET", key, b.id]))[0];
    if (!raw) return json({ error: "Not found (it may have expired)." }, 404);
    const e = JSON.parse(raw);
    Object.assign(e, { status: b.status === "done" ? "done" : "failed", txId: String(b.txId ?? "").slice(0, 80), block: Number(b.block) || null, error: String(b.error ?? "").slice(0, 300) });
    await redis(["HSET", key, b.id, JSON.stringify(e)]);
    return json({ ok: true });
  }

  // an employee hands over a proven confirmation
  if (typeof b.tx !== "string" || !HEX.test(b.tx) || b.tx.length > 131072) return json({ error: "Not a proven transaction." }, 400);
  const rl = `equilux:rl:sponsor:${clientIp(request)}`;
  const [n] = await redis(["INCR", rl], ["EXPIRE", rl, 3600]);
  if (n > 10) return json({ error: "Too many confirmations from this address; try again in an hour." }, 429);
  const id = crypto.randomUUID();
  const entry = { id, at: Date.now(), tx: b.tx, commitment: String(b.commitment ?? "").slice(0, 64), status: "waiting" };
  await redis(["HSET", key, id, JSON.stringify(entry)], ["EXPIRE", key, 3600], ["SADD", "equilux:sponsor:contracts", b.contract]);
  return json({ id });
}

export async function GET(request) {
  if (!hasStore()) return json({ entries: [], open: false });
  const u = new URL(request.url);
  // the automatic sponsor (.github/workflows/autosponsor.yml) asks for everything waiting, on every contract
  if (u.searchParams.get("waiting") === "all") {
    const contracts = (await redis(["SMEMBERS", "equilux:sponsor:contracts"]))[0] ?? [];
    const entries = [];
    for (const c of contracts) {
      const all = (await redis(["HGETALL", keyOf(c)]))[0] ?? [];
      if (!all.length) { await redis(["SREM", "equilux:sponsor:contracts", c]); continue; } // expired
      for (let i = 1; i < all.length; i += 2) {
        const e = JSON.parse(all[i]);
        if (e.status === "waiting" && Date.now() - e.at < 55 * 60_000) entries.push({ contract: c, ...e });
      }
    }
    entries.sort((a, b) => a.at - b.at);
    return json({ entries, open: true });
  }
  const contract = u.searchParams.get("contract");
  if (!okContract(contract)) return json({ error: "Unknown contract." }, 400);
  const id = u.searchParams.get("id");
  if (id) {
    const raw = (await redis(["HGET", keyOf(contract), id]))[0];
    if (!raw) return json({ status: "expired" });
    const { tx, ...rest } = JSON.parse(raw);
    return json(rest);
  }
  const all = (await redis(["HGETALL", keyOf(contract)]))[0] ?? [];
  const entries = [];
  for (let i = 1; i < all.length; i += 2) {
    const e = JSON.parse(all[i]);
    if (Date.now() - e.at < 55 * 60_000) entries.push(e); // leave a few minutes for the sponsor to submit
  }
  entries.sort((a, b) => a.at - b.at);
  return json({ entries, open: true });
}
