
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
  Sparkles,
  Clock,
  Globe,
  Zap,
  Shield,
  Cpu,
  MessageSquare,
  Workflow,
  Rocket,
  Building2,
  Terminal,
  Smartphone
} from "lucide-react";
import { StackedPillItem } from "@/types";

interface CleanStackedCardVisualProps {
  serviceId: string;
  pills?: StackedPillItem[];
}

const PILL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  puzzle: Puzzle,
  sparkles: Sparkles,
  clock: Clock,
  globe: Globe,
  zap: Zap,
  shield: Shield,
  cpu: Cpu,
  message: MessageSquare,
  workflow: Workflow,
  rocket: Rocket,
  building: Building2,
  terminal: Terminal,
};

export function CleanStackedCardVisual({ serviceId, pills = [] }: CleanStackedCardVisualProps) {
  const isMobile = serviceId === "mobile-application-development";

  return (
    <div className="relative w-full h-[270px] rounded-[24px] bg-gradient-to-b from-[#FBFBFA] via-[#F6F6F8] to-[#EFEFF3] border border-black/[0.05] p-3 flex flex-col justify-between items-center overflow-hidden shadow-inner select-none">

      {/* Subtle floating ambient micro-orbs (matching reference design) */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 rounded-full bg-black/[0.08] pointer-events-none" />
      <div className="absolute top-16 right-8 w-3 h-3 rounded-full bg-black/[0.06] pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-4 h-4 rounded-full bg-black/[0.05] pointer-events-none" />
      <div className="absolute bottom-24 right-5 w-2 h-2 rounded-full bg-black/[0.07] pointer-events-none" />

      {/* ========================================================
          1. FLOATING STACKED FEATURE CARDS (Cascading vertically)
          (Directly inspired by the reference Mailite clean cards)
          ======================================================== */}
      <div className="relative z-10 w-full flex flex-col items-center gap-2 pt-1">
        {pills.slice(0, 3).map((pill, idx) => {
          const Icon = PILL_ICON_MAP[pill.iconType] || Sparkles;

          // Subtle upward cascade
          const scale = idx === 0 ? 0.94 : idx === 1 ? 0.97 : 1;
          const opacity = idx === 0 ? 0.85 : idx === 1 ? 0.95 : 1;

          return (
            <motion.div
              key={pill.title}
              initial={{ y: 0 }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ scale, opacity }}
              className="w-full max-w-[285px] bg-white rounded-2xl p-2.5 px-3.5 border border-black/[0.06] shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex items-center gap-3 transition-shadow hover:shadow-[0_8px_24px_rgba(112,87,217,0.08)] cursor-pointer"
            >
              {/* Pastel Tinted Squircle Icon */}
              <div className={`w-8 h-8 rounded-xl ${pill.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col text-left truncate">
                <span className="text-[12.5px] font-semibold text-[#18181B] tracking-tight leading-tight truncate">
                  {pill.title}
                </span>
                <span className="text-[10px] font-light text-[#8F8F98] mt-0.5 truncate">
                  {pill.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================
          2. BOTTOM BASE:
          - If Mobile: Phone top half with Dynamic Island
          - Otherwise: Clean minimalist console base with 21Spheres emblem
          ======================================================== */}
      <div className="relative z-10 w-full flex justify-center items-end mt-auto pt-2">
        {isMobile ? (
          /* Phone top half cleanly framed with headroom */
          <div className="relative w-full max-w-[260px] rounded-t-[30px] p-[2px] bg-gradient-to-b from-[#2D2C32] to-[#121115] border-t border-x border-[#484650] shadow-[0_-8px_20px_rgba(0,0,0,0.18)]">
            <div className="w-full rounded-t-[28px] p-[4px] pb-0 bg-black flex flex-col">
              <div
                className="w-full rounded-t-[24px] px-3 pt-1.5 pb-2.5 flex items-center justify-between text-white"
                style={{
                  background: `linear-gradient(150deg, #573EBF 0%, #7057D9 35%, #A38CF8 70%, #FFFFFF 100%)`,
                }}
              >
                <span className="text-[8.5px] font-semibold">9:41</span>

                {/* Dynamic Island Pill with amber badge */}
                <div className="bg-black text-white h-4 px-2 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10">
                  <span className="w-2.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[7px] font-mono text-white/90">0:02</span>
                </div>

                <span className="text-[8px] font-mono">5G</span>
              </div>
            </div>

            {/* Emblem pinned to front (like reference Mailite box emblem) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-2xl bg-gradient-to-b from-[#1E1E24] to-[#0A0A0C] border border-white/20 shadow-lg flex items-center justify-center text-white">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : (
          /* Clean Minimalist Console Base with 21Spheres App Emblem */
          <div className="relative w-full max-w-[260px] h-11 bg-white/80 backdrop-blur-md rounded-t-2xl border-t border-x border-black/[0.08] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] flex items-center justify-center">
            {/* Ambient box wings */}
            <div className="absolute -left-3 top-2 w-4 h-6 bg-black/[0.04] -rotate-12 rounded-sm pointer-events-none" />
            <div className="absolute -right-3 top-2 w-4 h-6 bg-black/[0.04] rotate-12 rounded-sm pointer-events-none" />

            {/* Glossy Black Emblem Pinned to Front (Matching the Mailite card emblem) */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-2xl bg-gradient-to-b from-[#1F1F24] to-[#0B0B0D] border border-white/20 shadow-md flex items-center justify-center text-white">
              <span className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-white/90" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-[#7057D9]" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-white/50" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-white/90" />
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
