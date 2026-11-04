import {
  AppWindow, Boxes, BrainCircuit, Building2, Cable, ClipboardCheck, CloudCog, Code2, CreditCard,
  Database, Eye, FileSearch, Gauge, GraduationCap, Headphones, Layers, LayoutTemplate, LineChart,
  MessageSquare, Palette, PenTool, Plug, Rocket, ScanSearch, Search, ShieldCheck, Smartphone,
  Sparkles, Users, Wand2, Workflow, Wrench, type LucideIcon,
} from "lucide-react";

export interface ServiceOffering {
  title: string;
  description: string;
  icon: LucideIcon;
  includes: string[];
  image: string;
  bestFor: string;
}

export type ServiceModelKind =
  | "mobile"
  | "chat"
  | "website"
  | "imageBoard"
  | "webPortal"
  | "saas"
  | "board"
  | "aiConnect"
  | "answers"
  | "workflow"
  | "globe";

export type ServiceStatGraphic =
  /** Real before/after figures. */
  | { kind: "compare"; beforeLabel: string; before: string; afterLabel: string; after: string }
  /** Real count, drawn as that many tiles. */
  | { kind: "count"; count: number }
  /** Real range in weeks, on a 14-week scale. */
  | { kind: "weeks" }
  /** Real full-score figures. */
  | { kind: "gauge" }
  | { kind: "ring" }
  /** Illustrative shapes that set the mood for a figure; they don't plot data. */
  | { kind: "line" | "network" | "frames" | "pulse" | "library" };

export interface ServiceProofStat {
  value: string;
  label: string;
  detail: string;
  /** Only for true "share of 100" figures. Draws a filled grid of 100 squares. */
  percent?: number;
  /** Names for the filled and empty squares, shown as a key beside the grid. */
  legend?: [string, string];
  /** For tiny shares: fill the rest and pick out the small share in white. */
  invert?: boolean;
  graphic?: ServiceStatGraphic;
}

export interface ServiceProof {
  layout: "stepped" | "grid" | "globe";
  source: string;
  stats: ServiceProofStat[];
}

export interface ServiceDetail {
  heroTitle: string;
  lead: string;
  sectionTitle: string;
  sectionLead: string;
  model: ServiceModelKind;
  proof: ServiceProof;
  offerings: ServiceOffering[];
}

