"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { WORK_FLOORPLAN_STEPS } from "@/content/howWeWork";

interface HowWeWorkFloorplanSectionProps {
  embedded?: boolean;
}

export function HowWeWorkFloorplanSection({ embedded = false }: HowWeWorkFloorplanSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(5);

  const activeStep = WORK_FLOORPLAN_STEPS[activeIndex];
  const fromStep = WORK_FLOORPLAN_STEPS[prevIndexRef.current];

  const handleSelectIndex = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    prevIndexRef.current = activeIndex;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    prevIndexRef.current = activeIndex;
    setActiveIndex((curr) => (curr + 1) % WORK_FLOORPLAN_STEPS.length);
  };

  const handlePrev = () => {
    prevIndexRef.current = activeIndex;
    setActiveIndex((curr) => (curr - 1 + WORK_FLOORPLAN_STEPS.length) % WORK_FLOORPLAN_STEPS.length);
  };

  // Continuous auto-cycle every 4.0 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((curr) => {
        prevIndexRef.current = curr;
        return (curr + 1) % WORK_FLOORPLAN_STEPS.length;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="how-we-work" 
      className="relative w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[880px] flex flex-col justify-between text-[#1D1D1F] pt-3 pb-4 sm:pt-4 sm:pb-5 overflow-hidden border-b border-[#E5E5EA]"
      style={{
        background: `
          radial-gradient(ellipse 90% 50% at 50% 100%, rgba(124, 58, 237, 0.22) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 75%),
          radial-gradient(ellipse 50% 40% at 100% 100%, rgba(124, 58, 237, 0.14) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 0% 100%, rgba(147, 51, 234, 0.12) 0%, transparent 60%),
          linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 38%, #FAF6FF 60%, #F2E7FE 85%, #EADBFE 100%)
        `,
      }}
    >
      {/* Subtle bottom purple ambient glow so white top remains pure and gradient is evident */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[900px] h-[380px] rounded-full blur-[140px] bg-[#7C3AED]/16" />
      </div>

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-1 min-h-0 gap-2 sm:gap-3 lg:gap-4">
        
        {/* =========================================================
            1. SECTION HEADER (SAME SCALE AS ABOUT US & SERVICES - FULL BLACK)
        ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 shrink-0">
          <div className="flex flex-col items-start">
            <span className="text-[12px] sm:text-[13px] font-bold text-[#7C3AED] tracking-[0.18em] uppercase mb-1">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-black select-none">
              How We Work
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#6E6E73] font-light leading-relaxed max-w-md sm:text-right pb-0.5">
            A disciplined 6-stage engineering sprint methodology from discovery to global launch.
          </p>
        </div>

        {/* =========================================================
            2. MAIN 2-COLUMN STAGE CANVAS (ONE SCREEN FIT, NO CURVED BOX)
        ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 min-h-0">
          
          {/* =========================================================
              LEFT COLUMN (6 cols): ARCHITECTURAL BLUEPRINT
              - Clean white architectural sheet with hairline border
              - Thin crisp purple marching line (strokeWidth 1.6, no glow)
              - 6 hotspot nodes with step numbers only
          ========================================================= */}
          <div className="lg:col-span-6 flex items-center justify-center h-full">
            <div className="relative w-full rounded-2xl bg-white p-3 sm:p-4 border border-[#E5E5EA] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden select-none flex items-center justify-center">
              
              {/* Precision Image Container: Exactly bounds the image so coordinates map 1:1 */}
              <div className="relative w-full max-w-[530px] overflow-hidden">
                <img
                  src="/studio-floorplan.png"
                  alt="Studio Architectural Floorplan"
                  className="w-full h-auto block object-contain select-none pointer-events-none"
                  loading="eager"
                />

                {/* Clean Purple Marching Line only when activeIndex > 0 (No line after 6, resets directly to 1) */}
                {activeIndex > 0 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                    <motion.line
                      key={`line-${fromStep.id}->${activeStep.id}`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        strokeDashoffset: [0, -24],
                      }}
                      transition={{
                        opacity: { duration: 0.2 },
                        strokeDashoffset: { duration: 0.85, ease: "linear", repeat: Infinity },
                      }}
                      x1={fromStep.coord.left}
                      y1={fromStep.coord.top}
                      x2={activeStep.coord.left}
                      y2={activeStep.coord.top}
                      stroke="#7C3AED"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* 6 Stage Marker Hotspots (Step numbers only) */}
                {WORK_FLOORPLAN_STEPS.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  const isCompleted = idx < activeIndex;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleSelectIndex(idx)}
                      onMouseEnter={() => handleSelectIndex(idx)}
                      style={{
                        top: step.coord.top,
                        left: step.coord.left,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute z-20 cursor-pointer focus:outline-none flex items-center justify-center p-0 m-0 border-0 bg-transparent"
                      aria-label={`Inspect Stage ${step.step} - ${step.title}`}
                    >
                      {isActive ? (
                        /* Active Stage: Purple Diamond with Step Number Only */
                        <div className="relative flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                            transition={{ duration: 2.0, repeat: Infinity, ease: "easeOut" }}
                            className="absolute -inset-1.5 rounded-full bg-[#7C3AED]/35 pointer-events-none"
                          />
                          <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 450, damping: 25 }}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] rotate-45 bg-[#7C3AED] text-white flex items-center justify-center border-2 border-white shadow-[0_4px_16px_rgba(124,58,237,0.45)]"
                          >
                            <span className="-rotate-45 font-mono text-[10px] sm:text-[11px] font-bold text-white">
                              {step.step}
                            </span>
                          </motion.div>
                        </div>
                      ) : isCompleted ? (
                        /* Completed Stage: Filled Black Circle */
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white font-mono text-[9.5px] sm:text-[10px] font-bold shadow-xs flex items-center justify-center">
                          0{idx + 1}
                        </div>
                      ) : (
                        /* Upcoming Stage: Clean Numbered White and Grey Circle */
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-[#D2D2D7] text-[#86868B] font-mono text-[9.5px] sm:text-[10px] font-semibold shadow-xs flex items-center justify-center hover:border-black hover:text-black transition-all">
                          0{idx + 1}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (6 cols): PROPER 6 STEPS & CLEAR IMAGE SHOWCASE
              - Continuous moving line animation 1 -> 2 -> 3 -> 4 -> 5 -> 6
              - NO line after 6 (stops strictly at 6 and resets to 1)
              - High-resolution clear 16:9 image with ample space
              - Clear piece of info + Prev/Next + See Details button
          ========================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full py-0.5">
            
            {/* 1. Proper 6 Steps Progression Stepper with Continuous Moving Line (1 to 6) */}
            <div className="w-full mb-2 sm:mb-2.5">
              {/* Row 1: The 6 Circles with exactly 5 continuous moving line segments between them (NO line after 6) */}
              <div className="flex items-center justify-between">
                {WORK_FLOORPLAN_STEPS.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  const isCompleted = idx < activeIndex;
                  const hasNext = idx < WORK_FLOORPLAN_STEPS.length - 1;

                  return (
                    <React.Fragment key={step.id}>
                      {/* Step Circle Button: White and Grey initially, fills with Black as steps progress */}
                      <button
                        type="button"
                        onClick={() => handleSelectIndex(idx)}
                        className="flex items-center justify-center cursor-pointer focus:outline-none shrink-0"
                        aria-label={`Go to Stage ${step.step} - ${step.title}`}
                      >
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10.5px] sm:text-[11px] font-semibold transition-all duration-300 ${
                          isActive 
                            ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] scale-110 ring-4 ring-black/20 ring-offset-2 ring-offset-white font-bold" 
                            : isCompleted
                            ? "bg-black text-white font-bold"
                            : "bg-white text-[#86868B] border border-[#D2D2D7] hover:border-black hover:text-black"
                        }`}>
                          {step.step}
                        </div>
                      </button>

                      {/* Continuous Moving Line Segment between this step and the next (none after 6) */}
                      {hasNext && (
                        <div className="flex-1 mx-1.5 sm:mx-2 relative h-[2.5px] bg-[#E5E5EA] overflow-hidden rounded-full">
                          {/* Completed Segments: Solid Black */}
                          {isCompleted && (
                            <div className="absolute inset-0 bg-black" />
                          )}

                          {/* Active Segment: Continuous Moving Animation in Black */}
                          {isActive && (
                            <motion.div
                              key={`moving-segment-${idx}`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 4.0, ease: "linear" }}
                              className="absolute inset-0 bg-black origin-left"
                            >
                              {/* Leading pulse tip */}
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.6)]" />
                            </motion.div>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Row 2: Step Titles Underneath */}
              <div className="hidden sm:flex items-start justify-between mt-1.5">
                {WORK_FLOORPLAN_STEPS.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleSelectIndex(idx)}
                      className={`w-8 sm:w-16 text-center cursor-pointer focus:outline-none text-[10px] sm:text-[10.5px] font-medium tracking-tight transition-colors line-clamp-1 truncate ${
                        isActive ? "text-[#1D1D1F] font-semibold" : "text-[#86868B] hover:text-[#1D1D1F]"
                      }`}
                    >
                      {step.title.split("&")[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Active Step Content: Clear Image, Info & Action */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col justify-start"
              >
                {/* Clear, High-Resolution Image Preview (Aspect Ratio 16:9, compact and sharp) */}
                <div className="relative w-full aspect-[16/9] max-h-[200px] sm:max-h-[225px] lg:max-h-[235px] rounded-2xl overflow-hidden bg-white border border-[#E5E5EA] shadow-sm group">
                  <Image
                    src={activeStep.image}
                    alt={activeStep.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Nice Piece of Info: Step Number, Room, Prev/Next Arrows, Title & Description (Tightened Spacing) */}
                <div className="flex flex-col gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10.5px] sm:text-[11px] text-[#7C3AED] font-semibold tracking-wider uppercase">
                      <span>STAGE {activeStep.step}</span>
                      <span className="text-[#D2D2D7]">/</span>
                      <span className="text-[#86868B] font-medium">{activeStep.room}</span>
                    </div>

                    {/* Prev / Next Stepper Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#7C3AED]/20 text-[#1D1D1F] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xs"
                        title="Previous Stage"
                        aria-label="Previous Stage"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#7C3AED]/20 text-[#1D1D1F] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xs"
                        title="Next Stage"
                        aria-label="Next Stage"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-light text-[#1D1D1F] tracking-tight leading-tight">
                    {activeStep.title}
                  </h3>

                  <p className="text-xs sm:text-[12.5px] text-[#515154] leading-relaxed font-light max-w-xl">
                    {activeStep.description}
                  </p>
                </div>

                {/* See Details Button (More breathing room above, sleek compact button) */}
                <div className="mt-4 sm:mt-5 pb-0">
                  <Link
                    href={`/how-we-work#${activeStep.id}`}
                    onClick={(e) => {
                      if (typeof window !== "undefined" && window.location.pathname.includes("/how-we-work")) {
                        e.preventDefault();
                        window.location.hash = activeStep.id;
                        const el = document.getElementById(activeStep.id) || document.getElementById("sprint-stages");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#1D1D1F] hover:bg-[#7C3AED] text-white text-xs sm:text-[12.5px] font-medium tracking-tight shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <span>See Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowWeWorkFloorplanSection;
