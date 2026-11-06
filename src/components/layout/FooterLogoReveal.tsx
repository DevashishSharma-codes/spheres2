"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LOGO_VIEW, MARK_BOX, MARK_DOTS, MARK_SIZE, TAGLINE_PATH, WORDMARK_PATH } from "./logoShapes";

const EASE = [0.65, 0, 0.25, 1] as const;
const DURATION = 1.1;

// How much of the logo must be on screen to play the transition, and to undo it when scrolling back.
const OPEN_AT = 0.6;
const CLOSE_AT = 0.3;

// The mark's position and size inside the logo, in % of the logo's box.
const MARK_LAYOUT = {
  left: `${(MARK_BOX[0] / LOGO_VIEW[0]) * 100}%`,
  top: `${(MARK_BOX[1] / LOGO_VIEW[1]) * 100}%`,
  width: `${(MARK_BOX[2] / LOGO_VIEW[0]) * 100}%`,
  height: `${(MARK_BOX[3] / LOGO_VIEW[1]) * 100}%`,
};
// Translate % is relative to the mark's own width, so this carries it to the logo's right edge.
const MARK_TRAVEL = `${((LOGO_VIEW[0] - MARK_BOX[0] - MARK_BOX[2]) / MARK_BOX[2]) * 100}%`;

function MarkDots() {
  return (
    <>
      {MARK_DOTS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </>
  );
}

export function FooterLogoReveal({ className = "" }: { className?: string }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const check = () => {
      const { top, height } = logo.getBoundingClientRect();
      const onScreen = (window.innerHeight - top) / height;
      setOpen((isOpen) => (isOpen ? onScreen > CLOSE_AT : onScreen >= OPEN_AT));
    };

    const observer = new ResizeObserver(check);
    observer.observe(logo);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, []);

  const state = open ? "open" : "closed";
  const timing = (delay = 0, duration = DURATION) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <div
      ref={logoRef}
      role="img"
      aria-label="21 Spheres. A world within."
      className={`relative text-[#6D54F1] ${className}`}
      style={{ aspectRatio: `${LOGO_VIEW[0]} / ${LOGO_VIEW[1]}` }}
    >
      {/* The wordmark wipes in behind the mark as it travels across */}
      <motion.svg
        initial={false}
        animate={state}
        variants={{
          closed: { clipPath: "inset(0 100% 0 0)" },
          open: { clipPath: "inset(0 0% 0 0)" },
        }}
        transition={timing()}
        viewBox={`0 0 ${LOGO_VIEW[0]} ${LOGO_VIEW[1]}`}
        className="absolute inset-0 h-full w-full"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={WORDMARK_PATH} />
        <path d={TAGLINE_PATH} fill="#392F6F" />
      </motion.svg>

      {/* The logo's own mark, settling into place once the travelling one has left */}
      <motion.svg
        initial={false}
        animate={state}
        variants={{
          closed: { opacity: 0, rotate: -120, scale: 0.85 },
          open: { opacity: 1, rotate: 0, scale: 1 },
        }}
        transition={timing(open ? 0.4 : 0, 0.8)}
        viewBox={`0 0 ${MARK_SIZE[0]} ${MARK_SIZE[1]}`}
        className="absolute"
        style={MARK_LAYOUT}
        fill="currentColor"
        aria-hidden="true"
      >
        <MarkDots />
      </motion.svg>

      {/* The mark on its own: rolls from left to right and fades away */}
      <motion.svg
        initial={false}
        animate={state}
        variants={{
          closed: { x: "0%", rotate: 0, opacity: [0, 1, 1] },
          open: { x: MARK_TRAVEL, rotate: 360, opacity: [1, 1, 0] },
        }}
        transition={timing()}
        viewBox={`0 0 ${MARK_SIZE[0]} ${MARK_SIZE[1]}`}
        className="absolute"
        style={MARK_LAYOUT}
        fill="currentColor"
        aria-hidden="true"
      >
        <MarkDots />
      </motion.svg>
    </div>
  );
}
