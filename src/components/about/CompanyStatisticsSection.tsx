"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Maximize2, 
  Smartphone, 
  Monitor, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  Bot,
  Sparkles,
  Lock,
  Globe,
  Code2,
  Rocket,
  ShieldAlert,
  Flame,
  Server,
  Database
} from "lucide-react";

function WebTechLogo({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  switch (name) {
    case "Next.js":
    case "Next.js 15":
      return (
        <svg viewBox="0 0 180 180" className={className} fill="none">
          <mask id="mask0_next_web" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black"/>
          </mask>
          <g mask="url(#mask0_next_web)">
            <circle cx="90" cy="90" r="90" fill="black"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z" fill="white"/>
            <rect x="115" y="54" width="12" height="72" fill="white"/>
          </g>
        </svg>
      );
    case "React":
    case "React 19":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6"/>
          <path fill="#FFF" d="M37.8 77.2v29.4h-13V77.2h-12V65.8h37v11.4h-12zm33.4 2.8c-2.8-1.7-6.2-2.6-10.2-2.6-4.5 0-7.8 1.1-10 3.2-2.2 2.1-3.3 5-3.3 8.7 0 3.5 1 6.3 3.1 8.3 2.1 2 5.5 3.5 10.2 4.4 3.7.8 6.4 1.7 8 2.8 1.6 1.1 2.4 2.7 2.4 4.8 0 2.2-1 4-2.9 5.2-1.9 1.3-4.7 1.9-8.4 1.9-3.9 0-7.3-.8-10.3-2.5-3-1.6-5.1-4-6.3-7.2l10.4-5.9c.7 1.9 1.9 3.4 3.6 4.3 1.7 1 3.8 1.5 6.3 1.5 2.5 0 4.5-.5 5.9-1.5 1.4-1 2.1-2.4 2.1-4.2 0-1.8-.8-3.1-2.4-4-1.6-.9-4.3-1.7-8.1-2.5-4.8-1-8.5-2.6-11-4.7-2.5-2.1-3.8-5.3-3.8-9.5 0-4.4 1.6-8 4.7-10.8 3.1-2.8 7.3-4.2 12.6-4.2 4.1 0 7.8.8 11.1 2.5 3.3 1.7 5.7 4.1 7.2 7.3l-10.4 6c-.8-1.7-2-3-3.6-3.8z"/>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case "Turbopack":
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L2 22h20L12 2z" fill="#000"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#5FA04E"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="7" rx="8" ry="4" stroke="#336791" strokeWidth="2" fill="#336791" fillOpacity="0.15"/>
          <path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7" stroke="#336791" strokeWidth="2"/>
          <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" stroke="#336791" strokeWidth="2"/>
        </svg>
      );
    case "GraphQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#E10098">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fillOpacity="0.2" stroke="#E10098" strokeWidth="1.5"/>
          <circle cx="12" cy="2" r="2" fill="#E10098"/>
          <circle cx="20.66" cy="7" r="2" fill="#E10098"/>
          <circle cx="20.66" cy="17" r="2" fill="#E10098"/>
          <circle cx="12" cy="22" r="2" fill="#E10098"/>
          <circle cx="3.34" cy="17" r="2" fill="#E10098"/>
          <circle cx="3.34" cy="7" r="2" fill="#E10098"/>
        </svg>
      );
    default:
      return (
        <div className="w-2.5 h-2.5 rounded-full bg-[#7057D9]" />
      );
  }
}


const WEB_TECHS = [
  { name: "Next.js 15" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "Turbopack" },
  { name: "Node.js" },
  { name: "PostgreSQL" },
  { name: "GraphQL" },
  { name: "Vercel" },
];

