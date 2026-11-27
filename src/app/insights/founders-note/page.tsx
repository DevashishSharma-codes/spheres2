import { FounderNote } from "@/components/insights/FounderNote";
import { FOUNDER_LETTER } from "@/content/founderNoteEssays";
import { pageMetadata } from "@/lib/seo";

const DEK = FOUNDER_LETTER.dek;

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
