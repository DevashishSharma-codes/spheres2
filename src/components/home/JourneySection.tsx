"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Each hand bleeds off the top or bottom edge of the section, so the images sit flush against it.
const HANDS = [
  { name: "top-left", width: 218, height: 222, className: "top-0 left-[4%] h-[29%] md:left-[13%] md:h-[34%]" },
  { name: "top-center", width: 98, height: 160, className: "top-0 left-1/2 h-[21%] -translate-x-1/2 md:h-[25%]" },
  { name: "top-right", width: 178, height: 194, className: "top-0 right-[5%] h-[26%] md:right-[14%] md:h-[30%]" },
  { name: "bottom-left", width: 256, height: 217, className: "bottom-0 left-0 h-[27%] md:left-[6%] md:h-[34%]" },
  { name: "bottom-right", width: 306, height: 154, className: "bottom-0 right-0 h-[20%] md:right-[5%] md:h-[25%]" },
] as const;

type HandName = (typeof HANDS)[number]["name"];

const STRING_COLOR = "#19191C";

interface StringShape {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tail: string;
  endX: number;
  endY: number;
}

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const handRefs = useRef<Partial<Record<HandName, HTMLImageElement | null>>>({});
  const [string, setString] = useState<StringShape | null>(null);

  // The hands scale with the section, so the oval is fitted to where they actually are.
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const fit = () => {
      const box = section.getBoundingClientRect();
      const text = heading.getBoundingClientRect();
      const on = (name: HandName, fx: number, fy: number) => {
        const hand = handRefs.current[name]?.getBoundingClientRect();
        if (!hand) return { x: 0, y: 0 };
        return { x: hand.left - box.left + hand.width * fx, y: hand.top - box.top + hand.height * fy };
      };

      const cx = box.width / 2;
      const cy = box.height / 2;

      // Top of the oval runs through the fist, and its side through the top-left pinch.
      const ry = cy - on("top-center", 0.5, 0.7).y;
      const pinch = on("top-left", 0.62, 0.9);
      const pinchHeight = Math.min((cy - pinch.y) / ry, 0.9);
      const fitted = (cx - pinch.x) / Math.sqrt(1 - pinchHeight * pinchHeight);
      const rx = Math.min(Math.max(fitted, (text.width / 2) * 1.25), cx - 12);

      // The tail leaves the right of the oval heading straight down, and ends on the rightmost finger.
      const end = on("bottom-right", 0.86, 0.2);
      const startX = cx + rx;
      const drop = (end.y - cy) / 2;

      setString({
        cx,
        cy,
        rx,
        ry,
        tail: `M ${startX} ${cy} C ${startX} ${cy + drop}, ${end.x} ${end.y - drop}, ${end.x} ${end.y}`,
        endX: end.x,
        endY: end.y,
      });
    };

    const observer = new ResizeObserver(fit);
    observer.observe(section);
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[50svh] min-h-[380px] w-full items-center justify-center overflow-hidden border-t border-[#DADADD]/70 bg-white px-4"
    >
      {HANDS.map((hand) => (
        <Image
          key={hand.name}
          ref={(node) => {
            handRefs.current[hand.name] = node;
          }}
          src={`/journey/hand-${hand.name}.png`}
          alt=""
          width={hand.width}
          height={hand.height}
          unoptimized
          className={`pointer-events-none absolute w-auto select-none ${hand.className}`}
        />
      ))}

      {string && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          stroke={STRING_COLOR}
          strokeWidth="2"
        >
          <ellipse cx={string.cx} cy={string.cy} rx={string.rx} ry={string.ry} />
          <path d={string.tail} strokeLinecap="round" />
          <circle cx={string.endX} cy={string.endY} r="4" fill={STRING_COLOR} stroke="none" />
        </svg>
      )}

      <h2
        ref={headingRef}
        className="relative text-center text-4xl font-light leading-[1.08] tracking-[-0.04em] text-[#111114] sm:text-5xl lg:text-[64px]"
      >
        Let&rsquo;s take <br className="md:hidden" />
        this <br className="hidden md:inline" />
        <span className="text-[#7057D9]">journey</span> <br className="md:hidden" />
        together.
      </h2>
    </section>
  );
}
