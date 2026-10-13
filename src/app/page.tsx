import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ConicalHeroSection } from "@/components/how-we-work/ConicalHeroSection";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowUpRight, Cpu, Zap, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section matching exact reference screenshot & purple wave video */}
      <HeroSection />

      {/* "Trusted by" Client Marquee */}
      <PartnerMarquee />

      {/* Second Section: About Us (includes Company Statistics as part of About Us) */}
      <AboutSection />

      {/* Conical Stage: How We Work Section */}
      <ConicalHeroSection />

      {/* Studio Capabilities Overview */}
      <section id="services" className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#DADADD]/70">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-medium tracking-wider text-[#7057D9] mb-4 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9]" />
                <span>CAPABILITIES // PRODUCTION SYSTEMS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.04em] text-[#2A2A2E] leading-tight">
                Architecting autonomous agents and high-frequency digital platforms.
              </h2>
            </div>
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7057D9] hover:underline underline-offset-4"
              >
                <span>Explore all 8 capabilities</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="p-7 sm:p-8 rounded-xl bg-white border border-[#DADADD] flex flex-col justify-between hover:border-[#7057D9]/50 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-[#2A2A2E] mb-3">
                  Autonomous AI Agents
                </h3>
                <p className="text-sm text-[#2A2A2E]/70 font-light leading-relaxed mb-6">
                  Multi-agent swarms, self-correcting reasoning loops, and deterministic LLM execution pipelines built for production workloads.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DADADD]/60 flex items-center justify-between text-xs font-mono text-[#2A2A2E]/60">
                <span>01 // REASONING MATRIX</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-[#7057D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 sm:p-8 rounded-xl bg-white border border-[#DADADD] flex flex-col justify-between hover:border-[#7057D9]/50 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center mb-6">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-[#2A2A2E] mb-3">
                  Sub-20ms Edge Platforms
                </h3>
                <p className="text-sm text-[#2A2A2E]/70 font-light leading-relaxed mb-6">
                  Global multi-region edge deployments with sub-20ms SLA, ultra-low latency caching, and resilient database read replicas.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DADADD]/60 flex items-center justify-between text-xs font-mono text-[#2A2A2E]/60">
                <span>02 // LATENCY BUDGET</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-[#7057D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 sm:p-8 rounded-xl bg-white border border-[#DADADD] flex flex-col justify-between hover:border-[#7057D9]/50 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-[#2A2A2E] mb-3">
                  Resilient Infrastructure
                </h3>
                <p className="text-sm text-[#2A2A2E]/70 font-light leading-relaxed mb-6">
                  Zero technical debt architectures with strict end-to-end type safety, automated invariant checks, and zero downtime CI/CD.
                </p>
              </div>
              <div className="pt-4 border-t border-[#DADADD]/60 flex items-center justify-between text-xs font-mono text-[#2A2A2E]/60">
                <span>03 // ZERO TECHNICAL DEBT</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-[#7057D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
