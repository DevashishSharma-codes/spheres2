"use client";

import React from "react";
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, GitCommit } from "lucide-react";

export function HowWeWorkHero() {
  return (
    <section className="relative z-0 overflow-hidden bg-white border-b border-[#DADADD]/70 pt-20 sm:pt-28 pb-16 sm:pb-20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] bg-[#8E79E8]/08" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-[#7057D9]/06" />
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Eyebrow & Title */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-medium tracking-wider text-[#7057D9] mb-4 uppercase">
            <span className="w-1.5 h-1.5 rounded-none bg-[#7057D9] animate-pulse" />
            <span>02 // HOW WE WORK &bull; SPRINT METHODOLOGY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-light tracking-[-0.04em] leading-[1.05] text-black mb-6">
            A deterministic 4-stage engineering sprint methodology.
          </h1>

          <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed max-w-3xl">
            From zero-to-one problem synthesis to production edge deployment, our methodology eliminates architectural surprises and accelerates time-to-market with disciplined sprint cadences.
          </p>
        </div>

        {/* Sprint Guarantees Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/10">
          
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium text-black">48–72h Initial RFC</div>
              <p className="text-xs text-black/55 font-light leading-snug mt-0.5">
                Technical topology &amp; data schemas finalized before code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <GitCommit className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium text-black">Weekly Live Releases</div>
              <p className="text-xs text-black/55 font-light leading-snug mt-0.5">
                Continuous staging previews with automated test suites.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium text-black">Zero Technical Debt</div>
              <p className="text-xs text-black/55 font-light leading-snug mt-0.5">
                Strict TypeScript invariants and modular architecture.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium text-black">100% Repository IP</div>
              <p className="text-xs text-black/55 font-light leading-snug mt-0.5">
                Complete commit history &amp; infrastructure ownership.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
