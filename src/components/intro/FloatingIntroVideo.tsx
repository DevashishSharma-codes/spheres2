"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, useMotionValue, type MotionValue } from "framer-motion";
import { Play, X } from "lucide-react";

const SMALL_VIDEO = "/hero/explainer-720.mp4";
const POSTER = "/hero/explainer-poster.webp";

/** How far the page must scroll before the button flies off (a few pixels, so a trackpad's bounce
    at the very top can't flick it back and forth). */
const SCROLL_TRIGGER = 6;
/** The flight: one calm ease-in-out glide, the same both ways. */
const FLIGHT = { duration: 0.95, ease: [0.65, 0, 0.35, 1] as const };
/** How high the path bows above a straight line, like the spheres arcing into the footer wordmark. */
const ARC = 90;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Box = { x: number; y: number; w: number; h: number; r: number };

/** The floating window's box, tight in the bottom-right corner. */
function windowBox(): Box {
  const phone = window.innerWidth < 640;
  const w = phone ? 168 : 232;
  const margin = phone ? 12 : 16;
  const h = Math.round(((w - 12) * 9) / 16 + 12); // a 16:9 video inside a 6px glass frame
  return { x: window.innerWidth - margin - w, y: window.innerHeight - margin - h, w, h, r: 16 };
}

const closedBefore = () => {
  try {
    return sessionStorage.getItem("intro-mini-closed") === "1";
  } catch {
    return false;
  }
};

/**
 * The intro video's floating window, bottom right. On the home page it is the hero's
 * "Watch our intro" button: one element that, as the page scrolls, flies along a gentle arc into the
 * corner, growing from the pill into the window while the label dissolves out and the video in, and
 * flies back into the button at the top. Every frame is set directly from one progress value, so the
 * motion is continuous. It appears on the landing page only. Clicking it opens /intro with sound;
 * it can be closed for the visit and hides over the footer.
 */
