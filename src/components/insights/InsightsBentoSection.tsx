import type { CSSProperties, ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, ChartLine, Globe, ListChecks, SendHorizontal, ShieldCheck, UserCheck } from "lucide-react";
import { PillLink } from "@/components/ui/PillLink";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { MARK_DOTS, MARK_SIZE } from "@/components/layout/logoShapes";
import { InsightsGlobe } from "./InsightsGlobe";

type InsightItem = (typeof INSIGHTS_CONTENT.items)[number];
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

// The tile shell: soft purple border and shadow, lifting a little on hover.
const FRAME = "relative min-w-0 overflow-hidden rounded-[22px] border border-[#7057D9]/15 bg-white shadow-[0_2px_6px_rgba(90,67,192,.08),0_18px_38px_-10px_rgba(90,67,192,.32)] transition-shadow duration-300 hover:shadow-[0_3px_8px_rgba(90,67,192,.1),0_26px_50px_-10px_rgba(90,67,192,.45)] motion-reduce:transition-none";
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6049C9]";
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

function CardWords({ article, tile = false }: { article: InsightItem; tile?: boolean }) {
  return (
    <div className={tile ? "px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-1" : "px-5 pb-5 pt-1 sm:px-6 sm:pb-6"}>
      <h3 className={`flex items-start justify-between gap-3 font-medium tracking-[-0.02em] text-[#19191C] ${tile ? "text-[14px] leading-[1.3] md:text-[18px] md:leading-[1.25]" : "text-[17px] leading-[1.25] md:text-[18px]"}`}>
        <span className={tile ? "line-clamp-3 md:line-clamp-none" : ""}>{article.title}</span>
        <ArrowUpRight aria-hidden="true" className={`mt-0.5 shrink-0 text-[#6E6D78] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#19191C] motion-reduce:transition-none ${tile ? "h-4 w-4 md:h-5 md:w-5" : "h-5 w-5"}`} />
      </h3>
      <p className={`mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#6E6D78] md:text-sm ${tile ? "max-md:hidden" : ""}`}>{article.excerpt}</p>
    </div>
  );
}

function ArticleCard({ article, className = "", stage, wide = false, icon: TileIcon }: { article: InsightItem; className?: string; stage: ReactNode; wide?: boolean; icon?: Icon }) {
  const tile = !wide && !!TileIcon;
  return (
    <article className={`group ${FRAME} ${className}`}>
      <Link href={`/insights/${article.slug}`} className={`flex h-full flex-col justify-between rounded-[22px] ${wide ? "xl:flex-row xl:items-center xl:justify-start" : ""} ${FOCUS}`}>
        <div aria-hidden="true" className={`${STAGE} ${tile ? "max-md:hidden" : "max-md:h-[168px]"} ${wide ? "w-full shrink-0 xl:h-full xl:min-h-[184px] xl:w-[54%]" : ""}`}>{stage}</div>
        {/* Phone tile: a small badge on the same soft stage colour, so the bento keeps its rhythm */}
        {tile && TileIcon && (
          <div aria-hidden="true" className="flex items-start justify-between bg-gradient-to-b from-[#F7F7FA] to-white px-4 pb-1 pt-4 md:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#6D54F1] text-white shadow-[3px_3px_0_#4E38C4,8px_8px_16px_rgba(109,84,241,0.25)]">
              <TileIcon className="h-5 w-5" strokeWidth={1.75} />
            </span>
          </div>
        )}
        <CardWords article={article} tile={tile} />
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

/** The globe rises out of the bottom of its stage, so only its upper half shows. */
function GlobeVisual() {
  return <InsightsGlobe className="absolute left-1/2 top-4 w-[340px] max-w-none -translate-x-1/2" />;
}

/** The portrait is shown whole: the frame matches the photo's square shape, and nothing sits on top of it. */
function FounderCard() {
  return (
    <article className={`${FRAME} col-span-2 flex flex-row items-start gap-3 p-3 md:col-span-2 md:items-stretch md:p-2 xl:col-span-4 xl:row-span-2 xl:flex-col xl:gap-1`}>
      <div className="relative aspect-square w-[84px] shrink-0 overflow-hidden rounded-[12px] bg-[#F4F4F8] md:w-[42%] md:rounded-[15px] xl:w-full">
        <Image src="/om-bawal-photo.jpg" alt="Om Bawal, Founder and Chief Architect at 21Spheres" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 31vw" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-0 pb-0 pt-0 md:px-3 md:pb-2 md:pt-3">
        <p className={LABEL}>Founder&apos;s perspective</p>
        <blockquote className="mt-1.5 text-[14px] font-light leading-[1.45] tracking-[-0.01em] text-[#171717] md:mt-2.5 md:text-[24px] md:leading-[1.4] xl:text-[17px]">“Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”</blockquote>
        <div className="mt-auto pt-3 md:pt-4">
          <div className="border-t border-[#7057D9]/20 pt-2 md:pt-3">
            <p className="text-[15px] font-medium text-[#171717]">Om Bawal</p>
            <p className="mt-0.5 text-[13px] text-black/60">Founder &amp; Chief Architect, 21Spheres</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function InsightsBentoSection() {
  const items = INSIGHTS_CONTENT.items;
  const article = (slug: string) => items.find((item) => item.slug === slug) ?? items[0];

  return (
    <section id="insights" aria-label="Insights and field notes" className="relative w-full scroll-mt-14 pb-10 pt-6 text-black sm:scroll-mt-16 sm:pb-16"
      style={{ background: "radial-gradient(ellipse 55% 45% at 88% 62%, rgba(112,87,217,.05) 0%, transparent 100%), linear-gradient(180deg, #ffffff 0%, #fdfcff 50%, #f9f7ff 100%)" }}
    >
      <style href="insights-bento-flow" precedence="default">{FLOW_CSS}</style>
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-3 border-b border-[#7057D9]/20 pb-4 sm:flex-row sm:items-baseline lg:mb-8">
          <div className="shrink-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#7C3AED] sm:text-[13px]">Our Insights</p>
            <h2 className="text-3xl font-light leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[52px]">Insights</h2>
          </div>
          <p className="max-w-lg text-xs leading-relaxed text-[#383842] sm:text-right sm:text-sm">Ideas and field notes on building thoughtful, dependable digital products.</p>
        </header>

        {/* Phones: a two-column bento. The founder and the featured essay run full width, the other two sit side by side. */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-12 xl:gap-4">
          <FounderCard />
          <ArticleCard article={article("zero-hallucination-multi-agent-graphs")} className="col-span-2 xl:col-span-8" stage={<IsometricVisual />} wide />
          <ArticleCard article={article("architecting-multi-carrier-gateways")} className="xl:col-span-4" stage={<GlobeVisual />} icon={Globe} />
          <ArticleCard article={article("120-fps-react-19-financial-dashboards")} className="xl:col-span-4" stage={<ChartVisual />} icon={ChartLine} />
        </div>

        <div className="mt-6 flex justify-center md:mt-8">
          <PillLink href="/insights">See all insights</PillLink>
        </div>
      </div>
    </section>
  );
}

export default InsightsBentoSection;
