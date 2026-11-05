import Image from "next/image";

const LOGO_WIDTH = 421;
const LOGO_HEIGHT = 112;

interface LogoProps {
  /** Height in pixels. The width follows the artwork. */
  height?: number;
  /** Use the version with white text, for dark backgrounds. */
  onDark?: boolean;
  className?: string;
}

export function Logo({ height = 44, onDark = false, className = "" }: LogoProps) {
  return (
    <Image
      src={onDark ? "/logo-full-dark.png" : "/logo-full.png"}
      alt="21 Spheres"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      loading="eager"
      style={{ height, width: "auto" }}
      className={`shrink-0 ${className}`}
    />
  );
}
