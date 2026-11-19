"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { pillClassName } from "@/components/ui/PillLink";

/* The explainer video, compressed for the web from the 4K master (kept out of Git):
   phones get 720p (about 11 MB), larger screens 1080p (about 24 MB), both 30fps with the narration.
   Both are encoded to start playing while they download. The poster is the video's own first
   frame, a soft lavender gradient, so the hero looks right from the first paint and the switch to
   the moving video is seamless. */
const VIDEO = {
  small: "/hero/explainer-720.mp4",
  large: "/hero/explainer-1080.mp4",
  poster: "/hero/explainer-poster.webp",
};
// The colour of the video's first frame, shown even before the poster arrives.
const HERO_BACKGROUND = "#F5F2FD";

/* The whole frame is always shown (the video's text runs close to its edges), and its edges ease
   into the matching background so it sits in the page rather than in a box. The fades are kept to
   the outer few percent, clear of the chapter pills along the bottom of the video. */
const easeOut = (side: "bottom" | "top" | "right" | "left", from: number) => {
  const stops = [1, 0.9, 0.7, 0.45, 0.22, 0.07, 0];
  return `linear-gradient(to ${side}, #000 0%, #000 ${from}%, ${stops
    .map((a, i) => `rgba(0,0,0,${a}) ${(from + ((100 - from) * i) / (stops.length - 1)).toFixed(2)}%`)
    .join(", ")})`;
};
const EDGE_MASKS = [easeOut("bottom", 96.5), easeOut("top", 97), easeOut("right", 97.5), easeOut("left", 97.5)];
const VIDEO_FADE = {
  maskImage: EDGE_MASKS.join(", "),
  WebkitMaskImage: EDGE_MASKS.join(", "),
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const GLASS_BASE =
  "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[13px] font-medium shadow-[0_8px_24px_-12px_rgba(43,39,53,0.45)] backdrop-blur-xl transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]";
const GLASS_LIGHT = `${GLASS_BASE} border-white/70 bg-white/70 text-[#19191C] hover:bg-white`;
const GLASS_DARK = `${GLASS_BASE} border-white/20 bg-white/10 text-white hover:bg-white/20`;

/** The intro video page (/intro): the 50-second tour, full screen, with its sound on. */
export function IntroVideoSection() {
  // Ask the browser for the poster first, before anything else on the page.
  preload(VIDEO.poster, { as: "image", fetchPriority: "high" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [onDark, setOnDark] = useState(false);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(false);
  // True only while the browser is holding the sound back; once the visitor uses the sound button,
  // their choice wins and nothing turns the sound on for them.
  const awaitingUnmute = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Every visit starts from the beginning, with the sound on. Arriving from a click (the navbar link
    // or the floating player) lets the browser allow sound; if it still refuses, play muted and show
    // the sound button.
    video.currentTime = 0;
    video.muted = false;

    // If the browser held the sound back, turn it on at the visitor's first tap, click or key press:
    // the earliest moment browsers allow it.
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const unmuteOnInteraction = (event: Event) => {
      // A press on the sound button is left to the button itself.
      if (event.target instanceof Element && event.target.closest("[data-sound-toggle]")) return;
      events.forEach((name) => window.removeEventListener(name, unmuteOnInteraction));
      if (!awaitingUnmute.current) return;
      awaitingUnmute.current = false;
      video.muted = false;
      setMuted(false);
      if (video.paused && !reduceMotion) video.play().catch(() => undefined);
    };

    let cancelled = false;
    if (!reduceMotion) {
      video.play().catch((error: unknown) => {
        // A play cut short by this effect re-running (React does that) is not the browser refusing
        // sound; only a real refusal (NotAllowedError) falls back to muted.
        if (cancelled || (error instanceof DOMException && error.name !== "NotAllowedError")) return;
        video.muted = true;
        setMuted(true);
        awaitingUnmute.current = true;
        video.play().catch(() => undefined);
        events.forEach((name) => window.addEventListener(name, unmuteOnInteraction, { passive: true }));
      });
    }
    // Leaving the page stops it. Next.js keeps a page you have just left alive in the background,
    // so without this the narration would carry on playing on the next page.
    return () => {
      cancelled = true;
      events.forEach((name) => window.removeEventListener(name, unmuteOnInteraction));
      awaitingUnmute.current = false;
      video.pause();
      video.currentTime = 0;
      setMuted(false); // the sound button matches the fresh start next time
    };
  }, [reduceMotion]);

  /* Everything around the video continues the video's own edges: each side carries on the colour
     of the frame's outermost pixels, and the space below carries on its bottom row. It's drawn
     small from the video already playing (no second download) and softened, so the frame flows
     into the page in light and dark scenes alike. The text below switches to white on dark ones. */
  useEffect(() => {
    const canvas = glowRef.current;
    const section = sectionRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !section || !context) return;
    const sample = document.createElement("canvas");
    sample.width = 96;
    sample.height = 54;
    const sampled = sample.getContext("2d", { willReadFrequently: true });
    if (!sampled) return;

    let frame = 0;
    let last = 0;
    let onScreen = true;
    let dark = false;
    // About 15 times a second on larger screens; phones only need about 4, which saves their battery.
    const interval = window.matchMedia("(max-width: 767px)").matches ? 250 : 66;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const video = videoRef.current;
      if (!video || !onScreen || now - last < interval || video.readyState < 2) return;
      last = now;
      const box = canvas.getBoundingClientRect();
      const frameBox = video.getBoundingClientRect();
      if (box.width === 0 || frameBox.width === 0) return;
      // Work at an eighth of the size: the result is blurred anyway.
      const scale = 1 / 8;
      const W = Math.max(1, Math.round(box.width * scale));
      const H = Math.max(1, Math.round(box.height * scale));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      const x = (frameBox.left - box.left) * scale;
      const y = (frameBox.top - box.top) * scale;
      const w = frameBox.width * scale;
      const h = frameBox.height * scale;
      const sw = sample.width;
      const sh = sample.height;
      sampled.drawImage(video, 0, 0, sw, sh);
      context.imageSmoothingEnabled = true;
      context.drawImage(sample, 0, 0, sw, sh, x, y, w, h); // the frame itself
      context.drawImage(sample, 0, 0, 1, sh, 0, y, x, h); // left side
      context.drawImage(sample, sw - 1, 0, 1, sh, x + w, y, W - x - w, h); // right side
      context.drawImage(sample, 0, 0, sw, 1, x, 0, w, y); // above
      context.drawImage(sample, 0, sh - 1, sw, 1, x, y + h, w, H - y - h); // below
      context.drawImage(sample, 0, 0, 1, 1, 0, 0, x, y); // corners
      context.drawImage(sample, sw - 1, 0, 1, 1, x + w, 0, W - x - w, y);
      context.drawImage(sample, 0, sh - 1, 1, 1, 0, y + h, x, H - y - h);
      context.drawImage(sample, sw - 1, sh - 1, 1, 1, x + w, y + h, W - x - w, H - y - h);

      // How light it actually is behind the text row, so the text there stays readable.
      const top = Math.min(H - 1, Math.round(y + h));
      const area = context.getImageData(0, top, W, Math.max(1, H - top)).data;
      let light = 0;
      for (let i = 0; i < area.length; i += 4) light += 0.2126 * area[i] + 0.7152 * area[i + 1] + 0.0722 * area[i + 2];
      light /= area.length / 4;
      const nowDark = dark ? light < 140 : light < 120; // a little hysteresis, so it doesn't flicker
      if (nowDark !== dark) {
        dark = nowDark;
        setOnDark(nowDark);
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    visibility.observe(section);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
    };
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    awaitingUnmute.current = false;
    const nextMuted = !video.muted;
    // Turning the sound on restarts the tour, so the narration is heard from the beginning.
    if (!nextMuted && video.muted) video.currentTime = 0;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (video.paused) video.play().catch(() => undefined);
  }, []);


  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="intro-video"
      aria-label="21 Spheres in 50 seconds"
      className="relative z-10 flex min-h-[100svh] w-full flex-col overflow-hidden pt-14 sm:pt-16 md:h-[100svh] md:min-h-[560px]"
      style={{ backgroundColor: HERO_BACKGROUND }}
    >
      {/* The video's edges, carried out across the whole hero, including behind the text row */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-16">
        <canvas ref={glowRef} width={184} height={104} className="h-full w-full blur-xl" />
      </div>

      {/* Never cropped: as large as the screen allows at its true 16:9 shape, with nothing laid over it */}
      {/* Phones: the full-width video sits centred in the space above the text, its edges carried out by the glow */}
      <div className="relative flex w-full flex-1 items-center justify-center md:min-h-0 md:[container-type:size]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative aspect-video w-full md:w-[min(100cqw,calc(100cqh*16/9))]"
        style={VIDEO_FADE}
      >
        <video
          ref={videoRef}
          poster={VIDEO.poster}
          loop
          playsInline
          preload="auto"
          aria-label="A 50-second tour of what 21 Spheres builds"
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src={VIDEO.small} type="video/mp4" media="(max-width: 767px)" />
          <source src={VIDEO.large} type="video/mp4" />
        </video>
      </motion.div>
      </div>

      {/* Below the video, never on it */}
      <motion.div
        {...rise(0.3)}
        className="relative flex w-full flex-col gap-6 px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:pb-6 sm:pt-3 lg:px-14"
      >
        {/* A headline on phones, a quiet caption beside the buttons on larger screens */}
        <p className={`max-w-md text-[22px] font-light leading-[1.3] tracking-[-0.02em] transition-colors duration-500 sm:text-sm sm:font-normal sm:leading-relaxed sm:tracking-normal ${onDark ? "text-white/75" : "text-[#4A4955]"}`}>
          <span className={`font-medium transition-colors duration-500 ${onDark ? "text-white" : "text-[#19191C]"}`}>21 Spheres</span> is a product studio building software and AI
          that people love to use.
        </p>
        {/* Phones: Explore fills the row for an easy tap, with the sound toggle beside it */}
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={toggleSound}
            data-sound-toggle
            aria-pressed={!muted}
            aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
            title={muted ? "Sound on" : "Sound off"}
            className={`${onDark ? GLASS_DARK : GLASS_LIGHT} order-2 w-11 shrink-0 justify-center px-0 sm:order-none`}
          >
            {muted ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className={`h-4 w-4 ${onDark ? "text-[#C9BBFF]" : "text-[#573EBF]"}`} />}
          </button>
          {/* The site's pill, leading on to the work itself */}
          <Link href="/case-studies" className={`group order-1 flex-1 justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8] sm:order-none sm:flex-none ${pillClassName("md")}`}>
            Explore our work
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
              <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default IntroVideoSection;
