import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";

export const metadata: Metadata = {
  title: "Services — 21Spheres",
  description: "Core technical capabilities, autonomous AI systems, and engineering squads at 21Spheres.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ServicesSection showAllCatalog />
    </div>
  );
}
