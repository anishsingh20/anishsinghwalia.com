/**
 * What I make. Each tile links to a real example from my work.
 * Where the example is a client recommendation, the link goes to that card.
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
    title: "Long-form articles and deep dives",
    line: "Essays on SEO, AI search, and the tools I test. My Medium publication averages 3,000,000+ readers a month.",
    example: {
      label: "SEO-to-GEO Identity Crisis, sponsored by Semrush",
      href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    },
  },
  {
    id: "tutorials",
    title: "Tutorials and developer docs",
    line: "Step-by-step guides that people run in production. 347 of them on DigitalOcean, on Linux, Kubernetes, and AI inference.",
    example: {
      label: "How to Benchmark LLM Inference Yourself",
      href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    },
  },
  {
    id: "video",
    title: "Video",
    line: "Product walkthroughs and explainers, scripted and produced with AI tools where that saves a crew.",
    example: {
      label: "How I helped a five-person team rebuild its video library",
      href: "https://medium.com/@anishsingh20/this-is-how-i-helped-a-five-person-team-rebuild-its-video-library-6f06e5161b94",
    },
  },
  {
    id: "carousels",
    title: "Infographics and carousels",
    line: "Visual explainers for LinkedIn. One idea per slide, numbers people can check.",
    example: {
      label: "The carousel Nadia Fernández wrote about",
      href: "/testimonials#nadia-fernandez",
    },
  },
  {
    id: "linkedin",
    title: "Short-form LinkedIn posts",
    line: "Posts that run an experiment and show the result. For my own profile and for clients.",
    example: {
      label: "How I use Semrush with ChatGPT",
      href: "https://www.linkedin.com/posts/anish-singh-walia_how-to-use-semrush-with-chatgpt-for-viral-activity-7297901444194611200-pCWD",
    },
  },
  {
    id: "ghostwriting",
    title: "Ghostwriting",
    line: "Founders' voices on LinkedIn. Positioning, headline, banner, and the posts themselves.",
    example: {
      label: "Renu Sharma, Tanot Solutions",
      href: "/testimonials#renu-sharma",
    },
  },
  {
    id: "newsletters",
    title: "Newsletters",
    line: "A Medium newsletter with 35,000+ subscribers. I know what gets opened.",
    example: {
      label: "Subscribe on Medium",
      href: "https://medium.com/@anishsingh20",
    },
  },
  {
    id: "strategy",
    title: "Content strategy and search visibility",
    line: "What to publish, for whom, and how it gets found in Google and in AI answers. Semrush, Profound, Ahrefs, DataForSEO.",
    example: {
      label: "ActiveCampaign on my content-refresh workflow",
      href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    },
  },
];
