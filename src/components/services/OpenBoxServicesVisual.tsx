"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Globe,
  Cpu,
  Sparkles,
  MessageSquare,
  Workflow,
  Layout,
  Rocket,
  Building2,
  Terminal,
  ArrowUpRight,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { ServiceItem } from "@/types";

interface OpenBoxServicesVisualProps {
  services: ServiceItem[];
  offset?: number;
  onSelectService: (service: ServiceItem) => void;
  onOpenMobileSimulator: () => void;
  onPrevSquad?: () => void;
  onNextSquad?: () => void;
  canPrevSquad?: boolean;
  canNextSquad?: boolean;
}

interface ServiceVisualData {
  id: string;
  title: string;
  subtitle: string;
  actionText: string;
  icon: React.ComponentType<{ className?: string }>;
  isMobile?: boolean;
}

const ALL_SERVICES_DATA: ServiceVisualData[] = [
  {
    id: "mobile-application-development",
    title: "Mobile Application development",
    subtitle: "120Hz ProMotion & Action Button Haptics",
    actionText: "Click to launch 3D model →",
    icon: Smartphone,
    isMobile: true,
  },
  {
    id: "web-application-development",
    title: "Web Application development",
    subtitle: "Full-Stack React 19 & Sub-20ms Edge Platforms",
    actionText: "Sub-20ms Global Edge Platform",
    icon: Globe,
  },
  {
    id: "custom-ai-development",
    title: "Custom AI development",
    subtitle: "Proprietary models & intelligent systems",
    actionText: "Proprietary models & intelligent systems",
    icon: Cpu,
  },
  {
    id: "llm-integration",
    title: "LLM Integration",
    subtitle: "Deterministic RAG & autonomous agents",
    actionText: "Deterministic RAG & autonomous agents",
    icon: Sparkles,
  },
  {
    id: "chatbot-development",
    title: "Chatbot development",
    subtitle: "Episodic user memory & sub-280ms voice",
    actionText: "Sub-280ms voice turnaround",
    icon: MessageSquare,
  },
  {
    id: "workflow-automation",
    title: "Workflow automation",
    subtitle: "Temporal, Kafka DAGs & self-healing events",
    actionText: "Deterministic event queues",
    icon: Workflow,
  },
  {
    id: "website-development",
    title: "Website development",
    subtitle: "Three.js kinetic WebGL & 100/100 Lighthouse",
    actionText: "100/100 Lighthouse score",
    icon: Layout,
  },
  {
    id: "saas-development",
    title: "SaaS development",
    subtitle: "Multi-tenant cloud, Stripe & enterprise SSO",
    actionText: "Zero-downtime multi-tenant scale",
    icon: Rocket,
  },
  {
    id: "enterprise-software-development",
    title: "Enterprise software development",
    subtitle: "Mission-critical mesh & gRPC microservices",
    actionText: "99.999% high availability",
    icon: Building2,
  },
  {
    id: "custom-software-development",
    title: "Custom software development",
    subtitle: "Bespoke mathematical engines in Rust & C++",
    actionText: "Bespoke core runtime",
    icon: Terminal,
  },
];

const PARTICLES = [
  { id: 1, left: "44%", top: "28%", size: 2.5, delay: 0, duration: 4.0 },
  { id: 2, left: "54%", top: "40%", size: 1.8, delay: 1.1, duration: 4.8 },
  { id: 3, left: "47%", top: "18%", size: 2.2, delay: 0.5, duration: 4.3 },
  { id: 4, left: "38%", top: "50%", size: 1.8, delay: 1.8, duration: 3.6 },
  { id: 5, left: "58%", top: "58%", size: 2.4, delay: 1.4, duration: 4.0 },
  { id: 6, left: "46%", top: "66%", size: 2.0, delay: 2.5, duration: 3.4 },
  { id: 7, left: "51%", top: "10%", size: 1.8, delay: 2.9, duration: 4.6 },
  { id: 8, left: "36%", top: "34%", size: 1.2, delay: 0.8, duration: 5.0 },
  { id: 9, left: "50%", top: "46%", size: 2.2, delay: 1.6, duration: 3.8 },
  { id: 10, left: "41%", top: "20%", size: 1.6, delay: 2.2, duration: 4.4 },
];

