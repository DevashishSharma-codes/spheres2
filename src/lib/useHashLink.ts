"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps a view in step with the address. Runs `onHash` when the page opens or is
 * returned to, when Back or Forward changes the #hash, and when a link on this page
 * is used. `onHash` gets "" when there's no hash. Client-side navigation doesn't fire
 * `hashchange`, so link clicks are watched directly, which also lets clicking the
 * same link twice work.
 */
export function useHashLink(onHash: (hash: string) => void) {
  const latest = useRef(onHash);

  useEffect(() => {
    latest.current = onHash;
  });

  useEffect(() => {
    const fromUrl = () => {
      latest.current(window.location.hash);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href);
      if (url.pathname === window.location.pathname) latest.current(url.hash);
    };

    fromUrl();
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", fromUrl);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", fromUrl);
    };
  }, []);
}
