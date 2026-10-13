import { AboutSection } from "@/components/home/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Statistics — 21Spheres",
  description: "Learn about 21Spheres company statistics: 20+ AI automation modules, 10+ smart web apps, 5+ mobile apps, and 15+ backend AI modules.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutSection />
    </div>
  );
}
