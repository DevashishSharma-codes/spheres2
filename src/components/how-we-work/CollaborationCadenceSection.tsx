"use client";

import React from "react";
import { MessageSquare, Video, GitPullRequest, Calendar, Check, Shield, ArrowUpRight } from "lucide-react";

interface CadenceItem {
  number: string;
  title: string;
  cadence: string;
  icon: React.ElementType;
  description: string;
  perks: string[];
  tooling: string;
}

const CADENCE_ITEMS: CadenceItem[] = [
  {
    number: "01",
    title: "Direct Slack & Discord Connect",
    cadence: "REAL-TIME &bull; ASYNC-FIRST",
    icon: MessageSquare,
    description: "No account manager telephone game. Your team collaborates directly with our lead system architects, AI researchers, and frontend engineers.",
    perks: [
      "Dedicated Slack Connect or Discord private channels",
      "< 30 minute response time during active sprint windows",
      "Direct code and architecture triage with staff engineers",
      "Immediate incident & blocker escalation"
    ],
    tooling: "Slack Connect &bull; Discord Enterprise"
  },
  {
    number: "02",
    title: "Daily Async Video Walkthroughs",
    cadence: "DAILY DISPATCHES",
    icon: Video,
    description: "We hate wasteful status meetings. Every major PR and feature increment is accompanied by a crisp 3-minute Loom demo explaining the mechanics and UX.",
    perks: [
      "Zero calendar bloat — watch on your own schedule",
      "Visual and technical side-by-side diff walkthroughs",
      "Permanent architectural documentation for onboarding",
      "Interactive time-stamped questions and feedback"
    ],
    tooling: "Loom &bull; GitHub PR Comments"
  },
  {
    number: "03",
    title: "Deterministic Friday Staging Deployments",
    cadence: "WEEKLY STAGING RELEASE",
    icon: Calendar,
    description: "Every Friday at 17:00 UTC, a live production-grade build is published to your dedicated staging edge node, complete with a structured changelog.",
    perks: [
      "Predictable testing cadence for your stakeholders",
      "Automated changelog with linked git commits",
      "Automated regression test reports attached",
      "Zero-risk staging isolated from live data"
    ],
    tooling: "Cloudflare Edge &bull; Vercel Preview"
  },
  {
    number: "04",
    title: "100% Transparent Git Repositories",
    cadence: "CONTINUOUS &bull; COMMIT #1",
    icon: GitPullRequest,
    description: "We work directly in your GitHub organization or transfer upon milestone completion. You review every branch, commit, and CI/CD workflow as it happens.",
    perks: [
      "Full admin privileges from day zero",
      "Auditable commit history and signed commits",
      "Automated linting and test workflows in your repo",
      "Zero vendor lock-in or proprietary cloaking"
    ],
    tooling: "GitHub Enterprise &bull; Linear"
  }
];

export function CollaborationCadenceSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#DADADD]/70">
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-medium tracking-wider text-[#7057D9] mb-4 uppercase">
              <span className="w-1.5 h-1.5 rounded-none bg-[#7057D9]" />
              <span>COLLABORATION RHYTHM // ZERO FRICTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.04em] text-black leading-tight">
              Radical transparency, zero meeting fatigue.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed">
              We operate as a high-velocity extension of your core engineering team with direct access, continuous async dispatches, and weekly live releases.
            </p>
          </div>
        </div>

        {/* 4 Cadence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CADENCE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="p-6 sm:p-7 bg-[#FAF9F7] border border-[#DADADD] rounded-none flex flex-col justify-between hover:border-[#7057D9] transition-all group"
              >
                <div>
                  
                  {/* Top Bar: Number & Cadence Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold text-[#7057D9]">
                      {item.number} // CADENCE
                    </span>
                    <span 
                      className="text-[10px] font-mono px-2 py-0.5 bg-white border border-[#DADADD] text-black/60 rounded-none uppercase"
                      dangerouslySetInnerHTML={{ __html: item.cadence }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 bg-white border border-[#DADADD] text-[#7057D9] flex items-center justify-center mb-5 group-hover:border-[#7057D9] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-normal text-black mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Perks Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#DADADD]/70">
                    {item.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-black/75 leading-tight font-light">
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Footer Tooling Tag */}
                <div 
                  className="pt-3 border-t border-[#DADADD] text-[11px] font-mono text-black/50 flex items-center justify-between"
                  dangerouslySetInnerHTML={{ __html: item.tooling }}
                />

              </div>
            );
          })}
        </div>

        {/* Bottom Metric Strip */}
        <div className="mt-8 p-6 bg-white border border-[#DADADD] rounded-none grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-light text-black">&lt; 30 min</div>
            <div className="text-xs font-mono text-black/55 uppercase mt-1">Average Slack Response</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-light text-black">100%</div>
            <div className="text-xs font-mono text-black/55 uppercase mt-1">Direct Staff Engineer Access</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-light text-black">Weekly</div>
            <div className="text-xs font-mono text-black/55 uppercase mt-1">Preview Edge Deployments</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-light text-black">0 hrs</div>
            <div className="text-xs font-mono text-black/55 uppercase mt-1">Status Meeting Bloat</div>
          </div>
        </div>

      </div>
    </section>
  );
}
