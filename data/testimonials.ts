/**
 * LinkedIn recommendations.
 * Quote text is copied from research/testimonials.md and must stay verbatim.
 * Ellipses are LinkedIn's cutoff. Do not finish a sentence.
 * Shiva Vinodkumar is excluded (hidden on the profile).
 */

export type Testimonial = {
  id: string;
  name: string;
  /** Null when the transcription does not state a role. */
  role: string | null;
  /** Null when no company is stated. The card then leads with the role. */
  company: string | null;
  dateLabel: string;
  relationship: string;
  /** Null when the screenshot did not include the recommendation text. */
  quote: string | null;
};

export const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/anish-singh-walia/details/recommendations/";

export const testimonials: Testimonial[] = [
  {
    id: "daria-sukhorosolova",
    name: "Daria Sukhorosolova",
    role: "Senior Partner Manager, Affiliate Marketing",
    company: "Semrush",
    dateLabel: "December 4, 2025",
    relationship: "Client",
    quote:
      "I am pleased to recommend Anish, a dedicated affiliate partner whose writing on LinkedIn and Medium is consistently precise, well-researched, and insightful. He approaches each topic with thorough preparation and delivers high-quality content on SEO, digital marketing, and AI. Anish is a reliable professional writer whose work adds real value.",
  },
  {
    id: "klaus-m-schremser",
    name: "Klaus-M. Schremser",
    role: "Co-Founder",
    company: "OtterlyAI",
    dateLabel: "August 8, 2025",
    relationship: "Client",
    quote:
      "I had the pleasure working with Anish and it was a pleasure and exciting from the beginning. The results were as promised. Anish is super reactive, takes feedback and delivers amazing work. I hope we can continue working on projects in the future.",
  },
  {
    id: "andrew-byzov",
    name: "Andrew Byzov",
    role: "CMO",
    company: "Datalpulse",
    dateLabel: "April 2, 2026",
    relationship: "Client",
    quote:
      "Anish delivered a high-quality LinkedIn post for Datalpulse – from concept to publication. He took the brief, ran the actual experiment using our proxies, and turned the raw data into a compelling, well-structured post that felt authentic to his voice. Communication was smooth throughout, he was responsive to feedback, and hit the agreed timeline. Would gladly work with Anish again on future content collaborations.",
  },
  {
    id: "renu-sharma",
    name: "Renu Sharma",
    role: "Co-Founder",
    company: "Tanot Solutions",
    dateLabel: "April 9, 2026",
    relationship: "Client",
    quote:
      "I worked with Anish on a ghostwriting and Content strategy project to establish myself as a thought leader on LinkedIn for my company, Tanot Solutions, and he completely transformed both my content and my overall LinkedIn presence. He helped rebrand and redesign everything end-to-end, from my positioning and voice to my About section, headline, banner, and profile picture, so my profile finally matched the quality of the work I do. He helped me refine the overall content direction, suggested topics and angles that…",
  },
  {
    id: "abby-wang",
    name: "Abby Wang",
    role: null,
    company: "Pollo AI",
    dateLabel: "July 25, 2025",
    relationship: "Client",
    quote:
      "Working with Anish for the second time for a content piece on his Medium blog has been every bit as rewarding as our first collaboration, which, thanks to his expertise and unique writing skills, became one of our most successful social media campaigns. This time, we're excited to introduce our new feature for Pollo AI. We are eager to collaborate with him again because of the fantastic success we shared last time!…",
  },
  {
    id: "nadia-fernandez",
    name: "Nadia Fernández",
    role: "Founder, Digital Marketing & Growth Consultant",
    company: "La Isla Designs",
    dateLabel: "June 12, 2025",
    relationship: "Worked together at different companies",
    quote:
      "I had the absolute pleasure of collaborating with Anish on our first-ever LinkedIn carousel project together, and it couldn't have been a better experience. Anish brings clarity, speed, and strategy to every step of the process, from building brand prompts that are easily digestible for people to understand, to translating complex ideas into content that people can follow for their own projects and apply without an issue…",
  },
  {
    id: "nikita-puzanenko",
    name: "Nikita Puzanenko",
    role: "Social Media & Partnerships Manager, B2B SaaS",
    company: null,
    dateLabel: "April 27, 2026",
    relationship: "Client",
    quote:
      "I really enjoyed working with Anish, and I decided to leave this review to share my experience of collaborating with him. I'd like to start with the most memorable part – his level of communication. Every conversation with him leaves a genuinely positive impression. He knows how to build communication in a professional, and at the same time very human way, which, strangely enough, is almost a superpower in the LinkedIn world…",
  },
  {
    id: "ifra-aftab",
    name: "Ifra Aftab",
    role: "Digital Marketing Executive, Content Research & Strategy",
    company: null,
    dateLabel: "August 20, 2025",
    relationship: "Client",
    quote:
      "I had the pleasure of working with Anish and it was a wonderful experience. He's creative, professional and very supportive throughout the process making everything smooth and impactful. What stood out most was his supportive nature he was always proactive in communication. Highly recommend Anish for his dedication and talent would be happy to work with him again :)",
  },
  {
    id: "evgeniia-novikova",
    name: "Evgeniia Novikova",
    role: "Chief Marketing Officer, Head of Partnerships, Head of Affiliate",
    company: null,
    dateLabel: "May 20, 2025",
    relationship: "Client",
    quote: null,
  },
];

/** Landing-page order: company-backed quotes first, then role-led quotes. */
export const landingTestimonialIds = [
  "daria-sukhorosolova",
  "klaus-m-schremser",
  "andrew-byzov",
  "renu-sharma",
  "abby-wang",
  "nadia-fernandez",
  "nikita-puzanenko",
  "ifra-aftab",
] as const;

export function landingTestimonials(): Testimonial[] {
  const byId = new Map(testimonials.map((item) => [item.id, item]));
  return landingTestimonialIds.map((id) => {
    const item = byId.get(id);
    if (!item || !item.quote) {
      throw new Error(`Landing testimonial ${id} is missing a quote`);
    }
    return item;
  });
}

export function tileLabel(item: Testimonial): string {
  return item.company ?? item.role ?? item.name;
}
