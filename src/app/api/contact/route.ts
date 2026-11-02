import { handleContact } from "@/lib/contact";

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "Too many notes in a short time. Email him directly." }, { status: 429 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send the form as JSON." }, { status: 400 });
  }
  const result = await handleContact(payload);
  if (!result.ok) {
    return Response.json(result, { status: "errors" in result ? 400 : 500 });
  }
  return Response.json({ ok: true, transport: result.transport, id: result.dropped ? undefined : result.id });
}
