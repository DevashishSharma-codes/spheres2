"use client";

import { useCallback, useEffect, useRef, useState, type ButtonHTMLAttributes, type FormEvent, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUp, ChevronUp, MessageCircle, RotateCcw, X } from "lucide-react";
import { ASSISTANT_NAME, MAX_MESSAGE_CHARS } from "@/lib/chatbot/config";
import { ChatMessageText } from "./ChatMessageText";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "sphere-chat";
const SUGGESTIONS = [
  "What does 21 Spheres do?",
  "Show me your AI work",
  "How do you run a project?",
  "How can I get in touch?",
];
const OFFLINE_REPLY =
  "I couldn't connect just now. Please try again in a moment, or reach the team at [info@21spheres.com](mailto:info@21spheres.com) or on the [contact page](/contact).";

/** The conversation is kept for the visit, so it survives moving between pages and reloads. */
function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string") : [];
  } catch {
    return [];
  }
}

/** The assistant's mark: a small lavender sphere, lit from the top left. */
function Orb({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#E4DAFF_0%,#9D85F2_34%,#7057D9_62%,#3D2B94_100%)] shadow-[inset_0_-2px_6px_rgba(30,15,80,.35),0_2px_8px_rgba(90,67,192,.35)] ${className}`}
    >
      <span className="absolute left-[22%] top-[16%] h-[22%] w-[30%] rounded-full bg-white/60 blur-[1.5px]" />
    </span>
  );
}

/** The springy pop the capsule's buttons use when they stretch into a pill and back. */
const POP = { type: "spring", stiffness: 520, damping: 24, mass: 0.7 } as const;

/**
 * A round button that, on hover (or keyboard focus), stretches out to the left into a pill that
 * says what it does, with a springy pop, then snaps back into a circle. Touch screens skip it.
 */
