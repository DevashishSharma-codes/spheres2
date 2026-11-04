"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  BarChart3, Bell, Check, CheckCircle2, FileText, Home, Layers, Search, Send, Settings, Sparkles, Truck, User, Users,
} from "lucide-react";
import { DotGlobe } from "@/components/ui/DotGlobe";
import { LaptopFrame } from "@/components/ui/LaptopFrame";
import type { ServiceModelKind } from "@/content/serviceDetails";

/* All names and numbers inside these screens are illustrative product UI. */

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className={className}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1300 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function TrafficLights() {
  return (
    <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </span>
  );
}

function MacWindow({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border border-white/15 bg-[#1b1a21] shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] ${className}`}>
      <div className="relative flex h-9 items-center border-b border-black/40 bg-[#2c2c30] px-3.5">
        <TrafficLights />
        <span className="absolute inset-x-20 truncate text-center text-xs font-medium text-white/70">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[44px] bg-gradient-to-br from-[#8a8992] via-[#2b2a30] to-[#5f5e67] p-[3px] shadow-[0_40px_70px_-25px_rgba(0,0,0,.95)] ${className}`}>
      <span aria-hidden="true" className="absolute -left-[2px] top-[22%] h-8 w-[3px] rounded-l bg-[#55545c]" />
      <span aria-hidden="true" className="absolute -left-[2px] top-[31%] h-12 w-[3px] rounded-l bg-[#55545c]" />
      <span aria-hidden="true" className="absolute -right-[2px] top-[27%] h-16 w-[3px] rounded-r bg-[#55545c]" />
      <div className="h-full rounded-[41px] bg-black p-[6px]">
        <div className="relative h-full overflow-hidden rounded-[35px] bg-[#121118] text-white">
          <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-5 pt-2.5 text-[10px] font-semibold"><span>9:41</span><span aria-hidden="true">●●●</span></div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** `introDelay` holds the screen back until a logo intro has played over it. */
function AppScreen({ ready = true, introDelay }: { ready?: boolean; introDelay?: number }) {
  return (
    <div className="flex h-[calc(100%-22px)] flex-col px-3.5 pt-4">
      <div className="flex items-center justify-between">
        <div><p className="text-[10px] text-white/55">Good morning</p><p className="text-[15px] font-medium">Your deliveries</p></div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"><Bell className="h-3.5 w-3.5" /></span>
      </div>
      <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#8E79E8] to-[#5a43c0] p-3">
        <p className="text-[10px] text-white/80">Arriving today</p>
        <p className="mt-0.5 text-[22px] font-light leading-none">3:45 pm</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
          <motion.div className="h-full rounded-full bg-white" initial={{ width: "12%" }} animate={{ width: ready ? "72%" : "12%" }} transition={{ duration: 1.6, ease: "easeOut", delay: introDelay ?? 0.3 }} />
        </div>
        <p className="mt-2 text-[9px] text-white/80">Out for delivery, 4 stops away</p>
      </div>
      <div className="mt-3 space-y-2">
        {["Parcel collected", "At local hub", "Order packed", "Order confirmed"].map((row, index) => (
          <motion.div
            key={row}
            initial={introDelay === undefined ? false : { opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: (introDelay ?? 0) + index * 0.09 }}
            className="flex items-center gap-2.5 rounded-xl bg-white/[.06] px-2.5 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E79E8]/25 text-[#C9BBFF]">{index === 0 ? <Truck className="h-3 w-3" /> : <Check className="h-3 w-3" />}</span>
            <div><p className="text-[10px] font-medium leading-tight">{row}</p><p className="text-[8.5px] text-white/50">{10 - index}:30 am</p></div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 px-2.5 py-2 text-[10px]">
        <span><span className="block text-[8.5px] text-white/50">Your driver</span>Sam, 4 stops away</span>
        <span className="rounded-full bg-white px-2 py-1 text-[9px] font-medium text-black">Call</span>
      </div>
      <div className="mt-auto mb-2.5 flex justify-around rounded-full bg-white/[.07] py-2 text-white/55">
        <Home className="h-3.5 w-3.5 text-white" /><Search className="h-3.5 w-3.5" /><BarChart3 className="h-3.5 w-3.5" /><User className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

const INTRO_FADE_AT = 3;

/** The app screen, opened by a one-time 21Spheres logo intro. It then stays on the app. */
function PhoneIntroScreen() {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const started = useInView(sentinelRef, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);

  return (
    <>
      <span ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <AppScreen ready={started} introDelay={reduced ? 0 : INTRO_FADE_AT - 0.2} />
      {!finished && (
        <motion.div
          data-phone-intro
          className="absolute inset-0 z-[5] flex items-center justify-center overflow-hidden bg-[#0b0916] motion-reduce:hidden"
          initial={{ opacity: 1 }}
          animate={started ? { opacity: 0 } : undefined}
          transition={{ delay: INTRO_FADE_AT, duration: 0.55 }}
          onAnimationComplete={() => setFinished(true)}
        >
          {/* The screen grows out of the logo */}
          <motion.span
            aria-hidden="true"
            className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-[#8E79E8] to-[#2a1e63]"
            initial={{ scale: 0 }}
            animate={started ? { scale: 9 } : undefined}
            transition={{ delay: 2.05, duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
          />
          {[0, 1].map((ring) => (
            <motion.span
              key={ring}
              aria-hidden="true"
              className="absolute h-24 w-24 rounded-full border border-[#9D85F2]"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={started ? { scale: [0.7, 2.2], opacity: [0, 0.7, 0] } : undefined}
              transition={{ delay: 0.75 + ring * 0.35, duration: 1.2, ease: "easeOut" }}
            />
          ))}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={started ? { opacity: [0, 1, 1, 0], scale: [0.45, 1, 1, 1.2] } : undefined}
            transition={{ duration: 2.6, times: [0, 0.22, 0.8, 1], ease: "easeOut" }}
          >
            <motion.span
              className="relative block h-20 w-20"
              initial={{ rotate: -120 }}
              animate={started ? { rotate: 0 } : undefined}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/logo-square.png" alt="21Spheres" fill sizes="80px" className="object-contain" />
            </motion.span>
            <motion.span
              className="mt-3 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={started ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <span className="block text-[17px] font-medium tracking-[-0.02em]">21Spheres</span>
              <span className="mt-0.5 block text-[10px] text-white/60">Engineering what&rsquo;s next.</span>
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function OrderScreen() {
  const rows = [["Ceramic mug set", "2 items"], ["Linen throw", "1 item"], ["Desk lamp", "1 item"]];
  return (
    <div className="flex h-[calc(100%-22px)] flex-col px-3.5 pt-4">
      <p className="text-[10px] text-white/55">Order #2048</p>
      <p className="text-[15px] font-medium">Order details</p>
      <div className="mt-3 divide-y divide-white/10 border-y border-white/10 text-[10px]">
        {rows.map(([name, count]) => <div key={name} className="flex justify-between py-2.5"><span>{name}</span><span className="text-white/55">{count}</span></div>)}
      </div>
      <div className="mt-3 space-y-1.5 text-[10px] text-white/60">
        <p className="flex justify-between"><span>Delivery</span><span className="text-white">Free</span></p>
        <p className="flex justify-between"><span>Total</span><span className="text-white">$84.00</span></p>
      </div>
      <div className="mt-3 border-t border-white/10 pt-3 text-[10px]">
        <p className="text-white/55">Delivering to</p>
        <p className="mt-0.5 leading-snug">Home, 24 Garden Lane</p>
        <p className="mt-3 text-white/55">Arriving</p>
        <p className="mt-0.5">Today by 3:45 pm</p>
        <p className="mt-3 text-white/55">Payment</p>
        <p className="mt-0.5">Card ending 4242</p>
      </div>
      <span className="mb-3 mt-auto rounded-full bg-white py-2 text-center text-[10px] font-medium text-black">Track order</span>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex h-[calc(100%-22px)] flex-col px-3.5 pt-4">
      <div className="flex flex-col items-center pt-1">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8E79E8] to-[#5a43c0]"><User className="h-5 w-5" /></span>
        <p className="mt-2 text-[13px] font-medium">Your account</p>
        <p className="text-[9.5px] text-white/55">Member since 2024</p>
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 text-center">
        {[["24", "Orders"], ["6", "Saved"], ["2", "Cards"]].map(([value, label]) => (
          <p key={label}><span className="block text-[15px] font-light leading-tight">{value}</span><span className="text-[8.5px] text-white/55">{label}</span></p>
        ))}
      </div>
      <div className="mt-4 divide-y divide-white/10 border-y border-white/10 text-[10px]">
        {[[Bell, "Notifications"], [Layers, "Saved addresses"], [FileText, "Order history"], [Users, "Invite a friend"], [Settings, "Preferences"]].map(([Icon, label]) => {
          const RowIcon = Icon as typeof Bell;
          return <p key={label as string} className="flex items-center gap-2 py-2.5"><RowIcon className="h-3.5 w-3.5 text-[#C9BBFF]" />{label as string}</p>;
        })}
      </div>
    </div>
  );
}

function MobileModel() {
  return (
    <div className="relative mx-auto flex h-[440px] w-full max-w-[600px] items-center justify-center sm:h-[540px]">
      <div className="absolute left-0 top-[11%] w-[150px] -rotate-[9deg] sm:left-[3%] sm:w-[215px]"><Phone><ProfileScreen /></Phone></div>
      <div className="absolute right-0 top-[11%] w-[150px] rotate-[9deg] sm:right-[3%] sm:w-[215px]"><Phone><OrderScreen /></Phone></div>
      <Tilt className="relative z-10"><Phone className="w-[195px] sm:w-[250px]"><AppScreen /></Phone></Tilt>
    </div>
  );
}

function ChatModel() {
  const messages = [
    { from: "user", text: "Where is my order?" },
    { from: "bot", text: "It's out for delivery and should reach you by 3:45 pm today." },
    { from: "user", text: "Can I change the address?" },
    { from: "bot", text: "Yes. I've opened that for you, or I can connect you to our team." },
  ];
  return (
    <div className="relative mx-auto flex h-[500px] w-full max-w-[520px] items-center justify-center sm:h-[540px]">
      <Tilt>
        <Phone className="w-[240px] sm:w-[265px]">
          <div className="flex h-[calc(100%-22px)] flex-col px-3 pt-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#8E79E8] to-[#5a43c0]"><Sparkles className="h-3.5 w-3.5" /></span>
              <div><p className="text-[11px] font-medium leading-tight">Support assistant</p><p className="text-[9px] text-[#7fe0a6]">Online</p></div>
            </div>
            <div className="flex-1 space-y-2 pt-3">
              {messages.map((message, index) => (
                <motion.p
                  key={message.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.55 }}
                  className={`max-w-[84%] rounded-2xl px-2.5 py-1.5 text-[10px] leading-snug ${message.from === "user" ? "ml-auto rounded-br-sm bg-[#7057D9]" : "rounded-bl-sm bg-white/10"}`}
                >
                  {message.text}
                </motion.p>
              ))}
            </div>
            <div className="mb-2.5 flex items-center justify-between rounded-full bg-white/[.08] py-1.5 pl-3 pr-1.5 text-[9.5px] text-white/50">
              Type a message
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black"><Send className="h-2.5 w-2.5" /></span>
            </div>
          </div>
        </Phone>
      </Tilt>
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4 }} className="absolute bottom-[14%] right-0 hidden w-[170px] rounded-2xl border border-white/20 bg-[#2a2930]/75 p-3 backdrop-blur-xl sm:block">
        <p className="text-[10px] text-white/60">Connected action</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium"><CheckCircle2 className="h-3.5 w-3.5 text-[#C9BBFF]" /> Delivery updated</p>
      </motion.div>
    </div>
  );
}

function LaptopTitleBar({ title }: { title: string }) {
  return (
    <div className="relative flex h-7 shrink-0 items-center border-b border-black/40 bg-[#2c2c30] px-3 sm:h-8">
      <TrafficLights />
      <span className="absolute inset-x-16 truncate text-center text-[11px] font-medium text-white/70 sm:text-xs">{title}</span>
    </div>
  );
}

function WebsiteModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <LaptopFrame>
        <LaptopTitleBar title="yourbrand.com" />
        <div className="flex min-h-0 flex-1 flex-col bg-[#fbfafd] px-4 py-3 text-[#171717] sm:px-6 sm:py-4">
          <div className="flex items-center justify-between text-[9px] text-black/60 sm:text-[10px]">
            <span className="text-[11px] font-medium text-black sm:text-xs">Your Brand</span>
            <span className="hidden gap-4 sm:flex"><span>Work</span><span>Services</span><span>About</span></span>
            <span className="rounded-full border border-black/20 px-2.5 py-1 text-black">Contact</span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] items-center gap-4 sm:gap-6">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#6049C9]">Design studio</p>
              <p className="mt-1.5 text-[19px] font-light leading-[1.08] tracking-[-0.04em] sm:text-[32px]">Clarity is the best first impression.</p>
              <span className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#171717] py-1 pl-3 pr-1 text-[9px] text-white sm:mt-3.5 sm:text-[10px]">
                See our work
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-black" aria-hidden="true">↗</span>
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src="/about-meeting-bg.png" alt="" fill sizes="280px" className="object-cover object-[65%_50%]" />
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-2 text-[9px] sm:text-[10px]">
            {[["01", "Strategy"], ["02", "Design"], ["03", "Launch"]].map(([index, name]) => (
              <p key={name} className="px-2 first:pl-0"><span className="block text-black/45">{index}</span>{name}</p>
            ))}
          </div>
        </div>
      </LaptopFrame>
    </Tilt>
  );
}

const BOARD_COLUMNS: [string, number, string][][] = [
  [["lamp", 2 / 3, "Quiet corners"], ["road", 2 / 3, "Desert roads"]],
  [["apples", 500 / 457, "Still life"], ["stairs", 2 / 3, "Soft light"], ["clouds", 3 / 2, "Above it all"]],
  [["curtain", 2 / 3, "Morning light"], ["grapes", 500 / 347, "Table settings"], ["plane", 2 / 3, "Golden hour"]],
  [["sofa", 2 / 3, "Arches"], ["hallway", 2 / 3, "Old stone"]],
  [["ottoman", 2 / 3, "Neutral rooms"], ["vases", 500 / 889, "Ceramics"]],
];

const PORTAL_STATS = [
  [["Open requests", "128"], ["Resolved today", "342"], ["Avg. response", "1.2h"]],
  [["Open requests", "121"], ["Resolved today", "357"], ["Avg. response", "1.1h"]],
  [["Open requests", "116"], ["Resolved today", "371"], ["Avg. response", "1.0h"]],
];
const PORTAL_ACTIVITY = [
  ["Invoice approved", "Northwind Trading"],
  ["New user invited", "Helio Partners"],
  ["Report exported", "Aster Logistics"],
  ["Ticket resolved", "Quill & Co."],
  ["Plan updated", "Meridian Health"],
  ["Document signed", "Oakline Studio"],
];
const heatLevel = (col: number, row: number) => (col * 7 + row * 13 + ((col * row) % 5) * 11) % 4;
const HEAT_COLORS = ["#f1eff7", "#d9ccff", "#a78bfa", "#6049C9"];

function WebPortalModel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const activity = useLoopStep(rootRef, PORTAL_ACTIVITY.length, 1900);
  const stats = PORTAL_STATS[useLoopStep(rootRef, PORTAL_STATS.length, 3800)];
  const sweep = useLoopStep(rootRef, 20, 260);
  const feed = [0, 1, 2, 3].map((offset) => PORTAL_ACTIVITY[(activity + PORTAL_ACTIVITY.length - offset) % PORTAL_ACTIVITY.length]);

  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <LaptopFrame>
        <LaptopTitleBar title="app.yourcompany.com" />
        <div ref={rootRef} data-model-main className="flex min-h-0 flex-1 bg-[#f7f6fb] text-[#1b1a21]">
          <div className="hidden w-[19%] shrink-0 flex-col bg-[#171330] p-2 text-[9.5px] text-white/70 sm:flex">
            <p className="mb-2 flex items-center gap-1.5 text-[10.5px] font-medium text-white"><span className="h-3.5 w-3.5 rounded bg-gradient-to-br from-[#a78bfa] to-[#5a43c0]" /> Portal</p>
            {[[Home, "Overview"], [FileText, "Requests"], [Users, "Customers"], [Bell, "Alerts"]].map(([Icon, label], index) => {
              const RowIcon = Icon as typeof Home;
              return <p key={label as string} className={`mb-0.5 flex items-center gap-1.5 rounded-md px-1.5 py-1 ${index === 1 ? "bg-white/15 text-white" : ""}`}><RowIcon className="h-3 w-3" />{label as string}</p>;
            })}
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-3">
            <div className="flex shrink-0 items-center justify-between">
              <p className="text-[12px] font-medium sm:text-[13px]">Requests</p>
              <span className="rounded-full bg-[#171717] px-2 py-0.5 text-[8.5px] text-white sm:text-[9.5px]">New request</span>
            </div>
            <dl className="mt-1.5 grid shrink-0 grid-cols-3 divide-x divide-black/[.08] rounded-lg border border-black/[.08] bg-white py-1 sm:mt-2 sm:py-1.5">
              {stats.map(([label, value]) => (
                <div key={label} className="flex min-w-0 flex-col-reverse px-2">
                  <dt className="truncate text-[8px] text-black/55 sm:text-[8.5px]">{label}</dt>
                  <dd className="text-[13px] font-medium tabular-nums leading-tight sm:text-[15px]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-1.5 sm:mt-2 sm:gap-2">
              <div className="flex min-h-0 min-w-0 flex-col rounded-lg border border-black/[.08] bg-white p-2">
                <p className="shrink-0 text-[9.5px] font-medium sm:text-[10.5px]">Activity by week</p>
                <div className="mt-1.5 grid min-h-0 flex-1 gap-[2px]" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))", gridTemplateRows: "repeat(14, minmax(0, 1fr))", gridAutoFlow: "column" }}>
                  {Array.from({ length: 280 }, (_, index) => {
                    const col = Math.floor(index / 14);
                    return <span key={index} className="rounded-[2px] transition-opacity duration-300" style={{ backgroundColor: HEAT_COLORS[heatLevel(col, index % 14)], opacity: col === sweep ? 0.35 : 1 }} />;
                  })}
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-black/[.08] bg-white p-2">
                <p className="flex shrink-0 items-center gap-1 text-[9.5px] font-medium sm:text-[10.5px]"><motion.span className="h-1.5 w-1.5 rounded-full bg-[#7fe0a6]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} /> Live activity</p>
                <div className="mt-1 min-h-0 flex-1 overflow-hidden">
                  <AnimatePresence initial={false} mode="popLayout">
                    {feed.map(([title, who]) => (
                      <motion.p key={title} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="border-b border-black/[.06] py-1 leading-tight last:border-0">
                        <span className="block truncate text-[9px] font-medium sm:text-[10px]">{title}</span>
                        <span className="block truncate text-[8px] text-black/55 sm:text-[8.5px]">{who}</span>
                      </motion.p>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LaptopFrame>
    </Tilt>
  );
}

function ImageBoardScreen() {
  return (
    <>
        <LaptopTitleBar title="Inspiration board" />
        <div className="relative flex min-h-0 flex-1 flex-col bg-white text-[#171717]">
          <div className="flex items-center gap-2 px-3 pb-1.5 pt-2 sm:gap-3 sm:px-4">
            <span aria-hidden="true" className="h-5 w-5 shrink-0 rounded-[7px] bg-gradient-to-br from-[#8E79E8] to-[#5a43c0]" />
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f2f1f5] px-2.5 py-1 text-[9px] text-black/50 sm:text-[10px]"><Search className="h-3 w-3 shrink-0" /><span className="truncate">Search ideas</span></span>
            <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full"><Image src="/services/board/plane.jpg" alt="" fill sizes="20px" className="object-cover" /></span>
          </div>
          <div className="flex gap-1.5 overflow-hidden px-3 pb-2 text-[8.5px] sm:px-4 sm:text-[9.5px]">
            {["For you", "Interiors", "Travel", "Still life", "Architecture", "Ceramics"].map((chip, index) => (
              <span key={chip} className={`shrink-0 rounded-full px-2 py-0.5 ${index === 0 ? "bg-[#171717] text-white" : "bg-[#f2f1f5] text-black/65"}`}>{chip}</span>
            ))}
          </div>
          <div className="flex min-h-0 flex-1 gap-1.5 overflow-hidden px-3 sm:gap-2 sm:px-4">
            {BOARD_COLUMNS.map((column, columnIndex) => (
              <div key={columnIndex} className={`min-w-0 flex-1 space-y-1.5 sm:space-y-2 ${columnIndex === 4 ? "hidden sm:block" : ""} ${columnIndex % 2 ? "-mt-3" : ""}`}>
                {column.map(([name, ratio, caption]) => (
                  <figure key={name}>
                    <div className="relative overflow-hidden rounded-[10px] bg-[#eeedf2]" style={{ aspectRatio: ratio }}>
                      <Image src={`/services/board/${name}.jpg`} alt="" fill sizes="140px" className="object-cover" />
                      {name === "curtain" && <span className="absolute right-1.5 top-1.5 rounded-full bg-[#6049C9] px-2 py-0.5 text-[8.5px] font-medium text-white sm:text-[9.5px]">Save</span>}
                    </div>
                    <figcaption className="mt-0.5 truncate px-0.5 text-[8px] text-black/60 sm:text-[9px]">{caption}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-3 left-1/2 flex w-max max-w-[86%] -translate-x-1/2 items-center gap-2 rounded-[14px] border border-black/10 bg-white/95 py-1.5 pl-1.5 pr-3 shadow-[0_14px_30px_-8px_rgba(30,20,80,.5)] backdrop-blur"
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg"><Image src="/services/board/curtain.jpg" alt="" fill sizes="28px" className="object-cover" /></span>
            <span className="min-w-0 text-[9.5px] leading-tight sm:text-[11px]"><span className="block font-medium">Saved to Living room</span><span className="block text-black/55">24 ideas on this board</span></span>
            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#6049C9]" />
          </motion.div>
        </div>
    </>
  );
}

function ImageBoardModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <LaptopFrame>
        <ImageBoardScreen />
      </LaptopFrame>
    </Tilt>
  );
}

/* Sample product data. Each set is one "moment" the dashboard animates between. */
const pixelSeries = (seed: number) =>
  Array.from({ length: 34 }, (_, i) => Math.max(14, Math.min(94, Math.round(38 + 20 * Math.sin(i * 0.55 + seed) + 13 * Math.sin(i * 1.7 + seed * 2) + i * 0.7))));
const SAAS_MOMENTS = [
  { series: pixelSeries(0), stats: ["$48.2k", "1,284", "2.4%", "31%"], mix: [38, 44, 18] },
  { series: pixelSeries(1.4), stats: ["$51.6k", "1,342", "2.1%", "34%"], mix: [33, 47, 20] },
  { series: pixelSeries(2.7), stats: ["$55.9k", "1,417", "1.9%", "36%"], mix: [29, 48, 23] },
];
const STUDIO_STATS = [["Products shipped", "15+"], ["Weeks to launch", "3–14"], ["Case studies", "5"], ["In-house code", "100%"]];
const SAAS_STATS = ["Monthly revenue", "Active accounts", "Churn", "Trial to paid"];
const SAAS_PLANS = [["Starter", "#d9ccff"], ["Growth", "#a78bfa"], ["Scale", "#5a43c0"]];
const PIXELS = (color: string) => `repeating-linear-gradient(to top, ${color} 0 5px, transparent 5px 7px)`;

/** `studio` is the portfolio version: 21Spheres labels, our published figures, and numbers placed clear of the devices in front. */
function SaasInsightsPanel({ studio = false }: { studio?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moment = SAAS_MOMENTS[useLoopStep(rootRef, SAAS_MOMENTS.length, 3600)];
  const cursor = useLoopStep(rootRef, 34, 420);
  const value = moment.series[cursor];

  return (
          <div ref={rootRef} data-model-main className="flex min-w-0 flex-1 flex-col bg-white p-3 text-[#1b1a21]">
            <div className="flex shrink-0 items-center justify-between">
              <p className="text-[13px] font-medium">{studio ? "21Spheres" : "Insights"}</p>
              <span className="rounded-md border border-black/10 px-2 py-0.5 text-[9px] text-black/60">Last 12 months</span>
            </div>

            <div className={`mt-2 flex min-h-0 flex-1 flex-col rounded-xl border border-black/[.08] p-2.5 ${studio ? "order-2" : ""}`}>
              <p className="shrink-0 text-[10.5px] font-medium">{studio ? "Project activity" : "Revenue trend"}</p>
              <div className="relative mt-5 min-h-0 flex-1">
                <div className="flex h-full gap-[2px]">
                  {moment.series.map((height, index) => (
                    <div key={index} className="relative h-full flex-1" style={{ backgroundImage: PIXELS("#f1eff7") }}>
                      <motion.div className="absolute inset-x-0 bottom-0" style={{ backgroundImage: PIXELS("#d9ccff"), backgroundPosition: "bottom" }} animate={{ height: `${height}%` }} transition={{ type: "spring", stiffness: 90, damping: 16, delay: index * 0.012 }} />
                      <motion.div className="absolute inset-x-0 bottom-0" style={{ backgroundImage: PIXELS(index === cursor ? "#171717" : "#6049C9"), backgroundPosition: "bottom" }} animate={{ height: `${height * 0.52}%` }} transition={{ type: "spring", stiffness: 90, damping: 16, delay: index * 0.012 }} />
                    </div>
                  ))}
                </div>
                <motion.div className="pointer-events-none absolute inset-y-0 w-px border-l border-dashed border-black/50" animate={{ left: `${((cursor + 0.5) / 34) * 100}%` }} transition={{ duration: 0.35 }}>
                  <span className={`absolute -top-4 whitespace-nowrap rounded-md border border-black/10 bg-white px-1.5 py-0.5 text-[9px] font-medium shadow-md ${cursor > 22 ? "right-1" : "left-1"}`}>{studio ? `Sprint ${cursor + 1}` : `+${(value / 6).toFixed(1)}%`}</span>
                </motion.div>
              </div>
            </div>

            <dl className={`mt-2 grid shrink-0 grid-cols-4 divide-x divide-black/[.08] rounded-xl border border-black/[.08] py-1.5 ${studio ? "order-1" : ""}`}>
              {(studio ? STUDIO_STATS.map(([label]) => label) : SAAS_STATS).map((label, index) => (
                <div key={label} className="flex min-w-0 flex-col-reverse px-2">
                  <dt className="truncate text-[8.5px] text-black/55">{label}</dt>
                  <dd className="text-[13px] font-medium tabular-nums leading-tight sm:text-[15px]">{studio ? STUDIO_STATS[index][1] : moment.stats[index]}</dd>
                </div>
              ))}
            </dl>

            <div className={`mt-2 shrink-0 rounded-xl border border-black/[.08] p-2 ${studio ? "hidden" : ""}`}>
              <p className="text-[10px] font-medium">Plan breakdown</p>
              <div className="mt-1.5 flex h-2 gap-[2px]">
                {SAAS_PLANS.map(([name, color], index) => <motion.span key={name} className="rounded-full" style={{ backgroundColor: color }} animate={{ width: `${moment.mix[index]}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />)}
              </div>
              <p className="mt-1.5 flex justify-between text-[9px] text-black/60">
                {SAAS_PLANS.map(([name, color], index) => <span key={name} className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />{name} {moment.mix[index]}%</span>)}
              </p>
            </div>
          </div>
  );
}

function SaasModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[660px]">
      <div className="relative aspect-[4/4.4] overflow-hidden rounded-[26px] border border-white/15 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] sm:aspect-[4/3.3] sm:p-4">
        <DuskBackdrop />
        <div className="relative flex h-full overflow-hidden rounded-[18px] border border-white/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]">
          {/* Sidebar */}
          <div className="hidden w-[24%] shrink-0 flex-col bg-[#120d2b]/70 p-2.5 text-white backdrop-blur-xl sm:flex lg:hidden xl:flex">
            <p className="flex items-center gap-1.5 text-xs font-medium"><span className="h-4 w-4 rounded-[5px] bg-gradient-to-br from-[#a78bfa] to-[#5a43c0]" /> Your SaaS</p>
            <p className="mt-3 text-[8px] uppercase tracking-wider text-white/45">Menu</p>
            <div className="mt-1 space-y-0.5 text-[10px]">
              {[[Home, "Overview"], [Users, "Customers"], [BarChart3, "Insights"], [Layers, "Billing"]].map(([Icon, label]) => {
                const RowIcon = Icon as typeof Home;
                const active = label === "Insights";
                return <p key={label as string} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${active ? "bg-white/15" : "text-white/70"}`}><RowIcon className="h-3 w-3" />{label as string}</p>;
              })}
            </div>
            <p className="mt-3 text-[8px] uppercase tracking-wider text-white/45">Workspaces</p>
            <div className="mt-1 space-y-1 text-[10px] text-white/75">
              {[["Acme Corp", "#a78bfa"], ["Northwind", "#7fe0a6"], ["Helio", "#d9ccff"]].map(([name, color]) => <p key={name} className="flex items-center gap-1.5 px-1.5"><span className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: color }} />{name}</p>)}
            </div>
            <p className="mt-auto flex items-center gap-1.5 px-1.5 text-[10px] text-white/70"><Settings className="h-3 w-3" /> Settings</p>
          </div>

          <SaasInsightsPanel />
        </div>
      </div>
    </Tilt>
  );
}

function BoardModel() {
  const columns = [
    { name: "To do", tasks: ["Approve supplier invoice", "Update stock levels"] },
    { name: "In review", tasks: ["Quarterly pricing sheet", "New vendor onboarding", "Warehouse transfer"] },
    { name: "Done", tasks: ["Team access audit"] },
  ];
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <MacWindow title="Internal operations tool">
        <div className="grid min-h-[310px] grid-cols-3 gap-2 p-3 text-white sm:gap-3 sm:p-4">
          {columns.map((column) => (
            <div key={column.name} className="rounded-xl bg-white/[.05] p-2">
              <p className="mb-2 flex justify-between px-1 text-[10px] text-white/60"><span>{column.name}</span><span>{column.tasks.length}</span></p>
              <div className="space-y-2">
                {column.tasks.map((task) => (
                  <div key={task} className="rounded-lg border border-white/10 bg-[#2a2930] p-2 text-[10px] leading-snug">
                    {task}
                    <span className="mt-2 flex items-center justify-between"><span className="h-1 w-6 rounded-full bg-[#8E79E8]" /><span className="h-3.5 w-3.5 rounded-full bg-white/20" /></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MacWindow>
    </Tilt>
  );
}

const AI_MODELS = [
  { file: "claude", name: "Claude", x: 13, y: 12, tile: "bg-white" },
  { file: "openai", name: "ChatGPT", x: 13, y: 32, tile: "bg-[#10A37F]" },
  { file: "gemini", name: "Gemini", x: 13, y: 52, tile: "bg-white" },
  { file: "grok", name: "Grok", x: 87, y: 12, tile: "bg-white" },
  { file: "meta", name: "Meta AI", x: 87, y: 32, tile: "bg-white" },
  { file: "deepseek", name: "DeepSeek", x: 87, y: 52, tile: "bg-white" },
];
const AI_HUB = { x: 50, y: 32 };

function AiConnectModel() {
  const reduced = useReducedMotion();
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <div className="relative aspect-[4/3.5] overflow-hidden rounded-[26px] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]">
        <Image src="/services/ai/clouds.jpg" alt="" fill sizes="(max-width: 1023px) 92vw, 45vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#120d2b]/25 via-transparent to-[#120d2b]/55" />

        {/* Every model feeds one integrated layer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          {AI_MODELS.map((model) => {
            const midX = (model.x + AI_HUB.x) / 2;
            const d = `M${model.x} ${model.y} C${midX} ${model.y}, ${midX} ${AI_HUB.y}, ${AI_HUB.x} ${AI_HUB.y}`;
            return (
              <g key={model.file}>
                <path d={d} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="0.12 0.88"
                  initial={{ strokeDashoffset: 0.12 }}
                  animate={reduced ? undefined : { strokeDashoffset: -0.88 }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: AI_MODELS.indexOf(model) * 0.35 }}
                />
              </g>
            );
          })}
        </svg>

        {AI_MODELS.map((model) => (
          <div key={model.file} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: `${model.x}%`, top: `${model.y}%` }}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/60 shadow-[0_10px_24px_-8px_rgba(10,6,40,.75)] sm:h-14 sm:w-14 sm:rounded-2xl ${model.tile}`}>
              <Image src={`/services/ai/${model.file}.svg`} alt="" width={32} height={32} unoptimized className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>
            <span className="whitespace-nowrap text-[9px] font-medium text-white drop-shadow sm:text-[11px]">{model.name}</span>
          </div>
        ))}

        {/* The one place they connect */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${AI_HUB.x}%`, top: `${AI_HUB.y}%` }}>
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-[24px] border border-white/60"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-[24px] border border-white/50 bg-white/25 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.6),0_18px_40px_-12px_rgba(10,6,40,.8)] backdrop-blur-xl sm:h-24 sm:w-24">
            <span className="relative block h-full w-full rounded-2xl bg-white">
              <Image src="/logo-square.png" alt="" fill sizes="80px" className="object-contain p-2 sm:p-3" />
            </span>
          </div>
        </div>

        {/* Glass box over the image */}
        <div className="absolute inset-x-[5%] bottom-[5%] rounded-[20px] border border-white/35 bg-white/15 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_18px_40px_-16px_rgba(10,6,40,.8)] backdrop-blur-xl sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 text-[13px] font-medium leading-tight sm:text-base">One AI layer for your business</p>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] sm:text-xs"><span className="h-1.5 w-1.5 rounded-full bg-[#7fe0a6]" /> Connected</span>
          </div>
          <div className="mt-2 grid grid-cols-3 divide-x divide-white/25 border-t border-white/25 pt-2 text-[9.5px] leading-snug sm:mt-3 sm:pt-3 sm:text-xs">
            {[["Routing", "Best model per task"], ["Your data", "Stays private"], ["Control", "Switch any time"]].map(([label, value]) => (
              <p key={label} className="px-2 first:pl-0 last:pr-0 sm:px-3"><span className="block text-white/75">{label}</span>{value}</p>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

/** Lilac artwork pulled towards deep purple, so it sits inside the site's dark theme. */
export function DuskBackdrop() {
  return (
    <>
      <Image src="/card-bgs/user-bg-pink-purple.png" alt="" fill sizes="(max-width: 1023px) 92vw, 46vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#140e33]/90 via-[#34268a]/75 to-[#1d1450]/90" />
    </>
  );
}

/** Steps through a looping animation, only while it is on screen and motion is allowed. */
function useLoopStep(rootRef: RefObject<HTMLElement | null>, count: number, ms: number) {
  const reduced = useReducedMotion();
  const inView = useInView(rootRef);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setStep((value) => (value + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [reduced, inView, count, ms]);

  return step;
}

interface ChatScript {
  question: string;
  answer: string[];
  sources: string[];
  listLabel: string;
  list: string[];
  chip: string;
  account: string;
  suggestions: { icon: typeof Home; title: string; text: string }[];
}

const LLM_SCRIPT: ChatScript = {
  question: "What is our refund window for annual plans?",
  answer: "Annual plans can be refunded in full within 30 days of purchase. After that, refunds are pro-rated for the unused months.".split(" "),
  sources: ["Billing policy, p.12", "Terms, section 8"],
  listLabel: "Recent",
  list: ["Summarize this week's support tickets", "Compare our two vendor contracts", "Find the latest security policy", "Draft a reply to a billing question"],
  chip: "Your documents",
  account: "Your team",
  suggestions: [
    { icon: FileText, title: "Summarize", text: "Turn long reports into key points" },
    { icon: Search, title: "Find answers", text: "Search all your company documents" },
    { icon: Layers, title: "Compare", text: "See differences between contracts" },
  ],
};

const STUDIO_SCRIPT: ChatScript = {
  question: "What can 21Spheres build for us?",
  answer: "Websites, web and mobile apps, custom AI and enterprise software. One team designs and builds it, then hands over the full code and documentation.".split(" "),
  sources: ["Services", "Portfolio"],
  listLabel: "Explore",
  list: ["Our services", "Case studies", "Industries", "Start a project"],
  chip: "21Spheres",
  account: "Our team",
  suggestions: [],
};

type LlmPhase = "idle" | "thinking" | "answer";

function LlmOrb({ small = false, sizeClass = "h-14 w-14 sm:h-20 sm:w-20" }: { small?: boolean; sizeClass?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`relative block shrink-0 rounded-full ${small ? "h-5 w-5" : sizeClass}`}
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ background: "radial-gradient(circle at 34% 28%, #ffffff 0%, #d9ccff 34%, #a78bfa 70%, #7057D9 100%)", boxShadow: "0 0 26px 6px rgba(167,139,250,.55)" }}
    >
      <motion.span
        className="absolute -inset-[7%] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ background: "conic-gradient(from 0deg, transparent 0 55%, rgba(255,255,255,.95) 72%, rgba(167,139,250,.5) 86%, transparent 100%)", WebkitMask: "radial-gradient(farthest-side, transparent 80%, #000 84%)", mask: "radial-gradient(farthest-side, transparent 80%, #000 84%)" }}
      />
    </motion.span>
  );
}

/** Text is larger in the laptop, because the portfolio scene draws that screen at about 60% size. */
const CHAT_SIZES = {
  panel: {
    root: "relative flex h-full gap-2 rounded-[20px] border border-white/20 bg-[#120d2b]/50 p-2 text-[#1b1a21] shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl",
    sidebar: "hidden w-[27%] shrink-0 flex-col px-1.5 py-1.5 sm:flex lg:hidden xl:flex",
    brand: "text-[12px]", button: "text-[10px]", list: "text-[9.5px]",
    main: "bg-white p-3 sm:p-4", bar: "text-[10px]",
    orb: undefined, hello: "text-[15px] sm:text-lg mt-2.5 sm:mt-3", greet: "text-[16px] sm:text-[21px]",
    question: "text-[11px] sm:text-xs", answer: "text-[11px] sm:text-[12.5px]", source: "text-[9.5px]",
    prompt: "text-[10.5px] sm:text-[11.5px]", chip: "text-[9.5px]",
  },
  laptop: {
    root: "relative flex h-full w-full gap-2 p-2 text-[#1b1a21]",
    sidebar: "flex w-[25%] shrink-0 flex-col px-2 py-2",
    brand: "text-[15px]", button: "text-[12.5px]", list: "text-[12.5px]",
    main: "p-3", bar: "text-[12.5px]",
    orb: "h-[64px] w-[64px]", hello: "text-[19px] mt-2.5", greet: "text-[25px]",
    question: "text-[14.5px]", answer: "text-[15px]", source: "text-[12px]",
    prompt: "text-[14.5px]", chip: "text-[12.5px]",
  },
};

function LlmChat({ script, inLaptop = false }: { script: ChatScript; inLaptop?: boolean }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const [phase, setPhase] = useState<LlmPhase>("idle");
  const [typed, setTyped] = useState(0);
  const [words, setWords] = useState(0);
  const sizes = inLaptop ? CHAT_SIZES.laptop : CHAT_SIZES.panel;

  useEffect(() => {
    if (reduced || !inView) return;
    let timer = 0;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => { timer = window.setTimeout(resolve, ms); });

    const play = async () => {
      while (!cancelled) {
        await wait(0);
        setPhase("idle");
        setTyped(0);
        setWords(0);
        await wait(1400);
        for (let i = 1; i <= script.question.length && !cancelled; i++) {
          setTyped(i);
          await wait(36);
        }
        await wait(550);
        setPhase("thinking");
        await wait(1400);
        setPhase("answer");
        for (let i = 1; i <= script.answer.length && !cancelled; i++) {
          setWords(i);
          await wait(85);
        }
        await wait(4200);
      }
    };
    play();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced, inView, script]);

  // Without motion, show the finished conversation rather than a blank prompt.
  const shownPhase: LlmPhase = reduced ? "answer" : phase;
  const shownWords = reduced ? script.answer.length : words;
  const answerDone = shownWords >= script.answer.length;

  return (
    <div ref={rootRef} className={sizes.root}>
      {/* Sidebar */}
      <div className={sizes.sidebar}>
        <p className={`flex items-center gap-1.5 font-medium text-white ${sizes.brand}`}>
          <span className="relative h-5 w-5 shrink-0 rounded-md bg-white"><Image src="/logo-square.png" alt="" fill sizes="20px" className="object-contain p-0.5" /></span>
          21Spheres
        </p>
        <span className={`mt-3 rounded-lg bg-white py-1.5 text-center text-black ${sizes.button}`}>+ New chat</span>
        <span className={`mt-1.5 flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-white/60 ${sizes.list}`}><Search className="h-2.5 w-2.5" /> Search</span>
        <p className={`mt-3 text-white/50 ${inLaptop ? "text-[11px]" : "text-[8.5px]"}`}>{script.listLabel}</p>
        <div className="mt-1 space-y-1.5">
          {script.list.map((item) => <p key={item} className={`truncate text-white/80 ${sizes.list}`}>{item}</p>)}
        </div>
        <p className={`mt-auto flex items-center gap-1.5 rounded-lg bg-white/10 p-1.5 text-white ${sizes.list}`}>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7057D9] text-white"><User className="h-3 w-3" /></span>
          <span className="truncate">{script.account}</span>
        </p>
      </div>

      {/* Conversation */}
      <div
        className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] ${sizes.main}`}
        style={inLaptop ? { background: "radial-gradient(90% 60% at 50% 30%, #f1ecff 0%, #ffffff 75%)" } : undefined}
      >
        <div className={`flex shrink-0 items-center justify-between ${sizes.bar}`}>
          <span className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-2 py-1"><LlmOrb small /> 21Spheres AI</span>
          <span className="rounded-lg bg-[#171717] px-2.5 py-1 text-white">Share</span>
        </div>

        <div data-chat-stage className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-2">
          <AnimatePresence mode="wait" initial={false}>
            {shownPhase === "idle" ? (
              <motion.div key="idle" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="flex flex-col items-center text-center">
                <LlmOrb sizeClass={sizes.orb} />
                <p className={`bg-gradient-to-r from-[#a78bfa] to-[#7057D9] bg-clip-text text-transparent ${sizes.hello}`}>Hello there</p>
                <p className={`tracking-[-0.02em] ${sizes.greet}`}>How can I assist you today?</p>
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-2.5">
                <p className={`ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-[#EFEAFF] px-3 py-1.5 ${sizes.question}`}>{script.question}</p>
                <div className="flex gap-2">
                  <LlmOrb small />
                  {shownPhase === "thinking" ? (
                    <p className="flex items-center gap-1 pt-1" aria-label="Thinking">
                      {[0, 1, 2].map((dot) => <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.18 }} />)}
                    </p>
                  ) : (
                    <div className="min-w-0">
                      <p className={`leading-relaxed ${sizes.answer}`}>
                        {script.answer.slice(0, shownWords).map((word, index) => (
                          <motion.span key={index} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{word} </motion.span>
                        ))}
                      </p>
                      {answerDone && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex flex-wrap gap-1.5">
                          {script.sources.map((source) => (
                            <span key={source} className={`flex items-center gap-1 rounded-lg border border-black/10 bg-white px-1.5 py-1 text-black/70 ${sizes.source}`}><FileText className="h-3 w-3 text-[#7057D9]" />{source}</span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prompt box */}
        <div className="shrink-0 rounded-xl border border-black/10 bg-white p-2 shadow-[0_6px_18px_-10px_rgba(70,50,140,.5)]">
          <p className={`h-5 truncate leading-5 ${sizes.prompt}`}>
            {shownPhase === "idle" && typed > 0 ? (
              <>{script.question.slice(0, typed)}<motion.span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-[#7057D9]" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} /></>
            ) : (
              <span className="text-black/45">Ask 21Spheres anything</span>
            )}
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className={`flex items-center gap-1 rounded-lg border border-[#C9BBFF] bg-[#F4F0FF] px-2 py-0.5 text-[#6049C9] ${sizes.chip}`}><Sparkles className="h-3 w-3" /> {script.chip}</span>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${inLaptop ? "bg-gradient-to-br from-[#8E79E8] to-[#5a43c0]" : "bg-[#171717]"}`}><Send className="h-3 w-3" /></span>
          </div>
        </div>

        {/* Suggestions */}
        {shownPhase === "idle" && script.suggestions.length > 0 && <div className="mt-2 grid shrink-0 grid-cols-3 gap-1.5 lg:hidden xl:grid">
          {script.suggestions.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-black/[.07] p-1.5 sm:p-2">
              <Icon aria-hidden="true" className="h-3 w-3 text-[#7057D9]" />
              <p className="mt-1 text-[9.5px] font-medium sm:text-[10.5px]">{title}</p>
              <p className="mt-0.5 text-[8.5px] leading-snug text-black/55 sm:text-[9px]">{text}</p>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

function LlmChatModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[660px]">
      <div className="relative aspect-[4/4.4] overflow-hidden rounded-[26px] border border-white/15 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] sm:aspect-[4/3.3] sm:p-4">
        <DuskBackdrop />
        <LlmChat script={LLM_SCRIPT} />
      </div>
    </Tilt>
  );
}

function WorkflowModel() {
  const nodes = [
    { label: "New invoice", note: "Trigger", x: 5, y: 10 },
    { label: "Read document", note: "AI extraction", x: 37, y: 10 },
    { label: "Match to order", note: "ERP lookup", x: 69, y: 10 },
    { label: "Needs review", note: "Your team", x: 22, y: 64, person: true },
    { label: "Auto-approve", note: "Rules passed", x: 62, y: 64 },
  ];
  // Coordinates are percentages of the panel, matching the node positions above.
  const paths = ["M31 20 H37", "M63 20 H69", "M82 30 V47 H35 V64", "M82 47 H75 V64"];
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <MacWindow title="Invoice approval workflow">
        <div className="relative aspect-[16/10] text-white">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {paths.map((d) => (
              <motion.path key={d} d={d} fill="none" stroke="#9D85F2" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="5 5" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            ))}
          </svg>
          {nodes.map((node) => (
            <div key={node.label} className="absolute flex h-[20%] w-[26%] flex-col justify-center rounded-xl border border-white/20 bg-[#2a2930] px-2 shadow-lg sm:px-2.5" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <p className="flex items-center gap-1 text-[8.5px] text-[#C9BBFF] sm:text-[10px]">{node.person ? <User className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}{node.note}</p>
              <p className="mt-0.5 text-[9.5px] font-medium leading-tight sm:text-xs">{node.label}</p>
            </div>
          ))}
        </div>
      </MacWindow>
    </Tilt>
  );
}

function GlobeModel() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <DotGlobe />
      <div className="absolute bottom-[6%] right-0 w-[220px] rounded-2xl border border-white/20 bg-[#2a2930]/75 p-3.5 text-white shadow-[0_24px_48px_-20px_rgba(0,0,0,.85)] backdrop-blur-xl">
        <p className="text-[10px] text-white/60">Regions</p>
        <div className="mt-2 space-y-1.5 text-[11px]">
          {["Mumbai", "Frankfurt", "Singapore"].map((region) => (
            <p key={region} className="flex items-center justify-between">{region}<span className="flex items-center gap-1.5 text-[#7fe0a6]"><span className="h-1.5 w-1.5 rounded-full bg-[#7fe0a6]" /> Healthy</span></p>
          ))}
        </div>
      </div>
    </div>
  );
}

const STAGE = { width: 760, height: 530 };

/** Monitor, laptop and phone arranged as one scene, scaled as a unit to fit its column. */
export function PortfolioDevices() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const measure = () => setScale(Math.min(1, outer.clientWidth / STAGE.width));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="mx-auto w-full max-w-[760px]" style={{ height: STAGE.height * scale }} role="img" aria-label="A monitor, laptop and phone showing products we design and build">
      <div className="relative origin-top-left" style={{ width: STAGE.width, height: STAGE.height, transform: `scale(${scale})` }}>
        {/* Monitor */}
        <motion.div className="absolute left-[110px] top-0 w-[610px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-[18px] bg-gradient-to-b from-[#303136] via-[#09090B] to-[#515158] p-[7px] shadow-[0_40px_70px_-20px_rgba(0,0,0,.9)] ring-1 ring-white/25">
            <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[12px] bg-white ring-1 ring-white/10">
              <LaptopTitleBar title="21spheres.studio" />
              <div className="flex min-h-0 flex-1"><SaasInsightsPanel studio /></div>
            </div>
          </div>
          <div aria-hidden="true" className="mx-auto h-[46px] w-[92px] bg-gradient-to-b from-[#1b1b1e] to-[#3a3a40]" />
          <div aria-hidden="true" className="mx-auto h-[9px] w-[230px] rounded-t-[4px] rounded-b-[9px] bg-gradient-to-b from-[#55565C] to-[#1C1D20] shadow-[0_18px_30px_-10px_rgba(0,0,0,.9)]" />
        </motion.div>

        {/* Laptop */}
        <motion.div className="absolute left-0 top-[262px] w-[360px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          <div className="origin-top-left" style={{ width: 600, transform: "scale(0.6)" }}>
            <LaptopFrame>
              <LaptopTitleBar title="21Spheres AI" />
              <div className="relative flex min-h-0 flex-1">
                <DuskBackdrop />
                <LlmChat script={STUDIO_SCRIPT} inLaptop />
              </div>
            </LaptopFrame>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div className="absolute right-0 top-[190px] w-[160px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}>
          <div className="origin-top-left" style={{ width: 250, transform: "scale(0.64)" }}>
            <Phone><PhoneIntroScreen /></Phone>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const MODELS: Record<ServiceModelKind, () => ReactNode> = {
  mobile: MobileModel,
  chat: ChatModel,
  website: WebsiteModel,
  imageBoard: ImageBoardModel,
  webPortal: WebPortalModel,
  saas: SaasModel,
  board: BoardModel,
  aiConnect: AiConnectModel,
  answers: LlmChatModel,
  workflow: WorkflowModel,
  globe: GlobeModel,
};

export function ServiceModel({ kind }: { kind: ServiceModelKind }) {
  const Model = MODELS[kind];
  return <Model />;
}
