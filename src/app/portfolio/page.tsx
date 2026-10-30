import type { Metadata } from "next";
import PortfolioPage from "@/components/portfolio/BentoPortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio & Deliverables — 21Spheres",
  description: "Production software systems, empirical statistics, and enterprise platforms delivered by 21Spheres.",
};

export default function Page() {
  return <PortfolioPage />;
}
