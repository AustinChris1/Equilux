# Equilux

**The first employee-verifiable pay-transparency reporting protocol. Built on Midnight.**

Equilux lets a company prove that its legally required gender pay gap report was computed
from its complete, real payroll — co-signed by its own employees — while no individual salary
is ever revealed to the public, to colleagues, to the regulator, or to Equilux. (HR necessarily
already holds payroll; see *Scope and threat model* below for the exact trust boundary.)

## Why now

The EU Pay Transparency Directive — Directive (EU) 2023/970 — makes gender pay gap reporting
mandatory. First reports are due **7 June 2027**, computed from **2026 pay data**, for every
EU employer with 250+ employees (150+ follow the same date). An unexplained gap of **5%** or
more in any worker category forces a joint pay assessment. Yet the report is self-declared:
today there is no way for an employee or regulator to verify the published numbers without
seeing everyone's salary. That is precisely the gap zero-knowledge proofs close.

## Four cryptographic guarantees

Three are implemented and proven on-chain today; the fourth is designed and lands in Wave 2.

1. **Completeness** — every record sealed on-chain must appear in the report; the circuit
   rejects a payroll witness covering fewer records than were enrolled. (A pre-committed
   roster, so nobody can be left un-enrolled, is Wave 3.)
2. **Inclusion receipts** — every worker holds a private receipt proving their record was
   counted, revealing nothing about them.
3. **Proven statistics** — the mean pay gap is computed inside a Compact zero-knowledge
   circuit over the committed payroll, verified without division via cross-multiplied
   bounds; the chain publishes only aggregates plus a proof. Median, quartiles and
   per-category gaps are Wave 2.
4. **Cohort-safe queries** *(Wave 2)* — employees get their legal right (Article 7) to
   category-level pay data, behind a minimum cohort threshold so no individual salary
   can be inferred.

Midnight's dual-ledger model carries the design: salaries live in **private state** and never
leave it; the commitments, aggregates, and proofs live in **public state** where anyone can verify.

## Brand

The mark is the **Equals Seal** — an equals sign where only one side is shown: the solid bar
is the published aggregate, the hollow bar is the sealed payroll it was proven from.
The name **Equilux** is the day night and day are exactly equal — equality, born at Midnight.
Palette: Olive `#202B22` · Royal Yellow `#FFD85F`.

## Scope and threat model

Equilux is deliberate about its boundary, because a compliance tool that overstates
itself is worse than none.

**What the circuit proves:** the published gap was computed from every enrolled,
employer-attested record (not a subset); no record was invented; nobody was counted
twice; the disclosed figure is exact (the circuit accepts one value and rejects every
other); each employee can verify their own inclusion without seeing anyone else's data.

**What it does not claim:**

- *The employer already has the payroll* — it must, to run payroll. Equilux hides
  salaries from the public, from colleagues, from the regulator and from us, not from
  HR. Wave 3 moves attestation to the payroll provider so HR never assembles the set.
- *Not yet the Article 10 trigger* — the `meanGapAtOrAbove5pct` flag is the
  company-wide mean. The Directive's trigger is an *unjustified* gap within a
  *category of workers*; categories arrive in Wave 2, and the ledger field is
  named for what it actually measures.
- *One of Article 9's seven metrics* — median, variable-pay gaps, share receiving
  variable pay and quartile composition are not yet implemented.
- *A sized instance* — 32 commitment slots, 16-record witness. Right for a demo
  company; sizing is a compile-time parameter per employer band.
- *Binary gender markers*, as the Directive's reporting annex is written today —
  a reporting category, not a claim about identity.

## Repository layout

- `contract/` — the Midnight side.
  - `src/equilux.compact` — the Compact contract. **Compiles** with the pinned Compact
    toolchain `+0.30.0` (emits `compact-runtime` 0.15.0 artifacts, matching the
    midnight-js 4.0.4 / ledger-v8 SDK line this repo deploys with) into
    four circuits — `enroll`, `attest`, `checkReceipt`, `publishReport` — with proving
    and verifier keys. Private state (salaries, gender markers, employee secrets) enters
    circuits only as witness data; the ledger holds commitments, nullifiers, attestations
    and the proven report. The mean gap is verified **without division in-circuit** via
    cross-multiplied bounds on the claimed basis-points figure.
  - `sim/protocol.ts` — a TypeScript simulator mirroring the circuit semantics.
  - `test/circuits.test.ts` — circuit-level tests that execute the **compiler-generated
    contract module** through `@midnight-ntwrk/compact-runtime`: real ledger state
    transitions, Merkle receipt paths via `findPathForLeaf`, and every assertion
    (double-enroll, non-employer attest, omitted employee, false gap claim, duplicates)
    failing with the message the circuit throws.
  - `test/protocol.test.ts` — protocol-semantics tests against the simulator.
  - 21 passing vitest cases in total.
  - `pnpm test` runs the suite; `pnpm compile` runs the Compact compiler
    (`compact` CLI on PATH — on Windows, via WSL).
- `webapp/` — the product site with a **live in-browser protocol demo**
  (enroll → attest → publish, plus adversarial toggles that get rejected by the same
  assertions the circuit enforces). Vite + React + TypeScript, Tailwind CSS v4,
  Framer Motion, lucide-react. `pnpm install && pnpm dev`.
- `brand/` — logo exploration artboards and brand canvas.

## Roadmap (The Midnight Buildathon)

- **Wave 1 (Aug 27 – Sep 16):** Compact contract with private-state management
  (compiling, keys built), protocol simulator with a passing test suite, the
  interactive demo, and **end-to-end execution on a local Midnight network with
  real zero-knowledge proofs**: `pnpm network:up && pnpm demo:standalone` in
  `contract/` deploys the contract, enrolls four employees, attests each record,
  and publishes a proven PayReport — every transaction proven by the Midnight
  proof server, with no salary ever leaving private state. During the wave:
  wallet-connected webapp against the deployed contract, plus hardening.
- **Wave 2 (Sep 27 – Oct 17):** cohort-threshold category queries; employer, employee
  and regulator dashboards; simulation and test-suite hardening.
- **Wave 3 (Oct 27 – Nov 16):** roster-integrity ceremony with payroll-provider
  attestation, the per-category Article 10 joint-assessment trigger, and an
  Article 9-shaped filing pack (proof hash + verify URL) for compliance teams.

## License

Midnight-related code developed for the Buildathon is released under the **Apache License 2.0**.
