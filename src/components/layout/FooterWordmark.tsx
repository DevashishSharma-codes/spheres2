"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MARK_DOTS, MARK_SIZE, WORDMARK_PATH } from "./logoShapes";

const PURPLE = "#6D54F1";

// The "21 SPHERES" lettering, cropped tight. x runs from the name's left edge.
const TITLE = { left: 1046, top: 182, right: 3345, bottom: 482 };
const NAME_HEIGHT = TITLE.bottom - TITLE.top;
const NAME_WIDTH = TITLE.right - TITLE.left;

// The logo's mark sits to the left of the name, a little taller than the letters.
const MARK_SCALE = (NAME_HEIGHT * 1.4) / MARK_SIZE[1];
const MARK_W = MARK_SIZE[0] * MARK_SCALE;
const MARK_H = MARK_SIZE[1] * MARK_SCALE;
const MARK_GAP = 110;
const MARK_CENTER = { x: -MARK_GAP - MARK_W / 2, y: TITLE.top + NAME_HEIGHT / 2 };

// Room above the letters, so they can lift towards the cursor without being cut off.
const HEADROOM = 90;
const VIEW_LEFT = -MARK_GAP - MARK_W;
const VIEW_WIDTH = NAME_WIDTH - VIEW_LEFT;
const VIEW_TOP = Math.min(TITLE.top - HEADROOM, MARK_CENTER.y - MARK_H / 2);
const VIEW_HEIGHT = Math.max(TITLE.bottom, MARK_CENTER.y + MARK_H / 2) + 2 - VIEW_TOP;

// How far the cursor's pull reaches afterwards, and how high the nearest letter lifts.
const REACH = 650;
const LIFT = 70;
const HOVER_SPRING = { stiffness: 260, damping: 22, mass: 0.6 };
const AWAY = -100000;

/** Splits the lettering into letters, keeping each letter's inner holes (the P's and R's) with it. */
function splitLetters(path: string) {
  const boxes = path
    .split(/(?=M)/)
    .filter(Boolean)
    .map((part) => {
      const n = (part.match(/-?\d*\.?\d+/g) ?? []).map(Number);
      const xs = n.filter((_, i) => i % 2 === 0);
      const ys = n.filter((_, i) => i % 2 === 1);
      return { part, x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
    });
  const inside = (b: (typeof boxes)[number]) =>
    boxes.find((o) => o !== b && o.x0 <= b.x0 && o.x1 >= b.x1 && o.y0 <= b.y0 && o.y1 >= b.y1);
  const letters = boxes.filter((b) => !inside(b)).map((b) => ({ ...b, d: b.part }));
  boxes.forEach((b) => {
    const outer = inside(b);
    const letter = outer && letters.find((l) => l.x0 === outer.x0);
    if (letter) letter.d += b.part;
  });
  return letters
    .sort((a, b) => a.x0 - b.x0)
    .map((l, index) => ({
      index,
      d: l.d,
      cx: (l.x0 + l.x1) / 2 - TITLE.left,
      cy: (l.y0 + l.y1) / 2,
      // The small raised ™ ends well above the letters' baseline; it is set in black, not purple.
      trademark: l.y1 < TITLE.top + NAME_HEIGHT / 2,
      // Big enough to uncover the whole letter from its centre, with room for it to lift on hover.
      radius: Math.hypot(l.x1 - l.x0, l.y1 - l.y0) / 2 + LIFT + 20,
    }));
}

const LETTERS = splitLetters(WORDMARK_PATH);

/* ---------------- the entrance ----------------
   One timeline, 0 to 1. The logo's mark appears beside the name. Copies of its spheres leave it in
   small groups, left side of the ring to the left letters, each group gliding along a
   gentle arc to its letter. As a group arrives its letter blooms out of the spheres, which melt
   into it. Then a soft band of light glides once across the finished name. */
const RING = { ...MARK_CENTER, scale: MARK_SCALE };
const RING_IN = [0, 0.14] as const;
const LEAVE_FIRST = 0.16; // the first group leaves the ring...
const LEAVE_STEP = 0.032; // ...and each next letter's group a little later
const TRAVEL = 0.2; // share of the timeline a sphere spends in the air
const BLOOM = 0.16; // and its letter takes to bloom open
const ENTRANCE_SECONDS = 3.6;
const SHEEN_WIDTH = 520;

const round = (v: number) => Math.round(v * 10) / 10; // keeps the server's HTML and the browser's equal
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Each sphere goes to a letter: sorted left to right across the ring, then shared out in order.
const SPHERES = MARK_DOTS.map(([cx, cy, r], i) => ({ cx, cy, r, i }))
  .sort((a, b) => a.cx - b.cx)
  .map((dot, order) => {
    const letter = LETTERS[Math.min(LETTERS.length - 1, Math.floor((order * LETTERS.length) / MARK_DOTS.length))];
    const start = { x: RING.x + (dot.cx - MARK_SIZE[0] / 2) * RING.scale, y: RING.y + (dot.cy - MARK_SIZE[1] / 2) * RING.scale };
    // Arrive close together near the letter's middle, not all on one point.
    const spread = 34;
    const end = { x: letter.cx + Math.cos(dot.i * 2.4) * spread, y: letter.cy + Math.sin(dot.i * 2.4) * spread };
    const leave = LEAVE_FIRST + letter.index * LEAVE_STEP + (dot.i % 3) * 0.008;
    return { key: `${dot.cx}-${dot.cy}`, r: dot.r * RING.scale, start, end, leave, letter: letter.index };
  });

const arrivalOf = (letterIndex: number) =>
  Math.min(...SPHERES.filter((s) => s.letter === letterIndex).map((s) => s.leave + TRAVEL), 0.96);

/** 0 when the cursor is out of reach, rising smoothly to 1 right on top of `x`. */
const closeness = (pointer: number, x: number) => {
  const t = Math.max(0, 1 - Math.abs(pointer - x) / REACH);
  return t * t * (3 - 2 * t);
};

function Sphere({ sphere, progress }: { sphere: (typeof SPHERES)[number]; progress: MotionValue<number> }) {
  const flight = useTransform(progress, (p) => ease(clamp01((p - sphere.leave) / TRAVEL)));
  const x = useTransform(flight, (t) => round(sphere.start.x + (sphere.end.x - sphere.start.x) * t));
  // A gentle arc: up and over on the way to the letter.
  const y = useTransform(flight, (t) => round(sphere.start.y + (sphere.end.y - sphere.start.y) * t - Math.sin(Math.PI * t) * 70));
  const appear = useTransform(progress, [RING_IN[0], RING_IN[1]], [0, 1], { clamp: true });
  const melt = useTransform(progress, (p) => 1 - clamp01((p - (sphere.leave + TRAVEL)) / (BLOOM * 0.8)));
  const opacity = useTransform([appear, melt], ([a, m]: number[]) => a * m);
  const scale = useTransform([appear, melt], ([a, m]: number[]) => (0.4 + 0.6 * a) * (0.3 + 0.7 * m));
  return <motion.circle cx={0} cy={0} r={round(sphere.r)} fill={PURPLE} style={{ x, y, opacity, scale }} />;
}

function Letter({ letter, pointer, progress }: { letter: (typeof LETTERS)[number]; pointer: MotionValue<number>; progress: MotionValue<number> }) {
  const arrival = arrivalOf(letter.index);
  const bloom = useTransform(progress, (p) => round(letter.radius * ease(clamp01((p - arrival) / BLOOM))));
  const lift = useSpring(useTransform(pointer, (p) => -LIFT * closeness(p, letter.cx)), HOVER_SPRING);
  const clipId = `footer-letter-${letter.index}`;
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <motion.circle cx={round(letter.cx)} cy={round(letter.cy)} r={bloom} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <motion.g style={{ y: lift }}>
          <g transform={`translate(${-TITLE.left} 0)`}>
            <path d={letter.d} fill={letter.trademark ? "#19191C" : PURPLE} />
            <path d={letter.d} fill="url(#footer-wordmark-sheen)" />
          </g>
        </motion.g>
      </g>
    </g>
  );
}

