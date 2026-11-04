"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* =========================================================================
   PortfolioHero — all CSS lives in the <style> tag at the bottom of this file.
   Every class is prefixed `sph-` so nothing leaks into (or out of) global CSS.
   Dark device scene outside, minimal light data screens inside:
   laptop (typing code) · monitor (heatmap, big number, dot grid, lollipop chart) · phone.
   ========================================================================= */

const STAGE_W = 1200;
const STAGE_H = 600;

/* ---- deterministic heatmap data (no hydration mismatch) ---- */
const WEEKS = 26;
const HEAT: number[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const s = Math.sin((w + 1) * 127.1 + (d + 1) * 311.7) * 43758.5453;
    const r = s - Math.floor(s);
    const weekday = d > 0 && d < 6 ? 0.14 : -0.04;
    const wave = (Math.sin(w * 0.33) + Math.cos(w * 0.17)) * 0.06;
    const v = Math.min(0.999, Math.max(0, r + weekday + wave));
    return v < 0.4 ? 0 : v < 0.62 ? 1 : v < 0.8 ? 2 : v < 0.92 ? 3 : 4;
  })
);

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const LOLLI = [48, 44, 52, 50, 64, 76, 78, 100, 66, 82, 60, 42];
const PEAK = 7;
const DOTS = 72;
const DOTS_ON = 63; // 87%

type Tok = [string, string];
const CODE: Tok[][] = [
  [["k", "export async function "], ["f", "ship"], ["p", "("], ["v", "build"], ["p", ") {"]],
  [["k", "  const "], ["v", "image"], ["p", " = "], ["k", "await "], ["v", "docker"], ["p", "."], ["f", "build"], ["p", "("], ["v", "build"], ["p", ");"]],
  [["k", "  await "], ["v", "cache"], ["p", "."], ["f", "warm"], ["p", "("], ["s", "'edge'"], ["p", ");"]],
  [["k", "  for await "], ["p", "("], ["k", "const "], ["v", "check "], ["k", "of "], ["f", "probes"], ["p", "()) {"]],
  [["k", "    if "], ["p", "(!"], ["v", "check"], ["p", "."], ["v", "ok"], ["p", ") "], ["k", "return "], ["f", "rollback"], ["p", "("], ["v", "image"], ["p", ");"]],
  [["p", "  }"]],
  [["k", "  return "], ["f", "publish"], ["p", "("], ["v", "image"], ["p", ");"]],
  [["p", "}"]],
  [["c", "// deploy healthy, 2.4s"]],
];

// typing timeline: each line types at ~55 chars/sec with a short pause between lines
const CHAR_S = 0.018;
const GAP_S = 0.22;
let _t = 0.5;
const LINES = CODE.map((line) => {
  const n = line.reduce((a, t) => a + t[1].length, 0);
  const du = Math.max(0.12, n * CHAR_S);
  const dl = _t;
  _t += du + GAP_S;
  return { n, du, dl };
});
const TYPE_END = _t;

function useStageScale(copyRef: React.RefObject<HTMLDivElement | null>) {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ scale: 1, left: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const copyH = copyRef.current?.offsetHeight ?? 150;
      // viewport minus navbar, copy block, paddings and gaps, so the whole hero sits in one screen
      const availH = window.innerHeight - copyH - 150;
      const scale = Math.max(0.3, Math.min(1.1, w / STAGE_W, availH / STAGE_H));
      setDim({ scale, left: (w - STAGE_W * scale) / 2 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [copyRef]);
  return { ref, ...dim };
}

function useCountUp(target: number, ms = 2200, run = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, run]);
  return n;
}

