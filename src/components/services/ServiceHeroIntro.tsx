"use client";

import { useState } from "react";

/**
 * The hero's opening paragraphs. On phones only the start shows until "Read more" is tapped,
 * so the call to action and the model stay close; from tablet width up, all of them show.
 * A short first paragraph (one sentence or so) brings the next one with it, so phones never
 * show a single line followed by "Read more".
 */
export function ServiceHeroIntro({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const shownOnPhones = paragraphs[0].length < 160 ? 2 : 1;
  const hasMore = paragraphs.length > shownOnPhones;

  return (
    <div className="mt-4 max-w-xl space-y-3 text-[14.5px] leading-relaxed text-white/65 sm:text-[15.5px]">
      {paragraphs.map((paragraph, index) => (
        <p key={paragraph} className={open || index < shownOnPhones ? "" : "hidden sm:block"}>{paragraph}</p>
      ))}
      {hasMore && !open && (
        <button type="button" onClick={() => setOpen(true)} className="text-[13px] font-medium text-[#C9BBFF] underline-offset-4 hover:underline sm:hidden">
          Read more
        </button>
      )}
    </div>
  );
}