/**
 * The name at the foot of the page, formed from the logo's spheres: they gather as the ring, travel
 * out to the letters, and each letter blooms from them. Afterwards letters near the cursor lift.
 */
export function FooterWordmark({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.4 });
  const progress = useMotionValue(0);
  const pointer = useMotionValue(AWAY);
  const [formed, setFormed] = useState(false);
  const done = Boolean(reduceMotion) || formed;

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    if (!inView) return;
    const entrance = animate(progress, 1, {
      duration: ENTRANCE_SECONDS,
      ease: "linear",
      onComplete: () => setFormed(true),
    });
    return () => entrance.stop();
  }, [inView, progress, reduceMotion]);

  // The band of light, once every letter has formed.
  const sheenX = useTransform(progress, [0.86, 1], [-SHEEN_WIDTH, NAME_WIDTH + SHEEN_WIDTH], { clamp: true });
  // The mark itself fades in with the spheres and then stays.
  const markOpacity = useTransform(progress, [RING_IN[0], RING_IN[1]], [0, 1], { clamp: true });
  const sheenX2 = useTransform(sheenX, (x) => x + SHEEN_WIDTH);

  const follow = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || !done || reduceMotion) return;
    pointer.set(VIEW_LEFT + ((event.clientX - rect.left) / rect.width) * VIEW_WIDTH);
  };

  return (
    <div ref={wrapRef} className={`relative overflow-hidden pt-1 ${className}`}>
      <svg
        ref={svgRef}
        role="img"
        aria-label="21 Spheres"
        viewBox={`${round(VIEW_LEFT)} ${round(VIEW_TOP)} ${round(VIEW_WIDTH)} ${round(VIEW_HEIGHT)}`}
        className="relative block h-auto w-full"
        onPointerMove={follow}
        onPointerLeave={() => pointer.set(AWAY)}
      >
        <defs>
          <motion.linearGradient
            id="footer-wordmark-sheen"
            gradientUnits="userSpaceOnUse"
            x1={useTransform(sheenX, (x) => x + TITLE.left)}
            y1="0"
            x2={useTransform(sheenX2, (x) => x + TITLE.left)}
            y2="0"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>

        <motion.g aria-hidden="true" style={{ opacity: markOpacity }}>
          <g transform={`translate(${round(MARK_CENTER.x - MARK_W / 2)} ${round(MARK_CENTER.y - MARK_H / 2)}) scale(${round(MARK_SCALE * 1000) / 1000})`} fill={PURPLE}>
            {MARK_DOTS.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
          </g>
        </motion.g>

        {LETTERS.map((letter) => (
          <Letter key={letter.index} letter={letter} pointer={pointer} progress={progress} />
        ))}

        {!done && (
          <g aria-hidden="true">
            {SPHERES.map((sphere) => (
              <Sphere key={sphere.key} sphere={sphere} progress={progress} />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
