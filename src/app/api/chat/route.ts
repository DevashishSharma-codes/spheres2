import { COMPANY_EMAIL, COMPANY_PHONE } from "@/content/company";
import { ChatUnavailableError, streamReply, type ChatTurn } from "@/lib/chatbot/gemini";
import { MAX_MESSAGE_CHARS } from "@/lib/chatbot/config";
import { knowledgeDocument } from "@/lib/chatbot/knowledge";
import { systemPrompt } from "@/lib/chatbot/prompt";

/**
 * POST /api/chat — { messages: { role: "user" | "assistant", content: string }[] }
 * Streams the assistant's reply as plain text.
 */

/** Only the latest turns go to the model: enough to follow the conversation, and it saves quota. */
const MAX_TURNS = 12;

// Per-visitor limits, so one visitor can't use up the free daily quota for everyone.
// Kept in memory: this holds per server instance (fine on one server; on serverless, each
// instance counts on its own, so move this to a shared store like Upstash if traffic grows).
const LIMITS = [
  { windowMs: 10 * 60_000, max: 20 },
  { windowMs: 24 * 60 * 60_000, max: 80 },
];
const hits = new Map<string, number[]>();

function rateLimited(visitor: string) {
  const now = Date.now();
  const longest = Math.max(...LIMITS.map((limit) => limit.windowMs));
  const recent = (hits.get(visitor) ?? []).filter((time) => now - time < longest);
  const blocked = LIMITS.some((limit) => recent.filter((time) => now - time < limit.windowMs).length >= limit.max);
  if (!blocked) recent.push(now);
  hits.set(visitor, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (!times.some((time) => now - time < longest)) hits.delete(key);
  }
  return blocked;
}

const FALLBACK_REPLY = `Sorry, I can't answer right now. The team is happy to help directly: email ${COMPANY_EMAIL}, WhatsApp ${COMPANY_PHONE.label}, or book a call at [/contact](/contact).`;

function plain(text: string, status = 200) {
  return new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

function parseTurns(body: unknown): ChatTurn[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) return null;
  const turns: ChatTurn[] = [];
  for (const message of messages) {
    const role = (message as ChatTurn)?.role;
    const content = (message as ChatTurn)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_MESSAGE_CHARS : 4000);
    if (text) turns.push({ role, content: text });
  }
  // The model expects the conversation to start with the visitor and end with their question.
  const recent = turns.slice(-MAX_TURNS);
  while (recent.length && recent[0].role !== "user") recent.shift();
  if (!recent.length || recent[recent.length - 1].role !== "user") return null;
  return recent;
}

/** Development only: shows the knowledge pack, so its contents can be reviewed. */
export async function GET() {
  if (process.env.NODE_ENV !== "development") return plain("Not found.", 404);
  return plain(knowledgeDocument());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return plain("Invalid request.", 400);
  }
  const turns = parseTurns(body);
  if (!turns) return plain("Invalid request.", 400);

  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  if (rateLimited(visitor)) {
    return plain(
      `You've sent a lot of messages in a short time, so I need a short break. Meanwhile, the team is reachable at ${COMPANY_EMAIL} or on WhatsApp at ${COMPANY_PHONE.label}.`,
      429,
    );
  }

  const encoder = new TextEncoder();
  const reply = streamReply(systemPrompt(), turns, request.signal);
  let sent = false;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { value, done } = await reply.next();
        if (done) controller.close();
        else {
          sent = true;
          controller.enqueue(encoder.encode(value));
        }
      } catch (error) {
        if (!(error instanceof ChatUnavailableError)) console.error("[chat]", error);
        // If the reply broke off midway, end it there rather than tacking an apology onto half a sentence.
        if (!sent) controller.enqueue(encoder.encode(FALLBACK_REPLY));
        controller.close();
      }
    },
    cancel() {
      void reply.return(undefined);
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
