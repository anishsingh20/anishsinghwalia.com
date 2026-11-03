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
  headline: "Content for AI-native companies and brands.",
  positioning:
    "Brand stories, thought leadership, LinkedIn, ghostwriting, video, infographics, blogs, newsletters, docs. An engineer who writes, so the work stays accurate.",
  description:
    "Content of every kind for AI-native companies and fast-moving brands. Brand storytelling, thought leadership, LinkedIn, ghostwriting, video, infographics, blogs, newsletters and docs. Anish Singh Walia, team lead at DigitalOcean.",
  title: "Anish Singh Walia · Content for AI-native companies and brands",
  motto: "Share your knowledge. It is a way to achieve immortality.",
  mottoAttribution: "Dalai Lama. It's on my GitHub README and my Medium bio.",
  recommendationsUrl:
    "https://www.linkedin.com/in/anish-singh-walia/details/recommendations/",
  education: {
    school: "Vellore Institute of Technology",
    credential: "Bachelor's degree, Information Technology",
    years: "2015 to 2019",
  },
  /**
   * Intro-call booking page. Default is Anish's Calendly.
   * Override with NEXT_PUBLIC_BOOKING_URL or BOOKING_URL. Empty hides every booking CTA.
   */
  bookingUrl: (
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    process.env.BOOKING_URL ??
    "https://calendly.com/client-strategy-session/15min"
  ).trim(),
} as const;

export const bookingLabel = "Book an intro call";

/**
 * Document360 Global Writers Awards. Checked against the winners page on 2 Nov 2026:
 * the page heading reads "2025 - 2026" and "Meet the Top 50 Winners"; the entry is
 * "#23 Anish Singh Walia, Senior Technical Writer II at DigitalOcean". The page says
 * winners were picked by a judging panel (70%) and public votes (30%). The page writes the
 * edition as "2025 - 2026"; the site writes it 2025–26.
 */
export const award = {
  name: "Document360 Global Writers Awards",
  edition: "2025–26",
  placement: "Top 50 winner · #23",
  rank: 23,
  listedAs: "Senior Technical Writer II at DigitalOcean",
  /** Canonical short line used on the pill and anywhere the award is named in one phrase. */
  short: "Top 50 winner · #23 · Document360 Global Writers Awards 2025–26",
  how: "Winners were picked by a judging panel (70%) and public votes (30%).",
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

/** Primary nav. Work with me is the accent CTA. Game is a labelled item. */
export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/game", label: "Game" },
] as const;

export const footerNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/experience", label: "Experience" },
  { href: "/clients", label: "Clients" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/game", label: "Game" },
  { href: "/contact", label: "Work with me" },
] as const;

/** Who the work is for. */
export const audiences = ["AI-native companies", "Fast-moving brands"] as const;

export const icp =
  "Heads of marketing, content leads, and founders at AI-native companies and fast-moving brands.";

export const lastUpdated = "2026-11-03";

export const linkedInSemrushPost =
  "https://www.linkedin.com/posts/anish-singh-walia_how-to-use-semrush-with-chatgpt-for-viral-activity-7297901444194611200-pCWD";
