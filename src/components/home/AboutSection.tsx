"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FolderTabCard from "@/components/ui/FolderTabCard";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";

const PHRASES = [
  "WE LISTEN",
  "WE DESIGN",
  "WE DELIVER",
  "EVERY STEP",
  "SHAPED AROUND YOU",
];

export function AboutSection() {
  const [activePhraseIdx, setActivePhraseIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhraseIdx((prev) => (prev + 1) % PHRASES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

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
              - Strategic Technology
              - Data-Driven Insights
              - Business Enablement
              - Intelligent Automation
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
              PREVIOUS METRIC CARDS (KEPT COMMENTED TO BE PLACED JUST BELOW)
              - 20+ — AI and Automation Modules
              - 10+ — Smart Web Applications
              - 5+ — Modern Mobile Apps
              - 15+ — Backend AI Modules
              =========================================================
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7 xl:gap-8 items-center justify-items-center w-full my-auto py-2">
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="AI & Automation"
                subtitle="Automation Modules"
                tagsCount="20+"
                tagsLabel="Modules"
                shotsCount="AI Systems"
              />
            </div>
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Smart Web"
                subtitle="Web Applications"
                tagsCount="10+"
                tagsLabel="Web Apps"
                shotsCount="Fullstack"
              />
            </div>
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Modern Mobile"
                subtitle="Mobile Apps"
                tagsCount="5+"
                tagsLabel="Mobile Apps"
                shotsCount="iOS & Android"
              />
            </div>
            <div className="w-full flex justify-center">
              <FolderTabCard
                title="Backend AI"
                subtitle="Backend AI Modules"
                tagsCount="15+"
                tagsLabel="Modules"
                shotsCount="High Scale"
              />
            </div>
          </div>
          */}

          {/* =========================================================
              3. BOTTOM ROW: CENTERED IN THE MIDDLE WITH BREATHING ROOM
                 - Kinetic cycling phrase ONE AT A TIME in BLACK
                 - Concise Narrative Paragraph Text
              ========================================================= */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto w-full pt-6 border-t border-black/10 gap-2.5">
            {/* Cycling Kinetic Text: Strictly ONE at a time in BLACK */}
            <div className="h-[40px] sm:h-[48px] lg:h-[52px] flex items-center justify-center overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhraseIdx}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-3xl lg:text-[38px] font-light tracking-[-0.04em] leading-none text-black select-none whitespace-nowrap"
                >
                  {PHRASES[activePhraseIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Concise Centered Narrative Paragraph */}
            <p className="text-xs sm:text-sm lg:text-[14px] text-black/70 font-light leading-relaxed max-w-2xl">
              At 21 Spheres, we empower organizations through advanced AI, automation, and modern engineering — built with precision, designed for scalability, and aligned with real business goals.
            </p>
          </div>

          {/* =========================================================
              4. COMPANY STATISTICS (INTEGRATED AS PART OF ABOUT US)
              - 5+ Modern Mobile Apps
              - 10+ Smart Web Applications
              - 15+ Backend AI & 20+ Automation Modules
              ========================================================= */}
          <CompanyStatisticsSection embedded />

      </div>
    </section>
  );
}
