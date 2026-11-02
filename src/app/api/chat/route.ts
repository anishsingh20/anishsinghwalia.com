import { answer, botConfig, type BotEvent, type ChatTurn } from "@/lib/bot/agent";
import { clientIp, rateLimited } from "@/lib/bot/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Streams newline-delimited JSON events: status, delta, sources, done, error. */
export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return Response.json({ error: "That's a lot of questions in a short time. Give it ten minutes, or use the contact form." }, { status: 429 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Send JSON." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < 2 || message.length > 1000) {
    return Response.json({ error: "Ask a real question, under 1000 characters." }, { status: 400 });
  }
  const history: ChatTurn[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter((turn): turn is ChatTurn => {
          if (!turn || typeof turn !== "object") return false;
          const candidate = turn as Partial<ChatTurn>;
          return (candidate.role === "user" || candidate.role === "assistant") && typeof candidate.content === "string";
        })
        .slice(-8)
    : [];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const emit = (event: BotEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        } catch {
          closed = true;
        }
      };
      try {
        await answer(message, history, emit);
      } catch (error) {
        console.error("[ask] unhandled", error);
        emit({ type: "error", text: "Something broke on my side. Try again in a moment." });
      } finally {
        if (!closed) controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Ask-Mode": botConfig().mode,
    },
  });
}

export function GET() {
  const config = botConfig();
  return Response.json({ mode: config.mode, model: config.model ?? null, search: config.search });
}
