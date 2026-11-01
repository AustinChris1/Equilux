# Wave 3 plan and progress (Oct 27 to Nov 16, 2026)

Read this first after any restart. Work happens on the `wave3` branch; `main` keeps serving the
Wave 2 site until v4 is complete end to end.

## Why
Wave 2 judges: business 7/10 (who pays, would employers do it), and the product should move toward
walletless. The biggest technical gap a judge can name: a report covers **16 people**, while the
Directive applies from **150 / 250 employees**. Wave 3 = **contract v4: batched, up to 512 employees.**

## Scope (agreed 2026-10-30, with corrections from a second review)
1. Contract v4, batched (this file's main subject).
2. Tests on the compiled circuits, including a 250-person company.
3. A preprod run at a size that finishes (GitHub Actions). Say "250 on-chain" only if those txs exist.
4. After 1 to 3: the gap inside equal job levels. NOT called an Article 10 proof: a small gap inside
   levels does not prove the levels are neutral; that stays a human judgement.
5. A desk-research paragraph on who pays, labelled as research (no interviews were done).
6. Stretch: a sponsored, walletless employee link (needs an always-on synced relayer: risky).

## Contract v4 design
- Instance: up to 512 employees, batches of 16 records, commitment tree depth 10 (1024 leaves).
- Roster: `declareRoster(headcount)` then `addPayrollRows(rows[16], count)` until all rows are committed.
- Council: `confirmPayroll()` opens up to 16 rows per call; each opened row is recorded once
  (`confirmed` set); approval completes when every committed row has been opened.
- Enrollment: unchanged per employee.
- Reports: begin → batch × ⌈n/16⌉ → finish, for the pay report and the variable-pay report.
  - The running totals are SEALED: the ledger holds `hash(totals, claim, salt)` only. Public partial sums
    would leak far more than the final report (e.g. the pay of the first 16 people).
  - Each batch opens the current seal, verifies its records (bound, enrolled, not yet counted in this
    report: `counted` set of tags hash(report seq, kind, commitment)), adds them, and writes a new seal
    with a fresh salt.
  - The claim (medians, category means, quartile cut points) is fixed at begin, so batches can count
    records below each claimed median / between cut points. Finish opens the seal and verifies every
    figure exactly as v3 did, over the whole company.
  - Quartiles: v3 checked pay order pairwise inside one batch. v4 uses claimed cut points
    T1 ≤ T2 ≤ T3 on total pay: a record in band b must satisfy T_b ≤ total ≤ T_{b+1}. That implies pay
    order across batches; finish checks each band holds a quarter (4c ≤ b·n < 4c+4).

## Progress
- [x] v4 contract compiles (--skip-zk), 11 circuits (`9ea8d4b`); keys built in 9 min: batch circuits ~153 MB of prover key each (heavy for in-browser proving), the rest 3 to 39 MB
- [x] claims.ts: batch arithmetic mirroring the circuits, quartile cut points (`7af88df`)
- [x] tests: 67 pass (57 circuits incl. a 250-person company in ~2 min, 10 CSV) (`7af88df`)
- [x] app on v4 (`3817774`): 14-person story 9.69% in ~10 s, 11/11 cheats refused, 250-person company in ~62 s in the browser (e2e: video/scripts/e2e-v4.mjs)
- [x] /verify decodes v4 and the Wave 2 (v3) preprod contract (`0d734c0`), checked against preprod
- [x] wallet-chain on v4: whole phases simulated in the page before any fee (`3817774`)
- [x] API server and scripted demo on v4 phases (type-checked; not run: they need the Docker local network)
- [x] preprod run on GitHub Actions (workflow `Preprod v4`, run 41235926203, 1 h 6 min): contract `7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f`, 58 txs in blocks 3,223,740 to 3,224,162 (deploy with 6 keys + 8 key inserts, roster 3, council 2, 32 enrollments, 3 reports × begin + 2 batches + finish). Mean 9.50%, median 3.40%, variable 9.26%, level-adjusted 9.05% over 31 people. Record: contract/preprod/deployment-v4.json; /verify on the wave3 build reads it all. Merging wave3 to main makes the live /verify link work
- [x] the gap inside equal job levels (`e563cbe` contract, app next commit): records carry a level, batched level report (mix + gap at k = 3 + level-adjusted gap), CSV level column, shown in the app and /verify with the caveat that levels themselves may not be fair; 73 tests; browser e2e passes (14 people: adjusted 3.70%; 250 people: three reports in ~29 s)
- [x] research: docs/who-pays.md (desk research, labelled as such)
- [x] merged wave3 into main (`088e0fc`); live site on v4, /verify reads v4 and v3, e2e passes on the live site; wallet path deploys in parts too
- [x] README and SUBMISSION rewritten for Wave 3
- [ ] short Wave 3 video (60 to 90 s), then its link into SUBMISSION.md ([WAVE 3 VIDEO LINK])
- [ ] optional: one real wallet deploy on v4 (Lace, 9 approvals) to confirm the split deploy from a browser

## Submission push (agreed 2026-10-31, aiming at every score)
1. [x] explorer links (both hosts work; /verify links both) → preprod.midnightexplorer.com (the other host does not answer)
2. [x] webapp: landing roadmap (Wave 2 delivered, Wave 3 column), every Wave-2-era number on the site
3. [x] walletless employee check `/check` (video/scripts/e2e-check.mjs: 5 checks pass on preprod): from a payslip link, no wallet, no fee: row committed, council
       opened it, enrolled, counted in each published report (read-only against preprod). Enrollment itself
       still needs a wallet: say so.
4. [x] Wave 3 video rendered: video/out/wave3.mp4 (1:30.0; also wave3-no-music.mp4). OWNER: upload (YouTube, unlisted) and send the link → README hero + SUBMISSION
5. [ ] deck for Wave 3; the fee cost of the 32-person preprod run as a business number
No invented outreach: the user cannot send HR messages; research stays labelled as research.

## Judges' Wave 3 note (2026-11-01): commercial relevance is central
Wave 3 is the final wave; they want live products, real users (even small numbers), what we learned
bringing it to market, challenges, how the Midnight ecosystem could help.
- [x] pilot request form on the landing (#pilot) → api/pilot.js, stored privately in Upstash Redis (list "pilots")
- [x] anonymous counters (api/stats.js; GET /api/stats = counts only): story, story250, csv, check, verify, wallet, pilot
- [x] Vercel Web Analytics injected (page views)
- [ ] OWNER: Vercel dashboard → Storage → Upstash Redis (free) → connect to the equilux project (sets KV_REST_API_*), redeploy;
      Vercel dashboard → Analytics → enable Web Analytics
- [ ] OWNER: publish the pilot post (drafts in the chat) on LinkedIn / X
- [x] SUBMISSION: "Commercial relevance" section (fill [N] from /api/stats on submission day): live product, real numbers from /api/stats on submission day,
      what we learned, challenges, how Midnight could help (fee sponsorship for employees, a payroll-provider intro, hosted proving)
- [x] film ending: pilot call to action, rendered
