import Image from "next/image";
import Link from "next/link";
import { PillArrow, PillLink, pillClassName } from "@/components/ui/PillLink";
import { INSIGHTS_CONTENT } from "@/content/insights";

type InsightItem = (typeof INSIGHTS_CONTENT.items)[number];

const TILE = "group relative isolate flex min-w-0 overflow-hidden rounded-[22px] border border-[#7057D9]/15 bg-[#efeaff] shadow-[0_2px_6px_rgba(90,67,192,.08),0_18px_38px_-10px_rgba(90,67,192,.32)] transition-shadow duration-300 hover:shadow-[0_3px_8px_rgba(90,67,192,.1),0_26px_50px_-10px_rgba(90,67,192,.45)]";
const GLASS = "rounded-[16px] border border-white/70 bg-white/[.95] shadow-[0_14px_32px_-14px_rgba(60,40,140,.55)] backdrop-blur-xl";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7057D9]";
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6049C9]";
const META = "text-xs text-black/60";
const ZOOM = "object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

function FeatureTile({ article, image }: { article: InsightItem; image: string }) {
  return (
    <article className={`${TILE} md:col-span-2 xl:col-span-8`}>
      <Image src={image} alt="" fill sizes="(max-width: 1279px) 100vw, 40vw" className={`-z-10 ${ZOOM}`} />
      <Link href={`/insights/${article.slug}`} className={`flex w-full flex-col justify-end rounded-[22px] p-2.5 pt-44 xl:flex-row xl:pt-2.5 ${FOCUS}`}>
        <div className={`${GLASS} flex flex-col gap-4 p-4 sm:p-5 xl:w-[56%]`}>
          <div className="min-w-0">
            <p className={LABEL}>{article.category}</p>
            <h3 className="mt-2 text-[24px] font-light leading-[1.15] tracking-[-0.03em] text-[#171717] sm:text-[28px]">{article.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70">{article.excerpt}</p>
          </div>
          <div className="mt-auto flex min-w-0 flex-col gap-3">
            {article.takeaways && (
              <ul className="divide-y divide-[#7057D9]/15 border-y border-[#7057D9]/15 text-[13px] leading-snug text-[#2c2c2e]">
                {article.takeaways.map((takeaway) => <li key={takeaway} className="py-1.5">{takeaway}</li>)}
              </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={META}>{article.date} · {article.readTime}</span>
              <span className={pillClassName("sm")}>Read insight<PillArrow size="sm" /></span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function StackedTile({ article, image }: { article: InsightItem; image: string }) {
  return (
    <article className={`${TILE} xl:col-span-4`}>
      <Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 31vw" className={`-z-10 ${ZOOM}`} />
      <Link href={`/insights/${article.slug}`} className={`flex w-full flex-col justify-end rounded-[22px] p-2.5 pt-36 ${FOCUS}`}>
        <div className={`${GLASS} p-4`}>
          <p className={LABEL}>{article.category}</p>
          <h3 className="mt-2 text-[19px] font-normal leading-[1.2] tracking-[-0.02em] text-[#171717]">{article.title}</h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className={META}>{article.date} · {article.readTime}</span>
            <PillArrow size="sm" />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** The portrait is shown whole: the frame matches the photo's square shape, and nothing sits on top of it. */
function FounderCard() {
  return (
    <article className="flex min-w-0 flex-col gap-1 rounded-[22px] border border-[#7057D9]/15 bg-gradient-to-b from-white to-[#f3efff] p-2 shadow-[0_2px_6px_rgba(90,67,192,.08),0_18px_38px_-10px_rgba(90,67,192,.32)] md:col-span-2 md:flex-row md:gap-3 xl:col-span-4 xl:row-span-2 xl:flex-col xl:gap-1">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[15px] bg-[#efeaff] md:w-[42%] xl:w-full">
        <Image src="/om-bawal-photo.jpg" alt="Om Bawal, Founder and Chief Architect at 21Spheres" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 31vw" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-3 pb-2 pt-3">
        <p className={LABEL}>Founder&apos;s perspective</p>
        <blockquote className="mt-2.5 text-[17px] font-light leading-[1.4] tracking-[-0.01em] text-[#171717] md:text-[24px] xl:text-[17px]">“Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”</blockquote>
        <div className="mt-auto pt-4">
          <div className="border-t border-[#7057D9]/20 pt-3">
            <p className="text-[15px] font-medium text-[#171717]">Om Bawal</p>
            <p className="mt-0.5 text-[13px] text-black/60">Founder &amp; Chief Architect, 21Spheres</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function InsightsBentoSection() {
  const [feature, first, second] = INSIGHTS_CONTENT.items;

  return (
    <section id="insights" aria-label="Insights and field notes" className="relative w-full scroll-mt-14 pb-12 pt-6 text-black sm:scroll-mt-16 sm:pb-16"
      style={{ background: "radial-gradient(ellipse 55% 45% at 88% 62%, rgba(112,87,217,.05) 0%, transparent 100%), linear-gradient(180deg, #ffffff 0%, #fdfcff 50%, #f9f7ff 100%)" }}
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-3 border-b border-[#7057D9]/20 pb-4 sm:flex-row sm:items-baseline lg:mb-8">
          <div className="shrink-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#7C3AED] sm:text-[13px]">Our Insights</p>
            <h2 className="text-3xl font-light leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-[52px]">Insights</h2>
          </div>
          <p className="max-w-lg text-xs leading-relaxed text-[#383842] sm:text-right sm:text-sm">Ideas and field notes on building thoughtful, dependable digital products.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12 xl:gap-4">
          <FounderCard />
          <FeatureTile article={feature} image="/insights/bento-curves.jpg" />
          <StackedTile article={first} image="/insights/bento-waves.jpg" />
          <StackedTile article={second} image="/services/ai/clouds.jpg" />
        </div>

        <div className="mt-8 flex justify-center">
          <PillLink href="/insights">See all insights</PillLink>
        </div>
      </div>
    </section>
  );
}

export default InsightsBentoSection;
