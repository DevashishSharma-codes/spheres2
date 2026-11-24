"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Home, Play, Send, Sparkles } from "lucide-react";
import { INDUSTRIES_CONTENT } from "@/content/industries";
import { useHashLink } from "@/lib/useHashLink";
import type { IndustryItem } from "@/types";

// A muted purple: clearly lighter than the section behind it, with no glow.
const PANEL_BACKGROUND = "linear-gradient(172deg, #55407e 0%, #463369 42%, #2a1e42 74%, #120c1e 100%)";
const NECK_COLOUR = "#533e7b";

type ModelLayout = "list" | "cover" | "pages";

/** Each industry's colours and document style inside its mock-up. */
const MODEL_STYLES: Record<string, { layout: ModelLayout; strong: string; mid: string; soft: string; tint: string }> = {
  healthcare: { layout: "cover", strong: "#d0604f", mid: "#f2a488", soft: "#fdeee8", tint: "#fbe6dd" },
  "fintech-insurance": { layout: "list", strong: "#2b6cb0", mid: "#8bbbe8", soft: "#e6f0fb", tint: "#dbe7fb" },
  "forex-trading": { layout: "pages", strong: "#2e6b4f", mid: "#8fc7a4", soft: "#e4f2e8", tint: "#e0ecdf" },
  "emotional-wellbeing": { layout: "cover", strong: "#b5476f", mid: "#eea3bd", soft: "#fcecf2", tint: "#f9e1ea" },
  manufacturing: { layout: "pages", strong: "#3d5a80", mid: "#f0b35e", soft: "#e8eef6", tint: "#e2e9f2" },
  "customer-support": { layout: "list", strong: "#5a43c0", mid: "#a78bfa", soft: "#efeaff", tint: "#e6e0fb" },
  "business-operations": { layout: "cover", strong: "#2f7f6f", mid: "#7cc4b2", soft: "#e3f4ef", tint: "#dbefe9" },
};

const countLabel = (index: number, total: number, industry: IndustryItem) =>
  `0${index + 1} / 0${total} · ${industry.label}`;

/* ------------------------------------------------------------------ */
/* The small app mock-up under each industry's text                    */
/* ------------------------------------------------------------------ */

