import { useEffect, useMemo, useRef, useState } from "react";
import { marked, type Tokens } from "marked";
import { ArrowLeft, ArrowRight, BookOpen, Briefcase, Code, ExternalLink, Layers, PlayCircle, Users } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import overview from "./docs/overview.md?raw";
import useCases from "./docs/use-cases.md?raw";
import howItWorks from "./docs/how-it-works.md?raw";
import architecture from "./docs/architecture.md?raw";
import businessModel from "./docs/business-model.md?raw";

/** The docs, written in Markdown (src/docs/*.md) and rendered here. */
const PAGES = [
  { slug: "overview", title: "Overview", group: "Get started", icon: BookOpen, md: overview, blurb: "What Equilux is and why it exists" },
  { slug: "use-cases", title: "Use cases", group: "Get started", icon: Users, md: useCases, blurb: "Nine situations where it helps" },
  { slug: "how-it-works", title: "How it works", group: "Get started", icon: PlayCircle, md: howItWorks, blurb: "A five-minute guided tour" },
  { slug: "architecture", title: "Architecture", group: "Under the hood", icon: Layers, md: architecture, blurb: "What runs where, what stays private" },
  { slug: "business-model", title: "Business model", group: "Business", icon: Briefcase, md: businessModel, blurb: "Who needs it and who pays" },
] as const;
const REPO = "https://github.com/AustinChris1/Equilux";

