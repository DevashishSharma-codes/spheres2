"use client";

import React, { useState } from "react";
import { 
  FileCode, 
  Cpu, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  GitBranch, 
  Sliders, 
  Activity,
  Check,
  Zap,
  Lock,
  ChevronRight
} from "lucide-react";
import { HOW_WE_WORK_CONTENT } from "@/content/howWeWork";

interface StageDetail {
  id: string;
  step: string;
  name: string;
  duration: string;
  badge: string;
  summary: string;
  detailedProcess: string[];
  deliverables: { title: string; desc: string }[];
  tags: string[];
  artifactType: "rfc" | "agent" | "ui" | "edge";
}

const STAGES: StageDetail[] = [
  {
    id: "01",
    step: "01",
    name: "Architectural RFC & Problem Synthesis",
    duration: "48 – 72 Hours",
    badge: "STAGE 01 // FOUNDATION",
    summary: "We dissect requirements, eliminate ambiguities, define strict API contracts, and draft database schemas before writing a single line of production code.",
    detailedProcess: [
      "Decompose product specs into deterministic engineering acceptance criteria.",
      "Model PostgreSQL / vector schemas with strict relational constraints and indexing.",
      "Draft OpenAPI 3.1 & TypeScript RPC contracts with input/output Zod validation.",
      "Publish an RFC document to your team for formal architectural sign-off."
    ],
    deliverables: [
      { title: "Systems Topology RFC", desc: "Complete architectural blueprint, cloud topology, and data flow map." },
      { title: "Strict Data Contracts", desc: "Zod schemas and TypeScript types shared across client and server." },
      { title: "Latency & SLA Budgets", desc: "Defined P95/P99 latency constraints for every endpoint and microservice." },
      { title: "Threat & Auth Model", desc: "Row-level security, JWT rotation, and OAuth/RBAC boundary definitions." }
    ],
    tags: ["OpenAPI 3.1", "TypeScript", "PostgreSQL", "Zod", "System Topology"],
    artifactType: "rfc"
  },
  {
    id: "02",
    step: "02",
    name: "Core Engine & Agent Infrastructure",
    duration: "Week 1 – Week 2",
    badge: "STAGE 02 // INTELLIGENCE",
    summary: "Constructing high-throughput distributed microservices, multi-agent LLM reasoning loops, and deterministic vector pipelines.",
    detailedProcess: [
      "Implement multi-agent supervisor loops with stateful context management.",
      "Build hybrid semantic vector search pipelines with reranking and semantic deduplication.",
      "Write automated integration tests with simulated edge-case adversarial prompts.",
      "Deploy low-latency background workers and event queues (BullMQ / Temporal)."
    ],
    deliverables: [
      { title: "Multi-Agent Graph", desc: "LangGraph / custom state machine with automated fallback strategies." },
      { title: "Vector Indexing Engine", desc: "Pinecone / pgvector cluster with sub-50ms hybrid similarity retrieval." },
      { title: "Automated Test Harness", desc: "End-to-end integration suite covering 100% of critical business workflows." },
      { title: "Streaming Gateway", desc: "Server-Sent Events (SSE) and WebSocket streams for real-time tokens." }
    ],
    tags: ["LangGraph", "pgvector", "Redis/BullMQ", "FastAPI", "Python/Rust"],
    artifactType: "agent"
  },
  {
    id: "03",
    step: "03",
    name: "120 FPS Tactile Interface Lab",
    duration: "Week 3 – Week 4",
    badge: "STAGE 03 // SURFACE",
    summary: "Engineering fluid, keyboard-navigable interfaces in Next.js and TypeScript with spring physics, optimistic mutations, and zero layout shift.",
    detailedProcess: [
      "Construct a bespoke design system with CSS custom properties and atomic tokens.",
      "Implement optimistic mutations so user actions render in 0ms before server confirmation.",
      "Fine-tune spring animations and micro-interactions for tactile desktop-class feel.",
      "Audit Core Web Vitals to achieve 100/100 performance and zero Cumulative Layout Shift."
    ],
    deliverables: [
      { title: "Design Tokens & System", desc: "Modular, accessible components built without bloated third-party wrappers." },
      { title: "Optimistic State Engine", desc: "Instantaneous mutations with automatic rollback on network anomalies." },
      { title: "Spring Physics Engine", desc: "Framer Motion tuned transitions matching native operating system standards." },
      { title: "Responsive Multi-Screen", desc: "Pixel-perfect rendering tested across mobile, tablet, and ultra-wide viewports." }
    ],
    tags: ["Next.js App Router", "React 19", "Framer Motion", "Tailwind CSS", "120 FPS"],
    artifactType: "ui"
  },
  {
    id: "04",
    step: "04",
    name: "Edge Hardening & Production Fleet Handover",
    duration: "Week 5 Onward",
    badge: "STAGE 04 // DEPLOYMENT",
    summary: "Rolling out production fleets across global edge nodes, calibrating telemetry monitors, and handing over complete repository ownership.",
    detailedProcess: [
      "Configure zero-downtime blue/green deployment workflows with automated rollbacks.",
      "Hook up distributed tracing, APM, and error alerting (Datadog / Sentry / Prometheus).",
      "Conduct automated load testing up to 10,000 requests/sec with stress-scenario verification.",
      "Execute complete GitHub organization transfer with environment keys and runbooks."
    ],
    deliverables: [
      { title: "Zero-Downtime CI/CD", desc: "Automated GitHub Actions pipelines with lint, test, and preview environments." },
      { title: "Real-Time Telemetry", desc: "Grafana / Datadog dashboards monitoring P99 latency, error rates, and CPU." },
      { title: "Security & SOC2 Audit", desc: "Dependency CVE scanning, OWASP Top 10 mitigation, and audit report." },
      { title: "100% Repository Transfer", desc: "Full git ownership, Docker manifests, architecture documentation, and runbooks." }
    ],
    tags: ["GitHub Actions", "Docker / K8s", "Cloudflare Edge", "Datadog", "Terraform"],
    artifactType: "edge"
  }
];

