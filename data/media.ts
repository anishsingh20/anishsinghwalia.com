import { award } from "./site";

export type MediaCategory = "Podcast" | "Press" | "Features" | "Awards";

export type MediaItem = {
  id: string;
  category: MediaCategory;
  title: string;
  outlet: string;
  meta: string;
  href: string;
  note?: string;
  image?: { src: string; alt: string };
  embed?: "youtube";
};

export const mediaCategories: MediaCategory[] = ["Podcast", "Press", "Features", "Awards"];

export const mediaItems: MediaItem[] = [
  {
    id: "ai-for-thought",
    category: "Podcast",
    title: "AI For Thought",
    outlet: "AllAboutAI",
    meta: "With Muhammad Hassan Khan · May 2025",
    href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg",
    note: "My first podcast.",
    image: { src: "/images/media/ai-for-thought.jpg", alt: "AI For Thought podcast episode with Anish Singh Walia" },
    embed: "youtube",
  },
  {
    id: "allaboutai-feature",
    category: "Features",
    title: "How I Reached 3M+ Views as an AI Content Creator",
    outlet: "AllAboutAI",
    meta: "Written feature",
    href: "https://www.allaboutai.com/interviews/how-anish-used-chatgpt-semrush-to-hit-3m-views/",
    image: { src: "/images/media/allaboutai.png", alt: "AllAboutAI written feature on Anish Singh Walia" },
  },
  {
    id: "activecampaign",
    category: "Press",
    title: "How DigitalOcean updates its massive library of content 3–4x faster",
    outlet: "ActiveCampaign",
    meta: "Maddy Osman · 21 May 2026",
    href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    note: "Turnaround fell from about a day to a few hours, 60 to 70 percent less production time. Output went from 1 or 2 to 4 or 5 updated pieces a day.",
    image: { src: "/images/media/activecampaign.png", alt: "ActiveCampaign story on the content-refresh workflow" },
  },
  {
    id: "dataforseo-digest",
    category: "Press",
    title: "Monthly Community Digest",
    outlet: "DataForSEO",
    meta: "March 2026",
    href: "https://www.linkedin.com/posts/dataforseo_dfs-activity-7444737781844701184-L8sB",
    note: "Featured an n8n content-brief automation built with DataForSEO APIs.",
  },
  {
    id: "document360",
    category: "Awards",
    title: award.short,
    outlet: award.name,
    meta: `${award.edition} · listed as ${award.listedAs}`,
    href: award.href,
    note: award.how,
    image: { src: "/images/media/document360-top50.png", alt: "Document360 Global Writers Awards 2025–26 Top 50 winners, entry #23" },
  },
];

export const homeMediaIds = ["ai-for-thought", "allaboutai-feature", "document360"] as const;

export function homeMedia(): MediaItem[] {
  return homeMediaIds.map((id) => mediaItems.find((item) => item.id === id)!);
}
