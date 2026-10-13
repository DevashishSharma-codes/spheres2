"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * FolderTabCard
 * A modern tactile UI card featuring an ethereal animated mesh aurora gradient header,
 * circular diagonal glass arrow action button, and an asymmetrical folder-tab cutout sheet
 * housing category metadata and dynamic metrics.
 * 
 * Supports both dark and light modes with responsive text sizing and layout.
 */
interface FolderTabCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tagsCount?: string;
  tagsLabel?: string;
  shotsCount?: string;
  onAction?: (() => void) | null;
  className?: string;
}

export default function FolderTabCard({
  title = "Components",
  subtitle = "Modern UI Library",
  description,
  tagsCount = "48",
  tagsLabel = "Items",
  shotsCount = "100% Free",
  onAction = null,
  className = "",
}: FolderTabCardProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const applyWidth = (w: number) => setIsCompact(w < 220);
    applyWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) applyWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 45;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 45;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center w-full max-w-full h-full max-h-full p-1 select-none">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[300px] sm:max-w-[320px] xl:max-w-[335px] aspect-[4/4.8] max-h-[380px] rounded-none p-2 overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-[#0c0b10] border border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]"
            : "bg-[#FFFFFF] border border-[#DADADD] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]"
        } ${className}`}
      >
        {/* Inner Card Canvas with Sharp Corners */}
        <div className="relative w-full h-full rounded-none overflow-hidden">

          {/* ── 1. Background Animated Mesh Gradient (Brand Lilac Palette) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base Background Tint */}
            <div 
              className={`absolute inset-0 transition-colors duration-500 ${
                isDark ? "bg-[#090710]" : "bg-[#F3EEFA]"
              }`} 
            />

            {/* Continuous Swirling Mesh Container with Organic Drift & Hover Reactivity */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ 
                rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                x: { type: "spring", stiffness: 120, damping: 18 },
                y: { type: "spring", stiffness: 120, damping: 18 },
              }}
              className="absolute -top-[35%] -left-[35%] w-[170%] h-[170%] pointer-events-none"
            >
              {/* Blob 1: Strong Brand Lilac (#9C8EB8 / #C1B4D8) */}
              <motion.div
                animate={{
                  x: [-55, 50, -35, -55],
                  y: [-35, 45, -50, -35],
                  scale: [1, 1.35, 0.88, 1],
                  borderRadius: [
                    "42% 58% 70% 30% / 45% 45% 55% 55%",
                    "58% 42% 35% 65% / 60% 35% 65% 40%",
                    "42% 58% 70% 30% / 45% 45% 55% 55%",
                  ],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[15%] w-[68%] h-[68%] blur-[22px]"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #C1B4D8 0%, #9C8EB8 45%, #6A5688 80%, rgba(106,86,136,0) 100%)"
                    : "radial-gradient(circle, #C1B4D8 0%, #D4CBE5 50%, #A895C2 85%, rgba(168,149,194,0) 100%)",
                }}
              />

              {/* Blob 2: Radiant Luminous Core White-Lilac Highlight */}
              <motion.div
                animate={{
                  x: [45, -50, 35, 45],
                  y: [35, -40, 50, 35],
                  scale: [0.9, 1.45, 0.92, 0.9],
                  borderRadius: [
                    "50% 50% 42% 58% / 42% 58% 50% 50%",
                    "42% 58% 58% 42% / 52% 42% 58% 48%",
                    "50% 50% 42% 58% / 42% 58% 50% 50%",
                  ],
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[24%] left-[22%] w-[58%] h-[58%] blur-[16px]"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #FFFFFF 0%, #E4DDF0 35%, #D4CBE5 68%, rgba(212,203,229,0) 90%)"
                    : "radial-gradient(circle, #FFFFFF 0%, #FBFAFE 40%, #D4CBE5 75%, rgba(212,203,229,0) 95%)",
                }}
              />

              {/* Blob 3: Soft Ethereal Sky/Cyan Accent */}
              <motion.div
                animate={{
                  x: [40, -35, 45, 40],
                  y: [-45, 40, -25, -45],
                  scale: [0.85, 1.3, 0.9, 0.85],
                }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[16%] right-[12%] w-[55%] h-[55%] blur-[22px] opacity-85"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #7DD3FC 0%, #818CF8 35%, #9C8EB8 65%, rgba(156,142,184,0) 90%)"
                    : "radial-gradient(circle, #BAE6FD 0%, #C7D2FE 40%, #D4CBE5 75%, rgba(212,203,229,0) 95%)",
                }}
              />

              {/* Blob 4: Warm Peach-Dawn Accent */}
              <motion.div
                animate={{
                  x: [-45, 40, -25, -45],
                  y: [35, -40, 30, 35],
                  scale: [0.88, 1.32, 0.85, 0.88],
                }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[8%] w-[52%] h-[52%] blur-[20px] opacity-80"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #FBA27A 0%, #E4DDF0 45%, rgba(228,221,240,0) 80%)"
                    : "radial-gradient(circle, #FCD5C2 0%, #EEEAF7 50%, rgba(238,234,247,0) 80%)",
                }}
              />
            </motion.div>

            {/* Vignette */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isDark 
                  ? "bg-gradient-to-t from-black/50 via-transparent to-transparent" 
                  : "bg-gradient-to-t from-white/20 via-transparent to-transparent"
              }`}
            />
          </div>

          {/* ── 2. Top Glass Action Button with Sharp Edges (Diagonal Arrow ↗) ── */}
          <div className="absolute z-20 top-3 right-3 sm:top-3.5 sm:right-3.5">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAction || undefined}
              className={`rounded-none flex items-center justify-center backdrop-blur-xl transition-colors duration-200 cursor-pointer shadow-sm ${
                isCompact ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
              } ${
                isDark
                  ? "bg-white/25 hover:bg-white/35 text-white border border-white/30"
                  : "bg-white/85 hover:bg-white text-black border border-black/10"
              }`}
              title="Explore Design"
            >
              <ArrowUpRight className={`transition-transform duration-200 ${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'}`} />
            </motion.button>
          </div>

          {/* ── 3. Asymmetrical Sharp Folder-Tab Cutout Sheet ── */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
            <div className="relative w-full h-[64%]">
              {/* Sharp Architectural Cutout Silhouette Path */}
              <svg
                viewBox="0 0 380 240"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.04)]"
              >
                <path
                  d="M 0 0
                     L 225 0
                     L 225 38
                     L 380 38
                     L 380 240
                     L 0 240
                     Z"
                  fill={isDark ? "#14131A" : "#FFFFFF"}
                  stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}
                  strokeWidth="1"
                />
              </svg>

              {/* Foreground Typography & Content inside the Folder Flap */}
              <div className={`relative z-20 w-full h-full flex flex-col justify-between pointer-events-auto ${
                isCompact ? 'p-3' : 'p-3.5 sm:p-4.5'
              }`}>
                {/* Upper Left Tab Content: Geist light & mono font matching site */}
                <div className="pt-0.5 max-w-[58%]">
                  <h3 className={`font-light tracking-[-0.03em] leading-tight ${
                    isCompact ? 'text-[12px]' : 'text-[13px] sm:text-[15px]'
                  } ${
                    isDark ? "text-white" : "text-black"
                  }`}>
                    {title}
                  </h3>
                  {subtitle && !description && (
                    <p className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5 ${
                      isDark ? "text-neutral-400" : "text-black/50"
                    }`}>
                      {subtitle}
                    </p>
                  )}
                </div>

                {description ? (
                  /* Narrative Pillar Layout */
                  <div className="flex-1 flex flex-col justify-between pt-2">
                    <p className={`text-[11px] sm:text-[12px] font-light leading-relaxed line-clamp-3 ${
                      isDark ? "text-neutral-300" : "text-black/75"
                    }`}>
                      {description}
                    </p>
                    <div className="pt-2 border-t border-black/8 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-black/50">
                      <span>{subtitle || "01 // STRATEGY"}</span>
                      <span className="text-black/40">21SPHERES</span>
                    </div>
                  </div>
                ) : (
                  /* Lower Footer Metrics Row */
                  <div className="flex items-end justify-between pb-0.5">
                    {/* Left: Count & Label in Geist Light */}
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-light tracking-[-0.04em] leading-none ${
                        isCompact ? 'text-xl' : 'text-2xl sm:text-3xl'
                      } ${
                        isDark ? "text-white" : "text-black"
                      }`}>
                        {tagsCount}
                      </span>
                      <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider ${
                        isDark ? "text-neutral-400" : "text-black/60"
                      }`}>
                        {tagsLabel}
                      </span>
                    </div>

                    {/* Right: Badge */}
                    <div className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ${
                      isDark ? "text-neutral-400" : "text-black/50"
                    }`}>
                      {shotsCount}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
