import type { CSSProperties, ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, ChartLine, Compass, Fingerprint, Globe, KeyRound, Layers, ListChecks, Lock, ScanEye, SendHorizontal, ShieldCheck, UserCheck, Users, Workflow } from "lucide-react";
import { PillLink } from "@/components/ui/PillLink";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { MARK_DOTS, MARK_SIZE } from "@/components/layout/logoShapes";
import { InsightsGlobe } from "./InsightsGlobe";

type InsightItem = (typeof INSIGHTS_CONTENT.items)[number];
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

/* Every desktop tile is frosted white glass over the master card's pale colour wash, so the bento
   reads as one consistent, light set. (The dark tone is kept for reuse.) */
type Tone = "dark" | "light";
const TILE_BASE = "group relative min-w-0 overflow-hidden rounded-2xl";
const TILE: Record<Tone, string> = {
  light: `${TILE_BASE} border border-white/80 bg-gradient-to-b from-white/85 via-white/65 to-[#E9E9EF]/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_1px_2px_rgba(40,30,90,.05),0_16px_36px_-18px_rgba(60,45,140,.28)]`,
  dark: `${TILE_BASE} border border-black/60 bg-gradient-to-b from-[#26262B] to-[#18181C] shadow-[0_1px_2px_rgba(0,0,0,.2),0_18px_36px_-16px_rgba(0,0,0,.5)]`,
};
const EYEBROW_TONE: Record<Tone, string> = { light: "text-[#6049C9]", dark: "text-[#B9A8FF]" };
const TITLE_TONE: Record<Tone, string> = { light: "text-[#2A2A30]", dark: "text-white/90" };
const BODY_TONE: Record<Tone, string> = { light: "text-[#6E6D78]", dark: "text-white/55" };
const EYEBROW = "text-[11px] font-semibold uppercase tracking-[0.1em]";
const TITLE = "font-normal tracking-[-0.02em]";
const BODY = "text-sm leading-relaxed";

/** The navbar's specular sheen on a dark tile: a thin light line along the top edge. */
function DarkSheen() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]" />
    </>
  );
}
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7057D9]";
/* ------------------------------------------------------------------ *
 * The picture area of each tile: a graphite panel.
 * Light falls softly from the top left, a little violet pools at the
 * bottom right, a fine grain sits over it and a hairline of light
 * traces the edge. The visuals inside are frosted glass and brushed
 * graphite, and read their colours from the --b-* variables; outside
 * a stage (the phone layout's featured banner) they fall back to light.
 * ------------------------------------------------------------------ */

/** `var(--b-name, fallback)`: the dark value inside a stage, the light one elsewhere. */
const T = (name: string, fallback: string) => `var(--b-${name}, ${fallback})`;

const STAGE_STYLE = {
  "--b-line": "rgba(255,255,255,.1)",
  "--b-accent": "#C4B8FF",
  "--b-glow": "none",
  "--b-tile": "linear-gradient(135deg, #3A3A42 0%, #2A2A30 60%, #222227 100%)",
  "--b-tile-top": "inset 1px 1px 0 rgba(255,255,255,.14)",
  "--b-tile-edge": "#0D0D10",
  "--b-tile-ink": "#B9B9C2",
  "--b-glass": "linear-gradient(180deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.04) 100%)",
  "--b-glass-edge": "rgba(255,255,255,.11)",
  "--b-glass-shadow": "inset 0 1px 0 rgba(255,255,255,.10), 0 14px 26px -14px rgba(0,0,0,.75)",
  "--b-ink": "#EDEDF0",
  "--b-sub": "#A9A9B2",
  "--b-grid": "rgba(255,255,255,.05)",
  "--b-light": "rgba(255,255,255,.2)",
  "--b-area": "#8B74FF",
  "--b-dot": "rgba(255,255,255,.1)",
  "--b-ring": "rgba(255,255,255,.07)",
  "--b-ring-fill": "radial-gradient(circle, rgba(255,255,255,.05) 0%, rgba(255,255,255,.012) 70%)",
  "--b-send": "#F4F4F5",
  "--b-send-ink": "#18181B",
  // Inside a dark tile the picture area is a faint glass panel, a shade lighter than the card.
  background: "linear-gradient(180deg, rgba(255,255,255,.045) 0%, rgba(255,255,255,.02) 100%)",
} as CSSProperties;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** The light counterpart: soft white fading to pale grey, with the same light, grain and edge. */
const LIGHT_STAGE_STYLE: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,.85) 0%, rgba(247,246,252,.6) 100%)",
};

