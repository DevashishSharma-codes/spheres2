"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { INDUSTRIES_CONTENT } from "@/content/industries";

export function IndustriesLandingSection() {
  const industries = INDUSTRIES_CONTENT.items;
  const [activeIdx, setActiveIdx] = useState(0);

  const activeIndustry = industries[activeIdx] || industries[0];

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + industries.length) % industries.length);
  }, [industries.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % industries.length);
  }, [industries.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // One shared, black-dominant field behind the heading and showcase.
  const sectionBackground = {
    background: `
      radial-gradient(ellipse 112% 115% at 78% 44%, rgba(91, 64, 132, 0.24) 0%, rgba(61, 43, 89, 0.14) 48%, transparent 82%),
      linear-gradient(112deg, #030306 0%, #08070d 44%, #100b19 74%, #07060b 100%)
    `,
  };

  return (
    <section
      id="industries"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative z-10 m-0 flex h-[calc(100vh-3.5rem)] w-full select-none flex-col overflow-hidden border-y border-white/10 p-0 text-white outline-none scroll-mt-14 sm:h-[calc(100vh-4rem)] sm:scroll-mt-16"
      style={sectionBackground}
    >
      <header className="relative z-20 mx-auto flex w-full max-w-[1380px] shrink-0 flex-col gap-2 border-b border-white/10 bg-transparent px-4 py-3.5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
        <div className="shrink-0">
          <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#C8B4FF] sm:text-[13px]">
            Our expertise
          </p>
          <h2 className="whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[52px]">
            Industries
          </h2>
        </div>
        <p className="max-w-lg pb-0.5 text-xs leading-relaxed text-white/65 sm:text-right sm:text-[13px]">
          Purpose-built systems for the sectors moving the world forward.
        </p>
      </header>

      {/* FULL-WIDTH INDUSTRY SHOWCASE, UNDER THE SHARED HEADER */}
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden p-0 lg:grid-cols-12">

        {/* =========================================================
            LEFT COLUMN (58% / lg:col-span-7): FULL-HEIGHT SHOWCASE CARD
            ========================================================= */}
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden border-b border-white/10 px-6 py-4 sm:px-8 sm:py-5 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-10 lg:py-6">

          {/* Background Grayscale Image with Crossfade */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0.65, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.65, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 z-0 overflow-hidden"
            >
              <img
                src={activeIndustry.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85"}
                alt={activeIndustry.name}
                className="h-full w-full object-cover grayscale brightness-90 contrast-125"
              />
              {/* Keep the image legible while letting the shared purple wash show through. */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10091b]/80 via-black/42 to-black/48 z-10 pointer-events-none" />
              {/* Micro dot matrix texture */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none z-10 opacity-50 mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>

          {/* Top Eyebrow Row */}
          <div className="relative z-20 flex items-center justify-between text-white/90 shrink-0">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/70">
              21SPHERES STUDIO • INDUSTRIES
            </span>

            <span className="font-mono text-[11px] sm:text-xs text-white/80 bg-black/50 backdrop-blur-md px-3 py-0.5 sm:py-1 rounded-full border border-white/15">
              0{activeIdx + 1} / 0{industries.length}
            </span>
          </div>

          {/* Bottom Content Info Block */}
          <div className="relative z-20 mt-auto pb-1 sm:pb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id + "-card-info"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Link
                  href={`/industries/${activeIndustry.id}`}
                  className="mb-2 inline-block text-2xl font-light leading-tight tracking-tight text-white drop-shadow-md transition hover:text-[#D8B4FE] sm:text-3xl lg:text-[34px] xl:text-4xl"
                >
                  {activeIndustry.name}
                </Link>

                <p className="text-xs sm:text-[13px] font-light text-white/80 max-w-xl leading-relaxed">
                  {activeIndustry.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN (42% / lg:col-span-5): GRADIENT BACKGROUND
            PERFECT SINGLE SCREEN FIT, ZERO INSIDE SCROLL, PROPORTIONAL SPACE
            ========================================================= */}
        <div
          className="relative flex h-full w-full flex-col justify-between overflow-hidden border-t border-white/10 bg-transparent px-5 py-4 sm:px-7 sm:py-5 lg:col-span-5 lg:border-t-0 lg:px-8 lg:py-6"
        >
          {/* Industry list; the shared section title already labels this column. */}
          <div className="relative z-10 my-auto py-2 flex flex-col justify-center gap-1 sm:gap-1.5 overflow-hidden">
            {industries.map((ind, idx) => {
              const isActive = idx === activeIdx;

              return (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.id}`}
                  aria-label={`Explore ${ind.name} industry`}
                  className="group relative block cursor-pointer py-1 sm:py-1.5 opacity-100 transition-all duration-200"
                >
                  {/* Meta Index */}
                  <div className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 transition-colors ${isActive ? "text-[#D8B4FE]" : "text-white/70 group-hover:text-white"
                    }`}>
                    0{idx + 1}
                  </div>

                  {/* Industry Name - Bright & Highlighted for all */}
                  <h3
                    className={`transition-all duration-200 ${isActive
                        ? "text-base sm:text-lg lg:text-[19px] font-semibold text-white tracking-tight drop-shadow-[0_0_12px_rgba(192,132,252,0.35)]"
                        : "text-sm sm:text-base lg:text-[17px] font-normal text-white/90 group-hover:text-white"
                      }`}
                  >
                    {ind.name}
                  </h3>

                  {/* Expanded Subhead on Active */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] sm:text-xs font-light text-white/85 leading-relaxed pt-0.5 pb-1 line-clamp-2">
                          {ind.subhead || ind.description}
                        </p>

                        <div className="flex items-center justify-end pt-0.5 text-[11px] font-mono text-[#C084FC] transition-colors group-hover:text-white">
                          <span>View Details ↗</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Straight Line: Running Light Beam ONLY on the Selected Industry */}
                  <div className="relative mt-1 sm:mt-1.5 h-[1.5px] w-full overflow-hidden rounded-full bg-white/15">
                    {isActive ? (
                      <>
                        {/* Base active purple gradient */}
                        <motion.div
                          layoutId="activeIndustryLine"
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7057D9] via-[#A855F7] to-[#C084FC] rounded-full w-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                        {/* Soft glowing purple halo beam */}
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "260%" }}
                          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                          className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent filter blur-[3px] opacity-90 pointer-events-none"
                        />
                        {/* Crisp moving light beam with bright white/purple core */}
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "260%" }}
                          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                          className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-[#7E22CE] via-[#FFFFFF] via-[#C084FC] to-transparent opacity-100 pointer-events-none"
                        />
                      </>
                    ) : (
                      <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/20 transition-colors" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Stepper Arrow Buttons & Details Link */}
          <div className="relative z-10 pt-2 sm:pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-white/60 font-mono shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Industry"
                title="Previous Industry"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#7057D9] transition-all border border-white/15 cursor-pointer active:scale-95 shadow-sm"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Industry"
                title="Next Industry"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#7057D9] transition-all border border-white/15 cursor-pointer active:scale-95 shadow-sm"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <Link
              href={`/industries/${activeIndustry.id}`}
              className="inline-flex items-center gap-1 text-[#C084FC] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>View Full Specs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}
export default IndustriesLandingSection;
