import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { HowWeWorkFloorplanSection } from "@/components/how-we-work/HowWeWorkFloorplanSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioLandingSection } from "@/components/portfolio/PortfolioLandingSection";
import { IndustriesLandingSection } from "@/components/industries/IndustriesLandingSection";
import { TestimonialsLandingSection } from "@/components/testimonials/TestimonialsLandingSection";
import { InsightsLandingSection } from "@/components/insights/InsightsLandingSection";

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

      {/* Fourth Section: Portfolio (TCS-style borderless editorial showcase) */}
      <PortfolioLandingSection />

      {/* Fifth Section: Industries & Vertical Domains (Split Showcase with arrow stepper & modal) */}
      <IndustriesLandingSection />

      {/* Insights */}
      <InsightsLandingSection />

      {/* Sixth Section: Testimonials & Wall of Love (Exact 21Spheres DNA in Purple/White/Grayish/Black) */}
      <TestimonialsLandingSection />
    </div>
  );
}

