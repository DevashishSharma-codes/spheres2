"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { FOUNDER_ESSAYS, type EssayBlock } from "@/content/founderNoteEssays";
import { OmBavalSignature } from "@/components/ui/OmBavalSignature";

/*
 * A quiet, app-like reading layout: a slim contents sidebar, a centre column edged by hairlines with
 * grey labels on the left and the writing on the right, and an outline panel for the essay being read.
 */

const TOTAL_MIN = 3 + FOUNDER_ESSAYS.reduce((sum, e) => sum + e.readMinutes, 0);
const num = (i: number) => String(i + 1).padStart(2, "0");
const headingId = (slug: string, k: number) => `${slug}--${k}`;

const TEXT = "text-[15px] leading-[1.75] text-[#2A2A2E]";
const MUTED = "text-[#8A8A93]";
const HAIR = "border-[#EDECF2]";
/* Label on the left, content on the right, as in a profile page */
const ROW = "grid gap-y-3 py-10 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-x-8";

function Block({ block, id }: { block: EssayBlock; id?: string }) {
  switch (block.type) {
    case "h2":
      return <h3 id={id} className="scroll-mt-28 pt-5 text-[15px] font-semibold text-[#171717]">{block.text}</h3>;
    case "h3":
      return <h4 className="pt-1 text-[15px] font-medium text-[#171717]">{block.text}</h4>;
    case "p":
      return <p className={TEXT}>{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className={`${TEXT} relative pl-4`}>
              <span aria-hidden="true" className={`absolute left-0 ${MUTED}`}>&ndash;</span>
              {typeof item === "string" ? item : <><span className="text-[#171717]">{item.term}</span> <span className={MUTED}>&mdash;</span> {item.text}</>}
            </li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <dl className={`divide-y ${HAIR} border-y ${HAIR}`}>
          {block.items.map((item) => (
            <div key={item.term} className="grid gap-1 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5">
              <dt className="text-[14px] text-[#171717]">{item.term}</dt>
              <dd className={`text-[14px] leading-[1.7] ${MUTED}`}>{item.text}</dd>
            </div>
          ))}
        </dl>
      );
    case "closing":
      return <p className="border-l border-[#7057D9] pl-4 text-[15px] font-medium leading-[1.7] text-[#171717]">{block.text}</p>;
  }
}

