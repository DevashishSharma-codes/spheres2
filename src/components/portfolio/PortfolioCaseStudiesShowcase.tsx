"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  DISCIPLINE_TABS,
  PORTFOLIO_CASE_STUDIES,
  type DetailedCaseStudy,
} from "@/content/portfolioCaseStudies";

/* Shared glass surface: dark, translucent, soft top highlight */
const glass =
  "border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.85)]";

/* ------------------------------------------------------------------ */
/* Laptop mockup: silver frame so it reads clearly on the dark page    */
/* ------------------------------------------------------------------ */
function Laptop({ project }: { project: DetailedCaseStudy }) {
  const highlight = project.whatChanged.metrics[1];

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <div className="rounded-[18px] bg-gradient-to-b from-[#303136] via-[#09090B] to-[#515158] p-[7px] shadow-[0_40px_70px_-20px_rgba(0,0,0,.9)] ring-1 ring-white/25">
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[12px] bg-[#0d0b18] ring-1 ring-white/10">
          {/* Mac window title bar */}
          <div className="relative flex h-7 shrink-0 items-center border-b border-black/40 bg-[#2c2c30] px-3 sm:h-8">
            <span aria-hidden className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="absolute inset-x-16 truncate text-center text-[11px] font-medium text-white/70 sm:text-xs">{project.client}</span>
          </div>

          {/* Window content: the project photo with its caption */}
          <div className="relative min-h-0 flex-1">
            <Image
              src={project.cardImage}
              alt={`${project.title} project photo`}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              style={{ objectPosition: project.cardImagePosition }}
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-2.5 left-3 max-w-[58%] sm:bottom-4 sm:left-4">
              {highlight && (
                <div className="mb-2.5 hidden w-fit items-center gap-2.5 rounded-xl border border-white/25 bg-black/35 py-1.5 pl-2.5 pr-3 shadow-[0_8px_20px_-8px_rgba(0,0,0,.7)] backdrop-blur-xl sm:flex">
                  <svg aria-hidden viewBox="0 0 40 20" className="h-5 w-10 shrink-0 text-[#C9BBFF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 16 9 11l6 3 8-9 6 4 10-8" />
                  </svg>
                  <span className="text-left">
                    <span className="block text-xs font-semibold leading-tight text-white">{highlight.value}</span>
                    <span className="block text-[10px] leading-tight text-white/75">{highlight.label}</span>
                  </span>
                </div>
              )}
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#C9BBFF] sm:text-[10px]">{project.discipline}</p>
              <p className="mt-1 text-[13px] font-medium leading-[1.15] tracking-[-0.01em] text-white sm:text-lg">{project.title}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto -mt-px h-[14px] w-[108%] -translate-x-[4%] rounded-b-[18px] rounded-t-[3px] bg-gradient-to-b from-[#55565C] via-[#1C1D20] to-[#080809] shadow-[0_22px_34px_-12px_rgba(0,0,0,.9)]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[18%] -translate-x-1/2 rounded-b-xl bg-[#17181B]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One case study: laptop on the left, details on the right            */
/* ------------------------------------------------------------------ */
function MoreProjectCard({ project, onOpen }: { project: DetailedCaseStudy; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mx-auto flex w-full max-w-[420px] flex-col rounded-[30px] border border-white/25 bg-gradient-to-b from-white/[0.2] via-white/[0.1] to-white/[0.05] p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_0_24px_rgba(255,255,255,0.05),0_24px_50px_-20px_rgba(0,0,0,.75)] backdrop-blur-[36px] transition-colors duration-300 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]"
    >
      <span className="relative block aspect-[1/1.05] w-full overflow-hidden rounded-[21px] bg-white/5">
        <Image
          src={project.cardImage}
          alt=""
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 22vw"
          style={{ objectPosition: project.cardImagePosition }}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span className="flex flex-1 flex-col items-center px-3 pb-3 pt-6">
        <span className="text-[19px] font-normal leading-[1.2] tracking-[-0.01em] text-white">{project.title}</span>
        <span className="mt-2.5 text-[13px] leading-[1.5] text-white/85">{project.headline}</span>
        <span className="mt-auto pt-6">
          <span className="inline-flex h-12 items-center gap-6 rounded-full bg-gradient-to-r from-[#1b1b1e] to-[#5a5a60] pl-5 pr-1.5 text-[13px] text-white">
            Know more
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none" />
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

function CaseStudyCard({ project }: { project: DetailedCaseStudy }) {
  const lead = project.whatChanged.metrics[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`overflow-hidden rounded-[32px] ${glass}`}
    >
      <div className="grid lg:grid-cols-2">
        {/* LEFT: laptop on a soft purple glow panel */}
        <div className="relative flex items-center justify-center overflow-hidden p-5 sm:p-8">
          <div
            aria-hidden
            className="absolute inset-3 rounded-[24px]"
            style={{
              backgroundColor: "#15102b",
              backgroundImage:
                "radial-gradient(110% 90% at 15% 10%, rgba(244,172,214,0.35) 0%, transparent 55%), radial-gradient(100% 90% at 90% 90%, rgba(112,87,217,0.75) 0%, transparent 60%), radial-gradient(80% 70% at 60% 30%, rgba(167,139,250,0.35) 0%, transparent 60%)",
            }}
          />
          <div className="relative w-full py-10">
            <Laptop project={project} />

            {/* floating glass stat, like the reference's output card */}
            <div className="absolute -bottom-1 right-1 hidden w-[190px] rounded-2xl sm:block lg:hidden xl:block border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-[0_20px_40px_-18px_rgba(0,0,0,0.7)] sm:right-3">
              <p className="text-2xl font-medium tracking-tight text-white">{lead.value}</p>
              <p className="mt-0.5 text-xs text-white/70">{lead.label}</p>
              {lead.context && (
                <p className="mt-1 text-[11px] italic text-white/50">{lead.context}</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="flex flex-col justify-center gap-7 p-8 sm:p-12 lg:pl-6 lg:pr-12">
          <div className="space-y-4">
            <p className="text-sm text-white/55">
              {project.client} · {project.year}
            </p>
            <h3 className="text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-white/65">
              {project.headline}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-white">The brief</p>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/55">
                {project.brief.problemStatement}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-white">What changed</p>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/55">
                {project.whatChanged.empiricalOutcome}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-white">Technology</p>
            <div className="flex flex-wrap gap-2">
              {project.technology.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact"
              className="text-sm text-[#B9A6FF] underline decoration-[#B9A6FF]/30 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              Talk about a similar project
            </Link>
          </div>
        </div>
      </div>

      {/* metrics strip */}
      <dl className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.025] px-3 py-7 sm:px-8">
        {project.whatChanged.metrics.slice(0, 3).map((m) => (
          <div key={m.label} className="px-3 text-center sm:px-5">
            <dd className="text-2xl font-normal tracking-tight text-white sm:text-3xl">{m.value}</dd>
            <dt className="mt-1 text-xs leading-snug text-white/55 sm:text-sm">{m.label}</dt>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export function PortfolioCaseStudiesSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [featuredId, setFeaturedId] = useState(PORTFOLIO_CASE_STUDIES[0]?.id ?? "");

  const projects = useMemo(() => {
    if (activeTab === "all") return PORTFOLIO_CASE_STUDIES;
    const label = DISCIPLINE_TABS.find((t) => t.id === activeTab)?.label;
    return PORTFOLIO_CASE_STUDIES.filter((p) => p.discipline === label);
  }, [activeTab]);

  const featured = projects.find((project) => project.id === featuredId) ?? projects[0];
  const featuredRef = useRef<HTMLDivElement>(null);

  function openProject(id: string) {
    setFeaturedId(id);
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const stats: [string, string][] = [
    [String(PORTFOLIO_CASE_STUDIES.length), "Case studies published"],
    ["4", "Disciplines covered"],
    ["3–14", "Weeks, brief to launch"],
    ["100%", "Handed over with code & docs"],
  ];

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden border-t border-white/10 py-20 text-white sm:py-24"
      style={{
        backgroundColor: "#07060B",
        backgroundImage:
          "radial-gradient(60% 45% at 50% 0%, rgba(112,87,217,0.22) 0%, transparent 70%), radial-gradient(45% 40% at 95% 35%, rgba(167,139,250,0.10) 0%, transparent 70%), radial-gradient(50% 40% at 5% 80%, rgba(112,87,217,0.12) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-2xl">
          <h2 className="w-fit bg-gradient-to-r from-white via-[#E4DCFF] to-[#9D85F2] bg-clip-text pb-1 text-4xl font-light leading-[1.05] tracking-[-0.055em] text-transparent sm:text-5xl lg:text-6xl">
            Built to make a difference.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            A portfolio of websites, ecommerce stores, custom software platforms and mobile apps we have
            designed, built and launched. Filter by discipline, or ask us about the work we cannot publish.
          </p>
        </header>

        {/* stats */}
        <dl className={`mb-8 grid grid-cols-2 rounded-3xl md:grid-cols-4 md:divide-x md:divide-white/10 ${glass}`}>
          {stats.map(([value, label], i) => (
            <div
              key={label}
              className={`px-6 py-8 text-center ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}
            >
              <dd className={`text-4xl font-light tracking-tight ${i === 3 ? "text-[#B9A6FF]" : "text-white"}`}>
                {value}
              </dd>
              <dt className="mt-2 text-sm text-white/55">{label}</dt>
            </div>
          ))}
        </dl>

        {/* filter */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Filter portfolio projects"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl"
          >
            {DISCIPLINE_TABS.map((tab) => {
              const on = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={on}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8E79E8] ${
                    on
                      ? "bg-[#7057D9] text-white shadow-[0_8px_24px_-8px_rgba(112,87,217,0.8)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <p className="text-sm text-white/50">
            Showing {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <div ref={featuredRef} className="scroll-mt-24">
          {featured && <AnimatePresence mode="wait">
            <CaseStudyCard key={featured.id} project={featured} />
          </AnimatePresence>}
        </div>

        <div className="mt-9 sm:mt-12">
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">More projects</h3>
            <span className="text-sm text-white/50">{projects.length} projects</span>
          </div>
          <div className="relative isolate">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-[8%] top-[10%] h-[70%] w-[40%] rounded-full bg-white opacity-[0.1] blur-[80px]" />
              <div className="absolute right-[6%] top-[25%] h-[65%] w-[40%] rounded-full bg-[#7057D9] opacity-[0.28] blur-[90px]" />
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.filter((project) => project.id !== featured?.id).map((project) => (
              <MoreProjectCard key={project.id} project={project} onOpen={() => openProject(project.id)} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioCaseStudiesSection;
export { PortfolioCaseStudiesSection as PortfolioCaseStudiesShowcase };
