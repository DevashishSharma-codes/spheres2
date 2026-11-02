"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const STAGE_NAV_LABELS = ["Discovery", "Architecture", "Design", "Development", "QA & Security", "Launch & Support"];

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
    <section id="sprint-stages" className="scroll-mt-20 bg-white pb-12 text-[#17151B] sm:pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-7 sm:px-8 sm:pt-9 lg:px-12 lg:pt-10">
        <header className="grid gap-4 border-b border-[#E7E4EC] pb-5 sm:pb-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#7653D6] sm:text-xs">Our process / six stages</p>
            <h2 id="deterministic-milestones" className="max-w-5xl text-[clamp(3.2rem,6.8vw,6.2rem)] font-light leading-[0.92] tracking-[-0.06em] text-[#15131A] scroll-mt-24">From first brief to launch.</h2>
          </div>
          <div className="lg:justify-self-end lg:max-w-md">
            <p className="text-xs leading-relaxed text-[#625D69] sm:text-sm">One accountable team takes your product from discovery through engineering and launch, with visible work at every stage.</p>
            <div className="mt-2 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.16em] text-[#7B7483]"><span className="h-px w-7 bg-[#7653D6]" />Stage {activeStage.step} of 06 <span className="text-[#C0BBC8]">·</span> {activeStage.duration}</div>
          </div>
        </header>

        <nav aria-label="Process stages" className="relative my-4 overflow-x-auto px-0 py-2 text-[#1B1920] sm:my-5 sm:px-1 sm:py-2.5 [scrollbar-width:thin] [scrollbar-color:#A8A4B0_transparent]">
          <div className="relative min-w-[840px] sm:min-w-0">
            <div aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-[76px] h-[8px] bg-[repeating-linear-gradient(90deg,rgba(67,65,77,.42)_0_3px,transparent_3px_8px)]" />
            <div aria-hidden="true" className="absolute left-[8.33%] top-[76px] h-[8px] bg-[repeating-linear-gradient(90deg,#57BCE8_0_3px,transparent_3px_8px)] transition-[width] duration-500" style={{ width: `${(activeStageIndex / (STAGES.length - 1)) * 83.34}%` }} />
            <div className="relative grid grid-cols-6">
              {STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return <button key={stage.id} type="button" onClick={() => setActiveStageIndex(idx)} aria-current={isActive ? "step" : undefined} className="group relative flex h-[106px] min-w-0 flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#378AB8]">
                  <span className={`z-10 inline-flex h-[36px] w-[132px] shrink-0 items-center justify-center rounded-full border px-2 text-[10px] leading-tight backdrop-blur-xl transition ${isActive ? "border-white/35 bg-[rgba(32,33,40,0.84)] text-white shadow-[0_4px_16px_rgba(20,21,29,.22)]" : "border-[#777681]/35 bg-[rgba(48,48,57,0.72)] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.16)] group-hover:bg-[rgba(60,60,70,0.84)]"}`}>{STAGE_NAV_LABELS[idx]}</span>
                  <span aria-hidden="true" className={`h-[45px] w-px ${idx <= activeStageIndex ? "bg-gradient-to-b from-[#8B8792] to-[#56BFEA]" : "bg-[#8A8691]/60"}`} />
                  <span aria-hidden="true" className={`absolute top-[67px] z-10 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-white/75 bg-[radial-gradient(circle_at_35%_35%,#FFFFFF_0%,#A8DCEF_22%,#46505F_58%,#20212A_90%)] shadow-[0_0_10px_rgba(60,152,192,.48)] transition-transform group-hover:scale-125 ${isActive ? "ring-2 ring-[#55BDE9]/35" : ""}`}><span className={`h-[5px] w-[5px] rounded-full ${idx <= activeStageIndex ? "bg-white shadow-[0_0_6px_#fff]" : "bg-white/85"}`} /></span>
                </button>;
              })}
            </div>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div key={activeStage.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: "easeOut" }} className="grid border-b border-[#E7E4EC] lg:grid-cols-12">
            <div className="py-8 sm:py-10 lg:col-span-7 lg:py-12 lg:pr-12">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7653D6]">Stage {activeStage.step} / {activeStage.room}</p>
                  <h3 className="max-w-3xl text-3xl font-light leading-[1.03] tracking-[-0.045em] sm:text-5xl">{activeStage.name}</h3>
                  <p className="mt-3 text-sm font-medium text-[#7653D6]">{activeStage.tagline}</p>
                </div>
                <span className="hidden shrink-0 border border-[#DCD6E8] px-3 py-2 font-mono text-[10px] text-[#625D69] sm:block">{activeStage.duration}</span>
              </div>

              <div className="grid gap-5 border-t border-[#E7E4EC] pt-5 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8491]">The focus</p>
                  <p className="text-sm leading-[1.8] text-[#514C57]">{activeStage.summary}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8491]">How we move it forward</p>
                  <ul className="space-y-2.5">
                    {activeStage.execution.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#514C57]"><span className="pt-0.5 font-mono text-[10px] text-[#7653D6]">0{index + 1}</span>{item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-[#E7E4EC] pt-5">
                <div className="mb-4 flex items-center justify-between gap-3"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8491]">What you can review</p><span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#A09AA6]">Stage outputs</span></div>
                <div className="grid border-l border-t border-[#E7E4EC] sm:grid-cols-2">
                  {activeStage.deliverables.map((deliverable, index) => {
                    const tones = ["bg-[#F1F6FF]", "bg-[#F4F0FC]", "bg-[#FFF4EA]", "bg-[#EFF8F4]"];
                    const markers = ["text-[#4477C4]", "text-[#7653D6]", "text-[#C46C2C]", "text-[#31866B]"];
                    return <article key={deliverable.title} className={`min-h-[105px] border-b border-r border-[#E7E4EC] p-4 sm:p-5 ${tones[index % tones.length]}`}><p className={`mb-3 font-mono text-[9px] tracking-[0.14em] ${markers[index % markers.length]}`}>0{index + 1}</p><h4 className="text-sm font-medium text-[#24212A]">{deliverable.title}</h4><p className="mt-2 text-xs leading-relaxed text-[#625D69]">{deliverable.desc}</p></article>;
                  })}
                </div>
              </div>
            </div>

            <aside className="border-t border-[#E7E4EC] py-7 sm:py-9 lg:col-span-5 lg:border-l lg:border-t-0 lg:py-12 lg:pl-8">
              <div className="mb-4 flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8491]">Inside this stage</p><span className="font-mono text-[9px] text-[#A09AA6]">FIG. 0{activeStage.step}</span></div>
              <div className="relative aspect-[1.2/1] overflow-hidden border border-[#D9D5E0] bg-gradient-to-br from-[#E6F4FF] via-[#F4EFFC] to-[#FFF0E4]">
                <Image src={activeStage.image} alt={`${activeStage.name} visual`} fill priority sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17121F]/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">{activeStage.room}</p><p className="mt-1 text-lg font-light tracking-tight sm:text-xl">{activeStage.name}</p></div>
              </div>
              <div className="mt-4 grid grid-cols-3 border-l border-t border-[#E7E4EC]">
                {activeStage.metrics.map((metric, index) => {
                  const metricTones = ["bg-[#F1F6FF]", "bg-[#F4F0FC]", "bg-[#FFF4EA]"];
                  return <div key={metric.label} className={`min-h-[74px] border-b border-r border-[#E7E4EC] p-3 ${metricTones[index % metricTones.length]}`}><span className="block text-sm font-medium text-[#25212C]">{metric.value}</span><span className="mt-1 block text-[10px] leading-snug text-[#625D69]">{metric.label}</span></div>;
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">{activeStage.techStack.map((tech) => <span key={tech} className="border border-[#E7E4EC] bg-white px-2.5 py-1.5 text-[10px] text-[#625D69]">{tech}</span>)}</div>
            </aside>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between py-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8A8491]">{activeStage.step} / 06 <span className="mx-2 text-[#C8C3CE]">·</span> {activeStage.duration}</span>
          <button type="button" onClick={() => setActiveStageIndex((prev) => (prev + 1) % STAGES.length)} className="group inline-flex items-center gap-2 text-xs font-medium text-[#7653D6] hover:text-[#241934]">Next stage <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
        </div>
      </div>
    </section>
  );
}

export default SprintStagesSection;
