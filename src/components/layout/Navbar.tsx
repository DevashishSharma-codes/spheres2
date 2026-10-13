"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, ArrowUpRight, Cpu, Sparkles, TrendingUp, Zap } from "lucide-react";

const ABOUT_SECTIONS = [
  {
    subtitle: "01 // MODERNIZATION",
    title: "Strategic Technology",
    description: "Guiding businesses with clear, actionable roadmaps for AI and digital modernization.",
    icon: Cpu,
    href: "/about",
  },
  {
    subtitle: "02 // INTELLIGENCE",
    title: "Data-Driven Insights",
    description: "Transforming information into accurate, meaningful intelligence for confident decision-making.",
    icon: Sparkles,
    href: "/about",
  },
  {
    subtitle: "03 // SCALABLE GROWTH",
    title: "Business Enablement",
    description: "Supporting organizations with the tools, structure, and expertise needed for scalable growth.",
    icon: TrendingUp,
    href: "/about",
  },
  {
    subtitle: "04 // WORKFLOWS",
    title: "Intelligent Automation",
    description: "Designing automated workflows that reduce complexity and drive operational excellence.",
    icon: Zap,
    href: "/about",
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
    hoverTimeoutRef.current = setTimeout(() => {
      setAboutHovered(false);
    }, 180);
  };

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
    { label: "How We Work", href: "/how-we-work" },
    { label: "Services", href: "/services" },
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
        <Link href="/" className="shrink-0 flex items-center">
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
                    className={`text-[14px] tracking-[-0.01em] transition-all relative ${
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

                  {/* About Us Hover Mega-Menu Dropdown */}
                  <AnimatePresence>
                    {aboutHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.99 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute top-full -left-2 pt-2.5 z-50 w-[540px] sm:w-[580px]"
                        onMouseEnter={handleAboutMouseEnter}
                        onMouseLeave={handleAboutMouseLeave}
                      >
                        <div className="bg-white border border-[#DADADD] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-4 sm:p-5 rounded-none text-left">
                          
                          {/* Top Header of Dropdown */}
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/8">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7057D9] font-medium block">
                                ABOUT 21SPHERES
                              </span>
                              <span className="text-sm font-light text-black">
                                Core Strategic Pillars &amp; Foundations
                              </span>
                            </div>
                            <Link
                              href="/about"
                              onClick={() => setAboutHovered(false)}
                              className="text-[11px] font-mono text-black/50 hover:text-[#7057D9] transition-colors flex items-center gap-1"
                            >
                              <span>Explore About</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>

                          {/* 4 Sections Grid (from About Us Cards) */}
                          <div className="grid grid-cols-2 gap-2.5">
                            {ABOUT_SECTIONS.map((sec) => {
                              const IconComponent = sec.icon;
                              return (
                                <Link
                                  key={sec.title}
                                  href={sec.href}
                                  onClick={() => setAboutHovered(false)}
                                  className="p-3 bg-[#FAF9F7] hover:bg-white border border-black/6 hover:border-[#7057D9]/40 transition-all group/item rounded-none text-left flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-[9.5px] font-mono text-black/50 group-hover/item:text-[#7057D9] transition-colors">
                                        {sec.subtitle}
                                      </span>
                                      <IconComponent className="w-3.5 h-3.5 text-black/40 group-hover/item:text-[#7057D9] transition-colors" />
                                    </div>
                                    <div className="text-[13px] font-medium text-black group-hover/item:text-[#7057D9] transition-colors">
                                      {sec.title}
                                    </div>
                                    <p className="text-[11px] text-black/65 font-light leading-snug mt-1">
                                      {sec.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Bottom Strip: Company Statistics Track Record */}
                          <div className="mt-3.5 pt-2.5 border-t border-black/8 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-black/50">
                              PRODUCTION TRACK RECORD &bull; 20+ AUTOMATION &bull; 15+ AI
                            </span>
                            <Link
                              href="/about#statistics"
                              onClick={() => setAboutHovered(false)}
                              className="inline-flex items-center gap-1 text-[11px] text-[#7057D9] font-medium hover:underline"
                            >
                              <span>Company Statistics</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DADADD] bg-white px-4 py-5 space-y-3 animate-in fade-in duration-150">
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
          <div className="pt-3 border-t border-[#DADADD] flex flex-col gap-2">
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
