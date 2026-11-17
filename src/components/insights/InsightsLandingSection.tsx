"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { InsightsBentoSection } from "@/components/insights/InsightsBentoSection";
import { PageBackButton } from "@/components/ui/PageBackButton";

const PAGE_SIZE = 6;

/* The hero fades into the page in two layers. The dark tint lifts away first, so the photo's own
   warm, light tones show through; then the photo itself dissolves into the page. Fading both
   together would pass through a muddy grey, which is what made the old fade look odd. */
const eased = (from: number, to: number) => {
  const stops = [1, 0.97, 0.88, 0.73, 0.54, 0.35, 0.18, 0.06, 0];
  return `linear-gradient(to bottom, ${stops
    .map((alpha, i) => `rgba(0,0,0,${alpha}) ${(from + ((to - from) * i) / (stops.length - 1)).toFixed(1)}%`)
    .join(", ")})`;
};
const PHOTO_FADE = { maskImage: eased(70, 100), WebkitMaskImage: eased(70, 100) };
const TINT_FADE = { maskImage: eased(58, 92), WebkitMaskImage: eased(58, 92) };

/** The video and its tint, each fading out at its own pace. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <video tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" style={PHOTO_FADE} src="/videoplayback.mp4" autoPlay muted loop playsInline preload="metadata" />
      <div className="absolute inset-0" style={TINT_FADE}>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
      </div>
    </div>
  );
}

function InsightFilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="relative min-w-0">
    <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 border-b border-black/15 py-2 text-left text-sm text-[#555] transition hover:border-black/50 hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-purple/50">
      <span>{value === "All types" || value === "All industries" || value === "All topics" ? label : value}</span>
      <span aria-hidden="true" className={`text-lg leading-none transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
    </button>
    {open && <div className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full min-w-52 overflow-y-auto border border-black/10 bg-white py-1 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
      {options.map((option) => <button key={option} type="button" onClick={() => { onChange(option); setOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f2f0f8] ${value === option ? "font-medium text-[#7057D9]" : "text-[#444]"}`}>{option}</button>)}
    </div>}
  </div>;
}

type InsightItemType = (typeof INSIGHTS_CONTENT.items)[number];
interface Filters { assetType: string; industry: string; topic: string }
const ALL: Filters = { assetType: "All types", industry: "All industries", topic: "All topics" };
const FILTER_GROUPS: { key: keyof Filters; label: string }[] = [
  { key: "assetType", label: "Asset type" },
  { key: "industry", label: "Industry" },
  { key: "topic", label: "Topic" },
];
const matches = (item: InsightItemType, f: Filters) =>
  (f.assetType === ALL.assetType || item.assetType === f.assetType) &&
  (f.industry === ALL.industry || item.industry === f.industry) &&
  (f.topic === ALL.topic || item.topic === f.topic);

/**
 * Phones: filters in a bottom sheet, the way shops do it. Choices are made in the sheet and only
 * applied with "Show results", which says how many insights the choice will show.
 */
