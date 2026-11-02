/** A small in-memory TTL cache. One per server process. */

type Entry<T> = { value: T; expires: number };

const store = new Map<string, Entry<unknown>>();

export async function cached<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > now) return hit.value;
  const value = await load();
  store.set(key, { value, expires: now + ttlMs });
  if (store.size > 500) {
    for (const [k, entry] of store) {
      if (entry.expires <= now) store.delete(k);
    }
  }
  return value;
}

export function clearCache() {
  store.clear();
}
