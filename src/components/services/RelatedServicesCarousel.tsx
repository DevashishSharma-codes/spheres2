"use client";

import { useCallback, useEffect, useState, type TransitionEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_CONTENT } from "@/content/services";

const STEP_MS = 3800; // the same rhythm as the About Us carousel
const SLIDE_MS = 600;

/**
 * Every other service, those in the same category first. Like the About Us carousel it moves one
 * card, rests, then moves the next, and never ends: the list sits three times in a row, and when
 * the view drifts into the first or last copy it jumps, unseen, to the same card in the middle one.
 * Hovering pauses it; the arrows step by hand.
 */
export function RelatedServicesCarousel({ currentId }: { currentId: string }) {
  const services = SERVICES_CONTENT.services;
  const current = services.find((service) => service.id === currentId);
  const others = services.filter((service) => service.id !== currentId);
  const related = [
    ...others.filter((service) => service.category === current?.category),
    ...others.filter((service) => service.category !== current?.category),
  ];
  const count = related.length;

  const [index, setIndex] = useState(count); // the start of the middle copy
  const [sliding, setSliding] = useState(true);
  const [paused, setPaused] = useState(false);

  const step = useCallback((direction: 1 | -1) => {
    setSliding(true);
    setIndex((value) => value + direction);
  }, []);

  // Back into the middle copy, without animating, once a slide ends in an outer copy.
  // Only the row's own slide counts, not a card's hover transition bubbling up.
  const settle = (event: TransitionEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (index >= count * 2 || index < count) {
      setSliding(false);
      setIndex((value) => (value >= count * 2 ? value - count : value + count));
    }
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => step(1), STEP_MS);
    return () => clearTimeout(timer);
  }, [index, paused, step]);

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[color:var(--rs-ink)] transition-colors hover:border-[#9D85F2] hover:text-[#C9BBFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9D85F2]";

  return (
    <section
      aria-labelledby="related-services-title"
      // Reads the footer zone's ink, so it suits both the dark (service pages) and light footer.
      className="mx-auto w-full max-w-[1380px] px-4 pb-14 pt-6 [--rs-ink:var(--cone-ink,#19191C)] sm:px-6 sm:pb-16 lg:px-8"
    >
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C9BBFF]">Similar services</p>
          <h2 id="related-services-title" className="text-[24px] font-light leading-none tracking-[-0.035em] text-[color:var(--rs-ink)] sm:text-[30px]">
            Explore more of what we build
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Previous service" onClick={() => step(-1)} className={arrow}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next service" onClick={() => step(1)} className={arrow}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="mask-gradient-sides overflow-hidden [--rs-card:280px] [--rs-step:296px] sm:[--rs-card:340px] sm:[--rs-step:356px]"
      >
        <ul
          onTransitionEnd={settle}
          className="flex"
          style={{
            transform: `translateX(calc(${-index} * var(--rs-step)))`,
            transition: sliding ? `transform ${SLIDE_MS}ms cubic-bezier(.22,.61,.36,1)` : "none",
          }}
        >
          {[...related, ...related, ...related].map((service, position) => {
            const copy = position < count || position >= count * 2;
            return (
              <li key={`${service.id}-${position}`} aria-hidden={copy || undefined} className="w-[var(--rs-step)] shrink-0 pr-4">
                <Link
                  href={`/services/${service.id}`}
                  tabIndex={copy ? -1 : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9D85F2]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.cardImage ?? "/about/corp-performance.jpg"}
                      alt=""
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                      style={{ objectPosition: service.cardImagePosition }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    {service.category && <p className="text-[11px] uppercase tracking-[0.12em] text-[#C9BBFF]/80">{service.category}</p>}
                    <h3 className="mt-1.5 flex items-start justify-between gap-3 text-[17px] font-normal leading-snug tracking-[-0.015em] text-white/90">
                      {service.title}
                      <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] font-light leading-relaxed text-white/55">{service.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
