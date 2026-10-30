"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  ArrowUpRight
} from "lucide-react";
import { ServiceItem } from "@/types";

interface OpenBoxServicesVisualProps {
  services: ServiceItem[];
  offset?: number;
  onSelectService: (service: ServiceItem) => void;
  onOpenMobileSimulator: () => void;
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

export function OpenBoxServicesVisual({
  services,
  offset = 0,
  onSelectService,
  onOpenMobileSimulator,
}: OpenBoxServicesVisualProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightOn, setLightOn] = useState(false);
  const [introStage, setIntroStage] = useState(0);
  const [burstCount, setBurstCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  // Clamp offset between 0 and 6 (so 4 cards are always visible out of 10)
  const safeOffset = Math.max(0, Math.min(6, offset));
  const currentBatch = ALL_SERVICES_DATA.slice(safeOffset, safeOffset + 4);

  const upperBatch = currentBatch.slice(0, 3);
  const card4 = currentBatch[3];

  // Trigger luminous burst whenever a new card pops out of the box
  const prevOffsetRef = useRef(safeOffset);
  useEffect(() => {
    if (prevOffsetRef.current !== safeOffset) {
      prevOffsetRef.current = safeOffset;
      setBurstCount((c) => c + 1);
    }
  }, [safeOffset]);

  // Cinematic Arrival Sequence:
  // Phase 1: Volumetric rays shoot upward out of the box
  // Phase 2: The 4 service cards pop out sequentially with spring physics & reactive flash
  useEffect(() => {
    if (!isInView) return;

    // 1. Ray ignition: beams shoot out from the box
    const t0 = setTimeout(() => {
      setLightOn(true);
      setBurstCount((c) => c + 1);
    }, 150);

    // 2. Card 1 launches and pops to Slot 0
    const t1 = setTimeout(() => {
      setIntroStage(1);
      setBurstCount((c) => c + 1);
    }, 1050);

    // 3. Card 2 launches and pops to Slot 1
    const t2 = setTimeout(() => {
      setIntroStage(2);
      setBurstCount((c) => c + 1);
    }, 1400);

    // 4. Card 3 launches and pops to Slot 2
    const t3 = setTimeout(() => {
      setIntroStage(3);
      setBurstCount((c) => c + 1);
    }, 1750);

    // 5. Card 4 launches and pops into the mouth of the box
    const t4 = setTimeout(() => {
      setIntroStage(4);
      setBurstCount((c) => c + 1);
    }, 2100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
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
          - Starts at scaleY: 0 (collapsed at box mouth)
          - Shoots upward on arrival (scaleY: 0 -> 1) into space
          - 9 distinct ray shafts with high-contrast gaps and soft edges
          - Additive optical blend mode (screen) + vertical distance falloff mask
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
              {/* Tuned Gaussian Blurs: Low enough to preserve distinct ray edges, soft enough for optical realism */}
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

              {/* Background Ambient Scattering */}
              <linearGradient id="ambientBackscatter" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.45" />
                <stop offset="30%" stopColor="#A855F7" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>

              {/* Hot Core Ray Gradient (Center beams) */}
              <linearGradient id="rayHotGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#EDE9FE" stopOpacity="0.82" />
                <stop offset="42%" stopColor="#C084FC" stopOpacity="0.50" />
                <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>

              {/* Vivid Violet Ray Gradient (Mid-angle shafts) */}
              <linearGradient id="rayVividGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.82" />
                <stop offset="18%" stopColor="#E9D5FF" stopOpacity="0.65" />
                <stop offset="48%" stopColor="#C084FC" stopOpacity="0.38" />
                <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
              </linearGradient>

              {/* Outer Flank Ray Gradient (Wide angled shafts) */}
              <linearGradient id="rayFlankGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.68" />
                <stop offset="25%" stopColor="#C084FC" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </linearGradient>

              {/* Ultra-hot center filament needle */}
              <linearGradient id="rayCoreNeedle" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.90" />
                <stop offset="60%" stopColor="#EDE9FE" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 1. SOFT AMBIENT BACKGROUND CONE (Atmospheric back-scatter) */}
            <polygon
              points="220,620 420,620 570,0 70,0"
              fill="url(#ambientBackscatter)"
              filter="url(#rayAtmosphereHaze)"
              opacity="0.65"
            />

            {/* ======================================================
                2. NINE DISTINCT, HIGH-CONTRAST VOLUMETRIC LIGHT SHAFTS
                Each ray radiates from the box mouth out to the top with
                visible dark gaps between them creating "actual rays"
                ====================================================== */}

            {/* RAY 1: Far Left Flank Beam (~-36° angle) */}
            <polygon
              points="235,620 252,620 60,0 15,0"
              fill="url(#rayFlankGrad)"
              filter="url(#rayShaftSoft)"
              opacity="0.80"
            />

            {/* RAY 2: Wide Left Beam (~-26° angle) */}
            <polygon
              points="256,620 274,620 145,0 95,0"
              fill="url(#rayVividGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.88"
            />

            {/* RAY 3: Mid-Left Main Beam (~-17° angle) */}
            <polygon
              points="278,620 295,620 225,0 175,0"
              fill="url(#rayVividGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.92"
            />

            {/* RAY 4: Inner-Left Hot Shaft (~-8° angle) */}
            <polygon
              points="298,620 314,620 295,0 250,0"
              fill="url(#rayHotGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.95"
            />

            {/* RAY 5: Central High-Intensity Column (0° straight up) */}
            <polygon
              points="312,620 328,620 335,0 305,0"
              fill="url(#rayHotGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="1.0"
            />

            {/* RAY 6: Inner-Right Hot Shaft (~+8° angle) */}
            <polygon
              points="326,620 342,620 390,0 345,0"
              fill="url(#rayHotGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.95"
            />

            {/* RAY 7: Mid-Right Main Beam (~+17° angle) */}
            <polygon
              points="345,620 362,620 465,0 415,0"
              fill="url(#rayVividGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.92"
            />

            {/* RAY 8: Wide Right Beam (~+26° angle) */}
            <polygon
              points="366,620 384,620 545,0 495,0"
              fill="url(#rayVividGrad)"
              filter="url(#rayShaftCrisp)"
              opacity="0.88"
            />

            {/* RAY 9: Far Right Flank Beam (~+36° angle) */}
            <polygon
              points="388,620 405,620 625,0 580,0"
              fill="url(#rayFlankGrad)"
              filter="url(#rayShaftSoft)"
              opacity="0.80"
            />

            {/* ======================================================
                3. ACCENT SHARP MICRO-SHAFTS (Razor-sharp intense beams)
                ====================================================== */}
            <polygon
              points="285,620 293,620 205,0 185,0"
              fill="url(#rayCoreNeedle)"
              filter="url(#rayShaftLaser)"
              opacity="0.75"
            />
            <polygon
              points="317,620 323,620 324,0 316,0"
              fill="url(#rayCoreNeedle)"
              filter="url(#rayShaftLaser)"
              opacity="0.90"
            />
            <polygon
              points="347,620 355,620 455,0 435,0"
              fill="url(#rayCoreNeedle)"
              filter="url(#rayShaftLaser)"
              opacity="0.75"
            />

            {/* ======================================================
                4. INCANDESCENT EMITTER BASE (Hot aperture flare at origin)
                ====================================================== */}
            <ellipse
              cx="320"
              cy="620"
              rx="110"
              ry="24"
              fill="#FFFFFF"
              filter="url(#rayShaftSoft)"
              opacity="0.95"
            />
            <ellipse
              cx="320"
              cy="620"
              rx="160"
              ry="40"
              fill="#C084FC"
              filter="url(#rayAtmosphereHaze)"
              opacity="0.85"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* ========================================================
          FLOATING ATMOSPHERIC LIGHT PARTICLES (Luminous dust motes)
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

      {/* ========================================================
          1. UPPER GLASS CARDS (1, 2, 3) WITH VERTICAL ENERGY THREAD
          ======================================================== */}
      <div className="relative z-20 w-full flex flex-col items-center min-h-[212px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {upperBatch.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredId === card.id;

            // During initial intro, cards pop out sequentially from the box
            const isCardActive = isIntroComplete || introStage > index;
            if (!isCardActive) return null;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ 
                  y: isIntroComplete ? 65 : 240, 
                  scale: isIntroComplete ? 0.84 : 0.6, 
                  opacity: 0,
                  filter: "blur(6px)" 
                }}
                animate={{ 
                  y: 0, 
                  scale: 1, 
                  opacity: 1, 
                  filter: "blur(0px)" 
                }}
                exit={{ 
                  y: -45, 
                  scale: 0.92, 
                  opacity: 0,
                  filter: "blur(3px)" 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.8
                }}
                className="w-full flex flex-col items-center"
              >
                {/* Glass Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  onMouseEnter={() => setHoveredId(card.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleCardClick(card)}
                  className={`
                    relative w-[92%] sm:w-[88%] max-w-[340px] rounded-2xl
                    bg-gradient-to-br from-white/95 via-white/88 to-[#FAF8FF]/82
                    backdrop-blur-xl
                    border transition-all duration-200 p-2.5 sm:p-3 px-3.5 sm:px-4
                    flex items-center justify-between gap-3 cursor-pointer
                    overflow-hidden group
                    ${
                      isHovered
                        ? "border-[#A855F7]/70 shadow-[0_14px_36px_rgba(124,58,237,0.22),0_0_20px_rgba(192,132,252,0.20),inset_0_1.5px_1.5px_rgba(255,255,255,1)]"
                        : "border-white/90 shadow-[0_10px_28px_rgba(124,58,237,0.12),0_2px_8px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#A855F7]/50"
                    }
                  `}
                >
                  {/* Real Glass Specular Sheen */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

                  <div className="relative z-10 flex items-center gap-3 truncate">
                    {/* Purple Glass Squircle Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#F5F0FF] to-[#EDE4FF] border border-[#7C3AED]/20 text-[#7C3AED] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#7C3AED]/50 transition-all">
                      <Icon className="w-4.5 h-4.5 text-[#7C3AED]" />
                    </div>

                    {/* Service Title & Subtitle */}
                    <div className="flex flex-col text-left truncate">
                      <span className="text-[13.5px] sm:text-[14px] font-semibold text-[#18181B] tracking-tight leading-snug truncate">
                        {card.title}
                      </span>
                      {card.isMobile ? (
                        <span className="text-[10.5px] sm:text-[11px] font-mono font-medium text-[#7C3AED] flex items-center gap-1 mt-0.5">
                          {card.actionText}
                        </span>
                      ) : (
                        <span className="text-[10.5px] sm:text-[11px] text-[#71717A] font-light truncate mt-0.5">
                          {card.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Interactive Arrow */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${
                      card.isMobile 
                        ? "bg-[#7C3AED] text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)]" 
                        : "bg-[#EDE4FF] text-[#7C3AED] border border-[#7C3AED]/20 group-hover:bg-[#7C3AED] group-hover:text-white"
                    }`}>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Glowing Energy Thread with Luminous Dot Node */}
                <AnimatePresence>
                  {(isIntroComplete || introStage > index + 1) && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative flex flex-col items-center justify-center py-1.2 z-[25] pointer-events-none"
                    >
                      <div className="w-[1.5px] h-2 bg-gradient-to-b from-[#C084FC] to-white shadow-[0_0_6px_#A855F7]" />
                      
                      {/* Radiant Energy Node with Optical Flare */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-[#A855F7]/40 blur-[2.5px] animate-pulse" />
                        <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#FFFFFF,0_0_12px_#C084FC,0_0_18px_#7C3AED]" />
                        <div className="absolute w-5 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                      </div>

                      <div className="w-[1.5px] h-2 bg-gradient-to-b from-white to-[#C084FC] shadow-[0_0_6px_#A855F7]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ========================================================
          2. THE 3D OPEN BOX WITH CARD 4 HALF INSIDE & HALF OUTSIDE
          - Layer 1 (z-10): 3D Open Box Base
          - Layer 1.5 (z-12): Glowing Reactor Core inside Box Cavity
          - Layer 2 (z-20): Card 4 sitting in the opening (popping out)
          - Layer 3 (z-30): Box Front Lip overlapping lower edge of Card 4
          ======================================================== */}
      <div className="relative w-full max-w-[475px] sm:max-w-[490px] aspect-[1024/657] -mt-[68px] sm:-mt-[74px] flex items-end justify-center select-none">
        
        {/* Soft floor bounce under the box */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[390px] h-[36px] rounded-full bg-purple-600/18 blur-[26px] pointer-events-none z-0" />

        {/* LAYER 1 (z-10): Box Base (Back flaps & interior cavity) */}
        <Image
          src="/assets/services/box-clean.png"
          alt="21Spheres Production Box"
          fill
          priority
          className="object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.40)] z-10 pointer-events-none"
        />

        {/* LAYER 1.5 (z-12): Photorealistic Core Luminous Reactor Glow inside Cavity */}
        <div className="absolute top-[28%] sm:top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[12] pointer-events-none flex flex-col items-center justify-center">
          {/* Ethereal Violet Radiance */}
          <motion.div
            key={burstCount}
            initial={{ scale: 1.35, opacity: 1 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-[300px] sm:w-[350px] h-[70px] rounded-full bg-gradient-to-r from-purple-600/40 via-violet-400/85 to-purple-600/40 blur-[32px]"
            style={{ mixBlendMode: "screen" }}
          />
          {/* Intense Neon Platform */}
          <div 
            className="absolute w-[220px] sm:w-[260px] h-[32px] rounded-full bg-gradient-to-r from-violet-500 via-[#C084FC] to-violet-500 blur-[13px] shadow-[0_0_50px_#A855F7,0_0_80px_rgba(168,85,247,0.75)]"
            style={{ mixBlendMode: "screen" }}
          />
          {/* Hot White-Violet Incandescent Filament */}
          <div className="absolute w-[140px] sm:w-[170px] h-[12px] rounded-full bg-gradient-to-r from-white/70 via-white to-white/70 blur-[3.5px] shadow-[0_0_16px_#FFFFFF,0_0_30px_#C084FC]" />
        </div>

        {/* LAYER 2 (z-20): CARD 4 (HALF INSIDE, HALF OUTSIDE - POPS OUT OF BOX) */}
        <div className="absolute top-[26%] sm:top-[24%] left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-[88%] max-w-[340px] flex flex-col items-center">
          <AnimatePresence mode="wait">
            {(isIntroComplete || introStage >= 4) && card4 && (
              <motion.div
                key={card4.id}
                initial={{ 
                  y: isIntroComplete ? 88 : 120, 
                  scale: isIntroComplete ? 0.84 : 0.7, 
                  opacity: 0,
                  filter: "blur(5px)" 
                }}
                animate={{ 
                  y: 0, 
                  scale: 1, 
                  opacity: 1, 
                  filter: "blur(0px)" 
                }}
                exit={{ 
                  y: -38, 
                  scale: 0.92, 
                  opacity: 0,
                  filter: "blur(3px)" 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 320, 
                  damping: 22,
                  mass: 0.85
                }}
                className="w-full flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  onMouseEnter={() => setHoveredId(card4.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleCardClick(card4)}
                  className={`
                    relative w-full rounded-2xl
                    bg-gradient-to-br from-white/95 via-white/88 to-[#FAF8FF]/82
                    backdrop-blur-xl
                    border transition-all duration-200 p-2.5 sm:p-3 px-3.5 sm:px-4
                    flex items-center justify-between gap-3 cursor-pointer
                    overflow-hidden group
                    ${
                      hoveredId === card4.id
                        ? "border-[#A855F7]/70 shadow-[0_14px_36px_rgba(124,58,237,0.22),0_0_20px_rgba(192,132,252,0.20),inset_0_1.5px_1.5px_rgba(255,255,255,1)]"
                        : "border-white/90 shadow-[0_10px_28px_rgba(124,58,237,0.12),0_2px_8px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#A855F7]/50"
                    }
                  `}
                >
                  {/* Real Glass Specular Sheen */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

                  <div className="relative z-10 flex items-center gap-3 truncate">
                    {/* Purple Glass Squircle Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#F5F0FF] to-[#EDE4FF] border border-[#7C3AED]/20 text-[#7C3AED] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#7C3AED]/50 transition-all">
                      {React.createElement(card4.icon, { className: "w-4.5 h-4.5 text-[#7C3AED]" })}
                    </div>

                    {/* Service Title & Subtitle */}
                    <div className="flex flex-col text-left truncate">
                      <span className="text-[13.5px] sm:text-[14px] font-semibold text-[#18181B] tracking-tight leading-snug truncate">
                        {card4.title}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] text-[#71717A] font-light truncate mt-0.5">
                        {card4.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right Interactive Arrow */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EDE4FF] text-[#7C3AED] border border-[#7C3AED]/20 group-hover:bg-[#7C3AED] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Energy Thread Lead into the Box Core */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative flex flex-col items-center justify-center pt-1 z-[25] pointer-events-none"
                >
                  <div className="w-[1.5px] h-2 bg-gradient-to-b from-white to-[#C084FC] shadow-[0_0_6px_#A855F7]" />
                  <div className="relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#A855F7]/40 blur-[3px] animate-pulse" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_14px_#C084FC,0_0_20px_#7C3AED]" />
                    <div className="absolute w-6 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LAYER 3 (z-30): FRONT WALL OF BOX (Physically covers the lower edge of Card 4) */}
        <div className="absolute bottom-0 inset-x-0 h-[50.53%] z-[30] pointer-events-none overflow-hidden flex items-end justify-center">
          {/* Luminous Box lip rim catchlight: photon spill across top edge of front cardboard */}
          <div className="absolute top-0 inset-x-[12%] h-[2px] bg-gradient-to-r from-transparent via-[#E9D5FF]/95 to-transparent blur-[1px] shadow-[0_0_12px_#C084FC,0_0_24px_#A855F7]" />
          
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

    </div>
  );
}
