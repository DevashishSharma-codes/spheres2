import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-semibold tracking-wider text-[#7057D9] mb-4 uppercase ${isCenter ? "justify-center" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#2A2A2E] leading-[1.12] mb-4">
        {title}
      </h2>
      {lead && (
        <p className="text-sm sm:text-base md:text-lg text-[#2A2A2E]/70 font-normal leading-relaxed">
          {lead}
        </p>
      )}
    </div>
  );
}
