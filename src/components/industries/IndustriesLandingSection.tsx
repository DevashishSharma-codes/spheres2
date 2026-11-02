"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ArrowRight,
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  ShieldCheck
} from "lucide-react";
import { INDUSTRIES_CONTENT } from "@/content/industries";
import { IndustryItem } from "@/types";

export function IndustriesLandingSection() {
  const industries = INDUSTRIES_CONTENT.items;
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalIndustry, setModalIndustry] = useState<IndustryItem | null>(null);

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

  // Close modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalIndustry(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll during modal view
  useEffect(() => {
    if (modalIndustry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndustry]);

  // Left & Section Background: deep cosmic dark purple
  const sectionBackground = {
    background: `
      radial-gradient(ellipse 85% 55% at 50% 65%, rgba(124, 58, 237, 0.20) 0%, rgba(79, 28, 145, 0.08) 45%, transparent 78%),
      radial-gradient(ellipse 65% 35% at 50% 20%, rgba(99, 40, 190, 0.10) 0%, transparent 70%),
      linear-gradient(180deg, #040308 0%, #060511 25%, #0A0718 60%, #060410 85%, #030207 100%)
    `,
  };

  // Right Side Gradient: dark purple / violet gradient
  const rightColumnGradient = {
    background: `
      radial-gradient(ellipse 90% 70% at 100% 40%, rgba(124, 58, 237, 0.24) 0%, rgba(79, 28, 145, 0.08) 50%, transparent 80%),
      radial-gradient(ellipse 70% 50% at 20% 90%, rgba(168, 85, 247, 0.14) 0%, transparent 60%),
      linear-gradient(140deg, #0E0822 0%, #090516 40%, #05030C 100%)
    `,
  };

  return (
    <section
      id="industries"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative z-10 w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] max-h-[calc(100dvh-3.5rem)] sm:max-h-[calc(100dvh-4rem)] scroll-mt-14 sm:scroll-mt-16 text-white select-none overflow-hidden outline-none border-t border-b border-white/10 m-0 p-0"
      style={sectionBackground}
    >
      {/* FULL-SCREEN 12-COLUMN STAGE (PERFECT ONE SCREEN FIT BELOW NAVBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full overflow-hidden m-0 p-0">

        {/* =========================================================
            LEFT COLUMN (58% / lg:col-span-7): FULL-HEIGHT SHOWCASE CARD
            ========================================================= */}
        <div className="lg:col-span-7 h-full w-full bg-[#05030A] px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 flex flex-col justify-between overflow-hidden relative border-b lg:border-b-0 lg:border-r border-white/10">

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
              {/* Dark vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/40 z-10 pointer-events-none" />
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
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-4xl font-light text-white leading-tight tracking-tight mb-2 drop-shadow-md">
                  {activeIndustry.name}
                </h2>

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
          className="lg:col-span-5 h-full w-full px-5 sm:px-7 lg:px-8 py-4 sm:py-5 lg:py-6 flex flex-col justify-between overflow-hidden relative border-t lg:border-t-0"
          style={rightColumnGradient}
        >
          {/* Subtle ambient light overlay on right side */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.04] via-transparent to-black/30 pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between pb-2 sm:pb-2.5 border-b border-white/15 shrink-0">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/70">
              INDUSTRIES
            </span>

            <span className="font-mono text-[11px] sm:text-xs text-white/50">
              0{activeIdx + 1} / 0{industries.length}
            </span>
          </div>

          {/* List Menu (All 7 highlighted with high contrast, running light beam ONLY on selected industry) */}
          <div className="relative z-10 my-auto py-2 flex flex-col justify-center gap-1 sm:gap-1.5 overflow-hidden">
            {industries.map((ind, idx) => {
              const isActive = idx === activeIdx;

              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className="group relative cursor-pointer py-1 sm:py-1.5 opacity-100 transition-all duration-200"
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

                        <div className="flex items-center justify-end pt-0.5 text-[11px] font-mono">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalIndustry(ind);
                            }}
                            className="text-[#C084FC] hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>View Details ↗</span>
                          </button>
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
                </div>
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

            <button
              onClick={() => setModalIndustry(activeIndustry)}
              className="inline-flex items-center gap-1 text-[#C084FC] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>View Full Specs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* =========================================================
          INTERACTIVE SPECIFICATION MODAL
          ========================================================= */}
      <AnimatePresence>
        {modalIndustry && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-2xl overflow-y-auto">
            <div
              className="absolute inset-0"
              onClick={() => setModalIndustry(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-3xl bg-[#0A0716] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4 bg-gradient-to-b from-white/[0.04] to-transparent">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#D8B4FE] mb-1">
                    0{industries.findIndex((i) => i.id === modalIndustry.id) + 1} • SPECIFICATIONS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                    {modalIndustry.name}
                  </h3>
                </div>

                <button
                  onClick={() => setModalIndustry(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                    EXECUTIVE OVERVIEW
                  </div>
                  <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">
                    {modalIndustry.description}
                  </p>
                </div>

                {modalIndustry.capabilities && modalIndustry.capabilities.length > 0 && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span>KEY ARCHITECTURAL CAPABILITIES</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {modalIndustry.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C084FC] shrink-0" />
                          <span className="text-xs sm:text-[13px] text-white/90 font-light">
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalIndustry.architectureNotes && modalIndustry.architectureNotes.length > 0 && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span>SRS BLUEPRINT & COMPLIANCE</span>
                    </div>
                    <div className="space-y-2">
                      {modalIndustry.architectureNotes.map((note, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-[13px] text-white/80 font-light leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-[#C084FC] font-mono font-semibold pt-0.5">•</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalIndustry.clientSnippet && (
                  <div className="p-4 rounded-xl bg-[#7057D9]/10 border border-[#7057D9]/30 text-xs sm:text-[13px] text-white/85 font-light leading-relaxed">
                    <span className="font-mono text-[10px] uppercase text-[#D8B4FE] block mb-1 tracking-wider">
                      PRODUCTION DEPLOYMENT
                    </span>
                    {modalIndustry.clientSnippet}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-white/50 font-light text-center sm:text-left">
                  Ready to deploy dedicated engineering squads in this sector?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setModalIndustry(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs sm:text-[13px] text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Close Specs
                  </button>
                  <Link
                    href="/contact"
                    onClick={() => setModalIndustry(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#7057D9] hover:bg-[#8369ec] text-white text-xs sm:text-[13px] font-medium tracking-tight shadow-lg shadow-purple-900/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <span>Discuss Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
export default IndustriesLandingSection;
