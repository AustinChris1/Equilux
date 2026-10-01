import type { InitialAPI } from "@midnight-ntwrk/dapp-connector-api";

declare global {
  interface Window { midnight?: Record<string, InitialAPI> }
}

export interface WalletChoice { key: string; name: string; icon: string; apiVersion: string }

/** Wallets that injected the Midnight DApp connector into this page (Lace as `mnLace`, 1AM as `1am`, …). */
export function listWallets(): WalletChoice[] {
  const m = typeof window !== "undefined" ? window.midnight : undefined;
  if (!m) return [];
  return Object.entries(m)
    .filter(([, w]) => w && typeof w.connect === "function")
    .map(([key, w]) => ({ key, name: String(w.name ?? key), icon: String(w.icon ?? ""), apiVersion: String(w.apiVersion ?? "") }));
}
