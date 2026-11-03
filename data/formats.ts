/**
 * Six formats listed on /services. Each links to a real example.
 */

export type Format = {
  id: string;
  title: string;
  line: string;
  example?: { label: string; href: string };
};

export const formats: Format[] = [
  {
    id: "deep-dives",
    title: "Tutorials and deep dives",
    line: "A guide a developer can follow, or an essay on the SEO-to-GEO shift. 347 tutorials on DigitalOcean.",
    example: {
      label: "SEO-to-GEO Identity Crisis, sponsored by Semrush",
      href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    },
  },
  {
    id: "docs",
    title: "Developer docs",
    line: "Reference and how-to pages that answer the question a developer has right now.",
    example: {
      label: "How to Benchmark LLM Inference Yourself",
      href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    },
  },
  {
    id: "launch",
    title: "Launch content",
    line: "A feature explained to the people who will use it, in the channel where they read.",
    example: {
      label: "The Pollo AI feature launch, in Abby Wang's words",
      href: "/testimonials#abby-wang",
    },
  },
  {
    id: "ghostwriting",
    title: "LinkedIn ghostwriting for founders",
    line: "Positioning, profile and posts in your voice. You approve, it goes out under your name.",
    example: {
      label: "Renu Sharma, Tanot Solutions",
      href: "/testimonials#renu-sharma",
    },
  },
  {
    id: "video",
    title: "Short video and infographics",
    line: "Walkthroughs, explainers and LinkedIn carousels. One idea, then the viewer can act.",
    example: {
      label: "The carousel Nadia Fernández wrote about",
      href: "/testimonials#nadia-fernandez",
    },
  },
  {
    id: "strategy",
    title: "Content and AI-search strategy",
    line: "What to publish and refresh so pages show up in Google and in AI answers. Newsletters too.",
    example: {
      label: "ActiveCampaign on the content-refresh workflow",
      href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    },
  },
];
