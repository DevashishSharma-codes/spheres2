"use client";

import React from "react";

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
}

export function StaticTestimonialCard({ card }: StaticTestimonialCardProps) {
  // Use restrained violet color washes over the existing artwork. Keep copy neutral.
  const getThemeStyles = () => {
    switch (card.themeVariant) {
      case "purple":
        return {
          imgFilter: "grayscale(0.12) hue-rotate(12deg) contrast(1.08) brightness(1.04)",
          overlayGradient: "linear-gradient(135deg, rgba(209, 183, 244, 0.48) 0%, rgba(194, 162, 238, 0.42) 52%, rgba(224, 207, 250, 0.56) 100%)",
          tintBg: "rgba(246, 239, 255, 0.08)",
          frameBg: "rgba(232, 220, 248, 0.82)",
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
      className="relative p-2 sm:p-2.5 backdrop-blur-md rounded-none shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(112,87,217,0.12)] group"
      style={{ backgroundColor: theme.frameBg }}
    >
      {/* Inner Card Body with Color-Graded Watercolor Background */}
      <div className="relative w-full min-h-[340px] sm:min-h-[370px] lg:min-h-[390px] p-6 sm:p-7 rounded-none flex flex-col justify-between overflow-hidden">
        
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
        <div className="relative z-10 flex flex-col items-start gap-4">
          {/* Company Logo / Name */}
          <span className={`text-lg sm:text-xl font-bold tracking-tight ${theme.titleColor}`}>
            {card.company}
          </span>

          {/* Quote Text immediately at top under logo */}
          <p className={`text-sm sm:text-base font-normal leading-snug tracking-tight text-left ${theme.quoteColor}`}>
            {card.subhead}
          </p>
        </div>

        {/* BOTTOM BLOCK: Author Avatar + Name & Role */}
        <div className="relative z-10 flex items-center gap-3 pt-6">
          <img
            src={card.avatar}
            alt={card.name}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border ${theme.avatarBorder} shadow-xs`}
          />
          <div className="flex flex-col leading-tight">
            <span className={`text-xs sm:text-sm font-semibold ${theme.nameColor}`}>
              {card.name}
            </span>
            <span className={`text-[11px] font-medium mt-0.5 ${theme.roleColor}`}>
              {card.role}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StaticTestimonialCard;

