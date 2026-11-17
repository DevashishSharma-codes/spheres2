"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SERVICES_CONTENT } from "@/content/services";
import { OpenBoxServicesVisual } from "./OpenBoxServicesVisual";
import { PillLink } from "@/components/ui/PillLink";

const MAX_OFFSET = 6; // 10 services, 4 visible at a time
const NAV_HEIGHT = 64;
const ENGAGE_DISTANCE = 220; // how close the section must be to the top before the box takes the wheel
const STEP_DISTANCE = 60; // wheel travel per card step
const STEP_COOLDOWN_MS = 280; // stops one trackpad flick from running through every card

interface ServicesSectionProps {
  embedded?: boolean;
}

export function ServicesSection({ embedded = false }: ServicesSectionProps) {
  const router = useRouter();
  const [offset, setOffset] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const boxAreaRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const moveSquad = useCallback((direction: -1 | 1) => {
    const next = Math.max(0, Math.min(MAX_OFFSET, offsetRef.current + direction));
    offsetRef.current = next;
    setOffset(next);
  }, []);

  // With the cursor over the box, the wheel moves the cards and holds the page until
  // they run out. Everywhere else the wheel never reaches this, so the page scrolls normally.
  useEffect(() => {
    const area = boxAreaRef.current;
    if (!area) return;
    let travelled = 0;
    let coolingUntil = 0;

    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const section = sectionRef.current?.getBoundingClientRect();
      // Only once the section is on screen, so a passing scroll isn't caught half way.
      if (!section || Math.abs(section.top - NAV_HEIGHT) > ENGAGE_DISTANCE) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const now = performance.now();
      const hasRoom = direction > 0 ? offsetRef.current < MAX_OFFSET : offsetRef.current > 0;
      if (!hasRoom && now >= coolingUntil) return;

      event.preventDefault();
      if (section.top !== NAV_HEIGHT) {
        window.scrollBy({ top: section.top - NAV_HEIGHT, behavior: "instant" });
      }
      if (now < coolingUntil) return;

      travelled += event.deltaY;
      if (Math.abs(travelled) >= STEP_DISTANCE) {
        travelled = 0;
        coolingUntil = now + STEP_COOLDOWN_MS;
        moveSquad(direction);
      }
    };

    area.addEventListener("wheel", onWheel, { passive: false });
    return () => area.removeEventListener("wheel", onWheel);
  }, [moveSquad]);

  const services = SERVICES_CONTENT.services;

  const handlePrevSquad = useCallback(() => moveSquad(-1), [moveSquad]);
  const handleNextSquad = useCallback(() => moveSquad(1), [moveSquad]);

  // Section background styles
  const backgroundStyle = {
    background: `
      radial-gradient(ellipse 85% 55% at 50% 65%, rgba(124, 58, 237, 0.20) 0%, rgba(79, 28, 145, 0.08) 45%, transparent 78%),
      radial-gradient(ellipse 65% 35% at 50% 20%, rgba(99, 40, 190, 0.10) 0%, transparent 70%),
      linear-gradient(180deg, #040308 0%, #060511 25%, #0A0718 60%, #060410 85%, #030207 100%)
    `,
  };

  // Desktop keeps the scroll-driven display; mobile scrolls normally and uses arrows.
  return (
    <div className="relative">
      <section 
        ref={sectionRef}
        id="services" 
        className="relative w-full scroll-mt-14 flex flex-col lg:min-h-[calc(100svh-4rem)] justify-start overflow-hidden text-white border-b border-white/[0.08] py-7 sm:scroll-mt-16 sm:py-10 lg:justify-center lg:py-12"
        style={backgroundStyle}
      >
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* =========================================================
              1. TOP ROW: REFINED "SERVICES" HEADER (MATCHES ABOUT US & HOW WE WORK)
              ========================================================= */}
          {/* The right-hand line, on one line, is centred vertically in the header: halfway between
              the top of the label and the divider below. */}
          <div className="mb-5 flex flex-col gap-2.5 border-b border-white/15 pb-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pb-5 lg:mb-10">
            <div>
              <span className="mb-1 block text-[12px] font-bold uppercase tracking-[0.18em] text-[#C084FC] sm:text-[13px]">
                OUR CAPABILITIES
              </span>
              <h2 className="select-none whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[52px]">
                Services
              </h2>
            </div>
            {/* Phones skip this line: the heading below already says it */}
            <p className="hidden text-[13px] font-light leading-relaxed text-white/65 sm:block sm:text-right sm:text-sm">
              Specialized engineering squads delivering high-frequency digital platforms.
            </p>
          </div>

          {/* =================================================================
              HERO SECTION: 3D OPEN BOX WITH 4 POPPING CARDS + DYNAMIC CONTROLS
              ================================================================= */}
          {/* Phones read the words first, then explore the box; desktop keeps the box on the left */}
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* LEFT: THE 3D BOX WITH GLASSMORPHIC CARDS POPPING OUT & MINI ARROW BUTTONS */}
            <div ref={boxAreaRef} className="order-2 flex w-full justify-center lg:order-none lg:col-span-6 lg:justify-start">
              <OpenBoxServicesVisual
                services={services}
                offset={offset}
                onSelectService={(s) => router.push(`/services/${s.id}`)}
                onPrevSquad={handlePrevSquad}
                onNextSquad={handleNextSquad}
                canPrevSquad={offset > 0}
                canNextSquad={offset < MAX_OFFSET}
              />
            </div>

            {/* RIGHT: heading, a lead statement, its supporting detail under a hairline, then the CTA.
                One spacing rhythm: heading 24px, lead 20px, detail 32px, button. */}
            <div className="order-1 flex max-w-[600px] flex-col justify-center text-left lg:order-none lg:col-span-6 lg:pl-2 xl:pl-8">
              <h3 className="text-[25px] font-light leading-[1.15] tracking-[-0.035em] text-white sm:text-[38px] lg:text-[34px] xl:text-[42px]">
                We Engineer What Businesses <br className="hidden sm:block" />
                Need to{" "}
                <span className="bg-gradient-to-r from-[#D8B4FE] via-[#EDE9FE] to-white bg-clip-text text-transparent">Move Forward</span>
              </h3>

              <p className="mt-3 text-[14px] font-light leading-[1.6] text-white/80 sm:mt-6 sm:text-base sm:leading-[1.65] sm:text-white/85">
                {SERVICES_CONTENT.landing.lead}
              </p>
              {/* The supporting detail is for larger screens; phones keep to the lead */}
              <p className="mt-4 hidden border-t border-white/10 pt-4 text-[13px] sm:block font-light leading-[1.65] text-white/55 sm:mt-5 sm:pt-5 sm:text-sm">
                {SERVICES_CONTENT.landing.detail}
              </p>

              <div className="mt-7 hidden sm:mt-8 sm:block">
                <PillLink href="/services#all-services">Explore all services</PillLink>
              </div>

            </div>

            {/* Phones: the button comes after the box */}
            <div className="order-3 flex justify-center sm:hidden">
              <PillLink href="/services#all-services">Explore all services</PillLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
