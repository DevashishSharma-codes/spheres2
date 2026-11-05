export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface StackedPillItem {
  iconType: string;
  iconBg: string;
  title: string;
  subtitle: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  features: string[];
  tags: string[];
  category?: string;
  icon?: string;
  cardImage?: string;
  cardImagePosition?: string;
  metric?: string;
  pills?: StackedPillItem[];
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
  /** Shown in search results and link previews. */
  seoDescription?: string;
  impactMetric?: string;
  capabilities: string[];
  subhead?: string;
  image?: string;
  category?: string;
  architectureNotes?: string[];
  clientSnippet?: string;
}

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  image: string;
  assetType: string;
  industry: string;
  topic: string;
  /** Longer preview text for landing cards. Falls back to `excerpt`. */
  summary?: string;
  takeaways?: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}
