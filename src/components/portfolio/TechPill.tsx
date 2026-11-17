import Image from "next/image";
import {
  AudioLines,
  Brain,
  BrainCircuit,
  ChartLine,
  Cloud,
  Code,
  CreditCard,
  Database,
  FileCog,
  FileSearch,
  FileText,
  Globe,
  Image as ImageIcon,
  Languages,
  Layers,
  Library,
  Mail,
  MessageSquareText,
  Plug,
  ScanBarcode,
  ScanEye,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  UserRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* Brand logos in their official colours live in /public/portfolio/tech (Simple Icons), keyed by technology name. */
const LOGOS: Record<string, string> = {
  python: "python",
  fastapi: "fastapi",
  react: "react",
  typescript: "typescript",
  "tailwind css": "tailwindcss",
  "whatsapp business api": "whatsapp",
  "whatsapp integration": "whatsapp",
  ifttt: "ifttt",
  "node.js": "nodejs",
  "google sheets api": "googlesheets",
  mongodb: "mongodb",
  opencv: "opencv",
  flutter: "flutter",
  "salesforce integration": "salesforce",
  salesforce: "salesforce",
  firebase: "firebase",
  grafana: "grafana",
  nestjs: "nestjs",
  postgresql: "postgresql",
  redis: "redis",
  "socket.io": "socketio",
  "next.js": "nextjs",
  "aws ecs": "amazonecs",
  "aws cdk": "aws",
  webrtc: "webrtc",
  razorpay: "razorpay",
  pydantic: "pydantic",
  laravel: "laravel",
  php: "php",
  mysql: "mysql",
  "json data processing": "json",
  "json-driven architecture": "json",
  "browser automation": "selenium",
};

/* Concepts with no brand logo get a line icon that says what they are. */
const ICONS: Record<string, LucideIcon> = {
  rag: Library,
  vectordb: Database,
  "llm fine-tuning": BrainCircuit,
  "barcode recognition": ScanBarcode,
  "structured data retrieval": Database,
  llms: Brain,
  "generative ai": Sparkles,
  "persona-based ai architecture": UserRound,
  nlp: MessageSquareText,
  "multilingual ai": Languages,
  "voice ai": AudioLines,
  "contextual memory": BrainCircuit,
  "api integrations": Plug,
  "api integration": Plug,
  "web scraping": Globe,
  "workflow automation": Workflow,
  "data processing": Layers,
  "semantic search": Search,
  pymupdf: FileText,
  pikepdf: FileText,
  pillow: ImageIcon,
  "pdf forensics": FileSearch,
  "image processing": ScanEye,
  ocr: ScanText,
  "ai integration": Sparkles,
  "rest apis": Plug,
  "cloud infrastructure": Cloud,
  "dlt integration": MessageSquareText,
  "payment gateway integration": CreditCard,
  rbac: ShieldCheck,
  "hierarchical rbac": ShieldCheck,
  "email integration": Mail,
  "computer vision": ScanEye,
  "multimodal ai": Layers,
  "large language models": Brain,
  "prompt engineering": SquareTerminal,
  cashfree: CreditCard,
  reportlab: FileText,
  pypdf: FileText,
  matplotlib: ChartLine,
  "pdf automation": FileCog,
};

/** A glass pill with the technology's logo (or a fitting icon) and its name. */
export function TechPill({ name }: { name: string }) {
  const key = name.toLowerCase();
  const logo = LOGOS[key];
  const Icon = ICONS[key] ?? Code;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-gradient-to-b from-white/[.11] to-white/[.04] py-[3px] pl-[3px] pr-3 text-xs text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.14)] transition-colors duration-200 hover:border-white/30 hover:text-white">
      {/* A white disc so every brand colour reads true, including the black ones */}
      <span aria-hidden="true" className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.35)]">
        {logo ? (
          <Image src={`/portfolio/tech/${logo}.svg`} alt="" width={13} height={13} unoptimized className="h-[13px] w-[13px] object-contain" />
        ) : (
          <Icon className="h-[13px] w-[13px] text-[#6248CA]" strokeWidth={2.2} />
        )}
      </span>
      {name}
    </span>
  );
}
