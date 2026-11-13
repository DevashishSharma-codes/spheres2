"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { pillClassName } from "@/components/ui/PillLink";
import { MARK_DOTS, MARK_SIZE } from "./logoShapes";

const INK = "#19191C";
const HAND_NAMES = ["top-left", "top-center", "top-right", "bottom-left", "bottom-right"] as const;
type HandName = (typeof HAND_NAMES)[number];

interface Point {
  x: number;
  y: number;
}

interface Thread {
  width: number;
  height: number;
  /** One path per half: both run from the top and meet at the tip. */
  d: string[];
  tip: Point;
  /** Small rings where the thread wraps a finger: centre and tilt. */
  rings: { at: Point; angle: number }[];
  /** The route the paper plane flies: out along one half, round through every hand, back down the other. */
  flight?: string;
}

interface Hand {
  el: HTMLElement;
  /** Where the thread touches the hand before any nudge, relative to the cone box. */
  at: Point;
}

/** The journey section's hands, measured without the nudge we may already have given them. */
function findHands(box: DOMRect) {
  const hands: Partial<Record<HandName, Hand>> = {};
  document.querySelectorAll<HTMLElement>("[data-cone-anchor]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    hands[el.dataset.coneAnchor as HandName] = {
      el,
      at: {
        x: r.left - box.left - (nudges.get(el.dataset.coneAnchor ?? "")?.x ?? 0) + r.width * Number(el.dataset.fx),
        y: r.top - box.top - (nudges.get(el.dataset.coneAnchor ?? "")?.y ?? 0) + r.height * Number(el.dataset.fy),
      },
    };
  });
  return HAND_NAMES.every((name) => hands[name]) ? (hands as Record<HandName, Hand>) : null;
}

/*
 * How far each hand has been moved to sit on the thread. The hands belong to another component,
 * so they're moved through a stylesheet of our own: changing their attributes directly would make
 * React see HTML that doesn't match the server's, if this runs before that section has loaded.
 */
const nudges = new Map<string, Point>();
let nudgeSheet: CSSStyleSheet | null = null;

function nudge(name: string, x: number, y: number) {
  nudges.set(name, { x, y });
  if (!nudgeSheet) {
    nudgeSheet = new CSSStyleSheet();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, nudgeSheet];
  }
  nudgeSheet.replaceSync(
    [...nudges]
      .filter(([, n]) => n.x || n.y)
      // The centre hand is already centred with its own translate, so the nudge is added to it.
      .map(([hand, n]) => `[data-cone-anchor="${hand}"] { translate: ${hand === "top-center" ? `calc(-50% + ${n.x}px)` : `${n.x}px`} ${n.y}px; }`)
      .join("\n"),
  );
}

const c = (a: Point, b: Point, end: Point) => ` C ${a.x} ${a.y}, ${b.x} ${b.y}, ${end.x} ${end.y}`;

/**
 * A smooth curve through points with a set direction at each one, so every turn is a rounded arc.
 * The handle length (0.39 of the gap) is what a cubic needs to trace a quarter circle.
 */
function smoothPath(stops: { at: Point; dir: Point }[]) {
  const unit = (v: Point) => {
    const len = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / len, y: v.y / len };
  };
  let d = `M ${stops[0].at.x} ${stops[0].at.y}`;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    const k = Math.hypot(b.at.x - a.at.x, b.at.y - a.at.y) * 0.39;
    const da = unit(a.dir);
    const db = unit(b.dir);
    d += c({ x: a.at.x + da.x * k, y: a.at.y + da.y * k }, { x: b.at.x - db.x * k, y: b.at.y - db.y * k }, b.at);
  }
  return d;
}

/**
 * The home page: a thread held by every hand. The left half is designed and the right half is its
 * exact mirror. Each runs from the top fist, dips to the upper hand, rounds the side to the lower
 * hand, and sweeps down, so the two meet on the call to action. The hands are nudged a few pixels
 * (top ones only upward, bottom ones only downward, so no cut edge shows) to sit on the thread.
 */
