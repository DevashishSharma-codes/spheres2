import { HowWeWorkFloorplanSection } from "@/components/how-we-work/HowWeWorkFloorplanSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work — 21Spheres",
  description: "A concise look at the six stages that take a product from first brief to launch.",
};

export default function HowWeWorkPage() {
  return <HowWeWorkFloorplanSection />;
}
