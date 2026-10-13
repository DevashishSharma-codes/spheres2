import { IndustryItem } from "@/types";

export const INDUSTRIES_CONTENT = {
  eyebrow: "05 // INDUSTRIES & DOMAINS",
  title: "Deep vertical expertise across mission-critical sectors.",
  lead: "We specialize in regulated, latency-sensitive, and high-concurrency industries where reliability and regulatory compliance cannot be compromised.",
  items: [
    {
      id: "insurtech",
      name: "InsurTech & Policy Distribution",
      description: "Multi-carrier API gateways, digital POSP brokerage portals, automated underwriting pipelines, and fraud detection systems built for sub-second quote SLAs.",
      impactMetric: "100+ Insurers Connected",
      capabilities: ["Gateway Routing", "Document Tamper OCR", "Automated Commission Ledgers", "POSP Agent Workflows"],
    },
    {
      id: "fintech",
      name: "WealthTech & Quantitative Finance",
      description: "Portfolio accounting engines, algorithmic rebalancing, Monte Carlo stress simulators, and real-time trading interfaces rendering at 120 FPS.",
      impactMetric: "$1.4B+ AUM Monitored",
      capabilities: ["Multi-Asset Aggregation", "VaR Risk Projections", "Tax-Loss Harvesting", "Client Statement PDF Core"],
    },
    {
      id: "healthtech",
      name: "Healthcare & Clinical AI",
      description: "HIPAA-conscious clinical reasoning agents, medical repertory search engines, patient symptom intake bots, and wellness recommendation systems.",
      impactMetric: "450+ Medical Texts Indexed",
      capabilities: ["Natural Language Intake", "Dense Vector Search", "Offline WebAssembly Indices", "EHR Interoperability"],
    },
    {
      id: "ai-saas",
      name: "AI Agents & Autonomous Systems",
      description: "Enterprise conversational agents, multi-agent reasoning graphs, real-time RAG ingestion pipelines, and deterministic tool-calling workflows.",
      impactMetric: "3,800+ Autonomous Tasks/hr",
      capabilities: ["LangGraph Workflows", "Vector Clustering", "Zero-Hallucination Guardrails", "Edge Response Streaming"],
    },
  ] as IndustryItem[],
};