// Vertical distance (px) between consecutive card slots. Tune these if you
// change card/thread sizing. [mobile, >=640px]
const PITCH_MOBILE = 76;
const PITCH_DESKTOP = 104;

// Slot 3 is the card sitting in the box mouth. Slots 0-2 are above it.
const BOX_SLOT = 3;
const VISIBLE_SLOTS = 4;

const SLIDE_SPRING = { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 };

export function OpenBoxServicesVisual({
  services,
  offset = 0,
  onSelectService,
  onOpenMobileSimulator,
  onPrevSquad,
  onNextSquad,
  canPrevSquad = false,
  canNextSquad = true,
}: OpenBoxServicesVisualProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightOn, setLightOn] = useState(false);
  const [introStage, setIntroStage] = useState(0);
  const [burstCount, setBurstCount] = useState(0);
  const [pitch, setPitch] = useState(PITCH_DESKTOP);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  // Clamp offset between 0 and 6 (so 4 cards are always visible out of 10)
  const maxOffset = ALL_SERVICES_DATA.length - VISIBLE_SLOTS;
  const safeOffset = Math.max(0, Math.min(maxOffset, offset));

  // Responsive slot pitch
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setPitch(mq.matches ? PITCH_DESKTOP : PITCH_MOBILE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Trigger luminous burst whenever the visible window shifts
  const prevOffsetRef = useRef(safeOffset);
  useEffect(() => {
    if (prevOffsetRef.current !== safeOffset) {
      prevOffsetRef.current = safeOffset;
      setBurstCount((c) => c + 1);
    }
  }, [safeOffset]);

  // Cinematic Arrival Sequence:
  // Phase 1: Volumetric rays shoot upward out of the box
  // Phase 2: The 4 service cards rise out of the box sequentially
  useEffect(() => {
    if (!isInView) return;

    const t0 = window.setTimeout(() => {
      setLightOn(true);
      setBurstCount((count) => count + 1);
    }, 150);
    const t1 = window.setTimeout(() => {
      setIntroStage(1);
      setBurstCount((count) => count + 1);
    }, 1050);
    const t2 = window.setTimeout(() => {
      setIntroStage(2);
      setBurstCount((count) => count + 1);
    }, 1400);
    const t3 = window.setTimeout(() => {
      setIntroStage(3);
      setBurstCount((count) => count + 1);
    }, 1750);
    const t4 = window.setTimeout(() => {
      setIntroStage(4);
      setBurstCount((count) => count + 1);
    }, 2100);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [isInView]);

  // If user scrolls before intro finishes, jump directly to active state
  const isIntroComplete = introStage >= 4 || safeOffset > 0;
  const isLightActive = lightOn || safeOffset > 0;

  const handleCardClick = (card: ServiceVisualData) => {
    if (card.isMobile) {
      onOpenMobileSimulator();
    } else {
      const fullService = services.find((s) => s.id === card.id);
      if (fullService) onSelectService(fullService);
    }
  };

  // Target pose for a card given its slot relative to the visible window.
  // y is measured from the box-mouth anchor (slot 3 => y = 0).
  const getPose = (slot: number, introVisible: boolean) => {
    // Waiting inside the box (before intro reveals it)
    if (!introVisible) {
      return { y: pitch, scale: 0.7, opacity: 0 };
    }
    // Scrolled past the top: drift up one step and fade out
    if (slot < 0) {
      return { y: (Math.max(slot, -1) - BOX_SLOT) * pitch, scale: 0.94, opacity: 0 };
    }
    // Waiting below the mouth: tucked inside the box, behind the front lip
    if (slot > BOX_SLOT) {
      return { y: pitch, scale: 0.9, opacity: 0 };
    }
    // Visible slots 0..3
    return { y: (slot - BOX_SLOT) * pitch, scale: 1, opacity: 1 };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] sm:max-w-[495px] flex flex-col items-center select-none"
    >
      {/* ========================================================
          LAYER 0: DEEP AMBIENT VOLUMETRIC HAZE & DIFFUSERS
          ======================================================== */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] h-[320px] rounded-full bg-[#7C3AED]/14 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[320px] h-[220px] rounded-full bg-[#A855F7]/18 blur-[90px] pointer-events-none" />

      {/* ========================================================
          LAYER 1: CINEMATIC VOLUMETRIC RAYS ERUPTING FROM BOX
          ======================================================== */}
      <div
        className="absolute inset-x-[-15%] -top-20 bottom-12 pointer-events-none z-[6] flex items-center justify-center overflow-visible"
        style={{
          mixBlendMode: "screen",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0) 100%)",
        }}
      >
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isLightActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{
            scaleY: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.5, ease: "easeOut" }
          }}
          style={{ transformOrigin: "50% 82%", width: "100%", height: "100%" }}
        >
          <motion.svg
            animate={isLightActive ? {
              opacity: [0.92, 1.0, 0.94, 0.98, 0.92]
            } : { opacity: 0 }}
            transition={{
              opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-full h-full"
            viewBox="0 0 640 760"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="rayAtmosphereHaze" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="24" />
              </filter>
              <filter id="rayShaftSoft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6.5" />
              </filter>
              <filter id="rayShaftCrisp" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.0" />
              </filter>
              <filter id="rayShaftLaser" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>

              <linearGradient id="ambientBackscatter" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.04" />
                <stop offset="8%" stopColor="#C084FC" stopOpacity="0.18" />
                <stop offset="30%" stopColor="#A855F7" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayHotGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
                <stop offset="7%" stopColor="#EDE9FE" stopOpacity="0.28" />
                <stop offset="15%" stopColor="#EDE9FE" stopOpacity="0.82" />
                <stop offset="42%" stopColor="#C084FC" stopOpacity="0.50" />
                <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayVividGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.03" />
                <stop offset="8%" stopColor="#E9D5FF" stopOpacity="0.22" />
                <stop offset="18%" stopColor="#E9D5FF" stopOpacity="0.65" />
                <stop offset="48%" stopColor="#C084FC" stopOpacity="0.38" />
                <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayFlankGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.02" />
                <stop offset="9%" stopColor="#C084FC" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#C084FC" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayCoreNeedle" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
                <stop offset="8%" stopColor="#FFFFFF" stopOpacity="0.35" />
                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.90" />
                <stop offset="60%" stopColor="#EDE9FE" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 1. SOFT AMBIENT BACKGROUND CONE */}
            <polygon
              points="220,620 420,620 570,0 70,0"
              fill="url(#ambientBackscatter)"
              filter="url(#rayAtmosphereHaze)"
              opacity="0.65"
            />

            {/* 2. NINE DISTINCT VOLUMETRIC LIGHT SHAFTS */}
            <polygon points="235,620 252,620 60,0 15,0" fill="url(#rayFlankGrad)" filter="url(#rayShaftSoft)" opacity="0.80" />
            <polygon points="256,620 274,620 145,0 95,0" fill="url(#rayVividGrad)" filter="url(#rayShaftCrisp)" opacity="0.88" />
            <polygon points="278,620 295,620 225,0 175,0" fill="url(#rayVividGrad)" filter="url(#rayShaftCrisp)" opacity="0.92" />
            <polygon points="298,620 314,620 295,0 250,0" fill="url(#rayHotGrad)" filter="url(#rayShaftCrisp)" opacity="0.95" />
            <polygon points="312,620 328,620 335,0 305,0" fill="url(#rayHotGrad)" filter="url(#rayShaftCrisp)" opacity="1.0" />
            <polygon points="326,620 342,620 390,0 345,0" fill="url(#rayHotGrad)" filter="url(#rayShaftCrisp)" opacity="0.95" />
            <polygon points="345,620 362,620 465,0 415,0" fill="url(#rayVividGrad)" filter="url(#rayShaftCrisp)" opacity="0.92" />
            <polygon points="366,620 384,620 545,0 495,0" fill="url(#rayVividGrad)" filter="url(#rayShaftCrisp)" opacity="0.88" />
            <polygon points="388,620 405,620 625,0 580,0" fill="url(#rayFlankGrad)" filter="url(#rayShaftSoft)" opacity="0.80" />

            {/* 3. ACCENT SHARP MICRO-SHAFTS */}
            <polygon points="285,620 293,620 205,0 185,0" fill="url(#rayCoreNeedle)" filter="url(#rayShaftLaser)" opacity="0.75" />
            <polygon points="317,620 323,620 324,0 316,0" fill="url(#rayCoreNeedle)" filter="url(#rayShaftLaser)" opacity="0.90" />
            <polygon points="347,620 355,620 455,0 435,0" fill="url(#rayCoreNeedle)" filter="url(#rayShaftLaser)" opacity="0.75" />

            {/* The vertical shafts stay open at the base without a horizontal emitter flare. */}
          </motion.svg>
        </motion.div>
      </div>

      {/* ========================================================
          FLOATING ATMOSPHERIC LIGHT PARTICLES
          ======================================================== */}
      {isLightActive && PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none z-[16]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1.5px rgba(255, 255, 255, 0.95), 0 0 12px 3px rgba(168, 85, 247, 0.8)",
          }}
          animate={{
            y: [-5, -20, -5],
            opacity: [0.35, 0.95, 0.35],
            scale: [0.85, 1.25, 0.85],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Spacer reserving the space the upper cards occupy above the box */}
      <div className="w-full h-[176px] sm:h-[238px] pointer-events-none" aria-hidden="true" />

      {/* ========================================================
          THE 3D OPEN BOX + UNIFIED CARD TRACK
          - z-10: Box base
          - z-12: Reactor glow
          - z-20: Card track (ALL cards live here, slide by slot)
          - z-30: Box front lip (covers lower part of the box-slot card
                  and fully hides cards waiting inside the box)
          ======================================================== */}
      <div className="relative w-full max-w-[475px] sm:max-w-[490px] aspect-[1024/657] flex items-end justify-center select-none">

        {/* Soft floor bounce under the box */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[300px] sm:w-[390px] h-[36px] rounded-full bg-purple-600/18 blur-[26px] pointer-events-none z-0" />

        {/* LAYER 1 (z-10): Box Base */}
        <Image
          src="/assets/services/box-clean.png"
          alt="21Spheres Production Box"
          fill
          priority
          className="object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.40)] z-10 pointer-events-none"
        />

        {/* LAYER 1.5 (z-12): Core Luminous Reactor Glow inside Cavity */}
        <div className="absolute top-[28%] sm:top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[12] pointer-events-none flex flex-col items-center justify-center">
          <motion.div
            key={burstCount}
            initial={{ scale: 1.35, opacity: 1 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-[250px] sm:w-[350px] h-[58px] sm:h-[70px] rounded-full bg-gradient-to-r from-purple-600/40 via-violet-400/85 to-purple-600/40 blur-[32px]"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* LAYER 2 (z-20): UNIFIED CARD TRACK
            Anchor = top of the box-slot card. Every card is absolutely
            positioned here and slides vertically based on its slot, so
            cards never unmount/remount while scrolling => no gaps/pops. */}
        <div className="absolute inset-x-0 top-[26%] sm:top-[24%] h-0 z-20 pointer-events-none">
          {ALL_SERVICES_DATA.map((card, index) => {
            const slot = index - safeOffset;
            const introVisible = isIntroComplete || introStage > slot;
            const pose = getPose(slot, introVisible);
            const isActive = introVisible && slot >= 0 && slot <= BOX_SLOT;
            const Icon = card.icon;
            const isHovered = hoveredId === card.id;

            const threadVisible =
              isActive &&
              (isIntroComplete ||
                (slot < BOX_SLOT ? introStage > slot + 1 : introStage >= 4));

            return (
              <motion.div
                key={card.id}
                initial={{ y: pitch, scale: 0.7, opacity: 0 }}
                animate={pose}
                transition={SLIDE_SPRING}
                style={{
                  x: "-50%",
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: 20 - Math.abs(slot - BOX_SLOT),
                }}
                className="absolute top-0 left-1/2 w-[86%] sm:w-[88%] max-w-[300px] sm:max-w-[340px] flex flex-col items-center"
                aria-hidden={!isActive}
              >
                {/* Glass Card */}
                <motion.div
                  whileHover={isActive ? { scale: 1.02, y: -2 } : undefined}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  onMouseEnter={() => setHoveredId(card.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => isActive && handleCardClick(card)}
                  className={`
                    relative w-full rounded-2xl
                    bg-gradient-to-br from-white/95 via-white/88 to-[#FAF8FF]/82
                    backdrop-blur-xl
                    border transition-colors duration-200 p-2 px-3 sm:p-3 sm:px-4
                    flex items-center justify-between gap-3 cursor-pointer
                    overflow-hidden group
                    ${isHovered
                      ? "border-[#A855F7]/70 shadow-[0_14px_36px_rgba(124,58,237,0.22),0_0_20px_rgba(192,132,252,0.20),inset_0_1.5px_1.5px_rgba(255,255,255,1)]"
                      : "border-white/90 shadow-[0_10px_28px_rgba(124,58,237,0.12),0_2px_8px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#A855F7]/50"
                    }
                  `}
                >
                  {/* Real Glass Specular Sheen */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

                  <div className="relative z-10 flex items-center gap-3 truncate">
                    {/* Purple Glass Squircle Icon */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#F5F0FF] to-[#EDE4FF] border border-[#7C3AED]/20 text-[#7C3AED] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#7C3AED]/50 transition-all">
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#7C3AED]" />
                    </div>

                    {/* Service Title & Subtitle */}
                    <div className="flex flex-col text-left truncate">
                      <span className="text-[12px] sm:text-[14px] font-semibold text-[#18181B] tracking-tight leading-snug truncate">
                        {card.title}
                      </span>
                      {card.isMobile ? (
                        <span className="text-[9px] sm:text-[11px] font-mono font-medium text-[#7C3AED] flex items-center gap-1 mt-0.5">
                          {card.actionText}
                        </span>
                      ) : (
                        <span className="text-[9.5px] sm:text-[11px] text-[#71717A] font-light truncate mt-0.5">
                          {card.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Interactive Arrow */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${card.isMobile
                        ? "bg-[#7C3AED] text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)]"
                        : "bg-[#EDE4FF] text-[#7C3AED] border border-[#7C3AED]/20 group-hover:bg-[#7C3AED] group-hover:text-white"
                      }`}>
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Glowing Energy Thread with Luminous Dot Node */}
                <motion.div
                  initial={false}
                  animate={{ opacity: threadVisible ? 1 : 0, scaleY: threadVisible ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex flex-col items-center justify-center py-0.5 sm:py-1 z-[25] pointer-events-none"
                >
                  <div className="w-[1.5px] h-1.5 sm:h-2 bg-gradient-to-b from-[#C084FC] to-white shadow-[0_0_6px_#A855F7]" />
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#A855F7]/40 blur-[2.5px] animate-pulse" />
                    <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-[0_0_6px_#FFFFFF,0_0_12px_#C084FC,0_0_18px_#7C3AED]" />
                  </div>
                  <div className="w-[1.5px] h-1.5 sm:h-2 bg-gradient-to-b from-white to-[#C084FC] shadow-[0_0_6px_#A855F7]" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* LAYER 3 (z-30): FRONT WALL OF BOX (covers lower edge of box-slot card and hides cards waiting inside) */}
        <div className="absolute bottom-0 inset-x-0 h-[50.53%] z-[30] pointer-events-none overflow-hidden flex items-end justify-center">
          <Image
            src="/assets/services/box-front-clean.png"
            alt="21Spheres Box Front Lip"
            width={1024}
            height={332}
            priority
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

      </div>

      {(onPrevSquad || onNextSquad) && (
        <>
          <div className="absolute right-0 top-[86%] z-40 hidden -translate-y-1/2 flex-row items-center gap-0.5 rounded-full border border-white/25 bg-white/[0.1] p-1.5 text-white/80 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all hover:bg-white/[0.16] lg:-right-16 lg:flex">
            <button
              onClick={onPrevSquad}
              disabled={!canPrevSquad}
              aria-label="Show previous services"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <button
              onClick={onNextSquad}
              disabled={!canNextSquad}
              aria-label="Show next services"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="relative z-40 mt-1 flex flex-row items-center gap-0.5 rounded-full border border-white/25 bg-white/[0.1] p-1.5 text-white/80 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all hover:bg-white/[0.16] lg:hidden">
            <button
              onClick={onPrevSquad}
              disabled={!canPrevSquad}
              aria-label="Show previous services"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <button
              onClick={onNextSquad}
              disabled={!canNextSquad}
              aria-label="Show next services"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/20 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

    </div>
  );
}
