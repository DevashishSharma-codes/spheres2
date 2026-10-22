"use client";

import React from "react";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";

export function AboutSection() {
  return (
    <div 
      className="relative z-0 overflow-hidden w-full border-b border-[#DADADD]/70"
      style={{
        background: `
          /* 1. Powerful radiant white core flooding the bottom of About Us and center of Company Statistics */
          radial-gradient(ellipse 85% 48% at 50% 46%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 35%, rgba(248, 243, 255, 0.65) 65%, transparent 90%),

          /* 2. Secondary glowing white bloom in Company Statistics */
          radial-gradient(ellipse 70% 45% at 50% 74%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 35%, rgba(246, 240, 255, 0.6) 65%, transparent 88%),

          /* 3. Left flank rich purple glow (Dataly reference) */
          radial-gradient(ellipse 52% 52% at 0% 62%, #8E6BF7 0%, #764CE8 45%, rgba(118, 76, 232, 0.35) 75%, transparent 100%),

          /* 4. Right flank rich purple glow (Dataly reference) */
          radial-gradient(ellipse 52% 52% at 100% 62%, #8E6BF7 0%, #764CE8 45%, rgba(118, 76, 232, 0.35) 75%, transparent 100%),

          /* 5. Ambient subtle dark purple aura at top of About Us */
          radial-gradient(ellipse 70% 25% at 50% 8%, rgba(107, 60, 235, 0.22) 0%, transparent 60%),

          /* 6. Master vertical gradient:
             - Deep obsidian black for About Us header and upper columns (0% to ~18%)
             - Dynamic purple transition through mid-columns (~18% to ~36%)
             - Pure luminous white across the entire bottom of About Us and through Company Statistics (~45% to 100%)
          */
          linear-gradient(180deg, 
            #03020A 0%, 
            #03020A 18%, 
            #080416 23%, 
            #190840 28%, 
            #3E138E 33%, 
            #763CE0 37%, 
            #B692FE 41%, 
            #E9DCFF 45%, 
            #FFFFFF 50%, 
            #FFFFFF 100%
          )
        `,
      }}
    >
      {/* Diffused ambient light blooms */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] right-0 w-[550px] h-[550px] rounded-full blur-[140px] bg-[#8E79E8]/12" />
        <div className="absolute top-[22%] left-0 w-[500px] h-[500px] rounded-full blur-[130px] bg-[#7057D9]/15" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[120px] bg-white/75" />
        <div className="absolute bottom-[20%] left-[-80px] w-[600px] h-[600px] rounded-full blur-[140px] bg-[#8E6BF7]/20" />
        <div className="absolute bottom-[20%] right-[-80px] w-[600px] h-[600px] rounded-full blur-[140px] bg-[#764CE8]/20" />
      </div>

      {/* =========================================================
          1. ABOUT US: 4 SPACIOUS MINIMALIST EDITORIAL COLUMNS (BLACK GLASS)
          ========================================================= */}
      <section 
        id="about" 
        className="relative z-10 text-white pt-20 sm:pt-24 lg:pt-28 pb-18 sm:pb-24 lg:pb-28"
      >
        <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col gap-10 sm:gap-14">
            
            {/* 1. TOP ROW: REFINED "ABOUT US" IN ONE SLEEK HORIZONTAL LINE */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/15">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-white select-none whitespace-nowrap">
                  ABOUT US
                </h2>
              </div>

              {/* Mission Statement Hook - Horizontally aligned on the same baseline */}
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-left sm:text-right pb-0.5">
                <p className="text-sm sm:text-base font-light text-white/85">
                  Empowering businesses through intelligent, reliable technology.
                </p>
                <p className="text-xs font-mono text-white/80 font-medium uppercase tracking-wider">
                  Committed to advanced AI &amp; modern engineering.
                </p>
              </div>
            </div>

            {/* 2. THE MIDDLE PART: 4 SPACIOUS MINIMALIST COLUMNS (CONNECTED GRID, PRESERVED BLACK GLASS SHADE, LIGHT BLACK HOVER) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/15 border-x border-white/15 w-full">
              
              {/* Column 1: Strategic Technology */}
              <div className="relative rounded-none overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] p-6 sm:p-7 xl:p-8 bg-gradient-to-b from-white/[0.10] via-black/60 to-black/80 backdrop-blur-xl border-b sm:border-b-0 lg:border-r border-white/15 hover:border-white/30 transition-all duration-300 group">
                {/* Light black hover overlay (pure charcoal, blocks white backlight) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#252333] via-[#1c1a28] to-[#14131e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="relative z-10 text-xs sm:text-[12.5px] font-mono text-white/90 font-medium tracking-wider uppercase">
                  Modernization
                </span>
                <div className="relative z-10 my-auto py-6 sm:py-8">
                  <h3 className="text-2xl sm:text-[25px] lg:text-[27px] xl:text-[29px] font-light tracking-[-0.03em] text-white leading-[1.2] mb-3">
                    Strategic Technology
                  </h3>
                  <p className="text-xs sm:text-[13px] font-light text-white/75 leading-relaxed max-w-sm">
                    Guiding businesses with clear, actionable roadmaps for AI and digital modernization.
                  </p>
                </div>
                <span className="relative z-10 text-xs font-mono text-white/50 tracking-wider">
                  01
                </span>
              </div>

              {/* Column 2: Data-Driven Insights */}
              <div className="relative rounded-none overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] p-6 sm:p-7 xl:p-8 bg-gradient-to-b from-white/[0.10] via-black/60 to-black/80 backdrop-blur-xl border-b sm:border-b-0 sm:border-l lg:border-l-0 lg:border-r border-white/15 hover:border-white/30 transition-all duration-300 group">
                {/* Light black hover overlay (pure charcoal, blocks white backlight) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#252333] via-[#1c1a28] to-[#14131e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="relative z-10 text-xs sm:text-[12.5px] font-mono text-white/90 font-medium tracking-wider uppercase">
                  Intelligence
                </span>
                <div className="relative z-10 my-auto py-6 sm:py-8">
                  <h3 className="text-2xl sm:text-[25px] lg:text-[27px] xl:text-[29px] font-light tracking-[-0.03em] text-white leading-[1.2] mb-3">
                    Data-Driven Insights
                  </h3>
                  <p className="text-xs sm:text-[13px] font-light text-white/75 leading-relaxed max-w-sm">
                    Transforming information into accurate, meaningful intelligence for confident decision-making.
                  </p>
                </div>
                <span className="relative z-10 text-xs font-mono text-white/50 tracking-wider">
                  02
                </span>
              </div>

              {/* Column 3: Business Enablement */}
              <div className="relative rounded-none overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] p-6 sm:p-7 xl:p-8 bg-gradient-to-b from-white/[0.10] via-black/60 to-black/80 backdrop-blur-xl border-b sm:border-b-0 lg:border-r border-white/15 hover:border-white/30 transition-all duration-300 group">
                {/* Light black hover overlay (pure charcoal, blocks white backlight) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#252333] via-[#1c1a28] to-[#14131e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="relative z-10 text-xs sm:text-[12.5px] font-mono text-white/90 font-medium tracking-wider uppercase">
                  Scalable Growth
                </span>
                <div className="relative z-10 my-auto py-6 sm:py-8">
                  <h3 className="text-2xl sm:text-[25px] lg:text-[27px] xl:text-[29px] font-light tracking-[-0.03em] text-white leading-[1.2] mb-3">
                    Business Enablement
                  </h3>
                  <p className="text-xs sm:text-[13px] font-light text-white/75 leading-relaxed max-w-sm">
                    Supporting organizations with the tools, structure, and expertise needed for scalable growth.
                  </p>
                </div>
                <span className="relative z-10 text-xs font-mono text-white/50 tracking-wider">
                  03
                </span>
              </div>

              {/* Column 4: Intelligent Automation */}
              <div className="relative rounded-none overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] p-6 sm:p-7 xl:p-8 bg-gradient-to-b from-white/[0.10] via-black/60 to-black/80 backdrop-blur-xl sm:border-l lg:border-l-0 border-white/15 hover:border-white/30 transition-all duration-300 group">
                {/* Light black hover overlay (pure charcoal, blocks white backlight) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#252333] via-[#1c1a28] to-[#14131e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="relative z-10 text-xs sm:text-[12.5px] font-mono text-white/90 font-medium tracking-wider uppercase">
                  Workflows
                </span>
                <div className="relative z-10 my-auto py-6 sm:py-8">
                  <h3 className="text-2xl sm:text-[25px] lg:text-[27px] xl:text-[29px] font-light tracking-[-0.03em] text-white leading-[1.2] mb-3">
                    Intelligent Automation
                  </h3>
                  <p className="text-xs sm:text-[13px] font-light text-white/75 leading-relaxed max-w-sm">
                    Designing automated workflows that reduce complexity and drive operational excellence.
                  </p>
                </div>
                <span className="relative z-10 text-xs font-mono text-white/50 tracking-wider">
                  04
                </span>
              </div>

            </div>

        </div>
      </section>

      {/* =========================================================
          2. COMPANY STATISTICS & DELIVERABLES (EMBEDDED CONTINUOUS MODE)
          ========================================================= */}
      <CompanyStatisticsSection embedded />
    </div>
  );
}
