import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export function Container({ children, className = "", wide = false }: ContainerProps) {
  return (
    <div className={`${wide ? "max-w-[1380px]" : "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
