export type ClientGroupId = "brands" | "employers" | "writing" | "press";

export type ClientEntry = {
  name: string;
  /** Short label under the name. */
  relationship: string;
  detail: string;
  /** A natural link out: the piece itself, an author page, a story. */
  link?: { label: string; href: string };
  group: ClientGroupId;
};

export const clients: ClientEntry[] = [
  {
    name: "Semrush",
    relationship: "Sponsored essay and affiliate content",
    detail: "Sponsored my Medium essay “SEO-to-GEO Identity Crisis” and the affiliate content I write around SEO, digital marketing, and AI.",
    link: { label: "Read the essay", href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306" },
    group: "brands",
  },
  {
    name: "Hostinger",
    relationship: "Tutorials",
    detail: "Linux tutorials for the Hostinger tutorials library, including “How to use the Linux cat command.”",
    link: { label: "Author page", href: "https://www.hostinger.com/tutorials/author/anishsingh/" },
    group: "brands",
  },
  {
    name: "Tanot Solutions",
    relationship: "Ghostwriting and LinkedIn rebrand",
    detail: "Ghostwriting and content strategy for co-founder Renu Sharma: positioning, voice, About section, headline, banner, and the posts.",
    group: "brands",
  },
  {
    name: "DataImpulse",
    relationship: "LinkedIn post from a live experiment",
    detail: "A LinkedIn post for CMO Andrew Byzov. I ran the experiment on their proxies, then turned the data into the post.",
    group: "brands",
  },
  {
    name: "OtterlyAI",
    relationship: "Content project",
    detail: "A content project with co-founder Klaus-M. Schremser on AI search visibility.",
    group: "brands",
  },
  {
    name: "Pollo AI",
    relationship: "Sponsored Medium pieces",
    detail: "Two Medium pieces with Abby Wang. The first became one of their most successful social campaigns; the second introduced a new feature.",
    group: "brands",
  },
  {
    name: "La Isla Designs",
    relationship: "LinkedIn carousel",
    detail: "A LinkedIn carousel with founder Nadia Fernández: brand prompts and complex ideas turned into something people can follow.",
    group: "brands",
  },
  {
    name: "DigitalOcean",
    relationship: "Senior Technical Content Strategist II and Team Lead",
    detail: "Since 2023. I own the core infrastructure and AI inference tutorial programs and lead the team. 347 tutorials authored or refreshed.",
    link: { label: "My tutorials", href: "https://www.digitalocean.com/community/users/asinghwalia" },
    group: "employers",
  },
  {
    name: "Nutanix",
    relationship: "SRE intern to Sr. SRE",
    detail: "Four years and eight months on the infrastructure that other people's products ran on.",
    group: "employers",
  },
  {
    name: "American Express",
    relationship: "Cloud consultant",
    detail: "Cloud Consultant for the American Express Cloud and Infrastructure Operations team in India, January 2022 to August 2023, through Nutanix.",
    group: "employers",
  },
  {
    name: "DataScience+",
    relationship: "Author",
    detail: "Project-based R, statistics, and machine learning tutorials. June 2017 to August 2023.",
    link: { label: "Author page", href: "https://datascienceplus.com/author/anish-singh-walia/" },
    group: "writing",
  },
  {
    name: "GeeksforGeeks",
    relationship: "Contributor",
    detail: "Articles I wrote while I was at VIT.",
    link: { label: "Articles", href: "https://auth.geeksforgeeks.org/user/AnishSinghWalia/articles" },
    group: "writing",
  },
  {
    name: "ActiveCampaign",
    relationship: "Case study",
    detail: "A case study on my Cursor and DataForSEO content-refresh workflow. Maddy Osman, 21 May 2026.",
    link: { label: "Read the story", href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow" },
    group: "press",
  },
  {
    name: "AllAboutAI",
    relationship: "Podcast",
    detail: "Guest on AI For Thought with Muhammad Hassan Khan. My first podcast.",
    link: { label: "Watch", href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg" },
    group: "press",
  },
];

export const clientGroups: { id: ClientGroupId; title: string; lede: string }[] = [
  { id: "brands", title: "Brands I've created content for", lede: "Sponsored essays, ghostwriting, LinkedIn posts and carousels, tutorials." },
  { id: "employers", title: "Where I've worked", lede: "The engineering years, then the content team I lead now." },
  { id: "writing", title: "Also written for", lede: "Publications I've contributed to over the years." },
  { id: "press", title: "Press", lede: "Stories about the work." },
];

/** The marks that go on the logo strip next to a call to action. */
export const logoStrip = ["DigitalOcean", "Semrush", "Nutanix", "American Express", "Hostinger", "OtterlyAI", "DataImpulse", "Tanot Solutions", "Pollo AI"];

/** Names I use when I describe client work in one line. */
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
