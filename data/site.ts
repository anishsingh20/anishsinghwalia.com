/**
 * Site-wide facts. Pages read from here.
 * Numbers are the ones I publish on LinkedIn and Medium.
 */

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

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anish-singh-walia/",
  },
  {
    label: "Medium",
    href: "https://medium.com/@anishsingh20",
  },
  {
    label: "GitHub",
    href: "https://github.com/anishsingh20",
  },
  {
    label: "DigitalOcean",
    href: "https://www.digitalocean.com/community/users/asinghwalia",
  },
  {
    label: "Hostinger",
    href: "https://www.hostinger.com/tutorials/author/anishsingh/",
  },
] as const;

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
  { id: "views", value: "200,000+", label: "monthly views" },
  { id: "top-writer", value: "2×", label: "Medium Top Writer" },
  { id: "tutorials", value: "347", label: "DigitalOcean tutorials" },
] as const;

export const nav = [
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
