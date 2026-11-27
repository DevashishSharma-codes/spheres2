/** Chat assistant settings shared by the server and the chat window. Safe to import in the browser. */

/** The assistant's name, as visitors see it. */
export const ASSISTANT_NAME = "21 Spheres";

/** The longest message a visitor can send (the server enforces it too). */
export const MAX_MESSAGE_CHARS = 800;

/**
 * Links the assistant may show as clickable: our own pages, plus our own channels elsewhere.
 * Anything else it writes as a link is shown as plain text.
 */
const OWN_CHANNELS = [
  /^mailto:info@21spheres\.com$/,
  /^tel:\+?919724780021$/,
  /^https:\/\/wa\.me\/919724780021\/?$/,
  /^https:\/\/calendar\.google\.com\/calendar\/appointments\//,
  /^https:\/\/(www\.)?linkedin\.com\/company\/21spheres\/?$/,
  /^https:\/\/(www\.)?instagram\.com\/21_spheres\/?$/,
  /^https:\/\/(www\.)?x\.com\/21Spheres\/?$/,
  /^https:\/\/(www\.)?facebook\.com\/profile\.php\?id=61570321127336$/,
];

export type SafeLink = { kind: "internal" | "external"; href: string } | null;

export function safeLink(href: string): SafeLink {
  const url = href.trim();
  if (/^\/(?!\/)/.test(url)) return { kind: "internal", href: url };
  if (OWN_CHANNELS.some((pattern) => pattern.test(url))) return { kind: "external", href: url };
  return null;
}

/**
 * Room the chat capsule takes in the bottom-right corner (its width plus a 12px gap): the intro video
 * window sits this far to its left. Matches the capsule's classes (44px on phones, 48px above).
 */
export const chatLauncherSpace = (viewportWidth: number) => (viewportWidth < 640 ? 44 + 12 : 48 + 12);
