"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import type { TechLogo } from "@/content/serviceTech";

const PIXELS_PER_SECOND = 45;
/** Copies per half of the track, so the strip always overfills wide screens. */
const COPIES = 3;
const EDGE_FADE = "linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)";

function Item({ logo }: { logo: TechLogo }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 text-[15px] font-light text-white/55">
      <Image src={`/services/tech/${logo.file}.svg`} alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain opacity-60" />
      <span className="whitespace-nowrap">{logo.name}</span>
    </span>
  );
}

export function TechMarquee({ logos }: { logos: TechLogo[] }) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const x = useMotionValue(0);
  const half = Array.from({ length: COPIES }, () => logos).flat();

  useAnimationFrame((_, delta) => {
    if (reduced || paused.current || !trackRef.current) return;
    const loop = trackRef.current.scrollWidth / 2;
    if (!loop) return;
    // Capped so returning to a background tab doesn't make the strip jump.
    const next = x.get() - (PIXELS_PER_SECOND * Math.min(delta, 64)) / 1000;
    x.set(next <= -loop ? next + loop : next);
  });

  return (
    <section
      aria-label="Technologies we use"
      data-marquee
      className="flex items-center py-6 lg:h-[72px] lg:py-0"
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
    >
      <ul className="sr-only">{logos.map((logo) => <li key={logo.file}>{logo.name}</li>)}</ul>
      <div
        aria-hidden="true"
        className="w-full overflow-hidden"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <motion.div ref={trackRef} data-marquee-track className="flex w-max" style={{ x }}>
          {[0, 1].map((side) => (
            <div key={side} className="flex shrink-0 gap-14 pr-14">
              {half.map((logo, index) => <Item key={`${logo.file}-${index}`} logo={logo} />)}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
