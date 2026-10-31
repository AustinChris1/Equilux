# Who would pay for Equilux? (desk research, Wave 3)

**What this is:** desk research from public sources, written to answer the Wave 2 business feedback
("identify who would fund it"). **What it is not:** customer validation. No employer, works council or
payroll provider has been interviewed yet; every point below is a hypothesis to test in those
conversations.

## The market the law creates
- The EU Pay Transparency Directive (2023/970) makes the gender pay gap report mandatory. Employers with
  **250+ workers** report from **7 June 2027 and every year after**; those with **150 to 249** report by the
  same date and then **every three years**.
- Eurostat counts about **53,000** EU enterprises with 250 or more persons employed (2023, preliminary): only
  0.2% of firms, but they employ over a third of the business workforce. That is the annual-report market
  alone, before the 150 to 249 band.
- Contract v4 was built for this size: it proves the full report for companies of up to 512 people today, in
  batches of 16, and the instance size is a compile-time parameter.

## Who pays: three hypotheses, most likely first
1. **The employer pays, through its payroll provider.** The obligation is the employer's, but the data and
   the buying relationship sit with the HRIS or payroll provider (Personio, DATEV and their partners). Equilux
   fits as an add-on the provider resells per employee per year: the provider commits the payroll rows it
   already holds, the employer buys a report regulators and staff can check. To test: would a provider list it,
   and at what margin?
2. **The employer pays directly, to reduce dispute risk.** The Directive shifts the burden of proof to the
   employer in pay-discrimination cases (Article 18). A report whose figures are proven over the complete,
   employee-confirmed payroll is evidence an employer can point to, which a self-declared spreadsheet is not.
   To test: do employment lawyers and HR leads value that enough to pay for it?
3. **Works councils ask for it.** In Germany works councils have co-determination rights on pay structures
   (Betriebsverfassungsgesetz §87(1) no. 10). A council that can check every payroll row without seeing names
   may push its employer to adopt Equilux. Councils rarely pay, but they can make adoption a condition.

## The objection the judges raised, and the honest answer
*"Employers may see employee verification as extra process."* It is extra process: one confirmation per
employee, once per report. The case for it is that this step is what turns the report from a claim into
evidence: without it, the employer could still invent or edit records. Ways to make it lighter, to test with
employers: confirmation inside the payslip portal the employee already uses (a link, no wallet), and fees
sponsored by the employer's account so nobody handles a token.

## Competitors and pricing (what is public)
- Pay-equity tools such as Syndio, Trusaic PayParity and Figures analyse pay and help write the report. Their
  prices are not published (quote only); third-party buyer guides estimate mid-market contracts in the tens
  of thousands of dollars a year. We could not verify those figures.
- None of them makes the report **verifiable by third parties without revealing salaries**. That is the gap
  Equilux fills, and the reason it can sit beside them rather than replace them.

## Next steps (Wave 3 and after)
1. Three conversations: one HR or compliance lead at a 250+ employer, one works council member, one payroll
   provider or partner. Questions: would you use it, who would pay, and what would it have to cost?
2. A one-page offer for payroll providers: what they commit (row hashes they already hold), what the employer
   gets, and a per-employee price to test.

## Sources
- Eurostat, "Large businesses make up only 0.2% of EU enterprises" (5 Dec 2024): https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20241205-1
- Directive (EU) 2023/970, reporting obligations (Article 9) and burden of proof (Article 18): https://eur-lex.europa.eu/eli/dir/2023/970/oj
- Lewis Silkin, Pay Transparency Directive FAQs (2026): https://www.lewissilkin.com/insights/2026/06/25/pay-transparency-directive-faqs
- Pay-equity software buyer guides (2026): https://www.orbiqhq.com/eu-regulations/pay-equity-software , https://www.hrstechspace.com/compliance-and-security/syndio-review