export function PortfolioHero() {
  const copyRef = useRef<HTMLDivElement>(null);
  const { ref, scale, left } = useStageScale(copyRef);
  const [cycle, setCycle] = useState(0);
  const total = useCountUp(2847, 2400, cycle);
  const commits = useCountUp(1284, 2400, cycle);
  const prs = useCountUp(148, 2000, cycle);
  const reviews = useCountUp(392, 2200, cycle);
  const growth = useCountUp(184, 2200, cycle);
  const pass = useCountUp(87, 2200, cycle);

  // restart the typing sequence so the laptop code keeps "running"
  useEffect(() => {
    const id = window.setInterval(() => setCycle((c) => c + 1), 11000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="sph-root" aria-label="21Spheres selected work">
      <div className="sph-aurora" aria-hidden />
      <div className="sph-gridlines" aria-hidden />
      <div className="sph-grain" aria-hidden />

      <div ref={copyRef} className="sph-copy">
        <h1 className="sph-title">Products we&rsquo;ve shipped.</h1>
        <p className="sph-sub">
          Thoughtful engineering, steady momentum, and products built to do meaningful work.
        </p>
        <div className="sph-links-wrap" style={{ display: "inline-flex", gap: "16px", alignItems: "center", justifyContent: "center", marginTop: "14px" }}>
          <Link href="#case-studies" className="sph-link" style={{ marginTop: 0 }}>
            Explore case studies <ArrowRight size={14} />
          </Link>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>•</span>
          <Link href="/contact" className="sph-link" style={{ marginTop: 0, color: "rgba(255,255,255,0.55)" }}>
            Discuss a product
          </Link>
        </div>
      </div>

      <div ref={ref} className="sph-wrap" style={{ height: STAGE_H * scale }}>
        <div
          className="sph-stage"
          style={{ transform: `scale(${scale})`, left }}
          role="img"
          aria-label="Laptop running code beside a monitor showing an animated contribution heatmap and charts, and a phone"
        >
          <div className="sph-halo" aria-hidden />
          <div className="sph-floor" aria-hidden />

          {/* ───────── floating glass: uptime ───────── */}
          <div className="sph-glass sph-g1" aria-hidden>
            <div className="sph-g-label"><i className="sph-g-dot" /> Uptime <em>last 90 days</em></div>
            <div className="sph-g-big">99.98%</div>
            <div className="sph-g-track"><i /></div>
          </div>

          {/* ───────── floating glass: pull requests ───────── */}
          <div className="sph-glass sph-g2" aria-hidden>
            <div className="sph-g-label">Pull requests merged</div>
            <div className="sph-g-big">{prs}<em>+12 vs last quarter</em></div>
            <div className="sph-g-bars">
              {[40, 65, 52, 78, 60, 90].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
          </div>

          {/* ───────── LAPTOP ───────── */}
          <div className="sph-laptop" aria-hidden>
            <div className="sph-lap-lid">
              <div className="sph-lap-screen">
                <div className="sph-ed-tabs mono">
                  <span className="on"><i />deploy.ts<b /></span>
                  <span><i />cache.ts</span>
                  <span><i className="js" />probes.js</span>
                </div>
                <div className="sph-lap-body">
                  <div className="sph-act" aria-hidden><i className="on" /><i /><i /><i /></div>
                  <div className="sph-tree">
                    <p>EXPLORER</p>
                    <span className="d">v deploy-service</span>
                    <span className="d f">v src</span>
                    <span className="f2 on">deploy.ts</span>
                    <span className="f2">cache.ts</span>
                    <span className="f2">probes.js</span>
                    <span className="d f">&gt; tests</span>
                    <span className="f">package.json</span>
                    <span className="f">tsconfig.json</span>
                  </div>
                  <div className="sph-code" key={cycle}>
                    {CODE.map((line, i) => (
                      <div
                        className="sph-ln"
                        key={i}
                        style={{ ["--n" as string]: LINES[i].n, ["--du" as string]: `${LINES[i].du}s`, ["--dl" as string]: `${LINES[i].dl}s` } as React.CSSProperties}
                      >
                        <b>{i + 1}</b>
                        <span className="sph-ln-wrap">
                          <span className="sph-ln-text">
                            {line.map(([c, t], j) => (
                              <span key={j} className={`sph-t-${c}`}>{t}</span>
                            ))}
                          </span>
                          <i className="sph-tcaret" />
                        </span>
                      </div>
                    ))}
                    <div className="sph-ln" style={{ ["--dl" as string]: `${TYPE_END - 0.2}s` } as React.CSSProperties}>
                      <b>{CODE.length + 1}</b>
                      <span className="sph-ln-wrap"><i className="sph-ecaret" /></span>
                    </div>
                  </div>
                </div>
                <div className="sph-term mono" key={`t${cycle}`} style={{ ["--t0" as string]: `${TYPE_END}s` } as React.CSSProperties}>
                  <p className="r1"><i /> Build passed <span>214 modules, 2.4s</span></p>
                  <p className="r2"><i /> 128 tests passed <span>0 failed</span></p>
                  <p className="r3"><i className="p" /> Deployed to production <span>ap-south-1</span></p>
                </div>
                <div className="sph-status mono">
                  <span><b>main</b><b>0 errors</b></span>
                  <span><b>Ln 9, Col 24</b><b>TypeScript</b><b>UTF-8</b></span>
                </div>
              </div>
            </div>
            <div className="sph-lap-base"><span /></div>
          </div>

          {/* ───────── MONITOR ───────── */}
          <div className="sph-monitor">
            <div className="sph-mon-body">
              <div className="sph-mon-screen">
                <div className="sph-topbar">
                  <div className="sph-crumb"><b>21Spheres</b><span>/</span>Engineering</div>
                  <div className="sph-tabs mono"><span>Week</span><span>Month</span><span className="on">Year</span></div>
                  <span className="sph-live mono"><i /> Live</span>
                </div>
                <div className="sph-dash-grid">
                  {/* heatmap */}
                  <div className="sph-card sph-heat-card">
                    <div className="sph-card-top">
                      <p className="sph-lbl">Contributions, last 6 months</p>
                      <div className="sph-legend mono" aria-hidden>
                        Less <i className="l0" /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /> More
                      </div>
                    </div>
                    <div className="sph-heat-head">
                      <p className="sph-big">{total.toLocaleString("en-US")}</p>
                      <div className="sph-mini-stats">
                        <div><b>{commits.toLocaleString("en-US")}</b><span>Commits</span></div>
                        <div><b>{prs}</b><span>Pull requests</span></div>
                        <div><b>{reviews}</b><span>Reviews</span></div>
                      </div>
                    </div>
                    <div className="sph-heat-wrap">
                      <div className="sph-days mono" aria-hidden>
                        <span /><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span />
                      </div>
                      <div className="sph-heat-main">
                        <div className="sph-months mono" aria-hidden>
                          <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                        </div>
                        <div className="sph-heat" aria-label="Animated contribution heatmap">
                          {HEAT.flatMap((col, w) =>
                            col.map((lvl, d) => (
                              <span
                                key={`${w}-${d}`}
                                className={`sph-cell l${lvl}`}
                                style={{
                                  gridColumn: w + 1,
                                  gridRow: d + 1,
                                  ["--w" as string]: w,
                                  ["--d" as string]: d,
                                } as React.CSSProperties}
                              />
                            ))
                          )}
                          <span className="sph-sweep" aria-hidden />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* big number + plan vs fact */}
                  <div className="sph-card sph-fact-card">
                    <p className="sph-huge">+{(growth / 10).toFixed(1)}%</p>
                    <p className="sph-lbl muted">More shipped than in 2025</p>
                    <svg viewBox="0 0 120 26" preserveAspectRatio="none" className="sph-spark" aria-hidden>
                      <path className="sph-spark-fill" d="M0 20 C10 18 14 22 26 15 S46 17 58 11 S80 13 92 7 S110 8 120 2 V26 H0Z" />
                      <path className="sph-spark-line" pathLength={1} d="M0 20 C10 18 14 22 26 15 S46 17 58 11 S80 13 92 7 S110 8 120 2" />
                      <circle className="sph-spark-dot" cx="119" cy="2" r="2" />
                    </svg>
                    <div className="sph-pf">
                      <div className="sph-pf-track"><i /></div>
                      <div className="sph-pf-cap mono">
                        <span>FACT +18.4%</span>
                        <span>PLAN +15.8%</span>
                      </div>
                    </div>
                  </div>

                  {/* dot grid */}
                  <div className="sph-card sph-dots-card">
                    <p className="sph-lbl mono">FIRST-RUN PASS RATE</p>
                    <div className="sph-dots" aria-hidden>
                      {Array.from({ length: DOTS }, (_, i) => (
                        <i
                          key={i}
                          className={i < DOTS_ON ? "on" : ""}
                          style={{ ["--dl" as string]: `${0.5 + i * 0.03}s` } as React.CSSProperties}
                        />
                      ))}
                    </div>
                    <div className="sph-dots-foot">
                      <p className="sph-big">{pass}%</p>
                      <p className="sph-lbl">of deploys passed on the first run</p>
                    </div>
                  </div>

                  {/* lollipop chart */}
                  <div className="sph-card sph-lolli-card">
                    <div className="sph-card-top">
                      <p className="sph-lbl mono">DEPLOYS BY MONTH</p>
                      <p className="sph-lbl mono">PEAK AUG, 148</p>
                    </div>
                    <div className="sph-lolli">
                      {LOLLI.map((h, i) => (
                        <div key={i} className={`sph-stem-col${i === PEAK ? " peak" : ""}`}>
                          <div className="sph-stem-area">
                            <i
                              className="sph-stem"
                              style={{ height: `${h}%`, animationDelay: `${0.7 + i * 0.09}s` }}
                            />
                          </div>
                          <span className="mono">{MONTHS[i]}</span>
                        </div>
                      ))}
                      <div className="sph-tip mono"><b>Aug</b> 148 deploys</div>
                    </div>
                  </div>
                </div>
                <span className="sph-glare" aria-hidden />
              </div>
            </div>
            <div className="sph-neck" />
            <div className="sph-foot" />
          </div>

          {/* ───────── PHONE ───────── */}
          <div className="sph-phone" aria-hidden>
            <div className="sph-phone-in sph-phone-brand-screen">
              <i className="sph-island" />
              <svg className="sph-phone-lightning" viewBox="0 0 180 220" fill="none" aria-hidden="true">
                <path d="M42 14 55 54 40 68 66 96 52 116 79 139" />
                <path d="M137 20 123 53 141 72 112 101 128 124 99 150" />
                <path d="M19 82 47 91 57 111" />
                <path d="M162 78 134 91 124 111" />
              </svg>
              <div className="sph-phone-brand-lockup">
                <Image src="/logo-square.png" alt="" width={88} height={88} className="sph-phone-screen-logo" />
                <span className="sph-phone-wordmark">21Spheres</span>
                <span className="sph-phone-tagline">Engineering what&rsquo;s next.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{CSS}</style>
    </section>
  );
}

export default PortfolioHero;

/* =========================================================================
   SCOPED CSS
   ========================================================================= */
const CSS = `
.sph-root{
  --bg:#05060A; --ink:#F4F4F6; --mute:rgba(244,244,246,.56);
  --violet:#7057D9;
  --pu:#7057D9; --screen:#D3D5D9; --paper:#E6E7EA; --paper-hi:#F0F1F3; --paper-ink:#1A1A1A; --paper-mute:#7D8189; --hair:#BBBEC4; --cell:#CDD0D6; --o:#FF4F00;
  --noise-w:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  --noise-k:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  --sans:"Helvetica Neue",Helvetica,Arial,system-ui,sans-serif;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  position:relative; isolation:isolate; overflow:hidden;
  background:var(--bg); color:var(--ink);
  padding:64px 20px 24px; min-height:100svh;
  display:flex; flex-direction:column; justify-content:center;
}
.sph-root *{box-sizing:border-box}
.sph-root .mono{font-family:var(--mono)}

/* ambient background */
.sph-aurora{position:absolute;inset:0;z-index:-2;pointer-events:none;
  background:
    radial-gradient(55% 45% at 50% 66%, rgba(112,87,217,.16), transparent 70%);}
.sph-gridlines{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.35;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:56px 56px;
  -webkit-mask-image:radial-gradient(70% 60% at 50% 55%,#000 30%,transparent 80%);
          mask-image:radial-gradient(70% 60% at 50% 55%,#000 30%,transparent 80%)}

/* copy */
.sph-copy{max-width:820px;margin:0 auto;text-align:center;animation:sph-rise .9s cubic-bezier(.2,.7,.2,1) both}
.sph-title{margin:0;white-space:nowrap;font-size:clamp(26px,5vw,60px);line-height:1.05;font-weight:300;letter-spacing:-.055em;text-shadow:0 0 48px rgba(167,139,250,.30)}
.sph-sub{margin:12px auto 0;max-width:680px;font-size:clamp(13px,1.3vw,15px);line-height:1.5;color:var(--mute)}
.sph-link{display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:13px;font-weight:500;
  color:rgba(255,255,255,.78);text-decoration:none;transition:color .2s,gap .2s}
.sph-link:hover{color:#fff;gap:12px}

/* stage */
.sph-wrap{position:relative;width:100%;max-width:1320px;margin:16px auto 0}
.sph-stage{position:absolute;top:0;width:${STAGE_W}px;height:${STAGE_H}px;transform-origin:top left;
  animation:sph-stage-in 1.1s cubic-bezier(.2,.7,.2,1) .15s both}
.sph-floor{position:absolute;left:90px;right:90px;bottom:6px;height:70px;border-radius:50%;
  background:radial-gradient(closest-side,rgba(112,87,217,.55),transparent);filter:blur(24px)}

/* idle float */

/* ───────── MONITOR (minimal light screen) ───────── */
.sph-monitor{position:absolute;left:290px;top:6px;width:640px}
.sph-mon-body{padding:8px;border-radius:10px;
  background:linear-gradient(145deg,#d9dbe2 0%,#5a5e6a 6%,#14161c 18%,#07080b 80%,#6f7480 96%,#1a1c22);
  box-shadow:0 40px 80px -30px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.07),0 0 80px -6px rgba(112,87,217,.45),0 0 160px -20px rgba(112,87,217,.35)}
.sph-mon-screen{position:relative;height:404px;overflow:hidden;border-radius:3px;background:var(--screen);
  font-family:var(--sans);color:var(--paper-ink);padding:14px}
.sph-glare{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,rgba(255,255,255,.35),transparent 22%,transparent 72%,rgba(255,255,255,.12))}
.sph-neck{width:96px;height:62px;margin:-1px auto 0;
  background:linear-gradient(90deg,#2a2d35,#8b909c 45%,#3a3e47);clip-path:polygon(16% 0,84% 0,100% 100%,0 100%)}
.sph-foot{width:230px;height:9px;margin:0 auto;border-radius:0 0 40px 40px / 0 0 9px 9px;
  background:linear-gradient(#9aa0ad,#3b3f48);box-shadow:0 18px 30px rgba(0,0,0,.6)}

.sph-dash-grid{height:calc(100% - 26px);display:grid;gap:10px;
  grid-template-columns:1.15fr 1fr 1fr;grid-template-rows:1.12fr 1fr;
  grid-template-areas:"heat heat fact" "dots lolli lolli"}
.sph-card{position:relative;min-width:0;min-height:0;overflow:hidden;padding:10px 11px;
  border:1px solid var(--hair);background:linear-gradient(180deg,var(--paper-hi),var(--paper))}
.sph-heat-card{grid-area:heat;display:flex;flex-direction:column}
.sph-fact-card{grid-area:fact;display:flex;flex-direction:column;justify-content:space-between}
.sph-dots-card{grid-area:dots;display:flex;flex-direction:column;justify-content:space-between}
.sph-lolli-card{grid-area:lolli;display:flex;flex-direction:column}
.sph-card-top{display:flex;justify-content:space-between;align-items:flex-start}

.sph-lbl{margin:0;font-size:8px;line-height:1.35;color:var(--paper-ink)}
.sph-lbl.mono{font-size:6.5px;letter-spacing:.04em;color:var(--paper-mute)}
.sph-lbl.muted{color:var(--paper-mute)}
.sph-big{margin:2px 0 0;font-size:30px;line-height:1;font-weight:400;letter-spacing:-.06em;font-variant-numeric:tabular-nums}
.sph-huge{margin:0;font-size:38px;line-height:1;font-weight:400;letter-spacing:-.07em;white-space:nowrap}

/* heatmap: GitHub green, fills up in a wave then drains, on a loop */
.sph-heat-wrap{display:flex;gap:5px;margin-top:8px}
.sph-days{display:grid;grid-template-rows:repeat(7,1fr);padding-top:11px;font-size:5.5px;color:var(--paper-mute);line-height:1;align-items:center}
.sph-heat-main{flex:1;min-width:0}
.sph-heat{position:relative;margin-top:3px;display:grid;gap:3px;
  grid-template-columns:repeat(${WEEKS},1fr);grid-template-rows:repeat(7,auto)}
.sph-cell{--dl:calc(.3s + var(--w) * .075s + var(--d) * .02s);aspect-ratio:1}
.sph-cell,.sph-pc{position:relative;border-radius:2px;background:var(--cell);outline:1px solid rgba(27,31,35,.07);outline-offset:-1px}
.sph-cell::after,.sph-pc::after,.sph-dots i.on::after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--c,transparent);
  opacity:0;animation:sph-fill 11s cubic-bezier(.3,.7,.2,1) var(--dl,0s) infinite both}
.l1{--c:#9BE9A8}.l2{--c:#40C463}.l3{--c:#30A14E}.l4{--c:#216E39}
.l4::after{box-shadow:0 0 6px rgba(33,110,57,.55)}
.sph-legend .l0{background:var(--cell)}.sph-legend .l1{background:#9BE9A8}.sph-legend .l2{background:#40C463}.sph-legend .l3{background:#30A14E}.sph-legend .l4{background:#216E39}
.sph-sweep{position:absolute;top:-4px;bottom:-4px;width:56px;left:0;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(48,161,78,.16),transparent);
  animation:sph-sweep 5.5s ease-in-out 2.4s infinite}
.sph-months{display:flex;justify-content:space-between;font-size:6px;color:var(--paper-mute)}
.sph-legend{display:flex;align-items:center;justify-content:flex-end;gap:3px;font-size:6px;color:var(--paper-mute)}
.sph-legend i{width:8px;height:8px;border-radius:2px;outline:1px solid rgba(27,31,35,.06);outline-offset:-1px}
.sph-legend i:first-of-type{margin-left:2px}

/* plan vs fact */
.sph-pf-track{position:relative;height:13px;background:#B1B4BA}
.sph-pf-track i{position:absolute;left:0;top:0;bottom:0;width:62%;background:var(--pu);transform-origin:left;
  animation:sph-loop-x 11s cubic-bezier(.3,.7,.2,1) .9s infinite both}
.sph-pf-cap{display:flex;justify-content:space-between;margin-top:5px;font-size:6px;color:var(--paper-mute);letter-spacing:.03em}
.sph-pf-cap span:first-child{color:var(--paper-ink)}

/* dot grid */
.sph-dots{display:grid;grid-template-columns:repeat(12,1fr);gap:4px;padding:2px 0}
.sph-dots i{position:relative;aspect-ratio:1;border-radius:1.5px;background:#BFC2C8}
.sph-dots i.on{--c:var(--pu)}
.sph-dots-foot{display:flex;align-items:flex-end;gap:8px}
.sph-dots-foot .sph-big{font-size:26px}
.sph-dots-foot .sph-lbl{padding-bottom:3px;font-size:6.5px;color:var(--paper-mute);max-width:70px}

/* lollipop chart */
.sph-lolli{flex:1;min-height:0;display:flex;gap:0;margin-top:8px;
  background-image:repeating-linear-gradient(to right,#B5B5B5 0 1px,transparent 1px 4px);
  background-size:100% 1px;background-repeat:no-repeat;background-position:0 0}
.sph-stem-col{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center}
.sph-stem-area{position:relative;flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;border-bottom:1px solid var(--paper-ink)}
.sph-stem{position:relative;display:block;width:1px;background:var(--pu);transform-origin:bottom;
  animation:sph-loop-y 11s cubic-bezier(.3,.7,.2,1) infinite both}
.sph-stem::after{content:"";position:absolute;left:50%;top:0;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:inherit}
.sph-stem-col.peak .sph-stem{background:var(--o)}
.sph-stem-col.peak .sph-stem::after{animation:sph-pulse 2.4s ease-in-out infinite;width:8px;height:8px;margin:-4px 0 0 -4px}
.sph-stem-col span{margin-top:4px;font-size:5.5px;color:var(--paper-mute)}
.sph-stem-col.peak span{color:var(--o)}

/* ───────── LAPTOP (minimal light screen) ───────── */
.sph-laptop{position:absolute;left:0;top:268px;width:410px;z-index:3;
  filter:drop-shadow(0 34px 40px rgba(0,0,0,.65))}
.sph-lap-lid{padding:8px 8px 10px;border-radius:9px 9px 3px 3px;
  background:linear-gradient(160deg,#9296a2,#2a2d35 8%,#0b0c10 30%,#0b0c10 85%,#4a4e59);
  box-shadow:0 0 0 1px rgba(255,255,255,.08),0 0 60px -8px rgba(255,110,40,.30)}
.sph-lap-screen{position:relative;height:240px;overflow:hidden;border-radius:2px;background:#14161B}
.sph-lap-base{position:relative;height:14px;margin:0 -26px;border-radius:2px 2px 18px 18px / 2px 2px 14px 14px;
  background:linear-gradient(#aeb2bd,#6d717c 40%,#2a2d35)}
.sph-lap-base span{position:absolute;left:50%;top:0;width:84px;height:5px;transform:translateX(-50%);
  border-radius:0 0 8px 8px;background:#1b1d23}
.sph-ed-tabs{display:flex;height:20px;background:#0E1013;border-bottom:1px solid #23262D;font-size:8px;color:#8B909A}
.sph-ed-tabs span{display:flex;align-items:center;gap:5px;padding:0 10px;border-right:1px solid #23262D}
.sph-ed-tabs span.on{background:#14161B;color:#E6E6E6;box-shadow:inset 0 1px 0 var(--pu)}
.sph-ed-tabs i{width:6px;height:6px;border-radius:1px;background:#3B82F6}
.sph-ed-tabs i.js{background:#E5C07B}
.sph-ed-tabs b{width:5px;height:5px;margin-left:4px;border-radius:50%;background:#8B909A}
.sph-lap-body{display:flex;height:calc(100% - 20px - 24px - 14px);overflow:hidden}
.sph-act{width:20px;flex:none;display:flex;flex-direction:column;align-items:center;gap:9px;padding-top:8px;background:#0B0C0F;border-right:1px solid #1B1D23}
.sph-act i{width:9px;height:9px;border-radius:2px;border:1px solid #5C6270}
.sph-act i.on{border-color:#E6E6E6;background:rgba(255,255,255,.12)}
.sph-tree{width:72px;flex:none;padding:7px 0;background:#101216;border-right:1px solid #1B1D23;font:7px var(--mono);color:#9AA0AA}
.sph-tree p{margin:0 0 5px;padding:0 8px;font-size:6px;letter-spacing:.06em;color:#6B7280}
.sph-tree span{display:block;padding:2.5px 8px;white-space:nowrap}
.sph-tree .d{color:#C5C8CF}.sph-tree .f{padding-left:14px}.sph-tree .f2{padding-left:22px}
.sph-tree .on{background:rgba(112,87,217,.25);color:#fff}
.sph-code{position:relative;flex:1;min-width:0;padding:6px 6px 0 0;font:9.5px/16px var(--mono);color:#D4D4D4;overflow:hidden}
.sph-ln{display:flex;height:16px;white-space:pre}
.sph-ln b{width:26px;flex:none;padding-right:10px;font-weight:400;color:#4B515C;text-align:right}
.sph-ln-wrap{display:inline-flex;align-items:center}
.sph-ln-text{display:inline-block;overflow:hidden;white-space:pre;width:0;
  animation:sph-type var(--du) steps(var(--n),end) var(--dl) forwards}
.sph-t-k{color:#C586C0}.sph-t-f{color:#DCDCAA}.sph-t-s{color:#CE9178}.sph-t-v{color:#9CDCFE}.sph-t-c{color:#6A9955;font-style:italic}.sph-t-p{color:#D4D4D4}
.sph-tcaret,.sph-ecaret{display:inline-block;width:1.5px;height:12px;background:#AEAFAD}
.sph-tcaret{opacity:0;animation:sph-clife calc(var(--du) + .22s) linear var(--dl) forwards}
.sph-ecaret{visibility:hidden;animation:sph-show 0s linear var(--dl) forwards,sph-blink 1s steps(2) var(--dl) infinite}
.sph-term{position:absolute;left:0;right:0;bottom:14px;height:24px;border-top:1px solid #23262D;background:#0D0F13;font-size:8px;color:#D4D4D4}
.sph-term p{position:absolute;inset:0;margin:0;display:flex;align-items:center;gap:6px;padding:0 12px;opacity:0}
.sph-term .r1{animation:sph-row 1.5s ease calc(var(--t0) + .2s) both}
.sph-term .r2{animation:sph-row 1.5s ease calc(var(--t0) + 1.5s) both}
.sph-term .r3{animation:sph-fade .4s ease calc(var(--t0) + 2.8s) both}
.sph-term i{width:6px;height:6px;border-radius:50%;background:#3FB950}
.sph-term i.p{background:#A78BFA}
.sph-term span{margin-left:auto;color:#6B7280}
.sph-status{position:absolute;left:0;right:0;bottom:0;height:14px;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:var(--pu);color:#fff;font-size:6.5px}
.sph-status span{display:flex;gap:10px}
.sph-status b{font-weight:400}

/* ───────── PHONE (minimal light screen) ───────── */
.sph-phone{position:absolute;left:880px;top:300px;width:136px;height:282px;z-index:4;padding:4px;border:1px solid rgba(224,220,246,.9);border-radius:27px;
  background:linear-gradient(145deg,#f4f2ff 0%,#8B879A 5%,#22212A 14%,#101016 78%,#B9B3CC 100%);
  box-shadow:0 0 0 1px rgba(255,255,255,.34),0 30px 58px -18px rgba(0,0,0,.9),0 0 32px -16px rgba(157,132,255,.72),inset 0 0 0 1px rgba(255,255,255,.42)}
.sph-phone-in{position:relative;height:100%;overflow:hidden;border-radius:22px;background:var(--screen);
  font-family:var(--sans);color:var(--paper-ink);padding:32px 13px 12px}
.sph-phone-brand-screen{display:grid;place-items:center;padding:28px 10px 14px;background:#020204;color:#fff}
.sph-phone-lightning{position:absolute;inset:18% 8% 16%;width:84%;height:66%;overflow:visible;z-index:1;pointer-events:none}
.sph-phone-lightning path{stroke:#C9B9FF;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:120;stroke-dashoffset:120;
  filter:drop-shadow(0 0 5px rgba(145,110,255,.95));animation:sph-phone-lightning-flash 1.35s ease-out both}
.sph-phone-lightning path:nth-child(2){animation-delay:.12s}
.sph-phone-lightning path:nth-child(3){animation-delay:.2s}
.sph-phone-lightning path:nth-child(4){animation-delay:.28s}
.sph-phone-brand-lockup{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px}
.sph-phone-screen-logo{display:block;width:84px;height:84px;object-fit:contain;opacity:0;
  filter:drop-shadow(0 0 14px rgba(112,87,217,.55));clip-path:circle(0 at 50% 50%);animation:sph-phone-logo-reveal .85s cubic-bezier(.16,1,.3,1) 1.05s both}
.sph-phone-wordmark{color:#F8F7FC;font-size:14px;font-weight:500;letter-spacing:-.045em;opacity:0;clip-path:inset(0 100% 0 0);
  animation:sph-phone-wordmark-in .72s cubic-bezier(.2,.75,.25,1) 1.72s both}
.sph-phone-tagline{color:rgba(239,236,248,.68);font-size:7px;letter-spacing:.01em;opacity:0;
  animation:sph-phone-tagline-in .6s cubic-bezier(.2,.75,.25,1) 2.22s both}
.sph-island{position:absolute;left:50%;top:8px;width:44px;height:12px;transform:translateX(-50%);border-radius:99px;background:#000}
.sph-p-lbl{margin:0;font-size:7px;color:var(--paper-mute)}
.sph-p-big{margin:3px 0 0;font-size:30px;line-height:1;font-weight:400;letter-spacing:-.07em}
.sph-p-bars{margin-top:14px;display:grid;gap:8px}
.sph-p-bar-top{display:flex;justify-content:space-between;font-size:7px}
.sph-p-bar-top b{font:6px var(--mono);font-weight:400;color:var(--paper-mute)}
.sph-p-line{position:relative;height:1px;margin-top:3px;background:#B1B4BA}
.sph-p-line i{position:absolute;left:0;top:-1px;height:3px;background:var(--paper-ink);transform-origin:left;
  animation:sph-loop-x 11s cubic-bezier(.3,.7,.2,1) infinite both}
.sph-p-line.hot i{background:var(--o)}
.sph-p-heat{display:grid;grid-template-columns:repeat(9,1fr);gap:3px;margin-top:16px}
.sph-pc{aspect-ratio:1;border-radius:1px}
.sph-p-row{display:flex;justify-content:space-between;margin-top:12px;padding-top:7px;border-top:1px solid var(--hair);font-size:7px;color:var(--paper-mute)}
.sph-p-row b{color:var(--pu);font-weight:500}

/* ───────── FLOATING GLASS ───────── */
.sph-glass{position:absolute;z-index:2;padding:12px 14px;border-radius:4px;
  background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.13);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 0 36px -10px rgba(112,87,217,.45)}
.sph-g1{left:40px;top:70px;width:170px}
.sph-g2{left:1010px;top:90px;width:156px}
.sph-g-label{font-size:10px;color:rgba(255,255,255,.55)}
.sph-g-big{margin-top:4px;font-size:26px;font-weight:300;letter-spacing:-.05em}
.sph-g-track{position:relative;height:1px;margin-top:10px;background:rgba(255,255,255,.25)}
.sph-g-track i{position:absolute;left:0;top:-1px;height:3px;width:99%;background:#9B86F2;transform-origin:left;
  animation:sph-loop-x 11s cubic-bezier(.3,.7,.2,1) 1s infinite both}
.sph-g-bars{display:flex;align-items:flex-end;gap:5px;height:34px;margin-top:8px}
.sph-g-bars i{flex:1;border-radius:1px;transform-origin:bottom;background:#8B73F0;
  animation:sph-loop-y 11s cubic-bezier(.3,.7,.2,1) infinite both}

/* ───────── EXTRA ELEMENTS ───────── */
.sph-topbar{display:flex;align-items:center;justify-content:space-between;height:18px;margin-bottom:8px;font-size:7.5px;color:var(--paper-mute)}
.sph-crumb b{font-weight:600;color:var(--paper-ink)}.sph-crumb span{margin:0 5px}
.sph-tabs{display:flex;gap:12px;font-size:6.5px}
.sph-tabs span{padding-bottom:2px;border-bottom:1px solid transparent}
.sph-tabs span.on{color:var(--paper-ink);border-color:var(--pu)}
.sph-live{display:inline-flex;align-items:center;gap:4px;font-size:6.5px;color:var(--paper-ink)}
.sph-live i,.sph-p-live i,.sph-g-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:#30A14E;animation:sph-ping 1.8s ease-out infinite}
.sph-heat-head{display:flex;align-items:flex-end;justify-content:space-between}
.sph-mini-stats{display:flex;gap:14px}
.sph-mini-stats b{display:block;font-size:11px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.sph-mini-stats span{font-size:6px;color:var(--paper-mute)}
.sph-spark{width:100%;height:26px;overflow:visible}
.sph-spark-line{fill:none;stroke:var(--pu);stroke-width:1.6;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;
  animation:sph-loop-draw 11s cubic-bezier(.3,.7,.2,1) .6s infinite both}
.sph-spark-fill{fill:rgba(112,87,217,.14);opacity:0;animation:sph-loop-fade 11s ease 1s infinite both}
.sph-spark-dot{fill:var(--o);opacity:0;animation:sph-loop-fade 11s ease 2s infinite both}
.sph-lolli{position:relative}
.sph-tip{position:absolute;left:calc(62.5% + 12px);top:-3px;padding:3px 6px;font-size:6.5px;white-space:nowrap;
  background:var(--paper-ink);color:#fff;opacity:0;animation:sph-loop-fade 11s ease 2.2s infinite both}
.sph-tip b{margin-right:4px;font-weight:500;color:#FF8A5C}
.sph-p-top{display:flex;align-items:center;justify-content:space-between}
.sph-p-live{display:inline-flex;align-items:center;gap:3px;font-size:6px;color:var(--paper-ink)}
.sph-p-cap{margin:12px 0 0;font-size:6.5px;color:var(--paper-mute)}
.sph-p-week{display:flex;align-items:flex-end;gap:4px;height:24px;margin-top:5px;border-bottom:1px solid var(--paper-ink)}
.sph-p-week i{flex:1;background:#A9ADB4;transform-origin:bottom;animation:sph-loop-y 11s cubic-bezier(.3,.7,.2,1) infinite both}
.sph-p-week i.hot{background:var(--pu)}
.sph-g-label em{font-style:normal;margin-left:6px;font-size:8px;color:rgba(255,255,255,.4)}
.sph-g-big em{font-style:normal;font-size:9px;letter-spacing:0;color:rgba(255,255,255,.5);margin-left:6px}

/* ───────── GLOW + GRAIN ───────── */
.sph-grain{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.10;mix-blend-mode:overlay;background-image:var(--noise-w);background-size:160px 160px}
.sph-halo{position:absolute;left:220px;top:-30px;width:760px;height:520px;pointer-events:none;
  background:radial-gradient(closest-side,rgba(112,87,217,.40),rgba(112,87,217,.12) 58%,transparent);
  filter:blur(34px);animation:sph-halo 7s ease-in-out infinite alternate}
.sph-mon-screen::before,.sph-lap-screen::before,.sph-phone-in::before{content:"";position:absolute;inset:0;z-index:6;pointer-events:none;
  background-image:var(--noise-k);background-size:160px 160px;opacity:.07;mix-blend-mode:multiply}

/* ───────── KEYFRAMES ───────── */
@keyframes sph-fill{0%{opacity:0;transform:scale(.3)}5%{opacity:1;transform:scale(1)}84%{opacity:1;transform:scale(1)}94%,100%{opacity:0;transform:scale(.6)}}
@keyframes sph-loop-x{0%{transform:scaleX(0)}16%,84%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes sph-loop-y{0%{transform:scaleY(0)}16%,84%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes sph-loop-draw{0%{stroke-dashoffset:1}22%,84%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
@keyframes sph-loop-fade{0%{opacity:0}12%,84%{opacity:1}100%{opacity:0}}
@keyframes sph-row{0%{opacity:0}15%,85%{opacity:1}100%{opacity:0}}
@keyframes sph-pulse{0%,100%{box-shadow:0 0 6px 1px rgba(255,79,0,.5)}50%{box-shadow:0 0 14px 4px rgba(255,79,0,.65)}}
@keyframes sph-halo{from{opacity:.7;transform:scale(1)}to{opacity:1;transform:scale(1.06)}}
@keyframes sph-phone-lightning-flash{0%,100%{opacity:0;stroke-dashoffset:120}7%{opacity:1;stroke-dashoffset:0}15%{opacity:.08;stroke-dashoffset:0}24%{opacity:.95}34%{opacity:0}48%{opacity:.55}60%{opacity:0;stroke-dashoffset:-120}}
@keyframes sph-phone-logo-reveal{0%{opacity:0;clip-path:circle(0 at 50% 50%);transform:scale(.82)}65%{opacity:1;clip-path:circle(55% at 50% 50%);transform:scale(1.04)}100%{opacity:1;clip-path:circle(75% at 50% 50%);transform:scale(1)}}
@keyframes sph-phone-wordmark-in{from{opacity:0;clip-path:inset(0 100% 0 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}
@keyframes sph-phone-tagline-in{from{opacity:0;transform:translateY(6px);letter-spacing:.08em}to{opacity:1;transform:translateY(0);letter-spacing:.01em}}
@keyframes sph-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes sph-stage-in{from{opacity:0;margin-top:40px}to{opacity:1;margin-top:0}}
@keyframes sph-fade{from{opacity:0}to{opacity:1}}
@keyframes sph-pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes sph-sweep{0%{left:-12%;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:100%;opacity:0}}
@keyframes sph-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes sph-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.82)}}
@keyframes sph-scalex{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes sph-type{to{width:calc(var(--n) * 1ch)}}
@keyframes sph-clife{0%,99%{opacity:1}100%{opacity:0}}
@keyframes sph-show{to{visibility:visible}}
@keyframes sph-blink{50%{opacity:0}}

/* ───────── RESPONSIVE + MOTION ───────── */
@media (max-width:640px){.sph-root{padding:56px 12px 24px}}
@media (prefers-reduced-motion:reduce){
  .sph-root *,.sph-root *::before,.sph-root *::after{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important}
  .sph-ln-text{width:auto!important}
  .sph-tcaret{display:none}
  .sph-term .r3{opacity:1!important}
  .sph-cell::after,.sph-pc::after,.sph-dots i.on::after{opacity:1!important;transform:none!important}
  .sph-stem,.sph-g-bars i,.sph-pf-track i,.sph-p-line i,.sph-g-track i,.sph-p-week i{transform:none!important}
  .sph-spark-line{stroke-dashoffset:0!important}
  .sph-spark-fill,.sph-spark-dot,.sph-tip{opacity:1!important}
}
`;
