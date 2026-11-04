import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type PillSize = "sm" | "md";

const SHADE = "bg-gradient-to-r from-[#2a2a2e] to-[#6a6a70] text-white";

const SIZES: Record<PillSize, { pill: string; circle: string; arrow: string }> = {
  sm: { pill: "h-10 gap-4 pl-4 pr-1 text-[13px]", circle: "h-8 w-8", arrow: "h-4 w-4" },
  md: { pill: "h-12 gap-5 pl-5 pr-1.5 text-sm", circle: "h-9 w-9", arrow: "h-[18px] w-[18px]" },
};

export function pillClassName(size: PillSize = "md") {
  return `inline-flex items-center rounded-full whitespace-nowrap ${SHADE} ${SIZES[size].pill}`;
}

export function PillArrow({ size = "md" }: { size?: PillSize }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-white text-black ${SIZES[size].circle}`}>
      <ArrowUpRight
        aria-hidden="true"
        className={`transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none ${SIZES[size].arrow}`}
      />
    </span>
  );
}

export function PillLink({
  href,
  children,
  size = "md",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  size?: PillSize;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8] ${pillClassName(size)} ${className}`}
    >
      {children}
      <PillArrow size={size} />
    </Link>
  );
}
