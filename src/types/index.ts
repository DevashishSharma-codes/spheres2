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
  /** Also the industry's address on the home page, as /#id. */
  id: string;
  /** The sector, shown beside the count: "01 / 07 · Healthcare". */
  label: string;
  name: string;
  /** Fits a closed panel or a tab. */
  shortName: string;
  subhead: string;
  paragraphs: string[];
  capabilities: string[];
  /** The request shown in the small app mock-up. */
  prompt: string;
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
