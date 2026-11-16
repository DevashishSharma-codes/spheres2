import {
  AppWindow, Boxes, BrainCircuit, Building2, Cable, ClipboardCheck, CloudCog, Code2, CreditCard,
  Database, Eye, FileSearch, Gauge, GraduationCap, Headphones, Layers, LayoutTemplate, LineChart,
  MessageSquare, Palette, PenTool, Plug, Rocket, ScanSearch, Search, ShieldCheck, Smartphone,
  Sparkles, Users, Workflow, Wrench, type LucideIcon,
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
  /** Used for search results and link previews; also the hero text when there's no `intro`. */
  lead: string;
  /** A line under the hero title. */
  tagline?: string;
  /** The hero's paragraphs, in place of `lead`. */
  intro?: string[];
  /** The line that closes the page, leading into the footer's call to action. */
  closingTitle?: string;
  /** An optional smaller line under the closing title. */
  closingLead?: string;
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
    lead: "Native and cross-platform iOS and Android applications, from user experience and backend integration to device features and app-store deployment.",
    tagline: "Applications Designed for the Way People Use Their Phones.",
    closingTitle: "Have a Mobile Product to Bring to Life?",
    closingLead: "Let's plan the experience and engineer the application.",
    intro: [
      "A mobile application needs to feel natural, respond reliably, and make everyday actions simple.",
      "We develop native and cross-platform applications for iOS and Android, covering everything from user experience and backend integration to device functionality and app-store deployment.",
      "Whether you are launching a new digital product or extending an existing business platform to mobile, we build applications around how your users interact with them.",
    ],
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
    lead: "Custom web applications, customer portals, admin panels and enterprise systems, built around your business requirements, users and growth objectives.",
    tagline: "Software Built Around the Way Your Business Works.",
    closingTitle: "Have an Application in Mind?",
    closingLead: "Let's define the architecture, features, and development approach.",
    intro: [
      "A web application should do more than display information. It should create meaningful digital experiences, simplify business operations, and provide customers, employees, partners, and administrators with seamless ways to interact and get work done.",
      "We design and develop custom web solutions, including e-commerce platforms, high-converting landing pages, customer portals, business websites, web applications, admin panels, and enterprise management systems. From custom business logic and workflow automation to third-party integrations and scalable backend architecture, we build solutions tailored to your business requirements, users, and growth objectives.",
    ],
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
    lead: "Machine learning and deep learning solutions from 21 Spheres, engineered around your data, requirements, and operating environment.",
    tagline: "AI Built for the Problems Your Business Actually Faces.",
    closingTitle: "Have a Problem That Needs Its Own AI Model?",
    intro: [
      "Not every business problem can be solved with an existing AI model. Some require domain-specific training, carefully prepared datasets, custom algorithms, and models designed around the way your business operates.",
      "At 21 Spheres, we develop machine learning and deep learning solutions for problems that demand more than an off-the-shelf implementation. From predictive models and computer vision to intelligent classification and decision systems, we engineer AI around your data, requirements, and operating environment.",
    ],
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
    lead: "GPT, Claude, Gemini and other large language models integrated into your applications and workflows, working with your business information and systems.",
    tagline: "Bring the Power of Large Language Models Into Your Business.",
    closingTitle: "Your Business Has the Data. Let's Make It More Useful.",
    intro: [
      "Large language models become significantly more useful when they can work with your business information, understand context, and interact with the systems your teams already use.",
      "We integrate models such as GPT, Claude, Gemini, and other compatible LLMs into applications and workflows. From intelligent document assistance and knowledge retrieval to tool calling and multi-step task execution, we build integrations around what your business needs the model to do.",
    ],
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
      { icon: Plug, title: "Product Integration", description: "AI features added to the products and internal tools your teams and customers already use.", includes: ["In-app AI features", "API and tool connections", "Streaming responses"] , image: "/about/card-security.jpg", bestFor: "Products adding AI features for users" },
      { icon: FileSearch, title: "Retrieval-Augmented Generation (RAG)", description: "Allow language models to retrieve relevant information from your own documents, databases, and knowledge repositories.", includes: ["Document ingestion and chunking", "Embedding generation", "Vector search and retrieval"], image: "/portfolio/photos/external/clinical-ai.jpg", bestFor: "Enterprise knowledge assistants and document-based question answering." },
      { icon: Workflow, title: "AI Agents & Tool Calling", description: "Enable language models to interact with approved tools, APIs, and business systems to complete multi-step tasks.", includes: ["Function and tool calling", "Agent orchestration", "Context and task management"], image: "/about/automation-code.jpg", bestFor: "AI-assisted business processes and intelligent applications." },
      { icon: ShieldCheck, title: "AI Security & Evaluation", description: "Build appropriate controls around model responses, information access, and output quality.", includes: ["Prompt and response validation", "Access control and data boundaries", "Evaluation and monitoring"], image: "/how-we-work/stage-5-qa-security-testing.jpg", bestFor: "Business applications handling sensitive or important information." },
    ],
  },
  "chatbot-development": {
    heroTitle: "Chatbot Development",
    lead: "Chatbots for websites, mobile apps, WhatsApp and other channels, designed around the conversations your business actually handles.",
    tagline: "Build Conversations That Do More Than Answer Questions.",
    closingTitle: "What Should Your Chatbot Be Able to Do?",
    intro: [
      "A useful chatbot needs to understand what someone is asking, maintain context, retrieve the right information, and know when a conversation requires human attention.",
      "We develop conversational systems for websites, mobile applications, WhatsApp, and other digital channels. From customer enquiries and lead qualification to internal knowledge assistance, each chatbot is designed around the conversations your business actually handles.",
    ],
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
    lead: "Workflow automation that connects your systems, triggers the right actions and keeps information moving, with AI where it makes the process more reliable.",
    tagline: "Your Business Has a Process. Let's Make It Work Better.",
    closingTitle: "Which Process Is Taking Too Much of Your Team's Time?",
    intro: [
      "Approvals, invoices, customer onboarding, data entry, notifications, and reporting often involve multiple people and disconnected software.",
      "We examine how work currently moves through your business and engineer workflows that connect the right systems, trigger the right actions, and keep information moving without unnecessary manual intervention.",
      "Where appropriate, we introduce AI for document understanding, classification, and decision support. The objective is not to automate everything blindly, but to make the process more reliable.",
    ],
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
    lead: "Company websites, product landing pages and content-driven platforms that communicate clearly, build credibility and perform reliably.",
    tagline: "Your Website Is Where Your Business Makes Its First Impression.",
    closingTitle: "Let's Build a Website Worth Remembering.",
    intro: [
      "A business website should communicate clearly, establish credibility, and help visitors understand what to do next.",
      "We design and develop websites that bring together thoughtful visual design, clear content structure, responsive engineering, and reliable performance. Whether you need a company website, product landing page, or a content-driven platform, we build around your brand and business objectives.",
    ],
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
    lead: "SaaS platforms engineered from the ground up, with the user management, subscriptions, billing and infrastructure needed to run as a subscription service.",
    tagline: "From Product Idea to a Platform People Can Use.",
    closingTitle: "Have a SaaS Idea Worth Building?",
    closingLead: "Let's turn your product requirements into a development roadmap.",
    intro: [
      "Building a SaaS product involves more than developing its core features. It requires user management, subscriptions, billing, permissions, data architecture, and a product experience that can support multiple customers.",
      "We engineer SaaS platforms from the ground up, helping businesses turn product ideas into working software with the infrastructure and functionality needed to operate as a subscription-based service.",
    ],
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
    lead: "Enterprise software development and modernization that connects legacy systems, departments and data, built to fit existing operations and future requirements.",
    tagline: "Complex Business Operations Need Software Built to Match.",
    closingTitle: "Is Your Existing Software Holding Your Business Back?",
    closingLead: "Let's assess your current systems and identify the right engineering approach.",
    intro: [
      "Enterprise environments often involve legacy systems, multiple departments, large datasets, and business processes that have developed over many years.",
      "We develop and modernize enterprise software that connects these moving parts. From internal management platforms and system integrations to large-scale application architecture, our focus is on building software that fits existing operations while supporting future requirements.",
    ],
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
    lead: "Custom software built around the way your business operates, from internal tools and specialized platforms to complex integrations and industry-specific applications.",
    tagline: "When Standard Software Doesn't Fit, Build What Does.",
    closingTitle: "Have a Requirement That Existing Software Cannot Meet?",
    closingLead: "Let's understand what needs to be built.",
    intro: [
      "Off-the-shelf platforms are useful until your business requirements become too specific, your workflows become too complex, or existing tools start creating limitations.",
      "We develop custom software around the way your business operates. From internal management tools and specialized business platforms to complex integrations and industry-specific applications, we build software to address requirements that generic products cannot adequately serve.",
    ],
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