export function FounderNote({ dek }: { dek: string }) {
  // -1 is the note; 0..n are the essays.
  const [active, setActive] = useState(-1);
  // Phones show the essays as a list you open one at a time; desktop shows them all.
  const [open, setOpen] = useState<number | null>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);

  const openEssay = (index: number | null) => {
    setOpen(index);
    if (index === null) return;
    history.replaceState(null, "", `#${FOUNDER_ESSAYS[index].slug}`);
    // Wait for the essay to expand, then bring its top into view.
    requestAnimationFrame(() => sections.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  // A link to an essay (#slug) opens it on phones too.
  useEffect(() => {
    const index = FOUNDER_ESSAYS.findIndex(({ slug }) => `#${slug}` === window.location.hash);
    if (index < 0) return;
    const frame = requestAnimationFrame(() => openEssay(index));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = -1;
      sections.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const essay = active >= 0 ? FOUNDER_ESSAYS[active] : null;
  const outline = essay ? essay.blocks.filter((b) => b.type === "h2") : [];

  const navItem = (selected: boolean) =>
    `relative block py-1 text-[13px] leading-snug transition-colors ${selected ? "text-[#171717]" : `${MUTED} hover:text-[#171717]`}`;
  const marker = (selected: boolean) => (
    <span aria-hidden="true" className={`absolute -left-3.5 top-[0.45em] text-[8px] text-[#171717] transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}>&#9654;</span>
  );

  return (
    <div className="mx-auto grid w-full max-w-[1240px] px-4 sm:px-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[210px_minmax(0,1fr)_250px]">
      {/* ── Contents ─────────────────────────────── */}
      <aside className="hidden lg:block">
        <nav aria-label="Contents" className="sticky top-16 max-h-[calc(100svh-4rem)] overflow-y-auto py-12 pl-4 pr-8 [scrollbar-width:none]">
          <Link href="/insights" className={`inline-flex items-center gap-1.5 text-[13px] ${MUTED} transition-colors hover:text-[#171717]`}>
            <ArrowLeft className="h-3.5 w-3.5" /> Insights
          </Link>

          <a href="#note" className={`${navItem(active === -1)} mt-8`}>{marker(active === -1)}Founder&rsquo;s Note</a>

          {/* The sections sit under the note, as parts of it */}
          <ol className="ml-1 mt-2 space-y-1 border-l border-[#E7E5EB] pl-4">
            {FOUNDER_ESSAYS.map((e, i) => (
              <li key={e.slug}>
                <a href={`#${e.slug}`} aria-current={active === i ? "true" : undefined} className={navItem(active === i)}>
                  {marker(active === i)}
                  {e.title.split(":")[0]}
                </a>
              </li>
            ))}
          </ol>

          <p className={`mt-8 text-[11px] leading-relaxed ${MUTED}`}>21 Spheres &middot; A World Within.<br />Notes from the founder.</p>
        </nav>
      </aside>

      {/* ── Writing ──────────────────────────────── */}
      <main className={`min-w-0 lg:border-x ${HAIR}`}>
        <div className="mx-auto max-w-[680px] lg:px-10">
          {/* Mobile: the way back, since the sidebar is hidden */}
          <Link href="/insights" className={`mt-6 inline-flex items-center gap-1.5 text-[13px] lg:hidden ${MUTED}`}>
            <ArrowLeft className="h-3.5 w-3.5" /> Insights
          </Link>

          {/* Header */}
          <header id="note" className="scroll-mt-28 pb-7 pt-6 sm:pb-8 sm:pt-10 lg:pt-14">
            {/* Author: side by side on phones, stacked on larger screens */}
            <div className="flex items-center gap-3 sm:block">
              <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 sm:h-12 sm:w-12">
                <Image src="/om-bawal-photo.jpg" alt="Om Baval" fill sizes="48px" className="object-cover object-[50%_22%]" />
              </span>
              <div className="sm:mt-5">
                <p className="text-[15px] text-[#171717]">Om Baval</p>
                <p className="text-[14px] text-[#2A2A2E] sm:text-[15px]">Founder &amp; CEO, 21 Spheres</p>
              </div>
            </div>
            <p className={`mt-3 text-[12px] ${MUTED}`}>A World Within &middot; {FOUNDER_ESSAYS.length} sections &middot; {TOTAL_MIN} min read</p>

            <h1 className="mt-6 text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-[#171717] sm:mt-8 sm:text-[28px]">
              Building beyond what exists. Creating what comes next.
            </h1>
            <p className={`mt-3 text-[15px] leading-[1.7] ${MUTED}`}>{dek}</p>
          </header>


          {/* The note */}
          <section aria-label="A note from the founder" className={`${ROW} border-b ${HAIR} !py-8 sm:!py-10`}>
            <p className={`hidden text-[14px] sm:block ${MUTED}`}>Note</p>
            <div className="space-y-5">
              <h2 className="text-[17px] font-medium text-[#171717]">A belief that became a journey.</h2>
              <p className={TEXT}>Hello, and welcome to 21 Spheres.</p>
              <p className={TEXT}>
                When I started 21 Spheres, I had a simple belief: technology has the power to reshape how we think, work, build, and
                experience the world. But meaningful innovation goes beyond simply adopting new technologies. It comes from
                understanding problems deeply, questioning conventional approaches, and having the courage to build something different.
              </p>
              <p className={TEXT}>That belief became the foundation of 21 Spheres.</p>
              <p className={TEXT}>
                We started with the ambition to explore the possibilities of technology and turn ideas into meaningful solutions. Today,
                we are building at the intersection of software engineering, artificial intelligence, and research, helping businesses
                navigate complexity and discover new opportunities through technology.
              </p>
              <blockquote className="border-l border-[#7057D9] pl-4 text-[15px] font-medium leading-[1.7] text-[#171717]">
                I believe the future belongs to those who are willing to explore it.
              </blockquote>
              <p className={TEXT}>
                At 21 Spheres, we don&rsquo;t want to limit ourselves to what technology can do today. We want to continuously
                experiment, learn, challenge assumptions, and push boundaries. Every project is an opportunity to solve something
                meaningful, every challenge an opportunity to grow, and every idea a possibility waiting to be explored.
              </p>
              <p className={TEXT}>
                Building a company is never a solo journey. It takes people who share the curiosity to explore, the discipline to
                execute, and the determination to keep moving forward. I am grateful to everyone who has been part of this journey:
                our team, clients, collaborators, and everyone who has believed in what we are building.
              </p>
              <p className={TEXT}>
                As we move forward, our ambition remains unchanged: to build thoughtfully, innovate responsibly, and create technology
                that makes a difference.
              </p>
              <p className={TEXT}>This is just the beginning.</p>
            </div>
          </section>

          {/* Sign-off: the signature is the name, so only the title follows. Lined up with the letter above. */}
          <div className={`border-b ${HAIR} pb-12 pt-4 sm:pl-[128px]`}>
            <OmBavalSignature className="-ml-0.5 h-9 w-auto text-[#171717] sm:h-10" />
            <p className="mt-5 text-[14px] text-[#2A2A2E]">Founder &amp; CEO, 21 Spheres</p>
            <p className={`mt-1 text-[14px] italic ${MUTED}`}>A World Within.</p>
          </div>

          {/* Phones: a short heading, since the essays start closed */}
          <div id="essays" className="scroll-mt-28 pb-1 pt-8 lg:hidden">
            <p className="text-[15px] font-medium text-[#171717]">Sections</p>
            <p className={`mt-0.5 text-[13px] ${MUTED}`}>Tap a section to read it.</p>
          </div>

          {/* The essays: one after another on desktop, opened one at a time on phones */}
          {FOUNDER_ESSAYS.map((e, i) => {
            let k = 0;
            const isOpen = open === i;
            return (
              <article
                key={e.slug}
                id={e.slug}
                ref={(el) => { sections.current[i] = el; }}
                aria-labelledby={`${e.slug}-title`}
                className={`${ROW} scroll-mt-28 border-b ${HAIR} !py-5 lg:scroll-mt-20 lg:!py-10`}
              >
                <div className={`hidden text-[14px] sm:block ${MUTED}`}>
                  <p>{num(i)}</p>
                  <p className="text-[12px]">{e.readMinutes} min</p>
                </div>
                <div className="min-w-0 space-y-4">
                  {/* On phones the title row opens and closes the essay; on desktop it is just the title */}
                  <button
                    type="button"
                    onClick={() => openEssay(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`${e.slug}-body`}
                    className="flex w-full items-start gap-3 text-left lg:pointer-events-none lg:cursor-default"
                  >
                    <span className="min-w-0 flex-1">
                      <span className={`mb-1 block text-[12px] sm:hidden ${MUTED}`}>{num(i)} &middot; {e.readMinutes} min read</span>
                      <h2 id={`${e.slug}-title`} className="text-[17px] font-medium leading-snug tracking-[-0.01em] text-[#171717] lg:text-[19px]">{e.title}</h2>
                      <span className={`mt-1.5 block text-[14px] leading-[1.6] lg:mt-4 lg:text-[15px] lg:leading-[1.7] ${MUTED} ${isOpen ? "" : "line-clamp-2 lg:line-clamp-none"}`}>{e.dek}</span>
                    </span>
                    <ChevronDown aria-hidden="true" className={`mt-6 h-4 w-4 shrink-0 text-[#8A8A93] transition-transform duration-300 sm:mt-1 lg:hidden ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div id={`${e.slug}-body`} className={`space-y-4 pt-2 ${isOpen ? "block" : "hidden"} lg:block`}>
                    {e.blocks.map((block, j) => (
                      <Block key={j} block={block} id={block.type === "h2" ? headingId(e.slug, k++) : undefined} />
                    ))}

                    {i < FOUNDER_ESSAYS.length - 1 && (
                      <>
                        {/* Desktop: the next essay follows anyway, so a quiet link */}
                        <a href={`#${FOUNDER_ESSAYS[i + 1].slug}`} className={`group !mt-10 hidden items-baseline gap-2 text-[13px] lg:flex ${MUTED} transition-colors hover:text-[#171717]`}>
                          Next <span className="truncate text-[#171717] underline decoration-[#D6D5DE] underline-offset-4 group-hover:decoration-[#171717]">{FOUNDER_ESSAYS[i + 1].title}</span>
                        </a>
                        {/* Phones: close this essay and open the next */}
                        <button
                          type="button"
                          onClick={() => openEssay(i + 1)}
                          className={`!mt-8 flex w-full items-center justify-between gap-3 rounded-xl border ${HAIR} px-4 py-3 text-left lg:hidden`}
                        >
                          <span className="min-w-0">
                            <span className={`block text-[12px] ${MUTED}`}>Next section</span>
                            <span className="mt-0.5 block truncate text-[14px] text-[#171717]">{FOUNDER_ESSAYS[i + 1].title}</span>
                          </span>
                          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#171717]" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          <div className="py-12 text-center">
            <Link href="/insights" className={`text-[13px] ${MUTED} underline decoration-[#D6D5DE] underline-offset-4 transition-colors hover:text-[#171717]`}>
              More from 21 Spheres Insights
            </Link>
          </div>
        </div>
      </main>

      {/* ── Outline ──────────────────────────────── */}
      <aside className="hidden xl:block">
        <div className="sticky top-16 max-h-[calc(100svh-4rem)] overflow-y-auto py-12 pl-8 [scrollbar-width:none]">
          <p className={`text-[11px] uppercase tracking-[0.12em] ${MUTED}`}>Reading</p>
          <p className="mt-2 text-[13px] leading-snug text-[#171717]">{essay ? essay.title : "A note from the founder"}</p>
          <div className={`mt-3 h-px w-full ${HAIR} border-t`}>
            <div className="-mt-px h-px bg-[#171717] transition-[width] duration-500" style={{ width: `${((active + 2) / (FOUNDER_ESSAYS.length + 1)) * 100}%` }} />
          </div>
          <p className={`mt-2 text-[12px] ${MUTED}`}>{essay ? `Section ${num(active)} of ${FOUNDER_ESSAYS.length}` : `${FOUNDER_ESSAYS.length} sections follow`}</p>

          {outline.length > 0 && (
            <>
              <p className={`mt-10 text-[11px] uppercase tracking-[0.12em] ${MUTED}`}>TL;DR</p>
              <ol className="mt-2 space-y-1">
                {outline.map((h, k) => (
                  <li key={k}>
                    <a href={`#${headingId(essay!.slug, k)}`} className={`block py-1 text-[13px] leading-snug ${MUTED} transition-colors hover:text-[#171717]`}>
                      {h.type === "h2" ? h.text : null}
                    </a>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
