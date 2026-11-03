/**
 * Internal vs external hrefs. Internal navigation is always a root-relative
 * path so it works on localhost, previews, and production.
 */

const OWN_HOSTS = new Set(["anishsinghwalia.com", "www.anishsinghwalia.com"]);

export function isInternalHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("/") || href.startsWith("#")) return true;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  try {
    const url = new URL(href);
    return OWN_HOSTS.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function isExternalHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("/") || href.startsWith("#")) return false;
  return /^https?:\/\//i.test(href) && !isInternalHref(href);
}

/** Turn a production URL into /about, /testimonials#renu-sharma, etc. */
export function toInternalPath(href: string): string {
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const url = new URL(href);
    if (OWN_HOSTS.has(url.hostname.toLowerCase())) {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
  } catch {
    return href;
  }
  return href;
}

export function pathWithoutHash(href: string): string {
  const path = toInternalPath(href);
  return path.split("#")[0] || "/";
}

/** Markdown links plus bare http(s) URLs in bot answers. */
export function extractHrefs(text: string): string[] {
  const found: string[] = [];
  const markdown = /\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = markdown.exec(text))) found.push(match[1]);
  const bare = /\bhttps?:\/\/[^\s)]+/g;
  while ((match = bare.exec(text))) {
    const href = match[0].replace(/[.,;:]+$/, "");
    if (!found.includes(href)) found.push(href);
  }
  return found;
}

export function isCitableHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#") || /^https?:\/\//i.test(href);
}
