import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — 21Spheres",
  description: "Get in touch with 21Spheres to reserve an architecture sprint.",
};

export default function ContactPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#7057D9]/10 border border-[#7057D9]/20 text-[11px] font-mono font-semibold tracking-wider text-[#7057D9] mb-4 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9]" />
            <span>08 // CONTACT US</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#2A2A2E] mb-4">
            Contact 21Spheres
          </h1>
          <p className="text-base sm:text-lg text-[#2A2A2E]/70 leading-relaxed">
            Ready to build this page.
          </p>
        </div>
      </Container>
    </section>
  );
}
