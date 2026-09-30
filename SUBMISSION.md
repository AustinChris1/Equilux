# Equilux — Wave 2 submission notes

Text for the AKINDO submission form. Each section maps to a field the rules ask for.

## Links

- Repository: https://github.com/AustinChris1/Equilux (topic `midnightntwrk`, Apache-2.0)
- Live site: https://equilux-lac.vercel.app — the app is at https://equilux-lac.vercel.app/app → **Run the full flow**
- Deck: https://github.com/AustinChris1/Equilux/blob/main/deck/Equilux-Wave2-deck.pdf
- Demo video: [WAVE 2 VIDEO LINK]

## What Equilux is

The first employee-verifiable pay-transparency reporting protocol. Under Directive (EU) 2023/970,
EU employers must publish gender pay gap figures from June 2027, and today those reports are
self-declared: no employee or regulator can check them without seeing every salary. Equilux lets a
company prove its report was computed from its complete payroll — every salary the payroll
provider's own figure, confirmed by the employee it belongs to — while every salary stays in
Midnight's private state. It sits next to the HRIS as a verification layer, not in place of it.

## What changed since Wave 1

The Wave 1 judge asked for payroll-provider attestation and for Equilux to become a plugin for
Workday / Personio rather than a standalone app. Both are built.

1. **The payroll provider vouches for the figures, not just a hash.** It holds its own key and,
   before anyone enrolls, commits a hiding hash of every payroll row —
   `hash(salary, gender, category, payslip nonce)` — in one transaction. An employee can only enroll
   a record that opens to an unclaimed row. So every counted salary is payroll's own figure,
   confirmed by the employee it belongs to: the employer cannot invent a person or change anyone's
   pay, and an employee cannot inflate their own. No salary reaches the ledger.
2. **Nobody can be left out.** The report must cover exactly the committed rows. In Wave 1 an
   employee who never enrolled could be silently excluded; now the circuit rejects that report.
3. **More of the Directive, proven.** `publishReport` now verifies the **median gap** (lower median
   by rank counting — no sort in-circuit) and the **mean gap per worker category**, the unit
   Article 10 assesses. Categories at 5% or more are flagged.
4. **Article 7 with k-anonymity.** Average pay by gender per category is published only when both
   groups have at least three people; smaller groups show headcounts only, so no colleague's salary
   can be inferred.
5. **The real contract on the public site.** The hosted Workspace now executes the compiled Compact
   contract in the browser on Midnight's WebAssembly runtime — the same circuits, hashes, Merkle
   tree and assertions as on-chain. In Wave 1 it ran a hand-written replica. A judge can run the
   whole flow and every cheat without installing anything.
6. **The plugin surface.** A Personio / DATEV CSV importer (German headers, `62.000,00` amounts)
   and a documented API for each party's actions.
7. **Four parties in the Workspace**: employer, payroll provider, employee, regulator — with a
   one-click full flow and seven cheats (inflate your own salary, enroll an invented employee, omit
   an employee, change someone's pay in the report, fake mean gap, inflated median, hidden category
   gap), each rejected by the circuit with its own message.
8. **Honest tests.** The Wave 1 TypeScript simulator and its 12 tests are removed. The suite is 28
   tests on the compiled circuits (9 in Wave 1) and 8 on the CSV importer.

## Progress completed during Wave 2

- Contract v2: 4 circuits compile with proving and verifier keys. `declareRoster` commits the
  payroll rows; `enroll` binds each record to one; the blind `attest` circuit of the first Wave 2
  draft is gone. `publishReport` is extended to median and per-category statistics with k = 3
  suppression.
- **Verified on a Midnight network with real proofs:** the same 14-person company as
  the live site (`pnpm demo:standalone`). Contract `620570fe…6679` deployed (block 27); the
  provider committed 14 payroll-row hashes in one transaction (block 31); 14 enrollments, each
  proven to open its own row (blocks 36–91); an employee claiming €65,000 against a €60,000 row
  rejected by the circuit; `publishReport` proven and finalized (block 109). The on-chain report is
  identical to the site's: mean 9.69%, median 1.81%, Engineering 13.88% flagged, Sales 3.70%,
  Operations suppressed. The API path (roster, bound enrollment, both enrollment cheats, two
  publish cheats, publish, receipt) was verified against a second deployment.
- **Verified on the live Vercel site:** the full flow in about two seconds, all seven cheats
  rejected, a receipt verified through the real `checkReceipt`, state preserved across reload,
  no page errors, no horizontal overflow on mobile.
- Tests: 36 — 28 on the compiled circuits (roster, binding, roles, every statistic, every
  rejection) and 8 on the CSV importer.
- Public-testnet probe re-run on Midnight's new stable wallet SDK (facade 4.0.1): the Wave 1
  decode error is fixed upstream, but syncing preprod now fails inside the SDK's WebAssembly
  (`RuntimeError: unreachable` while applying a sync update). Documented; deployment follows
  Midnight's fix.

## How privacy shapes the design

Salaries, gender markers, worker categories and secrets exist only as witnesses. The public ledger
holds hashed role keys, the headcount, the provider's payroll-row hashes (blinded by payslip
nonces, so a salary cannot be brute-forced from them), commitments (a Merkle tree), nullifiers and
the proven report. Every witness value that reaches the ledger passes an explicit
`disclose()`. The circuit discloses only aggregates, and for small categories not even those.

## Current state, stated precisely

- 4 circuits, keys generated; proven end to end on a local Midnight network; not yet on the public
  testnet (SDK sync failure above).
- The hosted site runs the compiled contract in the browser without proofs; live proofs need the
  local network and API (`pnpm network:up && pnpm app:server`).
- 3 of Article 9's 7 indicators: mean gap, median gap, per-category gap on basic pay.
- HR still holds payroll; the provider's payroll rows are trusted (each employee sees their own);
  sized instance of 16 records and 4 categories; binary gender markers as the Directive's annex is
  written.

## How judges can evaluate it

- https://equilux-lac.vercel.app/app → **Run the full flow**, then Regulator tab; then Employer tab → pick a
  cheat → Publish; Employee tab → try to claim €5,000 more.
- `cd contract && pnpm install && pnpm test` — 36 tests.
- `pnpm network:up && pnpm app:server`, then http://localhost:5173/app — real proofs.
- `contract/src/equilux.compact` is the contract.

## Wave 3 plan

Public testnet deployment and Lace wallet writes; variable-pay gaps and quartiles (all of
Article 9); an Article 9 filing pack with proof hash and verify URL; a works-council co-signature
on the roster; one named pilot.
