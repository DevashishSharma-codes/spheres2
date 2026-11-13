import Image from "next/image";

// Each hand bleeds off the top or bottom edge of the section, so the images sit flush against it.
// The footer's thread runs from hand to hand: `anchor` is where it touches each one, as a
// fraction of the hand image's width and height.
const HANDS = [
  { name: "top-left", width: 218, height: 222, className: "top-0 left-[4%] h-[29%] md:left-[13%] md:h-[34%]", anchor: { fx: 0.62, fy: 0.9 } },
  { name: "top-center", width: 98, height: 160, className: "top-0 left-1/2 h-[21%] -translate-x-1/2 md:h-[25%]", anchor: { fx: 0.5, fy: 0.75 } },
  { name: "top-right", width: 178, height: 194, className: "top-0 right-[5%] h-[26%] md:right-[14%] md:h-[30%]", anchor: { fx: 0.22, fy: 0.9 } },
  { name: "bottom-left", width: 256, height: 217, className: "bottom-0 left-0 h-[27%] md:left-[6%] md:h-[34%]", anchor: { fx: 0.86, fy: 0.485 } },
  { name: "bottom-right", width: 306, height: 154, className: "bottom-0 right-0 h-[20%] md:right-[5%] md:h-[25%]", anchor: { fx: 0.7, fy: 0.32 } },
] as const;

export function JourneySection() {
  return (
    <section className="relative -mb-px flex h-[50svh] min-h-[380px] w-full items-center justify-center overflow-hidden border-t border-[#DADADD]/70 bg-white px-4">
      {HANDS.map((hand) => {
        return (
          <Image
            key={hand.name}
            src={`/journey/hand-${hand.name}.png`}
            alt=""
            width={hand.width}
            height={hand.height}
            unoptimized
            data-cone-anchor={hand.name}
            data-fx={hand.anchor.fx}
            data-fy={hand.anchor.fy}
            className={`pointer-events-none absolute w-auto select-none grayscale contrast-125 ${hand.className}`}
          />
        );
      })}

      {/* On larger screens the thread's shape reaches down past this section to the footer's button,
          so the heading sits a little lower to stay in the middle of that shape */}
      <h2 className="relative md:translate-y-9 text-center text-4xl font-light leading-[1.08] tracking-[-0.04em] text-[#111114] sm:text-5xl lg:text-[64px]">
        Let&rsquo;s take <br className="md:hidden" />
        this <br className="hidden md:inline" />
        <span className="text-[#7057D9]">journey</span> <br className="md:hidden" />
        together.
      </h2>
    </section>
  );
}
