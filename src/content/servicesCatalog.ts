import { Building2, Cpu, Globe, Layout, MessageSquare, Rocket, Smartphone, Sparkles, Terminal, Workflow, type LucideIcon } from "lucide-react";
import { SERVICE_DETAILS } from "@/content/serviceDetails";
import { SERVICE_TECH } from "@/content/serviceTech";

/*
 * Everything the /services page shows, in one place: categories, each holding its services.
 * The page is rendered from this, so adding a service means adding an entry here, never touching
 * layout code. Each service's long-form details (lead and scope) come from serviceDetails.ts and its
 * stack from serviceTech.ts, so the services page and the /services/[id] pages always agree.
 */

export interface CatalogScope {
  title: string;
  includes: string[];
}

export interface CatalogService {
  id: string;
  icon: LucideIcon;
  name: string;
  /** One line, 90 characters at most. */
  summary: string;
  /** Three or four key deliverables, shown as chips. */
  deliverables: string[];
  /** Muted meta row: the main technologies used. */
  stack: string[];
  details: { lead: string; scope: CatalogScope[] };
}

export interface CatalogCategory {
  id: string;
  name: string;
  /** One line under the category heading. */
  description: string;
  services: CatalogService[];
}

function service(id: string, icon: LucideIcon, name: string, summary: string): CatalogService {
  const detail = SERVICE_DETAILS[id];
  const scope = (detail?.offerings ?? []).map(({ title, includes }) => ({ title, includes }));
  return {
    id,
    icon,
    name,
    summary,
    deliverables: scope.map(({ title }) => title).slice(0, 4),
    stack: (SERVICE_TECH[id] ?? []).map(({ name: tech }) => tech).slice(0, 4),
    details: { lead: detail?.lead ?? summary, scope },
  };
}

export const SERVICE_CATEGORIES: CatalogCategory[] = [
  {
    id: "ai-and-intelligence",
    name: "AI & Intelligence",
    description: "Models, language AI, assistants and automation built around your own data.",
    services: [
      service("custom-ai-development", Cpu, "Custom AI Development", "Machine learning models built around your data, problems and operating environment."),
      service("llm-integration", Sparkles, "LLM Integration", "GPT, Claude and Gemini brought into your apps and workflows, using your own data."),
      service("chatbot-development", MessageSquare, "Chatbot Development", "Chat and voice assistants for web, apps and WhatsApp that resolve real conversations."),
      service("workflow-automation", Workflow, "Workflow Automation", "Automations that connect your systems and keep work moving, with AI where it helps."),
    ],
  },
  {
    id: "web-and-platforms",
    name: "Web & Platforms",
    description: "Web applications, websites and SaaS products built to grow with you.",
    services: [
      service("web-application-development", Globe, "Web Application Development", "Custom web apps, portals and dashboards built around how your business works."),
      service("website-development", Layout, "Website Development", "Company websites and landing pages that communicate clearly and load fast."),
      service("saas-development", Rocket, "SaaS Development", "Subscription platforms with accounts, billing, teams and scalable infrastructure."),
    ],
  },
  {
    id: "mobile-and-devices",
    name: "Mobile & Devices",
    description: "iOS and Android apps that feel natural in people's hands.",
    services: [
      service("mobile-application-development", Smartphone, "Mobile Application Development", "Native and cross-platform iOS and Android apps, from first screen to app store."),
    ],
  },
  {
    id: "enterprise-and-cloud",
    name: "Enterprise & Cloud",
    description: "Platforms, modernisation and custom software for complex operations.",
    services: [
      service("enterprise-software-development", Building2, "Enterprise Software Development", "Enterprise platforms and modernisation that connect legacy systems and teams."),
      service("custom-software-development", Terminal, "Custom Software Development", "Internal tools, integrations and specialised software when standard tools fall short."),
    ],
  },
];

/** Draft answers, written from what the site already states. Review before publishing. */
export const SERVICES_FAQ = [
  {
    q: "How long does a typical project take?",
    a: "Most projects take between 3 and 14 weeks from brief to launch, depending on scope. We agree a timeline with you once discovery is complete.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Everything is built in-house by our team and handed over with full code ownership, documentation and training.",
  },
  {
    q: "Can you work with our existing systems?",
    a: "Yes. Much of our work connects new software to what you already use: CRMs, ERPs, internal tools and third-party APIs.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on to monitor, maintain and improve what we built, with a support plan agreed to suit your product.",
  },
  {
    q: "How do we get started?",
    a: "Tell us what you need through the contact page. We begin with a discovery conversation to understand the goal before proposing an approach.",
  },
];
