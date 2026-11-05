"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  FolderOpen,
  Layers,
  Presentation,
  Rocket,
  UsersRound,
  X,
} from "lucide-react";
import { HOW_WE_WORK_CONTENT, WORK_FLOORPLAN_STEPS } from "@/content/howWeWork";
import { useHashLink } from "@/lib/useHashLink";

interface HowWeWorkFloorplanSectionProps {
  embedded?: boolean;
}

const STAGE_SUMMARIES = [
  "Goals, user journeys, and a clear scope. Workshops with your team become a signed-off SRS.",
  "System blueprint, data, APIs, and tech choices, weighed for scale, cost, and security.",
  "Design systems and interactive prototypes you can click through before any code is written.",
  "Focused sprints, integrations, and regular demos, so you see working software every cycle.",
  "Automated and manual testing, load runs, and security scans before anything ships.",
  "Launch with a rollback plan, live monitoring, and support that continues after go-live.",
];

const STAGE_DELIVERABLES = [
  ["Scope document", "User journeys", "SRS"],
  ["Architecture diagram", "Tech stack", "API plan"],
  ["Design system", "Wireframes", "Clickable prototype"],
  ["Sprint demos", "Integrations", "Release builds"],
  ["Test reports", "Performance audit", "Security review"],
  ["Production launch", "Monitoring", "Support plan"],
];

const STAGE_ICONS = [CalendarDays, UsersRound, FolderOpen, Presentation, Layers, Rocket];

/* ------------------------------------------------------------------ *
 * Desktop geometry. The track fills all the space under the title.
 * Pills sit on one baseline at the bottom; beam heights climb stage by
 * stage and are scaled to the measured track height.
 *
 * Every card is centred on its own beam, so the stem always meets the
 * middle of the card (first and last stage included). The card width is
 * limited by the room that really exists around the track (so the outer
 * cards never leave the screen), and the card height is measured from
 * the real content (so text is never clipped, whatever the width).
 * ------------------------------------------------------------------ */
const PILL_BOTTOM = 28;
const PILL_H = 40;
const TOTAL = WORK_FLOORPLAN_STEPS.length;
const STEM_BOTTOM = PILL_BOTTOM + PILL_H - 2;
const MIN_BODY_H = 150; // fallback body height before measuring
const STUB_H = 24; // short connector between the beam tip and the card
const CARD_R = 20; // card corner radius
const CARD_MAX_W = 380;
const CARD_MIN_W = 240;
const EDGE_GAP = 12; // breathing room kept between a card and the screen edge
const LABEL_W = 140; // width of the stage title label above each beam
const LABEL_GAP = 12; // clear space kept between an open card and the neighbouring labels
const CHECK_SIZE = 20;
const TRACK_MIN_H = 520;

