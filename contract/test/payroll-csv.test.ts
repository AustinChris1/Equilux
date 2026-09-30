import { describe, expect, it } from "vitest";
import { parsePayrollCsv } from "../deploy/payroll-csv.js";
import { buildClaim, lowerMedian, gapBps } from "../deploy/claims.js";

describe("payroll CSV import (HRIS exports)", () => {
  it("parses a Personio-style export with departments as worker categories", () => {
    const csv = [
      "First name,Last name,Gender,Department,Annual salary",
      "Ada,Serrano,female,Engineering,62000",
      "Ben,Keller,male,Engineering,71000",
      "Cai,Okafor,female,Sales,55000",
    ].join("\n");
    const { rows, categories, errors } = parsePayrollCsv(csv);
    expect(errors).toEqual([]);
    expect(categories).toEqual(["Engineering", "Sales"]);
    expect(rows).toEqual([
      { name: "Ada Serrano", salary: 62000, gender: 0, category: 0, categoryLabel: "Engineering" },
      { name: "Ben Keller", salary: 71000, gender: 1, category: 0, categoryLabel: "Engineering" },
      { name: "Cai Okafor", salary: 55000, gender: 0, category: 1, categoryLabel: "Sales" },
    ]);
  });

  it("parses a DATEV-style export: semicolons, German headers, 62.000,00 amounts", () => {
    const csv = ["Name;Geschlecht;Tätigkeit;Jahresbrutto", "Müller;weiblich;Buchhaltung;48.500,00", "Schmidt;männlich;Buchhaltung;51.200,50"].join("\n");
    const { rows, errors } = parsePayrollCsv(csv);
    expect(errors).toEqual([]);
    expect(rows.map((r) => [r.name, r.gender, r.salary])).toEqual([["Müller", 0, 48500], ["Schmidt", 1, 51201]]);
  });

  it("reports unusable rows instead of guessing", () => {
    const csv = ["name,gender,category,salary", "A,female,Ops,50000", "B,unknown,Ops,50000", "C,male,Ops,-1"].join("\n");
    const { rows, errors } = parsePayrollCsv(csv);
    expect(rows).toHaveLength(1);
    expect(errors).toHaveLength(2);
    expect(errors[0]).toMatch(/not a Directive reporting category/);
    expect(errors[1]).toMatch(/not a positive amount/);
  });

  it("caps categories at the instance's size", () => {
    const csv = ["name,gender,category,salary", ...["A", "B", "C", "D", "E"].map((c) => `${c},female,${c},50000`)].join("\n");
    const { categories, errors } = parsePayrollCsv(csv);
    expect(categories).toHaveLength(4);
    expect(errors[0]).toMatch(/exceeds this instance's 4 categories/);
  });

  it("requires gender and salary columns", () => {
    expect(parsePayrollCsv("name,department\nA,Ops").errors).toEqual([
      "no gender column (gender / sex / geschlecht)",
      "no salary column (salary / annual salary / jahresbrutto)",
    ]);
  });
});

describe("claim arithmetic mirrors the circuit", () => {
  it("lower median picks x[(n-1)/2]", () => {
    expect(lowerMedian([3n, 1n, 2n])).toBe(2n);
    expect(lowerMedian([4n, 1n, 3n, 2n])).toBe(2n);
  });

  it("gap is floored and symmetric in direction", () => {
    expect(gapBps(90n, 1n, 100n, 1n)).toEqual({ bps: 1000n, favorsMen: true });
    expect(gapBps(100n, 1n, 90n, 1n)).toEqual({ bps: 1000n, favorsMen: false });
  });

  it("suppresses category figures below k = 3", () => {
    const sk = new Uint8Array(32);
    const claim = buildClaim([
      { salary: 50n, gender: 0n, category: 0n, sk },
      { salary: 60n, gender: 1n, category: 0n, sk },
    ]);
    expect(claim.catMeanWomen[0]).toBe(0n);
    expect(claim.catGapBps[0]).toBe(0n);
  });
});
