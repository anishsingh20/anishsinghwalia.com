import { cached } from "./cache";

const MAX_BYTES = 1_500_000;
const MAX_CHARS = 7000;

const PRIVATE_HOST = /^(localhost|127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\]|::1$|fc|fd)/i;

export function safeUrl(input: string): URL | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (PRIVATE_HOST.test(url.hostname) || url.hostname.endsWith(".local") || url.hostname.endsWith(".internal")) return null;
  return url;
}

export function htmlToText(html: string): { title: string; text: string } {
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<(nav|footer|header|aside|form)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const main = body.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
  if (main && main[2].length > 500) body = main[2];
  const text = decode(
    body
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h[1-6]|tr|section|blockquote|pre)>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { title, text };
}

function decode(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

export type PageResult = { url: string; title: string; text: string; truncated: boolean };

export async function fetchPage(input: string): Promise<PageResult | { error: string }> {
  const url = safeUrl(input);
  if (!url) return { error: "Only public http(s) URLs can be fetched." };
  return cached(`page:${url.href}`, 10 * 60 * 1000, async () => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ask.anish/3.0; +https://anishsinghwalia.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) return { error: `The page returned HTTP ${response.status}.` };
      const type = response.headers.get("content-type") ?? "";
      if (!/text\/|xml|json/.test(type)) return { error: `Not a text page (${type}).` };
      const reader = response.body?.getReader();
      if (!reader) return { error: "Empty response." };
      const chunks: Uint8Array[] = [];
      let received = 0;
      while (received < MAX_BYTES) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.byteLength;
      }
      reader.cancel().catch(() => undefined);
      const html = new TextDecoder().decode(Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))));
      const { title, text } = htmlToText(html);
      return {
        url: url.href,
        title: title || url.hostname,
        text: text.slice(0, MAX_CHARS),
        truncated: text.length > MAX_CHARS,
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Fetch failed." };
    }
  });
}
