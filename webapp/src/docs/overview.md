# Overview

Equilux lets a company **prove** that its gender pay-gap report is true, without showing anyone's salary.

> **Prefer to watch?** [The 2½-minute film](https://youtu.be/lYivT3qvzZM) shows the whole idea, start to finish.

## The problem in one minute

From **7 June 2027**, a new EU law (the Pay Transparency Directive, 2023/970) makes companies publish how much less women are paid than men, on average and in several other ways.

- Companies with **250 or more** workers report **every year**.
- Companies with **150 to 249** workers report **every three years**.
- Companies with **100 to 149** workers start in **2031**.

Today these reports are **self-declared**. The company does its own sums and publishes a number. Nobody outside can check it, because checking would mean looking at everyone's salary, and nobody should see that.

So a report can leave people out, bend a few figures, or simply be wrong, and nobody can tell.

## What Equilux does

Equilux makes the report **checkable by anyone, while every salary stays private**.

| Without Equilux | With Equilux |
|---|---|
| The company says "our gap is 4%". | The company **proves** "our gap is 4%". |
| You have to trust the spreadsheet. | Anyone can check the proof in a few seconds. |
| Leaving someone out goes unnoticed. | The report must cover **every** payroll row, or it is refused. |
| Staff cannot tell if they were counted. | Each employee can check **their own** record was counted, once. |
| Salaries are seen by whoever checks. | **No salary** is ever published or shared. |

## The idea, simply

Think of a **sealed envelope** for every salary.

1. The **payroll company** seals each employee's pay in an envelope and pins all the envelopes on a public board. Anyone can count them, nobody can open them.
2. The **works council** (the staff representatives) checks each envelope against the real payroll.
3. Each **employee** confirms "that envelope is mine, and it's right".
4. The company computes the pay-gap figures **from the sealed envelopes** and attaches a mathematical proof that the sums are correct.
5. **Anyone** can check the proof. The figures are published; the envelopes stay shut.

The "mathematical proof" is a **zero-knowledge proof**: a way to prove a calculation was done correctly without showing the numbers that went into it. Equilux runs on **Midnight**, a blockchain built for exactly this: keeping data private while proving things about it.

## What gets published

All seven figures the law asks for, each one proven:

1. The average pay gap
2. The middle (median) pay gap
3. The gap in bonuses and other variable pay, on average
4. The gap in variable pay at the middle
5. The share of women and of men who get variable pay
6. How many women and men are in each quarter of the pay scale, lowest to highest
7. The gap inside each group of workers doing comparable work ("worker categories"), with any gap of **5% or more** flagged

And one extra: **the gap inside equal job levels**, with each level's mix of women and men always shown.

> **Small groups stay private.** If a group has fewer than 3 women or fewer than 3 men, its pay is not shown, so nobody can work out a colleague's salary.

## Where it stands today

- **Live** at [equilux-lac.vercel.app](/): you can run the whole report in your browser, nothing to install.
- **Proven on Midnight's public test network**: a 32-person company, 58 transactions, all reports published. [See it](/verify?network=preprod&contract=7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f).
- Handles companies of **up to 512 people** per report, tested at 250.
- **Not yet in use** by any company. Free pilots are open.

Next: [Use cases](/docs/use-cases) shows who uses Equilux and when.
