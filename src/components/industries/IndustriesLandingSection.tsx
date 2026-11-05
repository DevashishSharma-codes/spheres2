"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Play, Send, Sparkles } from "lucide-react";
import { PageBackButton } from "@/components/ui/PageBackButton";
import { PillArrow } from "@/components/ui/PillLink";
import { INDUSTRIES_CONTENT } from "@/content/industries";
import type { IndustryItem } from "@/types";

// A muted purple: clearly lighter than the section behind it, with no glow.
const PANEL_BACKGROUND = "linear-gradient(172deg, #55407e 0%, #463369 42%, #2a1e42 74%, #120c1e 100%)";
const PANEL_BOTTOM = "#120c1e";
const NECK_COLOUR = "#533e7b";

type ModelLayout = "table" | "cover" | "pages";

/** Each industry's colours and document style inside its model. */
const MODEL_STYLES: Record<string, { layout: ModelLayout; strong: string; mid: string; soft: string; tint: string }> = {
  healthcare: { layout: "table", strong: "#2f7f6f", mid: "#7cc4b2", soft: "#e3f4ef", tint: "#dbe7fb" },
  saas: { layout: "cover", strong: "#5a43c0", mid: "#a78bfa", soft: "#efeaff", tint: "#e6e0fb" },
  fintech: { layout: "pages", strong: "#2e6b4f", mid: "#8fc7a4", soft: "#e4f2e8", tint: "#e0ecdf" },
  ecommerce: { layout: "cover", strong: "#c8553d", mid: "#f2a488", soft: "#fdeee8", tint: "#fbe6dd" },
  gcc: { layout: "table", strong: "#2b6cb0", mid: "#8bbbe8", soft: "#e6f0fb", tint: "#dbe7fb" },
  travel: { layout: "pages", strong: "#2f7ea3", mid: "#f0b35e", soft: "#e4f3f9", tint: "#dcedf6" },
  hospitality: { layout: "cover", strong: "#b5476f", mid: "#eea3bd", soft: "#fcecf2", tint: "#f9e1ea" },
};

