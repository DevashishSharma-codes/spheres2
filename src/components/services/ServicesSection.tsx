"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SERVICES_CONTENT } from "@/content/services";
import { OpenBoxServicesVisual } from "./OpenBoxServicesVisual";
import { PillLink } from "@/components/ui/PillLink";
import { AllServicesCatalog } from "./AllServicesCatalog";
import { ServicesIntro } from "./ServicesIntro";
import { Container } from "@/components/ui/Container";

interface ServicesSectionProps {
  embedded?: boolean;
  showAllCatalog?: boolean;
}

export function ServicesSection({ embedded = false, showAllCatalog = false }: ServicesSectionProps) {
  const router = useRouter();
  const [offset, setOffset] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const requestedOffsetRef = useRef(0);
  const scrollTargetRef = useRef<number | null>(null);

  // Scroll tracking: drive which 4 cards pop out as user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const maxOffset = 6; // 10 services total, 4 visible at a time (0 to 6)
    const raw = latest * (maxOffset + 0.5);
    const step = Math.min(maxOffset, Math.max(0, Math.floor(raw)));
    currentOffsetRef.current = step;
    setOffset(step);
    if (scrollTargetRef.current === null) {
      requestedOffsetRef.current = step;
    } else if (step === scrollTargetRef.current) {
      requestedOffsetRef.current = step;
      scrollTargetRef.current = null;
    }
  });

  React.useEffect(() => {
    const handleScrollEnd = () => {
      if (scrollTargetRef.current !== null) {
        requestedOffsetRef.current = currentOffsetRef.current;
        scrollTargetRef.current = null;
      }
    };
    window.addEventListener("scrollend", handleScrollEnd);
    return () => window.removeEventListener("scrollend", handleScrollEnd);
  }, []);

  const services = SERVICES_CONTENT.services;

  // Scroll the desktop section to the target squad; let scroll progress own
  // the visible offset so the cards never jump forward and then snap back.
  const moveSquad = useCallback((direction: -1 | 1) => {
    const next = Math.max(0, Math.min(6, (scrollTargetRef.current ?? requestedOffsetRef.current) + direction));
    const section = sectionRef.current;
    if (section && window.matchMedia("(min-width: 1024px)").matches) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        requestedOffsetRef.current = next;
        scrollTargetRef.current = next;
        const targetY = top + (next / 6) * totalScrollable;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        return;
      }
    }

    requestedOffsetRef.current = next;
    currentOffsetRef.current = next;
    setOffset(next);
  }, []);

  const handlePrevSquad = useCallback(() => moveSquad(-1), [moveSquad]);
  const handleNextSquad = useCallback(() => moveSquad(1), [moveSquad]);

  // Section background styles
  const backgroundStyle = showAllCatalog ? {
    background: `
      radial-gradient(ellipse 34% 38% at 0% 18%, rgba(185, 207, 255, 0.38) 0%, transparent 100%),
      radial-gradient(ellipse 32% 42% at 100% 48%, rgba(222, 204, 255, 0.34) 0%, transparent 100%),
      linear-gradient(180deg, #FFFFFF 0%, #FCFCFE 58%, #FFFFFF 100%)
    `,
  } : {
    background: `
      radial-gradient(ellipse 85% 55% at 50% 65%, rgba(124, 58, 237, 0.20) 0%, rgba(79, 28, 145, 0.08) 45%, transparent 78%),
      radial-gradient(ellipse 65% 35% at 50% 20%, rgba(99, 40, 190, 0.10) 0%, transparent 70%),
      linear-gradient(180deg, #040308 0%, #060511 25%, #0A0718 60%, #060410 85%, #030207 100%)
    `,
  };

  // Dedicated catalog view on /services page
  if (showAllCatalog) {
    return (
      <div ref={sectionRef}>
      <section 
        id="services" 
        className="relative z-0 overflow-hidden border-b border-[#ECEBF0] pb-2 text-[#24232A] sm:pb-3"
        style={backgroundStyle}
      >
        <ServicesIntro />
        <Container wide className="relative z-10">
          <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#E7E5EB] pb-4 sm:flex-row sm:items-end">
            <div className="flex flex-col items-start">
              <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-[11px]">
                OUR CAPABILITIES
              </span>
              <h2 className="text-3xl font-light leading-none tracking-[-0.045em] text-[#232129] sm:text-[40px]">
                All services
              </h2>
            </div>
            <p className="max-w-[420px] pb-0.5 text-sm font-light leading-relaxed text-[#6E6D78] sm:text-right">
              Filter by category, or open any card to see what&apos;s included.
            </p>
          </div>
        </Container>
        <AllServicesCatalog services={services} />
      </section>
      </div>
    );
  }

  // Desktop keeps the scroll-driven display; mobile scrolls normally and uses arrows.
  return (
    <div ref={sectionRef} className="relative h-auto lg:h-[280vh]">
      <section 
        id="services" 
        className="relative top-0 min-h-[calc(100svh-4rem)] w-full flex flex-col justify-start overflow-hidden text-white border-b border-white/[0.08] py-7 sm:py-10 lg:sticky lg:h-screen lg:min-h-0 lg:justify-center lg:py-0"
        style={backgroundStyle}
      >
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* =========================================================
              1. TOP ROW: REFINED "SERVICES" HEADER (MATCHES ABOUT US & HOW WE WORK)
              ========================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 sm:pb-3.5 border-b border-white/15 mb-5 sm:mb-7 lg:mb-8">
            <div className="flex flex-col items-start">
              <span className="text-[12px] sm:text-[13px] font-bold text-[#C084FC] tracking-[0.18em] uppercase mb-1">
                OUR CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-light tracking-[-0.04em] leading-none text-white select-none whitespace-nowrap">
                Services
              </h2>
            </div>

            <p className="text-xs sm:text-[13px] text-white/70 font-light leading-relaxed max-w-lg sm:text-right pb-0.5">
              Specialized engineering squads delivering high-frequency digital platforms.
            </p>
          </div>

          {/* =================================================================
              HERO SECTION: 3D OPEN BOX WITH 4 POPPING CARDS + DYNAMIC CONTROLS
              ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
            
            {/* LEFT: THE 3D BOX WITH GLASSMORPHIC CARDS POPPING OUT & MINI ARROW BUTTONS */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
              <OpenBoxServicesVisual
                services={services}
                offset={offset}
                onSelectService={(s) => router.push(`/services/${s.id}`)}
                onPrevSquad={handlePrevSquad}
                onNextSquad={handleNextSquad}
                canPrevSquad={offset > 0}
                canNextSquad={offset < 6}
              />
            </div>

            {/* RIGHT: EVENLY DISTRIBUTED HEADLINE, NARRATIVE & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pl-6 max-w-xl">
              
              {/* Headline with application-wide font-light tracking-[-0.04em] */}
              <h3 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-light tracking-[-0.04em] leading-[1.15] text-white mb-6 sm:mb-8">
                Full-stack systems, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B4FE] via-[#EDE9FE] to-white">autonomous AI</span>, and <br />
                <span className="text-white/60">scalable architectures</span>
              </h3>

              {/* Distributed, breathable narrative copy */}
              <div className="space-y-4 mb-8 sm:mb-10">
                <p className="text-sm sm:text-[15px] lg:text-[15.5px] text-white/85 font-light leading-relaxed">
                  We deploy 10 specialized engineering services spanning Mobile &amp; Web applications, Custom AI &amp; LLM integration, Chatbots, Workflow automation, Websites, SaaS, Enterprise software, and Custom software.
                </p>
                <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-white/55 font-light leading-relaxed">
                  Engineered for high-velocity scale with zero technical debt, sub-16ms responsiveness, and multi-tenant security.
                </p>
              </div>

              {/* CTA: EXPLORE ALL SERVICES */}
              <div>
                <PillLink href="/services#all-services">Explore all services</PillLink>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
