"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe as GlobeIcon, Heart } from "lucide-react";
import { StaticTestimonialCard, TestimonialCardData } from "./StaticTestimonialCard";
import { TESTIMONIAL_PHRASES, TESTIMONIALS } from "@/content/testimonials";

// The real testimonials (from content/testimonials). No photos, so each card shows the person's initials.
// Each card keeps its own background and colour scheme, by position.
const CARD_LOOKS: Pick<TestimonialCardData, "bgImage" | "themeVariant">[] = [
  { bgImage: "/card-bgs/user-bg-pink-purple.png", themeVariant: "purple" },
  { bgImage: "/card-bgs/user-bg-yellow-peach.jpg", themeVariant: "noir" },
  { bgImage: "/card-bgs/user-bg-green-gradient.png", themeVariant: "slate" },
  { bgImage: "/card-bgs/user-bg-pink-purple.png", themeVariant: "purple" },
  { bgImage: "/card-bgs/user-bg-yellow-peach.jpg", themeVariant: "noir" },
  { bgImage: "/card-bgs/user-bg-green-gradient.png", themeVariant: "slate" },
  { bgImage: "/card-bgs/user-bg-pink-purple.png", themeVariant: "purple" },
  { bgImage: "/card-bgs/user-bg-yellow-peach.jpg", themeVariant: "slate" },
];
const CARDS: TestimonialCardData[] = TESTIMONIALS.map((testimonial, index) => ({
  id: index + 1,
  company: testimonial.company,
  subhead: testimonial.quote,
  name: testimonial.name,
  role: testimonial.role,
  avatar: "",
  ...CARD_LOOKS[index % CARD_LOOKS.length],
}));

// The lines that change, one after another, in the testimonials header. Always on one line.
const PHRASES = TESTIMONIAL_PHRASES;
const PHRASE_MS = 2600;

const GLOBE_MARKERS = [
  { name: "Robert M.", city: "SF, USA", lat: 37.77, lon: -122.41, img: "/testimonials/avatars/avatar-01.jpg" },
  { name: "Sarah K.", city: "London, UK", lat: 51.50, lon: -0.12, img: "/testimonials/avatars/avatar-02.jpg" },
  { name: "Mei T.", city: "Tokyo, JP", lat: 35.67, lon: 139.65, img: "/testimonials/avatars/avatar-04.jpg" },
  { name: "Daniel O.", city: "Bengaluru, IN", lat: 12.97, lon: 77.59, img: "/testimonials/avatars/avatar-06.jpg" },
  { name: "Elena R.", city: "Berlin, DE", lat: 52.52, lon: 13.40, img: "/testimonials/avatars/avatar-03.jpg" },
];

interface MarkerPosition {
  x: number;
  y: number;
  z: number;
  visible: boolean;
  opacity: number;
  scale: number;
  zIndex: number;
}

/* ------------------------------------------------------------------ */
/* Phones: every testimonial in a two-column bento                     */
/* ------------------------------------------------------------------ */

/** Order and shape for phones: a wide feature, four tiles, another wide feature, two tiles. */
const BENTO = [
  { index: 0, wide: true },
  { index: 2 }, { index: 3 }, { index: 4 }, { index: 5 },
  { index: 7, wide: true },
  { index: 1 }, { index: 6 },
];

function MobileTestimonialsBento() {
  return (
    <div className="relative z-10 grid w-full grid-cols-2 gap-2 pb-2 md:hidden">
      {BENTO.map(({ index, wide }) => (
        <div key={CARDS[index].id} className={wide ? "col-span-2" : ""}>
          <StaticTestimonialCard card={CARDS[index]} bricks="up" size={wide ? "wide" : "tile"} />
        </div>
      ))}
    </div>
  );
}

