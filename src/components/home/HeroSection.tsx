"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if browser policies restrict immediate autoplay
      });
    }
  }, []);

  return (
    <section id="hero" className="relative z-0 overflow-hidden bg-white">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
        <div className="flex flex-col gap-5 sm:gap-6">
          
          {/* Mobile Headline (compact 2 lines above video on mobile viewports) */}
          <div className="md:hidden">
            <h1 className="text-[36px] sm:text-[46px] font-light tracking-[-0.05em] leading-[0.92] text-[#2A2A2E]">
              <span className="block">Intelligence Built for Impact,</span>
              <span className="block">Not Illusion.</span>
            </h1>
          </div>

          {/* Generous, High-Quality 4K Video Space (aspect-1300/508 matching reference site) */}
          <div className="relative w-full aspect-[1300/508] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain block mix-blend-multiply"
            >
              <source src="/hero-purple.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Bottom Grid: 2-Line Headline (Left) & Right Text + CTAs (Fully in first screen) */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10 pt-2">
            
            {/* Desktop Headline: Exactly 2 clean lines, no multi-line wrapping */}
            <div className="flex-1 min-w-0">
              <h1 className="hidden md:block text-[44px] md:text-[54px] lg:text-[64px] xl:text-[72px] font-light tracking-[-0.05em] leading-[0.91] text-[#2A2A2E]">
                <span className="block">Intelligence Built for Impact,</span>
                <span className="block">Not Illusion.</span>
              </h1>
            </div>

            {/* Right Side: Narrative Copy & Both CTA Buttons (Positioned to fit in the first screen) */}
            <div className="flex max-w-[390px] shrink-0 flex-col items-start justify-start gap-4 lg:gap-5">
              <p className="text-[15px] sm:text-[16px] text-[#2A2A2E]/70 font-light leading-[1.35] tracking-[-0.01em]">
                A niche engineering studio architecting autonomous AI agent networks, sub-20ms digital platforms, and production systems with zero technical debt.
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="font-normal leading-[140%] relative z-0 group overflow-hidden tracking-[-0.01em] whitespace-nowrap transition-all cursor-pointer bg-[linear-gradient(100.63deg,#7057D9_-1.92%,#9A84F2_103.69%)] text-white px-[18px] md:px-[20px] py-[10px] md:py-3 text-[14px] sm:text-[16px] hover:opacity-95"
                >
                  Book a Demo
                </Link>

                <Link
                  href="/services"
                  className="font-normal leading-[140%] relative z-0 group overflow-hidden tracking-[-0.01em] whitespace-nowrap transition-all cursor-pointer bg-white hover:bg-[#FAF9F7] border border-[#2A2A2E]/10 px-[18px] md:px-[20px] py-[10px] md:py-3 text-[14px] sm:text-[16px] text-[#2A2A2E]"
                >
                  Explore Services
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
