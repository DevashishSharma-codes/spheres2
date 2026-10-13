import { TestimonialItem } from "@/types";

export const TESTIMONIALS_CONTENT = {
  eyebrow: "07 // TESTIMONIALS & SLAS",
  title: "Verified reviews from founders and engineering leaders.",
  lead: "Real performance feedback from teams whose core production systems were architected and shipped by 21Spheres.",
  items: [
    {
      id: "test-01",
      quote: "21Spheres engineered our multi-carrier insurance distribution gateway in 4 weeks. We went from processing 20 quotes a minute to 4,500 simultaneous inquiries across 100+ carriers with zero downtime. They operate as true software architects.",
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
      quote: "Their neural vision system eradicated 99.4% of fraudulent policy submissions within our first month. 21Spheres didn't just write code; they stress-tested our threat vectors and hardened our entire edge routing layer.",
      author: "Elena Rostova",
      role: "Chief Technology Officer",
      company: "Kaster Underwriting Lab",
      metric: "420ms Tamper Verification",
    },
  ] as TestimonialItem[],
};
