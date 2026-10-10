// Read-only proxy to Midnight's preprod indexer, which Blockfrost serves since Midnight closed its own on 2026-10-09.
// The Blockfrost project key stays here (env BLOCKFROST_PROJECT_ID), never in the page. Queries only: no mutations.
const UPSTREAM = "https://midnight-preprod.blockfrost.io/api/v0";

const json = (body, status) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function POST(request) {
  const key = process.env.BLOCKFROST_PROJECT_ID;
  if (!key) return json({ errors: [{ message: "This deployment has no preprod indexer key yet (BLOCKFROST_PROJECT_ID)." }] }, 503);
  const text = await request.text();
  if (text.length > 8000) return json({ errors: [{ message: "Query too large." }] }, 413);
  let body;
  try { body = JSON.parse(text); } catch { return json({ errors: [{ message: "Not JSON." }] }, 400); }
  if (typeof body?.query !== "string" || /^\s*(mutation|subscription)\b/.test(body.query)) return json({ errors: [{ message: "Only queries are forwarded." }] }, 400);
  const res = await fetch(UPSTREAM, { method: "POST", headers: { "content-type": "application/json", project_id: key }, body: JSON.stringify({ query: body.query, variables: body.variables ?? {} }) });
  return new Response(await res.text(), { status: res.status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}
