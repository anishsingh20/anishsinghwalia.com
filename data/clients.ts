export type ClientGroupId = "brands" | "employers" | "writing" | "press";

export type ClientEntry = {
  name: string;
  /** Short engagement tag on the card. Not a project write-up. */
  tag: string;
  /** Optional one-line support. Only when the tag needs it. */
  note?: string;
  /** Facts for the bot and llms.txt. Not shown on the client cards. */
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
    brief: "Sponsored my Medium essay “SEO-to-GEO Identity Crisis” and the affiliate content I write around SEO, digital marketing, and AI.",
    link: {
      label: "SEO-to-GEO Identity Crisis",
      href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    },
    group: "brands",
    featured: true,
  },
  {
    name: "Hostinger",
    tag: "Content project",
    brief: "Linux tutorials for the Hostinger tutorials library, including “How to use the Linux cat command.”",
    link: { label: "Author page", href: "https://www.hostinger.com/tutorials/author/anishsingh/" },
    group: "brands",
  },
  {
    name: "Tanot Solutions",
    tag: "Ghostwriting partner",
    brief: "Ghostwriting and content strategy for co-founder Renu Sharma: positioning, voice, About section, headline, and the posts.",
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
    brief: "A LinkedIn post for CMO Andrew Byzov. I ran the experiment on their proxies, then turned the data into the post.",
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
    brief: "A content project with co-founder Klaus-M. Schremser on AI search visibility.",
    group: "brands",
  },
  {
    name: "Pollo AI",
    tag: "Content partner",
    brief: "Two Medium pieces with Abby Wang. The first became one of their most successful social campaigns; the second introduced a new feature.",
    group: "brands",
  },
  {
    name: "La Isla Designs",
    tag: "Content project",
    brief: "A LinkedIn carousel with founder Nadia Fernández: brand prompts and complex ideas turned into something people can follow.",
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
    tag: "SRE intern to Sr. SRE",
    brief: "Four years and eight months on the infrastructure that other people's products ran on.",
    group: "employers",
  },
  {
    name: "American Express",
    tag: "Cloud consultant",
    brief: "Cloud Consultant for the American Express Cloud and Infrastructure Operations team in India, January 2022 to August 2023, through Nutanix.",
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
  { id: "brands", title: "Companies I've made content for", lede: "Essays, ghostwriting, LinkedIn, tutorials." },
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