function MobileTechLogo({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  switch (name) {
    case "React Native":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "Swift":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M21.5 13.5c-.3.4-1.2 1.3-2.6 1.8-1.5.6-3.1.6-4.5.1 1.7 1.3 3.8 2 6 2.1-.3.4-1.8 1.8-4.4 2.3-2.9.6-6-.3-8.3-2.3 2.1.8 4.5.9 6.7.3-3.6-2-6-5.8-6.1-9.9 0-.4 0-.8.1-1.2 1.5 2.6 3.8 4.7 6.6 5.8-1.1-1.2-1.9-2.7-2.3-4.3-.4-1.5-.3-3 .3-4.5 1.5 3.3 4.4 5.9 7.9 7.1-1.1-1.6-1.5-3.6-1.1-5.6.4-1.9 1.6-3.5 3.3-4.6-.2 1.3-.1 2.6.4 3.8.5 1.2 1.4 2.2 2.5 2.9-.6-1-.8-2.1-.7-3.2.1-1.1.7-2.1 1.5-2.8-.2 1.4.1 2.7.9 3.8.8 1.1 1.9 1.9 3.2 2.2-1.3.3-2.4 1-3.2 2-.8 1-1.1 2.3-1 3.6 1.2-.4 2.3-1 3.2-1.8.8-.7 1.5-1.6 1.9-2.6-.1 1.3-.5 2.5-1.2 3.6-.8 1.1-1.8 1.9-3 2.5z" fill="#F05138"/>
        </svg>
      );
    case "Angular":
      return (
        <svg viewBox="0 0 250 250" className={className}>
          <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#E23237"/>
          <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" fill="#B52E31"/>
          <polygon points="125,52.1 66,182.6 87.8,182.6 99.7,153.4 125,153.4 150.3,153.4 162.2,182.6 184,182.6" fill="#FFFFFF"/>
          <polygon points="125,90.5 111.8,124.6 125,124.6 138.2,124.6" fill="#B52E31"/>
        </svg>
      );
    case "Kotlin":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M24 24H0V0h24L12 12Z" fill="#7F52FF"/>
          <path d="M0 24l12-12L0 0Z" fill="#C757BC"/>
        </svg>
      );
    case "Flutter":
      return (
        <svg viewBox="0 0 166 202" className={className}>
          <path d="M103.4 114.5L166 177.1V202l-87.6-87.5 25-25z" fill="#02569B" />
          <path d="M166 126.7L141 101.7l25-25V25.3L89.6 101.7l76.4 76.4v-51.4z" fill="#0175C2" />
          <path d="M166 0H114.6L0 114.6l37.8 37.8L166 25.4V0z" fill="#54C5F8" />
        </svg>
      );
    case "Expo":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M2 19h20L12 3 2 19z" fill="#000020" />
        </svg>
      );
    default:
      return (
        <div className="w-2.5 h-2.5 rounded-full bg-[#7057D9]" />
      );
  }
}

const MOBILE_RADAR_NODES = [
  {
    name: "Swift",
    x: "36%",
    y: "14%",
    delay: 0,
  },
  {
    name: "Flutter",
    x: "78%",
    y: "24%",
    delay: 0.5,
  },
  {
    name: "React Native",
    x: "16%",
    y: "48%",
    delay: 1.0,
  },
  {
    name: "Kotlin",
    x: "58%",
    y: "40%",
    delay: 1.5,
  },
  {
    name: "Angular",
    x: "74%",
    y: "74%",
    delay: 2.0,
  },
];

const MOBILE_TECHS = [
  { name: "React Native" },
  { name: "Swift" },
  { name: "Flutter" },
  { name: "Kotlin" },
  { name: "Angular" },
  { name: "Expo" },
];

