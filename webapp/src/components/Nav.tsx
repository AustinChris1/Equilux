import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "./Logo";

const links = [
  { label: "Mandate", href: "#mandate" },
  { label: "Protocol", href: "#protocol" },
  { label: "Demo", href: "#demo" },
  { label: "Guarantees", href: "#guarantees" },
  { label: "Scope", href: "#scope" },
  { label: "Roadmap", href: "#roadmap" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(19,26,21,0)", "rgba(19,26,21,0.88)"]);
  const line = useTransform(scrollY, [0, 120], ["rgba(255,216,95,0)", "rgba(255,216,95,0.14)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: line }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-cream">
          <LogoMark size={26} className="text-gold" />
          <span className="wordmark text-[22px]">Equilux</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-sage transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#demo"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-night transition-transform hover:-translate-y-0.5"
        >
          Run the demo
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>
    </motion.header>
  );
}
