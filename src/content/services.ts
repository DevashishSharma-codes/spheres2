import { ServiceItem } from "@/types";

export const SERVICES_CONTENT = {
  eyebrow: "03 // SERVICES & SQUADS",
  title: "Precision engineering across the modern technology stack.",
  lead: "We deploy dedicated engineering squads with deep domain mastery in autonomous AI pipelines, low-latency web platforms, and native mobile apps.",
  services: [
    {
      id: "autonomous-ai",
      number: "01",
      title: "Autonomous AI Agents & RAG",
      headline: "Sub-50ms inference workflows and multi-agent reasoning loops.",
      description: "We build custom LLM orchestration graphs, vector retrieval clusters (Qdrant, pgvector), and deterministic tool-calling workflows that eliminate hallucinations.",
      features: [
        "Multi-agent consensus graphs (LangGraph, Python)",
        "Dense-sparse hybrid vector indexing & retrieval",
        "Deterministic guardrails & schema validation",
        "Edge-cached model response gateways",
      ],
      tags: ["Python", "LangGraph", "Qdrant", "Claude 3.7", "FastAPI"],
    },
    {
      id: "web-platforms",
      number: "02",
      title: "High-Scale Web Platforms",
      headline: "Ultra-fast Next.js and React 19 web applications built for scale.",
      description: "Full-stack web architecture with server-driven streaming, atomic state management, and sub-second page transitions optimized for Google Web Vitals.",
      features: [
        "Next.js App Router & React 19 server components",
        "High-frequency data streaming via WebSockets",
        "Tailwind CSS design systems & design tokens",
        "Edge API routing and micro-caching",
      ],
      tags: ["Next.js", "TypeScript", "React 19", "Tailwind CSS", "Node.js"],
    },
    {
      id: "mobile-apps",
      number: "03",
      title: "Native Mobile Engineering",
      headline: "Fluid iOS and Android experiences that feel instantaneous.",
      description: "Mobile applications designed with 120Hz gesture physics, robust offline-first synchronization, and secure biometric authentication.",
      features: [
        "React Native & Expo cross-platform architectures",
        "Offline-first local SQLite / WatermelonDB sync",
        "Hardware-accelerated animations & haptics",
        "Automated App Store & Play Store deployment pipelines",
      ],
      tags: ["React Native", "Expo", "iOS", "Android", "TypeScript"],
    },
    {
      id: "cloud-infra",
      number: "04",
      title: "Cloud Infrastructure & Edge",
      headline: "Resilient serverless topology and global edge distribution.",
      description: "Bank-grade infrastructure engineered on AWS and Cloudflare with zero-trust security policies, multi-region database replication, and 99.99% uptime SLAs.",
      features: [
        "Cloudflare Workers & Vercel Edge compute",
        "PostgreSQL, Redis, and ClickHouse data pipelines",
        "Terraform & Docker container orchestration",
        "SOC2-ready logging and real-time telemetry",
      ],
      tags: ["AWS", "Cloudflare", "PostgreSQL", "Redis", "Docker"],
    },
  ] as ServiceItem[],
};
