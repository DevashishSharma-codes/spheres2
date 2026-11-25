"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from "framer-motion";
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
  "absolute max-sm:hidden top-[calc(50%-12px)] z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-purple-200/60 bg-white/95 text-[#160429] shadow-[0_4px_16px_rgba(74,18,120,0.18)] backdrop-blur-md transition-colors duration-200 hover:bg-white";

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

  /* A click on any card opens its details and brings that card to the centre behind them. */
  const onCardClick = (index: number, card: AboutCardItem) => {
    if (currentIndex !== index) setCurrentIndex(index);
    openCard(card);
  };

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
  const panelRef = useRef<HTMLDivElement>(null);
  // The popup's scrolling text area: the wheel scrolls it first, and only closes the popup at its end.
  const panelScrollRef = useRef<HTMLDivElement>(null);
  // The paragraph area of the detail. On desktop its type is sized to fill the space it has, so
  // cards with shorter and longer text look equally full.
  const paragraphRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const area = paragraphRef.current;
    if (!area || !selectedCard) return;
    area.style.fontSize = "";
    area.style.lineHeight = "";
    if (!window.matchMedia("(min-width: 640px)").matches) return;
    for (let size = 19; size >= 14; size -= 0.5) {
      area.style.fontSize = `${size}px`;
      area.style.lineHeight = size >= 17 ? "1.55" : "1.65";
      if (area.scrollHeight <= area.clientHeight) break;
    }
  }, [selectedCard]);

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
    let touchInPanel = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCard();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= 5) return;
      // Over the popup's text, scroll the text while there's more to read in that direction.
      const area = panelScrollRef.current;
      if (area && area.contains(e.target as Node)) {
        const canScroll = e.deltaY > 0
          ? area.scrollTop + area.clientHeight < area.scrollHeight - 1
          : area.scrollTop > 0;
        if (canScroll) return;
      }
      smoothDismissAndScroll(e.deltaY > 0);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        // A swipe inside the card scrolls its text; only a swipe outside it closes the card.
        touchInPanel = !!panelRef.current?.contains(e.target as Node);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && !touchInPanel) {
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
    if (window.matchMedia("(max-width: 767px)").matches) return;
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
        className="relative z-10 flex w-full scroll-mt-14 flex-col justify-center overflow-hidden py-8 md:min-h-[calc(100vh-64px)] sm:scroll-mt-16 lg:py-10"
      >
        {/* A pale sunrise skyline behind the section, softened top and bottom, with a faint grid.
            It is a wide panorama, so it is anchored low to keep the skyline and its waves in view. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/about/about_us_new/skyline.webp"
            alt=""
            fill
            sizes="100vw"
            className="scale-[1.02] object-cover object-[center_70%] opacity-95"
          />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(42,42,46,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(42,42,46,.10) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-white/55" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

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
            {/* Centred against the heading. The first paragraph leads; the other two follow beneath it in the same single column. On phones the
                last one waits behind "Read more", so the cards still show without much scrolling. */}
            <div className="lg:col-span-7">
              <p className="text-[15.5px] font-light leading-[1.5] tracking-[-0.01em] text-[#2A2A2E] sm:text-[17px] lg:text-[18px]">
                {lead}
              </p>
              <div className="mt-3 grid max-w-[640px] gap-2.5 text-[13px] font-light leading-relaxed text-[#6E6D78] sm:text-[13.5px]">
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
            className="relative overflow-hidden pb-8 pt-5 sm:pb-12 sm:pt-6 [--about-card:min(300px,78vw)] [--about-step:calc(min(300px,78vw)+14px)] [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:[--about-card:300px] sm:[--about-step:320px] lg:[--about-card:320px] lg:[--about-step:340px]">
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
                        pill={card.pill}
                        icon={card.icon}
                        image={card.image}
                        onClick={() => onCardClick(index, card)}
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
                className={`h-1.5 cursor-pointer rounded-full bg-clip-content py-0 transition-all duration-300 max-sm:box-content max-sm:py-2 ${
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
        {mounted && createPortal(
          <AnimatePresence>
          {selectedCard && (
          <motion.div
            key="about-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-md flex items-end justify-center p-0 sm:items-center sm:p-6 overflow-hidden cursor-pointer"
            onClick={closeCard}
            role="dialog"
            aria-modal="true"
          >
            {/* One fixed portrait size for every card. The photo runs full width at its own shape, so it
                fits exactly. Below it, the paragraph's type is sized to fill its space, so every card looks
                equally full, and the points close the sheet at the same place. */}
            <motion.div
              ref={panelRef}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[90svh] w-full cursor-auto flex-col overflow-hidden rounded-t-[28px] border border-black/5 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] sm:my-auto sm:h-[min(760px,calc(100svh-3rem))] sm:max-h-none sm:w-[460px] sm:rounded-[28px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeCard}
                className="absolute right-3.5 top-3.5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/90 text-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:text-gray-900 active:scale-95"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {/* The photo at its own shape, full width, with the icon badge on its lower edge */}
              <div className="relative z-10 w-full shrink-0">
                <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: selectedCard.imageAspect }}>
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 460px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <span className="absolute bottom-0 left-7 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-full border border-purple-100/90 bg-white text-[#5B3299] shadow-[0_4px_14px_rgba(40,25,80,0.16)]">
                  <selectedCard.icon className="h-6 w-6" />
                </span>
              </div>

              <div ref={panelScrollRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-9 sm:overflow-hidden sm:px-7 sm:pb-6">
                <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7057D9]">{selectedCard.pill}</p>
                <h3 className="mt-1.5 shrink-0 text-[26px] font-light leading-tight tracking-[-0.035em] text-[#111114] sm:text-[28px]">{selectedCard.title}</h3>
                {selectedCard.headline && (
                  <p className="mt-1.5 shrink-0 text-[15px] leading-snug text-[#2A2A2E]">{selectedCard.headline}</p>
                )}

                {/* Sized to fill the space between the title and the points (desktop) */}
                <div ref={paragraphRef} className="mt-3 space-y-[0.6em] text-[14.5px] font-light leading-[1.65] text-[#4A4458] sm:flex sm:min-h-0 sm:flex-1 sm:flex-col sm:justify-center sm:overflow-hidden">
                  {selectedCard.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>

                {selectedCard.highlights && selectedCard.highlights.length > 0 && (
                  <div className="mt-4 shrink-0 border-t border-[#ECEAF2] pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8A93]">In focus</p>
                    {/* Always one line: the pills' size follows the panel's width (cqi), so all four fit on any screen */}
                    <ul className="@container mt-2.5 flex flex-nowrap gap-1.5">
                      {selectedCard.highlights.map((item) => (
                        <li
                          key={item}
                          className="shrink-0 whitespace-nowrap rounded-full border border-[#E5E2F0] bg-[#F6F5FA] px-[0.85em] py-[0.55em] leading-none text-[#2B1F48]"
                          style={{ fontSize: "clamp(9px, calc(3.05cqi - 0.6px), 12.5px)" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
          )}
          </AnimatePresence>,
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

