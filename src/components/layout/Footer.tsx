import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  COMPANY_ADDRESSES,
  COMPANY_EMAIL,
  COMPANY_GSTIN,
  COMPANY_PHONE,
  COMPANY_SOCIALS,
  COMPANY_TM_APPLICATION,
} from "@/content/company";
import { BackToTopButton, FooterCone } from "./FooterCone";
import { FooterWordmark } from "./FooterWordmark";
import { FooterAfterConeSlot, FooterClosingSlot } from "./FooterClosingLine";
import { FooterThemeSync } from "./FooterThemeSync";
import { SOCIAL_ICON_PATHS } from "./socialIconPaths";
import { SITE_URL } from "@/lib/seo";

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
    className: "",
    listClassName: "",
    links: [
      { label: "Custom AI", href: "/services/custom-ai-development" },
      { label: "Web Applications", href: "/services/web-application-development" },
      { label: "Mobile Applications", href: "/services/mobile-application-development" },
      { label: "All Services", href: "/services" },
    ],
  },
];

const SOCIALS = ([
  { label: "LinkedIn", href: COMPANY_SOCIALS.linkedin, icon: "linkedin", fill: "#0A66C2" },
  { label: "Instagram", href: COMPANY_SOCIALS.instagram, icon: "instagram", fill: "url(#footer-instagram)" },
  { label: "X", href: COMPANY_SOCIALS.x, icon: "x", fill: "#000000" },
  { label: "Facebook", href: COMPANY_SOCIALS.facebook, icon: "facebook", fill: "#1877F2" },
] as const).map((social) => ({ ...social, ariaLabel: `21 Spheres on ${social.label}` }));

const ADDRESSES = COMPANY_ADDRESSES;
const TM_APPLICATION_NUMBER = COMPANY_TM_APPLICATION;
const GST_NUMBER = COMPANY_GSTIN;
const EMAIL = COMPANY_EMAIL;
const PHONE = COMPANY_PHONE;

const labelClass = "text-[11px] font-medium uppercase tracking-[0.12em] text-[#2A2A2E]/50";
const linkClass = "text-[#2A2A2E] transition-colors hover:text-[#7057D9]";
const contactLabelClass =
  "flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#2A2A2E]/60";
const contactIconClass = "h-3.5 w-3.5 shrink-0 text-[#7057D9]";
const contactValueClass = "mt-1 block w-fit transition-colors hover:text-[#7057D9]";

