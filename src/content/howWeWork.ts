import { WorkStepItem } from "@/types";

export const HOW_WE_WORK_CONTENT = {
  eyebrow: "02 // HOW WE WORK",
  title: "A deterministic 4-stage engineering sprint methodology.",
  lead: "From zero-to-one problem synthesis to production edge deployment, our methodology eliminates surprises and accelerates time-to-market with disciplined sprint cadences.",
  steps: [
    {
      step: "01",
      name: "Architectural RFC & Problem Synthesis",
      duration: "48 – 72 Hours",
      summary: "We dissect requirements, eliminate ambiguities, define strict API contracts, and draft database schemas before writing production code.",
      deliverables: ["Systems Topology Diagram", "Data Contract Specification", "Latency & SLA Budgets", "Security & Auth Threat Model"],
    },
    {
      step: "02",
      name: "Core Engine & Agent Infrastructure",
      duration: "Week 1 – Week 2",
      summary: "Constructing high-throughput distributed microservices, multi-agent LLM reasoning loops, and deterministic vector pipelines.",
      deliverables: ["Multi-Agent Logic Graph", "Vector Database Indexing", "Automated Integration Test Harness", "Edge Routing Gateway"],
    },
    {
      step: "03",
      name: "120 FPS Tactile Interface Lab",
      duration: "Week 3 – Week 4",
      summary: "Engineering fluid, keyboard-navigable interfaces in Next.js and TypeScript with spring physics, optimistic mutations, and zero layout shift.",
      deliverables: ["Design System & Tokens", "Optimistic State Management", "Micro-Interactions & Animations", "Multi-Device Polish"],
    },
    {
      step: "04",
      name: "Edge Hardening & Production Fleet Handover",
      duration: "Week 5 Onward",
      summary: "Rolling out production fleets across global edge nodes, calibrating telemetry monitors, and handing over complete repository ownership.",
      deliverables: ["Zero-Downtime CI/CD Pipeline", "Real-Time Telemetry Dashboard", "Security Compliance Audit", "100% Repository Handover"],
    },
  ] as WorkStepItem[],
};
