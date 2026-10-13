import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "grey" | "graphite" | "white";
  className?: string;
}

export function Badge({ children, variant = "grey", className = "" }: BadgeProps) {
  const variantStyles = {
    purple: "bg-[#7057D9]/10 text-[#7057D9] border-[#7057D9]/25",
    grey: "bg-[#EDEDF0] text-[#2A2A2E] border-[#DADADD]",
    graphite: "bg-[#2A2A2E] text-[#FCFCFA] border-[#2A2A2E]",
    white: "bg-white text-[#2A2A2E] border-[#DADADD]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
