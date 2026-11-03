import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

function AppScanVisual() {
  return (
    <div aria-hidden="true" className="relative h-[170px] w-full shrink-0">
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-[#17151d]/95 text-white/80 shadow-[0_18px_48px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition-transform duration-700 group-hover:-translate-y-1">
        <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#211e28] px-3 text-[9px] text-white/55">
          <span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#ff6b62]"/><i className="h-1.5 w-1.5 rounded-full bg-[#f8bd4f]"/><i className="h-1.5 w-1.5 rounded-full bg-[#55c678]"/></span>
          <span className="ml-1 rounded bg-white/[0.08] px-2 py-1 text-white/75">checkout.ts</span><span className="ml-auto">Code review</span>
        </div>
        <div className="grid h-[calc(100%-32px)] grid-cols-[1fr_31%]">
          <div className="space-y-2 p-3 font-mono text-[8px] leading-3.5 text-white/55 sm:p-4 sm:text-[9px]">
            <p><span className="mr-2 text-white/25">08</span><b className="font-medium text-violet-300">function</b> applyPromo(order) &#123;</p>
            <p><span className="mr-2 text-white/25">09</span><span className="pl-2">const promo = findPromo(code);</span></p>
            <p className="rounded bg-rose-400/15 text-rose-200"><span className="mr-2 text-white/30">10</span><span className="pl-2">order.total -= promo;</span></p>
            <p><span className="mr-2 text-white/25">11</span><span className="pl-2">return order;</span></p>
            <p><span className="mr-2 text-white/25">12</span><span className="text-violet-300">&#125;</span></p>
            <div className="mt-2 h-1.5 w-3/5 animate-pulse rounded-full bg-white/10"/><div className="h-1.5 w-2/5 animate-pulse rounded-full bg-white/[0.07]"/>
          </div>
          <div className="border-l border-white/10 bg-[#1d1a24] p-2 sm:p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[8px] font-medium text-white/75"><i className="h-1.5 w-1.5 rounded-full bg-[#f1a23b]"/>Findings</div>
            <div className="rounded-md border border-rose-300/20 bg-rose-400/[0.08] p-2 text-[7px] leading-3 text-white/60"><span className="font-semibold text-rose-300">High · line 10</span><br/>Promo can apply twice</div>
            <div className="mt-2 space-y-1.5"><div className="h-1.5 w-full animate-pulse rounded-full bg-white/10"/><div className="h-1.5 w-4/5 animate-pulse rounded-full bg-white/[0.07]"/></div>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 600 260" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs><linearGradient id="insightScannerGlow" x1="0" x2="1"><stop stopColor="#a45cff" stopOpacity="0"/><stop offset=".5" stopColor="#a45cff" stopOpacity=".24"/><stop offset="1" stopColor="#a45cff" stopOpacity="0"/></linearGradient><filter id="insightLensGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <rect x="12" y="40" width="576" height="2" fill="url(#insightScannerGlow)"><animate attributeName="y" values="38;222;38" dur="5.8s" repeatCount="indefinite"/></rect>
        <defs><linearGradient id="insightLensHandle" x1="391" y1="171" x2="448" y2="228" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".22" stopColor="#c9b9df"/><stop offset=".5" stopColor="#7e699b"/><stop offset=".75" stopColor="#f7f0ff"/><stop offset="1" stopColor="#8a73a5"/></linearGradient><radialGradient id="insightLensGlass" cx=".34" cy=".26" r=".78"><stop stopColor="#fff" stopOpacity=".92"/><stop offset=".48" stopColor="#f0e7fb" stopOpacity=".76"/><stop offset="1" stopColor="#bb9cdb" stopOpacity=".5"/></radialGradient><linearGradient id="insightLensRim" x1="310" y1="96" x2="399" y2="183" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".35" stopColor="#ad95c7"/><stop offset=".62" stopColor="#fff"/><stop offset="1" stopColor="#80669e"/></linearGradient></defs>
        <g className="insight-lens-float" filter="url(#insightLensGlow)"><path d="m391 171 57 57" stroke="#705b89" strokeWidth="18" strokeLinecap="round"/><path d="m391 171 57 57" stroke="url(#insightLensHandle)" strokeWidth="13" strokeLinecap="round"/><path d="m394 174 51 51" stroke="#fff" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round"/><circle cx="354" cy="135" r="49" fill="url(#insightLensRim)"/><circle cx="354" cy="135" r="43" fill="url(#insightLensGlass)" stroke="#fff" strokeWidth="2"/><path d="M324 135h60M324 146h45M324 157h33" stroke="#8b5cc1" strokeWidth="4" strokeLinecap="round" opacity=".68"/><path d="M324 124h39" stroke="#ef6d5e" strokeWidth="5" strokeLinecap="round"/><path d="M326 112c14-12 35-14 52-6M326 119c8-5 15-7 22-7" stroke="#fff" strokeOpacity=".9" strokeWidth="4" strokeLinecap="round"/><path d="M378 158c-7 10-17 16-29 19" stroke="#9c7cb9" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round"/></g>
      </svg>
      <div className="absolute bottom-[5%] right-[4%] flex items-center gap-2 rounded-lg border border-white/15 bg-[#292530]/90 px-3 py-2 text-[9px] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-xl"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-400/20 text-violet-200">⌕</span><span><b className="font-medium">2 issues found</b><br/><i className="not-italic text-white/55">reviewed automatically</i></span></div>
    </div>
  );
}

function SmokeTestVisual() {
  return (
    <div aria-hidden="true" className="relative h-[170px] w-full shrink-0">
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-[#17151d]/95 text-white/80 shadow-[0_18px_48px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition-transform duration-700 group-hover:-translate-y-1">
        <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#211e28] px-3 text-[9px] text-white/55"><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#9b7bff]"/> Smoke test run</span><span>build v1.8.2</span></div>
        <div className="grid h-[calc(100%-32px)] grid-cols-[1.2fr_.8fr] gap-3 p-3 sm:p-4">
          <div>
            <div className="mb-2 flex gap-1.5">{[["macOS","✓"],["Windows","✓"],["Linux","…"]].map(([os,status])=><div key={os} className="flex flex-1 items-center justify-center gap-1 rounded-md border border-white/10 bg-white/[0.06] px-1 py-1.5 text-[7px] text-white/70"><span className={status === "…" ? "text-violet-300" : "text-emerald-300"}>{status}</span>{os}</div>)}</div>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#7857d9] to-[#ae79ef]"><span className="block h-full w-full origin-left animate-pulse bg-white/25"/></div></div>
            <div className="space-y-1.5">{["Launch app", "Apply update", "Collect logs"].map((label,index)=><div key={label} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-[8px] text-white/75"><span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${index===0?"bg-emerald-400/15 text-emerald-300":"border border-white/15 text-white/40"}`}>{index===0?"✓":"·"}</span>{label}<span className="ml-auto h-1 w-7 rounded-full bg-white/10"/></div>)}</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#211e28] p-2 text-center">
            <svg viewBox="0 0 100 100" className="mb-2 h-14 w-14 -rotate-90"><circle cx="50" cy="50" r="39" fill="none" stroke="#eeeaf4" strokeWidth="9"/><circle cx="50" cy="50" r="39" fill="none" stroke="#8055d6" strokeWidth="9" strokeLinecap="round" strokeDasharray="245" strokeDashoffset="68"><animate attributeName="stroke-dashoffset" values="210;68;68;210" keyTimes="0;.55;.82;1" dur="5s" repeatCount="indefinite"/></circle></svg>
            <span className="text-[8px] font-semibold text-white/85">Checking builds</span><span className="mt-1 text-[7px] text-white/50">2 of 3 platforms</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[5%] right-[4%] flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#292530]/90 px-3 py-2 text-[9px] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-xl"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">✓</span>Live checks <span className="text-white/55">2 / 3</span></div>
    </div>
  );
}

function FingerprintVisual() {
  return (
    <div aria-hidden="true" className="relative mt-5 h-[190px] w-full overflow-hidden rounded-xl border border-white/15 bg-black p-3 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,.4)]">
      <div className="mb-3 flex items-center justify-between text-[8px] text-white/55"><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-violet-400"/>Release workflow</span><span className="rounded-full border border-white/15 bg-white/[0.08] px-2 py-1 text-emerald-300 shadow-sm">Running</span></div>
      <div className="relative grid grid-cols-3 gap-2">
        <svg className="absolute left-[16%] right-[16%] top-1/2 h-8 w-[68%] -translate-y-1/2 overflow-visible" viewBox="0 0 300 40" fill="none"><path d="M12 20h276" stroke="#ddd6e7" strokeWidth="2"/><path d="M12 20h276" stroke="#8e61d4" strokeWidth="2" strokeDasharray="8 8" className="insight-flow-line"/><circle cx="12" cy="20" r="4" fill="#b98ce9"/><circle cx="150" cy="20" r="4" fill="#b98ce9"/><circle cx="288" cy="20" r="4" fill="#b98ce9"/></svg>
        {[{icon:"⌘",label:"Commit",value:"a41c9e2"},{icon:"◇",label:"Build",value:"Passed"},{icon:"↗",label:"Deploy",value:"Live"}].map((step,index)=><div key={step.label} className="relative z-[1] rounded-lg border border-white/15 bg-white/[0.08] p-2 text-center shadow-[0_5px_14px_rgba(0,0,0,.12)] backdrop-blur-xl"><span className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md ${index===1?"bg-violet-400/15 text-violet-200":"bg-white/[0.08] text-white/60"}`}>{step.icon}</span><span className="block text-[8px] text-white/45">{step.label}</span><b className="mt-1 block text-[8px] font-medium text-white/85">{step.value}</b></div>)}
      </div>
      <div className="mt-3 flex items-center gap-2"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/><span className="text-[8px] text-white/55">All environments in sync</span><span className="ml-auto h-1 w-12 rounded-full bg-white/10"><i className="block h-full w-3/4 rounded-full bg-violet-400/80"/></span></div>
    </div>
  );
}

function CodeVisual() {
  return (
    <div aria-hidden="true" className="relative h-[245px] w-full shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#17151d]/95 text-white/80 shadow-[0_18px_48px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition-transform duration-700 group-hover:-translate-y-1">
      <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#211e28] px-3 text-[8px] text-white/55"><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#ff6b62]"/><i className="h-1.5 w-1.5 rounded-full bg-[#f8bd4f]"/><i className="h-1.5 w-1.5 rounded-full bg-[#55c678]"/><span className="ml-1.5">Build v0.21.2</span></span><span className="rounded-full bg-emerald-400/15 px-2 py-1 text-emerald-300">Successful</span></div>
      <div className="grid h-[calc(100%-32px)] grid-cols-[31%_1fr]">
        <div className="border-r border-white/10 bg-[#1d1a24] p-2"><div className="mb-2 text-[7px] uppercase tracking-wider text-white/40">Release steps</div>{["Validation","Smoke tests","Artifacts","Analytics"].map((item,index)=><div key={item} className={`mb-1 flex items-center gap-1.5 rounded px-1.5 py-1.5 text-[7px] ${index===1?"bg-white/[0.1] text-white/90 shadow-sm":"text-white/55"}`}><span className={index<2?"text-emerald-300":"text-white/30"}>{index<2?"✓":"·"}</span>{item}</div>)}</div>
        <div className="p-3"><div className="mb-2 flex items-center justify-between"><span className="text-[9px] font-semibold text-white/85">Performance report</span><span className="text-[7px] text-white/45">last 6 builds</span></div>
          <svg viewBox="0 0 300 90" className="h-[48%] w-full overflow-visible"><defs><linearGradient id="insightChartFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9670e6" stopOpacity=".38"/><stop offset="1" stopColor="#9670e6" stopOpacity="0"/></linearGradient></defs><path d="M0 72 42 63 82 69 124 39 165 48 205 26 246 36 300 11V90H0Z" fill="url(#insightChartFill)"/><path d="M0 72 42 63 82 69 124 39 165 48 205 26 246 36 300 11" fill="none" stroke="#b18aff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="420" strokeDashoffset="420" className="insight-chart-draw"/><circle cx="205" cy="26" r="4" fill="#d8c6ff" stroke="#211e28" strokeWidth="2"/></svg>
          <div className="mt-2 grid grid-cols-3 gap-1.5">{[["Launch", "1.2s"],["Memory", "118mb"],["CPU", "12%"]].map(([label,value])=><div key={label} className="rounded border border-white/10 bg-white/[0.06] px-2 py-1.5"><span className="block text-[7px] text-white/45">{label}</span><b className="text-[8px] font-semibold text-white/85">{value}</b></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function InsightLink({ children }: { children: ReactNode }) {
  return (
    <Link href="/insights" className="relative z-10 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black px-4 py-2 text-[11px] font-medium text-white shadow-[0_5px_14px_rgba(0,0,0,.18)] transition hover:bg-[#292929]">
      {children}<span aria-hidden="true">↗</span>
    </Link>
  );
}

export function InsightsLandingSection() {
  return (
    <section
      id="insights"
      aria-label="Insights and field notes"
      className="relative w-full overflow-hidden bg-white px-0 py-8 text-[#171717] sm:py-10"
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <header className="mb-5 flex flex-col justify-between gap-4 border-b border-black/15 pb-5 sm:mb-6 sm:flex-row sm:items-end sm:gap-8 sm:pb-6">
          <div className="shrink-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#555] sm:text-[13px]">Our Insights</p>
            <h2 className="whitespace-nowrap text-3xl font-light leading-none tracking-[-0.04em] text-black sm:text-4xl md:text-5xl lg:text-[52px]">Insights</h2>
          </div>
          <p className="max-w-lg pb-0.5 text-xs leading-relaxed text-black/65 sm:text-right sm:text-[13px]">
            Ideas and field notes on building thoughtful, dependable digital products.
          </p>
        </header>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-black/10 bg-[#e3e3e3] p-2 shadow-[0_20px_56px_rgba(0,0,0,.16)] sm:p-3 md:p-4">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[minmax(400px,auto)_auto] md:gap-5">
          <article className="group relative aspect-square min-h-[360px] overflow-hidden rounded-2xl border border-black/15 bg-black shadow-[0_12px_32px_rgba(0,0,0,.18)] md:col-span-4 md:row-start-1 md:aspect-auto md:min-h-0">
            <Image src="/om-bawal-photo.jpg" alt="Om Bawal, Founder and Chief Architect at 21Spheres" fill sizes="(max-width: 768px) 100vw, 34vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/95" />
            <span className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">CEO Insight / 01</span>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <blockquote className="mb-3 text-[11px] leading-relaxed text-white/85 sm:text-xs">
                “Most software fails not from a lack of features, but from friction and slowness. We architect every product for sub-second performance and resilient scale.”
              </blockquote>
              <div className="border-t border-white/25 pt-2.5">
                <p className="text-xs font-semibold text-white">Om Bawal</p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[0.14em] text-white/60">Founder &amp; Chief Architect</p>
              </div>
            </div>
          </article>

          <article className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#fafafa] p-5 shadow-[0_14px_32px_rgba(0,0,0,.14)] md:col-span-8 md:row-start-1">
            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <AppScanVisual />
              <SmokeTestVisual />
            </div>
            <div className="relative z-10 mt-4 max-w-[520px]">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-black/55">Engineering / 8 min read</p>
              <h2 className="mb-2 text-xl font-medium tracking-[-0.025em] text-black sm:text-2xl">Catch the edge cases earlier</h2>
              <p className="mb-4 max-w-xl text-xs leading-relaxed text-black/65 sm:text-[13px]">A closer look at code review signals, safer defaults, and the small checks that keep product bugs from reaching customers.</p>
              <InsightLink>Learn more</InsightLink>
            </div>
          </article>

          <article className="group relative min-h-[510px] overflow-hidden rounded-2xl border border-black/10 bg-[#fafafa] p-5 shadow-[0_14px_32px_rgba(0,0,0,.14)] md:col-span-4 md:row-start-2 md:min-h-0 md:h-full">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-black/55">Engineering Culture</p>
            <h2 className="mb-3 text-2xl font-medium tracking-[-0.03em] text-black sm:text-[27px]">The craft behind reliable software</h2>
            <p className="relative z-10 mb-4 max-w-sm text-xs leading-relaxed text-black/65 sm:text-[13px]">Good engineering is a set of small, deliberate decisions: make complexity visible, protect the critical path, and leave the system easier to change.</p>
            <InsightLink>Learn more</InsightLink>
            <FingerprintVisual />
          </article>

          <div className="grid min-h-[510px] grid-rows-[190px_1fr] gap-4 md:col-span-4 md:row-start-2 md:min-h-0 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
            <article className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/15 bg-black p-1 shadow-[0_12px_32px_rgba(0,0,0,.18)] md:aspect-auto md:h-full">
              <Image src="/insights/platform-grid-reference.png" alt="Figma, GitHub, and product interface tiles arranged on a dark platform grid" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover md:object-[center_62%]" />
              <div className="absolute inset-x-1 bottom-1 bg-gradient-to-t from-[#09090b]/95 via-[#09090b]/75 to-transparent px-4 pb-3 pt-10 text-left">
                <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.18em] text-violet-200/80">Interface systems / Figma</p>
                <h3 className="text-sm font-medium tracking-tight text-white">Design, connected to the build</h3>
                <p className="mt-1 text-[9px] leading-relaxed text-white/65">A shared system keeps every screen and component moving together.</p>
              </div>
            </article>

            <article className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-black/15 bg-black shadow-[0_12px_32px_rgba(0,0,0,.18)] md:min-h-0">
              <Image src="/insights/lap-track.png" alt="Purple and white lap lines circling a vertical race track marker" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/95 via-[#09090b]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mb-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-violet-200/85">Digital Strategy</p>
                <h2 className="text-lg font-medium tracking-[-0.025em] text-white">Strategy that connects</h2>
              </div>
            </article>
          </div>

          <article className="group relative flex min-h-[510px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#fafafa] p-5 shadow-[0_14px_32px_rgba(0,0,0,.14)] md:col-span-4 md:row-start-2 md:min-h-0 md:self-start">
            <CodeVisual />
            <div className="relative z-10 mt-4">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-black/55">Systems / Software Design</p>
              <h2 className="mb-3 text-2xl font-medium tracking-[-0.03em] text-black sm:text-[27px]">Architecture for the next scale</h2>
              <p className="mb-4 text-xs leading-relaxed text-black/65 sm:text-[13px]">A practical look at event-driven systems, performance budgets, and the foundations that let digital products grow without losing their speed.</p>
              <InsightLink>Learn more</InsightLink>
            </div>
          </article>
        </div>
        </div>
      </div>
    </section>
  );
}

export default InsightsLandingSection;