// One question, asked of whichever assistant the visitor prefers. Each link opens it with the
// question already filled in, so they get a summary of the studio in one click.
const AI_PROMPT = `Give me a short summary of 21 Spheres (${SITE_URL}): what they build, the services they offer, the industries they work with, and why companies choose them.`;
const ASK_AI = ([
  { label: "ChatGPT", icon: "chatgpt", fill: "#000000", href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Claude", icon: "claude", fill: "#D97757", href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Google AI Mode", icon: "gemini", fill: "url(#footer-gemini)", href: `https://www.google.com/search?udm=50&q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Perplexity", icon: "perplexity", fill: "#20808D", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_PROMPT)}` },
] as const).map((ai) => ({ ...ai, ariaLabel: `Ask ${ai.label} about 21 Spheres` }));


// Socials and the AI assistants share one look: each brand's own coloured mark in an outlined
// circle, lifting slightly on hover.
const ROUND_ICON =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#E7E5EB] transition duration-200 hover:-translate-y-0.5 hover:border-[#BDBDC5] hover:shadow-[0_8px_18px_-10px_rgba(25,25,28,0.35)] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]";

/** The gradients the Instagram and Gemini marks are filled with, defined once for the whole footer. */
function IconGradients() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
      <defs>
        <linearGradient id="footer-instagram" x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="55%" stopColor="#D62976" />
          <stop offset="78%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
        <linearGradient id="footer-gemini" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1C7DFF" />
          <stop offset="52%" stopColor="#9168C0" />
          <stop offset="100%" stopColor="#E26F6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconRow({ title, shortTitle, items }: { title: string; shortTitle?: string; items: readonly { label: string; href: string; icon: keyof typeof SOCIAL_ICON_PATHS; fill: string; ariaLabel: string }[] }) {
  return (
    <div className="flex items-center justify-between gap-4 sm:justify-start sm:gap-5">
      <h2 className={labelClass}>
        {shortTitle ? <><span className="sm:hidden">{shortTitle}</span><span className="hidden sm:inline">{title}</span></> : title}
      </h2>
      <ul className="flex items-center gap-2 sm:gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel} title={item.label} className={ROUND_ICON}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill={item.fill}>
                <path d={SOCIAL_ICON_PATHS[item.icon]} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full overflow-x-clip bg-white">
      <FooterThemeSync />
      {/* The thread, the call to action, and the paper plane that flies between them. Pages that
          already lead to contact (the contact page, the 404) hide it with a `data-no-footer-cone` marker.
          Pages whose last section is dark add `data-footer-dark`, and this whole zone turns dark with
          a white line and white text, so it continues the section above it. */}
      <div className="no-footer-cone:hidden footer-dark:bg-[#0A0910] footer-dark:[--cone-heading:#FFFFFF] footer-dark:[--cone-ink:#FFFFFF]">
        {/* A page's closing line (see FooterClosingLine) appears here, right above the thread */}
        <FooterClosingSlot />
        <FooterCone />
        {/* A page's follow-on content (see FooterAfterCone) appears here, right after "Start a project" */}
        <FooterAfterConeSlot />
      </div>

      <Container wide>
        {/* Contact details on the left, the site's pages on the right */}
        <div className="grid gap-6 border-t border-[#E7E5EB] py-5 sm:gap-8 sm:py-6 lg:grid-cols-12 lg:gap-8">
          <address className="grid divide-y divide-[#E7E5EB] border-y border-[#E7E5EB] text-[13px] leading-snug not-italic text-[#2A2A2E] sm:gap-y-3 sm:divide-y-0 sm:border-0 sm:text-sm lg:col-span-4 lg:self-start [&>div]:py-2.5 sm:[&>div]:py-0">
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
                Address
              </p>
              <dl className="mt-1.5 grid gap-2">
                {ADDRESSES.map((address) => (
                  <div key={address.label}>
                    <dt className="text-[12px] text-[#2A2A2E]/55">{address.label}</dt>
                    {/* One line per line of the address, never wrapping */}
                    <dd className="max-[380px]:text-[12px]">
                      {address.value.split("\n").map((line) => (
                        <span key={line} className="block whitespace-nowrap">{line}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[12px] text-[#2A2A2E]/55">GSTIN: {GST_NUMBER}</p>
            </div>
          </address>

          <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 lg:col-span-7 lg:col-start-6">
            {LINK_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title} className={group.className}>
                <h2 className={labelClass}>{group.title}</h2>
                <ul className={`mt-3 text-[13px] leading-snug sm:mt-4 sm:text-sm [&>li]:break-inside-avoid [&>li]:pb-2.5 ${group.listClassName}`}>
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

        {/* Where else to find us, and a quick way to ask an AI about us */}
        <div className="flex flex-col gap-3 border-t border-[#E7E5EB] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-5">
          <IconGradients />
          <IconRow title="Follow us" items={SOCIALS} />
          <IconRow title="Ask AI for a summary of 21 Spheres" shortTitle="Ask AI about us" items={ASK_AI} />
        </div>

        {/* The name sits bottom-left, with the copyright and the way back up beside it. The bottom
            padding keeps the copyright 12px clear of the chat button in the corner (44px at 12px from
            the edge on phones, 48px at 16px above). */}
        <div className="flex flex-col gap-4 border-t border-[#E7E5EB] pb-[68px] pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pb-[76px]">
          <FooterWordmark className="w-full max-w-[520px]" />
          <div className="flex shrink-0 items-center justify-between gap-4 text-xs text-[#2A2A2E]/60 sm:flex-col sm:items-end">
            <BackToTopButton />
            <div className="sm:text-right">
              <p>© 2026–2027 21 Spheres. All rights reserved.</p>
              <p className="mt-1">TM Application No. {TM_APPLICATION_NUMBER}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
