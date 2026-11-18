// The About Us section on the home page, and the About Us menu in the navbar, both read from here.

export const ABOUT_INTRO = {
  tagline: "Intelligence. Engineering. Execution.",
  paragraphs: [
    "We are an AI-first technology company working at the intersection of artificial intelligence, software engineering and business innovation.",
    "From autonomous AI systems to intelligent automation and digital products to web and Mobile applications, we help businesses solve problems that demand more than off-the-shelf technology.",
    "We believe good technology should do more than look impressive. It should make work easier, decisions sharper and businesses better equipped for what comes next.",
  ],
  cta: "Discover 21 Spheres",
};

export interface AboutCard {
  /** Also the card's address on the home page, as /#id. */
  id: string;
  /** The small label on the card's tab. */
  pill: string;
  title: string;
  /** The one-line teaser on the card. Kept to a similar length on every card, so they all match. */
  summary: string;
  /** A line shown under the title in the card's detail, for cards that have one. */
  headline?: string;
  paragraphs: string[];
  /** Short points shown as pills in the card's detail. */
  highlights?: string[];
  image: string;
  /** The photo's own shape, width / height, so its frame in the detail matches it and nothing is cropped. */
  imageAspect: string;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    id: "built-around-your-business",
    pill: "Our Approach",
    title: "Built Around Your Business",
    summary: "Solutions shaped around your objectives, not the other way round.",
    paragraphs: [
      "Whether you're modernising an existing system, building a new digital product or introducing AI into established workflows, our approach starts with your objectives. We work with your existing technology wherever practical, creating solutions that fit into your business rather than forcing your business to adapt to them.",
    ],
    highlights: ["Contextual", "Adaptive", "Cohesive", "Bespoke"],
    image: "/about/about_us_new/built-around-your-business.webp",
    imageAspect: "3 / 2",
  },
  {
    id: "engineering-that-scales",
    pill: "Our Approach",
    title: "Engineering That Scales",
    summary: "Architecture that performs today and evolves with you tomorrow.",
    paragraphs: [
      "Our engineering approach brings together thoughtful architecture, clean development practices and integration across systems. Every decision considers how the product will perform today, how it can evolve tomorrow and what it will take to maintain it over time.",
    ],
    highlights: ["Precision", "Scalability", "Integration", "Reliability"],
    image: "/about/card-performance.jpg",
    imageAspect: "3 / 2",
  },
  {
    id: "automation-that-works",
    pill: "Our Approach",
    title: "Automation That Works",
    summary: "Connected systems that remove manual effort without losing control.",
    paragraphs: [
      "By connecting AI agents, business applications, APIs and workflow systems, we help reduce unnecessary manual effort while maintaining the control and visibility businesses need. The result is a more connected way of working that can adapt as operations grow.",
    ],
    highlights: ["Orchestrated", "Effortless", "Interoperable", "Accountable"],
    image: "/about/about_us_new/automation-that-works.webp",
    imageAspect: "3 / 2",
  },
  {
    id: "connected-intelligence",
    pill: "Our Approach",
    title: "Connected Intelligence",
    summary: "Moving from disconnected information to clear operational insight.",
    paragraphs: [
      "From intelligent search and predictive analytics to computer vision and connected AI systems, we develop capabilities that help businesses move beyond disconnected information and towards better operational insight.",
    ],
    highlights: ["Cognitive", "Predictive", "Holistic", "Actionable"],
    image: "/about/about_us_new/connected-intelligence.webp",
    imageAspect: "3 / 2",
  },
  {
    id: "people-behind-the-technology",
    pill: "Our Approach",
    title: "People Behind the Technology",
    summary: "Clear communication and partnerships built for the long term.",
    paragraphs: [
      "We value clear communication, thoughtful collaboration and long-term relationships. We work closely with our clients throughout the development journey, because understanding the people and businesses behind a project is just as important as understanding the technology.",
    ],
    highlights: ["Empathetic", "Consultative", "Collaborative", "Trustworthy"],
    image: "/about/card-integration.jpg",
    imageAspect: "3 / 2",
  },
  {
    id: "our-purpose",
    pill: "What Drives Us",
    title: "Our Purpose",
    summary: "Making technology matter where it matters most, for every business.",
    headline: "Making Technology Matter Where It Matters Most.",
    paragraphs: [
      "We believe technology is only as valuable as the difference it makes. Our purpose is to help businesses overcome challenges, work through complexity and pursue opportunities that would otherwise remain out of reach. We bring together people, engineering and intelligent technology to create solutions that serve a clear purpose and deliver lasting value.",
    ],
    highlights: ["Purposeful", "Transformative", "Insightful", "Enduring"],
    image: "/about/about_us_new/our-purpose.webp",
    imageAspect: "16 / 9",
  },
  {
    id: "our-mission",
    pill: "What Drives Us",
    title: "Our Mission",
    summary: "Turning complex business challenges into practical, lasting solutions.",
    headline: "Turning Complex Challenges Into Practical Solutions.",
    paragraphs: [
      "Our mission is to make advanced technology accessible, relevant and useful to the businesses that need it. Through thoughtful engineering, applied artificial intelligence and a deep understanding of business requirements, we build solutions that improve how organisations operate, make decisions and grow. We are committed to delivering work that goes beyond implementation — work that creates real value for the people who rely on it.",
    ],
    highlights: ["Pragmatic", "Discerning", "Resourceful", "Consequential"],
    image: "/about/about_us_new/our-mission.webp",
    imageAspect: "16 / 9",
  },
  {
    id: "our-vision",
    pill: "What Drives Us",
    title: "Our Vision",
    headline: "Shaping What Intelligence Makes Possible Next.",
    summary: "A smarter, more connected world, driven by AI and human potential.",
    paragraphs: [
      "To build a smarter, more connected world where artificial intelligence drives sustainable progress, expands human potential and creates new possibilities for businesses and communities.",
    ],
    highlights: ["Foresighted", "Human-centric", "Boundless", "Enlightening"],
    image: "/about/about_us_new/our-vision.webp",
    imageAspect: "16 / 9",
  },
];
