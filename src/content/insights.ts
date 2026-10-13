import { InsightItem } from "@/types";

export const INSIGHTS_CONTENT = {
  eyebrow: "06 // INSIGHTS & RFCs",
  title: "Engineering memos, architecture essays, and system postmortems.",
  lead: "Field notes from our engineering squads detailing distributed system designs, latency optimizations, and autonomous agent orchestration.",
  items: [
    {
      id: "rfc-01",
      slug: "architecting-multi-carrier-gateways",
      title: "How We Scaled a Multi-Carrier Insurance Gateway to 100+ Concurrent Underwriting APIs",
      date: "OCT 2026",
      readTime: "7 MIN READ",
      category: "DISTRIBUTED SYSTEMS",
      excerpt: "Dissecting the fan-out architecture, timeout circuit breakers, and schema normalization protocols necessary to aggregate disparate carrier payloads in under 2.4 seconds.",
    },
    {
      id: "rfc-02",
      slug: "zero-hallucination-multi-agent-graphs",
      title: "Eliminating Hallucinations in Multi-Agent LLM Clusters Using Directed Acyclic Graphs",
      date: "SEP 2026",
      readTime: "11 MIN READ",
      category: "AI ARCHITECTURE",
      excerpt: "Why single-prompt LLM chains fail in production, and how hierarchical critic agents with strict Pydantic schemas enforce deterministic tool executions.",
    },
    {
      id: "rfc-03",
      slug: "120-fps-react-19-financial-dashboards",
      title: "Rendering 500,000 Financial Data Points at 120 FPS Without Dropping a Single Frame",
      date: "AUG 2026",
      readTime: "6 MIN READ",
      category: "FRONTEND PERFORMANCE",
      excerpt: "Leveraging Web Workers, offscreen HTML5 Canvas buffers, and React 19 concurrent features to build instantaneous wealth terminals.",
    },
  ] as InsightItem[],
};
