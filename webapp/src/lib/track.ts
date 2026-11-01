/**
 * Counts what visitors do, anonymously: one event name, no identifiers, no cookies (api/stats.js).
 * Each event counts once per browser tab, so replaying the story does not inflate the numbers.
 */
export type TrackEvent = "story" | "story250" | "csv" | "check" | "verify" | "wallet";

export function track(e: TrackEvent) {
  try {
    const key = `equilux.tracked.${e}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch { /* storage blocked: count anyway */ }
  const body = JSON.stringify({ e });
  try {
    if (!navigator.sendBeacon?.("/api/stats", new Blob([body], { type: "application/json" }))) {
      fetch("/api/stats", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch { /* never let counting break the page */ }
}
