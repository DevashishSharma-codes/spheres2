import type { ServiceStatGraphic } from "@/content/serviceDetails";

const PURPLE = "#9D85F2";
const LILAC = "#C9BBFF";

function Line() {
  const path = "M0 88 C 18 82, 28 86, 42 70 S 66 66, 80 48 S 110 50, 128 30 S 160 28, 200 8";
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true" className="h-full w-full">
      <defs><linearGradient id="stat-line" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={PURPLE} stopOpacity=".45" /><stop offset="100%" stopColor={PURPLE} stopOpacity="0" /></linearGradient></defs>
      <path d={`${path} L200 100 L0 100 Z`} fill="url(#stat-line)" />
      <path d={path} fill="none" stroke={LILAC} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  );
}

function Pulse() {
  const path = "M0 50 H52 L62 50 L72 18 L84 84 L96 34 L104 50 H200";
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true" className="h-full w-full">
      <path d="M0 50 H200" stroke="white" strokeOpacity=".12" vectorEffect="non-scaling-stroke" />
      <path d={path} fill="none" stroke={LILAC} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

function Network() {
  const nodes: [number, number][] = [[16, 22], [50, 10], [86, 24], [12, 70], [36, 88], [68, 88], [90, 66], [28, 44], [74, 46]];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="h-full w-full">
      {nodes.map(([x, y]) => <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} stroke={PURPLE} strokeOpacity=".6" strokeWidth=".6" />)}
      {nodes.map(([x, y]) => <circle key={`${x}.${y}`} cx={x} cy={y} r="2.6" fill={LILAC} />)}
      <circle cx="50" cy="50" r="9" fill={PURPLE} fillOpacity=".25" />
      <circle cx="50" cy="50" r="5" fill="white" />
    </svg>
  );
}

function Frames() {
  return (
    <div aria-hidden="true" className="flex h-full items-end gap-[3px]">
      {Array.from({ length: 28 }, (_, index) => (
        <span key={index} className="h-full flex-1 rounded-full bg-[#9D85F2]" style={{ opacity: 0.25 + (index / 27) * 0.75 }} />
      ))}
    </div>
  );
}

function Library() {
  const spines = [64, 88, 72, 96, 58, 82, 100, 68, 90, 76, 60, 94, 70, 86, 62, 98, 74, 84];
  return (
    <div aria-hidden="true" className="flex h-full items-end gap-[3px] border-b border-white/25">
      {spines.map((height, index) => <span key={index} className="flex-1 rounded-t-[3px]" style={{ height: `${height}%`, backgroundColor: index % 3 === 0 ? LILAC : PURPLE, opacity: index % 2 ? 0.7 : 1 }} />)}
    </div>
  );
}

function Gauge() {
  return (
    <svg viewBox="0 0 120 68" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="h-full w-full">
      <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke={PURPLE} strokeWidth="9" strokeLinecap="round" />
      {[0, 25, 50, 75, 100].map((tick) => {
        const angle = Math.PI * (1 - tick / 100);
        return <circle key={tick} cx={60 + 34 * Math.cos(angle)} cy={62 - 34 * Math.sin(angle)} r="1.4" fill="white" fillOpacity=".55" />;
      })}
    </svg>
  );
}

function Ring() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="h-full w-full">
      <circle cx="50" cy="50" r="40" fill={PURPLE} fillOpacity=".12" stroke={PURPLE} strokeWidth="8" />
      <path d="M33 51 L45 63 L68 38" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Count({ count }: { count: number }) {
  return (
    <div aria-hidden="true" className="grid h-full content-center gap-1.5" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
      {Array.from({ length: count }, (_, index) => <span key={index} className="h-[22px] rounded-md bg-[#9D85F2]" style={{ opacity: 0.55 + (index / count) * 0.45 }} />)}
    </div>
  );
}

function Weeks() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div aria-hidden="true" className="flex gap-[3px]">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} className={`h-9 flex-1 rounded-[4px] ${index < 2 ? "bg-white/10" : "bg-[#9D85F2]"}`} style={index >= 2 ? { opacity: 1 - (index - 2) * 0.05 } : undefined} />
        ))}
      </div>
      <p className="mt-2 flex justify-between pl-[14.3%] text-[11px] text-white/60"><span>Week 3</span><span>Week 14</span></p>
    </div>
  );
}

function Compare({ graphic }: { graphic: Extract<ServiceStatGraphic, { kind: "compare" }> }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div>
        <p className="flex justify-between text-xs text-white/65"><span>{graphic.beforeLabel}</span><span className="text-white">{graphic.before}</span></p>
        <span aria-hidden="true" className="mt-2 block h-3 rounded-full bg-white/25" />
      </div>
      <div>
        <p className="flex justify-between text-xs text-white/65"><span>{graphic.afterLabel}</span><span className="text-white">{graphic.after}</span></p>
        <span aria-hidden="true" className="mt-2 block h-3 w-[5%] min-w-3 rounded-full bg-[#B9A6FF] shadow-[0_0_12px_rgba(185,166,255,.8)]" />
      </div>
    </div>
  );
}

export function StatGraphic({ graphic }: { graphic: ServiceStatGraphic }) {
  switch (graphic.kind) {
    case "compare": return <Compare graphic={graphic} />;
    case "count": return <Count count={graphic.count} />;
    case "weeks": return <Weeks />;
    case "gauge": return <Gauge />;
    case "ring": return <Ring />;
    case "line": return <Line />;
    case "pulse": return <Pulse />;
    case "network": return <Network />;
    case "frames": return <Frames />;
    case "library": return <Library />;
  }
}
