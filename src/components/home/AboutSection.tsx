"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShieldCheck,
  Zap,
  Cpu,
  Users
} from "lucide-react";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";

export interface CardStat {
  value: string;
  label: string;
}

export interface AboutCardItem {
  id: string;
  pill: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  modalParagraph1: string;
  modalParagraph2: string;
  stats: CardStat[];
}

const BASE_CARDS: AboutCardItem[] = [
  {
    id: "seamless-integration",
    pill: "Effortless Connectivity",
    title: "Seamless Integration",
    description: "Our autonomous AI services seamlessly integrate with legacy platforms and cloud apps, unifying cross-enterprise workflows.",
    image: "/about/card-integration.jpg",
    icon: Layers,
    modalParagraph1: "Our seamless integration ecosystem unifies legacy platforms, modern cloud applications, and distributed databases into a single, cohesive intelligent mesh. We bridge organizational silos with zero downtime.",
    modalParagraph2: "Through continuous telemetry synchronization and automated API reconciliation, 21Spheres ensures that data flows effortlessly across every department, turning complex architecture into pure velocity.",
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "250+", label: "Ecosystem Connectors" },
      { value: "10x", label: "Faster Deployment" },
    ],
  },
  {
    id: "exceptional-security",
    pill: "Exceptional Security",
    title: "Exceptional Security",
    description: "21Spheres delivers enterprise-grade deterministic guardrails and encrypted pipelines to protect mission-critical operations.",
    image: "/about/card-security.jpg",
    icon: ShieldCheck,
    modalParagraph1: "Security is engineered into every layer of our platform. We deploy deterministic guardrails, zero-trust cryptographic boundaries, and isolated execution enclaves to safeguard mission-critical workloads.",
    modalParagraph2: "Real-time threat monitoring and automated regulatory compliance ensure your operations consistently satisfy SOC2 Type II, ISO 27001, and global data privacy standards without sacrificing performance.",
    stats: [
      { value: "SOC2", label: "Type II Certified" },
      { value: "256-bit", label: "Quantum Encryption" },
      { value: "0", label: "Security Breaches" },
    ],
  },
  {
    id: "high-performance",
    pill: "Speedy Experience",
    title: "High Performance",
    description: "Our resilient infrastructure is architected for peak velocity, sub-second latency, and continuous high-throughput execution.",
    image: "/about/card-performance.jpg",
    icon: Zap,
    modalParagraph1: "Engineered for uncompromising velocity, our distributed computational network executes petabyte-scale transactions with sub-millisecond latencies across global edge points of presence.",
    modalParagraph2: "Hardware-accelerated processing pipelines and adaptive caching algorithms guarantee that your enterprise applications scale fluidly during peak demand surges without a single dropped packet.",
    stats: [
      { value: "< 12ms", label: "Global Edge Latency" },
      { value: "1.8M", label: "Operations / Sec" },
      { value: "99.99%", label: "High Availability" },
    ],
  },
  {
    id: "intelligent-automation",
    pill: "Self-Healing Workflows",
    title: "Intelligent Automation",
    description: "Designing self-healing automated telemetry workflows that reduce operational overhead across distributed pipelines.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=85",
    icon: Cpu,
    modalParagraph1: "Our journey started with a simple idea — to use autonomous automation and innovation to solve real-world operational bottlenecks. What began as an experimental framework has now matured into an enterprise-standard system.",
    modalParagraph2: "Through continuous self-healing graphs and proactive telemetry mitigation, 21Spheres minimizes operational friction, freeing strategic talent to focus on groundbreaking opportunities.",
    stats: [
      { value: "5+", label: "Years of Innovation" },
      { value: "100+", label: "Talented Professionals" },
      { value: "20+", label: "Global Partners" },
    ],
  },
  {
    id: "multi-agent-swarms",
    pill: "Autonomous Swarms",
    title: "Multi-Agent Swarms",
    description: "Deploying self-coordinating AI agent swarms that autonomously collaborate and execute complex multi-step tasks.",
    image: "/about/card-swarms.jpg",
    icon: Users,
    modalParagraph1: "Deploy swarms of specialized, self-coordinating AI agents that negotiate, align context, and execute complex cross-enterprise tasks autonomously with synchronized operational awareness.",
    modalParagraph2: "Each agent brings specialized domain expertise, collaborating symbiotically across departments to solve multi-step challenges while maintaining absolute transparency and auditability.",
    stats: [
      { value: "50+", label: "Swarm Topologies" },
      { value: "100+", label: "Autonomous Agents" },
      { value: "4.8x", label: "Productivity Boost" },
    ],
  },
];