function heldByHands(width: number, hands: Record<HandName, Hand>): Thread {
  const mid = width / 2;
  const height = 110;
  const tip = { x: mid, y: height - 4 };

  const spread = (a: Hand, b: Hand) => (mid - a.at.x + (b.at.x - mid)) / 2;
  const top = { spread: spread(hands["top-left"], hands["top-right"]), y: Math.min(hands["top-left"].at.y, hands["top-right"].at.y) };
  const low = { spread: spread(hands["bottom-left"], hands["bottom-right"]), y: Math.max(hands["bottom-left"].at.y, hands["bottom-right"].at.y) };
  const targets: Record<HandName, Point> = {
    "top-left": { x: mid - top.spread, y: top.y },
    "top-right": { x: mid + top.spread, y: top.y },
    "top-center": { x: mid, y: hands["top-center"].at.y },
    "bottom-left": { x: mid - low.spread, y: low.y },
    "bottom-right": { x: mid + low.spread, y: low.y },
  };
  HAND_NAMES.forEach((name) => {
    const { at } = hands[name];
    nudge(name, Math.round(targets[name].x - at.x), Math.round(targets[name].y - at.y));
  });

  const fist = targets["top-center"];
  const upper = targets["top-left"];
  const lower = targets["bottom-left"];
  // How far the round side swings out beyond the hands.
  const radius = (lower.y - upper.y) / 2;
  const side = { x: Math.min(upper.x, lower.x) - radius * 0.75, y: (upper.y + lower.y) / 2 };

  const stops = [
    { at: fist, dir: { x: -1, y: 0 } },
    { at: { x: (fist.x + upper.x) / 2, y: (fist.y + upper.y) / 2 + 30 }, dir: { x: -1, y: 0 } }, // the dip between hands
    { at: upper, dir: { x: -1, y: 0.15 } },
    { at: side, dir: { x: 0, y: 1 } }, // the rounded side
    { at: lower, dir: { x: 1, y: 0.1 } },
    { at: tip, dir: { x: 0.55, y: 1 } }, // down onto the button
  ];
  const leftHalf = smoothPath(stops);
  const mirror = (path: string) => path.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (_, x: string, y: string) => `${2 * mid - Number(x)} ${y}`);
  const rightHalf = mirror(leftHalf);
  // The same curve, travelled the other way: from the button up the left side to the fist.
  const leftUp = smoothPath([...stops].reverse().map(({ at, dir }) => ({ at, dir: { x: -dir.x, y: -dir.y } })));

  return {
    width,
    height,
    d: [leftHalf, rightHalf],
    tip,
    flight: leftUp + rightHalf.replace(/^M [^C]*/, " "),
    rings: [
      { at: lower, angle: -12 },
      { at: targets["bottom-right"], angle: 12 },
    ],
  };
}

/** Other pages, and phones where the hands crowd together: two strings run in from the page edges. */
function fromEdges(width: number): Thread {
  const height = width < 640 ? 84 : 110;
  const tip = { x: width / 2, y: height - 5 };
  const edge = (x: number, dir: 1 | -1) =>
    `M ${x} 1` + c({ x: x + dir * width * 0.3, y: 1 }, { x: tip.x - dir * width * 0.05, y: height * 0.45 }, tip);
  return { width, height, d: [edge(0, 1), edge(width, -1)], tip, rings: [] };
}

/* ---------------- the paper plane showcase ---------------- */

const NOTE_TO = "To 21 Spheres";
// Today, written like a letterhead date: NOV 13, 2026.
const NOTE_DATE = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const NOTE = "Hi, we have an idea. Let\u2019s build it together.";
const TYPE_MS = 32;

