import { InsightsLandingSection } from "@/components/insights/InsightsLandingSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical perspectives from 21 Spheres on AI, product strategy, security and software engineering.",
  path: "/insights",
});

export default function InsightsPage() {
  return <InsightsLandingSection archive />;
}
