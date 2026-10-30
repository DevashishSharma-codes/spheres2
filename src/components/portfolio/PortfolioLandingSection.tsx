"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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

const FEATURED_3_PROJECTS: LandingProjectItem[] = [
  {
    id: "bimakart-connect",
    index: "01",
    category: "InsurTech Gateway",
    client: "Bimakart Technologies",
    title: "Bimakart Connect API Gateway",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description1: "Architected a real-time data streaming platform querying 100+ insurance carriers with automated underwriting reconciliation, low-latency API pipelines, and interactive executive dashboards.",
    description2: "Reduced cross-carrier quote lookup times from 45 seconds to under 2.4 seconds, scaling to process over 2.5 million daily risk queries with enterprise-grade reliability.",
  },
  {
    id: "on-demand-mobile",
    index: "02",
    category: "Mobile Ecosystem",
    client: "UrbanFlow Logistics",
    title: "On-Demand Logistics & Service App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    description1: "Built a cross-platform mobile application connecting enterprise service providers and consumers with real-time geospatial dispatch, native 120 FPS animations, and offline-first data sync.",
    description2: "Engineered ultra-low latency push notifications and sub-16ms touch responsiveness, powering over 450,000 monthly bookings across 14 metropolitan hubs.",
  },
  {
    id: "hahnnemen-ai",
    index: "03",
    category: "Autonomous AI Agent",
    client: "Clinical Therapeutics Group",
    title: "Hahnnemen Clinical & Support AI",
    image: "https://i.pinimg.com/1200x/66/ba/3e/66ba3e1d2797e5926917697d2432f77f.jpg",
    description1: "Deployed an autonomous intelligence agent utilizing deterministic RAG and fine-tuned LLMs to resolve complex multi-tier customer queries and execute automated workflows.",
    description2: "Eliminated hallucinations with 99.4% deterministic guardrails, achieving 68% end-to-end first-contact resolution while reducing average ticket turnaround by 4.8x.",
  },
];

export function PortfolioLandingSection() {
  return (
    <section 
      id="portfolio" 
      className="relative w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[920px] flex flex-col justify-between text-[#1D1D1F] pt-4 pb-4 sm:pt-5 sm:pb-5 overflow-hidden border-b border-[#E5E5EA]"
      style={{
        background: `
          radial-gradient(ellipse 90% 50% at 50% 100%, rgba(124, 58, 237, 0.22) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 75%),
          radial-gradient(ellipse 50% 40% at 100% 100%, rgba(124, 58, 237, 0.14) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 0% 100%, rgba(147, 51, 234, 0.12) 0%, transparent 60%),
          linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 38%, #FAF6FF 60%, #F2E7FE 85%, #EADBFE 100%)
        `,
      }}
    >
      {/* Bottom purple ambient glow matching How We Work section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[900px] h-[380px] rounded-full blur-[140px] bg-[#7C3AED]/16" />
      </div>

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-1 min-h-0">
        
        {/* =========================================================
            1. SECTION HEADER (21SPHERES DNA: CLEAN SCALE & METRIC RHYTHM)
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 shrink-0 pb-3 border-b border-[#E5E5EA]/70 mb-3 sm:mb-4">
          <div className="flex flex-col items-start">
            <span className="text-[12px] sm:text-[13px] font-bold text-[#7C3AED] tracking-[0.18em] uppercase mb-1">
              OUR WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-black select-none whitespace-nowrap">
              Portfolio
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
            - Inspired directly by 21Spheres production products & metadata
            - Exactly 3 items side-by-side
            - 2-paragraph authentic text
            - Crisp subtle rounded corners (rounded-[10px])
            - Pinterest AI Customer Support image
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch flex-1 min-h-0 my-auto py-1">
          {FEATURED_3_PROJECTS.map((project) => (
            <Link
              key={project.id}
              href="/portfolio"
              className="group flex flex-col text-left select-none cursor-pointer h-full"
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

              {/* 21Spheres Index & Category Sub-label */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E93] mt-3 sm:mt-3.5 mb-1">
                <span className="text-[#7C3AED] font-semibold">{project.index} // {project.category}</span>
                <span>{project.client}</span>
              </div>

              {/* Bold Title Directly Underneath Image */}
              <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold text-[#111114] tracking-tight group-hover:text-[#7C3AED] transition-colors mb-2 leading-snug">
                {project.title}
              </h3>

              {/* 2 Paragraph Text: Architecture/Capability + Business Impact */}
              <div className="space-y-1.5 mb-3 flex-1">
                <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#4A4A52] font-normal leading-relaxed">
                  {project.description1}
                </p>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-[#6E6E73] font-light leading-relaxed">
                  {project.description2}
                </p>
              </div>

              {/* View Case Study Action Link */}
              <div className="pt-1 mt-auto flex items-center justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#7C3AED] group-hover:text-[#5B21B6] transition-colors">
                  <span>View case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* =========================================================
            3. "SEE FULL PORTFOLIO" CTA BUTTON
            - Refined, clean pill button with comfortable breathing room
            ========================================================= */}
        <div className="flex justify-center items-center shrink-0 pt-3 sm:pt-4 pb-1">
          <Link
            href="/portfolio"
            className="
              group inline-flex items-center justify-center gap-2
              px-5 py-2 sm:px-6 sm:py-2.5 rounded-full
              bg-[#111114] text-white hover:bg-[#7C3AED]
              border border-[#111114] hover:border-[#7C3AED]
              text-xs sm:text-[13px] font-medium tracking-tight
              shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.25)]
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300 cursor-pointer select-none
            "
          >
            <span>See full portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

      </div>
    </section>
  );
}