/** Long-form content for /services/[id], keyed by the service id in services.ts. */
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "mobile-application-development": {
    heroTitle: "Mobile Application Development",
    lead: "iOS and Android apps that feel fast and natural in the hand, designed around how your customers actually use their phones.",
    sectionTitle: "Mobile app development services",
    sectionLead: "From a first version to a mature product, we design, build and look after apps people want to keep on their home screen.",
    model: "mobile",
    proof: {
      layout: "stepped",
      source: "UrbanFlow Logistics project",
      stats: [
        { value: "450k+", label: "Monthly bookings", detail: "Handled through the mobile platform.", graphic: { kind: "line" } },
        { value: "< 48ms", label: "Dispatch routing", detail: "Time to match a booking to a driver.", graphic: { kind: "network" } },
        { value: "120 FPS", label: "Native rendering", detail: "Smooth on both iOS and Android.", graphic: { kind: "frames" } },
      ],
    },
    offerings: [
      { icon: Smartphone, title: "Native iOS & Android", description: "Apps built specifically for each platform when you need the smoothest experience and full access to the device.", includes: ["SwiftUI and Jetpack Compose", "Platform-native navigation", "App Store and Play release"] , image: "/services/phone-dashboard.jpg", bestFor: "Products where feel and speed matter most" },
      { icon: Layers, title: "Cross-Platform Apps", description: "One shared codebase for iOS and Android, so you can launch on both sooner and keep updates in step.", includes: ["React Native and Expo", "Shared design system", "Over-the-air updates"] , image: "/services/phone-laptop.jpg", bestFor: "Launching on both stores with one team" },
      { icon: Cable, title: "Device Features", description: "Biometric login, notifications, Bluetooth, camera and location, connected in ways that feel built in rather than bolted on.", includes: ["Face ID and fingerprint login", "Push notifications", "Bluetooth, camera and GPS"] , image: "/portfolio/photos/fintech-phone.jpg", bestFor: "Payments, health and field-service apps" },
      { icon: Database, title: "Offline-Ready Apps", description: "Apps that keep working on a poor connection and sync safely once the user is back online.", includes: ["Local on-device storage", "Background sync", "Conflict resolution"] , image: "/portfolio/photos/delivery-app.jpg", bestFor: "Delivery, logistics and on-site teams" },
    ],
  },
  "web-application-development": {
    heroTitle: "Web Application Development",
    lead: "Fast, dependable web applications shaped around your business, from customer portals to the internal tools your teams rely on.",
    sectionTitle: "Web app development services",
    sectionLead: "We plan, design and engineer web applications that stay quick to use and easy to change as your business grows.",
    model: "webPortal",
    proof: {
      layout: "stepped",
      source: "Wealth Wisdom Global project",
      stats: [
        { value: "120 FPS", label: "Canvas frame rate", detail: "Tested under 500k active points.", graphic: { kind: "frames" } },
        { value: "320ms", label: "Calculation speed", detail: "For 100,000 simulation runs.", graphic: { kind: "line" } },
        { value: "18ms", label: "Live data latency", detail: "From edge to client.", graphic: { kind: "pulse" } },
      ],
    },
    offerings: [
      { icon: AppWindow, title: "Custom Web Apps", description: "Applications built around your workflows, whether you are replacing spreadsheets or launching a new product.", includes: ["Requirements and user journeys", "Role-based access", "Automated testing"] , image: "/how-we-work/stage-3-ui-ux-prototyping.jpg", bestFor: "Replacing spreadsheets or launching a product" },
      { icon: Users, title: "Customer & Partner Portals", description: "Secure, self-service spaces where the people you work with can find information and get things done.", includes: ["Secure sign-in and SSO", "Self-service account tools", "Documents and notifications"] , image: "/about/card-swarms.jpg", bestFor: "Businesses with accounts to serve at scale" },
      { icon: LineChart, title: "Dashboards & Real-Time Tools", description: "Clear, responsive screens for live data, so teams can see what is happening and act on it quickly.", includes: ["Live data streams", "Charts, filters and exports", "Alerts for key events"] , image: "/portfolio/photos/analytics.jpg", bestFor: "Operations, finance and analytics teams" },
      { icon: Gauge, title: "Performance & Modernization", description: "Speeding up slow applications and moving ageing systems to a modern foundation without disrupting users.", includes: ["Core Web Vitals audit", "Staged system migration", "Edge caching"] , image: "/about/corp-automation.jpg", bestFor: "Slow or ageing applications" },
    ],
  },
  "custom-ai-development": {
    heroTitle: "Custom AI Development",
    lead: "AI built around your data and your decisions, designed to solve a specific business problem rather than to demonstrate a technology.",
    sectionTitle: "Custom AI development services",
    sectionLead: "We start from the outcome you need, then build, test and deploy the model that can reliably deliver it.",
    model: "aiConnect",
    proof: {
      layout: "grid",
      source: "Kaster Underwriting project",
      stats: [
        { value: "99.4%", label: "Fraud detection", detail: "Pixel-level tamper checks.", percent: 99.4, legend: ["Detected", "Missed"] },
        { value: "< 0.08%", label: "False positive rate", detail: "Across 250k submissions.", percent: 0.08, invert: true, legend: ["Cleared correctly", "Flagged in error"] },
        { value: "420ms", label: "Per document", detail: "A full multi-page pass, down from 72 hours of manual review.", graphic: { kind: "compare", beforeLabel: "Manual review", before: "72 hours", afterLabel: "Automated", after: "420ms" } },
      ],
    },
    offerings: [
      { icon: BrainCircuit, title: "Custom Model Development", description: "Models trained on your own data for the tasks and language specific to your domain.", includes: ["Data preparation and labelling", "Model training and tuning", "Accuracy benchmarks"] , image: "/about/corp-performance.jpg", bestFor: "Problems off-the-shelf AI can't solve" },
      { icon: Eye, title: "Computer Vision", description: "Systems that read documents, inspect images and spot what matters, so people can focus on the exceptions.", includes: ["Document and ID reading", "Image inspection", "Tamper and anomaly checks"] , image: "/portfolio/photos/external/kaster-document-review.jpg", bestFor: "Document-heavy and inspection work" },
      { icon: LineChart, title: "Predictive Intelligence", description: "Forecasts and risk signals that fit into the decisions your teams already make.", includes: ["Demand and risk forecasts", "Explainable signals", "Dashboard integration"] , image: "/portfolio/photos/external/wealth-advisory.jpg", bestFor: "Finance, risk and demand planning" },
      { icon: Rocket, title: "Deployment & Monitoring", description: "Taking models into production and watching their quality over time, so they stay accurate as your data changes.", includes: ["Production model serving", "Quality and drift tracking", "Scheduled retraining"] , image: "/how-we-work/stage-6-deployment-launch-support.jpg", bestFor: "Teams moving models out of the lab" },
    ],
  },
  "llm-integration": {
    heroTitle: "LLM Integration",
    lead: "Bring large language models into your products and workflows safely, connected to your own knowledge and kept under your control.",
    sectionTitle: "LLM integration services",
    sectionLead: "We help you choose the right models and connect them to your systems in a way your team can trust and maintain.",
    model: "answers",
    proof: {
      layout: "grid",
      source: "Clinical Therapeutics Group project",
      stats: [
        { value: "99.4%", label: "Guardrail precision", detail: "No fabricated citations observed.", percent: 99.4, legend: ["Precise", "Not precise"] },
        { value: "450+", label: "Texts indexed", detail: "1.2M records from curated treatises.", graphic: { kind: "library" } },
        { value: "< 180ms", label: "Lookup latency", detail: "Hybrid vector and keyword search.", graphic: { kind: "pulse" } },
      ],
    },
    offerings: [
      { icon: FileSearch, title: "Search Over Your Knowledge", description: "Answers drawn from your own documents and data, with sources people can check for themselves.", includes: ["Document ingestion", "Hybrid search", "Answers with citations"] , image: "/portfolio/photos/external/clinical-ai.jpg", bestFor: "Large document libraries and expert teams" },
      { icon: Plug, title: "Product Integration", description: "AI features added to the products and internal tools your teams and customers already use.", includes: ["In-app AI features", "API and tool connections", "Streaming responses"] , image: "/about/card-security.jpg", bestFor: "Products adding AI features for users" },
      { icon: ShieldCheck, title: "Guardrails & Evaluation", description: "Testing, review steps and clear limits that keep responses accurate, appropriate and safe to rely on.", includes: ["Automated test suites", "Human review steps", "Policy and safety limits"] , image: "/how-we-work/stage-5-qa-security-testing.jpg", bestFor: "Regulated or high-stakes use cases" },
      { icon: Wand2, title: "Model Selection & Tuning", description: "Matching each task to a suitable model, then balancing quality, speed and running cost.", includes: ["Model comparison", "Prompt optimization", "Cost and speed tracking"] , image: "/about/corp-performance.jpg", bestFor: "Teams balancing quality against cost" },
    ],
  },
  "chatbot-development": {
    heroTitle: "Chatbot Development",
    lead: "Helpful conversational assistants for customers and teams that answer real questions, complete tasks and know when to involve a person.",
    sectionTitle: "Chatbot development services",
    sectionLead: "We design assistants around the conversations your business actually has, then connect them to the systems that get things done.",
    model: "chat",
    proof: {
      layout: "globe",
      source: "Clinical Therapeutics Group project and our chatbot service benchmark",
      stats: [
        { value: "3,400+", label: "Active physicians", detail: "Licensed clinical users." },
        { value: "12", label: "Countries", detail: "Where the agent is in use." },
        { value: "< 180ms", label: "Lookup latency", detail: "Finding the right source.", graphic: { kind: "pulse" } },
        { value: "< 280ms", label: "Voice turnaround", detail: "Our voice assistant benchmark." },
      ],
    },
    offerings: [
      { icon: Headphones, title: "Customer Support Assistants", description: "Instant answers to common questions, with a smooth handover to your team when a person is needed.", includes: ["FAQ and order answers", "Handover to live agents", "Conversation analytics"] , image: "/services/support-headsets.jpg", bestFor: "High volumes of repeat questions" },
      { icon: Users, title: "Internal Team Assistants", description: "A quick way for employees to find policies, documents and answers without leaving their work.", includes: ["Policy and document search", "Permission-aware answers", "Slack and Teams access"] , image: "/about/card-swarms.jpg", bestFor: "Growing teams with scattered knowledge" },
      { icon: MessageSquare, title: "Voice & Text Channels", description: "Consistent conversations across your website, your app and the messaging channels your customers prefer.", includes: ["Web and in-app chat", "WhatsApp messaging", "Voice conversations"] , image: "/services/chatbot.jpg", bestFor: "Customers who reach you in many places" },
      { icon: Plug, title: "Connected Actions", description: "Assistants that can check an order, book an appointment or update a record in your existing systems.", includes: ["Order and account lookups", "Appointment booking", "CRM record updates"] , image: "/portfolio/photos/delivery-app.jpg", bestFor: "Orders, bookings and account requests" },
    ],
  },
  "workflow-automation": {
    heroTitle: "Workflow Automation",
    lead: "Take repetitive, manual work out of your day by connecting the tools you already use and automating the steps in between.",
    sectionTitle: "Workflow automation services",
    sectionLead: "We map how work really moves through your business, then automate it with clear checkpoints for your people.",
    model: "workflow",
    proof: {
      layout: "grid",
      source: "Kaster Underwriting project and our automation service benchmark",
      stats: [
        { value: "94%", label: "Manual effort reduced", detail: "Our automation benchmark.", percent: 94, legend: ["Automated", "Still manual"] },
        { value: "< 0.08%", label: "False positive rate", detail: "Very few cases sent back for review.", percent: 0.08, invert: true, legend: ["Cleared correctly", "Flagged in error"] },
        { value: "420ms", label: "Verification time", detail: "Down from 72 hours.", graphic: { kind: "compare", beforeLabel: "Manual process", before: "72 hours", afterLabel: "Automated", after: "420ms" } },
      ],
    },
    offerings: [
      { icon: Workflow, title: "Process Mapping & Automation", description: "Finding where time is lost, then turning those steps into reliable automated workflows.", includes: ["Workflow discovery", "Automated task routing", "Retries and error handling"] , image: "/services/workflow.jpg", bestFor: "Teams losing hours to repetitive steps" },
      { icon: Cable, title: "System Integration", description: "Connecting your CRM, ERP and other tools so information moves between them without re-entry.", includes: ["CRM and ERP connectors", "Scheduled data sync", "Event-driven triggers"] , image: "/how-we-work/stage-2-architecture-stack.jpg", bestFor: "Businesses running many separate tools" },
      { icon: ScanSearch, title: "Document Processing", description: "Reading information from invoices, forms and contracts, and sending it where it needs to go.", includes: ["Invoices, forms and contracts", "Field extraction", "Validation against your records"] , image: "/portfolio/photos/external/kaster-document-review.jpg", bestFor: "Finance, insurance and operations teams" },
      { icon: ClipboardCheck, title: "Human-in-the-Loop Reviews", description: "Approval steps and audit trails that keep people in charge of the decisions that matter.", includes: ["Approval queues", "Exception handling", "Complete audit trail"] , image: "/services/client-meeting.jpg", bestFor: "Decisions that need a person's sign-off" },
    ],
  },
  "website-development": {
    heroTitle: "Website Development",
    lead: "Clear, polished websites that tell your story well, load quickly and turn visitors into conversations.",
    sectionTitle: "Website development services",
    sectionLead: "From a focused landing page to a full brand site, we handle design and development as one piece of work.",
    model: "website",
    proof: {
      layout: "stepped",
      source: "21Spheres website service standards",
      stats: [
        { value: "100/100", label: "Lighthouse score", detail: "The target we build towards.", graphic: { kind: "gauge" } },
        { value: "3–14", label: "Weeks to launch", detail: "From brief to going live.", graphic: { kind: "weeks" } },
        { value: "100%", label: "Handed over", detail: "With all code and documentation.", graphic: { kind: "ring" } },
      ],
    },
    offerings: [
      { icon: LayoutTemplate, title: "Marketing Websites", description: "Sites that explain what you do clearly and guide visitors towards getting in touch.", includes: ["Page structure and messaging", "Conversion-focused layouts", "Lead capture forms"] , image: "/services/website.jpg", bestFor: "New launches and brand refreshes" },
      { icon: Palette, title: "Brand-Led Design", description: "Distinctive pages and considered motion that make your brand feel like itself.", includes: ["Custom visual design", "Motion and interaction", "Responsive on every screen"] , image: "/how-we-work/stage-3-ui-ux-prototyping.jpg", bestFor: "Brands that want to stand apart" },
      { icon: PenTool, title: "Easy Content Editing", description: "Publishing tools your team can use to update pages without waiting on a developer.", includes: ["Headless CMS setup", "Reusable page sections", "Team training"] , image: "/about/card-swarms.jpg", bestFor: "Marketing teams that publish often" },
      { icon: Search, title: "Speed & Search Foundations", description: "Fast pages and sound technical SEO, so people can find your site and enjoy using it.", includes: ["Lighthouse optimization", "Technical SEO", "Analytics setup"] , image: "/about/corp-automation.jpg", bestFor: "Sites relying on search traffic" },
    ],
  },
  "saas-development": {
    heroTitle: "SaaS Development",
    lead: "Turn your idea into a subscription product, with everything a SaaS business needs in place from day one.",
    sectionTitle: "SaaS development services",
    sectionLead: "We build the product your customers see and the foundations behind it, ready to grow with each new account.",
    model: "saas",
    proof: {
      layout: "globe",
      source: "Bimakart Technologies project",
      stats: [
        { value: "45,000+", label: "Active network", detail: "Partners on the platform." },
        { value: "99.99%", label: "Availability", detail: "Verified around the clock." },
        { value: "100+", label: "Carriers connected", detail: "Through one unified platform.", graphic: { kind: "network" } },
        { value: "8", label: "Weeks to production", detail: "From brief to cutover." },
      ],
    },
    offerings: [
      { icon: Rocket, title: "MVP to Launch", description: "A focused first version that gets your product in front of real customers and starts the learning early.", includes: ["Scope and roadmap", "Clickable prototype", "Production release"] , image: "/how-we-work/stage-1-discovery-srs.jpg", bestFor: "Founders testing a new product idea" },
      { icon: CreditCard, title: "Subscriptions & Billing", description: "Plans, payments, invoices and upgrades that work smoothly for you and your customers.", includes: ["Plans and free trials", "Payments and invoices", "Upgrades and cancellations"] , image: "/services/online-payment.jpg", bestFor: "Products with recurring revenue" },
      { icon: Users, title: "Teams & Permissions", description: "Workspaces, user roles and sign-in options that are ready for business customers.", includes: ["Workspaces and invites", "Role-based access", "SSO for business plans"] , image: "/about/card-integration.jpg", bestFor: "SaaS products selling to businesses" },
      { icon: Boxes, title: "Multi-Tenant Foundations", description: "An architecture that keeps each customer's data separate and scales as accounts grow.", includes: ["Per-customer data isolation", "Scalable infrastructure", "Usage metering"] , image: "/how-we-work/stage-2-architecture-stack.jpg", bestFor: "Products preparing for many customers" },
    ],
  },
  "enterprise-software-development": {
    heroTitle: "Enterprise Software Development",
    lead: "Secure, dependable systems for complex organizations, built to fit alongside what you already run and to last for years.",
    sectionTitle: "Enterprise software services",
    sectionLead: "We work with your teams to modernize core systems step by step, keeping the business running throughout.",
    model: "globe",
    proof: {
      layout: "grid",
      source: "Bimakart Technologies project",
      stats: [
        { value: "99.99%", label: "Availability", detail: "Verified around the clock.", percent: 99.99, legend: ["Available", "Downtime"] },
        { value: "100+", label: "Carriers connected", detail: "Queried in parallel.", graphic: { kind: "network" } },
        { value: "< 2.4s", label: "Quote latency", detail: "Down from a 45-second average.", graphic: { kind: "compare", beforeLabel: "Previous average", before: "45s", afterLabel: "With the gateway", after: "2.4s" } },
      ],
    },
    offerings: [
      { icon: Building2, title: "Custom Enterprise Platforms", description: "Software shaped around how your organization works, across departments, roles and regions.", includes: ["Cross-department workflows", "Role-based access", "Reporting and analytics"] , image: "/services/client-meeting.jpg", bestFor: "Organizations with complex processes" },
      { icon: Wrench, title: "Legacy Modernization", description: "Replacing ageing systems in careful stages, without a risky all-at-once switch.", includes: ["System audit", "Staged migration plan", "Parallel running at cutover"] , image: "/how-we-work/stage-2-architecture-stack.jpg", bestFor: "Critical systems that can't go offline" },
      { icon: CloudCog, title: "Cloud Infrastructure", description: "Moving to resilient cloud foundations that are monitored, recoverable and ready to scale.", includes: ["Kubernetes and AWS", "Infrastructure as code", "Monitoring and disaster recovery"] , image: "/services/server-room.jpg", bestFor: "Teams moving off on-site servers" },
      { icon: ShieldCheck, title: "Security & Compliance", description: "Access controls, audit trails and data protection designed in from the very start.", includes: ["Access controls and audit logs", "Encryption of your data", "Security testing"] , image: "/how-we-work/stage-5-qa-security-testing.jpg", bestFor: "Regulated industries and sensitive data" },
    ],
  },
  "custom-software-development": {
    heroTitle: "Custom Software Development",
    lead: "When off-the-shelf software doesn't fit, we build the tool your business actually needs, and hand it over ready for you to own.",
    sectionTitle: "Custom software services",
    sectionLead: "We begin by understanding the problem, then build only what will make a real difference to your work.",
    model: "board",
    proof: {
      layout: "stepped",
      source: "21Spheres delivery standards",
      stats: [
        { value: "100%", label: "IP ownership", detail: "The code and rights are yours.", graphic: { kind: "ring" } },
        { value: "15+", label: "Products shipped", detail: "For enterprises and ventures.", graphic: { kind: "count", count: 15 } },
        { value: "3–14", label: "Weeks to launch", detail: "From brief to going live.", graphic: { kind: "weeks" } },
      ],
    },
    offerings: [
      { icon: Code2, title: "Bespoke Internal Tools", description: "Software designed around your team's daily work, in place of workarounds and spreadsheets.", includes: ["Workflow discovery", "Purpose-built screens", "Spreadsheet data migration"] , image: "/about/card-integration.jpg", bestFor: "Teams outgrowing their spreadsheets" },
      { icon: Sparkles, title: "Discovery & Prototyping", description: "Testing your idea with a working prototype before you commit to the full build.", includes: ["Problem definition", "Clickable prototype", "User testing"] , image: "/how-we-work/stage-1-discovery-srs.jpg", bestFor: "Ideas that need testing before funding" },
      { icon: Plug, title: "APIs & Integrations", description: "Connecting new software cleanly with the systems and partners you already depend on.", includes: ["REST and GraphQL APIs", "Third-party connections", "Developer documentation"] , image: "/how-we-work/stage-2-architecture-stack.jpg", bestFor: "Connecting partners and existing systems" },
      { icon: GraduationCap, title: "Handover & Ongoing Support", description: "Clear documentation, team training and continued support for as long as you need it.", includes: ["Full code ownership", "Documentation and training", "Support plans"] , image: "/portfolio/photos/team.jpg", bestFor: "Teams taking ownership after launch" },
    ],
  },
};
