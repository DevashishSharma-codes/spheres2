"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  Check,
  GraduationCap,
  Home,
  Leaf,
  Link2,
  MapPin,
  PackageCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  Umbrella,
  WifiOff,
  X,
  Zap,
  Bell,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------------
   Typography Hierarchy:
   Apple SF Pro / SF Pro Display prioritized with seamless fallback to
   21Spheres Geist Sans, Inter, and system native type.
   ------------------------------------------------------------------------- */
const SF =
  '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, var(--font-geist-sans), var(--font-inter), "Inter", "Helvetica Neue", sans-serif';

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
    <div className={`rounded-[38px] bg-[#111114] p-[7px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-white">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-5 pt-[11px] text-[10px] font-semibold text-[#111114]">
          <span>9:41</span>
          <span className="h-2 w-4 rounded-[3px] bg-[#111114]" />
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({ icon, title, body, time = "now" }: { icon: React.ReactNode; title: string; body: string; time?: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-[12px] bg-white/90 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_1px_2px_rgba(112,87,217,0.06)] ring-1 ring-black/5 backdrop-blur-xl">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-[#7057D9] to-[#573EBF] text-white shadow-xs">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[12px] font-semibold text-[#111114]">{title}</p>
          <span className="text-[11px] font-mono text-[#8E8E93]">{time}</span>
        </div>
        <p className="text-[12px] leading-snug text-[#3C3C43]/80">{body}</p>
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

function Switch({ on }: { on: boolean }) {
  return (
    <span className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors ${on ? "bg-[#7057D9]" : "bg-[#E5E5EA]"}`}>
      <span className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-xs transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
    </span>
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
      <Dots />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#EDE7FD] via-[#F4F0FD]/60 to-transparent" />
      <Phone className="absolute left-1/2 top-7 h-[26rem] w-[13rem] -translate-x-1/2">
        <div className="px-4 pt-4">
          <p className="text-[17px] font-semibold tracking-tight text-[#111114]">Compare plans</p>
          <p className="text-[11px] text-[#8E8E93]">Family floater · ₹10 L cover</p>
          <div className="mt-3 space-y-2">
            {rows.map((r) => (
              <div
                key={r.n}
                className={`flex items-center gap-2 rounded-xl p-2 transition-all ${
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
          <div className="mt-3 rounded-full bg-[#7057D9] py-2 text-center text-[12px] font-semibold text-white shadow-[0_4px_14px_rgba(112,87,217,0.35)] hover:bg-[#573EBF] transition-colors cursor-pointer">
            Continue
          </div>
        </div>
      </Phone>
      <Cursor label="Riya" color="#7057D9" className="left-[calc(50%+3.2rem)] top-[11.2rem]" />
      <div className="absolute left-3 sm:left-6 md:left-8 top-8 hidden sm:block max-w-[13.5rem] z-20">
        <Toast icon={<ShieldCheck className="h-4 w-4" />} title="Bimakart Gateway" body="14 insurers replied in 2.4 seconds" />
      </div>
      <div className="absolute left-6 sm:left-10 md:left-14 top-[6.8rem] hidden sm:block max-w-[13.5rem] z-20">
        <Toast icon={<Check className="h-4 w-4" />} title="Policy issued" body="Sent to Ravi on WhatsApp" time="1m" />
      </div>
      <div className="absolute right-3 sm:right-6 md:right-8 top-10 hidden sm:block max-w-[12.5rem] rounded-[12px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 z-20">
        <div className="flex -space-x-2">
          {[FACES.a, FACES.d, FACES.f, FACES.e].map((f, i) => (
            <Avatar key={i} id={f} name="Broker" size={28} />
          ))}
        </div>
        <p className="mt-2 text-[12px] font-semibold text-[#111114]">Broker network</p>
        <p className="text-[11px] font-mono text-[#7057D9] font-medium">Quoting live, right now</p>
      </div>
    </>
  );
}

function ClinicalAiVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9FE] to-[#EFEAFB]" />
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-4">
        <div className="ml-auto max-w-[88%] rounded-[18px] rounded-br-md bg-gradient-to-r from-[#7057D9] to-[#573EBF] px-3.5 py-2 text-[12.5px] leading-snug text-white shadow-[0_4px_16px_rgba(112,87,217,0.22)]">
          Throbbing headache, worse in sunlight. Patient is restless.
        </div>
        <div className="flex items-end gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#111114] text-white shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
          </span>
          <div className="w-full rounded-[18px] rounded-bl-md bg-white p-3 shadow-[0_6px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-[#111114]">Closest matches</p>
              <span className="text-[10px] font-mono text-[#7057D9] font-semibold">99.4% CITATION</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                { n: "Belladonna", t: "Strong match", cls: "bg-[#34C759]/15 text-[#248A3D]" },
                { n: "Glonoinum", t: "Possible", cls: "bg-[#F2F2F7] text-[#6E6E73]" },
              ].map((r) => (
                <div key={r.n} className="flex items-center justify-between rounded-xl bg-[#F5F5F7] px-2.5 py-1.5">
                  <span className="text-[12px] font-medium text-[#111114]">{r.n}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${r.cls}`}>{r.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex gap-1.5">
              {["Organon §153", "Materia medica"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full bg-[#7057D9]/10 px-2 py-0.5 text-[10.5px] font-medium text-[#7057D9]">
                  <Link2 className="h-3 w-3" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2FE] via-[#F8F6FD] to-[#F5F5F7]" />
      <div className="absolute inset-x-0 top-5 mx-auto flex w-[17.5rem] max-w-[90%] items-center gap-3 rounded-[14px] bg-black px-3 py-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
        <Avatar id={FACES.b} name="Arjun" size={34} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-white">Arjun is 6 min away</p>
          <p className="text-[11px] text-white/55">Order picked up · ProMotion</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7057D9] text-white shadow-xs">
          <Bike className="h-4 w-4" />
        </span>
      </div>
      <div className="absolute inset-x-4 top-[6.6rem] overflow-hidden rounded-[12px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
        {[
          { i: MapPin, t: "Share live location", c: "#7057D9", on: true },
          { i: PackageCheck, t: "Contactless drop-off", c: "#34C759", on: true },
          { i: Bell, t: "Notify me at the door", c: "#FF9F0A", on: false },
        ].map((r, idx) => (
          <div key={r.t} className={`flex items-center gap-3 px-3 py-2.5 ${idx ? "border-t border-black/5" : ""}`}>
            <span className="grid h-7 w-7 place-items-center rounded-[6px] text-white" style={{ background: r.c }}>
              <r.i className="h-4 w-4" />
            </span>
            <span className="flex-1 text-[13px] text-[#111114] font-medium">{r.t}</span>
            <Switch on={r.on} />
          </div>
        ))}
      </div>
    </>
  );
}

function WealthVisual() {
  const tone: Record<string, string> = {
    purple: "bg-[#7057D9]/15 text-[#7057D9]",
    orange: "bg-[#FF9F0A]/15 text-[#B25E00]",
    blue: "bg-[#0A84FF]/12 text-[#0A63C9]",
  };
  const goals = [
    { i: Umbrella, t: "Retirement", s: "Age 58 · Balanced", tag: "On track", tn: "purple", bg: "#F4F0FD", fg: "#7057D9" },
    { i: GraduationCap, t: "Child’s education", s: "By 2038", tag: "Review", tn: "orange", bg: "#FFF1DD", fg: "#FF9F0A" },
    { i: Home, t: "Dream home", s: "By 2031", tag: "Ahead", tn: "blue", bg: "#E6F8EB", fg: "#34C759" },
  ];
  const orbit = [
    { f: FACES.c, n: "Neha", l: "8%", t: "8%" },
    { f: FACES.d, n: "Kabir", l: "46%", t: "30%" },
    { f: FACES.f, n: "Isha", l: "14%", t: "60%" },
    { f: FACES.e, n: "Dev", l: "52%", t: "74%" },
  ];
  return (
    <>
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute right-0 top-0 h-full w-[48%]">
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7057D9]/10" />
          <div className="absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7057D9]/15 bg-white/40" />
          {orbit.map((o) => (
            <div key={o.n} className="absolute flex items-center gap-2" style={{ left: o.l, top: o.t }}>
              <Avatar id={o.f} name={o.n} size={38} />
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#111114] shadow-sm ring-1 ring-black/5">Share plan</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-6 w-[15rem] md:left-8 md:w-[17rem]">
        {goals.map((g, idx) => (
          <div
            key={g.t}
            className="relative mb-2.5 flex items-center gap-3 rounded-[12px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
            style={{ marginLeft: idx * 14, zIndex: 3 - idx }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px]" style={{ background: g.bg, color: g.fg }}>
              <g.i className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#111114]">{g.t}</p>
              <p className="truncate text-[11px] text-[#8E8E93]">{g.s}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${tone[g.tn]}`}>{g.tag}</span>
          </div>
        ))}
        <span className="ml-3 inline-flex items-center gap-1 rounded-[6px] bg-[#111114] hover:bg-[#7057D9] transition-colors px-3 py-1.5 text-[11px] font-medium text-white cursor-pointer">
          Add goal <Plus className="h-3 w-3" />
        </span>
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
  wide?: boolean;
  metrics?: { label: string; value: string }[];
  tags: string[];
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
    wide: true,
    metrics: [
      { label: "Query latency", value: "< 2.4s" },
      { label: "Carriers", value: "100+" },
      { label: "Daily queries", value: "2.5M+" },
    ],
    tags: ["FastAPI", "Redis", "AWS EKS", "GraphQL", "Next.js"],
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
    wide: true,
    metrics: [
      { label: "AUM monitored", value: "$1.4B+" },
      { label: "Stress test", value: "100k runs" },
      { label: "Tax alpha", value: "+$18.4k" },
    ],
    tags: ["React 19", "TypeScript", "PostgreSQL", "Recharts", "Tailwind"],
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
    <div className="w-full text-[#111114] antialiased" style={{ fontFamily: SF }}>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:gap-4.5">
        {list.map((p) => {
          const span = filter !== "All" ? "md:col-span-3" : p.wide ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2";
          return (
            <article
              key={p.id}
              className={`group relative flex flex-col justify-between rounded-[14px] bg-white p-5 sm:p-6 border border-[#E5E5EA] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_20px_-8px_rgba(0,0,0,0.04)] hover:border-[#7057D9]/40 hover:shadow-[0_20px_45px_-12px_rgba(112,87,217,0.14)] transition-all duration-300 h-[460px] sm:h-[480px] overflow-hidden ${span}`}
            >
              <div className="shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] font-mono text-[#8E8E93] tracking-wide">{p.client}</p>
                  {p.year && <span className="text-[11px] font-mono text-[#7057D9] font-semibold">{p.year}</span>}
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-semibold leading-snug tracking-[-0.025em] text-[#111114] line-clamp-1">
                  {p.name}
                </h3>
                <p className="mt-1 text-[13.5px] leading-[1.4] text-[#6E6E73] line-clamp-2">{p.description}</p>
              </div>
              
              <div className="relative mt-4 flex-1 w-full overflow-hidden rounded-[10px] bg-[#FAF9FD] border border-black/[0.04]">
                {p.visual}
              </div>

              {/* Hover Plus Button with 21Spheres Purple Glow */}
              <span className="pointer-events-none absolute bottom-8 right-8 z-40 grid h-9 w-9 place-items-center rounded-full bg-[#111114]/90 text-white backdrop-blur shadow-sm group-hover:bg-[#7057D9] group-hover:shadow-[0_4px_16px_rgba(112,87,217,0.4)] group-hover:scale-105 transition-all duration-300">
                <Plus className="h-4 w-4" />
              </span>

              <button
                onClick={() => setOpen(p)}
                aria-label={`Open ${p.name} details`}
                className="absolute inset-0 z-30 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
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
      style={{ fontFamily: SF }}
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
        className="relative w-full max-w-4xl max-h-[84vh] flex flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl ring-1 ring-black/10 z-10 my-auto"
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
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-7 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent]">
          {/* Top Visual Showcase Banner */}
          <div className="relative w-full h-[250px] sm:h-[310px] overflow-hidden rounded-[12px] bg-[#FAF9FD] border border-black/[0.05] shadow-xs shrink-0">
            {p.visual}
          </div>

          {/* Title & Overview */}
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111114]">
              {p.name}
            </h2>
            <p className="mt-3 text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#3C3C43]">
              {p.details.overview}
            </p>
          </div>

          {/* Empirical Benchmarks */}
          {p.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-[12px] bg-[#FAF9FD] border border-[#EBE8F5]">
              {p.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left py-1 px-2">
                  <p className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.03em] text-[#111114]">{m.value}</p>
                  <p className="text-[12px] text-[#8E8E93] font-mono font-medium">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Side-by-Side Grid: Architecture & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/[0.06] pt-6">
            {/* Architecture */}
            <div>
              <h4 className="text-[12px] font-mono font-bold tracking-wider text-[#7057D9] uppercase mb-2">
                Architecture & Engineering
              </h4>
              <p className="text-[14.5px] leading-relaxed text-[#4A4A52]">
                {p.details.architecture}
              </p>
            </div>

            {/* Verified Deliverables */}
            <div>
              <h4 className="text-[12px] font-mono font-bold tracking-wider text-[#7057D9] uppercase mb-2.5">
                Verified Deliverables
              </h4>
              <ul className="space-y-2.5">
                {p.details.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#3C3C43]">
                    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#7057D9] text-white shadow-xs">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies */}
          <div className="border-t border-black/[0.06] pt-6">
            <h4 className="text-[12px] font-mono font-bold tracking-wider text-[#7057D9] uppercase mb-2.5">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-[#FAF9FD] border border-[#E9E5F5] px-3 py-1 text-[12px] font-mono text-[#52525B]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Area */}
          <div className="border-t border-black/[0.06] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] font-mono text-[#8E8E93]">
              Delivered by 21Spheres Studio
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#111114] hover:bg-[#7057D9] px-6 py-3 text-[14px] font-medium text-white shadow-md hover:shadow-[0_6px_20px_rgba(112,87,217,0.35)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
            >
              <span>Start a similar project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
    <main className="relative min-h-screen bg-[#F5F5F7] text-[#111114] antialiased overflow-hidden" style={{ fontFamily: SF }}>
      {/* 21Spheres Signature Ambient Luminous Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[380px] rounded-full blur-[140px] bg-[#7057D9]/14" />
      </div>

      {/* Header Section */}
      <section className="relative z-10 mx-auto max-w-[1380px] px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8 text-center">
        <h1 className="text-[44px] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[64px] lg:text-[76px] text-[#111114]">
          Software we’ve shipped.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.45] text-[#6E6E73] sm:text-[20px] font-normal">
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
