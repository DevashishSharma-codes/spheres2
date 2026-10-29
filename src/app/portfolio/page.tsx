import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio & Deliverables — 21Spheres",
  description: "Production software systems, empirical statistics, and enterprise platforms delivered by 21Spheres.",
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFC]">
      
      {/* =========================================================
          1. PORTFOLIO HERO & FLAGSHIP DELIVERED SYSTEMS
      ========================================================= */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-[#E5E5EA]">
        {/* Subtle purple background ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] rounded-full blur-[160px] bg-[#7C3AED]/10" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[500px] rounded-full blur-[160px] bg-[#9333EA]/08" />
        </div>

        <Container>
          <div className="relative z-10 max-w-4xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[11px] font-mono font-semibold tracking-wider text-[#7C3AED] mb-5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>{PORTFOLIO_CONTENT.eyebrow}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-light tracking-[-0.04em] text-[#1D1D1F] leading-[1.08] mb-5">
              {PORTFOLIO_CONTENT.title}
            </h1>

            <p className="text-base sm:text-lg text-[#6E6E73] font-light leading-relaxed max-w-2xl">
              {PORTFOLIO_CONTENT.lead}
            </p>
          </div>

          {/* Portfolio Systems Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PORTFOLIO_CONTENT.items.map((item) => (
              <div 
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E5E5EA] hover:border-[#7C3AED]/40 p-6 sm:p-7 shadow-xs hover:shadow-[0_12px_36px_rgba(124,58,237,0.08)] transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Category pill & Client/Year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10.5px] font-mono font-medium tracking-wide">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#86868B]">
                      {item.year}
                    </span>
                  </div>

                  {/* System Title & Headline */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-medium text-[#1D1D1F] tracking-tight group-hover:text-[#7C3AED] transition-colors">
                      {item.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#7C3AED] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>

                  <p className="text-xs font-mono text-[#86868B] mb-3">
                    Client: {item.client}
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#515154] font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Empirical Benchmarks / Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-[#FAF9FC] border border-[#F0EEF6] mb-5">
                    {item.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-xs sm:text-sm font-semibold font-mono text-[#1D1D1F]">
                          {metric.value}
                        </div>
                        <div className="text-[9.5px] font-mono text-[#86868B] tracking-tight truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F0EEF6]">
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white text-[10px] font-mono text-[#6E6E73] border border-[#E5E5EA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================
          2. COMPANY STATISTICS & DELIVERABLES SECTION
             Moved from landing page into the Portfolio section
      ========================================================= */}
      <CompanyStatisticsSection />

    </div>
  );
}
