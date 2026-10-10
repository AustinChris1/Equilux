import { createAvatar } from "@dicebear/core";
import * as notionists from "@dicebear/notionists";

// Notionists by Zoish (CC0 1.0), drawn by DiceBear from a seed: the same name always gets the same face.
const cache = new Map<string, string>();
function uri(seed: string, ground: string) {
  const key = `${seed}|${ground}`;
  let u = cache.get(key);
  if (!u) {
    u = createAvatar(notionists, { seed, size: 128, backgroundColor: [ground], backgroundType: ["solid"] }).toDataUri();
    cache.set(key, u);
  }
  return u;
}

/** A drawn character in a round frame. `tone` picks the ground: gold for the parties, cream for the team. `fluid` sizes it from className. */
export function Avatar({ seed, size = 48, tone = "cream", className = "", fluid = false }: { seed: string; size?: number; tone?: "gold" | "cream" | "sage"; className?: string; fluid?: boolean }) {
  const ground = tone === "gold" ? "ffd85f" : tone === "sage" ? "c9cfc4" : "faf6e9";
  return (
    <img src={uri(seed, ground)} alt="" width={size} height={size} draggable={false}
      className={`shrink-0 select-none rounded-full ${className}`} style={fluid ? undefined : { width: size, height: size }} />
  );
}
