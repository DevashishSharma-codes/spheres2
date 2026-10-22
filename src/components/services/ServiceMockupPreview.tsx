"use client";

import React from "react";
import { 
  Globe, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Workflow, 
  Layout, 
  Rocket, 
  Building2, 
  Terminal,
  Activity,
  Zap,
  Lock,
  ArrowRight
} from "lucide-react";

interface ServiceMockupPreviewProps {
  serviceId: string;
}

export function ServiceMockupPreview({ serviceId }: ServiceMockupPreviewProps) {
  // 1. WEB APPLICATION DEVELOPMENT: Mac Web Window UI with Glassmorphism Skeletons
  if (serviceId === "web-application-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#1E1E24] to-[#141418] border border-white/10 p-3 shadow-md overflow-hidden relative text-left">
        {/* macOS Window Header */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 text-[9px] font-mono text-white/70">
            <Lock className="w-2.5 h-2.5 text-green-400" />
            <span>app.21spheres.com/edge</span>
          </div>
          <span className="text-[9px] font-mono text-white/40">Next.js 15</span>
        </div>

        {/* Transparent Glassmorphism Glassy Skeletons */}
        <div className="space-y-2">
          {/* Glass stat cards */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10">
              <span className="text-[8px] font-mono text-white/50 block">P99 LATENCY</span>
              <span className="text-[11px] font-mono text-green-400 font-semibold">&lt; 18ms</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10">
              <span className="text-[8px] font-mono text-white/50 block">STREAMING</span>
              <span className="text-[11px] font-mono text-[#8E79E8] font-semibold">React 19</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10">
              <span className="text-[8px] font-mono text-white/50 block">THROUGHPUT</span>
              <span className="text-[11px] font-mono text-white font-semibold">1.4M/sec</span>
            </div>
          </div>

          {/* Shimmering glass chart line skeleton */}
          <div className="p-2.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="h-1.5 rounded-full bg-white/20 animate-pulse w-24" />
              <div className="h-1.5 rounded-full bg-[#7057D9]/40 animate-pulse w-12" />
            </div>
            {/* Waveform / graph bars */}
            <div className="h-8 flex items-end gap-1 px-1">
              {[35, 55, 40, 75, 60, 90, 85, 100, 70, 80, 95, 100].map((val, i) => (
                <div
                  key={i}
                  style={{ height: `${val}%` }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7057D9]/40 to-[#8E79E8] opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. CUSTOM AI DEVELOPMENT: Neural Compute & Model Matrix
  if (serviceId === "custom-ai-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#191922] to-[#101015] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-[#8E79E8] flex items-center gap-1">
            <Cpu className="w-3 h-3" /> CUDA:0 // TENSORRT
          </span>
          <span className="text-green-400">3.4x Inference</span>
        </div>
        <div className="space-y-1.5">
          <div className="p-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/70">LoRA Parameter Weights</span>
            <span className="text-amber-300">FP16 Quantized</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/8 text-[9px] font-mono text-white/60">
              <div className="h-1.5 bg-purple-400/30 rounded-full animate-pulse w-3/4 mb-1" />
              <span>Loss: 0.0142 P99</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/8 text-[9px] font-mono text-white/60">
              <div className="h-1.5 bg-green-400/30 rounded-full animate-pulse w-2/3 mb-1" />
              <span>GPU Util: 98.6%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. LLM INTEGRATION: RAG & Reasoning Vector Cluster
  if (serviceId === "llm-integration") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#1A1829] to-[#12101E] border border-[#7057D9]/30 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> RAG ORCHESTRATION
          </span>
          <span className="text-white/50">LangGraph</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
            <span>Dense + Sparse Hybrid Search</span>
            <span className="text-green-400">&lt; 38ms</span>
          </div>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#7057D9] via-purple-300 to-transparent w-full animate-pulse" />
          <div className="flex items-center gap-1 pt-1">
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">Qdrant</span>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">Claude 3.7</span>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-green-500/20 text-green-300">0 Hallucination</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. CHATBOT DEVELOPMENT: Voice & Conversation Cockpit
  if (serviceId === "chatbot-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#181D24] to-[#11141A] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-cyan-400 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> VOICE STREAMING
          </span>
          <span className="text-white/60">&lt; 280ms P95</span>
        </div>
        <div className="space-y-1.5">
          <div className="p-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-[9.5px] font-mono text-white/80">ElevenLabs + Whisper Live</span>
            </div>
            {/* Audio Waveform Skeleton */}
            <div className="flex items-center gap-1 h-5 px-1">
              {[20, 50, 90, 40, 80, 100, 60, 30, 75, 45, 95, 60, 30].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-cyan-400/70 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. WORKFLOW AUTOMATION: Visual DAG Flow
  if (serviceId === "workflow-automation") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#1C1A24] to-[#121118] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-amber-400 flex items-center gap-1">
            <Workflow className="w-3 h-3" /> EVENT PIPELINE
          </span>
          <span className="text-white/50">Temporal + Kafka</span>
        </div>
        <div className="flex items-center justify-between gap-1 p-2 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10">
          <div className="p-1.5 rounded-lg bg-[#7057D9]/20 border border-[#7057D9]/40 text-[9px] font-mono text-white">
            Trigger
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#7057D9] to-cyan-400" />
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-mono text-white">
            OCR/AI
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400 to-green-400" />
          <div className="p-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-[9px] font-mono text-white">
            ERP Sync
          </div>
        </div>
      </div>
    );
  }

  // 6. WEBSITE DEVELOPMENT: 3D Shader Viewport
  if (serviceId === "website-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#171922] to-[#0E1015] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-violet-400 flex items-center gap-1">
            <Layout className="w-3 h-3" /> THREE.JS / WEBGL
          </span>
          <span className="text-green-400 font-bold">100 / 100</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-white block">Kinetic Shaders</span>
            <span className="text-[8.5px] font-mono text-white/50">Zero Layout Shift (CLS 0.0)</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-500/20 text-green-300">
            60–120 FPS
          </span>
        </div>
      </div>
    );
  }

  // 7. SAAS DEVELOPMENT: Multi-Tenant Cockpit
  if (serviceId === "saas-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#181926] to-[#10101C] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-indigo-400 flex items-center gap-1">
            <Rocket className="w-3 h-3" /> MULTI-TENANT SAAS
          </span>
          <span className="text-green-400">Stripe Live</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10">
            <span className="text-[8px] font-mono text-white/50 block">MONTHLY RECURRING</span>
            <span className="text-[11px] font-mono text-white font-semibold">$124,500</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10">
            <span className="text-[8px] font-mono text-white/50 block">ENTERPRISE SSO</span>
            <span className="text-[11px] font-mono text-indigo-300 font-semibold">SAML / Okta</span>
          </div>
        </div>
      </div>
    );
  }

  // 8. ENTERPRISE SOFTWARE DEVELOPMENT: Cluster Telemetry
  if (serviceId === "enterprise-software-development") {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#1A1A22] to-[#111116] border border-white/10 p-3 text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
          <span className="text-rose-400 flex items-center gap-1">
            <Building2 className="w-3 h-3" /> KUBERNETES FLEET
          </span>
          <span className="text-green-400">99.999% SLA</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[9px] font-mono text-white/70">
            <span>gRPC Microservices Mesh</span>
            <span className="text-green-400">● Healthy (32 Pods)</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/20 animate-pulse w-4/5" />
        </div>
      </div>
    );
  }

  // 9. CUSTOM SOFTWARE DEVELOPMENT: Compiler & Internal Tools
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#1A1824] to-[#100F17] border border-white/10 p-3 text-left">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9.5px] font-mono">
        <span className="text-[#8E79E8] flex items-center gap-1">
          <Terminal className="w-3 h-3" /> BESPOKE RUNTIME
        </span>
        <span className="text-white/60">Rust + C++</span>
      </div>
      <div className="p-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80 space-y-0.5">
        <div className="text-green-400">$ cargo build --release --target=native</div>
        <div className="text-white/60">&gt; Compiled in 1.42s with zero warnings</div>
      </div>
    </div>
  );
}
