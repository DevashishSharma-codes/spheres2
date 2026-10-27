"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
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
    image: "/about/card-automation.jpg",
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

// Tripled set for continuous seamless infinite wrapping
const INFINITE_CARDS = [...BASE_CARDS, ...BASE_CARDS, ...BASE_CARDS];

export function AboutSection() {
  const baseCount = BASE_CARDS.length;
  // Start centered in the middle set
  const [currentIndex, setCurrentIndex] = useState(baseCount + 1);
  const [isHovered, setIsHovered] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const [selectedCard, setSelectedCard] = useState<AboutCardItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackTranslateX, setTrackTranslateX] = useState(0);

  const activeBaseIndex = ((currentIndex % baseCount) + baseCount) % baseCount;

  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCard(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCard]);

  // Infinite wrap reset: seamlessly normalize index without animation hitch
  useEffect(() => {
    if (currentIndex >= baseCount * 2) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex((prev) => prev - baseCount);
      }, 550);
      return () => clearTimeout(timer);
    }
    if (currentIndex < baseCount) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex((prev) => prev + baseCount);
      }, 550);
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
        setCurrentIndex(baseCount + foundIdx);
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
          - Background office meeting photo clearly visible with increased opacity
          - SQUARED EDGES (rounded-none) throughout
          - NO TOP CLIPPING: Generous headroom so cards never cut off!
          ========================================================= */}
      <section 
        id="about" 
        className="relative z-10 w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[890px] flex flex-col justify-between pt-5 sm:pt-6 lg:pt-7 pb-4 sm:pb-5 lg:pb-6 overflow-hidden"
      >
        {/* Clearly Visible Background Office Photo with higher opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/about-meeting-bg.png"
            alt="Modern Team Meeting in a Bright Office"
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
              >
                {INFINITE_CARDS.map((card, index) => {
                  const isActive = currentIndex === index;

                  // Subtle 3D depth
                  const subtleRotateY = isActive ? 0 : index < currentIndex ? 3.5 : -3.5;
                  const subtleTranslateZ = isActive ? 18 : -10;

                  return (
                    <div
                      key={`${card.id}-${index}`}
                      id={index >= baseCount && index < baseCount * 2 ? card.id : undefined}
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
                            ACTIVE CARD: EXACT REFERENCE IMAGE LAYOUT
                            - Top 54%: Real photo with rounded top
                            - Seam: Floating circular white icon badge
                            - Bottom 46%: Exact pastel gradient, Mac UI bold title, description, bottom row with cylindrical pill & arrow
                            - Click opens detailed modal dialog
                            ========================================================= */
                        <div
                          className="relative w-[260px] sm:w-[280px] lg:w-[295px] h-[345px] sm:h-[360px] lg:h-[370px] rounded-[26px] overflow-hidden flex flex-col justify-between z-20 transition-all duration-500 shadow-[0_22px_55px_-12px_rgba(170,172,207,0.55),0_6px_20px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.85)] border border-white/70 backdrop-blur-xl select-none group"
                          style={{
                            background: "linear-gradient(180deg, #AAACCF 0%, #B9B9DB 26%, #CDCDEF 58%, #E5DEF1 82%, #F7EAF1 100%)",
                          }}
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
                          <div className="relative z-20 -mt-5 ml-4 sm:ml-5 w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(40,25,80,0.2)] border border-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <card.icon className="w-5 h-5 text-[#5B3299]" />
                          </div>

                          {/* BOTTOM: Signature font title, description, and bottom row with pill badge and arrow */}
                          <div className="relative z-10 px-4 sm:px-5 pt-1 pb-4 flex flex-col justify-between flex-1">
                            <div className="flex flex-col">
                              <h3 className="font-light tracking-[-0.035em] text-[18px] sm:text-[19px] lg:text-[20px] text-[#180E2E] leading-[1.2]">
                                {card.title}
                              </h3>
                              <p className="font-light text-[11px] sm:text-[11.5px] text-[#382E4F]/85 tracking-[-0.01em] leading-relaxed mt-1.5 line-clamp-2">
                                {card.description}
                              </p>
                            </div>

                            {/* Bottom Cylindrical Pill Strip: Category pill on left + circular arrow button on right */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCard(card);
                              }}
                              className="mt-auto w-full px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_4px_14px_rgba(130,120,165,0.2)] flex items-center justify-between group/pill hover:bg-white hover:shadow-[0_6px_18px_rgba(130,120,165,0.26)] transition-all duration-300 cursor-pointer"
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
                            SIDE / INACTIVE CARDS: EXACT REFERENCE IMAGE LAYOUT
                            ========================================================= */
                        <div
                          className="relative w-[220px] sm:w-[240px] lg:w-[255px] h-[305px] sm:h-[320px] lg:h-[330px] rounded-[24px] overflow-hidden flex flex-col justify-between opacity-80 hover:opacity-100 transition-all duration-400 shadow-[0_14px_35px_-8px_rgba(170,172,207,0.38)] border border-white/50 backdrop-blur-xl select-none group"
                          style={{
                            background: "linear-gradient(180deg, rgba(170, 172, 207, 0.90) 0%, rgba(185, 185, 219, 0.88) 26%, rgba(205, 205, 239, 0.85) 58%, rgba(229, 222, 241, 0.88) 82%, rgba(247, 234, 241, 0.92) 100%)",
                          }}
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
                          <div className="relative z-20 -mt-4.5 ml-3.5 sm:ml-4 w-9 h-9 rounded-full bg-white shadow-[0_3px_10px_rgba(40,25,80,0.18)] border border-white/80 flex items-center justify-center">
                            <card.icon className="w-4 h-4 text-[#5B3299]" />
                          </div>

                          {/* BOTTOM: Content */}
                          <div className="relative z-10 px-3.5 sm:px-4 pt-1 pb-3.5 flex flex-col justify-between flex-1">
                            <div className="flex flex-col">
                              <h4 className="font-light tracking-[-0.035em] text-[16px] sm:text-[17px] text-[#180E2E] leading-[1.2]">
                                {card.title}
                              </h4>
                              <p className="font-light text-[10.5px] sm:text-[11px] text-[#382E4F]/85 tracking-[-0.01em] leading-relaxed mt-1 line-clamp-2">
                                {card.description}
                              </p>
                            </div>

                            {/* Bottom Cylindrical Pill Strip */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCard(card);
                              }}
                              className="mt-auto w-full px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_3px_10px_rgba(130,120,165,0.16)] flex items-center justify-between cursor-pointer hover:bg-white transition-all"
                            >
                              <span className="font-normal text-[9.5px] sm:text-[10px] text-[#2B1F48] tracking-[-0.02em] pl-0.5">
                                {card.pill}
                              </span>
                              <div className="w-5.5 h-5.5 rounded-full bg-[#180E2E] text-white flex items-center justify-center shadow-xs">
                                <ArrowRight className="w-3 h-3 text-white" />
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
                    setCurrentIndex(baseCount + i);
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
            INTERACTIVE CARD DETAILS MODAL DIALOG
            - Matches reference screenshot:
              * Backdrop blur & dimming
              * Left 48%: Card photo with purple pill "← Back" button
              * Right 52%: Icon badge, 'X' close button, Title, 2-paragraph narrative,
                and 3-column stats with subtle vertical dividers
            ========================================================= */}
        {selectedCard && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedCard(null)}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="relative w-full max-w-[860px] bg-white rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] flex flex-col md:flex-row border border-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left 48%: Full Photo with "← Back" pill button */}
              <div className="relative w-full md:w-[48%] min-h-[260px] sm:min-h-[340px] md:min-h-[460px] overflow-hidden bg-slate-100">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-cover object-center"
                  priority
                />

                {/* Gradient Pill "← Back" Button (Gradient of Purple and White) */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium shadow-[0_4px_18px_rgba(94,46,229,0.38)] border border-white/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm group/back"
                  style={{
                    background: "linear-gradient(115deg, #4C1D95 0%, #7C3AED 40%, #DDD6FE 75%, #FFFFFF 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5] text-white drop-shadow-[0_1px_2px_rgba(26,6,48,0.85)] group-hover/back:-translate-x-0.5 transition-transform" />
                  <span className="tracking-[-0.01em] text-white drop-shadow-[0_1px_2px_rgba(26,6,48,0.85)] font-medium">
                    Back
                  </span>
                </button>
              </div>

              {/* Right 52%: Content section */}
              <div className="w-full md:w-[52%] p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white text-left">
                <div>
                  {/* Top Row: Circular Icon Badge on left + 'X' close button on right */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full border border-purple-200/80 bg-purple-50/50 flex items-center justify-center text-[#5E2EE5] shadow-xs">
                      <selectedCard.icon className="w-6 h-6" />
                    </div>

                    <button
                      onClick={() => setSelectedCard(null)}
                      className="w-9 h-9 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[28px] font-light text-[#111114] tracking-[-0.035em] leading-tight mb-4">
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
          </div>
        )}

      </section>

      {/* =========================================================
          COMPANY STATISTICS & DELIVERABLES (EMBEDDED CONTINUOUS MODE)
          ========================================================= */}
      <CompanyStatisticsSection embedded />

    </div>
  );
}

