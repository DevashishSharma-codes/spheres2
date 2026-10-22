"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Globe, 
  Cpu, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { ServiceItem } from "@/types";

interface OpenBoxServicesVisualProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onOpenMobileSimulator: () => void;
}

export function OpenBoxServicesVisual({
  services,
  onSelectService,
  onOpenMobileSimulator,
}: OpenBoxServicesVisualProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const webService = services.find((s) => s.id === "web-application-development");
  const aiService = services.find((s) => s.id === "custom-ai-development");
  const llmService = services.find((s) => s.id === "llm-integration");

  // Upper 3 Glass Cards
  const upperCards = [
    {
      id: "mobile-application-development",
      title: "Mobile Application development",
      actionText: "Click to launch 3D model →",
      subtitle: "120Hz ProMotion & Action Button Haptics",
      icon: Smartphone,
      onClick: onOpenMobileSimulator,
      isMobile: true,
    },
    {
      id: "web-application-development",
      title: "Web Application development",
      actionText: "Next.js 15 & Sub-20ms Edge Platforms",
      subtitle: "Full-Stack React 19 & Streaming SSR",
      icon: Globe,
      onClick: () => webService && onSelectService(webService),
      isMobile: false,
    },
    {
      id: "custom-ai-development",
      title: "Custom AI development",
      actionText: "Proprietary Neural Models & TensorRT",
      subtitle: "Edge Inference & Autonomous Agent Swarms",
      icon: Cpu,
      onClick: () => aiService && onSelectService(aiService),
      isMobile: false,
    },
  ];

  // 4th Card (Emerging Half Inside, Half Outside the 3D Box)
  const card4 = {
    id: "llm-integration",
    title: "LLM Integration",
    actionText: "Deterministic RAG & Autonomous Agents",
    subtitle: "Vector Search & Zero Hallucination",
    icon: Sparkles,
    onClick: () => llmService && onSelectService(llmService),
    isMobile: false,
  };

  return (
    <div className="relative w-full max-w-[540px] flex flex-col items-center select-none pt-2">
      
      {/* Soft ethereal ambient violet diffusers in background */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#7057D9]/08 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#8E79E8]/08 blur-[100px] pointer-events-none" />

      {/* ========================================================
          1. UPPER GLASS CARDS (1, 2, 3) WITH UPWARD CONNECTOR ARROWS
          ======================================================== */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {upperCards.map((card) => {
          const Icon = card.icon;
          const isHovered = hoveredId === card.id;

          return (
            <React.Fragment key={card.id}>
              {/* Glass Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={card.onClick}
                className={`
                  relative w-[92%] sm:w-[88%] max-w-[360px] rounded-2xl
                  bg-gradient-to-br from-white/95 via-white/85 to-[#FAF8FF]/80
                  backdrop-blur-xl
                  border transition-all duration-200 p-3.5 px-4
                  flex items-center justify-between gap-3.5 cursor-pointer
                  overflow-hidden group
                  ${
                    isHovered
                      ? "border-[#7057D9]/60 shadow-[0_14px_36px_rgba(112,87,217,0.18),inset_0_1.5px_1.5px_rgba(255,255,255,1)]"
                      : "border-white/90 shadow-[0_8px_28px_rgba(112,87,217,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#7057D9]/40"
                  }
                `}
              >
                {/* Real Glass Specular Sheen (Refraction catchlight) */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

                <div className="relative z-10 flex items-center gap-3.5 truncate">
                  {/* Purple Glass Squircle Icon */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5F2FD] to-[#EEE8FC] border border-[#7057D9]/25 text-[#7057D9] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#7057D9]/50 transition-all">
                    <Icon className="w-5 h-5 text-[#7057D9]" />
                  </div>

                  {/* Service Title & Subtitle */}
                  <div className="flex flex-col text-left truncate">
                    <span className="text-[14px] font-semibold text-[#18181B] tracking-tight leading-snug truncate">
                      {card.title}
                    </span>
                    {card.isMobile ? (
                      <span className="text-[11px] font-mono font-medium text-[#7057D9] flex items-center gap-1 mt-0.5">
                        {card.actionText}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#71717A] font-light truncate mt-0.5">
                        {card.actionText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Interactive Arrow */}
                <div className="relative z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${
                    card.isMobile 
                      ? "bg-[#7057D9] text-white" 
                      : "bg-[#7057D9]/10 text-[#7057D9] border border-[#7057D9]/20 group-hover:bg-[#7057D9] group-hover:text-white"
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Upward Connecting Flow Arrow */}
              <div className="flex flex-col items-center justify-center py-1 z-25 pointer-events-none">
                <div className="w-[1.5px] h-2.5 bg-gradient-to-t from-[#E9D5FF] to-[#A78BFA]" />
                <div className="w-1.5 h-1.5 rotate-45 border-t-[1.5px] border-l-[1.5px] border-[#E9D5FF] -mt-0.5 shadow-[0_0_8px_rgba(233,213,255,0.8)]" />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* ========================================================
          2. THE 3D OPEN BOX WITH CARD 4 HALF INSIDE & HALF OUTSIDE
          - Layer 1 (z-10): 3D Open Box Base (Interior cavity behind Card 4)
          - Layer 2 (z-20): Card 4 sitting in the opening
          - Layer 3 (z-30): Box Front Lip overlapping lower edge of Card 4
          - Positioned with -mt so spacing from Card 3 to Card 4 is exactly equal to cards 1-2 and 2-3
          ======================================================== */}
      <div className="relative w-full max-w-[540px] sm:max-w-[580px] aspect-[1024/657] -mt-[76px] sm:-mt-[82px] flex items-end justify-center select-none">
        
        {/* LAYER 1 (z-10): Box Base (Back flaps & interior cavity) */}
        <Image
          src="/assets/services/box-clean.png"
          alt="21Spheres Production Box"
          fill
          priority
          className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.08)] z-10 pointer-events-none"
        />

        {/* LAYER 2 (z-20): CARD 4 (HALF INSIDE, HALF OUTSIDE) */}
        <div className="absolute top-[26%] sm:top-[24%] left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-[88%] max-w-[360px]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            onMouseEnter={() => setHoveredId(card4.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={card4.onClick}
            className={`
              relative w-full rounded-2xl
              bg-gradient-to-br from-white/95 via-white/85 to-[#FAF8FF]/80
              backdrop-blur-xl
              border transition-all duration-200 p-3.5 px-4
              flex items-center justify-between gap-3.5 cursor-pointer
              overflow-hidden group
              ${
                hoveredId === card4.id
                  ? "border-[#7057D9]/60 shadow-[0_14px_36px_rgba(112,87,217,0.18),inset_0_1.5px_1.5px_rgba(255,255,255,1)]"
                  : "border-white/90 shadow-[0_8px_28px_rgba(112,87,217,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#7057D9]/40"
              }
            `}
          >
            {/* Real Glass Specular Sheen */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />

            <div className="relative z-10 flex items-center gap-3.5 truncate">
              {/* Purple Glass Squircle Icon */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5F2FD] to-[#EEE8FC] border border-[#7057D9]/25 text-[#7057D9] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#7057D9]/50 transition-all">
                <Sparkles className="w-5 h-5 text-[#7057D9]" />
              </div>

              {/* Service Title & Subtitle */}
              <div className="flex flex-col text-left truncate">
                <span className="text-[14px] font-semibold text-[#18181B] tracking-tight leading-snug truncate">
                  {card4.title}
                </span>
                <span className="text-[11px] text-[#71717A] font-light truncate mt-0.5">
                  {card4.actionText}
                </span>
              </div>
            </div>

            {/* Right Interactive Arrow */}
            <div className="relative z-10">
              <div className="w-7 h-7 rounded-full bg-[#7057D9]/10 text-[#7057D9] border border-[#7057D9]/20 group-hover:bg-[#7057D9] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* LAYER 3 (z-30): FRONT WALL OF BOX (Physically covers the lower edge of Card 4) */}
        <div className="absolute bottom-0 inset-x-0 h-[50.53%] z-30 pointer-events-none overflow-hidden flex items-end justify-center">
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
