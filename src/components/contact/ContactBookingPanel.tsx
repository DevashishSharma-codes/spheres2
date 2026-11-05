"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

// Availability and bookings are managed in Google Calendar. This is the live schedule.
const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08BaXRCtnGSSZM8qLs5VTV1lhd5j9wOkiBRFFAD8_93kF6yVHFyT8qgGORaV43Mzfm6CMr5Xmo?gv=true";

const sliderSteps = [20, 50, 100, 150, 200];

/* Where the date picker starts on Google's page, which has a wide and a narrow layout.
   Scrolling there, rather than cropping, keeps the top of Google's booking form reachable. */
const pickerTop = (width: number) => (width >= 605 ? 225 : width >= 595 ? 300 : 385);

/* Google centres its booking form in the frame, so this keeps the form's top in view. */
const BOOKING_FORM_HEIGHT = 831;

export default function ContactBookingPanel() {
  const panelRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLIFrameElement>(null);
  const [calendarInUse, setCalendarInUse] = useState(false);
  const [stepIndex, setStepIndex] = useState(2);
  const [autoPlaying, setAutoPlaying] = useState(true);

  useEffect(() => {
    if (!autoPlaying) return;
    let direction = 1;
    const interval = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= sliderSteps.length - 1) direction = -1;
        if (current <= 0) direction = 1;
        return Math.max(0, Math.min(sliderSteps.length - 1, current + direction));
      });
    }, 1800);
    return () => window.clearInterval(interval);
  }, [autoPlaying]);

  /* The calendar is on Google's domain, so a click inside it can't be read. Focus moving
     into it can, so its first use clears the header and gives it the whole panel. */
  useEffect(() => {
    if (calendarInUse) return;
    const watch = window.setInterval(() => {
      if (document.activeElement === calendarRef.current) setCalendarInUse(true);
    }, 200);
    return () => window.clearInterval(watch);
  }, [calendarInUse]);

  useEffect(() => {
    if (!calendarInUse || !frameRef.current || !calendarRef.current) return;
    const spare = calendarRef.current.offsetHeight - BOOKING_FORM_HEIGHT;
    frameRef.current.scrollTop = Math.max(0, spare / 2 - 10);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [calendarInUse]);

  const stepPercent = (stepIndex / (sliderSteps.length - 1)) * 100;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let last = -1;
    const place = () => {
      const top = pickerTop(frame.clientWidth);
      if (top !== last) frame.scrollTop = top;
      last = top;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={panelRef}
      aria-label="Book a call"
      className={`flex w-full scroll-mt-20 flex-col overflow-hidden rounded-[22px] border border-black/15 bg-white shadow-[0_18px_50px_rgba(0,0,0,.14)] ${calendarInUse ? "h-[calc(100svh-5.5rem)] lg:sticky lg:top-20" : "lg:h-full"}`}
    >
      {!calendarInUse && <div className="relative shrink-0 overflow-hidden bg-[#09090b] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[80px]" />
        <div className="relative">
          <h2 id="booking-title" className="mb-2 text-[26px] font-light leading-tight tracking-[-0.025em] text-white sm:text-[32px]">Reserve Your Architecture Sprint</h2>
          <p className="mb-5 max-w-xl text-xs leading-relaxed text-white/65 sm:text-sm">Meet with our lead software architects and map out your next move.</p>

          <div className="mb-2 flex flex-wrap items-baseline gap-x-1 text-[10px] font-light text-white/85 sm:text-xs">
            <span>21Spheres ships</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong key={sliderSteps[stepIndex]} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="text-xs font-semibold text-white sm:text-sm">{sliderSteps[stepIndex]}</motion.strong>
            </AnimatePresence>
            <span>commits &amp; outbounds a day</span>
          </div>
          <div className="relative my-5 flex h-2 items-center rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-[#d8f28c] via-[#74c0fc] to-[#ff922b]" animate={{ width: `${stepPercent}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            {sliderSteps.map((step, index) => <button key={step} type="button" onClick={() => { setAutoPlaying(false); setStepIndex(index); }} aria-label={`Show ${step} commits per day`} className="absolute z-10 -ml-1 h-2 w-2 cursor-pointer rounded-full bg-white/90 transition-transform hover:scale-150" style={{ left: `${(index / (sliderSteps.length - 1)) * 100}%` }} />)}
            <motion.div className="absolute z-20 -ml-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white outline outline-2 outline-white/15 sm:-ml-3.5 sm:h-7 sm:w-7" animate={{ left: `${stepPercent}%`, rotate: stepIndex * 180 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <Image src="/logo-square.png" alt="21Spheres" fill sizes="28px" className="object-contain p-1" />
            </motion.div>
          </div>
          <div className="flex justify-between text-[8px] text-white/45"><span>20</span><span>200</span></div>
        </div>
      </div>}

      {/* The real Google Calendar schedule, opened at its date picker */}
      <div ref={frameRef} className="@container min-h-[520px] flex-1 basis-0 overflow-y-auto">
        <iframe
          ref={calendarRef}
          src={calendarUrl}
          title="Book an appointment with 21Spheres on Google Calendar"
          className="block h-[1340px] w-full border-0 bg-white @min-[605px]:h-[1000px]"
          allow="fullscreen"
        />
      </div>
      <a
        href={calendarUrl}
        target="_blank"
        rel="noreferrer"
        className="mx-auto inline-flex shrink-0 items-center gap-1.5 py-2 text-xs text-black/60 transition-colors hover:text-[#6049C9]"
      >
        Trouble viewing the calendar? Open it in a new tab
        <ExternalLink aria-hidden="true" className="h-3 w-3" />
      </a>
    </section>
  );
}
