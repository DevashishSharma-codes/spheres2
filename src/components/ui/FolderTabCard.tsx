"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface FolderTabCardProps {
  id: string;
  number: string;
  category?: string;
  title: string;
  description: string;
  image?: string;
  imagePosition?: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaLabel?: string;
  onClick: () => void;
}

/**
 * Rounded folder-tab card with a photo on top. Shared by the /services catalog
 * and the portfolio's "More projects" row so the two stay identical.
 */
export function FolderTabCard({
  id,
  number,
  category,
  title,
  description,
  image,
  imagePosition,
  icon: Icon,
  ctaLabel = "Know more",
  onClick,
}: FolderTabCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${ctaLabel}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative w-full h-[400px] rounded-[22px] overflow-hidden
        transition-all duration-300 ease-out p-[1.5px] select-none flex flex-col cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]
        ${
          isHovered
            ? "shadow-[0_18px_40px_-10px_rgba(50,35,110,0.5)]"
            : "shadow-[0_14px_30px_-12px_rgba(20,16,35,0.45)]"
        }
      `}
    >
      {/* 1. Static Border Outline (visible when not hovered) */}
      <div 
        className={`absolute inset-0 rounded-[22px] border border-white/25 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-100"
        }`} 
      />

      {/* 2. Soft Glowing Halo following the minimal light strip */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
        className={`absolute -inset-[150%] pointer-events-none filter blur-[8px] transition-opacity duration-300 ${
          isHovered ? "opacity-75" : "opacity-0"
        }`}
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 320deg, rgba(147, 51, 234, 0) 325deg, #7E22CE 338deg, #A855F7 348deg, #FFFFFF 355deg, rgba(192, 132, 252, 0) 360deg)",
        }}
      />

      {/* 3. Crisp Minimal Moving Light Strip around the perimeter */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
        className={`absolute -inset-[150%] pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 325deg, rgba(126, 34, 206, 0) 328deg, #7E22CE 338deg, #A855F7 348deg, #FFFFFF 356deg, rgba(233, 213, 255, 0) 360deg)",
        }}
      />

      {/* 4. Card Body: Covers the center so only the 1.5px minimal moving light strip is visible */}
      <div className="relative w-full h-full rounded-[20.5px] p-2 bg-gradient-to-b from-[#55545c] via-[#45444c] to-[#37363d] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] flex flex-col justify-between overflow-hidden">
        {/* Inner Canvas */}
        <div className="relative w-full h-full rounded-[15px] overflow-hidden flex flex-col justify-between">
          
          {/* ── 1. Photo ── */}
          <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden bg-[#55545c]">
            {image && (
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, (max-width: 1279px) 31vw, 24vw"
                style={{ objectPosition: imagePosition }}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            )}
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
          </div>

        {/* ── 2. Top Bar: Number Badge at Top Left & Icon at Top Right ── */}
        <div className="absolute z-20 top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center pointer-events-none">
          <div className={`h-9 sm:h-10 px-3.5 rounded-full backdrop-blur-md border font-mono text-xs sm:text-[13px] font-semibold flex items-center justify-center tracking-wider shadow-sm transition-all duration-300 ${
            isHovered
              ? "bg-black/50 border-white/50 text-white"
              : "bg-black/35 border-white/30 text-white"
          }`}>
            <span>{number}</span>
          </div>
        </div>

        <div className="absolute z-20 top-3 right-3 sm:top-3.5 sm:right-3.5">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border transition-all shadow-sm flex items-center justify-center text-white ${
            isHovered ? "bg-black/50 border-white/50" : "bg-black/35 border-white/30"
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* ── 3. Folder-Tab Sheet ── */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
          <div className="relative w-full h-[58%]">
            <svg
              viewBox="0 0 380 240"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id={`glass-tab-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a4951" />
                  <stop offset="45%" stopColor="#403f47" />
                  <stop offset="100%" stopColor="#37363d" />
                </linearGradient>
              </defs>

              {/* Folder sheet: every corner of the tab and step is rounded */}
              <path
                d="M 0 18
                   A 18 18 0 0 1 18 0
                   L 207 0
                   A 18 18 0 0 1 225 18
                   L 225 20
                   A 18 18 0 0 0 243 38
                   L 362 38
                   A 18 18 0 0 1 380 56
                   L 380 222
                   A 18 18 0 0 1 362 240
                   L 18 240
                   A 18 18 0 0 1 0 222
                   Z"
                fill={`url(#glass-tab-${id})`}
                stroke={isHovered ? "rgba(185, 166, 255, 0.7)" : "rgba(255, 255, 255, 0.2)"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
              />
            </svg>

            {/* Content inside the sheet */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3.5 sm:p-4.5 pointer-events-auto">
              
              {/* Upper Left Tab Shelf: category label */}
              <div className="flex h-5 max-w-[56%] items-center">
                <span className="truncate text-[11px] font-medium text-[#C9BBFF]">{category}</span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col pt-3">
                <h3 className="mb-1.5 text-[17px] font-normal leading-snug tracking-[-0.01em] text-white">
                  {title}
                </h3>
                <p className="line-clamp-2 text-[12.5px] leading-relaxed text-white/80">
                  {description}
                </p>

                <div className="mt-auto flex justify-end pt-2">
                  <span className="inline-flex h-10 items-center gap-4 rounded-full bg-gradient-to-r from-[#2a2a2e] to-[#6a6a70] pl-4 pr-1 text-[12.5px] text-white">
                    {ctaLabel}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none" />
                    </span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
