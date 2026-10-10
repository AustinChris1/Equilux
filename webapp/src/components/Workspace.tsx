import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck, Blocks, Building2, Check, ChevronDown, CircleAlert, Cpu, Download, ExternalLink, Eye, EyeOff, FileSpreadsheet,
  Fuel, Landmark, Loader2, Lock, MonitorPlay, Play, RotateCcw, ScrollText, Settings2, Signature, Stamp, Upload, Users, VenetianMask, Wifi,
} from "lucide-react";
import { getStatus, resolveApiBase, runJob, short, type LedgerView, type Status, type Tamper, type VariableTamper } from "../lib/api";
import { BrowserContract, newNonce, payrollRowHash, type Row } from "../lib/browser-contract";
import { parsePayrollCsv } from "../../../contract/deploy/payroll-csv";
import { ReportView } from "./ReportView";
import { useScramble } from "./landing/useScramble";
import { PREPROD_VERIFY } from "./landing/data";
import { buildFilingPack, downloadFilingPack } from "../lib/filing";
import { listWallets, type WalletChoice } from "../lib/wallet-detect";
import type { WalletSession } from "../lib/wallet-chain";
import { AppHeader } from "./AppHeader";
import { Avatar } from "./app/Avatar";
import { WalletButton, type WalletState } from "./app/WalletButton";
import { ReportSummary } from "./app/ReportSummary";
import { CheatBoard, type Cheat, type CheatId, type CheatResult } from "./app/CheatBoard";

const EASE = [0.23, 1, 0.32, 1] as const;

type Mode = "checking" | "live" | "browser" | "wallet";
type ChapterId = "company" | "payroll" | "council" | "team" | "report" | "inspector";
type Outcome<T> = { ok: true; value: T } | { ok: false; error: string; kind?: string };
type Problem = { message: string; kind?: string } | null;

interface Person {
  id: string;
  name: string;
  salary: number;
  variable: number; // annual bonus; 0 if none
  gender: 0 | 1;
  category: number;
  secret: string;
  nonce: string; // payslip nonce from the payroll company; blinds this person's payroll row
  commitment?: string;
  enrollBlock?: number;
  receipt?: boolean;
}

const STORAGE = "equilux.workspace.v4";
const newSecret = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").slice(0, 24);
const DEFAULT_CATEGORIES = ["Engineering", "Sales", "Operations", "Design"];

// Engineering and Sales have ≥3 women and ≥3 men → their pay is shown.
// Operations has one of each → hidden by the k = 3 rule.
const SEED: [string, number, number, 0 | 1, number][] = [
  ["Ana Serrano", 60_000, 3_000, 0, 0], ["Bea Keller", 62_000, 4_000, 0, 0], ["Chidi Okafor", 64_000, 0, 0, 0],
  ["Dan Novak", 70_000, 6_000, 1, 0], ["Eli Laurent", 72_000, 7_000, 1, 0], ["Felix Braun", 74_000, 5_000, 1, 0],
  ["Gia Diallo", 50_000, 2_000, 0, 1], ["Hana Vidal", 52_000, 2_500, 0, 1], ["Ivy Moreau", 54_000, 3_000, 0, 1],
  ["Jon Weber", 53_000, 2_500, 1, 1], ["Kai Sato", 54_000, 3_500, 1, 1], ["Leo Rossi", 55_000, 3_000, 1, 1],
  ["Mia Costa", 40_000, 0, 0, 2], ["Ned Fischer", 45_000, 1_000, 1, 2],
];

const SAMPLE_CSV = `First name,Last name,Gender,Department,Annual salary,Bonus
${SEED.map(([n, sal, v, g, c]) => `${n.replace(" ", ",")},${g === 0 ? "female" : "male"},${["Engineering", "Sales", "Operations"][c]},${sal},${v || ""}`).join("\n")}`;

const seedPeople = (): Person[] =>
  SEED.map(([name, salary, variable, gender, category]) => ({ id: newSecret().slice(0, 8), name, salary, variable, gender, category, secret: newSecret(), nonce: newNonce() }));

interface Saved { people: Person[]; categories: string[] }
function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return JSON.parse(raw) as Saved;
  } catch { /* ignore */ }
  return { people: seedPeople(), categories: DEFAULT_CATEGORIES };
}
const stripProgress = (ps: Person[]) => ps.map(({ id, name, salary, variable, gender, category, secret, nonce }) => ({ id, name, salary, variable, gender, category, secret, nonce }));

const toRow = (p: Person): Row => ({ salary: p.salary, variable: p.variable, gender: p.gender, category: p.category, secret: p.secret, nonce: p.nonce });
const openingOf = (r: Row) => ({ salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, nonce: r.nonce });
const enrollBody = (r: Row) => ({ ...r, rowNonce: r.nonce });
const first = (name: string) => name.split(" ")[0];
const euro = (n: number) => `€${n.toLocaleString("en-US")}`;

/** The cast. Seeds pick each drawn face; the same seed always draws the same person. */
const CAST = { ceo: "Acme Lena", payroll: "Payroll Pia", council: ["Council Omar", "Council Mei", "Council Jonas"], inspector: "Inspector Ruth" };

const CHAPTERS: { id: ChapterId; label: string; seed: string; badge: typeof Building2 }[] = [
  { id: "company", label: "Acme", seed: CAST.ceo, badge: Building2 },
  { id: "payroll", label: "Payroll", seed: CAST.payroll, badge: FileSpreadsheet },
  { id: "council", label: "Council", seed: CAST.council[0], badge: Users },
  { id: "team", label: "Team", seed: "Ana Serrano", badge: BadgeCheck },
  { id: "report", label: "Report", seed: CAST.ceo, badge: Stamp },
  { id: "inspector", label: "Anyone", seed: CAST.inspector, badge: Landmark },
];

