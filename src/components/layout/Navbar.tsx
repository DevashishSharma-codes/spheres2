"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PillLink } from "@/components/ui/PillLink";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";

interface DropdownLinkItem {
  title: string;
  tag?: string;
  href: string;
}

interface DropdownSectionData {
  headline: string;
  narrative: string;
  ctaText: string;
  ctaHref: string;
  links: DropdownLinkItem[];
}

const NAVBAR_DROPDOWNS: Record<string, DropdownSectionData> = {
  about: {
    headline: "Infrastructure to Intelligence",
    narrative: "Navigate the AI era with confidence. 21Spheres turns modern software architecture and autonomous intelligence into a strategic partner that empowers talent, reimagines processes, and accelerates business transformation.",
    ctaText: "Unlock enterprise intelligence",
    ctaHref: "/#about",
    links: [
      { title: "Seamless Integration", tag: "Effortless Connectivity", href: "/#seamless-integration" },
      { title: "Exceptional Security", tag: "Deterministic Guardrails", href: "/#exceptional-security" },
      { title: "High Performance", tag: "Sub-Second Latency", href: "/#high-performance" },
      { title: "Intelligent Automation", tag: "Self-Healing Workflows", href: "/#intelligent-automation" },
      { title: "Multi-Agent Swarms", tag: "Autonomous Swarms", href: "/#multi-agent-swarms" },
      { title: "Production Track Record & Metrics", tag: "20+ Automations • 15+ AI Models", href: "/#statistics" },
    ],
  },
  "how-we-work": {
    headline: "Deterministic Sprint Cadence",
    narrative: "From discovery and architectural design to full-scale edge deployment and 24/7 SLAs, our 6-stage engineering sprint methodology eliminates surprises and accelerates time-to-market with disciplined execution.",
    ctaText: "Explore our sprint methodology",
    ctaHref: "/#how-we-work",
    links: [
      { title: "Discovery & SRS Design", tag: "Week 1", href: "/#discovery-srs" },
      { title: "Architecture & Tech Stack", tag: "Week 1–2", href: "/#architecture-stack" },
      { title: "UI/UX Design & Prototyping", tag: "Week 2–3", href: "/#ui-ux-prototyping" },
      { title: "Agile Development & Integration", tag: "Week 3–5", href: "/#agile-development" },
      { title: "QA, Security & Testing", tag: "Week 5–6", href: "/#qa-security-testing" },
      { title: "Deployment, Launch & Support", tag: "Week 6+", href: "/#deployment-launch-support" },
    ],
  },
  services: {
    headline: "Squads Engineered for Scale",
    narrative: "We deploy dedicated engineering squads with deep domain mastery in mobile architectures, autonomous AI pipelines, low-latency web platforms, and mission-critical enterprise systems.",
    ctaText: "Explore all technical capabilities",
    ctaHref: "/services",
    links: [
      { title: "Mobile Application Development", tag: "120Hz Native iOS & Android", href: "/services/mobile-application-development" },
      { title: "Web Application Development", tag: "Next.js & Sub-20ms Edge", href: "/services/web-application-development" },
      { title: "Custom AI & Multi-Agent Loops", tag: "LoRA & TensorRT Pipelines", href: "/services/custom-ai-development" },
      { title: "LLM Integration & Hybrid RAG", tag: "Zero-Hallucination Guardrails", href: "/services/llm-integration" },
      { title: "SaaS & Multi-Tenant Systems", tag: "Enterprise SSO & Billing Engine", href: "/services/saas-development" },
      { title: "Enterprise Software & Cloud Mesh", tag: "Kubernetes & 99.999% SLA", href: "/services/enterprise-software-development" },
    ],
  },
  "case-studies": {
    headline: "High-Conviction Systems",
    narrative: "A curated selection of mission-critical platforms engineered by 21Spheres, operating in production at scale with verified performance benchmarks and zero downtime.",
    ctaText: "View full production case studies",
    ctaHref: "/case-studies",
    links: [
      { title: "Bimakart Connect", tag: "InsurTech • Sub-2.4s Gateway", href: "/case-studies#bimakart-connect" },
      { title: "Wealth Wisdom Terminal", tag: "FinTech • $1.4B+ AUM", href: "/case-studies#wealth-wisdom" },
      { title: "Kaster Underwriting Lab", tag: "Vision AI • 420ms Verify", href: "/case-studies#kaster-underwriting-lab" },
      { title: "UrbanFlow Dispatch", tag: "Mobile • 450k+ Monthly Bookings", href: "/case-studies#urbanflow-dispatch" },
      { title: "Hahnnemen Clinical AI", tag: "AI Agents • Sub-180ms Lookup", href: "/case-studies#hahnnemen-clinical-ai" },
    ],
  },
  industries: {
    headline: "Mission-Critical Verticals",
    narrative: "Deep vertical expertise across regulated, latency-sensitive, and high-concurrency industries where reliability, data integrity, and compliance cannot be compromised.",
    ctaText: "Explore our industry solutions",
    ctaHref: "/#industries",
    links: [
      { title: "Healthcare", tag: "HIPAA • Clinical AI", href: "/industries/healthcare" },
      { title: "SaaS", tag: "Multi-Tenant • 99.999% SLA", href: "/industries/saas" },
      { title: "Fintech", tag: "$1.4B+ AUM • Sub-12ms", href: "/industries/fintech" },
      { title: "eCommerce", tag: "Headless • 250k Concurrency", href: "/industries/ecommerce" },
      { title: "GCC", tag: "Global Capability Centers", href: "/industries/gcc" },
      { title: "Travel", tag: "GDS • Sub-400ms Search", href: "/industries/travel" },
      { title: "Hospitality", tag: "PMS • Keyless IoT", href: "/industries/hospitality" },
    ],
  },
  insights: {
    headline: "Engineering RFCs & Memos",
    narrative: "Field notes from our engineering squads detailing distributed system designs, latency optimizations, WebGL shaders, and autonomous agent orchestration.",
    ctaText: "Browse all architecture RFCs",
    ctaHref: "/insights",
    links: [
      { title: "Connecting complex systems", tag: "Oct 2026 • Engineering", href: "/insights/architecting-multi-carrier-gateways" },
      { title: "Building AI systems people can trust", tag: "Nov 2026 • AI Architecture", href: "/insights/zero-hallucination-multi-agent-graphs" },
      { title: "Keeping data rich experiences responsive", tag: "Oct 2026 • Product Experience", href: "/insights/120-fps-react-19-financial-dashboards" },
      { title: "Designing cloud services that recover", tag: "Jul 2026 • Cloud", href: "/insights/designing-resilient-cloud-services" },
    ],
  },
};

