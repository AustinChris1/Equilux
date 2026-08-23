import { describe, it, expect } from "vitest";
import {
  EquiluxSim,
  trueGapBps,
  verifyGapClaim,
  type PayRecord,
} from "../sim/protocol";

const EMPLOYER_SK = "employer-secret";

const company = (): PayRecord[] => [
  { salary: 62_000_00n, gender: 0, sk: "alice" },
  { salary: 71_000_00n, gender: 1, sk: "bob" },
  { salary: 55_000_00n, gender: 0, sk: "carol" },
  { salary: 68_000_00n, gender: 1, sk: "dan" },
  { salary: 90_000_00n, gender: 0, sk: "erin" },
  { salary: 105_000_00n, gender: 1, sk: "frank" },
];

function enrollAll(sim: EquiluxSim, payroll: PayRecord[]) {
  for (const rec of payroll) sim.attest(EMPLOYER_SK, sim.enroll(rec));
}

describe("enrollment", () => {
  it("issues a commitment and receipt per employee", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const cm = sim.enroll(company()[0]);
    expect(sim.checkReceipt(cm)).toBe(true);
    expect(sim.enrolled).toBe(1);
  });

  it("rejects double enrollment via nullifier", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    sim.enroll(company()[0]);
    expect(() => sim.enroll(company()[0])).toThrow("already enrolled");
  });

  it("only the employer can attest", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const cm = sim.enroll(company()[0]);
    expect(() => sim.attest("intruder", cm)).toThrow("not the employer");
  });
});

describe("publishReport", () => {
  it("publishes a correct report for the full attested payroll", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    enrollAll(sim, payroll);

    const women = payroll.filter((r) => r.gender === 0);
    const men = payroll.filter((r) => r.gender === 1);
    const claim = trueGapBps(
      women.reduce((a, r) => a + r.salary, 0n), BigInt(women.length),
      men.reduce((a, r) => a + r.salary, 0n), BigInt(men.length),
    );

    const report = sim.publishReport(EMPLOYER_SK, payroll, claim);
    // women mean 69k, men mean 81.33k → gap ≈ 15.16%
    expect(report.meanGapBps).toBe(1516);
    expect(report.gapFavorsMen).toBe(true);
    expect(report.breachesThreshold).toBe(true);
    expect(report.headcountWomen).toBe(3);
    expect(report.headcountMen).toBe(3);
  });

  it("rejects a lowballed gap claim", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    enrollAll(sim, payroll);
    expect(() => sim.publishReport(EMPLOYER_SK, payroll, 100n)).toThrow(
      "claimed gap does not match",
    );
  });

  it("rejects a report that omits an enrolled employee", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    enrollAll(sim, payroll);
    const cherryPicked = payroll.slice(1); // drop the first woman
    expect(() => sim.publishReport(EMPLOYER_SK, cherryPicked, 0n)).toThrow(
      "cover every enrolled employee",
    );
  });

  it("rejects records the employer never attested", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    for (const rec of payroll) sim.enroll(rec);
    expect(() => sim.publishReport(EMPLOYER_SK, payroll, 0n)).toThrow("not attested");
  });

  it("rejects invented records that were never enrolled", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    enrollAll(sim, payroll);
    const forged: PayRecord = { salary: 500_000_00n, gender: 0, sk: "ghost" };
    const cm = new EquiluxSim(EMPLOYER_SK); // fresh sim to mint a commitment offline
    void cm;
    expect(() =>
      sim.publishReport(EMPLOYER_SK, [...payroll.slice(0, 5), forged], 0n),
    ).toThrow("not attested");
  });

  it("rejects counting the same employee twice", () => {
    const sim = new EquiluxSim(EMPLOYER_SK);
    const payroll = company();
    enrollAll(sim, payroll);
    const padded = [...payroll.slice(0, 5), payroll[0]];
    expect(() => sim.publishReport(EMPLOYER_SK, padded, 0n)).toThrow("duplicate record");
  });
});

describe("division-free gap verification", () => {
  it("accepts exactly the floor of the true ratio and nothing else", () => {
    const [sumW, cntW, sumM, cntM] = [207_000_00n, 3n, 244_000_00n, 3n];
    const g = trueGapBps(sumW, cntW, sumM, cntM);
    expect(verifyGapClaim(sumW, cntW, sumM, cntM, g).ok).toBe(true);
    expect(verifyGapClaim(sumW, cntW, sumM, cntM, g - 1n).ok).toBe(false);
    expect(verifyGapClaim(sumW, cntW, sumM, cntM, g + 1n).ok).toBe(false);
  });

  it("handles a gap favoring women", () => {
    const { ok, favorsMen } = verifyGapClaim(100_000n, 1n, 90_000n, 1n, 1000n);
    expect(ok).toBe(true);
    expect(favorsMen).toBe(false);
  });

  it("handles perfect parity", () => {
    const { ok, favorsMen } = verifyGapClaim(80_000n, 2n, 80_000n, 2n, 0n);
    expect(ok).toBe(true);
    expect(favorsMen).toBe(true); // ties resolve to the favorsMen branch with diff 0
  });
});
