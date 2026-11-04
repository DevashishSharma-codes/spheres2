import {
  Accessibility, BadgeCheck, Bell, BookOpen, Bot, Brain, Clock, Cloud, Code2, Coins, Compass, Database, Eye, FileCheck,
  FileSearch, Gauge, GitBranch, Globe, Handshake, Headphones, KeyRound, Languages, Layers, LineChart, Lock, Maximize2,
  MessageSquare, MousePointerClick, Palette, PenTool, Plug, Puzzle, Rocket, Scale, ScanSearch, Search, ShieldCheck,
  Smartphone, Sparkles, Target, TrendingUp, Users, Wallet, WifiOff, Workflow, Wrench, Zap, type LucideIcon,
} from "lucide-react";

/** Content of the small app screens floating inside each tile. All of it is illustrative. */
export type CapabilityWidget =
  | { kind: "list"; title: string; rows: { name: string; note: string; action: string }[]; cursor?: string }
  | { kind: "events"; event: { title: string; time: string }; card: { title: string; time: string; rows: [string, string][] } }
  | { kind: "code"; lines: string[]; highlight: number; tooltip: string }
  | { kind: "checklist"; title: string; items: [string, string][] };

export interface CapabilityTile {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional photo behind the screen. Without one the tile uses the purple gradient. */
  image?: string;
  widget: CapabilityWidget;
}

export interface ServiceBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceCapabilities {
  title: string;
  tiles: [CapabilityTile, CapabilityTile, CapabilityTile];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: [ServiceBenefit, ServiceBenefit, ServiceBenefit, ServiceBenefit, ServiceBenefit];
}

