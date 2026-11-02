import { cached } from "./cache";

export type SearchHit = { title: string; url: string; snippet: string };
export type SearchProvider = "tavily" | "brave" | "serper" | "exa";

/** Pick the provider from SEARCH_PROVIDER, or from whichever key is present. */
export function searchProvider(): SearchProvider | null {
  const forced = process.env.SEARCH_PROVIDER?.toLowerCase() as SearchProvider | undefined;
  if (forced && keyFor(forced)) return forced;
  if (process.env.TAVILY_API_KEY) return "tavily";
  if (process.env.BRAVE_SEARCH_API_KEY) return "brave";
  if (process.env.SERPER_API_KEY) return "serper";
  if (process.env.EXA_API_KEY) return "exa";
  return null;
}

function keyFor(provider: SearchProvider) {
  return {
    tavily: process.env.TAVILY_API_KEY,
    brave: process.env.BRAVE_SEARCH_API_KEY,
    serper: process.env.SERPER_API_KEY,
    exa: process.env.EXA_API_KEY,
  }[provider];
}

/** Every query carries his name so results stay about him. */
export function biasQuery(query: string) {
  return /anish/i.test(query) ? query : `Anish Singh Walia ${query}`;
}

export async function webSearch(query: string, count = 6): Promise<{ provider: SearchProvider | null; hits: SearchHit[]; error?: string }> {
  const provider = searchProvider();
  if (!provider) return { provider: null, hits: [], error: "No search key is configured." };
  const q = biasQuery(query);
  return cached(`search:${provider}:${q}:${count}`, 15 * 60 * 1000, async () => {
    try {
      const hits = await run(provider, q, count);
      return { provider, hits };
    } catch (error) {
      return { provider, hits: [], error: error instanceof Error ? error.message : "Search failed." };
    }
  });
}

async function run(provider: SearchProvider, query: string, count: number): Promise<SearchHit[]> {
  const key = keyFor(provider)!;
  const signal = AbortSignal.timeout(12_000);
  if (provider === "tavily") {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ query, max_results: count, search_depth: "basic", include_answer: false }),
      signal,
    });
    if (!response.ok) throw new Error(`Tavily ${response.status}`);
    const data = (await response.json()) as { results?: { title: string; url: string; content: string }[] };
    return (data.results ?? []).map((item) => ({ title: item.title, url: item.url, snippet: item.content }));
  }
  if (provider === "brave") {
    const url = new URL("https://api.search.brave.com/res/v1/web/search");
    url.searchParams.set("q", query);
    url.searchParams.set("count", String(count));
    const response = await fetch(url, { headers: { Accept: "application/json", "X-Subscription-Token": key }, signal });
    if (!response.ok) throw new Error(`Brave ${response.status}`);
    const data = (await response.json()) as { web?: { results?: { title: string; url: string; description: string }[] } };
    return (data.web?.results ?? []).map((item) => ({ title: item.title, url: item.url, snippet: item.description }));
  }
  if (provider === "serper") {
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": key },
      body: JSON.stringify({ q: query, num: count }),
      signal,
    });
    if (!response.ok) throw new Error(`Serper ${response.status}`);
    const data = (await response.json()) as { organic?: { title: string; link: string; snippet: string }[] };
    return (data.organic ?? []).map((item) => ({ title: item.title, url: item.link, snippet: item.snippet }));
  }
  const response = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": key },
    body: JSON.stringify({ query, numResults: count, contents: { highlights: { maxCharacters: 400 } } }),
    signal,
  });
  if (!response.ok) throw new Error(`Exa ${response.status}`);
  const data = (await response.json()) as { results?: { title: string; url: string; highlights?: string[]; text?: string }[] };
  return (data.results ?? []).map((item) => ({
    title: item.title,
    url: item.url,
    snippet: item.highlights?.join(" ") ?? item.text?.slice(0, 400) ?? "",
  }));
}
