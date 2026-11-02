/** Sliding-window limiter keyed by IP. In memory, per server process. */

const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, stamps] of hits) {
      if (stamps.every((stamp) => now - stamp >= windowMs)) hits.delete(k);
    }
  }
  return false;
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}