function TableDocument({ industry, strong, soft }: { industry: IndustryItem; strong: string; soft: string }) {
  const notes = industry.architectureNotes ?? [];
  return (
    <div className="rounded-t-[12px] bg-white p-3 shadow-sm">
      <p className="text-[12px] font-semibold" style={{ color: strong }}>{industry.name} systems</p>
      <p className="mt-1 text-[9px] leading-snug text-black/60">{industry.subhead}</p>
      <div className="mt-2 grid grid-cols-[1fr_1.3fr] gap-[3px] text-[8px] leading-snug">
        <span className="rounded-t-[3px] px-1.5 py-1 font-medium text-white" style={{ backgroundColor: strong }}>Capability</span>
        <span className="rounded-t-[3px] px-1.5 py-1 font-medium text-white" style={{ backgroundColor: strong }}>How it&apos;s built</span>
        {industry.capabilities.slice(0, 3).map((capability, index) => (
          <div key={capability} className="contents">
            <span className="px-1.5 py-1" style={{ backgroundColor: soft }}>{capability}</span>
            <span className="border px-1.5 py-1 text-black/65" style={{ borderColor: soft }}>{notes[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoverDocument({ industry, strong, mid }: { industry: IndustryItem; strong: string; mid: string }) {
  return (
    <div className="relative h-full min-h-[230px] overflow-hidden rounded-t-[12px] p-3.5 text-white" style={{ background: `linear-gradient(150deg, ${strong}, ${mid})` }}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 -top-8 h-44 w-44 opacity-40">
        {[90, 68, 46, 24].map((radius) => <circle key={radius} cx="100" cy="100" r={radius} fill="none" stroke="#fff" strokeWidth="1" />)}
        <circle cx="100" cy="100" r="10" fill="#fff" />
      </svg>
      <span className="relative inline-block rounded border border-white/40 px-1.5 py-0.5 text-[7.5px] uppercase tracking-[0.1em]">{industry.category}</span>
      <p className="relative mt-3 max-w-[80%] text-[21px] font-medium leading-[1.1] tracking-[-0.02em]">{industry.name} platforms</p>
      <p className="relative mt-1.5 max-w-[78%] text-[9px] leading-snug text-white/85">{industry.subhead}</p>
    </div>
  );
}

function PagesDocument({ industry, strong, mid, soft }: { industry: IndustryItem; strong: string; mid: string; soft: string }) {
  return (
    <div className="grid h-full min-h-[230px] grid-cols-[1.05fr_1fr] gap-2 rounded-t-[12px] bg-white p-3 shadow-sm">
      <div className="min-w-0">
        <span aria-hidden="true" className="block h-5 w-4 rounded-t-[3px]" style={{ backgroundColor: strong }} />
        <p className="mt-2 flex flex-wrap gap-1 text-[7px]">
          <span className="rounded px-1 py-0.5 text-white" style={{ backgroundColor: strong }}>Service</span>
          <span className="rounded border px-1 py-0.5" style={{ borderColor: mid, color: strong }}>{industry.category}</span>
        </p>
        <p className="mt-2 text-[16px] font-semibold leading-[1.15] tracking-[-0.01em]" style={{ color: strong }}>{industry.name} systems</p>
      </div>
      <svg aria-hidden="true" viewBox="0 0 120 170" preserveAspectRatio="xMidYMin slice" className="h-full w-full rounded-t-[60px]" style={{ backgroundColor: soft }}>
        <rect x="14" y="62" width="44" height="108" fill={strong} />
        <rect x="58" y="34" width="50" height="136" fill={mid} />
        {[0, 1, 2].map((row) => <rect key={row} x="24" y={76 + row * 28} width="24" height="17" fill={soft} opacity=".85" />)}
        {[0, 1, 2, 3].map((row) => <rect key={row} x="70" y={48 + row * 28} width="26" height="17" fill={strong} opacity=".7" />)}
      </svg>
    </div>
  );
}

/** A small app window with a designed document, in place of a photo. */
function IndustryModel({ industry }: { industry: IndustryItem }) {
  const style = MODEL_STYLES[industry.id] ?? MODEL_STYLES.saas;
  const [first, second] = industry.capabilities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
      className="relative mx-auto flex min-h-[300px] w-full max-w-[400px] flex-1 flex-col overflow-hidden rounded-t-[14px] border border-b-0 border-white/20 bg-white text-[#1b1a21] shadow-[0_-12px_30px_-14px_rgba(0,0,0,.6)] lg:mt-auto lg:max-h-[62%] lg:min-h-0"
    >
      {/* App bar */}
      <div className="flex h-8 shrink-0 items-center gap-1.5 bg-white px-2.5 text-[9.5px]">
        <Home aria-hidden="true" className="h-3 w-3 shrink-0 text-black/60" />
        <span className="min-w-0 flex-1 truncate font-medium">{industry.name} overview</span>
        <span aria-hidden="true" className="flex shrink-0 -space-x-1">
          <span className="h-4 w-4 rounded-full border border-white" style={{ backgroundColor: style.strong }} />
          <span className="h-4 w-4 rounded-full border border-white" style={{ backgroundColor: style.mid }} />
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#EFEAFF] text-[7px] text-[#5a43c0]">+2</span>
        </span>
        <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-black/10"><Play className="h-2.5 w-2.5 text-black/50" /></span>
        <span aria-hidden="true" className="flex h-5 shrink-0 items-center gap-1 rounded bg-[#5a43c0] px-1.5 text-[8.5px] text-white"><Send className="h-2.5 w-2.5" />Send</span>
      </div>

      {/* Tinted canvas holding the document */}
      <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3" style={{ backgroundColor: style.tint }}>
        {style.layout === "table" && <TableDocument industry={industry} strong={style.strong} soft={style.soft} />}
        {style.layout === "cover" && <CoverDocument industry={industry} strong={style.strong} mid={style.mid} />}
        {style.layout === "pages" && <PagesDocument industry={industry} strong={style.strong} mid={style.mid} soft={style.soft} />}
      </div>

      {/* Floating panel */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.42, ease: "easeOut" }}
        className="absolute bottom-3 right-2.5 w-[72%] rounded-[12px] border border-black/[.07] bg-white p-2 shadow-[0_12px_28px_-10px_rgba(40,30,90,.45)]"
      >
        {style.layout === "pages" ? (
          <>
            <p className="text-[9.5px] font-medium">Capabilities</p>
            <ul className="mt-1 space-y-1">
              {[first, second].map((capability, index) => (
                <li key={capability} className="flex items-center gap-1.5 rounded border border-black/[.07] p-1 text-[8.5px]">
                  <span aria-hidden="true" className="h-5 w-6 shrink-0 rounded-[2px]" style={{ backgroundColor: index ? style.mid : style.strong }} />
                  <span className="min-w-0 truncate">{capability}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-[9.5px] leading-snug">Build a {industry.name} platform with {first} and {second}.</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-full bg-[#EFEAFF] px-1.5 py-0.5 text-[8.5px] text-[#5a43c0]"><Sparkles aria-hidden="true" className="h-2.5 w-2.5" />AI Agent</span>
              <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5a43c0] text-white"><ArrowRight className="h-3 w-3" /></span>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

const leadSentences = (text: string) => text.split(/(?<=\.)\s/).slice(0, 2).join(" ");

/** Flares out at both ends so it melts into the panels on either side. */
function PanelNeck({ id }: { id: string }) {
  return (
    <>
      {/* Side by side, on desktop */}
      <svg aria-hidden="true" viewBox="0 0 15 44" className="absolute -right-[13.5px] top-[62px] z-10 hidden h-11 w-[15px] overflow-visible lg:block">
        <path d="M0 0 C5 13 10 13 15 0 L15 44 C10 31 5 31 0 44 Z" fill={NECK_COLOUR} />
      </svg>
      {/* Stacked, on phones and tablets */}
      <svg aria-hidden="true" viewBox="0 0 44 15" className="absolute -bottom-[13.5px] left-10 z-10 h-[15px] w-11 overflow-visible lg:hidden">
        <defs>
          <linearGradient id={`neck-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={PANEL_BOTTOM} />
            <stop offset="100%" stopColor={NECK_COLOUR} />
          </linearGradient>
        </defs>
        <path d="M0 0 C13 5 13 10 0 15 L44 15 C31 10 31 5 44 0 Z" fill={`url(#neck-${id})`} />
      </svg>
    </>
  );
}

/** Half-circles along the bottom of a closed panel. */
function PanelShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[36%] -translate-x-5 gap-3 lg:flex">
      {[0, 1, 2].map((shape) => (
        <span key={shape} className="h-full w-[70%] shrink-0 rounded-r-full bg-[#D9CCFF]/[.1]" />
      ))}
    </div>
  );
}

export function IndustriesLandingSection({ withBackButton = false }: { withBackButton?: boolean }) {
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

  return (
    <section
      id="industries"
      onKeyDown={handleKeyDown}
      className="relative z-10 flex w-full scroll-mt-14 flex-col border-y border-white/10 text-white sm:scroll-mt-16 lg:h-[calc(100vh-4rem)] lg:overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 95% at 80% 8%, rgba(112, 72, 194, 0.3) 0%, rgba(72, 43, 123, 0.18) 42%, transparent 78%),
          radial-gradient(ellipse 70% 75% at 12% 100%, rgba(74, 43, 125, 0.2) 0%, transparent 72%),
          linear-gradient(118deg, #050408 0%, #0f0a1c 50%, #1a0e2e 100%)
        `,
      }}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1380px] flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-8">
        <header className="flex shrink-0 flex-col gap-2 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex shrink-0 items-center gap-4">
            {withBackButton && <PageBackButton />}
            <div>
              <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#C8B4FF] sm:text-[13px]">Our expertise</p>
              <h2 className="whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[52px]">Industries</h2>
            </div>
          </div>
          <p className="max-w-lg pb-0.5 text-xs leading-relaxed text-white/65 sm:text-right sm:text-[13px]">
            Purpose-built systems for the sectors moving the world forward.
          </p>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
          {industries.map((industry, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={industry.id}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                className="relative min-w-0 transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none lg:basis-0"
                style={{ flexGrow: isActive ? 3.8 : 1 }}
              >
                {/* Curved neck flowing from this panel into the next */}
                {index < industries.length - 1 && <PanelNeck id={industry.id} />}

                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-[28px] text-white lg:rounded-[34px]"
                  style={{ background: PANEL_BACKGROUND }}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onFocus={() => setActiveIdx(index)}
                    className="relative z-10 shrink-0 rounded-[28px] px-4 pb-1 pt-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C9BBFF] lg:px-3.5 lg:pt-6 xl:px-5"
                  >
                    {isActive && <span className="mb-1 block font-mono text-[10px] tracking-[0.18em] text-[#C9BBFF]">0{index + 1} / 0{industries.length}</span>}
                    <h3
                      className={`w-fit whitespace-nowrap bg-gradient-to-r from-white via-[#E4DCFF] to-[#B9A6FF] bg-clip-text pb-0.5 font-light tracking-[-0.03em] text-transparent ${isActive ? "text-[30px] leading-[1.1]" : "text-[16px] lg:mx-auto xl:text-[19px]"}`}
                    >
                      {industry.name}
                    </h3>
                  </button>

                  {isActive ? (
                    <div className="flex min-h-0 flex-1 flex-col px-4 lg:px-3.5 xl:px-5">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="shrink-0"
                      >
                        <p className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#C9BBFF]">{industry.subhead}</p>
                        <p className="mt-2 border-l-2 border-[#D9CCFF]/40 pl-2.5 text-[13px] leading-relaxed text-white/80">{leadSentences(industry.description)}</p>
                        <div className="mt-3 pb-4">
                          <Link
                            href={`/industries/${industry.id}`}
                            className="group inline-flex h-10 items-center gap-4 rounded-full bg-gradient-to-r from-[#2a1c4d] to-[#7057D9] pl-4 pr-1 text-[13px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9BBFF]"
                          >
                            Know more
                            <PillArrow size="sm" />
                          </Link>
                        </div>
                      </motion.div>
                      <IndustryModel industry={industry} />
                    </div>
                  ) : (
                    <PanelShapes />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesLandingSection;
