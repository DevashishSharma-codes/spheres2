import { TestimonialsLandingSection } from "@/components/testimonials/TestimonialsLandingSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials & Wall of Love — 21Spheres",
  description: "Verified founder and CTO testimonials, global network metrics, and performance feedback at 21Spheres.",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8FC] pt-14 sm:pt-16">
      <TestimonialsLandingSection />
    </main>
  );
}
