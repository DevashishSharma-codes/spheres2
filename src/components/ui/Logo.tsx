import Image from "next/image";

interface LogoProps {
  size?: number;
  showText?: boolean;
  showStudioPill?: boolean;
  className?: string;
}

export function Logo({
  size = 28,
  showText = true,
  showStudioPill = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo-square.png"
          alt="21Spheres Logo"
          width={size * 2}
          height={size * 2}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {showText && (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm sm:text-base tracking-tight text-[#2A2A2E]">
            21Spheres
          </span>
          {showStudioPill && (
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase text-[#7057D9] bg-[#7057D9]/10 px-1.5 py-0.5 rounded border border-[#7057D9]/20 font-medium">
              STUDIO
            </span>
          )}
        </div>
      )}
    </div>
  );
}
