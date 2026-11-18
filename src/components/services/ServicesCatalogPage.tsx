"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import {
  SERVICE_CATEGORIES,
  SERVICES_FAQ,
  type CatalogService,
} from "@/content/servicesCatalog";

/*
 * The /services page: the photo banner and Overview, a sticky category nav, services grouped by category, an FAQ, then the footer's closing line and call to action.
 *
 * Layout by width (real changes, not just stacking):
 *  - phones: each service is a compact row (icon | name + one line | chevron) that expands in place;
 *    a single "Browse services" picker sits pinned under the site header.
 *  - tablets: a two-column card grid, with every category chip visible in a pinned row.
 *  - desktop: a sticky category sidebar beside a card grid that fits as many columns as there's room for.
 * Spacing comes from one scale: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64px.
 */

const INK = "text-[#1C1B22]";
const MUTED = "text-[#6E6D78]";
const ACCENT = "#6248CA";

/** Smoothly opens and closes its content; instant for people who prefer reduced motion. */
function Collapse({ open, id, children }: { open: boolean; id: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-[#F1EEFB] px-2.5 py-1 text-[12px] leading-none text-[#4A4458]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Stack({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <p className={`text-[12px] ${MUTED}`}>
      <span className="text-[#9A99A3]">Stack</span> &middot; {items.join(" · ")}
    </p>
  );
}

/** One service: a row on phones, a card from tablets up. The header opens its details. */
function ServiceItem({ service, open, onToggle }: { service: CatalogService; open: boolean; onToggle: () => void }) {
  const Icon = service.icon;
  const panelId = `${service.id}-details`;
  return (
    <article id={service.id} className="scroll-mt-40 sm:rounded-[18px] sm:border sm:border-[#ECEAF2] sm:bg-[#FCFBFE] sm:p-5 lg:scroll-mt-24">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[68px] w-full items-center gap-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9] sm:min-h-[44px] sm:items-start sm:py-0"
        >
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1EEFB]" style={{ color: ACCENT }}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block text-[15px] font-medium leading-snug tracking-[-0.01em] ${INK}`}>{service.name}</span>
            <span className={`mt-0.5 block text-[13px] leading-snug ${MUTED} ${open ? "" : "line-clamp-1 sm:line-clamp-none"}`}>{service.summary}</span>
          </span>
          <span className={`flex shrink-0 items-center gap-1 text-[12px] ${MUTED}`}>
            <span className="hidden sm:inline">{open ? "Less" : "Details"}</span>
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
          </span>
        </button>
      </h3>

      {/* Tablets and up: deliverables and stack are always on the card */}
      <div className="mt-4 hidden space-y-3 sm:block">
        <Chips items={service.deliverables} />
        <Stack items={service.stack} />
      </div>

      <Collapse open={open} id={panelId}>
        <div className="space-y-4 pb-4 pt-1 sm:mt-4 sm:border-t sm:border-[#ECEAF2] sm:pb-0 sm:pt-4">
          {/* Phones: deliverables and stack live inside the expanded row */}
          <div className="space-y-3 sm:hidden">
            <Chips items={service.deliverables} />
            <Stack items={service.stack} />
          </div>
          <p className="max-w-[65ch] text-[14px] leading-relaxed text-[#3F3D48]">{service.details.lead}</p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {service.details.scope.map((part) => (
              <div key={part.title}>
                <dt className={`text-[13px] font-medium ${INK}`}>{part.title}</dt>
                <dd className={`mt-0.5 text-[13px] leading-snug ${MUTED}`}>{part.includes.join(" · ")}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/services/${service.id}`}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-medium underline-offset-4 hover:underline"
            style={{ color: ACCENT }}
          >
            Full service page <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Collapse>
    </article>
  );
}

export function ServicesCatalogPage() {
  const [active, setActive] = useState(SERVICE_CATEGORIES[0].id);
  // One open service per category, which keeps the page short.
  const [openIds, setOpenIds] = useState<Record<string, string | null>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Highlight the category being read.
  useEffect(() => {
    const sections = SERVICE_CATEGORIES.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const toggle = (categoryId: string, serviceId: string) =>
    setOpenIds((current) => ({ ...current, [categoryId]: current[categoryId] === serviceId ? null : serviceId }));

  return (
    <div className="bg-white text-[#1C1B22]">
      {/* The photo banner with the page title, then the Overview */}
      <ServicesIntro />

      {/* ── Category nav (phones and tablets): pinned under the site header ── */}
      <div className="sticky top-14 z-20 border-b border-[#ECEAF2] bg-white/95 backdrop-blur sm:top-16 lg:hidden">
        <Container wide className="py-2">
          {/* Phones: one picker, so nothing is hidden off-screen */}
          <label className="flex items-center gap-3 sm:hidden">
            <span className={`shrink-0 text-[12px] ${MUTED}`}>Browse services</span>
            <span className="relative flex-1">
              <select
                value={active}
                onChange={(event) => jumpTo(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-[#E4E1EE] bg-white pl-3 pr-9 text-[14px] font-medium text-[#1C1B22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7057D9]"
              >
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.services.length})
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${MUTED}`} />
            </span>
          </label>
          {/* Tablets: every category as a chip, wrapping rather than scrolling */}
          <nav aria-label="Service categories" className="hidden flex-wrap gap-2 sm:flex">
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = category.id === active;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    jumpTo(category.id);
                  }}
                  className={`inline-flex h-11 items-center rounded-full border px-4 text-[13px] transition-colors ${
                    isActive ? "border-[#6248CA] bg-[#6248CA] text-white" : "border-[#E4E1EE] text-[#3F3D48] hover:border-[#6248CA]/50"
                  }`}
                >
                  {category.name}
                </a>
              );
            })}
          </nav>
        </Container>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <Container wide>
        <div id="all-services" className="scroll-mt-32 lg:grid lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-12">
          {/* Desktop: sticky sidebar */}
          <aside className="hidden lg:block">
            <nav aria-label="Service categories" className="sticky top-24 py-12">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${MUTED}`}>Categories</p>
              <ul className="mt-3 space-y-1">
                {SERVICE_CATEGORIES.map((category) => {
                  const isActive = category.id === active;
                  return (
                    <li key={category.id}>
                      <a
                        href={`#${category.id}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          jumpTo(category.id);
                        }}
                        className={`flex min-h-[44px] items-center justify-between gap-3 border-l-2 pl-3 text-[14px] transition-colors ${
                          isActive ? "border-[#6248CA] font-medium text-[#1C1B22]" : `border-transparent ${MUTED} hover:text-[#1C1B22]`
                        }`}
                      >
                        {category.name}
                        <span className="text-[12px] tabular-nums text-[#9A99A3]">{category.services.length}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            {SERVICE_CATEGORIES.map((category) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                className="scroll-mt-32 border-b border-[#ECEAF2] py-8 sm:scroll-mt-36 sm:py-10 lg:scroll-mt-24 lg:py-12"
              >
                <div className="mb-4 flex items-baseline justify-between gap-4 sm:mb-6">
                  <div>
                    <h2 id={`${category.id}-title`} className="text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-normal tracking-[-0.02em]">{category.name}</h2>
                    <p className={`mt-1 max-w-[65ch] text-[14px] ${MUTED}`}>{category.description}</p>
                  </div>
                  <span className={`shrink-0 text-[12px] tabular-nums ${MUTED}`}>
                    {category.services.length} {category.services.length === 1 ? "service" : "services"}
                  </span>
                </div>
                {/* Phones: a divided list. Tablets and up: cards in as many columns as fit. */}
                <div className="divide-y divide-[#ECEAF2] border-y border-[#ECEAF2] sm:grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:items-start sm:gap-4 sm:divide-y-0 sm:border-0">
                  {category.services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      open={openIds[category.id] === service.id}
                      onToggle={() => toggle(category.id, service.id)}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* ── FAQ ─────────────────────────────────────────── */}
            <section aria-labelledby="faq-title" className="py-8 sm:py-10 lg:py-12">
              <h2 id="faq-title" className="text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-normal tracking-[-0.02em]">Questions</h2>
              <ul className="mt-4 divide-y divide-[#ECEAF2] border-y border-[#ECEAF2] sm:mt-6">
                {SERVICES_FAQ.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <li key={item.q}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`faq-${i}`}
                          onClick={() => setOpenFaq(open ? null : i)}
                          className="flex min-h-[56px] w-full items-center justify-between gap-4 py-3 text-left text-[15px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
                        >
                          {item.q}
                          <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${MUTED} ${open ? "rotate-180" : ""}`} />
                        </button>
                      </h3>
                      <Collapse open={open} id={`faq-${i}`}>
                        <p className={`max-w-[65ch] pb-4 text-[14px] leading-relaxed ${MUTED}`}>{item.a}</p>
                      </Collapse>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </Container>

    </div>
  );
}
