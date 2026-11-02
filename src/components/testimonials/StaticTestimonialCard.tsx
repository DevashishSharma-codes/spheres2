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
          imgFilter: "grayscale(0.2) hue-rotate(20deg) contrast(1.15) brightness(1.02)",
          overlayGradient: "linear-gradient(135deg, rgba(105, 76, 210, 0.54) 0%, rgba(144, 111, 226, 0.46) 52%, rgba(216, 205, 250, 0.62) 100%)",
          tintBg: "rgba(255, 255, 255, 0.20)",
          titleColor: "text-[#120E1E]",
          quoteColor: "text-[#181424]",
          nameColor: "text-[#120E1E]",
          roleColor: "text-[#3F3B46]",
          avatarBorder: "border-[#7057D9]/30",
        };
      case "slate":
        return {
          imgFilter: "grayscale(1) contrast(1.08) brightness(1.06)",
          overlayGradient: "linear-gradient(135deg, rgba(241, 240, 245, 0.78) 0%, rgba(211, 208, 220, 0.54) 54%, rgba(151, 143, 169, 0.34) 100%)",
          tintBg: "rgba(255, 255, 255, 0.24)",
          titleColor: "text-[#0F172A]",
          quoteColor: "text-[#1E293B]",
          nameColor: "text-[#0F172A]",
          roleColor: "text-[#475569]",
          avatarBorder: "border-slate-400/40",
        };
      case "noir":
        return {
          imgFilter: "grayscale(0.85) contrast(1.25) brightness(0.92)",
          overlayGradient: "linear-gradient(135deg, rgba(117, 91, 168, 0.38) 0%, rgba(111, 84, 146, 0.34) 50%, rgba(57, 49, 76, 0.38) 100%)",
          tintBg: "rgba(255, 255, 255, 0.38)",
          titleColor: "text-[#090611]",
          quoteColor: "text-[#130E22]",
          nameColor: "text-[#090611]",
          roleColor: "text-[#393641]",
          avatarBorder: "border-[#3B0764]/30",
        };
      case "frost":
      default:
        return {
          imgFilter: "grayscale(0.6) contrast(1.05) brightness(1.12)",
          overlayGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.74) 0%, rgba(226, 217, 248, 0.68) 48%, rgba(185, 168, 229, 0.48) 100%)",
          tintBg: "rgba(255, 255, 255, 0.22)",
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
    <div className="relative p-2 sm:p-2.5 bg-white/55 backdrop-blur-md border border-white/80 rounded-none shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(112,87,217,0.12)] hover:border-[#7057D9]/30 group">
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

