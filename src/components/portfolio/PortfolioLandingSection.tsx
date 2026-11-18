"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/ui/PillLink";
import { ArrowUpRight } from "lucide-react";

export interface LandingProjectItem {
  id: string;
  index: string;
  category: string;
  client: string;
  title: string;
  image: string;
  description1: string;
  description2: string;
}

/** Which published case study each landing card opens. */
const CASE_STUDY_IDS: Record<string, string> = {
  "hahnemann-ai": "hahnemann-ai",
  "bimakart-connect": "bimakart-connect",
  "wealth-wisdom-goals-planner": "wealth-wisdom-goals-planner",
};

const FEATURED_3_PROJECTS: LandingProjectItem[] = [
  {
    id: "hahnemann-ai",
    index: "01",
    category: "Clinical AI",
    client: "Hahnemann AI",
    title: "Hahnemann AI",
    image: "/portfolio/case-studies/hahnemann-ai-card.webp",
    description1: "Autonomous intelligence agent utilizing deterministic RAG to resolve multi-tier customer workflows.",
    description2: "Achieved 99.4% guardrail accuracy and 68% first-contact resolution, cutting ticket turnaround by 4.8x.",
  },
  {
    id: "bimakart-connect",
    index: "02",
    category: "InsurTech Gateway",
    client: "Bimakart",
    title: "Bimakart Connect",
    image: "/portfolio/case-studies/bimakart-connect-card.webp",
    description1: "Real-time streaming platform querying 100+ carriers with automated underwriting reconciliation.",
    description2: "Reduced quote lookup times to under 2.4s, scaling to 2.5M+ daily risk queries with enterprise reliability.",
  },
  {
    id: "wealth-wisdom-goals-planner",
    index: "03",
    category: "WealthTech",
    client: "Wealth Wisdom",
    title: "Wealth Wisdom Goals Planner",
    image: "/portfolio/case-studies/wealth-wisdom-card.webp",
    description1: "A goals planner that helps investors map what they are saving for and track progress over time.",
    description2: "Brings portfolio data, plans and milestones together in one clear view for clients and advisors.",
  },
];

export function PortfolioLandingSection() {
  return (
    <section 
      id="case-studies" 
      className="relative w-full md:min-h-[calc(100vh-64px)] flex flex-col justify-between text-[#1D1D1F] py-8 sm:py-10 lg:py-12 overflow-hidden border-b border-[#E5E5EA]"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-1 min-h-0">
        
        {/* =========================================================
            1. SECTION HEADER (21SPHERES DNA: CLEAN SCALE & METRIC RHYTHM)
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 shrink-0 pb-3.5 sm:pb-4 border-b border-[#E5E5EA]/70 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#7C3AED] sm:text-[13px]">
              OUR WORK
            </span>
            <h2 className="select-none whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] text-black sm:text-4xl md:text-5xl lg:text-[52px]">
              Case Studies
            </h2>
          </div>

          <div className="flex flex-col items-start sm:items-end justify-center max-w-lg sm:text-right pb-0.5">
            <p className="text-xs sm:text-sm text-[#383842] font-normal leading-relaxed">
              Specialized digital platforms, mobile ecosystems, and autonomous AI systems.
            </p>
            <p className="text-xs sm:text-[13px] text-[#6E6E73] font-light leading-relaxed mt-0.5">
              Engineered for high-velocity scale with proven enterprise business impact.
            </p>
          </div>
        </div>

        {/* =========================================================
            2. TCS-STYLE BORDERLESS EDITORIAL 3-COLUMN SHOWCASE
            - Inspired directly by 21 Spheres production products & metadata
            - Exactly 3 items side-by-side
            - Concise, impactful text with generous breathing room
            - Crisp subtle rounded corners (rounded-[10px])
            - Pinterest AI Customer Support image
            ========================================================= */}
        {/* Phones: a compact list, one aligned row per project: photo, then category, name and a short summary */}
        <ul className="divide-y divide-[#E5E5EA]/80 md:hidden">
          {FEATURED_3_PROJECTS.map((project) => (
            <li key={project.id}>
              <Link
                href={`/case-studies#${CASE_STUDY_IDS[project.id] ?? ""}`}
                className="grid grid-cols-[104px_minmax(0,1fr)_16px] items-center gap-x-4 py-4"
              >
                <span className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] border border-[#E5E5EA]/80 bg-[#F5F5F7]">
                  <Image src={project.image} alt="" fill unoptimized className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">{project.category}</span>
                  <span className="mt-1 block text-[15px] font-semibold leading-snug tracking-tight text-[#111114]">{project.title}</span>
                  <span className="mt-1 line-clamp-2 block text-[12.5px] leading-[1.5] text-[#6E6E73]">{project.description1}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#7C3AED]" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Tablets and up: three columns */}
        <div className="hidden flex-1 items-stretch md:my-auto md:grid md:min-h-0 md:grid-cols-3 md:gap-8 md:py-3 lg:gap-10">
          {FEATURED_3_PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/case-studies#${CASE_STUDY_IDS[project.id] ?? ""}`}
              className="group flex h-full cursor-pointer select-none flex-col text-left"
            >
              {/* Image thumbnail with crisp subtle rounded edges */}
              <div className="relative aspect-[16/9] w-full rounded-[10px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E5E5EA]/80 group-hover:border-[#7C3AED]/50 transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Bold Title Directly Underneath Image */}
              <h3 className="text-base sm:text-lg lg:text-[19px] font-semibold text-[#111114] tracking-tight group-hover:text-[#7C3AED] transition-colors mt-4 sm:mt-5 mb-2.5 sm:mb-3 leading-snug">
                {project.title}
              </h3>

              {/* 2 Paragraph Text: Architecture/Capability + Business Impact */}
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 flex-1">
                <p className="text-xs sm:text-[13px] text-[#4A4A52] font-normal leading-relaxed">
                  {project.description1}
                </p>
                <p className="text-xs sm:text-[12.5px] text-[#6E6E73] font-light leading-relaxed">
                  {project.description2}
                </p>
              </div>

              {/* View Case Study Action Link */}
              <div className="pt-1.5 sm:pt-2 mt-auto flex items-center justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#7C3AED] group-hover:text-[#5B21B6] transition-colors">
                  <span>View case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* =========================================================
            3. "SEE ALL CASE STUDIES" CTA BUTTON
            - Refined, clean pill button with comfortable breathing room
            ========================================================= */}
        <div className="flex justify-center items-center shrink-0 pt-4 sm:pt-6 pb-1 sm:pb-2">
          <PillLink href="/case-studies">See all case studies</PillLink>
        </div>

      </div>
    </section>
  );
}
