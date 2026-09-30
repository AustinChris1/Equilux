# Equilux

**The first employee-verifiable pay-transparency reporting protocol. Built on Midnight.**

**Live site:** https://equilux-lac.vercel.app — open the Workspace and press **Run the full flow** ·
**Deck:** [`deck/Equilux-Wave1-deck.pdf`](deck/Equilux-Wave1-deck.pdf) · **Demo video:** [WAVE 2 VIDEO LINK]

Equilux lets a company prove that its legally required gender pay gap report was computed from its
complete, real payroll — every record sealed by the employee and vouched for by the payroll
provider — while no individual salary is ever revealed to the public, to colleagues, to the
regulator, or to Equilux.

## Wave 2 — what changed since Wave 1

Wave 1 received a grant; the judge asked for two things: *payroll-provider attestation* and
*a plugin for Workday / Personio rather than a standalone app*. Wave 2 builds both, plus the
Directive's next metrics, and puts the real contract on the public site.

| | Wave 1 | Wave 2 |
|---|---|---|
| Parties | employer, employee | employer, employee, **payroll provider** (own key) |
| Who vouches for records | the employer attested its own data | **the payroll provider** — the employer cannot |
| Leaving someone out | blocked only if they had enrolled | **blocked outright**: the provider declares the headcount before enrollment; the report must cover exactly that many |
| Statistics proven | company-wide mean gap | mean gap, **median gap**, **per worker-category** mean pay and gap |
| Article 7 (category pay) | designed | **published, k = 3**: a category's pay appears only when both groups have ≥ 3 people; smaller groups are suppressed |
| Circuits | 4 | **5** (`declareRoster` added) |
| Tests | 21 | **41** |
| Hosted site | a TypeScript replica of the rules | **the real compiled contract, running in the browser** on Midnight's WebAssembly runtime |
| HRIS integration | — | **Personio / DATEV CSV import** + a documented API a payroll plugin calls |

Verified this wave: every check of the v2 flow on a local Midnight network with real proofs
(three parties, two roster rejections, four cheat rejections, the honest report proven and
finalized), and the full flow plus all four cheats on the live Vercel site.

## Why now

The EU Pay Transparency Directive — Directive (EU) 2023/970 — makes gender pay gap reporting
mandatory. First reports are due **7 June 2027**, from **2026 pay data**, for every EU employer
with 250+ employees (150+ follow the same date). An *unjustified* gap of **5%** or more within a
**category of workers** forces a joint pay assessment, and Article 7 gives every employee the right
to ask what their category earns, by gender. Yet the report is self-declared: nobody can verify it
without seeing everyone's salary. That is the gap zero-knowledge proofs close.

## How it works

1. **The payroll provider declares the roster** — the headcount from payroll, committed on-chain
   before anyone enrolls.
2. **Each employee seals their record** — salary, gender marker and worker category become one
   commitment and one nullifier. Nothing else reaches the chain.
3. **The payroll provider attests** each record it recognises. The employer cannot attest.
4. **The employer publishes the report.** One `publishReport` circuit verifies, over the complete
   attested set, every figure it discloses — and discloses nothing else.
5. **Anyone verifies.** The regulator reads a proven report; each employee proves their record was
   counted with a Merkle-path receipt (`checkReceipt`).

Midnight's dual ledger carries the design: salaries, gender markers, categories and secrets exist
only as **private-state witnesses**; the role keys (hashed), the roster headcount, commitments,
nullifiers, attestations and the proven report live in **public state**. Every witness value that
reaches the ledger passes an explicit `disclose()`.

### What `publishReport` proves

- **Roster completeness** — the witness covers exactly `declaredHeadcount` records, each enrolled
  (nullifier present) and provider-attested (commitment present), pairwise distinct.
- **Mean gap** — verified without division: `g·base ≤ diff·10000 < (g+1)·base`.
- **Median gap** — the *lower* median per gender, verified by rank counting (fewer than half strictly
  below, at least half at or below). No sort in-circuit; a wrong value fails one of the counts.
- **Per worker category** — mean pay per gender and the gap, each verified the same way, and
  published only when both cohorts have ≥ 3 people. Otherwise the category shows headcounts only.

Every figure is supplied by the prover as a claim and **checked**, never trusted. A claim one basis
point off is rejected.

## Scope and threat model

A compliance tool that overstates itself is worse than none, so the boundary is explicit.

**What it does not claim:**

- *Salaries hidden from HR.* The employer already holds payroll and supplies it to the report
  circuit. Equilux hides salaries from the public, colleagues, the regulator and us. What changed
  in Wave 2 is that the employer can no longer vouch for its own data.
- *An honest roster by itself.* The payroll provider declares the headcount; a provider colluding
  with the employer could under-declare. Separating the parties is the point; a works-council
  co-signature on the roster is the next step.
- *Judging what is justified.* The circuit proves category gaps and flags those at 5% or more.
  Whether a gap is justified by objective, gender-neutral criteria is a human judgement.
- *All of Article 9.* Three of seven indicators are proven: the mean gap, the median gap, and the
  gap by worker category on basic pay. Variable-pay gaps, the share receiving variable pay and
  quartile composition remain.
