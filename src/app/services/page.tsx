import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";

export const metadata: Metadata = {
  title: "Services — 21Spheres",
  description: "Core technical capabilities, autonomous AI systems, and engineering squads at 21Spheres.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#03020A]">
      <ServicesSection showAllCatalog />
    </div>
  );
}
