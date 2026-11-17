"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface DisclosureItem {
  key: string;
  /** Always visible: the row itself. */
  header: ReactNode;
  /** Shown when the row is opened. */
  body: ReactNode;
}

/**
 * Phones: a divided list of compact rows, each opening in place to show its detail. One row open at
 * a time keeps the page short. Opening animates its height, instantly with reduced motion.
 */
export function MobileDisclosureList({ items, label, className = "" }: { items: DisclosureItem[]; label: string; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul aria-label={label} className={`divide-y divide-white/10 border-y border-white/10 ${className}`}>
      {items.map((item) => {
        const isOpen = open === item.key;
        const panelId = `${item.key}-panel`;
        return (
          <li key={item.key}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : item.key)}
              className="flex min-h-[64px] w-full items-center gap-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BBFF]"
            >
              <span className="min-w-0 flex-1">{item.header}</span>
              <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              id={panelId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-4">{item.body}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