function ListDocument({ industry, strong, mid, soft }: { industry: IndustryItem; strong: string; mid: string; soft: string }) {
  return (
    <div className="h-full rounded-t-[10px] bg-white p-2.5 shadow-sm">
      <p className="text-[11px] font-semibold" style={{ color: strong }}>{industry.shortName} systems</p>
      <ul className="mt-2 space-y-1">
        {industry.capabilities.map((capability, index) => (
          <li key={capability} className="flex items-center gap-1.5 rounded-[4px] px-1.5 py-1 text-[8px]" style={{ backgroundColor: soft }}>
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: index % 2 ? mid : strong }} />
            <span className="min-w-0 flex-1 truncate text-black/70">{capability}</span>
            <span aria-hidden="true" className="h-1 w-8 shrink-0 overflow-hidden rounded-full bg-white">
              <span className="block h-full rounded-full" style={{ width: `${88 - index * 14}%`, backgroundColor: strong }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoverDocument({ industry, strong, mid }: { industry: IndustryItem; strong: string; mid: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded-t-[10px] p-3 text-white" style={{ background: `linear-gradient(150deg, ${strong}, ${mid})` }}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 -top-8 h-40 w-40 opacity-40">
        {[90, 68, 46, 24].map((radius) => <circle key={radius} cx="100" cy="100" r={radius} fill="none" stroke="#fff" strokeWidth="1" />)}
        <circle cx="100" cy="100" r="10" fill="#fff" />
      </svg>
      <span className="relative inline-block rounded border border-white/40 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.1em]">{industry.label}</span>
      <p className="relative mt-2 max-w-[75%] text-[17px] font-medium leading-[1.1] tracking-[-0.02em]">{industry.capabilities[0]}</p>
      <p className="relative mt-1 max-w-[70%] text-[8.5px] leading-snug text-white/85">{industry.subhead}</p>
    </div>
  );
}

function PagesDocument({ industry, strong, mid, soft }: { industry: IndustryItem; strong: string; mid: string; soft: string }) {
  return (
    <div className="grid h-full grid-cols-[1.1fr_1fr] gap-2 rounded-t-[10px] bg-white p-2.5 shadow-sm">
      <div className="min-w-0">
        <p className="flex flex-wrap gap-1 text-[7px]">
          <span className="rounded px-1 py-0.5 text-white" style={{ backgroundColor: strong }}>Live</span>
          <span className="rounded border px-1 py-0.5" style={{ borderColor: mid, color: strong }}>{industry.label}</span>
        </p>
        <p className="mt-1.5 text-[13px] font-semibold leading-[1.15] tracking-[-0.01em]" style={{ color: strong }}>{industry.capabilities[0]}</p>
      </div>
      <svg aria-hidden="true" viewBox="0 0 120 120" preserveAspectRatio="xMidYMax slice" className="h-full w-full rounded-t-[40px]" style={{ backgroundColor: soft }}>
        <polyline points="8,96 30,80 48,86 68,58 86,64 112,30" fill="none" stroke={strong} strokeWidth="3" strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((bar) => <rect key={bar} x={12 + bar * 21} y={120 - (18 + bar * 7)} width="12" height={18 + bar * 7} fill={mid} opacity=".75" />)}
      </svg>
    </div>
  );
}

/** A small app window with a designed document, standing in for a photo. */
function IndustryModel({ industry, className = "" }: { industry: IndustryItem; className?: string }) {
  const style = MODEL_STYLES[industry.id] ?? MODEL_STYLES.healthcare;

  return (
    <div
      aria-hidden="true"
      className={`relative flex w-full flex-col overflow-hidden rounded-t-[14px] border border-b-0 border-white/20 bg-white text-[#1b1a21] shadow-[0_-12px_30px_-14px_rgba(0,0,0,.6)] ${className}`}
    >
      {/* App bar */}
      <div className="flex h-7 shrink-0 items-center gap-1.5 bg-white px-2.5 text-[9px]">
        <Home className="h-3 w-3 shrink-0 text-black/60" />
        <span className="min-w-0 flex-1 truncate font-medium">{industry.shortName} overview</span>
        <span className="flex shrink-0 -space-x-1">
          <span className="h-3.5 w-3.5 rounded-full border border-white" style={{ backgroundColor: style.strong }} />
          <span className="h-3.5 w-3.5 rounded-full border border-white" style={{ backgroundColor: style.mid }} />
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white bg-[#EFEAFF] text-[6.5px] text-[#5a43c0]">+2</span>
        </span>
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-black/10"><Play className="h-2.5 w-2.5 text-black/50" /></span>
        <span className="flex h-[18px] shrink-0 items-center gap-1 rounded bg-[#5a43c0] px-1.5 text-[8px] text-white"><Send className="h-2.5 w-2.5" />Send</span>
      </div>

      {/* Tinted canvas holding the document */}
      <div className="min-h-0 flex-1 overflow-hidden px-3 pt-2.5" style={{ backgroundColor: style.tint }}>
        {style.layout === "list" && <ListDocument industry={industry} strong={style.strong} mid={style.mid} soft={style.soft} />}
        {style.layout === "cover" && <CoverDocument industry={industry} strong={style.strong} mid={style.mid} />}
        {style.layout === "pages" && <PagesDocument industry={industry} strong={style.strong} mid={style.mid} soft={style.soft} />}
      </div>

      {/* The request an AI agent is working on */}
      <div className="absolute bottom-2.5 right-2.5 w-[68%] rounded-[10px] border border-black/[.07] bg-white p-2 shadow-[0_12px_28px_-10px_rgba(40,30,90,.45)]">
        <p className="text-[8.5px] leading-snug">{industry.prompt}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full bg-[#EFEAFF] px-1.5 py-0.5 text-[7.5px] text-[#5a43c0]"><Sparkles className="h-2.5 w-2.5" />AI Agent</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5a43c0] text-white"><ArrowRight className="h-2.5 w-2.5" /></span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The words, shared by the desktop panels and the phone card           */
/* ------------------------------------------------------------------ */

function IndustryWords({ industry, compact = false }: { industry: IndustryItem; compact?: boolean }) {
  const [more, setMore] = useState(false);
  const hasMore = compact && industry.paragraphs.length > 1;
  return (
    <>
      <p className={`font-medium leading-snug tracking-[-0.01em] text-[#C9BBFF] ${compact ? "text-[14.5px]" : "text-[15px]"}`}>{industry.subhead}</p>
      <div className={`mt-2.5 space-y-2 text-white/80 ${compact ? "text-[13px] leading-[1.6]" : "border-l-2 border-[#D9CCFF]/30 pl-3 text-[13px] leading-relaxed"}`}>
        {industry.paragraphs.map((paragraph, i) => (
          <p key={paragraph} className={hasMore && i > 0 && !more ? "hidden md:block" : ""}>{paragraph}</p>
        ))}
      </div>
      {hasMore && !more && (
        <button type="button" onClick={() => setMore(true)} className="mt-1.5 text-[13px] font-medium text-[#C9BBFF] underline-offset-4 hover:underline md:hidden">
          Read more
        </button>
      )}
      {compact ? (
        <ul aria-label="What we build" className="mt-3 flex flex-wrap gap-1.5">
          {industry.capabilities.map((capability) => (
            <li key={capability} className="rounded-full border border-white/15 bg-white/[.08] px-2.5 py-1 text-[11px] leading-none text-white/90">
              {capability}
            </li>
          ))}
        </ul>
      ) : (
        /* Desktop: every industry's pills on one line. Their text scales with the panel's width (cqi),
           so the longest set still fits; a little extra height keeps them from feeling cramped. */
        <ul aria-label="What we build" className="@container mt-3 flex flex-nowrap gap-1.5">
          {industry.capabilities.map((capability) => (
            <li
              key={capability}
              className="shrink-0 whitespace-nowrap rounded-full border border-white/15 bg-white/[.08] px-2 py-1.5 leading-none text-white/90"
              style={{ fontSize: "clamp(9.5px, calc(2.45cqi - 2px), 11.5px)" }}
            >
              {capability}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: panels side by side, the open one widening                 */
/* ------------------------------------------------------------------ */

/** Flares out at both ends so it melts into the panels on either side. */
function PanelNeck() {
  return (
    <svg aria-hidden="true" viewBox="0 0 15 44" className="absolute -right-[13.5px] top-[62px] z-10 h-11 w-[15px] overflow-visible">
      <path d="M0 0 C5 13 10 13 15 0 L15 44 C10 31 5 31 0 44 Z" fill={NECK_COLOUR} />
    </svg>
  );
}

/** Half-circles along the bottom of a closed panel. */
function PanelShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[36%] -translate-x-5 gap-3">
      {[0, 1, 2].map((shape) => (
        <span key={shape} className="h-full w-[70%] shrink-0 rounded-r-full bg-[#D9CCFF]/[.1]" />
      ))}
    </div>
  );
}

/* The desktop panels are laid out once, at one design size (the proportions of a large monitor),
   and that whole design is scaled to the width it has. Every laptop and monitor then shows exactly
   the same composition, larger or smaller: the mock-up is never cut and never leaves a gap. */
const STAGE = { width: 1316, height: 648 };

function ScaledStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / STAGE.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative hidden w-full overflow-hidden lg:block" style={{ height: STAGE.height * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: STAGE.width, height: STAGE.height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function DesktopPanels({ industries, activeIdx, setActiveIdx }: { industries: IndustryItem[]; activeIdx: number; setActiveIdx: (index: number) => void }) {
  return (
    <ScaledStage>
    <div className="flex h-full gap-3">
      {industries.map((industry, index) => {
        const isActive = index === activeIdx;
        return (
          <div
            key={industry.id}
            onMouseEnter={() => setActiveIdx(index)}
            onClick={() => setActiveIdx(index)}
            className="relative min-w-0 basis-0 transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none"
            style={{ flexGrow: isActive ? 4.2 : 1 }}
          >
            {index < industries.length - 1 && <PanelNeck />}

            <div className="relative flex h-full flex-col overflow-hidden rounded-[34px] text-white" style={{ background: PANEL_BACKGROUND }}>
              <button
                type="button"
                aria-expanded={isActive}
                onFocus={() => setActiveIdx(index)}
                className={`relative z-10 shrink-0 rounded-[28px] pb-1 pt-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C9BBFF] ${isActive ? "px-6" : "px-2"}`}
              >
                {isActive && <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#C9BBFF]">{countLabel(index, industries.length, industry)}</span>}
                {isActive ? (
                  <h3 className="w-fit whitespace-nowrap bg-gradient-to-r from-white via-[#E4DCFF] to-[#B9A6FF] bg-clip-text pb-0.5 text-[30px] font-light leading-[1.1] tracking-[-0.03em] text-transparent">
                    {industry.name}
                  </h3>
                ) : (
                  <h3 className="mx-auto text-center text-[16px] font-light leading-[1.2] tracking-[-0.02em] text-white/90 [hyphens:auto]">
                    {industry.shortName}
                  </h3>
                )}
              </button>

              {isActive ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  className="flex min-h-0 flex-1 flex-col px-6"
                >
                  {/* The bottom padding is a gap the mock-up can never close, however short the panel */}
                  <div className="mt-1.5 shrink-0 pb-5">
                    <IndustryWords industry={industry} />
                  </div>
                  {/* Always 20px under the words (the padding above) and always down to the bottom edge, so the
                      gap never changes. Same width for every industry; it simply shows more of the window when
                      the words are shorter. Its minimum keeps it from being squeezed on short laptop screens. */}
                  <IndustryModel industry={industry} className="mx-auto min-h-[150px] w-full max-w-[400px] flex-1 basis-0" />
                </motion.div>
              ) : (
                <PanelShapes />
              )}
            </div>
          </div>
        );
      })}
    </div>
    </ScaledStage>
  );
}

/* ------------------------------------------------------------------ */
/* Phones and tablets: tabs above one card, swipe between them          */
/* ------------------------------------------------------------------ */

function MobileCard({ industries, activeIdx, setActiveIdx }: { industries: IndustryItem[]; activeIdx: number; setActiveIdx: (index: number) => void }) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const total = industries.length;
  const step = (by: number) => setActiveIdx((activeIdx + by + total) % total);

  // Keep the active tab in view, scrolling only the tab row (never the page).
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[activeIdx] as HTMLElement | undefined;
    if (!row || !tab) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [activeIdx]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) step(1);
    else if (info.offset.x > 60) step(-1);
  };

  return (
    <div className="lg:hidden">
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Industries"
        className="flex flex-wrap gap-2 pb-4"
      >
        {industries.map((industry, index) => {
          const isActive = index === activeIdx;
          return (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIdx(index)}
              className={`h-8 shrink-0 whitespace-nowrap rounded-full border px-3 text-[12.5px] transition-colors duration-200 ${
                isActive ? "border-white bg-white font-medium text-[#1d1533]" : "border-white/15 bg-white/[.06] text-white/75"
              }`}
            >
              {industry.shortName}
            </button>
          );
        })}
      </div>

      {/* Every card sits in the same grid cell, so the card keeps the height of the longest one
          and nothing below jumps when switching industry. */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
        style={{ touchAction: "pan-y" }}
        className="relative grid overflow-hidden rounded-[28px]"
      >
        <div aria-hidden="true" className="absolute inset-0" style={{ background: PANEL_BACKGROUND }} />
        {industries.map((industry, index) => {
          const isActive = index === activeIdx;
          if (!isActive) return null;
          return (
            <div
              key={industry.id}
              role="tabpanel"
              className="relative flex flex-col px-5 pt-5 sm:px-7 sm:pt-7 md:grid md:grid-cols-[1.35fr_1fr] md:gap-7"
            >
              <div className="min-w-0 pb-6 md:pb-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-[#C9BBFF]">{countLabel(index, total, industry)}</span>
                  <span className="flex shrink-0 gap-1.5">
                    <button type="button" onClick={() => step(-1)} aria-label="Previous industry" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 active:bg-white/10">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label="Next industry" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 active:bg-white/10">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </span>
                </div>
                <h3 className="mt-1.5 bg-gradient-to-r from-white via-[#E4DCFF] to-[#B9A6FF] bg-clip-text text-[25px] font-light leading-[1.1] tracking-[-0.03em] text-transparent sm:text-[28px]">
                  {industry.name}
                </h3>
                <div className="mt-2">
                  <IndustryWords industry={industry} compact />
                </div>
              </div>
              {/* The illustration is for tablets; phones keep to the words */}
              <IndustryModel industry={industry} className="mx-auto mt-auto hidden h-[160px] max-w-[340px] shrink-0 sm:block md:mt-0 md:h-[230px] md:self-end" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function IndustriesLandingSection() {
  const industries = INDUSTRIES_CONTENT.items;
  const [activeIdx, setActiveIdx] = useState(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIdx((index) => (index - 1 + industries.length) % industries.length);
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIdx((index) => (index + 1) % industries.length);
      }
    },
    [industries.length]
  );

  // /#healthcare (from the navbar, or an old detail-page link) opens that industry.
  useHashLink((hash) => {
    const found = industries.findIndex((industry) => `#${industry.id}` === hash);
    if (found !== -1) setActiveIdx(found);
  });

  return (
    <section
      id="industries"
      onKeyDown={handleKeyDown}
      className="relative z-10 flex w-full scroll-mt-14 flex-col border-y border-white/10 text-white sm:scroll-mt-16"
      style={{
        background: `
          radial-gradient(ellipse 90% 95% at 80% 8%, rgba(112, 72, 194, 0.3) 0%, rgba(72, 43, 123, 0.18) 42%, transparent 78%),
          radial-gradient(ellipse 70% 75% at 12% 100%, rgba(74, 43, 125, 0.2) 0%, transparent 72%),
          linear-gradient(118deg, #050408 0%, #0f0a1c 50%, #1a0e2e 100%)
        `,
      }}
    >
      {/* Link targets for each industry, so /#industry-id lands on this section */}
      {industries.map((industry) => (
        <span key={industry.id} id={industry.id} aria-hidden="true" className="absolute left-0 top-0 scroll-mt-14 sm:scroll-mt-16" />
      ))}

      <div className="mx-auto flex min-h-0 w-full max-w-[1380px] flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-8">
        <header className="flex shrink-0 flex-col gap-1.5 pb-4 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:py-4">
          <div className="shrink-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#C8B4FF] sm:text-[13px]">{INDUSTRIES_CONTENT.eyebrow}</p>
            <h2 className="whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[52px]">{INDUSTRIES_CONTENT.title}</h2>
          </div>
          <p className="max-w-md pb-0.5 text-[13px] leading-relaxed text-white/65 sm:text-right">{INDUSTRIES_CONTENT.lead}</p>
        </header>

        <DesktopPanels industries={industries} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
        <MobileCard industries={industries} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
      </div>
    </section>
  );
}

export default IndustriesLandingSection;