function AIBackendTechLogo({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  switch (name) {
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M11.9 2c-3.1 0-5.3.7-5.3 2.7v2h5.4v.7H4.3C2.3 7.4 1 9.4 1 12.3c0 3.2 1.8 5 4.8 5h1.5v-2.2c0-1.8 1.4-3.3 3.3-3.3h5.4v-.7c0-2-1.8-3.7-4.1-3.7H11.9z" fill="#3776AB"/>
          <path d="M12.1 22c3.1 0 5.3-.7 5.3-2.7v-2h-5.4v-.7h7.7c2 0 3.3-2 3.3-4.9 0-3.2-1.8-5-4.8-5h-1.5v2.2c0 1.8-1.4 3.3-3.3 3.3H8v.7c0 2 1.8 3.7 4.1 3.7h.1z" fill="#FFD43B"/>
          <circle cx="8.5" cy="4.2" r="0.7" fill="#FFF"/>
          <circle cx="15.5" cy="19.8" r="0.7" fill="#FFF"/>
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#059669" />
          <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="white" />
        </svg>
      );
    case "PyTorch":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M13.2 3.5a8.5 8.5 0 106.2 12.2l-1.9-1.1a6.3 6.3 0 11-4.3-9.5V3.5z" fill="#EE4C2C"/>
          <circle cx="14.5" cy="5" r="1.3" fill="#EE4C2C"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="7" rx="8" ry="4" stroke="#336791" strokeWidth="2" fill="#336791" fillOpacity="0.15"/>
          <path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7" stroke="#336791" strokeWidth="2"/>
          <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" stroke="#336791" strokeWidth="2"/>
        </svg>
      );
    case "pgvector":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="6" cy="6" r="3" fill="#336791" />
          <circle cx="18" cy="8" r="3" fill="#7057D9" />
          <circle cx="12" cy="18" r="3" fill="#00D8FF" />
          <path d="M8.5 7.5L15.5 8.5M7.5 8.5L10.5 15.5M16.5 10L13.5 15.5" stroke="#336791" strokeWidth="1.5" strokeDasharray="2 2"/>
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#DC382D">
          <path d="M21.5 8.5L12 3 2.5 8.5 12 14l9.5-5.5zm0 4.5l-9.5 5.5-9.5-5.5v3l9.5 5.5 9.5-5.5v-3z"/>
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
          <path d="M13.98 9.53h1.86v1.86h-1.86zm-2.4 0h1.86v1.86h-1.86zm-2.4 0h1.86v1.86H9.18zm-2.4 0h1.86v1.86H6.78zm7.2-2.4h1.86v1.86h-1.86zm-2.4 0h1.86v1.86h-1.86zm-2.4 0h1.86v1.86H9.18zm4.8-2.4h1.86v1.86h-1.86zM22.5 11.5c-.35-.25-1.1-.38-2.14-.14-.24-1.2-1.05-1.9-1.14-1.98l-.48-.38-.34.52c-.68 1.05-.66 2.1-.56 2.76-.7.34-1.8.44-2.8.44H2v1.5c0 3.3 2.5 6 6.3 6 4.3 0 7.8-2.2 9.4-5.9 1.7.1 3.5-.7 4.1-1.8l.2-.4-.5-.4z"/>
        </svg>
      );
    case "LangGraph":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="6" cy="12" r="3" stroke="#1C3C3C" strokeWidth="2" fill="#1C3C3C" fillOpacity="0.2"/>
          <circle cx="18" cy="6" r="3" stroke="#22C55E" strokeWidth="2" fill="#22C55E" fillOpacity="0.2"/>
          <circle cx="18" cy="18" r="3" stroke="#7057D9" strokeWidth="2" fill="#7057D9" fillOpacity="0.2"/>
          <path d="M9 12h6M8.5 10.5l7-3.5M8.5 13.5l7 3.5" stroke="#1C3C3C" strokeWidth="1.5"/>
        </svg>
      );
    case "Qdrant":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#DC2626" strokeWidth="2" fill="#DC2626" fillOpacity="0.1"/>
          <circle cx="12" cy="12" r="3.5" fill="#DC2626"/>
        </svg>
      );
    case "Temporal":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="#7057D9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <div className="w-2.5 h-2.5 rounded-full bg-[#7057D9]" />
      );
  }
}

const AI_BACKEND_TECHS = [
  { name: "Python" },
  { name: "FastAPI" },
  { name: "PyTorch" },
  { name: "LangGraph" },
  { name: "PostgreSQL" },
  { name: "pgvector" },
  { name: "Redis" },
  { name: "Docker" },
  { name: "Qdrant" },
  { name: "Temporal" },
];

const BAR_HEIGHTS = [
  22, 28, 35, 42, 38, 55, 48, 62, 58, 70, 
  64, 78, 72, 85, 92, 88, 98, 92, 100, 84, 
  76, 88, 94, 90, 82, 75, 68, 60
];

