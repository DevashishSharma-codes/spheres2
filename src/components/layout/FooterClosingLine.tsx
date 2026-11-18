"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const SLOT_ID = "footer-closing";
const subscribe = () => () => {};

/** Where a page's closing line lands: just above the footer's thread and "Start a project" button. */
export function FooterClosingSlot() {
  return <div id={SLOT_ID} />;
}

/**
 * A page's closing line, shown in the footer right above the thread, so the line, the thread and
 * the "Start a project" button read as one call to action. Put it anywhere in the page.
 */
export function FooterClosingLine({ children, lead }: { children: React.ReactNode; lead?: string }) {
  // The slot only exists in the browser; on the server (and while hydrating) nothing renders.
  const slot = useSyncExternalStore(subscribe, () => document.getElementById(SLOT_ID), () => null);
  if (!slot) return null;

  return createPortal(
    <div className="mx-auto w-full max-w-[1380px] px-4 pt-4 text-center sm:px-6 sm:pt-6 lg:px-8">
      <h2 className="mx-auto max-w-[760px] text-balance text-[26px] font-light leading-[1.15] tracking-[-0.035em] text-[var(--cone-heading,#19191C)] sm:text-[36px] lg:text-[42px]">
        {children}
      </h2>
      {lead && (
        <p className="mx-auto mt-3 max-w-[560px] text-balance text-[15px] font-light leading-relaxed text-[var(--cone-heading,#19191C)] opacity-70 sm:text-[17px]">
          {lead}
        </p>
      )}
    </div>,
    slot
  );
}

const AFTER_SLOT_ID = "footer-after-cone";

/** Where a page's follow-on content lands: just after the footer's "Start a project" button. */
export function FooterAfterConeSlot() {
  return <div id={AFTER_SLOT_ID} />;
}

/** Puts its children right after the footer's "Start a project" button (e.g. related services). */
export function FooterAfterCone({ children }: { children: React.ReactNode }) {
  const slot = useSyncExternalStore(subscribe, () => document.getElementById(AFTER_SLOT_ID), () => null);
  if (!slot) return null;
  return createPortal(children, slot);
}
