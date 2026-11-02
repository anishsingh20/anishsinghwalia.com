/** Site-wide facts. Pages read from here. */

export const site = {
  name: "Anish Singh Walia",
  alternateName: "Anish Walia",
  jobTitle: "Senior Technical Content Strategist II and Team Lead",
  employer: "DigitalOcean",
  employerUrl: "https://www.digitalocean.com",
  /** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://anishsinghwalia.com",
  /** Contact form destination. The public address on my GitHub README. */
  email: process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || "waliaanish1997@gmail.com",
  location: {
    locality: "Dehradun",
    region: "Uttarakhand",
    country: "IN",
    label: "Dehradun, Uttarakhand, India",
  },
  /** One line under the name. */
  headline: "Technical content creator. Engineer first.",
  /** The hero paragraph. */
  positioning:
    "I make technical content for B2B, SaaS, AI-native, and developer-tool companies. Videos, infographics, long-form deep dives, LinkedIn posts, ghostwriting, docs and tutorials, newsletters. I was an SRE before I was a writer, so the code in my content runs.",
  description:
    "Anish Singh Walia is a technical content creator and Senior Technical Content Strategist II and Team Lead at DigitalOcean. Videos, deep dives, LinkedIn posts, ghostwriting, docs, tutorials, and newsletters for B2B, SaaS, AI-native, and developer-tool companies. Former SRE at Nutanix and cloud consultant for American Express.",
  title: "Anish Singh Walia · Technical content creator, team lead at DigitalOcean",
  motto: "Share your knowledge. It is a way to achieve immortality.",
  mottoAttribution: "Dalai Lama. It's on my GitHub README and my Medium bio.",
  recommendationsUrl:
    "https://www.linkedin.com/in/anish-singh-walia/details/recommendations/",
  education: {
    school: "Vellore Institute of Technology",
    credential: "Bachelor's degree, Information Technology",
    years: "2015 to 2019",
  },
} as const;

/**
 * Document360 Global Writers Awards. Checked against the winners page on 2 Nov 2026:
 * the page heading reads "2025 - 2026" and "Meet the Top 50 Winners"; the entry is
 * "#23 Anish Singh Walia, Senior Technical Writer II at DigitalOcean". The page says
 * winners were scored 70% by a judging panel on submitted portfolios and 30% by public voting.
 */
export const award = {
  name: "Document360 Global Writers Awards",
  edition: "2025 - 2026",
  placement: "Top 50 Winner, #23",
  rank: 23,
  listedAs: "Senior Technical Writer II at DigitalOcean",
  short: "Top 50 Winner, Document360 Global Writers Awards 2025 - 2026",
  how: "Scored 70% by a judging panel on submitted portfolios and 30% by public voting.",
  href: "https://globalwritersawards.document360.com/c/document360-global-writers-awards-2025/winners",
  profileHref: "https://globalwritersawards.document360.com/c/document360-global-writers-awards-2025/nominees/anish-singh-walia",
} as const;

export type SocialIconId = "linkedin" | "medium" | "github" | "digitalocean" | "hostinger";

export const socials: readonly { label: string; href: string; icon: SocialIconId }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anish-singh-walia/",
    icon: "linkedin",
  },
  {
    label: "Medium",
    href: "https://medium.com/@anishsingh20",
    icon: "medium",
  },
  {
    label: "GitHub",
    href: "https://github.com/anishsingh20",
    icon: "github",
  },
  {
    label: "DigitalOcean",
    href: "https://www.digitalocean.com/community/users/asinghwalia",
    icon: "digitalocean",
  },
  {
    label: "Hostinger",
    href: "https://www.hostinger.com/tutorials/author/anishsingh/",
    icon: "hostinger",
  },
];

/** Older profiles that exist, but are not the main ones. */
export const legacyProfiles = [
  {
    label: "Medium (older technical blog)",
    href: "https://medium.com/@anishsinghwalia",
  },
] as const;

export const metrics = [
  { id: "readers", value: "3,000,000+", label: "average monthly readers on Medium" },
  { id: "subscribers", value: "35,000+", label: "newsletter subscribers" },
  { id: "top-writer", value: "2×", label: "Medium Top Writer" },
  { id: "tutorials", value: "347", label: "DigitalOcean tutorials" },
] as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/clients", label: "Clients" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/work", label: "Work" },
  { href: "/game", label: "Game Room" },
  { href: "/ask", label: "Ask" },
] as const;

/** Who the work is for. */
export const audiences = ["B2B companies", "SaaS companies", "AI-native companies", "Developer-tool companies"] as const;
