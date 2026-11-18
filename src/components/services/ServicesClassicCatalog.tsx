import { Container } from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";
import { SERVICES_CONTENT } from "@/content/services";
import { SERVICES_FAQ } from "@/content/servicesCatalog";
import { AllServicesCatalog } from "./AllServicesCatalog";
import { ServicesIntro } from "./ServicesIntro";

/**
 * The desktop /services page as it was before the mobile redesign: the title banner, the numbers
 * strip and overview, then every service as a filterable card catalog.
 */
export function ServicesClassicCatalog() {
  return (
    <section
      id="services"
      className="relative z-0 overflow-hidden pb-2 text-[#24232A] sm:pb-3"
      style={{
        background: `
          radial-gradient(ellipse 34% 38% at 0% 18%, rgba(185, 207, 255, 0.38) 0%, transparent 100%),
          radial-gradient(ellipse 32% 42% at 100% 48%, rgba(222, 204, 255, 0.34) 0%, transparent 100%),
          linear-gradient(180deg, #FFFFFF 0%, #FCFCFE 58%, #FFFFFF 100%)
        `,
      }}
    >
      <ServicesIntro stats />
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
      <AllServicesCatalog services={SERVICES_CONTENT.services} />

      {/* FAQ, below all the service cards. Native <details>, so each answer opens without any script. */}
      <Container wide className="relative z-10">
        <section aria-labelledby="services-faq-title" className="pb-12 pt-10 lg:pb-16">
          <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#E7E5EB] pb-4 sm:flex-row sm:items-end">
            <div className="flex flex-col items-start">
              <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#7057D9] sm:text-[11px]">FAQ</span>
              <h2 id="services-faq-title" className="text-3xl font-light leading-none tracking-[-0.045em] text-[#232129] sm:text-[40px]">
                Questions
              </h2>
            </div>
          </div>
          <ul className="divide-y divide-[#E7E5EB] border-b border-[#E7E5EB]">
            {SERVICES_FAQ.map((item) => (
              <li key={item.q}>
                <details className="group">
                  <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[16px] font-normal text-[#232129] transition-colors hover:text-[#6248CA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-[#6E6D78] transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
                  </summary>
                  <p className="max-w-[75ch] pb-5 text-[15px] font-light leading-relaxed text-[#6E6D78]">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
