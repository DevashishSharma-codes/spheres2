import type { CSSProperties, ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Compass,
  Fingerprint,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  ScanEye,
  SendHorizontal,
  ShieldCheck,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import { BRICKS_DOWN, BRICKS_UP } from "@/components/ui/brickHover";
import { PillLink } from "@/components/ui/PillLink";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { MARK_DOTS, MARK_SIZE } from "@/components/layout/logoShapes";
import { InsightsGlobe } from "./InsightsGlobe";

type InsightItem = (typeof INSIGHTS_CONTENT.items)[number];
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

// The bottom row's bricks grow downward, because there's no room above it.
const FRAME = "relative min-w-0 overflow-hidden rounded-[26px] border-[6px] border-[#DADADD] bg-white transition-shadow duration-300 ease-out hover:z-10 motion-reduce:transition-none";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7057D9]";
const STAGE = "relative h-[184px] overflow-hidden bg-gradient-to-b from-[#F7F7FA] to-white";
const LINE = "#D9D8E2";
const ACCENT = "#6D54F1";
const FLOW_CSS = `
.bento-dash { stroke-dasharray: 9 91; animation: bento-dash 4s linear infinite; }
@keyframes bento-dash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .bento-dash { display: none; } }
`;

/** A hairline with a short highlight travelling along it. */
function FlowLine({ d, duration = 4, delay = 0 }: { d: string; duration?: number; delay?: number }) {
  const style: CSSProperties = { animationDuration: `${duration}s`, animationDelay: `${delay}s` };
  return (
    <>
      <path d={d} fill="none" stroke={LINE} strokeWidth="1.25" />
      <path d={d} fill="none" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" pathLength={100} className="bento-dash" style={style} />
    </>
  );
}

function CardWords({ article }: { article: InsightItem }) {
  return (
    <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
      <h3 className="flex items-start justify-between gap-3 text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-[#19191C]">
        {article.title}
        <ArrowUpRight aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#6E6D78] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#19191C] motion-reduce:transition-none" />
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6E6D78]">{article.excerpt}</p>
    </div>
  );
}

