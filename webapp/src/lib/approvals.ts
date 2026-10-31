/** Wallet approvals for a team of n under contract v4: deploy, roster (+1 per 16 rows), council and both reports per 16, one enroll each. */
export const approvalsFor = (n: number) => { const b = Math.ceil(n / 16); return 1 + (1 + b) + b + n + (2 + b) * 2; };
