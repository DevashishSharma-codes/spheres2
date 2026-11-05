"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useHashLink } from "@/lib/useHashLink";
import { Bot, Landmark, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { FolderTabCard } from "@/components/ui/FolderTabCard";
import { LaptopFrame } from "@/components/ui/LaptopFrame";
import { PillLink } from "@/components/ui/PillLink";
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
    </LaptopFrame>
  );
}

/* ------------------------------------------------------------------ */
/* One case study: laptop on the left, details on the right            */
/* ------------------------------------------------------------------ */
function CaseStudyCard({ project }: { project: DetailedCaseStudy }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Laptop over the dusk image */}
        <div className="relative isolate flex items-center justify-center overflow-hidden rounded-[26px] border border-white/10 px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 -z-10"><DuskBackdrop /></div>
          <div className="w-full"><Laptop project={project} /></div>
        </div>

        {/* Details in ruled rows */}
        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-sm text-white/60">{project.client} · {project.year}</p>
          <h3 className="mt-3 text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[40px]">{project.title}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">{project.headline}</p>

          <dl className="mt-6 border-t border-white/15 text-sm">
            <div className="grid gap-1 border-b border-white/10 py-3.5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
              <dt className="text-white/50">The brief</dt>
              <dd className="line-clamp-3 leading-relaxed text-white/85">{project.brief.problemStatement}</dd>
            </div>
            <div className="grid gap-1 border-b border-white/10 py-3.5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
              <dt className="text-white/50">What changed</dt>
              <dd className="line-clamp-3 leading-relaxed text-white/85">{project.whatChanged.empiricalOutcome}</dd>
            </div>
            <div className="grid gap-2 border-b border-white/10 py-3.5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
              <dt className="text-white/50">Technology</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.technology.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/15 bg-white/[.06] px-2.5 py-0.5 text-xs text-white/80">{tech}</span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-6"><PillLink href="/contact">Talk about a similar project</PillLink></div>
        </div>
      </div>

      {/* Results */}
      <dl className="mt-10 grid gap-8 border-t border-white/15 pt-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/15">
        {project.whatChanged.metrics.slice(0, 3).map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse sm:px-6 sm:first:pl-0 sm:last:pr-0">
            <dt className="mt-2 text-sm leading-snug text-white/70">
              <span className="block font-medium text-white">{metric.label}</span>
              {metric.context && <span className="first-letter:uppercase">{metric.context}</span>}
            </dt>
            <dd className="text-[40px] font-light leading-none tracking-[-0.04em] sm:text-[48px]">{metric.value}</dd>
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
    router.push(`/portfolio#${id}`, { scroll: false });
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
        <div className="border-t border-white/15 py-14 sm:py-20">
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
        <dl className="mt-10 grid grid-cols-2 gap-y-8 border-y border-white/15 py-7 md:grid-cols-4 md:divide-x md:divide-white/15">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse md:px-6 md:first:pl-0 md:last:pr-0">
              <dt className="mt-2 text-sm text-white/65">{label}</dt>
              <dd className="text-[40px] font-light leading-none tracking-[-0.04em]">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Filter */}
        <div className="mb-10 mt-8 flex items-end justify-between gap-6 border-b border-white/15">
          <nav aria-label="Filter portfolio projects" className="flex gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] sm:gap-8">
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

        <div ref={featuredRef} className="relative scroll-mt-24">
          {/* Link targets for each project */}
          {PORTFOLIO_CASE_STUDIES.map(({ id }) => (
            <span key={id} id={id} aria-hidden="true" className="absolute left-0 top-0 scroll-mt-24" />
          ))}
          {featured && <AnimatePresence mode="wait">
            <CaseStudyCard key={featured.id} project={featured} />
          </AnimatePresence>}
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="text-2xl font-light tracking-[-0.03em] sm:text-[28px]">More projects</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
