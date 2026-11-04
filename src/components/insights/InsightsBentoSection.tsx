import Image from "next/image";
import Link from "next/link";
import { INSIGHTS_CONTENT } from "@/content/insights";

const landingInsights = INSIGHTS_CONTENT.items.slice(0, 5);
type InsightCardItem = (typeof INSIGHTS_CONTENT.items)[number];
type CardLayout = "feature" | "stacked" | "compact";

const CARD_SHELL = "group min-w-0 overflow-hidden rounded-[22px] border border-black/[.06] bg-white p-2 text-[#171717] shadow-[0_2px_6px_rgba(0,0,0,.06),0_16px_36px_rgba(0,0,0,.13)]";
const IMAGE_FRAME = "relative shrink-0 overflow-hidden rounded-[14px] bg-[#e8e8e5]";
const IMAGE_ZOOM = "object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const LAYOUTS: Record<CardLayout, { article: string; link: string; image: string; sizes: string; body: string; title: string }> = {
  feature: {
    article: "md:col-span-2 xl:col-span-8",
    link: "md:flex-row",
    image: "aspect-[16/9] w-full md:aspect-auto md:w-[46%]",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 30vw",
    body: "px-3 pb-2 pt-4 md:px-5 md:py-3",
    title: "text-[24px] leading-[1.15]",
  },
  stacked: {
    article: "xl:col-span-4",
    link: "",
    image: "aspect-[16/9] w-full xl:aspect-[2.2/1]",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 28vw",
    body: "px-3 pb-2 pt-3.5",
    title: "text-[19px] leading-[1.2]",
  },
  compact: {
    article: "min-h-0",
    link: "flex-row",
    image: "w-[32%]",
    sizes: "(max-width: 767px) 32vw, (max-width: 1279px) 16vw, 10vw",
    body: "px-3 py-1.5",
    title: "text-[16px] leading-[1.22]",
  },
};

function InsightCard({ article, layout }: { article: InsightCardItem; layout: CardLayout }) {
  const styles = LAYOUTS[layout];
  const description = layout === "compact" ? article.excerpt : article.summary ?? article.excerpt;

  return (
    <article className={`${CARD_SHELL} transition-shadow duration-300 hover:shadow-[0_3px_8px_rgba(0,0,0,.08),0_22px_46px_rgba(0,0,0,.19)] ${styles.article}`}>
      <Link href={`/insights/${article.slug}`} className={`flex h-full flex-col rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7057D9] ${styles.link}`}>
        <div className={`${IMAGE_FRAME} ${styles.image}`}>
          <Image src={article.image} alt="" fill sizes={styles.sizes} className={IMAGE_ZOOM} />
        </div>
        <div className={`flex min-w-0 flex-1 flex-col ${styles.body}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6049C9]">{article.category}</p>
          <h3 className={`mt-1.5 font-medium tracking-[-0.02em] text-[#171717] transition-colors group-hover:text-[#6049C9] ${styles.title}`}>{article.title}</h3>
          <p className={`mt-1.5 text-black/75 ${layout === "compact" ? "text-[13px] leading-[1.45]" : "text-sm leading-[1.5]"}`}>{description}</p>
          {article.takeaways && article.takeaways.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1 border-t border-black/10 pt-3">
              {article.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-2 text-[13px] font-medium leading-snug text-[#2c2c2e]">
                  <span aria-hidden="true" className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7057D9]" />
                  {takeaway}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 pt-2.5 text-xs text-black/65">
            <span>{article.date} · {article.readTime}</span>
            {layout !== "compact" && <span className="inline-flex items-center gap-1 font-semibold text-[#171717]">Read insight <span aria-hidden="true">↗</span></span>}
          </div>
        </div>
      </Link>
    </article>
  );
}

function FounderCard() {
  return (
    <article className={`${CARD_SHELL} flex flex-col md:col-span-2 md:flex-row xl:col-span-4`}>
      <div className={`${IMAGE_FRAME} aspect-[4/3] w-full md:aspect-auto md:min-h-[290px] md:w-[40%]`}>
        <Image src="/om-bawal-photo.jpg" alt="Om Bawal, Founder and Chief Architect at 21Spheres" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 40vw, 12vw" className={`${IMAGE_ZOOM} object-[50%_15%]`} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-3 pb-2 pt-4 md:px-4 md:py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6049C9]">Founder&apos;s perspective</p>
        <blockquote className="mt-2 text-[15px] leading-[1.45] tracking-[-0.005em] text-[#171717]">“Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”</blockquote>
        <div className="mt-auto pt-3">
          <div className="border-t border-black/10 pt-2.5">
            <p className="text-sm font-semibold text-[#171717]">Om Bawal</p>
            <p className="text-xs text-black/65">Founder &amp; Chief Architect</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function InsightsBentoSection() {
  const [feature, first, second, third, fourth] = landingInsights;

  return (
    <section id="insights" aria-label="Insights and field notes" className="relative w-full scroll-mt-10 bg-[#efefed] py-10 text-[#171717] sm:py-14">
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-10 lg:px-16">
        <header className="mb-5 flex flex-col justify-between gap-3 border-b border-black/15 pb-4 sm:flex-row sm:items-end sm:gap-8">
          <div className="shrink-0">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#6049C9]">Our Insights</p>
            <h2 className="text-3xl font-light leading-none tracking-[-0.04em] md:text-[40px]">Insights</h2>
          </div>
          <p className="max-w-md text-balance text-sm leading-relaxed text-black/65 sm:text-right">Ideas and field notes on building thoughtful, dependable digital products.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12 xl:gap-4">
          <FounderCard />
          <InsightCard article={feature} layout="feature" />
          <InsightCard article={first} layout="stacked" />
          <div className="grid min-w-0 gap-3 md:order-last md:col-span-2 md:grid-cols-2 xl:order-none xl:col-span-4 xl:grid-cols-1 xl:grid-rows-2 xl:gap-4">
            <InsightCard article={second} layout="compact" />
            <InsightCard article={third} layout="compact" />
          </div>
          <InsightCard article={fourth} layout="stacked" />
        </div>

        <div className="mt-7 flex justify-center">
          <Link href="/insights" className="inline-flex items-center gap-3 rounded-full border border-black bg-black px-6 py-3 text-sm font-medium text-white shadow-[0_8px_22px_rgba(0,0,0,.16)] transition hover:border-[#7057D9] hover:bg-[#7057D9]">
            See all insights <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default InsightsBentoSection;
