"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING_WORDS = ["Products", "Startups", "Tools", "Companies"];

// 6 Distinct Distorted, Organic Pure White Film Grain Frames (More Spread Out & Distorted)
const SVG_STATIC_NOISE_FRAMES = [
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n1'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n1)'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='15' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n3'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='32' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n3)'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n4'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='51' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n4)'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n5'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='73' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n5)'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n6'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.52 0.68' numOctaves='2' seed='96' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n6)'/%3E%3C/svg%3E")`,
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [grainFrame, setGrainFrame] = useState(0);

  // Rotate the last word smoothly every 2.8s
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // In-Place Re-Randomized Grain Shimmer (No Horizontal/Vertical Translation)
  useEffect(() => {
    const interval = setInterval(() => {
      setGrainFrame((prev) => (prev + 1) % SVG_STATIC_NOISE_FRAMES.length);
    }, 50); // 20 FPS in-place analog noise flicker
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("partner-marquee") || document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-testid="product-hero-section"
      className="hero relative z-10 w-full min-h-screen h-[100dvh] bg-black text-white flex flex-col justify-end overflow-hidden select-none font-['Manrope','Inter',sans-serif]"
    >
      {/* LAYER 0: HERO BACKGROUND IMAGE */}
      <img
        src="/product-hero-bg.png"
        alt="21Spheres - Turning Ideas into real Products"
        loading="eager"
        fetchPriority="high"
        className="hero-bg absolute inset-0 w-full h-full object-cover object-top brightness-[0.97] contrast-[1.08] z-0 pointer-events-none select-none"
      />

      {/* LAYER 1: DISTORTED SPREAD-OUT PURE WHITE FILM GRAIN (ZERO TRANSLATION) */}
      <div
        aria-hidden="true"
        className="grain-overlay absolute inset-0 w-full h-full z-[1] pointer-events-none mix-blend-screen opacity-[0.22]"
        style={{
          backgroundImage: SVG_STATIC_NOISE_FRAMES[grainFrame],
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* LAYER 2: HERO PSEUDO VIGNETTE (RADIAL GRADIENT) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* LAYER 3: HERO CONTENT (EXACT 1:1 REPLICA) */}
      <div className="hero-content relative z-[3] flex flex-col justify-end h-full w-full pointer-events-auto">

        {/* Main Headline & Subtitle */}
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-12 sm:pb-16 mt-auto flex flex-col justify-end pointer-events-auto">
          <div className="max-w-5xl">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6.6rem] 2xl:text-[7.2rem] font-normal tracking-[-0.035em] text-white leading-[1.06]"
            >
              Turning Ideas into
              <br />
              <span className="inline-flex items-baseline">
                <span className="text-white/35 font-light mr-3 sm:mr-4">real</span>
                <span className="text-white font-medium inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIdx]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {ROTATING_WORDS[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
              className="mt-6 sm:mt-8 max-w-lg lg:max-w-xl"
            >
              <p className="text-sm sm:text-base md:text-[15px] lg:text-[16px] text-white/70 font-light leading-relaxed">
                A product studio building AI-native tools for founders, operators,
                <br />
                and the people who refuse to wait for the future.
              </p>
            </motion.div>
          </div>

          {/* Bottom Right Large Geometric Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute right-6 sm:right-10 md:right-14 lg:right-16 bottom-6 sm:bottom-12 z-20 pointer-events-auto"
          >
            <button
              onClick={handleScrollDown}
              aria-label="Scroll down"
              className="group relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 text-white/20 group-hover:text-white/60 transition-all duration-300 transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"
              >
                <line
                  x1="16"
                  y1="16"
                  x2="124"
                  y2="124"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <polyline
                  points="64,124 124,124 124,64"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
