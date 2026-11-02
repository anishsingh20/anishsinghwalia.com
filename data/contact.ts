export const projectTypes = [
  "Technical tutorials and deep dives",
  "Developer docs",
  "AI and infrastructure content",
  "Thought leadership and LinkedIn ghostwriting",
  "Content strategy",
  "SEO and AI-search visibility",
  "Not sure yet",
] as const;

export const budgets = [
  "Under $2,000",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "$10,000 or more",
] as const;

export const timelines = [
  "As soon as you can",
  "This month",
  "1 to 3 months",
  "This quarter",
  "Ongoing",
  "Flexible",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type Budget = (typeof budgets)[number];
export type Timeline = (typeof timelines)[number];
