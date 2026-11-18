import { InsightItem } from "@/types";
import { FOUNDER_ESSAYS } from "@/content/founderNoteEssays";

/**
 * The insights are the sections of the Founder's Note (see founderNoteEssays.ts). Their title,
 * summary line and read time come from the note itself; what's here is only how each one is filed.
 */
const FILING: Record<string, Omit<InsightItem, "id" | "slug" | "title" | "excerpt" | "readTime">> = {
  "beyond-artificial-intelligence": { date: "NOV 2026", category: "AI STRATEGY", image: "/about/corp-automation.jpg", assetType: "Perspectives", industry: "Technology", topic: "AI and automation" },
  "innovation-is-not-about-following-technology-it-is-about-questioning-it": { date: "NOV 2026", category: "INNOVATION", image: "/about/corp-integration.jpg", assetType: "Perspectives", industry: "Technology", topic: "Digital engineering" },
  "engineering-reliable-ai-systems": { date: "NOV 2026", category: "AI ENGINEERING", image: "/portfolio/photos/developer.jpg", assetType: "Blogs", industry: "Technology", topic: "AI and automation" },
  "the-evolution-of-large-language-models": { date: "OCT 2026", category: "LANGUAGE MODELS", image: "/about/corp-swarms.jpg", assetType: "Research", industry: "Technology", topic: "AI and automation" },
  "rag-architecture-explained": { date: "OCT 2026", category: "AI ARCHITECTURE", image: "/portfolio/photos/analytics.jpg", assetType: "Blogs", industry: "Financial services", topic: "Data and analytics" },
  "computer-vision-in-the-real-world": { date: "OCT 2026", category: "COMPUTER VISION", image: "/about/corp-performance.jpg", assetType: "Research", industry: "Healthcare", topic: "AI and automation" },
  "the-rise-of-edge-ai": { date: "SEP 2026", category: "EDGE AI", image: "/about/corp-security.jpg", assetType: "Perspectives", industry: "Technology", topic: "Cloud and infrastructure" },
  "the-economics-of-ai-adoption": { date: "SEP 2026", category: "AI ADOPTION", image: "/portfolio/photos/team.jpg", assetType: "Perspectives", industry: "Retail", topic: "AI and automation" },
};

const FALLBACK_FILING = FILING["beyond-artificial-intelligence"];

export const INSIGHTS_CONTENT = {
  eyebrow: "INSIGHTS & PERSPECTIVES",
  title: "Ideas and perspectives for building what comes next.",
  lead: "Practical perspectives on AI, product strategy, and engineering.",
  items: FOUNDER_ESSAYS.map((essay, index) => ({
    id: `i-${String(index + 1).padStart(2, "0")}`,
    slug: essay.slug,
    title: essay.title,
    excerpt: essay.dek,
    readTime: `${essay.readMinutes} MIN READ`,
    ...(FILING[essay.slug] ?? FALLBACK_FILING),
  })) as InsightItem[],
};
