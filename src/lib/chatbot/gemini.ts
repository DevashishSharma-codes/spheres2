import "server-only";

/**
 * A small client for the Gemini API (free tier), over plain REST with streaming.
 *
 * Each model has its own free quota and its own good and bad days, so a reply tries a short chain
 * of models: if one is rate-limited, failing, or slow to start answering, the next takes over.
 * Measured on the free key (Nov 2026): the Flash-Lite models start in ~1.5s; the full Flash models
 * sometimes hang for a minute, so they come last.
 */

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

interface ModelOption {
  id: string;
  /** Gemini 3 models take a thinking level; a lower one answers sooner. */
  thinkingLevel?: "low" | "high";
}

const MODELS: ModelOption[] = [
  { id: "gemini-3.5-flash-lite" },
  { id: "gemini-3.1-flash-lite", thinkingLevel: "low" },
  { id: "gemini-3.8-flash", thinkingLevel: "low" },
];

/** How long a model may take to send its first words before the next model is tried. */
const FIRST_TOKEN_TIMEOUT_MS = 9000;
const API = "https://generativelanguage.googleapis.com/v1beta/models";

export class ChatUnavailableError extends Error {}

function apiKey() {
  const key = process.env.Gemini_api_key ?? process.env.GEMINI_API_KEY;
  if (!key) throw new ChatUnavailableError("The Gemini API key is not set (Gemini_api_key in .env).");
  return key;
}

/** Streams the reply's text. Throws ChatUnavailableError if no model could answer. */
export async function* streamReply(system: string, turns: ChatTurn[], signal?: AbortSignal): AsyncGenerator<string> {
  const key = apiKey();
  const body = (model: ModelOption) =>
    JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: turns.map((turn) => ({ role: turn.role === "assistant" ? "model" : "user", parts: [{ text: turn.content }] })),
      generationConfig: {
        maxOutputTokens: 1024,
        ...(model.thinkingLevel ? { thinkingConfig: { thinkingLevel: model.thinkingLevel } } : {}),
      },
    });

  for (const model of MODELS) {
    if (signal?.aborted) return;
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener("abort", abort);
    const timer = setTimeout(abort, FIRST_TOKEN_TIMEOUT_MS);
    let started = false;

    try {
      const response = await fetch(`${API}/${model.id}:streamGenerateContent?alt=sse`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: body(model),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        console.warn(`[chat] ${model.id} answered ${response.status}; trying the next model.`);
        continue;
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() ?? "";
        for (const event of events) {
          const data = event.replace(/^data:\s?/m, "").trim();
          if (!data.startsWith("{")) continue;
          const chunk = JSON.parse(data);
          for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
            if (part.thought || !part.text) continue;
            if (!started) {
              started = true;
              clearTimeout(timer);
            }
            yield part.text as string;
          }
        }
      }
      if (started) return;
      console.warn(`[chat] ${model.id} sent no text; trying the next model.`);
    } catch (error) {
      // Once words have reached the visitor, switching models would repeat them; stop here.
      if (started) throw error;
      if (signal?.aborted) return;
      console.warn(`[chat] ${model.id} failed (${(error as Error).name}); trying the next model.`);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
    }
  }
  throw new ChatUnavailableError("No model could answer.");
}
