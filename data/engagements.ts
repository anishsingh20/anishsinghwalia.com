/**
 * Three named ways companies hire me. Deliverable in one line each.
 */

export type Engagement = {
  id: string;
  title: string;
  deliverable: string;
};

export const engagements: Engagement[] = [
  {
    id: "flagship",
    title: "Flagship piece",
    deliverable: "One flagship piece: essay, video, infographic set or tutorial, delivered publish-ready.",
  },
  {
    id: "founder-voice",
    title: "Founder voice on LinkedIn",
    deliverable: "Profile rewrite plus a posting rhythm, ghostwritten in your voice.",
  },
  {
    id: "partner",
    title: "Content and AI-search partner",
    deliverable: "Briefs, refreshes and a GEO/SEO plan, ongoing, as a content lead or advisor.",
  },
];
