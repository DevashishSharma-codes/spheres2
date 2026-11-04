"use client";

import { useEffect, useRef } from "react";

const SPACING = 22;
const RADIUS = 190;
const BOTTOM_FADE = "linear-gradient(#000 82%, transparent)";

/**
 * Dot grid that lights up around the cursor. The faint base grid is plain CSS;
 * the canvas only draws the dots inside the reveal circle, so the cost stays
 * small however tall the section is. Fill the nearest positioned parent.
 */
export function CursorDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let touched = false; // the cursor has arrived, so stop the idle drift
    let inside = false;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let strength = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;

      if (!touched) {
        // Slow drift across the top of the field until the cursor takes over.
        const area = Math.min(height, window.innerHeight);
        target.x = width * (0.68 + 0.2 * Math.sin(time / 2600));
        target.y = area * (0.45 + 0.22 * Math.cos(time / 1900));
      }
      const active = inside || !touched;
      strength += ((active ? 1 : 0) - strength) * 0.08;
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;

      ctx.clearRect(0, 0, width, height);
      if (strength < 0.01) return;

      const minCol = Math.max(0, Math.floor((pos.x - RADIUS) / SPACING));
      const maxCol = Math.ceil((pos.x + RADIUS) / SPACING);
      const minRow = Math.max(0, Math.floor((pos.y - RADIUS) / SPACING));
      const maxRow = Math.ceil((pos.y + RADIUS) / SPACING);

      for (let col = minCol; col <= maxCol; col++) {
        for (let row = minRow; row <= maxRow; row++) {
          const x = (col + 0.5) * SPACING;
          const y = (row + 0.5) * SPACING;
          const dx = x - pos.x;
          const dy = y - pos.y;
          const dist = Math.hypot(dx, dy);
          if (dist > RADIUS) continue;

          const t = 1 - dist / RADIUS;
          const eased = t * t * (3 - 2 * t);
          // Dots ripple outward from the cursor, so the field feels alive.
          const wave = Math.sin(dist / 26 - time / 340) * 2.4 * eased;
          const push = eased * 7 + wave;
          const nx = dist ? dx / dist : 0;
          const ny = dist ? dy / dist : 0;

          ctx.beginPath();
          ctx.arc(x + nx * push, y + ny * push, 0.9 + eased * 1.9, 0, Math.PI * 2);
          // White at the centre, fading to brand purple at the edge.
          const r = Math.round(142 + 113 * eased);
          const g = Math.round(121 + 134 * eased);
          ctx.fillStyle = `rgba(${r}, ${g}, 255, ${eased * strength})`;
          ctx.fill();
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside) {
        if (!touched) touched = true;
        target.x = x;
        target.y = y;
      }
    };
    const onPointerLeave = () => {
      inside = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);
    resize();
    pos.x = width * 0.7;
    pos.y = Math.min(height, window.innerHeight) * 0.45;

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.11) 1px, transparent 1.3px)",
          backgroundSize: `${SPACING}px ${SPACING}px`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
