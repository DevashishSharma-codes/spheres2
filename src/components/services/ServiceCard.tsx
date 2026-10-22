"use client";

import React from "react";
import { 
  ChevronRight, 
  Globe, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Workflow, 
  Layout, 
  Rocket, 
  Building2, 
  Terminal 
} from "lucide-react";
import { ServiceItem } from "@/types";
import { CleanStackedCardVisual } from "./CleanStackedCardVisual";

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
  onOpenInPhone: (serviceId: string) => void;
}

const ACTION_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone: Globe,
  Globe: Globe,
  Cpu: Cpu,
  Sparkles: Sparkles,
  MessageSquareCode: MessageSquare,
  Workflow: Workflow,
  Layout: Layout,
  Rocket: Rocket,
  Building2: Building2,
  Terminal: Terminal,
};

export function ServiceCard({ service, onSelectService, onOpenInPhone }: ServiceCardProps) {
  const IconComponent = ACTION_ICON_MAP[service.icon || "Cpu"] || Cpu;

  return (
    <div
      onClick={() => onSelectService(service)}
      className="group relative rounded-[32px] bg-white border border-black/[0.06] p-6 sm:p-7 flex flex-col justify-between h-[490px] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:border-black/15 cursor-pointer text-left overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
    >
      {/* ========================================================
          1. TOP: CLEAN HEADING & TAG (Matching reference layout)
          ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F7] border border-black/[0.06] text-[10.5px] font-mono text-black/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9]" />
            <span>{service.number} // {service.category?.toUpperCase() || "SERVICES"}</span>
          </span>
          <span className="text-[10px] font-mono text-black/40">
            {service.metric ? `${service.metric.split(" ")[0]} SLA` : "PRO SLA"}
          </span>
        </div>

        <h3 className="text-2xl font-normal tracking-tight text-[#18181B] group-hover:text-[#7057D9] transition-colors leading-tight mb-1">
          {service.title}
        </h3>

        <p className="text-xs text-[#8F8F98] font-light line-clamp-1">
          {service.headline}
        </p>
      </div>

      {/* ========================================================
          2. CENTER: CLEAN STACKED CARDS VISUAL (Reference Pattern)
          ======================================================== */}
      <div className="my-auto py-2">
        <CleanStackedCardVisual serviceId={service.id} pills={service.pills} />
      </div>

      {/* ========================================================
          3. BOTTOM: ACTION PILL (Exact pattern from reference image)
          ======================================================== */}
      <div className="w-full rounded-2xl bg-[#FAFAFC] hover:bg-white border border-black/[0.06] p-2.5 px-3.5 flex items-center justify-between gap-3 transition-all group-hover:border-[#7057D9]/30 group-hover:shadow-sm">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded-xl bg-[#18181B] text-white flex items-center justify-center shrink-0 shadow-sm">
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[12px] font-semibold text-[#18181B] tracking-tight leading-tight truncate">
              Inspect Architecture
            </span>
            <span className="text-[10px] text-[#8F8F98] font-light truncate">
              {service.tags.slice(0, 3).join(" &bull; ")}
            </span>
          </div>
        </div>

        <div className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-black/60 group-hover:text-[#7057D9] group-hover:border-[#7057D9]/40 group-hover:bg-[#7057D9]/5 transition-all shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
