import { IndustriesLandingSection } from "@/components/industries/IndustriesLandingSection";
import { PageBackButton } from "@/components/ui/PageBackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description: "Deep vertical engineering across latency-sensitive and mission-critical domains: Healthcare, SaaS, Fintech, eCommerce, GCC, Travel, and Hospitality.",
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[#040308] text-white">
      <IndustriesLandingSection withBackButton />
    </div>
  );
}
