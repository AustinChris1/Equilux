# Equilux

**The first employee-verifiable pay-transparency reporting protocol. Built on Midnight.**

Equilux lets a company prove that its legally required gender pay gap report was computed
from its complete, real payroll — co-signed by its own employees — while no individual
salary is ever revealed to anyone: not the employer's HR team, not the regulator, not Equilux.

## Why now

The EU Pay Transparency Directive — Directive (EU) 2023/970 — makes gender pay gap reporting
mandatory. First reports are due **7 June 2027**, computed from **2026 pay data**, for every
EU employer with 250+ employees (150+ follow the same date). An unexplained gap of **5%** or
more in any worker category forces a joint pay assessment. Yet the report is self-declared:
today there is no way for an employee or regulator to verify the published numbers without
seeing everyone's salary. That is precisely the gap zero-knowledge proofs close.

## Four cryptographic guarantees

1. **Roster integrity** — the reporting set is committed on-chain before the report exists;
   employees cannot be quietly omitted after the fact.
2. **Inclusion receipts** — every worker holds a private receipt proving their record was
   counted, revealing nothing about them.
3. **Proven statistics** — mean/median gaps, quartiles and category analysis are computed
   inside a Compact zero-knowledge circuit over the committed payroll; the chain publishes
   only aggregates plus a proof.
4. **Cohort-safe queries** — employees get their legal right to category-level pay data,
   behind a minimum cohort threshold so no individual salary can be inferred.

Midnight's dual-ledger model carries the design: salaries live in **private state** and never
leave it; the roster root, aggregates, and proofs live in **public state** where anyone can verify.

## Brand

The mark is the **Equals Seal** — an equals sign where only one side is shown: the solid bar
is the published aggregate, the hollow bar is the sealed payroll it was proven from.
The name **Equilux** is the day night and day are exactly equal — equality, born at Midnight.
Palette: Olive `#202B22` · Royal Yellow `#FFD85F`.

## Repository layout

- `contract/` — the Midnight side.
  - `src/equilux.compact` — the Compact contract. **Compiles** (compiler 0.31.1) into
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
  (compiling, keys built), protocol simulator with a passing test suite, and the
  interactive demo — then deployment against a local Midnight network and proof
  generation through the generated contract API during the wave.
- **Wave 2 (Sep 27 – Oct 17):** cohort-threshold category queries; employer, employee
  and regulator dashboards; simulation and test-suite hardening.
- **Wave 3 (Oct 27 – Nov 16):** roster-integrity ceremony with payroll-provider
  attestation, automated 5% joint-assessment flag, pilot-ready packaging.

## License

Midnight-related code developed for the Buildathon is released under the **Apache License 2.0**.
