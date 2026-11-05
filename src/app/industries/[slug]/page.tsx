import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers3 } from "lucide-react";
import { PageBackButton } from "@/components/ui/PageBackButton";
import { INDUSTRIES_CONTENT } from "@/content/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

const industries = INDUSTRIES_CONTENT.items;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.id === slug);
  if (!industry) return { title: "Industry not found — 21Spheres" };

  return {
    title: `${industry.name} Systems — 21Spheres`,
    description: industry.subhead ?? industry.description,
  };
}

async function IndustryDetailContent({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industryIndex = industries.findIndex((item) => item.id === slug);
  const industry = industries[industryIndex];

  if (!industry) notFound();

  const capabilities = industry.capabilities ?? [];
  const architectureNotes = industry.architectureNotes ?? [];
  const previous = industries[(industryIndex - 1 + industries.length) % industries.length];
  const next = industries[(industryIndex + 1) % industries.length];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F7F9] pb-16 text-[#19171F] sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(ellipse_75%_60%_at_70%_0%,rgba(112,72,194,0.12),transparent_72%),linear-gradient(180deg,#FFFFFF_0%,#F7F7F9_78%)]"
      />

      <div className="mx-auto max-w-[1320px] px-5 pt-7 sm:px-8 sm:pt-10 lg:px-12">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#DAD8E0] pb-4 sm:mb-10">
          <PageBackButton />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#817B88] sm:text-[10px]">
            21SPHERES / SECTOR SYSTEMS / {String(industryIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <header className="mb-6 max-w-5xl sm:mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7057D9] sm:text-xs">
            Industry engineering · {industry.category ?? industry.name}
          </p>
          <h1 className="max-w-5xl bg-gradient-to-r from-[#20132D] via-[#7057D9] to-[#A855F7] bg-clip-text text-[clamp(3.2rem,9vw,7.5rem)] font-light leading-[0.9] tracking-[-0.065em] text-transparent">
            {industry.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#625D69] sm:mt-7 sm:text-xl sm:leading-relaxed">
            {industry.subhead ?? industry.description}
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)] lg:gap-7">
          <div
            role="img"
            aria-label={`${industry.name} industry visual`}
            className="group relative min-h-[300px] overflow-hidden border border-[#D8D5DE] bg-[#E4E1E8] bg-cover bg-center sm:min-h-[420px] lg:min-h-[500px]"
            style={{ backgroundImage: industry.image ? `url("${industry.image}")` : undefined }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#090711]/95 via-[#090711]/10 to-[#090711]/10" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,5,15,0.15),transparent_55%,rgba(112,72,194,0.16))]" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-8 lg:p-9">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E4D8FF] sm:text-[10px]">
                Sector perspective · {String(industryIndex + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
              </span>
              {industry.clientSnippet && (
                <p className="max-w-2xl text-lg font-light leading-snug text-white sm:text-2xl">
                  {industry.clientSnippet}
                </p>
              )}
            </div>
          </div>

          <aside className="flex flex-col border border-[#DAD8E0] bg-white p-5 shadow-[0_10px_35px_rgba(35,24,55,0.04)] sm:p-7 lg:p-8">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7057D9]">
              <Layers3 className="h-4 w-4" />
              Sector brief
            </div>
            <p className="text-sm leading-[1.8] text-[#514C57] sm:text-[15px]">
              {industry.description}
            </p>

            <div className="my-6 h-px bg-[#E5E2E9]" />

            <dl className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-[#817B88]">Domain</dt>
                <dd className="mt-1.5 text-sm text-[#28242D]">{industry.category ?? industry.name}</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-[#817B88]">Focus areas</dt>
                <dd className="mt-1.5 text-sm text-[#28242D]">{String(capabilities.length).padStart(2, "0")} systems</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[9px] uppercase tracking-[0.16em] text-[#817B88]">Engineering lens</dt>
                <dd className="mt-1.5 text-sm text-[#28242D]">Resilient platforms, secure data, and thoughtful product experiences.</dd>
              </div>
            </dl>

            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center justify-between gap-4 border border-[#DAD8E0] bg-[#F8F7FA] px-4 text-sm font-medium text-[#28242D] transition hover:border-[#9E8ACF] hover:bg-[#F2EFF9] sm:px-5"
            >
              Discuss a {industry.name} platform
              <span className="flex h-8 w-8 items-center justify-center bg-[#7057D9] text-white transition group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </aside>
        </section>

        <section className="grid gap-6 border-b border-[#DAD8E0] py-8 sm:py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10 lg:py-12">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">01 / Capability map</p>
            <h2 className="bg-gradient-to-r from-[#20132D] to-[#8057E8] bg-clip-text text-3xl font-light tracking-[-0.045em] text-transparent sm:text-4xl">Systems built for {industry.name.toLowerCase()}.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#625D69]">A focused view of the product capabilities and platform components that shape this sector’s digital experiences.</p>
          </div>
          <div className="grid gap-px border border-[#DAD8E0] bg-[#DAD8E0] sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <div key={capability} className="flex min-h-[112px] items-start gap-4 bg-white p-4 sm:min-h-[136px] sm:p-5">
                <span className="pt-0.5 font-mono text-[10px] text-[#8057E8]">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-medium leading-relaxed text-[#28242D] sm:text-base">{capability}</h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-[#817B88]">Designed into the platform</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-8 sm:py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10 lg:py-12">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">02 / Architecture notes</p>
            <h2 className="bg-gradient-to-r from-[#20132D] to-[#8057E8] bg-clip-text text-3xl font-light tracking-[-0.045em] text-transparent sm:text-4xl">A foundation for the hard parts.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#625D69]">
              The platform decisions behind secure, reliable systems in {industry.name.toLowerCase()}.
            </p>
          </div>
          <div className="relative space-y-3 pl-5 before:absolute before:bottom-5 before:left-[5px] before:top-5 before:w-px before:bg-gradient-to-b before:from-[#8057E8] before:via-[#DAD8E0] before:to-transparent sm:pl-7 sm:before:left-[7px]">
            {architectureNotes.map((note, index) => (
              <article key={note} className="relative border border-[#DAD8E0] bg-white p-4 sm:p-5">
                <span className="absolute -left-[21px] top-5 flex h-3 w-3 items-center justify-center border border-[#8057E8] bg-white sm:-left-[29px]">
                  <span className="h-1 w-1 bg-[#8057E8]" />
                </span>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#7057D9]">Engineering note 0{index + 1}</p>
                <p className="text-sm leading-relaxed text-[#514C57] sm:text-[15px]">{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-y border-[#DAD8E0] py-8 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:py-12">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">03 / Platform sketch</p>
            <h2 className="bg-gradient-to-r from-[#20132D] to-[#8057E8] bg-clip-text text-3xl font-light tracking-[-0.045em] text-transparent sm:text-4xl">From connected parts to one clear system.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#625D69]">A simple systems view: the core platform brings {industry.name.toLowerCase()} capabilities together, with the underlying architecture supporting each connection.</p>
          </div>
          <div className="border border-[#DAD8E0] bg-white p-4 sm:p-6">
            <svg viewBox="0 0 720 360" className="h-auto w-full" role="img" aria-label={`${industry.name} platform architecture sketch`}>
              <defs>
                <pattern id="sketch-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#EEEAF3" strokeWidth="1" /></pattern>
                <linearGradient id="sketch-accent" x1="0" x2="1"><stop stopColor="#7057D9" /><stop offset="1" stopColor="#B86AF4" /></linearGradient>
              </defs>
              <rect width="720" height="360" fill="url(#sketch-grid)" />
              <path d="M360 180 150 86M360 180 570 86M360 180 150 274M360 180 570 274" stroke="#9A8BB8" strokeWidth="1.5" strokeDasharray="5 5" />
              {[{x:52,y:48},{x:468,y:48},{x:52,y:236},{x:468,y:236}].map((p, i) => <g key={i}><rect x={p.x} y={p.y} width="200" height="76" fill="#fff" stroke="#BEB6CB" /><text x={p.x+14} y={p.y+25} fill="#8057E8" fontSize="10" fontFamily="monospace">MODULE 0{i+1}</text><text x={p.x+14} y={p.y+51} fill="#28242D" fontSize="12" fontFamily="sans-serif">{(capabilities[i] ?? `${industry.name} capability`).slice(0, 25)}</text></g>)}
              <rect x="270" y="137" width="180" height="86" fill="#21162F" stroke="url(#sketch-accent)" strokeWidth="2" />
              <text x="360" y="172" textAnchor="middle" fill="#CDB9FF" fontSize="10" fontFamily="monospace">21SPHERES / CORE</text>
              <text x="360" y="197" textAnchor="middle" fill="#fff" fontSize="15" fontFamily="sans-serif">{industry.category ?? industry.name} platform</text>
              <circle cx="360" cy="180" r="4" fill="#B86AF4" />
            </svg>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E5E2E9] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#817B88]">
              <span>System relationship sketch</span><span>Conceptual · not to scale</span>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-8 sm:py-10 lg:grid-cols-3 lg:gap-8 lg:py-12">
          <div className="lg:col-span-1">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">04 / Sector perspective</p>
            <h2 className="bg-gradient-to-r from-[#20132D] to-[#8057E8] bg-clip-text text-3xl font-light tracking-[-0.045em] text-transparent sm:text-4xl">Designed around the work.</h2>
          </div>
          <div className="grid gap-6 text-sm leading-[1.85] text-[#514C57] sm:grid-cols-2 lg:col-span-2">
            <p>{industry.description} Our work starts by understanding the product goals and the people who rely on the system, then shaping an experience and technical foundation around those needs.</p>
            <p>{industry.subhead ?? industry.clientSnippet ?? `For ${industry.name.toLowerCase()}, the strongest platforms connect useful workflows with dependable infrastructure.`} That means bringing the right capabilities together while keeping the experience clear for the teams and customers using it.</p>
          </div>
        </section>

        <section className="border border-[#DAD8E0] bg-white p-5 sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7057D9]">Build with 21Spheres</p>
              <h2 className="max-w-3xl bg-gradient-to-r from-[#20132D] to-[#8057E8] bg-clip-text text-3xl font-light tracking-[-0.045em] text-transparent sm:text-5xl">Bring your next {industry.name.toLowerCase()} platform into focus.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#625D69]">Start with the systems your team needs. We’ll shape the architecture and product path around them.</p>
            </div>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-3 bg-[#7057D9] px-5 text-sm font-semibold text-white transition hover:bg-[#5F45C6]">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <nav aria-label="More industries" className="mt-8 grid gap-3 sm:grid-cols-2">
          {[previous, next].map((item, index) => (
            <Link key={item.id} href={`/industries/${item.id}`} className="group flex items-center justify-between border border-[#DAD8E0] bg-white p-4 transition hover:border-[#9E8ACF] hover:bg-[#F8F6FC] sm:p-5">
              <span>
                <span className="block text-[9px] uppercase tracking-[0.16em] text-[#817B88]">{index === 0 ? "Previous sector" : "Next sector"}</span>
                <span className="mt-1 block text-sm text-[#28242D]">{item.name}</span>
              </span>
              {index === 0 ? <ArrowLeft className="h-4 w-4 text-[#817B88] transition group-hover:-translate-x-1 group-hover:text-[#7057D9]" /> : <ArrowRight className="h-4 w-4 text-[#817B88] transition group-hover:translate-x-1 group-hover:text-[#7057D9]" />}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  return (
    // Plain placeholder so a navigation paints straight away.
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <IndustryDetailContent params={params} />
    </Suspense>
  );
}
