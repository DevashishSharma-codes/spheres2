"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DISCIPLINE_TABS, PORTFOLIO_CASE_STUDIES } from "@/content/portfolioCaseStudies";

/* The four disciplines first, then "All case studies" last. */
const CATEGORIES = [
  ...DISCIPLINE_TABS.filter((tab) => tab.id !== "all").map((tab) => ({
    id: tab.id,
    label: tab.label,
    projects: PORTFOLIO_CASE_STUDIES.filter((study) => study.discipline === tab.label),
  })),
  { id: "all", label: "All case studies", projects: PORTFOLIO_CASE_STUDIES },
];

// The same row as every other navbar menu: a hairline under each, a chevron on the right.
const ROW =
  "group/item flex w-full items-center justify-between py-2 sm:py-2.5 border-b border-white/[0.06] hover:border-white/15 transition-all duration-150 px-3 rounded-lg hover:bg-white/[0.04]";
const ROW_TEXT = "truncate text-[14px] sm:text-[14.5px] font-light tracking-[-0.01em] text-white/85 group-hover/item:text-white transition-colors";
const ROW_CHEVRON = "w-3.5 h-3.5 text-white/35 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-150 shrink-0 ml-4";

/**
 * The Case Studies menu: the categories, styled like every other navbar menu. Hovering or clicking
 * one opens its projects beside it; nothing extra shows until then.
 */
export function CaseStudiesMenu({ onNavigate }: { onNavigate: () => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CATEGORIES.find((category) => category.id === activeId);

  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-5">
      <div className="flex flex-col">
        {CATEGORIES.map((category, index) => {
          const on = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onMouseEnter={() => setActiveId(category.id)}
              onFocus={() => setActiveId(category.id)}
              onClick={() => setActiveId(category.id)}
              aria-expanded={on}
              className={`${ROW} text-left ${index === 0 ? "border-t border-white/[0.06]" : ""} ${on ? "bg-white/[0.04] border-white/15" : ""}`}
            >
              <span className={`${ROW_TEXT} ${on ? "text-white" : ""}`}>{category.label}</span>
              <ChevronRight aria-hidden="true" className={`${ROW_CHEVRON} ${on ? "translate-x-1 text-white" : ""}`} />
            </button>
          );
        })}
      </div>

      {/* The chosen category's projects, only once one is hovered or clicked */}
      {active && (
        /* Longer lists (All) run in two columns, so every project shows without scrolling */
        <div
          className={active.projects.length > 6 ? "grid grid-flow-col grid-cols-2 gap-x-3" : "flex flex-col"}
          style={active.projects.length > 6 ? { gridTemplateRows: `repeat(${Math.ceil(active.projects.length / 2)}, auto)` } : undefined}
        >
          {active.projects.map((study, index, list) => (
            <Link
              key={study.id}
              href={`/case-studies#${study.id}`}
              onClick={onNavigate}
              title={study.title}
              className={`${ROW} ${index === 0 || (list.length > 6 && index === Math.ceil(list.length / 2)) ? "border-t border-white/[0.06]" : ""}`}
            >
              <span className={ROW_TEXT}>{study.title}</span>
              <ChevronRight aria-hidden="true" className={ROW_CHEVRON} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
