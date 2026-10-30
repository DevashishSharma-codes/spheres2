"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
    ctaHref: "/about",
    links: [
      { title: "Seamless Integration", tag: "Effortless Connectivity", href: "/about#seamless-integration" },
      { title: "Exceptional Security", tag: "Deterministic Guardrails", href: "/about#exceptional-security" },
      { title: "High Performance", tag: "Sub-Second Latency", href: "/about#high-performance" },
      { title: "Intelligent Automation", tag: "Self-Healing Workflows", href: "/about#intelligent-automation" },
      { title: "Multi-Agent Swarms", tag: "Autonomous Swarms", href: "/about#multi-agent-swarms" },
      { title: "Production Track Record & Metrics", tag: "20+ Automations • 15+ AI Models", href: "/about#statistics" },
    ],
  },
  "how-we-work": {
    headline: "Deterministic Sprint Cadence",
    narrative: "From discovery and architectural design to full-scale edge deployment and 24/7 SLAs, our 6-stage engineering sprint methodology eliminates surprises and accelerates time-to-market with disciplined execution.",
    ctaText: "Explore our sprint methodology",
    ctaHref: "/how-we-work",
    links: [
      { title: "Discovery & SRS Design", tag: "Week 1", href: "/how-we-work#discovery-srs" },
      { title: "Architecture & Tech Stack", tag: "Week 1–2", href: "/how-we-work#architecture-stack" },
      { title: "UI/UX Design & Prototyping", tag: "Week 2–3", href: "/how-we-work#ui-ux-prototyping" },
      { title: "Agile Development & Integration", tag: "Week 3–5", href: "/how-we-work#agile-development" },
      { title: "QA, Security & Testing", tag: "Week 5–6", href: "/how-we-work#qa-security-testing" },
      { title: "Deployment, Launch & Support", tag: "Week 6+", href: "/how-we-work#deployment-launch-support" },
    ],
  },
  services: {
    headline: "Squads Engineered for Scale",
    narrative: "We deploy dedicated engineering squads with deep domain mastery in mobile architectures, autonomous AI pipelines, low-latency web platforms, and mission-critical enterprise systems.",
    ctaText: "Explore all technical capabilities",
    ctaHref: "/services",
    links: [
      { title: "Mobile Application Development", tag: "120Hz Native iOS & Android", href: "/services#mobile-application-development" },
      { title: "Web Application Development", tag: "Next.js & Sub-20ms Edge", href: "/services#web-application-development" },
      { title: "Custom AI & Multi-Agent Loops", tag: "LoRA & TensorRT Pipelines", href: "/services#custom-ai-development" },
      { title: "LLM Integration & Hybrid RAG", tag: "Zero-Hallucination Guardrails", href: "/services#llm-integration" },
      { title: "SaaS & Multi-Tenant Systems", tag: "Enterprise SSO & Billing Engine", href: "/services#saas-development" },
      { title: "Enterprise Software & Cloud Mesh", tag: "Kubernetes & 99.999% SLA", href: "/services#enterprise-software-development" },
    ],
  },
  portfolio: {
    headline: "High-Conviction Systems",
    narrative: "A curated selection of mission-critical platforms engineered by 21Spheres, operating in production at scale with verified performance benchmarks and zero downtime.",
    ctaText: "View full production case studies",
    ctaHref: "/portfolio",
    links: [
      { title: "Bimakart Connect", tag: "InsurTech • Sub-2.4s Gateway", href: "/portfolio#bimakart-connect" },
      { title: "Wealth Wisdom Terminal", tag: "FinTech • $1.4B+ AUM", href: "/portfolio#wealth-wisdom" },
      { title: "Kaster Underwriting Lab", tag: "Vision AI • 420ms Verify", href: "/portfolio#kaster-lab" },
      { title: "Apex Logistics Telemetry", tag: "Fleet DAG • 10k Events/s", href: "/portfolio#apex-telemetry" },
      { title: "Homeopathic Repertory AI", tag: "HealthTech • Wasm Core", href: "/portfolio#homeo-repertory" },
    ],
  },
  industries: {
    headline: "Mission-Critical Verticals",
    narrative: "Deep vertical expertise across regulated, latency-sensitive, and high-concurrency industries where reliability, data integrity, and compliance cannot be compromised.",
    ctaText: "Explore our industry solutions",
    ctaHref: "/industries",
    links: [
      { title: "InsurTech & Policy Distribution", tag: "100+ Insurers Connected", href: "/industries#insurtech" },
      { title: "WealthTech & Quantitative Finance", tag: "$1.4B+ AUM Monitored", href: "/industries#fintech" },
      { title: "Healthcare & Clinical AI", tag: "HIPAA • Clinical Reasoning", href: "/industries#healthtech" },
      { title: "AI Agents & Autonomous Systems", tag: "3,800+ Autonomous Tasks/hr", href: "/industries#ai-saas" },
      { title: "High-Throughput Logistics & Mesh", tag: "Sub-50ms Global Routing", href: "/industries#logistics" },
    ],
  },
  insights: {
    headline: "Engineering RFCs & Memos",
    narrative: "Field notes from our engineering squads detailing distributed system designs, latency optimizations, WebGL shaders, and autonomous agent orchestration.",
    ctaText: "Browse all architecture RFCs",
    ctaHref: "/insights",
    links: [
      { title: "Scaling Multi-Carrier Gateways", tag: "Oct 2026 • Distributed Systems", href: "/insights" },
      { title: "Zero-Hallucination Agent Graphs", tag: "Sep 2026 • AI Architecture", href: "/insights" },
      { title: "120 FPS React Financial Dashboards", tag: "Aug 2026 • Frontend Latency", href: "/insights" },
      { title: "Resilient Event Sourcing with Kafka", tag: "Jul 2026 • Event-Driven DAG", href: "/insights" },
    ],
  },
  testimonials: {
    headline: "Founder & CTO Endorsements",
    narrative: "Verified reviews and performance metrics from engineering leaders and founders whose production applications and infrastructure were shipped by 21Spheres.",
    ctaText: "Read all verified client reviews",
    ctaHref: "/testimonials",
    links: [
      { title: "Bimakart Technologies", tag: "VP Eng • 4,500 Queries/min", href: "/testimonials" },
      { title: "Wealth Wisdom Global", tag: "CEO • 120 FPS Portfolio Engine", href: "/testimonials" },
      { title: "Kaster Underwriting Lab", tag: "CTO • 99.4% Fraud Eradication", href: "/testimonials" },
      { title: "Deterministic SLA Commitment", tag: "99.95% Guaranteed Uptime", href: "/testimonials" },
    ],
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

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
      setScrolled(window.scrollY > 15);

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

  // Primary links on the left side
  const primaryNav = [
    { label: "About Us", href: "/about", key: "about" },
    { label: "How We Work", href: "/how-we-work", key: "how-we-work" },
    { label: "Services", href: "/services", key: "services" },
    { label: "Portfolio", href: "/portfolio", key: "portfolio" },
    { label: "Industries", href: "/industries", key: "industries" },
    { label: "Insights", href: "/insights", key: "insights" },
    { label: "Testimonials", href: "/testimonials", key: "testimonials" },
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
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 lg:gap-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="shrink-0 flex items-center" onClick={() => setHoveredKey(null)}>
          <Logo size={28} />
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
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`text-[13px] xl:text-[14px] tracking-[-0.01em] transition-all relative inline-flex items-center gap-1 ${
                    active || isHovered
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
                      isHovered ? "rotate-180 text-[#7057D9]" : "opacity-60"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right Action: CTA Button Only */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/contact"
            className={`inline-flex items-center justify-center px-4 py-1.5 sm:py-2 text-[13px] font-normal tracking-[-0.01em] transition-all rounded-none border ${
              pathname === "/contact"
                ? "text-white bg-[#7057D9] border-[#7057D9]"
                : "text-[#2A2A2E] bg-white hover:bg-[#FAF9F7] border-[#DADADD]"
            }`}
          >
            <span>Contact Us</span>
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
            className="hidden lg:block absolute top-full left-0 w-full bg-[#111114] border-b border-[#25252B] shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-white z-50 overflow-hidden"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient subtle violet bloom in top right */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#7057D9]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 relative z-10">
              <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Left Side: Information & Headline */}
                <div className="col-span-5 flex flex-col justify-between pr-4 lg:pr-8">
                  <div>
                    <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-normal tracking-[-0.03em] leading-[1.2] mb-4 bg-gradient-to-r from-white via-[#D8C7FF] to-[#8E79E8] bg-clip-text text-transparent">
                      {NAVBAR_DROPDOWNS[hoveredKey].headline}
                    </h3>
                    <p className="text-sm sm:text-[15px] font-light text-white/70 leading-relaxed max-w-[420px] mb-8">
                      {NAVBAR_DROPDOWNS[hoveredKey].narrative}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={NAVBAR_DROPDOWNS[hoveredKey].ctaHref}
                      onClick={() => setHoveredKey(null)}
                      className="group/cta inline-flex items-center gap-2 text-sm sm:text-[15px] font-medium text-white hover:text-[#9D87F5] transition-all"
                    >
                      <span>{NAVBAR_DROPDOWNS[hoveredKey].ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/cta:text-[#9D87F5] group-hover/cta:translate-x-1.5 transition-all duration-200" />
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
                      className={`group/item flex items-center justify-between py-3.5 sm:py-4 border-b border-[#25252B] hover:border-white/20 transition-all duration-200 px-3 hover:bg-white/[0.03] ${
                        index === 0 ? "border-t border-[#25252B]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] sm:text-[16px] lg:text-[17px] font-light tracking-[-0.01em] text-white/90 group-hover/item:text-white transition-colors">
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

          <div className="pt-2 border-t border-[#DADADD] flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-medium text-white bg-[#7057D9] hover:bg-[#573EBF] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