function ArticleCard({ article, className = "", stage, wide = false }: { article: InsightItem; className?: string; stage: ReactNode; wide?: boolean }) {
  return (
    <article className={`group ${FRAME} ${wide ? BRICKS_DOWN : BRICKS_UP} ${className}`}>
      <Link href={`/insights/${article.slug}`} className={`flex h-full flex-col justify-between rounded-[20px] ${wide ? "xl:flex-row xl:items-center xl:justify-start" : ""} ${FOCUS}`}>
        <div aria-hidden="true" className={`${STAGE} ${wide ? "w-full shrink-0 xl:w-[54%]" : ""}`}>{stage}</div>
        <CardWords article={article} />
      </Link>
    </article>
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
          className="absolute flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#F3F3F6] text-[#6E6D78]"
          style={{ left: x, top: y, boxShadow: `${ISO_SHADOW("#E3E3E9")}, 16px 16px 24px rgba(25,25,28,0.08)` }}
        >
          <TileIcon className="h-8 w-8" strokeWidth={1.5} />
        </span>
      ))}
      <span
        className="absolute left-1/2 top-1/2 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#6D54F1] text-white"
        style={{ boxShadow: `${ISO_SHADOW("#4E38C4")}, 18px 18px 30px rgba(109,84,241,0.35)` }}
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
      <div className="absolute inset-x-6 -bottom-1 top-4 rounded-t-[14px] border border-[#EDEDF0] bg-white shadow-[0_14px_34px_-20px_rgba(25,25,28,0.35)]">
        <div className="flex gap-1.5 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        </div>
        <svg viewBox="0 0 320 136" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[124px] w-full">
          {[70, 130, 190, 250].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="136" stroke="#F4F4F7" />)}
          <path d={CHART_PATH} fill="none" stroke={LINE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={CHART_PATH} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" pathLength={100} vectorEffect="non-scaling-stroke" className="bento-dash" style={{ animationDuration: "5s" }} />
        </svg>
      </div>
      <div className="absolute bottom-2.5 left-1/2 flex w-[68%] min-w-[210px] -translate-x-1/2 items-center gap-2 rounded-full border border-[#EDEDF0] bg-white py-1.5 pl-3.5 pr-1.5 text-xs text-[#6E6D78] shadow-[0_10px_24px_-12px_rgba(25,25,28,0.35)]">
        <span className="flex-1 truncate">Ask about your data</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#19191C] text-white">
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
    <div className="absolute left-1/2 top-0 h-[236px] w-[400px] origin-top -translate-x-1/2 scale-[0.78]">
      <svg viewBox="0 0 400 236" className="absolute inset-0 h-full w-full">
        <FlowLine d="M200 82 V94 Q200 106 188 106 H79 Q67 106 67 118 V130" duration={3.6} />
        <FlowLine d="M200 82 V130" duration={3.6} delay={1.2} />
        <FlowLine d="M200 82 V94 Q200 106 212 106 H321 Q333 106 333 118 V130" duration={3.6} delay={2.4} />
        <FlowLine d="M67 166 V178 Q67 190 79 190 H188 Q200 190 200 202 V236" duration={4.4} delay={0.6} />
        <FlowLine d="M333 166 V178 Q333 190 321 190 H212 Q200 190 200 202 V236" duration={4.4} delay={2.6} />
        <path d="M200 166 V236" fill="none" stroke={LINE} strokeWidth="1.25" />
      </svg>
      <span className="absolute left-1/2 top-[22px] flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-[16px] bg-[#6D54F1] text-white shadow-[0_14px_26px_-10px_rgba(109,84,241,0.75)]">
        <Users className="h-7 w-7" strokeWidth={1.6} />
      </span>
      {TREE_CHIPS.map(({ icon: ChipIcon, label, x }) => (
        <span
          key={label}
          className="absolute top-[130px] flex h-9 w-[118px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-full border border-[#E7E6EE] bg-white text-xs font-medium text-[#19191C] shadow-[0_8px_18px_-12px_rgba(25,25,28,0.4)]"
          style={{ left: x }}
        >
          <ChipIcon className="h-3.5 w-3.5 text-[#6E6D78]" />
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

/** Small, repeatable security practices, all feeding one protected product. */
function HubVisual() {
  return (
    <div className="absolute left-1/2 top-0 h-[236px] w-[400px] origin-top -translate-x-1/2 scale-[0.78]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#DCDBE5 1px, transparent 1px)",
          backgroundSize: "13px 13px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />
      {[300, 212, 124].map((size) => (
        <span key={size} className="absolute left-1/2 top-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#EDEDF2] bg-white/70" style={{ width: size, height: size }} />
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
          className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#EDEDF2] bg-white text-[#19191C] shadow-[0_10px_22px_-12px_rgba(25,25,28,0.45)]"
          style={{ left: x, top: y }}
        >
          <NodeIcon className="h-5 w-5" strokeWidth={1.6} />
        </span>
      ))}
      <span className="absolute left-1/2 top-[150px] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-[#6D54F1] px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_0_0_7px_rgba(109,84,241,0.1),0_12px_24px_-10px_rgba(109,84,241,0.8)]">
        <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
        Protected
      </span>
    </div>
  );
}

function GlobeCard({ article }: { article: InsightItem }) {
  return (
    <article className={`group ${FRAME} ${BRICKS_UP} md:col-span-2 xl:col-span-4 xl:row-span-2`}>
      <Link href={`/insights/${article.slug}`} className={`relative flex h-full min-h-[460px] flex-col rounded-[20px] ${FOCUS}`}>
        <div className="relative z-10 pt-5">
          <CardWords article={article} />
        </div>
        <InsightsGlobe className="absolute left-1/2 top-[132px] w-[min(135%,600px)] max-w-none -translate-x-1/2" />
      </Link>
    </article>
  );
}

function FounderCard() {
  return (
    <article className={`${FRAME} ${BRICKS_UP} flex flex-col justify-between gap-4 p-3 pb-4 md:col-span-2 xl:col-span-4`}>
      <div className="flex items-center gap-4">
        <div className="relative aspect-square w-[108px] shrink-0 overflow-hidden rounded-[16px] bg-[#F4F4F8]">
          <Image src="/om-bawal-photo.jpg" alt="Om Bawal, Founder and Chief Architect at 21Spheres" fill sizes="108px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-[17px] font-medium tracking-[-0.01em] text-[#19191C]">Om Bawal</p>
          <p className="mt-0.5 text-[13px] leading-snug text-[#6E6D78]">Founder &amp; Chief Architect, 21Spheres</p>
        </div>
      </div>
      <blockquote className="px-2 text-[18px] font-light leading-[1.4] tracking-[-0.015em] text-[#19191C]">“Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”</blockquote>
    </article>
  );
}

function AllInsightsCard({ count }: { count: number }) {
  return (
    <div className={`${FRAME} ${BRICKS_DOWN} flex flex-col justify-center gap-4 p-5 sm:p-6 md:col-span-2 xl:col-span-6`}>
      <div>
        <h3 className="text-[28px] font-light leading-[1.1] tracking-[-0.03em] text-[#19191C]">Read all {count} insights</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#6E6D78]">Browse every article on AI, product and engineering, and filter by topic or industry.</p>
      </div>
      <PillLink href="/insights" className="self-start">See all insights</PillLink>
    </div>
  );
}

export function InsightsBentoSection() {
  const items = INSIGHTS_CONTENT.items;
  const article = (slug: string) => items.find((item) => item.slug === slug) ?? items[0];

  return (
    <section id="insights" aria-label="Insights and field notes" className="relative w-full scroll-mt-14 bg-white pb-12 pt-6 text-[#19191C] sm:scroll-mt-16 sm:pb-16">
      <style href="insights-bento-flow" precedence="default">{FLOW_CSS}</style>
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-3 border-b border-[#E7E5EB] pb-5 sm:flex-row sm:items-end">
          <div className="shrink-0">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-[11px]">Our Insights</p>
            <h2 className="text-3xl font-light leading-none tracking-[-0.045em] text-[#232129] sm:text-4xl md:text-5xl lg:text-[52px]">Insights</h2>
          </div>
          <p className="max-w-lg text-sm font-light leading-relaxed text-[#6E6D78] sm:text-right">Ideas and field notes on building thoughtful, dependable digital products.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
          <FounderCard />
          <GlobeCard article={article("architecting-multi-carrier-gateways")} />
          <ArticleCard article={article("zero-hallucination-multi-agent-graphs")} className="xl:col-span-4" stage={<IsometricVisual />} />
          <ArticleCard article={article("120-fps-react-19-financial-dashboards")} className="xl:col-span-4" stage={<ChartVisual />} />
          <ArticleCard article={article("human-centered-enterprise-ai")} className="xl:col-span-4" stage={<TreeVisual />} />
          <ArticleCard article={article("secure-by-design-product-teams")} className="xl:col-span-6" stage={<HubVisual />} wide />
          <AllInsightsCard count={items.length} />
        </div>
      </div>
    </section>
  );
}

export default InsightsBentoSection;
