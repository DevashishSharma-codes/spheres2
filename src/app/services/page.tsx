import { ServicesSection } from "@/components/services/ServicesSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Services",
  description: "Custom AI, web and mobile applications, LLM integration, chatbots, workflow automation, SaaS and enterprise software built by 21 Spheres.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ServicesSection showAllCatalog />
    </div>
  );
}