/** The big gold slab: one per chapter. */
function Action({ onClick, disabled, busy, children }: { onClick: () => void; disabled?: boolean; busy?: string | null; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled || !!busy}
      className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gold px-6 py-3 text-[15px] font-semibold text-night transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
      {busy ? <Loader2 size={17} className="animate-spin" /> : null}
      {busy ?? children}
    </button>
  );
}

function Ghost({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium text-cream/85 ring-1 ring-gold/25 transition-colors hover:text-gold hover:ring-gold/60 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
      {children}
    </button>
  );
}

function Done({ children }: { children: React.ReactNode }) {
  return (
    <motion.span initial={{ opacity: 0, transform: "scale(0.9)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.2, ease: EASE }}
      className="inline-flex items-center gap-2 rounded-xl bg-gold/12 px-4 py-2.5 text-[14px] font-medium text-gold">
      <Check size={16} strokeWidth={2.6} /> {children}
    </motion.span>
  );
}

/** A salary that turns into its sealed code the moment the payroll is locked. */
function Sealed({ hash, salary, locked }: { hash: string; salary: number; locked: boolean }) {
  const text = useScramble(locked ? short(hash, 4) : euro(salary));
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[11px] tabular-nums ${locked ? "text-gold/90" : "text-cream/80"}`}>
      {locked && <Lock size={10} className="shrink-0" />}{text}
    </span>
  );
}

/** Proof → approval → blockchain, lit as a testnet write moves through them. */
function WriteProgress({ phase, wallet }: { phase: number; wallet: string }) {
  const steps = [
    { icon: Cpu, label: "Math proof" },
    { icon: Signature, label: `Approve in ${wallet}` },
    { icon: Blocks, label: "On the blockchain" },
  ];
  return (
    <ol className="mt-4 flex flex-wrap items-center gap-2 text-[12px]" aria-live="polite">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors duration-300 ${i < phase ? "bg-gold/15 text-gold" : i === phase ? "bg-gold text-night" : "bg-cream/6 text-sage"}`}>
            {i === phase ? <Loader2 size={12} className="animate-spin" /> : i < phase ? <Check size={12} /> : <s.icon size={12} />} {s.label}
          </span>
          {i < steps.length - 1 && <span className="h-px w-4 bg-gold/25" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export function Workspace() {
  const initial = useMemo(load, []);
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status | null>(null);
  const [mode, setMode] = useState<Mode>("checking");
  const [people, setPeople] = useState<Person[]>(initial.people);
  const [categories, setCategories] = useState<string[]>(initial.categories);
  const [busy, setBusy] = useState<string | null>(null);
  const [phase, setPhase] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const [problem, setProblem] = useState<Problem>(null);
  const [liveLedger, setLiveLedger] = useState<LedgerView | null>(null);
  const [employerSecret, setEmployerSecret] = useState("acme:employer-root-secret");
  const [providerSecret, setProviderSecret] = useState("payroll-provider:personio");
  const [councilSecret, setCouncilSecret] = useState("works-council:acme");
  const [csvNote, setCsvNote] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [view, setView] = useState<ChapterId | null>(null);
  const [cheatsOpen, setCheatsOpen] = useState(false);
  const [cheatResults, setCheatResults] = useState<Partial<Record<CheatId, CheatResult>>>({});
  const [session, setSession] = useState<WalletSession | null>(null);
  const [walletLedger, setWalletLedger] = useState<LedgerView | null>(null);
  const [wallets, setWallets] = useState<WalletChoice[]>([]);
  const [connecting, setConnecting] = useState(false);
  const [fuel, setFuel] = useState<boolean | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const modeRef = useRef<Mode>("checking");
  modeRef.current = mode;
  const peopleRef = useRef(people);
  peopleRef.current = people;
  const bcRef = useRef<BrowserContract | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cheatsRef = useRef<HTMLElement>(null);
  const apiBase = resolveApiBase();

  if (!bcRef.current && typeof window !== "undefined") bcRef.current = BrowserContract.restore();
  const bc = bcRef.current!;

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify({ people, categories })); } catch { /* ignore */ } }, [people, categories]);

  const refresh = useCallback(async () => {
    if (modeRef.current === "wallet") return;
    if (!apiBase) { setMode("browser"); return; }
    try {
      const s = await getStatus();
      if ((modeRef.current as Mode) === "wallet") return;
      setStatus(s);
      setMode("live");
      if (s.ledger) setLiveLedger(s.ledger);
    } catch {
      if ((modeRef.current as Mode) !== "wallet") setMode("browser");
    }
  }, [apiBase]);

  useEffect(() => {
    refresh();
    if (!apiBase) return;
    const t = setInterval(refresh, busy ? 4000 : 8000);
    return () => clearInterval(t);
  }, [refresh, busy, apiBase]);

  // wallets inject themselves a moment after the page loads
  useEffect(() => {
    let n = 0;
    const t = setInterval(() => { setWallets(listWallets()); if (++n >= 10) clearInterval(t); }, 500);
    return () => clearInterval(t);
  }, []);

  // a fresh in-browser session has no contract: clear per-person progress
  useEffect(() => {
    if (mode === "browser" && !bc.address) setPeople((ps) => (ps.some((p) => p.commitment) ? stripProgress(ps) : ps));
  }, [mode, bc]);

  // fee fuel: re-read while connected, so turning DUST on in the wallet shows up here by itself
  useEffect(() => {
    if (!session) return;
    let live = true;
    const read = () => session.dust().then((d) => { if (live) setFuel(d ? d.balance > 0n : null); });
    read();
    const t = setInterval(read, 20_000);
    return () => { live = false; clearInterval(t); };
  }, [session]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const browserLedger = useMemo(() => (mode === "browser" ? bc.view() : null), [mode, tick, bc]);
  const ledger = mode === "wallet" ? walletLedger : mode === "live" ? liveLedger : browserLedger;
  const deployed = mode === "wallet" ? session?.address ?? null : mode === "live" ? status?.contractAddress ?? null : bc.address;
  const ready = mode === "browser" || mode === "wallet" || !!status?.ready;
  const rosterDeclared = !!ledger?.rosterDeclared;
  const payrollConfirmed = !!ledger?.payrollConfirmed;
  const enrolledCount = ledger?.enrolled ?? 0;
  const allEnrolled = !!ledger && ledger.declaredHeadcount > 0 && ledger.enrolled >= ledger.declaredHeadcount;
  const rep = ledger?.latestReport ?? null;
  const vrep = ledger?.latestVariableReport ?? null;
  const published = !!rep && !!vrep;
  const onChain = mode === "wallet" || mode === "live";

  const doneOf: Record<ChapterId, boolean> = {
    company: !!deployed, payroll: rosterDeclared, council: payrollConfirmed, team: allEnrolled, report: published, inspector: published,
  };
  const firstOpen = CHAPTERS.findIndex((c) => !doneOf[c.id]);
  const currentIdx = firstOpen === -1 ? CHAPTERS.length - 1 : firstOpen;
  const current: ChapterId = CHAPTERS[currentIdx].id;
  const shown: ChapterId = view ?? current;
  const shownIdx = CHAPTERS.findIndex((c) => c.id === shown);
  const progress = CHAPTERS.filter((c) => doneOf[c.id]).length;

  const push = (lines: string[]) => {
    setLog((l) => [...l, ...lines].slice(-120));
    for (const l of lines) {
      if (/making the zero-knowledge proof/.test(l)) setPhase(0);
      else if (/approve the transaction/.test(l)) setPhase(1);
      else if (/^submitted/.test(l)) setPhase(2);
    }
  };
  const patch = (id: string, p: Partial<Person>) => setPeople((ps) => ps.map((x) => (x.id === id ? { ...x, ...p } : x)));

  /** One write, in any mode. Practice: the contract code in this page. Local node: the API. Testnet: the visitor's wallet. */
  async function exec<T>(label: string, browser: () => T, live: { path: string; body: unknown }): Promise<Outcome<T>> {
    setBusy(label);
    setPhase(-1);
    push([`▶ ${label}`]);
    try {
      let value: T;
      if (mode === "wallet") {
        value = await session!.run<T>(live.path, live.body, push);
        setWalletLedger(await session!.readLedger());
      } else if (mode === "live") {
        const j = await runJob<T>(live.path, live.body, push);
        if (j.status === "error") throw new Error(j.error ?? "rejected");
        value = j.result as T;
      } else {
        await new Promise((r) => setTimeout(r, reduce ? 0 : 260));
        value = browser();
        push(["ran the contract code in this browser: every check passed"]);
        setTick((t) => t + 1);
      }
      return { ok: true, value };
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      const kind = (e as { kind?: string }).kind;
      if (kind === "no-dust") setFuel(false);
      push([`✗ ${m}`]);
      return { ok: false, error: m, kind };
    } finally {
      setBusy(null);
      setPhase(-1);
      if (mode === "live") refresh();
    }
  }

  /** An honest step: on failure, the stage explains what stopped it. */
  async function step<T>(label: string, browser: () => T, live: { path: string; body: unknown }): Promise<T | undefined> {
    setProblem(null);
    const o = await exec(label, browser, live);
    if (!o.ok) { setProblem({ message: o.error, kind: o.kind }); return undefined; }
    setView(null);
    return o.value;
  }

  const deploy = () =>
    step("Opening the report…", () => bc.apply({ k: "deploy", employerSecret, providerSecret, councilSecret }), { path: "/api/deploy", body: { employerSecret, providerSecret, councilSecret } });

  const declareRoster = () => {
    const rows = people.map((p) => payrollRowHash(toRow(p)));
    return step("Locking the salaries…", () => bc.apply({ k: "roster", rows }), { path: "/api/roster", body: { rows } });
  };

  const confirmPayroll = () => {
    const rows = people.map(toRow);
    return step("The council is checking…", () => bc.apply({ k: "confirm", rows }), { path: "/api/confirm", body: { openings: rows.map(openingOf) } });
  };

  const enroll = async (p: Person) => {
    const r = await step<string | { commitment: string; blockHeight: number }>(
      `${first(p.name)} is confirming…`, () => bc.apply({ k: "enroll", row: toRow(p) }) as string, { path: "/api/enroll", body: enrollBody(toRow(p)) });
    if (r) patch(p.id, typeof r === "string" ? { commitment: r } : { commitment: r.commitment, enrollBlock: r.blockHeight });
    return !!r;
  };

  const enrollAll = async () => {
    for (const p of peopleRef.current.filter((x) => !x.commitment)) if (!(await enroll(p))) return false;
    return true;
  };

  const receipt = async (p: Person) => {
    if (!p.commitment) return;
    const r = await step(`Checking ${first(p.name)} was counted…`, () => bc.receipt(p.commitment!), { path: "/api/receipt", body: { commitment: p.commitment } });
    if (r !== undefined) patch(p.id, { receipt: true });
  };

  const publishBoth = async () => {
    await new Promise((r) => setTimeout(r, 0));
    const rows = peopleRef.current.filter((p) => p.commitment).map(toRow);
    if (!rep && (await step("Publishing the pay gap…", () => bc.apply({ k: "publish", rows }), { path: "/api/publish", body: { payroll: rows } })) === undefined) return false;
    if ((await step("Publishing the bonus figures…", () => bc.apply({ k: "publishVariable", rows }), { path: "/api/publish-variable", body: { payroll: rows } })) === undefined) return false;
    setView("report");
    return true;
  };

  /** Every chapter in order, one after another. */
  const playAll = async () => {
    if (!deployed && (await deploy()) === undefined) return;
    if (!rosterDeclared && (await declareRoster()) === undefined) return;
    if (!payrollConfirmed && (await confirmPayroll()) === undefined) return;
    if (!(await enrollAll())) return;
    await publishBoth();
  };

  /** A dishonest attempt, sent to the same contract code; the card shows what came back. */
  const tryCheat = async (id: CheatId) => {
    setCheatResults((r) => ({ ...r, [id]: { state: "running" } }));
    const enrolled = peopleRef.current.filter((p) => p.commitment);
    const rows = enrolled.map(toRow);
    let o: Outcome<unknown>;
    if (id === "inflate" || id === "ghost") {
      const who = peopleRef.current[0];
      const row: Row = id === "inflate"
        ? { ...toRow(who), salary: who.salary + 5_000, secret: newSecret() }
        : { salary: 58_000, variable: 0, gender: 1, category: 0, secret: newSecret(), nonce: newNonce() };
      o = await exec(`Cheat: ${id}`, () => bc.tryEnroll(row), { path: "/api/enroll", body: enrollBody(row) });
    } else if (id === "skip") {
      const all = peopleRef.current.map(toRow).slice(1);
      o = await exec("Cheat: council skips a row", () => bc.tryConfirm(all), { path: "/api/confirm", body: { openings: all.map(openingOf) } });
    } else if (id === "vmean" || id === "vmedian" || id === "bands") {
      const tamper: VariableTamper = id === "vmean" ? { meanGapBps: 0 } : id === "vmedian"
        ? { medianWomen: Math.max(...rows.filter((r) => r.gender === 0).map((r) => r.variable)) } : { swapBands: true };
      o = await exec(`Cheat: ${id}`, () => bc.tryCheatVariable(rows, tamper), { path: "/api/publish-variable", body: { payroll: rows, tamper } });
    } else {
      let payroll = rows;
      let tamper: Tamper | undefined;
      if (id === "omit") payroll = rows.slice(1);
      if (id === "pay") {
        const i = rows.findIndex((r) => r.gender === 1);
        payroll = rows.map((r, j) => (j === i ? { ...r, salary: r.salary - 8_000 } : r));
      }
      if (id === "mean") tamper = { meanGapBps: 0 };
      if (id === "median") tamper = { medianWomen: Math.max(...enrolled.filter((p) => p.gender === 0).map((p) => p.salary)) };
      if (id === "category") tamper = { categoryGap: { category: 0, bps: 0 } };
      o = await exec(`Cheat: ${id}`, () => bc.tryCheat(payroll, tamper), { path: "/api/publish", body: { payroll, tamper } });
    }
    setCheatResults((r) => ({ ...r, [id]: o.ok ? { state: "accepted" } : { state: "rejected", message: o.error } }));
  };

  // ── wallet ─────────────────────────────────────────────────────────────
  const connect = async (w: WalletChoice) => {
    setConnecting(true);
    setProblem(null);
    push([`▶ Connect ${w.name} on Midnight preprod`]);
    try {
      const { connectWallet } = await import("../lib/wallet-chain");
      const s = await connectWallet(w, push);
      setWalletLedger(await s.readLedger());
      if (!s.address) setPeople((ps) => stripProgress(ps));
      setCheatResults({});
      setView(null);
      setMode("wallet");
      setSession(s);
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setProblem({ message: m });
      push([`✗ ${m}`]);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setSession(null);
    setWalletLedger(null);
    setFuel(null);
    setPeople((ps) => stripProgress(ps));
    setCheatResults({});
    setView(null);
    modeRef.current = "checking";
    setMode("checking");
    refresh();
  };

  const recheckFuel = async () => {
    const d = await session?.dust();
    setFuel(d ? d.balance > 0n : null);
    if (d && d.balance > 0n) setProblem(null);
  };

  // ── your own payroll ───────────────────────────────────────────────────
  const importCsv = (text: string, source: string) => {
    const { rows, categories: cats, errors } = parsePayrollCsv(text);
    if (rows.length === 0) { setCsvNote(`Nothing imported: ${errors.join("; ")}`); return; }
    const capped = rows.slice(0, 16);
    setPeople(capped.map((r) => ({ id: newSecret().slice(0, 8), name: r.name, salary: r.salary, variable: r.variable, gender: r.gender, category: r.category, secret: newSecret(), nonce: newNonce() })));
    setCategories([...cats, ...DEFAULT_CATEGORIES.slice(cats.length)].slice(0, 4));
    setCsvNote(`${capped.length} people imported from ${source}${rows.length > 16 ? " (this demo holds 16)" : ""}${errors.length ? ` · ${errors.length} row(s) skipped` : ""}`);
    push([`imported ${capped.length} payroll rows from ${source}: read in this browser, nothing sent anywhere`]);
  };
  const onFile = (f: File | undefined) => { if (f) f.text().then((t) => importCsv(t, f.name)); };
  const smallTeam = () => { setPeople(seedPeople().slice(0, 6)); setCategories(DEFAULT_CATEGORIES); setCsvNote("A 6-person team: 11 steps in total"); };

  const startOver = () => {
    if (mode === "wallet") { session?.forget(); setWalletLedger(null); } // a fresh contract on preprod; the old one stays on the chain
    else bc.reset();
    setTick((t) => t + 1);
    setPeople((ps) => stripProgress(ps));
    setLog([]);
    setProblem(null);
    setCheatResults({});
    setView(null);
  };

  const locked = !!deployed && rosterDeclared;
  const walletState: WalletState | null = session ? { name: session.walletName, icon: session.walletIcon, prover: session.prover, fuel } : null;

  const cheats: Cheat[] = (() => {
    const notYet = !deployed ? "Open the report first" : null;
    const needRows = notYet ?? (enrolledCount === 0 ? "After employees confirm" : null);
    const needCouncil = notYet ?? (!payrollConfirmed ? "After the council approves" : null);
    const ana = first(people[0]?.name ?? "Ana");
    return [
      { id: "inflate", title: `${ana} claims €5,000 more`, why: `${ana}'s sealed payroll row says a different salary.`, locked: needCouncil },
      { id: "ghost", title: "Add an employee who doesn't exist", why: "Nobody on the sealed payroll matches this person.", locked: needCouncil },
      { id: "skip", title: "The council skips one row", why: "The council must check every sealed row, no exceptions.",
        locked: notYet ?? (!rosterDeclared ? "After the salaries are locked" : payrollConfirmed ? "Only before the council approves" : null) },
      { id: "omit", title: "Leave one employee out", why: "The report must include everyone who confirmed.", locked: needRows },
      { id: "pay", title: "Pay a man less, on paper", why: "That salary doesn't match its sealed code.", locked: needRows },
      { id: "mean", title: "Say the gap is 0%", why: "The math recomputed the gap. It isn't 0%.", locked: needRows },
      { id: "median", title: "Fake the middle salary", why: "The middle salary must come from the real payroll.", locked: needRows },
      { id: "category", title: `Hide ${categories[0]}'s gap`, why: `The math recomputed ${categories[0]}'s gap from the payroll.`, locked: needRows },
      { id: "vmean", title: "Say the bonus gap is 0%", why: "The bonus gap was recomputed. It isn't 0%.", locked: needRows },
      { id: "vmedian", title: "Fake the middle bonus", why: "The middle bonus must come from the real payroll.", locked: needRows },
      { id: "bands", title: "Swap the top and bottom earners", why: "Pay decides who is in the top quarter, not Acme.", locked: needRows },
    ];
  })();
  const rejectedCount = Object.values(cheatResults).filter((r) => r?.state === "rejected").length;

  const openCheats = () => {
    setCheatsOpen(true);
    requestAnimationFrame(() => cheatsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
  };

  const modePill = mode === "wallet"
    ? { icon: Wifi, text: "Live on Midnight testnet" }
    : mode === "live" ? { icon: Wifi, text: status?.ready ? "Live on your local Midnight node" : "Connecting to your local node…" }
    : { icon: MonitorPlay, text: "Practice run in your browser" };

  // ── the stage ──────────────────────────────────────────────────────────
  const chapter = (() => {
    const shownDone = doneOf[shown];
    const blockedBy = CHAPTERS.slice(0, shownIdx).find((c) => !doneOf[c.id]);
    const waiting = !shownDone && blockedBy
      ? <p className="inline-flex items-center gap-2 text-[14px] text-sage"><Lock size={14} /> Opens after chapter {CHAPTERS.indexOf(blockedBy) + 1}, {blockedBy.label}</p>
      : null;
    const working = busy && !cheatsOpen ? busy : null;

    switch (shown) {
      case "company":
        return {
          title: "Acme opens its pay report",
          line: "The law asks Acme to publish its gender pay gap. Here Acme proves the numbers instead of just claiming them.",
          cast: <Avatar seed={CAST.ceo} tone="gold" size={150} />,
          action: shownDone
            ? <Done>Report opened{onChain && deployed ? ` · ${short(deployed, 6)}` : ""}</Done>
            : <Action onClick={deploy} disabled={!ready} busy={working}>Open the report</Action>,
          body: null,
        };
      case "payroll":
        return {
          title: "The payroll company locks every salary",
          line: "Each salary turns into a sealed code. The codes go public. The salaries never do.",
          cast: <Avatar seed={CAST.payroll} tone="gold" size={150} />,
          action: shownDone ? <Done>{ledger?.payrollRows} salaries locked</Done>
            : waiting ?? <Action onClick={declareRoster} busy={working}>Lock {people.length} salaries</Action>,
          body: <PayrollGrid people={people} locked={rosterDeclared} checked={payrollConfirmed} categories={categories} onSetup={locked ? undefined : () => setSetupOpen(true)} />,
        };
      case "council":
        return {
          title: "The workers' council checks the payroll",
          line: "Employee representatives check every sealed code against the real payroll before anyone can join.",
          cast: (
            <div className="flex -space-x-8">
              {CAST.council.map((s, i) => <Avatar key={s} seed={s} tone="gold" size={i === 1 ? 128 : 100} className={`ring-4 ring-night ${i === 1 ? "relative z-10" : "mt-6"}`} />)}
            </div>
          ),
          action: shownDone ? <Done>Every row checked and approved</Done>
            : waiting ?? <Action onClick={confirmPayroll} busy={working}>Check and approve</Action>,
          body: <PayrollGrid people={people} locked={rosterDeclared} checked={payrollConfirmed} categories={categories} />,
        };
      case "team":
        return {
          title: "Each employee confirms their own pay",
          line: "Everyone proves their sealed code is really theirs. Nobody sees anyone else's salary.",
          cast: (
            <div className="flex -space-x-7">
              {people.slice(0, 3).map((p, i) => <Avatar key={p.id} seed={p.name} size={i === 1 ? 124 : 98} className={`ring-4 ring-night ${i === 1 ? "relative z-10" : "mt-6"}`} />)}
            </div>
          ),
          action: shownDone ? <Done>All {ledger?.declaredHeadcount} employees confirmed</Done>
            : waiting ?? (
              <div className="flex flex-wrap items-center gap-3">
                <Action onClick={enrollAll} busy={working}>{enrolledCount ? "Confirm the rest" : "Everyone confirms"}</Action>
                <span className="text-[13px] text-sage">{enrolledCount} of {ledger?.declaredHeadcount ?? people.length} done{mode === "wallet" ? ` · one approval each in ${session?.walletName}` : ""}</span>
              </div>
            ),
          body: <TeamGrid people={people} categories={categories} open={payrollConfirmed} busy={!!busy} onEnroll={enroll} onReceipt={receipt} />,
        };
      case "report":
        return {
          title: "Acme publishes the pay gap",
          line: "Before anything goes public, the math rechecks every figure against the sealed payroll.",
          cast: <Avatar seed={CAST.ceo} tone="gold" size={150} />,
          action: shownDone ? <Done>Published and proven</Done>
            : waiting ?? <Action onClick={publishBoth} busy={working}>Publish the report</Action>,
          body: rep ? (
            <div className="flex flex-col gap-3">
              <ReportSummary rep={rep} vrep={vrep} categories={categories} />
              <details className="group rounded-xl bg-night-deep/60 ring-1 ring-gold/10">
                <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-[14px] font-medium text-cream">
                  <ScrollText size={16} className="shrink-0 text-gold" /> See all seven figures the law asks for
                  <ChevronDown size={16} className="ml-auto shrink-0 text-sage transition-transform group-open:rotate-180" />
                </summary>
                <div className="flex flex-col gap-4 p-4 pt-1"><ReportView rep={rep} vrep={vrep} categories={categories} /></div>
              </details>
            </div>
          ) : null,
        };
      case "inspector":
        return {
          title: "Anyone can check the report",
          line: "An inspector, an employee or you can check it. No salary is ever shown.",
          cast: <Avatar seed={CAST.inspector} tone="gold" size={150} />,
          action: !published ? waiting : (
            <div className="flex flex-wrap gap-2.5">
              <Action onClick={() => downloadFilingPack(buildFilingPack(ledger!, mode === "wallet" ? "preprod" : mode === "live" ? "local" : "browser-session", categories))}>
                <Download size={17} /> Download the report file
              </Action>
              <a href={onChain ? `/verify?network=${mode === "wallet" ? "preprod" : "local"}&contract=${ledger!.contractAddress}` : PREPROD_VERIFY}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl px-5 text-[15px] font-medium text-cream ring-1 ring-gold/30 transition-colors hover:text-gold hover:ring-gold/60">
                <ExternalLink size={16} /> {onChain ? "Check it on the blockchain" : "See a real one on Midnight testnet"}
              </a>
            </div>
          ),
          body: published ? <SeesNever /> : null,
        };
    }
  })();

  return (
    <>
      <AppHeader current="app" right={
        <WalletButton wallets={wallets} wallet={walletState} connecting={connecting} onConnect={connect} onDisconnect={disconnect}
          teamSize={people.length} onSmallTeam={smallTeam} locked={locked} />
      } />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6 md:pt-10">
        {/* title row */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-cream md:text-[2.5rem]">
              Watch Acme prove its pay gap
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-cream/6 py-1.5 pl-2 pr-3 text-[13px] text-cream/90">
              <span className={`grid size-6 place-items-center rounded-full ${mode === "browser" ? "bg-cream/10 text-cream" : "bg-gold text-night"}`}>
                {mode === "checking" ? <Loader2 size={13} className="animate-spin" /> : <modePill.icon size={13} />}
              </span>
              {mode === "checking" ? "Getting ready…" : modePill.text}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Ghost onClick={openCheats}><VenetianMask size={15} /> Try to cheat</Ghost>
            <Ghost onClick={startOver} disabled={!!busy || mode === "checking" || mode === "live"}><RotateCcw size={14} /> Start over</Ghost>
            {!published && (
              <button onClick={playAll} disabled={mode === "checking" || !ready || !!busy}
                className="inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 text-[13px] font-semibold text-night transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                {busy && !cheatsOpen ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} Play the whole story
              </button>
            )}
          </div>
        </div>

        {/* the chapter track: the Equals Seal with the cast riding on it */}
        <nav aria-label="Story chapters" className="relative mt-9">
          <div className="absolute inset-x-6 top-[16px] flex flex-col gap-1.5 sm:inset-x-7 sm:top-[22px]" aria-hidden="true">
            <div className="h-1.5 overflow-hidden rounded-full bg-cream/8">
              <motion.div className="h-full origin-left rounded-full bg-gold" initial={false} animate={{ transform: `scaleX(${progress / CHAPTERS.length})` }} transition={{ duration: 0.6, ease: EASE }} />
            </div>
            <div className="h-1.5 rounded-full ring-1 ring-gold/30" />
          </div>
          <ol className="relative flex items-start justify-between">
            {CHAPTERS.map((c, i) => {
              const done = doneOf[c.id];
              const isShown = c.id === shown;
              return (
                <li key={c.id} className="flex w-12 flex-col items-center sm:w-24">
                  <button onClick={() => setView(c.id === current ? null : c.id)} aria-current={isShown ? "step" : undefined}
                    aria-label={`Chapter ${i + 1}: ${c.label}${done ? ", done" : ""}`}
                    className={`relative rounded-full transition-[box-shadow,opacity,filter] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                      isShown ? "shadow-[0_0_0_3px_#131a15,0_0_0_6px_#ffd85f]" : "shadow-[0_0_0_3px_#131a15]"} ${!done && !isShown && i > currentIdx ? "opacity-45 grayscale" : ""}`}>
                    <Avatar seed={c.seed} tone={done ? "gold" : "sage"} size={56} fluid className="size-11 sm:size-14" />
                    <span className={`absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full ring-2 ring-night-deep sm:size-6 ${done ? "bg-gold text-night" : "bg-night text-sage"}`}>
                      {done ? <Check size={12} strokeWidth={3} /> : <c.badge size={11} />}
                    </span>
                  </button>
                  <span className={`mt-2.5 hidden text-[12px] font-semibold sm:block ${isShown ? "text-gold" : done ? "text-cream" : "text-sage"}`}>{c.label}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-center text-[13px] font-medium text-sage sm:hidden">
            {shownIdx + 1} of {CHAPTERS.length} · <span className="text-gold">{CHAPTERS[shownIdx].label}</span>
          </p>
        </nav>

        {/* the stage */}
        {mode === "checking" ? (
          <div className="mt-8 h-[420px] animate-pulse rounded-3xl bg-night-soft/40" aria-hidden="true" />
        ) : (
          <section aria-live="polite" className="mt-8 overflow-hidden rounded-3xl bg-night ring-1 ring-gold/12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={shown}
                initial={reduce ? false : { opacity: 0, transform: "translateX(28px)" }} animate={{ opacity: 1, transform: "translateX(0px)" }}
                exit={reduce ? undefined : { opacity: 0, transform: "translateX(-20px)" }} transition={{ duration: 0.35, ease: EASE }}
                className="grid gap-7 p-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:p-10">
                <div className="flex justify-center md:justify-start md:pt-1">{chapter.cast}</div>
                <div className="min-w-0">
                  <h2 className="font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-cream md:text-[2.125rem]">{chapter.title}</h2>
                  <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-sage">{chapter.line}</p>
                  <div className="mt-6">{chapter.action}</div>
                  {busy && !cheatsOpen && mode === "wallet" && phase >= 0 && <WriteProgress phase={phase} wallet={session?.walletName ?? "your wallet"} />}
                  {problem && <ProblemNote problem={problem} wallet={session?.walletName} onRecheck={recheckFuel} />}
                  {chapter.body && <div className="mt-8">{chapter.body}</div>}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* try to cheat */}
        <AnimatePresence>
          {cheatsOpen && (
            <motion.section ref={cheatsRef} aria-labelledby="cheat-title" className="mt-8 scroll-mt-24 rounded-3xl bg-night-deep p-6 ring-1 ring-gold/10 md:p-10"
              initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#460809]/60 text-[#ffa2a2]"><VenetianMask size={26} /></span>
                  <div>
                    <h2 id="cheat-title" className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-cream">Try to cheat</h2>
                    <p className="mt-1 text-[15px] text-sage">Pick a trick. The same contract code checks it{mode === "wallet" ? ", before anything reaches the chain" : ""}.</p>
                  </div>
                </div>
                {rejectedCount > 0 && <span className="text-[14px] font-medium text-[#ffa2a2]">{rejectedCount} of {cheats.length} tricks rejected</span>}
              </div>
              <div className="mt-7"><CheatBoard cheats={cheats} results={cheatResults} onTry={tryCheat} busy={!!busy} /></div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* your own payroll + behind the scenes */}
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          <details open={setupOpen} onToggle={(e) => setSetupOpen((e.target as HTMLDetailsElement).open)} className="group rounded-2xl bg-night/70 ring-1 ring-gold/10">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-5 text-[15px] font-medium text-cream">
              <span className="grid size-9 place-items-center rounded-full bg-gold/12 text-gold"><Settings2 size={17} /></span>
              Use your own payroll
              <ChevronDown size={17} className="ml-auto text-sage transition-transform group-open:rotate-180" />
            </summary>
            <div className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex flex-wrap gap-2">
                <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                <Ghost onClick={() => fileRef.current?.click()} disabled={locked || !!busy}><Upload size={14} /> Upload a CSV</Ghost>
                <Ghost onClick={() => importCsv(SAMPLE_CSV, "a sample Personio export")} disabled={locked || !!busy}><FileSpreadsheet size={14} /> Sample export</Ghost>
                <Ghost onClick={smallTeam} disabled={locked || !!busy}><Users size={14} /> 6-person team</Ghost>
              </div>
              <p className="text-[13px] text-sage">{locked ? "The salaries are locked for this run. Start over to change them." : csvNote ?? "Personio or DATEV exports work. The file is read in this browser and never sent anywhere."}</p>
              {!deployed && (
                <div className="grid gap-2 sm:grid-cols-3">
                  {([["Acme's key", employerSecret, setEmployerSecret], ["Payroll company's key", providerSecret, setProviderSecret], ["Council's key", councilSecret, setCouncilSecret]] as const).map(([label, value, set]) => (
                    <label key={label} className="flex min-w-0 flex-col gap-1 text-[12px] text-sage">
                      {label}
                      <input value={value} onChange={(e) => set(e.target.value)}
                        className="min-w-0 rounded-md border border-gold/15 bg-night-deep px-3 py-2 font-mono text-[12px] text-cream outline-none focus:border-gold/50" />
                    </label>
                  ))}
                </div>
              )}
            </div>
          </details>

          <details className="group rounded-2xl bg-night/70 ring-1 ring-gold/10">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-5 text-[15px] font-medium text-cream">
              <span className="grid size-9 place-items-center rounded-full bg-gold/12 text-gold"><ScrollText size={17} /></span>
              Behind the scenes
              {log.length > 0 && <span className="rounded-full bg-cream/8 px-2 py-0.5 text-[12px] text-sage">{log.length}</span>}
              <ChevronDown size={17} className="ml-auto text-sage transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5">
              <ol className="flex max-h-72 flex-col gap-1 overflow-auto rounded-xl bg-night-deep p-3 font-mono text-[12px] leading-relaxed">
                {log.length === 0
                  ? <li className="font-sans text-[13px] text-sage">Every step's technical record shows up here.</li>
                  : log.map((l, i) => (
                    <li key={i} className={l.startsWith("✗") ? "text-[#ffa2a2]" : l.startsWith("▶") ? "font-sans text-[13px] font-medium text-cream" : "text-sage"}>{l}</li>
                  ))}
              </ol>
              <p className="mt-3 text-[13px] leading-relaxed text-sage">
                {mode === "wallet"
                  ? "Each step runs the contract code in this page, gets a zero-knowledge proof, and is sent to Midnight's preprod testnet by your wallet."
                  : mode === "live"
                  ? "Each step is proven by your local proof server and finalized on your local Midnight node."
                  : "Practice runs the real compiled contract in your browser, with the same checks as on-chain, but makes no proofs. Connect a wallet to run it on Midnight's testnet."}
              </p>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

/** The payroll as people: a salary each, sealed into a code once locked, checked once the council approves. */
function PayrollGrid({ people, locked, checked, categories, onSetup }: { people: Person[]; locked: boolean; checked: boolean; categories: string[]; onSetup?: () => void }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {people.map((p, i) => (
          <li key={p.id} className="flex items-center gap-2.5 rounded-xl bg-night-deep/70 p-2.5 ring-1 ring-gold/8">
            <div className="relative">
              <Avatar seed={p.name} size={36} />
              <AnimatePresence>
                {checked && (
                  <motion.span initial={{ opacity: 0, transform: "scale(0.6)" }} animate={{ opacity: 1, transform: "scale(1)" }}
                    transition={{ duration: 0.25, ease: EASE, delay: i * 0.04 }}
                    className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-gold text-night ring-2 ring-night-deep">
                    <Check size={10} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium text-cream">{first(p.name)} <span className="font-normal text-sage">· {categories[p.category]}</span></div>
              <Sealed hash={payrollRowHash(toRow(p))} salary={p.salary} locked={locked} />
            </div>
          </li>
        ))}
      </ul>
      {onSetup && (
        <button onClick={onSetup} className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-sage underline decoration-gold/30 underline-offset-4 hover:text-gold">
          <Upload size={13} /> Use your own payroll
        </button>
      )}
    </div>
  );
}

/** The team: tap a face to confirm that person; once confirmed, they can check they were counted. */
function TeamGrid({ people, categories, open, busy, onEnroll, onReceipt }: {
  people: Person[]; categories: string[]; open: boolean; busy: boolean; onEnroll: (p: Person) => void; onReceipt: (p: Person) => void;
}) {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {people.map((p) => {
        const joined = !!p.commitment;
        return (
          <li key={p.id} className="flex flex-col items-center text-center">
            <button onClick={() => (joined ? onReceipt(p) : onEnroll(p))} disabled={!open || busy || !!p.receipt}
              aria-label={joined ? (p.receipt ? `${p.name} was counted` : `Check ${p.name} was counted`) : `Confirm ${p.name}`}
              className={`relative rounded-full transition-[box-shadow,opacity,filter] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-default ${
                joined ? "shadow-[0_0_0_3px_#202b22,0_0_0_5px_#ffd85f]" : open ? "hover:shadow-[0_0_0_3px_#202b22,0_0_0_5px_rgba(255,216,95,0.4)]" : "opacity-50 grayscale"}`}>
              <Avatar seed={p.name} size={60} />
              <AnimatePresence>
                {joined && (
                  <motion.span initial={{ opacity: 0, transform: "scale(0.5)" }} animate={{ opacity: 1, transform: "scale(1)" }} transition={{ duration: 0.25, ease: EASE }}
                    className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-gold text-night ring-2 ring-night">
                    {p.receipt ? <BadgeCheck size={14} /> : <Lock size={12} />}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="mt-2 text-[13px] font-medium text-cream">{first(p.name)}</span>
            <span className="text-[11px] text-sage">{p.receipt ? "counted" : joined ? "tap: was I counted?" : categories[p.category]}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** What the published report shows, and what it never can. */
function SeesNever() {
  const can = ["The pay gap figures", "One sealed code per salary", "The math proof behind every figure"];
  const never = ["Any salary", "Any name", "Who earns what"];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-gold p-5 text-night">
        <div className="flex items-center gap-2 text-[15px] font-semibold"><Eye size={18} /> Anyone can see</div>
        <ul className="mt-3 flex flex-col gap-2 text-[14px]">{can.map((t) => <li key={t} className="flex items-center gap-2"><Check size={15} className="shrink-0" /> {t}</li>)}</ul>
      </div>
      <div className="rounded-2xl bg-night-deep p-5 ring-1 ring-gold/12">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-cream"><EyeOff size={18} className="text-gold" /> Nobody can see</div>
        <ul className="mt-3 flex flex-col gap-2 text-[14px] text-sage">{never.map((t) => <li key={t} className="flex items-center gap-2"><Lock size={14} className="shrink-0 text-gold" /> {t}</li>)}</ul>
      </div>
    </div>
  );
}

/** When an honest step stops: a picture of the fix, not a stack trace. */
function ProblemNote({ problem, wallet, onRecheck }: { problem: NonNullable<Problem>; wallet?: string; onRecheck: () => void }) {
  if (problem.kind === "no-dust") {
    return (
      <div role="alert" className="mt-5 rounded-2xl bg-[#460809]/35 p-5 ring-1 ring-[#ff6467]/35">
        <div className="flex items-center gap-2.5 text-[15px] font-semibold text-[#ffc9c9]"><Fuel size={18} /> {wallet ?? "Your wallet"} has no fee fuel (DUST) yet</div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { n: 1, t: "Get free tNIGHT", d: <a href="https://faucet.preprod.midnight.network" target="_blank" rel="noreferrer" className="underline underline-offset-4">Midnight faucet</a> },
            { n: 2, t: "Turn on DUST", d: `In ${wallet ?? "your wallet"}, set your tNIGHT to generate DUST` },
            { n: 3, t: "Wait a few minutes", d: "DUST builds up over time, then try again" },
          ].map((s) => (
            <li key={s.n} className="rounded-xl bg-night-deep/60 p-3.5">
              <span className="grid size-7 place-items-center rounded-full bg-[#ff6467]/20 text-[13px] font-semibold text-[#ffa2a2]">{s.n}</span>
              <div className="mt-2 text-[14px] font-medium text-cream">{s.t}</div>
              <div className="mt-0.5 text-[13px] text-sage">{s.d}</div>
            </li>
          ))}
        </ol>
        <button onClick={onRecheck} className="mt-4 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium text-cream ring-1 ring-gold/30 hover:text-gold">
          <RotateCcw size={14} /> Check again
        </button>
      </div>
    );
  }
  return (
    <div role="alert" className="mt-5 flex items-start gap-3 rounded-2xl bg-[#460809]/35 p-4 text-[14px] leading-relaxed text-[#ffc9c9] ring-1 ring-[#ff6467]/35">
      <CircleAlert size={18} className="mt-0.5 shrink-0" />
      <span>{problem.kind === "no-answer" ? problem.message : <>That step stopped: <span className="font-mono text-[12px]">{problem.message}</span></>}</span>
    </div>
  );
}
