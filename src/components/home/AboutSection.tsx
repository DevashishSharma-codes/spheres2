"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Gauge,
  Workflow,
  BrainCircuit,
  Users,
  Target,
  Flag,
  Eye,
} from "lucide-react";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";
import { AboutCard as AboutCarouselCard } from "@/components/about/AboutCard";
import { ABOUT_CARDS, ABOUT_INTRO, type AboutCard } from "@/content/about";
import { useHashLink } from "@/lib/useHashLink";
import { useRouter } from "next/navigation";

export interface AboutCardItem extends AboutCard {
  icon: React.ComponentType<{ className?: string }>;
}

const CARD_ICONS: Record<string, AboutCardItem["icon"]> = {
  "built-around-your-business": Briefcase,
  "engineering-that-scales": Gauge,
  "automation-that-works": Workflow,
  "connected-intelligence": BrainCircuit,
  "people-behind-the-technology": Users,
  "our-purpose": Target,
  "our-mission": Flag,
  "our-vision": Eye,
};

const BASE_CARDS: AboutCardItem[] = ABOUT_CARDS.map((card) => ({ ...card, icon: CARD_ICONS[card.id] ?? Briefcase }));

const ARROW_CLASS =
  "absolute top-[calc(50%-12px)] z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#19191C] to-[#573EBF] text-white shadow-[0_8px_20px_-8px_rgba(43,39,53,0.6)] transition-[filter] duration-200 hover:brightness-125";

// The carousel position is a plain counter with no start or end. Cards are drawn around wherever
// the track is on screen, so there is always a card to show, however fast it's clicked.
const CARDS_EACH_SIDE = 7; // enough to fill very wide screens either side of the centre card
// Settles without overshooting, and keeps its momentum when a new click arrives mid-slide.
const SLIDE_SPRING = { stiffness: 90, damping: 20, mass: 1 };

