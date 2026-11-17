"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useHashLink } from "@/lib/useHashLink";
import { Bot, ChevronDown, Landmark, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { FolderTabCard } from "@/components/ui/FolderTabCard";
import { LaptopFrame } from "@/components/ui/LaptopFrame";
import { PillLink } from "@/components/ui/PillLink";
import { TechPill } from "@/components/portfolio/TechPill";
import { DuskBackdrop } from "@/components/services/ServiceModels";
import {
  DISCIPLINE_TABS,
  PORTFOLIO_CASE_STUDIES,
  type DetailedCaseStudy,
} from "@/content/portfolioCaseStudies";

/* Short labels fit the card's folder tab; filters and the laptop keep the full name */
const DISCIPLINE_CARD_META: Record<string, { icon: LucideIcon; label: string }> = {
  "Autonomous AI & Agents": { icon: Bot, label: "AI & Agents" },
  "Fintech & WealthTech": { icon: Landmark, label: "Fintech & WealthTech" },
  "InsurTech & Cloud Platforms": { icon: ShieldCheck, label: "InsurTech & Cloud" },
  "Mobile & High-Concurrency": { icon: Smartphone, label: "Mobile" },
};

/* ------------------------------------------------------------------ */
/* Laptop mockup: silver frame so it reads clearly on the dark page    */
/* ------------------------------------------------------------------ */
function Laptop({ project }: { project: DetailedCaseStudy }) {
  const highlight = project.whatChanged.metrics[1];

  return (
    <LaptopFrame>

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
              src={project.image}
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
    </LaptopFrame>
  );
}

/* ------------------------------------------------------------------ */
/* One case study, in three zones:                                     */
/*  1. an intro band: the visual beside the short facts, level pair    */
/*  2. the story as an editorial spread: the brief | what changed      */
/*  3. the results across the full width                               */
/* ------------------------------------------------------------------ */
function StoryLabel({ children }: { children: string }) {
  return (
    <h4 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9BBFF]">
      <span aria-hidden="true" className="h-px w-6 bg-[#C9BBFF]/60" />
      {children}
    </h4>
  );
}

function CaseStudyCard({ project }: { project: DetailedCaseStudy }) {
  const [full, setFull] = useState(false);
  const clamp = full ? "" : "max-sm:line-clamp-5";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* 1. Intro band: only the short facts sit beside the visual, so the two halves stay level */}
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div className="relative isolate flex items-center justify-center overflow-hidden rounded-[26px] border border-white/10 px-6 py-10 sm:px-10 sm:py-12">
          <div className="absolute inset-0 -z-10"><DuskBackdrop /></div>
          <div className="w-full"><Laptop project={project} /></div>
        </div>

        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/50">
            {project.category} <span className="px-1.5 text-white/25">/</span> {project.year}
          </p>
          <h3 className="mt-4 text-[32px] font-light leading-[1.05] tracking-[-0.04em] sm:text-[44px]">{project.title}</h3>
          <p className="mt-4 max-w-[34ch] text-[18px] leading-snug tracking-[-0.01em] text-white/90 sm:text-[20px]">{project.headline}</p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-white/60">{project.summary}</p>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">Built with</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technology.stack.map((tech) => <TechPill key={tech} name={tech} />)}
            </div>
          </div>

          <div className="mt-7"><PillLink href="/contact">Talk about a similar project</PillLink></div>
        </div>
      </div>

      {/* 2. The story, as two reading columns: the brief, then the wider "what changed" */}
      <div className="mt-8 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <section>
          <StoryLabel>The brief</StoryLabel>
          <p className={`mt-4 max-w-[62ch] whitespace-pre-line text-[15px] leading-[1.75] text-white/75 ${clamp}`}>{project.brief.problemStatement}</p>
        </section>
        <section>
          <StoryLabel>What changed</StoryLabel>
          <p className={`mt-4 max-w-[68ch] whitespace-pre-line text-[15px] leading-[1.75] text-white/75 ${clamp}`}>{project.whatChanged.empiricalOutcome}</p>
        </section>
      </div>

      {/* Phones: the story is shortened until asked for */}
      <button type="button" onClick={() => setFull(!full)} className="mt-3 min-h-[44px] text-left text-[13px] font-medium text-[#C9BBFF] underline-offset-4 hover:underline sm:hidden">
        {full ? "Show less" : "Read the full story"}
      </button>
      {/* 3. Results, across the full width, closing the case study */}
      <dl className="mt-6 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15 py-4 sm:mt-12 sm:py-8">
        {project.whatChanged.metrics.slice(0, 3).map((metric) => (
          <div key={metric.label} className="flex min-w-0 flex-col-reverse px-3 first:pl-0 last:pr-0 sm:px-8">
            <dt className="mt-1.5 text-[11px] leading-snug text-white/70 sm:mt-3 sm:text-sm">
              <span className="block font-medium text-white/80 sm:text-white">{metric.label}</span>
              {metric.context && <span className="hidden text-white/55 first-letter:uppercase sm:inline">{metric.context}</span>}
            </dt>
            <dd className="break-words text-[19px] font-light leading-tight tracking-[-0.03em] sm:text-[48px] sm:leading-none sm:tracking-[-0.04em]">{metric.value}</dd>
          </div>
        ))}
      </dl>

    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Phones: "More projects" as a two-column grid of tiles               */