export const SERVICE_CAPABILITIES: Record<string, ServiceCapabilities> = {
  "mobile-application-development": {
    title: "Everything an app needs to feel finished",
    tiles: [
      { icon: Rocket, title: "Ready for both stores", description: "We handle builds, store listings and review requirements, so launch day holds no surprises for your team.", widget: { kind: "checklist", title: "Release checklist", items: [["App Store review", "Approved"], ["Google Play review", "Approved"], ["Test build", "Passed"]] } },
      { icon: Bell, title: "Updates that reach people", description: "Timely, relevant notifications bring customers back at the right moment, without becoming noise.", image: "/portfolio/photos/delivery-app.jpg", widget: { kind: "events", event: { title: "Order shipped", time: "2:21 PM" }, card: { title: "Notification sent", time: "2:21 PM", rows: [["Audience", "Active customers"], ["Channel", "iOS and Android"], ["Opens", "Order tracking"]] } } },
      { icon: WifiOff, title: "Keeps working offline", description: "Data is saved on the device first and synced later, so a poor connection never stops anyone mid-task.", widget: { kind: "code", lines: ["const order = await db.save(draft);", "", "// Stored on the device first", "queue.add({ type: \"sync\", order });", "", "network.onReconnect(() => {", "  queue.flush();", "});"], highlight: 3, tooltip: "Syncs when back online" } },
    ],
    benefitsTitle: "Benefits of a well-built app",
    benefitsLead: "A good app earns its place on someone's home screen.",
    benefits: [
      { icon: Target, title: "Closer to your customers", description: "Your business is always one tap away, with a direct channel you own." },
      { icon: Zap, title: "A faster experience", description: "Native-feeling screens respond instantly and make everyday tasks quicker." },
      { icon: Smartphone, title: "More of the device", description: "Camera, location and biometrics make possible what a website can't do." },
      { icon: TrendingUp, title: "Repeat engagement", description: "Saved logins and timely alerts make it easy for people to come back." },
      { icon: Wrench, title: "Easier to improve", description: "A clean codebase means new features ship without rebuilding what works." },
    ],
  },
  "web-application-development": {
    title: "Built for the way your business really works",
    tiles: [
      { icon: Users, title: "The right access for everyone", description: "Customers, partners and staff each see exactly what they need, and nothing they shouldn't.", widget: { kind: "list", title: "Team access", cursor: "You", rows: [{ name: "Priya Shah", note: "Operations lead", action: "Admin" }, { name: "Daniel Kim", note: "Partner account", action: "Viewer" }] } },
      { icon: Plug, title: "Connected to your tools", description: "Your application stays in step with the CRM, payment and support systems you already use.", image: "/about/card-swarms.jpg", widget: { kind: "events", event: { title: "New customer signed up", time: "9:04 AM" }, card: { title: "Systems updated", time: "9:04 AM", rows: [["CRM", "Contact created"], ["Billing", "Plan assigned"], ["Support", "Welcome sent"]] } } },
      { icon: Code2, title: "Safe to change", description: "Typed interfaces and automated tests let you add features without breaking what already works.", widget: { kind: "code", lines: ["export const createInvoice = action({", "  input: invoiceSchema,", "  async run({ customer, items }) {", "    await checkAccess(customer);", "    return invoices.create(items);", "  },", "});"], highlight: 1, tooltip: "Checked before it runs" } },
    ],
    benefitsTitle: "Benefits of a custom web application",
    benefitsLead: "Software that fits the work, instead of the other way round.",
    benefits: [
      { icon: Globe, title: "Available anywhere", description: "People can get to work from any browser, with nothing to install." },
      { icon: Maximize2, title: "Grows with demand", description: "Adding users, data and features doesn't mean starting again." },
      { icon: ShieldCheck, title: "Protected data", description: "Access controls and backups are built in from the start." },
      { icon: Workflow, title: "Fewer manual steps", description: "Replace re-keying and spreadsheets with one reliable workflow." },
      { icon: Gauge, title: "Fast to use", description: "Pages load quickly and stay responsive as your data grows." },
    ],
  },
  "custom-ai-development": {
    title: "AI shaped around your data and decisions",
    tiles: [
      { icon: ScanSearch, title: "Spot what people would miss", description: "Models review large volumes of documents and images, then bring the exceptions to your team.", widget: { kind: "checklist", title: "Document review", items: [["Identity details", "Clear"], ["Signature match", "Clear"], ["Amount changed", "Flagged"]] } },
      { icon: LineChart, title: "Signals you can act on", description: "Forecasts and risk scores arrive inside the tools your teams already use, with the reasons shown.", image: "/portfolio/photos/external/wealth-advisory.jpg", widget: { kind: "events", event: { title: "Weekly forecast ready", time: "7:30 AM" }, card: { title: "Risk review", time: "7:31 AM", rows: [["Accounts", "Reviewed"], ["Top factor", "Late payments"], ["Next step", "Call customer"]] } } },
      { icon: Gauge, title: "Tested before release", description: "Every new model version is measured against your own examples before it reaches production.", widget: { kind: "code", lines: ["const report = await evaluate({", "  model: \"document-check-v4\",", "  dataset: yourLabelledExamples,", "});", "", "if (report.passes(targets)) {", "  deploy(report.model);", "}"], highlight: 5, tooltip: "Only ships if it passes" } },
    ],
    benefitsTitle: "Benefits of custom AI",
    benefitsLead: "Built for a specific problem, not to demonstrate a technology.",
    benefits: [
      { icon: Target, title: "Tuned to your domain", description: "Trained on your data, it understands your language and edge cases." },
      { icon: Clock, title: "Hours back for experts", description: "Routine checks are automated, so specialists focus on hard cases." },
      { icon: Scale, title: "More consistent decisions", description: "The same criteria apply every time, at any volume." },
      { icon: Lock, title: "You keep control", description: "Your data and models stay within boundaries you set." },
      { icon: TrendingUp, title: "Improves over time", description: "Monitoring and retraining keep quality high as your data changes." },
    ],
  },
  "llm-integration": {
    title: "Large language models your team can trust",
    tiles: [
      { icon: FileSearch, title: "Answers from your own documents", description: "People ask in plain language and get an answer with the sources right beside it.", widget: { kind: "list", title: "Sources found", cursor: "Answer", rows: [{ name: "Billing policy", note: "Page 12", action: "Open" }, { name: "Terms of service", note: "Section 8", action: "Open" }] } },
      { icon: Plug, title: "Inside the tools you use", description: "AI assistance sits within your products and workflows, rather than in yet another tab.", image: "/portfolio/photos/external/clinical-ai.jpg", widget: { kind: "events", event: { title: "Question asked", time: "11:02 AM" }, card: { title: "Answer delivered", time: "11:02 AM", rows: [["Searched", "Clinical library"], ["Citations", "3 sources"], ["Review", "Not required"]] } } },
      { icon: GitBranch, title: "Freedom to switch models", description: "A single layer lets you compare providers and change models without rewriting your product.", widget: { kind: "code", lines: ["const answer = await assistant.ask({", "  model: routing.bestFor(\"search\"),", "  question,", "  sources: await search(question),", "  rules: companyGuardrails,", "});"], highlight: 1, tooltip: "Change models in one place" } },
    ],
    benefitsTitle: "Benefits of LLM integration",
    benefitsLead: "The speed of AI, with checks your business can stand behind.",
    benefits: [
      { icon: Search, title: "Knowledge within reach", description: "Years of documents become something anyone can simply ask." },
      { icon: BadgeCheck, title: "Answers you can verify", description: "Citations let people check the source of every response." },
      { icon: ShieldCheck, title: "Clear guardrails", description: "Limits and review steps keep responses appropriate." },
      { icon: Coins, title: "Managed running costs", description: "Each task uses a model that balances quality and price." },
      { icon: Languages, title: "Natural to use", description: "No training needed, because people just use their own words." },
    ],
  },
  "chatbot-development": {
    title: "Conversations that actually get things done",
    tiles: [
      { icon: MessageSquare, title: "Understands what people ask", description: "Assistants follow real, messy questions across a conversation, and don't force anyone through menus.", widget: { kind: "list", title: "Open conversations", cursor: "Agent", rows: [{ name: "Order question", note: "Answered by assistant", action: "Resolved" }, { name: "Billing dispute", note: "Needs a person", action: "Take over" }] } },
      { icon: Headphones, title: "Smooth handover to your team", description: "When a person is needed, your agent receives the full context, so nobody repeats themselves.", image: "/services/support-headsets.jpg", widget: { kind: "events", event: { title: "Customer asked for help", time: "3:12 PM" }, card: { title: "Handed to an agent", time: "3:12 PM", rows: [["Topic", "Billing"], ["Summary", "Included"], ["Assigned", "Support team"]] } } },
      { icon: Plug, title: "Completes the task", description: "Connected to your systems, it can check an order, book a slot or update a record.", widget: { kind: "checklist", title: "Actions taken", items: [["Order located", "Done"], ["Address updated", "Done"], ["Confirmation sent", "Done"]] } },
    ],
    benefitsTitle: "Benefits of a good assistant",
    benefitsLead: "Quicker answers for customers, and more time for your team.",
    benefits: [
      { icon: Clock, title: "Always available", description: "Customers get a useful answer at any hour of the day." },
      { icon: Users, title: "Your team on hard cases", description: "Repeat questions are handled, so people focus where they matter." },
      { icon: Globe, title: "Consistent everywhere", description: "The same reliable answers across web, app and messaging." },
      { icon: Bot, title: "Trained on your business", description: "It answers from your policies and content, not guesswork." },
      { icon: LineChart, title: "Insight from conversations", description: "See what customers ask most, and improve from it." },
    ],
  },
  "workflow-automation": {
    title: "From repetitive steps to reliable workflows",
    tiles: [
      { icon: Workflow, title: "Work that routes itself", description: "Tasks move to the right person or system automatically, with nothing lost in an inbox.", widget: { kind: "list", title: "Today's approvals", cursor: "You", rows: [{ name: "Supplier invoice", note: "Finance", action: "Approve" }, { name: "New vendor", note: "Procurement", action: "Review" }] } },
      { icon: FileCheck, title: "Documents read for you", description: "Details from invoices, forms and contracts are captured, checked and sent where they belong.", image: "/services/client-meeting.jpg", widget: { kind: "events", event: { title: "Invoice received", time: "8:41 AM" }, card: { title: "Details extracted", time: "8:41 AM", rows: [["Supplier", "Matched"], ["Amount", "Verified"], ["Status", "Ready to pay"]] } } },
      { icon: ShieldCheck, title: "Handles things going wrong", description: "Failed steps retry on their own, and anything unusual is raised with a person.", widget: { kind: "code", lines: ["workflow(\"invoice-approval\")", "  .on(\"invoice.received\")", "  .step(readDocument)", "  .step(matchToOrder, { retries: 3 })", "  .when(needsReview, askFinanceTeam)", "  .then(markReadyToPay);"], highlight: 4, tooltip: "People decide the exceptions" } },
    ],
    benefitsTitle: "Benefits of automating workflows",
    benefitsLead: "Less time spent moving information, and more spent using it.",
    benefits: [
      { icon: Clock, title: "Time back every week", description: "Hours of copying and chasing are taken off your team's plate." },
      { icon: BadgeCheck, title: "Fewer errors", description: "Information entered once and checked automatically stays correct." },
      { icon: Eye, title: "Complete visibility", description: "See where every task is, and what happened along the way." },
      { icon: Plug, title: "Keeps your existing tools", description: "Connects what you already pay for, rather than replacing it." },
      { icon: BookOpen, title: "A clear audit trail", description: "Every decision and approval is recorded automatically." },
    ],
  },
  "website-development": {
    title: "Every detail that makes a site work harder",
    tiles: [
      { icon: PenTool, title: "Publish without a developer", description: "Your team can edit pages and launch campaigns from a simple, well-organized editor.", widget: { kind: "list", title: "Recent pages", cursor: "You", rows: [{ name: "Spring campaign", note: "Edited today", action: "Publish" }, { name: "About the team", note: "Live", action: "Edit" }] } },
      { icon: MousePointerClick, title: "Designed to convert", description: "Clear structure and well-placed next steps guide each visitor towards getting in touch.", image: "/services/website.jpg", widget: { kind: "events", event: { title: "New enquiry received", time: "10:18 AM" }, card: { title: "Lead captured", time: "10:18 AM", rows: [["Source", "Pricing page"], ["Interest", "Website redesign"], ["Sent to", "Sales inbox"]] } } },
      { icon: Gauge, title: "Fast, and easy to find", description: "Optimized images, clean code and sound technical SEO are part of every build.", widget: { kind: "checklist", title: "Launch checks", items: [["Performance", "Passed"], ["Search setup", "Passed"], ["Accessibility", "Passed"]] } },
    ],
    benefitsTitle: "Benefits of a well-made website",
    benefitsLead: "Often your first impression, so it should be your best one.",
    benefits: [
      { icon: Sparkles, title: "A stronger first impression", description: "A polished site builds trust before anyone speaks to you." },
      { icon: Search, title: "Easier to discover", description: "Sound foundations help the right people find you in search." },
      { icon: Smartphone, title: "Great on every screen", description: "Layouts adapt properly, from phones to large displays." },
      { icon: Palette, title: "Unmistakably yours", description: "Custom design that reflects your brand rather than a template." },
      { icon: Accessibility, title: "Open to everyone", description: "Accessible by design, so more people can use it comfortably." },
    ],
  },
  "saas-development": {
    title: "The foundations every subscription product needs",
    tiles: [
      { icon: Users, title: "Ready for business customers", description: "Workspaces, invites and roles let whole teams adopt your product with confidence.", widget: { kind: "list", title: "Workspace members", cursor: "You", rows: [{ name: "Maya Rao", note: "Owner", action: "Manage" }, { name: "Tom Ellis", note: "Invited", action: "Resend" }] } },
      { icon: Wallet, title: "Billing that takes care of itself", description: "Plans, trials, invoices and upgrades run automatically, so revenue is never held up.", image: "/services/online-payment.jpg", widget: { kind: "events", event: { title: "Customer upgraded", time: "1:36 PM" }, card: { title: "Subscription updated", time: "1:36 PM", rows: [["Plan", "Growth"], ["Invoice", "Sent"], ["Seats", "Added"]] } } },
      { icon: Layers, title: "Separate by design", description: "Each customer's data stays isolated, and every account shares one easy-to-update product.", widget: { kind: "code", lines: ["export const projects = tenantTable({", "  name: text(),", "  ownerId: user(),", "});", "", "// Every query is scoped automatically", "projects.list({ tenant: account.id });"], highlight: 6, tooltip: "Only this customer's data" } },
    ],
    benefitsTitle: "Benefits of building it properly",
    benefitsLead: "The groundwork that lets you focus on your customers.",
    benefits: [
      { icon: Rocket, title: "Quicker to market", description: "A focused first version gets you learning from real users early." },
      { icon: Coins, title: "Predictable revenue", description: "Subscriptions and upgrades work smoothly from day one." },
      { icon: Maximize2, title: "Scales with each account", description: "Foundations are ready for your hundredth customer, not just your first." },
      { icon: KeyRound, title: "Business-ready security", description: "Roles and single sign-on help you pass customer reviews." },
      { icon: LineChart, title: "Clear product insight", description: "Usage data shows what's working and what to build next." },
    ],
  },
  "enterprise-software-development": {
    title: "Serious systems, built to stay dependable",
    tiles: [
      { icon: Compass, title: "Modernize in safe stages", description: "We replace ageing systems step by step, with old and new running side by side.", widget: { kind: "checklist", title: "Migration plan", items: [["Customer records", "Complete"], ["Billing service", "Running in parallel"], ["Reporting", "Scheduled"]] } },
      { icon: Cloud, title: "Infrastructure that holds up", description: "Monitored, recoverable cloud environments keep critical services available for your people.", image: "/services/server-room.jpg", widget: { kind: "events", event: { title: "Traffic spike detected", time: "6:02 PM" }, card: { title: "Capacity adjusted", time: "6:02 PM", rows: [["Region", "Mumbai"], ["Action", "Scaled up"], ["Service", "Healthy"]] } } },
      { icon: KeyRound, title: "Access you can audit", description: "Permissions follow your organization's structure, and every sensitive action is recorded.", widget: { kind: "list", title: "Access requests", cursor: "Admin", rows: [{ name: "Finance reports", note: "Regional manager", action: "Approve" }, { name: "Customer data", note: "Support lead", action: "Review" }] } },
    ],
    benefitsTitle: "Benefits for your organization",
    benefitsLead: "Change that doesn't put day-to-day operations at risk.",
    benefits: [
      { icon: ShieldCheck, title: "Lower operational risk", description: "Staged rollouts mean the business keeps running throughout." },
      { icon: Puzzle, title: "Fits what you already run", description: "New systems integrate with your existing platforms and data." },
      { icon: Lock, title: "Security built in", description: "Access controls and audit logs are there from the start." },
      { icon: Database, title: "One source of truth", description: "Departments work from the same, reliable information." },
      { icon: Handshake, title: "Long-term partnership", description: "We document everything and support your teams after launch." },
    ],
  },
  "custom-software-development": {
    title: "Exactly the tool your team has been missing",
    tiles: [
      { icon: Compass, title: "We start with your problem", description: "Workshops and a clickable prototype confirm the idea before you commit to the full build.", widget: { kind: "checklist", title: "Discovery", items: [["Team interviews", "Done"], ["Clickable prototype", "Done"], ["User testing", "In progress"]] } },
      { icon: Users, title: "Built around daily work", description: "Screens follow how your team actually operates, so adoption comes naturally.", image: "/portfolio/photos/team.jpg", widget: { kind: "events", event: { title: "Spreadsheet imported", time: "9:47 AM" }, card: { title: "Moved to the new tool", time: "9:47 AM", rows: [["Records", "Imported"], ["Duplicates", "Removed"], ["Team", "Notified"]] } } },
      { icon: Code2, title: "Yours to own and extend", description: "You receive the code, the documentation and a clean API your developers can build on.", widget: { kind: "code", lines: ["// Your code, your repository", "api.get(\"/stock/:sku\", async (req) => {", "  const item = await stock.find(req.sku);", "  return { item, updatedAt: now() };", "});"], highlight: 0, tooltip: "Handed over in full" } },
    ],
    benefitsTitle: "Benefits of custom software",
    benefitsLead: "Pay for what you need, and own what you build.",
    benefits: [
      { icon: Target, title: "Fits your process", description: "No workarounds, and no features you'll never touch." },
      { icon: Handshake, title: "No vendor lock-in", description: "The code is yours, so you decide what happens to it." },
      { icon: Brain, title: "Your edge stays yours", description: "Your way of working becomes an asset competitors can't buy." },
      { icon: Plug, title: "Connects cleanly", description: "Integrates with the systems and partners you depend on." },
      { icon: Coins, title: "No per-seat surprises", description: "Add people without licence costs rising with every hire." },
    ],
  },
};
