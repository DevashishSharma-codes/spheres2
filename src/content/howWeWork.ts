import { WorkStepItem } from "@/types";

// The How We Work section on the home page, and its menu in the navbar, both read from here.
export const HOW_WE_WORK_INTRO = {
  tagline: "From business challenges to technology that delivers.",
  /** The purple line above the lead paragraph, level with "Our process" on the left. */
  leadEyebrow: "A disciplined process. Deliberate execution. Measurable outcomes.",
  lead: "Every successful solution starts with the right questions. We care to understand your business, establish the right technical direction and manage the journey from the first discussion through development, deployment and beyond.",
};

export interface HowWeWorkStep {
  step: string;
  id: string;
  room: string;
  tag: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  coord: { top: string; left: string };
}

export const WORK_FLOORPLAN_STEPS: HowWeWorkStep[] = [
  {
    step: "01",
    id: "discovery-srs",
    room: "DISCOVERY & SRS",
    tag: "REQUIREMENTS_SPEC",
    title: "Discovery & Requirements",
    description: "We understand your business objectives, identify the real challenges and define the requirements, scope and priorities before development begins.",
    tags: ["Business Goals", "SRS", "Project Scope"],
    image: "/how-we-work/stage-1-discovery-srs.jpg",
    coord: { top: "22%", left: "24%" },
  },
  {
    step: "02",
    id: "architecture-stack",
    room: "ARCHITECTURE & TECH",
    tag: "SYSTEM_TOPOLOGY",
    title: "Solution Architecture",
    description: "We establish the technical foundation, selecting the right technologies, system architecture and integrations to support your requirements and future growth.",
    tags: ["System Design", "Tech Stack", "Architecture"],
    image: "/how-we-work/stage-2-architecture-stack.jpg",
    coord: { top: "22%", left: "54%" },
  },
  {
    step: "03",
    id: "ui-ux-prototyping",
    room: "UI/UX & PROTOTYPING",
    tag: "120FPS_TACTILE_UX",
    title: "Experience Design",
    description: "We turn requirements into intuitive interfaces and interactive prototypes, allowing you to review the product experience before development starts.",
    tags: ["UI/UX", "User Journeys", "Prototypes"],
    image: "/how-we-work/stage-3-ui-ux-prototyping.jpg",
    coord: { top: "48%", left: "81%" },
  },
  {
    step: "04",
    id: "agile-development",
    room: "AGILE & INTEGRATION",
    tag: "SPRINT_ENGINEERING",
    title: "Development & Integration",
    description: "We build the approved solution in structured development cycles, integrating the required systems and sharing working progress through regular reviews.",
    tags: ["Development", "Integrations", "Sprint Reviews"],
    image: "/how-we-work/stage-4-agile-development.jpg",
    coord: { top: "48%", left: "24%" },
  },
  {
    step: "05",
    id: "qa-security-testing",
    room: "QA & SECURITY LAB",
    tag: "ZERO_VULNERABILITY",
    title: "Quality Assurance",
    description: "We test functionality, performance, integrations and security to identify issues and verify that the solution meets its agreed requirements.",
    tags: ["Functional Testing", "Security", "Validation"],
    image: "/how-we-work/stage-5-qa-security-testing.jpg",
    coord: { top: "75%", left: "20%" },
  },
  {
    step: "06",
    id: "deployment-launch-support",
    room: "DEPLOYMENT & SUPPORT",
    tag: "24_7_SLA_SUPPORT",
    title: "Launch & Ongoing Support",
    description: "We deploy the approved solution, coordinate the launch and provide agreed technical support to keep your product running and evolving.",
    tags: ["Deployment", "Monitoring", "Support"],
    image: "/how-we-work/stage-6-deployment-launch-support.jpg",
    coord: { top: "75%", left: "82%" },
  },
];

export const HOW_WE_WORK_CONTENT = {
  eyebrow: "02 // HOW WE WORK",
  title: "A deterministic 6-stage engineering sprint methodology.",
  lead: "From discovery and architectural design to full-scale deployment and 24/7 support, our methodology eliminates surprises and accelerates time-to-market with disciplined cadences.",
  steps: [
    {
      step: "01",
      name: "Discovery & SRS Design",
      duration: "Step 1",
      summary: "Deep-dive workshops to uncover core business goals, map user journeys, and establish exhaustive Software Requirements Specifications (SRS).",
      deliverables: ["Software Requirements Spec (SRS)", "User Journey Mapping", "Feature Prioritization Matrix", "Project Roadmap & Milestones"],
    },
    {
      step: "02",
      name: "Architecture & Tech Stack Selection",
      duration: "Step 2",
      summary: "Architecting resilient system topology, data schemas, API contracts, and selecting high-performance modern tech stacks tailored for scalability.",
      deliverables: ["Systems Topology Blueprint", "Tech Stack Architecture RFC", "Database Schema & Indexing", "API Contract Specifications"],
    },
    {
      step: "03",
      name: "UI/UX Design & Prototyping",
      duration: "Step 3",
      summary: "Crafting intuitive user experiences, design systems, and interactive clickable prototypes with meticulous attention to aesthetics and flow.",
      deliverables: ["Design System & Tokens", "Figma Interactive Prototypes", "Micro-Interactions & Motion", "Accessibility & UX Review"],
    },
    {
      step: "04",
      name: "Agile Development & Integration",
      duration: "Step 4",
      summary: "Iterative two-week sprints building modular frontends, robust backend microservices, third-party integrations, and continuous milestone reviews.",
      deliverables: ["Clean Modular Codebase", "Frontend & Backend Sprints", "Third-Party API Integrations", "Weekly Demo Environments"],
    },
    {
      step: "05",
      name: "QA, Security & Testing",
      duration: "Step 5",
      summary: "Rigorous automated integration tests, cross-device QA, edge-case validation, and comprehensive security vulnerability audits.",
      deliverables: ["Automated E2E Test Suite", "Security & Vulnerability Audit", "Performance & Load Testing", "Cross-Browser & Device QA"],
    },
    {
      step: "06",
      name: "Deployment, Launch & Support",
      duration: "Step 6",
      summary: "Zero-downtime production rollout, CDN edge routing, telemetry setup, smooth go-live orchestration, and dedicated ongoing maintenance.",
      deliverables: ["Zero-Downtime Deployment", "CI/CD & Edge Routing", "Real-Time Telemetry & APM", "Post-Launch 24/7 Support & SLA"],
    },
  ] as WorkStepItem[],
};