function MorphButton({
  label,
  face,
  icon,
  buttonRef,
  className = "",
  ...props
}: {
  label: string;
  /** The background of the circle and the pill it grows into. */
  face: string;
  /** The icon in the circle; told whether the button is being hovered, so it can animate. */
  icon: (active: boolean) => ReactNode;
  buttonRef?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [size, setSize] = useState<{ circle: number; pill: number } | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const start = (button: HTMLElement) => {
    const circle = button.offsetWidth;
    setSize({ circle, pill: circle + (labelRef.current?.scrollWidth ?? 0) });
    setActive(true);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      {...props}
      onPointerEnter={(event) => event.pointerType === "mouse" && start(event.currentTarget)}
      onPointerLeave={() => setActive(false)}
      onFocus={(event) => event.currentTarget.matches(":focus-visible") && start(event.currentTarget)}
      onBlur={() => setActive(false)}
      className={`relative block h-[34px] w-[34px] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9] sm:h-9 sm:w-9 ${className}`}
    >
      {/* The face: anchored on the right, it grows leftwards past the capsule into a pill */}
      <motion.span
        initial={false}
        animate={size ? { width: active ? size.pill : size.circle } : undefined}
        transition={reduceMotion ? { duration: 0 } : POP}
        className={`absolute right-0 top-0 flex h-full w-full items-center justify-end overflow-hidden rounded-full text-white ${face}`}
      >
        <span
          ref={labelRef}
          aria-hidden="true"
          className={`whitespace-nowrap pl-4 pr-1 text-[13px] font-medium tracking-[-0.01em] transition-opacity duration-200 ${active ? "opacity-100 delay-75" : "opacity-0"}`}
        >
          {label}
        </span>
        <span className="relative flex aspect-square h-full shrink-0 items-center justify-center">{icon(active)}</span>
      </motion.span>
    </button>
  );
}

/**
 * The bottom-right corner: one glass capsule holding the chat button, which opens a chat window (full
 * screen on phones). Back-to-top is part of the same capsule: an arrow that slides out of its top once
 * the visitor is well down the page, so the corner never holds a pile of separate buttons. On the
 * home page the intro video window sits just left of it, in the same glass.
 *
 *  - The chat button stays everywhere, the footer included; the back-to-top arrow steps away over the
 *    footer, which has its own "Back to top" link.
 *  - On the home page it waits until the visitor scrolls, so the hero stays clean; it arrives as the
 *    "Watch our intro" button flies into the corner.
 *  - Below 1440px, where text runs close to the edge, the back-to-top arrow only shows while
 *    scrolling up, as before.
 */
export function ChatAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const pathname = usePathname();
  const [launcherShown, setLauncherShown] = useState(pathname !== "/");
  const [topShown, setTopShown] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  // Keep the conversation for the visit
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage unavailable: the chat still works, it just won't survive a reload */
    }
  }, [messages]);

  // Show or hide the capsule and its back-to-top arrow as the page scrolls
  useEffect(() => {
    const home = pathname === "/";
    const tight = window.matchMedia("(max-width: 1439px)");
    let footerInView = false;
    let lastY = window.scrollY;
    let scrollingUp = false;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        scrollingUp = y < lastY;
        lastY = y;
      }
      setLauncherShown(!(home && y < 6));
      setTopShown(!footerInView && y > window.innerHeight * 1.8 && (!tight.matches || scrollingUp));
    };

    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => {
          footerInView = entry.isIntersecting;
          update();
        })
      : null;
    if (footer && observer) observer.observe(footer);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // While the window is open: the other corner pieces step aside, Escape closes it, and on phones
  // (where it fills the screen) the page behind stops scrolling.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.setAttribute("data-chat-open", "");
    const phone = window.matchMedia("(max-width: 639px)").matches;
    const previousOverflow = root.style.overflow;
    if (phone) root.style.overflow = "hidden";
    // Type straight away with a mouse; on touch screens, don't throw the keyboard up uninvited
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true });

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.removeAttribute("data-chat-open");
      if (phone) root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Follow the conversation as it grows
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, pending, open, reduceMotion]);

  // Stop any reply in progress if the component goes away
  useEffect(() => () => requestRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_MESSAGE_CHARS);
      if (!question || pending) return;
      const history: Message[] = [...messages, { role: "user", content: question }];
      setMessages(history);
      setDraft("");
      setPending(true);

      const controller = new AbortController();
      requestRef.current = controller;
      const reply = (content: string) =>
        setMessages((current) => {
          const last = current[current.length - 1];
          return last?.role === "assistant" && current.length === history.length + 1
            ? [...current.slice(0, -1), { role: "assistant", content }]
            : [...current, { role: "assistant", content }];
        });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (!response.body) throw new Error("No reply");
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let content = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          content += value;
          reply(content);
        }
        if (!content.trim()) reply(OFFLINE_REPLY);
      } catch (error) {
        if ((error as Error).name !== "AbortError") reply(OFFLINE_REPLY);
      } finally {
        setPending(false);
        requestRef.current = null;
      }
    },
    [messages, pending],
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void send(draft);
  };

  const onInputKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(draft);
    }
  };

  const restart = () => {
    requestRef.current?.abort();
    setMessages([]);
    setPending(false);
    inputRef.current?.focus({ preventScroll: true });
  };

  // On phones the window covers the page, so following a link closes it to show the page
  const onNavigate = () => {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  };

  const waiting = pending && messages[messages.length - 1]?.role === "user";
  const launcherVisible = open || launcherShown;
  const backToTopVisible = launcherVisible && topShown && !open;

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            role="dialog"
            aria-label={`Chat with ${ASSISTANT_NAME}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-[#F7F6FB]/95 backdrop-blur-2xl sm:inset-auto sm:bottom-[76px] sm:right-4 sm:h-[min(620px,calc(100dvh-76px-88px))] sm:w-[384px] sm:rounded-2xl sm:border sm:border-white/80 sm:bg-white/80 sm:shadow-[0_24px_60px_-18px_rgba(40,30,90,.45),0_2px_8px_rgba(40,30,90,.08),inset_0_1px_0_rgba(255,255,255,.7)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#2A2A2E]/[0.07] px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] sm:pt-3">
              <Orb className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium leading-tight tracking-[-0.01em] text-[#171717]">{ASSISTANT_NAME}</p>
                <p className="mt-0.5 truncate text-[12px] text-[#2A2A2E]/55">AI assistant</p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={restart}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#2A2A2E]/55 transition-colors hover:bg-[#7057D9]/10 hover:text-[#5A43C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7057D9]"
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#2A2A2E]/55 transition-colors hover:bg-[#7057D9]/10 hover:text-[#5A43C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7057D9]"
              >
                <X aria-hidden="true" className="h-[18px] w-[18px]" />
              </button>
            </div>

            {/* Conversation */}
            <div ref={logRef} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 text-[14px] leading-[1.6] text-[#2A2A2E]">
              {/* The greeting, always first */}
              <div className="flex items-end gap-2.5">
                <Orb className="mb-0.5 h-6 w-6" />
                <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[#2A2A2E]/[0.06] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(40,30,90,.05)]">
                  <p>
                    Hi, welcome to {ASSISTANT_NAME}. Ask me anything about our work, our services, how we run projects, or how we could help with yours.
                  </p>
                </div>
              </div>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pl-[34px]">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="rounded-full border border-[#7057D9]/25 bg-white/70 px-3 py-1.5 text-[13px] text-[#5A43C0] transition-colors hover:border-[#7057D9]/60 hover:bg-[#7057D9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div key={index} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[#7057D9] px-3.5 py-2.5 text-white">{message.content}</p>
                  </div>
                ) : (
                  <div key={index} className="flex items-end gap-2.5">
                    <Orb className="mb-0.5 h-6 w-6" />
                    <div className="min-w-0 max-w-[85%] break-words rounded-2xl rounded-bl-md border border-[#2A2A2E]/[0.06] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(40,30,90,.05)]">
                      <ChatMessageText text={message.content} onNavigate={onNavigate} />
                    </div>
                  </div>
                ),
              )}

              {waiting && (
                <div className="flex items-end gap-2.5">
                  <Orb className="mb-0.5 h-6 w-6" />
                  <div role="status" aria-label={`${ASSISTANT_NAME} is typing`} className="flex gap-1 rounded-2xl rounded-bl-md border border-[#2A2A2E]/[0.06] bg-white px-4 py-3.5">
                    {[0, 160, 320].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-[#7057D9]/60 motion-safe:animate-bounce"
                        style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={submit} className="border-t border-[#2A2A2E]/[0.07] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:pb-3">
              <div className="flex items-end gap-2 rounded-2xl border border-[#2A2A2E]/10 bg-white px-3 py-2 transition-colors focus-within:border-[#7057D9]/50">
                <label htmlFor="chat-input" className="sr-only">
                  Message {ASSISTANT_NAME}
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  maxLength={MAX_MESSAGE_CHARS}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Ask about our work, services or process"
                  // 16px on phones stops iOS zooming into the field
                  className="max-h-28 min-h-[24px] flex-1 resize-none bg-transparent py-0.5 text-[16px] leading-6 text-[#171717] outline-none [field-sizing:content] placeholder:text-[#2A2A2E]/40 sm:text-[14px]"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || pending}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7057D9] text-white transition-colors hover:bg-[#5A43C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7057D9] disabled:bg-[#2A2A2E]/15 disabled:text-white"
                >
                  <ArrowUp aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-[#2A2A2E]/45">AI assistant. Answers come from the 21 Spheres website.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The capsule: back-to-top (when it's needed) above the chat button, in the same glass as the
          intro video window. 44px wide on phones (34px buttons, 4px rim, 1px border), 48px above
          (36 + 5 + 1). On phones the open chat window has its own close button, so the capsule steps
          away while it's open. Hovering a button stretches it out into a pill that says what it does. */}
      <div
        aria-hidden={!launcherVisible || undefined}
        className={`fixed bottom-3 right-3 z-[70] flex flex-col rounded-full border border-white/80 bg-white/55 p-1 shadow-[0_18px_40px_-14px_rgba(40,30,90,.45),0_2px_6px_rgba(40,30,90,.08),inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-xl transition-[opacity,transform] duration-300 motion-reduce:transition-none sm:bottom-4 sm:right-4 sm:p-[5px] ${
          launcherVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        } ${open ? "max-sm:pointer-events-none max-sm:opacity-0" : ""}`}
      >
        {/* Slides open above the chat button. It clips only above and below (for the slide), never to
            the left, so the button's pill can always grow out freely, even mid-slide. */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out [clip-path:inset(0_-12px_0_-480px)] motion-reduce:transition-none ${
            backToTopVisible ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <MorphButton
              onClick={toTop}
              aria-label="Back to top"
              tabIndex={backToTopVisible ? 0 : -1}
              aria-hidden={!backToTopVisible || undefined}
              label="Back to top"
              className="mb-1 sm:mb-[5px]"
              // A violet gradient, so it stands out on light and dark sections alike
              face="bg-[linear-gradient(160deg,#B4A3F8_0%,#8A70EA_45%,#5A43C0_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_2px_8px_rgba(90,67,192,.35)]"
              icon={(active) => (
                // While hovered, the chevron launches up out of the circle and flies back in from below
                <ChevronUp
                  aria-hidden="true"
                  strokeWidth={2.5}
                  className={`h-[18px] w-[18px] ${active ? "motion-safe:animate-[chevron-rise_1.1s_ease-in-out_infinite]" : ""}`}
                />
              )}
            />
          </div>
        </div>

        <MorphButton
          buttonRef={launcherRef}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close the chat" : `Chat with ${ASSISTANT_NAME}, our AI assistant`}
          tabIndex={launcherVisible ? 0 : -1}
          label={open ? "Close chat" : "Ask our AI assistant"}
          // The same violet gradient as back-to-top, so the two pills match
          face="bg-[linear-gradient(160deg,#B4A3F8_0%,#8A70EA_45%,#5A43C0_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_2px_8px_rgba(90,67,192,.35)]"
          icon={(active) => (
            <>
              {open ? (
                <X aria-hidden="true" className="relative h-[18px] w-[18px]" />
              ) : (
                <>
                  {/* While hovered, the chat bubble turns into typing dots, as if a reply is on its way */}
                  <MessageCircle
                    aria-hidden="true"
                    className={`relative h-[18px] w-[18px] transition-all duration-200 ${active ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
                  />
                  <span aria-hidden="true" className={`absolute inset-0 flex items-center justify-center gap-[3px] transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}>
                    {[0, 140, 280].map((delay) => (
                      <span
                        key={delay}
                        className={`h-[4px] w-[4px] rounded-full bg-white ${active ? "motion-safe:animate-[typing-dot_0.9s_ease-in-out_infinite]" : ""}`}
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                </>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
