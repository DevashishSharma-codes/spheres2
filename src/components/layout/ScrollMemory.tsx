"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** How long to keep re-applying the position while the returning page settles. */
const RESTORE_FRAMES = 60;
/** Pages visited in this tab, for browsers without the Navigation API. See PageBackButton. */
export const VISITED_PAGES_KEY = "site-pages-visited";

const entryKey = () => window.location.pathname + window.location.hash;

function scrollToAnchor() {
  const id = window.location.hash.slice(1);
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
}

function countVisit(change: number) {
  try {
    const count = Number(sessionStorage.getItem(VISITED_PAGES_KEY) ?? 0) + change;
    sessionStorage.setItem(VISITED_PAGES_KEY, String(Math.max(0, count)));
  } catch {
    // Storage can be blocked. The back button then falls back to going up a level.
  }
}

/**
 * Remembers the scroll position of every address, including each #anchor. Going back
 * or forward returns to it, a new page opens at the very top, and a link to a section
 * lands on that section.
 */
export function ScrollMemory() {
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const positions = useRef(new Map<string, number>());
  const traversing = useRef(false);
  const handledPath = useRef<string | null>(null);
  const stopHold = useRef<() => void>(() => undefined);

  // Re-applied for a moment because the page can still be changing height while it settles.
  const hold = useCallback((apply: () => void) => {
    stopHold.current();
    let frame = 0;
    let remaining = RESTORE_FRAMES;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("keydown", finish);
    };
    function finish() {
      stop();
      traversing.current = false;
    }
    const step = () => {
      apply();
      remaining -= 1;
      if (remaining > 0) frame = requestAnimationFrame(step);
      else finish();
    };

    stopHold.current = stop;
    // Anything the visitor does takes priority.
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    window.addEventListener("keydown", finish);
    step();
  }, []);

  const restore = useCallback(() => {
    const saved = positions.current.get(entryKey());
    hold(() => {
      if (saved !== undefined) window.scrollTo({ top: saved, behavior: "instant" });
      else scrollToAnchor();
    });
  }, [hold]);

  useEffect(() => {
    const onScroll = () => {
      if (!traversing.current) positions.current.set(entryKey(), window.scrollY);
    };
    const onPopState = () => {
      traversing.current = true;
      // Between two addresses on one page, the path effect below won't run.
      if (window.location.pathname === currentPath.current) requestAnimationFrame(restore);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, [restore]);

  /* A section link on this page jumps straight there and stays put while images above
     load. A smooth scroll would stop short when they push the section further down. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href);
      if (!url.hash || url.pathname !== window.location.pathname) return;
      if (!document.getElementById(url.hash.slice(1))) return;
      traversing.current = true;
      requestAnimationFrame(() => hold(scrollToAnchor));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [hold]);

  useEffect(() => {
    currentPath.current = pathname;
    if (handledPath.current === pathname) return;
    const isFirstLoad = handledPath.current === null;

    const frame = requestAnimationFrame(() => {
      handledPath.current = pathname;

      if (traversing.current) {
        countVisit(-1);
        restore();
        return;
      }
      if (!isFirstLoad) countVisit(1);

      if (window.location.hash) {
        hold(scrollToAnchor);
      } else if (!isFirstLoad) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      stopHold.current();
    };
  }, [pathname, hold, restore]);

  return null;
}
