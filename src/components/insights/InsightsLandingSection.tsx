"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
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

/** "AI STRATEGY" → "AI Strategy": the categories read as names in the filter. */
const categoryLabel = (category: string) =>
  category
    .split(" ")
    .map((word) => (["AI", "RAG", "LLM"].includes(word) ? word : word.charAt(0) + word.slice(1).toLowerCase()))
    .join(" ");

export function InsightsLandingSection({ archive = false }: { archive?: boolean }) {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const items = INSIGHTS_CONTENT.items;
  // All first, then each category in the order the insights first use it.
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);
  const visibleItems = useMemo(() => {
    const filtered = category === "all" ? items : items.filter((item) => item.category === category);
    return archive ? filtered : filtered.slice(0, 3);
  }, [archive, category, items]);
  const pageCount = Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
  const pageItems = archive ? visibleItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : visibleItems;
  function choose(next: string) {
    setCategory(next);
    setPage(1);
  }
  const tabs = [{ id: "all", label: "All" }, ...categories.map((id) => ({ id, label: categoryLabel(id) }))];

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
            <h2 className="text-[28px] font-light tracking-[-0.04em] sm:text-5xl">21 Spheres Insights</h2>
          </div>
          {!archive && <p className="max-w-md text-sm leading-relaxed text-black/55">Fresh perspectives on the ideas and technology shaping what comes next.</p>}
        </div>
        {archive && (
          <>
            {/* Filter, as on Case Studies: phones get one dropdown, so nothing is hidden off-screen */}
            <label className="mb-4 flex items-center gap-3 sm:hidden">
              <span className="shrink-0 text-[12px] text-black/55">Show</span>
              <span className="relative flex-1">
                <select
                  value={category}
                  onChange={(event) => choose(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-black/15 bg-white pl-3 pr-9 text-[14px] text-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7057D9]"
                >
                  {tabs.map((tab, index) => <option key={tab.id} value={tab.id}>{index > 0 ? `${String(index).padStart(2, "0")}  ${tab.label}` : tab.label}</option>)}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/55" />
              </span>
              <span className="shrink-0 text-[12px] tabular-nums text-black/55">{visibleItems.length}</span>
            </label>

            {/* Larger screens: All first, then every category, numbered */}
            <div className="mb-9 hidden items-end justify-between gap-6 border-b border-black/15 sm:flex">
              <nav aria-label="Filter insights" className="flex flex-wrap gap-x-8">
                {tabs.map((tab, index) => {
                  const on = category === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => choose(tab.id)}
                      aria-pressed={on}
                      className={`relative shrink-0 py-2.5 text-[13px] font-medium transition-colors ${on ? "text-[#6049C9]" : "text-black/55 hover:text-black"}`}
                    >
                      {index > 0 && <span className="mr-1.5 tabular-nums text-black/35">{String(index).padStart(2, "0")}</span>}
                      {tab.label}
                      {on && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#7057D9]" />}
                    </button>
                  );
                })}
              </nav>
              <p className="shrink-0 pb-2.5 text-sm text-black/55">
                {visibleItems.length} {visibleItems.length === 1 ? "insight" : "insights"}
              </p>
            </div>
          </>
        )}
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
        </div> : <p className="py-16 text-center text-black/55">No insights in this category yet.</p>}
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
