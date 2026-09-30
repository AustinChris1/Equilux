# Equilux — Wave 2 submission notes

Text for the AKINDO submission form. Each section maps to a field the rules ask for.

## Links

- Repository: https://github.com/AustinChris1/Equilux (topic `midnightntwrk`, Apache-2.0)
- Live site: https://equilux-lac.vercel.app — Workspace → **Run the full flow**
- Deck: https://github.com/AustinChris1/Equilux/blob/main/deck/Equilux-Wave2-deck.pdf
- Demo video: [WAVE 2 VIDEO LINK]

## What Equilux is

The first employee-verifiable pay-transparency reporting protocol. Under Directive (EU) 2023/970,
EU employers must publish gender pay gap figures from June 2027, and today those reports are
self-declared: no employee or regulator can check them without seeing every salary. Equilux lets a
company prove its report was computed from its complete payroll — each record sealed by the
employee and vouched for by the payroll provider — while every salary stays in Midnight's private
state. It sits next to the HRIS as a verification layer, not in place of it.

## What changed since Wave 1

The Wave 1 judge asked for payroll-provider attestation and for Equilux to become a plugin for
Workday / Personio rather than a standalone app. Both are built.

1. **A third party: the payroll provider.** It holds its own key, declares the roster headcount
   before anyone enrolls, and attests each record. The employer can no longer vouch for its own
   data — the Wave 1 weakness.
2. **Nobody can be left out.** The report must cover exactly the declared headcount. In Wave 1 an
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
   one-click full flow and four cheats (omit an employee, fake mean gap, inflated median, hidden
   category gap), each rejected by the circuit with its own message.

## Progress completed during Wave 2

- Contract v2: 5 circuits compile with proving and verifier keys (`declareRoster` new;
  `publishReport` extended to median and per-category statistics with k = 3 suppression).
- **Verified on a Midnight network with real proofs:** deploy with two role keys; enrollment
  rejected before the roster; roster declared; eight enrollments; a ninth rejected past the roster;
  eight provider attestations; four cheating reports rejected; the honest report proven and
  finalized; a receipt proven. The on-chain report matches the tests to the basis point.
- **Verified on the live Vercel site:** the full flow in about two seconds, all four cheats
  rejected, a receipt verified through the real `checkReceipt`, state preserved across reload,
  no page errors, no horizontal overflow on mobile.
- Tests: 21 → 41, covering roster, roles, every statistic, every rejection, and the CSV importer.
- Public-testnet probe re-run on Midnight's new stable wallet SDK (facade 4.0.1): the Wave 1
  decode error is fixed upstream, but syncing preprod now fails inside the SDK's WebAssembly
  (`RuntimeError: unreachable` while applying a sync update). Documented; deployment follows
  Midnight's fix.

## How privacy shapes the design

Salaries, gender markers, worker categories and secrets exist only as witnesses. The public ledger
holds hashed role keys, the declared headcount, commitments (a Merkle tree), nullifiers,
attestations and the proven report. Every witness value that reaches the ledger passes an explicit
`disclose()`. The circuit discloses only aggregates, and for small categories not even those.

## Current state, stated precisely

- 5 circuits, keys generated; proven end to end on a local Midnight network; not yet on the public
  testnet (SDK sync failure above).
- The hosted site runs the compiled contract in the browser without proofs; live proofs need the
  local network and API (`pnpm network:up && pnpm app:server`).
- 3 of Article 9's 7 indicators: mean gap, median gap, per-category gap on basic pay.
- HR still holds payroll; the provider's roster is trusted; sized instance of 16 records and
  4 categories; binary gender markers as the Directive's annex is written.

## How judges can evaluate it

- Live site → Workspace → **Run the full flow**, then Regulator tab; then Employer tab → pick a
  cheat → Publish.
- `cd contract && pnpm install && pnpm test` — 41 tests.
- `pnpm network:up && pnpm app:server`, then the Workspace on localhost — real proofs.
- `contract/src/equilux.compact` is the contract.

## Wave 3 plan

Public testnet deployment and Lace wallet writes; variable-pay gaps and quartiles (all of
Article 9); an Article 9 filing pack with proof hash and verify URL; a works-council co-signature
on the roster; one named pilot.
