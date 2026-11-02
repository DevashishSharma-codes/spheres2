import React from "react";

interface BoxyQuoteMarkProps {
  className?: string;
}

// Sharp Boxy Double Quote Mark Icon matching 21Spheres DNA
export function BoxyQuoteMark({ 
  className = "w-10 h-10 sm:w-14 sm:h-14 text-white mb-4 sm:mb-6 drop-shadow-sm" 
}: BoxyQuoteMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Left boxy quotation mark block */}
      <path d="M8 12h18v22H18v14H8V34h10V12H8z" />
      {/* Right boxy quotation mark block */}
      <path d="M38 12h18v22H48v14H38V34h10V12H38z" />
    </svg>
  );
}

export default BoxyQuoteMark;