const stemHeight = (index: number, trackH: number, cardH: number) => {
  const maxH = Math.max(150, trackH - STEM_BOTTOM - cardH - 16);
  const base = Math.max(60, maxH * 0.38);
  return base + ((maxH - base) * index) / (TOTAL - 1);
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* Typing speed in the cards, in ms per character. */
const TITLE_TYPE_MS = 10;
const SUMMARY_TYPE_MS = 5;
const CARD_TEXT_DELAY_MS = 430;
const AFTER_TITLE_MS = 50;

function TypewriterText({
  text,
  className = "",
  speed = 24,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      let count = 0;
      interval = window.setInterval(() => {
        count += 1;
        setVisible(count);
        if (count >= text.length) window.clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [delay, speed, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, visible)}</span>
      {visible > 0 && visible < text.length && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-[#C8B4FF]"
        />
      )}
    </span>
  );
}

/* The card is *drawn* by the beam. The beam reaches its tip, extends a
 * short stub, then splits in two. Each half races around the rounded
 * outline (with a bright comet head) and they meet at the top. A liquid
 * fill spreads out from the junction right behind the lines, then the
 * text is typed. Closing plays it all in reverse: text, fill, then the
 * outline retracts back down into the beam.
 *
 * The stem always sits at the horizontal middle of the card, so both
 * halves are perfectly symmetric. */
function StageCard({
  index,
  cardW,
  cardH,
  reduced,
  onClose,
}: {
  index: number;
  cardW: number;
  cardH: number;
  reduced: boolean;
  onClose?: () => void;
}) {
  const step = WORK_FLOORPLAN_STEPS[index];
  const summary = STAGE_SUMMARIES[index];
  const chips = STAGE_DELIVERABLES[index];
  const Icon = STAGE_ICONS[index];

  const W = cardW;
  const H = cardH;
  const B = cardH - STUB_H; // bottom edge of the body
  const R = CARD_R;
  const mid = W / 2;
  const tipX = mid; // stem is always centred on the card

  const arc = (Math.PI * R) / 2;
  const side = B - 2 * R;
  const half = tipX - R + arc + side + arc + (mid - R) + 2;
  const lenL = half;
  const lenR = half;
  const dL = `M ${tipX} ${B} L ${R} ${B} A ${R} ${R} 0 0 1 0 ${B - R} L 0 ${R} A ${R} ${R} 0 0 1 ${R} 0 L ${mid} 0`;
  const dR = `M ${tipX} ${B} L ${W - R} ${B} A ${R} ${R} 0 0 0 ${W} ${B - R} L ${W} ${R} A ${R} ${R} 0 0 0 ${W - R} 0 L ${mid} 0`;

  const stubT = reduced ? 0 : 0.08;
  const drawDelay = stubT;
  const drawDur = reduced ? 0 : 0.4;
  const fillDelay = reduced ? 0 : drawDelay + 0.1;
  const fillDur = reduced ? 0 : 0.45;
  const contentDelay = reduced ? 0 : drawDelay + 0.25;
  const ease = [0.5, 0.05, 0.25, 1] as const;
  const COMET = 34;
  const reach = Math.hypot(W, B) + 24;

  const titleDelay = CARD_TEXT_DELAY_MS;
  const summaryDelay = titleDelay + step.title.length * TITLE_TYPE_MS + AFTER_TITLE_MS;
  const chipsDelay = (summaryDelay + summary.length * SUMMARY_TYPE_MS + 30) / 1000;

  const outline = (d: string, len: number, key: string) => (
    <React.Fragment key={key}>
      {/* the outline itself */}
      <motion.path
        d={d}
        fill="none"
        stroke="#B79CFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={len}
        initial={{ strokeDashoffset: len }}
        animate={{ strokeDashoffset: 0 }}
        exit={{ strokeDashoffset: len, transition: { duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.05, ease } }}
        transition={{ duration: drawDur, delay: drawDelay, ease }}
      />
      {/* bright comet head riding the leading edge */}
      <motion.path
        d={d}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={`${COMET} ${len * 2}`}
        style={{ filter: "drop-shadow(0 0 6px #C8B4FF) drop-shadow(0 0 12px #8D66FF)" }}
        initial={{ strokeDashoffset: COMET, opacity: reduced ? 0 : 1 }}
        animate={{ strokeDashoffset: COMET - len, opacity: reduced ? 0 : [1, 1, 0] }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        transition={{
          strokeDashoffset: { duration: drawDur, delay: drawDelay, ease },
          opacity: { duration: drawDur, delay: drawDelay, times: [0, 0.9, 1] },
        }}
      />
    </React.Fragment>
  );

  return (
    <div className="absolute z-40" style={{ left: 0, bottom: 0, width: cardW, height: cardH }}>
      {/* soft halo, appears once the card is formed */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0"
        style={{ width: W, height: B, borderRadius: R }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.15 } }}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : drawDelay + drawDur }}
      >
        <div
          className="h-full w-full"
          style={{ borderRadius: R, boxShadow: "0 0 44px rgba(128,87,232,.38), 0 18px 40px rgba(60,30,120,.35)" }}
        />
      </motion.div>

      {/* liquid fill, spreading from the junction of stub and card */}
      <motion.article
        aria-label={`Stage ${step.step}: ${step.title}`}
        className="absolute left-0 top-0 overflow-hidden text-left"
        style={{
          width: W,
          height: B,
          borderRadius: R,
          background:
            "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(128,87,232,.42) 0%, transparent 70%), radial-gradient(ellipse 60% 70% at 0% 100%, rgba(95,60,180,.28) 0%, transparent 70%), linear-gradient(135deg, #261848 0%, #150E26 65%)",
        }}
        initial={{ clipPath: `circle(0px at ${tipX}px ${B}px)` }}
        animate={{ clipPath: `circle(${reach}px at ${tipX}px ${B}px)` }}
        exit={{ clipPath: `circle(0px at ${tipX}px ${B}px)`, transition: { duration: reduced ? 0 : 0.25, ease } }}
        transition={{ duration: fillDur, delay: fillDelay, ease: EASE_OUT }}
      >
        <Icon
          aria-hidden="true"
          className="absolute -right-3 -top-3 h-28 w-28 text-[#B79CFF]/15"
          strokeWidth={1}
        />
        <motion.div
          className="relative z-10 flex h-full flex-col px-5 pb-3.5 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.1 } }}
          transition={{ duration: reduced ? 0 : 0.2, delay: contentDelay }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#C8B4FF]">{step.step} / 06</span>
            <span className="h-px flex-1 bg-white/15" />
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close stage card"
                className="-mr-1 flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white">
            {reduced ? step.title : <TypewriterText text={step.title} speed={TITLE_TYPE_MS} delay={titleDelay} />}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-white/75">
            {reduced ? summary : <TypewriterText text={summary} speed={SUMMARY_TYPE_MS} delay={summaryDelay} />}
          </p>
          <motion.div
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : chipsDelay }}
            className="mt-auto flex flex-wrap gap-1.5 pt-2.5"
          >
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#C8B4FF]/30 bg-white/[0.07] px-2.5 py-0.5 text-[10px] font-medium text-[#E4D9FF]"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.article>

      {/* beam outline: stub + two halves racing around the card */}
      <svg
        aria-hidden="true"
        width={W}
        height={H}
        className="pointer-events-none absolute left-0 top-0 z-20 overflow-visible"
        style={{ filter: "drop-shadow(0 0 4px rgba(169,138,255,.65))" }}
      >
        <motion.line
          x1={tipX}
          y1={H}
          x2={tipX}
          y2={B}
          stroke="#D9C9FF"
          strokeWidth={2}
          strokeDasharray={STUB_H + 1}
          initial={{ strokeDashoffset: STUB_H + 1 }}
          animate={{ strokeDashoffset: 0 }}
          exit={{ strokeDashoffset: STUB_H + 1, transition: { duration: reduced ? 0 : 0.08, delay: reduced ? 0 : 0.28 } }}
          transition={{ duration: stubT }}
        />
        {outline(dL, lenL, "l")}
        {outline(dR, lenR, "r")}
      </svg>
    </div>
  );
}

