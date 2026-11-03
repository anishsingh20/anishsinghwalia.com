/**
 * Public pieces a buyer can open. Every href is a live URL from the dossier.
 * No reconstructed pages. No case-study routes. Every card has a real image.
 */

export const showcaseGroups = [
  "Videos",
  "LinkedIn & social",
  "Long-form & thought leadership",
  "Ghostwriting",
  "Technical tutorials",
] as const;

export type ShowcaseGroup = (typeof showcaseGroups)[number];

export type ShowcaseItem = {
  id: string;
  group: ShowcaseGroup;
  title: string;
  outlet: string;
  href: string;
  image: { src: string; alt: string };
  /** Static thumb with a play mark. Links out. Never an iframe. */
  play?: boolean;
};

export const showcase: ShowcaseItem[] = [
  {
    id: "ai-for-thought",
    group: "Videos",
    title: "AI For Thought, with Muhammad Hassan Khan",
    outlet: "AllAboutAI podcast",
    href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg",
    image: {
      src: "/images/work/youtube-ai-for-thought.webp",
      alt: "YouTube thumbnail for AI For Thought episode 16 with Anish Singh Walia",
    },
    play: true,
  },
  {
    id: "dataimpulse-post",
    group: "LinkedIn & social",
    title: "Google AI Overviews across 15 countries, run on DataImpulse proxies",
    outlet: "LinkedIn",
    href: "https://www.linkedin.com/posts/anish-singh-walia_i-checked-how-google-ai-overviews-answer-activity-7444751278435631104--6QW",
    image: {
      src: "/images/work/dataimpulse-linkedin.webp",
      alt: "Anish's public LinkedIn post for DataImpulse, from a live proxy experiment",
    },
  },
  {
    id: "semrush-chatgpt-post",
    group: "LinkedIn & social",
    title: "How to use Semrush with ChatGPT",
    outlet: "LinkedIn",
    href: "https://www.linkedin.com/posts/anish-singh-walia_how-to-use-semrush-with-chatgpt-for-viral-activity-7297901444194611200-pCWD",
    image: {
      src: "/images/work/semrush-chatgpt-linkedin.webp",
      alt: "Anish's public LinkedIn post on using Semrush with ChatGPT",
    },
  },
  {
    id: "dataforseo-digest",
    group: "LinkedIn & social",
    title: "n8n content-brief automation in the Monthly Community Digest",
    outlet: "DataForSEO",
    href: "https://www.linkedin.com/posts/dataforseo_dfs-activity-7444737781844701184-L8sB",
    image: {
      src: "/images/work/dataforseo-digest.webp",
      alt: "DataForSEO Monthly Community Digest featuring Anish's n8n content-brief workflow",
    },
  },
  {
    id: "semrush-essay",
    group: "Long-form & thought leadership",
    title: "SEO-to-GEO Identity Crisis: Fix Traffic-Revenue Gap",
    outlet: "Medium · sponsored by Semrush",
    href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    image: {
      src: "/images/work/semrush-hero.webp",
      alt: "Hero illustration from the SEO-to-GEO Identity Crisis essay on Medium",
    },
  },
  {
    id: "video-library",
    group: "Long-form & thought leadership",
    title: "This is How I Helped a Five-Person Team Rebuild Its Video Library",
    outlet: "Medium",
    href: "https://medium.com/@anishsingh20/this-is-how-i-helped-a-five-person-team-rebuild-its-video-library-6f06e5161b94",
    image: {
      src: "/images/work/video-library.webp",
      alt: "Hero image from Anish's Medium essay on rebuilding a video library",
    },
  },
  {
    id: "zero-click",
    group: "Long-form & thought leadership",
    title: "How I Turn Zero-Click SERPs Into Measurable Brand Visibility",
    outlet: "Medium",
    href: "https://medium.com/readers-club/how-i-turn-zero-click-serps-into-measurable-brand-visibility-91c53bbbb535",
    image: {
      src: "/images/work/zero-click.webp",
      alt: "Hero illustration from the Zero-Click SERPs essay on Medium",
    },
  },
  {
    id: "allaboutai-feature",
    group: "Long-form & thought leadership",
    title: "How Anish used ChatGPT and Semrush",
    outlet: "AllAboutAI",
    href: "https://www.allaboutai.com/interviews/how-anish-used-chatgpt-semrush-to-hit-3m-views/",
    image: { src: "/images/media/allaboutai.png", alt: "AllAboutAI written feature on Anish" },
  },
  {
    id: "renu-linkedin",
    group: "Ghostwriting",
    title: "Founder voice on LinkedIn for Renu Sharma",
    outlet: "Tanot Solutions",
    href: "https://www.linkedin.com/posts/renusharma074_seo-backlinks-linkbuilding-activity-7475171298516729856-h8V0",
    image: {
      src: "/images/work/tanot-linkedin.webp",
      alt: "A public LinkedIn post by Renu Sharma, co-founder of Tanot Solutions",
    },
  },
  {
    id: "do-inference",
    group: "Technical tutorials",
    title: "How to Benchmark LLM Inference Yourself",
    outlet: "DigitalOcean · sole author",
    href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    image: {
      src: "/images/work/do-inference.webp",
      alt: "The DigitalOcean tutorial How to Benchmark LLM Inference Yourself",
    },
  },
  {
    id: "do-rag",
    group: "Technical tutorials",
    title: "Zero-Infrastructure RAG Agent with Knowledge Bases + MCP",
    outlet: "DigitalOcean · sole author",
    href: "https://www.digitalocean.com/community/tutorials/build-rag-agent-digitalocean-knowledge-bases-mcp",
    image: {
      src: "/images/work/do-rag.webp",
      alt: "Cover for the DigitalOcean tutorial on a zero-infrastructure RAG agent",
    },
  },
  {
    id: "hostinger-linux",
    group: "Technical tutorials",
    title: "How to use the Linux cat command",
    outlet: "Hostinger",
    href: "https://www.hostinger.com/tutorials/linux-cat-command/",
    image: {
      src: "/images/work/hostinger-cat.webp",
      alt: "Terminal figure from Anish's Hostinger tutorial on the Linux cat command",
    },
  },
];

/** Six strongest live pieces for the home preview. Covers every format. */
export const featuredShowcaseIds = [
  "ai-for-thought",
  "dataimpulse-post",
  "semrush-essay",
  "renu-linkedin",
  "do-inference",
  "video-library",
] as const;

export function featuredShowcase() {
  return featuredShowcaseIds.map((id) => showcase.find((item) => item.id === id)!);
}

export function showcaseByGroup() {
  return showcaseGroups
    .map((group) => ({ group, items: showcase.filter((item) => item.group === group) }))
    .filter((entry) => entry.items.length > 0);
}