export function CompanyStatisticsSection({ embedded = false }: { embedded?: boolean } = {}) {

  const bentoGrid = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 xl:gap-8 items-stretch">
          
          {/* ──────────────────────────────────────────────────────────
              CARD 1 (LEFT): 5+ MODERN MOBILE APPS + TECH CAROUSEL
              ────────────────────────────────────────────────────────── */}
          <div className="bg-white border border-[#DADADD] rounded-none overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:border-[#7057D9]/40 group">
            
            {/* Header */}
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between gap-4 border-b border-black/5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#7057D9]/10 text-[#7057D9] font-mono text-[11px] uppercase tracking-wider font-medium mb-2">
                  <Smartphone className="w-3 h-3" />
                  <span>5+ Modern Mobile Apps</span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-light tracking-[-0.03em] text-black leading-snug">
                  Fluid iOS &amp; Android native applications
                </h3>
              </div>

              <button 
                className="w-8 h-8 rounded-lg bg-black/5 hover:bg-[#7057D9]/10 text-black/60 hover:text-[#7057D9] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title="View Mobile Architectures"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Mockup Canvas */}
            <div className="relative w-full p-6 pt-6 flex flex-col items-center justify-center flex-1 overflow-hidden">
              {/* Ethereal Purple Gradient Glow behind phone */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none opacity-80"
                style={{
                  background: `
                    radial-gradient(circle at 50% 80%, rgba(142, 121, 232, 0.35) 0%, rgba(112, 87, 217, 0.15) 50%, transparent 80%)
                  `,
                }}
              />

              {/* Smartphone Frame */}
              <div className="relative z-10 w-[200px] sm:w-[220px] rounded-[32px] bg-[#121214] p-2.5 shadow-[0_20px_45px_-8px_rgba(0,0,0,0.3)] border border-black/20 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full bg-[#FAF9F7] rounded-[24px] overflow-hidden flex flex-col justify-between p-3.5 text-black text-left aspect-[9/17.5]">
                  {/* Speaker Notch */}
                  <div>
                    <div className="w-14 h-2.5 bg-black/15 rounded-full mx-auto mb-2.5" />
                    <div className="flex items-center justify-between text-[9px] font-mono text-black/50 mb-2 pb-1.5 border-b border-black/8">
                      <span className="font-semibold text-black">21SPHERES</span>
                      <span>120 FPS</span>
                    </div>

                    <div className="text-center py-1">
                      <div className="w-7 h-7 rounded-full bg-[#7057D9]/15 text-[#7057D9] flex items-center justify-center mx-auto mb-1">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[9px] font-mono text-black/50 uppercase">PRODUCTION READY</div>
                      <div className="text-xl font-light tracking-tight text-black mt-0.5">5+ Mobile Apps</div>
                      <div className="text-[9px] text-black/60 font-light">iOS &bull; Android &bull; Offline-First</div>
                    </div>
                  </div>

                  {/* Orbital Radar Arc Visual with Floating Tech Badges (Matching Reference Photo) */}
                  <div className="relative w-full h-[185px] sm:h-[195px] my-1 overflow-hidden rounded-2xl bg-gradient-to-b from-white/70 via-[#FAF9F7]/60 to-[#F2EFE9]/40 border border-black/5 flex items-center justify-center">
                    {/* Concentric Orbital Radar Arcs */}
                    <svg 
                      className="absolute inset-0 w-full h-full pointer-events-none" 
                      viewBox="0 0 200 195" 
                      fill="none"
                    >
                      {/* Outer Arc Band */}
                      <circle 
                        cx="100" 
                        cy="175" 
                        r="140" 
                        fill="rgba(0,0,0,0.015)" 
                        stroke="rgba(0,0,0,0.06)" 
                        strokeWidth="1" 
                      />
                      {/* Middle Arc Band */}
                      <circle 
                        cx="100" 
                        cy="175" 
                        r="98" 
                        fill="rgba(0,0,0,0.02)" 
                        stroke="rgba(0,0,0,0.07)" 
                        strokeWidth="1" 
                      />
                      {/* Inner Arc Band */}
                      <circle 
                        cx="100" 
                        cy="175" 
                        r="56" 
                        fill="rgba(0,0,0,0.025)" 
                        stroke="rgba(0,0,0,0.08)" 
                        strokeWidth="1" 
                      />
                    </svg>

                    {/* Floating Circular Tech Badges (No cards, purely circular badge + clean name) */}
                    {MOBILE_RADAR_NODES.map((node) => (
                      <motion.div
                        key={node.name}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node cursor-pointer z-10"
                        style={{ left: node.x, top: node.y }}
                        animate={{ y: [0, -3.5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.2,
                          ease: "easeInOut",
                          delay: node.delay,
                        }}
                      >
                        <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-black/8 flex items-center justify-center transition-transform duration-200 group-hover/node:scale-115">
                          <MobileTechLogo name={node.name} className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[7.5px] font-medium text-black/85 mt-1 leading-none tracking-tight whitespace-nowrap group-hover/node:text-black">
                          {node.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-1.5 rounded-md bg-[#7057D9] text-white text-[10px] font-medium tracking-tight hover:bg-[#573EBF] transition-colors flex items-center justify-center gap-1">
                    <span>Explore Mobile</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Tech Carousel */}
            <div className="p-4 sm:p-5 pt-3 border-t border-black/5 bg-[#FAF9F7]/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/50 mb-2.5 px-1">
                MOBILE TECHNOLOGIES // RUNNING MARQUEE
              </div>
              <div className="overflow-hidden mask-gradient-sides">
                <div className="animate-marquee flex items-center gap-3 w-max">
                  {[...MOBILE_TECHS, ...MOBILE_TECHS, ...MOBILE_TECHS].map((tech, idx) => (
                    <div 
                      key={idx}
                      className="inline-flex items-center gap-2 px-2.5 py-1 shrink-0 font-medium text-xs text-black/80 hover:text-black transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-xs border border-black/8 flex items-center justify-center p-0.5">
                        <MobileTechLogo name={tech.name} className="w-3 h-3" />
                      </div>
                      <span>{tech.name}</span>
                      <span className="text-black/25 text-[10px] ml-1.5">&bull;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────
              CARD 2 (MIDDLE): 10+ SMART WEB APPLICATIONS
              Exact glassy transparent browser mockup with rotating animation
              (Next.js, Best SEO, Best Practices, Modern Languages)
              ────────────────────────────────────────────────────────── */}
          <div className="bg-white border border-[#DADADD] rounded-none overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:border-[#7057D9]/40 group">
            
            {/* Header */}
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between gap-4 border-b border-black/5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#7057D9]/10 text-[#7057D9] font-mono text-[11px] uppercase tracking-wider font-medium mb-2">
                  <Monitor className="w-3 h-3" />
                  <span>10+ Smart Web Applications</span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-light tracking-[-0.03em] text-black leading-snug">
                  Enterprise platforms with sub-second execution
                </h3>
              </div>

              <button 
                className="w-8 h-8 rounded-lg bg-black/5 hover:bg-[#7057D9]/10 text-black/60 hover:text-[#7057D9] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title="View Web Stack"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Glassy Browser Mockup matching user photo */}
            <div className="relative w-full p-5 sm:p-6 flex flex-col flex-1 justify-center overflow-hidden">
              
              {/* Ethereal background gradient curve - warm peach & violet bleed through frosted glass */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 88% 18%, rgba(255, 142, 60, 0.38) 0%, transparent 60%),
                    radial-gradient(ellipse at 12% 82%, rgba(142, 121, 232, 0.35) 0%, transparent 65%),
                    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 80%)
                  `,
                }}
              />

              {/* Glossy Glassmorphism Transparent Window Container */}
              <div className="relative z-10 w-full bg-white/55 backdrop-blur-2xl rounded-2xl sm:rounded-[22px] border border-white/80 shadow-[0_20px_50px_-10px_rgba(112,87,217,0.15),0_8px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                
                {/* ── 1. Frosted Glass Top Bar (matching attached reference photo) ── */}
                <div className="bg-white/40 backdrop-blur-md px-4 py-2.5 border-b border-black/[0.06] flex items-center justify-between gap-2">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 border border-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 border border-black/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 border border-black/10" />
                  </div>

                  {/* Centered Glass Pill Address Bar */}
                  <div className="flex-1 max-w-[210px] bg-white/70 backdrop-blur-md border border-white/90 rounded-full px-3 py-0.5 text-[10px] font-mono text-black/65 text-center flex items-center justify-center gap-1.5 shadow-2xs">
                    <Lock className="w-2.5 h-2.5 text-[#7057D9]" />
                    <span className="truncate font-medium">platform.21spheres.ai</span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">LIVE</span>
                  </div>
                </div>

                {/* ── 2. Clean Window Content: Top Header + Static Architecture Info + Action (No Animation) ── */}
                <div className="p-4 sm:p-5 flex flex-col justify-between text-left space-y-3.5">
                  
                  {/* Top Stats Header */}
                  <div className="text-center py-1 border-b border-black/6 pb-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#7057D9]/15 text-[#7057D9] flex items-center justify-center mx-auto mb-1">
                      <Monitor className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[9px] font-mono text-black/50 uppercase tracking-wider">PRODUCTION READY</div>
                    <div className="text-xl sm:text-2xl font-light tracking-tight text-black mt-0.5">
                      10+ — Smart Web Applications
                    </div>
                    <div className="text-[9.5px] text-black/60 font-light mt-0.5">
                      High-Performance &bull; 100/100 SEO &bull; Edge-First
                    </div>
                  </div>

                  {/* Professional Web Platform Points (No Cards, No Icon Backgrounds, No Side Tags) */}
                  <div className="space-y-3 py-1 text-left">
                    {/* Point 1: SEO */}
                    <div className="flex items-start gap-2.5 pb-2.5 border-b border-black/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] font-medium text-black">Best-in-Class SEO &amp; Core Vitals</div>
                        <p className="text-[9.5px] text-black/60 font-light leading-relaxed mt-0.5">
                          Automated JSON-LD schemas, dynamic OpenGraph, and 100/100 Core Web Vitals for search dominance.
                        </p>
                      </div>
                    </div>

                    {/* Point 2: Sub-second Edge Speed */}
                    <div className="flex items-start gap-2.5 pb-2.5 border-b border-black/5">
                      <Zap className="w-4 h-4 text-[#7057D9] shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] font-medium text-black">Sub-Second Edge Infrastructure</div>
                        <p className="text-[9.5px] text-black/60 font-light leading-relaxed mt-0.5">
                          Global multi-region edge deployment with server-side streaming and instant client hydration.
                        </p>
                      </div>
                    </div>

                    {/* Point 3: Security & Uptime */}
                    <div className="flex items-start gap-2.5 pb-2.5 border-b border-black/5">
                      <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] font-medium text-black">Enterprise Security &amp; Availability</div>
                        <p className="text-[9.5px] text-black/60 font-light leading-relaxed mt-0.5">
                          Automated DDoS mitigation, encrypted data pipelines, and multi-region failover protection.
                        </p>
                      </div>
                    </div>

                    {/* Point 4: Zero Tech Debt */}
                    <div className="flex items-start gap-2.5">
                      <Code2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] font-medium text-black">Zero Technical Debt Standards</div>
                        <p className="text-[9.5px] text-black/60 font-light leading-relaxed mt-0.5">
                          Strict TypeScript invariants, automated CI/CD checks, and modular production architecture.
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Action Button */}
                  <button className="w-full py-2 rounded-xl bg-black hover:bg-[#7057D9] text-white text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                    <span>Explore Web Platforms</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>

                </div>

              </div>
            </div>

            {/* Web Tech Carousel (matching Card 1's mobile marquee) */}
            <div className="p-4 sm:p-5 pt-3 border-t border-black/5 bg-[#FAF9F7]/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/50 mb-2.5 px-1">
                WEB TECHNOLOGIES // RUNNING MARQUEE
              </div>
              <div className="overflow-hidden mask-gradient-sides">
                <div className="animate-marquee flex items-center gap-3 w-max">
                  {[...WEB_TECHS, ...WEB_TECHS, ...WEB_TECHS].map((tech, idx) => (
                    <div 
                      key={idx}
                      className="inline-flex items-center gap-2 px-2.5 py-1 shrink-0 font-medium text-xs text-black/80 hover:text-black transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-xs border border-black/8 flex items-center justify-center p-0.5">
                        <WebTechLogo name={tech.name} className="w-3 h-3" />
                      </div>
                      <span>{tech.name}</span>
                      <span className="text-black/25 text-[10px] ml-1.5">&bull;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────
              CARD 3 (RIGHT): 15+ BACKEND AI & 20+ AUTOMATION MODULES
              Glossy API Console + Professional Engineering Points + Running Marquee
              ────────────────────────────────────────────────────────── */}
          <div className="bg-white border border-[#DADADD] rounded-none overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all hover:border-[#7057D9]/40 group">
            
            {/* Header */}
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between gap-4 border-b border-black/5">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#7057D9]/10 text-[#7057D9] font-mono text-[11px] uppercase tracking-wider font-medium">
                    <Cpu className="w-3 h-3" />
                    <span>15+ Backend AI</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/5 text-black/70 font-mono text-[11px] uppercase tracking-wider">
                    <Bot className="w-3 h-3" />
                    <span>20+ Automation</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-light tracking-[-0.03em] text-black leading-snug">
                  Scalable backend architectures &amp; autonomous AI engines
                </h3>
              </div>

              <button 
                className="w-8 h-8 rounded-lg bg-black/5 hover:bg-[#7057D9]/10 text-black/60 hover:text-[#7057D9] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                title="View Backend & AI Stack"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Canvas: Floating UI Component Cards over Purple Aura with Telemetry Graph */}
            <div className="relative w-full p-4 sm:p-5 flex flex-col justify-center gap-3.5 flex-1 overflow-hidden">
              
              {/* Ethereal Purple Aurora Gradient Background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                  background: `
                    radial-gradient(circle at 50% 85%, rgba(142, 121, 232, 0.35) 0%, rgba(112, 87, 217, 0.15) 45%, transparent 75%)
                  `,
                }}
              />

              {/* ── Floating Card 1: 20+ Automation Modules (Backend Workflows) ── */}
              <div className="relative z-10 w-full bg-white rounded-2xl border border-black/10 p-3.5 sm:p-4 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-200 text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-xs sm:text-[13px]">Autonomous Workflow Automation</h4>
                      <p className="text-[9.5px] font-mono text-black/50">20+ Production Automation Modules</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-medium flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ACTIVE</span>
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-black/8 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-black/60 font-light text-[10.5px]">Async Task Workers (Temporal &amp; Redis)</span>
                    <span className="font-mono text-black font-medium text-[10.5px]">99.98% Reliability</span>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[9.5px] font-mono text-black/50">
                      <span>Event-Driven Processing</span>
                      <span>Sub-20ms execution loops</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/5 overflow-hidden">
                      <div 
                        className="h-full rounded-full w-[88%]"
                        style={{
                          background: "linear-gradient(90deg, #7057D9 0%, #8E79E8 50%, #C4B5FD 100%)"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Floating Card 2: 15+ Backend AI Modules & 30-Day Production Operations Graph ── */}
              <div className="relative z-10 w-full bg-white rounded-2xl border border-black/10 p-3.5 sm:p-4 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-200 text-left">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10.5px] text-black/60 font-light block">
                      API Requests &amp; AI Inferences (Last 30 Days)
                    </span>
                    <div className="text-lg sm:text-xl font-light tracking-tight text-black mt-0.5 flex items-baseline gap-2">
                      <span>48,250,910</span>
                      <span className="text-[9.5px] font-mono text-emerald-600 font-medium">▲ +38.4%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#7057D9]/10 text-[#7057D9] font-medium block">
                      15+ Backend AI
                    </span>
                    <span className="text-[8.5px] font-mono text-black/45 mt-0.5 block">
                      &lt;14ms Avg p99
                    </span>
                  </div>
                </div>

                {/* Animated Vertical Bar Chart */}
                <div className="pt-2.5 flex items-end justify-between gap-1 h-18 border-t border-black/8 px-0.5">
                  {BAR_HEIGHTS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.012, ease: "easeOut" }}
                      className="flex-1 rounded-xs bg-[#7057D9]/75 hover:bg-[#7057D9] transition-colors relative group/bar cursor-pointer min-w-[3px]"
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:block z-30 px-2 py-0.5 bg-black text-white text-[8px] font-mono rounded whitespace-nowrap shadow-md pointer-events-none">
                        Day {i + 1}: {(h * 1.6).toFixed(1)}M API &amp; AI ops
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[8.5px] font-mono text-black/45 mt-2 pt-1.5 border-t border-black/5">
                  <span>Day 01</span>
                  <span className="text-black/65 font-medium">FastAPI &bull; LangGraph Agents &bull; pgvector Search</span>
                  <span>Day 30</span>
                </div>
              </div>

            </div>

            {/* AI & Backend Tech Carousel (matching Card 1 & Card 2 marquees) */}
            <div className="p-4 sm:p-5 pt-3 border-t border-black/5 bg-[#FAF9F7]/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/50 mb-2.5 px-1">
                AI &amp; BACKEND TECHNOLOGIES // RUNNING MARQUEE
              </div>
              <div className="overflow-hidden mask-gradient-sides">
                <div className="animate-marquee flex items-center gap-3 w-max">
                  {[...AI_BACKEND_TECHS, ...AI_BACKEND_TECHS, ...AI_BACKEND_TECHS].map((tech, idx) => (
                    <div 
                      key={idx}
                      className="inline-flex items-center gap-2 px-2.5 py-1 shrink-0 font-medium text-xs text-black/80 hover:text-black transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-xs border border-black/8 flex items-center justify-center p-0.5">
                        <AIBackendTechLogo name={tech.name} className="w-3 h-3" />
                      </div>
                      <span>{tech.name}</span>
                      <span className="text-black/25 text-[10px] ml-1.5">&bull;</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

    </div>
  );

  if (embedded) {
    return (
      <div 
        id="statistics" 
        className="relative z-10 w-full pt-10 sm:pt-14 pb-16 sm:pb-24 lg:pb-28 text-black"
      >
        <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 mb-12 sm:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-[1.05] text-black">
                Company Statistics &amp; Deliverables
              </h2>
            </div>

            <div className="max-w-md text-left md:text-right">
              <p className="text-sm sm:text-base font-light text-black/75 leading-relaxed">
                Empirical deployment metrics across autonomous AI agents, enterprise web applications, and resilient mobile architectures.
              </p>
            </div>
          </div>

          {bentoGrid}
        </div>
      </div>
    );
  }

  return (
    <section 
      id="statistics" 
      className="relative z-0 overflow-hidden text-black border-b border-[#DADADD]/70 py-16 sm:py-24 lg:py-28"
      style={{
        background: `
          /* 1. Luminous glowing white core in the center (matching reference photo) */
          radial-gradient(ellipse 70% 65% at 50% 40%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.90) 30%, rgba(246, 240, 255, 0.65) 60%, transparent 88%),

          /* 2. Left flank saturated purple glow from photo */
          radial-gradient(ellipse 55% 85% at 0% 40%, #8E6BF7 0%, #764CE8 42%, rgba(118, 76, 232, 0.35) 75%, transparent 100%),

          /* 3. Right flank saturated purple glow from photo */
          radial-gradient(ellipse 55% 85% at 100% 40%, #8E6BF7 0%, #764CE8 42%, rgba(118, 76, 232, 0.35) 75%, transparent 100%),

          /* 4. Smooth base linear gradient: soft lilac and luminous white, no horizontal bars */
          linear-gradient(180deg, #FFFFFF 0%, #FAF7FF 25%, #F4EEFF 50%, #FAF7FF 80%, #FFFFFF 100%)
        `,
      }}
    >
      {/* Diffused ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[550px] h-[550px] rounded-full blur-[130px] bg-[#8E6BF7]/15" />
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[130px] bg-[#764CE8]/15" />
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-[1.05] text-black">
              Company Statistics &amp; Deliverables
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-sm sm:text-base font-light text-black/75 leading-relaxed">
              Empirical deployment metrics across autonomous AI agents, enterprise web applications, and resilient mobile architectures.
            </p>
          </div>
        </div>

        {bentoGrid}
      </div>
    </section>
  );
}
