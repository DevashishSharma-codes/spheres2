import Link from "next/link";
import { FitToHeight } from "@/components/services/FitToHeight";
import { PortfolioDevices } from "@/components/services/ServiceModels";
import { TechMarquee } from "@/components/services/TechMarquee";
import { PortfolioCaseStudiesShowcase } from "@/components/portfolio/PortfolioCaseStudiesShowcase";
import { Container } from "@/components/ui/Container";
import { CursorDotField } from "@/components/ui/CursorDotField";
import { PageBackButton } from "@/components/ui/PageBackButton";
import { PillLink } from "@/components/ui/PillLink";
import { PORTFOLIO_TECH } from "@/content/serviceTech";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description: "Explore case studies of products 21 Spheres has shipped across AI systems, web platforms and mobile applications.",
  path: "/case-studies",
});

export default function Page() {
  return (
    <div className="relative isolate overflow-hidden bg-[#0A0910] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: "radial-gradient(55% 900px at 85% 0%, rgba(112,87,217,.24), transparent 70%), radial-gradient(45% 700px at 0% 45%, rgba(112,87,217,.12), transparent 70%)" }}
      />
      <div className="relative isolate">
      <CursorDotField />

      <Container wide className="relative">
        <PageBackButton className="absolute left-4 top-4 z-10 sm:left-6 lg:left-8" />
        <section className="grid items-center gap-10 pb-10 pt-[72px] sm:pt-20 lg:h-[calc(100svh-137px)] lg:min-h-[460px] lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-10 lg:py-5">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#C9BBFF]">Case Studies</span>
            </nav>
            <h1 className="mt-5 w-fit bg-gradient-to-r from-white via-[#E4DCFF] to-[#9D85F2] bg-clip-text pb-1 text-[42px] font-light leading-[1.06] tracking-[-0.05em] text-transparent sm:text-6xl xl:text-[68px]">
              Products we&rsquo;ve shipped.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Thoughtful engineering, steady momentum, and products built to do meaningful work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PillLink href="#case-studies">Explore case studies</PillLink>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm text-white/85 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]">
                Discuss a product
              </Link>
            </div>
          </div>
          <FitToHeight><PortfolioDevices /></FitToHeight>
        </section>
      </Container>

      <TechMarquee logos={PORTFOLIO_TECH} />
      </div>

      <PortfolioCaseStudiesShowcase />
    </div>
  );
}