// The sheet folding into a plane, drawn in a 100 x 130 box. Every stage has the same six corners,
// so each fold is a smooth change of shape: the flat sheet, top corners folded to the centre,
// sides folded in, then the wings opened out.
const FOLDS = [
  [[0, 0], [50, 0], [100, 0], [100, 130], [50, 130], [0, 130]],
  [[0, 48], [50, 0], [100, 48], [100, 130], [50, 130], [0, 130]],
  [[24, 64], [50, 0], [76, 64], [70, 130], [50, 130], [30, 130]],
  [[4, 116], [50, 0], [96, 116], [55, 104], [50, 130], [45, 104]],
];
const shapeOf = (points: number[][]) => "M " + points.map(([x, y]) => `${x} ${y}`).join(" L ") + " Z";
const PLANE_SHAPE = shapeOf(FOLDS[3]);
const SHEET_W = 132;
const SHEET_H = (SHEET_W / 100) * 130;
const PLANE_H = 30;
type Label = "start" | "sending" | "sent";

export function FooterCone() {
  const boxRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const reduceMotion = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [buttonIn, setButtonIn] = useState(false);
  const [sheet, setSheet] = useState<"hidden" | "shown" | "shrunk">("hidden");
  const [typed, setTyped] = useState(0);
  const [fold, setFold] = useState(0);
  const [flying, setFlying] = useState(false);
  const [label, setLabel] = useState<Label>("start");
  const [landings, setLandings] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const layout = () => {
      const rect = box.getBoundingClientRect();
      if (rect.width === 0) return;
      const hands = rect.width >= 768 ? findHands(rect) : null;
      if (!hands) HAND_NAMES.forEach((name) => nudge(name, 0, 0));
      setThread(hands ? heldByHands(rect.width, hands) : fromEdges(rect.width));
    };
    const observer = new ResizeObserver(layout);
    observer.observe(box);
    document.querySelectorAll("[data-cone-anchor]").forEach((el) => observer.observe(el));
    window.addEventListener("resize", layout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  // Everything starts together, once, when the thread scrolls into view.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          seen.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    seen.observe(box);
    return () => seen.disconnect();
  }, []);

  const showcase = Boolean(thread?.flight) && !reduceMotion;

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });
    let flight: { stop: () => void } | undefined;

    (async () => {
      await wait(reduceMotion ? 0 : 2450); // the thread finishes drawing
      if (cancelled) return;
      setButtonIn(true);
      if (!showcase) return;

      // The sheet rises out of the button and the note types itself.
      await wait(500);
      if (cancelled) return;
      setSheet("shown");
      await wait(450);
      for (let i = 1; i <= NOTE.length && !cancelled; i++) {
        setTyped(i);
        await wait(TYPE_MS);
      }
      await wait(650);

      // Three folds, then it shrinks down to the tip of the thread.
      for (let f = 1; f < FOLDS.length && !cancelled; f++) {
        setFold(f);
        await wait(f === 1 ? 520 : 400);
      }
      if (cancelled) return;
      setSheet("shrunk");
      await wait(420);
      if (cancelled) return;

      // The plane flies the whole thread, hand to hand, and back down to the button.
      const path = flightRef.current;
      const plane = planeRef.current;
      const trail = trailRef.current;
      if (path && plane && trail) {
        setSheet("hidden"); // the folded sheet becomes the plane
        setFlying(true);
        setLabel("sending");
        await new Promise<void>((resolve) => {
          flight = animate(0, 1, {
            duration: 3.6,
            ease: [0.45, 0, 0.3, 1],
            onUpdate: (progress) => {
              const live = path.getTotalLength();
              const at = progress * live;
              const here = path.getPointAtLength(at);
              const ahead = path.getPointAtLength(Math.min(live, at + 2));
              const behind = path.getPointAtLength(Math.max(0, at - 2));
              const heading = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
              // Leaves the fold nose-up, then turns to follow the thread.
              const turn = Math.min(1, progress / 0.06);
              const angle = -90 + (heading + 90) * turn;
              const scale = PLANE_H / 130;
              plane.setAttribute("transform", `translate(${here.x} ${here.y}) rotate(${angle + 90}) scale(${scale}) translate(-50 -65)`);
              // The thread behind the plane takes on its colour, so you can see where it has been.
              trail.setAttribute("stroke-dasharray", `${at} ${live + 10}`);
            },
            onComplete: () => resolve(),
          });
        });
      }
      if (cancelled) return;

      // It lands in the button: sent, a tick, and then back to normal as the thread fades back.
      setFlying(false);
      setLandings((n) => n + 1);
      setLabel("sent");
      await wait(2200);
      if (!cancelled) setLabel("start");
    })();

    return () => {
      cancelled = true;
      flight?.stop();
      timers.forEach((id) => window.clearTimeout(id));
    };
    // The showcase plays once per visit; layout changes during it are picked up by reading the live path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const height = thread?.height ?? 110;
  const after = (delay: number) => (reduceMotion ? { duration: 0 } : { delay, duration: 0.4 });
  const tip = thread?.tip;

  return (
    <div className="relative">
      <div ref={boxRef} className="relative w-full" style={{ height }}>
        {thread && (
          <svg aria-hidden="true" width={thread.width} height={height} className="pointer-events-none absolute inset-0 z-10 overflow-visible" fill="none">
            {/* Both halves run together from the top and meet on the button */}
            {thread.d.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={INK}
                strokeWidth={2.25}
                strokeLinecap="round"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={{ pathLength: started || reduceMotion ? 1 : 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 2.4, ease: [0.45, 0, 0.25, 1] }}
              />
            ))}
            {thread.rings.map(({ at, angle }) => (
              <motion.ellipse
                key={`${at.x}-${at.y}`}
                cx={at.x}
                cy={at.y}
                rx={6}
                ry={13}
                transform={`rotate(${angle} ${at.x} ${at.y})`}
                stroke={INK}
                strokeWidth={2}
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: started || reduceMotion ? 1 : 0 }}
                transition={after(1.6)}
              />
            ))}
            <motion.circle
              cx={thread.tip.x}
              cy={thread.tip.y}
              r={5}
              fill={INK}
              initial={{ scale: reduceMotion ? 1 : 0 }}
              animate={{ scale: started || reduceMotion ? 1 : 0 }}
              transition={after(2.3)}
            />

            {thread.flight && (
              <>
                <path ref={flightRef} d={thread.flight} stroke="none" />
                <defs>
                  {/* The travelled thread shades from the ink colour into the brand purple */}
                  <linearGradient id="footer-trail" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={thread.width} y2="0">
                    <stop offset="0%" stopColor={INK} />
                    <stop offset="50%" stopColor="#6D54F1" />
                    <stop offset="100%" stopColor={INK} />
                  </linearGradient>
                </defs>
                <path
                  ref={trailRef}
                  d={thread.flight}
                  stroke="url(#footer-trail)"
                  strokeDasharray="0 100000"
                  strokeOpacity={label === "start" && !flying ? 0 : 1}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  style={{ transition: `stroke-opacity ${label === "start" ? 1.2 : 0}s ease` }}
                />
                <g ref={planeRef} opacity={flying ? 1 : 0}>
                  <path d={PLANE_SHAPE} fill="#FFFFFF" stroke={INK} strokeWidth={4.5} strokeLinejoin="round" />
                  <path d="M 50 4 L 50 128" stroke={INK} strokeWidth={3} />
                </g>
              </>
            )}
          </svg>
        )}

        {/* The note sheet, rising out of the button and folding into the plane */}
        <AnimatePresence>
          {showcase && tip && sheet !== "hidden" && (
            <motion.div
              key="sheet"
              aria-hidden="true"
              className="pointer-events-none absolute z-20 origin-bottom"
              style={{ left: tip.x - SHEET_W / 2, top: tip.y - SHEET_H - 10, width: SHEET_W, height: SHEET_H }}
              initial={{ opacity: 0, y: 70, scale: 0.4 }}
              animate={
                sheet === "shrunk"
                  ? { opacity: 1, y: 10, scale: PLANE_H / SHEET_H }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: sheet === "shrunk" ? 0.4 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="-3 -3 106 136" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_22px_rgba(25,25,28,0.14)]">
                <motion.path
                  initial={false}
                  animate={{ d: shapeOf(FOLDS[fold]) }}
                  transition={{ duration: 0.38, ease: [0.65, 0, 0.35, 1] }}
                  fill="#FFFFFF"
                  stroke={INK}
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* A dashed inner border, like the reference's letter sheet */}
                <motion.rect
                  x="5" y="5" width="90" height="120" rx="1.5"
                  fill="none"
                  stroke="#C9C7D0"
                  strokeWidth={0.8}
                  strokeDasharray="2.5 2"
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ opacity: fold > 0 ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.path
                  d="M 50 2 L 50 128"
                  stroke={INK}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ opacity: fold > 0 ? 0.55 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 px-4 py-4 font-mono text-[10.5px] leading-[1.55] text-[#19191C]"
                initial={false}
                animate={{ opacity: fold > 0 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="pt-0.5 text-[8.5px] uppercase tracking-[0.08em] text-[#6E6D78]">{NOTE_DATE}</p>
                  {/* A small stamp carrying the logo mark */}
                  <span className="flex h-[26px] w-[22px] shrink-0 items-center justify-center rounded-[2px] bg-[#6D54F1] outline outline-1 outline-offset-[1.5px] outline-dashed outline-[#6D54F1]/50">
                    <svg viewBox={`0 0 ${MARK_SIZE[0]} ${MARK_SIZE[1]}`} className="h-3.5 w-3.5" fill="#FFFFFF">
                      {MARK_DOTS.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#6E6D78]">{NOTE_TO}</p>
                <p className="mt-1.5">
                  {NOTE.slice(0, typed)}
                  {typed > 0 && typed < NOTE.length && <span className="ml-px inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-[#19191C]" />}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The thread comes to rest on the call to action */}
      <div className="flex justify-center pb-6 pt-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.94 }}
          animate={buttonIn || reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.94 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            key={landings}
            initial={false}
            animate={landings > 0 ? { scale: [1, 1.07, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* The site's pill, built here so its circle can show the progress: arrow, spinner, then tick */}
            <Link
              href="/contact"
              className={`group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8] ${pillClassName("md")}`}
            >
              <span className="grid">
                {(["start", "sending", "sent"] as const).map((state) => (
                  <motion.span
                    key={state}
                    aria-hidden={state !== "start" || undefined}
                    className={`flex items-center [grid-area:1/1] ${state === "start" ? "" : "justify-center"}`}
                    initial={false}
                    animate={{ opacity: label === state ? 1 : 0, y: label === state ? 0 : state === "start" ? -8 : 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {state === "start" ? "Start a project" : state === "sending" ? "Sending" : "Sent"}
                  </motion.span>
                ))}
              </span>
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <AnimatePresence mode="wait" initial={false}>
                  {label === "start" && (
                    <motion.span key="arrow" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
                      <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none" />
                    </motion.span>
                  )}
                  {label === "sending" && (
                    <motion.span
                      key="spinner"
                      aria-hidden="true"
                      className="block h-[18px] w-[18px] animate-spin rounded-full border-2 border-black/15 border-t-black motion-reduce:animate-none"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {label === "sent" && (
                    <motion.svg key="tick" aria-hidden="true" viewBox="0 0 16 16" className="h-[18px] w-[18px]" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.15 }}>
                      <motion.path
                        d="M3 8.5 L6.5 12 L13 4.5"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function BackToTopButton() {
  const reduceMotion = useReducedMotion();
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
      className="group inline-flex items-center gap-2 transition-colors hover:text-[#19191C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7057D9]"
    >
      Back to top
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#DADADD] transition-colors group-hover:border-[#19191C]">
        <ArrowUp aria-hidden="true" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
      </span>
    </button>
  );
}
