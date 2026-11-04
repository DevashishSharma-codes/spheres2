"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** How long to keep re-applying the position while the returning page settles. */
const RESTORE_FRAMES = 30;

/** Opens new pages at the very top, and returns visitors to where they were when they go back. */
export function ScrollMemory() {
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const positions = useRef(new Map<string, number>());
  const goingBack = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!goingBack.current) positions.current.set(currentPath.current, window.scrollY);
    };
    const onPopState = () => {
      // A hash change on the same page isn't a return to another page.
      if (window.location.pathname !== currentPath.current) goingBack.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    const arrivedOnNewPage = currentPath.current !== pathname;
    currentPath.current = pathname;

    if (!goingBack.current) {
      // A new page always opens at the very top, unless the link points to a section.
      if (!arrivedOnNewPage || window.location.hash) return;
      window.scrollTo({ top: 0, behavior: "instant" });
      const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
      return () => cancelAnimationFrame(frame);
    }

    const target = positions.current.get(pathname) ?? 0;
    let frame = 0;
    let remaining = RESTORE_FRAMES;

    const finish = () => {
      cancelAnimationFrame(frame);
      goingBack.current = false;
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("keydown", finish);
    };
    const restore = () => {
      window.scrollTo({ top: target, behavior: "instant" });
      remaining -= 1;
      if (remaining > 0) frame = requestAnimationFrame(restore);
      else finish();
    };

    // Anything the visitor does takes priority over the restore.
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    window.addEventListener("keydown", finish);
    frame = requestAnimationFrame(restore);
    return finish;
  }, [pathname]);

  return null;
}
