"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  FolderOpen,
  Layers,
  Presentation,
  Rocket,
  UsersRound,
} from "lucide-react";
import { HOW_WE_WORK_CONTENT, WORK_FLOORPLAN_STEPS } from "@/content/howWeWork";

interface HowWeWorkFloorplanSectionProps {
  embedded?: boolean;
}

const STAGE_TOPS = [180, 145, 110, 75, 40, 5];
const STAGE_SUMMARIES = [
  "Goals, user journeys, and a clear project scope.",
  "System blueprint, data, APIs, and technology choices.",
  "Design systems and interactive prototypes.",
  "Focused sprints, integrations, and regular demos.",
  "Quality, performance, and security checks.",
  "Launch, monitoring, and ongoing support.",
];
const STAGE_ICONS = [CalendarDays, UsersRound, FolderOpen, Presentation, Layers, Rocket];

// Module-level in-memory flag:
// Resets only when the browser page is reloaded (F5 / Cmd+R).
// Persists across client-side page routing and in-page scrolling.
let hasCompletedFirstPassOnce = false;

export function HowWeWorkFloorplanSection({ embedded = false }: HowWeWorkFloorplanSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(hasCompletedFirstPassOnce);
  const [isInView, setIsInView] = useState(false);
  const [stemCount, setStemCount] = useState(hasCompletedFirstPassOnce ? WORK_FLOORPLAN_STEPS.length : 0);
  const [markerCount, setMarkerCount] = useState(hasCompletedFirstPassOnce ? WORK_FLOORPLAN_STEPS.length : 0);
  const [completedCount, setCompletedCount] = useState(hasCompletedFirstPassOnce ? 1 : 0);
  const [pillCount, setPillCount] = useState(hasCompletedFirstPassOnce ? WORK_FLOORPLAN_STEPS.length : 0);
  const [copyCount, setCopyCount] = useState(hasCompletedFirstPassOnce ? WORK_FLOORPLAN_STEPS.length : 0);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [firstPassComplete, setFirstPassComplete] = useState(hasCompletedFirstPassOnce);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepCursor = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const allSteps = prefersReducedMotion || hasCompletedFirstPassOnce ? WORK_FLOORPLAN_STEPS.length : 0;
  const visibleStemCount = Math.max(stemCount, allSteps);
  const visibleMarkerCount = Math.max(markerCount, allSteps);
  const visibleCompletedCount = Math.max(completedCount, allSteps);
  const visiblePillCount = Math.max(pillCount, allSteps);
  const visibleCopyCount = Math.max(copyCount, allSteps);
  const sequenceComplete = firstPassComplete || hasCompletedFirstPassOnce || (hasEntered && Boolean(prefersReducedMotion));
  const cursorProgress = (prefersReducedMotion ? activeIndex : cursorIndex) / (WORK_FLOORPLAN_STEPS.length - 1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered || prefersReducedMotion) return;

    const travelTimer = window.setTimeout(() => setCursorIndex(activeIndex), 360);
    return () => {
      window.clearTimeout(travelTimer);
    };
  }, [activeIndex, hasEntered, prefersReducedMotion]);

  useEffect(() => {
    if (hasCompletedFirstPassOnce || !hasEntered || firstPassComplete || prefersReducedMotion) return;

    let stageIndex = 0;
    const timers: number[] = [];
    const after = (delay: number, callback: () => void) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const revealNextStage = () => {
      stepCursor.current = stageIndex;
      setActiveIndex(stageIndex);

      // Let the brand mark spin and travel to the stage before the node and stem appear.
      after(1050, () => {
        setMarkerCount(stageIndex + 1);
        after(500, () => {
          setStemCount(stageIndex + 1);
          after(300, () => {
            setPillCount(stageIndex + 1);
            after(280, () => {
              setCopyCount(stageIndex + 1);
              after(280, () => {
                setCompletedCount(stageIndex + 1);
                after(300, () => {
                stageIndex += 1;
                if (stageIndex < WORK_FLOORPLAN_STEPS.length) {
                  revealNextStage();
                } else {
                  hasCompletedFirstPassOnce = true;
                  setFirstPassComplete(true);
                  setMarkerCount(WORK_FLOORPLAN_STEPS.length);
                  setStemCount(WORK_FLOORPLAN_STEPS.length);
                  setPillCount(WORK_FLOORPLAN_STEPS.length);
                  setCopyCount(WORK_FLOORPLAN_STEPS.length);
                  stepCursor.current = 0;
                  setActiveIndex(0);
                  setCompletedCount(0);
                }
              });
              });
            });
          });
        });
      });
    };

    revealNextStage();
    return () => timers.forEach(window.clearTimeout);
  }, [firstPassComplete, hasEntered, prefersReducedMotion]);

  useEffect(() => {
    if (!sequenceComplete || !isInView || prefersReducedMotion) return;

    let completionTimer = window.setTimeout(() => setCompletedCount(stepCursor.current + 1), 560);
    const loopTimer = window.setInterval(() => {
      stepCursor.current = (stepCursor.current + 1) % WORK_FLOORPLAN_STEPS.length;
      setActiveIndex(stepCursor.current);
      window.clearTimeout(completionTimer);

      if (stepCursor.current === 0) {
        setCompletedCount(0);
        completionTimer = window.setTimeout(() => setCompletedCount(1), 560);
      } else {
        setCompletedCount(stepCursor.current);
        completionTimer = window.setTimeout(() => setCompletedCount(stepCursor.current + 1), 560);
      }
    }, 2200);

    return () => {
      window.clearInterval(loopTimer);
      window.clearTimeout(completionTimer);
    };
  }, [isInView, prefersReducedMotion, sequenceComplete]);

  const activeStep = WORK_FLOORPLAN_STEPS[activeIndex];
  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      data-embedded={embedded ? "true" : undefined}
      className="how-we-work-process relative min-h-[calc(100svh-5rem)] w-full overflow-hidden text-[#241D31]"
      style={{
        background: `
          radial-gradient(ellipse 78% 82% at 88% 8%, rgba(180, 148, 255, 0.40) 0%, rgba(218, 204, 255, 0.24) 40%, transparent 78%),
          radial-gradient(ellipse 60% 74% at 4% 96%, rgba(198, 176, 255, 0.34) 0%, rgba(228, 219, 255, 0.16) 48%, transparent 76%),
          linear-gradient(118deg, #FFFFFF 0%, #FCFAFF 42%, #F2ECFF 100%)
        `,
      }}
    >
      <div
        className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1600px] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[calc(100svh-5.5rem)] lg:px-12 lg:py-[clamp(32px,5vh,56px)]"
      >
        <header className="mb-6 flex shrink-0 flex-col gap-3 pb-2 sm:mb-8 lg:mb-5">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-xs">
              Our process
            </p>
            <h2 className="text-[clamp(2.8rem,6vw,4.75rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#211A2C]">
              How We Work
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#716B7B] sm:text-[13px]">
            Six clear stages. One accountable path from first brief to launch.
          </p>
        </header>

        <div className="hidden h-[clamp(440px,58vh,560px)] shrink-0 lg:block">
          <div className="relative h-full">
            {/* Shared baseline and the animated journey marker. */}
            <div
              aria-hidden="true"
              className="absolute bottom-[53px] left-[8.333%] right-[8.333%] h-[2px]"
              style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(105,88,141,0.28) 0 5px, transparent 5px 10px)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7057D9] via-[#9B79F1] to-[#C8AFFF]"
                animate={{ width: `${cursorProgress * 100}%` }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.78, ease: [0.22, 1, 0.36, 1] }}
              />
              {hasEntered && visibleMarkerCount > 0 && !prefersReducedMotion && (
                <motion.span
                  key={`connection-pulse-${activeIndex}`}
                  aria-hidden="true"
                  className="absolute top-1/2 z-[1] h-[3px] w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-[#A68AF2] blur-[1px]"
                  style={{ left: `${cursorProgress * 100}%` }}
                  initial={{ opacity: 0, scaleX: 0.25 }}
                  animate={{ opacity: [0, 0.95, 0], scaleX: [0.25, 1, 0.4] }}
                  transition={{ duration: 0.72, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {hasEntered && !prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-4 left-0 z-[2] flex h-8 w-8 -translate-x-1/2 items-center justify-center"
                  animate={{ left: `${cursorProgress * 100}%` }}
                  transition={{ duration: 0.68, ease: [0.2, 0.8, 0.25, 1] }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-[5px] rounded-full bg-[#8060D8]/45 opacity-80 blur-md"
                  />
                  <motion.span
                    key={`brand-spin-${activeIndex}-${hasEntered}`}
                    className="relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/90 bg-white/85 shadow-[0_4px_12px_rgba(83,57,157,0.25),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-md"
                    initial={{ rotate: -120, scale: 0.72 }}
                    animate={{ rotate: 360, scale: [0.72, 1.08, 1, 1, 1.28, 1] }}
                    transition={{
                      rotate: { duration: 0.36, ease: [0.2, 0.85, 0.25, 1] },
                      scale: { duration: 1.1, times: [0, 0.32, 0.38, 0.87, 0.95, 1], ease: [0.2, 0.85, 0.25, 1] },
                    }}
                  >
                    <Image src="/logo-square.png" alt="" aria-hidden="true" width={44} height={44} className="h-[22px] w-[22px] object-contain" />
                  </motion.span>
                  <motion.span
                    key={`brand-arrival-${activeIndex}`}
                    aria-hidden="true"
                    className="absolute inset-[3px] rounded-full border border-[#8060D8]"
                    initial={{ scale: 0.65, opacity: 0.9 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.56, delay: 0.95, ease: "easeOut" }}
                  />
                </motion.span>
              )}
            </div>

            <div className="grid h-full grid-cols-6">
              {WORK_FLOORPLAN_STEPS.map((step, index) => {
                const hasStem = index < visibleStemCount;
                const hasMarker = index < visibleMarkerCount;
                const hasPill = index < visiblePillCount;
                const hasCopy = index < visibleCopyCount;
                const isActive = activeIndex === index;
                const isComplete = index < visibleCompletedCount;
                const duration = HOW_WE_WORK_CONTENT.steps[index]?.duration;
                const lift = STAGE_TOPS[index];
                const StageIcon = STAGE_ICONS[index];

                return (
                  <div key={step.id} className="relative h-full min-w-0 text-center">
                    {/* Stage copy rises progressively from left to right. */}
                    {hasCopy && <Link
                      href={`/how-we-work#${step.id}`}
                      onClick={() => {
                        stepCursor.current = index;
                        setActiveIndex(index);
                      }}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Stage ${step.step}: ${step.title}`}
                      className={`group process-copy-pop absolute left-2 right-2 flex flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B79F1] ${isActive ? "opacity-100" : "opacity-80"}`}
                      style={{ top: `${lift}px`, minHeight: "132px" }}
                    >
                      <span className={`mb-2 font-mono text-[10px] tracking-[0.16em] transition-colors ${isActive ? "text-[#7057D9]" : "text-[#928A9D]"}`}>
                        {step.step} / 06
                      </span>
                      <h3 className={`max-w-[190px] text-[15px] font-medium leading-[1.2] tracking-[-0.025em] transition-colors xl:text-base ${isActive ? "text-[#38265F]" : "text-[#514A5E] group-hover:text-[#38265F]"}`}>
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[190px] text-[11px] leading-[1.45] text-[#777180]">
                        {STAGE_SUMMARIES[index]}
                      </p>
                    </Link>}

                    {/* Each fine vertical stem meets the shared process baseline. */}
                    {hasStem && <div
                      aria-hidden="true"
                      className={`process-stem-rise absolute left-1/2 w-px -translate-x-1/2 ${isActive ? "bg-[#8D6CE8]" : "bg-[#C9C0D7]"}`}
                      style={{
                        top: `${lift + 140}px`,
                        bottom: "53px",
                        animationDelay: "0ms",
                      }}
                    />}

                    {hasMarker && <span
                      className={`process-stage-marker absolute left-1/2 z-10 flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isComplete
                          ? "border-[#8B6CE1] bg-[#8B6CE1] shadow-[0_0_0_4px_rgba(139,108,225,0.16)]"
                          : isActive
                            ? "border-[#7057D9] bg-white shadow-[0_0_0_5px_rgba(112,87,217,0.14)]"
                            : "border-[#BEB5CD] bg-white group-hover:border-[#8D6CE8]"
                      }`}
                      style={{ top: `${lift + 140}px` }}
                    >
                      {isActive && !prefersReducedMotion && (
                        <motion.span
                          key={`stage-arrival-${activeIndex}`}
                          aria-hidden="true"
                          className="absolute inset-[-5px] rounded-full border border-[#8B6CE1]"
                          initial={{ scale: 0.72, opacity: 0.75 }}
                          animate={{ scale: 1.9, opacity: 0 }}
                          transition={{ duration: 0.68, ease: "easeOut" }}
                        />
                      )}
                      {isComplete && <Check className="process-tick-draw h-[15px] w-[15px] text-white" strokeWidth={3.2} />}
                    </span>}

                    {hasPill && <Link
                      href={`/how-we-work#${step.id}`}
                      aria-label={`View details for ${step.title}`}
                      className={`process-pill-pop absolute bottom-[35px] left-1/2 z-30 inline-flex h-10 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-1 py-1 pl-3.5 text-[10px] font-medium tracking-wide backdrop-blur-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B79F1] ${isActive ? "border-white/90 bg-[linear-gradient(135deg,rgba(112,87,217,0.94),rgba(145,112,231,0.84))] text-white shadow-[0_9px_26px_rgba(91,65,166,0.22),inset_0_1px_1px_rgba(255,255,255,0.72)]" : "border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(235,228,250,0.68))] text-[#514765] shadow-[0_6px_20px_rgba(91,65,166,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:border-[#C5B5EE] hover:bg-white hover:text-[#48337C]"}`}
                    >
                        {duration}
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${isActive ? "border-white/70 bg-white/20 text-white" : "border-white bg-[linear-gradient(145deg,#FFFFFF,#E4D9FA)] text-[#7057D9]"}`}>
                        <StageIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                    </Link>}
                  </div>
                );
              })}
        </div>
        </div>
        </div>

        {/* Mobile uses a vertical, connected stage sequence. */}
        <div className="relative lg:hidden">
          {WORK_FLOORPLAN_STEPS.map((step, index) => {
            const hasStem = index < visibleStemCount;
            const hasMarker = index < visibleMarkerCount;
            const hasCopy = index < visibleCopyCount;
            if (!hasStem && !hasMarker && !hasCopy) return null;
            const isActive = activeIndex === index;
            const isComplete = index < visibleCompletedCount;
            const duration = HOW_WE_WORK_CONTENT.steps[index]?.duration;

            return (
              <div key={step.id} className="relative grid min-h-[104px] grid-cols-[28px_minmax(0,1fr)] gap-4 pb-7">
                <div className="relative flex justify-center">
                  {index < WORK_FLOORPLAN_STEPS.length - 1 && index + 1 < visibleStemCount && (
                    <span aria-hidden="true" className="process-mobile-connect absolute left-1/2 top-6 bottom-[-14px] w-px -translate-x-1/2 bg-[#C9BCE4]" />
                  )}
                  {hasMarker && (
                    <span className={`process-mobile-square relative z-10 flex h-6 w-6 items-center justify-center rounded-[6px] border-2 font-mono text-[8px] font-semibold ${isComplete ? "border-[#8B70E0] bg-[#8B70E0] text-white shadow-[0_0_0_4px_rgba(139,112,224,0.13)]" : isActive ? "border-[#7057D9] bg-white text-[#7057D9] shadow-[0_0_0_4px_rgba(112,87,217,0.13)]" : "border-[#BEB5CD] bg-white text-[#81798C]"}`}>
                      {isActive && !prefersReducedMotion && (
                        <motion.span
                          key={`mobile-stage-arrival-${activeIndex}`}
                          aria-hidden="true"
                          className="absolute inset-[-5px] rounded-[9px] border border-[#8B6CE1]"
                          initial={{ scale: 0.72, opacity: 0.75 }}
                          animate={{ scale: 1.9, opacity: 0 }}
                          transition={{ duration: 0.68, ease: "easeOut" }}
                        />
                      )}
                      {isComplete ? <Check className="process-tick-draw h-[16px] w-[16px] text-white" strokeWidth={3.2} /> : step.step}
                    </span>
                  )}
                </div>

                {hasCopy && (
                  <Link
                    href={`/how-we-work#${step.id}`}
                    onClick={() => {
                      stepCursor.current = index;
                      setActiveIndex(index);
                    }}
                    aria-current={isActive ? "step" : undefined}
                    className={`process-mobile-copy group flex flex-col gap-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B79F1] ${isActive ? "text-[#312347]" : "text-[#514A5E]"}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={`text-[15px] font-medium leading-snug tracking-tight ${isActive ? "text-[#38265F]" : "text-[#514A5E] group-hover:text-[#38265F]"}`}>
                        {step.title}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-medium tracking-wide text-[#81798C]">
                        <Clock3 className="h-3 w-3" />
                        {duration}
                      </span>
                    </span>
                    <span className="text-xs leading-relaxed text-[#777180]">
                      {STAGE_SUMMARIES[index]}
                    </span>
                    <span className="inline-flex items-center gap-1 pt-0.5 text-[10px] font-semibold text-[#7057D9]">
                      View stage <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <span className="sr-only" aria-live="polite">Stage {activeStep.step}: {activeStep.title}</span>
      </div>
    </section>
  );
}

export default HowWeWorkFloorplanSection;
