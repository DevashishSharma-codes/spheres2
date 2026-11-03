import type { Metadata } from "next";
import { InsightsLandingSection } from "@/components/insights/InsightsLandingSection";

export const metadata: Metadata = {
  title: "Insights — 21Spheres",
  description: "Ideas and field notes on AI systems, product engineering, and the architecture behind resilient software.",
};

export default function InsightsPage() {
  return <InsightsLandingSection />;
}