/** A tile's picture area. Dark and light stages alternate across the bento; a dark stage is smoky grey glass. */
function Stage({ className = "", tone = "light", children }: { className?: string; tone?: "dark" | "light"; children: ReactNode }) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" style={dark ? STAGE_STYLE : LIGHT_STAGE_STYLE} className={`relative w-full shrink-0 overflow-hidden rounded-xl ${className}`}>
      <div className={`pointer-events-none absolute inset-0 ${dark ? "opacity-[.07] mix-blend-screen" : "opacity-[.05] mix-blend-multiply"}`} style={{ backgroundImage: GRAIN }} />
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ boxShadow: dark ? "inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.07)" : "inset 0 1px 0 rgba(255,255,255,1), inset 0 0 0 1px rgba(60,45,140,.07)" }}
      />
    </div>
  );
}

/** Frosted glass: chips, nodes and windows inside a stage. */
const GLASS: CSSProperties = {
  background: T("glass", "#fff"),
  border: `1px solid ${T("glass-edge", "#EDEDF0")}`,
  boxShadow: T("glass-shadow", "0 10px 22px -12px rgba(25,25,28,.4)"),
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

const FLOW_CSS = `
.bento-dash { stroke-dasharray: 9 91; animation: bento-dash 4s linear infinite; }
@keyframes bento-dash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .bento-dash { display: none; } }
`;

/** A hairline with a short, softly glowing highlight travelling along it. */
function FlowLine({ d, duration = 4, delay = 0 }: { d: string; duration?: number; delay?: number }) {
  return (
    <>
      <path d={d} fill="none" strokeWidth="1.25" style={{ stroke: T("line", "#D9D8E2") }} />
      <path
        d={d}
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        pathLength={100}
        className="bento-dash"
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s`, stroke: T("accent", "#6D54F1"), filter: T("glow", "none") }}
      />
    </>
  );
}

const ISO_TILES: { icon: Icon; x: number; y: number }[] = [
  { icon: Bot, x: 34, y: 34 },
  { icon: ShieldCheck, x: 266, y: 34 },
  { icon: UserCheck, x: 266, y: 266 },
  { icon: ListChecks, x: 34, y: 266 },
];
const ISO_SHADOW = (colour: string) => Array.from({ length: 7 }, (_, i) => `${i + 1}px ${i + 1}px 0 ${colour}`).join(", ");

/** The parts of a trustworthy AI system, on one plane around a single coordinating step. */
function IsometricVisual() {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[300px] w-[300px]"
      style={{ transform: "translate(-50%, -50%) scale(0.78) rotateX(56deg) rotateZ(45deg)" }}
    >
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full overflow-visible">
        <FlowLine d="M150 150 H34 V34" duration={4.5} />
        <FlowLine d="M150 150 V34 H266" duration={4.5} delay={1.1} />
        <FlowLine d="M150 150 H266 V266" duration={4.5} delay={2.2} />
        <FlowLine d="M150 150 V266 H34" duration={4.5} delay={3.3} />
      </svg>
      {ISO_TILES.map(({ icon: TileIcon, x, y }) => (
        <span
          key={`${x}-${y}`}
          className="absolute flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px]"
          style={{
            left: x,
            top: y,
            background: T("tile", "#F3F3F6"),
            color: T("tile-ink", "#6E6D78"),
            boxShadow: `${T("tile-top", "inset 0 0 0 transparent")}, ${ISO_SHADOW(T("tile-edge", "#E3E3E9"))}, 16px 16px 26px rgba(0,0,0,0.18)`,
          }}
        >
          <TileIcon className="h-8 w-8" strokeWidth={1.5} />
        </span>
      ))}
      <span
        className="absolute left-1/2 top-1/2 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] text-white"
        style={{
          background: "linear-gradient(135deg, #8A73FF 0%, #6D54F1 55%, #5B43DD 100%)",
          boxShadow: `inset 1px 1px 0 rgba(255,255,255,.3), ${ISO_SHADOW("#4331B0")}, 18px 18px 34px rgba(109,84,241,0.45)`,
        }}
      >
        <svg role="img" aria-label="21 Spheres" viewBox={`0 0 ${MARK_SIZE[0]} ${MARK_SIZE[1]}`} className="h-[62px] w-[62px]" fill="currentColor">
          {MARK_DOTS.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
        </svg>
      </span>
    </div>
  );
}

const CHART_PATH = "M12 118 H62 L100 74 H168 Q190 74 204 54 Q218 36 234 48 Q250 62 262 58 Q282 44 306 12";

function ChartVisual() {
  return (
    <>
      <div className="absolute inset-x-6 -bottom-1 top-4 overflow-hidden rounded-t-[14px]" style={GLASS}>
        <div className="flex gap-1.5 px-3.5 py-2.5">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((colour) => (
            <span key={colour} className="h-2 w-2 rounded-full" style={{ background: T("light", colour) }} />
          ))}
        </div>
        <svg viewBox="0 0 320 136" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[124px] w-full">
          <defs>
            <linearGradient id="bento-chart-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: T("area", "#8B74FF"), stopOpacity: 0.22 }} />
              <stop offset="1" style={{ stopColor: T("area", "#8B74FF"), stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[70, 130, 190, 250].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="136" style={{ stroke: T("grid", "#F4F4F7") }} />)}
          <path d={`${CHART_PATH} V136 H12 Z`} fill="url(#bento-chart-area)" />
          <path d={CHART_PATH} fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{ stroke: T("line", "#D9D8E2") }} />
          <path d={CHART_PATH} fill="none" strokeWidth="2" strokeLinecap="round" pathLength={100} vectorEffect="non-scaling-stroke" className="bento-dash" style={{ animationDuration: "5s", stroke: T("accent", "#6D54F1"), filter: T("glow", "none") }} />
        </svg>
      </div>
      <div className="absolute bottom-2.5 left-1/2 flex w-[68%] min-w-[210px] -translate-x-1/2 items-center gap-2 rounded-full py-1.5 pl-3.5 pr-1.5 text-xs" style={{ ...GLASS, color: T("sub", "#6E6D78") }}>
        <span className="flex-1 truncate">Ask about your data</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: T("send", "#19191C"), color: T("send-ink", "#fff") }}>
          <SendHorizontal className="h-3.5 w-3.5" />
        </span>
      </div>
    </>
  );
}

const TREE_CHIPS: { icon: Icon; label: string; x: number }[] = [
  { icon: Compass, label: "Decisions", x: 67 },
  { icon: Workflow, label: "Workflows", x: 200 },
  { icon: Layers, label: "Context", x: 333 },
];

/** Enterprise AI grows out of the people using it, then into their everyday work. */
function TreeVisual() {
  return (
    <div className="absolute left-1/2 top-2 h-[236px] w-[400px] origin-top -translate-x-1/2 scale-[0.7]">
      <svg viewBox="0 0 400 236" className="absolute inset-0 h-full w-full">
        <FlowLine d="M200 82 V94 Q200 106 188 106 H79 Q67 106 67 118 V130" duration={3.6} />
        <FlowLine d="M200 82 V130" duration={3.6} delay={1.2} />
        <FlowLine d="M200 82 V94 Q200 106 212 106 H321 Q333 106 333 118 V130" duration={3.6} delay={2.4} />
        <FlowLine d="M67 166 V178 Q67 190 79 190 H188 Q200 190 200 202 V236" duration={4.4} delay={0.6} />
        <FlowLine d="M333 166 V178 Q333 190 321 190 H212 Q200 190 200 202 V236" duration={4.4} delay={2.6} />
        <path d="M200 166 V236" fill="none" strokeWidth="1.25" style={{ stroke: T("line", "#D9D8E2") }} />
      </svg>
      <span
        className="absolute left-1/2 top-[22px] flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-[16px] text-white"
        style={{ background: "linear-gradient(135deg, #8A73FF 0%, #6D54F1 55%, #5B43DD 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.3), 0 14px 30px -10px rgba(109,84,241,0.8)" }}
      >
        <Users className="h-7 w-7" strokeWidth={1.6} />
      </span>
      {TREE_CHIPS.map(({ icon: ChipIcon, label, x }) => (
        <span
          key={label}
          className="absolute top-[130px] flex h-9 w-[118px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-full text-xs font-medium"
          style={{ ...GLASS, left: x, color: T("ink", "#19191C") }}
        >
          <span style={{ color: T("sub", "#6E6D78") }}><ChipIcon className="h-3.5 w-3.5" /></span>
          {label}
        </span>
      ))}
    </div>
  );
}

const HUB_NODES: { icon: Icon; x: number; y: number }[] = [
  { icon: Lock, x: 62, y: 150 },
  { icon: KeyRound, x: 128, y: 62 },
  { icon: Fingerprint, x: 272, y: 62 },
  { icon: ScanEye, x: 338, y: 150 },
];

/** Scanning, recognition and checks, all feeding one verified result (the computer vision insight). */
function HubVisual() {
  return (
    <div className="absolute left-1/2 top-1/2 h-[236px] w-[400px] -translate-x-1/2 -translate-y-[56%] scale-[0.95]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${T("dot", "#DCDBE5")} 1px, transparent 1px)`,
          backgroundSize: "13px 13px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />
      {[300, 212, 124].map((size) => (
        <span
          key={size}
          className="absolute left-1/2 top-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: size, height: size, border: `1px solid ${T("ring", "#EDEDF2")}`, background: T("ring-fill", "rgba(255,255,255,.7)") }}
        />
      ))}
      <svg viewBox="0 0 400 236" className="absolute inset-0 h-full w-full">
        <FlowLine d="M90 150 H146" duration={3.2} />
        <FlowLine d="M140 88 Q148 122 172 134" duration={3.2} delay={0.8} />
        <FlowLine d="M260 88 Q252 122 228 134" duration={3.2} delay={1.6} />
        <FlowLine d="M310 150 H254" duration={3.2} delay={2.4} />
      </svg>
      {HUB_NODES.map(({ icon: NodeIcon, x, y }) => (
        <span
          key={`${x}-${y}`}
          className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ ...GLASS, left: x, top: y, color: T("ink", "#19191C") }}
        >
          <NodeIcon className="h-5 w-5" strokeWidth={1.6} />
        </span>
      ))}
      <span
        className="absolute left-1/2 top-[150px] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium text-white"
        style={{ background: "linear-gradient(135deg, #8A73FF 0%, #6D54F1 60%, #5B43DD 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.3), 0 0 0 7px rgba(109,84,241,0.12), 0 12px 28px -8px rgba(109,84,241,0.85)" }}
      >
        <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
        Verified
      </span>
    </div>
  );
}

