export interface TechLogo {
  /** File name in /public/services/tech, without the extension. */
  file: string;
  name: string;
}

const tech = (...items: [string, string][]): TechLogo[] => items.map(([file, name]) => ({ file, name }));

/** Technologies shown in the logo strips on /services/[id], keyed by service id. */
export const SERVICE_TECH: Record<string, TechLogo[]> = {
  "mobile-application-development": tech(["swift", "SwiftUI"], ["kotlin", "Kotlin"], ["react", "React Native"], ["expo", "Expo"], ["android", "Android"], ["apple", "iOS"], ["jetpackcompose", "Jetpack Compose"], ["sqlite", "SQLite"], ["typescript", "TypeScript"], ["firebase", "Firebase"], ["xcode", "Xcode"], ["androidstudio", "Android Studio"]),
  "web-application-development": tech(["nextjs", "Next.js"], ["react", "React"], ["typescript", "TypeScript"], ["tailwindcss", "Tailwind CSS"], ["nodejs", "Node.js"], ["trpc", "tRPC"], ["zod", "Zod"], ["vercel", "Vercel"], ["postgresql", "PostgreSQL"], ["redis", "Redis"], ["socketio", "Socket.IO"]),
  "custom-ai-development": tech(["pytorch", "PyTorch"], ["huggingface", "Hugging Face"], ["nvidia", "NVIDIA"], ["fastapi", "FastAPI"], ["onnx", "ONNX"], ["python", "Python"], ["tensorflow", "TensorFlow"], ["docker", "Docker"], ["numpy", "NumPy"], ["opencv", "OpenCV"]),
  "llm-integration": tech(["claude", "Claude"], ["gemini", "Gemini"], ["langchain", "LangChain"], ["langgraph", "LangGraph"], ["qdrant", "Qdrant"], ["python", "Python"], ["huggingface", "Hugging Face"], ["fastapi", "FastAPI"], ["redis", "Redis"], ["postgresql", "PostgreSQL"]),
  "chatbot-development": tech(["elevenlabs", "ElevenLabs"], ["whatsapp", "WhatsApp"], ["redis", "Redis"], ["socketio", "Socket.IO"], ["slack", "Slack"], ["claude", "Claude"], ["python", "Python"], ["nodejs", "Node.js"], ["typescript", "TypeScript"], ["gemini", "Gemini"]),
  "workflow-automation": tech(["temporal", "Temporal"], ["kafka", "Apache Kafka"], ["n8n", "n8n"], ["python", "Python"], ["airflow", "Apache Airflow"], ["salesforce", "Salesforce"], ["sap", "SAP"], ["slack", "Slack"], ["postgresql", "PostgreSQL"], ["docker", "Docker"]),
  "website-development": tech(["threejs", "Three.js"], ["gsap", "GSAP"], ["sanity", "Sanity"], ["nextjs", "Next.js"], ["lighthouse", "Lighthouse"], ["react", "React"], ["tailwindcss", "Tailwind CSS"], ["vercel", "Vercel"], ["figma", "Figma"], ["googleanalytics", "Google Analytics"]),
  "saas-development": tech(["supabase", "Supabase"], ["postgresql", "PostgreSQL"], ["stripe", "Stripe"], ["auth0", "Auth0"], ["docker", "Docker"], ["nextjs", "Next.js"], ["typescript", "TypeScript"], ["vercel", "Vercel"], ["redis", "Redis"], ["okta", "Okta"]),
  "enterprise-software-development": tech(["kubernetes", "Kubernetes"], ["go", "Go"], ["kafka", "Apache Kafka"], ["aws", "AWS"], ["terraform", "Terraform"], ["docker", "Docker"], ["grafana", "Grafana"], ["prometheus", "Prometheus"], ["postgresql", "PostgreSQL"], ["redis", "Redis"]),
  "custom-software-development": tech(["rust", "Rust"], ["python", "Python"], ["typescript", "TypeScript"], ["cplusplus", "C++"], ["graphql", "GraphQL"], ["nodejs", "Node.js"], ["postgresql", "PostgreSQL"], ["docker", "Docker"], ["github", "GitHub"], ["react", "React"]),
};

/** Technologies named across the published case studies. */
export const PORTFOLIO_TECH: TechLogo[] = tech(["rust", "Rust"], ["react", "React Native"], ["nextjs", "Next.js"], ["typescript", "TypeScript"], ["fastapi", "FastAPI"], ["kafka", "Apache Kafka"], ["redis", "Redis"], ["aws", "AWS"], ["docker", "Docker"], ["pytorch", "PyTorch"], ["qdrant", "Qdrant"], ["tailwindcss", "Tailwind CSS"]);
