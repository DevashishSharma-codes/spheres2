"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  FileCode, 
  Sparkles, 
  Terminal, 
  Check, 
  ExternalLink,
  ChevronRight,
  Zap,
  Activity,
  Lock,
  Heart,
  Plus,
  PhoneCall,
  FileText,
  Users
} from "lucide-react";

export interface StageDetailItem {
  id: string;
  step: string;
  name: string;
  room: string;
  duration: string;
  tagline: string;
  image: string;
  summary: string;
  execution: string[];
  deliverables: { title: string; desc: string }[];
  metrics: { label: string; value: string }[];
  techStack: string[];
}

const STAGES: StageDetailItem[] = [
  {
    id: "discovery-srs",
    step: "01",
    name: "Discovery & SRS Design",
    room: "DISCOVERY & REQUIREMENTS LAB",
    duration: "Week 1",
    tagline: "Deterministic Scope, Clear Architecture",
    image: "/how-we-work/stage-1-discovery-srs.jpg",
    summary: "Collaborative stakeholder workshops to translate high-level business vision into an exhaustive, unambiguous Software Requirements Specification (SRS). We establish deterministic acceptance criteria, map end-to-end user journeys, and eliminate scope ambiguity before engineering commences.",
    execution: [
      "Stakeholder interviews to distill product goals and technical boundaries.",
      "Persona journey mapping with edge-case stress identification.",
      "Feature prioritization matrix (MoSCoW) separating MVP from post-launch horizons."
    ],
    deliverables: [
      { title: "Software Requirements Spec (SRS)", desc: "Exhaustive functional and technical document with deterministic acceptance criteria." },
      { title: "User Journey & Experience Flows", desc: "Granular persona workflows, permission states, and edge-case handling routes." },
      { title: "Feature Priority Matrix", desc: "Structured priority hierarchy defining milestone boundaries and MVP releases." },
      { title: "Deterministic Sprint Roadmap", desc: "Time-bound execution blueprint with weekly deliverables and sign-off criteria." }
    ],
    metrics: [
      { label: "Acceptance Criteria", value: "100% Defined" },
      { label: "Scope Ambiguity", value: "Zero Tolerance" },
      { label: "Sign-Off Status", value: "RFC Approved" }
    ],
    techStack: ["SRS Specification", "User Research", "MoSCoW Matrix", "Roadmapping", "OpenAPI 3.1"]
  },
  {
    id: "architecture-stack",
    step: "02",
    name: "Architecture & Tech Stack Selection",
    room: "SYSTEMS TOPOLOGY & CLOUD LAB",
    duration: "Week 1 – Week 2",
    tagline: "Low-Latency Topology & Resilient Schemas",
    image: "/how-we-work/stage-2-architecture-stack.jpg",
    summary: "Architecting a resilient, low-latency system topology designed for extreme scale. We formalize relational and vector data schemas, write strongly-typed API contracts, evaluate cloud infrastructure, and establish deterministic latency and security budgets.",
    execution: [
      "Cloud topology mapping including caching tiers and event-driven worker queues.",
      "Relational (PostgreSQL) and vector (pgvector) database schema modeling.",
      "Strict TypeScript RPC / OpenAPI 3.1 interface contracts with Zod validation."
    ],
    deliverables: [
      { title: "Systems Topology RFC", desc: "Cloud infrastructure diagrams, microservice boundaries, and caching layers." },
      { title: "Relational & Vector Schemas", desc: "Normalized SQL migrations, indexing strategies, and vector embeddings design." },
      { title: "End-to-End Typed API Contracts", desc: "Shared TypeScript interfaces and Zod schemas guaranteeing compile-time safety." },
      { title: "Latency & SLA Budgets", desc: "P95 and P99 latency constraints defined for every core query and API route." }
    ],
    metrics: [
      { label: "P95 Latency Target", value: "< 35ms Global" },
      { label: "Data Integrity", value: "100% Typed" },
      { label: "Architecture RFC", value: "Peer Reviewed" }
    ],
    techStack: ["PostgreSQL", "pgvector", "TypeScript", "FastAPI / Node", "Cloudflare Edge", "Redis"]
  },
  {
    id: "ui-ux-prototyping",
    step: "03",
    name: "UI/UX Design & Prototyping",
    room: "TACTILE INTERFACE & DESIGN LAB",
    duration: "Week 2 – Week 3",
    tagline: "Tactile Interactivity & 120fps Fluidity",
    image: "/how-we-work/stage-3-ui-ux-prototyping.jpg",
    summary: "Translating system architecture into an aesthetic, intuitive, and tactile digital interface. We build a comprehensive design token system, high-fidelity responsive components, and interactive prototypes with fluid 120fps motion design.",
    execution: [
      "Bespoke design system tokens for color, typography, spacing, and micro-motions.",
      "Interactive clickable Figma prototype simulating real application logic.",
      "Multi-device responsive parity audits across mobile, tablet, desktop, and ultra-wide."
    ],
    deliverables: [
      { title: "Design System & Tokens", desc: "Modular, accessible UI component library built for speed and visual consistency." },
      { title: "Interactive Clickable Prototype", desc: "Clickable prototypes validating workflows before frontend engineering begins." },
      { title: "Tactile Motion & Animation Specs", desc: "Hardware-accelerated spring curves tuned for fluid 120fps tactile feel." },
      { title: "Accessibility (WCAG 2.1) Audit", desc: "Color contrast, screen reader semantics, and keyboard navigation verified." }
    ],
    metrics: [
      { label: "Motion Performance", value: "120 FPS Fluid" },
      { label: "Accessibility", value: "WCAG 2.1 AA" },
      { label: "Device Coverage", value: "Mobile to 4K" }
    ],
    techStack: ["Figma Prototyping", "Design Tokens", "Framer Motion", "Tailwind CSS", "Atomic Design"]
  },
  {
    id: "agile-development",
    step: "04",
    name: "Agile Development & Integration",
    room: "SPRINT EXECUTION & CODE LAB",
    duration: "Week 3 – Week 5",
    tagline: "High-Frequency Cadence & Clean Engineering",
    image: "/how-we-work/stage-4-agile-development.jpg",
    summary: "Iterative two-week engineering sprints building clean, modular software. We construct high-throughput backend services, autonomous agent pipelines, responsive frontends, and third-party integrations with continuous PR preview deployments.",
    execution: [
      "Rapid two-week sprint cadences with automated CI/CD staging environments.",
      "Full-stack implementation adhering strictly to agreed architectural contracts.",
      "Third-party service integrations (authentication, payments, AI models, webhooks)."
    ],
    deliverables: [
      { title: "Modular Full-Stack Codebase", desc: "Production-ready TypeScript frontend with scalable backend services." },
      { title: "API & Event Integrations", desc: "Robust third-party integrations with idempotent retries and error isolation." },
      { title: "Automated Preview Deployments", desc: "Live PR environments updated on every push for stakeholder visibility." },
      { title: "Autonomous Agent Workflows", desc: "Multi-agent pipelines configured with deterministic guardrails and fallback logic." }
    ],
    metrics: [
      { label: "Sprint Cadence", value: "2-Week Sprints" },
      { label: "Deploy Frequency", value: "Continuous PR" },
      { label: "Test Coverage", value: "> 90% Core" }
    ],
    techStack: ["Next.js App Router", "TypeScript", "FastAPI / Node", "BullMQ / Redis", "Docker", "Tailwind CSS"]
  },
  {
    id: "qa-security-testing",
    step: "05",
    name: "QA, Security & Testing",
    room: "QA & SECURITY AUDIT LAB",
    duration: "Week 5 – Week 6",
    tagline: "Zero Vulnerability & Deep Stress Hardening",
    image: "/how-we-work/stage-5-qa-security-testing.jpg",
    summary: "Exhaustive automated verification and security hardening. We execute Playwright end-to-end regression suites, simulate peak load concurrency with k6, and perform deep static analysis and vulnerability scanning to ensure bulletproof reliability.",
    execution: [
      "Automated Playwright regression suites verifying critical user workflows.",
      "Stress and concurrency benchmarking simulating up to 10,000 requests/sec.",
      "OWASP Top 10 vulnerability scan, dependency audit, and secret exposure checks."
    ],
    deliverables: [
      { title: "Automated E2E Test Suite", desc: "Comprehensive Playwright test suite integrated into CI for regression prevention." },
      { title: "Security Vulnerability Report", desc: "Independent audit confirming zero high-severity CVEs or data exposure risks." },
      { title: "Load & Concurrency Benchmark", desc: "Empirical proof of latency resilience under peak simulated user traffic." },
      { title: "Cross-Platform QA Sign-Off", desc: "Verified functional fidelity across Chrome, Safari, Firefox, iOS, and Android." }
    ],
    metrics: [
      { label: "CVE Vulnerabilities", value: "Zero Critical" },
      { label: "E2E Test Pass Rate", value: "100% Green" },
      { label: "Stress Capacity", value: "10k req/sec" }
    ],
    techStack: ["Playwright", "Jest", "k6 Stress Testing", "OWASP Security", "Snyk / Dependabot"]
  },
  {
    id: "deployment-launch-support",
    step: "06",
    name: "Deployment, Launch & Support",
    room: "PRODUCTION EDGE & SLA LAB",
    duration: "Week 6 Onward",
    tagline: "Zero-Downtime Rollout & Dedicated SLAs",
    image: "/how-we-work/stage-6-deployment-launch-support.jpg",
    summary: "Zero-downtime production launch and dedicated post-go-live engineering support. We orchestrate blue/green rollouts, configure edge caching and real-time observability telemetry, and provide complete repository ownership transfer.",
    execution: [
      "Blue/green zero-downtime deployment with automated rollback safeguards.",
      "Multi-region CDN edge caching, SSL termination, and DNS optimization.",
      "Real-time APM telemetry, error tracking, and automated 24/7 alerting setup."
    ],
    deliverables: [
      { title: "Zero-Downtime Edge Fleet", desc: "Globally distributed production infrastructure with instant automated failover." },
      { title: "Real-Time Telemetry Dashboard", desc: "Live APM observability tracking uptime, request latency, and error thresholds." },
      { title: "100% Repository Transfer", desc: "Complete git ownership, Docker manifests, CI/CD scripts, and operational runbooks." },
      { title: "Ongoing SLA Engineering", desc: "Guaranteed uptime, proactive performance tuning, and technical advisory." }
    ],
    metrics: [
      { label: "Uptime SLA", value: "99.95% Target" },
      { label: "Rollout Downtime", value: "0ms Seamless" },
      { label: "IP & Code Transfer", value: "100% Client Owned" }
    ],
    techStack: ["Cloudflare Edge", "Docker / K8s", "Datadog / Sentry", "Vercel Enterprise", "GitHub Actions"]
  }
];

