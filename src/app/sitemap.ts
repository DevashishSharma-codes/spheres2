import type { MetadataRoute } from "next";
import { INDUSTRIES_CONTENT } from "@/content/industries";
import { INSIGHTS_CONTENT } from "@/content/insights";
import { SERVICES_CONTENT } from "@/content/services";
import { SITE_URL } from "@/lib/seo";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Article dates are written like "NOV 2026". */
function parseArticleDate(date: string) {
  const [month, year] = date.split(" ");
  return new Date(Date.UTC(Number(year), MONTHS.indexOf(month), 1));
}

// /about, /how-we-work, /industries and /testimonials redirect to home page sections,
// so they aren't listed. lastModified is only set where the content has a real date.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = INSIGHTS_CONTENT.items.map((item) => ({
    url: `${SITE_URL}/insights/${item.slug}`,
    lastModified: parseArticleDate(item.date),
  }));
  const newestArticle = Math.max(...articles.map(({ lastModified }) => lastModified.getTime()));

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/services` },
    ...SERVICES_CONTENT.services.map(({ id }) => ({ url: `${SITE_URL}/services/${id}` })),
    { url: `${SITE_URL}/case-studies` },
    ...INDUSTRIES_CONTENT.items.map(({ id }) => ({ url: `${SITE_URL}/industries/${id}` })),
    { url: `${SITE_URL}/insights`, lastModified: new Date(newestArticle) },
    ...articles,
    { url: `${SITE_URL}/contact` },
  ];
}
