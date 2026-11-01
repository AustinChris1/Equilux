// The walletless employee check (/check) against the Wave 3 preprod contract: a real employee passes every step,
// a wrong salary matches no row, a link without the secret stops after the council, someone else's secret fails.
// Usage (needs puppeteer-core and Chrome): SITE=https://equilux-lac.vercel.app node e2e/e2e-check.mjs
import puppeteer from "puppeteer-core";

const SITE = process.env.SITE ?? "http://localhost:4190";
const C = "7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f";
const P004 = "s=61400&v=3450&g=0&c=0&l=0&n=preprod-v4-payslip:p004";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, defaultViewport: { width: 1280, height: 1100 } });
const p = await b.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));

/** ✓ / ✗ / · per step, after opening a payslip link in a fresh document. */
async function run(hash) {
  await p.goto("about:blank");
  await p.goto(`${SITE}/check?contract=${C}#${hash}`, { waitUntil: "networkidle2" });
  await p.waitForFunction(() => document.querySelector("#journey") || document.querySelector("[role=alert]"), { timeout: 90000 });
  return p.evaluate(() => [...document.querySelectorAll("#journey + ol li > span.grid")].map((s) => s.className.includes("bg-gold") ? "✓" : s.className.includes("red") ? "✗" : "·").join(""));
}

const cases = [
  ["employee p004, with secret", `${P004}&k=preprod-v4:p004`, "✓✓✓✓✓✓"],
  ["salary off by €100", P004.replace("61400", "61500"), "✗✗····"],
  ["payslip link, no secret", P004, "✓✓····"],
  ["someone else's secret", `${P004}&k=preprod-v4:p005`, "✓✓✗✗✗✗"],
];
let failed = 0;
for (const [name, hash, want] of cases) {
  const got = await run(hash);
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? "pass" : "FAIL"}  ${name}: ${got}${ok ? "" : ` (expected ${want})`}`);
}
const peers = await (async () => { await run(`${P004}&k=preprod-v4:p004`); return p.evaluate(() => document.querySelector("#peers").parentElement.innerText.replace(/\s+/g, " ")); })();
if (!peers.includes("€60,225") || !peers.includes("10.11%")) { failed++; console.log("FAIL  category figures:", peers.slice(0, 200)); } else console.log("pass  category figures match /verify (€60,225 · €67,000 · 10.11%)");
console.log("page errors:", errors.length ? errors : "none");
await b.close();
process.exit(failed || errors.length ? 1 : 0);
