"use client";

import FolderTabCard from "@/components/ui/FolderTabCard";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative z-0 overflow-hidden border-b border-[#DADADD]/70 py-14 sm:py-20 lg:py-24"
      style={{
        background: `
          radial-gradient(circle at 85% 15%, rgba(142, 121, 232, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 10% 80%, rgba(112, 87, 217, 0.06) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 255, 0.5) 100%),
          #FFFFFF
        `,
      }}
    >
      {/* Soft ethereal ambient purple glass diffusers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[110px] bg-[#8E79E8]/10" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full blur-[100px] bg-[#7057D9]/08" />
      </div>

      {/* FULL WIDTH WRAPPER WITH GENEROUS BREATHING ROOM */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col gap-12 sm:gap-16">
          
          {/* =========================================================
              1. TOP ROW: REFINED "ABOUT US" IN ONE SLEEK LINE
              ========================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-black select-none whitespace-nowrap">
                ABOUT US
              </h2>
            </div>

            {/* Mission Statement Hook */}
            <div className="max-w-md text-left sm:text-right pb-0.5">
              <p className="text-sm sm:text-base font-light text-black/85 leading-snug">
                Empowering businesses through intelligent, reliable technology.
              </p>
              <p className="text-xs font-mono text-black/45 mt-1 uppercase tracking-wider">
                Committed to advanced AI &amp; modern engineering.
              </p>
            </div>
          </div>

          {/* =========================================================
              2. THE MIDDLE PART: 4 SHARP FOLDER-TAB CARDS (CORE PILLARS)
              ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5 lg:gap-6 items-center justify-items-center w-full my-auto py-2">
            
            {/* Card 1: Strategic Technology */}
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Strategic Technology"
                subtitle="01 // MODERNIZATION"
                description="Guiding businesses with clear, actionable roadmaps for AI and digital modernization."
              />
            </div>

            {/* Card 2: Data-Driven Insights */}
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Data-Driven Insights"
                subtitle="02 // INTELLIGENCE"
                description="Transforming information into accurate, meaningful intelligence for confident decision-making."
              />
            </div>

            {/* Card 3: Business Enablement */}
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Business Enablement"
                subtitle="03 // SCALABLE GROWTH"
                description="Supporting organizations with the tools, structure, and expertise needed for scalable growth."
              />
            </div>

            {/* Card 4: Intelligent Automation */}
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Intelligent Automation"
                subtitle="04 // WORKFLOWS"
                description="Designing automated workflows that reduce complexity and drive operational excellence."
              />
            </div>

          </div>

          {/* =========================================================
              3. COMPANY STATISTICS (INTEGRATED AS PART OF ABOUT US)
              ========================================================= */}
          <CompanyStatisticsSection embedded />

      </div>
    </section>
  );
}