/* ------------------------------------------------------------------ */
function ProjectTile({ project, onOpen }: { project: DetailedCaseStudy; onOpen: () => void }) {
  const lead = project.whatChanged.metrics[0];
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-white/10 bg-white/[.04] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BBFF]"
      >
        <span className="relative block aspect-[16/10] w-full bg-white/5">
          <Image src={project.cardImage} alt="" fill sizes="50vw" style={{ objectPosition: project.cardImagePosition }} className="object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-black/55 px-1.5 py-0.5 text-[10px] tabular-nums text-white/85 backdrop-blur">{project.index.split(" / ")[0]}</span>
        </span>
        <span className="flex flex-1 flex-col p-3">
          <span className="truncate text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#C9BBFF]">{project.category.split(" · ")[0]}</span>
          <span className="mt-1 line-clamp-2 text-[14px] leading-snug text-white">{project.title}</span>
          {lead && (
            <span className="mt-auto pt-2 text-[11px] leading-tight text-white/55">
              <span className="block text-[15px] font-light text-white">{lead.value}</span>
              <span className="line-clamp-1">{lead.label}</span>
            </span>
          )}
        </span>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export function PortfolioCaseStudiesSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [featuredId, setFeaturedId] = useState(PORTFOLIO_CASE_STUDIES[0]?.id ?? "");

  const projects = useMemo(() => {
    if (activeTab === "all") return PORTFOLIO_CASE_STUDIES;
    const label = DISCIPLINE_TABS.find((t) => t.id === activeTab)?.label;
    return PORTFOLIO_CASE_STUDIES.filter((p) => p.discipline === label);
  }, [activeTab]);

  const featured = projects.find((project) => project.id === featuredId) ?? projects[0];
  const featuredRef = useRef<HTMLDivElement>(null);

  // Each project has its own address, so Back and Forward step through them.
  function openProject(id: string) {
    setFeaturedId(id);
    router.push(`/case-studies#${id}`, { scroll: false });
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useHashLink((hash) => {
    const project = PORTFOLIO_CASE_STUDIES.find(({ id }) => `#${id}` === hash);
    if (project) {
      setFeaturedId(project.id);
      // A link to a project hidden by the current filter shows it anyway.
      setActiveTab((tab) => {
        const label = DISCIPLINE_TABS.find((t) => t.id === tab)?.label;
        return tab === "all" || label === project.discipline ? tab : "all";
      });
    } else if (!hash) {
      setFeaturedId(PORTFOLIO_CASE_STUDIES[0]?.id ?? "");
    }
  });

  const stats: [string, string][] = [
    [String(PORTFOLIO_CASE_STUDIES.length), "Case studies published"],
    ["4", "Disciplines covered"],
    ["3–14", "Weeks, brief to launch"],
    ["100%", "Handed over with code & docs"],
  ];

  return (
    <section id="case-studies" className="relative scroll-mt-16 text-white">
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/15 py-10 sm:py-20">
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#C9BBFF]">Case studies</p>
            <h2 className="mt-3 w-fit bg-gradient-to-r from-white via-[#E4DCFF] to-[#9D85F2] bg-clip-text pb-1 text-3xl font-light leading-[1.1] tracking-[-0.04em] text-transparent sm:text-[44px]">
              Built to make a difference.
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/70 lg:justify-self-end">
            Websites, custom software platforms and mobile apps we have designed, built and launched. Filter by discipline, or ask us about the work we cannot publish.
          </p>
        </header>

        {/* Stats */}
        <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-white/15 py-5 sm:mt-10 sm:gap-y-8 sm:py-7 md:grid-cols-4 md:divide-x md:divide-white/15">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse md:px-6 md:first:pl-0 md:last:pr-0">
              <dt className="mt-1.5 text-[13px] text-white/65 sm:mt-2 sm:text-sm">{label}</dt>
              <dd className="text-[30px] font-light leading-none tracking-[-0.04em] sm:text-[40px]">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Filter */}
        {/* Phones: one dropdown, so nothing is hidden off-screen */}
        <label className="mb-2 mt-6 flex items-center gap-3 sm:hidden">
          <span className="shrink-0 text-[12px] text-white/55">Show</span>
          <span className="relative flex-1">
            <select
              value={activeTab}
              onChange={(event) => setActiveTab(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-white/15 bg-white/[.06] pl-3 pr-9 text-[14px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9BBFF]"
            >
              {DISCIPLINE_TABS.map((tab) => <option key={tab.id} value={tab.id} className="bg-[#15131f]">{tab.label}</option>)}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
          </span>
          <span className="shrink-0 text-[12px] tabular-nums text-white/55">{projects.length}</span>
        </label>


        <div className="mb-10 mt-8 hidden items-end justify-between gap-6 border-b border-white/15 sm:flex">
          <nav aria-label="Filter case studies" className="flex flex-wrap gap-x-8">
            {DISCIPLINE_TABS.map((tab) => {
              const on = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={on}
                  className={`relative shrink-0 py-2.5 text-[13px] font-medium transition-colors ${on ? "text-[#C9BBFF]" : "text-white/60 hover:text-white"}`}
                >
                  {tab.label}
                  {on && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#9D85F2]" />}
                </button>
              );
            })}
          </nav>
          <p className="hidden shrink-0 pb-2.5 text-sm text-white/55 sm:block">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <div ref={featuredRef} className="relative mt-5 scroll-mt-20 sm:mt-0 sm:scroll-mt-24">
          {/* Link targets for each project */}
          {PORTFOLIO_CASE_STUDIES.map(({ id }) => (
            <span key={id} id={id} aria-hidden="true" className="absolute left-0 top-0 scroll-mt-24" />
          ))}
          {featured && <AnimatePresence mode="wait">
            <CaseStudyCard key={featured.id} project={featured} />
          </AnimatePresence>}
        </div>

        <div className="mt-10 sm:mt-20">
          <div className="mb-4 flex items-baseline justify-between sm:mb-6">
            <h3 className="text-[22px] font-light tracking-[-0.03em] sm:text-[28px]">More projects</h3>
            <p className="text-[12px] text-white/50 sm:hidden">Tap one to open it above</p>
          </div>
          {/* Phones: compact tiles; tapping one opens it in the featured spot above */}
          <ul aria-label="More projects" className="grid grid-cols-2 gap-2.5 sm:hidden">
            {projects.filter((project) => project.id !== featured?.id).map((project) => (
              <ProjectTile key={project.id} project={project} onOpen={() => openProject(project.id)} />
            ))}
          </ul>
          <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
            {projects.filter((project) => project.id !== featured?.id).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              >
                <FolderTabCard
                  id={project.id}
                  number={project.index.split(" / ")[0]}
                  category={DISCIPLINE_CARD_META[project.discipline]?.label ?? project.discipline}
                  title={project.title}
                  description={project.headline}
                  image={project.cardImage}
                  imagePosition={project.cardImagePosition}
                  icon={DISCIPLINE_CARD_META[project.discipline]?.icon ?? Bot}
                  onClick={() => openProject(project.id)}
                />
              </motion.div>
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
