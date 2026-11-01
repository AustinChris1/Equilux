// Anonymous usage counters: what visitors actually do (a story played, an employee check, a pilot request).
// POST {e} adds one to a known counter (and to today's); GET returns the totals. No cookies, no identifiers stored.
import { clientIp, hasStore, json, redis } from "./_store.js";

export const EVENTS = ["story", "story250", "csv", "check", "verify", "wallet"];

export async function POST(request) {
  if (!hasStore()) return json({ ok: false }, 503);
  let b;
  try { b = JSON.parse(await request.text()); } catch { return json({ ok: false }, 400); }
  if (!EVENTS.includes(b?.e)) return json({ ok: false }, 400);
  // at most 30 counted events per address per hour, so a reload loop cannot inflate the figures
  const rl = `rl:ev:${clientIp(request)}`;
  const [n] = await redis(["INCR", rl], ["EXPIRE", rl, 3600]);
  if (n > 30) return json({ ok: false }, 429);
  const day = new Date().toISOString().slice(0, 10);
  await redis(["INCR", `count:${b.e}`], ["INCR", `day:${day}:${b.e}`], ["SADD", "days", day]);
  return json({ ok: true });
}

export async function GET() {
  if (!hasStore()) return json({ since: null, counts: {} });
  const keys = [...EVENTS, "pilot", "pilot:hr", "pilot:council", "pilot:payroll", "pilot:employee", "pilot:other"];
  const [values, days] = await Promise.all([redis(["MGET", ...keys.map((k) => `count:${k}`)]).then((r) => r[0]), redis(["SMEMBERS", "days"]).then((r) => r[0])]);
  const counts = Object.fromEntries(keys.map((k, i) => [k, Number(values[i] ?? 0)]));
  return json({ since: [...(days ?? [])].sort()[0] ?? null, counts });
}
