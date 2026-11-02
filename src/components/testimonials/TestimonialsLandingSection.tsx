"use client";

import React from "react";
import { TestimonialsWall } from "./TestimonialsWall";

export function TestimonialsLandingSection() {
  return (
    <div id="testimonials" className="relative w-full overflow-hidden scroll-mt-14 sm:scroll-mt-16">
      {/* Wall of Love */}
      <TestimonialsWall />
    </div>
  );
}

export default TestimonialsLandingSection;

