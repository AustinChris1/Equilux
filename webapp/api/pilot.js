// Pilot requests from the landing page. Stored privately in the project's Redis (list "pilots"), never shown on
// the site; only their count is public (/api/stats). Spam: a honeypot field and 5 requests per address per hour.
import { clientIp, hasStore, json, redis } from "./_store.js";

const ROLES = ["hr", "council", "payroll", "employee", "other"];
const SIZES = ["<150", "150-249", "250-999", "1000+"];
const clip = (s, n) => String(s ?? "").trim().slice(0, n);

export async function POST(request) {
  if (!hasStore()) return json({ error: "Sign-ups are not open yet on this deployment." }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ error: "Not JSON." }, 400); }
  if (b.website) return json({ ok: true }); // the honeypot: bots fill every field
  const entry = {
    at: new Date().toISOString(),
    role: ROLES.includes(b.role) ? b.role : "other",
    size: SIZES.includes(b.size) ? b.size : "",
    org: clip(b.org, 120),
    name: clip(b.name, 80),
    email: clip(b.email, 160),
    country: clip(b.country, 60),
    note: clip(b.note, 1000),
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) return json({ error: "Please enter an email address we can reply to." }, 400);
  if (b.consent !== true) return json({ error: "Please tick the box so we may store your request and reply." }, 400);
  const rl = `rl:pilot:${clientIp(request)}`;
  const [n] = await redis(["INCR", rl], ["EXPIRE", rl, 3600]);
  if (n > 5) return json({ error: "Too many requests from this address; try again in an hour." }, 429);
  await redis(["LPUSH", "pilots", JSON.stringify(entry)], ["INCR", "count:pilot"], ["INCR", `count:pilot:${entry.role}`]);
  return json({ ok: true });
}