export function TestimonialsWall() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [markerPositions, setMarkerPositions] = useState<MarkerPosition[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ellipse1Ref = useRef<SVGEllipseElement>(null);
  const ellipse2Ref = useRef<SVGEllipseElement>(null);
  const ellipse3Ref = useRef<SVGEllipseElement>(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // 1. 3D Wireframe Rotating Ellipses (requestAnimationFrame). Phones keep the globe still.
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let isVisible = false;
    const animate = () => {
      if (!isVisible) return;
      rotationRef.current = (rotationRef.current + 0.6) % 360;
      const angle = rotationRef.current;
      if (ellipse1Ref.current) {
        ellipse1Ref.current.setAttribute("rx", String(Math.abs(Math.cos((angle * Math.PI) / 180)) * 52));
      }
      if (ellipse2Ref.current) {
        ellipse2Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 60) * Math.PI) / 180)) * 52));
      }
      if (ellipse3Ref.current) {
        ellipse3Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 120) * Math.PI) / 180)) * 52));
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  // 2. 3D Spherical Trigonometry for Orbiting City Markers
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const updateMarkers = () => {
      const angle = rotationRef.current;
      const positions = GLOBE_MARKERS.map((marker) => {
        const radius = 48;
        const phi = (90 - marker.lat) * (Math.PI / 180);
        const theta = (marker.lon + angle) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return {
          x,
          y,
          z,
          visible: z > -10,
          opacity: Math.max(0.2, (z + 20) / 88),
          scale: 0.72 + (z / 66) * 0.28,
          zIndex: Math.floor(z + 100),
        };
      });
      setMarkerPositions(positions);
    };

    // Phones place the markers once and leave them there.
    if (window.matchMedia("(max-width: 767px)").matches) {
      const frame = requestAnimationFrame(updateMarkers);
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateMarkers();
          if (!interval) interval = setInterval(updateMarkers, 100);
        } else {
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  // 3. Cycling Global Network Phrases
  // One timer per line shown, restarted after every change, so it never stalls or skips a beat.
  useEffect(() => {
    const phraseTimer = setTimeout(() => {
      setActivePhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, PHRASE_MS);
    return () => clearTimeout(phraseTimer);
  }, [activePhraseIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 text-[#18181B] py-8 sm:py-8 lg:py-12 md:min-h-screen flex flex-col justify-between select-none overflow-hidden border-t border-[#DADADD]/70"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center pt-2 sm:pt-4 mb-auto">
        
        {/* =========================================================
            1. SECTION TITLE: "Wall of LOVE" WITH HEART ICON
            ========================================================= */}
        <div className="text-center mb-3 sm:mb-4 relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#18181B] uppercase leading-none inline-flex items-center justify-center">
            <span>Wall of L</span>
            <Heart className="w-5 h-5 sm:w-8 sm:h-8 lg:w-9 lg:h-9 fill-[#7057D9] text-[#7057D9] shrink-0 self-center mx-[2px] -mt-0.5" />
            <span>VE</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-[#2A2A2E]/70 font-light mt-1.5 max-w-md mx-auto">
            A few words from the teams building what’s next with 21 Spheres.
          </p>
        </div>

        {/* =========================================================
            2. 3D ROTATING WIREFRAME GLOBE + ORBITING CITY BADGES
            ========================================================= */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 relative z-10">
          <div className="relative w-[170px] sm:w-[200px] lg:w-[220px] h-[100px] sm:h-[120px] lg:h-[130px] flex items-center justify-center overflow-hidden">
            {/* SVG Wireframe Globe */}
            <svg 
              className="absolute w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] lg:w-[125px] lg:h-[125px] pointer-events-none z-0" 
              viewBox="0 0 160 160"
            >
              <circle cx="80" cy="80" r="52" stroke="rgba(112, 87, 217, 0.35)" strokeWidth="1.2" fill="none" />
              <ellipse cx="80" cy="80" rx="52" ry="18" stroke="rgba(112, 87, 217, 0.2)" strokeWidth="1" fill="none" />
              <ellipse cx="80" cy="80" rx="52" ry="34" stroke="rgba(112, 87, 217, 0.2)" strokeWidth="1" fill="none" />
              <line x1="28" y1="80" x2="132" y2="80" stroke="rgba(112, 87, 217, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse
                ref={ellipse1Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(112, 87, 217, 0.4)"
                strokeWidth="1.2"
                fill="none"
              />
              <ellipse
                ref={ellipse2Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(112, 87, 217, 0.2)"
                strokeWidth="1"
                fill="none"
              />
              <ellipse
                ref={ellipse3Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(112, 87, 217, 0.2)"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Orbiting City Markers with 3D Depth Sorting */}
            <div className="relative w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] lg:w-[125px] lg:h-[125px] flex items-center justify-center z-10 pointer-events-none">
              {GLOBE_MARKERS.map((marker, idx) => {
                const pos = markerPositions[idx];
                if (!pos || !pos.visible) return null;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${pos.x * 0.9}px - 12px)`,
                      top: `calc(50% - ${pos.y * 0.9}px - 12px)`,
                      opacity: pos.opacity,
                      transform: `scale(${pos.scale * 0.9})`,
                      zIndex: pos.zIndex,
                      transition: "left 0.1s linear, top 0.1s linear, opacity 0.1s linear, transform 0.1s linear",
                    }}
                    className="flex items-center gap-1 bg-white/90 backdrop-blur-md border border-[#7057D9]/25 p-0.5 pr-2 rounded-full shadow-xs"
                  >
                    <img
                      src={marker.img}
                      alt={marker.name}
                      className="w-3.5 h-3.5 rounded-full object-cover border border-[#7057D9]/40 shrink-0"
                    />
                    <span className="font-mono text-[8px] font-semibold text-[#18181B] whitespace-nowrap">
                      {marker.city}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cycling Phrases & Network Badge */}
          <div className="relative z-20 w-full text-center pt-1 px-2 max-w-2xl">
            <div className="flex items-center justify-center gap-1 mb-0.5 text-[#7057D9]">
              <GlobeIcon className="w-3 h-3" />
              <span className="font-mono text-[8px] uppercase tracking-widest font-semibold text-[#2A2A2E]/70">
                21SPHERES GLOBAL NETWORK
              </span>
            </div>
            {/* Always one line, in a box of fixed height, so nothing around it moves. The size eases down
                on narrow phones so the longest line still fits. */}
            <div className="relative h-[1.5em] text-[clamp(8.5px,2.4vw,14px)]">
              <AnimatePresence initial={false}>
                <motion.h3
                  key={activePhraseIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-light leading-none tracking-tight text-[#18181B] uppercase"
                >
                  {PHRASES[activePhraseIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. STAGGERED 4-COLUMN TESTIMONIAL CARDS GRID (8 CARDS)
            ========================================================= */}
        <MobileTestimonialsBento />

        <div className="relative z-10 hidden w-full grid-cols-1 items-start gap-4 pb-6 sm:gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 (Leftmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticTestimonialCard card={CARDS[0]} bricks="up" />
            <StaticTestimonialCard card={CARDS[1]} bricks="down" />
          </div>

          {/* Column 2 (Center Left - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticTestimonialCard card={CARDS[2]} bricks="up" />
            <StaticTestimonialCard card={CARDS[3]} bricks="down" />
          </div>

          {/* Column 3 (Center Right - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticTestimonialCard card={CARDS[4]} bricks="up" />
            <StaticTestimonialCard card={CARDS[5]} bricks="down" />
          </div>

          {/* Column 4 (Rightmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticTestimonialCard card={CARDS[6]} bricks="up" />
            <StaticTestimonialCard card={CARDS[7]} bricks="down" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsWall;

