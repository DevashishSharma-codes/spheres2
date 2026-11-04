"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { InsightsBentoSection } from "@/components/insights/InsightsBentoSection";
import { PageBackButton } from "@/components/ui/PageBackButton";

const PAGE_SIZE = 6;

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

export function InsightsLandingSection({ archive = false }: { archive?: boolean }) {
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
        <section aria-label="Insights introduction" className="relative flex min-h-[70svh] items-center overflow-hidden bg-black text-white">
          <iframe aria-hidden="true" title="" tabIndex={-1} className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 opacity-65" src="https://www.youtube-nocookie.com/embed/uWQ_8CtvzoY?autoplay=1&mute=1&controls=0&loop=1&playlist=uWQ_8CtvzoY&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white sm:h-40" />
          <div className="relative mx-auto w-full max-w-[1380px] px-6 py-20 sm:px-10 lg:px-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Insights / Points of view</p>
            <div className="mb-7 h-px w-full bg-white/30" />
            <h1 className="max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">Ideas that move your business forward.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">Perspectives on AI, product strategy, and the engineering behind meaningful digital experiences.</p>
          </div>
        </section>
        <InsightsBentoSection />
      </>
    );
  }

  return (
    <section id="insights" aria-label="Insights" className="w-full bg-[#efefed] text-[#171717]">
      <div className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
        <iframe aria-hidden="true" title="" tabIndex={-1} className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 opacity-65" src="https://www.youtube-nocookie.com/embed/uWQ_8CtvzoY?autoplay=1&mute=1&controls=0&loop=1&playlist=uWQ_8CtvzoY&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#efefed] sm:h-40" />
        <div className="absolute inset-x-0 top-4 z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-16"><PageBackButton /></div>
        <div className="relative mx-auto w-full max-w-[1380px] px-6 py-20 sm:px-10 lg:px-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Insights / Points of view</p>
          <div className="mb-7 h-px w-full bg-white/30" />
          <h1 className="max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">Ideas that move your business forward.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">Perspectives on AI, product strategy, and the engineering behind meaningful digital experiences.</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1380px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-black/15 pb-6 sm:flex-row sm:items-end">
          <div id="all-insights">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-black/55">{archive ? "Ideas and perspectives" : "From our team"}</p>
            <h2 className="text-3xl font-light tracking-[-0.04em] sm:text-5xl">21Spheres Insights</h2>
          </div>
          {!archive && <p className="max-w-md text-sm leading-relaxed text-black/55">Fresh perspectives on the ideas and technology shaping what comes next.</p>}
        </div>
        {archive && <div className="mb-9 flex flex-col gap-4 border-b border-black/20 pb-5 lg:flex-row lg:items-center lg:gap-0">
          <span className="shrink-0 border-r-2 border-black/15 pr-6 text-xs font-bold tracking-[0.16em] text-black">FILTERS</span>
          <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:ml-7 lg:grid-cols-4">
            <InsightFilterDropdown label="Asset type" value={assetType} options={["All types", ...new Set(items.map((item) => item.assetType))]} onChange={(value) => updateFilter(setAssetType, value)} />
            <InsightFilterDropdown label="Industry" value={industry} options={["All industries", ...new Set(items.map((item) => item.industry))]} onChange={(value) => updateFilter(setIndustry, value)} />
            <InsightFilterDropdown label="Topic" value={topic} options={["All topics", ...new Set(items.map((item) => item.topic))]} onChange={(value) => updateFilter(setTopic, value)} />
            <button type="button" onClick={() => { setAssetType("All types"); setIndustry("All industries"); setTopic("All topics"); setPage(1); }} className="justify-self-start py-2 text-xs font-semibold uppercase tracking-wider text-black/55 underline underline-offset-4 hover:text-black">Clear filters</button>
          </div>
        </div>}
        {pageItems.length ? <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
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
        {archive && pageCount > 1 && <nav aria-label="Insight pages" className="mt-14 flex items-center justify-center gap-2">
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
