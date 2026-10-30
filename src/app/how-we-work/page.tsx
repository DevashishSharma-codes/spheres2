import { SprintStagesSection } from "@/components/how-we-work/SprintStagesSection";
import { CollaborationCadenceSection } from "@/components/how-we-work/CollaborationCadenceSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work — 21Spheres",
  description: "The AI architecture protocol & 6-stage engineering sprint methodology.",
};

export default function HowWeWorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. 6-Stage Sprint Cadence & Engineering Deliverables (Starts directly with Deterministic Milestones) */}
      <SprintStagesSection />

      {/* 2. Collaboration Cadence & Direct Access */}
      <CollaborationCadenceSection />
    </div>
  );
}