/** Pages that are dark from the top down, where the navbar becomes dark glass. */
const DARK_PAGES = ["/services/", "/case-studies"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isDarkPage = DARK_PAGES.some((page) => pathname.startsWith(page));
  const isDarkHero = (isHomePage && !scrolled) || isDarkPage;

  const handleMouseEnter = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredKey(key);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredKey(null);
    }, 220);
  };

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredKey(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setHoveredKey(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // On homepage, track when viewing specific sections
      if (pathname === "/") {
        if (window.scrollY < 200) {
          setActiveSection("");
          return;
        }

        const focalPoint = 180;
        const trackedSections = [
          { id: "about", key: "about" },
          { id: "how-we-work", key: "how-we-work" },
          { id: "case-studies", key: "case-studies" },
          { id: "services", key: "services" },
          { id: "insights", key: "insights" },
          { id: "industries", key: "industries" },
          { id: "testimonials", key: "testimonials" },
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

        if (!current && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
          current = "testimonials";
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

  // Primary links on the left side
  const primaryNav = [
    { label: "About Us", href: "/#about", key: "about" },
    { label: "How We Work", href: "/#how-we-work", key: "how-we-work" },
    { label: "Case Studies", href: "/case-studies", key: "case-studies" },
    { label: "Services", href: "/services", key: "services" },
    { label: "Insights", href: "/insights", key: "insights" },
    { label: "Industries", href: "/#industries", key: "industries" },
    { label: "Testimonials", href: "/#testimonials", key: "testimonials" },
  ];

  const isItemActive = (href: string) => {
    const cleanPath = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    const cleanHref = href.endsWith("/") && href.length > 1 ? href.slice(0, -1) : href;

    if (cleanPath === cleanHref) return true;
    if (cleanHref !== "/" && cleanPath.startsWith(cleanHref)) return true;
    if (cleanPath === "/" && activeSection === "about" && cleanHref === "/#about") return true;
    if (cleanPath === "/" && activeSection === "how-we-work" && cleanHref === "/#how-we-work") return true;
    if (cleanPath === "/" && activeSection === "services" && cleanHref === "/services") return true;
    if (cleanPath === "/" && activeSection === "case-studies" && cleanHref === "/case-studies") return true;
    if (cleanPath === "/" && activeSection === "insights" && cleanHref === "/insights") return true;
    if (cleanHref === "/#industries" && (activeSection === "industries" || cleanPath.startsWith("/industries"))) return true;
    if (cleanPath === "/" && activeSection === "testimonials" && cleanHref.startsWith("/#testimonials")) return true;
    return false;
  };

  return (
    <>
    <header
      className={`z-50 w-full transition-all duration-300 ease-out ${isDarkPage ? "-mb-[57px] sm:-mb-[65px]" : ""} ${
        isHomePage
          ? `fixed top-0 left-0 right-0 ${
              isDarkHero
                ? hoveredKey
                  ? "bg-[rgba(18,18,22,0.42)] backdrop-blur-2xl border-b border-white/[0.10] shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
                  : "bg-transparent border-b border-transparent"
                : "bg-white/80 backdrop-blur-xl border-b border-[#DADADD]/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            }`
          : `sticky top-0 ${
              isDarkPage
                ? "bg-[rgba(18,18,22,0.55)] backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.10]"
                : scrolled
                ? "bg-white/80 backdrop-blur-xl border-b border-[#DADADD]/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                : "bg-white border-b border-[#DADADD]/60"
            }`
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 lg:gap-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="shrink-0 flex items-center" onClick={() => setHoveredKey(null)}>
          <Logo height={44} onDark={isDarkHero} />
        </Link>

        {/* Desktop Navigation Links (Left Side with Mega Dropdowns) */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 mr-auto">
          {primaryNav.map((item) => {
            const active = isItemActive(item.href);
            const isHovered = hoveredKey === item.key;

            return (
              <div
                key={item.label}
                className="relative py-1 flex items-center"
                onMouseEnter={() => (NAVBAR_DROPDOWNS[item.key] ? handleMouseEnter(item.key) : setHoveredKey(null))}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`text-[13px] xl:text-[14px] tracking-[-0.01em] transition-all duration-300 relative inline-flex items-center gap-1 ${
                    active || isHovered
                      ? isDarkHero
                        ? "text-[#D8B4FE] font-medium"
                        : "text-[#7057D9] font-medium"
                      : isDarkHero
                        ? "text-white/85 hover:text-white"
                        : "text-[#2A2A2E] opacity-70 hover:opacity-100 hover:text-black"
                  }`}
                >
                  <span className="relative pb-1 inline-block">
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="activeNavbarIndicator"
                        className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                          isDarkHero ? "bg-[#D8B4FE]" : "bg-[#7057D9]"
                        }`}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </span>
                  {NAVBAR_DROPDOWNS[item.key] && (<ChevronDown
                      className={`w-3.5 h-3.5 pb-0.5 transition-transform duration-200 ${
                        isHovered
                          ? isDarkHero ? "rotate-180 text-[#D8B4FE]" : "rotate-180 text-[#7057D9]"
                          : isDarkHero ? "text-white/60" : "opacity-60"
                      }`}
                    />)}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right Action: CTA Button Only */}
        <div className="hidden sm:flex items-center">
          <PillLink href="/contact" size="sm">Contact Us</PillLink>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-1.5 rounded transition-colors ${
            isDarkHero ? "text-white hover:bg-white/10" : "text-[#2A2A2E] hover:bg-[#EDEDF0]"
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* =========================================================
          FULL-WIDTH UNIFIED MEGA MENU DROPDOWN
          Left side: Narrative information, headline & CTA link
          Right side: Stacked links with dividing lines & chevrons
          ========================================================= */}
      <AnimatePresence mode="wait">
        {hoveredKey && NAVBAR_DROPDOWNS[hoveredKey] && (
          <motion.div
            key={hoveredKey}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`hidden lg:block absolute top-full left-0 w-full text-white z-50 overflow-hidden transition-colors duration-200 ${
              isDarkHero && !isDarkPage
                ? "bg-[rgba(18,18,22,0.48)] backdrop-blur-2xl backdrop-saturate-180 border-b border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.18)]"
                : "bg-[#0C0C10]/95 backdrop-blur-3xl backdrop-saturate-150 border-b border-white/[0.10] shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
            }`}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* Real macOS glass specular top reflection sheen */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />
            
            {/* Subtle atmospheric violet glow */}
            <div className="absolute top-0 right-1/4 w-[420px] h-[220px] bg-[#7057D9]/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-6.5 relative z-10">
              <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Left Side: Information & Headline */}
                <div className="col-span-5 flex flex-col justify-between pr-4 lg:pr-6">
                  <div>
                    <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-normal tracking-[-0.03em] leading-[1.2] mb-2 bg-gradient-to-r from-white via-[#EDE4FF] to-[#A78BFA] bg-clip-text text-transparent">
                      {NAVBAR_DROPDOWNS[hoveredKey].headline}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-light text-white/70 leading-relaxed max-w-[380px] mb-4">
                      {NAVBAR_DROPDOWNS[hoveredKey].narrative}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={NAVBAR_DROPDOWNS[hoveredKey].ctaHref}
                      onClick={() => setHoveredKey(null)}
                      className="group/cta inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/85 hover:text-white transition-colors"
                    >
                      <span className="underline-offset-4 group-hover/cta:underline">{NAVBAR_DROPDOWNS[hoveredKey].ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-200" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Links with dividing lines & chevrons */}
                <div className="col-span-7 flex flex-col">
                  {NAVBAR_DROPDOWNS[hoveredKey].links.map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setHoveredKey(null)}
                      className={`group/item flex items-center justify-between py-2 sm:py-2.5 border-b border-white/[0.06] hover:border-white/15 transition-all duration-150 px-3 rounded-lg hover:bg-white/[0.04] ${
                        index === 0 ? "border-t border-white/[0.06]" : ""
                      }`}
                    >
                      <span className="text-[14px] sm:text-[14.5px] font-light tracking-[-0.01em] text-white/85 group-hover/item:text-white transition-colors">
                        {item.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/35 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-150 shrink-0 ml-4" />
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

          <div className="pt-2 border-t border-[#DADADD] flex flex-col gap-2">
            <PillLink href="/contact" size="sm" onClick={() => setMobileMenuOpen(false)} className="w-full justify-between">
              Contact Us
            </PillLink>
          </div>
        </div>
      )}
    </header>
    {/* Dark backing, so the glass bar reads dark at the top of the page instead of showing the white body. */}
    {isDarkPage && <div aria-hidden="true" className="h-[57px] bg-[#08070e] sm:h-[65px]" />}
    </>
  );
}

export default Navbar;
