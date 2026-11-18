import { IndustryItem } from "@/types";

// The Industries section on the home page, and its menu in the navbar, both read from here.
export const INDUSTRIES_CONTENT: { eyebrow: string; title: string; lead: string; items: IndustryItem[] } = {
  eyebrow: "Our expertise",
  title: "Industries",
  lead: "Intelligent technology, engineered around the complexities of your industry.",
  items: [
    {
      id: "healthcare",
      label: "Healthcare",
      name: "Healthcare & Medicine",
      shortName: "Healthcare",
      subhead: "Technology that works around the realities of healthcare.",
      paragraphs: [
        "Healthcare is evolving through intelligent technology, automation, and AI-driven innovation. Healthcare providers need systems that simplify complex operations, improve decision-making, and make essential services more efficient and accessible.",
        "We build AI-powered healthcare applications, intelligent automation systems, medical technology platforms, and connected digital solutions that streamline workflows, enhance operational efficiency, and enable smarter, faster, and more effective healthcare delivery.",
      ],
      capabilities: ["Healthcare Applications", "Medical OCR", "Patient Platforms", "Clinical Data Systems"],
      prompt: "Build a patient platform with appointments, reports and real-time updates.",
    },
    {
      id: "fintech-insurance",
      label: "Financial Services",
      name: "Fintech & Insurance",
      shortName: "Fintech & Insurance",
      subhead: "Making financial operations faster, more connected, and more accountable.",
      paragraphs: [
        "Financial institutions manage complex transactions, customer interactions, and data-intensive operations. They need reliable digital systems that simplify processes, strengthen operational efficiency, and deliver seamless customer experiences.",
        "We build intelligent financial applications, customer-facing digital platforms, automated document verification systems, payment integrations, and connected data systems that improve accuracy, streamline operations, and make financial services more accessible and efficient.",
      ],
      capabilities: ["Financial Applications", "Document Verification", "Payment Systems", "Policy Workflows"],
      prompt: "Verify claim documents and route each policy to the right reviewer.",
    },
    {
      id: "forex-trading",
      label: "Trading",
      name: "Forex & Trading",
      shortName: "Forex & Trading",
      subhead: "When markets move in milliseconds, the infrastructure matters.",
      paragraphs: [
        "Trading environments depend on continuous market data, accurate calculations, responsive interfaces, and dependable execution systems. Every price tick matters when positions move in seconds. Delays, inconsistent feeds, and poor visibility can affect critical trading operations.",
        "We engineer market-data pipelines, trading dashboards, analytical models, risk and exposure alerts, automated monitoring and reconciliation, and software integrations designed around the demands of financial trading environments.",
      ],
      capabilities: ["Market Data Engineering", "Trading Analytics", "Monitoring Systems", "Predictive Modelling"],
      prompt: "Stream live market data into a dashboard with alerts on unusual moves.",
    },
    {
      id: "emotional-wellbeing",
      label: "Emotional Wellbeing",
      name: "Emotional Wellbeing",
      shortName: "Emotional Wellbeing",
      subhead: "Digital experiences built around people, not just screens.",
      paragraphs: [
        "Wellbeing platforms require a different approach to technology. People often arrive at sensitive moments, so every detail has to build comfort and trust. Conversations must feel natural, interactions must be thoughtful, and personalization must respect the individual using the platform.",
        "We create conversational applications, personalized engagement experiences, digital wellbeing platforms, mood and habit tracking tools, and context-aware interfaces that make technology more accessible and human-centred.",
      ],
      capabilities: ["Conversational Experiences", "NLP", "Personalization", "Mobile Platforms"],
      prompt: "Create a gentle daily check-in that adapts to how each person feels.",
    },
    {
      id: "manufacturing",
      label: "Manufacturing",
      name: "Manufacturing",
      shortName: "Manufacturing",
      subhead: "Precision on the production floor. Visibility across the operation.",
      paragraphs: [
        "Production environments cannot afford avoidable downtime, inconsistent quality checks, or operational blind spots. Manufacturers need better visibility into equipment, production processes, and quality at every stage.",
        "We build industrial software, intelligent automation platforms, production management applications, equipment monitoring systems, predictive analytics solutions, and integrated data platforms that optimize workflows, improve operational control, and drive smarter, more efficient manufacturing.",
      ],
      capabilities: ["Visual Inspection", "Predictive Maintenance", "Production Monitoring", "Industrial Analytics"],
      prompt: "Flag defects on the line and predict which machine needs service next.",
    },
    {
      id: "customer-support",
      label: "Customer Experience",
      name: "Customer Support",
      shortName: "Customer Support",
      subhead: "Every customer interaction should move the conversation forward.",
      paragraphs: [
        "Support teams spend considerable time answering repeated questions, following up on enquiries, qualifying leads, and managing requests across multiple channels. Customers expect fast, accurate answers at any hour. Scaling this operation should not mean compromising response quality.",
        "We build conversational chatbots, WhatsApp workflows, voice calling agents, lead qualification flows, and CRM-connected support systems that handle routine interactions while allowing complex requests to reach the right people.",
      ],
      capabilities: ["Voice Agents", "WhatsApp Workflows", "Conversational Systems", "CRM Integration"],
      prompt: "Answer routine WhatsApp questions and hand complex ones to the team.",
    },
    {
      id: "business-operations",
      label: "Operations",
      name: "Business Operations",
      shortName: "Business Operations",
      subhead: "Fewer disconnected processes. Better control over the way work gets done.",
      paragraphs: [
        "Behind every growing business are approvals, reports, invoices, employee workflows, and information moving between different systems. Each handoff that depends on email or spreadsheets adds delay and room for error. When these processes rely heavily on manual coordination, productivity becomes difficult to sustain.",
        "We connect business applications, automate multi-step processes, develop internal platforms, and build reporting systems that give teams a more consistent way to manage day-to-day operations.",
      ],
      capabilities: ["Enterprise Integrations", "Process Automation", "Internal Platforms", "Business Intelligence"],
      prompt: "Automate invoice approvals and send a weekly report to every team lead.",
    },
  ],
};
