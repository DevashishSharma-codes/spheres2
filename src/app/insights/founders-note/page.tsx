import { FounderNote } from "@/components/insights/FounderNote";
import { pageMetadata } from "@/lib/seo";

const DEK =
  "Every meaningful journey begins with a belief. Mine was that technology should not just solve today’s problems, but create possibilities for tomorrow.";

export const metadata = pageMetadata({
  title: "A Note from the Founder",
  description: DEK,
  path: "/insights/founders-note",
  type: "article",
});

export default function FoundersNotePage() {
  return (
    <div className="bg-white pb-16">
      <FounderNote dek={DEK} />
    </div>
  );
}
