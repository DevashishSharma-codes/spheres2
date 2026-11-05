"use client";

import { useCallback, useEffect, useRef } from "react";
import { WORK_FLOORPLAN_STEPS } from "@/content/howWeWork";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/seo";
import { useHashLink } from "@/lib/useHashLink";

const ABOUT = {
  title: "About Us",
  description:
    "Learn who 21 Spheres is: a software and AI product studio focused on secure integration, high performance and intelligent automation.",
};
const HOW_WE_WORK_DESCRIPTION =
  "See how 21 Spheres works in six clear stages, from discovery and architecture to design, development, testing and launch.";

const SECTIONS: Record<string, { title: string; description: string }> = {
  about: ABOUT,
  "seamless-integration": ABOUT,
  "exceptional-security": ABOUT,
  "high-performance": ABOUT,
  "intelligent-automation": ABOUT,
  "multi-agent-swarms": ABOUT,
  statistics: ABOUT,
  "how-we-work": { title: "How We Work", description: HOW_WE_WORK_DESCRIPTION },
  ...Object.fromEntries(
    WORK_FLOORPLAN_STEPS.map((step) => [step.id, { title: step.title, description: HOW_WE_WORK_DESCRIPTION }])
  ),
  industries: {
    title: "Industries",
    description:
      "Explore the industries 21 Spheres builds software for, including healthcare, SaaS, fintech, eCommerce, GCCs, travel and hospitality.",
  },
  testimonials: {
    title: "Testimonials",
    description: "Read what founders and teams say about building their products with 21 Spheres.",
  },
};

/**
 * About Us, How We Work, Industries and Testimonials are home page sections, so they
 * share one URL as far as the server knows. This keeps the title and description in
 * step with the section that was opened. Search engines only see the home page's.
 */
export function SectionMetadata() {
  const currentHash = useRef("");

  const apply = useCallback(() => {
    const section = SECTIONS[currentHash.current.slice(1)];
    const title = section ? `${section.title} | ${SITE_NAME}` : HOME_TITLE;
    const description = section?.description ?? HOME_DESCRIPTION;
    if (document.title !== title) document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag && tag.getAttribute("content") !== description) tag.setAttribute("content", description);
  }, []);

  useHashLink((hash) => {
    currentHash.current = hash;
    apply();
  });

  // Arriving from another page, Next.js writes the home metadata after this has run.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (window.location.pathname === "/") apply();
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true });
    return () => observer.disconnect();
  }, [apply]);

  return null;
}