export function AboutSection({ showStatistics = false }: { showStatistics?: boolean } = {}) {
  const baseCount = BASE_CARDS.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCenter, setVisibleCenter] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCard, setSelectedCard] = useState<AboutCardItem | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [lead, second, third] = ABOUT_INTRO.paragraphs;
  const router = useRouter();

  // Each card's detail has its own address, so Back and Forward open and close it.
  const openCard = useCallback((card: AboutCardItem) => {
    setSelectedCard(card);
    router.push(`/#${card.id}`, { scroll: false });
  }, [router]);

  const closeCard = useCallback(() => {
    setSelectedCard(null);
    if (BASE_CARDS.some((card) => `#${card.id}` === window.location.hash)) {
      router.replace("/#about", { scroll: false });
    }
  }, [router]);
  const reduceMotion = useReducedMotion();
  const position = useSpring(0, SLIDE_SPRING);
  const trackOffset = useTransform(position, (value) => -value);
  const trackTransform = useMotionTemplate`translate3d(calc(var(--about-step) * ${trackOffset}), 0, 0)`;

  useMotionValueEvent(position, "change", (value) => setVisibleCenter(Math.round(value)));

  useEffect(() => {
    if (reduceMotion) position.jump(currentIndex);
    else position.set(currentIndex);
  }, [currentIndex, position, reduceMotion]);

  const activeBaseIndex = ((currentIndex % baseCount) + baseCount) % baseCount;

  // Next smoothly advances by 1 card in continuous motion
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Prev smoothly steps back by 1 card in continuous motion
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Shortest circular path for pagination dots:
  // e.g. clicking dot 0 from dot 4 smoothly advances forward by 1 (+1) rather than rewinding across all 4 cards
  const handleDotClick = useCallback((targetIndex: number) => {
    const currentBase = ((currentIndex % baseCount) + baseCount) % baseCount;
    if (targetIndex === currentBase) return;

    let diff = targetIndex - currentBase;
    if (diff > baseCount / 2) {
      diff -= baseCount;
    } else if (diff < -baseCount / 2) {
      diff += baseCount;
    }

    setCurrentIndex((prev) => prev + diff);
  }, [currentIndex, baseCount]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDismissingRef = useRef(false);

  // Smoothly close the modal and scroll down (or up) cleanly via requestAnimationFrame
  const smoothDismissAndScroll = useCallback((isDown: boolean) => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

    closeCard();

    const startY = window.scrollY;
    let targetDistance = isDown 
      ? Math.max(window.innerHeight * 0.72, 480) 
      : -Math.min(window.innerHeight * 0.6, 400);

    // If scrolling down, smoothly target the next section (#how-we-work) if nearby
    if (isDown) {
      const nextSection = document.getElementById("how-we-work");
      if (nextSection) {
        const rect = nextSection.getBoundingClientRect();
        if (rect.top > 40) {
          targetDistance = rect.top;
        }
      }
    }

    const duration = 580;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentY = startY + targetDistance * easeOutCubic(progress);
      window.scrollTo(0, Math.max(0, currentY));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          isDismissingRef.current = false;
        }, 150);
      }
    };

    requestAnimationFrame(step);
  }, [closeCard]);

  // When modal is open: ESC closes it, and scrolling (wheel or touch) closes it and continues scrolling down
  useEffect(() => {
    if (!selectedCard) {
      isDismissingRef.current = false;
      return;
    }

    let touchStartY = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCard();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        smoothDismissAndScroll(e.deltaY > 0);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (Math.abs(deltaY) > 15) {
          smoothDismissAndScroll(deltaY > 0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [closeCard, selectedCard, smoothDismissAndScroll]);

  // Auto-play timer (pauses on hover or when modal is open)
  useEffect(() => {
    if (isHovered || selectedCard !== null) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered, selectedCard, handleNext]);

  // The address decides which card's detail is open
  useHashLink((hash) => {
    const foundIdx = BASE_CARDS.findIndex((c) => `#${c.id}` === hash);
    if (foundIdx === -1) {
      setSelectedCard(null);
      return;
    }
    handleDotClick(foundIdx);
    setSelectedCard(BASE_CARDS[foundIdx]);
  });

  return (
    <div className="relative z-0 w-full overflow-hidden border-b border-[#ECEBF0] bg-white">
      <section
        id="about"
        className="relative z-10 flex w-full min-h-[calc(100vh-64px)] scroll-mt-14 flex-col justify-center overflow-hidden py-8 sm:scroll-mt-16 lg:py-10"
      >
        {/* Link targets for each card, so /#card-id lands on this section */}
        {BASE_CARDS.map((card) => (
          <span key={card.id} id={card.id} aria-hidden="true" className="absolute left-0 top-0 scroll-mt-14 sm:scroll-mt-16" />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 border-b border-[#E7E5EB] pb-5 sm:gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="flex flex-col items-start lg:col-span-5">
              <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-[11px]">
                OUR STORY
              </span>
              <h2 className="select-none whitespace-nowrap text-3xl font-light leading-none tracking-[-0.045em] text-[#232129] sm:text-4xl md:text-5xl lg:text-[52px]">
                About Us
              </h2>
              <p className="mt-2.5 text-sm font-light text-[#6E6D78]">
                {ABOUT_INTRO.tagline}
              </p>
            </div>
            {/* Centred against the heading. The first paragraph leads; the other two sit side by side beneath it. On phones the
                last one waits behind "Read more", so the cards still show without much scrolling. */}
            <div className="lg:col-span-7">
              <p className="text-[15.5px] font-light leading-[1.5] tracking-[-0.01em] text-[#2A2A2E] sm:text-[17px] lg:text-[18px]">
                {lead}
              </p>
              <div className="mt-3 grid gap-2.5 text-[13px] font-light leading-relaxed text-[#6E6D78] sm:grid-cols-2 sm:gap-8 sm:text-[13.5px]">
                <p>{second}</p>
                <p className={introOpen ? "" : "hidden sm:block"}>{third}</p>
              </div>
              {!introOpen && (
                <button
                  type="button"
                  onClick={() => setIntroOpen(true)}
                  className="mt-2 text-[13px] font-medium text-[#7057D9] underline-offset-4 hover:underline sm:hidden"
                >
                  Read more
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Runs edge to edge, with the outer cards fading away instead of being cut off. Swipe on phones. */}
        <div
          className="relative z-10 mt-1 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous card"
            className={`left-3 sm:left-6 lg:left-10 ${ARROW_CLASS}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next card"
            className={`right-3 sm:right-6 lg:right-10 ${ARROW_CLASS}`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <motion.div
            onPanEnd={(_, info) => {
              if (info.offset.x < -40) handleNext();
              else if (info.offset.x > 40) handlePrev();
            }}
            style={{ touchAction: "pan-y" }}
            className="relative overflow-hidden pb-12 pt-6 [--about-card:280px] [--about-step:294px] [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:[--about-card:300px] sm:[--about-step:320px] lg:[--about-card:320px] lg:[--about-step:340px]">
            <div className="relative h-[400px]">
              <motion.div
                className="absolute inset-y-0 left-1/2 w-0 will-change-transform"
                style={{ transform: trackTransform }}
              >
                {Array.from({ length: CARDS_EACH_SIDE * 2 + 1 }, (_, offset) => {
                  const index = visibleCenter - CARDS_EACH_SIDE + offset;
                  const baseIndex = ((index % baseCount) + baseCount) % baseCount;
                  const card = BASE_CARDS[baseIndex];
                  const isActive = currentIndex === index;

                  return (
                    <div
                      key={index}
                      className={`absolute bottom-0 origin-bottom transition-transform duration-500 ease-out motion-reduce:transition-none ${isActive ? "scale-100" : "scale-[0.94]"}`}
                      style={{
                        left: `calc(var(--about-step) * ${index})`,
                        width: "var(--about-card)",
                        marginLeft: "calc(var(--about-card) / -2)",
                      }}
                    >
                      <AboutCarouselCard
                        active={isActive}
                        title={card.title}
                        summary={card.summary}
                        icon={card.icon}
                        image={card.image}
                        onClick={() => {
                          if (isActive) openCard(card);
                          else setCurrentIndex(index);
                        }}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-1.5">
            {BASE_CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  activeBaseIndex === i
                    ? "w-6 bg-gradient-to-r from-[#7057D9] to-[#8E79E8]"
                    : "w-1.5 bg-[#DADADD] hover:bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* =========================================================
            INTERACTIVE CARD DETAILS MODAL DIALOG (MOUNTED TO PORTAL)
            - Uses createPortal so:
              * Modal opens dead-center in the middle of the screen
              * Full viewport backdrop blur & dimming (lighthouse effect)
              * Never clipped by parent section overflow or scroll offset
            ========================================================= */}
        {mounted && selectedCard && createPortal(
          <div 
            className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer"
            onClick={closeCard}
            onWheel={(e) => {
              if (Math.abs(e.deltaY) > 5) {
                smoothDismissAndScroll(e.deltaY > 0);
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="relative w-full max-w-[860px] my-auto bg-white rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] flex flex-col md:flex-row border border-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Right Close (Cross) Button */}
              <button
                type="button"
                onClick={closeCard}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-200/80 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left 48%: Full Photo */}
              <div className="relative w-full md:w-[48%] min-h-[260px] sm:min-h-[340px] md:min-h-[460px] overflow-hidden bg-slate-100">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Right 52%: Content section */}
              <div className="w-full md:w-[52%] p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white text-left">
                <div>
                  {/* Top Row: Circular Icon Badge */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-purple-200/80 bg-purple-50/50 flex items-center justify-center text-[#7057D9] shadow-xs">
                      <selectedCard.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7057D9]">{selectedCard.pill}</p>
                  <h3 className="text-2xl sm:text-[28px] font-light text-[#111114] tracking-[-0.035em] leading-tight mb-4 pr-8">
                    {selectedCard.title}
                  </h3>
                  {selectedCard.headline && (
                    <p className="-mt-1 mb-4 text-[15px] font-normal leading-snug text-[#2A2A2E]">{selectedCard.headline}</p>
                  )}

                  {/* Narrative paragraphs */}
                  <div className="space-y-3.5 text-gray-600 text-[13px] sm:text-sm font-light leading-relaxed">
                    {selectedCard.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}

      </section>

      {/* =========================================================
          COMPANY STATISTICS & DELIVERABLES (OPTIONAL EMBEDDED MODE)
          ========================================================= */}
      {showStatistics && <CompanyStatisticsSection embedded />}

    </div>
  );
}

