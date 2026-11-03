"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, ExternalLink, X } from "lucide-react";
import Image from "next/image";

const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08BaXRCtnGSSZM8qLs5VTV1lhd5j9wOkiBRFFAD8_93kF6yVHFyT8qgGORaV43Mzfm6CMr5Xmo?gv=true";
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = [
  { time: "09:30 AM", color: "border-violet-300 bg-violet-200 text-violet-950", selected: "border-violet-500 bg-violet-300 ring-2 ring-violet-300/50 text-violet-950" },
  { time: "01:30 PM", color: "border-sky-300 bg-sky-200 text-sky-950", selected: "border-sky-500 bg-sky-300 ring-2 ring-sky-300/50 text-sky-950" },
  { time: "03:30 PM", color: "border-amber-300 bg-amber-200 text-amber-950", selected: "border-amber-500 bg-amber-300 ring-2 ring-amber-300/50 text-amber-950" },
];
const sliderSteps = [20, 50, 100, 150, 200];

function isPastDate(year: number, month: number, day: number, now = new Date()) {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isPastTime(year: number, month: number, day: number, time: string, now = new Date()) {
  if (isPastDate(year, month, day, now)) return true;
  const [clock, meridiem] = time.split(" ");
  const [hourString, minuteString] = clock.split(":");
  let hour = Number(hourString) % 12;
  if (meridiem === "PM") hour += 12;
  return new Date(year, month, day, hour, Number(minuteString)) <= now;
}

export default function ContactBookingPanel() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(2);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const now = new Date();
  const { daysInMonth, startingDayOfWeek } = useMemo(() => ({
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    startingDayOfWeek: new Date(year, month, 1).getDay(),
  }), [month, year]);

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

  useEffect(() => {
    if (!calendarOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCalendarOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [calendarOpen]);

  const stepPercent = (stepIndex / (sliderSteps.length - 1)) * 100;
  const canGoPrevious = year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth());
  const selectedDateLabel = `${monthNames[month]} ${selectedDay}, ${year}`;
  const selectedSlotPast = selectedTime ? isPastTime(year, month, selectedDay, selectedTime, now) : true;

  const changeMonth = (delta: number) => {
    if (delta < 0 && !canGoPrevious) return;
    setCurrentDate(new Date(year, month + delta, 1));
    setSelectedDay(1);
    setSelectedTime(null);
  };

  const selectDay = (day: number) => {
    if (isPastDate(year, month, day, now)) return;
    setSelectedDay(day);
    if (selectedTime && isPastTime(year, month, day, selectedTime, now)) setSelectedTime(null);
  };

  return (
    <section aria-labelledby="booking-title" className="w-full border border-black/15 bg-white shadow-[0_18px_50px_rgba(0,0,0,.14)] lg:h-full">
      <div className="relative flex flex-col justify-between overflow-hidden bg-[#09090b] p-6 text-white sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[80px]" />
        <div className="relative">
          <h2 id="booking-title" className="mb-2 text-[26px] font-light leading-tight tracking-[-0.025em] text-white sm:text-[32px]">Reserve Your Architecture Sprint</h2>
          <p className="mb-5 max-w-xl text-xs leading-relaxed text-white/65 sm:mb-6 sm:text-sm">Meet with our lead software architects and map out your next move.</p>

          <div className="mb-4">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-1 text-[10px] font-light text-white/85 sm:text-xs">
              <span>21Spheres ships</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.strong key={sliderSteps[stepIndex]} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="text-xs font-semibold text-white sm:text-sm">{sliderSteps[stepIndex]}</motion.strong>
              </AnimatePresence>
              <span>commits & outbounds a day</span>
            </div>
            <div className="relative my-5 flex h-2 items-center rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-[#d8f28c] via-[#74c0fc] to-[#ff922b]" animate={{ width: `${stepPercent}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              {sliderSteps.map((step, index) => <button key={step} type="button" onClick={() => { setAutoPlaying(false); setStepIndex(index); }} aria-label={`Show ${step} commits per day`} className="absolute z-10 h-2 w-2 -ml-1 cursor-pointer rounded-full bg-white/90 transition-transform hover:scale-150" style={{ left: `${(index / (sliderSteps.length - 1)) * 100}%` }} />)}
              <motion.div className="absolute z-20 -ml-3 flex h-6 w-6 cursor-pointer items-center justify-center border border-black/20 bg-white outline outline-2 outline-white/15 sm:h-7 sm:w-7 sm:-ml-3.5" animate={{ left: `${stepPercent}%`, rotate: stepIndex * 180 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <Image src="/logo-square.png" alt="21Spheres" fill sizes="28px" className="object-contain p-1" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[8px] text-white/45"><span>20</span><span>200</span></div>
          </div>

          <button type="button" onClick={() => setCalendarOpen(true)} disabled={!selectedTime || selectedSlotPast} className="mb-3 inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-2.5 text-xs font-semibold tracking-wide text-black shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto">
            <span>Continue to Google Calendar</span><ArrowRight size={13} />
          </button>
        </div>
        <p className="relative border-t border-white/10 pt-3 text-[9px] font-light leading-relaxed text-white/60 sm:text-[10px]">
          Google will verify availability and collect your details before confirming the appointment.
        </p>
      </div>

      <div className="bg-white p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between border-b border-black/10 pb-2">
          <h3 className="text-base font-normal tracking-tight text-black sm:text-lg">{monthNames[month]} {year}</h3>
          <div className="flex items-center gap-1 text-black">
            <button type="button" onClick={() => changeMonth(-1)} disabled={!canGoPrevious} aria-label="Previous month" className="rounded-full border border-black/10 p-1 transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"><ChevronLeft size={14} /></button>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="rounded-full border border-black/10 p-1 transition-colors hover:bg-black/5"><ChevronRight size={14} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center" style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          {weekdays.map((day, index) => <span key={`${day}-${index}`} className="mb-1 text-[7px] font-semibold uppercase text-black/40 sm:text-[8px]">{day}</span>)}
          {Array.from({ length: startingDayOfWeek }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const selected = selectedDay === day;
            const past = isPastDate(year, month, day, now);
            return <button key={day} type="button" disabled={past} aria-pressed={selected} onClick={() => selectDay(day)} className={`flex min-h-[38px] items-center justify-center border text-xs transition sm:min-h-[44px] ${selected ? "border-violet-500 bg-violet-100 font-semibold text-violet-950 ring-1 ring-violet-300" : "border-black/10 text-black/70 hover:border-violet-300 hover:bg-violet-50"} ${past ? "cursor-not-allowed opacity-30" : ""}`}>{day}</button>;
          })}
        </div>

        <div className="mt-3 border-t border-black/10 pt-3">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-black/55">Select a time · {selectedDateLabel}</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const past = isPastTime(year, month, selectedDay, slot.time, now);
              const selected = selectedTime === slot.time;
              return <button key={slot.time} type="button" disabled={past} aria-pressed={selected} onClick={() => setSelectedTime(slot.time)} className={`rounded-none border px-2 py-2.5 text-[9px] font-semibold transition sm:text-[10px] disabled:cursor-not-allowed disabled:opacity-30 ${selected ? slot.selected : `${slot.color} hover:brightness-[0.98]`}`}>{slot.time}</button>;
            })}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[9px] text-black/65"><Clock size={12} />{selectedTime ? <>Selected: <strong className="font-semibold text-black">{selectedDateLabel} · {selectedTime}</strong></> : "Choose a date and time to continue"}</p>
          <button type="button" onClick={() => setCalendarOpen(true)} disabled={!selectedTime || selectedSlotPast} aria-label="Reserve an Architecture Call" title="Reserve an Architecture Call" className="ml-auto mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#09090b] text-white transition hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {calendarOpen && selectedTime && (
          <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-black/80 p-2 backdrop-blur-2xl sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setCalendarOpen(false); }}>
            <motion.div role="dialog" aria-modal="true" aria-label="Confirm the selected appointment in Google Calendar" className="relative z-10 my-auto flex h-[92dvh] max-h-[820px] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_32px_90px_rgba(0,0,0,.85)] sm:rounded-2xl" initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#09090b] px-3.5 py-2.5 text-white sm:px-6 sm:py-3.5">
                <div className="min-w-0"><h3 className="text-xs font-semibold tracking-tight sm:text-base">Confirm in Google Calendar</h3><p className="mt-0.5 truncate text-[10px] text-white/60 sm:text-xs">Selected: {selectedDateLabel} · {selectedTime} (India Standard Time)</p></div>
                <div className="flex shrink-0 items-center gap-2">
                  <a href={calendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white transition hover:bg-white/20 sm:px-3 sm:py-1.5 sm:text-xs"><span>Full Screen</span><ExternalLink size={12} /></a>
                  <button type="button" onClick={() => setCalendarOpen(false)} aria-label="Close booking calendar" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:h-8 sm:w-8"><X size={15} /></button>
                </div>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-white"><iframe src={calendarUrl} title="Google Calendar appointment scheduling" className="h-full w-full border-0" allow="fullscreen" /></div>
              <p className="shrink-0 border-t border-black/10 bg-white px-4 py-2 text-[10px] text-black/55 sm:px-6">Your selection is shown for reference. Choose the matching available time in Google Calendar to confirm.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
