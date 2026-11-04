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
  discipline: string;
  featured: boolean;
  headline: string;
  brief: {
    problemStatement: string;
    legacyBottleneck: string;
    missionScope: string;
  };
  technology: {
    architecturePattern: string;
    stack: string[];
    infrastructure: string;
  };
  whatChanged: {
    empiricalOutcome: string;
    businessImpact: string;
    metrics: EmpiricalMetric[];
  };
  image: string;
  cardImage: string;
  /** CSS object-position for the card crop. Defaults to centered. */
  cardImagePosition?: string;
  blueprint: ArchitectureBlueprint;
}

export const DISCIPLINE_TABS = [
  { id: "all", label: "All work" },
  { id: "ai-agents", label: "Autonomous AI & Agents" },
  { id: "fintech", label: "Fintech & WealthTech" },
  { id: "insurtech", label: "InsurTech & Cloud Platforms" },
  { id: "mobile", label: "Mobile & High-Concurrency" },
];

export const PORTFOLIO_CASE_STUDIES: DetailedCaseStudy[] = [
  {
    id: "bimakart-connect",
    index: "01 / LEAD",
    title: "Bimakart Connect API Gateway",
    client: "Bimakart Technologies",
    year: "2024–2026",
    discipline: "InsurTech & Cloud Platforms",
    featured: true,
    headline: "Unified multi-carrier rating broker querying 100+ insurers simultaneously under 2.4s.",
    brief: {
      problemStatement:
        "India's insurance distribution channels were hamstrung by fragmented legacy carrier endpoints—antiquated SOAP/XML web services, custom REST gateways, and VPN-gated rating calculators. Broker inquiries routinely hung for upwards of 45 seconds.",
      legacyBottleneck:
        "During high-volume financial year-end renewals, carrier rate-limiting and timeouts triggered a 38% POSP quote abandonment rate, costing millions in unissued policies.",
      missionScope:
        "Architect a centralized, fault-tolerant rating broker gateway capable of fanning out requests to 100+ carriers in parallel, standardizing payloads into a unified schema, and issuing bindable quotes in sub-3 seconds.",
    },
    technology: {
      architecturePattern:
        "Non-blocking asynchronous event mesh with zero-copy Rust serialization, distributed Redis tier-1 caching, and circuit-breaker fault isolation.",
      stack: ["Rust Core Engine", "FastAPI (Python)", "Apache Kafka", "Redis Cluster", "AWS EKS", "gRPC Mesh", "Docker"],
      infrastructure: "Multi-region AWS EKS with autoscaling worker pods and zero-latency VPC peering into insurer datacenters.",
    },
    whatChanged: {
      empiricalOutcome:
        "End-to-end aggregate quote latency dropped from 45 seconds to a verified 2.4-second P95 SLA across 100+ simultaneous insurance carriers.",
      businessImpact:
        "Quote abandonment plummeted by 64%, driving a 3.1x surge in closed monthly policy premium volume with zero downtime across two consecutive peak annual renewal cycles.",
      metrics: [
        { label: "Quote Latency", value: "< 2.4s", delta: "-94.6%", context: "from 45s legacy avg" },
        { label: "Concurrent Carriers", value: "100+", delta: "Parallel Fan-Out", context: "unified JSON payload" },
        { label: "Active POSP Network", value: "45,000+", delta: "Zero Downtime", context: "peak season load" },
      ],
    },
    image: "/portfolio/previews/bimakart.svg",
    cardImage: "/portfolio/photos/external/insurance-meeting.png",
    blueprint: {
      topology: [
        "Broker Client -> Cloudflare Edge WAF & SSL Termination",
        "FastAPI Gateway -> Asynchronous Rate Limiting & Auth Validator",
        "Rust Serialization Engine -> Protocol Transformer (XML/SOAP <-> JSON)",
        "gRPC Worker Mesh -> Parallel Carrier Fan-out (100+ Endpoints)",
        "Redis Tier-1 Response Cache (TTL 180s) -> Kafka Telemetry Pipeline",
      ],
      benchmarks: [
        { metric: "P50 Latency", score: "1.42s", note: "Across top 25 carriers" },
        { metric: "P95 Latency", score: "2.38s", note: "Under 4,500 simultaneous inquiries" },
        { metric: "Availability", score: "99.99%", note: "Verified 24/7 EKS cluster uptime" },
      ],
      timeline: "8 Weeks (Brief to Production Cutover)",
      securityProfile: "IRDAI-compliant, SOC2 Type II, Mutual TLS with all carrier endpoints",
    },
  },
  {
    id: "wealth-wisdom",
    index: "02 / SCALE",
    title: "Wealth Wisdom Quantitative Terminal",
    client: "Wealth Wisdom Global",
    year: "2024–2025",
    discipline: "Fintech & WealthTech",
    featured: true,
    headline: "Institutional portfolio management terminal calculating 500,000 live assets at 120 FPS.",
    brief: {
      problemStatement:
        "Institutional asset advisors managing high-net-worth accounts relied on sluggish desktop tools and spreadsheet macros that froze during heavy market volatility and cross-asset rebalancing sessions.",
      legacyBottleneck:
        "Calculating real-time Value-at-Risk (VaR), portfolio stress tests, and tax-loss harvesting scenarios across multi-currency assets took 12+ minutes per client portfolio.",
      missionScope:
        "Build a Bloomberg-caliber, cloud-native web terminal executing complex Monte Carlo simulations directly in browser memory while streaming continuous live market feeds at native refresh rates.",
    },
    technology: {
      architecturePattern:
        "WebAssembly (Wasm) quantitative mathematical core paired with custom WebGL canvas rendering shaders and bi-directional binary WebSockets streaming order-book depth.",
      stack: ["Next.js App Router", "WebAssembly (Wasm)", "WebGL Canvas", "TypeScript", "TimescaleDB", "Redis Streams", "Tailwind CSS"],
      infrastructure: "Edge compute distribution with geo-located WebSocket proxies maintaining persistent connection states.",
    },
    whatChanged: {
      empiricalOutcome:
        "Executed 100,000 Monte Carlo portfolio runs in under 320ms with silky smooth 120 FPS canvas charts, even during severe market sell-offs.",
      businessImpact:
        "Platform scaled to monitor over $1.4B+ in institutional AUM within 90 days of general launch, saving portfolio managers an estimated 3.8 hours per day in reporting workflows.",
      metrics: [
        { label: "AUM Monitored", value: "$1.4B+", delta: "+340% YoY", context: "institutional multi-asset" },
        { label: "Monte Carlo Speed", value: "320ms", delta: "100k runs", context: "client-side Wasm core" },
        { label: "Rendering Smoothness", value: "120 FPS", delta: "Sub-16ms", context: "WebGL canvas pipelines" },
      ],
    },
    image: "/portfolio/previews/wealth-wisdom.svg",
    cardImage: "/portfolio/photos/external/wealth-advisory.jpg",
    blueprint: {
      topology: [
        "Trading Desk -> Next.js Edge UI with WebGL Shader Render Canvas",
        "Binary WebSocket Multiplexer -> Real-Time Quote & Order Ingestion",
        "Wasm Math Sandbox -> Real-time Covariance Matrix & Monte Carlo VaR",
        "TimescaleDB Cluster -> High-Frequency Historical Tick Aggregations",
        "Headless Chromium Renderer -> Automated Instant Client PDF Tearsheets",
      ],
      benchmarks: [
        { metric: "Canvas Frame Rate", score: "120 FPS", note: "Tested under 500k active points" },
        { metric: "Calculation Speed", score: "320ms", note: "100,000 path simulation runs" },
        { metric: "WebSocket Latency", score: "18ms", note: "Edge-to-client streaming delta" },
      ],
      timeline: "11 Weeks (Brief to Institutional Rollout)",
      securityProfile: "FINRA & SEBI compliant audit logs, Hardware Security Token 2FA",
    },
  },
  {
    id: "kaster-underwriting-lab",
    index: "03 / AI LAB",
    title: "Kaster Underwriting Lab & Neural Fraud AI",
    client: "Kaster Underwriting",
    year: "2025",
    discipline: "Autonomous AI & Agents",
    featured: true,
    headline: "Sub-second multi-modal vision transformer detecting document forgery and identity tampering.",
    brief: {
      problemStatement:
        "Underwriting specialists were overwhelmed by manual KYC and fraud inspection for scanned Aadhaar, PAN cards, policy endorsements, and financial bank statements.",
      legacyBottleneck:
        "Manual inspection took up to 72 hours per case. Human teams failed to spot sophisticated visual clone-stamping, subtle font-weight alterations, and metadata wipe artifacts.",
      missionScope:
        "Engineer an edge-hosted deep learning computer vision pipeline that validates document authenticity, reads microscopic digital stamp signatures, and flags fraud in milliseconds.",
    },
    technology: {
      architecturePattern:
        "Multi-stage neural vision transformer combining spatial frequency forensic analysis, character boundary regression, and vector-similarity fraud matching.",
      stack: ["PyTorch", "Vision Transformer (ViT)", "TensorRT", "FastAPI", "Qdrant Vector DB", "Rust Forensics", "Docker"],
      infrastructure: "Dedicated NVIDIA A10G Tensor Core GPU inference nodes with zero-egress data retention guarantees.",
    },
    whatChanged: {
      empiricalOutcome:
        "Turnaround time for document verification dropped from 72 hours to 420 milliseconds, with an independently verified 99.4% fraud detection rate.",
      businessImpact:
        "Eradicated over $2.8M in fraudulent claim and policy liabilities in the first 30 days of production. Reduced human underwriting workload by 91%.",
      metrics: [
        { label: "Fraud Detection", value: "99.4%", delta: "Verified Accuracy", context: "pixel-level tamper checks" },
        { label: "Inference Latency", value: "420ms", delta: "Edge GPU", context: "from 72h manual review" },
        { label: "False Positive Rate", value: "< 0.08%", delta: "Minimal Review", context: "across 250k submissions" },
      ],
    },
    image: "/portfolio/previews/kaster.svg",
    cardImage: "/portfolio/photos/external/kaster-document-review.jpg",
    cardImagePosition: "45% 45%",
    blueprint: {
      topology: [
        "Policy Submission Intake -> Secure In-Memory Document Ingestion",
        "Spatial Frequency Analyzer -> Fourier Transform Pixel Grid Tamper Scan",
        "Vision Transformer (ViT) -> Micro-Typography & Stamp Alignment Check",
        "Qdrant Vector Engine -> Cross-Document Duplicate & Ghost Identity Lookup",
        "FastAPI Output Gateway -> Instant Signed Cryptographic Risk Score",
      ],
      benchmarks: [
        { metric: "Inference Speed", score: "420ms", note: "Full multi-page document pass" },
        { metric: "Tamper Precision", score: "99.4%", note: "Validated on benchmark test suites" },
        { metric: "False Positives", score: "0.076%", note: "Prevents friction for legit users" },
      ],
      timeline: "6 Weeks (Model Training, Tuning & Pod Rollout)",
      securityProfile: "Zero-retention HIPAA & DPDP compliant encrypted memory buffers",
    },
  },
  {
    id: "urbanflow-dispatch",
    index: "04 / HIGH-CONCURRENCY",
    title: "UrbanFlow Geospatial & Mobile Dispatch",
    client: "UrbanFlow Logistics",
    year: "2024–2025",
    discipline: "Mobile & High-Concurrency",
    featured: true,
    headline: "Sub-16ms cross-platform dispatch app coordinating 450,000+ monthly rides and deliveries.",
    brief: {
      problemStatement:
        "UrbanFlow operated on-demand logistics fleets across 14 dense metropolitan hubs. Erratic mobile cell handoffs and extreme battery drain from GPS polling caused constant driver drops.",
      legacyBottleneck:
        "Previous hybrid web apps suffered from 3-second UI freezes during route recalculation, causing drivers to miss urgent dispatch bids and creating huge customer wait times.",
      missionScope:
        "Engineer a 120Hz native mobile client and high-concurrency geospatial backend handling continuous GPS telemetry, dynamic routing, and instant offline-first syncing.",
    },
    technology: {
      architecturePattern:
        "Offline-first React Native architecture with local SQLite sync engine, distributed Elixir/Phoenix channel cluster, and customized Uber H3 hexagonal geospatial clustering.",
      stack: ["React Native (120Hz)", "Elixir / Phoenix Channels", "PostGIS", "Redis Streams", "SQLite CRDT", "OpenStreetMap"],
      infrastructure: "Global cluster with geo-distributed Elixir BEAM nodes handling 25,000 concurrent WebSocket connections.",
    },
    whatChanged: {
      empiricalOutcome:
        "Achieved 120Hz fluid touch responsiveness with sub-48ms dispatch route clustering, maintaining 99.99% socket connection reliability through subterranean tunnels.",
      businessImpact:
        "Increased driver daily utilization by 31% while slashing deadhead fuel mileage by 18.4%. The platform currently powers over 450,000 completed monthly bookings.",
      metrics: [
        { label: "Monthly Bookings", value: "450k+", delta: "+62% Growth", context: "across 14 major metros" },
        { label: "Dispatch Routing", value: "< 48ms", delta: "Sub-Second SLA", context: "Uber H3 spatial clustering" },
        { label: "Fleet Utilization", value: "+31%", delta: "Efficiency Lift", context: "reduced idle driver time" },
      ],
    },
    image: "/portfolio/previews/urbanflow.svg",
    cardImage: "/portfolio/photos/external/urban-delivery.jpg",
    blueprint: {
      topology: [
        "Mobile Driver App (iOS/Android) -> Local SQLite CRDT State Cache",
        "Elixir BEAM Phoenix Channels -> 25,000 Concurrent Telemetry Sockets",
        "Uber H3 Hexagonal Grid Engine -> Sub-50ms Geospatial Proximity Matches",
        "PostGIS Timescale Cluster -> Driver Trajectory & Geofence Verification",
        "Push Gateway (FCM / APNs) -> Priority Background Wakes (< 120ms)",
      ],
      benchmarks: [
        { metric: "Frame Rate", score: "120 FPS", note: "Native rendering on iOS and Android" },
        { metric: "Socket Recovery", score: "180ms", note: "Automatic reconnection upon signal loss" },
        { metric: "Battery Draw", score: "-34%", note: "Smart adaptive GPS polling algorithm" },
      ],
      timeline: "10 Weeks (Mobile App & Distributed Backend)",
      securityProfile: "Encrypted device keystore, Tokenized biometric login",
    },
  },
  {
    id: "hahnnemen-clinical-ai",
    index: "05 / CLINICAL",
    title: "Hahnnemen Clinical Intelligence Agent",
    client: "Clinical Therapeutics Group",
    year: "2025",
    discipline: "Autonomous AI & Agents",
    featured: false,
    headline: "Deterministic medical reasoning agent indexing 450+ clinical repertories in sub-180ms.",
    brief: {
      problemStatement:
        "Specialist physicians spent up to 25 minutes per consultation manually cross-referencing complex patient symptom narratives across archaic physical repertories and disparate research journals.",
      legacyBottleneck:
        "Off-the-shelf generative AI models regularly hallucinated medical rubrics, made non-existent citations, and leaked private patient data into third-party training pipelines.",
      missionScope:
        "Build a deterministic medical reasoning agent utilizing hybrid vector-lexical RAG to cross-index 450+ verified medical texts with strict citation guardrails and sub-200ms lookup speed.",
    },
    technology: {
      architecturePattern:
        "Deterministic Hybrid RAG engine combining dense Qdrant vector embeddings with Typesense lexical BM25 token matching, deployed inside a zero-egress HIPAA VPC.",
      stack: ["Typesense", "Qdrant Vector DB", "LangChain Core", "FastAPI Edge", "React 19", "Tailwind CSS", "TypeScript"],
      infrastructure: "Self-hosted dedicated inference pods with zero data retention and air-gapped clinical database isolation.",
    },
    whatChanged: {
      empiricalOutcome:
        "Reduced diagnostic symptom correlation time from 25 minutes to sub-180 milliseconds with 99.4% verifiable rubric citation accuracy.",
      businessImpact:
        "Adopted by 3,400+ licensed clinical physicians across 12 countries. Accelerated patient intake turnaround by 4.8x with 68% first-session consultation resolution.",
      metrics: [
        { label: "Corpus Indexed", value: "450+ Texts", delta: "1.2M Rubrics", context: "curated medical treatises" },
        { label: "Lookup Latency", value: "< 180ms", delta: "Instant Search", context: "hybrid vector + lexical" },
        { label: "Active Physicians", value: "3,400+", delta: "12 Countries", context: "licensed clinical users" },
      ],
    },
    image: "/portfolio/previews/hahnnemen.svg",
    cardImage: "/portfolio/photos/external/clinical-ai.jpg",
    cardImagePosition: "85% 50%",
    blueprint: {
      topology: [
        "Physician Workstation -> Zero-Latency React 19 Clinical Assistant",
        "FastAPI Ingestion Node -> HIPAA PII / PHI Redaction Filter",
        "Hybrid RAG Core -> Typesense (Lexical) + Qdrant (Semantic) Cross-Match",
        "Deterministic Guardrail Evaluator -> Verifies Rubric Citations Against Canon",
        "Edge Streaming Gateway -> Millisecond Symptom Mapping & Repertorization",
      ],
      benchmarks: [
        { metric: "Search Latency", score: "172ms", note: "Across 1.2M medical rubric records" },
        { metric: "Guardrail Precision", score: "99.4%", note: "Zero fabricated citations observed" },
        { metric: "Cold Boot Time", score: "380ms", note: "Instant edge availability" },
      ],
      timeline: "7 Weeks (Ingestion, RAG Guardrailing & Clinical Beta)",
      securityProfile: "HIPAA Compliant, BAA Verified, Zero Data Retention",
    },
  },
];

