"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<"words" | "wave" | "video">("words");
  const [replayKey, setReplayKey] = useState(0);

  // 3-Step Orchestrated Sequence:
  // Step 1: Words load and appear cleanly first (no wave or video distraction)
  // Step 2: The wave animation enters and sweeps edge-to-edge
  // Step 3: Smooth cross-dissolve into the video with zero overlapping
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Step 2: Wave animation starts after words have fully settled and been read
    const waveTimer = setTimeout(() => {
      setStage("wave");
    }, 2200);

    // Pre-start video playback silently right before the cross-fade
    const playTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, 3700);

    // Step 3: Transition to video (smooth cross-dissolve)
    const videoTimer = setTimeout(() => {
      setStage("video");
    }, 4000);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(playTimer);
      clearTimeout(videoTimer);
    };
  }, [replayKey]);

  const handleReplay = useCallback(() => {
    setStage("words");
    setReplayKey((k) => k + 1);
  }, []);

  const handleSkipToVideo = useCallback(() => {
    if (stage !== "video") {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
      setStage("video");
    }
  }, [stage]);

  // Words list for line 1 and line 2
  const line1Words = [
    { text: "Intelligence", isGradient: false },
    { text: "Built", isGradient: false },
    { text: "for", isGradient: false },
    { text: "Impact,", isGradient: true },
  ];

  const line2Words = [
    { text: "Not", isGradient: false },
    { text: "Illusion.", isGradient: true },
  ];

  const isVideo = stage === "video";
  const showWave = stage === "wave" || stage === "video";

  return (
    <>
      {/* Screen 1: First screen with ONLY the video (edge-to-edge wave from very left to right) and the two buttons */}
      <section
        id="hero"
        className="relative z-0 overflow-hidden bg-white min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center py-4 sm:py-6"
      >
        {/* Whole First Page Ambient Purple Radial Gradient Glow (ONLY in animation, smoothly fades out for the video) */}
        <AnimatePresence>
          {!isVideo && (
            <motion.div
              key="hero-ambient-gradient"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
              }}
              className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
            >
              {/* Panoramic primary purple aura covering the entire screen */}
              <div className="w-[140vw] max-w-[1900px] h-[115%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(112,87,217,0.22)_0%,rgba(154,132,242,0.13)_38%,rgba(112,87,217,0.04)_68%,transparent_85%)] blur-3xl transform -translate-y-2" />
              {/* Top radiant wash under navbar */}
              <div className="absolute top-0 w-full h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(154,132,242,0.12)_0%,transparent_70%)] blur-2xl" />
              {/* Bottom gentle wash behind buttons */}
              <div className="absolute bottom-0 w-full h-[45%] bg-[radial-gradient(ellipse_at_bottom,rgba(112,87,217,0.08)_0%,transparent_70%)] blur-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex flex-col items-center justify-center flex-1 my-auto relative z-10">
          
          {/* Edge-to-Edge 4K Video + Wave Motion Stage: 100% width with NO side margins */}
          <div
            className="relative w-full aspect-[1300/508] max-h-[64vh] overflow-hidden flex items-center justify-center select-none bg-transparent"
          >
            {/* The 4K Wave Video (STRICTLY hidden on load; blends continuously onto whole-page purple gradient) */}
            <div
              style={{
                opacity: isVideo ? 1 : 0,
                visibility: isVideo ? "visible" : "hidden",
                transition: "opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className={`w-full h-full flex items-center justify-center ${
                !isVideo ? "pointer-events-none" : ""
              }`}
            >
              <video
                ref={videoRef}
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

            {/* Integrated Intro Layer: Words first, then wave animation, then smooth cross-dissolve into video */}
            <AnimatePresence>
              {!isVideo && (
                <motion.div
                  key={`intro-${replayKey}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
                  }}
                  onClick={handleSkipToVideo}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer select-none"
                  title="Click to skip to video"
                >
                  {/* Layer 0: Concentrated core purple aura during intro */}
                  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
                    <div className="w-[85%] max-w-[1100px] h-[85%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(112,87,217,0.16)_0%,rgba(154,132,242,0.08)_50%,transparent_80%)] blur-2xl" />
                  </div>

                  {/* Layer 1 (z-10): Harmonic Wave Lines (BEHIND the words) */}
                  <AnimatePresence>
                    {showWave && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 z-10 pointer-events-none overflow-hidden w-full h-full"
                      >
                        <svg
                          viewBox="0 0 1600 400"
                          preserveAspectRatio="none"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full block"
                        >
                          <defs>
                            <linearGradient id="waveEdgeFull1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#7057D9" stopOpacity="0" />
                              <stop offset="5%" stopColor="#7057D9" stopOpacity="0.95" />
                              <stop offset="50%" stopColor="#9A84F2" stopOpacity="1" />
                              <stop offset="95%" stopColor="#7057D9" stopOpacity="0.95" />
                              <stop offset="100%" stopColor="#7057D9" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="waveEdgeFull2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#9A84F2" stopOpacity="0" />
                              <stop offset="6%" stopColor="#8E79E8" stopOpacity="0.9" />
                              <stop offset="55%" stopColor="#7057D9" stopOpacity="0.95" />
                              <stop offset="94%" stopColor="#8E79E8" stopOpacity="0.9" />
                              <stop offset="100%" stopColor="#9A84F2" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="waveEdgeFull3" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8E79E8" stopOpacity="0" />
                              <stop offset="7%" stopColor="#B8A7F6" stopOpacity="0.85" />
                              <stop offset="70%" stopColor="#7057D9" stopOpacity="0.85" />
                              <stop offset="93%" stopColor="#8E79E8" stopOpacity="0.85" />
                              <stop offset="100%" stopColor="#8E79E8" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Harmonic Wave 1: Primary carrier wave spanning from 0 to 1600 (very left to very right) */}
                          <motion.path
                            d="M 0 200 C 260 80, 560 320, 860 180 C 1160 40, 1400 300, 1600 200"
                            stroke="url(#waveEdgeFull1)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.6,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Harmonic Wave 2: Counter undulating ribbon across full width */}
                          <motion.path
                            d="M 0 200 C 300 310, 600 90, 900 290 C 1200 410, 1440 120, 1600 200"
                            stroke="url(#waveEdgeFull2)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.65,
                              delay: 0.08,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Harmonic Wave 3: Upper harmonic ribbon */}
                          <motion.path
                            d="M 0 190 C 240 110, 540 280, 840 160 C 1140 70, 1395 270, 1600 195"
                            stroke="url(#waveEdgeFull3)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.55,
                              delay: 0.12,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Harmonic Wave 4: Lower harmonic ribbon */}
                          <motion.path
                            d="M 0 210 C 280 290, 580 120, 880 270 C 1180 380, 1420 140, 1600 205"
                            stroke="url(#waveEdgeFull1)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.6,
                              delay: 0.16,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Harmonic Wave 5: Dotted technical frequency line extending across both sides */}
                          <motion.path
                            d="M 0 205 C 290 270, 590 140, 890 250 C 1190 340, 1410 160, 1600 200"
                            stroke="#9A84F2"
                            strokeWidth="1.4"
                            strokeDasharray="5 6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.5,
                              delay: 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Layer 2 (z-15): Soft Center Clarity Veil (Softens wave lines directly behind text while letting purple aura glow through) */}
                  <div className="absolute inset-0 z-15 pointer-events-none flex items-center justify-center">
                    <div className="w-[75%] max-w-[720px] h-[52%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.35)_50%,transparent_75%)] blur-md" />
                  </div>

                  {/* Layer 3 (z-20): Word-by-Word Animated Headline (ABOVE the animation for razor-sharp clarity) */}
                  <div className="relative z-20 px-4 text-center">
                    <h2 className="text-[30px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[74px] font-light tracking-[-0.045em] leading-[1.0] text-[#2A2A2E]">
                      {/* Line 1: Word by word */}
                      <span className="block mb-1 sm:mb-1.5">
                        {line1Words.map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 16, filter: "blur(6px)", scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            transition={{
                              duration: 0.38,
                              delay: 0.08 + idx * 0.18,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`inline-block mr-[0.26em] last:mr-0 ${
                              item.isGradient
                                ? "bg-[linear-gradient(100.63deg,#7057D9_-1.92%,#9A84F2_103.69%)] bg-clip-text text-transparent font-light"
                                : ""
                            }`}
                          >
                            {item.text}
                          </motion.span>
                        ))}
                      </span>

                      {/* Line 2: Word by word */}
                      <span className="block">
                        {line2Words.map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 16, filter: "blur(6px)", scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            transition={{
                              duration: 0.38,
                              delay: 0.08 + (line1Words.length * 0.18) + idx * 0.2,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`inline-block mr-[0.26em] last:mr-0 ${
                              item.isGradient
                                ? "bg-[linear-gradient(100.63deg,#7057D9_-1.92%,#9A84F2_103.69%)] bg-clip-text text-transparent font-light"
                                : ""
                            }`}
                          >
                            {item.text}
                          </motion.span>
                        ))}
                      </span>
                    </h2>
                  </div>

                  {/* Subtle accent rule that appears with the final word (z-20) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.15, ease: "easeOut" }}
                    className="relative z-20 mx-auto mt-4 sm:mt-5 w-36 sm:w-52 h-[1px] bg-gradient-to-r from-transparent via-[#7057D9]/50 to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Discreet Replay Button (available when video is playing) */}
            {stage === "video" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReplay();
                }}
                className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#2A2A2E]/60 hover:text-[#7057D9] bg-white/85 hover:bg-white backdrop-blur-sm border border-[#DADADD]/70 hover:border-[#7057D9]/40 transition-all rounded shadow-xs cursor-pointer"
                title="Replay intro sequence"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Replay Intro</span>
              </motion.button>
            )}
          </div>

          {/* The Two Action Buttons centered below */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4 w-full sm:w-auto z-10">
            <Link
              href="/contact"
              className="font-normal leading-[140%] relative z-0 group overflow-hidden tracking-[-0.01em] whitespace-nowrap transition-all cursor-pointer bg-[linear-gradient(100.63deg,#7057D9_-1.92%,#9A84F2_103.69%)] text-white px-[20px] md:px-[24px] py-[10px] md:py-3 text-[14px] sm:text-[16px] hover:opacity-95 shadow-sm"
            >
              Book a Demo
            </Link>

            <Link
              href="/services"
              className="font-normal leading-[140%] relative z-0 group overflow-hidden tracking-[-0.01em] whitespace-nowrap transition-all cursor-pointer bg-white hover:bg-[#FAF9F7] border border-[#2A2A2E]/15 px-[20px] md:px-[24px] py-[10px] md:py-3 text-[14px] sm:text-[16px] text-[#2A2A2E] shadow-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
