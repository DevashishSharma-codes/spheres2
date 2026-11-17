"use client";

import { useEffect } from "react";

/*
 * Tells the footer how the page on screen ends, so its thread zone can match it.
 *
 * Pages mark themselves with `data-footer-dark` (they end on a dark section) or `data-no-footer-cone`
 * (they already lead to contact). Next.js keeps recently visited pages in the document, hidden, so
 * a marker only counts when its page is actually visible. That check is done here, in script,
 * because browsers don't always re-check a CSS `:has()` rule when a page is hidden or shown.
 *
 * The result goes on <body> as `data-footer-dark-on` and `data-footer-no-cone-on` (read by the
 * `footer-dark` and `no-footer-cone` variants in globals.css). `data-footer-synced` tells the CSS
 * that this script is in charge; before it runs, the first paint uses the markers directly.
 */
const visible = (el: Element) =>
  typeof (el as HTMLElement).checkVisibility === "function"
    ? (el as HTMLElement).checkVisibility()
    : el.getClientRects().length > 0;

const anyVisible = (selector: string) => Array.from(document.querySelectorAll(selector)).some(visible);

export function FooterThemeSync() {
  useEffect(() => {
    const body = document.body;
    let frame = 0;
    const sync = () => {
      frame = 0;
      body.toggleAttribute("data-footer-dark-on", anyVisible("[data-footer-dark]"));
      body.toggleAttribute("data-footer-no-cone-on", anyVisible("[data-no-footer-cone]"));
      body.setAttribute("data-footer-synced", "");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    // Page changes: pages arriving, leaving, or being hidden and shown again.
    const observer = new MutationObserver(schedule);
    observer.observe(body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "hidden", "data-footer-dark", "data-no-footer-cone"],
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
