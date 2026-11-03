/**
 * What a company gets. Every example links to real work or a recommendation.
 * No prices, no promised results.
 */

import { formats } from "./formats";

export type { Format } from "./formats";
export { formats };

export type CaseStudy = {
  id: string;
  slug: string;
  company: string;
  title: string;
  /** One line on the home row. */
  summary: string;
  format: string;
  role: string;
  year: string;
  problem: string;
  work: string;
  /** Only what the client or the published piece says. */
  outcome: string;
  link: { label: string; href: string };
  quoteId?: string;
  image?: { src: string; alt: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "semrush",
    slug: "semrush",
    company: "Semrush",
    title: "SEO-to-GEO Identity Crisis",
    summary: "Sponsored essay on the SEO-to-GEO shift",
    format: "Essay",
    role: "Author",
    year: "2025",
    problem:
      "Search was moving into AI answers and marketers needed a clear read on what changes, written by someone who runs the tools.",
    work:
      "I wrote “SEO-to-GEO Identity Crisis” for my Medium publication, sponsored by Semrush, and kept writing affiliate content on SEO, digital marketing, and AI for them.",
    outcome:
      "Daria Sukhoroslova, Senior Partner Manager, Affiliate Marketing at Semrush, called the writing “consistently precise, well-researched, and insightful.”",
    link: {
      label: "Read the essay",
      href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    },
    quoteId: "daria-sukhoroslova",
    image: {
      src: "/images/work/semrush-essay.webp",
      alt: "The Medium essay SEO-to-GEO Identity Crisis, sponsored by Semrush",
    },
  },
  {
    id: "tanot",
    slug: "tanot-solutions",
    company: "Tanot Solutions",
    title: "Founder voice on LinkedIn",
    summary: "Ghostwriting and a LinkedIn rebrand for the co-founder",
    format: "Ghostwriting",
    role: "Ghostwriter",
    year: "2026",
    problem:
      "Renu Sharma wanted to be seen as a thought leader on LinkedIn, and her profile didn't match the quality of her work.",
    work:
      "Positioning and voice first, then the About section, headline, banner, and profile picture, then the content direction, topics, and angles.",
    outcome:
      "In her words: it “completely transformed both my content and my overall LinkedIn presence,” and the profile “finally matched the quality of the work I do.”",
    link: { label: "Her recommendation", href: "/testimonials#renu-sharma" },
    quoteId: "renu-sharma",
    image: {
      src: "/images/work/tanot-linkedin.webp",
      alt: "A public LinkedIn post by Renu Sharma, co-founder of Tanot Solutions",
    },
  },
  {
    id: "dataimpulse",
    slug: "dataimpulse",
    company: "DataImpulse",
    title: "A LinkedIn post from a live proxy experiment",
    summary: "LinkedIn post from a real proxy experiment",
    format: "LinkedIn post",
    role: "Writer",
    year: "2026",
    problem:
      "CMO Andrew Byzov wanted a post about their proxies that came from use, not from a product sheet.",
    work:
      "I took the brief, ran the experiment on their proxies myself, and turned the raw data into a structured post in my own voice.",
    outcome:
      "“Communication was smooth throughout, he was responsive to feedback, and hit the agreed timeline. Would gladly work with Anish again.”",
    link: { label: "His recommendation", href: "/testimonials#andrew-byzov" },
    quoteId: "andrew-byzov",
    image: {
      src: "/images/work/dataimpulse-linkedin.webp",
      alt: "Anish's LinkedIn post for DataImpulse, from a live proxy experiment",
    },
  },
  {
    id: "digitalocean",
    slug: "digitalocean-inference-benchmarks",
    company: "DigitalOcean",
    title: "How to Benchmark LLM Inference Yourself",
    summary: "Team lead, core infra and AI tutorial program",
    format: "Tutorial",
    role: "Sole author and team lead",
    year: "2025",
    problem:
      "Teams quote inference numbers nobody can reproduce, so the comparisons don't hold up.",
    work:
      "I wrote “How to Benchmark LLM Inference Yourself,” a tutorial that sets out how to measure latency and throughput so the numbers can be trusted, as sole author.",
    outcome:
      "It sits in the AI inference tutorial program I own at DigitalOcean, alongside 346 other tutorials I've authored or refreshed.",
    link: {
      label: "Read the tutorial",
      href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    },
    image: {
      src: "/images/work/do-inference.webp",
      alt: "The DigitalOcean tutorial How to Benchmark LLM Inference Yourself",
    },
  },
];

export const selectedClientIds = ["semrush", "tanot", "dataimpulse", "digitalocean"] as const;

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Why developers read the content without flinching. */
export const trustPoints = [
  {
    title: "I ran the infrastructure",
    text: "Four years and eight months at Nutanix as SRE intern, SRE, and Sr. SRE, then cloud consultant for American Express's Cloud and Infrastructure Operations team in India.",
  },
  {
    title: "I lead a technical content team",
    text: "Senior Technical Content Strategist II and Team Lead at DigitalOcean. I own the core infrastructure and AI inference tutorial programs.",
  },
  {
    title: "I run the code before I write about it",
    text: "Every tutorial is built and tested first. Kubernetes, Linux, GPU Droplets, LLM inference. If a command is in the piece, it ran.",
  },
];

export const processSteps = [
  {
    title: "Brief",
    text: "Format, audience, what the piece needs to do. We agree a timeline.",
  },
  {
    title: "Draft",
    text: "I build or run whatever the piece is about, then write it. You get a complete draft.",
  },
  {
    title: "Review",
    text: "You and your engineers mark it up. I take the feedback and turn it around.",
  },
  {
    title: "Publish",
    text: "Final copy, assets, and metadata, ready for your channel.",
  },
];

export type BuyerFaq = { question: string; answer: string };

export const buyerFaqs: BuyerFaq[] = [
  {
    question: "What formats do you take on?",
    answer:
      "Tutorials and deep dives, developer docs, launch content, LinkedIn ghostwriting, short video and infographics, and content and AI-search strategy. Newsletters too.",
  },
  {
    question: "How long does a piece take?",
    answer:
      "It depends on the format and how much I need to build to write it. We agree a timeline at the brief and I hold it. Clients have said so.",
  },
  {
    question: "How do revisions work?",
    answer: "Feedback from you and your engineers is part of the process, not an extra.",
  },
  {
    question: "What topics do you cover?",
    answer:
      "Cloud infrastructure, Kubernetes, Linux, GPUs and LLM inference, developer tools, proxies and web data, SEO, and AI search visibility.",
  },
  {
    question: "Who have you done this for?",
    answer:
      "Semrush, OtterlyAI, DataImpulse, Tanot Solutions, Pollo AI, and La Isla Designs as clients. DigitalOcean, Nutanix, and American Express as an employee or consultant. Hostinger, DataScience+, and GeeksforGeeks as a contributor.",
  },
  {
    question: "How do we start?",
    answer:
      "Book an intro call, use the form on the Work with me page, or email me. Company, format, what it's for. I'll write back with how I'd approach it.",
  },
];
