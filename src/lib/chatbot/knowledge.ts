import "server-only";

import { ABOUT_CARDS, ABOUT_INTRO } from "@/content/about";
import {
  COMPANY_ADDRESSES,
  COMPANY_BOOKING_URL,
  COMPANY_EMAIL,
  COMPANY_GSTIN,
  COMPANY_PHONE,
  COMPANY_SOCIALS,
  COMPANY_TM_APPLICATION,
} from "@/content/company";
import { FOUNDER_ESSAYS, FOUNDER_LETTER, type EssayBlock } from "@/content/founderNoteEssays";
import { HOW_WE_WORK_INTRO, WORK_FLOORPLAN_STEPS } from "@/content/howWeWork";
import { INDUSTRIES_CONTENT } from "@/content/industries";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { NAVIGATION_ITEMS } from "@/content/navigation";
import { PORTFOLIO_CASE_STUDIES } from "@/content/portfolioCaseStudies";
import { SERVICE_CAPABILITIES } from "@/content/serviceCapabilities";
import { SERVICE_DETAILS } from "@/content/serviceDetails";
import { SERVICES_CONTENT } from "@/content/services";
import { SERVICE_CATEGORIES, SERVICES_FAQ } from "@/content/servicesCatalog";
import { SERVICE_TECH } from "@/content/serviceTech";
import { TESTIMONIAL_PHRASES, TESTIMONIALS } from "@/content/testimonials";

/**
 * Everything the chat assistant knows, built from the same content the pages render, so it is
 * never out of date. Only fields a visitor can actually see on the site are included: some
 * content files still hold older placeholder fields (unused cards, illustrative mock-up data),
 * and those must never reach the assistant.
 */

export interface KnowledgeSection {
  title: string;
  /** The page a visitor can open to read more. */
  url: string;
  text: string;
}

const lines = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join("\n");
const bullets = (items: readonly string[] | undefined) => (items?.length ? items.map((item) => `- ${item}`).join("\n") : "");

function essayText(blocks: EssayBlock[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `\n## ${block.text}`;
        case "h3":
          return `\n### ${block.text}`;
        case "list":
          return bullets(block.items.map((item) => (typeof item === "string" ? item : `${item.term}: ${item.text}`)));
        case "terms":
          return bullets(block.items.map((item) => `${item.term}: ${item.text}`));
        default:
          return block.text;
      }
    })
    .join("\n");
}

function companySection(): KnowledgeSection {
  return {
    title: "21 Spheres: company facts and contact",
    url: "/contact",
    text: lines(
      "Name: 21 Spheres. Brand line: \"A World Within.\"",
      `Tagline: ${ABOUT_INTRO.tagline}`,
      "Founded: incorporated in 2023.",
      `Founder & CEO: ${FOUNDER_LETTER.author}.`,
      `Email: ${COMPANY_EMAIL}`,
      `Phone and WhatsApp: ${COMPANY_PHONE.label} (WhatsApp: ${COMPANY_PHONE.whatsappHref})`,
      ...COMPANY_ADDRESSES.map((address) => `${address.label}: ${address.value.replace(/\n/g, " ")}`),
      `GSTIN: ${COMPANY_GSTIN}`,
      `Trademark application number: ${COMPANY_TM_APPLICATION}`,
      `Book a call (the "Reserve Your Architecture Sprint" calendar on /contact): ${COMPANY_BOOKING_URL}`,
      `LinkedIn: ${COMPANY_SOCIALS.linkedin}`,
      `Instagram: ${COMPANY_SOCIALS.instagram}`,
      `X: ${COMPANY_SOCIALS.x}`,
      `Facebook: ${COMPANY_SOCIALS.facebook}`,
      "A 50-second intro video about what 21 Spheres builds is at /intro.",
    ),
  };
}

function siteMapSection(): KnowledgeSection {
  return {
    title: "Pages on the website",
    url: "/",
    text: lines(
      ...NAVIGATION_ITEMS.map((item) => `${item.label}: ${item.href}`),
      `Founder's Note: /insights/founders-note`,
      "Intro video: /intro",
    ),
  };
}

