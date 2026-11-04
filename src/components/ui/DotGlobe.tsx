"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS: [number, number][] = [
  [28.61, 77.21], // New Delhi
  [19.08, 72.88], // Mumbai
  [50.11, 8.68], // Frankfurt
  [37.77, -122.42], // San Francisco
  [1.35, 103.82], // Singapore
];

/** Rotating dotted globe in the brand's purple. Fills its (square) parent. */
export function DotGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = canvas.offsetWidth;
    let phi = 1.2;
    let frame = 0;
    let visible = true;

    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta: 0.25,
        dark: 1,
        diffuse: 2.2,
        mapSamples: 16000,
        mapBrightness: 9,
        baseColor: [0.62, 0.58, 0.82],
        markerColor: [0.75, 0.68, 1],
        glowColor: [0.3, 0.24, 0.52],
        markers: MARKERS.map((location) => ({ location, size: 0.05 })),
        arcs: [
          { from: MARKERS[0], to: MARKERS[2] },
          { from: MARKERS[1], to: MARKERS[4] },
          { from: MARKERS[2], to: MARKERS[3] },
        ],
        arcColor: [0.62, 0.52, 0.95],
        arcWidth: 0.5,
        arcHeight: 0.3,
      });
    } catch {
      return; // No WebGL: the surrounding layout still reads fine without the globe.
    }

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      phi += 0.0028;
      globe.update({ phi });
    };
    if (!still) frame = requestAnimationFrame(tick);

    const resize = new ResizeObserver(() => {
      size = canvas.offsetWidth;
      globe.update({ width: size * dpr, height: size * dpr });
    });
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      globe.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`aspect-square h-auto w-full ${className}`} />;
}
