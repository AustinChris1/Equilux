// End-to-end check of the app on contract v4 (practice mode): the 14-person story, all 11 cheats,
// then a 250-person company played through in batches. Usage (needs puppeteer-core and Chrome): SITE=https://equilux-lac.vercel.app node e2e/e2e-v4.mjs
import puppeteer from "puppeteer-core";

const SITE = process.env.SITE ?? "http://localhost:4181";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, defaultViewport: { width: 1440, height: 1000 } });
const p = await b.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));
const fail = async (m) => { console.log("FAIL:", m); await p.screenshot({ path: "e2e-fail.png" }); await b.close(); process.exit(1); };
const text = () => p.evaluate(() => document.body.innerText);
const waitText = (t, ms = 60000) => p.waitForFunction((t) => document.body.innerText.includes(t), { timeout: ms }, t).catch(() => fail(`never saw "${t}"`));
const click = async (label, tag = "button") => {
  // wait up to 10 s for the button to exist and be enabled (the page re-renders between steps)
  const ok = await p.waitForFunction((label, tag) => {
    const el = [...document.querySelectorAll(tag)].find((e) => (e.innerText || e.getAttribute("aria-label") || "").replace(/\s+/g, " ").includes(label) && !e.disabled);
    if (el) { el.click(); return true; } return false;
  }, { timeout: 10000 }, label, tag).then(() => true, () => false);
  if (!ok) await fail(`no enabled "${label}"`);
};
const idle = () => p.waitForFunction(() => !document.querySelector(".animate-spin"), { timeout: 300000 }).catch(() => fail("still busy"));

await p.goto(`${SITE}/app`, { waitUntil: "networkidle2" });
await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
await p.goto(`${SITE}/app`, { waitUntil: "networkidle2" });
await waitText("Practice run in your browser");

// 1. the 14-person story
let t0 = Date.now();
await click("Play the whole story");
await waitText("Published and proven", 120000);
await idle();
const rep14 = await text();
if (!rep14.includes("9.69%")) await fail("14-person report is not 9.69%");
console.log(`14 people: published 9.69% in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
await p.evaluate(() => { const d = [...document.querySelectorAll("details")].find((x) => x.querySelector("summary")?.innerText.includes("gap inside job levels")); if (d && !d.open) d.querySelector("summary").click(); });
await p.waitForFunction(() => /inside equal job levels/i.test(document.body.innerText), { timeout: 60000 }).catch(() => fail("no level report"));
const lv = await p.evaluate(() => { const t = document.body.innerText; const i = t.search(/inside equal job levels/i); return t.slice(i, i + 400).replace(/\s+/g, " "); });
if (!lv.includes("3.70%")) await fail(`level report is not 3.70%: ${lv}`);
console.log(`level report: ${lv.slice(0, 200)}`);

// 2. every cheat
await click("Try to cheat");
await new Promise((r) => setTimeout(r, 800));
const cheats = await p.evaluate(() => [...document.querySelectorAll('section[aria-labelledby="cheat-title"] li button')].map((b) => b.innerText.split("\n")[0]));
for (const c of cheats) {
  const enabled = await p.evaluate((c) => { const el = [...document.querySelectorAll('section[aria-labelledby="cheat-title"] li button')].find((b) => b.innerText.startsWith(c)); return el && !el.disabled; }, c);
  if (!enabled) { console.log(`  (locked) ${c}`); continue; }
  await click(c);
  await idle();
}
const cheatText = await p.evaluate(() => document.querySelector('section[aria-labelledby="cheat-title"]').innerText.replace(/\s+/g, " "));
const m = cheatText.match(/(\d+) of (\d+) tricks rejected/);
console.log(`cheats: ${m ? m[0] : "no count"}`);
const accepted = (cheatText.match(/rules let it through/g) ?? []).length;
if (accepted) await fail(`${accepted} cheat(s) were accepted`);

// 3. the council-skips-a-row cheat, which only exists before approval (its v4 behaviour changed)
await click("Start over");
await idle();
await click("Open the report"); await idle();
await waitText("Lock 14 salaries");
await click("Lock 14 salaries"); await idle();
await waitText("Check and approve");
await click("Try to cheat");
await new Promise((r) => setTimeout(r, 600));
await click("The council skips one row"); await idle();
const skip = await p.evaluate(() => [...document.querySelectorAll('section[aria-labelledby="cheat-title"] li')].find((l) => l.innerText.includes("council skips")).innerText.replace(/\s+/g, " "));
if (!/REJECTED|rejected/i.test(skip)) await fail(`skip cheat not refused: ${skip}`);
console.log(`skip cheat: ${skip.slice(0, 160)}`);

// 4. a 250-person company
await click("Start over");
await idle();
await p.evaluate(() => { const d = [...document.querySelectorAll("details")].find((x) => x.querySelector("summary")?.innerText.includes("Use your own payroll")); if (d && !d.open) d.querySelector("summary").click(); });
await new Promise((r) => setTimeout(r, 400));
await click("250-person company");
await waitText("250-person sample company");
t0 = Date.now();
await click("Play the whole story");
await waitText("Published and proven", 600000);
await idle();
const rep250 = await text();
const secs = ((Date.now() - t0) / 1000).toFixed(1);
const gap = rep250.match(/(\d+\.\d+)%\s*less pay for (women|men), on average/);
console.log(`250 people: published in ${secs}s · ${gap ? gap[0] : "no mean gap found"}`);
await p.screenshot({ path: "e2e-250.png" });
console.log("page errors:", errors.length ? errors : "none");
await b.close();
if (errors.length) process.exit(1);
