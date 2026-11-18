import Image from "next/image";
import Link from "next/link";
import { Code2, Layers, Rocket, Timer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageBackButton } from "@/components/ui/PageBackButton";
import { SERVICES_CONTENT } from "@/content/services";


// The numbers strip, shown on the desktop page only.
const STATS = [
  { icon: Layers, value: String(SERVICES_CONTENT.services.length), label: "Specialised services" },
  { icon: Rocket, value: "15+", label: "Products shipped" },
  { icon: Timer, value: "3–14", label: "Weeks, brief to launch" },
  { icon: Code2, value: "100%", label: "In-house code" },
];

const overview = SERVICES_CONTENT.overview;

export function ServicesIntro({ stats = false }: { stats?: boolean }) {
  return (
    <>
      {/* Title banner */}
      <div className="relative isolate overflow-hidden bg-[#141318] text-white">
        <Image src="/about-meeting-bg.png" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="-z-20 object-cover object-[50%_40%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#120f1f]/80 to-[#120f1f]/65" />
        <Container wide className="relative pb-12 pt-[68px] text-center sm:py-14">
          <PageBackButton className="absolute left-4 top-4 sm:left-6 lg:left-8" />
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-white/75">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span aria-hidden="true">•</span>
            <span aria-current="page">Services</span>
          </nav>
          <h1 className="mt-3 text-4xl font-light leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-[64px]">Our Services</h1>
        </Container>
      </div>

      {/* Numbers */}
      {stats && (
        <div className="border-b border-[#ECEBF0] bg-white/70">
          <Container wide>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 lg:grid-cols-4 lg:py-7">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex min-w-0 items-center gap-3 lg:justify-center lg:gap-4">
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6248CA] shadow-[0_4px_14px_rgba(60,40,120,.12)] sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="flex min-w-0 flex-col-reverse">
                    <dt className="text-xs text-[#6E6D78] sm:text-sm">{label}</dt>
                    <dd className="text-2xl font-light leading-tight tracking-[-0.03em] text-[#232129] sm:text-[32px]">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}

      {/* Overview */}
      <Container wide className="py-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 h-28 w-28"
              style={{ backgroundImage: "radial-gradient(#7057D9 1.5px, transparent 1.5px)", backgroundSize: "14px 14px", opacity: 0.3 }}
            />
            <div className="relative aspect-[2/1] overflow-hidden sm:aspect-[3/2] rounded-2xl bg-[#E7E5EB] shadow-[0_18px_40px_-16px_rgba(40,30,80,.3)]">
              <Image src="/portfolio/photos/team.jpg" alt="The team working together around a table with laptops" fill sizes="(max-width: 1023px) 92vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#6248CA]">{overview.eyebrow}</p>
            <h2 className="mt-3 text-[28px] font-light leading-[1.1] tracking-[-0.04em] text-[#232129] sm:text-4xl lg:text-[44px]">{overview.title}</h2>
            <div className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-[#5F5E69] sm:text-base">
              {overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {/* The one line to remember, set apart from the paragraphs */}
            <p className="mt-5 border-l-2 border-[#7057D9] pl-4 text-[15px] font-normal leading-relaxed text-[#232129] sm:text-[17px]">{overview.focus}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
