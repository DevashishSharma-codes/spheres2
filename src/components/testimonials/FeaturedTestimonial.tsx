"use client";

import React from "react";
import { BoxyQuoteMark } from "./BoxyQuoteMark";

export function FeaturedTestimonial() {
  return (
    <section
      data-testid="featured-testimonial-section"
      className="relative z-10 w-full min-h-[60vh] py-14 sm:py-20 md:py-24 select-none overflow-hidden flex items-center justify-center"
    >
      {/* =========================================================
          FULL-WIDTH WATERCOLOR BACKGROUND COLOR-GRADED:
          PURPLE, WHITE, GRAYISH, BLACK PALETTE
          ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/card-bgs/featured-testimonial-bg.jpg"
          alt="Purple watercolor section background"
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
        />
        {/* Deep purple & violet color grade overlay */}
        <div 
          className="absolute inset-0 mix-blend-color pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #7057D9 0%, #A855F7 35%, #4C1D95 70%, #150D2A 100%)"
          }}
        />
        {/* Cosmic depth and dark grayish-black vignette */}
        <div 
          className="absolute inset-0 mix-blend-multiply opacity-85 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124, 58, 237, 0.35) 0%, rgba(10, 6, 20, 0.95) 100%),
              linear-gradient(180deg, rgba(6, 4, 14, 0.7) 0%, rgba(15, 10, 30, 0.4) 50%, rgba(6, 4, 14, 0.8) 100%)
            `
          }}
        />
        {/* Micro dot matrix texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px] opacity-40 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Glass Screen Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="relative w-full rounded-none p-6 sm:p-10 md:p-12 lg:p-16 overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(168, 85, 247, 0.14) 100%)",
            backdropFilter: "blur(36px) saturate(200%)",
            WebkitBackdropFilter: "blur(36px) saturate(200%)",
            border: "1.5px solid rgba(255, 255, 255, 0.55)",
            boxShadow:
              "inset 0 2px 3px rgba(255, 255, 255, 0.75), inset 0 -1.5px 2px rgba(168, 85, 247, 0.25), 0 25px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Glass Top Specular Sheen Highlight */}
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none z-0" />
          
          {/* Glass Left Edge Ambient Light Reflection */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-0" />

          {/* Quote & Author Details Container */}
          <div className="relative z-10 flex flex-col justify-between h-full my-auto">
            {/* Big Boxy Quotation Marks Icon */}
            <BoxyQuoteMark />

            {/* High-Impact Featured Quote */}
            <h3 className="font-light text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.18] tracking-tight drop-shadow-sm max-w-4xl">
              There has been a lot of talk surrounding what works in digital products now. The answer is 21Spheres. Full Stop. 21Spheres is the next generation of product engineering.
            </h3>

            {/* Character Face & Author Info */}
            <div className="flex items-center gap-3.5 pt-6 sm:pt-8 md:pt-10">
              <div className="relative p-[2px] rounded-full bg-gradient-to-r from-white/90 via-[#C084FC] to-[#7057D9] shadow-md">
                <img
                  src="/testimonials/avatars/avatar-01.jpg"
                  alt="Keshav Malpani - CEO of Wealth Wisdom"
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-semibold text-white tracking-wide drop-shadow-xs">
                  Keshav Malpani
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#D8B4FE] font-medium">
                  CEO OF WEALTH WISDOM
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedTestimonial;

