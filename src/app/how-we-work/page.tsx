import { HowWeWorkFloorplanSection } from "@/components/how-we-work/HowWeWorkFloorplanSection";
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
      {/* 1. Interactive Architectural Floorplan Blueprint Hero matching reference */}
      <HowWeWorkFloorplanSection />

      {/* 2. 4-Stage Sprint Cadence & Engineering Deliverables */}
      <SprintStagesSection />

      {/* 3. Collaboration Cadence & Direct Access */}
      <CollaborationCadenceSection />
    </div>
  );
}
