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
        group relative w-full h-[330px] sm:h-[350px] rounded-2xl overflow-hidden
        transition-all duration-300 ease-out p-[1.5px] select-none flex flex-col cursor-pointer
        ${
          isHovered
            ? "shadow-[0_12px_34px_rgba(112,87,217,0.18),0_8px_22px_rgba(29,24,43,0.10)]"
            : "shadow-[0_8px_24px_rgba(29,24,43,0.10)]"
        }
      `}
    >
      {/* 1. Static Border Outline (visible when not hovered) */}
      <div 
        className={`absolute inset-0 rounded-2xl border border-white/70 transition-opacity duration-300 pointer-events-none ${
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
      <div className="relative w-full h-full rounded-[14.5px] p-2 bg-[#E7E4F0] backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
        {/* Inner Canvas */}
        <div className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between">
          
          {/* ── 1. Animated Mesh Aurora Gradient (Lilac & Purple Theme from About Us) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-65 transition-opacity duration-300">
            <div className="absolute inset-0 bg-white/35" />

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
          <div className="absolute inset-0 bg-gradient-to-t from-white/45 via-transparent to-white/25 pointer-events-none" />
        </div>

        {/* ── 2. Top Bar: Glassy Number Badge at Top Left & Action Button (↗) at Top Right ── */}
        <div className="absolute z-20 top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center pointer-events-none">
          <div className={`h-9 sm:h-10 px-3 rounded-xl backdrop-blur-md border font-mono text-xs sm:text-[13px] font-semibold flex items-center justify-center tracking-wider shadow-sm transition-all duration-300 ${
            isHovered
              ? "bg-white/90 border-[#A991F2]/75 text-[#4F35A6] shadow-[0_0_12px_rgba(112,87,217,0.18)]"
              : "bg-white/75 border-white/80 text-[#514A65]"
          }`}>
            <span>{service.number}</span>
          </div>
        </div>

        <div className="absolute z-20 top-3 right-3 sm:top-3.5 sm:right-3.5">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border transition-all shadow-sm flex items-center justify-center ${
            isHovered
              ? "bg-[#7057D9] border-white/80 text-white shadow-[0_0_16px_rgba(112,87,217,0.28)] scale-105"
              : "bg-white/75 hover:bg-white border-white/80 text-[#514A65]"
          }`}>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* ── 3. Asymmetrical Folder-Tab Cutout Sheet in REAL TRANSPARENT GLASS ── */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
          <div className="relative w-full h-[76%]">
            {/* Real Glass SVG Cutout with Frosted Backdrop Gradient */}
            <svg
              viewBox="0 0 380 240"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-300"
            >
              <defs>
                <linearGradient id={`glass-tab-${service.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.88)" />
                  <stop offset="45%" stopColor="rgba(249, 248, 253, 0.82)" />
                  <stop offset="100%" stopColor="rgba(236, 232, 247, 0.88)" />
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
                stroke={isHovered ? "rgba(112, 87, 217, 0.72)" : "rgba(255, 255, 255, 0.96)"}
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
                    ? "bg-[#7057D9] border-[#7057D9] text-white scale-105 shadow-[0_0_12px_rgba(112,87,217,0.24)]"
                    : "bg-white/90 border-white text-[#7057D9]"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Always Normal Full View with Clear Typography */}
              <div className="flex-1 flex flex-col justify-between pt-2">
                <div>
                  {/* Full Heading */}
                  <h3 className={`font-semibold text-[#282431] text-[16px] sm:text-[17.5px] tracking-tight leading-snug mb-1.5 transition-colors ${
                    isHovered ? "text-[#4F35A6]" : "text-[#282431]"
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Narrative & Description */}
                  <p className="text-[11.5px] sm:text-[12.5px] font-light text-[#696574] leading-relaxed line-clamp-3">
                    {service.description || service.headline}
                  </p>
                </div>

                {/* Footer Action Row: SPECS or SIMULATOR and arrow for navigation */}
                <div className="pt-2.5 border-t border-[#D8D4E2] flex items-center justify-end text-[11px] font-mono">
                  <span className={`flex items-center gap-1.5 font-medium transition-colors ${
                    isHovered ? "text-[#5139B0]" : "text-[#7057D9] group-hover:text-[#5139B0]"
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Intelligence", "Web & Platforms", "Mobile & Devices", "Enterprise & Cloud"];
  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((service) => {
        if (selectedCategory === "AI & Intelligence") {
          return service.id.includes("ai") || service.id.includes("llm") || service.id.includes("chatbot");
        }
        if (selectedCategory === "Web & Platforms") {
          return service.id.includes("web") || service.id.includes("website") || service.id.includes("saas");
        }
        if (selectedCategory === "Mobile & Devices") return service.id.includes("mobile");
        if (selectedCategory === "Enterprise & Cloud") {
          return service.id.includes("enterprise") || service.id.includes("workflow") || service.id.includes("custom-software");
        }
        return true;
      });

  return (
    <section 
      id="all-services" 
      className="relative z-10 overflow-hidden bg-transparent pt-2 pb-12 text-[#24232A] sm:pb-16"
    >
      <Container>
        <nav aria-label="Filter services by category" className="mb-4 flex gap-6 overflow-x-auto border-b border-[#E7E5EB] sm:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={`relative shrink-0 py-2.5 text-[12px] font-medium transition-colors sm:text-[13px] ${
                selectedCategory === category
                  ? "text-[#6248CA]"
                  : "text-[#777680] hover:text-[#302A43]"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#7057D9]" />
              )}
            </button>
          ))}
        </nav>
        <div 
          className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5"
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
