/**
 * What a company gets when it hires me. Every example links to real work or a
 * recommendation that describes it. No prices, no promised results.
 */

export type Service = {
  id: string;
  title: string;
  /** What the client walks away with. */
  outcome: string;
  detail: string;
  example: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "tutorials",
    title: "Technical tutorials and deep dives",
    outcome: "A guide a developer can follow to production, with commands and configs that run.",
    detail:
      "I build the thing first, then write it. Kubernetes, Linux, GPU and LLM inference, GitOps, databases. 347 of these on DigitalOcean so far.",
    example: {
      label: "How to Benchmark LLM Inference Yourself",
      href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    },
  },
  {
    id: "docs",
    title: "Developer docs",
    outcome: "Reference and how-to pages that answer the question a developer has right now.",
    detail:
      "Structure, naming, and examples that hold up as the product changes. I lead the team that keeps DigitalOcean's core infrastructure and AI inference tutorials current.",
    example: {
      label: "My DigitalOcean author page",
      href: "https://www.digitalocean.com/community/users/asinghwalia",
    },
  },
  {
    id: "launch",
    title: "Launch content",
    outcome: "A feature or product explained to the people who will use it, in the channel where they read.",
    detail:
      "Long-form essays, sponsored pieces, and posts that introduce something new without reading like a press release.",
    example: {
      label: "The Pollo AI feature launch, in Abby Wang's words",
      href: "/testimonials#abby-wang",
    },
  },
  {
    id: "ghostwriting",
    title: "LinkedIn ghostwriting for founders and executives",
    outcome: "A profile and a posting rhythm that sound like you on your best day.",
    detail:
      "Positioning, voice, About section, headline, visuals, then the posts themselves. I write in your voice, you approve, it goes out under your name.",
    example: {
      label: "Renu Sharma's rebrand at Tanot Solutions",
      href: "/testimonials#renu-sharma",
    },
  },
  {
    id: "video",
    title: "Short videos and infographics",
    outcome: "Walkthroughs, explainers, and carousels that make a technical idea land in under a minute.",
    detail:
      "Scripted and produced with AI tools where that saves a crew, and designed around the one thing the viewer needs to remember.",
    example: {
      label: "How I helped a five-person team rebuild its video library",
      href: "https://medium.com/@anishsingh20/this-is-how-i-helped-a-five-person-team-rebuild-its-video-library-6f06e5161b94",
    },
  },
  {
    id: "strategy",
    title: "SEO and AI-search content strategy",
    outcome: "A plan for what to publish and refresh so your pages show up in Google and in AI answers.",
    detail:
      "Semrush, Profound, Ahrefs, DataForSEO, and Google Search Console every week. ActiveCampaign wrote up the refresh workflow I built.",
    example: {
      label: "The ActiveCampaign case study",
      href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    },
  },
];

export type CaseStudy = {
  id: string;
  company: string;
  title: string;
  problem: string;
  work: string;
  /** Only what the client or the published piece says. */
  outcome: string;
  link: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "semrush",
    company: "Semrush",
    title: "A sponsored essay on the SEO-to-GEO shift",
    problem: "Search was moving into AI answers and marketers needed a clear read on what changes, written by someone who runs the tools.",
    work: "I wrote “SEO-to-GEO Identity Crisis” for my Medium publication, sponsored by Semrush, and kept writing affiliate content on SEO, digital marketing, and AI for them.",
    outcome: "Daria Sukhoroslova, Senior Partner Manager, Affiliate Marketing at Semrush, called the writing “consistently precise, well-researched, and insightful.”",
    link: { label: "Read the essay", href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306" },
  },
  {
    id: "tanot",
    company: "Tanot Solutions",
    title: "Ghostwriting and a LinkedIn rebrand for a co-founder",
    problem: "Renu Sharma wanted to be seen as a thought leader on LinkedIn, and her profile didn't match the quality of her work.",
    work: "Positioning and voice first, then the About section, headline, banner, and profile picture, then the content direction, topics, and angles.",
    outcome: "In her words: it “completely transformed both my content and my overall LinkedIn presence,” and the profile “finally matched the quality of the work I do.”",
    link: { label: "Her recommendation", href: "/testimonials#renu-sharma" },
  },
  {
    id: "dataimpulse",
    company: "DataImpulse",
    title: "A LinkedIn post built from a real proxy experiment",
    problem: "CMO Andrew Byzov wanted a post about their proxies that came from use, not from a product sheet.",
    work: "I took the brief, ran the experiment on their proxies myself, and turned the raw data into a structured post in my own voice.",
    outcome: "“Communication was smooth throughout, he was responsive to feedback, and hit the agreed timeline. Would gladly work with Anish again.”",
    link: { label: "His recommendation", href: "/testimonials#andrew-byzov" },
  },
  {
    id: "digitalocean",
    company: "DigitalOcean",
    title: "A design standard for LLM inference benchmarks",
    problem: "Teams quote inference numbers nobody can reproduce, so the comparisons don't hold up.",
    work: "I wrote “How to Benchmark LLM Inference Yourself,” a tutorial that sets out how to measure latency and throughput so the numbers can be trusted, as sole author.",
    outcome: "It sits in the AI inference tutorial program I own at DigitalOcean, alongside 346 other tutorials I've authored or refreshed.",
    link: { label: "Read the tutorial", href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference" },
  },
];

/** Why developers read my content without flinching. */
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
  {
    title: "I studied this",
    text: "Bachelor's degree in Information Technology from Vellore Institute of Technology, 2015 to 2019. Top skills on my profile: AI Inference, Linux Server, Cloud Consulting.",
  },
];

export const processSteps = [
  {
    title: "Brief",
    text: "You tell me the format, the audience, and what the piece needs to do. I ask the questions that matter and we agree a timeline.",
  },
  {
    title: "Draft",
    text: "I build or run whatever the piece is about, then write it. You get a complete draft, not an outline.",
  },
  {
    title: "Review",
    text: "You and your engineers mark it up. I take the feedback and turn it around.",
  },
  {
    title: "Publish",
    text: "Final copy, assets, and metadata ready for your channel, or published on mine if that's the plan.",
  },
];

export type BuyerFaq = { question: string; answer: string };

export const buyerFaqs: BuyerFaq[] = [
  {
    question: "What formats do you take on?",
    answer:
      "Technical tutorials and deep dives, developer docs, launch content, LinkedIn ghostwriting, short videos and infographics, LinkedIn carousels, newsletters, and SEO and AI-search content strategy.",
  },
  {
    question: "How long does a piece take?",
    answer:
      "It depends on the format and how much I need to build to write it. We agree a timeline at the brief and I hold it. Clients have said so in their recommendations.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Feedback from you and your engineers is part of the process, not an extra. I'd rather get the technical review than skip it.",
  },
  {
    question: "What topics do you cover?",
    answer:
      "Cloud infrastructure, Kubernetes, Linux, GPUs and LLM inference, developer tools, proxies and web data, SEO, and AI search visibility. If it's technical and aimed at developers or the people who buy for them, it's in range.",
  },
  {
    question: "Who have you done this for?",
    answer:
      "Semrush, OtterlyAI, DataImpulse, Tanot Solutions, Pollo AI, and La Isla Designs as clients. DigitalOcean, Nutanix, and American Express as an employee or consultant. Hostinger, DataScience+, and GeeksforGeeks as a contributor.",
  },
  {
    question: "How do we start?",
    answer:
      "Use the form on the Work with me page, or email me. Tell me the company, the format, and what it's for. I'll write back with how I'd approach it.",
  },
];
