"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

export function HowWeWorkFloorplanSection({ embedded = false }: HowWeWorkFloorplanSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [stemCount, setStemCount] = useState(0);
  const [markerCount, setMarkerCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pillCount, setPillCount] = useState(0);
  const [copyCount, setCopyCount] = useState(0);
  const [firstPassComplete, setFirstPassComplete] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepCursor = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const allSteps = prefersReducedMotion ? WORK_FLOORPLAN_STEPS.length : 0;
  const visibleStemCount = Math.max(stemCount, allSteps);
  const visibleMarkerCount = Math.max(markerCount, allSteps);
  const visibleCompletedCount = Math.max(completedCount, allSteps);
  const visiblePillCount = Math.max(pillCount, allSteps);
  const visibleCopyCount = Math.max(copyCount, allSteps);
  const sequenceComplete = firstPassComplete || (hasEntered && Boolean(prefersReducedMotion));

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
    if (!hasEntered || firstPassComplete || prefersReducedMotion) return;

    let stageIndex = 0;
    const timers: number[] = [];
    const after = (delay: number, callback: () => void) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const revealNextStage = () => {
      stepCursor.current = stageIndex;
      setActiveIndex(stageIndex);
      setStemCount(stageIndex + 1);

      after(460, () => {
        setMarkerCount(stageIndex + 1);
        after(300, () => {
          setPillCount(stageIndex + 1);
          after(380, () => {
            setCopyCount(stageIndex + 1);
            after(360, () => {
              setCompletedCount(stageIndex + 1);
              after(420, () => {
                stageIndex += 1;
                if (stageIndex < WORK_FLOORPLAN_STEPS.length) {
                  revealNextStage();
                } else {
                  setFirstPassComplete(true);
                  stepCursor.current = 0;
                  setActiveIndex(0);
                  setCompletedCount(0);
                }
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
  const progress = activeIndex / (WORK_FLOORPLAN_STEPS.length - 1);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      data-embedded={embedded ? "true" : undefined}
      className="how-we-work-process relative mx-auto my-3 min-h-[calc(100svh-5.5rem)] w-[calc(100%-1.5rem)] max-w-[1880px] overflow-hidden rounded-[22px] border border-white/10 text-white shadow-[0_22px_70px_rgba(20,10,40,0.18)] lg:min-h-[calc(100svh-5.5rem)]"
      style={{
        background: `
          radial-gradient(ellipse 88% 90% at 78% 5%, rgba(112, 72, 194, 0.68) 0%, rgba(72, 43, 123, 0.42) 36%, transparent 76%),
          radial-gradient(ellipse 70% 70% at 18% 100%, rgba(74, 43, 125, 0.38) 0%, transparent 72%),
          linear-gradient(118deg, #0B0814 0%, #160D27 52%, #211039 100%)
        `,
      }}
    >
      <div
        className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1600px] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[calc(100svh-5.5rem)] lg:px-12 lg:py-[clamp(32px,5vh,56px)]"
      >
        <header className="mb-6 flex shrink-0 flex-col gap-3 pb-2 sm:mb-8 lg:mb-5">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#C8B4FF] sm:text-xs">
              Our process
            </p>
            <h2 className="text-[clamp(2.8rem,6vw,4.75rem)] font-light leading-[0.98] tracking-[-0.055em] text-white/90">
              How We Work
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/70 sm:text-[13px]">
            Six clear stages. One accountable path from first brief to launch.
          </p>
        </header>

        <div className="hidden h-[clamp(440px,58vh,560px)] shrink-0 lg:block">
          <div className="relative h-full">
            {/* Shared baseline and the animated journey marker. */}
            <div
              aria-hidden="true"
              className="absolute bottom-[53px] left-[8.333%] right-[8.333%] h-[2px]"
              style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.42) 0 5px, transparent 5px 10px)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#A98AFF] to-[#E0D2FF]"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.78, ease: [0.22, 1, 0.36, 1] }}
              />
              {sequenceComplete && !prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 h-3 w-3 rounded-full bg-white shadow-[0_0_14px_5px_rgba(210,193,255,0.8)]"
                  animate={{ left: `${progress * 100}%` }}
                  transition={{ duration: 0.72, ease: [0.2, 0.8, 0.25, 1] }}
                />
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
                      className={`group process-copy-pop absolute left-2 right-2 flex flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2C1FF] ${isActive ? "opacity-100" : "opacity-75"}`}
                      style={{ top: `${lift}px`, minHeight: "132px" }}
                    >
                      <span className={`mb-2 font-mono text-[10px] tracking-[0.16em] transition-colors ${isActive ? "text-[#D2C1FF]" : "text-white/45"}`}>
                        {step.step} / 06
                      </span>
                      <h3 className={`max-w-[190px] text-[15px] font-medium leading-[1.2] tracking-[-0.025em] transition-colors xl:text-base ${isActive ? "text-white" : "text-white/75 group-hover:text-white"}`}>
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[190px] text-[11px] leading-[1.45] text-white/60">
                        {STAGE_SUMMARIES[index]}
                      </p>
                    </Link>}

                    {/* Each fine vertical stem meets the shared process baseline. */}
                    {hasStem && <div
                      aria-hidden="true"
                      className={`process-stem-rise absolute left-1/2 w-px -translate-x-1/2 ${isActive ? "bg-[#D2C1FF]" : "bg-white/35"}`}
                      style={{
                        top: `${lift + 140}px`,
                        bottom: "53px",
                        animationDelay: "0ms",
                      }}
                    />}

                    {hasMarker && <span
                      className={`process-stage-marker absolute left-1/2 z-10 flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isComplete
                          ? "border-[#BCA5F5] bg-[#8B70E0] shadow-[0_0_0_4px_rgba(185,154,255,0.13)]"
                          : isActive
                            ? "border-[#E0D2FF] bg-[#321E5A] shadow-[0_0_0_5px_rgba(210,193,255,0.16)]"
                            : "border-white/60 bg-[#1E1231] group-hover:border-[#D2C1FF]"
                      }`}
                      style={{ top: `${lift + 140}px` }}
                    >
                      {isComplete && <Check className="process-tick-draw h-[15px] w-[15px] text-white" strokeWidth={3.2} />}
                    </span>}

                    {hasPill && <Link
                      href={`/how-we-work#${step.id}`}
                      aria-label={`View details for ${step.title}`}
                      className={`process-pill-pop absolute bottom-[35px] left-1/2 z-30 inline-flex h-9 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border py-1 pl-3.5 pr-1 text-[10px] font-medium tracking-wide backdrop-blur-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2C1FF] ${isActive ? "border-white/55 bg-white/20 text-white shadow-[0_5px_20px_rgba(0,0,0,0.2)]" : "border-white/30 bg-white/10 text-white/80 shadow-[0_3px_12px_rgba(0,0,0,0.12)] hover:border-white/55 hover:bg-white/20 hover:text-white"}`}
                    >
                        {duration}
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/35 ${isActive ? "bg-[#A98AFF] text-[#170E29]" : "bg-[#7057D9] text-white"}`}>
                        <StageIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                    </Link>}
                  </div>
                );
              })}
        </div>
        </div>
        </div>

        {/* Mobile and tablet keep the same sequence without compressing the labels. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {WORK_FLOORPLAN_STEPS.map((step, index) => {
            if (index >= visibleCopyCount) return null;
            const isActive = activeIndex === index;
            const isComplete = index < visibleCompletedCount;
            const duration = HOW_WE_WORK_CONTENT.steps[index]?.duration;

            return (
              <Link
                key={step.id}
                href={`/how-we-work#${step.id}`}
                className={`group process-copy-pop relative flex min-h-[162px] flex-col items-start overflow-hidden rounded-xl border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2C1FF] ${isActive ? "border-white/35 bg-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.16)] backdrop-blur-md" : "border-white/20 bg-white/[0.07] backdrop-blur-sm hover:bg-white/[0.12]"}`}
              >
                <div className="mb-3 flex w-full items-center justify-between gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${isActive ? "bg-[#B99AFF] text-[#211039]" : isComplete ? "bg-white/20 text-white" : "bg-white/10 text-white/65"}`}>
                    {isComplete ? <Check className="h-3.5 w-3.5" /> : step.step}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-white/65">
                    <Clock3 className="h-3 w-3" />
                    {duration}
                  </span>
                </div>
                <h3 className={`text-[15px] font-medium leading-snug tracking-tight ${isActive ? "text-white" : "text-white/75"}`}>
                  {step.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/60">
                  {STAGE_SUMMARIES[index]}
                </p>
                <span className="group mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-[#D2C1FF]">
                  View stage <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {isActive && !prefersReducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#B99AFF] to-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.6, ease: "linear" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <span className="sr-only" aria-live="polite">Stage {activeStep.step}: {activeStep.title}</span>
      </div>
    </section>
  );
}

export default HowWeWorkFloorplanSection;
