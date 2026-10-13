export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  features: string[];
  tags: string[];
}

export interface WorkStepItem {
  step: string;
  name: string;
  duration: string;
  summary: string;
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  client: string;
  category: string;
  year: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  link?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  impactMetric: string;
  capabilities: string[];
}

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}
