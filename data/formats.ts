/**
 * Formats listed on /services. Each links to a real example.
 */

export type Format = {
  id: string;
  title: string;
  line: string;
  example?: { label: string; href: string };
};

export const formats: Format[] = [
  {
    id: "long-form",
    title: "Brand stories and thought leadership",
    line: "Essays and long-form that set the story. Sponsored or owned.",
    example: {
      label: "SEO-to-GEO Identity Crisis, sponsored by Semrush",
      href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    },
  },
  {
    id: "social",
    title: "LinkedIn and social",
    line: "Posts built from use, not from a product sheet.",
    example: {
      label: "The DataImpulse proxy experiment",
      href: "https://www.linkedin.com/posts/anish-singh-walia_i-checked-how-google-ai-overviews-answer-activity-7444751278435631104--6QW",
    },
  },
  {
    id: "ghostwriting",
    title: "Ghostwriting",
    line: "Positioning, profile and posts in your voice. You approve, it goes out under your name.",
    example: {
      label: "Renu Sharma, Tanot Solutions",
      href: "/testimonials#renu-sharma",
    },
  },
  {
    id: "video",
    title: "Video and infographics",
    line: "Walkthroughs, explainers and carousels. One idea, then the viewer can act.",
    example: {
      label: "AI For Thought podcast",
      href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg",
    },
  },
  {
    id: "docs",
    title: "Docs and tutorials",
    line: "A guide someone can follow. 347 tutorials on DigitalOcean.",
    example: {
      label: "How to Benchmark LLM Inference Yourself",
      href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    },
  },
  {
    id: "strategy",
    title: "Blogs, newsletters, and AI-search strategy",
    line: "What to publish and refresh so pages show up in Google and in AI answers.",
    example: {
      label: "ActiveCampaign on the content-refresh workflow",
      href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    },
  },
];
