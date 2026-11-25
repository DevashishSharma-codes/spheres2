export interface EmpiricalMetric {
  label: string;
  value: string;
  delta?: string;
  context?: string;
}

export interface ArchitectureBlueprint {
  topology: string[];
  benchmarks: { metric: string; score: string; note: string }[];
  timeline: string;
  securityProfile: string;
}

export interface DetailedCaseStudy {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  /** The project's tags as written in the case study, e.g. "Healthcare AI". */
  category: string;
  /** Used for the filter tabs. */
  discipline: string;
  featured: boolean;
  /** The one-line tagline. */
  headline: string;
  /** The short paragraph under the tagline. */
  summary: string;
  brief: {
    /** The full brief. Paragraphs are separated by a blank line. */
    problemStatement: string;
    legacyBottleneck?: string;
    missionScope?: string;
  };
  technology: {
    architecturePattern?: string;
    stack: string[];
    infrastructure?: string;
  };
  whatChanged: {
    /** The full "What changed" text. Paragraphs are separated by a blank line. */
    empiricalOutcome: string;
    businessImpact?: string;
    metrics: EmpiricalMetric[];
  };
  image: string;
  cardImage: string;
  /** CSS object-position for the card crop. Defaults to centered. */
  cardImagePosition?: string;
  blueprint?: ArchitectureBlueprint;
}

export const DISCIPLINE_TABS = [
  { id: "all", label: "All work" },
  { id: "ai-agents", label: "Autonomous AI & Agents" },
  { id: "fintech", label: "Fintech & WealthTech" },
  { id: "insurtech", label: "InsurTech & Cloud Platforms" },
  { id: "digital-products", label: "Digital Products & Platforms" },
];

