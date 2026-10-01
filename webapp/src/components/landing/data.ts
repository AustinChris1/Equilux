/**
 * The demo company the landing animates: the same 14 people as the app and the
 * on-chain runs, and the figures the circuits proved for them.
 */
export interface DemoPerson { name: string; salary: number; variable: number; gender: "W" | "M"; category: string }

export const PEOPLE: DemoPerson[] = [
  { name: "Ana", salary: 60_000, variable: 3_000, gender: "W", category: "Engineering" },
  { name: "Bea", salary: 62_000, variable: 4_000, gender: "W", category: "Engineering" },
  { name: "Chidi", salary: 64_000, variable: 0, gender: "W", category: "Engineering" },
  { name: "Dan", salary: 70_000, variable: 6_000, gender: "M", category: "Engineering" },
  { name: "Eli", salary: 72_000, variable: 7_000, gender: "M", category: "Engineering" },
  { name: "Felix", salary: 74_000, variable: 5_000, gender: "M", category: "Engineering" },
  { name: "Gia", salary: 50_000, variable: 2_000, gender: "W", category: "Sales" },
  { name: "Hana", salary: 52_000, variable: 2_500, gender: "W", category: "Sales" },
  { name: "Ivy", salary: 54_000, variable: 3_000, gender: "W", category: "Sales" },
  { name: "Jon", salary: 53_000, variable: 2_500, gender: "M", category: "Sales" },
  { name: "Kai", salary: 54_000, variable: 3_500, gender: "M", category: "Sales" },
  { name: "Leo", salary: 55_000, variable: 3_000, gender: "M", category: "Sales" },
  { name: "Mia", salary: 40_000, variable: 0, gender: "W", category: "Operations" },
  { name: "Ned", salary: 45_000, variable: 1_000, gender: "M", category: "Operations" },
];

/** A stable, illustrative hash per row (the real ones are Midnight persistentHash values). */
export function pseudoHash(seed: string): string {
  let h = 2166136261;
  let out = "";
  for (let round = 0; round < 4; round++) {
    for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ (seed.charCodeAt(i) + round * 31), 16777619);
    out += (h >>> 0).toString(16).padStart(8, "0");
  }
  return out;
}

export const euro = (n: number) => `€${n.toLocaleString("en-US")}`;

/** Proven for the demo company (publishReport + publishVariablePay). */
export const FIGURES = {
  meanGap: 9.69,
  medianGap: 1.81,
  variableMeanGap: 27.5,
  variableMedianGap: 14.28,
  recipients: { women: [5, 7], men: [7, 7] },
  quartiles: [ { w: 2, m: 1 }, { w: 2, m: 2 }, { w: 2, m: 1 }, { w: 1, m: 3 } ],
  engineeringGap: 13.88,
  salesGap: 3.7,
};

/** The demo company, deployed and proven on Midnight's public preprod testnet (2026-10-01). */
export const PREPROD_CONTRACT = "598b346e40e5233c605936b9430a80362773b778918b0a899d9bae025257d1cb";
export const PREPROD_VERIFY = `/verify?network=preprod&contract=${PREPROD_CONTRACT}`;

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
