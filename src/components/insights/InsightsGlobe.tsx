"use client";

import { useEffect, useRef, useState } from "react";
import type { Arc, Marker } from "cobe";

// A few world cities, linked back to India, where 21 Spheres is based.
const HOME: [number, number] = [23.24, 69.67];
const CITIES: [number, number][] = [
  [51.51, -0.13],
  [40.71, -74.01],
  [1.35, 103.82],
  [25.2, 55.27],
  [-33.87, 151.21],
];
const MARKERS: Marker[] = [HOME, ...CITIES].map((location) => ({ location, size: 0.05 }));
const ARCS: Arc[] = CITIES.map((to) => ({ from: HOME, to }));

const ROTATION_PER_FRAME = 0.0022;

/** Rotates only while on screen, and holds still for people who prefer reduced motion. */
export function InsightsGlobe({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyGlobe: (() => void) | undefined;
    let frame = 0;
    let cancelled = false;
    let onScreen = true;
    const stillGlobe = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    visibility.observe(canvas);

    import("cobe")
      .then(({ default: createGlobe }) => {
        if (cancelled) return;
        const size = canvas.offsetWidth || 560;
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        let phi = 4.75;

        const globe = createGlobe(canvas, {
          devicePixelRatio,
          width: size * devicePixelRatio,
          height: size * devicePixelRatio,
          phi,
          theta: 0.28,
          // Dark: a graphite globe with silver land and soft lavender arcs, for graphite panels.
          dark: dark ? 1 : 0,
          diffuse: dark ? 1.2 : 1.1,
          mapSamples: 20000,
          mapBrightness: dark ? 4 : 1.6,
          mapBaseBrightness: dark ? 0 : 0.04,
          baseColor: dark ? [0.52, 0.52, 0.56] : [0.86, 0.86, 0.9],
          markerColor: dark ? [0.77, 0.72, 1] : [0.427, 0.329, 0.945],
          glowColor: dark ? [0.3, 0.3, 0.34] : [0.97, 0.97, 1],
          arcColor: dark ? [0.77, 0.72, 1] : [0.427, 0.329, 0.945],
          arcWidth: 0.4,
          arcHeight: 0.28,
          markers: MARKERS,
          arcs: ARCS,
        });
        destroyGlobe = () => globe.destroy();
        setReady(true);

        if (stillGlobe) return;
        const spin = () => {
          if (onScreen) {
            phi += ROTATION_PER_FRAME;
            globe.update({ phi });
          }
          frame = requestAnimationFrame(spin);
        };
        frame = requestAnimationFrame(spin);
      })
      .catch(() => undefined); // Without WebGL the card simply shows its words.

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      destroyGlobe?.();
    };
  }, [dark]);

  return (
    // cobe wraps the canvas in its own element, so the canvas needs a parent of ours that React manages.
    <div aria-hidden="true" className={`aspect-square transition-opacity duration-700 ${ready ? "opacity-80" : "opacity-0"} ${className}`}>
      <canvas ref={canvasRef} className="aspect-square w-full" />
    </div>
  );
}
