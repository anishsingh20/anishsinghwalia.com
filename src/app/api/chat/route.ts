import { answerQuestion, type ChatTurn } from "@/lib/ask";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { message?: string; history?: ChatTurn[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send JSON." }, { status: 400 });
  }
  const message = body.message?.trim() ?? "";
  if (message.length < 2 || message.length > 1000) {
    return Response.json({ error: "Ask a real question, under 1000 characters." }, { status: 400 });
  }
  const history = Array.isArray(body.history)
    ? body.history.filter((turn) => turn && (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string").slice(-6)
    : [];
  const result = await answerQuestion(message, history);
  return Response.json({ answer: result.answer, mode: result.mode, sources: result.sources });
}
