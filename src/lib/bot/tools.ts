import { fetchPage } from "./fetch-page";
import { fact, faqText, searchNotes, topicList, type Topic } from "./knowledge";
import { digitalOceanProfile, githubProfile, mediumPosts } from "./live";
import { webSearch } from "./search";

/** OpenAI-style tool schemas plus the executor the agent loop calls. */

export const toolSchemas = [
  {
    type: "function",
    function: {
      name: "knowledge_base",
      description:
        "High-trust facts about Anish from his own site: bio, roles and dates, companies he has worked with, testimonials, formats he makes, writing, numbers, hobbies, education, how to hire him, press, GitHub projects, technical depth, contact. Call this first for any question about him.",
      parameters: {
        type: "object",
        properties: {
          topics: { type: "array", items: { type: "string", enum: topicList }, description: "Which sections to read." },
          query: { type: "string", description: "Free-text query to search his notes for anything not covered by a topic." },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "medium_feed",
      description: "Live list of his most recent Medium posts from the RSS feed: titles, links, dates, tags, snippets.",
      parameters: { type: "object", properties: { limit: { type: "integer", minimum: 1, maximum: 10 } } },
    },
  },
  {
    type: "function",
    function: {
      name: "github_profile",
      description: "Live GitHub profile for anishsingh20: public repo count, followers, bio, top-starred repos, recently updated repos.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "digitalocean_profile",
      description: "Live DigitalOcean Community author page: tutorial count, bio, location, plus a curated list of his notable tutorials.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "web_search",
      description: "Search the live web. The query is automatically scoped to Anish Singh Walia. Use for anything recent or not in the knowledge base.",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetch_page",
      description: "Fetch a public URL and return its readable text. Use after web_search, or to read one of his articles.",
      parameters: {
        type: "object",
        properties: { url: { type: "string" } },
        required: ["url"],
      },
    },
  },
] as const;

export type ToolName = (typeof toolSchemas)[number]["function"]["name"];

export type ToolOutcome = { content: string; sources: { title: string; url: string }[] };

export async function runTool(name: string, args: Record<string, unknown>): Promise<ToolOutcome> {
  switch (name as ToolName) {
    case "knowledge_base": {
      const topics = Array.isArray(args.topics) ? (args.topics as string[]).filter((topic): topic is Topic => topicList.includes(topic as Topic)) : [];
      const parts = topics.map((topic) => `## ${topic}\n${fact(topic)}`);
      if (typeof args.query === "string" && args.query.trim()) {
        const chunks = await searchNotes(args.query, 4);
        if (chunks.length) parts.push(`## notes matching "${args.query}"\n${chunks.map((chunk) => chunk.text).join("\n\n")}`);
      }
      if (!parts.length) parts.push(`## identity\n${fact("identity")}`, `## faq\n${faqText()}`);
      return { content: parts.join("\n\n"), sources: [{ title: "Anish's notes on this site", url: "/about" }] };
    }
    case "medium_feed": {
      const limit = typeof args.limit === "number" ? Math.max(1, Math.min(10, args.limit)) : 6;
      const { posts, error } = await mediumPosts(limit);
      if (error && !posts.length) return { content: `Medium RSS unavailable: ${error}`, sources: [] };
      return {
        content: posts.map((post) => `- ${post.title} (${post.date})\n  ${post.url}\n  tags: ${post.categories.join(", ") || "none"}\n  ${post.snippet}`).join("\n"),
        sources: posts.slice(0, 3).map((post) => ({ title: post.title, url: post.url })),
      };
    }
    case "github_profile": {
      const { profile, error } = await githubProfile();
      if (!profile) return { content: `GitHub unavailable: ${error}`, sources: [] };
      return {
        content: [
          `${profile.name} (@${profile.login}): ${profile.publicRepos} public repos, ${profile.followers} followers, following ${profile.following}. ${profile.location ? `Location: ${profile.location}.` : ""}`,
          `Bio: ${profile.bio}`,
          "Top repos by stars:",
          ...profile.topRepos.map((repo) => `- ${repo.name} (${repo.stars} stars${repo.language ? `, ${repo.language}` : ""}): ${repo.description} ${repo.url}`),
          "Recently updated:",
          ...profile.recentRepos.map((repo) => `- ${repo.name} (${repo.updated.slice(0, 10)}): ${repo.description} ${repo.url}`),
        ].join("\n"),
        sources: [{ title: "GitHub, anishsingh20", url: profile.url }],
      };
    }
    case "digitalocean_profile": {
      const { profile, error } = await digitalOceanProfile();
      return {
        content: [
          profile.tutorialCount ? `Tutorial count on the author page right now: ${profile.tutorialCount}.` : `Live tutorial count unavailable${error ? ` (${error})` : ""}. The site lists 347.`,
          profile.bio ? `Author bio: ${profile.bio}` : "",
          profile.location ? `Location on DigitalOcean: ${profile.location}.` : "",
          "Notable tutorials:",
          ...profile.knownTutorials.map((item) => `- ${item.title} (${item.meta}) ${item.url}`),
        ].filter(Boolean).join("\n"),
        sources: [{ title: "DigitalOcean author page", url: profile.url }],
      };
    }
    case "web_search": {
      const query = typeof args.query === "string" ? args.query : "";
      const { provider, hits, error } = await webSearch(query);
      if (!provider) return { content: "Web search is not configured on this server. Use the live Medium, GitHub, and DigitalOcean tools and the knowledge base instead.", sources: [] };
      if (error && !hits.length) return { content: `Search failed: ${error}`, sources: [] };
      return {
        content: hits.map((hit, index) => `${index + 1}. ${hit.title}\n   ${hit.url}\n   ${hit.snippet}`).join("\n"),
        sources: hits.slice(0, 4).map((hit) => ({ title: hit.title, url: hit.url })),
      };
    }
    case "fetch_page": {
      const url = typeof args.url === "string" ? args.url : "";
      const result = await fetchPage(url);
      if ("error" in result) return { content: `Could not fetch ${url}: ${result.error}`, sources: [] };
      return { content: `# ${result.title}\n${result.url}\n\n${result.text}${result.truncated ? "\n[truncated]" : ""}`, sources: [{ title: result.title, url: result.url }] };
    }
    default:
      return { content: `Unknown tool ${name}.`, sources: [] };
  }
}
