"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
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
  ArrowRight, 
  Check, 
  Volume2, 
  VolumeX, 
  Zap, 
  ChevronRight,
  RotateCcw,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Layers,
  Database,
  Shield,
  Activity,
  Code2,
  RefreshCw
} from "lucide-react";
import { ServiceItem } from "@/types";
import { MOBILE_SERVICES_LIST, MobileSubService } from "@/content/mobileServices";
import Link from "next/link";

interface IPhoneSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  initialServiceId?: string;
}

type ActionPurpose = "cycle-services" | "deploy-squad" | "benchmark-120fps" | "action-menu";

export function IPhoneSimulatorModal({
  isOpen,
  onClose,
  services,
  initialServiceId,
}: IPhoneSimulatorModalProps) {
  // Navigation Mode inside Phone: "mobile-grid" (Mobile Services Grid) vs "all-services"
  const [viewMode, setViewMode] = useState<"mobile-grid" | "all-services">("mobile-grid");
  
  // Mobile sub-services state
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedMobileSubService, setSelectedMobileSubService] = useState<MobileSubService>(MOBILE_SERVICES_LIST[0]);
  const [showSkeletons, setShowSkeletons] = useState(false);
  const [skeletonShimmerKey, setSkeletonShimmerKey] = useState(0);

  // Agency 10 services state
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Audio / Hardware states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [actionButtonPressed, setActionButtonPressed] = useState(false);
  const [actionPurpose, setActionPurpose] = useState<ActionPurpose>("cycle-services");
  const [dynamicIslandState, setDynamicIslandState] = useState<"idle" | "action" | "expanded">("idle");
  const [dynamicIslandMessage, setDynamicIslandMessage] = useState<string>("120Hz PROMOTION");
  const [showRipple, setShowRipple] = useState(false);
  const [showActionWheel, setShowActionWheel] = useState(false);
  const [phoneFinish, setPhoneFinish] = useState<"titanium" | "purple" | "silver">("titanium");
  const [fpsCounter, setFpsCounter] = useState(120);

  const phoneScrollRef = useRef<HTMLDivElement | null>(null);

  // Set initial service
  useEffect(() => {
    if (initialServiceId && initialServiceId !== "mobile-application-development") {
      setViewMode("all-services");
      const idx = services.findIndex((s) => s.id === initialServiceId);
      if (idx !== -1) {
        setActiveServiceIndex(idx);
        setSelectedService(services[idx]);
      }
    } else {
      setViewMode("mobile-grid");
      if (services.length > 0) {
        setSelectedService(services[0]);
      }
    }
  }, [initialServiceId, services, isOpen]);

  // Keyboard shortcut listener: [A] triggers Action Button, [Esc] closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "a" || e.key === "A") {
        triggerActionButton();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, viewMode, activeMobileIndex, activeServiceIndex, actionPurpose, soundEnabled]);

  // Subtle synthesized mechanical haptic click via Web Audio API
  const playHapticAudio = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio silently skipped if blocked
    }
  };

  // Trigger Action Button Animation
  const triggerActionButton = () => {
    playHapticAudio();
    setActionButtonPressed(true);
    setShowRipple(true);

    setTimeout(() => setActionButtonPressed(false), 220);
    setTimeout(() => setShowRipple(false), 900);

    if (actionPurpose === "cycle-services") {
      if (viewMode === "mobile-grid") {
        const nextIdx = (activeMobileIndex + 1) % MOBILE_SERVICES_LIST.length;
        setActiveMobileIndex(nextIdx);
        setSelectedMobileSubService(MOBILE_SERVICES_LIST[nextIdx]);
        setDynamicIslandMessage(`ACTION: ${MOBILE_SERVICES_LIST[nextIdx].name.toUpperCase()}`);
      } else {
        const nextIndex = (activeServiceIndex + 1) % services.length;
        setActiveServiceIndex(nextIndex);
        setSelectedService(services[nextIndex]);
        setDynamicIslandMessage(`ACTION: ${services[nextIndex].number} // ${services[nextIndex].title.slice(0, 15)}`);
      }

      setDynamicIslandState("action");
      setTimeout(() => setDynamicIslandState("idle"), 2600);
    } else if (actionPurpose === "deploy-squad") {
      setDynamicIslandMessage("ACTION: DEPLOY SQUAD PROTOCOL INITIATED");
      setDynamicIslandState("action");
      setTimeout(() => setDynamicIslandState("idle"), 2800);
    } else if (actionPurpose === "benchmark-120fps") {
      setDynamicIslandMessage("ACTION: 120 FPS PROMOTION DISPLAY ACTIVE");
      setDynamicIslandState("action");
      setFpsCounter(120);
      setTimeout(() => setDynamicIslandState("idle"), 2500);
    } else if (actionPurpose === "action-menu") {
      setShowActionWheel((prev) => !prev);
      setDynamicIslandMessage(showActionWheel ? "ACTION: MENU DISMISSED" : "ACTION: SHORTCUT HUB OPEN");
      setDynamicIslandState("action");
      setTimeout(() => setDynamicIslandState("idle"), 2000);
    }
  };

  // Re-trigger skeleton loading shimmer
  const triggerSkeletonReload = () => {
    setShowSkeletons(true);
    setSkeletonShimmerKey((k) => k + 1);
    setTimeout(() => setShowSkeletons(false), 1400);
  };

  if (!isOpen) return null;

  // Finish Colors
  const finishStyles = {
    titanium: "from-[#3A393E] via-[#242327] to-[#171619] border-[#4B4951]",
    purple: "from-[#4B396B] via-[#2D2145] to-[#1A1428] border-[#6D539B]",
    silver: "from-[#D5D6DC] via-[#A8AAAF] to-[#808389] border-[#E8E9ED]",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
        
        {/* Clean white backdrop with subtle ambient purple aura */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/94 backdrop-blur-2xl transition-all"
        >
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7057D9]/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8E79E8]/08 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-dot-grid opacity-35 pointer-events-none" />
        </motion.div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center"
        >
          {/* Top Header Bar */}
          <div className="w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-black/10 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7057D9] animate-pulse" />
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#7057D9] font-medium">
                  INTERACTIVE HARDWARE SIMULATOR // iOS 18 PROMOTION
                </div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-black">
                  Mobile Application Services &amp; Action Button
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 text-black/70 transition-all text-xs flex items-center gap-1.5"
                title={soundEnabled ? "Mute Haptic Click" : "Enable Haptic Click"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#7057D9]" /> : <VolumeX className="w-4 h-4 text-black/40" />}
                <span className="hidden sm:inline font-mono text-[11px]">
                  {soundEnabled ? "Haptics On" : "Muted"}
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-black/15 bg-white hover:bg-black/5 text-black hover:rotate-90 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Left Controls, Phone Center, Right Inspector */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
            
            {/* LEFT CONTROLS: Action Button Controller & Switchers */}
            <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-4 text-left">
              
              {/* View Switcher: Mobile Services Grid vs All 10 Services */}
              <div className="p-4 bg-white border border-black/10 rounded-2xl shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 block mb-2">
                  SIMULATOR APP VIEW
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setViewMode("mobile-grid")}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all text-center border ${
                      viewMode === "mobile-grid"
                        ? "bg-[#7057D9] text-white border-[#7057D9] shadow-sm"
                        : "bg-[#FAF9F7] text-black/70 border-black/8 hover:bg-black/5"
                    }`}
                  >
                    Mobile Grid (8)
                  </button>
                  <button
                    onClick={() => setViewMode("all-services")}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all text-center border ${
                      viewMode === "all-services"
                        ? "bg-[#7057D9] text-white border-[#7057D9] shadow-sm"
                        : "bg-[#FAF9F7] text-black/70 border-black/8 hover:bg-black/5"
                    }`}
                  >
                    All Services (10)
                  </button>
                </div>
              </div>

              {/* Action Button Remote Trigger */}
              <div className="p-5 bg-white border border-black/10 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7057D9] font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    ACTION BUTTON
                  </span>
                  <span className="text-[10px] font-mono text-black/50">
                    PRESS [A] KEY
                  </span>
                </div>

                <p className="text-xs text-black/70 font-light mb-4 leading-relaxed">
                  Click the physical Action Button on the top-left edge of the iPhone frame, or tap the trigger below.
                </p>

                <button
                  onClick={triggerActionButton}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7057D9] to-[#8E79E8] hover:from-[#573EBF] hover:to-[#7057D9] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md shadow-[#7057D9]/25 active:scale-95 transition-all cursor-pointer group"
                >
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform text-amber-300" />
                  <span>Click Action Button</span>
                  <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                    [A]
                  </span>
                </button>

                {/* Skeletons Reload Trigger */}
                <button
                  onClick={triggerSkeletonReload}
                  className="w-full mt-2.5 py-2 px-3 rounded-lg bg-[#FAF9F7] hover:bg-black/5 border border-black/10 text-xs font-mono text-black/70 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#7057D9]" />
                  <span>Test Skeleton Loadings</span>
                </button>
              </div>

              {/* Finish Switcher */}
              <div className="p-4 bg-white border border-black/10 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 block">
                    CHASSIS FINISH
                  </span>
                  <span className="text-xs font-medium text-black">
                    Aerospace Titanium
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { id: "titanium", color: "bg-[#2E2D32]", label: "Black Titanium" },
                    { id: "purple", color: "bg-[#4B396B]", label: "Deep Purple" },
                    { id: "silver", color: "bg-[#D8D9DF]", label: "Natural Silver" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPhoneFinish(f.id as "titanium" | "purple" | "silver")}
                      className={`w-6 h-6 rounded-full ${f.color} border-2 transition-transform ${
                        phoneFinish === f.id ? "scale-125 border-[#7057D9] ring-2 ring-[#7057D9]/30" : "border-black/20"
                      }`}
                      title={f.label}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* CENTER: THE PHOTOREALISTIC IPHONE 16 PRO MODEL */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center relative py-2">
              
              {/* Concentric Energy Pulse from Action Button */}
              <AnimatePresence>
                {showRipple && (
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0.9 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="absolute -left-6 top-[130px] w-28 h-28 rounded-full border-2 border-[#7057D9] bg-[#7057D9]/25 pointer-events-none z-40"
                  />
                )}
              </AnimatePresence>

              {/* Action Button Label Pointer */}
              <motion.div
                animate={{ x: [-2, 4, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:flex items-center gap-1.5 absolute -left-28 top-[136px] z-50 bg-[#7057D9] text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-medium shadow-lg pointer-events-none"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Action Button</span>
                <span className="text-white text-xs">&rarr;</span>
              </motion.div>

              {/* Outer Phone Hardware Chasis */}
              <div 
                className={`relative w-[340px] sm:w-[370px] h-[680px] sm:h-[720px] rounded-[52px] p-[3.5px] bg-gradient-to-b ${finishStyles[phoneFinish]} border shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition-all duration-300 select-none`}
              >
                
                {/* 1. PHYSICAL ACTION BUTTON (Top-Left Flank) */}
                <button
                  onClick={triggerActionButton}
                  title="Click Action Button (or press 'A' on keyboard)"
                  className={`absolute -left-[5px] top-[118px] w-[5.5px] h-[34px] rounded-l-[3px] bg-gradient-to-r from-amber-400 via-purple-300 to-[#7057D9] border-l border-white/40 cursor-pointer transition-all active:translate-x-[2px] ${
                    actionButtonPressed ? "translate-x-[2px] brightness-150 ring-2 ring-[#7057D9]" : "hover:brightness-125"
                  }`}
                  aria-label="iPhone Action Button"
                >
                  <span className="sr-only">Action Button</span>
                </button>

                {/* 2. VOLUME BUTTONS */}
                <div className="absolute -left-[5px] top-[170px] w-[5px] h-[52px] rounded-l-[3px] bg-gradient-to-r from-neutral-400 to-neutral-700 border-l border-white/20" />
                <div className="absolute -left-[5px] top-[235px] w-[5px] h-[52px] rounded-l-[3px] bg-gradient-to-r from-neutral-400 to-neutral-700 border-l border-white/20" />

                {/* 3. SIDE / POWER BUTTON */}
                <div className="absolute -right-[5px] top-[180px] w-[5px] h-[76px] rounded-r-[3px] bg-gradient-to-l from-neutral-400 to-neutral-700 border-r border-white/20" />

                {/* Inner Black Bezel Frame */}
                <div className="w-full h-full rounded-[48px] p-[8px] bg-black relative flex flex-col overflow-hidden">
                  
                  {/* ========================================================
                      THE PHONE SCREEN (Rendered with bold purple-white gradient)
                      ======================================================== */}
                  <div 
                    className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col text-black shadow-inner"
                    style={{
                      background: `
                        radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.98) 0%, transparent 40%),
                        radial-gradient(circle at 0% 100%, rgba(142, 121, 232, 0.45) 0%, transparent 50%),
                        linear-gradient(145deg, #573EBF 0%, #7057D9 28%, #A088F8 60%, #FFFFFF 100%)
                      `,
                    }}
                  >
                    
                    {/* Top Status Bar: 9:41, Dynamic Island, Signal, Battery */}
                    <div className="relative z-30 pt-3 px-5 flex items-center justify-between text-white text-[11px] font-medium tracking-tight">
                      <span className="font-semibold drop-shadow-sm">9:41</span>
                      
                      {/* DYNAMIC ISLAND PILL */}
                      <motion.div
                        animate={{
                          width: dynamicIslandState === "action" ? 280 : 120,
                          height: dynamicIslandState === "action" ? 34 : 26,
                        }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        onClick={triggerActionButton}
                        className="bg-black text-white rounded-full flex items-center justify-between px-3 cursor-pointer shadow-lg hover:scale-105 transition-transform border border-white/10"
                      >
                        {dynamicIslandState === "action" ? (
                          <div className="flex items-center justify-between w-full text-[10px] font-mono">
                            <span className="flex items-center gap-1.5 text-amber-300 font-semibold truncate">
                              <Zap className="w-3 h-3 animate-bounce shrink-0" />
                              <span className="truncate">{dynamicIslandMessage}</span>
                            </span>
                            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 animate-ping" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1">
                              <span className="w-3.5 h-2 rounded-full bg-amber-400 flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-black/60" />
                              </span>
                              <span className="text-[8px] font-mono text-amber-300">120Hz</span>
                            </div>
                            <span className="text-[9px] font-mono text-white/70">0:02</span>
                          </div>
                        )}
                      </motion.div>

                      <div className="flex items-center gap-1.5 drop-shadow-sm">
                        <span className="text-[10px] font-mono">5G</span>
                        <div className="w-4 h-2.5 border border-white rounded-[2px] p-[1px] flex items-center">
                          <div className="w-full h-full bg-white rounded-[1px]" />
                        </div>
                      </div>
                    </div>

                    {/* APP HEADER INSIDE PHONE */}
                    <div className="pt-3 pb-2 px-4 flex items-center justify-between text-white">
                      <div>
                        <div className="text-[9px] font-mono tracking-widest uppercase opacity-85">
                          21SPHERES // MOBILE SQUAD
                        </div>
                        <h4 className="text-base font-semibold tracking-tight text-white drop-shadow-sm">
                          {viewMode === "mobile-grid" ? "Mobile Services (8)" : "All Agency Services (10)"}
                        </h4>
                      </div>
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                        {fpsCounter} FPS
                      </span>
                    </div>

                    {/* SKELETON / VIEW TOGGLE BAR */}
                    <div className="px-4 py-1 flex items-center justify-between text-[10px] font-mono text-white/80">
                      <span>ProMotion 120Hz Architecture</span>
                      <button
                        onClick={triggerSkeletonReload}
                        className="text-amber-300 hover:underline flex items-center gap-1 text-[9px]"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Shimmer Skeletons</span>
                      </button>
                    </div>

                    {/* ========================================================
                        INSIDE PHONE: PROPER GRID TYPE FORMAT WITH SKELETON LOADINGS
                        ======================================================== */}
                    <div 
                      ref={phoneScrollRef}
                      className="flex-1 overflow-y-auto px-3.5 py-2 space-y-2.5 no-scrollbar pb-14"
                    >
                      {viewMode === "mobile-grid" ? (
                        /* MOBILE SERVICES 2-COLUMN GRID (Requested: "given in a proper grid type format with proper skeleton loadings") */
                        <div className="grid grid-cols-2 gap-2.5">
                          {MOBILE_SERVICES_LIST.map((item, idx) => {
                            const isSelected = activeMobileIndex === idx;

                            return (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setActiveMobileIndex(idx);
                                  setSelectedMobileSubService(item);
                                  playHapticAudio();
                                }}
                                className={`p-3 rounded-2xl transition-all cursor-pointer text-left relative overflow-hidden backdrop-blur-md flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-white text-black shadow-lg ring-2 ring-[#7057D9]"
                                    : "bg-white/85 hover:bg-white text-black/90 shadow-sm"
                                }`}
                              >
                                <div>
                                  {/* Icon & Badge Row */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className={`w-9 h-9 rounded-[11px] bg-gradient-to-br ${item.iconBg} text-white flex items-center justify-center shadow-md relative`}>
                                      {item.id === "ios-native" && <span className="text-xs font-bold font-mono">Swift</span>}
                                      {item.id === "android-native" && <Code2 className="w-4 h-4" />}
                                      {item.id === "react-native-expo" && <Layers className="w-4 h-4" />}
                                      {item.id === "hardware-action-button" && <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />}
                                      {item.id === "offline-sync" && <Database className="w-4 h-4" />}
                                      {item.id === "biometric-security" && <Shield className="w-4 h-4" />}
                                      {item.id === "on-device-ai" && <Cpu className="w-4 h-4" />}
                                      {item.id === "gesture-physics" && <Activity className="w-4 h-4" />}
                                    </div>

                                    {/* Badge (like Red 1 from user reference photo) */}
                                    {item.badge && (
                                      <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded-full font-bold shadow-sm ${item.badgeColor}`}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>

                                  <h5 className="text-xs font-semibold text-black leading-tight">
                                    {item.name}
                                  </h5>

                                  <span className="text-[9.5px] font-mono text-[#7057D9] block mt-0.5">
                                    {item.subtitle}
                                  </span>

                                  {/* Glassmorphism Skeleton Loading Bars */}
                                  <div className="mt-2 space-y-1">
                                    {showSkeletons ? (
                                      <>
                                        <div key={`sk1-${skeletonShimmerKey}`} className="h-1.5 rounded-full bg-gradient-to-r from-black/15 via-[#7057D9]/30 to-black/10 animate-pulse w-4/5" />
                                        <div key={`sk2-${skeletonShimmerKey}`} className="h-1.5 rounded-full bg-gradient-to-r from-black/10 via-[#7057D9]/20 to-black/10 animate-pulse w-3/5" />
                                      </>
                                    ) : (
                                      <p className="text-[9px] text-black/65 font-light line-clamp-2 leading-tight">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="mt-2 pt-1.5 border-t border-black/8 flex items-center justify-between text-[9px] font-mono">
                                  <span className="text-black/50">{item.metrics.label}</span>
                                  <span className="text-[#7057D9] font-bold">{item.metrics.value}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* AGENCY 10 SERVICES LIST */
                        <div className="space-y-2">
                          {services.map((service, idx) => {
                            const isSelected = activeServiceIndex === idx;

                            return (
                              <div
                                key={service.id}
                                onClick={() => {
                                  setActiveServiceIndex(idx);
                                  setSelectedService(service);
                                  playHapticAudio();
                                }}
                                className={`p-3 rounded-2xl transition-all cursor-pointer text-left relative overflow-hidden backdrop-blur-md ${
                                  isSelected
                                    ? "bg-white text-black shadow-lg ring-2 ring-[#7057D9]"
                                    : "bg-white/80 hover:bg-white text-black/90 shadow-sm"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[9.5px] font-mono font-bold text-[#7057D9]">
                                    {service.number} // {service.category?.toUpperCase()}
                                  </span>
                                  <span className="text-[9px] font-mono text-black/50">
                                    {service.metric}
                                  </span>
                                </div>
                                <h5 className="text-xs font-semibold text-black leading-snug">
                                  {service.title}
                                </h5>
                                <p className="text-[10px] text-black/70 font-light line-clamp-2 mt-0.5">
                                  {service.headline}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* PHONE BOTTOM DOCK / HOME BAR */}
                    <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-white/95 via-white/75 to-transparent backdrop-blur-sm flex flex-col items-center justify-end z-20">
                      <span className="text-[9px] font-mono text-black/60 mb-1">
                        Click Action Button on left rim &uarr;
                      </span>
                      <div className="w-32 h-1 bg-black/70 rounded-full" />
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT INSPECTOR: Deep Dive of Selected Mobile Service */}
            <div className="order-3 lg:col-span-3 flex flex-col gap-4 text-left">
              {viewMode === "mobile-grid" && selectedMobileSubService ? (
                <div className="p-5 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-[#7057D9]">
                        MOBILE CAPABILITY
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black/50">
                        // {selectedMobileSubService.badge || "PRO"}
                      </span>
                    </div>

                    <h4 className="text-xl font-medium tracking-tight text-black mb-1">
                      {selectedMobileSubService.name}
                    </h4>

                    <span className="text-xs font-mono text-[#7057D9] block mb-3">
                      {selectedMobileSubService.subtitle}
                    </span>

                    <p className="text-xs text-black/75 font-light leading-relaxed mb-4">
                      {selectedMobileSubService.description}
                    </p>

                    {/* Live Metric Display */}
                    <div className="p-3 rounded-xl bg-[#FAF9F7] border border-black/8 mb-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-black/60">{selectedMobileSubService.metrics.label}:</span>
                        <span className="text-[#7057D9] font-bold">{selectedMobileSubService.metrics.value}</span>
                      </div>
                    </div>

                    {/* Tech Stack Tags */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 block mb-1.5">
                        Native Technologies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMobileSubService.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#FAF9F7] border border-black/8 text-[11px] font-mono text-black/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/8 mt-4">
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-[#7057D9] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Deploy {selectedMobileSubService.name} Squad</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : selectedService ? (
                /* Agency Service details */
                <div className="p-5 bg-white border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-[#7057D9]">
                        {selectedService.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black/50">
                        {selectedService.category}
                      </span>
                    </div>

                    <h4 className="text-xl font-medium tracking-tight text-black mb-2">
                      {selectedService.title}
                    </h4>

                    <p className="text-xs text-black/70 font-light leading-relaxed mb-4">
                      {selectedService.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {selectedService.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-black/80 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7057D9] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/8 mt-4">
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-[#7057D9] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Deploy Squad</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

          </div>

          {/* Bottom Dismiss Bar */}
          <div className="w-full pt-4 mt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-xs text-black/60 font-mono gap-2">
            <span>
              ✦ CONCEPT: Physical Action Button hardware trigger &bull; 8 Mobile Engineering Modules with Skeleton Loaders
            </span>
            <button
              onClick={onClose}
              className="text-[#7057D9] hover:underline font-sans text-xs"
            >
              Return to Services &rarr;
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