export function HowWeWorkFloorplanSection({ embedded = false }: HowWeWorkFloorplanSectionProps) {
  const prefersReducedMotion = !!useReducedMotion();
  // Set once the visitor jumps ahead: from then on everything appears without animating.
  const [skipped, setSkipped] = useState(false);
  const reduced = prefersReducedMotion || skipped;

  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [finished, setFinished] = useState(false);

  // Progress counters: stage i has reached a step when its counter is > i.
  const [linkCount, setLinkCount] = useState(0);
  const [pillCount, setPillCount] = useState(0);
  const [stemCount, setStemCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [trackW, setTrackW] = useState(0);
  const [trackH, setTrackH] = useState(TRACK_MIN_H);
  const [edgeRoom, setEdgeRoom] = useState(0); // free space between the track and the screen edge
  const [bodyH, setBodyH] = useState(MIN_BODY_H); // measured height of the tallest card body

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  // Read by the sequence directly: a stale render must never start it after a jump ahead.
  const introSkipped = useRef(false);

  /* ---------- open / close ---------- */
  const closeStageCard = useCallback(() => setExpandedIndex(null), []);

  const showStageCard = useCallback((index: number) => {
    setActiveIndex(index);
    setExpandedIndex(index);
  }, []);

  /* Finish the whole sequence at once: every stage done, nothing left animating. */
  const completeIntro = useCallback(() => {
    introSkipped.current = true;
    setSkipped(true);
    setHasEntered(true);
    setLinkCount(TOTAL);
    setPillCount(TOTAL);
    setStemCount(TOTAL);
    setTitleCount(TOTAL);
    setCompletedCount(TOTAL);
    setFinished(true);
  }, []);

  /* Each open card has its own address, so Back and Forward step through them. */
  const togglePill = useCallback(
    (index: number) => {
      if (finished && expandedIndex === index) {
        closeStageCard();
        router.replace("/#how-we-work", { scroll: false });
        return;
      }
      if (!finished) completeIntro();
      showStageCard(index);
      router.push(`/#${WORK_FLOORPLAN_STEPS[index].id}`, { scroll: false });
    },
    [closeStageCard, completeIntro, expandedIndex, finished, router, showStageCard]
  );

  const closeFromCard = useCallback(() => {
    closeStageCard();
    router.replace("/#how-we-work", { scroll: false });
  }, [closeStageCard, router]);

  /* ---------- the address decides which card is open ---------- */
  useHashLink((hash) => {
    const requested = WORK_FLOORPLAN_STEPS.findIndex((s) => `#${s.id}` === hash);
    if (requested < 0) {
      if (introSkipped.current) closeStageCard();
      return;
    }
    completeIntro();
    showStageCard(requested);
  });

  /* ---------- start when scrolled into view ---------- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ---------- measure the desktop track (size + room left on each side) ---------- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportW = document.documentElement.clientWidth;
      setTrackW(rect.width);
      if (rect.height > 0) setTrackH(rect.height);
      setEdgeRoom(Math.max(0, Math.min(rect.left, viewportW - rect.right) - EDGE_GAP));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  /* ---------- card width: as wide as comfortable, never beyond the screen ----------
   * The first and last cards are centred on their stems too, so each can
   * only be as wide as one column plus the free space on both sides. */
  const colW = trackW / TOTAL;
  // the label above each beam is at most this wide
  const labelW = Math.max(0, Math.min(LABEL_W, colW - 8));
  // widest card that still clears the neighbouring labels (card is centred on its beam)
  const neighbourLimit = 2 * (colW - labelW / 2 - LABEL_GAP);
  // widest card that still stays on screen (first / last cards)
  const edgeLimit = colW + 2 * edgeRoom;
  const cardW =
    trackW > 0
      ? Math.round(Math.max(CARD_MIN_W, Math.min(CARD_MAX_W, neighbourLimit, edgeLimit)))
      : 0;

  /* ---------- card height: measured from the real content at that width ---------- */
  useEffect(() => {
    const el = measureRef.current;
    if (!el || cardW <= 0) return;
    const measure = () => {
      let max = 0;
      Array.from(el.children).forEach((child) => {
        max = Math.max(max, (child as HTMLElement).offsetHeight);
      });
      if (max > 0) setBodyH(Math.max(MIN_BODY_H, Math.ceil(max) + 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => undefined);
    }
    return () => ro.disconnect();
  }, [cardW]);

  const cardH = bodyH + STUB_H;

  /* ---------- the choreography ----------
   * For every stage, in order:
   *   1. dashed line draws to the next slot (not for stage 1)
   *   2. pill forms at the bottom
   *   3. beam rises from the pill
   *   4. card grows out of the beam tip, text is typed
   *   5. card collapses back into the beam
   *   6. the title is written above the beam
   *   7. the tick forms, then we move on to the next stage
   */
  useEffect(() => {
    if (!hasEntered || skipped || finished || introSkipped.current) return;

    const t = prefersReducedMotion
      ? { link: 120, pill: 160, stem: 160, card: 160, hold: 900, close: 160, title: 120, check: 160, gap: 120 }
      : { link: 240, pill: 220, stem: 280, card: 0, hold: 600, close: 350, title: 80, check: 120, gap: 60 };

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

    (async () => {
      for (let i = 0; i < TOTAL; i++) {
        if (cancelled) return;
        const step = WORK_FLOORPLAN_STEPS[i];
        const summary = STAGE_SUMMARIES[i];

        if (i > 0) {
          setLinkCount(i);
          await wait(t.link);
          if (cancelled) return;
        }

        setActiveIndex(i);
        setPillCount(i + 1);
        await wait(t.pill);
        if (cancelled) return;

        setStemCount(i + 1);
        await wait(t.stem);
        if (cancelled) return;

        setExpandedIndex(i);
        const typing = prefersReducedMotion ? 0 : CARD_TEXT_DELAY_MS + step.title.length * TITLE_TYPE_MS + AFTER_TITLE_MS + summary.length * SUMMARY_TYPE_MS + 200;
        await wait(t.card + typing + t.hold);
        if (cancelled) return;

        setExpandedIndex(null);
        await wait(t.close);
        if (cancelled) return;

        setTitleCount(i + 1);
        await wait(t.title);
        if (cancelled) return;

        setCompletedCount(i + 1);
        await wait(t.check + t.gap);
      }
      if (!cancelled) setFinished(true);
    })();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [hasEntered, skipped, finished, prefersReducedMotion]);

  const activeStep = WORK_FLOORPLAN_STEPS[activeIndex];

  /* ---------- card placement: always centred on its own column / beam ---------- */
  const cardOffset = (colW - cardW) / 2;

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      data-embedded={embedded ? "true" : undefined}
      className="how-we-work-process relative scroll-mt-14 sm:scroll-mt-16 min-h-[calc(100svh-5rem)] w-full overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse 88% 90% at 78% 5%, rgba(112, 72, 194, 0.42) 0%, rgba(72, 43, 123, 0.28) 36%, transparent 76%),
          radial-gradient(ellipse 70% 70% at 18% 100%, rgba(74, 43, 125, 0.26) 0%, transparent 72%),
          linear-gradient(118deg, #050408 0%, #0D0817 52%, #160B24 100%)
        `,
      }}
    >
      {/* Link targets for each stage, so /#stage-id lands on this section */}
      {WORK_FLOORPLAN_STEPS.map((step) => (
        <span key={step.id} id={step.id} aria-hidden="true" className="absolute left-0 top-0 scroll-mt-14 sm:scroll-mt-16" />
      ))}
      <div className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1600px] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:pb-8 lg:pt-12">
        {/* ------------------------------- header (top) ------------------------------- */}
        <header className="mb-6 flex shrink-0 flex-col gap-3 sm:mb-8 lg:mb-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#C8B4FF] sm:text-xs">
              Our process
            </p>
            <h2 className="text-[clamp(2.8rem,6vw,4.75rem)] font-light leading-[0.98] tracking-[-0.055em] text-white/90 lg:text-[clamp(2.8rem,4vw,4rem)]">
              How We Work
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/70 sm:text-[13px] lg:pb-1 lg:text-right">
            Six clear stages. One accountable path from first brief to launch.
          </p>
        </header>

        {/* ------------------------------ desktop track (fills the rest) ------------------------------ */}
        <div
          ref={trackRef}
          className="relative hidden min-w-0 flex-1 lg:mx-6 lg:block"
          style={{ minHeight: TRACK_MIN_H }}
        >
          {/* hidden ruler: renders every card's real content at the real card width,
              so the card height always fits the tallest text. */}
          {cardW > 0 && (
            <div
              ref={measureRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute left-0 top-0 -z-10"
              style={{ width: cardW }}
            >
              {WORK_FLOORPLAN_STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className="flex flex-col px-5 pb-3.5 pt-4"
                  style={{ width: cardW }}
                >
                  <div className="mb-2 flex h-6 items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.18em]">{step.step} / 06</span>
                  </div>
                  <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed">{STAGE_SUMMARIES[i]}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2.5">
                    {STAGE_DELIVERABLES[i].map((chip) => (
                      <span key={chip} className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="absolute inset-0 grid grid-cols-6">
            {WORK_FLOORPLAN_STEPS.map((step, index) => {
              const hasLink = index < TOTAL - 1 && linkCount > index;
              const hasPill = index < pillCount;
              const hasStem = index < stemCount;
              const hasTitle = index < titleCount;
              const isComplete = index < completedCount;
              const isActive = activeIndex === index;
              const isExpanded = expandedIndex === index;
              const duration = HOW_WE_WORK_CONTENT.steps[index]?.duration;
              const StageIcon = STAGE_ICONS[index];
              const stemH = stemHeight(index, trackH, cardH);
              const stemTop = STEM_BOTTOM + stemH;

              return (
                <div key={step.id} className="relative h-full min-w-0 text-center">
                  {/* dashed line from this pill to the next slot */}
                  {hasLink && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute z-0 h-[2px] origin-left"
                      initial={{ scaleX: reduced ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduced ? 0 : 0.22, ease: "easeInOut" }}
                      style={{
                        left: "50%",
                        width: "100%",
                        bottom: PILL_BOTTOM + PILL_H / 2 - 1,
                        backgroundImage:
                          "repeating-linear-gradient(to right, rgba(255,255,255,0.45) 0 5px, transparent 5px 10px)",
                      }}
                    />
                  )}

                  {/* glassmorphic pill forms at the bottom */}
                  {hasPill && (
                    <div
                      className="pointer-events-none absolute left-0 right-0 z-30 flex justify-center"
                      style={{ bottom: PILL_BOTTOM }}
                    >
                      <motion.button
                        type="button"
                        onClick={() => togglePill(index)}
                        aria-label={`Show ${step.title} card`}
                        initial={{ opacity: 0, scaleX: reduced ? 1 : 0.2, scaleY: reduced ? 1 : 0.55 }}
                        animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
                        transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
                        className={`pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full border py-1 pl-3.5 pr-1 text-[10px] font-medium tracking-wide backdrop-blur-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2C1FF] disabled:cursor-default ${isActive
                          ? "border-[#C8B4FF]/50 bg-[#8057E8]/35 text-white shadow-[0_8px_28px_rgba(128,87,232,.45),inset_0_1px_0_rgba(255,255,255,.35)]"
                          : "border-white/20 bg-white/[0.07] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] enabled:hover:border-white/40 enabled:hover:bg-white/[0.12]"
                          }`}
                        style={{ height: PILL_H }}
                      >
                        {duration}
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md ${isActive ? "border-white/40 bg-white/20" : "border-white/25 bg-white/10"
                            }`}
                        >
                          <StageIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </span>
                      </motion.button>
                    </div>
                  )}

                  {/* beam rising from the pill */}
                  {hasStem && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute z-10 w-[2px] origin-bottom"
                      initial={{ scaleY: reduced ? 1 : 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        left: "50%",
                        marginLeft: -1,
                        bottom: STEM_BOTTOM,
                        height: stemH,
                        background: isExpanded
                          ? "linear-gradient(to top, #A98AFF, #EFE7FF)"
                          : isComplete
                            ? "rgba(156,115,255,.75)"
                            : "rgba(255,255,255,.3)",
                        boxShadow: isExpanded ? "0 0 14px 3px rgba(174,126,255,.9)" : "none",
                        transition: "background .4s, box-shadow .4s",
                      }}
                    />
                  )}

                  {/* card grows out of the beam tip, centred on the beam */}
                  <AnimatePresence key={skipped ? "skipped" : "playing"}>
                    {isExpanded && cardW > 0 && (
                      <div
                        key="card"
                        className="absolute"
                        style={{ left: cardOffset, bottom: stemTop, width: cardW, height: cardH }}
                      >
                        <StageCard
                          index={index}
                          cardW={cardW}
                          cardH={cardH}
                          reduced={reduced}
                          onClose={finished ? closeFromCard : undefined}
                        />
                      </div>
                    )}
                  </AnimatePresence>

                  {/* title + tick, shown once the card has closed */}
                  {hasTitle && !isExpanded && (
                    <>
                      <div
                        className="absolute left-1/2 z-20 -translate-x-1/2 text-center"
                        style={{
                          bottom: stemTop + CHECK_SIZE + 8,
                          width: `min(${LABEL_W}px, calc(100% - 8px))`,
                        }}
                      >
                        <p className={`font-mono text-[9px] tracking-[0.16em] ${isActive ? "text-[#C8B4FF]" : "text-white/60"}`}>
                          {step.step} / 06
                        </p>
                        <p
                          className={`mt-1 text-[12px] font-medium leading-[1.2] xl:text-[13px] ${isActive ? "text-[#C8B4FF]" : "text-white/90"
                            }`}
                        >
                          {step.title}
                        </p>
                      </div>

                      {isComplete && (
                        <motion.span
                          aria-label="Completed"
                          initial={{ scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 420, damping: 18 }}
                          className="absolute left-1/2 z-20 flex items-center justify-center rounded-full bg-[#A98AFF] text-[#170E29] shadow-[0_0_14px_rgba(169,138,255,.55)]"
                          style={{
                            width: CHECK_SIZE,
                            height: CHECK_SIZE,
                            marginLeft: -CHECK_SIZE / 2,
                            bottom: stemTop,
                          }}
                        >
                          <Check className="h-3 w-3" strokeWidth={2.8} />
                        </motion.span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------ mobile: vertical sequence ------------------------------ */}
        <div className="relative lg:hidden">
          {WORK_FLOORPLAN_STEPS.map((step, index) => {
            const hasPill = index < pillCount;
            if (!hasPill) return null;
            const hasTitle = index < titleCount;
            const isComplete = index < completedCount;
            const isActive = activeIndex === index;
            const isExpanded = expandedIndex === index;
            const hasLink = index < TOTAL - 1 && linkCount > index;
            const duration = HOW_WE_WORK_CONTENT.steps[index]?.duration;
            const StageIcon = STAGE_ICONS[index];

            return (
              <div key={step.id} className="relative grid min-h-[96px] grid-cols-[28px_minmax(0,1fr)] gap-4 pb-6">
                <div className="relative flex justify-center">
                  {hasLink && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute bottom-[-14px] left-1/2 top-7 w-px origin-top bg-white/35"
                      initial={{ scaleY: reduced ? 1 : 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: reduced ? 0 : 0.22, ease: "easeInOut" }}
                    />
                  )}
                  <span
                    className={`relative z-10 mt-2.5 font-mono text-[9px] tracking-[0.14em] ${isActive ? "text-[#D2C1FF]" : "text-white/45"
                      }`}
                  >
                    {step.step}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col items-start">
                  <motion.button
                    type="button"
                    onClick={() => togglePill(index)}
                    aria-label={`Show ${step.title} card`}
                    initial={{ opacity: 0, scaleX: reduced ? 1 : 0.3 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
                    style={{ transformOrigin: "left center" }}
                    className={`mt-1 inline-flex items-center gap-2 rounded-full border py-1 pl-3 pr-1 text-[10px] backdrop-blur-xl disabled:cursor-default ${isActive
                      ? "border-[#C8B4FF]/50 bg-[#8057E8]/35 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3)]"
                      : "border-white/20 bg-white/[0.07] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,.18)]"
                      }`}
                  >
                    {duration}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <StageIcon className="h-3 w-3" />
                    </span>
                  </motion.button>

                  <AnimatePresence key={skipped ? "skipped" : "playing"} initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="m-card"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
                        className="mt-3 w-full overflow-hidden"
                      >
                        <div className="relative rounded-xl border border-[#A98AFF]/65 bg-[#171020] p-3.5 pr-10 shadow-[0_0_28px_rgba(128,87,232,.4)]">
                          {finished && (
                            <button
                              type="button"
                              onClick={closeFromCard}
                              aria-label="Close stage card"
                              className="absolute right-2 top-2 rounded-full p-1 text-white/55 hover:bg-white/10 hover:text-white"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <h3 className="mb-1.5 text-sm font-semibold text-white">
                            {reduced ? step.title : <TypewriterText text={step.title} speed={TITLE_TYPE_MS} delay={200} />}
                          </h3>
                          <p className="text-xs leading-relaxed text-white/75">
                            {reduced ? (
                              STAGE_SUMMARIES[index]
                            ) : (
                              <TypewriterText
                                text={STAGE_SUMMARIES[index]}
                                speed={SUMMARY_TYPE_MS}
                                delay={200 + step.title.length * TITLE_TYPE_MS + AFTER_TITLE_MS}
                              />
                            )}
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {STAGE_DELIVERABLES[index].map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-[#C8B4FF]/30 bg-white/[0.07] px-2 py-0.5 text-[10px] text-[#E4D9FF]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {hasTitle && !isExpanded && (
                    <div className="mt-3 flex items-center gap-2">
                      {isComplete && (
                        <motion.span
                          aria-label="Completed"
                          initial={{ scale: reduced ? 1 : 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 420, damping: 18 }}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A98AFF] text-[#170E29]"
                        >
                          <Check className="h-3 w-3" strokeWidth={2.8} />
                        </motion.span>
                      )}
                      <p className="text-[13px] font-medium text-white/90">
                        {step.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <span className="sr-only" aria-live="polite">
          Stage {activeStep.step}: {activeStep.title}
        </span>
      </div>
    </section>
  );
}

export default HowWeWorkFloorplanSection;