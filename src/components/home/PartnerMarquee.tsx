"use client";

import Image from "next/image";

interface ClientLogo {
  id: string;
  name: string;
  image: string;
  /** Where the logo itself sits in its 720×240 file (measured from the image), in source pixels. */
  box: { x: number; y: number; w: number; h: number };
}

const FILE = { w: 720, h: 240 };

/* The client logos, from public/new_client_logos (logo-4.webp is the WTMF logo). The files share a
   size but the logos inside them don't: WTMF is a small stacked mark, Hirani a tall one, Wealth
   Wisdom a long, short one. So each logo is cropped to its own edges and scaled to the same visual
   weight (about the same area on screen), with tall marks capped, and they read as one even row. */
const CLIENTS: ClientLogo[] = [
  { id: "bimakart", name: "Bimakart", image: "/new_client_logos/bimakart.webp", box: { x: 33, y: 39, w: 653, h: 163 } },
  { id: "hirani-homeopathy", name: "Hirani Homeopathy", image: "/new_client_logos/hirani-homeopathy.webp", box: { x: 23, y: 17, w: 674, h: 203 } },
  { id: "jetaa", name: "Jetaa", image: "/new_client_logos/jetaa.webp", box: { x: 119, y: 32, w: 482, h: 176 } },
  { id: "enspire", name: "Enspire", image: "/new_client_logos/enspire.webp", box: { x: 32, y: 44, w: 653, h: 143 } },
  { id: "wtmf", name: "WTMF", image: "/new_client_logos/logo-4.webp", box: { x: 227, y: 32, w: 266, h: 176 } },
  { id: "wealth-wisdom", name: "Wealth Wisdom", image: "/new_client_logos/wealth-wisdom.webp", box: { x: 23, y: 53, w: 692, h: 134 } },
  { id: "cohesyun", name: "Cohesyun", image: "/new_client_logos/cohesyun.webp", box: { x: 23, y: 44, w: 674, h: 152 } },
  { id: "futureogy", name: "Futureogy", image: "/new_client_logos/futureogy.webp", box: { x: 32, y: 38, w: 656, h: 164 } },
];

// Every logo covers about this many square pixels on screen (phones; larger screens scale it up),
// and none stands taller than MAX_H.
const TARGET_AREA = 3000;
const MAX_H = 36;
const scaleFor = ({ w, h }: ClientLogo["box"]) => Math.min(Math.sqrt(TARGET_AREA / (w * h)), MAX_H / h);

/** A logo cropped to its own edges at an even visual weight. --k grows it on larger screens. */
function ClientMark({ client }: { client: ClientLogo }) {
  const s = scaleFor(client.box);
  const px = (n: number) => `calc(${(n * s).toFixed(2)}px * var(--k))`;
  return (
    <span className="relative block overflow-hidden" style={{ width: px(client.box.w), height: px(client.box.h) }}>
      <Image
        src={client.image}
        alt={client.name}
        width={FILE.w}
        height={FILE.h}
        sizes="200px"
        // Multiplied, so the file's white background drops out against the page
        className="absolute max-w-none grayscale mix-blend-multiply"
        style={{ width: px(FILE.w), height: px(FILE.h), left: px(-client.box.x), top: px(-client.box.y) }}
      />
    </span>
  );
}

// Duplicate items for a continuous, seamless infinite loop
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export function PartnerMarquee() {
  return (
    <section id="partner-marquee" className="relative z-0 overflow-hidden border-b border-[#DADADD]/70 bg-white py-6 sm:py-7">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 min-[936px]:flex-row min-[936px]:items-center lg:gap-14">
          
          {/* Label: Normal opacity "Trusted by" */}
          <p className="text-[#2A2A2E] shrink-0 text-[18px] sm:text-[21px] md:text-[23px] font-normal tracking-[-0.02em] whitespace-nowrap">
            Trusted by
          </p>

          {/* Infinite Running Loop with lower opacity logos (matches reference screenshot) */}
          <div className="flex w-full overflow-hidden mask-gradient-sides">
            <div className="flex shrink-0 items-center gap-10 [--k:1] sm:gap-14 sm:[--k:1.2] lg:gap-16 animate-marquee">
              {MARQUEE_ITEMS.map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="flex items-center shrink-0 opacity-30 hover:opacity-90 transition-opacity duration-200 cursor-default"
                >
                  <ClientMark client={client} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
