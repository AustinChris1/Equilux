# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary (confirmed 2026-10-01): hackathon judges** for the Midnight Buildathon on AKINDO. They review many projects in minutes each; they must see the protocol working, and evidence that it runs on Midnight, before anything else.
- Secondary: EU employers (HR / CPO) facing the first pay-transparency reports, their payroll providers, works councils, and monitoring bodies (regulators).

## Product Purpose

Equilux is the first employee-verifiable pay-transparency reporting protocol. A company proves its gender pay-gap report under Directive (EU) 2023/970 was computed from its complete, real payroll, while no individual salary is revealed to the public, colleagues, the regulator, or Equilux. Success: a regulator or employee can verify the report instead of trusting it.

## Positioning

Zero-knowledge proofs on Midnight's dual ledger: salaries live only in private state; the chain holds commitments, payroll-row hashes, and the proven figures. The payroll provider commits every payroll row, the works council confirms it, each employee proves their sealed record matches their row, and two circuits verify all seven Article 9 indicators. A dashboard can be copied; the proof cannot. Equilux is a verification layer next to the HRIS (Personio, DATEV, Workday), not a replacement.

## Operating Context

- Four parties: employer, payroll provider, works council, employee; plus the regulator who reads the report.
- Legal hooks: first reports due 7 June 2027 from 2026 pay data (250+ employees; 150+ same date); a ≥ 5% unexplained category gap triggers a joint pay assessment (Art. 10); Art. 7 gives employees the right to ask what their category earns.
- Surfaces: landing `/`, workspace `/app` (the compiled contract running in the browser, or live against a local Midnight node), verifier `/verify` (reads a contract from a Midnight indexer, checks a filing pack).

## Capabilities and Constraints

- Contract v3: 6 circuits (declareRoster, confirmPayroll, enroll, checkReceipt, publishReport, publishVariablePay), 55 tests (45 on compiled circuits). All seven Article 9 indicators.
- k = 3 suppression for category figures; binary gender markers per the Directive's annex; annual pay; sized instance of 16 records / 4 categories.
- Proven end to end with real proofs on a local Midnight node. Public preprod deployment in progress (Midnight's stable wallet SDK cannot sync preprod; a patched release-candidate wallet can). Never claim preprod or mainnet until a deployment record exists.
- Hosting: static Vercel only; no servers of ours.

## Brand Commitments

- Name Equilux; logo the Equals Seal (an equals sign with one side hollow).
- Palette olive #202B22 and royal yellow #FFD85F (confirmed binding 2026-10-01).
- Fonts Schibsted Grotesk (display), Instrument Serif (wordmark), Instrument Sans (body), Spline Sans Mono (labels) (confirmed binding).
- Tagline: "Prove everything · Reveal no one."
- Every fact and claim on the site stays as is: the honest-scope section stays.

## Evidence on Hand

- Live app with the 14-person demo company: mean gap 9.69%, median 1.81%, Engineering 13.88% flagged, Sales 3.70%, Operations suppressed; variable pay mean 27.50%, median 14.28%, recipients 5/7 women and 7/7 men, quartiles 2W/1M · 2W/2M · 2W/1M · 1W/3M.
- On-chain runs on a local Midnight node (contract 52e4a6c1…392d, blocks 36 / 103 / 113).
- Screenshot `webapp/public/regulator.webp`; stock hero photos (Unsplash) kept by the user's choice.
- No customers, pilots, testimonials, or press exist; none may be invented.

## Product Principles

1. Prove, don't claim: every figure shown is one the circuit verified.
2. Honest scope over hype: say what it does not do.
3. A plugin next to payroll systems, not a rival to them.
4. Privacy is structural: no salary on the chain, ever.
