"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Smartphone, 
  Globe, 
  Sparkles, 
  MessageSquare, 
  Workflow, 
  Layout, 
  Rocket, 
  Building2, 
  Terminal,
  Zap,
  ShieldCheck,
  Clock,
  Layers
} from "lucide-react";
import { ServiceItem } from "@/types";
import Link from "next/link";

interface ServiceDetailDrawerProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenInPhone: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

export function ServiceDetailDrawer({ service, onClose, onOpenInPhone }: ServiceDetailDrawerProps) {
  if (!service) return null;

  const IconComponent = ICON_MAP[service.icon || "Cpu"] || Cpu;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all"
        />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg h-full bg-white border-l border-[#DADADD] shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
        >
          <div>
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DADADD]/70 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#7057D9] px-2 py-0.5 rounded bg-[#7057D9]/10">
                  {service.number} // SPECIFICATION
                </span>
                <span className="text-xs font-mono text-black/50 uppercase">
                  {service.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Icon */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-tight text-black">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-[#7057D9] mt-0.5">
                  {service.metric}
                </p>
              </div>
            </div>

            {/* Headline */}
            <p className="text-sm font-medium text-black/90 mb-3">
              {service.headline}
            </p>

            {/* Description */}
            <p className="text-sm font-light text-black/70 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Core Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-black/50 mb-3">
                Key Technical Deliverables:
              </h4>
              <div className="space-y-2.5">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-black/80 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#7057D9] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-black/50 mb-2.5">
                Modern Runtime Stack:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[#FAF9F7] border border-[#DADADD] text-black/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Button link */}
            <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#DADADD] mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-medium text-[#7057D9] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> INTERACTIVE SIMULATOR
                </span>
              </div>
              <p className="text-xs text-black/70 font-light mb-3">
                Test how this service integrates with the iPhone 16 Pro Action Button and Dynamic Island architecture.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInPhone(service.id);
                }}
                className="w-full py-2 px-3 rounded-lg bg-white border border-[#7057D9]/40 hover:border-[#7057D9] text-[#7057D9] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open in iPhone 3D Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#DADADD] flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-black hover:bg-[#7057D9] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[10px] font-mono text-center text-black/50">
              45–60 MIN TECHNICAL AUDIT &bull; ZERO OBLIGATION
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
