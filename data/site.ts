/**
 * Site-wide facts. Edit this file — pages read from here.
 * Sources are noted so CONFIRM.md can track anything still open.
 */

export const site = {
  name: "Anish Singh Walia",
  alternateName: "Anish Walia",
  jobTitle: "Senior Technical Content Strategist II and Team Lead",
  employer: "DigitalOcean",
  employerUrl: "https://www.digitalocean.com",
  /** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://anishsinghwalia.com",
  /** Contact form destination. Public address on his GitHub README. */
  email: process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || "waliaanish1997@gmail.com",
  location: {
    locality: "Dehradun",
    region: "Uttarakhand",
    country: "IN",
    label: "Dehradun, Uttarakhand, India",
  },
  headline:
    "Technical content geek. SRE turned strategist and team lead at DigitalOcean.",
  /** One-line positioning for the hero. */
  positioning:
    "Technical tutorials, developer docs, and deep dives for SaaS, AI-native, developer-tool, and cloud companies. SEO and AI-search visibility are one part of the work.",
  description:
    "Anish Singh Walia is a technical content strategist and team lead at DigitalOcean. He writes tutorials, docs, and deep dives, after years as an SRE at Nutanix and a cloud consultant for American Express.",
  title:
    "Anish Singh Walia — Technical content strategist and team lead",
  motto: "Share your knowledge. It is a way to achieve immortality.",
  mottoAttribution: "Dalai Lama, as used on his GitHub README and Medium about",
  recommendationsUrl:
    "https://www.linkedin.com/in/anish-singh-walia/details/recommendations/",
  education: {
    school: "Vellore Institute of Technology",
    credential: "Bachelor's degree, Information Technology",
    years: "2015–2019",
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

/** Older profiles that exist, but are not the canonical ones. */
export const legacyProfiles = [
  {
    label: "Medium (older technical blog)",
    href: "https://medium.com/@anishsinghwalia",
  },
] as const;

/**
 * Both readership figures are kept on purpose. They conflict.
 * See CONFIRM.md before treating either as the only number.
 */
export const metrics = [
  {
    id: "readers",
    value: "3,000,000+",
    label: "average monthly readers",
    source: "LinkedIn About",
  },
  {
    id: "subscribers",
    value: "35,000+",
    label: "Medium subscribers",
    source: "LinkedIn banner",
  },
  {
    id: "views",
    value: "200,000+",
    label: "monthly views",
    source: "LinkedIn banner",
  },
  {
    id: "top-writer",
    value: "2×",
    label: "Medium Top Writer",
    source: "LinkedIn banner and Medium bio",
  },
  {
    id: "tutorials",
    value: "347",
    label: "DO tutorials authored or refreshed",
    source: "DigitalOcean profile, checked 2 Nov 2026",
  },
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

/** Pods from the `kubectl get all -n anish` block on his GitHub README. */
export const kubectlPods = [
  { name: "data-nerd", href: "/about" },
  { name: "cx", href: "/testimonials" },
  { name: "troubleshoot", href: "/experience" },
  { name: "linux", href: "/work" },
  { name: "blogging", href: "/work" },
  { name: "virtualization", href: "/experience" },
  { name: "bash-shell", href: "/game" },
  { name: "r-scripting", href: "/about#side-projects" },
] as const;
