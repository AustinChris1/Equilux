# Equilux: Wave 3 submission

Paste-ready text for the AKINDO submission form. Each section is one field.
Before submitting: fill every [N] and [DATE] from https://equilux-lac.vercel.app/api/stats, and the video link.

## Links

- GitHub repository (Apache-2.0, topic `midnightntwrk`): https://github.com/AustinChris1/Equilux
- README (project, setup, architecture, Midnight integration, how to test): https://github.com/AustinChris1/Equilux#readme
- Docs, in plain language (overview, nine use cases, a guided tour, architecture, business model): https://equilux-lac.vercel.app/docs
- Live app: https://equilux-lac.vercel.app/app (press **Play the whole story**, then **Try to cheat**)
- Wave 3 report on preprod (contract v4, 32 people, 58 transactions), checkable by anyone:
  https://equilux-lac.vercel.app/verify?network=preprod&contract=7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f
- An employee checks their own record, no wallet: https://equilux-lac.vercel.app/check (press **Try an
  employee from the testnet run**)
- The same contract on Midnight's preprod explorer: https://explorer.preprod.midnight.network/contracts/7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f
  (or https://preprod.midnightexplorer.com/contracts/7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f)
- Who would pay (desk research, labelled as such): https://github.com/AustinChris1/Equilux/blob/main/docs/who-pays.md
- Wave 3 update video: https://youtu.be/Wy531rFG9ZE
- Wave 3 deck (12 slides): https://github.com/AustinChris1/Equilux/blob/main/deck/Equilux-Wave3-deck.pdf

## Project description (short)

Equilux lets a company prove its legally required gender pay gap report was computed from its complete,
real payroll, while no salary is revealed. From June 2027 every EU employer with 150+ staff must publish
these figures (Directive (EU) 2023/970), and today the reports are self-declared: nobody can check them
without seeing everyone's pay. On Midnight, the payroll provider commits every payroll row as a sealed
code, the works council checks them, each employee confirms their own row, and the report is published
only if the circuits recheck every figure. Salaries stay private inputs; only proven figures go public.

## What changed since Wave 2

The Wave 2 review named the gaps; Wave 3 answers them in order.

1. **Company size: 16 → 512 people per report.** Wave 2 proved a report over 16 records; the Directive
   starts at 150. Contract v4 works in batches of 16: the payroll provider commits rows batch by batch,
   the works council opens them batch by batch, and each report is `begin → batch × ⌈n/16⌉ → finish`.
   The running totals between batches are **sealed** (only `hash(totals, claim, salt)` is on the ledger),
   because public partial sums would reveal the pay of the first 16 people. Each record can be counted
   once per report (a `counted` set). Quartiles, which v3 checked by sorting inside one batch, now use
   claimed cut points that every batch checks, so pay order holds across batches.
2. **The gap inside equal job levels** (new third report). Records carry a job level; the level report
   publishes each level's mix of women and men, each level's gap where both groups have at least three
   people (k = 3), and a headcount-weighted level-adjusted gap. It is **not** called proof of a fair
   pay structure: a small gap inside levels says nothing about who reaches which level, which is why the
   mix is always published and the page says so. CSV import reads a level column (grade, band, Stufe…).
3. **On preprod again, with the new contract.** A 32-person company (2 batches, so every batched step
   runs more than once), real proofs, from GitHub Actions through Blockfrost: 58 transactions, blocks
   3,223,740 to 3,224,162. To get there: Midnight closed its own preprod indexer and RPC, so the run
   goes through Blockfrost; and a v4 deploy carrying all 14 circuits' keys wrote ~38,900 bytes, more
   than preprod accepts in one transaction, so the contract is now deployed with 6 keys and the other 8
   are added by maintenance transactions (in the GitHub run and in the visitor's-wallet path).
4. **Employees check their own record with no wallet** (product feedback: less wallet friction).
   `/check` takes what is on a payslip (pay, category, level, the payroll code) and, optionally, the
   employee's own secret. It recomputes the sealed codes with the compiled contract and looks them up in
   the contract's public state. The employee sees, step by step: the provider committed my row, the
   council opened it, I enrolled it, I was counted once in each report. Then: what my category earns by
   gender (Article 7) and my job level's gap. No wallet, no fee, nothing leaves the page. It runs against
   the real preprod contract today.
5. **Who would pay** (business feedback): a desk-research note with sources, labelled as research. No
   interviews were done; it states three hypotheses (payroll-provider add-on, employer directly,
   works-council pull) and what to ask to test each. The cost structure is now measured, not guessed: a
   report for n people takes about n + 5·⌈n/16⌉ + 16 transactions (58 for the 32-person run, about 346
   for 250), and n of those are the employees' own enrollments.
6. **The site shows Wave 3**: a Scale section (any company up to 512, 16 at a time, sealed in between),
   the job-level figure, an updated scope and roadmap.
7. **Tests: 55 → 73** on the compiled circuits, including a 250-person company (~2 min), plus browser
   tests that run against the live site (`webapp/e2e/`).

## Progress completed during Wave 3 (evidence)

- Contract v4: 14 circuits with proving keys, `contract/src/equilux.compact`; up to 512 people per
  instance (Merkle tree depth 10), set at compile time.
- Preprod record, every tx id and hash: `contract/preprod/deployment-v4.json`. Proven on chain: mean gap
  9.50%, median gap 3.40%, variable-pay mean gap 9.26%, level-adjusted gap 9.05% over 31 people,
  32 of 32 rows confirmed by the council and enrolled by their employee. No salary on chain.
- `/verify` decodes v4 contracts and the Wave 2 (v3) contract; the link above shows the Wave 3 report.
- Live site on v4: the 14-person story, all 11 cheats refused, and a 250-person company played through
  in the browser (three reports in ~30 s, practice mode, no proofs). Checked with automated browser runs.
- `/check` on the live site against the preprod contract: a real employee passes all six steps; a salary
  €100 off matches no row; someone else's secret is refused (`webapp/e2e/e2e-check.mjs`).
- Workflow: `.github/workflows/preprod-v4.yml` (probe, then run; resumable after any interruption).

## Commercial relevance: where Equilux stands, stated plainly

**The product is live**: https://equilux-lac.vercel.app. Anyone can run the whole report in the browser,
check the preprod report at `/verify`, and check their own record at `/check`, with nothing to install.

**Users: early, and counted from now on.** No employer, works council or payroll provider uses Equilux
yet, and there is no revenue. In Wave 3 we opened free pilots (the form at
https://equilux-lac.vercel.app/#pilot, stored privately) and started counting what visitors do,
anonymously: https://equilux-lac.vercel.app/api/stats (counts only, no identifiers). On submission day:
[N] report runs, [N] 250-person runs, [N] employee checks, [N] verifies, [N] pilot requests
([N] HR, [N] works councils, [N] payroll providers), since [DATE].

**What we learned taking it toward the market**
1. *The cost grows with headcount, almost one transaction per person*: a report for n people takes
   n + 5·⌈n/16⌉ + 16 transactions (58 measured for 32 people, about 346 for 250). That points to a
   per-employee price, and it makes "who pays the employees' fees" a product decision, not a detail.
2. *Wallets are the adoption barrier*, as the Wave 2 judges said. We split the employee's two jobs:
   checking your own record needs no wallet (`/check`), and neither does confirming it: the employee's browser makes the proof and the employer's wallet pays the fee.
3. *The infrastructure moves under you.* Midnight closed its own preprod indexer and RPC during the
   Buildathon; we moved to Blockfrost within a week, behind a read-only proxy that keeps the key off the page.
4. *A contract this size does not deploy in one block.* All 14 circuits' keys wrote ~38,900 bytes, and
   the node refused it; the deploy now carries 6 and adds 8 by maintenance transactions.
5. *Employers will see employee confirmation as extra process.* It is: one step per person, and the step
   that turns the report from a claim into evidence. The answer is to make it a payslip link.

**Challenges we are working through**
- Reaching buyers: we have no network into HR yet, hence the public pilot page and outreach.
- Walletless enrollment needs an always-on, synced wallet that pays fees (a preprod wallet sync from
  scratch took 2.5 hours on GitHub's machines).
- Mainnet fees are unknown, so the per-employee price is a hypothesis.

**How the Midnight ecosystem could help us take the next step**
- Fee sponsorship (DUST paid by the employer for its employees' enrollments), so no employee ever holds a token.
- An introduction to an HR, payroll or compliance partner in the ecosystem for a first pilot.
- A server-side wallet SDK and hosted proving that a relayer can rely on.

## How privacy shapes the design (Midnight integration)

Salaries, gender markers, worker categories, job levels and secrets exist only as private-state
witnesses. The public ledger holds hashed role keys, payroll-row hashes (blinded by payslip nonces, so a
salary cannot be brute-forced), commitments in a Merkle tree, nullifiers, sealed running totals and the
proven reports. Every witness value that reaches the ledger passes an explicit `disclose()` (42 in the
contract). Batching added a new privacy question (what do partial sums reveal?) and the answer is in the
design: partial sums are never public, only a salted hash of them, opened and re-sealed by each batch.

## Current state, stated precisely

- 250 people: proven in the compiled circuits (tests) and in the browser. On preprod: 32 people.
  We do not claim 250 on-chain.
- The hosted app runs the compiled contract in the browser without proofs (practice mode); with a
  connected wallet, steps are proven and submitted on preprod. The wallet path now deploys in parts
  (1 deploy + 8 key transactions, each approved in the wallet); it has not yet been run end to end
  from a visitor's wallet on v4.
- Employees need no wallet: checking and confirming both run in the browser; the employer's wallet pays the fee
  live (a proof stays valid for an hour). Proven on preprod: blocks 3,263,021 and 3,263,153.
- HR still holds payroll; a provider, employer and council colluding could commit false rows (each
  employee would see their own). Binary gender markers, as the Directive's annex is written.

## How judges can test it

1. https://equilux-lac.vercel.app/app → **Play the whole story** (a few seconds), then open
   **The gap inside job levels**.
2. **Use your own payroll → 250-person company → Play the whole story**: the batched contract at the
   Directive's size.
3. **Try to cheat** → pick any trick, e.g. "Add an employee who doesn't exist" or "Say the gap is 0%".
4. **/verify** (link above): the Wave 3 report on preprod, then the explorer link.
5. **/check** → **Try an employee from the testnet run**: one of the 32 people checks their own record
   on the chain, no wallet. Change the salary by €100 and check again: no row matches.
6. `cd contract && pnpm install && pnpm test` (73 tests). The contract: `contract/src/equilux.compact`.

## Next

Walletless enrollment (a link in the payslip portal, fees paid by the employer); three
validation conversations (an HR lead at a 250+ employer, a works council member, a payroll provider);
a payroll-provider plugin against a real Personio sandbox; a 250-person run on preprod.
