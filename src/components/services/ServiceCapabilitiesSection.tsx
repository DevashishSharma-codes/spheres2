import type { ReactNode } from "react";
import Image from "next/image";
import { BadgeCheck, Check, Clock } from "lucide-react";
import type { CapabilityTile, CapabilityWidget, ServiceCapabilities } from "@/content/serviceCapabilities";
import type { ServiceItem } from "@/types";

/** White panel inside a frosted halo, so screens lift off the tile behind them. */
function GlassPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-white/15 bg-white/[.06] p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,.9)] backdrop-blur-md ${className}`}>
      <div className="rounded-[15px] bg-[#15131f] p-3.5 text-white">{children}</div>
    </div>
  );
}

function Cursor({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="absolute -bottom-7 right-3 flex items-start">
      <svg viewBox="0 0 20 20" className="h-5 w-5 -rotate-[8deg] drop-shadow"><path d="M3 2 L17 9 L10.5 11 L8 18 Z" fill="#fff" stroke="#141318" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      <span className="mt-3.5 rounded-full border border-white/25 bg-[#7057D9] px-2.5 py-1 text-[11px] font-medium text-white">{label}</span>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((word) => word[0]).join("");
}

function Widget({ widget }: { widget: CapabilityWidget }) {
  switch (widget.kind) {
    case "list":
      return (
        <div className="relative w-full">
          <GlassPanel>
            <p className="border-b border-white/10 pb-2.5 text-[13px] font-medium">{widget.title}</p>
            <div className="divide-y divide-white/10">
              {widget.rows.map((row) => (
                <div key={row.name} className="flex items-center gap-2.5 py-2.5 last:pb-0.5">
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3a2c86] to-[#22194f] text-[10px] font-semibold text-[#C9BBFF]">{initials(row.name)}</span>
                  <span className="min-w-0 flex-1 leading-tight"><span className="block text-xs font-medium">{row.name}</span><span className="block text-[10.5px] text-white/55">{row.note}</span></span>
                  <span className="shrink-0 rounded-lg border border-white/15 px-2 py-1 text-[10.5px] text-white/90">{row.action}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
          {widget.cursor && <Cursor label={widget.cursor} />}
        </div>
      );
    case "events":
      return (
        <div className="w-full space-y-2.5">
          <GlassPanel>
            <p className="flex items-center justify-between gap-2 text-xs font-medium">
              <span className="flex min-w-0 items-center gap-2"><BadgeCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-[#B9A6FF]" /><span>{widget.event.title}</span></span>
              <span className="shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] text-white/60">{widget.event.time}</span>
            </p>
          </GlassPanel>
          <GlassPanel>
            <p className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 text-xs font-medium">
              <span className="flex min-w-0 items-center gap-2"><Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-[#B9A6FF]" /><span>{widget.card.title}</span></span>
              <span className="shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] text-white/60">{widget.card.time}</span>
            </p>
            <div className="mt-2 space-y-1.5">
              {widget.card.rows.map(([key, value]) => (
                <p key={key} className="flex items-center gap-1.5 text-[11px] text-white/60"><span className="shrink-0">{key} →</span><span className="truncate rounded-md border border-white/15 px-1.5 py-0.5 text-[10.5px] text-white/90">{value}</span></p>
              ))}
            </div>
          </GlassPanel>
        </div>
      );
    case "code":
      return (
        <GlassPanel className="w-full">
          <span aria-hidden="true" className="mb-2.5 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" /><span className="h-2 w-2 rounded-full bg-[#FEBC2E]" /><span className="h-2 w-2 rounded-full bg-[#28C840]" />
          </span>
          <pre className="font-mono text-[10px] leading-[1.7] text-white/75">
            {widget.lines.map((line, index) => (
              <span key={index} className={`block min-h-[1.7em] whitespace-pre-wrap break-words ${index === widget.highlight ? "rounded bg-[#7057D9]/30 text-[#D9CFFF]" : ""}`}>{line}</span>
            ))}
          </pre>
          <p className="mt-2 w-fit rounded-md bg-[#7057D9] px-2 py-1 font-mono text-[10px] text-white">{widget.tooltip}</p>
        </GlassPanel>
      );
    case "checklist":
      return (
        <GlassPanel className="w-full">
          <p className="border-b border-white/10 pb-2.5 text-[13px] font-medium">{widget.title}</p>
          <div className="divide-y divide-white/10">
            {widget.items.map(([name, state]) => (
              <p key={name} className="flex items-center gap-2.5 py-2.5 text-xs last:pb-0.5">
                <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7057D9]/25 text-[#C9BBFF]"><Check className="h-3 w-3" /></span>
                <span className="min-w-0 flex-1 font-medium">{name}</span>
                <span className="shrink-0 text-[10.5px] text-white/55">{state}</span>
              </p>
            ))}
          </div>
        </GlassPanel>
      );
  }
}

function Tile({ tile }: { tile: CapabilityTile }) {
  const { icon: Icon } = tile;
  return (
    <article>
      <div
        className="relative isolate flex min-h-[370px] items-center justify-center overflow-hidden rounded-[22px] border border-white/10 p-6 sm:min-h-[400px] sm:p-9 lg:p-4 xl:p-9"
        style={tile.image ? { backgroundColor: "#0d0a1c" } : { background: "linear-gradient(180deg, #0c0a18 0%, #151031 55%, #2a1e63 100%)" }}
      >
        {tile.image ? (
          <>
            <Image src={tile.image} alt="" fill sizes="(max-width: 1023px) 92vw, 31vw" className="-z-20 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0c0a18]/95 via-[#151031]/75 to-[#2a1e63]/55" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-60"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "56px 56px" }}
          />
        )}
        <div className="w-full max-w-[350px]"><Widget widget={tile.widget} /></div>
      </div>
      <h3 className="mt-5 flex items-center gap-2.5 text-[17px] font-normal tracking-[-0.01em]">
        <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#C9BBFF]" />
        {tile.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{tile.description}</p>
    </article>
  );
}

export function ServiceCapabilitiesSection({ service, content }: { service: ServiceItem; content: ServiceCapabilities }) {
  return (
    <>
      <section aria-labelledby="service-capabilities" className="border-t border-white/15 py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#C9BBFF]">Capabilities</p>
        <h2 id="service-capabilities" className="mt-3 max-w-3xl text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[44px]">{content.title}</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-5">
          {content.tiles.map((tile) => <Tile key={tile.title} tile={tile} />)}
        </div>
      </section>

      {/* Benefits over a tinted photo */}
      <section aria-labelledby="service-benefits" className="relative isolate mb-4 overflow-hidden rounded-[26px] border border-white/10">
        <Image src={service.cardImage ?? "/portfolio/photos/team.jpg"} alt="" fill sizes="(max-width: 1400px) 100vw, 1316px" style={{ objectPosition: service.cardImagePosition }} className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c0a18]/[.97] via-[#120e29]/95 to-[#241a55]/90" />
        <div className="grid gap-x-10 gap-y-9 p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-3 lg:p-12">
          <div>
            <h2 id="service-benefits" className="text-3xl font-light leading-[1.1] tracking-[-0.04em] sm:text-[38px]">{content.benefitsTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">{content.benefitsLead}</p>
          </div>
          {content.benefits.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <Icon aria-hidden="true" className="h-6 w-6 text-[#C9BBFF]" />
              <h3 className="mt-3 text-lg font-normal tracking-[-0.01em]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