const AGENT_STEPS: { role: string; note: string; done: boolean }[] = [
  { role: "Planner", note: "Plan drafted", done: true },
  { role: "Validator", note: "Handoff checked", done: true },
  { role: "Human review", note: "Awaiting approval", done: false },
];

/** Left of the featured diagram: one run moving through its roles, ending with a person. */
function AgentRunPanel() {
  return (
    <div className="absolute left-5 top-1/2 hidden w-[210px] -translate-y-1/2 rounded-[14px] p-3 xl:block" style={GLASS}>
      <div className="mb-2.5 flex items-center justify-between text-[10px]">
        <span className="font-medium" style={{ color: T("ink", "#19191C") }}>Agent run #214</span>
        <span className="flex items-center gap-1 rounded-full px-1.5 py-0.5" style={{ background: "rgba(109,84,241,.1)", color: "#6049C9" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D54F1] motion-safe:animate-pulse" />
          Live
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {AGENT_STEPS.map(({ role, note, done }) => (
          <li key={role} className="flex items-center gap-2 rounded-[9px] px-2 py-1.5" style={{ background: "rgba(60,45,140,.04)" }}>
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px]"
              style={done ? { background: "rgba(109,84,241,.12)", color: "#6049C9" } : { border: `1px dashed ${T("sub", "#6E6D78")}`, color: T("sub", "#6E6D78") }}
            >
              {done ? "✓" : ""}
            </span>
            <span className="min-w-0 flex-1 text-[10px] leading-tight">
              <span className="block font-medium" style={{ color: T("ink", "#19191C") }}>{role}</span>
              <span className="block" style={{ color: T("sub", "#6E6D78") }}>{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TRUST_BARS = [38, 52, 46, 61, 58, 70, 66, 78, 74, 85, 82, 92];

/** Right of the featured diagram: how the system is holding up. */
function TrustPanel() {
  return (
    <div className="absolute right-5 top-1/2 hidden w-[200px] -translate-y-1/2 rounded-[14px] p-3 xl:block" style={GLASS}>
      <p className="text-[10px] font-medium" style={{ color: T("sub", "#6E6D78") }}>Trust score</p>
      <p className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-[22px] font-light tracking-[-0.03em]" style={{ color: T("ink", "#19191C") }}>98.6%</span>
        <span className="text-[10px] text-[#6049C9]">+2.1%</span>
      </p>
      <div className="mt-2 flex h-9 items-end gap-[3px]">
        {TRUST_BARS.map((height, i) => (
          <span
            key={i}
            className="flex-1 rounded-[2px]"
            style={{ height: `${height}%`, background: i === TRUST_BARS.length - 1 ? "#6D54F1" : "rgba(60,45,140,.1)" }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t pt-2 text-[10px]" style={{ borderColor: T("glass-edge", "#EDEDF0"), color: T("sub", "#6E6D78") }}>
        <span>Handoffs validated</span>
        <span style={{ color: T("ink", "#19191C") }}>128 / 128</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop: the bento. A grey master card holding six off-white tiles:
 * founder + featured essay on top; a tall tile, two stacked tiles and
 * another tall tile below.
 * ------------------------------------------------------------------ */

const eyebrowFor = (article: InsightItem) => `${article.category} / ${(article.readTime ?? "").toLowerCase()}`;

/** The black "Learn more" pill. It sits inside the tile's link, so it is not a link itself. */
function LearnMore() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7057D9] bg-[#7057D9] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_5px_14px_rgba(112,87,217,.28)] transition-colors hover:border-[#5F47C9] hover:bg-[#5F47C9]">
      Learn more<span aria-hidden="true">↗</span>
    </span>
  );
}

function TileLink({ article, className = "", children }: { article: InsightItem; className?: string; children: ReactNode }) {
  return (
    <Link href={`/insights/${article.slug}`} className={`flex h-full flex-col rounded-2xl ${FOCUS} ${className}`}>
      {children}
    </Link>
  );
}

/** The founder: the portrait fills the tile, the quote sits over its darkened foot. */
function FounderTile() {
  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/80 bg-black shadow-[0_1px_2px_rgba(40,30,90,.05),0_16px_36px_-18px_rgba(60,45,140,.35)] lg:col-span-4">
      <Link href="/insights/founders-note" aria-label="Read the Founder's Note by Om Baval" className={`absolute inset-0 z-10 rounded-2xl ${FOCUS}`} />
      <Image src="/om-bawal-photo.jpg" alt="Om Baval, Founder and CEO at 21 Spheres" fill sizes="(max-width: 1279px) 34vw, 440px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/95" />
      <span className="absolute left-4 top-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85">Founder&apos;s perspective</span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <blockquote className="mb-3 text-[15px] font-light leading-[1.45] tracking-[-0.01em] text-white/90">“Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”</blockquote>
        <div className="border-t border-white/25 pt-2.5">
          <p className="text-[15px] font-medium text-white">Om Baval</p>
          <p className="mt-0.5 text-[13px] text-white/65">Founder &amp; CEO, 21 Spheres</p>
        </div>
      </div>
    </article>
  );
}

/** The featured essay, on a dark tile: the purple isometric system on top, the words below. */
function FeatureTile({ article }: { article: InsightItem }) {
  const tone: Tone = "light";
  return (
    <article className={`${TILE[tone]} min-h-[360px] lg:col-span-8`}>
      <TileLink article={article} className="p-4">
        <Stage tone={tone} className="h-[200px]">
          <IsometricVisual />
          <AgentRunPanel />
          <TrustPanel />
        </Stage>
        <div className="mt-3.5 max-w-[560px]">
          <p className={`mb-2 ${EYEBROW} ${EYEBROW_TONE[tone]}`}>{eyebrowFor(article)}</p>
          <h3 className={`mb-1.5 text-[20px] leading-[1.25] ${TITLE} ${TITLE_TONE[tone]}`}>{article.title}</h3>
          <p className={`mb-3.5 line-clamp-2 ${BODY} ${BODY_TONE[tone]}`}>{article.excerpt}</p>
          <LearnMore />
        </div>
      </TileLink>
    </article>
  );
}

/** Tall tile, words first: the globe rises out of its foot. */
function GlobeTile({ article }: { article: InsightItem }) {
  const tone: Tone = "light";
  return (
    <article className={`${TILE[tone]} min-h-[460px] lg:col-span-4`}>
      <TileLink article={article} className="p-4">
        <p className={`mb-2 ${EYEBROW} ${EYEBROW_TONE[tone]}`}>{eyebrowFor(article)}</p>
        <h3 className={`mb-1.5 text-[18px] leading-[1.25] ${TITLE} ${TITLE_TONE[tone]}`}>{article.title}</h3>
        <p className={`mb-3.5 line-clamp-2 ${BODY} ${BODY_TONE[tone]}`}>{article.excerpt}</p>
        <LearnMore />
        <Stage tone={tone} className="mt-4 min-h-[180px] flex-1">
          <InsightsGlobe className="absolute left-1/2 top-5 w-[340px] max-w-none -translate-x-1/2" />
        </Stage>
      </TileLink>
    </article>
  );
}

/** Half-height tile for the middle column: a visual with a short caption under it. */
function SmallTile({ article, stage, tone }: { article: InsightItem; stage: ReactNode; tone: Tone }) {
  return (
    <article className={`${TILE[tone]} min-h-0`}>
      {tone === "dark" && <DarkSheen />}
      <TileLink article={article} className="p-3">
        <Stage tone={tone} className="min-h-[125px] flex-1">{stage}</Stage>
        <div className="px-1 pb-0.5 pt-2.5">
          <p className={`mb-1 ${EYEBROW} ${EYEBROW_TONE[tone]}`}>{article.category}</p>
          <h3 className={`flex items-start justify-between gap-3 text-[15px] leading-snug ${TITLE} ${TITLE_TONE[tone]}`}>
            {article.title}
            <ArrowUpRight aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${tone === "dark" ? "text-white/45 group-hover:text-white" : "text-[#6E6D78] group-hover:text-[#19191C]"}`} />
          </h3>
        </div>
      </TileLink>
    </article>
  );
}

/** Tall tile, visual first: the words sit underneath. */
function VisualFirstTile({ article, stage, tone }: { article: InsightItem; stage: ReactNode; tone: Tone }) {
  return (
    <article className={`${TILE[tone]} min-h-[460px] lg:col-span-4`}>
      {tone === "dark" && <DarkSheen />}
      <TileLink article={article} className="p-4">
        {/* The visual takes whatever height the tile has, so the words and button always sit together */}
        <Stage tone={tone} className="min-h-[220px] flex-1">{stage}</Stage>
        <div className="mt-3.5">
          <p className={`mb-2 ${EYEBROW} ${EYEBROW_TONE[tone]}`}>{eyebrowFor(article)}</p>
          <h3 className={`mb-1.5 text-[18px] leading-[1.25] ${TITLE} ${TITLE_TONE[tone]}`}>{article.title}</h3>
          <p className={`mb-3.5 line-clamp-2 ${BODY} ${BODY_TONE[tone]}`}>{article.excerpt}</p>
          <LearnMore />
        </div>
      </TileLink>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Phones and tablets: a calm "latest writing" layout.
 * A featured post, a compact list of recent posts, then the founder's
 * perspective as a pull-quote. Everything renders from LANDING_POSTS.
 * ------------------------------------------------------------------ */

interface LandingPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** e.g. "Nov 2026" */
  date: string;
  /** e.g. "8 min read" */
  readTime: string;
  icon: Icon;
  illustration?: ReactNode;
  featured: boolean;
}

const monthYear = (date: string) => date.toLowerCase().replace(/^(\w)(\w*)/, (_, a: string, b: string) => a.toUpperCase() + b);
const minRead = (readTime: string) => readTime.toLowerCase();

/** Which posts the landing page shows, in order. Exactly one is featured. */
const LANDING_PICKS: { slug: string; icon: Icon; featured?: boolean; illustration?: ReactNode }[] = [
  { slug: "beyond-artificial-intelligence", icon: Bot, featured: true, illustration: <IsometricVisual /> },
  { slug: "innovation-is-not-about-following-technology-it-is-about-questioning-it", icon: Globe },
  { slug: "engineering-reliable-ai-systems", icon: ChartLine },
  { slug: "the-evolution-of-large-language-models", icon: Users },
];

const LANDING_POSTS: LandingPost[] = LANDING_PICKS.flatMap(({ slug, icon, featured = false, illustration }) => {
  const item = INSIGHTS_CONTENT.items.find((entry) => entry.slug === slug);
  if (!item) return [];
  return [{
    slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: monthYear(item.date),
    readTime: minRead(item.readTime ?? "5 MIN READ"),
    icon,
    illustration,
    featured,
  }];
});

const TAG = "text-[12px] font-medium uppercase tracking-[0.1em] text-[#6248CA]";
const META = "text-[13px] text-[#6E6D78]";
const CARD = "rounded-2xl border border-[#E9E7F0] bg-white";

function FeaturedPost({ post }: { post: LandingPost }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      aria-label={`${post.title}. ${post.date}, ${post.readTime}`}
      className={`group flex flex-col overflow-hidden md:flex-row ${CARD} ${FOCUS}`}
    >
      {/* A short banner on phones; the left 40% on tablets */}
      <div aria-hidden="true" className="relative aspect-[2/1] max-h-[180px] w-full shrink-0 overflow-hidden bg-gradient-to-b from-[#F7F7FA] to-white md:aspect-auto md:max-h-none md:min-h-[220px] md:w-[40%]">
        <div className="absolute inset-0 scale-[0.8] md:scale-90">{post.illustration}</div>
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <span className={`w-fit rounded-full bg-[#F1EEFB] px-2.5 py-1 ${TAG}`}>{post.category}</span>
        <h3 className="mt-3 text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-[#19191C] group-hover:underline group-hover:decoration-[#6248CA]/40 group-hover:underline-offset-4 md:text-[22px]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#5E5D68]">{post.excerpt}</p>
        <p className={`mt-auto flex items-center justify-between pt-4 ${META}`}>
          <span>{post.date} &middot; {post.readTime}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#6248CA] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}

/** A row on phones (icon | meta + title | arrow); a compact card from tablets up. */
function PostRow({ post }: { post: LandingPost }) {
  const PostIcon = post.icon;
  return (
    <li className="md:flex">
      <Link
        href={`/insights/${post.slug}`}
        aria-label={`${post.title}. ${post.category}, ${post.readTime}`}
        className={`group grid min-h-[44px] w-full grid-cols-[40px_minmax(0,1fr)_16px] items-start gap-x-3 py-4 md:flex md:flex-col md:rounded-2xl md:border md:border-[#E9E7F0] md:bg-white md:p-5 ${FOCUS}`}
      >
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F1EEFB] text-[#6248CA] md:h-11 md:w-11">
          <PostIcon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 md:mt-4">
          <span className={`block ${META} md:hidden`}>
            <span className="uppercase tracking-[0.08em] text-[12px] text-[#6248CA]">{post.category}</span> &middot; {post.readTime}
          </span>
          <span className={`hidden md:block ${TAG}`}>{post.category}</span>
          <span className="mt-1 block text-[16px] font-medium leading-snug tracking-[-0.01em] text-[#19191C] group-hover:underline group-hover:decoration-[#6248CA]/40 group-hover:underline-offset-4 md:mt-2">
            {post.title}
          </span>
          <span className="mt-1.5 hidden line-clamp-2 text-[14px] leading-relaxed text-[#5E5D68] md:block">{post.excerpt}</span>
        </span>
        <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#9A99A3] group-hover:text-[#6248CA] md:hidden" />
        <span className={`mt-auto hidden items-center justify-between pt-4 md:flex ${META}`}>
          <span>{post.date} &middot; {post.readTime}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#6248CA]" />
        </span>
      </Link>
    </li>
  );
}

function FounderPullQuote() {
  return (
    <figure className="mb-8 border-l-[3px] border-[#7057D9] bg-[#F8F7FC] py-6 pl-5 pr-4">
      <p className={TAG}>Founder&apos;s perspective</p>
      <blockquote className="mt-3 text-[18px] font-light leading-[1.5] tracking-[-0.01em] text-[#19191C] md:text-[22px]">
        &ldquo;Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image src="/om-bawal-photo.jpg" alt="" fill sizes="40px" className="object-cover object-[50%_22%]" />
        </span>
        <span>
          <span className="block text-[15px] font-medium text-[#19191C]">Om Bawal</span>
          <span className={`block ${META}`}>Founder &amp; Chief Architect, 21 Spheres</span>
        </span>
      </figcaption>
    </figure>
  );
}

function LatestWriting() {
  const featured = LANDING_POSTS.find((post) => post.featured) ?? LANDING_POSTS[0];
  const recent = LANDING_POSTS.filter((post) => post !== featured);
  return (
    <div className="lg:hidden">
      {/* The founder's perspective leads, then the writing */}
      <FounderPullQuote />
      <FeaturedPost post={featured} />
      <ul aria-label="Recent insights" className="mt-6 divide-y divide-[#ECEAF2] border-b border-[#ECEAF2] md:mt-8 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:border-0">
        {recent.map((post) => <PostRow key={post.slug} post={post} />)}
      </ul>
    </div>
  );
}

export function InsightsBentoSection() {
  const items = INSIGHTS_CONTENT.items;
  // The tiles follow the Founder's Note order: its first section is the first tile, and so on.

  return (
    <section id="insights" aria-label="Insights and field notes" className="relative isolate w-full scroll-mt-14 bg-white py-12 text-black sm:scroll-mt-16 md:py-16 lg:pb-16 lg:pt-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ background: "radial-gradient(ellipse 55% 45% at 88% 62%, rgba(112,87,217,.05) 0%, transparent 100%), linear-gradient(180deg, #ffffff 0%, #fdfcff 50%, #f9f7ff 100%)" }}
      />
      <style href="insights-bento-flow" precedence="default">{FLOW_CSS}</style>
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end md:gap-6 lg:mb-8 lg:items-baseline lg:gap-3 lg:border-b lg:border-[#7057D9]/20 lg:pb-4">
          <div className="shrink-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#7C3AED] sm:text-[13px]">Our Insights</p>
            <h2 className="text-[clamp(2rem,1.6rem+2vw,3.25rem)] font-light leading-none tracking-[-0.04em]">Insights</h2>
          </div>
          <div className="flex flex-col gap-2 md:items-end lg:block">
            <p className="max-w-lg text-[14px] leading-relaxed text-[#5E5D68] md:text-right lg:text-sm lg:text-[#383842]">Ideas and field notes on building thoughtful, dependable digital products.</p>
            <Link href="/insights" className="inline-flex min-h-[44px] w-fit items-center gap-1.5 text-[14px] font-medium text-[#6248CA] underline-offset-4 hover:underline lg:hidden">
              View all <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <LatestWriting />

        {/* Phones: a two-column bento. The founder and the featured essay run full width, the other two sit side by side. */}
        {/* Desktop: the tiles sit inside one grey master card */}
        <div className="relative isolate hidden overflow-hidden rounded-[24px] border border-white bg-gradient-to-b from-[#F5F5F8] to-[#E6E6EC] p-3 shadow-[0_1px_2px_rgba(40,30,90,.04),0_24px_60px_-24px_rgba(60,45,140,.25)] lg:block">
          {/* A very pale wash of lavender, ice blue and blush, so the frosted tiles have something to frost */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(38% 48% at 12% 18%, rgba(190,176,255,.45) 0%, transparent 70%), radial-gradient(34% 44% at 88% 22%, rgba(176,206,255,.4) 0%, transparent 70%), radial-gradient(40% 46% at 50% 100%, rgba(244,200,232,.32) 0%, transparent 70%), radial-gradient(30% 40% at 70% 60%, rgba(200,190,255,.28) 0%, transparent 70%)",
            }}
          />
          <div className="grid grid-cols-12 grid-rows-[minmax(360px,auto)_auto] gap-3.5">
            <FounderTile />
            <FeatureTile article={items[0]} />
            <GlobeTile article={items[1]} />
            <div className="grid min-h-[460px] grid-rows-2 gap-3.5 lg:col-span-4">
              <SmallTile article={items[2]} stage={<ChartVisual />} tone="light" />
              <SmallTile article={items[3]} stage={<TreeVisual />} tone="light" />
            </div>
            <VisualFirstTile article={items[4]} stage={<HubVisual />} tone="light" />
          </div>
        </div>

        <div className="mt-8 hidden justify-center lg:flex">
          <PillLink href="/insights">See all insights</PillLink>
        </div>
      </div>
    </section>
  );
}

export default InsightsBentoSection;
