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
 * Lilac glass, built on the optics that make glass read as glass (as in a macOS segmented control):
 *  - Body: a translucent lilac tint, slightly deeper at the top and clearing towards the bottom,
 *    with a soft diagonal sheen. It sits over the lilac field behind the carousel.
 *  - Depth: an inner shadow under the top edge (the glass's thickness) and light rising from
 *    inside the bottom edge.
 *  - Rim: a 1.5px bevel, soft at the top, faintly violet down the sides, and bright white along the
 *    bottom where the light catches it.
 *  - A small neutral shadow beneath: no coloured glow.
 */
const BODY =
  "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.22) 44%, rgba(255,255,255,0) 58%), " +
  "linear-gradient(180deg, rgba(200,188,242,.78) 0%, rgba(216,207,247,.72) 55%, rgba(233,228,252,.82) 100%)";

const DEPTH = "inset 0 12px 20px -14px rgba(52,34,132,.38), inset 0 -16px 24px -16px rgba(255,255,255,.9)";
const SHADOW = "0 1px 2px rgba(24,16,64,.08), 0 18px 32px -20px rgba(30,20,80,.42)";
const SHADOW_ACTIVE = "0 2px 4px rgba(24,16,64,.1), 0 22px 38px -20px rgba(30,20,80,.5)";

// Drawn as a 1.5px gradient border with a mask, so the rim can carry light like a bevel.
const RIM: React.CSSProperties = {
  padding: "1.5px",
  background:
    "linear-gradient(180deg, rgba(255,255,255,.75) 0%, rgba(150,130,228,.45) 35%, rgba(150,130,228,.4) 65%, rgba(255,255,255,1) 100%)",
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
      style={{ background: BODY, boxShadow: `${DEPTH}, ${active ? SHADOW_ACTIVE : SHADOW}` }}
      className="group relative flex h-[372px] w-full cursor-pointer flex-col overflow-hidden rounded-[28px] p-2 text-left backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7057D9] motion-reduce:transition-none sm:h-[392px]"
    >
      {/* Rim */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[28px]" style={RIM} />
      {/* Photo, framed inside the card */}
      <span className="relative z-10 block aspect-[16/11] w-full shrink-0 overflow-hidden rounded-[21px] bg-[#D8CFF7] shadow-[0_6px_16px_-8px_rgba(30,18,90,.35)]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span aria-hidden="true" className="absolute inset-0 rounded-[21px] ring-1 ring-inset ring-white/25" />
      </span>

      {/* Words: the title always has room for two lines and the summary for two, so cards match */}
      <span className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pt-[26px]">
        {/* Icon tile in matching glass, half over the photo's lower edge, linking picture and words */}
        <span
          aria-hidden="true"
          className="absolute -top-[18px] left-3 z-20 flex h-9 w-9 items-center justify-center rounded-[11px] text-[#5B43C4] backdrop-blur-md"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(236,231,253,.86))",
            boxShadow: "inset 0 1px 0 #fff, inset 0 -1px 0 rgba(150,130,228,.25), 0 0 0 1px rgba(150,130,228,.25), 0 6px 14px -6px rgba(40,24,110,.35)",
          }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="relative line-clamp-2 min-h-[2.5em] bg-gradient-to-r from-[#14111F] via-[#2A2150] to-[#5B43C4] bg-clip-text pb-px text-[19px] font-normal leading-[1.25] tracking-[-0.025em] text-transparent">
          {title}
        </span>
        <span className="relative mt-1.5 line-clamp-2 min-h-[3em] text-[13px] leading-[1.55] tracking-[-0.003em] text-[#5A566E]">{summary}</span>

        <span className="mt-auto flex items-center justify-between border-t border-[#7057D9]/12 pb-2 pt-2.5">
          {/* An underline draws in under "Read more" on hover */}
          <span className="relative text-[13px] font-medium text-[#14111F] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#6248CA] after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:after:transition-none">
            Read more
          </span>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6248CA] text-white shadow-[0_2px_6px_rgba(60,40,150,.3)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </span>
    </button>
  );
}