/* Content below is taken from public/portfolio/Case Studies.docx. */
export const PORTFOLIO_CASE_STUDIES: DetailedCaseStudy[] = [
  {
    id: "the-repertory",
    index: "01 / KNOWLEDGE",
    title: "The Repertory",
    client: "The Repertory",
    year: "2025",
    category: "Healthcare Technology · AI & Knowledge Systems",
    discipline: "Autonomous AI & Agents",
    featured: false,
    headline: "Centuries of Homeopathic Knowledge. One Intelligent Digital Experience.",
    summary:
      "A structured digital homeopathic repertory designed to transform traditional medical literature into an organized, searchable knowledge system, connecting symptoms, rubrics, remedies, and clinical references.",
    brief: {
      problemStatement:
        "Traditional homeopathic repertories contain extensive medical knowledge distributed across books, editions, and fragmented digital resources. Finding relevant rubrics, understanding symptom hierarchies, and identifying associated remedies often requires extensive manual navigation.\n\nThe challenge was to transform this unstructured, historically documented knowledge into a consistent digital database while preserving the relationships and hierarchy essential to repertory-based research.",
    },
    technology: {
      stack: ["Python", "MongoDB", "FastAPI", "React", "TypeScript", "NLP", "Semantic Search", "JSON Data Processing"],
    },
    whatChanged: {
      empiricalOutcome:
        "We approached the problem by developing a structured repertory data system that organizes medical knowledge into searchable chapters, rubrics, sub-rubrics, and remedy associations.\n\nThe solution focuses on digitizing repertory content, maintaining hierarchical relationships, standardizing remedy references, and enabling efficient retrieval through structured data and intelligent search capabilities.\n\nThe result is a foundation for a modern digital repertory experience, making extensive homeopathic literature more accessible, navigable, and integration-ready.",
      metrics: [
        { label: "Data points of Repertory Data", value: "1 Crore+", context: "Organized chapter and rubric hierarchy" },
        { label: "Repertories Rubric–Remedy Mapping", value: "15+", context: "Structured symptom-to-remedy relationships" },
        { label: "Digital Knowledge search latency", value: "<50 ms", context: "Accessible, query-ready medical references" },
      ],
    },
    image: "/portfolio/case-studies/the-repertory.webp",
    cardImage: "/portfolio/case-studies/the-repertory-card.webp",
  },
  {
    id: "hahnemann-ai",
    index: "02 / CLINICAL AI",
    title: "Hahnemann AI",
    client: "Hahnemann AI",
    year: "2025",
    category: "Healthcare AI",
    discipline: "Autonomous AI & Agents",
    featured: false,
    headline: "Intelligent Medical Reasoning. Faster Clinical Insights.",
    summary:
      "An AI-powered medical reasoning platform designed to transform how physicians navigate complex clinical repertories, correlate patient symptoms, and retrieve evidence-backed medical references.",
    brief: {
      problemStatement:
        "Physicians traditionally spend considerable time manually navigating physical medical repertories and fragmented research literature to identify symptom correlations and relevant clinical references. This fragmented workflow increases research time, complicates information retrieval, and makes cross-referencing large medical knowledge bases inefficient.",
    },
    technology: {
      stack: ["Python", "FastAPI", "RAG", "VectorDB", "LLM Fine-Tuning", "React", "TypeScript", "Tailwind CSS"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered Hahnemann AI, an intelligent medical reasoning platform that combines deterministic reasoning with hybrid semantic and lexical retrieval. The system digitizes and indexes 450+ clinical repertories and materia medica written in 1800s, enabling physicians to retrieve relevant medical references, correlate symptoms, and access traceable rubric citations in milliseconds.\n\nThe platform reduces manual cross-referencing time from approximately 25 minutes to under 360 seconds per case, with a reported 99.4% citation accuracy.",
      metrics: [
        { label: "Pages of Medical Repertories", value: "1,00,000+", context: "Digitized and indexed clinical knowledge" },
        { label: "Retrieval Latency", value: "<180ms", context: "Hybrid semantic and lexical search" },
        { label: "Citation Accuracy", value: "99.4%", context: "Verifiable rubric citations" },
      ],
    },
    image: "/portfolio/case-studies/hahnemann-ai.webp",
    cardImage: "/portfolio/case-studies/hahnemann-ai-card.webp",
  },
  {
    id: "enspire-device-service-chatbot",
    index: "03 / SUPPORT AI",
    title: "Enspire",
    client: "Enspire",
    year: "2025",
    category: "Conversational AI · WhatsApp Automation",
    discipline: "Autonomous AI & Agents",
    featured: false,
    headline: "After-Sales Service, Reimagined Through WhatsApp.",
    summary:
      "A WhatsApp-powered customer service solution designed to simplify product identification, warranty management, installation scheduling, and customer engagement for Enspire's consumer electronics ecosystem.",
    brief: {
      problemStatement:
        "Enspire needed a centralized customer engagement channel to simplify after-sales operations. Customers required a convenient way to identify registered products, access warranty information, schedule installations, and initiate warranty claims without lengthy manual support processes.",
    },
    technology: {
      stack: ["WhatsApp Business API", "IFTTT", "Node.js", "Barcode Recognition", "Google Sheets API", "Structured Data Retrieval"],
    },
    whatChanged: {
      empiricalOutcome:
        "We developed an intelligent WhatsApp chatbot that automated critical after-sales workflows, transforming customer support into a seamless, self-service experience.\n\nThe solution introduced automated barcode scanning for product identification, streamlined installation scheduling, instant warranty claim initiation, and extended warranty purchase workflows.",
      metrics: [
        { label: "Installation Scheduling", value: "<1 Min", context: "Automated barcode reading and product identification" },
        { label: "Warranty Claim Initiation", value: "<90 Sec", context: "Streamlined, automated warranty claim workflow" },
        { label: "Customer Accessibility", value: "24/7", context: "Always-on WhatsApp-based customer support" },
      ],
    },
    image: "/portfolio/case-studies/enspire.webp",
    cardImage: "/portfolio/case-studies/enspire-card.webp",
  },
  {
    id: "wealth-wisdom-goals-planner",
    index: "04 / FINTECH",
    title: "Wealth Wisdom",
    client: "Wealth Wisdom",
    year: "2026",
    category: "FinTech · Financial Planning · Intelligent Automation",
    discipline: "Fintech & WealthTech",
    featured: true,
    headline: "Turning Financial Data into Financial Futures.",
    summary:
      "An intelligent financial planning and report generation platform that transforms complex client financial profiles into personalized financial roadmaps, enabling financial advisors to deliver planning at scale and drive informed investment decisions.",
    brief: {
      problemStatement:
        "Traditional financial planning involves extensive data collection, financial calculations, personalized recommendations, and preparation of detailed client reports. Creating these reports manually is time-consuming and limits the ability of financial advisors to serve clients at scale.\n\nWealth Wisdom needed a scalable solution to automate personalized financial planning reports while maintaining detailed financial analysis, consistent presentation, and actionable investment recommendations.",
    },
    technology: {
      stack: ["Python", "FastAPI", "Pydantic", "ReportLab", "PyPDF", "Matplotlib", "Pillow", "JSON-Driven Architecture", "PDF Automation"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered a dynamic financial planning and report generation engine that transforms structured client data into comprehensive, personalized financial reports. The platform automates financial calculations, goal-based planning, retirement projections, insurance analysis, education planning, and investment recommendations. Using a JSON-driven architecture, it dynamically generates professionally designed PDF reports with personalized sections, financial charts, tables, and visual roadmaps. By converting a manually intensive reporting process into an automated financial planning ecosystem, the platform has enabled the generation of over 1,00,000 reports, supported more than ₹14 crore in investments, and facilitated financial planning exceeding ₹213 crore.",
      metrics: [
        { label: "Reports Generated", value: "1,00,000+", context: "Personalized financial reports delivered" },
        { label: "Investments Made", value: "₹14 Cr+", context: "Investments facilitated through generated reports" },
        { label: "Financial Planning", value: "₹213 Cr+", context: "Total value of financial planning enabled" },
      ],
    },
    image: "/portfolio/case-studies/wealth-wisdom.webp",
    cardImage: "/portfolio/case-studies/wealth-wisdom-card.webp",
  },
  {
    id: "bimakart-insurance-quote-bot",
    index: "05 / QUOTE BOT",
    title: "Bimakart Quotation Bot",
    client: "Bimakart",
    year: "2025",
    category: "InsurTech · Intelligent Automation",
    discipline: "InsurTech & Cloud Platforms",
    featured: false,
    headline: "From Hours to Minutes. Insurance Quotations at Scale.",
    summary:
      "An intelligent quotation automation solution designed to streamline insurance quotation generation across multiple insurer portals, reducing manual processing and accelerating customer response times.",
    brief: {
      problemStatement:
        "Generating insurance quotations across multiple insurer portals involved repetitive data entry, manual navigation, and time-consuming retrieval processes. This resulted in longer customer wait times, operational bottlenecks, and missed opportunities for timely conversions.\n\nBimakart needed an automated solution to simplify multi-insurer quotation generation and help its sales team respond to customers faster.",
    },
    technology: {
      stack: ["Python", "Browser Automation", "Web Scraping", "Workflow Automation", "Data Processing", "API Integration"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered an automated quotation retrieval system that interacts with insurer portals, processes customer and vehicle information, and retrieves insurance quotations with minimal manual intervention.\n\nBy automating repetitive portal interactions and consolidating quotation workflows, the solution transformed the customer quotation journey.",
      metrics: [
        { label: "Quotation Turnaround", value: "8 hrs → 5 min", context: "Faster customer quotation delivery" },
        { label: "Sales Conversion", value: "+27%", context: "Improvement in sales conversion rate" },
        { label: "Target Insurers", value: "8+", context: "Expanded multi-insurer integration scope" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-quotation-bot.webp",
    cardImage: "/portfolio/case-studies/bimakart-quotation-bot-card.webp",
  },
  {
    id: "insurance-ocr",
    index: "06 / DOCUMENT AI",
    title: "Bimakart Fraud Detection",
    client: "Bimakart",
    year: "2026",
    category: "InsurTech · AI · Document Forensics",
    discipline: "InsurTech & Cloud Platforms",
    featured: true,
    headline: "Detect Fraud Before It Passes. Protect Every Policy.",
    summary:
      "An AI-powered PDF forensic detection system designed to identify manipulated insurance documents, prevent fraudulent submissions, and protect insurers from financial losses.",
    brief: {
      problemStatement:
        "Manipulated insurance policy documents pose a significant financial and operational risk to insurers. Altered policy details, modified values, and sophisticated PDF manipulations can make fraudulent documents appear legitimate, potentially resulting in invalid claims, financial losses, and compromised insurance operations.\n\nBimakart needed an intelligent verification mechanism capable of identifying document tampering and flagging fraudulent submissions before they could pass through the verification process.",
    },
    technology: {
      stack: ["Python", "PyMuPDF", "pikepdf", "OpenCV", "Pillow", "PDF Forensics", "Image Processing", "FastAPI"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered an AI-powered PDF forensic detection module that examines insurance documents for signs of unauthorized modifications. Combining PDF metadata analysis, structural integrity checks, revision history inspection, and image-level forensic techniques, the system identifies suspicious alterations and flags potentially manipulated documents for verification. Integrated into the insurance workflow, the solution helped prevent more than 10,000 fraudulent documents from passing verification, protecting insurers from estimated financial exposure exceeding ₹70 lakh.",
      metrics: [
        { label: "Fraudulent Documents Prevented", value: "10,000+", context: "Suspicious documents stopped before passing verification" },
        { label: "Financial Losses Avoided", value: "₹70,00,000+", context: "Estimated financial exposure prevented" },
        { label: "Document Verification", value: "Automated", context: "AI-powered PDF forensic analysis" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-fraud-detection.webp",
    cardImage: "/portfolio/case-studies/bimakart-fraud-detection-card.webp",
  },
  {
    id: "bimakart-connect",
    index: "07 / GATEWAY",
    title: "Bimakart Connect",
    client: "Bimakart",
    year: "2026",
    category: "InsurTech · Digital Insurance · Mobile Application",
    discipline: "InsurTech & Cloud Platforms",
    featured: true,
    headline: "A Million Insurance Journeys. One Connected Platform.",
    summary:
      "A comprehensive digital insurance ecosystem available on Android and iOS, bringing policy management, claims, self-inspection, insurance purchases, and customer engagement together in one seamless experience.",
    brief: {
      problemStatement:
        "Managing insurance policies, accessing coverage details, tracking claims, and navigating multiple insurance services can be fragmented and time-consuming. Bimakart envisioned a unified digital platform that could simplify the insurance journey for customers while providing the business with centralized operational control, scalable infrastructure, and seamless integration with its existing enterprise systems.",
    },
    technology: {
      stack: ["Flutter", "Node.js", "MongoDB", "Salesforce Integration", "OCR", "AI Integration", "REST APIs", "Firebase", "Cloud Infrastructure", "DLT Integration"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered Bimakart Connect as a cross-platform insurance ecosystem, serving 1,00,000+ users across Android and iOS. Powered by a Node.js backend and integrated with Salesforce, the platform connects customer-facing mobile experiences with enterprise data and operational workflows. Users can manage insurance policies, extract policy information through OCR, initiate and track claims, perform geotagged vehicle self-inspections, purchase insurance, and access AI-powered assistance. Supporting this ecosystem is an exhaustive administrative panel providing centralized control over users, policies, transactions, claims, operations, and business activities, enabling the organization to manage its growing digital insurance ecosystem efficiently.",
      metrics: [
        { label: "Users", value: "1,00,000+", context: "Growing digital user base" },
        { label: "Mobile Platforms", value: "Android · iOS", context: "Android and iOS" },
        { label: "Operational Control", value: "360°", context: "Centralized admin panel and Salesforce-connected operations" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-connect.webp",
    cardImage: "/portfolio/case-studies/bimakart-connect-card.webp",
  },
  {
    id: "bimakart-product-suit",
    index: "08 / PRODUCT SUITE",
    title: "Bimakart Product Suite",
    client: "Bimakart",
    year: "2026",
    category: "InsurTech · Enterprise SaaS · Insurance Distribution",
    discipline: "InsurTech & Cloud Platforms",
    featured: false,
    headline: "From Insurance Product Creation to Policy Issuance. One Connected Platform.",
    summary:
      "A comprehensive insurance product creation and distribution platform enabling businesses to configure bundled insurance products, manage sales channels, empower POS agents, and control the complete journey from customer onboarding to payment, invoicing, and policy issuance.",
    brief: {
      problemStatement:
        "Insurance businesses often rely on fragmented systems to manage product creation, distribution, agent operations, payment collection, and policy issuance. Bimakart needed a unified platform that could bring these operations together while maintaining strict administrative control, structured approval workflows, and visibility across multiple sales channels.",
    },
    technology: {
      stack: ["React", "Node.js", "MongoDB", "REST APIs", "Payment Gateway Integration", "RBAC", "Cloud Infrastructure", "Email Integration", "WhatsApp integration", "Salesforce", "Python", "Grafana"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered an end-to-end insurance product creation and selling ecosystem that connects product configuration, distribution, transactions, and policy management through a centralized platform. The system introduced maker-checker approval workflows for product governance, dedicated POS agent capabilities for insurance sales, integrated payment gateway processing, automated invoice generation, and policy issuance. With fully configurable role-based access control (RBAC), granular administrative permissions, and channel-level management, the platform gives administrators complete control over product availability, distribution, and operations. Detailed sales dashboards provide visibility into product performance, channel activity, agent contributions, and revenue.",
      metrics: [
        { label: "Insurance Lifecycle", value: "End-to-End", context: "From product creation to policy issuance" },
        { label: "Product Governance", value: "Maker-Checker", context: "Structured approval and administrative control" },
        { label: "Sales Visibility", value: "360°", context: "Product, channel, agent and revenue analytics" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-product-suite.webp",
    cardImage: "/portfolio/case-studies/bimakart-product-suite-card.webp",
  },
  {
    id: "bimakart-flyer-ocr",
    index: "09 / DOCUMENT AI",
    title: "Bimakart OCR AI Automation Suite",
    client: "Bimakart",
    year: "2026",
    category: "Artificial Intelligence · OCR · Multimodal AI",
    discipline: "InsurTech & Cloud Platforms",
    featured: false,
    headline: "From Documents to Intelligence. From Flyers to Content. In Seconds.",
    summary:
      "An AI-powered automation suite combining intelligent document extraction and multimodal content generation to accelerate insurance operations and eliminate repetitive manual processing.",
    brief: {
      problemStatement:
        "Insurance operations involve processing large volumes of policy documents and customer information, while creating standardized product descriptions from promotional flyers requires additional manual effort. These processes were time-consuming, prone to human errors, and difficult to scale efficiently.\n\nBimakart needed an intelligent automation solution to accelerate document processing, improve extraction accuracy, and simplify insurance product content creation.",
    },
    technology: {
      stack: ["Python", "FastAPI", "OCR", "Computer Vision", "Multimodal AI", "Large Language Models", "Prompt Engineering", "REST APIs"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered an integrated AI automation suite combining OCR-powered document intelligence with multimodal generative AI. The policy processing engine extracts and structures information from insurance documents, reducing processing time per policy from 5 minutes to just 2 seconds while bringing the error rate down to just 5% of its previous level. Complementing this, the Flyer-to-Description engine interprets promotional flyers, identifies product information, and generates structured descriptions in the required format, reducing content generation time from 20 minutes to just 3 seconds. Together, both solutions transform document-heavy manual workflows into high-speed, intelligent automation pipelines.",
      metrics: [
        { label: "Policy Processing", value: "5 min → 2 sec", context: "Processing time per policy" },
        { label: "Previous Error Rate", value: "95% Reduction", context: "Reduction in errors compared with the previous workflow" },
        { label: "Description Generation", value: "20 min → 3 sec", context: "Flyer-to-description turnaround time" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-ocr-suite.webp",
    cardImage: "/portfolio/case-studies/bimakart-ocr-suite-card.webp",
  },
  {
    id: "bimakart-centre",
    index: "10 / OPERATIONS",
    title: "Bimakart Center",
    client: "Bimakart",
    year: "2026",
    category: "InsurTech · Enterprise SaaS · Business Operations",
    discipline: "InsurTech & Cloud Platforms",
    featured: false,
    headline: "Empowering 8,000+ Agents Through One Connected Business Platform.",
    summary:
      "A comprehensive digital business and operations platform built to empower insurance POS agents, streamline business workflows, and manage a large-scale distribution ecosystem through centralized administration.",
    brief: {
      problemStatement:
        "Managing a growing network of insurance POS agents requires more than basic business management tools. Organizations need centralized operational control, granular access permissions, streamlined workflows, and visibility across business activities.\n\nBimakart needed a scalable platform capable of supporting thousands of agents while accommodating diverse operational requirements, multiple business modules, and complex organizational hierarchies.",
    },
    technology: {
      stack: ["Laravel", "PHP", "MySQL", "Flutter", "REST APIs", "Hierarchical RBAC", "Cloud Infrastructure"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered Bimakart Center as a centralized, multi-module business management ecosystem supporting 8,000+ insurance agents and 52+ functional modules. The platform incorporates a hierarchical Role-Based Access Control (RBAC) architecture with 15+ role levels, enabling granular permissions and structured access across organizational hierarchies. Its modular architecture brings diverse business and operational workflows into one connected platform, while centralized administration provides greater control over users, permissions, and business activities. The result is a scalable digital infrastructure designed to manage a growing insurance distribution network with operational consistency and governance.",
      metrics: [
        { label: "Active Agents", value: "8,000+", context: "Large-scale insurance distribution network" },
        { label: "Functional Modules", value: "52+", context: "Unified business and operational capabilities" },
        { label: "RBAC Role Levels", value: "15+", context: "Hierarchical access control and permissions" },
      ],
    },
    image: "/portfolio/case-studies/bimakart-center.webp",
    cardImage: "/portfolio/case-studies/bimakart-center-card.webp",
  },
  {
    id: "wtmf-ai-emotional-wellness",
    index: "11 / WELLBEING",
    title: "WTMF.ai",
    client: "WTMF.ai",
    year: "2025",
    category: "AI · Mental Wellness · Multilingual Conversational AI",
    discipline: "Digital Products & Platforms",
    featured: false,
    headline: "Your AI Friend. Your Space. No Fear of Being Judged.",
    summary:
      "An AI-powered mental wellness companion offering 33+ unique AI personas, designed to create a safe, judgment-free space where people can express themselves, share their thoughts, and feel heard in their own language.",
    brief: {
      problemStatement:
        "Talking about personal struggles, emotions, and everyday challenges isn't always easy. Fear of judgment, social stigma, and the lack of accessible emotional support often prevent people from expressing what they truly feel.\n\nThe challenge was to build an AI companion that goes beyond conventional chatbot interactions—one that offers diverse personalities, relatable conversations, and the freedom to express oneself without fear of judgment.",
    },
    technology: {
      stack: ["LLMs", "Generative AI", "Persona-Based AI Architecture", "NLP", "Multilingual AI", "Voice AI", "Contextual Memory", "Python", "API Integrations"],
    },
    whatChanged: {
      empiricalOutcome:
        "We developed WTMF.ai, a personalized AI companion platform built around emotional expression and mental wellness.\n\nThe platform features 33+ distinct AI personas, each available in male and female variants, allowing users to connect with a personality that feels comfortable and relatable.\n\nWith support for 12+ languages, users can communicate naturally in the language they feel most comfortable with. The experience brings together personalized AI conversations and voice interactions, creating an accessible space to vent, reflect, share personal experiences, and navigate everyday emotional challenges.\n\nWTMF.ai transforms the traditional chatbot experience into a more personal, inclusive, and approachable AI friendship.",
      metrics: [
        { label: "AI Personas", value: "33+", context: "Distinct conversational personalities" },
        { label: "Languages", value: "12+", context: "Multilingual interactions" },
        { label: "Persona Variants", value: "2", context: "Male and female versions of each persona" },
      ],
    },
    image: "/portfolio/case-studies/wtmf.webp",
    cardImage: "/portfolio/case-studies/wtmf-card.webp",
  },
  {
    id: "futureogy",
    index: "12 / PLATFORM",
    title: "Futureogy",
    client: "Futureogy",
    year: "2026",
    category: "AstroTech · AI · Relationship Wellness · Live Consultations",
    discipline: "Digital Products & Platforms",
    featured: false,
    headline: "More Than Astrology. An Entire Digital Universe of Personalized Guidance.",
    summary:
      "A next-generation AstroTech ecosystem combining AI-powered astrology, real expert consultations, relationship counselling, personalized spiritual services, and intelligent wellness experiences within one connected digital platform.",
    brief: {
      problemStatement:
        "Traditional astrology, relationship counselling, and spiritual services are fragmented across different platforms. Users often need separate services to consult astrologers, explore compatibility, seek relationship guidance, access personalized remedies, and receive spiritual assistance.\n\nFutureogy envisioned a unified ecosystem that brings traditional astrological expertise, AI-driven personalization, and human-led wellness services together, making personalized guidance accessible through a seamless digital experience.",
    },
    technology: {
      stack: ["Flutter", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Socket.IO", "Next.js", "AWS ECS", "AWS CDK", "WebRTC", "Cashfree", "Razorpay"],
    },
    whatChanged: {
      empiricalOutcome:
        "We engineered Futureogy as a comprehensive digital ecosystem comprising dedicated User and Expert applications for Android and iOS, a web platform, an extensive administrative command center, and a scalable cloud backend. Users can discover and consult real astrologers through one-to-one in-app chat, voice calls, and live video consultations, powered by real-time communication and per-minute wallet-based billing. The platform combines AI-generated astrological predictions, automated horoscope and Love Report generation, numerology, matchmaking, and a dedicated Love Guru module connecting users with relationship counsellors. Going beyond conventional astrology experiences, Futureogy also brings personalized remedies, poojas, spells, and healing services into the same ecosystem through live expert interactions. The Expert application enables astrologers to manage availability, consultations, and earnings, while the extensive administrative infrastructure provides centralized control over users, experts, transactions, payouts, refunds, service catalogues, and operational workflows. With real-time consultation monitoring, abuse prevention across chat and calls, and comprehensive financial oversight, the platform is supported by an enterprise-grade backend comprising 38 modules, 470+ REST API endpoints, and production AWS infrastructure.",
      metrics: [
        { label: "API Endpoints", value: "470+", context: "Powering interconnected platform services" },
        { label: "Admin Screens", value: "210+", context: "Comprehensive administrative and operational interfaces" },
        { label: "Integrated Builds", value: "6", context: "Backend, Admin, User App, Expert App, Website and AWS Platform" },
      ],
    },
    image: "/portfolio/case-studies/futureogy.webp",
    cardImage: "/portfolio/case-studies/futureogy-card.webp",
  },
];
