"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
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

function AppScreen() {
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
          <motion.div className="h-full rounded-full bg-white" initial={{ width: "12%" }} animate={{ width: "72%" }} transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }} />
        </div>
        <p className="mt-2 text-[9px] text-white/80">Out for delivery, 4 stops away</p>
      </div>
      <div className="mt-3 space-y-2">
        {["Parcel collected", "At local hub", "Order packed", "Order confirmed"].map((row, index) => (
          <div key={row} className="flex items-center gap-2.5 rounded-xl bg-white/[.06] px-2.5 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E79E8]/25 text-[#C9BBFF]">{index === 0 ? <Truck className="h-3 w-3" /> : <Check className="h-3 w-3" />}</span>
            <div><p className="text-[10px] font-medium leading-tight">{row}</p><p className="text-[8.5px] text-white/50">{10 - index}:30 am</p></div>
          </div>
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

function SideRail({ icons }: { icons: typeof Home[] }) {
  return (
    <div className="hidden w-11 shrink-0 flex-col items-center gap-3.5 border-r border-white/10 py-4 text-white/45 sm:flex">
      {icons.map((Icon, index) => <Icon key={index} className={`h-4 w-4 ${index === 0 ? "text-[#C9BBFF]" : ""}`} />)}
    </div>
  );
}

const BOARD_COLUMNS: [string, number, string][][] = [
  [["lamp", 2 / 3, "Quiet corners"], ["road", 2 / 3, "Desert roads"]],
  [["apples", 500 / 457, "Still life"], ["stairs", 2 / 3, "Soft light"], ["clouds", 3 / 2, "Above it all"]],
  [["curtain", 2 / 3, "Morning light"], ["grapes", 500 / 347, "Table settings"], ["plane", 2 / 3, "Golden hour"]],
  [["sofa", 2 / 3, "Arches"], ["hallway", 2 / 3, "Old stone"]],
  [["ottoman", 2 / 3, "Neutral rooms"], ["vases", 500 / 889, "Ceramics"]],
];

function ImageBoardModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <LaptopFrame>
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
      </LaptopFrame>
    </Tilt>
  );
}

function SaasModel() {
  const plans = [["Starter", "$29"], ["Growth", "$79"], ["Scale", "$199"]];
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <MacWindow title="Workspace · Billing & team">
        <div className="flex text-white">
          <SideRail icons={[Layers, Users, BarChart3, Settings]} />
          <div className="min-w-0 flex-1 p-4">
            <div className="grid grid-cols-3 gap-2">
              {plans.map(([plan, price]) => (
                <div key={plan} className={`rounded-xl p-2.5 ${plan === "Growth" ? "bg-gradient-to-br from-[#8E79E8] to-[#5a43c0]" : "bg-white/[.06]"}`}>
                  <p className="text-[10px] text-white/75">{plan}</p>
                  <p className="mt-1 text-lg font-light leading-none">{price}<span className="text-[9px] text-white/70">/mo</span></p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-xl bg-white/[.06] p-3">
              <div className="flex justify-between text-[10px]"><span className="text-white/60">Seats used</span><span>18 of 25</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#B9A6FF]" initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.2, delay: 0.3 }} /></div>
            </div>
            <div className="mt-2 divide-y divide-white/[.08] rounded-xl bg-white/[.06] px-3 text-[10px]">
              {[["Priya S.", "Admin"], ["Daniel K.", "Editor"], ["Maya R.", "Viewer"]].map(([name, role]) => (
                <div key={name} className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[8px]">{name[0]}</span>{name}</span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-white/70">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MacWindow>
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

function VisionModel() {
  const reduced = useReducedMotion();
  const checks = [["Signature", "Verified"], ["Date field", "Verified"], ["Amount", "Review"]];
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <MacWindow title="Document check">
        <div className="grid grid-cols-[1.45fr_1fr] text-white">
          <div className="relative aspect-[4/3.4] overflow-hidden">
            <Image src="/portfolio/photos/external/kaster-document-review.jpg" alt="" fill sizes="(max-width: 1023px) 58vw, 26vw" style={{ objectPosition: "42% 45%" }} className="object-cover" />
            <div className="absolute inset-0 bg-[#120f1f]/25" />
            <span className="absolute left-[34%] top-[30%] h-[24%] w-[42%] rounded-md border-2 border-[#B9A6FF] shadow-[0_0_18px_rgba(185,166,255,.6)]"><span className="absolute -top-5 left-0 rounded bg-[#7057D9] px-1.5 py-0.5 text-[9px]">Form field</span></span>
            <span className="absolute bottom-[16%] left-[12%] h-[12%] w-[30%] rounded-md border-2 border-[#7fe0a6]"><span className="absolute -bottom-5 left-0 rounded bg-[#1f7a4a] px-1.5 py-0.5 text-[9px]">Signature</span></span>
            {!reduced && <motion.span className="absolute inset-x-0 h-[2px] bg-[#C9BBFF] shadow-[0_0_14px_3px_rgba(185,166,255,.7)]" animate={{ top: ["4%", "96%", "4%"] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />}
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-[10px] text-white/55">Tamper check</p>
            <p className="mt-1 text-2xl font-light leading-none">Passed</p>
            <div className="mt-3 divide-y divide-white/10 text-[10px]">
              {checks.map(([name, state]) => <div key={name} className="flex justify-between py-2"><span>{name}</span><span className={state === "Verified" ? "text-[#7fe0a6]" : "text-[#C9BBFF]"}>{state}</span></div>)}
            </div>
          </div>
        </div>
      </MacWindow>
    </Tilt>
  );
}

function AnswersModel() {
  return (
    <Tilt className="mx-auto w-full max-w-[640px]">
      <MacWindow title="Company knowledge assistant">
        <div className="p-4 text-white sm:p-5">
          <div className="flex items-center gap-2 rounded-full bg-white/[.07] px-3 py-2 text-[11px] text-white/85"><Search className="h-3.5 w-3.5 text-white/55" /> What is our refund window for annual plans?</div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4">
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-[#C9BBFF]"><Sparkles className="h-3 w-3" /> Answer</p>
            <p className="mt-1.5 text-sm font-light leading-relaxed">Annual plans can be refunded in full within 30 days of purchase. After that, refunds are pro-rated for the unused months.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4 border-t border-white/10 pt-3">
            <p className="text-[10px] text-white/55">Sources</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {[["Billing policy.pdf", "Page 12"], ["Terms of service.pdf", "Section 8"]].map(([name, where]) => (
                <div key={name} className="flex items-center gap-2 rounded-xl bg-white/[.06] p-2 text-[10px]">
                  <FileText className="h-4 w-4 shrink-0 text-[#C9BBFF]" /><span className="min-w-0"><span className="block truncate">{name}</span><span className="text-white/50">{where}</span></span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/60">Confidence<span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full bg-[#B9A6FF]" initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.2, delay: 1.1 }} /></span>High</div>
        </div>
      </MacWindow>
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

const MODELS: Record<ServiceModelKind, () => ReactNode> = {
  mobile: MobileModel,
  chat: ChatModel,
  website: WebsiteModel,
  imageBoard: ImageBoardModel,
  saas: SaasModel,
  board: BoardModel,
  vision: VisionModel,
  answers: AnswersModel,
  workflow: WorkflowModel,
  globe: GlobeModel,
};

export function ServiceModel({ kind }: { kind: ServiceModelKind }) {
  const Model = MODELS[kind];
  return <Model />;
}
