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
- [ ] v4 contract compiles (--skip-zk), then with keys
- [ ] claims.ts: batch drivers (seals, cut points)
- [ ] tests: v3 behaviours ported + batch-specific (replay, skip, double count, seal tamper) + 250 people
- [ ] browser practice mode on v4 (sample company sizes 14 / 250)
- [ ] /verify decodes both the Wave 2 (v3) contract and v4
- [ ] API / standalone / wallet-chain on v4
- [ ] preprod run on GitHub Actions at a size that finishes
- [ ] equal-levels gap
- [ ] research paragraph, README, submission, video update
