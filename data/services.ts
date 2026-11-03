/**
 * What a company gets. Every example links to real work or a recommendation.
 * No prices, no promised results.
 */

import { formats } from "./formats";

export type { Format } from "./formats";
export { formats };

/** Why the writing holds up. Engineering is the differentiator, not the whole pitch. */
export const trustPoints = [
  {
    title: "I ran the infrastructure",
    text: "Four years and eight months at Nutanix as SRE intern, SRE, and Sr. SRE, then cloud consultant for American Express's Cloud and Infrastructure Operations team in India.",
  },
  {
    title: "I lead a content team",
    text: "Senior Technical Content Strategist II and Team Lead at DigitalOcean. I own the core infrastructure and AI inference tutorial programs.",
  },
  {
    title: "An engineer who writes",
    text: "If a command is in a tutorial, it ran. If a product claim is in a story, I checked it.",
  },
];

export const processSteps = [
  {
    title: "Brief call",
    text: "We get on a call. Company, format, what the piece needs to do.",
  },
  {
    title: "Plan",
    text: "Angle, channel, and what done looks like. Then I start.",
  },
  {
    title: "Draft and review",
    text: "You get a complete draft. You mark it up. I turn it around.",
  },
  {
    title: "Publish and distribute",
    text: "Final copy and assets, plus a cut ready for LinkedIn and social.",
  },
];

export const clientGets = [
  {
    title: "On-brand drafts",
    text: "You get a complete draft in your voice, ready to publish.",
  },
  {
    title: "Accuracy",
    text: "I used to run the systems. The claims get checked.",
  },
  {
    title: "SEO and GEO ready",
    text: "Written so the piece can rank in Google and show up in AI answers.",
  },
  {
    title: "Ready for social",
    text: "A version you can cut for LinkedIn and other channels.",
  },
];

export type BuyerFaq = { question: string; answer: string };

export const buyerFaqs: BuyerFaq[] = [
  {
    question: "What formats do you take on?",
    answer:
      "Brand stories, thought leadership, LinkedIn and social, ghostwriting, video, infographics, blogs, newsletters, docs and tutorials, and content and AI-search strategy.",
  },
  {
    question: "Do you ghostwrite, and whose name goes on it?",
    answer:
      "Yes. Positioning, profile and posts in your voice. You approve, it goes out under your name. I don't put a byline on ghostwritten work.",
  },
  {
    question: "I am not in India. Can we still work together?",
    answer:
      "Yes. I work from Dehradun, India (IST) and take calls that fit your calendar. Most of the work is async.",
  },
  {
    question: "How do revisions work?",
    answer: "Feedback from you is part of the process, not an extra.",
  },
  {
    question: "Who have you done this for?",
    answer:
      "Any form of content for AI-native companies and brands. Semrush, OtterlyAI, DataImpulse, Tanot Solutions, Pollo AI, and La Isla Designs as clients. DigitalOcean, Nutanix, and American Express as an employee or consultant. Hostinger, DataScience+, and GeeksforGeeks as a contributor.",
  },
  {
    question: "How do we start?",
    answer:
      "Book an intro call, use the form on the Work with me page, or email me. Company, format, what it's for. I'll write back with how I'd approach it.",
  },
];
