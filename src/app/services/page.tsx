import { FooterClosingLine } from "@/components/layout/FooterClosingLine";
import { ServicesCatalogPage } from "@/components/services/ServicesCatalogPage";
import { ServicesClassicCatalog } from "@/components/services/ServicesClassicCatalog";
import { SERVICES_CONTENT } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Services",
  description: "Custom AI, web and mobile applications, LLM integration, chatbots, workflow automation, SaaS and enterprise software built by 21 Spheres.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Desktop keeps the original card catalog; phones and tablets get the mobile layout */}
      <div className="hidden lg:block">
        <ServicesClassicCatalog />
      </div>
      <div className="lg:hidden">
        <ServicesCatalogPage />
      </div>
      {/* Closing line, shown in the footer right above its thread and "Start a project" button */}
      <FooterClosingLine>{SERVICES_CONTENT.closing.title}</FooterClosingLine>
    </div>
  );
}