export function FloatingIntroVideo() {
  const pathname = usePathname();
  // Only on the landing page: case studies, services, insights and the rest go without it.
  const onIntroPage = pathname !== "/";

  const shellRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const footerInView = useRef(false);
  const placed = useRef(false); // the very first placement is instant; every later move is a flight

  const progress = useMotionValue(0); // 0 = the hero button, 1 = the window
  const visibility = useMotionValue(0); // fades the whole thing in and out
  const [interactive, setInteractive] = useState(false);
  const [closed, setClosed] = useState(false);

  // Paint one frame from the current progress and visibility.
  const paint = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const p = progress.get();
    const end = windowBox();
    const anchor = anchorRef.current?.getBoundingClientRect();
    const start: Box = anchor ? { x: anchor.left, y: anchor.top, w: anchor.width, h: anchor.height, r: anchor.height / 2 } : end;

    const x = lerp(start.x, end.x, p);
    const y = lerp(start.y, end.y, p) - (anchor ? ARC * Math.sin(Math.PI * p) : 0);
    const w = lerp(start.w, end.w, p);
    const h = lerp(start.h, end.h, p);
    const r = lerp(start.r, end.r, p);

    shell.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    shell.style.width = `${w.toFixed(2)}px`;
    shell.style.height = `${h.toFixed(2)}px`;
    shell.style.borderRadius = `${r.toFixed(2)}px`;
    // From the hero's dark glass to the window's light glass
    shell.style.backgroundColor = `rgba(255,255,255,${lerp(0.1, 0.55, p).toFixed(3)})`;
    shell.style.borderColor = `rgba(255,255,255,${lerp(0.25, 0.8, p).toFixed(3)})`;
    shell.style.opacity = String(visibility.get());

    if (labelRef.current) labelRef.current.style.opacity = String(1 - clamp01(p / 0.32));
    if (mediaRef.current) mediaRef.current.style.opacity = String(clamp01((p - 0.5) / 0.4));
    if (closeRef.current) closeRef.current.style.opacity = String(clamp01((p - 0.85) / 0.15));

    // Lets the back-to-top button sit just above the window
    document.documentElement.style.setProperty("--intro-mini-offset", visibility.get() > 0.5 && p > 0.5 ? `${end.h + 12}px` : "0px");
  }, [progress, visibility]);

  // A new page starts fresh: its first placement is instant again. (Declared before the effect below,
  // so it runs first.)
  useEffect(() => {
    placed.current = false;
  }, [pathname]);

  useEffect(() => {
    if (onIntroPage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anchorRef.current = document.getElementById("intro-cta-anchor");
    const hasAnchor = Boolean(anchorRef.current);
    // The flying copy takes over from the hero's static button
    if (hasAnchor) document.documentElement.setAttribute("data-intro-morph", "");

    let target = -1;
    let shown = -1;
    const flights: { stop: () => void }[] = [];
    const go = (value: MotionValue<number>, to: number, options: object) => {
      flights.push(animate(value, to, reduce ? { duration: 0 } : options));
    };

    const update = () => {
      const scrolled = window.scrollY >= SCROLL_TRIGGER;
      const isClosed = closedBefore();
      // Where it should be: the hero button at the top, the window once scrolled
      const nextTarget = hasAnchor ? (scrolled && !isClosed ? 1 : 0) : 1;
      // Whether it should be seen at all
      const nextShown = hasAnchor ? !scrolled || (!isClosed && !footerInView.current) : scrolled && !isClosed && !footerInView.current;
      if (nextTarget !== target) {
        go(progress, nextTarget, placed.current ? FLIGHT : { duration: 0 });
        placed.current = true;
        target = nextTarget;
      }
      if (Number(nextShown) !== shown) {
        shown = Number(nextShown);
        go(visibility, shown, { duration: 0.35, ease: "easeOut" });
      }
      setInteractive(nextShown);
      paint();
    };

    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => {
          footerInView.current = entry.isIntersecting;
          update();
        })
      : null;
    if (footer && observer) observer.observe(footer);

    const stopProgress = progress.on("change", paint);
    const stopVisibility = visibility.on("change", paint);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      flights.forEach((flight) => flight.stop());
      stopProgress();
      stopVisibility();
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.removeAttribute("data-intro-morph");
      document.documentElement.style.setProperty("--intro-mini-offset", "0px");
    };
  }, [onIntroPage, pathname, closed, paint, progress, visibility]);

  // The video plays, silently, only once it can be seen
  useEffect(() => {
    if (onIntroPage) return;
    return progress.on("change", (p) => {
      const video = videoRef.current;
      if (!video) return;
      if (p > 0.5 && video.paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.muted = true;
        video.play().catch(() => undefined);
      } else if (p <= 0.5 && !video.paused) {
        video.pause();
      }
    });
  }, [onIntroPage, progress]);

  const close = () => {
    try {
      sessionStorage.setItem("intro-mini-closed", "1");
    } catch {
      /* ignore */
    }
    setClosed(true);
  };

  if (onIntroPage) return null;

  return (
    <div
      ref={shellRef}
      aria-hidden={!interactive}
      className={`group fixed left-0 top-0 z-[60] overflow-hidden border opacity-0 shadow-[0_18px_40px_-14px_rgba(40,30,90,.45),0_2px_6px_rgba(40,30,90,.08),inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-xl will-change-transform ${
        interactive ? "" : "pointer-events-none"
      }`}
    >
      <Link href="/intro" tabIndex={interactive ? 0 : -1} aria-label="Watch the intro video" className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7057D9]">
        {/* The hero button's label */}
        <span ref={labelRef} className="absolute inset-y-0 left-0 flex items-center gap-2.5 whitespace-nowrap pl-1.5 pr-5 text-[14px] font-medium text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5A43C0] sm:h-9 sm:w-9">
            <Play aria-hidden="true" className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
          Watch our intro
          <span className="text-white/55">0:50</span>
        </span>

        {/* The window's video, inside a 6px glass frame */}
        <div ref={mediaRef} className="absolute inset-1.5 overflow-hidden rounded-xl bg-[#F5F2FD] opacity-0">
          <video ref={videoRef} poster={POSTER} loop muted playsInline preload="metadata" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none">
            <source src={SMALL_VIDEO} type="video/mp4" />
          </video>
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-2.5 pb-2 pt-6 text-[11px] font-medium tracking-[-0.01em] text-white">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#5A43C0] shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden="true" className="ml-px h-2.5 w-2.5 fill-current" />
            </span>
            <span className="truncate">Watch our intro</span>
            <span className="ml-auto hidden text-white/70 sm:inline">0:50</span>
          </span>
        </div>
      </Link>
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        tabIndex={interactive ? 0 : -1}
        aria-label="Close the intro video"
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
