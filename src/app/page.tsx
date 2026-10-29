import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { HowWeWorkFloorplanSection } from "@/components/how-we-work/HowWeWorkFloorplanSection";
import { ServicesSection } from "@/components/services/ServicesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section matching exact reference screenshot & purple wave video */}
      <HeroSection />

      {/* "Trusted by" Client Marquee */}
      <PartnerMarquee />

      {/* About Us */}
      <AboutSection />

      {/* Second Section: How We Work (Interactive Architectural Floorplan Map) */}
      <HowWeWorkFloorplanSection />

      {/* Third Section: Services (Studio Capabilities) */}
      <ServicesSection embedded />
    </div>
  );
}

