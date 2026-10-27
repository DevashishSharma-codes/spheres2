"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ServiceItem } from "@/types";
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
  SlidersHorizontal
} from "lucide-react";

interface AllServicesCatalogProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onOpenMobileSimulator: () => void;
}

const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Globe,
  Cpu,
  Sparkles,
  MessageSquareCode: MessageSquare,
  Workflow,
  Layout,
  Rocket,
  Building2,
  Terminal,
};

/**
 * GlassFolderTabServiceCard
 * Renders the service card matching the exact FolderTabCard architecture from the About Us section,
 * transformed into pure transparent glass with authentic optical refraction, specular highlights,
 * and an animated lilac/purple mesh aurora gradient visible through the glass.
 */
function GlassFolderTabServiceCard({
  service,
  isMobile,
  isHovered,
  onClick,
}: {
  service: ServiceItem;
  isMobile: boolean;
  isHovered: boolean;
  onClick: () => void;
}) {
  const Icon = SERVICE_ICON_MAP[service.icon || "Cpu"] || Cpu;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`
        group relative w-full h-[390px] sm:h-[410px] rounded-2xl overflow-hidden
        transition-all duration-300 ease-out p-[1.5px] select-none flex flex-col cursor-pointer
        ${
          isHovered
            ? "shadow-[0_0_35px_rgba(168,85,247,0.35),0_20px_50px_rgba(0,0,0,0.55)]"
            : "shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
        }
      `}
    >
      {/* 1. Static Border Outline (visible when not hovered) */}
      <div 
        className={`absolute inset-0 rounded-2xl border border-white/20 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-100"
        }`} 
      />

      {/* 2. Soft Glowing Halo following the minimal light strip */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
        className={`absolute -inset-[150%] pointer-events-none filter blur-[8px] transition-opacity duration-300 ${
          isHovered ? "opacity-75" : "opacity-0"
        }`}
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 320deg, rgba(147, 51, 234, 0) 325deg, #7E22CE 338deg, #A855F7 348deg, #FFFFFF 355deg, rgba(192, 132, 252, 0) 360deg)",
        }}
      />

      {/* 3. Crisp Minimal Moving Light Strip around the perimeter */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
        className={`absolute -inset-[150%] pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 325deg, rgba(126, 34, 206, 0) 328deg, #7E22CE 338deg, #A855F7 348deg, #FFFFFF 356deg, rgba(233, 213, 255, 0) 360deg)",
        }}
      />

      {/* 4. Card Body: Covers the center so only the 1.5px minimal moving light strip is visible */}
      <div className="relative w-full h-full rounded-[14.5px] p-2 bg-[#0A0718] backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
        {/* Inner Canvas */}
        <div className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between">
          
          {/* ── 1. Animated Mesh Aurora Gradient (Lilac & Purple Theme from About Us) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-85 transition-opacity duration-300">
            <div className="absolute inset-0 bg-[#090715]/40" />

          {/* Continuous Swirling Mesh Container */}
          <motion.div
            animate={{
              rotate: [0, 360],
              x: mousePos.x,
              y: mousePos.y,
            }}
            transition={{
              rotate: { duration: 24, repeat: Infinity, ease: "linear" },
              x: { type: "spring", stiffness: 120, damping: 18 },
              y: { type: "spring", stiffness: 120, damping: 18 },
            }}
            className="absolute -top-[35%] -left-[35%] w-[170%] h-[170%] pointer-events-none"
          >
            {/* Blob 1: Lilac Purple */}
            <motion.div
              animate={{
                x: [-45, 40, -30, -45],
                y: [-30, 35, -40, -30],
                scale: [1, 1.3, 0.9, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[15%] w-[65%] h-[65%] blur-[24px]"
              style={{
                background: "radial-gradient(circle, rgba(193,180,216,0.55) 0%, rgba(156,142,184,0.35) 45%, rgba(112,87,217,0.2) 80%, transparent 100%)",
              }}
            />

            {/* Blob 2: Luminous Core Violet */}
            <motion.div
              animate={{
                x: [35, -40, 25, 35],
                y: [25, -30, 40, 25],
                scale: [0.9, 1.35, 0.9, 0.9],
              }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[22%] left-[22%] w-[55%] h-[55%] blur-[18px]"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(228,221,240,0.4) 35%, rgba(142,121,232,0.3) 70%, transparent 90%)",
              }}
            />

            {/* Blob 3: Deep Brand Purple Accent */}
            <motion.div
              animate={{
                x: [30, -25, 35, 30],
                y: [-35, 30, -20, -35],
                scale: [0.85, 1.25, 0.85, 0.85],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[16%] right-[12%] w-[50%] h-[50%] blur-[22px]"
              style={{
                background: "radial-gradient(circle, rgba(125,95,232,0.6) 0%, rgba(112,87,217,0.35) 40%, transparent 85%)",
              }}
            />
          </motion.div>

          {/* Vignette & specular reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* ── 2. Top Bar: Glassy Number Badge at Top Left & Action Button (↗) at Top Right ── */}
        <div className="absolute z-20 top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center pointer-events-none">
          <div className={`h-9 sm:h-10 px-3 rounded-xl backdrop-blur-md border text-white font-mono text-xs sm:text-[13px] font-semibold flex items-center justify-center tracking-wider shadow-sm transition-all duration-300 ${
            isHovered
              ? "bg-white/25 border-[#C084FC]/70 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]"
              : "bg-white/15 border-white/25 text-white"
          }`}>
            <span>{service.number}</span>
          </div>
        </div>

        <div className="absolute z-20 top-3 right-3 sm:top-3.5 sm:right-3.5">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border transition-all shadow-sm flex items-center justify-center ${
            isHovered
              ? "bg-[#7C3AED] border-white/60 text-white shadow-[0_0_16px_rgba(147,51,234,0.5)] scale-105"
              : "bg-white/15 hover:bg-white/25 border-white/25 text-white"
          }`}>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* ── 3. Asymmetrical Folder-Tab Cutout Sheet in REAL TRANSPARENT GLASS ── */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
          <div className="relative w-full h-[68%]">
            {/* Real Glass SVG Cutout with Frosted Backdrop Gradient */}
            <svg
              viewBox="0 0 380 240"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-300"
            >
              <defs>
                <linearGradient id={`glass-tab-${service.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.10)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
              </defs>

              {/* Background Fill Sheet */}
              <path
                d="M 0 0
                   L 225 0
                   L 225 38
                   L 380 38
                   L 380 226
                   A 16 12 0 0 1 364 240
                   L 16 240
                   A 16 12 0 0 1 0 226
                   Z"
                fill={`url(#glass-tab-${service.id})`}
                stroke="none"
              />

              {/* Seamless Continuous Inner Line with smooth corner arcs matching card curvature & glowing outline on hover */}
              <path
                d="M 0.75 0.75
                   L 225 0.75
                   L 225 38
                   L 379.25 38
                   L 379.25 228
                   A 15 11 0 0 1 364.25 239.25
                   L 15.75 239.25
                   A 15 11 0 0 1 0.75 228
                   Z"
                fill="none"
                stroke={isHovered ? "rgba(216, 180, 254, 0.95)" : "rgba(255, 255, 255, 0.38)"}
                strokeWidth={isHovered ? "1.6" : "1.2"}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            {/* Content inside the Transparent Glass Folder Flap (Always Visible, No Skeletons) */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3.5 sm:p-4.5 pointer-events-auto">
              
              {/* Upper Left Tab Shelf (0 to 225px): Service Icon */}
              <div className="flex items-center h-8">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-xs transition-all ${
                  isHovered
                    ? "bg-[#7C3AED]/40 border-[#C084FC]/60 text-white scale-105 shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                    : "bg-white/20 border-white/30 text-white"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Always Normal Full View with Clear Typography */}
              <div className="flex-1 flex flex-col justify-between pt-2">
                <div>
                  {/* Full Heading */}
                  <h3 className={`font-semibold text-white text-[16px] sm:text-[17.5px] tracking-tight leading-snug mb-1.5 transition-colors ${
                    isHovered ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-white"
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Narrative & Description */}
                  <p className="text-[11.5px] sm:text-[12.5px] font-light text-white/80 leading-relaxed line-clamp-3">
                    {service.description || service.headline}
                  </p>
                </div>

                {/* Footer Action Row: SPECS or SIMULATOR and arrow for navigation */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-end text-[11px] font-mono">
                  <span className={`flex items-center gap-1.5 font-medium transition-colors ${
                    isHovered ? "text-white" : "text-[#C4B5FD] group-hover:text-white"
                  }`}>
                    <span>{isMobile ? "SIMULATOR" : "SPECS"}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export function AllServicesCatalog({
  services,
  onSelectService,
  onOpenMobileSimulator,
}: AllServicesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", "AI & Intelligence", "Web & Platforms", "Mobile & Devices", "Enterprise & Cloud"];

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((s) => {
        if (selectedCategory === "AI & Intelligence") {
          return s.id.includes("ai") || s.id.includes("llm") || s.id.includes("chatbot");
        }
        if (selectedCategory === "Web & Platforms") {
          return s.id.includes("web") || s.id.includes("website") || s.id.includes("saas");
        }
        if (selectedCategory === "Mobile & Devices") {
          return s.id.includes("mobile");
        }
        if (selectedCategory === "Enterprise & Cloud") {
          return s.id.includes("enterprise") || s.id.includes("workflow") || s.id.includes("custom-software");
        }
        return true;
      });

  return (
    <section 
      id="all-services" 
      className="relative z-10 pt-4 pb-20 sm:pb-28 overflow-hidden bg-transparent text-white"
    >
      <Container>
        {/* =========================================================
            HEADER: 10 PRODUCTION SERVICES CATALOG
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4B5FD] text-[11px] font-mono tracking-wide mb-3 border border-white/15">
              <span>01 &mdash; 10 PRODUCTION CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.04em] text-white leading-tight">
              All 10 Specialized Squads
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base font-light text-white/75 leading-relaxed">
            Every squad operates with full-lifecycle accountability, dedicated architecture leads, and sub-second SLA compliance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#7057D9] text-white shadow-[0_0_16px_rgba(112,87,217,0.5)] border border-[#8E79E8]"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* =========================================================
            GRID: ALL 10 SERVICE CARDS (NORMAL GLOWING OUTLINE HIGHLIGHT)
            ========================================================= */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6 items-stretch"
          onMouseLeave={() => setHoveredId(null)}
        >
          {filteredServices.map((service) => {
            const isMobile = service.id === "mobile-application-development";
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                  y: isHovered ? -6 : 0,
                  zIndex: isHovered ? 20 : 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 26,
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                className="relative"
              >
                <GlassFolderTabServiceCard
                  service={service}
                  isMobile={isMobile}
                  isHovered={isHovered}
                  onClick={() => {
                    if (isMobile) {
                      onOpenMobileSimulator();
                    } else {
                      onSelectService(service);
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
