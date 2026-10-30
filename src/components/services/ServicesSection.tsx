"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SERVICES_CONTENT } from "@/content/services";
import { OpenBoxServicesVisual } from "./OpenBoxServicesVisual";
import { IPhoneSimulatorModal } from "./IPhoneSimulatorModal";
import { ServiceDetailDrawer } from "./ServiceDetailDrawer";
import { ServiceItem } from "@/types";
import { ArrowRight } from "lucide-react";
import { AllServicesCatalog } from "./AllServicesCatalog";

interface ServicesSectionProps {
  embedded?: boolean;
  showAllCatalog?: boolean;
}

export function ServicesSection({ embedded = false, showAllCatalog = false }: ServicesSectionProps) {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [initialPhoneServiceId, setInitialPhoneServiceId] = useState<string>("mobile-application-development");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [offset, setOffset] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking: drive which 4 cards pop out as user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const maxOffset = 6; // 10 services total, 4 visible at a time (0 to 6)
    const raw = latest * (maxOffset + 0.5);
    const step = Math.min(maxOffset, Math.max(0, Math.floor(raw)));
    setOffset(step);
  });

  const services = SERVICES_CONTENT.services;

  const handleOpenSimulator = (serviceId = "mobile-application-development") => {
    setInitialPhoneServiceId(serviceId);
    setSimulatorOpen(true);
  };

  // Section background styles
  const backgroundStyle = showAllCatalog ? {
    background: `
      radial-gradient(ellipse 90% 50% at 50% 0%, rgba(124, 58, 237, 0.18) 0%, transparent 70%),
      linear-gradient(180deg, #030208 0%, #060412 45%, #030208 100%)
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
      <section 
        id="services" 
        className="relative z-0 overflow-hidden text-white border-b border-white/[0.08] pt-12 sm:pt-16 pb-8"
        style={backgroundStyle}
      >
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-white/15 mb-8 sm:mb-10">
            <div className="flex flex-col items-start">
              <span className="text-[12px] sm:text-[13px] font-bold text-[#C084FC] tracking-[0.18em] uppercase mb-1">
                OUR CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-white select-none whitespace-nowrap">
                Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md sm:text-right pb-0.5">
              Specialized engineering squads delivering high-frequency digital platforms.
            </p>
          </div>
          <AllServicesCatalog
            services={services}
            onSelectService={(s) => setSelectedService(s)}
            onOpenMobileSimulator={() => handleOpenSimulator("mobile-application-development")}
          />
        </div>
        <IPhoneSimulatorModal
          isOpen={simulatorOpen}
          onClose={() => setSimulatorOpen(false)}
          services={services}
          initialServiceId={initialPhoneServiceId}
        />
        <ServiceDetailDrawer
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenInPhone={(serviceId) => handleOpenSimulator(serviceId)}
        />
      </section>
    );
  }

  // Embedded homepage view with sticky scroll-driven card pop-out animation
  return (
    <div ref={sectionRef} className="relative h-[250vh] lg:h-[280vh]">
      <section 
        id="services" 
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden text-white border-b border-white/[0.08] py-8 sm:py-10 lg:py-0"
        style={backgroundStyle}
      >
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* =========================================================
              1. TOP ROW: REFINED "SERVICES" HEADER (MATCHES ABOUT US & HOW WE WORK)
              ========================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 sm:pb-4 border-b border-white/15 mb-7 sm:mb-9 lg:mb-10">
            <div className="flex flex-col items-start">
              <span className="text-[12px] sm:text-[13px] font-bold text-[#C084FC] tracking-[0.18em] uppercase mb-1">
                OUR CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-white select-none whitespace-nowrap">
                Services
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md sm:text-right pb-0.5">
              Specialized engineering squads delivering high-frequency digital platforms.
            </p>
          </div>

          {/* =================================================================
              HERO SECTION: 3D OPEN BOX WITH 4 POPPING CARDS + DYNAMIC CONTROLS
              ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: THE 3D BOX WITH GLASSMORPHIC CARDS POPPING OUT */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
              <OpenBoxServicesVisual
                services={services}
                offset={offset}
                onSelectService={(s) => setSelectedService(s)}
                onOpenMobileSimulator={() => handleOpenSimulator("mobile-application-development")}
              />
            </div>

            {/* RIGHT: SERVICES HEADLINE, COPY & CTA TO EXPLORE ALL SERVICES */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pl-4">
              
              {/* Headline with application-wide font-light tracking-[-0.04em] */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light tracking-[-0.04em] leading-[1.12] text-white mb-3.5">
                Full-stack systems, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B4FE] via-[#EDE9FE] to-white">autonomous AI</span>, and <br />
                <span className="text-white/60">scalable architectures</span>
              </h3>

              {/* Description clearly mentioning all 10 services */}
              <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed mb-5 max-w-lg">
                We provide 10 specialized engineering services spanning Mobile &amp; Web applications, Custom AI &amp; LLM integration, Chatbots, Workflow automation, Websites, SaaS, Enterprise software, and Custom software—engineered for high-velocity scale with zero technical debt.
              </p>

              {/* Interactive deployment hint */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300/80 mb-5 select-none">
                <span className="inline-block animate-bounce text-purple-400 font-bold">↓</span>
                <span>Scroll down to deploy subsequent squads out of the box</span>
              </div>

              {/* CTA: EXPLORE ALL 10 SERVICES */}
              <div>
                <Link 
                  href="/services#all-services"
                  className="
                    group relative inline-flex items-center justify-center gap-2.5
                    px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
                    bg-gradient-to-b from-white/[0.14] via-white/[0.07] to-white/[0.03]
                    hover:from-white/[0.22] hover:via-white/[0.12] hover:to-white/[0.06]
                    backdrop-blur-2xl backdrop-saturate-150
                    border border-white/30 hover:border-white/60
                    shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_0_12px_rgba(255,255,255,0.05)]
                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_24px_rgba(255,255,255,0.15),inset_0_1.5px_1.5px_rgba(255,255,255,0.7)]
                    hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-300
                    w-fit select-none cursor-pointer overflow-hidden
                  "
                >
                  <div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" 
                    aria-hidden="true"
                  />

                  <span className="relative z-10 font-medium text-white text-[14px] sm:text-[15px] tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    Explore all 10 services
                  </span>
                  
                  <ArrowRight 
                    className="relative z-10 w-4 h-4 text-white/95 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" 
                    strokeWidth={2} 
                  />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* iPhone Simulator Modal */}
      <IPhoneSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        services={services}
        initialServiceId={initialPhoneServiceId}
      />

      {/* Service Detail Drawer */}
      <ServiceDetailDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenInPhone={(serviceId) => handleOpenSimulator(serviceId)}
      />
    </div>
  );
}
