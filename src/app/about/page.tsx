import { AboutSection } from "@/components/home/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — 21Spheres",
  description: "Learn about 21Spheres: autonomous AI agent swarms, high-performance web applications, and resilient digital architectures.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutSection />
    </div>
  );
}
