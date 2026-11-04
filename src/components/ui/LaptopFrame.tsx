import type { ReactNode } from "react";

/** Laptop with a 16:10 screen. Children fill the screen as a flex column. */
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[600px]">
      <div className="rounded-[18px] bg-gradient-to-b from-[#303136] via-[#09090B] to-[#515158] p-[7px] shadow-[0_40px_70px_-20px_rgba(0,0,0,.9)] ring-1 ring-white/25">
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[12px] bg-[#0d0b18] ring-1 ring-white/10">
          {children}
        </div>
      </div>
      <div className="relative mx-auto -mt-px h-[14px] w-[108%] -translate-x-[4%] rounded-b-[18px] rounded-t-[3px] bg-gradient-to-b from-[#55565C] via-[#1C1D20] to-[#080809] shadow-[0_22px_34px_-12px_rgba(0,0,0,.9)]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[18%] -translate-x-1/2 rounded-b-xl bg-[#17181B]" />
      </div>
    </div>
  );
}
