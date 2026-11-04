"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
function Laptop({ src, title }: { src: string; title: string }) {
  return (
    <div className="mx-auto w-full max-w-[600px]">
      <div className="rounded-[18px] bg-gradient-to-b from-slate-100 to-slate-300 p-[7px] shadow-[0_40px_70px_-20px_rgba(20,10,60,0.9)] ring-1 ring-white/40">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-[#0d0b18] ring-1 ring-black/20">
          <Image
            src={src}
            alt=""
            aria-hidden
            fill
            unoptimized
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="scale-110 object-cover opacity-30 blur-md"
          />
          <Image
            src={src}
            alt={`${title} product screen`}
            fill
            unoptimized
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-transparent" />
        </div>
      </div>
      <div className="relative mx-auto -mt-px h-[14px] w-[108%] -translate-x-[4%] rounded-b-[18px] rounded-t-[3px] bg-gradient-to-b from-slate-200 to-slate-400 shadow-[0_22px_34px_-12px_rgba(20,10,60,0.9)]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[18%] -translate-x-1/2 rounded-b-xl bg-slate-400/90" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One case study: laptop on the left, details on the right            */
/* ------------------------------------------------------------------ */
function CaseStudyCard({
  project,
  onInspect,
}: {
  project: DetailedCaseStudy;
  onInspect: () => void;
}) {
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
            <Laptop src={project.image} title={project.title} />

            {/* floating glass stat, like the reference's output card */}
            <div className="absolute -bottom-1 right-1 w-[190px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-[0_20px_40px_-18px_rgba(0,0,0,0.7)] sm:right-3">
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
            <button
              type="button"
              onClick={onInspect}
              className="text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]"
            >
              See the architecture
            </button>
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
  const [selected, setSelected] = useState<DetailedCaseStudy | null>(null);

  const projects = useMemo(() => {
    if (activeTab === "all") return PORTFOLIO_CASE_STUDIES;
    const label = DISCIPLINE_TABS.find((t) => t.id === activeTab)?.label;
    return PORTFOLIO_CASE_STUDIES.filter((p) => p.discipline === label);
  }, [activeTab]);

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
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8E79E8] ${on
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

        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <CaseStudyCard
                key={project.id}
                project={project}
                onInspect={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* architecture modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.title} architecture`}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/15 bg-[#0d0a1a]/90 p-7 text-white backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] sm:p-10"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-sm text-white/55">
                {selected.client} · {selected.year}
              </p>
              <h3 className="mt-2 text-3xl font-medium tracking-tight">{selected.title}</h3>

              <h4 className="mb-3 mt-8 text-sm font-medium">How a request flows</h4>
              <ol className="space-y-2">
                {selected.blueprint.topology.map((step, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/75"
                  >
                    {step}
                  </li>
                ))}
              </ol>

              <h4 className="mb-3 mt-8 text-sm font-medium">Benchmarks</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {selected.blueprint.benchmarks.map((b) => (
                  <div key={b.metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs text-white/55">{b.metric}</p>
                    <p className="my-1 text-2xl font-light tracking-tight">{b.score}</p>
                    <p className="text-xs text-white/45">{b.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:grid-cols-2">
                <p>Timeline: {selected.blueprint.timeline}</p>
                <p>Security: {selected.blueprint.securityProfile}</p>
              </div>

              <div className="mt-8 flex justify-end">
                <Link
                  href="/contact"
                  className="rounded-full bg-[#7057D9] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(112,87,217,0.8)] transition hover:bg-[#5f48c4]"
                >
                  Start a similar project
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PortfolioCaseStudiesSection;
export { PortfolioCaseStudiesSection as PortfolioCaseStudiesShowcase };