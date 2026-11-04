import { TestimonialsLandingSection } from "@/components/testimonials/TestimonialsLandingSection";
import { PageBackButton } from "@/components/ui/PageBackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials & Wall of Love — 21Spheres",
  description: "Verified founder and CTO testimonials, global network metrics, and performance feedback at 21Spheres.",
};

export default function TestimonialsPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF8FC] pt-14 sm:pt-16">
      <PageBackButton className="absolute left-4 top-2 sm:left-6 sm:top-3 lg:left-8" />
      <TestimonialsLandingSection />
    </main>
  );
}
