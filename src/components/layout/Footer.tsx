"use client";

import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-[#DADADD] bg-white text-[#2A2A2E] py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DADADD]">
          {/* Brand info with Official Logo */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <Logo size={32} />
              </div>
              <p className="text-xs sm:text-sm text-[#2A2A2E]/70 max-w-sm leading-relaxed mb-4">
                A niche engineering studio architecting autonomous AI agent systems, high-frequency web platforms, and production digital architectures.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2A2A2E]/60 pt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEMS STATUS: OPERATIONAL (SUB-20MS SLA)</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[11px] font-semibold text-[#2A2A2E] tracking-wider uppercase mb-4">
              Directory
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#2A2A2E]/70 hover:text-[#7057D9] transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Studio Office & Comms */}
          <div className="md:col-span-3 text-xs text-[#2A2A2E]/70 space-y-3">
            <h4 className="font-mono text-[11px] font-semibold text-[#2A2A2E] tracking-wider uppercase mb-4">
              Direct Contact
            </h4>
            <p>
              Email:{" "}
              <a href="mailto:hello@21spheres.studio" className="text-[#7057D9] hover:underline">
                hello@21spheres.studio
              </a>
            </p>
            <p>
              Security RFC:{" "}
              <a href="mailto:security@21spheres.studio" className="hover:underline">
                security@21spheres.studio
              </a>
            </p>
            <p className="pt-2 text-[11px] text-[#2A2A2E]/50">
              New Delhi // Global Remote Edge Fleet
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#2A2A2E]/60 gap-4">
          <p>© {currentYear} 21Spheres Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#7057D9] transition-colors">
              Privacy Notice
            </Link>
            <Link href="/about" className="hover:text-[#7057D9] transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-[#7057D9] transition-colors">
              PGP Key
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
