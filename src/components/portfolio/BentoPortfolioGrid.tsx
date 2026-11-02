"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  Check,
  Leaf,
  Link2,
  MapPin,
  ShieldCheck,
  Sparkles,
  WifiOff,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";

const photo = (id: string, px = 160) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${px}&h=${px}&q=80`;

const FACES = {
  a: "1494790108377-be9c29b29330",
  b: "1507003211169-0a1dd7228f2d",
  c: "1438761681033-6461ffad8d80",
  d: "1500648767791-00dcc994a43e",
  e: "1472099645785-5658abf4ff4e",
  f: "1544005313-94ddf0286df2",
};

/* =========================================================================
   FIGMA-STYLE PRIMITIVES (Infused with 21Spheres Purple + Apple Craft)
   ========================================================================= */

function Avatar({ id, name, size = 32, square = false }: { id: string; name: string; size?: number; square?: boolean }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#DDD6FE] to-[#EDE9FE] font-semibold text-[#5B21B6] ring-2 ring-white ${square ? "rounded-xl" : "rounded-full"}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
      {!failed && (
        <img
          src={photo(id, Math.round(size * 3))}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}

function Dots() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(112,87,217,0.15)_1px,transparent_1px)] [background-size:16px_16px]"
    />
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[42px] bg-[linear-gradient(145deg,#f8f7fb_0%,#585661_5%,#121216_13%,#050506_78%,#77737e_94%,#17171a_100%)] p-[3px] shadow-[0_32px_70px_-20px_rgba(13,10,22,0.44),0_12px_28px_-12px_rgba(112,87,217,0.35)] transition-transform duration-500 [transform:perspective(1100px)_rotateY(-7deg)_rotateX(2deg)] group-hover/visual:[transform:perspective(1100px)_rotateY(-3deg)_rotateX(0deg)_translateY(-4px)] ${className}`}>
      <div className="h-full w-full rounded-[39px] bg-[linear-gradient(135deg,#151519,#050506_22%,#28272d_80%,#080809)] p-[4px]">
      <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-white">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-5 pt-[11px] text-[10px] font-semibold text-[#111114]">
          <span>9:41</span>
          <span className="h-2 w-4 rounded-[3px] bg-[#111114]" />
        </div>
        <div className="relative h-[128%] w-[128%] origin-top-left scale-[0.78]">{children}</div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[35px] bg-[linear-gradient(115deg,rgba(255,255,255,0.17)_0%,transparent_18%,transparent_72%,rgba(255,255,255,0.08)_100%)]" />
      </div>
      </div>
    </div>
  );
}

