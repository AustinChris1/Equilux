# Equilux — Wave 1 submission notes

Text for the AKINDO submission form. Each section maps to a field the rules ask for.

## Links

- Repository: https://github.com/AustinChris1/Equilux (topic `midnightntwrk`, Apache-2.0)
- Live site: https://equilux-lac.vercel.app
- Deck: `deck/Equilux-Wave1-deck.pdf` in the repository
- Demo video: [YOUTUBE LINK]

## What Equilux is

The first employee-verifiable pay-transparency reporting protocol. Under Directive (EU)
2023/970, large EU employers must publish gender pay gap reports from June 2027, and today
those reports are self-declared: no employee or regulator can check the numbers without
seeing every salary. Equilux lets a company prove its report was computed from its
complete, employee-co-signed payroll while every salary stays in Midnight's private state.
It does not replace the HRIS; it is the notary on top of it.

## How privacy shapes the design

Midnight's dual ledger is the architecture, not a feature. Salaries, gender markers and
employee secrets exist only as witnesses. The public ledger holds commitments (a Merkle
tree), nullifiers, employer attestations, and the proven report. Every witness value that
reaches the ledger passes an explicit `disclose()`. The mean gap is verified inside the
circuit without division, via cross-multiplied bounds on the claimed figure, so the
prover can publish exactly one value and nothing else.

## Progress completed during Wave 1

1. **Contract deployed and executed end-to-end on a Midnight network with real
   zero-knowledge proofs.** `contract/deploy/standalone-demo.ts` runs the full protocol
   against a Midnight node, indexer and proof server: deploy, four employee enrollments,
   four employer attestations, and `publishReport` — every transaction proven and
   finalized, the PayReport read back from the indexer (2 women, 2 men, 23.52% mean gap,
   4 nullifiers, 4 attestations, zero salaries on chain). Reproducible with
   `pnpm network:up && pnpm demo:standalone`.
2. **Circuit-level test suite.** 21 passing tests, 9 of which drive the compiler-generated
   contract through `@midnight-ntwrk/compact-runtime`: real ledger transitions, Merkle
   receipt paths, and every assertion (omitted employee, false gap claim, double
   enrollment, non-employer attest, duplicate record) failing with the circuit's message.
3. **Toolchain alignment.** Pinned the Compact toolchain (`+0.30.0`, runtime 0.15.0) to
   the stable midnight-js 4.0.4 / ledger-v8 SDK line so compiled artifacts deploy.
4. **Honesty pass on the legal model.** Renamed the ledger flag to
   `meanGapAtOrAbove5pct` (the Directive's Article 10 trigger is per worker category and
   is Wave 2), removed every claim of metrics the circuit does not yet compute, and
   published a threat-model section stating the exact trust boundary (HR necessarily holds
   payroll; hidden from the public, colleagues, the regulator and Equilux).
5. **Public testnet compatibility probe.** Documented in `contract/deploy/probe-preprod.ts`:
   every preprod endpoint is reachable and correct, but the current stable wallet SDK
   cannot decode preprod's sync payloads and no newer stable release exists. Public
   testnet deployment is therefore the Wave 2 headline.
6. **Interactive demo, deck, and hosted site.** The site runs the protocol rules in the
   browser (enroll → attest → publish, plus adversarial toggles that are rejected by the
   same assertions the circuit enforces), deployed on Vercel; 11-slide deck.

## Current state, stated precisely

- Compact contract with 4 circuits compiles; prover and verifier keys generated.
- Proven end-to-end on a local Midnight network. Not yet on the public testnet (see 5).
- The browser demo mirrors the circuit's rules; it does not generate proofs.
- Computes the mean gap only (one of Article 9's seven metrics); company-wide, not per
  category; sized instance (32 commitment slots, 16-record witness); binary gender
  markers as the Directive's annex is written.

## How judges can evaluate it

- `cd contract && pnpm install && pnpm test` — 21 tests.
- `pnpm network:up && pnpm demo:standalone` (Docker) — the on-network run with proofs.
- Open the live site, run the demo, tick "Omit one employee", publish, watch it reject.
- `contract/src/equilux.compact` is the contract; `contract/build/` the compiled output.

## Wave 2 plan

Public testnet deployment with the site reading live state; the Article 7 cohort-safe
category query (k-anonymity threshold); worker categories; median; employer / employee /
regulator screens; Lace wallet write path.
