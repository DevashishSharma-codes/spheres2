import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface AboutCardProps {
  title: string;
  summary: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  /** The card in the centre of the carousel. */
  active?: boolean;
  onClick: () => void;
}

/*
 * Purple frosted glass, in the style of macOS's translucent materials with the black tint
 * swapped for violet. Everything stays inside the card (no shadow or glow outside it):
 *  - Behind the glass: bright, slowly drifting fields of violet, pink and blue over a light
 *    see-through base, so you look *into* the card and see colour moving.
 *  - The glass: a soft violet frost with a fine grain, so the colour reads as blurred through it.
 *  - Light: a bright reflection across the top, a diagonal streak, and light caught along the rim.
 */
const FROST = "linear-gradient(180deg, rgba(58,38,140,.34) 0%, rgba(40,24,108,.5) 100%)";
const REFLECTION =
  "linear-gradient(180deg, rgba(255,255,255,.26) 0%, rgba(255,255,255,.06) 22%, rgba(255,255,255,0) 40%), " +
  "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.12) 42%, rgba(255,255,255,0) 54%)";
// A fine grain, like the texture of frosted glass.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/*
 * "blend": the light violet below with the glass's drifting colour, grain and reflection on top.
 * "dusk": the light violet alone (from the Industries tabs, lightened towards the logo's violet).
 * "glass": the frosted purple glass above. Switch STYLE to compare them.
 */
const STYLE: "blend" | "dusk" | "glass" = "blend";
// Leans towards the 21 Spheres logo's violet, kept soft.
const DUSK = "linear-gradient(172deg, #9a89de 0%, #8571cf 40%, #6d58b9 72%, #5641a0 100%)";
const DUSK_REFLECTION = "linear-gradient(180deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,0) 30%)";

// Light caught inside the edges of the glass.
const EDGE_LIGHT =
  "inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.18), inset 0 0 28px rgba(255,255,255,.1)";

// The 1px rim: brighter along the top where light catches the glass, faint down the sides.
const RIM: React.CSSProperties = {
  padding: "1px",
  background:
    "linear-gradient(180deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,.28) 25%, rgba(255,255,255,.16) 70%, rgba(255,255,255,.4) 100%)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

/**
 * The About carousel card. Every card has the same regions at the same sizes: a framed photo,
 * a title with room for two lines, a two-line summary, and a footer with "Read more" and the arrow.
 * The full text lives in the detail view that opens from the card.
 */
export function AboutCard({ title, summary, image, icon: Icon, active = false, onClick }: AboutCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${title}: ${active ? "read more" : "show this card"}`}
      style={{ boxShadow: EDGE_LIGHT }}
      className="group relative flex h-[372px] w-full cursor-pointer flex-col overflow-hidden rounded-[28px] p-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7057D9] motion-reduce:transition-none sm:h-[392px]"
    >
      {STYLE === "blend" ? (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]" style={{ background: DUSK }}>
            {/* The glass's colour, drifting softly through the violet */}
            <span className="about-glass-blob absolute -left-12 -top-6 h-56 w-56 rounded-full bg-[#7C3AED]/45 blur-2xl" />
            <span className="about-glass-blob absolute -right-14 top-1/4 h-56 w-56 rounded-full bg-[#E879F9]/35 blur-2xl [animation-delay:-7s]" />
            <span className="about-glass-blob absolute -bottom-14 left-1/5 h-56 w-56 rounded-full bg-[#60A5FA]/35 blur-2xl [animation-delay:-12s]" />
            <span className="about-glass-blob absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-white/30 blur-2xl [animation-delay:-4s]" />
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[.1] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: REFLECTION }} />
        </>
      ) : STYLE === "dusk" ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: `${DUSK_REFLECTION}, ${DUSK}` }} />
      ) : (
        <>
          {/* Behind the glass: colour drifting over a light, see-through base */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] bg-[#7A5CE6]/45">
            <span className="about-glass-blob absolute -left-12 -top-6 h-56 w-56 rounded-full bg-[#6D28D9] blur-2xl" />
            <span className="about-glass-blob absolute -right-14 top-1/4 h-56 w-56 rounded-full bg-[#D946EF]/70 blur-2xl [animation-delay:-7s]" />
            <span className="about-glass-blob absolute -bottom-14 left-1/5 h-56 w-56 rounded-full bg-[#3B82F6]/70 blur-2xl [animation-delay:-12s]" />
            <span className="about-glass-blob absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-white/50 blur-2xl [animation-delay:-4s]" />
          </span>
          {/* The glass: violet frost, grain, then the reflections on its surface */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: FROST }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: REFLECTION }} />
        </>
      )}
      {/* Rim */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[28px]" style={RIM} />
      {/* Photo, framed inside the card */}
      <span className="relative z-10 block aspect-[16/11] w-full shrink-0 overflow-hidden rounded-[21px] bg-[#2C1E68] shadow-[0_6px_16px_-8px_rgba(10,6,40,.5)]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span aria-hidden="true" className="absolute inset-0 rounded-[21px] ring-1 ring-inset ring-white/15" />
      </span>

      {/* Words: the title always has room for two lines and the summary for two, so cards match */}
      <span className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pt-[26px]">
        {/* Icon tile in matching glass, half over the photo's lower edge, linking picture and words */}
        <span
          aria-hidden="true"
          className="absolute -top-[18px] left-3 z-20 flex h-9 w-9 items-center justify-center rounded-[11px] text-white backdrop-blur-xl"
          style={{
            background: "linear-gradient(180deg, rgba(120,96,220,.55), rgba(70,50,160,.55))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.4), 0 0 0 1px rgba(255,255,255,.16), 0 6px 14px -6px rgba(10,6,40,.5)",
          }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="relative line-clamp-2 min-h-[2.5em] pb-px text-[19px] font-normal leading-[1.25] tracking-[-0.025em] text-white">
          {title}
        </span>
        <span className="relative mt-1.5 line-clamp-2 min-h-[3em] text-[13px] leading-[1.55] tracking-[-0.003em] text-white/70">{summary}</span>

        <span className="mt-auto flex items-center justify-between border-t border-white/12 pb-2 pt-2.5">
          {/* An underline draws in under "Read more" on hover */}
          <span className="relative text-[13px] font-medium text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white/80 after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:after:transition-none">
            Read more
          </span>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#4A32B0] shadow-[0_2px_8px_rgba(10,6,40,.35)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </span>
    </button>
  );
}
