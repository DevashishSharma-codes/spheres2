import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PillLink } from "@/components/ui/PillLink";
import { CursorDotField } from "@/components/ui/CursorDotField";
import { DotGlobe } from "@/components/ui/DotGlobe";
import { ServiceModel } from "@/components/services/ServiceModels";
import { FitToHeight } from "@/components/services/FitToHeight";
import { StatGraphic } from "@/components/services/StatGraphic";
import { ServiceCapabilitiesSection } from "@/components/services/ServiceCapabilitiesSection";
import { TechMarquee } from "@/components/services/TechMarquee";
import { SERVICE_CAPABILITIES } from "@/content/serviceCapabilities";
import { SERVICE_TECH } from "@/content/serviceTech";
import type { ServiceDetail, ServiceProof, ServiceProofStat } from "@/content/serviceDetails";
import type { ServiceItem } from "@/types";

const HATCH = {
  backgroundColor: "#24232b",
  backgroundImage: "repeating-linear-gradient(118deg, rgba(255,255,255,.055) 0 1px, transparent 1px 24px)",
};

function SectionLabel({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#C9BBFF]">{children}</p>;
}

function SourceNote({ children }: { children: string }) {
  return <p className="text-xs text-white/50">Source: {children}</p>;
}

const formatShare = (share: number) => `${Number(share.toFixed(2))}%`;

/** Grid of 100 squares. The last lit square shows any fraction, so 99.4 reads differently from 100. */
function Waffle({ stat }: { stat: ServiceProofStat }) {
  const percent = stat.percent ?? 0;
  const lit = stat.invert ? 100 - percent : percent;
  const [litName, restName] = stat.legend ?? ["", ""];

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
      <div aria-hidden="true" className="grid w-full max-w-[250px] shrink-0 grid-cols-10 gap-[3px]">
        {Array.from({ length: 100 }, (_, index) => {
          // With invert, the final square is the tiny share, picked out in white.
          if (stat.invert && index === 99) return <span key={index} className="aspect-square rounded-[3px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,.55)]" />;
          const fill = Math.min(1, Math.max(0, lit - index));
          return (
            <span key={index} className="relative aspect-square overflow-hidden rounded-[3px] bg-white/10">
              {fill > 0 && <span className="absolute inset-0 rounded-[3px] bg-[#9D85F2]" style={{ opacity: fill }} />}
            </span>
          );
        })}
      </div>
      {stat.legend && (
        <ul className="min-w-0 space-y-2.5 text-xs text-white/70">
          <li className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-[#9D85F2]" /><span><span className="block font-medium text-white">{formatShare(lit)}</span>{litName}</span></li>
          <li className="flex items-center gap-2"><span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${stat.invert ? "bg-white" : "bg-white/20"}`} /><span><span className="block font-medium text-white">{formatShare(100 - lit)}</span>{restName}</span></li>
        </ul>
      )}
    </div>
  );
}

function SteppedProof({ proof }: { proof: ServiceProof }) {
  const heights = ["sm:h-[220px]", "sm:h-[275px]", "sm:h-[330px]"];
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <div className="flex flex-col justify-between gap-4">
        <SectionLabel>{proof.heading}</SectionLabel>
        <SourceNote>{proof.source}</SourceNote>
      </div>
      <div>
        <p className="max-w-4xl text-2xl font-light leading-[1.25] tracking-[-0.025em] sm:text-[32px]">{proof.statement}</p>
        <dl className="mt-9 grid items-start gap-4 sm:grid-cols-3">
          {proof.stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-3 text-sm leading-relaxed text-white/70"><span className="font-medium text-white">{stat.label}.</span> {stat.detail}</dt>
              <dd className={`flex h-[210px] flex-col rounded-[18px] p-4 ${heights[index % 3]}`} style={HATCH}>
                <div className="min-h-0 flex-1">{stat.graphic && <StatGraphic graphic={stat.graphic} />}</div>
                <p className="mt-3 text-[40px] font-light leading-none tracking-[-0.04em] sm:text-[46px]">{stat.value}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function GridStat({ stat }: { stat: ServiceProofStat }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1.5 text-sm leading-relaxed text-white/70"><span className="font-medium text-white">{stat.label}.</span> {stat.detail}</dt>
      <dd className="text-[44px] font-light leading-none tracking-[-0.04em]">{stat.value}</dd>
      <div className="mb-4">
        {stat.percent !== undefined ? (
          <Waffle stat={stat} />
        ) : (
          <div className="h-[250px] rounded-[14px] p-4" style={HATCH}>{stat.graphic && <StatGraphic graphic={stat.graphic} />}</div>
        )}
      </div>
    </div>
  );
}

function GridProof({ proof }: { proof: ServiceProof }) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-3 text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[44px]">{proof.heading}</h2>
        </div>
        <div className="max-w-xl lg:justify-self-end">
          <p className="text-[15px] leading-relaxed text-white/70">{proof.statement}</p>
          <div className="mt-2"><SourceNote>{proof.source}</SourceNote></div>
        </div>
      </div>
      <dl className="mt-10 grid items-end gap-10 lg:grid-cols-3 lg:gap-6">
        {proof.stats.map((stat) => <GridStat key={stat.label} stat={stat} />)}
      </dl>
    </div>
  );
}

function GlobeProof({ proof }: { proof: ServiceProof }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <SectionLabel>Results</SectionLabel>
        <h2 className="mt-3 text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[44px]">{proof.heading}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">{proof.statement}</p>
        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8">
          {proof.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1.5 text-sm leading-snug text-white/65"><span className="block font-medium text-white">{stat.label}</span>{stat.detail}</dt>
              <dd className="text-[40px] font-light leading-none tracking-[-0.04em] sm:text-[48px]">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6"><SourceNote>{proof.source}</SourceNote></div>
      </div>
      <div className="mx-auto w-full max-w-[560px]"><DotGlobe /></div>
    </div>
  );
}

const PROOF_LAYOUTS = { stepped: SteppedProof, grid: GridProof, globe: GlobeProof };

export function ServiceDetailView({ service, detail }: { service: ServiceItem; detail: ServiceDetail }) {
  const Proof = PROOF_LAYOUTS[detail.proof.layout];

  return (
    <main className="relative isolate overflow-hidden bg-[#0A0910] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: "radial-gradient(55% 900px at 85% 0%, rgba(112,87,217,.24), transparent 70%), radial-gradient(45% 700px at 0% 45%, rgba(112,87,217,.12), transparent 70%)" }}
      />
      <CursorDotField />

      <Container wide>
        {/* Hero */}
        <section className="grid items-center gap-10 pb-10 pt-12 sm:pt-16 lg:h-[calc(100svh-137px)] lg:min-h-[460px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-12 lg:py-5">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="transition-colors hover:text-white">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#C9BBFF]">{service.category}</span>
            </nav>
            <h1 className="mt-5 w-fit bg-gradient-to-r from-white via-[#E4DCFF] to-[#9D85F2] bg-clip-text pb-1 text-[42px] font-light leading-[1.06] tracking-[-0.05em] text-transparent sm:text-6xl xl:text-[68px]">
              {detail.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{detail.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PillLink href="/contact">Start a project</PillLink>
              <Link href="/portfolio" className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm text-white/85 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]">
                See our work
              </Link>
            </div>
          </div>
          <FitToHeight><ServiceModel kind={detail.model} /></FitToHeight>
        </section>
      </Container>

      {SERVICE_TECH[service.id] && <TechMarquee logos={SERVICE_TECH[service.id]} />}

      <Container wide>
        {/* What's included: plain ruled columns, no cards */}
        <section aria-labelledby="service-offerings" className="border-t border-white/15 py-14 sm:py-20">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <SectionLabel>What&apos;s included</SectionLabel>
              <h2 id="service-offerings" className="mt-3 text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[44px]">{detail.sectionTitle}</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70 lg:justify-self-end">{detail.sectionLead}</p>
          </div>
          <div className="mt-10 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 xl:grid-cols-4 xl:gap-x-0 xl:divide-x xl:divide-white/15">
            {detail.offerings.map(({ title, description, icon: Icon, includes, image, bestFor }, index) => (
              <article key={title} className="flex flex-col border-t border-white/15 pt-5 xl:border-t-0 xl:px-6 xl:pt-0 xl:first:pl-0 xl:last:pr-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-white/5 xl:aspect-auto xl:h-[180px]">
                  <Image src={image} alt="" fill sizes="(max-width: 639px) 92vw, (max-width: 1279px) 46vw, 24vw" className="object-cover" />
                </div>
                <div className="mt-4 flex items-center justify-between text-[#C9BBFF]">
                  <span className="text-xs tabular-nums text-white/50">0{index + 1}</span>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-[19px] font-normal leading-[1.25] tracking-[-0.01em]">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">{description}</p>
                <dl className="mt-auto pt-4 text-[13px]">
                  <dt className="border-t border-white/10 pt-3 text-xs text-white/50">What&apos;s included</dt>
                  <dd>
                    <ul className="mt-1 divide-y divide-white/10 text-white/85">
                      {includes.map((item) => <li key={item} className="py-2">{item}</li>)}
                    </ul>
                  </dd>
                  <dt className="border-t border-white/10 pt-3 text-xs text-white/50">Best for</dt>
                  <dd className="mt-1 leading-snug text-[#C9BBFF]">{bestFor}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* Real results */}
        <section aria-label="Results" className="border-t border-white/15 py-14 sm:py-20">
          <Proof proof={detail.proof} />
        </section>

        {SERVICE_CAPABILITIES[service.id] && <ServiceCapabilitiesSection service={service} content={SERVICE_CAPABILITIES[service.id]} />}

        {/* Next step */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 py-10 sm:py-12">
          <PillLink href="/contact">Talk about your project</PillLink>
          <Link href="/services" className="text-sm text-[#C9BBFF] underline decoration-[#C9BBFF]/30 underline-offset-4 transition hover:text-white hover:decoration-white">View all services</Link>
        </div>
      </Container>
    </main>
  );
}
