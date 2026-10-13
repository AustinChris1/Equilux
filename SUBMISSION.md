# Equilux: Wave 2 submission

Paste-ready text for the AKINDO submission form. Each section is one field.

## Links

- GitHub repository (Apache-2.0, topic `midnightntwrk`): https://github.com/AustinChris1/Equilux
- README (project, setup, architecture, Midnight integration, how to test): https://github.com/AustinChris1/Equilux#readme
- Live app: https://equilux-lac.vercel.app/app (press **Play the whole story**, then **Try to cheat**)
- On-chain report, checkable by anyone: https://equilux-lac.vercel.app/verify?network=preprod&contract=598b346e40e5233c605936b9430a80362773b778918b0a899d9bae025257d1cb
- Contract on Midnight's preprod explorer: https://explorer.preprod.midnight.network/contracts/598b346e40e5233c605936b9430a80362773b778918b0a899d9bae025257d1cb
- Demo video: [WAVE 2 VIDEO LINK]
- Deck: https://github.com/AustinChris1/Equilux/blob/main/deck/Equilux-Wave2-deck.pdf

## Project description (short)

Equilux lets a company prove its legally required gender pay gap report was computed from its complete,
real payroll, while no salary is revealed. From June 2027 every EU employer with 250+ staff must publish
these figures (Directive (EU) 2023/970), and today the reports are self-declared: nobody can check them
without seeing everyone's pay. On Midnight, the payroll provider commits every payroll row as a sealed
code, the works council checks them, each employee confirms their own row, and the report is published
only if the circuits recheck every figure. Salaries stay private inputs; only proven figures go public.

## What changed since Wave 1

The Wave 1 judge asked for payroll-provider attestation and for a plugin for Workday / Personio rather
than a standalone app. Both are built, and more:

1. **Payroll-provider attestation.** The provider holds its own key and commits a hiding hash of every
   payroll row before anyone enrolls. An employee can only enroll a record that opens to an unclaimed
   row, so the employer can no longer invent a person, change anyone's pay, or leave someone out.
2. **Works council.** A third key opens every committed row against the payroll and approves
   (`confirmPayroll`); enrollment stays closed until it does.
3. **Plugin surface.** Personio / DATEV CSV import (read in the browser, never uploaded) and a documented
   API for each party's action.
4. **All seven Article 9 indicators** (Wave 1: the mean gap only): mean and median gap, gap per worker
   category with k = 3 suppression, variable-pay mean and median gap, share receiving variable pay, and
   pay quartiles. 6 circuits (Wave 1: 4).
5. **On Midnight's public testnet.** The full 14-person flow runs on preprod: deploy, payroll rows,
   council approval, 14 bound enrollments, both reports proven (blocks 2,787,450 to 2,787,556).
6. **Anyone can verify.** `/verify` reads the report from the chain and decodes it with the compiled
   contract; a downloadable filing pack is checked figure by figure against the chain.
7. **Connect wallet.** Any Midnight DApp-connector wallet (Lace, 1AM) connects from the header; each step
   is then proven and submitted from the visitor's own wallet, with fee (DUST) checks before every write.
8. **The real contract on the public site.** The hosted app runs the compiled Compact contract in the
   browser (Wave 1: a TypeScript replica), redesigned as a guided six-chapter story with 11 cheats a
   visitor can try, each refused in the contract's own words.
9. **Tests:** 55, of which 45 run the compiled circuits (Wave 1: 9).

## Progress completed during Wave 2 (evidence)

- Preprod deployment, every tx id and hash: `contract/preprod/deployment.json`; contract
  `598b346e…d1cb` on Midnight's preprod explorer (link above). Proven figures on chain: mean gap 9.69%,
  median 1.81%, Engineering 13.88% (flagged), Sales 3.70%, Operations suppressed, variable-pay mean gap 27.50%.
- The same flow with real proofs on a local Midnight network (`pnpm demo:standalone`).
- Live site: full flow, all 11 cheats refused, receipts, CSV import, `/verify` against preprod; checked
  end to end with automated browser runs.
- Midnight decommissioned its own preprod indexer on 2026-10-09; the site was moved to Blockfrost the same
  week through a read-only server-side proxy, so `/verify` keeps working.

## How privacy shapes the design (Midnight integration)

Salaries, gender markers, worker categories and secrets exist only as private-state witnesses. The public
ledger holds hashed role keys, the payroll-row hashes (blinded by payslip nonces, so a salary cannot be
brute-forced), commitments in a Merkle tree, nullifiers, and the proven reports. Every witness value that
reaches the ledger passes an explicit `disclose()` (24 in the contract). The report circuits verify every
claimed figure (no division, no sorting in-circuit) and disclose only aggregates; for categories with fewer
than 3 people per gender, not even those.

## Current state, stated precisely

- 6 circuits with proving keys; full flow proven on preprod and on a local network.
- The hosted app runs the compiled contract in the browser without proofs (practice mode); with a
  connected wallet the steps are proven and submitted on preprod. Connecting Lace is verified; a visitor's
  write needs DUST in that wallet.
- HR still holds payroll; a provider, employer and council colluding could commit false rows (each
  employee would see their own). Sized instance: 16 records, 4 categories. Binary gender markers, as the
  Directive's annex is written.

## How judges can test it

1. https://equilux-lac.vercel.app/app → **Play the whole story** (about two seconds).
2. **Try to cheat** → pick any trick, e.g. "Add an employee who doesn't exist" or "Say the gap is 0%".
3. **/verify** (link above): the real report on preprod; follow the contract link to Midnight's explorer.
4. `cd contract && pnpm install && pnpm test` (55 tests). Real proofs locally: `pnpm network:up && pnpm app:server`.
5. The contract: `contract/src/equilux.compact`.

## Wave 3 plan

A first full write from a visitor's wallet on video; a payroll-provider plugin against a real Personio
sandbox; larger instances per employer band; one named pilot with a works council and an EU employer.
