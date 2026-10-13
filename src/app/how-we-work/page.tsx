import { ConicalHeroSection } from "@/components/how-we-work/ConicalHeroSection";
import { SprintStagesSection } from "@/components/how-we-work/SprintStagesSection";
import { CollaborationCadenceSection } from "@/components/how-we-work/CollaborationCadenceSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work — 21Spheres",
  description: "The AI architecture protocol & 4-stage engineering sprint methodology.",
};

export default function HowWeWorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Exact Conical Amphitheater Funnel Hero matching reference */}
      <ConicalHeroSection />

      {/* 2. 4-Stage Sprint Cadence & Engineering Deliverables */}
      <SprintStagesSection />

      {/* 3. Collaboration Cadence & Direct Access */}
      <CollaborationCadenceSection />
    </div>
  );
}
