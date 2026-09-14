/** Client for the local Equilux API (contract/deploy/server.ts). */

export const API_BASE = (import.meta.env.VITE_EQUILUX_API as string | undefined) ?? "http://127.0.0.1:8787";

export interface PayReportOnChain {
  round: number;
  headcountWomen: number;
  headcountMen: number;
  meanGapBps: number;
  gapFavorsMen: boolean;
  meanGapAtOrAbove5pct: boolean;
}

export interface LedgerView {
  contractAddress: string;
  enrolled: number;
  nullifiers: number;
  attested: number;
  round: number;
  employerPk: string;
  latestReport: PayReportOnChain | null;
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
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(`${API_BASE}${path}`, {
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
  req<{ jobId?: string; contractAddress?: string; alreadyDeployed?: boolean }>(path, { method: "POST", body: JSON.stringify(body) });

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