function aboutSections(): KnowledgeSection[] {
  const intro: KnowledgeSection = {
    title: "About 21 Spheres",
    url: "/#about",
    text: lines(ABOUT_INTRO.tagline, ...ABOUT_INTRO.paragraphs),
  };
  const cards = ABOUT_CARDS.map((card) => ({
    title: `About: ${card.title} (${card.pill})`,
    url: `/#${card.id}`,
    text: lines(
      card.summary,
      card.headline,
      ...card.paragraphs,
      card.highlights?.length ? `Highlights: ${card.highlights.join(", ")}` : "",
    ),
  }));
  return [intro, ...cards];
}

function howWeWorkSection(): KnowledgeSection {
  return {
    title: "How we work (our process)",
    url: "/#how-we-work",
    text: lines(
      HOW_WE_WORK_INTRO.tagline,
      HOW_WE_WORK_INTRO.leadEyebrow,
      HOW_WE_WORK_INTRO.lead,
      "",
      ...WORK_FLOORPLAN_STEPS.map(
        (step, index) => `Step ${index + 1}. ${step.title}: ${step.description}${step.tags.length ? ` (Covers: ${step.tags.join(", ")})` : ""}`,
      ),
    ),
  };
}

function industrySections(): KnowledgeSection[] {
  const intro: KnowledgeSection = {
    title: "Industries we serve",
    url: "/#industries",
    text: lines(INDUSTRIES_CONTENT.title, INDUSTRIES_CONTENT.lead, `Industries: ${INDUSTRIES_CONTENT.items.map((item) => item.name).join("; ")}`),
  };
  return [
    intro,
    ...INDUSTRIES_CONTENT.items.map((item) => ({
      title: `Industry: ${item.name}`,
      url: `/#${item.id}`,
      text: lines(
        item.label,
        item.subhead,
        ...item.paragraphs,
        item.capabilities.length ? `What we build here: ${item.capabilities.join(", ")}` : "",
      ),
    })),
  ];
}

function caseStudySections(): KnowledgeSection[] {
  const index: KnowledgeSection = {
    title: "All case studies (index)",
    url: "/case-studies",
    text: PORTFOLIO_CASE_STUDIES.map((study) => `- ${study.title} (${study.client}, ${study.year}; ${study.discipline}): ${study.headline}`).join("\n"),
  };
  return [
    index,
    ...PORTFOLIO_CASE_STUDIES.map((study) => ({
      title: `Case study: ${study.title}`,
      url: `/case-studies#${study.id}`,
      text: lines(
        `Client: ${study.client}. Year: ${study.year}. Area: ${study.discipline}. Tags: ${study.category}.`,
        study.headline,
        study.summary,
        "",
        "The brief:",
        study.brief.problemStatement,
        "",
        "What changed:",
        study.whatChanged.empiricalOutcome,
        study.whatChanged.metrics.length
          ? `Results: ${study.whatChanged.metrics.map((metric) => `${metric.value} ${metric.label}${metric.context ? ` (${metric.context})` : ""}`).join("; ")}`
          : "",
        study.technology.stack.length ? `Technology: ${study.technology.stack.join(", ")}` : "",
      ),
    })),
  ];
}

