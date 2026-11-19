import { IntroVideoSection } from "@/components/intro/IntroVideoSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Intro Video",
  description: "21 Spheres in 50 seconds: a short tour of the software and AI products we build.",
  path: "/intro",
});

export default function IntroPage() {
  return <IntroVideoSection />;
}
