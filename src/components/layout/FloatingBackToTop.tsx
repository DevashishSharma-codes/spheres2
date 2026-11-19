"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * A round "back to top" button, bottom right on every page, once the visitor is about two screens
 * down. It is kept from ever covering text:
 *  - it hides while the footer is on screen (the footer has its own "Back to top" link);
 *  - on wide screens it sits in the empty margin beside the page's text column;
 *  - below 1440px, where text runs close to the edge, it only shows while scrolling back up.
 */
export function FloatingBackToTop() {
  const [visible, setVisible] = useState(false);
  const footerInView = useRef(false);
  const lastY = useRef(0);
  const scrollingUp = useRef(false);

  useEffect(() => {
    // Below 1440px the page text runs close to the edge, so there it only shows while scrolling up.
    const tight = window.matchMedia("(max-width: 1439px)");

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 4) {
        scrollingUp.current = y < lastY.current;
        lastY.current = y;
      }
      const farEnough = y > window.innerHeight * 1.8;
      setVisible(farEnough && !footerInView.current && (!tight.matches || scrollingUp.current));
    };

    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => {
          footerInView.current = entry.isIntersecting;
          update();
        })
      : null;
    if (footer && observer) observer.observe(footer);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      // Sits above the floating intro video when that is showing (it sets --intro-mini-offset)
      style={{ marginBottom: "var(--intro-mini-offset, 0px)" }}
      className={`fixed bottom-4 right-3 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#2A2A2E] shadow-[0_8px_24px_-8px_rgba(40,30,90,.35),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition-all duration-300 hover:border-[#7057D9]/40 hover:bg-[#7057D9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9] motion-reduce:transition-none sm:bottom-5 sm:right-4 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}
