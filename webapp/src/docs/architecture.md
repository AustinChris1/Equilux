# Architecture

What runs where, what stays private, and what goes public. Plain words first; the technical names are in the tables for those who want them.

![How Equilux fits together: private data on each person's device, proofs to Midnight, anyone reads the public result](/docs-assets/architecture.svg)

## The three parts

### 1. The contract: the rules everyone must follow

The rules of a pay-gap report are written as a **smart contract** in Compact, Midnight's language for private contracts. It has **14 circuits**, one for each action: seal payroll rows, approve them, confirm a record, and the three reports (each as *begin, batch, finish*).

A circuit is a set of checks. If any check fails ("this row is not in the payroll", "this person was already counted", "the gap is not 0%"), the action is refused, with a plain message saying why.

### 2. The browser: where private data stays

The app runs the **compiled contract inside the browser**. Salaries, genders, job levels and personal secrets are used there as **private inputs** and never sent anywhere. When an action is real (with a connected wallet), a **zero-knowledge proof** is made that the checks passed, without revealing the inputs.

### 3. Midnight: the public record

Only the proof and a few sealed values go to **Midnight**. The network checks the proof and records the result. Anyone can read that record, through [the verify page](/verify) or a block explorer.

## What is private, what is public

| Information | Where it lives | Who can see it |
|---|---|---|
| Each salary and bonus | the payroll provider's device; each employee's own device | payroll and HR (as today), and the employee |
| Gender and job level per person | the same | the same |
| Each person's secret key | their own device | only them |
| Sealed payroll rows (hashes) | Midnight | everyone, but they reveal nothing |
| Anonymous "I confirmed" marks | Midnight | everyone, but they don't say who |
| Running totals between batches | Midnight, **sealed** | nobody: only a seal of them is stored |
| The proven figures | Midnight | everyone |

> **Why the running totals are sealed.** A big company is counted 16 people at a time. If the totals were public after each batch, anyone could work out what the first 16 people earn. So the chain keeps only a sealed copy, and each batch proves it continued from the last one correctly.

## Size and speed

- **Up to 512 people** per report, counted in batches of 16. The size is set when the contract is built.
- A report for *n* people takes about **n + 5 × (n ÷ 16) + 16** transactions. For 32 people that was **58**; for 250 it would be about **346**.
- In the browser (without making proofs), a 250-person company runs all three reports in about half a minute.

## The pieces, by name

| Piece | What it is | Where |
|---|---|---|
| Contract | Compact, 14 circuits, compiled with `compact` 0.30 | `contract/src/equilux.compact` |
| Report arithmetic | builds the claims each circuit checks (averages, medians, quartiles) | `contract/deploy/claims.ts` |
| Web app | React + Vite, runs the compiled contract on Midnight's WebAssembly runtime | `webapp/` |
| Wallet connection | Midnight DApp connector (Lace, 1AM) | `webapp/src/lib/wallet-chain.ts` |
| Proving keys | built from the contract and served from GitHub Pages | `.github/workflows/keys.yml` |
| Reading the chain | Midnight indexer via Blockfrost, through a read-only proxy | `webapp/api/indexer.js` |
| Testnet run | a GitHub Actions workflow that deploys and runs a 32-person company | `.github/workflows/preprod-v4.yml` |
| Tests | 73 tests on the compiled circuits, including a 250-person company | `contract/test/` |

## Honest limits

- **HR still holds the payroll.** Equilux hides salaries from everyone else, not from the people who run payroll.
- **Collusion.** If the payroll provider, the employer and the works council all lie together, they could seal false rows. Each employee would see their own row is wrong.
- **Fairness is a human judgement.** Equilux proves gaps and flags those of 5% or more. Whether a gap is justified, or whether job levels themselves are fair, is for people to decide.
- **Test network.** Everything runs on Midnight's public test network today, not on its main network.
- **Gender.** Reported as women and men, as the Directive's reporting rules are written today.

Next: [Business model](/docs/business-model).