export function SprintStagesSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  // Artifact sub-tab for Stage 01
  const [rfcTab, setRfcTab] = useState<"spec" | "schema" | "sla">("spec");
  
  // Interactive spring physics demo for Stage 03
  const [stiffness, setStiffness] = useState(380);
  const [damping, setDamping] = useState(28);
  const [isDemoActive, setIsDemoActive] = useState(false);

  return (
    <section id="sprint-stages" className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-[#DADADD]/70">
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-medium tracking-wider text-[#7057D9] mb-4 uppercase">
              <span className="w-1.5 h-1.5 rounded-none bg-[#7057D9]" />
              <span>THE 4-STAGE SPRINT CADENCE // ZERO SURPRISES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.04em] text-black leading-tight">
              Deterministic milestones from architecture to global edge.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed">
              We eliminate black-box consulting. Every phase produces audited artifacts, executable code, and verifiable telemetry reports with full transparency.
            </p>
          </div>
        </div>

        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`text-left p-4 sm:p-5 border transition-all rounded-none relative cursor-pointer ${
                  isActive 
                    ? "bg-white border-[#7057D9] shadow-sm" 
                    : "bg-white/60 border-[#DADADD] hover:bg-white hover:border-[#7057D9]/40"
                }`}
              >
                {/* Active Indicator Top Border */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#7057D9]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-semibold ${isActive ? "text-[#7057D9]" : "text-black/40"}`}>
                    STAGE {stage.step}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-black/55 bg-black/5 px-2 py-0.5 rounded-none">
                    <Clock className="w-3 h-3 text-black/40" />
                    {stage.duration}
                  </span>
                </div>

                <div className={`text-sm sm:text-base font-medium leading-snug line-clamp-1 ${isActive ? "text-black" : "text-black/75"}`}>
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="bg-white border border-[#DADADD] rounded-none p-6 sm:p-10 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Stage Detail (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                
                {/* Eyebrow & Duration Badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-[#7057D9]/10 text-[#7057D9] border border-[#7057D9]/20 rounded-none uppercase">
                    {activeStage.badge}
                  </span>
                  <span className="text-[11px] font-mono text-black/60 px-2.5 py-1 bg-black/5 border border-black/10 rounded-none flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7057D9]" />
                    <span>TIMELINE: {activeStage.duration.toUpperCase()}</span>
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-black mb-4">
                  {activeStage.name}
                </h3>

                {/* Summary Lead */}
                <p className="text-base sm:text-lg text-black/75 font-light leading-relaxed mb-8">
                  {activeStage.summary}
                </p>

                {/* Engineering Process Steps */}
                <div className="mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-black/50 mb-3 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#7057D9]" />
                    <span>ENGINEERING SPRINT EXECUTION</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeStage.detailedProcess.map((proc, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 p-3 bg-[#FAF9F7] border border-[#DADADD]/60 rounded-none">
                        <div className="w-5 h-5 bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-semibold">
                          {pIdx + 1}
                        </div>
                        <p className="text-sm text-black/85 font-normal leading-relaxed">
                          {proc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Deliverables Grid */}
                <div className="mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-black/50 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>VERIFIABLE DELIVERABLES HANDOVER</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStage.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="p-3.5 border border-[#DADADD] bg-white rounded-none hover:border-[#7057D9]/40 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-sm font-medium text-black">{deliv.title}</span>
                        </div>
                        <p className="text-xs text-black/60 font-light leading-snug pl-6">
                          {deliv.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#DADADD]/70">
                  <span className="text-xs font-mono text-black/45 mr-1">TECH STACK:</span>
                  {activeStage.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 bg-[#FAF9F7] border border-[#DADADD] text-black/75 rounded-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            {/* Right Column: Live Interactive Artifact Preview (5 cols) */}
            <div className="lg:col-span-5 bg-[#18181B] text-white p-6 sm:p-7 border border-black/20 rounded-none shadow-sm min-h-[480px] flex flex-col justify-between">
              
              {/* Artifact Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-none bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-none bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-none bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-white/50 pl-2">
                    {activeStage.artifactType === "rfc" && "rfc_v1.0.ts — Systems Spec"}
                    {activeStage.artifactType === "agent" && "agent_graph.py — State Machine"}
                    {activeStage.artifactType === "ui" && "interface_lab.tsx — 120 FPS Lab"}
                    {activeStage.artifactType === "edge" && "edge_fleet.yaml — CI/CD Telemetry"}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-none">
                  LIVE ARTIFACT
                </span>
              </div>

              {/* Artifact Content based on Stage */}
              <div className="flex-1 font-mono text-xs text-white/85 flex flex-col justify-center">
                
                {/* STAGE 01: Interactive RFC Spec */}
                {activeStage.artifactType === "rfc" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[11px] pb-2 border-b border-white/10">
                      <button 
                        onClick={() => setRfcTab("spec")}
                        className={`px-2.5 py-1 rounded-none transition-colors ${rfcTab === "spec" ? "bg-[#7057D9] text-white" : "text-white/60 hover:text-white"}`}
                      >
                        Topology.rfc
                      </button>
                      <button 
                        onClick={() => setRfcTab("schema")}
                        className={`px-2.5 py-1 rounded-none transition-colors ${rfcTab === "schema" ? "bg-[#7057D9] text-white" : "text-white/60 hover:text-white"}`}
                      >
                        Schema.prisma
                      </button>
                      <button 
                        onClick={() => setRfcTab("sla")}
                        className={`px-2.5 py-1 rounded-none transition-colors ${rfcTab === "sla" ? "bg-[#7057D9] text-white" : "text-white/60 hover:text-white"}`}
                      >
                        SLA_Budget.json
                      </button>
                    </div>

                    {rfcTab === "spec" && (
                      <div className="space-y-1.5 leading-relaxed text-[11px] text-white/80 overflow-x-auto">
                        <div className="text-purple-400">/** @rfc 21S-RFC-048 Problem Synthesis */</div>
                        <div><span className="text-blue-400">export interface</span> <span className="text-amber-300">SystemArchitecture</span> &#123;</div>
                        <div className="pl-4">edgeGateway: <span className="text-emerald-400">&apos;Cloudflare Workers&apos;</span>;</div>
                        <div className="pl-4">inferenceEngine: <span className="text-emerald-400">&apos;vLLM + DeepSeek/Claude 3.7&apos;</span>;</div>
                        <div className="pl-4">vectorCluster: <span className="text-emerald-400">&apos;pgvector + HNSW Index&apos;</span>;</div>
                        <div className="pl-4">p95LatencyBudget: <span className="text-amber-400">&apos;&lt; 28ms&apos;</span>;</div>
                        <div className="pl-4">authEnforcement: <span className="text-emerald-400">&apos;Ed25519 JWT + RLS&apos;</span>;</div>
                        <div>&#125;</div>
                        <div className="pt-2 text-white/40">// RFC Status: APPROVED &bull; Version 1.0.4</div>
                      </div>
                    )}

                    {rfcTab === "schema" && (
                      <div className="space-y-1.5 leading-relaxed text-[11px] text-white/80 overflow-x-auto">
                        <div className="text-purple-400">// Strict PostgreSQL Data Contract</div>
                        <div><span className="text-blue-400">model</span> <span className="text-amber-300">AgentExecutionLoop</span> &#123;</div>
                        <div className="pl-4">id          String   @id @default(uuid())</div>
                        <div className="pl-4">sessionHash String   @db.VarChar(64)</div>
                        <div className="pl-4">embedding   Unsupported(&apos;vector(1536)&apos;)</div>
                        <div className="pl-4">latencyMs   Int</div>
                        <div className="pl-4">status      ExecutionState @default(SETTLED)</div>
                        <div>&#125;</div>
                      </div>
                    )}

                    {rfcTab === "sla" && (
                      <div className="space-y-2 text-[11px] p-3 bg-black/40 border border-white/10">
                        <div className="flex justify-between items-center text-white/70">
                          <span>Edge Cold Start Budget:</span>
                          <span className="text-emerald-400 font-bold">&lt; 15ms [PASS]</span>
                        </div>
                        <div className="flex justify-between items-center text-white/70">
                          <span>Vector RAG Retrieval P95:</span>
                          <span className="text-emerald-400 font-bold">&lt; 32ms [PASS]</span>
                        </div>
                        <div className="flex justify-between items-center text-white/70">
                          <span>Full Page TTFB (Global):</span>
                          <span className="text-emerald-400 font-bold">&lt; 45ms [PASS]</span>
                        </div>
                        <div className="flex justify-between items-center text-white/70">
                          <span>Database Query Latency P99:</span>
                          <span className="text-emerald-400 font-bold">&lt; 8ms [PASS]</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STAGE 02: Multi-Agent Logic Graph */}
                {activeStage.artifactType === "agent" && (
                  <div className="space-y-4">
                    <div className="text-[11px] text-white/50 mb-2">
                      ACTIVE MULTI-AGENT INFERENCE GRAPH:
                    </div>

                    {/* Visual DAG Nodes */}
                    <div className="space-y-2.5">
                      <div className="p-2.5 bg-black/50 border border-white/15 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-blue-400 animate-pulse" />
                          <span className="text-blue-300 font-bold">Node 1: Dispatcher Router</span>
                        </div>
                        <span className="text-[10px] text-white/50">Zero-Shot Intent</span>
                      </div>

                      <div className="flex justify-center text-white/30 text-xs py-0.5">
                        &darr; [Streams Token Context]
                      </div>

                      <div className="p-2.5 bg-black/50 border border-[#7057D9]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-[#7057D9] animate-pulse" />
                          <span className="text-purple-300 font-bold">Node 2: Vector RAG Swarm</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">1,420 tokens/s</span>
                      </div>

                      <div className="flex justify-center text-white/30 text-xs py-0.5">
                        &darr; [Evaluator Verification]
                      </div>

                      <div className="p-2.5 bg-black/50 border border-emerald-500/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-emerald-400" />
                          <span className="text-emerald-300 font-bold">Node 3: Deterministic Guardrail</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">100% Passed</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-white/50 flex items-center justify-between border-t border-white/10">
                      <span>Telemetry: 48 Integration Tests</span>
                      <span className="text-emerald-400 font-semibold">ALL TESTS GREEN</span>
                    </div>
                  </div>
                )}

                {/* STAGE 03: 120 FPS Tactile Interface Lab */}
                {activeStage.artifactType === "ui" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-white/60 pb-2 border-b border-white/10">
                      <span>PHYSICS BENCHMARK</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        120.0 FPS &bull; ZERO CLS
                      </span>
                    </div>

                    {/* Interactive Motion Sandbox */}
                    <div className="p-4 bg-black/60 border border-white/15 text-center">
                      <div className="text-[11px] text-white/50 mb-3">
                        CLICK BUTTON TO TEST SPRING ACCELERATION:
                      </div>
                      <button
                        onClick={() => setIsDemoActive(!isDemoActive)}
                        style={{
                          transform: isDemoActive ? "scale(0.96) translateY(2px)" : "scale(1) translateY(0px)",
                          transition: `transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)`
                        }}
                        className="px-6 py-3 bg-[#7057D9] hover:bg-[#8068E0] text-white font-mono text-xs uppercase tracking-wider border border-white/20 shadow-lg cursor-pointer select-none"
                      >
                        {isDemoActive ? "PRESSED (0ms REACTION)" : "TRIGGER TACTILE ACTION"}
                      </button>
                    </div>

                    {/* Sliders for stiffness & damping */}
                    <div className="space-y-2 text-[11px] text-white/70">
                      <div className="flex justify-between items-center">
                        <span>Spring Stiffness:</span>
                        <span className="text-purple-300 font-bold">{stiffness}</span>
                      </div>
                      <input 
                        type="range" 
                        min="200" 
                        max="600" 
                        value={stiffness} 
                        onChange={(e) => setStiffness(Number(e.target.value))}
                        className="w-full accent-[#7057D9] cursor-pointer"
                      />

                      <div className="flex justify-between items-center pt-1">
                        <span>Damping Ratio:</span>
                        <span className="text-purple-300 font-bold">{damping}</span>
                      </div>
                      <input 
                        type="range" 
                        min="15" 
                        max="50" 
                        value={damping} 
                        onChange={(e) => setDamping(Number(e.target.value))}
                        className="w-full accent-[#7057D9] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* STAGE 04: Edge Hardening & Fleet Status */}
                {activeStage.artifactType === "edge" && (
                  <div className="space-y-4">
                    <div className="text-[11px] text-white/50 mb-1 flex items-center justify-between">
                      <span>GLOBAL EDGE POP REPLICAS:</span>
                      <span className="text-emerald-400 font-semibold">FLEET HEALTHY</span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <div className="p-2.5 bg-black/50 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-emerald-400" />
                          <span>iad1 (US East • N. Virginia)</span>
                        </div>
                        <span className="text-emerald-400 font-mono">11ms • 100%</span>
                      </div>

                      <div className="p-2.5 bg-black/50 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-emerald-400" />
                          <span>fra1 (Europe • Frankfurt)</span>
                        </div>
                        <span className="text-emerald-400 font-mono">16ms • 100%</span>
                      </div>

                      <div className="p-2.5 bg-black/50 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-none bg-emerald-400" />
                          <span>sin1 (Asia Pacific • Singapore)</span>
                        </div>
                        <span className="text-emerald-400 font-mono">22ms • 100%</span>
                      </div>
                    </div>

                    {/* Transfer Status */}
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-[11px] text-emerald-200">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-300 mb-1">
                        <ShieldCheck className="w-4 h-4" />
                        <span>100% IP HANDOVER READY</span>
                      </div>
                      <p className="text-[10px] text-emerald-300/80 leading-snug">
                        Full GitHub commit history, Docker compose manifests, environment variables, and AWS/GCP IAM roles transferred.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Artifact Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>STRICT REPRODUCIBILITY GUARANTEE</span>
                <span className="text-[#7057D9] font-bold">21SPHERES CORE</span>
              </div>

            </div>

          </div>
        </div>

        {/* Next Stage Teaser Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-[#DADADD] rounded-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center font-mono text-xs font-semibold">
              &rarr;
            </div>
            <div>
              <div className="text-xs font-mono text-black/50 uppercase">
                Currently Viewing: Stage {activeStage.step} of 04
              </div>
              <div className="text-sm font-medium text-black">
                {activeStageIndex < 3 
                  ? `Next Sprint Phase: Stage ${STAGES[activeStageIndex + 1].step} — ${STAGES[activeStageIndex + 1].name}` 
                  : "Final Phase: Complete Production Fleet Handover & Ongoing Support"}
              </div>
            </div>
          </div>
          {activeStageIndex < 3 ? (
            <button
              onClick={() => setActiveStageIndex(activeStageIndex + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-[#7057D9] text-white text-xs font-mono uppercase tracking-wider transition-colors rounded-none cursor-pointer"
            >
              <span>Explore Stage {STAGES[activeStageIndex + 1].step}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveStageIndex(0)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-mono uppercase tracking-wider transition-colors rounded-none cursor-pointer"
            >
              <span>Return to Stage 01</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