function FilterSheet({ items, applied, onApply, onClose }: { items: InsightItemType[]; applied: Filters; onApply: (filters: Filters) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(applied);
  const resultCount = items.filter((item) => matches(item, draft)).length;

  // Esc closes, and the page behind stays still while the sheet is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end bg-black/50 sm:hidden" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter insights"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85svh] w-full flex-col rounded-t-[22px] bg-white text-[#171717] shadow-[0_-12px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <p className="text-[16px] font-medium">Filters</p>
          <button type="button" onClick={onClose} aria-label="Close filters" className="flex h-11 w-11 items-center justify-center rounded-full text-black/60 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-2">
          {FILTER_GROUPS.map(({ key, label }) => {
            const options = [ALL[key], ...new Set(items.map((item) => item[key] as string))];
            return (
              <fieldset key={key} role="radiogroup" className="border-b border-black/10 py-4 last:border-b-0">
                <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-black/55">{label}</legend>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => {
                    const on = draft[key] === option;
                    const count = option === ALL[key] ? items.length : items.filter((item) => item[key] === option).length;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setDraft({ ...draft, [key]: option })}
                        className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors ${
                          on ? "border-[#171717] bg-[#171717] text-white" : "border-black/15 text-[#333] hover:border-black/40"
                        }`}
                      >
                        {option}
                        <span className={on ? "text-white/60" : "text-black/35"}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border-t border-black/10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <button type="button" onClick={() => setDraft(ALL)} className="h-12 px-2 text-[14px] font-medium text-black/60 underline underline-offset-4">
            Clear all
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            disabled={resultCount === 0}
            className="h-12 flex-1 rounded-full bg-[#171717] text-[14px] font-medium text-white disabled:opacity-40"
          >
            {resultCount === 0 ? "No results" : `Show ${resultCount} ${resultCount === 1 ? "insight" : "insights"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export function InsightsLandingSection({ archive = false }: { archive?: boolean }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [assetType, setAssetType] = useState("All types");
  const [industry, setIndustry] = useState("All industries");
  const [topic, setTopic] = useState("All topics");
  const [page, setPage] = useState(1);
  const items = INSIGHTS_CONTENT.items;
  const visibleItems = useMemo(() => {
    const filtered = items.filter((item) =>
      (assetType === "All types" || item.assetType === assetType) &&
      (industry === "All industries" || item.industry === industry) &&
      (topic === "All topics" || item.topic === topic)
    );
    return archive ? filtered : filtered.slice(0, 3);
  }, [archive, assetType, industry, topic, items]);
  const pageCount = Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
  const pageItems = archive ? visibleItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : visibleItems;
  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  if (!archive) {
    return (
      <>
        <section aria-label="Insights introduction" className="relative flex items-center overflow-hidden bg-white text-white md:min-h-[70svh]">
          <HeroBackdrop />
          <div className="relative mx-auto w-full max-w-[1380px] px-5 py-12 sm:px-10 md:py-20 lg:px-16">
            <p className="mb-4 md:mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Insights / Points of view</p>
            <div className="mb-5 h-px w-full bg-white/30 md:mb-7" />
            <h2 className="max-w-5xl text-[32px] font-light leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">Ideas that move your business forward.</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-lg md:mt-6">Perspectives on AI, product strategy, and the engineering behind meaningful digital experiences.</p>
          </div>
        </section>
        <InsightsBentoSection />
      </>
    );
  }

  return (
    <section id="insights" aria-label="Insights" className="w-full bg-[#efefed] text-[#171717]">
      <div className="relative flex min-h-[56svh] items-center overflow-hidden bg-[#efefed] text-white md:min-h-[100svh]">
        <HeroBackdrop />
        <div className="absolute inset-x-0 top-4 z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-10 lg:px-16"><PageBackButton /></div>
        <div className="relative mx-auto w-full max-w-[1380px] px-4 pb-12 pt-20 sm:px-10 md:py-20 lg:px-16">
          <p className="mb-4 text-xs md:mb-6 font-semibold uppercase tracking-[0.24em] text-white/75">Insights / Points of view</p>
          <div className="mb-5 h-px w-full bg-white/30 md:mb-7" />
          <h1 className="max-w-5xl text-[32px] font-light leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">Ideas that move your business forward.</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-lg md:mt-6">Perspectives on AI, product strategy, and the engineering behind meaningful digital experiences.</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1380px] px-4 py-10 sm:px-10 sm:py-20 lg:px-16">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-black/15 pb-5 sm:mb-8 sm:flex-row sm:items-end sm:pb-6">
          <div id="all-insights">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-black/55">{archive ? "Ideas and perspectives" : "From our team"}</p>
            <h2 className="text-[28px] font-light tracking-[-0.04em] sm:text-5xl">21Spheres Insights</h2>
          </div>
          {!archive && <p className="max-w-md text-sm leading-relaxed text-black/55">Fresh perspectives on the ideas and technology shaping what comes next.</p>}
        </div>
        {archive && (() => {
          const applied: Filters = { assetType, industry, topic };
          const active = FILTER_GROUPS.filter(({ key }) => applied[key] !== ALL[key]);
          const set = (filters: Filters) => {
            setAssetType(filters.assetType);
            setIndustry(filters.industry);
            setTopic(filters.topic);
            setPage(1);
          };
          return (
            <>
              {/* Phones: a pinned filter bar, with the active filters as removable chips */}
              <div className="sticky top-14 z-20 -mx-4 mb-4 border-b border-black/10 bg-[#efefed]/95 px-4 py-2.5 backdrop-blur sm:hidden">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    aria-haspopup="dialog"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-black/20 bg-white px-4 text-[14px] font-medium"
                  >
                    <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                    Filters
                    {active.length > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#171717] px-1.5 text-[11px] text-white">{active.length}</span>}
                  </button>
                  <p className="text-[13px] text-black/55">{visibleItems.length} {visibleItems.length === 1 ? "insight" : "insights"}</p>
                </div>
                {active.length > 0 && (
                  <ul aria-label="Active filters" className="mt-2.5 flex flex-wrap items-center gap-2">
                    {active.map(({ key }) => (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => set({ ...applied, [key]: ALL[key] })}
                          aria-label={`Remove filter ${applied[key]}`}
                          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white pl-3 pr-2 text-[12.5px] text-[#333] ring-1 ring-black/10"
                        >
                          {applied[key]} <X aria-hidden="true" className="h-3.5 w-3.5 text-black/45" />
                        </button>
                      </li>
                    ))}
                    <li>
                      <button type="button" onClick={() => set(ALL)} className="h-8 px-1 text-[12.5px] text-black/55 underline underline-offset-4">Clear all</button>
                    </li>
                  </ul>
                )}
              </div>
              {sheetOpen && (
                <FilterSheet
                  items={items}
                  applied={applied}
                  onApply={(filters) => {
                    set(filters);
                    setSheetOpen(false);
                  }}
                  onClose={() => setSheetOpen(false)}
                />
              )}
            </>
          );
        })()}
        {archive && <div className="mb-9 hidden flex-col gap-4 border-b border-black/20 pb-5 sm:flex lg:flex-row lg:items-center lg:gap-0">
          <span className="shrink-0 border-r-2 border-black/15 pr-6 text-xs font-bold tracking-[0.16em] text-black">FILTERS</span>
          <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:ml-7 lg:grid-cols-4">
            <InsightFilterDropdown label="Asset type" value={assetType} options={["All types", ...new Set(items.map((item) => item.assetType))]} onChange={(value) => updateFilter(setAssetType, value)} />
            <InsightFilterDropdown label="Industry" value={industry} options={["All industries", ...new Set(items.map((item) => item.industry))]} onChange={(value) => updateFilter(setIndustry, value)} />
            <InsightFilterDropdown label="Topic" value={topic} options={["All topics", ...new Set(items.map((item) => item.topic))]} onChange={(value) => updateFilter(setTopic, value)} />
            <button type="button" onClick={() => { setAssetType("All types"); setIndustry("All industries"); setTopic("All topics"); setPage(1); }} className="justify-self-start py-2 text-xs font-semibold uppercase tracking-wider text-black/55 underline underline-offset-4 hover:text-black">Clear filters</button>
          </div>
        </div>}
        {/* Phones: compact rows, thumbnail beside the words */}
        {pageItems.length > 0 && (
          <ul aria-label="Insights" className="divide-y divide-black/10 border-y border-black/10 sm:hidden">
            {pageItems.map((article) => (
              <li key={article.slug}>
                <Link href={`/insights/${article.slug}`} className="grid grid-cols-[104px_minmax(0,1fr)] items-start gap-x-3.5 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple">
                  <span className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-[#dededb]">
                    <Image src={article.image} alt="" fill sizes="104px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10.5px] font-bold uppercase tracking-[0.14em] text-black/55">{article.industry} &middot; {article.date}</span>
                    <span className="mt-1 line-clamp-3 block text-[15px] font-normal leading-snug tracking-[-0.01em] text-[#171717]">{article.title}</span>
                    <span className="mt-1 block text-[12px] text-black/50">{(article.readTime ?? "").toLowerCase()}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {pageItems.length ? <div className="hidden gap-x-7 gap-y-12 sm:grid md:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((article) => <article key={article.slug} className="group h-full min-w-0">
            <Link href={`/insights/${article.slug}`} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple">
              <div className="relative mb-5 aspect-[1.56] overflow-hidden rounded-sm bg-[#dededb]"><Image src={article.image} alt="Professionals collaborating in a modern workplace" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.17em] text-black/65">{article.assetType} <span className="px-2">|</span> {article.industry}</p>
              <h3 className="line-clamp-2 min-h-[3.5rem] max-w-md text-2xl font-normal leading-snug tracking-[-0.025em] group-hover:underline group-hover:underline-offset-4">{article.title}</h3>
              <p className="mt-3 line-clamp-2 min-h-[3rem] text-sm leading-relaxed text-black/60">{article.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5 text-xs text-black/50"><span>{article.date}</span><span className="inline-flex items-center gap-2 font-semibold text-black">Read insight <span aria-hidden="true">↗</span></span></div>
            </Link>
          </article>)}
        </div> : <p className="py-16 text-center text-black/55">No insights match those filters. Try clearing your selection.</p>}
        {archive && pageCount > 1 && <nav aria-label="Insight pages" className="mt-8 flex sm:mt-14 items-center justify-center gap-2">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-full border border-black/20 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-35">Previous</button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" aria-current={page === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)} className={`h-10 w-10 rounded-full text-sm ${page === pageNumber ? "bg-black text-white" : "border border-black/20 hover:bg-black/5"}`}>{pageNumber}</button>)}
          <button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="rounded-full border border-black/20 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-35">Next</button>
        </nav>}
        {!archive && <div className="mt-12 flex justify-center"><Link href="/insights" className="inline-flex items-center gap-3 rounded-full border border-black/70 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white">Explore all insights <span aria-hidden="true">↗</span></Link></div>}
      </div>
    </section>
  );
}

export default InsightsLandingSection;