- *Production scale.* A sized instance: 16-record witness, 32 commitment slots, 4 categories.
  Sizing is a compile-time parameter per employer band.
- *Gender beyond the Directive's annex.* Binary reporting markers, as the annex is written today.
- *The public testnet.* Proven end to end on a local Midnight network. Midnight's current stable
  wallet SDK fails while syncing preprod (a WebAssembly `unreachable` inside the SDK); deployment
  follows its fix. The probe is `contract/deploy/probe-preprod.ts`.

## Try it

**On the live site (no install):** https://equilux-lac.vercel.app → Workspace → **Run the full
flow**. The page executes the compiled contract — `contract/build/contract/index.js` — on
Midnight's WebAssembly runtime: the same circuits, hashes, Merkle tree and assertions as on-chain,
without proof generation. Then open the Employer tab, pick a cheat, and publish: the circuit
rejects it with its own message.

**With real proofs on a Midnight network:**

```bash
cd contract
pnpm install
pnpm network:up      # Midnight node + indexer + proof server (Docker)
pnpm app:server      # API on http://127.0.0.1:8787 — syncs the genesis wallet first
```

Then `cd webapp && pnpm install && pnpm dev` and open http://localhost:5173. The Workspace detects
the API and switches to live mode: each action is proven by the proof server and finalized on the
node (20–90 s each). Add `?mode=browser` to force the in-browser contract. The same three-party
flow runs as one script with `pnpm demo:standalone`.

**Tests:** `cd contract && pnpm test` — 41 tests. The first time a fresh proof-server container
starts, it downloads proving parameters for a minute or two; deploys fail until that finishes.

## Integration surface (the plugin)

Equilux sits next to the HRIS rather than replacing it. The API a payroll-provider plugin calls:

| Endpoint | Party | Circuit |
|---|---|---|
| `POST /api/import/csv` `{csv}` | provider | — (parses Personio / DATEV exports; no chain write) |
| `POST /api/deploy` `{employerSecret, providerSecret}` | employer | constructor |
| `POST /api/roster` `{headcount}` | provider | `declareRoster` |
| `POST /api/enroll` `{salary, gender, category, secret}` | employee | `enroll` |
| `POST /api/attest` `{commitment}` | provider | `attest` |
| `POST /api/publish` `{payroll}` | employer | `publishReport` |
| `POST /api/receipt` `{commitment}` | employee | `checkReceipt` |
| `GET /api/ledger`, `/api/status`, `/api/jobs/:id` | anyone | reads from the indexer |

Writes return `202 {jobId}`; poll the job for the proof and finality log. Every circuit is first
executed locally against the live on-chain state, so a rejected witness returns the circuit's
assertion in milliseconds and never enters the proving pipeline. In production each party runs its
own prover with only its own secret; the demo API plays all three from one process.

## Repository layout

- `contract/src/equilux.compact` — the contract: 5 circuits (`declareRoster`, `enroll`, `attest`,
  `checkReceipt`, `publishReport`). Compiled with the pinned toolchain `compact compile +0.30.0`
  (runtime 0.15.0, matching the midnight-js 4 / ledger-v8 SDK line). `contract/build/` holds the
  generated module, ZKIR and keys (`pnpm compile`).
- `contract/deploy/claims.ts` — prover-side arithmetic producing the exact figures the circuit
  accepts (shared by the API, the CLI, the tests and the browser).
- `contract/deploy/payroll-csv.ts` — Personio / DATEV CSV import.
- `contract/deploy/server.ts`, `client.ts`, `witnesses.ts` — the API and Midnight wiring;
  `standalone-demo.ts` — the scripted run; `standalone.yml` — node, indexer, proof server.
- `contract/test/` — `circuits.test.ts` drives the compiler-generated contract through
  `@midnight-ntwrk/compact-runtime` (roster, roles, receipts, every statistic, every rejection);
  `payroll-csv.test.ts` covers the importer and claim arithmetic; `protocol.test.ts` covers the
  Wave 1 simulator.
- `webapp/` — the product. `src/lib/browser-contract.ts` runs the compiled contract in the page;
  `src/components/Workspace.tsx` is the four-party workspace. Vite + React + TypeScript,
  Tailwind v4, Framer Motion.
- `deck/` — pitch deck. `brand/` — logo artboards.

## Roadmap

- **Wave 1 (delivered):** contract with private-state management, proven end to end on a Midnight
  network, employer / employee / regulator workspace.
- **Wave 2 (this wave):** payroll-provider role, roster, median and category gaps, k = 3 category
  pay, the compiled contract in the browser, CSV import.
- **Wave 3:** public testnet deployment and Lace wallet writes; variable-pay gaps and quartiles
  (full Article 9); an Article 9 filing pack with proof hash and verify URL; one named pilot with a
  works council and an EU employer.

## Brand

The mark is the **Equals Seal**: an equals sign where only one side is shown. The solid bar is the
published aggregate, the hollow bar the sealed payroll it was proven from. **Equilux** is the day
night and day are exactly equal.

## License

Midnight-related code developed for the Buildathon is released under the **Apache License 2.0**.
