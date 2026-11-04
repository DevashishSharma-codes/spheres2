"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** On desktop, scales its child down so it never makes the first screen taller than the window. */
export function FitToHeight({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setScale(desktop && inner.offsetHeight ? Math.min(1, outer.clientHeight / inner.offsetHeight) : 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="flex min-w-0 items-center justify-center lg:h-full lg:min-h-0">
      <div ref={innerRef} className="w-full shrink-0" style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
        {children}
      </div>
    </div>
  );
}
