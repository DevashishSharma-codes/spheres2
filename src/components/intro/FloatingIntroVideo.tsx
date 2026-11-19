"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, X } from "lucide-react";

const SMALL_VIDEO = "/hero/explainer-720.mp4";
const POSTER = "/hero/explainer-poster.webp";

/**
 * A small picture-in-picture style player, bottom right, as soon as the visitor starts scrolling. It plays the intro silently on a loop; clicking it opens the full intro video page with
 * sound. It can be closed, stays closed for the visit, hides over the footer, and is not shown on
 * the intro page itself.
 */
export function FloatingIntroVideo() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const footerInView = useRef(false);

  const onIntroPage = pathname === "/intro";

  useEffect(() => {
    if (onIntroPage) return;
    // Closed earlier in this visit? Then it stays closed.
    const closedBefore = () => {
      try {
        return sessionStorage.getItem("intro-mini-closed") === "1";
      } catch {
        return false;
      }
    };
    const update = () => setVisible(window.scrollY > 0 && !footerInView.current && !closedBefore());
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
  }, [onIntroPage, pathname]);

  const shown = visible && !dismissed && !onIntroPage;

  // Tells the back-to-top button how far to sit above it, so the two stack neatly in the corner.
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const frame = frameRef.current;
    root.style.setProperty("--intro-mini-offset", shown && frame ? `${frame.offsetHeight + 12}px` : "0px");
    return () => {
      root.style.setProperty("--intro-mini-offset", "0px");
    };
  }, [shown]);

  // Only plays while it is on screen, muted (browsers allow silent autoplay).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (shown && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => undefined);
    else video.pause();
  }, [shown]);

  const close = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("intro-mini-closed", "1");
    } catch {
      /* ignore */
    }
  };

  if (onIntroPage) return null;

  return (
    <div
      ref={frameRef}
      aria-hidden={!shown}
      // Tight in the corner, so it covers as little of the page as it can
      className={`fixed bottom-3 right-3 z-[60] w-[168px] transition-all duration-500 ease-out motion-reduce:transition-none sm:bottom-4 sm:right-4 sm:w-[232px] ${
        shown ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
      {/* A frosted glass frame around the video */}
      <div className="group relative rounded-2xl border border-white/80 bg-white/55 p-1.5 shadow-[0_18px_40px_-14px_rgba(40,30,90,.45),0_2px_6px_rgba(40,30,90,.08),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl">
        <Link
          href="/intro"
          tabIndex={shown ? 0 : -1}
          aria-label="Watch the intro video"
          className="relative block overflow-hidden rounded-xl bg-[#F5F2FD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
        >
          <video
            ref={videoRef}
            poster={POSTER}
            loop
            muted
            playsInline
            preload="none"
            className="block aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          >
            <source src={SMALL_VIDEO} type="video/mp4" />
          </video>
          {/* Label along the foot, and a play badge that grows on hover */}
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-2.5 pb-2 pt-6 text-[11px] font-medium tracking-[-0.01em] text-white">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#5A43C0] shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden="true" className="ml-px h-2.5 w-2.5 fill-current" />
            </span>
            <span className="truncate">Watch our intro</span>
            <span className="ml-auto hidden text-white/70 sm:inline">0:50</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={close}
          tabIndex={shown ? 0 : -1}
          aria-label="Close the intro video"
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-90 backdrop-blur transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
