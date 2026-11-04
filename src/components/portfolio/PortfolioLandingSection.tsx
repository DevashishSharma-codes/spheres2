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

const FEATURED_3_PROJECTS: LandingProjectItem[] = [
  {
    id: "bimakart-connect",
    index: "01",
    category: "InsurTech Gateway",
    client: "Bimakart Technologies",
    title: "Bimakart Connect API Gateway",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description1: "Real-time streaming platform querying 100+ carriers with automated underwriting reconciliation.",
    description2: "Reduced quote lookup times to under 2.4s, scaling to 2.5M+ daily risk queries with enterprise reliability.",
  },
  {
    id: "on-demand-mobile",
    index: "02",
    category: "Mobile Ecosystem",
    client: "UrbanFlow Logistics",
    title: "On-Demand Logistics & Service App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    description1: "Cross-platform mobile application with real-time geospatial dispatch and offline-first data sync.",
    description2: "Engineered sub-16ms touch responsiveness, powering 450,000+ monthly bookings across 14 metropolitan hubs.",
  },
  {
    id: "hahnnemen-ai",
    index: "03",
    category: "Autonomous AI Agent",
    client: "Clinical Therapeutics Group",
    title: "Hahnnemen Clinical & Support AI",
    image: "https://i.pinimg.com/1200x/66/ba/3e/66ba3e1d2797e5926917697d2432f77f.jpg",
    description1: "Autonomous intelligence agent utilizing deterministic RAG to resolve multi-tier customer workflows.",
    description2: "Achieved 99.4% guardrail accuracy and 68% first-contact resolution, cutting ticket turnaround by 4.8x.",
  },
];

export function PortfolioLandingSection() {
  return (
    <section 
      id="portfolio" 
      className="relative w-full min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-64px)] flex flex-col justify-between text-[#1D1D1F] py-8 sm:py-10 lg:py-12 overflow-hidden border-b border-[#E5E5EA]"
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
            - Concise, impactful text with generous breathing room
            - Crisp subtle rounded corners (rounded-[10px])
            - Pinterest AI Customer Support image
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch flex-1 min-h-0 my-auto py-2 sm:py-3">
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
            3. "SEE FULL PORTFOLIO" CTA BUTTON
            - Refined, clean pill button with comfortable breathing room
            ========================================================= */}
        <div className="flex justify-center items-center shrink-0 pt-4 sm:pt-6 pb-1 sm:pb-2">
          <PillLink href="/portfolio">See full portfolio</PillLink>
        </div>

      </div>
    </section>
  );
}
