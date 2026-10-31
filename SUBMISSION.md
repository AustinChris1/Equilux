# Equilux: Wave 3 submission

Paste-ready text for the AKINDO submission form. Each section is one field.

## Links

- GitHub repository (Apache-2.0, topic `midnightntwrk`): https://github.com/AustinChris1/Equilux
- README (project, setup, architecture, Midnight integration, how to test): https://github.com/AustinChris1/Equilux#readme
- Live app: https://equilux-lac.vercel.app/app (press **Play the whole story**, then **Try to cheat**)
- Wave 3 report on preprod (contract v4, 32 people, 58 transactions), checkable by anyone:
  https://equilux-lac.vercel.app/verify?network=preprod&contract=7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f
- The same contract on Midnight's preprod explorer: https://explorer.preprod.midnight.network/contracts/7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f
- Who would pay (desk research, labelled as such): https://github.com/AustinChris1/Equilux/blob/main/docs/who-pays.md
- Wave 3 update video: [WAVE 3 VIDEO LINK]

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
4. **Who would pay** (business feedback): a desk-research note with sources, labelled as research. No
   interviews were done; it states three hypotheses (payroll-provider add-on, employer directly,
   works-council pull) and what to ask to test each.
5. **Tests: 55 → 73**, including a 250-person company run through the compiled circuits (~2 min).

## Progress completed during Wave 3 (evidence)

- Contract v4: 14 circuits with proving keys, `contract/src/equilux.compact`; up to 512 people per
  instance (Merkle tree depth 10), set at compile time.
- Preprod record, every tx id and hash: `contract/preprod/deployment-v4.json`. Proven on chain: mean gap
  9.50%, median gap 3.40%, variable-pay mean gap 9.26%, level-adjusted gap 9.05% over 31 people,
  32 of 32 rows confirmed by the council and enrolled by their employee. No salary on chain.
- `/verify` decodes v4 contracts and the Wave 2 (v3) contract; the link above shows the Wave 3 report.
- Live site on v4: the 14-person story, all 11 cheats refused, and a 250-person company played through
  in the browser (three reports in ~30 s, practice mode, no proofs). Checked with automated browser runs.
- Workflow: `.github/workflows/preprod-v4.yml` (probe, then run; resumable after any interruption).

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
- Walletless employee confirmation (a link instead of a wallet) is designed, not built: it needs an
  always-on, synced relayer paying fees.
- HR still holds payroll; a provider, employer and council colluding could commit false rows (each
  employee would see their own). Binary gender markers, as the Directive's annex is written.

## How judges can test it

1. https://equilux-lac.vercel.app/app → **Play the whole story** (a few seconds), then open
   **The gap inside job levels**.
2. **Use your own payroll → 250-person company → Play the whole story**: the batched contract at the
   Directive's size.
3. **Try to cheat** → pick any trick, e.g. "Add an employee who doesn't exist" or "Say the gap is 0%".
4. **/verify** (link above): the Wave 3 report on preprod, then the explorer link.
5. `cd contract && pnpm install && pnpm test` (73 tests). The contract: `contract/src/equilux.compact`.

## Next

Walletless employee confirmation (a link in the payslip portal, fees paid by the employer); three
validation conversations (an HR lead at a 250+ employer, a works council member, a payroll provider);
a payroll-provider plugin against a real Personio sandbox; a 250-person run on preprod.
