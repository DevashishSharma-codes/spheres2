import { TestimonialItem } from "@/types";

export const TESTIMONIALS_CONTENT = {
  eyebrow: "07 // TESTIMONIALS & SLAS",
  title: "Verified reviews from founders and engineering leaders.",
  lead: "Real performance feedback from teams whose core production systems were architected and shipped by 21 Spheres.",
  items: [
    {
      id: "test-01",
      quote: "21 Spheres engineered our multi-carrier insurance distribution gateway in 4 weeks. We went from processing 20 quotes a minute to 4,500 simultaneous inquiries across 100+ carriers with zero downtime. They operate as true software architects.",
      author: "Kashiv Patel",
      role: "VP of Engineering",
      company: "Bimakart Technologies",
      metric: "Sub-2.4s Carrier Broadcast",
    },
    {
      id: "test-02",
      quote: "The interface fluidly renders 500,000 real-time portfolio metrics without stuttering. Their attention to sub-millisecond latencies, design tokens, and tactile details is unmatched in the industry. Our wealth advisors love it.",
      author: "Keshav Sharma",
      role: "Chief Executive Officer",
      company: "Wealth Wisdom Global",
      metric: "120 FPS Data Visualizer",
    },
    {
      id: "test-03",
      quote: "Their neural vision system eradicated 99.4% of fraudulent policy submissions within our first month. 21 Spheres didn't just write code; they stress-tested our threat vectors and hardened our entire edge routing layer.",
      author: "Elena Rostova",
      role: "Chief Technology Officer",
      company: "Kaster Underwriting Lab",
      metric: "420ms Tamper Verification",
    },
  ] as TestimonialItem[],
};

/**
 * The real testimonials, shown on the testimonials wall (and known to the chat assistant).
 * TESTIMONIALS_CONTENT above is an old placeholder that nothing on the site uses.
 */
export const TESTIMONIALS: { name: string; role: string; company: string; quote: string }[] = [
  {
    name: "Shreyak Singh",
    role: "Co-Founder, WTMF.ai | Knockverse Private Limited",
    company: "WTMF.ai",
    quote: "21 Spheres brings the rare ability to turn ambitious ideas into practical technology solutions, combining technical depth with a clear understanding of business.",
  },
  {
    name: "Hitesh Patel",
    role: "Founder & CEO, Enspire Devices Private Limited",
    company: "Enspire Devices",
    quote: "What stands out about 21 Spheres is their thoughtful approach to product development and their ability to translate complex requirements into working solutions.",
  },
  {
    name: "Dr. Manthan Hirani",
    role: "Homeopathic Practitioner",
    company: "",
    quote: "Technology can make a real difference when designed around people. The team at 21 Spheres understands this and focuses on practical, accessible solutions.",
  },
  {
    name: "Vinayak Parashar",
    role: "Senior Project Manager, Bimakart.in | Incio Fintech Private Limited",
    company: "Bimakart.in",
    quote: "From evolving requirements to complex product features, 21 Spheres has shown strong ownership, adaptability, and the ability to keep execution on track.",
  },
  {
    name: "Keshav Malpani",
    role: "Wealth Wisdom",
    company: "Wealth Wisdom",
    quote: "I appreciate their curiosity and willingness to explore unconventional approaches. 21 Spheres brings fresh thinking to technology challenges and business opportunities.",
  },
  {
    name: "Bijal Kothari",
    role: "Founder, Futureogy | Neffertum Labs Private Limited",
    company: "Futureogy",
    quote: "Turning a product vision into reality requires more than code. 21 Spheres brings the technical ownership and adaptability needed to build ambitious products.",
  },
  {
    name: "Jay Sudani",
    role: "CEO, PIERC | Parul University",
    company: "PIERC, Parul University",
    quote: "21 Spheres exemplifies entrepreneurial innovation, bringing research-driven thinking and emerging technologies closer to practical applications with real-world potential.",
  },
  {
    name: "Martin Kennedy",
    role: "Founder, MK Consulting | Seychelles",
    company: "MK Consulting",
    quote: "Om has extended his exceptional ability in technology, specifically in Artificial Intelligence. Through 21 Spheres, he is translating innovation into customised AI-driven business tools.",
  },
];

/** The lines that change, one after another, in the testimonials header. */
export const TESTIMONIAL_PHRASES = [
  "Engineering intelligence into the next generation of business",
  "From experimental research to real-world AI applications",
  "Building intelligent systems that solve real business challenges",
];
