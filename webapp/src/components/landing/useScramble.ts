import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "0123456789abcdef";

/** Text that resolves from noise into `target` when `target` changes: a value being sealed into a hash. */
export function useScramble(target: string, duration = 520): string {
  const reduce = useReducedMotion();
  const [text, setText] = useState(target);
  const first = useRef(true);

  useEffect(() => {
    if (first.current || reduce) {
      first.current = false;
      setText(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * target.length);
      let s = target.slice(0, settled);
      for (let i = settled; i < target.length; i++) s += target[i] === " " ? " " : GLYPHS[(Math.random() * 16) | 0];
      setText(s);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);

  return text;
}
