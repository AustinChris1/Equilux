import { ArrowLeft, Code } from "lucide-react";
import { LogoMark } from "./Logo";

const REPO = "https://github.com/AustinChris1/Equilux";

/** Top bar for the app pages (/app, /verify). */
export function AppHeader({ current }: { current: "app" | "verify" }) {
  const link = (href: string, label: string, active: boolean) => (
    <a href={href} aria-current={active ? "page" : undefined}
      className={`transition-colors hover:text-gold ${active ? "text-cream" : "text-sage"}`}>
      {label}
    </a>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-gold/10 bg-night-deep/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2.5 rounded text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          <LogoMark size={24} className="text-gold" />
          <span className="wordmark text-[21px]">Equilux</span>
        </a>
        <span className="hidden h-5 w-px bg-gold/15 sm:block" aria-hidden="true" />
        <nav className="flex items-center gap-4 text-[13px] font-medium">
          {link("/app", "Workspace", current === "app")}
          {link("/verify", "Verify", current === "verify")}
        </nav>
        <nav className="ml-auto flex items-center gap-5 text-[13px] font-medium">
          <a href="/#protocol" className="hidden text-sage transition-colors hover:text-gold md:block">How it works</a>
          <a href={REPO} target="_blank" rel="noreferrer" aria-label="Source code on GitHub"
            className="inline-flex items-center gap-1.5 text-sage transition-colors hover:text-gold">
            <Code size={15} /> <span className="hidden lg:inline">Source</span>
          </a>
          <a href="/" className="hidden items-center gap-1.5 text-cream/80 transition-colors hover:text-gold sm:inline-flex md:hidden">
            <ArrowLeft size={13} /> Home
          </a>
        </nav>
      </div>
    </header>
  );
}
