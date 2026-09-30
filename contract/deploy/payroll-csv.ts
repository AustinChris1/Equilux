/**
 * Payroll export → Equilux rows.
 *
 * Accepts the column shapes HR systems actually export, case-insensitively:
 *   Personio  — "First name", "Last name", "Gender", "Department", "Annual salary", "Bonus"
 *   DATEV     — "Name", "Geschlecht", "Tätigkeit", "Jahresbrutto", "Sonderzahlung"
 *   generic   — name, gender, category, salary, variable
 *
 * The variable-pay column (bonus, commission, Sonderzahlung, Prämie …) is
 * optional; without it every row carries 0 variable pay.
 *
 * Gender maps female/f/w/weiblich → 0 and male/m/männlich → 1. Worker
 * categories are assigned by first appearance of each distinct department /
 * job group value (max 4 in this sized instance). Parsing is local — no
 * salary leaves the caller until an employee enrolls it as a commitment.
 */
export interface PayrollRow {
  name: string;
  salary: number;
  variable: number; // annual variable / complementary pay; 0 if none
  gender: 0 | 1;
  category: number;
  categoryLabel: string;
}

export interface ParsedPayroll {
  rows: PayrollRow[];
  categories: string[];
  errors: string[];
}

const GENDER_WOMAN = new Set(["female", "f", "w", "woman", "weiblich", "frau"]);
const GENDER_MAN = new Set(["male", "m", "man", "männlich", "maennlich", "mann"]);

const find = (headers: string[], names: string[]) => headers.findIndex((h) => names.includes(h));

function splitLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === sep && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

/** "62.000,00" (DATEV) and "62,000.00" / "62000" all parse to 62000. */
function parseAmount(raw: string): number {
  const s = raw.replace(/[€$£\s]/g, "");
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) return Math.round(Number(s.replace(/\./g, "").replace(",", ".")));
  if (/^\d+(,\d+)$/.test(s)) return Math.round(Number(s.replace(",", ".")));
  return Math.round(Number(s.replace(/,/g, "")));
}

export function parsePayrollCsv(csv: string, maxCategories = 4): ParsedPayroll {
  const lines = csv.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim().length > 0);
  const errors: string[] = [];
  if (lines.length < 2) return { rows: [], categories: [], errors: ["CSV needs a header row and at least one employee"] };

  const sep = (lines[0].match(/;/g)?.length ?? 0) > (lines[0].match(/,/g)?.length ?? 0) ? ";" : ",";
  const headers = splitLine(lines[0], sep).map((h) => h.toLowerCase());

  const iFirst = find(headers, ["first name", "firstname", "vorname"]);
  const iLast = find(headers, ["last name", "lastname", "nachname"]);
  const iName = find(headers, ["name", "employee", "mitarbeiter"]);
  const iGender = find(headers, ["gender", "sex", "geschlecht"]);
  const iCat = find(headers, ["category", "department", "job group", "job family", "tätigkeit", "taetigkeit", "abteilung"]);
  const iSalary = find(headers, ["salary", "annual salary", "base salary", "jahresbrutto", "gehalt", "brutto"]);
  const iVariable = find(headers, ["variable", "variable pay", "bonus", "annual bonus", "commission", "sonderzahlung", "prämie", "praemie", "variable vergütung"]);

  if (iGender < 0) errors.push("no gender column (gender / sex / geschlecht)");
  if (iSalary < 0) errors.push("no salary column (salary / annual salary / jahresbrutto)");
  if (errors.length) return { rows: [], categories: [], errors };

  const categories: string[] = [];
  const rows: PayrollRow[] = [];
  lines.slice(1).forEach((line, idx) => {
    const cells = splitLine(line, sep);
    const lineNo = idx + 2;
    const name = iFirst >= 0 ? `${cells[iFirst] ?? ""} ${iLast >= 0 ? cells[iLast] ?? "" : ""}`.trim() : iName >= 0 ? cells[iName] : `Employee ${lineNo - 1}`;
    const g = (cells[iGender] ?? "").toLowerCase();
    const gender = GENDER_WOMAN.has(g) ? 0 : GENDER_MAN.has(g) ? 1 : null;
    if (gender === null) { errors.push(`line ${lineNo}: gender "${cells[iGender]}" is not a Directive reporting category — skipped`); return; }
    const salary = parseAmount(cells[iSalary] ?? "");
    if (!Number.isFinite(salary) || salary <= 0) { errors.push(`line ${lineNo}: salary "${cells[iSalary]}" is not a positive amount — skipped`); return; }
    const rawVar = iVariable >= 0 ? (cells[iVariable] ?? "").trim() : "";
    const variable = rawVar === "" ? 0 : parseAmount(rawVar);
    if (!Number.isFinite(variable) || variable < 0) { errors.push(`line ${lineNo}: variable pay "${cells[iVariable]}" is not an amount — skipped`); return; }
    const label = iCat >= 0 && cells[iCat] ? cells[iCat] : "All staff";
    let category = categories.indexOf(label);
    if (category < 0) {
      if (categories.length >= maxCategories) { errors.push(`line ${lineNo}: category "${label}" exceeds this instance's ${maxCategories} categories — skipped`); return; }
      categories.push(label);
      category = categories.length - 1;
    }
    rows.push({ name, salary, variable, gender, category, categoryLabel: label });
  });

  return { rows, categories, errors };
}