const plain = (s: string) => s.replace(/[*_`[\]]/g, "").replace(/\(([^)]*)\)/g, "").trim();
const slugify = (s: string) => plain(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// headings get ids (for the outline and deep links); tables scroll sideways on small screens
marked.use({
  renderer: {
    heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
      const id = slugify(text);
      const inner = this.parser.parseInline(tokens);
      return depth === 1 ? `<h1>${inner}</h1>` : `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inner}</h${depth}>`;
    },
  },
});

const pageFromPath = () => {
  const slug = location.pathname.replace(/\/+$/, "").split("/")[2] ?? "overview";
  return PAGES.findIndex((p) => p.slug === slug) >= 0 ? PAGES.findIndex((p) => p.slug === slug) : 0;
};

/** /docs and /docs/<page> */
export default function DocsPage() {
  const [index, setIndex] = useState(pageFromPath);
  const page = PAGES[index];
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const { html, outline } = useMemo(() => {
    const outline = marked.lexer(page.md).filter((t): t is Tokens.Heading => t.type === "heading" && (t.depth === 2 || t.depth === 3))
      .map((t) => ({ id: slugify(t.text), text: plain(t.text), depth: t.depth }));
    const html = (marked.parse(page.md) as string).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
    return { html, outline };
  }, [page]);

  useEffect(() => { document.title = `${page.title} · Equilux docs`; }, [page]);
  useEffect(() => {
    const onPop = () => setIndex(pageFromPath());
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);
  // a deep link (#section) lands on its heading once the page has rendered
  useEffect(() => {
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }, [html]);

  // the outline follows the reader
  useEffect(() => {
    const heads = [...(contentRef.current?.querySelectorAll("h2[id], h3[id]") ?? [])];
    const obs = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen[0]) setActive(seen[0].target.id);
    }, { rootMargin: "-80px 0px -70% 0px" });
    heads.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [html]);

  const go = (i: number, hash = "") => {
    setIndex(i);
    history.pushState(null, "", `/docs/${PAGES[i].slug}${hash}`);
    if (!hash) scrollTo({ top: 0 });
  };
  // links between docs pages stay in this page; everything else navigates normally
  const onContentClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!a || !href || e.metaKey || e.ctrlKey) return;
    const m = href.match(/^\/docs\/([a-z-]+)(#.*)?$/);
    if (m) { const i = PAGES.findIndex((p) => p.slug === m[1]); if (i >= 0) { e.preventDefault(); go(i, m[2] ?? ""); } }
    else if (/^https?:/.test(href)) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noreferrer"); }
  };

  const groups = [...new Set(PAGES.map((p) => p.group))];
  const prev = index > 0 ? PAGES[index - 1] : null, next = index < PAGES.length - 1 ? PAGES[index + 1] : null;

  return (
    <div className="min-h-dvh bg-paper text-night">
      <AppHeader current="docs" />
      <div className="mx-auto flex max-w-7xl gap-10 px-4 md:px-6">
        {/* sidebar */}
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] w-60 shrink-0 overflow-y-auto border-r border-night/10 py-8 pr-6 lg:block">
          <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">Equilux docs</div>
          {groups.map((g) => (
            <nav key={g} aria-label={g} className="mt-6">
              <div className="text-[12px] font-semibold text-night/50">{g}</div>
              <ul className="mt-2 flex flex-col gap-0.5">
                {PAGES.map((p, i) => p.group !== g ? null : (
                  <li key={p.slug}>
                    <a href={`/docs/${p.slug}`} onClick={(e) => { e.preventDefault(); go(i); }} aria-current={i === index ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] transition-colors ${i === index ? "bg-night text-gold" : "text-night/75 hover:bg-night/6 hover:text-night"}`}>
                      <p.icon size={15} /> {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="mt-8 border-t border-night/10 pt-6">
            <div className="text-[12px] font-semibold text-night/50">Try it</div>
            <ul className="mt-2 flex flex-col gap-0.5 text-[14px]">
              {[["/app", "The app"], ["/verify", "Verify a report"], ["/check", "Check your record"]].map(([h, l]) => (
                <li key={h}><a href={h} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-night/75 hover:bg-night/6 hover:text-night"><ArrowRight size={14} /> {l}</a></li>
              ))}
              <li><a href={REPO} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-night/75 hover:bg-night/6 hover:text-night"><Code size={14} /> Source on GitHub</a></li>
            </ul>
          </div>
        </aside>

        {/* page */}
        <main className="min-w-0 flex-1 py-8 lg:py-12">
          <label className="mb-6 block lg:hidden">
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">Equilux docs</span>
            <select value={index} onChange={(e) => go(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-night/15 bg-white px-3 py-2.5 text-[15px] text-night">
              {PAGES.map((p, i) => <option key={p.slug} value={i}>{p.group} · {p.title}</option>)}
            </select>
          </label>
          <div className="text-[13px] font-medium text-moss">{page.group}</div>
          <article ref={contentRef} onClick={onContentClick} className="docs-prose max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />

          <nav aria-label="More pages" className="mt-14 grid max-w-3xl gap-3 border-t border-night/10 pt-8 sm:grid-cols-2">
            {prev ? (
              <a href={`/docs/${prev.slug}`} onClick={(e) => { e.preventDefault(); go(index - 1); }} className="group rounded-xl p-4 ring-1 ring-night/12 transition-colors hover:ring-night/40">
                <div className="flex items-center gap-1.5 text-[12px] text-moss"><ArrowLeft size={13} /> Previous</div>
                <div className="mt-1 text-[15px] font-semibold">{prev.title}</div>
              </a>
            ) : <span />}
            {next && (
              <a href={`/docs/${next.slug}`} onClick={(e) => { e.preventDefault(); go(index + 1); }} className="group rounded-xl p-4 text-right ring-1 ring-night/12 transition-colors hover:ring-night/40">
                <div className="flex items-center justify-end gap-1.5 text-[12px] text-moss">Next <ArrowRight size={13} /></div>
                <div className="mt-1 text-[15px] font-semibold">{next.title}</div>
                <div className="text-[13px] text-moss">{next.blurb}</div>
              </a>
            )}
          </nav>
          <a href={`${REPO}/blob/main/webapp/src/docs/${page.slug}.md`} target="_blank" rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-moss hover:text-night">
            <ExternalLink size={13} /> Edit this page on GitHub
          </a>
        </main>

        {/* on this page */}
        <aside className="sticky top-[57px] hidden h-[calc(100dvh-57px)] w-56 shrink-0 overflow-y-auto py-12 xl:block">
          <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">On this page</div>
          <ul className="mt-3 flex flex-col gap-1.5 border-l border-night/10 text-[13px]">
            {outline.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className={`-ml-px block border-l-2 py-0.5 transition-colors ${h.depth === 3 ? "pl-6" : "pl-3"} ${active === h.id ? "border-night font-medium text-night" : "border-transparent text-night/60 hover:text-night"}`}>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