function serviceSections(): KnowledgeSection[] {
  const overview: KnowledgeSection = {
    title: "Services overview",
    url: "/services",
    text: lines(
      SERVICES_CONTENT.menu.headline,
      SERVICES_CONTENT.menu.narrative,
      SERVICES_CONTENT.landing.lead,
      SERVICES_CONTENT.landing.detail,
      SERVICES_CONTENT.overview.title,
      ...SERVICES_CONTENT.overview.paragraphs,
      SERVICES_CONTENT.overview.focus,
      "",
      ...SERVICE_CATEGORIES.map(
        (category) => `${category.name}: ${category.description}\n${bullets(category.services.map((service) => `${service.name} (/services/${service.id}): ${service.summary}`))}`,
      ),
    ),
  };
  const faq: KnowledgeSection = {
    title: "Frequently asked questions",
    url: "/services",
    text: SERVICES_FAQ.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n"),
  };
  const services = SERVICES_CONTENT.services.map((service) => {
    const detail = SERVICE_DETAILS[service.id];
    const capabilities = SERVICE_CAPABILITIES[service.id];
    const tech = SERVICE_TECH[service.id] ?? [];
    return {
      title: `Service: ${service.title}`,
      url: `/services/${service.id}`,
      text: lines(
        `Category: ${service.category}.`,
        service.headline,
        service.description,
        detail && lines(
          "",
          detail.heroTitle,
          detail.tagline,
          ...(detail.intro ?? [detail.lead]),
          "",
          detail.sectionTitle,
          detail.sectionLead,
          ...detail.offerings.map(
            (offering) => `- ${offering.title}: ${offering.description} Includes: ${offering.includes.join(", ")}. Best for: ${offering.bestFor}`,
          ),
          detail.proof.stats.length ? "\nResults from our work:" : "",
          ...detail.proof.stats.map((stat) => `- ${stat.title ? `${stat.title}: ` : ""}${stat.value} ${stat.label}. ${stat.detail}`),
          detail.closingTitle,
          detail.closingLead,
        ),
        capabilities && lines(
          "",
          capabilities.title,
          ...capabilities.tiles.map((tile) => `- ${tile.title}: ${tile.description}`),
          capabilities.benefitsTitle,
          capabilities.benefitsLead,
          ...capabilities.benefits.map((benefit) => `- ${benefit.title}${benefit.description ? `: ${benefit.description}` : ""}`),
        ),
        tech.length ? `\nTechnologies: ${tech.map((item) => item.name).join(", ")}` : "",
      ),
    };
  });
  return [overview, faq, ...services];
}

function founderSections(): KnowledgeSection[] {
  const filing = new Map(INSIGHTS_CONTENT.items.map((item) => [item.slug, item]));
  const letter: KnowledgeSection = {
    title: `A note from the founder, ${FOUNDER_LETTER.author} (${FOUNDER_LETTER.role})`,
    url: "/insights/founders-note",
    text: lines(
      FOUNDER_LETTER.title,
      FOUNDER_LETTER.dek,
      FOUNDER_LETTER.heading,
      ...FOUNDER_LETTER.body.map((line) => ("quote" in line ? `"${line.quote}"` : line.p)),
      `${FOUNDER_LETTER.author}, ${FOUNDER_LETTER.role}. ${FOUNDER_LETTER.signOff}`,
      "",
      `The Founder's Note continues in ${FOUNDER_ESSAYS.length} sections (each is also an insight): ${FOUNDER_ESSAYS.map((essay) => essay.title).join("; ")}.`,
    ),
  };
  const essays = FOUNDER_ESSAYS.map((essay) => {
    const item = filing.get(essay.slug);
    return {
      title: `Insight by ${FOUNDER_LETTER.author}: ${essay.title}`,
      url: `/insights/${essay.slug}`,
      text: lines(item ? `${item.category} · ${item.date}` : "", essay.dek, essayText(essay.blocks)),
    };
  });
  return [letter, ...essays];
}

function testimonialSection(): KnowledgeSection {
  return {
    title: "What clients say (testimonials)",
    url: "/#testimonials",
    text: lines(
      ...TESTIMONIAL_PHRASES,
      "",
      ...TESTIMONIALS.map((item) => `"${item.quote}" (${item.name}, ${item.role})`),
    ),
  };
}

let cache: KnowledgeSection[] | null = null;

export function getKnowledge(): KnowledgeSection[] {
  cache ??= [
    companySection(),
    siteMapSection(),
    ...aboutSections(),
    howWeWorkSection(),
    ...serviceSections(),
    ...caseStudySections(),
    ...industrySections(),
    ...founderSections(),
    testimonialSection(),
  ];
  return cache;
}

/** The whole knowledge pack as one document for the model, each section tagged with its page. */
export function knowledgeDocument(): string {
  return getKnowledge()
    .map((section) => `<section title="${section.title}" page="${section.url}">\n${section.text.trim()}\n</section>`)
    .join("\n\n");
}
