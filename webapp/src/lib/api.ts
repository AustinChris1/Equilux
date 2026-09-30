/** Client for the Equilux API (contract/deploy/server.ts). */

/**
 * Live proofs need a Midnight node + proof server. That stack is Docker on a
 * developer machine (or a hosted API). Vercel cannot reach 127.0.0.1, so we
 * only probe localhost when the page itself is served from localhost.
 *
 * Hosted override: set VITE_EQUILUX_API at build time to a public API URL.
 */
export function resolveApiBase(): string | null {
  const fromEnv = (import.meta.env.VITE_EQUILUX_API as string | undefined)?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    // ?mode=browser forces the in-browser contract even when a local API is running
    if (new URLSearchParams(window.location.search).get("mode") === "browser") return null;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://127.0.0.1:8787";
  }
  return null;
}

export const API_BASE = resolveApiBase();

export interface CategoryStats {
  headcountWomen: number;
  headcountMen: number;
  /** false when either cohort has fewer than 3 people — pay figures are then suppressed (0). */
  disclosed: boolean;
  meanWomen: number;
  meanMen: number;
  meanGapBps: number;
  gapFavorsMen: boolean;
  gapAtOrAbove5pct: boolean;
}

export interface PayReportOnChain {
  round: number;
  headcountWomen: number;
  headcountMen: number;
  meanGapBps: number;
  gapFavorsMen: boolean;
  meanGapAtOrAbove5pct: boolean;
  medianGapBps: number;
  medianFavorsMen: boolean;
  categories: CategoryStats[];
}

export interface VariableCategoryStats {
  recipientsWomen: number;
  recipientsMen: number;
  disclosed: boolean;
  meanGapBps: number;
  gapFavorsMen: boolean;
}

export interface VariablePayReportOnChain {
  round: number;
  headcountWomen: number;
  headcountMen: number;
  recipientsWomen: number;
  recipientsMen: number;
  gapDefined: boolean;
  meanGapBps: number;
  meanFavorsMen: boolean;
  medianGapBps: number;
  medianFavorsMen: boolean;
  quartiles: { women: number; men: number }[];
  categories: VariableCategoryStats[];
}

export interface LedgerView {
  contractAddress: string;
  rosterDeclared: boolean;
  payrollConfirmed: boolean;
  declaredHeadcount: number;
  enrolled: number;
  nullifiers: number;
  payrollRows: number;
  bound: number;
  round: number;
  employerPk: string;
  providerPk: string;
  councilPk: string;
  latestReport: PayReportOnChain | null;
  latestVariableReport: VariablePayReportOnChain | null;
}

/** Adversarial edits for the "try to cheat" toggles. */
export interface Tamper {
  meanGapBps?: number;
  medianWomen?: number;
  categoryGap?: { category: number; bps: number };
}

/** Adversarial edits for the variable-pay report. */
export interface VariableTamper {
  meanGapBps?: number;
  medianWomen?: number;
  swapBands?: boolean;
}

export interface Status {
  ready: boolean;
  network: string;
  contractAddress: string | null;
  startupLog: string[];
  ledger: LedgerView | null;
}

export interface Job<T = unknown> {
  id: string;
  kind: string;
  status: "running" | "done" | "error";
  startedAt: number;
  log: string[];
  result?: T;
  error?: string;
}

async function req<T>(path: string, init?: RequestInit, timeoutMs = 8000): Promise<T> {
  const base = resolveApiBase();
  if (!base) throw new Error("no live API on this host");
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(`${base}${path}`, {
      ...init,
      signal: ctl.signal,
      headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error ?? `HTTP ${r.status}`);
    return data as T;
  } finally {
    clearTimeout(t);
  }
}

export const getStatus = () => req<Status>("/api/status", undefined, 4000);
export const getLedger = () => req<LedgerView>("/api/ledger");

const post = (path: string, body: unknown) =>
  req<{ jobId?: string; contractAddress?: string; alreadyDeployed?: boolean }>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });

/** Start a job, then poll it until it finishes. `onLog` receives new log lines as they arrive. */
export async function runJob<T>(path: string, body: unknown, onLog?: (lines: string[]) => void): Promise<Job<T>> {
  const started = await post(path, body);
  if (!started.jobId) return { id: "-", kind: path, status: "done", startedAt: Date.now(), log: [], result: started as T };
  let seen = 0;
  for (;;) {
    await new Promise((r) => setTimeout(r, 1500));
    const j = await req<Job<T>>(`/api/jobs/${started.jobId}`);
    if (j.log.length > seen) {
      onLog?.(j.log.slice(seen));
      seen = j.log.length;
    }
    if (j.status !== "running") return j;
  }
}

export const fmtPct = (bps: number) => `${(bps / 100).toFixed(2)}%`;
export const short = (h: string, n = 8) => (h.length > n * 2 + 1 ? `${h.slice(0, n)}…${h.slice(-4)}` : h);
