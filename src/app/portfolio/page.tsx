import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/BentoPortfolioGrid";
import { PortfolioCaseStudiesShowcase } from "@/components/portfolio/PortfolioCaseStudiesShowcase";

export const metadata: Metadata = {
  title: "Portfolio & Deliverables — 21Spheres",
  description: "Production software systems, empirical statistics, and enterprise platforms delivered by 21Spheres.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05060A]">
      <PortfolioHero />
      <PortfolioCaseStudiesShowcase />
    </div>
  );
}
