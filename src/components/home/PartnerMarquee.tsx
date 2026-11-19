"use client";

import Image from "next/image";

interface ClientLogo {
  id: string;
  name: string;
  image?: string;
  width?: number;
  height?: number;
  customText?: React.ReactNode;
}

// The client logos, from public/new_client_logos. Every file is 720×240 (3:1) with its own padding,
// so they all render at the same height and line up evenly. (logo-4.webp is the WTMF logo.)
const CLIENTS: ClientLogo[] = [
  { id: "bimakart", name: "Bimakart", image: "/new_client_logos/bimakart.webp", width: 720, height: 240 },
  { id: "hirani-homeopathy", name: "Hirani Homeopathy", image: "/new_client_logos/hirani-homeopathy.webp", width: 720, height: 240 },
  { id: "jetaa", name: "Jetaa", image: "/new_client_logos/jetaa.webp", width: 720, height: 240 },
  { id: "enspire", name: "Enspire", image: "/new_client_logos/enspire.webp", width: 720, height: 240 },
  { id: "wtmf", name: "WTMF", image: "/new_client_logos/logo-4.webp", width: 720, height: 240 },
  { id: "wealth-wisdom", name: "Wealth Wisdom", image: "/new_client_logos/wealth-wisdom.webp", width: 720, height: 240 },
  { id: "cohesyun", name: "Cohesyun", image: "/new_client_logos/cohesyun.webp", width: 720, height: 240 },
  { id: "futureogy", name: "Futureogy", image: "/new_client_logos/futureogy.webp", width: 720, height: 240 },
];

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
            <div className="flex shrink-0 items-center gap-6 sm:gap-10 lg:gap-12 animate-marquee">
              {MARQUEE_ITEMS.map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="flex items-center shrink-0 opacity-30 hover:opacity-90 transition-opacity duration-200 cursor-default"
                >
                  {client.image ? (
                    <div className="flex items-center justify-center">
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={client.width || 100}
                        height={client.height || 28}
                        // The files carry their own white padding: shown taller than the old tight-cropped logos,
                        // multiplied so the white drops out against the page
                        className="h-10 w-auto object-contain grayscale mix-blend-multiply sm:h-12"
                      />
                    </div>
                  ) : (
                    client.customText
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
