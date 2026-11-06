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
  Layers,
  ShieldCheck,
  Zap,
  Cpu,
  Users
} from "lucide-react";
import { CompanyStatisticsSection } from "@/components/about/CompanyStatisticsSection";
import { FolderTabCard } from "@/components/ui/FolderTabCard";
import { useHashLink } from "@/lib/useHashLink";
import { useRouter } from "next/navigation";

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
    image: "/about/automation-code.jpg",
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
          <div className="grid grid-cols-1 gap-4 border-b border-[#E7E5EB] pb-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="flex flex-col items-start lg:col-span-6">
              <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-[11px]">
                OUR STORY
              </span>
              <h2 className="select-none whitespace-nowrap text-3xl font-light leading-none tracking-[-0.045em] text-[#232129] sm:text-4xl md:text-5xl lg:text-[52px]">
                About Us
              </h2>
              <p className="mt-2.5 text-sm font-light text-[#6E6D78]">
                Building a better, brighter and more connected tomorrow.
              </p>
            </div>
            <div className="flex lg:col-span-6 lg:justify-end">
              <p className="max-w-[540px] text-sm font-light leading-relaxed text-[#6E6D78]">
                At 21 Spheres, we believe in the power of ideas, people and technology to create meaningful change. Our journey began with a simple vision — to deliver innovative solutions that make life easier, smarter and more connected. Today, we are a passionate team of creators, thinkers and doers, working together to turn possibilities into reality.
              </p>
            </div>
          </div>
        </div>

        {/* Runs edge to edge, with the outer cards fading away instead of being cut off */}
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

          <div className="overflow-hidden pb-9 pt-6 [--about-card:280px] [--about-step:294px] [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:[--about-card:300px] sm:[--about-step:320px] lg:[--about-card:320px] lg:[--about-step:340px]">
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
                      <FolderTabCard
                        theme="contrast"
                        id={`about-${index}`}
                        number={String(baseIndex + 1).padStart(2, "0")}
                        category={card.pill}
                        title={card.title}
                        description={card.description}
                        image={card.image}
                        icon={card.icon}
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
          </div>

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

