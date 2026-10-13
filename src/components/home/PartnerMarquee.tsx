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

const CLIENTS: ClientLogo[] = [
  // 1. Bimakart
  {
    id: "bimakart",
    name: "Bimakart",
    image: "/clients/bimakart.png",
    width: 120,
    height: 32,
  },
  // 2. Healthcare / CarePoint
  {
    id: "healthcare",
    name: "Clinical Health",
    image: "/clients/healthcare.png",
    width: 32,
    height: 32,
  },
  // 3. Jetaa
  {
    id: "jetaa",
    name: "Jetaa",
    image: "/clients/jetaa.png",
    width: 95,
    height: 32,
  },
  // 4. ENSPIRE
  {
    id: "enspire",
    name: "ENSPIRE",
    image: "/clients/enspire.png",
    width: 110,
    height: 30,
  },
  // 5. WTMF
  {
    id: "wtmf",
    name: "WTMF",
    image: "/clients/wtmf.png",
    width: 32,
    height: 32,
  },
  // 6. Wealth Wisdom (Cool modern typographic logo)
  {
    id: "wealth-wisdom",
    name: "Wealth Wisdom",
    customText: (
      <div className="flex items-center gap-1.5 whitespace-nowrap tracking-[-0.04em] text-[17px] sm:text-[19px] leading-none select-none">
        <span className="font-semibold text-[#2A2A2E]">WEALTH</span>
        <span className="font-light text-[#2A2A2E]/70">WISDOM</span>
      </div>
    ),
  },
];

// Duplicate items for a continuous, seamless infinite loop
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export function PartnerMarquee() {
  return (
    <section className="relative z-0 overflow-hidden border-b border-[#DADADD]/70 bg-white py-6 sm:py-7">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 min-[936px]:flex-row min-[936px]:items-center lg:gap-14">
          
          {/* Label: Normal opacity "Trusted by" */}
          <p className="text-[#2A2A2E] shrink-0 text-[18px] sm:text-[21px] md:text-[23px] font-normal tracking-[-0.02em] whitespace-nowrap">
            Trusted by
          </p>

          {/* Infinite Running Loop with lower opacity logos (matches reference screenshot) */}
          <div className="flex w-full overflow-hidden mask-gradient-sides">
            <div className="flex shrink-0 items-center gap-12 sm:gap-16 lg:gap-20 animate-marquee">
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
                        className="max-h-[22px] sm:max-h-[26px] w-auto object-contain grayscale"
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
