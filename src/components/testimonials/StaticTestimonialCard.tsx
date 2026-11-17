"use client";

import React from "react";
import { BRICKS_DOWN, BRICKS_UP } from "@/components/ui/brickHover";

export interface TestimonialCardData {
  id: number;
  company: string;
  subhead: string;
  name: string;
  role: string;
  avatar: string;
  bgImage: string;
  themeVariant: "purple" | "slate" | "noir" | "frost";
}

interface StaticTestimonialCardProps {
  card: TestimonialCardData;
  /** Which way the hover layers grow: pick the side with room around the card. */
  bricks: "up" | "down";
  /** Phones: the same card made smaller for the bento, as a half-width "tile" or a full-width "wide" card. */
  size?: "full" | "tile" | "wide";
}

export function StaticTestimonialCard({ card, bricks, size = "full" }: StaticTestimonialCardProps) {
  const small = size !== "full";
  // Use restrained violet color washes over the existing artwork. Keep copy neutral.
  const getThemeStyles = () => {
    switch (card.themeVariant) {
      case "purple":
        return {
          imgFilter: "grayscale(0.12) hue-rotate(12deg) contrast(1.08) brightness(1.04)",
          overlayGradient: "linear-gradient(135deg, rgba(209, 183, 244, 0.48) 0%, rgba(194, 162, 238, 0.42) 52%, rgba(224, 207, 250, 0.56) 100%)",
          tintBg: "rgba(246, 239, 255, 0.08)",
          frameBg: "rgba(232, 220, 248, 0.82)",
          brickNear: "#B79CEB",
          brickFar: "#D8C8F5",
          titleColor: "text-[#120E1E]",
          quoteColor: "text-[#181424]",
          nameColor: "text-[#120E1E]",
          roleColor: "text-[#3F3B46]",
          avatarBorder: "border-[#7057D9]/30",
        };
      case "slate":
        return {
          imgFilter: "grayscale(1) contrast(1.08) brightness(1.02)",
          overlayGradient: "linear-gradient(135deg, rgba(218, 218, 218, 0.62) 0%, rgba(194, 194, 194, 0.58) 54%, rgba(174, 174, 174, 0.66) 100%)",
          tintBg: "rgba(248, 248, 248, 0.06)",
          frameBg: "rgba(232, 232, 234, 0.88)",
          brickNear: "#B4B4BC",
          brickFar: "#D2D2D8",
          titleColor: "text-[#0F172A]",
          quoteColor: "text-[#1E293B]",
          nameColor: "text-[#0F172A]",
          roleColor: "text-[#475569]",
          avatarBorder: "border-slate-400/40",
        };
      case "noir":
        return {
          imgFilter: "grayscale(0.75) contrast(1.15) brightness(0.62)",
          overlayGradient: "linear-gradient(135deg, rgba(34, 34, 35, 0.78) 0%, rgba(22, 22, 23, 0.82) 52%, rgba(40, 40, 41, 0.78) 100%)",
          tintBg: "rgba(0, 0, 0, 0.08)",
          frameBg: "rgba(31, 31, 33, 0.9)",
          brickNear: "#1F1F21",
          brickFar: "#4A4A4E",
          titleColor: "text-white",
          quoteColor: "text-white/90",
          nameColor: "text-white",
          roleColor: "text-white/75",
          avatarBorder: "border-white/30",
        };
      case "frost":
      default:
        return {
          imgFilter: "grayscale(0.22) contrast(1.02) brightness(1.12)",
          overlayGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.70) 0%, rgba(250, 250, 250, 0.66) 48%, rgba(242, 242, 244, 0.72) 100%)",
          tintBg: "rgba(255, 255, 255, 0.08)",
          frameBg: "rgba(248, 248, 250, 0.9)",
          brickNear: "#CFCFD5",
          brickFar: "#E4E4E8",
          titleColor: "text-[#18181B]",
          quoteColor: "text-[#27272A]",
          nameColor: "text-[#18181B]",
          roleColor: "text-[#4B4653]",
          avatarBorder: "border-[#A855F7]/30",
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      className={`group relative h-full rounded-none shadow-none transition-shadow duration-300 ease-out hover:z-10 motion-reduce:transition-none ${small ? "p-1.5" : `p-2 backdrop-blur-md sm:p-2.5 ${bricks === "up" ? BRICKS_UP : BRICKS_DOWN}`}`}
      style={{ backgroundColor: theme.frameBg, "--brick-near": theme.brickNear, "--brick-far": theme.brickFar } as React.CSSProperties}
    >
      {/* Inner Card Body with Color-Graded Watercolor Background */}
      <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-none ${small ? "p-3.5" : "min-h-[340px] p-6 sm:min-h-[370px] sm:p-7 lg:min-h-[390px]"}`}>
        
        {/* Soft Background Watercolor Image with Purple / Grayish / White / Black Grading */}
        <img
          src={card.bgImage}
          alt={`${card.company} watercolor background`}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: theme.imgFilter }}
        />

        {/* Theme Color-Grade Blend Layer */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: theme.overlayGradient }}
        />

        {/* Soft White Tint Overlay for Typography Contrast */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: theme.tintBg }}
        />

        {/* TOP BLOCK: Company Logo + Quote Text right at top */}
        <div className={`relative z-10 flex flex-col items-start ${small ? "gap-2" : "gap-4"}`}>
          {/* Company Logo / Name */}
          <span className={`font-bold tracking-tight ${small ? "text-[14px] leading-tight" : "text-lg sm:text-xl"} ${theme.titleColor}`}>
            {card.company}
          </span>

          {/* Quote Text immediately at top under logo */}
          <p className={`font-normal leading-snug tracking-tight text-left ${small ? (size === "wide" ? "line-clamp-4 text-[13.5px]" : "line-clamp-5 text-[12px]") : "text-sm sm:text-base"} ${theme.quoteColor}`}>
            {card.subhead}
          </p>
        </div>

        {/* BOTTOM BLOCK: Author Avatar + Name & Role */}
        <div className={`relative z-10 flex items-center ${small ? "gap-2 pt-3" : "gap-3 pt-6"}`}>
          <img
            src={card.avatar}
            alt={card.name}
            className={`rounded-full object-cover shrink-0 border ${theme.avatarBorder} shadow-xs ${small ? "h-7 w-7" : "w-10 h-10 sm:w-11 sm:h-11"}`}
          />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className={`font-semibold ${small ? "truncate text-[11.5px]" : "text-xs sm:text-sm"} ${theme.nameColor}`}>
              {card.name}
            </span>
            <span className={`font-medium mt-0.5 ${small ? "truncate text-[10px]" : "text-[11px]"} ${theme.roleColor}`}>
              {card.role}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StaticTestimonialCard;

