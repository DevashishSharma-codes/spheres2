import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ConicalHeroSection } from "@/components/how-we-work/ConicalHeroSection";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowUpRight, Cpu, Zap, Shield, Sparkles } from "lucide-react";

import { ServicesSection } from "@/components/services/ServicesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section matching exact reference screenshot & purple wave video */}
      <HeroSection />

      {/* "Trusted by" Client Marquee */}
      <PartnerMarquee />

      {/* Second Section: About Us (includes Company Statistics as part of About Us) */}
      <AboutSection />

      {/* Studio Capabilities: Services Section */}
      <ServicesSection embedded />

      {/* Conical Stage: How We Work Section */}
      <ConicalHeroSection />
    </div>
  );
}
