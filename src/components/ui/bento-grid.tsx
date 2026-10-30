import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4 sm:gap-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-[#E5E5EA]",
      // light styles
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.04),0_12px_24px_rgba(0,0,0,.03)] hover:border-[#7C3AED]/40 hover:[box-shadow:0_16px_40px_rgba(124,58,237,0.08)] transition-all duration-300",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0 overflow-hidden">{background}</div>

    <div className="p-5 sm:p-6 z-10 mt-auto bg-gradient-to-t from-white via-white/95 to-transparent pt-12">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-8">
        <Icon className="h-8 w-8 origin-left transform-gpu text-[#7C3AED] transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-lg sm:text-xl font-semibold text-[#111114] tracking-tight">
          {name}
        </h3>
        <p className="max-w-lg text-xs sm:text-[13px] text-[#515154] font-normal leading-relaxed">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden pt-2"
        )}
      >
        <Button
          variant="link"
          size="sm"
          className="pointer-events-auto p-0"
        >
          <a href={href} className="flex items-center gap-1 text-[#7C3AED]">
            <span>{cta}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-5 sm:p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20"
      )}
    >
      <Button
        variant="link"
        size="sm"
        className="pointer-events-auto p-0"
      >
        <a href={href} className="flex items-center gap-1 text-[#7C3AED]">
          <span>{cta}</span>
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[#7C3AED]/[0.02]" />
  </div>
);

export { BentoCard, BentoGrid };

