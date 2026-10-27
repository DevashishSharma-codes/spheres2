"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SERVICES_CONTENT } from "@/content/services";
import { OpenBoxServicesVisual } from "./OpenBoxServicesVisual";
import { IPhoneSimulatorModal } from "./IPhoneSimulatorModal";
import { ServiceDetailDrawer } from "./ServiceDetailDrawer";
import { ServiceItem } from "@/types";
import { Sparkles, Smartphone, ChevronRight, ArrowUpRight, ArrowRight, Layers } from "lucide-react";
import { AllServicesCatalog } from "./AllServicesCatalog";

interface ServicesSectionProps {
  embedded?: boolean;
  showAllCatalog?: boolean;
}

export function ServicesSection({ embedded = false, showAllCatalog = false }: ServicesSectionProps) {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [initialPhoneServiceId, setInitialPhoneServiceId] = useState<string>("mobile-application-development");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services = SERVICES_CONTENT.services;

  const handleOpenSimulator = (serviceId = "mobile-application-development") => {
    setInitialPhoneServiceId(serviceId);
    setSimulatorOpen(true);
  };

  return (
    <section 
      id="services" 
      className={`relative z-0 overflow-hidden text-white border-b border-[#DADADD]/60 ${
        embedded ? "py-16 sm:py-24" : showAllCatalog ? "pt-12 sm:pt-16 pb-8" : "py-16 sm:py-28"
      }`}
      style={showAllCatalog ? {
        background: `
          radial-gradient(ellipse 100% 50% at 50% 0%, rgba(112, 87, 217, 0.28) 0%, transparent 70%),
          linear-gradient(180deg, #03020A 0%, #070518 45%, #03020A 100%)
        `,
      } : {
        background: `
          radial-gradient(ellipse 120% 70% at 50% 65%, rgba(107, 60, 235, 0.9) 0%, rgba(37, 20, 100, 0.7) 45%, transparent 78%),
          radial-gradient(ellipse 100% 45% at 50% 100%, #FFFFFF 0%, #E8DFFF 32%, rgba(183, 158, 249, 0.45) 65%, transparent 88%),
          linear-gradient(180deg, #03020A 0%, #060515 20%, #160B3B 42%, #431FA5 60%, #7242DF 76%, #B79EF9 88%, #F5F2FF 97%, #FFFFFF 100%)
        `,
      }}
    >
      <Container>
        {/* =========================================================
            1. TOP ROW: REFINED "SERVICES" HEADER IN ONE CLEAN LINE
            ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/15 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-none text-white select-none whitespace-nowrap">
              SERVICES
            </h2>
          </div>

          <p className="text-sm sm:text-base font-light text-white/80 whitespace-nowrap pb-0.5">
            Specialized engineering squads delivering high-frequency digital platforms.
          </p>
        </div>

        {/* =================================================================
            HERO SECTION: 3D OPEN BOX WITH GLASSMORPHIC CARDS + RELEVANT COPY
            - Displayed on Homepage (embedded)
            - Hidden on dedicated Services page (/services), where we show all 10 services directly
            ================================================================= */}
        {!showAllCatalog && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: THE CLEAN 3D BOX WITH GLASSMORPHIC SERVICES CARDS */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
              <OpenBoxServicesVisual
                services={services}
                onSelectService={(s) => setSelectedService(s)}
                onOpenMobileSimulator={() => handleOpenSimulator("mobile-application-development")}
              />
            </div>

            {/* RIGHT: SERVICES HEADLINE, COPY & CTA TO EXPLORE ALL SERVICES */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pl-6">
              
              {/* Headline with application-wide font-light tracking-[-0.04em] */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-[-0.04em] leading-[1.08] text-white mb-5">
                Full-stack systems, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B4FE] via-[#EDE9FE] to-white">autonomous AI</span>, and <br />
                <span className="text-white/60">scalable architectures</span>
              </h3>

              {/* Description clearly mentioning all 10 services */}
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-8 max-w-xl">
                We provide 10 specialized engineering services spanning Mobile &amp; Web applications, Custom AI &amp; LLM integration, Chatbots, Workflow automation, Websites, SaaS, Enterprise software, and Custom software—engineered for high-velocity scale with zero technical debt.
              </p>

              {/* CTA: EXPLORE ALL 10 SERVICES */}
              <div className="pt-2">
                <Link 
                  href="/services#all-services"
                  className="
                    group relative inline-flex items-center justify-center gap-3
                    px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full
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

                  <span className="relative z-10 font-medium text-white text-[15px] sm:text-[16px] tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    Explore all 10 services
                  </span>
                  
                  <ArrowRight 
                    className="relative z-10 w-5 h-5 text-white/95 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" 
                    strokeWidth={2} 
                  />
                </Link>
              </div>

            </div>

          </div>
        )}
      </Container>
      
      {/* =========================================================
          DETAILED ALL SERVICES CATALOG (ALL 10 SERVICES CARDS)
          ========================================================= */}
      {showAllCatalog && (
        <AllServicesCatalog
          services={services}
          onSelectService={(s) => setSelectedService(s)}
          onOpenMobileSimulator={() => handleOpenSimulator("mobile-application-development")}
        />
      )}

      {/* =========================================================
          INTERACTIVE SIMULATOR & DRAWERS
          ========================================================= */}
      
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
    </section>
  );
}
