"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe as GlobeIcon, Heart } from "lucide-react";
import { StaticTestimonialCard, TestimonialCardData } from "./StaticTestimonialCard";

const CARDS: TestimonialCardData[] = [
  // Column 1 Top (99wp) - Purple
  {
    id: 1,
    company: "99wp",
    subhead: "I found myself looking at some of the messages that it's created and thinking like, wow, where did it find this? This went really deep to find information that you could never do in just a cursory search.",
    name: "Tim O Niel",
    role: "CRO • VP Sales & BizDev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-pink-purple.png",
    themeVariant: "purple",
  },
  // Column 1 Bottom (gocanvas) - Slate
  {
    id: 2,
    company: "gocanvas",
    subhead: "A prospect replied: 'I was never considering anything until you reached out with a message that literally spoke to me.' The secret sauce in 21Spheres is the messaging itself.",
    name: "Conrad de Claro",
    role: "Director of Growth Marketing @GoCanvas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-yellow-peach.jpg",
    themeVariant: "slate",
  },
  // Column 2 Top (GROWTH PROTOCOL) - Noir
  {
    id: 3,
    company: "GROWTH PROTOCOL",
    subhead: "I'm able to come into those pipeline review meetings and show what I booked through 21Spheres. When other channels slow down, 21Spheres is always there.",
    name: "Angelene Perez-Vento",
    role: "AE @Growth Protocol",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-green-gradient.png",
    themeVariant: "noir",
  },
  // Column 2 Bottom (Kaster) - Frost
  {
    id: 4,
    company: "Kaster",
    subhead: "If you have a clearly defined ICP and persona, you need to add 21Spheres to your tech stack immediately to supplement your sales pipeline.",
    name: "Elena R.",
    role: "CTO @ Kaster",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-pink-purple.png",
    themeVariant: "frost",
  },
  // Column 3 Top (Brex) - Slate
  {
    id: 5,
    company: "Brex",
    subhead: "Email and LinkedIn work, but the bar for personalization has gotten higher. The new standard is being set by 21Spheres. Go see it for yourself.",
    name: "Garrett Marker",
    role: "CRO @ Brex",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-yellow-peach.jpg",
    themeVariant: "slate",
  },
  // Column 3 Bottom (Gallea Ai) - Noir
  {
    id: 6,
    company: "Gallea Ai",
    subhead: "Booking 14 meetings with qualified prospects used to take three months. 21Spheres shrank that timeline from 90 days down to 20, which is wild.",
    name: "Maya T.",
    role: "Chief Architect @ Gallea Ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-green-gradient.png",
    themeVariant: "noir",
  },
  // Column 4 Top (10X Management) - Purple
  {
    id: 7,
    company: "10X Management",
    subhead: "21Spheres gave us complete control of outreach. Most importantly, it was a third of the cost of the agency we were previously using.",
    name: "Sam Z",
    role: "Sales Lead @ 10X Management",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-pink-purple.png",
    themeVariant: "purple",
  },
  // Column 4 Bottom (Superposition) - Frost
  {
    id: 8,
    company: "Superposition",
    subhead: "The messages it writes are actually really high-taste. I was genuinely surprised by the personalization — it's that good.",
    name: "Edmund Cuthbert",
    role: "Founder at Superposition",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bgImage: "/card-bgs/user-bg-yellow-peach.jpg",
    themeVariant: "frost",
  },
];

const PHRASES = [
  "120+ Enterprise builds shipped across 14 countries",
  "Over 50+ global clients trust 21Spheres",
  "Sub-50ms SLA identity OCR processing worldwide",
  "High-frequency digital architecture by 21Spheres",
];

const GLOBE_MARKERS = [
  { name: "Robert M.", city: "SF, USA", lat: 37.77, lon: -122.41, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
  { name: "Sarah K.", city: "London, UK", lat: 51.50, lon: -0.12, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
  { name: "Mei T.", city: "Tokyo, JP", lat: 35.67, lon: 139.65, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
  { name: "Daniel O.", city: "Bengaluru, IN", lat: 12.97, lon: 77.59, img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80" },
  { name: "Elena R.", city: "Berlin, DE", lat: 52.52, lon: 13.40, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" },
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

export function TestimonialsWall() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [markerPositions, setMarkerPositions] = useState<MarkerPosition[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ellipse1Ref = useRef<SVGEllipseElement>(null);
  const ellipse2Ref = useRef<SVGEllipseElement>(null);
  const ellipse3Ref = useRef<SVGEllipseElement>(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // 1. 3D Wireframe Rotating Ellipses (requestAnimationFrame)
  useEffect(() => {
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
  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3600);
    return () => clearInterval(phraseTimer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 text-[#18181B] py-6 sm:py-8 lg:py-12 min-h-screen flex flex-col justify-between select-none overflow-hidden border-t border-[#DADADD]/70"
      style={{
        background: `
          radial-gradient(ellipse 80% 38% at 50% 0%, rgba(124, 58, 237, 0.16) 0%, rgba(196, 181, 253, 0.10) 48%, transparent 100%),
          linear-gradient(180deg, #F4F0FF 0%, #FAF9FC 48%, #F7F4FC 100%)
        `,
      }}
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
            A few words from the teams building what’s next with 21Spheres.
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
          <div className="relative z-20 w-full text-center pt-1 px-2 max-w-md">
            <div className="flex items-center justify-center gap-1 mb-0.5 text-[#7057D9]">
              <GlobeIcon className="w-3 h-3" />
              <span className="font-mono text-[8px] uppercase tracking-widest font-semibold text-[#2A2A2E]/70">
                21SPHERES GLOBAL NETWORK
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={activePhraseIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="text-xs sm:text-sm font-light text-[#18181B] leading-tight tracking-tight uppercase"
              >
                {PHRASES[activePhraseIndex]}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================================
            3. STAGGERED 4-COLUMN TESTIMONIAL CARDS GRID (8 CARDS)
            ========================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start relative z-10 pb-6">
          {/* Column 1 (Leftmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticTestimonialCard card={CARDS[0]} />
            <StaticTestimonialCard card={CARDS[1]} />
          </div>

          {/* Column 2 (Center Left - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticTestimonialCard card={CARDS[2]} />
            <StaticTestimonialCard card={CARDS[3]} />
          </div>

          {/* Column 3 (Center Right - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticTestimonialCard card={CARDS[4]} />
            <StaticTestimonialCard card={CARDS[5]} />
          </div>

          {/* Column 4 (Rightmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticTestimonialCard card={CARDS[6]} />
            <StaticTestimonialCard card={CARDS[7]} />
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsWall;

