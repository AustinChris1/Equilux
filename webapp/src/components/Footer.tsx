import { ExternalLink } from "lucide-react";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="mx-2 my-2 rounded-[28px] border border-gold/10 bg-night-deep md:mx-3 md:my-3">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3 text-cream">
                <LogoMark size={34} className="text-gold" />
                <span className="wordmark text-4xl">Equilux</span>
              </div>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-sage">
                Named for the equilux — the one day night and day are exactly equal. The first
                employee-verifiable pay-transparency reporting protocol, born at Midnight.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] md:items-end">
              <a
                href="https://github.com/midnightntwrk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream/80 transition-colors hover:text-gold"
              >
                <ExternalLink size={12} />
                GitHub · midnightntwrk
              </a>
              <span className="text-cream/45">Apache License 2.0</span>
              <span className="text-cream/45">Compact · TypeScript · Midnight</span>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gold/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-sage/70">
          <span>© 2026 Equilux</span>
          <span>Prove everything · Reveal no one</span>
        </div>
      </div>
    </footer>
  );
}
