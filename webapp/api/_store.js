// A tiny Redis client over Upstash's REST API (Vercel Marketplace: Storage → Upstash Redis, free tier).
// The integration sets KV_REST_API_URL / KV_REST_API_TOKEN (or the UPSTASH_REDIS_REST_* names).
// Every key starts with "equilux:", so one free database can be shared with other projects.
const URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasStore = () => Boolean(URL && TOKEN);

/** Runs Redis commands in one round trip; returns their results in order. */
export async function redis(...commands) {
  const res = await fetch(`${URL}/pipeline`, { method: "POST", headers: { authorization: `Bearer ${TOKEN}`, "content-type": "application/json" }, body: JSON.stringify(commands) });
  if (!res.ok) throw new Error(`store ${res.status}`);
  return (await res.json()).map((r) => r.result);
}

export const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

/** The visitor's address as Vercel reports it, for rate limits only (never stored with a sign-up). */
export const clientIp = (request) => (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
