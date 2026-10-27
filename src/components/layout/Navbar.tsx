"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";

const ABOUT_LINKS = [
  {
    title: "Seamless Integration",
    tag: "Effortless Connectivity",
    href: "/about#seamless-integration",
  },
  {
    title: "Exceptional Security",
    tag: "Deterministic Guardrails",
    href: "/about#exceptional-security",
  },
  {
    title: "High Performance",
    tag: "Sub-Second Latency",
    href: "/about#high-performance",
  },
  {
    title: "Intelligent Automation",
    tag: "Self-Healing Workflows",
    href: "/about#intelligent-automation",
  },
  {
    title: "Multi-Agent Swarms",
    tag: "Autonomous Swarms",
    href: "/about#multi-agent-swarms",
  },
  {
    title: "Production Track Record & Metrics",
    tag: "20+ Automations // 15+ AI Models",
    href: "/about#statistics",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [aboutHovered, setAboutHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleAboutMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAboutHovered(true);
  };

  const handleAboutMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setAboutHovered(false);
    }, 220);
  };

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAboutHovered(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      // On homepage, track when viewing specific sections
      if (pathname === "/") {
        // If near top of page (hero / marquee), clear active section
        if (window.scrollY < 200) {
          setActiveSection("");
          return;
        }

        const focalPoint = 180;
        const trackedSections = [
          { id: "about", key: "about" },
          { id: "how-we-work", key: "how-we-work" },
          { id: "services", key: "services" },
        ];

        let current = "";
        for (const sec of trackedSections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalPoint && rect.bottom > focalPoint) {
              current = sec.key;
              break;
            }
          }
        }

        // Fallback for near bottom of the page
        if (!current && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
          current = "services";
        }

        setActiveSection(current);
      } else {
        setActiveSection("");
      }
    };

    handleScroll();
    const timer = setTimeout(handleScroll, 120);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]);

  // Primary links to matching routes
  const primaryNav = [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Industries", href: "/industries" },
    { label: "Insights", href: "/insights" },
  ];

  const isItemActive = (href: string) => {
    const cleanPath = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    const cleanHref = href.endsWith("/") && href.length > 1 ? href.slice(0, -1) : href;

    if (cleanPath === cleanHref) return true;
    if (cleanHref !== "/" && cleanPath.startsWith(cleanHref)) return true;
    if (cleanPath === "/" && activeSection === "about" && cleanHref === "/about") return true;
    if (cleanPath === "/" && activeSection === "how-we-work" && cleanHref === "/how-we-work") return true;
    if (cleanPath === "/" && activeSection === "services" && cleanHref === "/services") return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#DADADD] shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
          : "bg-white border-b border-[#DADADD]/60"
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="shrink-0 flex items-center" onClick={() => setAboutHovered(false)}>
          <Logo size={28} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 mr-auto">
          {primaryNav.map((item) => {
            const active = isItemActive(item.href);
            const isAbout = item.label === "About Us";

            if (isAbout) {
              return (
                <div
                  key={item.label}
                  className="relative py-1 flex items-center"
                  onMouseEnter={handleAboutMouseEnter}
                  onMouseLeave={handleAboutMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`text-[14px] tracking-[-0.01em] transition-all relative inline-flex items-center gap-1 ${
                      active || aboutHovered
                        ? "text-[#7057D9] font-medium"
                        : "text-[#2A2A2E] opacity-70 hover:opacity-100 hover:text-black"
                    }`}
                  >
                    <span className="relative pb-1 inline-block">
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="activeNavbarIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7057D9] rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 pb-0.5 transition-transform duration-200 ${
                        aboutHovered ? "rotate-180 text-[#7057D9]" : "opacity-60"
                      }`}
                    />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[14px] tracking-[-0.01em] transition-all relative py-1 ${
                  active
                    ? "text-[#7057D9] font-medium"
                    : "text-[#2A2A2E] opacity-70 hover:opacity-100 hover:text-black"
                }`}
              >
                <span className="relative pb-1 inline-block">
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="activeNavbarIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7057D9] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Secondary link + CTA button */}
        <div className="hidden sm:flex items-center gap-5">
          <Link
            href="/testimonials"
            className={`text-[14px] tracking-[-0.01em] transition-all relative py-1 ${
              isItemActive("/testimonials")
                ? "text-[#7057D9] font-medium"
                : "text-[#2A2A2E] opacity-70 hover:opacity-100 hover:text-black"
            }`}
          >
            <span className="relative pb-1 inline-block">
              Testimonials
              {isItemActive("/testimonials") && (
                <motion.span
                  layoutId="activeNavbarIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7057D9] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </span>
          </Link>
          
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center px-3.5 py-1.5 sm:py-2 text-[13px] font-normal tracking-[-0.01em] transition-all rounded-none border ${
              pathname === "/contact"
                ? "text-white bg-[#7057D9] border-[#7057D9]"
                : "text-[#2A2A2E] bg-white hover:bg-[#FAF9F7] border-[#DADADD]"
            }`}
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded text-[#2A2A2E] hover:bg-[#EDEDF0] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* =========================================================
          FULL-WIDTH TCS-STYLE "ABOUT US" MEGA MENU DROPDOWN
          Left side: Narrative information, headline & CTA link
          Right side: 4 Main Things of About Us with dividing lines & chevrons
          ========================================================= */}
      <AnimatePresence>
        {aboutHovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hidden lg:block absolute top-full left-0 w-full bg-[#111114] border-b border-[#25252B] shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-white z-50 overflow-hidden"
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            {/* Ambient subtle violet bloom in top right */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#7057D9]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 relative z-10">
              <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Left Side: Information & Headline */}
                <div className="col-span-5 flex flex-col justify-between pr-4 lg:pr-8">
                  <div>
                    <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-normal tracking-[-0.03em] leading-[1.2] mb-4 bg-gradient-to-r from-white via-[#D8C7FF] to-[#8E79E8] bg-clip-text text-transparent">
                      Infrastructure to Intelligence
                    </h3>
                    <p className="text-sm sm:text-[15px] font-light text-white/70 leading-relaxed max-w-[420px] mb-8">
                      Navigate the AI era with confidence. 21Spheres turns modern software architecture and autonomous intelligence into a strategic partner that empowers talent, reimagines processes, and accelerates business transformation.
                    </p>
                  </div>

                  <div>
                    <Link
                      href="/about"
                      onClick={() => setAboutHovered(false)}
                      className="group/cta inline-flex items-center gap-2 text-sm sm:text-[15px] font-medium text-white hover:text-[#9D87F5] transition-all"
                    >
                      <span>Unlock enterprise intelligence</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/cta:text-[#9D87F5] group-hover/cta:translate-x-1.5 transition-all duration-200" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: The 4 Main Things of About Us like links */}
                <div className="col-span-7 flex flex-col">
                  {ABOUT_LINKS.map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setAboutHovered(false)}
                      className={`group/item flex items-center justify-between py-4 sm:py-4.5 border-b border-[#25252B] hover:border-white/20 transition-all duration-200 px-3 hover:bg-white/[0.03] ${
                        index === 0 ? "border-t border-[#25252B]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[16px] sm:text-[17px] lg:text-[18px] font-light tracking-[-0.01em] text-white/90 group-hover/item:text-white transition-colors">
                          {item.title}
                        </span>
                        {item.tag && (
                          <span className="text-[10px] sm:text-[11px] font-mono text-white/40 group-hover/item:text-[#9D87F5] transition-colors uppercase tracking-wider">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover/item:text-white group-hover/item:translate-x-1.5 transition-all duration-200 shrink-0 ml-4" />
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DADADD] bg-white px-4 py-5 space-y-4 animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
          {/* Mobile Main Links */}
          <div className="grid grid-cols-2 gap-2">
            {NAVIGATION_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs font-normal transition-colors relative border-b-2 ${
                    active
                      ? "bg-[#7057D9]/10 text-[#7057D9] font-medium border-[#7057D9]"
                      : "text-[#2A2A2E] hover:bg-[#EDEDF0] border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile About Us 5 Pillars Sub-Links */}
          <div className="pt-3 border-t border-[#DADADD]/70 bg-[#FAF9F7] p-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7057D9] font-medium block mb-2">
              ABOUT US &bull; 5 CORE PILLARS
            </span>
            <div className="flex flex-col divide-y divide-black/5">
              {ABOUT_LINKS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 flex items-center justify-between text-xs text-black/80 hover:text-[#7057D9]"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-black/40" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#DADADD] flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-medium text-white bg-[#7057D9] hover:bg-[#573EBF] transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
