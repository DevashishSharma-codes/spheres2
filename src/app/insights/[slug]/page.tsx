import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { PageBackButton } from "@/components/ui/PageBackButton";

export function generateStaticParams() {
  return INSIGHTS_CONTENT.items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_CONTENT.items.find((item) => item.slug === slug);
  const title = article?.title ?? slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  return { title: `${title} — 21Spheres Insights`, description: article?.excerpt ?? `A practical 21Spheres perspective on ${title.toLowerCase()}.` };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const matchedArticle = INSIGHTS_CONTENT.items.find((item) => item.slug === slug);
  const article = matchedArticle ?? {
    id: slug,
    slug,
    title: slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
    date: "NOV 2026",
    readTime: "6 MIN READ",
    category: "21SPHERES PERSPECTIVE",
    excerpt: "A practical perspective on shaping digital products around real customer needs, clear measures of success, and technology that can grow with the business.",
    image: "/about/corp-performance.jpg",
    assetType: "Perspectives",
    industry: "Technology",
    topic: "Digital engineering",
  };
  const articleReadTime = article.readTime ?? "6 MIN READ";
  const articleIndustry = article.industry ?? "Technology";
  const articleTopic = article.topic ?? "Digital engineering";
  const articleImage = article.image || "/about/corp-performance.jpg";

  const related = INSIGHTS_CONTENT.items.filter((item) => item.slug !== article.slug && (item.topic === article.topic || item.industry === article.industry)).slice(0, 3);
  const sections = [
    { heading: "Start with the real need", body: `The most useful work starts by understanding the people and decisions behind ${article.title.toLowerCase()}. Teams can then focus on the moments that create friction, establish what success looks like, and make practical choices around the customer and business outcome.` },
    { heading: "Build a foundation that can evolve", body: `${article.excerpt} A clear foundation keeps the experience understandable as requirements grow. Define ownership, make important assumptions visible, and create a small set of reusable patterns that teams can improve over time.` },
    { heading: "Make progress measurable", body: `Choose a few signals that reflect the outcome, such as completion time, service reliability, adoption, or customer satisfaction. Review them with the people closest to the work, learn from the gaps, and adjust the next iteration based on evidence.` },
    { heading: "Bring people along", body: `Good change is collaborative. Include business, design, engineering, and operations early so that the solution fits the way people work. Document decisions in plain language and give teams a clear path to maintain what they launch.` },
  ];

  return <main className="min-h-screen bg-white text-[#171717]">
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#171717] text-white">
      <div aria-hidden="true" className="insight-article-hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${articleImage}")` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-x-0 top-4 z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-16"><PageBackButton /></div>
      <div className="relative mx-auto w-full max-w-[1380px] px-6 pb-14 pt-28 sm:px-10 sm:pb-20 lg:px-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Insights <span className="px-2">/</span> {article.category}</p>
        <h1 className="max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">{article.title}</h1>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/35 pt-5 text-sm text-white/75"><span>{article.date}</span><span>{article.readTime}</span><span>21Spheres Insights</span></div>
      </div>
    </section>
    <div className="mx-auto grid max-w-[1180px] gap-14 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-24 lg:px-12">
      <article>
        <p className="mb-10 text-xl font-light leading-relaxed text-black/70 sm:text-2xl">{article.excerpt}</p>
        {sections.map((section) => <section key={section.heading} className="mb-10">
          <h2 className="mb-4 text-2xl font-medium tracking-tight sm:text-3xl">{section.heading}</h2>
          <p className="text-base leading-8 text-black/70">{section.body}</p>
        </section>)}
        <div className="mt-12 border-t border-black/10 pt-6 text-sm text-black/50">Filed under {articleTopic} · {articleIndustry}</div>
      </article>
      <aside className="h-fit border-t border-black/15 pt-5 lg:sticky lg:top-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/50">At a glance</p>
        <p className="mt-4 text-sm leading-relaxed text-black/65">A {articleReadTime.toLowerCase()} perspective for teams working across {articleIndustry.toLowerCase()} and {articleTopic.toLowerCase()}.</p>
        <Link href="/insights" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Browse all insights <span aria-hidden="true">↗</span></Link>
      </aside>
    </div>
    <section className="bg-[#f7f7f5] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1380px]">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-black/50">Keep exploring</p>
        <h2 className="mb-8 text-3xl font-light tracking-[-0.04em] sm:text-4xl">Related insights</h2>
        <div className="grid gap-7 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/insights/${item.slug}`} className="group">
          <div className="relative mb-4 aspect-[1.6] overflow-hidden bg-[#dededb]"><Image src={item.image || "/about/corp-performance.jpg"} alt="Professionals collaborating in a modern workplace" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/50">{item.category} <span className="px-1">|</span> {item.readTime}</p>
          <h3 className="text-xl leading-snug group-hover:underline group-hover:underline-offset-4">{item.title}</h3>
        </Link>)}</div>
      </div>
    </section>
  </main>;
}
