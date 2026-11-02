import { tutorials } from "@data/writing";
import { cached } from "./cache";
import { htmlToText } from "./fetch-page";

/** Live sources that need no API key. Each one is cached for a while. */

const UA = "Mozilla/5.0 (compatible; ask.anish/3.0; +https://anishsinghwalia.com)";

export type MediumPost = { title: string; url: string; date: string; categories: string[]; snippet: string };

export async function mediumPosts(limit = 8): Promise<{ posts: MediumPost[]; error?: string }> {
  return cached("medium:rss", 30 * 60 * 1000, async () => {
    try {
      const response = await fetch("https://medium.com/feed/@anishsingh20", {
        headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) return { posts: [], error: `Medium RSS returned ${response.status}.` };
      const xml = await response.text();
      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
      const posts = items.slice(0, limit).map((item) => {
        const pick = (tag: string) => {
          const raw = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? "";
          return raw.replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
        };
        const categories = [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((match) =>
          match[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim(),
        );
        const encoded = pick("content:encoded") || pick("description");
        const snippet = htmlToText(encoded).text.replace(/\s+/g, " ").slice(0, 320);
        return {
          title: pick("title"),
          url: pick("link").replace(/\?source=.*$/, ""),
          date: pick("pubDate"),
          categories,
          snippet,
        };
      });
      return { posts };
    } catch (error) {
      return { posts: [], error: error instanceof Error ? error.message : "Medium RSS failed." };
    }
  });
}

export type GitHubProfile = {
  login: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  url: string;
  location: string;
  topRepos: { name: string; url: string; stars: number; description: string; language: string | null; updated: string }[];
  recentRepos: { name: string; url: string; updated: string; description: string }[];
};

export async function githubProfile(): Promise<{ profile?: GitHubProfile; error?: string }> {
  return cached("github:anishsingh20", 30 * 60 * 1000, async () => {
    const headers: Record<string, string> = { "User-Agent": UA, Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch("https://api.github.com/users/anishsingh20", { headers, signal: AbortSignal.timeout(10_000) }),
        fetch("https://api.github.com/users/anishsingh20/repos?per_page=100&sort=updated", { headers, signal: AbortSignal.timeout(10_000) }),
      ]);
      if (!userResponse.ok) return { error: `GitHub returned ${userResponse.status}.` };
      const user = (await userResponse.json()) as Record<string, unknown>;
      type Repo = { name: string; html_url: string; stargazers_count: number; description: string | null; language: string | null; pushed_at: string; fork: boolean };
      const repos = reposResponse.ok ? ((await reposResponse.json()) as Repo[]).filter((repo) => !repo.fork) : [];
      const topRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((repo) => ({ name: repo.name, url: repo.html_url, stars: repo.stargazers_count, description: repo.description ?? "", language: repo.language, updated: repo.pushed_at }));
      const recentRepos = [...repos].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 5).map((repo) => ({ name: repo.name, url: repo.html_url, updated: repo.pushed_at, description: repo.description ?? "" }));
      return {
        profile: {
          login: String(user.login),
          name: String(user.name ?? ""),
          bio: String(user.bio ?? ""),
          publicRepos: Number(user.public_repos ?? 0),
          followers: Number(user.followers ?? 0),
          following: Number(user.following ?? 0),
          url: String(user.html_url ?? "https://github.com/anishsingh20"),
          location: String(user.location ?? ""),
          topRepos,
          recentRepos,
        },
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "GitHub failed." };
    }
  });
}

export type DigitalOceanProfile = {
  url: string;
  tutorialCount: number | null;
  bio: string;
  location: string;
  knownTutorials: { title: string; url: string; meta: string }[];
};

export async function digitalOceanProfile(): Promise<{ profile: DigitalOceanProfile; error?: string }> {
  return cached("do:asinghwalia", 60 * 60 * 1000, async () => {
    const url = "https://www.digitalocean.com/community/users/asinghwalia";
    const knownTutorials = tutorials.map((item) => ({ title: item.title, url: item.href, meta: item.meta }));
    try {
      const response = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html" }, signal: AbortSignal.timeout(12_000) });
      if (!response.ok) {
        return { profile: { url, tutorialCount: null, bio: "", location: "", knownTutorials }, error: `DigitalOcean returned ${response.status}.` };
      }
      const html = await response.text();
      const count = html.match(/Tutorials(?:<!-- -->)?\s*\((\d+)/)?.[1];
      const bio = html.match(/"bio\\?":\\?"([^"\\]{20,600})/)?.[1]?.replace(/\\u2019/g, "'") ?? "";
      const location = html.match(/>([A-Z][A-Za-z .]+, [A-Z]{2})</)?.[1] ?? "";
      return { profile: { url, tutorialCount: count ? Number(count) : null, bio, location, knownTutorials } };
    } catch (error) {
      return { profile: { url, tutorialCount: null, bio: "", location: "", knownTutorials }, error: error instanceof Error ? error.message : "DigitalOcean failed." };
    }
  });
}
