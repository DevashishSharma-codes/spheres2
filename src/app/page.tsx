import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { HowWeWorkFloorplanSection } from "@/components/how-we-work/HowWeWorkFloorplanSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioLandingSection } from "@/components/portfolio/PortfolioLandingSection";
import { IndustriesLandingSection } from "@/components/industries/IndustriesLandingSection";
import { TestimonialsLandingSection } from "@/components/testimonials/TestimonialsLandingSection";
import { InsightsLandingSection } from "@/components/insights/InsightsLandingSection";
import { JourneySection } from "@/components/home/JourneySection";

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

      {/* Portfolio */}
      <PortfolioLandingSection />

      {/* Services */}
      <ServicesSection embedded />

      {/* Insights */}
      <InsightsLandingSection />

      {/* Industries */}
      <IndustriesLandingSection />

      {/* Testimonials */}
      <TestimonialsLandingSection />

      {/* "Let's take this journey together" sign-off, leads into the footer */}
      <JourneySection />
    </div>
  );
}

