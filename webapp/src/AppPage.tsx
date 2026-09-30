import { useEffect } from "react";
import { ArrowLeft, Code } from "lucide-react";
import { LogoMark } from "./components/Logo";
import { Workspace } from "./components/Workspace";

const REPO = "https://github.com/AustinChris1/Equilux";

/** /app — the four-party workspace on its own page, loaded only when visited. */
export default function AppPage() {
  useEffect(() => {
    document.title = "Workspace · Equilux";
  }, []);

  return (
    <div className="min-h-dvh bg-night-deep">
      <header className="sticky top-0 z-40 border-b border-gold/10 bg-night-deep/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
          <a href="/" className="flex items-center gap-2.5 rounded text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            <LogoMark size={24} className="text-gold" />
            <span className="wordmark text-[21px]">Equilux</span>
          </a>
          <span className="hidden h-5 w-px bg-gold/15 sm:block" aria-hidden="true" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-sage sm:block">Workspace</span>

          <nav className="ml-auto flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <a href="/#protocol" className="hidden text-sage transition-colors hover:text-gold md:block">How it works</a>
            <a href="/#scope" className="hidden text-sage transition-colors hover:text-gold md:block">Scope</a>
            <a href={REPO} target="_blank" rel="noreferrer" aria-label="Source code on GitHub"
              className="inline-flex items-center gap-1.5 text-sage transition-colors hover:text-gold">
              <Code size={15} /> <span className="hidden lg:inline">Source</span>
            </a>
            <a href="/" className="inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-gold md:hidden">
              <ArrowLeft size={13} /> Home
            </a>
          </nav>
        </div>
      </header>
      <main>
        <Workspace />
      </main>
    </div>
  );
}
