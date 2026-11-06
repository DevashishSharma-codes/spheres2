import type { Metadata } from "next";
import { NOT_INDEXED } from "@/lib/seo";

// Placeholder until the page is designed, so it's kept out of search results for now.
export const metadata: Metadata = {
  title: "Founder's Note",
  robots: NOT_INDEXED,
};

export default function FoundersNotePage() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center px-6 pt-20">
      <h1 className="text-center text-4xl font-light tracking-[-0.03em] text-[#19191C]">Founder&rsquo;s Note</h1>
    </div>
  );
}
