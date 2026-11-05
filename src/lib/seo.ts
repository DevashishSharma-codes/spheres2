import type { Metadata } from "next";

/** The production domain. Override with NEXT_PUBLIC_SITE_URL if the site moves. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://21spheres.com").replace(/\/$/, "");
export const SITE_NAME = "21 Spheres";
export const SITE_DESCRIPTION =
  "21 Spheres is a software and AI product studio building custom AI systems, web platforms, mobile apps and enterprise software.";
export const HOME_TITLE = `${SITE_NAME} | AI Development & Technology Solutions`;
export const HOME_DESCRIPTION = SITE_DESCRIPTION;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// No 1200 x 630 social image exists yet, so sharing falls back to the square logo.
const DEFAULT_IMAGE = { url: "/logo-square.png", width: 943, height: 943, alt: "21 Spheres logo" };

export const SHARED_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: "en_US",
  images: [DEFAULT_IMAGE],
};

export const SHARED_TWITTER = {
  card: "summary" as const,
  site: "@21Spheres",
  images: [DEFAULT_IMAGE.url],
};

interface PageMetadataOptions {
  /** Short page title; the root layout adds "| 21 Spheres". */
  title: string;
  description: string;
  /** Path of the page's preferred URL, starting with "/". */
  path: string;
  /** A wide image specific to this page, used instead of the logo when shared. */
  image?: { url: string; alt: string };
  type?: "website" | "article";
  /** Use the title exactly as written, without the "| 21 Spheres" suffix. */
  absoluteTitle?: boolean;
}

/**
 * Metadata for an indexable page. Next.js replaces nested metadata objects rather
 * than merging them, so each page has to carry its full Open Graph and X tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      title: fullTitle,
      description,
      url: path,
      type,
      ...(image && { images: [image] }),
    },
    twitter: {
      ...SHARED_TWITTER,
      title: fullTitle,
      description,
      ...(image && { card: "summary_large_image" as const, images: [image.url] }),
    },
  };
}

/** For URLs that render a page but should stay out of search results. */
export const NOT_INDEXED: Metadata["robots"] = { index: false, follow: true };
