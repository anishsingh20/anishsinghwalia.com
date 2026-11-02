export type ClientEntry = {
  name: string;
  relationship: string;
  detail: string;
  href?: string;
  group: "banner" | "client" | "writing" | "press";
};

export const clients: ClientEntry[] = [
  {
    name: "DigitalOcean",
    relationship: "Employer",
    detail: "Senior Technical Content Strategist II and Team Lead, since 2023.",
    href: "https://www.digitalocean.com/community/users/asinghwalia",
    group: "banner",
  },
  {
    name: "Semrush",
    relationship: "Sponsored essay and affiliate partnership",
    detail:
      "Sponsored the Medium essay “SEO-to-GEO Identity Crisis.” Daria Sukhorosolova, Senior Partner Manager, Affiliate Marketing at Semrush, recommended him as a client.",
    href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    group: "banner",
  },
  {
    name: "Nutanix",
    relationship: "Former employer",
    detail: "4 years 8 months: SRE intern, SRE, Sr. SRE, then cloud consultant.",
    group: "banner",
  },
  {
    name: "American Express",
    relationship: "Consulting engagement",
    detail:
      "Cloud Consultant for the American Express Cloud and Infrastructure Operations team in India, employed via Nutanix. January 2022 – August 2023, Pune.",
    group: "banner",
  },
  {
    name: "Hostinger",
    relationship: "Tutorials author",
    detail: "Author page includes “How to use the Linux cat command” (25 Feb 2019).",
    href: "https://www.hostinger.com/tutorials/author/anishsingh/",
    group: "banner",
  },
  {
    name: "Tanot Solutions",
    relationship: "Client",
    detail:
      "Ghostwriting and content strategy for co-founder Renu Sharma, including a LinkedIn rebrand.",
    group: "client",
  },
  {
    name: "Datalpulse",
    relationship: "Client",
    detail:
      "LinkedIn post for CMO Andrew Byzov, from a proxy experiment through to publication.",
    group: "client",
  },
  {
    name: "OtterlyAI",
    relationship: "Client",
    detail: "Content project with co-founder Klaus-M. Schremser.",
    group: "client",
  },
  {
    name: "Pollo AI",
    relationship: "Client",
    detail:
      "Abby Wang: a Medium piece introducing a new feature, their second collaboration.",
    group: "client",
  },
  {
    name: "La Isla Designs",
    relationship: "Collaboration",
    detail:
      "Nadia Fernández, founder. They worked together from different companies on a LinkedIn carousel.",
    group: "client",
  },
  {
    name: "DataScience+",
    relationship: "Author",
    detail: "Project-based R, statistics, and machine learning tutorials. June 2017 – August 2023.",
    href: "https://datascienceplus.com/author/anish-singh-walia/",
    group: "writing",
  },
  {
    name: "GeeksforGeeks",
    relationship: "Contributor",
    detail: "Wrote for GeeksforGeeks while at VIT.",
    href: "https://auth.geeksforgeeks.org/user/AnishSinghWalia/articles",
    group: "writing",
  },
  {
    name: "ActiveCampaign",
    relationship: "Press",
    detail:
      "Autonomous case study on his Cursor and DataForSEO content-refresh workflow. Maddy Osman, 21 May 2026.",
    href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    group: "press",
  },
  {
    name: "AllAboutAI",
    relationship: "Podcast",
    detail:
      "Guest on AI For Thought with Muhammad Hassan Khan. He has called it his first podcast.",
    href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg",
    group: "press",
  },
];

export const clientGroups = [
  { id: "banner" as const, title: "On his banner", lede: "The five marks he puts under “Businesses I have helped.”" },
  { id: "client" as const, title: "Client and collaboration work", lede: "Named in LinkedIn recommendations he received." },
  { id: "writing" as const, title: "Also written for", lede: "Publications, separate from client engagements." },
  { id: "press" as const, title: "Press", lede: "Stories about the work, not clients." },
];

/**
 * Medium posts that name a tool. Sponsorship was not stated.
 * Kept out of the public client wall until Anish confirms them.
 */
export const unconfirmedToolPosts = [
  {
    name: "OtterlyAI (Medium review)",
    note: "The company is a confirmed client via Klaus-M. Schremser. This specific post is not marked sponsored.",
    href: "https://medium.com/readers-club/how-i-cracked-ai-search-llm-visibility-using-otterlyai-384cfc8524cd",
  },
  {
    name: "AI Studios (DeepBrain AI)",
    note: "Tool-review post. Paid client work not confirmed.",
    href: "https://medium.com/@anishsingh20/how-i-use-ai-studios-to-replace-a-3-person-video-crew-and-shoot-videos-in-one-afternoon-d2661870ab5f",
  },
  {
    name: "Zawa.ai",
    note: "Tool-review post. Paid client work not confirmed.",
    href: "https://medium.com/@anishsingh20/how-i-rebranded-a-ten-year-old-cafe-without-touching-photoshop-using-zawa-ai-c5bc1a1ef1c1",
  },
  {
    name: "BeautyPlus",
    note: "Tool-review post. Paid client work not confirmed.",
    href: "https://medium.com/@anishsingh20/beautyplus-product-photos-small-brand-catalog-562fd1693d85",
  },
  {
    name: "Ideogram",
    note: "Tool-review posts. Paid client work not confirmed.",
    href: "https://medium.com/@anishsingh20/ideogram-vector-text-to-svg-review-f682f902ce46",
  },
  {
    name: "Unnamed multi-market video tool",
    note: "June 2026 Medium post. Product and sponsorship not confirmed.",
    href: "https://medium.com/@anishsingh20/from-one-product-video-to-fourteen-markets-inside-one-workspace-3f70abc86f36",
  },
];