// 9 replicated sets for a bulletproof, truly infinite loop that never runs out of cards
const REPEAT_COUNT = 9;
const CENTER_SET_INDEX = 4; // Center set index (0, 1, 2, 3, [4], 5, 6, 7, 8)
const INFINITE_CARDS = Array.from({ length: REPEAT_COUNT }, () => BASE_CARDS).flat();

export function AboutSection({ showStatistics = false }: { showStatistics?: boolean } = {}) {
  const baseCount = BASE_CARDS.length;
  // Start centered in the middle set (set 4)
  const [currentIndex, setCurrentIndex] = useState(baseCount * CENTER_SET_INDEX);
  const [isHovered, setIsHovered] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const [selectedCard, setSelectedCard] = useState<AboutCardItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackTranslateX, setTrackTranslateX] = useState(0);

  const activeBaseIndex = ((currentIndex % baseCount) + baseCount) % baseCount;

  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => {
      // If approaching upper boundary, seamlessly wrap back to center set
      if (prev >= baseCount * (REPEAT_COUNT - 2)) {
        return (prev % baseCount) + baseCount * CENTER_SET_INDEX + 1;
      }
      return prev + 1;
    });
  }, [baseCount]);

  const handlePrev = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => {
      // If approaching lower boundary, seamlessly wrap back to center set
      if (prev <= baseCount * 2) {
        return (prev % baseCount) + baseCount * CENTER_SET_INDEX - 1;
      }
      return prev - 1;
    });
  }, [baseCount]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDismissingRef = useRef(false);

  // Smoothly close the modal and scroll down (or up) cleanly via requestAnimationFrame
  const smoothDismissAndScroll = useCallback((isDown: boolean) => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

    setSelectedCard(null);

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
  }, []);

  // When modal is open: ESC closes it, and scrolling (wheel or touch) closes it and continues scrolling down
  useEffect(() => {
    if (!selectedCard) {
      isDismissingRef.current = false;
      return;
    }

    let touchStartY = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCard(null);
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
  }, [selectedCard, smoothDismissAndScroll]);

  // Seamless infinite loop normalization: smoothly keeps the index centered
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex >= baseCount * 6 || currentIndex < baseCount * 3) {
      const normalizedIndex = ((currentIndex % baseCount) + baseCount) % baseCount + baseCount * CENTER_SET_INDEX;
      setWithTransition(false);
      setCurrentIndex(normalizedIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
    }
  }, [currentIndex, baseCount]);

  // Fallback timer to guarantee normalization even if onTransitionEnd is skipped (e.g. background tab)
  useEffect(() => {
    if (currentIndex >= baseCount * 6 || currentIndex < baseCount * 3) {
      const timer = setTimeout(() => {
        const normalizedIndex = ((currentIndex % baseCount) + baseCount) % baseCount + baseCount * CENTER_SET_INDEX;
        setWithTransition(false);
        setCurrentIndex(normalizedIndex);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, baseCount]);

  // Auto-play timer (pauses on hover or when modal is open)
  useEffect(() => {
    if (isHovered || selectedCard !== null) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered, selectedCard, handleNext]);

  // Handle URL hash navigation (e.g. from navbar clicks) to focus targeted card
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const foundIdx = BASE_CARDS.findIndex((c) => c.id === hash);
      if (foundIdx !== -1) {
        setWithTransition(true);
        setCurrentIndex(baseCount * CENTER_SET_INDEX + foundIdx);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [baseCount]);

  // Calculate track position to center active card horizontally
  const updateTrackPosition = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const isMobile = containerWidth < 640;
    const isTablet = containerWidth >= 640 && containerWidth < 1024;

    const activeWidth = isMobile ? 260 : isTablet ? 280 : 295;
    const inactiveWidth = isMobile ? 220 : isTablet ? 240 : 255;
    const gap = isMobile ? 14 : 18;

    let leftOffset = 0;
    for (let i = 0; i < currentIndex; i++) {
      leftOffset += inactiveWidth + gap;
    }

    const centeredOffset = leftOffset - (containerWidth / 2) + (activeWidth / 2);
    setTrackTranslateX(centeredOffset);
  }, [currentIndex]);

  useEffect(() => {
    updateTrackPosition();
    window.addEventListener("resize", updateTrackPosition);
    return () => window.removeEventListener("resize", updateTrackPosition);
  }, [updateTrackPosition]);

  return (
    <div className="relative z-0 overflow-hidden w-full border-b border-[#DADADD]/70 bg-[#FBFBFA]">
      
      {/* =========================================================
          HERO ABOUT US SECTION: 100VH ONE-SCREEN FIT
          - Background minimalist misty mountain panorama photo
          - SQUARED EDGES (rounded-none) throughout
          - NO TOP CLIPPING: Generous headroom so cards never cut off!
          ========================================================= */}
      <section 
        id="about" 
        className="relative z-10 w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[890px] flex flex-col justify-between pt-5 sm:pt-6 lg:pt-7 pb-4 sm:pb-5 lg:pb-6 overflow-hidden"
      >
        {/* Clearly Visible Background Photo with higher opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/minimalist-misty-mountain-panorama.png"
            alt="Minimalist Misty Mountain Panorama"
            fill
            priority
            className="object-cover object-center scale-[1.02] opacity-95"
          />
          
          {/* Subtle Hairline Grid Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(42, 42, 46, 0.10) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(42, 42, 46, 0.10) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Light Ambient Glass Sheen leaving central background photo clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-white/55 backdrop-blur-[0.3px]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Inner Content Container */}
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between flex-1">
          
          {/* 1. TOP HEADER ROW (Clean 'OUR STORY' label, no pill) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start justify-between">
            
            {/* Left: OUR STORY label (no pill) & Heading */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[12px] sm:text-[13px] font-bold text-[#7E22CE] tracking-[0.18em] uppercase mb-1">
                OUR STORY
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-[#111114] select-none">
                About Us
              </h2>

              <p className="text-xs sm:text-[13.5px] text-[#4A4A52] font-normal italic mt-1.5">
                &ldquo;Building a better, brighter and more connected tomorrow.&rdquo;
              </p>
            </div>

            {/* Right: Full narrative text matching reference */}
            <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center pt-1">
              <p className="text-xs sm:text-[13px] lg:text-[13.5px] font-normal text-[#383842] leading-relaxed max-w-[500px] lg:text-left">
                At 21 Spears, we believe in the power of ideas, people and technology to create meaningful change. Our journey began with a simple vision — to deliver innovative solutions that make life easier, smarter and more connected. Today, we are a passionate team of creators, thinkers and doers, working together to turn possibilities into reality.
              </p>
            </div>

          </div>

          {/* 2. INFINITE MOVING 3D CAROUSEL */}
          <div 
            className="mt-auto pt-2 pb-1 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left & Right Floating Carousel Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="absolute -left-2 sm:-left-4 top-[50%] -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-[#160429] shadow-[0_4px_16px_rgba(74,18,120,0.18)] border border-purple-200/60 flex items-center justify-center transition-all duration-200 hover:bg-[#2A084E] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next card"
              className="absolute -right-2 sm:-right-4 top-[50%] -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-[#160429] shadow-[0_4px_16px_rgba(74,18,120,0.18)] border border-purple-200/60 flex items-center justify-center transition-all duration-200 hover:bg-[#2A084E] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Sliding Viewport: Generous Headroom so TOP of cards NEVER cuts off */}
            <div 
              ref={containerRef}
              className="overflow-hidden pt-6 sm:pt-8 pb-3 px-1"
              style={{ perspective: "1200px" }}
            >
              {/* Horizontal Sliding Track: Aligned at bottom, active card stands taller without clipping */}
              <div 
                className={`flex items-end gap-3.5 sm:gap-5 ${withTransition ? "transition-transform duration-600 ease-out" : ""}`}
                style={{
                  transform: `translateX(-${trackTranslateX}px)`,
                  transformStyle: "preserve-3d",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {INFINITE_CARDS.map((card, index) => {
                  const isActive = currentIndex === index;

                  // Subtle 3D depth
                  const subtleRotateY = isActive ? 0 : index < currentIndex ? 3.5 : -3.5;
                  const subtleTranslateZ = isActive ? 18 : -10;

                  return (
                    <div
                      key={`${card.id}-${index}`}
                      id={index >= baseCount * CENTER_SET_INDEX && index < baseCount * (CENTER_SET_INDEX + 1) ? card.id : undefined}
                      onClick={() => {
                        if (isActive) {
                          setSelectedCard(card);
                        } else {
                          setWithTransition(true);
                          setCurrentIndex(index);
                        }
                      }}
                      className="shrink-0 cursor-pointer transition-all duration-500 ease-out"
                      style={{
                        transform: `rotateY(${subtleRotateY}deg) translateZ(${subtleTranslateZ}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {isActive ? (
                        /* =========================================================
                            ACTIVE CARD:
                            - Top 54%: Real photo with rounded top
                            - Seam: Floating circular white icon badge
                            - Bottom: Crisp white background, title, description,
                              and bottom pill strip with circular arrow
                            ========================================================= */
                        <div
                          className="relative w-[260px] sm:w-[280px] lg:w-[295px] h-[345px] sm:h-[360px] lg:h-[370px] rounded-[26px] overflow-hidden flex flex-col justify-between z-20 transition-all duration-500 shadow-[0_20px_50px_-12px_rgba(40,20,80,0.18),0_6px_20px_rgba(0,0,0,0.06)] border border-purple-200/70 bg-white select-none group"
                        >
                          {/* TOP: Real Photo */}
                          <div className="relative w-full h-[54%] overflow-hidden bg-slate-100">
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 295px"
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              priority={isActive}
                            />
                          </div>

                          {/* SEAM: Floating Circular White Icon Badge */}
                          <div className="relative z-20 -mt-5 ml-4 sm:ml-5 w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(40,25,80,0.16)] border border-purple-100/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <card.icon className="w-5 h-5 text-[#5B3299]" />
                          </div>

                          {/* BOTTOM: Pure White Area */}
                          <div className="relative z-10 px-4 sm:px-5 pt-1.5 pb-4 flex flex-col justify-between flex-1 bg-white">
                            <div className="flex flex-col">
                              <h3 className="font-light tracking-[-0.035em] text-[18px] sm:text-[19px] lg:text-[20px] text-[#180E2E] leading-[1.2]">
                                {card.title}
                              </h3>
                              <p className="font-light text-[11px] sm:text-[11.5px] text-[#554D69] tracking-[-0.01em] leading-relaxed mt-1.5 line-clamp-2">
                                {card.description}
                              </p>
                            </div>

                            {/* Bottom Cylindrical Pill Strip */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCard(card);
                              }}
                              className="mt-auto w-full px-3.5 py-1.5 rounded-full bg-[#F6F5FA] border border-[#E5E2F0] shadow-xs flex items-center justify-between group/pill hover:bg-purple-50/80 hover:border-purple-200 transition-all duration-300 cursor-pointer"
                            >
                              <span className="font-normal text-[10.5px] sm:text-[11px] text-[#2B1F48] tracking-[-0.02em] pl-1">
                                {card.pill}
                              </span>
                              <div className="w-6.5 h-6.5 rounded-full bg-[#180E2E] text-white flex items-center justify-center shadow-xs group-hover/pill:scale-105 group-hover/pill:bg-[#341F5E] transition-all">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* =========================================================
                            SIDE / INACTIVE CARDS:
                            - Crisp white bottom area
                            ========================================================= */
                        <div
                          className="relative w-[220px] sm:w-[240px] lg:w-[255px] h-[305px] sm:h-[320px] lg:h-[330px] rounded-[24px] overflow-hidden flex flex-col justify-between opacity-85 hover:opacity-100 transition-all duration-400 shadow-[0_12px_32px_-8px_rgba(40,20,80,0.12)] border border-purple-100/70 bg-white select-none group"
                        >
                          {/* TOP: Real Photo */}
                          <div className="relative w-full h-[54%] overflow-hidden bg-slate-100">
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 255px"
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          {/* SEAM: Floating Circular White Icon Badge */}
                          <div className="relative z-20 -mt-4.5 ml-3.5 sm:ml-4 w-9 h-9 rounded-full bg-white shadow-[0_3px_10px_rgba(40,25,80,0.12)] border border-purple-100/80 flex items-center justify-center">
                            <card.icon className="w-4 h-4 text-[#5B3299]" />
                          </div>

                          {/* BOTTOM: Pure White Area */}
                          <div className="relative z-10 px-3.5 sm:px-4 pt-1 pb-3.5 flex flex-col justify-between flex-1 bg-white">
                            <div className="flex flex-col">
                              <h4 className="font-light tracking-[-0.035em] text-[16px] sm:text-[17px] text-[#180E2E] leading-[1.2]">
                                {card.title}
                              </h4>
                              <p className="font-light text-[10.5px] sm:text-[11px] text-[#554D69] tracking-[-0.01em] leading-relaxed mt-1 line-clamp-2">
                                {card.description}
                              </p>
                            </div>

                            {/* Bottom Cylindrical Pill Strip */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCard(card);
                              }}
                              className="mt-auto w-full px-3 py-1.5 rounded-full bg-[#F6F5FA] border border-[#E5E2F0] shadow-xs flex items-center justify-between cursor-pointer hover:bg-purple-50/80 hover:border-purple-200 transition-all"
                            >
                              <span className="font-normal text-[9.5px] sm:text-[10px] text-[#2B1F48] tracking-[-0.02em] pl-0.5">
                                {card.pill}
                              </span>
                              <div className="w-5.5 h-5.5 rounded-full bg-[#180E2E] text-white flex items-center justify-center shadow-xs">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Progress Navigation Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {BASE_CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setWithTransition(true);
                    setCurrentIndex(baseCount * CENTER_SET_INDEX + i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeBaseIndex === i 
                      ? "w-6 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" 
                      : "w-1.5 bg-[#DADADD] hover:bg-black/30"
                  }`}
                />
              ))}
            </div>

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
            onClick={() => setSelectedCard(null)}
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
                onClick={() => setSelectedCard(null)}
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
                    <div className="w-12 h-12 rounded-full border border-purple-200/80 bg-purple-50/50 flex items-center justify-center text-[#5E2EE5] shadow-xs">
                      <selectedCard.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[28px] font-light text-[#111114] tracking-[-0.035em] leading-tight mb-4 pr-8">
                    {selectedCard.title}
                  </h3>

                  {/* Narrative paragraphs */}
                  <div className="space-y-3.5 text-gray-600 text-xs sm:text-[13px] font-light leading-relaxed">
                    <p>{selectedCard.modalParagraph1}</p>
                    <p>{selectedCard.modalParagraph2}</p>
                  </div>
                </div>

                {/* Bottom 3-Column Stats Row with Vertical Dividers */}
                <div className="mt-8 pt-5 border-t border-gray-100 flex items-stretch justify-between">
                  {selectedCard.stats.map((stat, i) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 flex flex-col">
                        <span className="text-xl sm:text-2xl font-light text-[#111114] tracking-[-0.04em]">
                          {stat.value}
                        </span>
                        <span className="text-[10px] sm:text-[11.5px] text-gray-500 font-light leading-snug mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                      {i < selectedCard.stats.length - 1 && (
                        <div className="w-[1px] bg-gray-200 self-stretch my-0.5 mx-3 sm:mx-4" />
                      )}
                    </React.Fragment>
                  ))}
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

