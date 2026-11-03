export type ClientGroupId = "brands" | "employers" | "writing" | "press";

export type ClientEntry = {
  name: string;
  /** Short engagement tag on the card. Not a project write-up. */
  tag: string;
  /** Optional one-line support. Only when the tag needs it. */
  note?: string;
  /** Facts for the bot and llms.txt. Same wording as the public card. */
  brief: string;
  /** Company site or a public post. Never a case-study route. */
  link?: { label: string; href: string };
  group: ClientGroupId;
  featured?: boolean;
};

export const clients: ClientEntry[] = [
  {
    name: "Semrush",
    tag: "Contractual content partner",
    note: "I publish monthly articles and LinkedIn posts for Semrush on my socials.",
    brief: "Contractual content partner. I publish monthly articles and LinkedIn posts for Semrush on my socials.",
    group: "brands",
    featured: true,
  },
  {
    name: "Hostinger",
    tag: "Tutorials content project",
    note: "For the Hostinger tutorials library",
    brief: "Tutorials content project for the Hostinger tutorials library.",
    link: { label: "Author page", href: "https://www.hostinger.com/tutorials/author/anishsingh/" },
    group: "brands",
  },
  {
    name: "Tanot Solutions",
    tag: "Ghostwriting partner",
    note: "Positioning, voice and LinkedIn content for the co-founder",
    brief: "Ghostwriting partner: positioning, voice and LinkedIn content for the co-founder.",
    link: {
      label: "Renu Sharma on LinkedIn",
      href: "https://www.linkedin.com/posts/renusharma074_seo-backlinks-linkbuilding-activity-7475171298516729856-h8V0",
    },
    group: "brands",
    featured: true,
  },
  {
    name: "DataImpulse",
    tag: "Social media content project",
    note: "LinkedIn posts built on real experiments",
    brief: "Social media content project: LinkedIn posts built on real experiments.",
    link: {
      label: "The LinkedIn post",
      href: "https://www.linkedin.com/posts/anish-singh-walia_i-checked-how-google-ai-overviews-answer-activity-7444751278435631104--6QW",
    },
    group: "brands",
    featured: true,
  },
  {
    name: "OtterlyAI",
    tag: "Content project",
    note: "On AI search visibility",
    brief: "Content project on AI search visibility.",
    group: "brands",
  },
  {
    name: "Pollo AI",
    tag: "Content project",
    note: "Sponsored Medium pieces",
    brief: "Content project: sponsored Medium pieces.",
    group: "brands",
  },
  {
    name: "La Isla Designs",
    tag: "LinkedIn carousel content project",
    brief: "LinkedIn carousel content project.",
    group: "brands",
  },
  {
    name: "DigitalOcean",
    tag: "Senior Technical Content Strategist II · Team Lead",
    note: "Leads the AI and cloud tutorial program",
    brief: "Since 2023. I own the core infrastructure and AI inference tutorial programs and lead the team. 347 tutorials authored or refreshed.",
    link: { label: "Author page", href: "https://www.digitalocean.com/community/users/asinghwalia" },
    group: "employers",
    featured: true,
  },
  {
    name: "Nutanix",
    tag: "Site Reliability Engineer - Intern to Sr. SRE",
    brief: "Four years and eight months. Titles: Site Reliability Engineer - Intern, SRE, Sr. SRE, then Cloud Consultant for American Express Cloud and Infrastructure Operations team India.",
    group: "employers",
  },
  {
    name: "American Express",
    tag: "Cloud Consultant",
    note: "Cloud and Infrastructure Operations team India, through Nutanix",
    brief: "Cloud Consultant for American Express Cloud and Infrastructure Operations team India, January 2022 to August 2023, through Nutanix.",
    group: "employers",
  },
  {
    name: "DataScience+",
    tag: "Content project",
    brief: "Project-based R, statistics, and machine learning tutorials. June 2017 to August 2023.",
    link: { label: "Author page", href: "https://datascienceplus.com/author/anish-singh-walia/" },
    group: "writing",
  },
  {
    name: "GeeksforGeeks",
    tag: "Content project",
    brief: "Articles I wrote while I was at VIT.",
    link: { label: "Articles", href: "https://auth.geeksforgeeks.org/user/AnishSinghWalia/articles" },
    group: "writing",
  },
  {
    name: "ActiveCampaign",
    tag: "Press",
    brief: "A story on my Cursor and DataForSEO content-refresh workflow. Maddy Osman, 21 May 2026.",
    link: { label: "Read the story", href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow" },
    group: "press",
  },
  {
    name: "AllAboutAI",
    tag: "Press",
    brief: "Guest on AI For Thought with Muhammad Hassan Khan. My first podcast.",
    link: { label: "Watch", href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg" },
    group: "press",
  },
];

export const featuredClients = clients.filter((client) => client.featured);

export const clientGroups: { id: ClientGroupId; title: string; lede: string }[] = [
  { id: "brands", title: "Companies I've made content for", lede: "Any form of content for AI-native companies and brands." },
  { id: "employers", title: "Where I've worked", lede: "The engineering years, then the content team I lead now." },
  { id: "writing", title: "Also written for", lede: "Publications I've contributed to over the years." },
  { id: "press", title: "Press", lede: "Stories about the work." },
];

export const logoStrip = ["DigitalOcean", "Semrush", "Nutanix", "American Express", "Hostinger", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI"];

export const headlineClients = ["Semrush", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI"];

/**
 * Medium posts that name a tool. Sponsorship was not stated.
 * Kept off the public client wall until confirmed.
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
