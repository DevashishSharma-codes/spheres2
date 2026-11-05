"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { VISITED_PAGES_KEY } from "@/components/layout/ScrollMemory";

/** For visitors with nothing to go back to, such as those arriving from search. */
function fallbackFor(pathname: string) {
  if (window.location.hash) return pathname;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "industries") return "/#industries";
  return segments.length > 1 ? `/${segments.slice(0, -1).join("/")}` : "/";
}

/** True only if the previous history entry is on this site, so Back can never leave it. */
function canGoBackWithinSite() {
  const navigation = (window as unknown as { navigation?: { canGoBack?: boolean } }).navigation;
  if (typeof navigation?.canGoBack === "boolean") return navigation.canGoBack;
  try {
    return Number(sessionStorage.getItem(VISITED_PAGES_KEY) ?? 0) > 0;
  } catch {
    return false;
  }
}

/** Round black arrow that returns to the previous page. The light edge keeps it visible on dark pages. */
export function PageBackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => {
        if (canGoBackWithinSite()) router.back();
        else router.push(fallbackFor(pathname));
      }}
      className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,.3)] transition-colors hover:bg-[#2a2a2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E79E8] ${className}`}
    >
      <ArrowLeft aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transition-none" />
    </button>
  );
}
