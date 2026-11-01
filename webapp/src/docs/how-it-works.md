# How it works

A guided tour you can follow in about five minutes, in your browser. Nothing to install, nothing to sign up for.

## The five steps, in plain words

Every Equilux report goes through the same five steps, each done by a different person with their own key:

| Step | Who | What happens | What becomes public |
|---|---|---|---|
| 1. Seal the payroll | Payroll provider | Turns every payroll row into a sealed code | The sealed codes only |
| 2. Check it | Works council | Opens each sealed row against the real payroll and approves | "The council approved" |
| 3. Confirm | Each employee | Confirms their own sealed row is theirs and correct | One anonymous mark per person |
| 4. Publish | Employer | Calculates the figures and proves them | The proven figures |
| 5. Verify | Anyone | Checks the proof, and their own record | Nothing new: it only reads |

## Try it yourself

### Step 1: Play the whole story

1. Open [the app](/app).
2. Press **Play the whole story**.

In a few seconds a sample company of 14 invented people goes through all five steps. At the end you see the published report: a **9.69%** average gap, the gap per group, bonuses, and the quarters of the pay scale.

> **This is the real contract.** The page runs the same compiled code that runs on Midnight, in your browser. The only thing skipped is making the proofs, which takes longer (see step 6).

### Step 2: Try to cheat

Press **Try to cheat** and pick a trick: add an employee who doesn't exist, raise someone's salary, leave someone out, or say the gap is 0%.

Each one is **refused**, and the page shows the contract's own reason. There are 11 tricks; none gets through.

### Step 3: A company the size the law means

1. Press **Start over**.
2. Open **Use your own payroll** and choose **250-person company**.
3. Press **Play the whole story** again.

The report is now proven **16 people at a time** in batches, the way a real 250-person company would be. It takes about half a minute.

### Step 4: Your own payroll (optional)

Under **Use your own payroll**, press **Upload a CSV** and choose a Personio or DATEV payroll export. The file is read **inside your browser**: nothing is uploaded. Columns for salary, bonus, gender, worker group and job level are recognised automatically.

### Step 5: Check a real report on the blockchain

Open [the verify page for our test company](/verify?network=preprod&contract=7b4e8bab4075715a90c99c0460f49743b3bd6af5b4fb0ce6314118902051021f). It reads a real report from Midnight's public test network, made for a 32-person company:

- 32 payroll rows sealed, all checked by the council, 32 of 32 employees confirmed
- an average gap of **9.50%**, a middle gap of **3.40%**
- the gap inside job levels, with each level's mix of women and men

Follow the link to Midnight's explorer to see the same contract there.

### Step 6: Check your own record, as an employee

Open [the check page](/check) and press **Try an employee from the testnet run**. You are now one of those 32 people. The page shows your record step by step, and what women and men in your group earn.

Now change the salary by €100 and press **Check** again: **no row matches**. Your record cannot be bent, even by one euro.

### Step 7: With your own wallet (optional)

The **Connect wallet** button in the app connects a Midnight wallet (Lace or 1AM). Each step is then really proven and written to Midnight's test network, paid in its test fee token (DUST). This is how a real report is made; it takes longer, because real proofs take time.

## Questions people ask

**Can the company see my salary?** It already can: HR runs payroll. Equilux hides salaries from everyone else: colleagues, the public, the regulator, and us.

**What if I'm the only woman in my team?** Groups with fewer than 3 women or 3 men don't show pay, so nobody can work out your salary.

**What if the company leaves someone out?** It can't. The report must count every sealed payroll row, each exactly once, or the proof fails.

**Does the employee need crypto?** Not to check their record. To confirm it today, yes (a wallet); a payslip link with the fee paid by the employer is the next step.

Next: [Architecture](/docs/architecture) shows what is under the hood.
