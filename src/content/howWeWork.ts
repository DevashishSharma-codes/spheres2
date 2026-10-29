import { WorkStepItem } from "@/types";

export interface HowWeWorkStep {
  step: string;
  id: string;
  room: string;
  tag: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  coord: { top: string; left: string };
}

export const WORK_FLOORPLAN_STEPS: HowWeWorkStep[] = [
  {
    step: "01",
    id: "discovery-srs",
    room: "DISCOVERY & SRS",
    tag: "REQUIREMENTS_SPEC",
    title: "Discovery & SRS Design",
    description: "Deep-dive stakeholder workshops to uncover business goals, map user journeys, and establish an exhaustive Software Requirements Specification (SRS). We define technical boundaries, eliminate architectural ambiguity, and prioritize high-impact deliverables for a deterministic engineering roadmap.",
    tags: ["SRS Specification", "User Research", "Scoping & Roadmap"],
    image: "/how-we-work/stage-1-discovery-srs.jpg",
    coord: { top: "22%", left: "24%" },
  },
  {
    step: "02",
    id: "architecture-stack",
    room: "ARCHITECTURE & TECH",
    tag: "SYSTEM_TOPOLOGY",
    title: "Architecture & Tech Stack Selection",
    description: "Architecting resilient system topology, relational and vector data schemas, and strongly-typed API contracts tailored for extreme throughput. We select future-proof, high-performance tech stacks, establish deterministic guardrails, and blueprint cloud infrastructure for low-latency scalability.",
    tags: ["System Architecture", "Tech Stack Audit", "Database Schema"],
    image: "/how-we-work/stage-2-architecture-stack.jpg",
    coord: { top: "22%", left: "54%" },
  },
  {
    step: "03",
    id: "ui-ux-prototyping",
    room: "UI/UX & PROTOTYPING",
    tag: "120FPS_TACTILE_UX",
    title: "UI/UX Design & Prototyping",
    description: "Crafting intuitive user experiences, comprehensive design systems, and tactile interactive prototypes with 120fps fluid micro-interactions. Every viewport is thoroughly user-tested to ensure zero cognitive friction, aesthetic elegance, and flawless cross-device responsiveness before writing a line of code.",
    tags: ["Design System", "Figma Prototyping", "Micro-Interactions"],
    image: "/how-we-work/stage-3-ui-ux-prototyping.jpg",
    coord: { top: "48%", left: "81%" },
  },
  {
    step: "04",
    id: "agile-development",
    room: "AGILE & INTEGRATION",
    tag: "SPRINT_ENGINEERING",
    title: "Agile Development & Integration",
    description: "Iterative two-week sprints building modular frontends, robust microservices, autonomous agent pipelines, and third-party integrations. Clean codebases adhere to strict design patterns with continuous milestone demos, automated PR verification, and daily transparent tracking.",
    tags: ["Agile Sprints", "Full-Stack Dev", "API Integration"],
    image: "/how-we-work/stage-4-agile-development.jpg",
    coord: { top: "48%", left: "24%" },
  },
  {
    step: "05",
    id: "qa-security-testing",
    room: "QA & SECURITY LAB",
    tag: "ZERO_VULNERABILITY",
    title: "QA, Security & Testing",
    description: "Rigorous automated integration suites, end-to-end regression suites, cross-platform QA, and edge-case stress verification under heavy loads. We conduct comprehensive static analysis, vulnerability scanning, and cryptographic audits to guarantee zero critical security leaks.",
    tags: ["Automated Testing", "Security Auditing", "Cross-Platform QA"],
    image: "/how-we-work/stage-5-qa-security-testing.jpg",
    coord: { top: "75%", left: "20%" },
  },
  {
    step: "06",
    id: "deployment-launch-support",
    room: "DEPLOYMENT & SUPPORT",
    tag: "24_7_SLA_SUPPORT",
    title: "Deployment, Launch & Support",
    description: "Zero-downtime blue/green production rollouts, multi-region CDN edge routing, real-time telemetry, and smooth go-live orchestration. Following launch, we deliver 24/7 proactive observability, automated self-healing alerts, and dedicated engineering SLAs for uninterrupted uptime.",
    tags: ["Production Launch", "CI/CD & Edge", "24/7 Monitoring"],
    image: "/how-we-work/stage-6-deployment-launch-support.jpg",
    coord: { top: "75%", left: "82%" },
  },
];

export const HOW_WE_WORK_CONTENT = {
  eyebrow: "02 // HOW WE WORK",
  title: "A deterministic 6-stage engineering sprint methodology.",
  lead: "From discovery and architectural design to full-scale deployment and 24/7 support, our methodology eliminates surprises and accelerates time-to-market with disciplined cadences.",
  steps: [
    {
      step: "01",
      name: "Discovery & SRS Design",
      duration: "Week 1",
      summary: "Deep-dive workshops to uncover core business goals, map user journeys, and establish exhaustive Software Requirements Specifications (SRS).",
      deliverables: ["Software Requirements Spec (SRS)", "User Journey Mapping", "Feature Prioritization Matrix", "Project Roadmap & Milestones"],
    },
    {
      step: "02",
      name: "Architecture & Tech Stack Selection",
      duration: "Week 1 – Week 2",
      summary: "Architecting resilient system topology, data schemas, API contracts, and selecting high-performance modern tech stacks tailored for scalability.",
      deliverables: ["Systems Topology Blueprint", "Tech Stack Architecture RFC", "Database Schema & Indexing", "API Contract Specifications"],
    },
    {
      step: "03",
      name: "UI/UX Design & Prototyping",
      duration: "Week 2 – Week 3",
      summary: "Crafting intuitive user experiences, design systems, and interactive clickable prototypes with meticulous attention to aesthetics and flow.",
      deliverables: ["Design System & Tokens", "Figma Interactive Prototypes", "Micro-Interactions & Motion", "Accessibility & UX Review"],
    },
    {
      step: "04",
      name: "Agile Development & Integration",
      duration: "Week 3 – Week 5",
      summary: "Iterative two-week sprints building modular frontends, robust backend microservices, third-party integrations, and continuous milestone reviews.",
      deliverables: ["Clean Modular Codebase", "Frontend & Backend Sprints", "Third-Party API Integrations", "Weekly Demo Environments"],
    },
    {
      step: "05",
      name: "QA, Security & Testing",
      duration: "Week 5 – Week 6",
      summary: "Rigorous automated integration tests, cross-device QA, edge-case validation, and comprehensive security vulnerability audits.",
      deliverables: ["Automated E2E Test Suite", "Security & Vulnerability Audit", "Performance & Load Testing", "Cross-Browser & Device QA"],
    },
    {
      step: "06",
      name: "Deployment, Launch & Support",
      duration: "Week 6 Onward",
      summary: "Zero-downtime production rollout, CDN edge routing, telemetry setup, smooth go-live orchestration, and dedicated ongoing maintenance.",
      deliverables: ["Zero-Downtime Deployment", "CI/CD & Edge Routing", "Real-Time Telemetry & APM", "Post-Launch 24/7 Support & SLA"],
    },
  ] as WorkStepItem[],
};