/** Figma multiplayer cursor with 21Spheres studio color tag */
function Cursor({ label, color = "#7057D9", className = "" }: { label: string; color?: string; className?: string }) {
  return (
    <div className={`pointer-events-none absolute z-30 ${className}`}>
      <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
        <path d="M1.5 1.5l4.2 12.6 2.2-5.3 5.3-2.2z" fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className="ml-3.5 -mt-0.5 block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm" style={{ background: color }}>
        {label}
      </span>
    </div>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium shadow-xs ring-1 transition-all ${
        active
          ? "bg-[#7057D9] text-white ring-[#7057D9] shadow-[0_2px_10px_rgba(112,87,217,0.30)]"
          : "bg-white text-[#1D1D1F] ring-black/5 hover:ring-[#7057D9]/30"
      }`}
    >
      {children}
    </span>
  );
}

/* =========================================================================
   CARD VISUALS (21Spheres Purple + Apple Craft)
   ========================================================================= */

function BimakartVisual() {
  const rows = [
    { n: "HDFC Ergo", p: "₹13,940", c: "#FF453A", l: "H", sel: true },
    { n: "Star Health", p: "₹14,280", c: "#FF9F0A", l: "S" },
    { n: "Niva Bupa", p: "₹15,120", c: "#7057D9", l: "N" },
  ];
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#D9EBF2_0%,#F2DCCF_48%,#E3D9F2_100%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bca8f2]/30 blur-[70px]" />
      <Phone className="absolute left-1/2 top-1/2 h-[17rem] w-[9rem] -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8E8E93]">Bimakart</p><p className="mt-0.5 text-[16px] font-semibold tracking-tight text-[#111114]">Choose a plan</p></div>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F2EEFC] text-[#7057D9]"><ShieldCheck className="h-4 w-4" /></span>
          </div>
          <div className="rounded-[14px] bg-[#F5F3F8] p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.11em] text-[#8E8E93]">Family health cover</p>
            <div className="mt-2 flex items-end justify-between"><p className="text-[20px] font-semibold tracking-tight text-[#17151B]">₹10 lakh</p><span className="text-[9px] text-[#746D7D]">4 members</span></div>
          </div>
          <div className="mt-3 flex items-center justify-between"><p className="text-[10px] font-semibold text-[#24212A]">Best matches</p><span className="text-[9px] font-mono text-[#7057D9]">14 LIVE QUOTES</span></div>
          <div className="mt-2 space-y-1.5">
            {rows.slice(0, 2).map((r) => (
              <div
                key={r.n}
                className={`flex items-center gap-2 rounded-xl p-2 ${
                  r.sel
                    ? "bg-[#111114] text-white ring-1 ring-[#7057D9]/40 shadow-xs"
                    : "bg-[#F5F5F7] text-[#111114]"
                }`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-white shadow-xs" style={{ background: r.c }}>
                  {r.l}
                </span>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold leading-tight">{r.n}</p>
                  <p className={`text-[10px] ${r.sel ? "text-white/60" : "text-[#8E8E93]"}`}>{r.p} / year</p>
                </div>
                {r.sel && <Check className="h-3.5 w-3.5 text-[#A78BFA]" />}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-full bg-[#7057D9] px-3.5 py-2.5 text-[10px] font-semibold text-white shadow-[0_4px_14px_rgba(112,87,217,0.35)]">
            <span>Continue to proposal</span><ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Phone>
    </>
  );
}

function ClinicalAiVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#D7EBF1_0%,#F3DCCD_52%,#E5DDF7_100%)]" />
      <div aria-hidden="true" className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/50 blur-3xl" />
      <div className="absolute inset-3 flex items-center sm:inset-4">
        <div className="w-full rounded-[14px] border border-white/80 bg-white/90 p-3 shadow-[0_14px_34px_rgba(52,45,63,0.12)] backdrop-blur-xl sm:rounded-[17px] sm:p-4">
          <div className="flex items-center justify-between gap-2 border-b border-[#EEEAF0] pb-2">
            <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-lg bg-[#7456D7] text-white"><Sparkles className="h-3.5 w-3.5" /></span><p className="text-[10px] font-semibold text-[#29252F] sm:text-xs">Clinical Assist</p></div>
            <span className="inline-flex items-center gap-1 text-[8px] font-medium text-[#438661] sm:text-[9px]"><Check className="h-3 w-3" /> Source verified</span>
          </div>
          <p className="mt-2 rounded-lg bg-[#F5F3F7] px-2.5 py-2 text-[8px] leading-snug text-[#716B76] sm:text-[10px]">“Headache with light sensitivity and restlessness.”</p>
          <div className="mt-2 flex items-center justify-between"><p className="text-[9px] font-semibold text-[#302B35] sm:text-[10px]">Closest matches</p><span className="font-mono text-[8px] text-[#7057D9] sm:text-[9px]">99.4% CITED</span></div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <div className="rounded-lg border border-[#E9E5EF] bg-white px-2 py-1.5"><p className="text-[9px] font-medium text-[#2D2931] sm:text-[10px]">Belladonna</p><p className="mt-0.5 text-[7px] text-[#57906C] sm:text-[8px]">Strong match</p></div>
            <div className="rounded-lg border border-[#E9E5EF] bg-white px-2 py-1.5"><p className="text-[9px] font-medium text-[#2D2931] sm:text-[10px]">Glonoinum</p><p className="mt-0.5 text-[7px] text-[#8B8590] sm:text-[8px]">Possible</p></div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[7px] text-[#756A8D] sm:text-[8px]"><Link2 className="h-2.5 w-2.5" /> Organon §153 <span className="text-[#C4BEC9]">·</span> Materia medica</div>
        </div>
      </div>
    </>
  );
}

function MobileVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F4D9C8_0%,#E8E5F1_48%,#CFE7EC_100%)]" />
      <div aria-hidden="true" className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/50 blur-3xl" />
      <div className="absolute inset-x-3 top-3 flex items-center justify-between sm:inset-x-4 sm:top-4">
        <div><p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8E8798]">UrbanFlow</p><p className="mt-0.5 text-[13px] font-semibold tracking-tight text-[#211D28]">Live delivery</p></div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-[#4B9C6C] shadow-sm">On schedule</span>
      </div>
      <div className="absolute inset-x-3 bottom-[4.25rem] top-[3.75rem] overflow-hidden rounded-[12px] border border-white/90 bg-[#F5F3F5] sm:inset-x-4 sm:bottom-[4.5rem]">
        <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_49%,#D9D4DE_50%,transparent_51%),linear-gradient(0deg,transparent_49%,#D9D4DE_50%,transparent_51%)] [background-size:48px_48px]" />
        <div className="absolute left-[22%] top-[58%] h-0.5 w-[58%] rotate-[-19deg] rounded-full bg-[#7057D9] shadow-[0_0_8px_rgba(112,87,217,0.32)]" />
        <span className="absolute left-[18%] top-[56%] grid h-5 w-5 place-items-center rounded-full bg-white text-[#7057D9] shadow-md ring-2 ring-[#7057D9]/20"><MapPin className="h-3 w-3" /></span>
        <span className="absolute right-[17%] top-[24%] grid h-7 w-7 place-items-center rounded-full bg-[#7057D9] text-white shadow-lg ring-4 ring-white/80"><Bike className="h-3.5 w-3.5" /></span>
        <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[8px] font-medium text-[#706A78]">Courier nearby</span>
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-[12px] bg-white p-2 shadow-[0_8px_20px_rgba(40,30,56,0.10)] ring-1 ring-black/[0.04] sm:inset-x-4 sm:bottom-4">
        <Avatar id={FACES.b} name="Arjun" size={32} />
        <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold text-[#211D28]">Arjun is 6 min away</p><p className="text-[9px] text-[#88828F]">Order picked up · 1.8 km</p></div>
        <ArrowRight className="h-3.5 w-3.5 text-[#7057D9]" />
      </div>
    </>
  );
}

function WealthVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(125deg,#F0D8C7_0%,#DFEAF0_50%,#E9DDF5_100%)]" />
      <div aria-hidden="true" className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute inset-3 flex items-center sm:inset-4">
        <div className="grid w-full grid-cols-[1.35fr_0.8fr] gap-3 rounded-[16px] border border-white/80 bg-white/85 p-3 shadow-[0_16px_40px_rgba(47,40,61,0.12)] backdrop-blur-xl sm:gap-5 sm:p-5">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#89828E]">Portfolio outlook</p><p className="mt-1 text-xl font-medium tracking-[-0.04em] text-[#26222A] sm:text-3xl">$1.4B</p></div><span className="rounded-full bg-[#E5F3E9] px-2 py-1 text-[8px] font-medium text-[#398554]">+12.8%</span></div>
            <svg className="mt-2 h-16 w-full sm:h-24" viewBox="0 0 520 100" preserveAspectRatio="none" aria-label="Portfolio growth chart">
              <defs><linearGradient id="wealthArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8064D8" stopOpacity=".26"/><stop offset="1" stopColor="#8064D8" stopOpacity="0"/></linearGradient></defs>
              <path d="M0 78 C35 74 50 61 82 67 S132 52 162 60 S217 49 244 54 S294 39 325 46 S370 26 404 36 S468 18 520 12 L520 100 L0 100Z" fill="url(#wealthArea)" />
              <path d="M0 78 C35 74 50 61 82 67 S132 52 162 60 S217 49 244 54 S294 39 325 46 S370 26 404 36 S468 18 520 12" fill="none" stroke="#7558CB" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="flex justify-between text-[7px] text-[#99929D] sm:text-[9px]"><span>JAN</span><span>MAR</span><span>JUN</span><span>SEP</span><span>DEC</span></div>
          </div>
          <div className="flex flex-col justify-between border-l border-[#ECE8EF] pl-3 sm:pl-5">
            <div><p className="text-[8px] text-[#89828E]">Risk profile</p><p className="mt-1 text-[11px] font-medium text-[#28242D] sm:text-sm">Balanced growth</p></div>
            <div><p className="text-[8px] text-[#89828E]">Annual return</p><p className="mt-1 text-sm font-medium text-[#28242D] sm:text-lg">8.42%</p></div>
            <div><p className="text-[8px] text-[#89828E]">Next review</p><p className="mt-1 text-[9px] font-medium text-[#28242D] sm:text-xs">12 Dec 2025</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

function FraudVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF3F1] via-[#FFF9F8] to-[#F5F5F7]" />
      <div className="absolute left-1/2 top-12 w-[16rem] max-w-[88%] -translate-x-1/2 rounded-[12px] bg-white p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-black/5 pb-2">
          <span className="text-[11px] font-semibold text-[#111114]">National ID</span>
          <ShieldCheck className="h-4 w-4 text-[#34C759]" />
        </div>
        <div className="mt-3 flex gap-3">
          <Avatar id={FACES.f} name="Meera Joshi" size={64} square />
          <div className="min-w-0 flex-1 space-y-2">
            <div>
              <p className="text-[10px] text-[#8E8E93]">Name</p>
              <p className="text-[12.5px] font-medium text-[#111114]">Meera Joshi</p>
            </div>
            <div>
              <p className="text-[10px] text-[#8E8E93]">Date of birth</p>
              <span className="relative inline-block rounded-[3px] border-[1.5px] border-[#FF3B30] px-1.5 py-0.5 text-[12.5px] font-medium text-[#111114]">
                14 Aug 1996
                {["-left-[4px] -top-[4px]", "-right-[4px] -top-[4px]", "-left-[4px] -bottom-[4px]", "-right-[4px] -bottom-[4px]"].map((p) => (
                  <i key={p} className={`absolute h-[6px] w-[6px] border border-[#FF3B30] bg-white ${p}`} />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Cursor label="Altered" color="#FF3B30" className="left-[calc(50%+2.2rem)] top-[10.6rem]" />
      <div className="absolute left-4 top-4">
        <Chip>
          <Check className="h-3.5 w-3.5 text-[#34C759]" /> Seal verified
        </Chip>
      </div>
      <div className="absolute bottom-4 right-14">
        <Chip>
          <Zap className="h-3.5 w-3.5 text-[#7057D9]" /> Checked in 0.4 s
        </Chip>
      </div>
    </>
  );
}

function RepertoryVisual() {
  const chips: [string, boolean][] = [
    ["Throbbing headache", true],
    ["Worse in sunlight", true],
    ["Thirstless", true],
    ["Better lying down", false],
    ["Irritable", false],
    ["Chilly", false],
  ];
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9F7FE] to-[#E7F5EC]" />
      <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {chips.map(([c, a]) => (
            <Chip key={c} active={a}>
              {a && <Check className="h-3 w-3" />}
              {c}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-[12px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#34C759]/15 text-[#248A3D]">
            <Leaf className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#111114]">Belladonna</p>
            <p className="text-[11px] text-[#8E8E93]">Matches 3 of 3 symptoms</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#7057D9]/10 px-2 py-1 text-[10.5px] font-medium text-[#7057D9]">
            <WifiOff className="h-3 w-3" /> Wasm Offline
          </span>
        </div>
      </div>
    </>
  );
}

function GraphVisual() {
  const nodes = [
    { t: "React", x: 22, y: 22, done: true },
    { t: "System design", x: 76, y: 24, done: true },
    { t: "SQL", x: 20, y: 76, done: true },
    { t: "Docker", x: 78, y: 76, done: false },
  ];
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9FE] to-[#F1EBFF]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {nodes.map((n) => (
          <path
            key={n.t}
            d={`M50 50 Q ${(50 + n.x) / 2} ${n.y < 50 ? 34 : 66} ${n.x} ${n.y}`}
            fill="none"
            stroke={n.done ? "#7057D9" : "#A1A1AA"}
            strokeOpacity={n.done ? 0.6 : 0.4}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
        <span className="rounded-full ring-[6px] ring-[#7057D9]/20 shadow-xs">
          <Avatar id={FACES.a} name="Aanya" size={56} />
        </span>
        <span className="rounded-full bg-[#7057D9] px-2.5 py-0.5 text-[11px] font-medium text-white shadow-xs">Aanya</span>
      </div>
      {nodes.map((n) => (
        <div key={n.t} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <Chip>
            <span className={`grid h-4 w-4 place-items-center rounded-full ${n.done ? "bg-[#34C759] text-white" : "bg-[#E5E5EA] text-[#8E8E93]"}`}>
              {n.done ? <Check className="h-2.5 w-2.5" /> : <span className="h-1 w-1 rounded-full bg-current" />}
            </span>
            {n.t}
          </Chip>
        </div>
      ))}
      <Cursor label="Up next" color="#7057D9" className="left-[calc(78%+1.8rem)] top-[calc(76%+0.2rem)]" />
    </>
  );
}

function BrandVisual({ src, name, from, to }: { src: string; name: string; from: string; to: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${from}, ${to})` }} />
      <Dots />
      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[14px] bg-white p-5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] ring-1 ring-black/5 hover:scale-105 transition-transform duration-300">
        {failed ? (
          <span className="text-[15px] font-semibold text-[#111114]">{name}</span>
        ) : (
          <img src={src} alt={`${name} logo`} onError={() => setFailed(true)} className="max-h-full max-w-full object-contain" />
        )}
      </div>
    </>
  );
}

/* =========================================================================
   DATA — 21Spheres Production Systems & Ventures
   ========================================================================= */

type Category = "Mobile Apps" | "Autonomous AI" | "Web Platforms" | "Computer Vision" | "Systems Engineering";

interface Project {
  id: string;
  name: string;
  category: Category;
  client: string;
  description: string;
  year?: string;
  layout?: "tall" | "half" | "wide" | "standard";
  metrics?: { label: string; value: string }[];
  tags: string[];
  cover: { src: string; alt: string; position?: string };
  cardVisual: "photo" | "illustration" | "logo";
  logoSrc?: string;
  details: { overview: string; architecture: string; deliverables: string[] };
  visual: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: "bimakart",
    name: "Bimakart Connect API Gateway",
    category: "Web Platforms",
    client: "Bimakart Technologies",
    description: "One gateway that quotes 100+ insurers at once and issues the policy, in under 2.4 seconds.",
    year: "2024–2026",
    // Tall lead tile keeps the real handset photo prominent in the bento.
    layout: "tall",
    metrics: [
      { label: "Query latency", value: "< 2.4s" },
      { label: "Carriers", value: "100+" },
      { label: "Daily queries", value: "2.5M+" },
    ],
    tags: ["FastAPI", "Redis", "AWS EKS", "GraphQL", "Next.js"],
    cover: { src: "/portfolio/photos/delivery-app.jpg", alt: "A close-up photograph of a hand using a smartphone", position: "center 38%" },
    cardVisual: "photo",
    details: {
      overview: "Standardized fragmented XML insurer endpoints into a unified high-throughput JSON API gateway supporting tens of thousands of active POSP brokers.",
      architecture: "Distributed cache orchestrator using Redis cluster sharding and asynchronous Python workers to aggregate insurance quotes concurrently in under 2.4s.",
      deliverables: [
        "Concurrent multi-carrier query engine reducing latency from 45s to 2.4s",
        "Automated proposal issuance and policy PDF assembly pipeline",
        "Multi-tenant broker management portal with real-time commissions",
      ],
    },
    visual: <BimakartVisual />,
  },
  {
    id: "clinical-ai",
    name: "Autonomous Clinical & Support AI",
    category: "Autonomous AI",
    client: "Clinical Therapeutics Group",
    description: "An assistant that answers with cited sources, or doesn’t answer at all.",
    year: "2025",
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "Voice turnaround", value: "< 280ms" },
      { label: "First-contact fix", value: "68%" },
    ],
    tags: ["LangGraph", "Qdrant", "FastAPI", "Whisper", "TypeScript"],
    cover: { src: "/portfolio/photos/4k/clinical-ai.png", alt: "A clinician working between a laptop and smartphone", position: "center 43%" },
    layout: "half",
    cardVisual: "illustration",
    details: {
      overview: "Deploys fine-tuned reasoning agents that ingest enterprise policy corpora and clinical documents to resolve customer queries autonomously.",
      architecture: "An orchestrator routes each intent to a specialized sub-agent. Deterministic citation guardrails block any claim without a source.",
      deliverables: [
        "Sub-280ms conversational voice loop with streaming synthesis",
        "Multi-modal document inspection and entity cross-referencing",
        "Guardrail engine that rejects speculative outputs",
      ],
    },
    visual: <ClinicalAiVisual />,
  },
  {
    id: "on-demand-mobile",
    name: "On-Demand Logistics & Service App",
    category: "Mobile Apps",
    client: "UrbanFlow Logistics",
    description: "Native iOS and Android dispatch with live activities and offline-first sync.",
    year: "2025",
    metrics: [
      { label: "Frame rate", value: "120 FPS" },
      { label: "Haptic cycle", value: "< 16ms" },
      { label: "Monthly orders", value: "450k+" },
    ],
    tags: ["React Native", "SwiftUI", "WatermelonDB", "Expo", "WebSockets"],
    cover: { src: "/portfolio/photos/delivery-app.jpg", alt: "A smartphone displaying a modern mobile service app", position: "center 38%" },
    layout: "half",
    cardVisual: "illustration",
    details: {
      overview: "Synchronizes real-time courier telemetry with sub-second geospatial routing and background location updates for urban service dispatch.",
      architecture: "Offline-first SQLite layer with optimistic UI. Haptics are driven natively through CoreHaptics and SwiftUI.",
      deliverables: [
        "120 FPS micro-interactions and native gesture curves",
        "Offline sync that resolves multi-device conflicts",
        "Battery-efficient background tracking (< 2% drain/hour)",
      ],
    },
    visual: <MobileVisual />,
  },
  {
    id: "wealth-wisdom",
    name: "Institutional Wealth & Analytics Terminal",
    category: "Web Platforms",
    client: "Wealth Wisdom Global",
    description: "Goal-based planning that advisors can stress-test and share with clients.",
    year: "2024–2025",
    layout: "wide",
    metrics: [
      { label: "AUM monitored", value: "$1.4B+" },
      { label: "Stress test", value: "100k runs" },
      { label: "Tax alpha", value: "+$18.4k" },
    ],
    tags: ["React 19", "TypeScript", "PostgreSQL", "Recharts", "Tailwind"],
    cover: { src: "/portfolio/photos/4k/analytics.png", alt: "A laptop displaying a business analytics dashboard", position: "center 53%" },
    cardVisual: "illustration",
    details: {
      overview: "Advisory platform that lets wealth managers run portfolio stress tests, tax-loss harvesting and client rebalancing in real time.",
      architecture: "A calculation engine runs 100,000-iteration Monte Carlo projections across debt and equity baskets, rendered with interactive SVG.",
      deliverables: [
        "Real-time asset allocation and risk exposure breakdowns",
        "Automated tax-loss harvesting with net alpha calculation",
        "White-label PDF plan generation",
      ],
    },
    visual: <WealthVisual />,
  },
  {
    id: "document-fraud",
    name: "Neural Vision & Document Fraud Inspector",
    category: "Computer Vision",
    client: "Kaster Underwriting",
    description: "Spots edited fields and forged seals in scanned documents.",
    year: "2025",
    metrics: [
      { label: "Scan time", value: "420ms" },
      { label: "Tamper catch", value: "99.4%" },
      { label: "False positive", value: "< 0.08%" },
    ],
    tags: ["PyTorch", "Vision Transformer", "Rust", "FastAPI"],
    cover: { src: "/portfolio/photos/developer.jpg", alt: "A software engineer reviewing code on a laptop", position: "center 48%" },
    cardVisual: "illustration",
    details: {
      overview: "Inspects scanned policy endorsements, identity cards and financial statements for micro-alterations.",
      architecture: "Combines frequency-domain Fourier analysis with spatial vision transformers to catch clone stamps, spliced typography and compression artifacts.",
      deliverables: [
        "420ms authenticity verification over a REST API",
        "Pixel-level heatmap of altered zones",
        "Automated ID metadata extraction and blacklist check",
      ],
    },
    visual: <FraudVisual />,
  },
  {
    id: "repertory-search",
    name: "Zero-Latency Embedded Search Engine",
    category: "Systems Engineering",
    client: "Repertory Labs",
    description: "Pick symptoms, get remedies instantly, even without a connection.",
    year: "2025",
    metrics: [
      { label: "Query time", value: "4.2ms" },
      { label: "Cache hit", value: "94%" },
      { label: "Uptime", value: "100%" },
    ],
    tags: ["Rust", "WebAssembly", "Typesense", "TypeScript"],
    cover: { src: "/portfolio/photos/medical-scan.jpg", alt: "A clinician reviewing diagnostic information on a tablet", position: "center 48%" },
    cardVisual: "illustration",
    details: {
      overview: "Lets clinicians query multi-volume medical repertories instantly, with no internet connection or server lookup.",
      architecture: "A compact inverted index compiled to WebAssembly and held in client memory, using bitset intersection for symptom matching.",
      deliverables: [
        "Sub-5ms multi-rubric queries in the browser",
        "Full offline capability with zero server overhead",
        "Deterministic symptom hierarchy weighting",
      ],
    },
    visual: <RepertoryVisual />,
  },
  {
    id: "career-graph",
    name: "Dynamic Career Trajectory Knowledge Graph",
    category: "Autonomous AI",
    client: "Futureogy AI",
    description: "Maps live job requirements to each student’s skills and shows the next step.",
    year: "2024–2025",
    metrics: [
      { label: "Active learners", value: "250k+" },
      { label: "Graph nodes", value: "14,000" },
      { label: "Placement lift", value: "+42%" },
    ],
    tags: ["Neo4j", "Next.js", "Python", "Cypher", "Vector DB"],
    cover: { src: "/portfolio/photos/4k/team.png", alt: "A team collaborating around a table with laptops", position: "center 48%" },
    cardVisual: "photo",
    details: {
      overview: "Parses live technology job postings daily and restructures learning nodes to match market skill demand.",
      architecture: "A Neo4j graph paired with semantic vector embeddings to calculate learning pathways and skill-gap maps.",
      deliverables: [
        "Live skill-demand tracking across tech sectors",
        "Personal competency scoring for 250,000+ students",
        "Course recommendations that drove a +42% placement lift",
      ],
    },
    visual: <GraphVisual />,
  },
  {
    id: "jetaa",
    name: "Jetaa",
    category: "Web Platforms",
    client: "Jetaa",
    description: "Product engineering and platform delivery.",
    tags: ["Web platform"],
    cover: { src: "/portfolio/photos/developer.jpg", alt: "A software engineer building a digital platform", position: "center 35%" },
    cardVisual: "logo",
    logoSrc: "/clients/jetaa.png",
    details: {
      overview: "Product engineering and platform delivery for Jetaa.",
      architecture: "High-performance enterprise web architecture and distributed systems.",
      deliverables: ["Product engineering and delivery", "Scalable cloud architecture"],
    },
    visual: <BrandVisual src="/clients/jetaa.png" name="Jetaa" from="#F5F2FE" to="#FAF9FD" />,
  },
  {
    id: "enspire",
    name: "Enspire",
    category: "Web Platforms",
    client: "Enspire",
    description: "Product engineering and platform delivery.",
    tags: ["Web platform"],
    cover: { src: "/portfolio/photos/team.jpg", alt: "A product team collaborating on a web platform", position: "center 44%" },
    cardVisual: "logo",
    logoSrc: "/clients/enspire.png",
    details: {
      overview: "Product engineering and platform delivery for Enspire.",
      architecture: "Multi-tenant digital experience and enterprise workflows.",
      deliverables: ["Platform modernization", "End-to-end design & delivery"],
    },
    visual: <BrandVisual src="/clients/enspire.png" name="Enspire" from="#FFF7ED" to="#FAF9FD" />,
  },
  {
    id: "wtmf",
    name: "WTMF",
    category: "Web Platforms",
    client: "WTMF",
    description: "Product engineering and platform delivery.",
    tags: ["Web platform"],
    cover: { src: "/portfolio/photos/analytics.jpg", alt: "An analytics dashboard on a laptop screen", position: "center 58%" },
    cardVisual: "logo",
    logoSrc: "/clients/wtmf.png",
    details: {
      overview: "Product engineering and platform delivery for WTMF.",
      architecture: "High-throughput operational platform and analytics infrastructure.",
      deliverables: ["Systems integration", "Real-time data visualization"],
    },
    visual: <BrandVisual src="/clients/wtmf.png" name="WTMF" from="#F0FDF4" to="#FAF9FD" />,
  },
];

const FILTERS = ["All", "Mobile Apps", "Autonomous AI", "Web Platforms", "Computer Vision", "Systems Engineering"] as const;
type Filter = (typeof FILTERS)[number];

/* =========================================================================
   GRID + SHEET (Apple Minimalism + 21Spheres Theme)
   ========================================================================= */

export function BentoPortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="w-full text-[#111114] antialiased">
      {/* Category Filter Pills (Apple Segmented Bar with 21Spheres Precision) */}
      <div className="mb-8 flex overflow-x-auto pb-1 [scrollbar-width:none]">
        <div role="tablist" className="mx-auto flex gap-1 rounded-full bg-[#EAEAEF] p-1 shadow-inner">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#7057D9] ${
                filter === f
                  ? "bg-white text-[#111114] shadow-sm font-semibold ring-1 ring-black/5"
                  : "text-[#6E6E73] hover:text-[#111114]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:auto-rows-[430px] lg:grid-cols-12 lg:gap-4.5">
        {list.map((p, projectIndex) => {
          const span = filter !== "All"
            ? "md:col-span-3 lg:col-span-6 lg:row-span-1"
            : p.layout === "wide"
              ? "md:col-span-6 lg:col-span-8 lg:row-span-1"
              : p.layout === "tall"
                ? "md:col-span-3 lg:col-span-4 lg:row-span-2"
                : "md:col-span-3 lg:col-span-4 lg:row-span-1";
          const cardTones = ["bg-[#D8D8DE]/55", "bg-[#E3E3E8]/60", "bg-[#D8D8DE]/55", "bg-[#E3E3E8]/60", "bg-[#D8D8DE]/55", "bg-[#E3E3E8]/60"];
          return (
            <article
              key={p.id}
              className={`group relative flex h-[430px] flex-col overflow-hidden rounded-[18px] border border-white/80 p-4 shadow-[0_10px_30px_-18px_rgba(23,20,32,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-20px_rgba(47,39,66,0.24)] sm:h-[450px] sm:p-5 lg:h-full ${cardTones[projectIndex % cardTones.length]} ${span}`}
            >
              <div className="relative z-10 shrink-0 px-1 pb-1">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="inline-flex max-w-[72%] truncate rounded-full border border-black/[0.06] bg-white/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.11em] text-[#625D69]">{p.category}</span>
                  {p.year && <span className="shrink-0 text-[10px] text-[#817B85]">{p.year}</span>}
                </div>
                <h3 className="line-clamp-2 min-h-[48px] text-[19px] font-medium leading-[1.2] tracking-[-0.035em] text-[#393640] transition-colors group-hover:text-[#5842B5] sm:text-[21px]">
                  {p.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[12px] leading-[1.5] text-[#6E6972] sm:text-[12.5px]">{p.description}</p>
              </div>

              <div className={`group/visual relative mt-3 min-h-0 w-full flex-1 overflow-hidden rounded-[14px] border border-white/65 ${p.cardVisual === "photo" ? "bg-[#E8E6EA]" : "bg-white/60"}`}>
                {p.cardVisual === "illustration" ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={p.id === "bimakart" ? "absolute inset-0" : "absolute left-0 top-0 h-[122%] w-[122%] origin-top-left scale-[0.82]"}>{p.visual}</div>
                  </div>
                ) : p.cardVisual === "logo" ? (
                  <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#F2F1F3,#FFFFFF_58%,#F0EEF4)] p-5 sm:p-8">
                    {p.logoSrc && <Image src={p.logoSrc} alt={`${p.client} logo`} width={p.id === "wtmf" ? 240 : 420} height={p.id === "wtmf" ? 240 : 180} className="block h-auto max-h-[82%] max-w-[84%] object-contain" />}
                  </div>
                ) : (
                  <>
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes={p.layout === "wide" ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 34vw"}
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${p.id === "bimakart" ? "object-[center_38%]" : ""}`}
                      style={{ objectPosition: p.cover.position ?? "center" }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101016]/45 via-transparent to-white/5" />
                    {p.id === "bimakart" && (
                      <div className="absolute right-3 top-3 w-[min(56%,290px)] rounded-[15px] border border-white/55 bg-[#777780]/35 p-3 text-white shadow-[0_16px_38px_rgba(19,18,26,0.2)] backdrop-blur-2xl sm:right-4 sm:top-4 sm:p-3.5">
                        <div className="flex items-center justify-between gap-2"><span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/75">Family health cover</span><ShieldCheck className="h-3.5 w-3.5 text-white/90" /></div>
                        <p className="mt-1 text-lg font-medium tracking-[-0.04em] sm:text-xl">₹10 lakh</p>
                        <div className="mt-2 space-y-1 border-t border-white/30 pt-2">
                          <div className="flex items-center justify-between gap-2 text-[8px] sm:text-[9px]"><span className="text-white/80">HDFC Ergo</span><span className="font-medium">₹13,940 / yr</span></div>
                          <div className="flex items-center justify-between gap-2 text-[8px] sm:text-[9px]"><span className="text-white/80">Star Health</span><span className="font-medium">₹14,280 / yr</span></div>
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-white/30 pt-2 text-[7px] uppercase tracking-[0.1em] text-white/80"><span>14 insurers</span><span>Quotes in 2.4s</span></div>
                      </div>
                    )}
                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-4 sm:bottom-4">
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/75">{p.client}</p>
                        {p.metrics?.[0] && <p className="mt-1 text-sm font-medium tracking-[-0.02em] text-white sm:text-base">{p.metrics[0].value}<span className="ml-1.5 text-[11px] font-normal tracking-normal text-white/75">{p.metrics[0].label}</span></p>}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <span className="pointer-events-none absolute bottom-7 right-7 z-40 grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/90 text-[#24212B] shadow-[0_3px_12px_rgba(28,23,38,0.12)] transition-all duration-300 group-hover:bg-[#7057D9] group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>

              <button
                onClick={() => setOpen(p)}
                aria-label={`Open ${p.name} details`}
                className="absolute inset-0 z-30 rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
              />
            </article>
          );
        })}
      </div>

      {/* Detail Modal portaled directly to document.body to guarantee stacking above Navbar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <Sheet project={open} onClose={() => setOpen(null)} />}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function Sheet({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
    >
      {/* Dark Translucent Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog with Guaranteed Headroom & Internal Scrolling */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", damping: 30, stiffness: 340 }}
        className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[20px] bg-[#F7F7F6] shadow-2xl ring-1 ring-black/10"
      >
        {/* Pinned Modal Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E5E5EA] bg-white px-5 py-3.5 sm:px-8 sm:py-4 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="rounded-full bg-[#7057D9]/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase text-[#7057D9] shrink-0">
              {p.category}
            </span>
            <span className="text-[12px] font-mono text-[#8E8E93] truncate">
              {p.client} {p.year ? `· ${p.year}` : ""}
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer grid h-8 w-8 place-items-center rounded-full bg-[#F5F5F7] text-[#111114] hover:bg-[#E5E5EA] active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#7057D9] shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:space-y-8 sm:px-8 sm:py-8 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-[#EAE8E6] px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#6A6670]">{p.category} <span className="mx-2 text-[#B3AEB8]">/</span> Case study</span>
            <h2 className="mt-4 text-[30px] font-medium leading-[1.04] tracking-[-0.045em] text-[#15141A] sm:text-[42px]">{p.name}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#66616C] sm:text-base">{p.description}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:grid-rows-[220px_210px]">
            <article className="overflow-hidden rounded-[18px] bg-[#E9E7E5] md:row-span-2">
              <div className="relative h-[210px] overflow-hidden bg-white sm:h-[250px] md:h-[54%]">{p.visual}</div>
              <div className="p-5 sm:p-6">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.15em] text-[#817B85]">The project</p>
                <h3 className="text-lg font-medium leading-snug tracking-[-0.02em] text-[#19171D] sm:text-xl">{p.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#68636D]">{p.details.overview}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#17171A] py-2 pl-4 pr-2 text-[11px] text-white">{p.client}<span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#17171A]"><ArrowRight className="h-3.5 w-3.5" /></span></span>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-[18px] bg-[#E8F0F5] p-5 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#71808B]">Built for the real workflow</p>
              <div>
                <p className="text-lg font-medium leading-snug tracking-[-0.025em] text-[#20262B] sm:text-xl">{p.client}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#68737B]">{p.details.architecture}</p>
              </div>
            </article>

            <article className="relative flex min-h-[190px] items-end overflow-hidden rounded-[18px] bg-[#F5EDE4] p-5 sm:p-6">
              <div aria-hidden="true" className="absolute -right-8 -top-10 h-44 w-44 rounded-full border-[24px] border-[#D9A16A]/20" />
              <div aria-hidden="true" className="absolute right-8 top-8 h-24 w-24 rounded-full border border-[#C88B55]/30" />
              <div className="relative">
                <p className="text-[42px] font-medium leading-none tracking-[-0.055em] text-[#222024] sm:text-[50px]">{p.metrics?.[0]?.value ?? "01"}</p>
                <p className="mt-2 max-w-[180px] text-[11px] leading-relaxed text-[#766B62]">{p.metrics?.[0]?.label ?? "Project outcome"}</p>
              </div>
            </article>

            <article className="relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#E9E5F1] p-5 sm:p-6 md:col-span-2 md:flex-row md:items-end md:gap-6">
              <div className="relative z-10 max-w-lg">
                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#7C6A9A]">System design</p>
                <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.025em] text-[#211C29] sm:text-xl">A connected platform, designed around performance.</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B6474]">{p.details.architecture}</p>
              </div>
              <div className="relative mt-5 flex min-w-[190px] items-center justify-between gap-2 md:mb-1 md:mt-0">
                <span className="absolute left-4 right-4 top-1/2 h-px bg-[#9B8CAF]/50" />
                {[p.tags[0], p.tags[1], p.tags[2]].filter(Boolean).map((tag, index) => <span key={tag} className={`relative grid h-12 w-12 place-items-center rounded-full border border-white/80 text-[8px] font-medium text-[#51465E] shadow-sm ${["bg-[#DCEAF3]", "bg-white", "bg-[#F6DFCA]"][index]}`}>{tag.split(/[ /]/)[0]}</span>)}
              </div>
            </article>
          </div>

          {p.metrics && p.metrics.length > 1 && <section aria-label="Project outcomes">
            <div className="mb-3 flex items-end justify-between gap-4"><div><p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#817B85]">Measured outcomes</p><h3 className="mt-1 text-xl font-medium tracking-[-0.025em] text-[#201D24]">Built to make an impact.</h3></div><span className="hidden text-[10px] text-[#8A8490] sm:block">{p.year ?? "21Spheres project"}</span></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{p.metrics.map((metric, index) => <div key={metric.label} className={`rounded-[14px] p-4 sm:p-5 ${["bg-[#E9E7E5]", "bg-[#E7EEF1]", "bg-[#EEE9F5]"][index % 3]}`}><p className="text-2xl font-medium tracking-[-0.04em] text-[#211F23] sm:text-3xl">{metric.value}</p><p className="mt-1 text-[10px] leading-snug text-[#726D76]">{metric.label}</p></div>)}</div>
          </section>}

          <section className="grid gap-5 border-t border-[#E2DFE3] pt-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
            <div><p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#7653D6]">Engineering notes</p><h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-[#201D24]">What we delivered</h3><p className="mt-2 text-xs leading-relaxed text-[#706A74]">A practical foundation, shaped for the way this product is used.</p></div>
            <ul className="grid gap-2 sm:grid-cols-2">{p.details.deliverables.map((deliverable, index) => <li key={deliverable} className="flex gap-3 rounded-[12px] bg-white p-3.5 text-xs leading-relaxed text-[#47434B]"><span className="font-mono text-[9px] text-[#7653D6]">0{index + 1}</span>{deliverable}</li>)}</ul>
          </section>

          <div className="flex flex-col gap-4 border-t border-[#E2DFE3] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#817B85]">Technology</p><div className="mt-2 flex flex-wrap gap-1.5">{p.tags.map((tag) => <span key={tag} className="rounded-full border border-[#DDD9E1] bg-white px-2.5 py-1 text-[10px] text-[#625D69]">{tag}</span>)}</div></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#17171A] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[#7057D9]">Start a similar project <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   PAGE WRAPPER (21Spheres Studio Theme + Apple Scale)
   ========================================================================= */

export function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#111114] antialiased">

      {/* Header Section */}
      <section className="relative z-10 mx-auto max-w-[1380px] px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-10 sm:pt-12 lg:px-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">Selected work / 21Spheres</p>
        <h1 className="text-[42px] font-light leading-[1.02] tracking-[-0.055em] text-[#111114] sm:text-[60px] lg:text-[72px]">
          Software we’ve shipped.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.55] text-[#6E6E73] sm:text-[18px]">
          AI agents, high-frequency insurance gateways, and mobile platforms engineered for high-conviction scale.
        </p>
      </section>

      {/* Bento Showcase */}
      <section className="relative z-10 mx-auto max-w-[1380px] px-4 pb-24 sm:px-6 lg:px-8">
        <BentoPortfolioGrid />
      </section>

      {/* 21Spheres Bottom CTA Banner */}
      <section className="relative z-10 mx-auto max-w-[1380px] px-4 pb-28 text-center sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl rounded-[16px] bg-gradient-to-b from-white to-[#FAF9FE] p-8 sm:p-12 shadow-[0_20px_50px_-20px_rgba(112,87,217,0.12)] border border-[#EBE8F5]">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7057D9] uppercase block mb-2">
            START ARCHITECTING
          </span>
          <h2 className="text-[30px] font-semibold tracking-[-0.035em] text-[#111114] sm:text-[42px] leading-tight">
            Have a product in mind?
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73] max-w-lg mx-auto">
            Let’s engineer and deliver your next platform with high-conviction scale and zero compromise.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#111114] hover:bg-[#7057D9] px-7 py-3 text-[15px] font-medium text-white shadow-md hover:shadow-[0_6px_24px_rgba(112,87,217,0.35)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PortfolioPage;
