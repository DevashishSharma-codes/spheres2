import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_SOCIALS } from "@/content/company";
import { BackToTopButton, FooterCone } from "./FooterCone";
import { FooterWordmark } from "./FooterWordmark";
import { SOCIAL_ICON_PATHS } from "./socialIconPaths";

const LINK_GROUPS = [
  {
    title: "Company",
    className: "",
    listClassName: "",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "How We Work", href: "/#how-we-work" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    className: "",
    listClassName: "",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Industries", href: "/#industries" },
      { label: "Insights", href: "/insights" },
      { label: "Founder's Note", href: "/insights/founders-note" },
    ],
  },
  {
    title: "Services",
    // Shares a full row on phones, so its links run in two columns there.
    className: "col-span-2 sm:col-span-1",
    listClassName: "columns-2 gap-x-6 sm:columns-1",
    links: [
      { label: "Custom AI", href: "/services/custom-ai-development" },
      { label: "Web Applications", href: "/services/web-application-development" },
      { label: "Mobile Applications", href: "/services/mobile-application-development" },
      { label: "All Services", href: "/services" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: COMPANY_SOCIALS.linkedin, icon: "linkedin", fill: "#0A66C2" },
  { label: "Instagram", href: COMPANY_SOCIALS.instagram, icon: "instagram", fill: "url(#footer-instagram)" },
  { label: "X", href: COMPANY_SOCIALS.x, icon: "x", fill: "#000000" },
  {
    label: "Facebook",
    href: COMPANY_SOCIALS.facebook,
    icon: "facebook",
    fill: "#1877F2",
  },
] as const;

const ADDRESS = "PC-81, Vardhman Nagar South, Madhapar Bhuj, Gujarat 370020";
const EMAIL = "info@21spheres.com";
const PHONE = {
  label: "+91 97247 80021",
  href: "tel:+919724780021",
  whatsappHref: "https://wa.me/919724780021",
};

const labelClass = "text-[11px] font-medium uppercase tracking-[0.12em] text-[#2A2A2E]/50";
const linkClass = "text-[#2A2A2E] transition-colors hover:text-[#7057D9]";
const contactLabelClass =
  "flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#2A2A2E]/60";
const contactIconClass = "h-3.5 w-3.5 shrink-0 text-[#7057D9]";
const contactValueClass = "mt-1 block w-fit transition-colors hover:text-[#7057D9]";

function SocialIcons() {
  return (
    <ul aria-label="Follow us" className="flex items-center gap-4">
      {SOCIALS.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="block transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill={social.fill}>
              {social.icon === "instagram" && (
                <defs>
                  <linearGradient id="footer-instagram" x1="10%" y1="90%" x2="90%" y2="10%">
                    <stop offset="0%" stopColor="#FEDA75" />
                    <stop offset="30%" stopColor="#FA7E1E" />
                    <stop offset="55%" stopColor="#D62976" />
                    <stop offset="78%" stopColor="#962FBF" />
                    <stop offset="100%" stopColor="#4F5BD5" />
                  </linearGradient>
                </defs>
              )}
              <path d={SOCIAL_ICON_PATHS[social.icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="w-full overflow-x-clip bg-white">
      {/* The thread, the call to action, and the paper plane that flies between them */}
      <FooterCone />

      <Container wide>
        {/* Contact details on the left, the site's pages on the right */}
        <div className="grid gap-8 border-t border-[#E7E5EB] py-6 lg:grid-cols-12 lg:gap-8">
          <address className="grid gap-y-3 text-[17px] font-medium tracking-[-0.01em] not-italic text-[#19191C] lg:col-span-4">
            <div>
              <div className={contactLabelClass}>
                <span className="flex items-center gap-1.5">
                  <Phone aria-hidden="true" className={contactIconClass} />
                  Phone
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-[#2A2A2E]/25" />
                <a
                  href={PHONE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#7057D9]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="#25D366">
                    <path d={SOCIAL_ICON_PATHS.whatsapp} />
                  </svg>
                  WhatsApp
                </a>
              </div>
              <a href={PHONE.href} className={contactValueClass}>
                {PHONE.label}
              </a>
            </div>
            <div>
              <p className={contactLabelClass}>
                <Mail aria-hidden="true" className={contactIconClass} />
                Email
              </p>
              <a href={`mailto:${EMAIL}`} className={contactValueClass}>
                {EMAIL}
              </a>
            </div>
            <div>
              <p className={contactLabelClass}>
                <MapPin aria-hidden="true" className={contactIconClass} />
                Studio
              </p>
              <p className="mt-1 max-w-[340px]">{ADDRESS}</p>
            </div>
          </address>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {LINK_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title} className={group.className}>
                <h2 className={labelClass}>{group.title}</h2>
                <ul className={`mt-4 text-sm [&>li]:break-inside-avoid [&>li]:pb-2.5 ${group.listClassName}`}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#E7E5EB] py-4 text-xs text-[#2A2A2E]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 21Spheres Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <SocialIcons />
            <BackToTopButton />
          </div>
        </div>

        <FooterWordmark />
      </Container>
    </footer>
  );
}
