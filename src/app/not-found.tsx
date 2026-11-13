import type { Metadata } from "next";
import Link from "next/link";
import { PillLink } from "@/components/ui/PillLink";
import { MARK_DOTS, MARK_SIZE } from "@/components/layout/logoShapes";
import { NOT_INDEXED } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: NOT_INDEXED,
};

// The logo's ring of spheres stands in for the 0, turning slowly.
const RING_CSS = `
.lost-ring { animation: lost-ring 24s linear infinite; transform-origin: 50% 50%; }
@keyframes lost-ring { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .lost-ring { animation: none; } }
`;

const DIGIT = "bg-gradient-to-b from-[#6D54F1] via-[#7F68EE] to-[#A898F5]/50 bg-clip-text text-transparent";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-white px-6 pb-16 pt-28">
      <style href="not-found-ring" precedence="default">{RING_CSS}</style>
      <div className="flex max-w-2xl flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.19em] text-[#7057D9]">Error 404</p>

        <div
          aria-hidden="true"
          className="mt-4 flex items-center gap-[0.04em] text-[clamp(6rem,22vw,13rem)] font-light leading-none tracking-[-0.06em]"
        >
          <span className={DIGIT}>4</span>
          <svg viewBox={`0 0 ${MARK_SIZE[0]} ${MARK_SIZE[1]}`} className="lost-ring mx-[0.04em] h-[0.72em] w-[0.72em]">
            <defs>
              <linearGradient id="lost-ring-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6D54F1" />
                <stop offset="100%" stopColor="#A898F5" />
              </linearGradient>
            </defs>
            {MARK_DOTS.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#lost-ring-fill)" />
            ))}
          </svg>
          <span className={DIGIT}>4</span>
        </div>

        <h1 className="mt-6 text-3xl font-light leading-[1.1] tracking-[-0.04em] text-[#19191C] sm:text-5xl">
          Off the map, for now.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6E6D78]">
          This page doesn&rsquo;t exist, but plenty of great products started with a wrong turn. Tell us where you were
          headed, or start again from the beginning.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <PillLink href="/contact">Talk to us</PillLink>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full border border-[#DADADD] px-6 text-sm text-[#19191C] transition-colors hover:border-[#19191C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8E79E8]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
