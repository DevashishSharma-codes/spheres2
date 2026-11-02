import { IndustriesLandingSection } from "@/components/industries/IndustriesLandingSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries & Verticals — 21Spheres",
  description: "Deep vertical engineering across latency-sensitive and mission-critical domains: Healthcare, SaaS, Fintech, eCommerce, GCC, Travel, and Hospitality.",
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#040308] text-white">
      <IndustriesLandingSection />
    </main>
  );
}
