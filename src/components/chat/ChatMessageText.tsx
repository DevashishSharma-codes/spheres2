import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { safeLink } from "@/lib/chatbot/config";

/*
 * Renders the assistant's replies: paragraphs, "- " bullet lists, **bold** and [links](/page).
 * Only our own pages and channels become links; anything else stays plain text.
 */

const LINK_CLASS =
  "font-medium text-[#5A43C0] underline decoration-[#7057D9]/30 underline-offset-[3px] transition-colors hover:decoration-[#7057D9] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7057D9]";

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(info@21spheres\.com)/g;

function inline(text: string, onNavigate: () => void): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = match.index;
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-[#171717]">
          {match[1]}
        </strong>,
      );
    } else {
      const label = match[2] ?? match[4];
      const link = safeLink(match[3] ?? `mailto:${match[4]}`);
      if (!link) nodes.push(label);
      else if (link.kind === "internal")
        nodes.push(
          <Link key={key} href={link.href} onClick={onNavigate} className={LINK_CLASS}>
            {label}
          </Link>,
        );
      else
        nodes.push(
          <a key={key} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={LINK_CLASS}>
            {label}
          </a>,
        );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const BULLET = /^\s*[-*•]\s+/;

export function ChatMessageText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      blocks.push({ list: false, lines: [] });
      continue;
    }
    const list = BULLET.test(line);
    const current = blocks[blocks.length - 1];
    if (list && current?.list) current.lines.push(line.replace(BULLET, ""));
    else blocks.push({ list, lines: [list ? line.replace(BULLET, "") : line] });
  }

  return (
    <div className="space-y-2.5">
      {blocks
        .filter((block) => block.lines.length)
        .map((block, index) =>
          block.list ? (
            <ul key={index} className="space-y-1.5">
              {block.lines.map((line, item) => (
                <li key={item} className="relative pl-4 before:absolute before:left-0.5 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-[#7057D9]/70">
                  {inline(line, onNavigate)}
                </li>
              ))}
            </ul>
          ) : (
            <Fragment key={index}>
              {block.lines.map((line, item) => (
                <p key={item}>{inline(line, onNavigate)}</p>
              ))}
            </Fragment>
          ),
        )}
    </div>
  );
}