// =========================================================
// ACETERNITY UI: THREE COLUMN FEATURES WITH IMAGE
// Specific high-impact presentation for Stage 01: Discovery & SRS Design
// =========================================================
interface DiscoverySrsThreeColumnFeaturesProps {
  onNextStage: () => void;
}

function DiscoverySrsThreeColumnFeatures({ onNextStage }: DiscoverySrsThreeColumnFeaturesProps) {
  return (
    <div className="w-full flex flex-col justify-between">
      {/* Stage Title & Tagline */}
      <div className="mb-7">
        <h3 className="text-2xl sm:text-3xl font-light tracking-[-0.03em] text-[#111114] mb-1">
          Discovery &amp; SRS Design
        </h3>
        <p className="text-xs sm:text-[13px] text-[#7C3AED] font-medium tracking-tight">
          Deterministic Scope, Clear Architecture
        </p>
      </div>

      {/* 3-Column Features Grid matching 21Spheres Design & Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* =========================================================
            COLUMN 1: DETERMINISTIC SCOPE MATRIX UI CARD
        ========================================================= */}
        <div className="flex flex-col">
          {/* Top Card Container: Inspo Gradient (Soft Sky Blue to Warm Peach) */}
          <div className="relative h-[340px] sm:h-[370px] rounded-[24px] bg-gradient-to-b from-[#C2DCFD] via-[#DEE7F4] to-[#F9ECD9] p-5 sm:p-6 flex items-center justify-center border border-[#BED7FA]/80 shadow-xs overflow-hidden group">
            {/* Floating White Deterministic Scope Matrix Card */}
            <div className="relative w-full max-w-[260px] bg-white rounded-2xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(30,58,110,0.08)] border border-white/90">
              <div className="text-[12.5px] font-semibold text-[#180E2E] tracking-tight mb-3 flex items-center justify-between">
                <span>Deterministic Scope Matrix</span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200/60 font-semibold">
                  SRS v1.0
                </span>
              </div>

              {/* Stakeholder 1: Principal AI Architect */}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-white shadow-xs shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Alexander V."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#111114] leading-tight">
                      Alexander V.
                    </span>
                    <span className="text-[10px] text-[#64748B] font-light">
                      21Spheres Principal Architect
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-purple-50/80 border border-purple-200/60 flex items-center justify-center text-[#7C3AED] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Stakeholder 2: Enterprise Partner */}
              <div className="relative flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-white shadow-xs shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Sarah Chen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#111114] leading-tight">
                      Sarah Chen
                    </span>
                    <span className="text-[10px] text-[#64748B] font-light">
                      VP Engineering &amp; Systems
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-purple-50/80 border border-purple-200/60 flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="pt-5 sm:pt-6">
            <h4 className="text-lg sm:text-xl font-medium text-[#111114] tracking-tight leading-snug mb-2">
              Stakeholder Alignment &amp; Scoping
            </h4>
            <p className="text-xs sm:text-[13px] text-[#6E6E73] font-light leading-relaxed">
              Collaborative workshops distill business goals, map user journeys, and eliminate scope ambiguity before engineering commences.
            </p>
          </div>
        </div>

        {/* =========================================================
            COLUMN 2: DISCOVERY LAB / USER JOURNEY SHOWCASE
        ========================================================= */}
        <div className="flex flex-col">
          {/* Top Card Container: Discovery & Requirements Lab Visual */}
          <div className="relative h-[340px] sm:h-[370px] rounded-[24px] overflow-hidden bg-slate-900 border border-[#E5E5EA] shadow-xs group">
            <Image
              src="/how-we-work/stage-1-discovery-srs.jpg"
              alt="Discovery & Requirements Lab"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Ambient Lighting Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

            {/* Bottom Glassmorphic Persona & Edge-Case Tag */}
            <div className="absolute inset-x-3 bottom-3 z-10 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span className="text-[10px] font-mono font-medium text-[#111114]">
                  Persona &amp; Edge-Case Stress Map
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-semibold">
                100% Defined
              </span>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="pt-5 sm:pt-6">
            <h4 className="text-lg sm:text-xl font-medium text-[#111114] tracking-tight leading-snug mb-2">
              User Journey &amp; Edge-Case Stress
            </h4>
            <p className="text-xs sm:text-[13px] text-[#6E6E73] font-light leading-relaxed">
              Granular persona journey mapping, permission state modeling, and edge-case stress identification ensure bulletproof system behavior across every critical user path.
            </p>
          </div>
        </div>

        {/* =========================================================
            COLUMN 3: 5-DAY DISCOVERY SPRINT TIMELINE
        ========================================================= */}
        <div className="flex flex-col">
          {/* Top Card Container: Inspo Gradient (Warm Peach to Soft Sky Blue) */}
          <div className="relative h-[340px] sm:h-[370px] rounded-[24px] bg-gradient-to-b from-[#FDD8AE] via-[#EBE2DC] to-[#C6DBF8] p-5 sm:p-6 flex flex-col justify-center items-center border border-[#F4CDA0]/80 shadow-xs overflow-hidden">
            {/* Connected Vertical Timeline Line */}
            <div className="absolute top-10 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#B8987C]/35 z-0" />

            <div className="relative z-10 w-full max-w-[245px] flex flex-col items-center gap-2.5">
              
              {/* Timeline Node 1: Stakeholder Discovery Workshop */}
              <div className="w-full bg-white rounded-xl py-2 px-3 shadow-xs border border-white/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                    <Users className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-medium text-[#1E293B]">
                    Stakeholder Workshop
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-[#86868B] shrink-0">
                  Day 01
                </span>
              </div>

              {/* Timeline Node 2: User Journeys & API Schema Mapped */}
              <div className="w-full bg-white rounded-xl py-2 px-3 shadow-xs border border-white/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 text-[#6366F1] flex items-center justify-center shrink-0">
                    <FileCode className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-medium text-[#1E293B]">
                    User Journey &amp; Schemas
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-[#86868B] shrink-0">
                  Day 03
                </span>
              </div>

              {/* Timeline Node 3: Deterministic SRS Sign-Off with Sub-Pills */}
              <div className="w-full bg-white rounded-xl p-3 shadow-xs border border-white/90 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-medium text-[#1E293B]">
                      Deterministic SRS Sign-Off
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#86868B] shrink-0">
                    Day 05
                  </span>
                </div>

                <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
                  <div className="inline-flex items-center text-[9.5px] font-mono text-[#475569] bg-[#F8FAFC] px-2 py-0.5 rounded-md border border-gray-200/50">
                    Acceptance Criteria &rarr; 100% Codified
                  </div>
                  <div className="inline-flex items-center text-[9.5px] font-mono text-[#475569] bg-[#F8FAFC] px-2 py-0.5 rounded-md border border-gray-200/50">
                    Scope Ambiguity &rarr; Zero Tolerance
                  </div>
                  <div className="inline-flex items-center text-[9.5px] font-mono text-[#475569] bg-[#F8FAFC] px-2 py-0.5 rounded-md border border-gray-200/50">
                    Sprint Roadmap &rarr; Milestone Ready
                  </div>
                </div>
              </div>

              {/* Node 4: Plus Circle Button */}
              <div className="w-6 h-6 rounded-full bg-[#180E2E] text-white flex items-center justify-center shadow-xs">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>

            </div>
          </div>

          {/* Narrative Text */}
          <div className="pt-5 sm:pt-6">
            <h4 className="text-lg sm:text-xl font-medium text-[#111114] tracking-tight leading-snug mb-2">
              Audited SRS &amp; Deterministic Roadmap
            </h4>
            <p className="text-xs sm:text-[13px] text-[#6E6E73] font-light leading-relaxed">
              Every discovery session produces audited specifications, verifiable acceptance contracts, and an RFC-approved blueprint so engineering commences with zero ambiguity.
            </p>
          </div>
        </div>

      </div>

      {/* Progression & Next Stage Link */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#E5E5EA]">
        <span className="text-xs text-[#86868B] font-light">
          Progression: 01 / 06
        </span>
        
        <button
          type="button"
          onClick={onNextStage}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] hover:text-black transition-colors cursor-pointer group"
        >
          <span>Next Stage</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export function SprintStagesSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  // Sync with URL hash if navigated from the interactive floorplan hero or "See Details" buttons
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          const foundIdx = STAGES.findIndex(s => s.id === hash || s.step === hash);
          if (foundIdx !== -1) {
            setActiveStageIndex(foundIdx);
          }
          const target = document.getElementById("deterministic-milestones") || document.getElementById("sprint-stages");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const timer = setTimeout(handleHash, 80);
    window.addEventListener("hashchange", handleHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return (
    <section 
      id="sprint-stages" 
      className="py-16 sm:py-24 bg-[#FCFCFA] border-b border-[#E5E5EA] scroll-mt-20"
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <h2 
              id="deterministic-milestones"
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.035em] text-[#111114] leading-tight scroll-mt-24"
            >
              Deterministic milestones from architecture to global edge.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-[#515154] font-light leading-relaxed">
              We eliminate black-box consulting. Every phase produces audited artifacts, executable code, and verifiable telemetry reports with full transparency.
            </p>
          </div>
        </div>

        {/* Stage Selector Tabs (6 Columns, Minimalist & Aesthetic) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-8">
          {STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isActive 
                    ? "bg-white border-[#7C3AED] shadow-[0_4px_20px_rgba(124,58,237,0.12)] ring-1 ring-[#7C3AED]" 
                    : "bg-white/80 border-[#E5E5EA] hover:bg-white hover:border-[#7C3AED]/40 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono font-semibold tracking-wider ${isActive ? "text-[#7C3AED]" : "text-[#86868B]"}`}>
                    0{idx + 1}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[9.5px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#7C3AED]/10 text-[#7C3AED]" : "bg-[#F5F5F7] text-[#86868B]"
                  }`}>
                    <Clock className="w-2.5 h-2.5" />
                    {stage.duration}
                  </span>
                </div>

                <div className={`text-xs sm:text-[12.5px] font-medium leading-snug line-clamp-2 ${isActive ? "text-[#111114] font-semibold" : "text-[#4A4A50]"}`}>
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card (Split Layout: Relevant Info & Deliverables on Left + Beautiful Image Showcase on Right) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white border border-[#E5E5EA] rounded-[26px] p-6 sm:p-9 lg:p-11 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            {activeStage.id === "discovery-srs" ? (
              <DiscoverySrsThreeColumnFeatures 
                onNextStage={() => setActiveStageIndex((prev) => (prev + 1) % STAGES.length)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Stage Detail, Deliverables & Methodology (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Title & Tagline */}
                    <h3 className="text-2xl sm:text-3xl font-light tracking-[-0.03em] text-[#111114] mb-1">
                      {activeStage.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#7C3AED] font-medium tracking-tight mb-4">
                      {activeStage.tagline}
                    </p>

                    {/* Summary Lead */}
                    <p className="text-xs sm:text-[13.5px] text-[#515154] font-light leading-relaxed mb-6">
                      {activeStage.summary}
                    </p>

                    {/* Verifiable Deliverables Grid (2x2) */}
                    <div className="mb-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] mb-2.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span>VERIFIABLE DELIVERABLES &amp; ARTIFACTS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeStage.deliverables.map((deliv, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="p-3 sm:p-3.5 border border-[#E5E5EA] bg-[#FCFCFA] rounded-xl hover:border-[#7C3AED]/40 hover:bg-white transition-all duration-200"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-4 h-4 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                              <span className="text-xs sm:text-[12.5px] font-medium text-[#111114] tracking-tight">
                                {deliv.title}
                              </span>
                            </div>
                            <p className="text-[11px] sm:text-[11.5px] text-[#6E6E73] font-light leading-relaxed pl-6">
                              {deliv.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Sprint Execution Protocol */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] mb-2.5 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span>SPRINT EXECUTION PROTOCOL</span>
                      </div>

                      <div className="space-y-1.5">
                        {activeStage.execution.map((item, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2.5 text-xs text-[#515154] leading-relaxed">
                            <span className="font-mono text-[10.5px] font-semibold text-[#7C3AED] mt-0.5">
                              0{eIdx + 1}.
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Column: Curated Pinterest-Grade High-Resolution Image & Metric Showcase (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  
                  {/* Image Showcase Card */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-[#E5E5EA] shadow-md group">
                    <Image
                      src={activeStage.image}
                      alt={activeStage.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Bottom Glassmorphic Metric Card */}
                    <div className="absolute inset-x-3 bottom-3 z-10 p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/70 shadow-md">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#7C3AED] font-semibold mb-2 flex items-center justify-between">
                        <span>AUDITED PHASE CRITERIA</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100">
                        {activeStage.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="flex flex-col">
                            <span className="text-xs sm:text-[13px] font-semibold text-[#111114] tracking-tight">
                              {m.value}
                            </span>
                            <span className="text-[9.5px] text-[#86868B] font-light leading-snug">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Next Stage Navigation Link */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E5EA]">
                    <span className="text-xs text-[#86868B] font-light">
                      Progression: {activeStage.step} / 06
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setActiveStageIndex((prev) => (prev + 1) % STAGES.length)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] hover:text-black transition-colors cursor-pointer group"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

export default SprintStagesSection;
