export type Piece = {
  title: string;
  href: string;
  meta: string;
  note?: string;
};

export const tutorials: Piece[] = [
  {
    title: "How to Benchmark LLM Inference Yourself: A Design Standard for Numbers You Can Trust",
    href: "https://www.digitalocean.com/community/tutorials/how-to-benchmark-llm-inference",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "Deploy Fine-Tuned LLM to Prod with BYOM + Dedicated Inference",
    href: "https://www.digitalocean.com/community/tutorials/deploy-llm-to-production-byom-dedicated-inference",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "Zero-Infrastructure RAG Agent with Knowledge Bases + MCP",
    href: "https://www.digitalocean.com/community/tutorials/build-rag-agent-digitalocean-knowledge-bases-mcp",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "How to Use LLM CLI to Deploy the GPT-4o Model on DO GPU Droplets",
    href: "https://www.digitalocean.com/community/tutorials/how-to-deploy-openai-models-using-llm-cli-on-gpu-droplets",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "Deploy llm-d for Distributed LLM Inference on DOKS",
    href: "https://www.digitalocean.com/community/tutorials/how-to-deploy-llm-d-on-kubernetes",
    meta: "DigitalOcean · co-author with Jeff Fan",
  },
  {
    title: "How to Deploy Postgres to Kubernetes Cluster",
    href: "https://www.digitalocean.com/community/tutorials/how-to-deploy-postgres-to-kubernetes-cluster",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "How to Deploy to Kubernetes using Argo CD and GitOps",
    href: "https://www.digitalocean.com/community/tutorials/how-to-deploy-to-kubernetes-using-argo-cd-and-gitops",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "How to Set Up a Private Droplet and Bastion Host with Cloud Firewalls",
    href: "https://www.digitalocean.com/community/tutorials/how-to-setup-private-droplet",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "How to Set Permissions in Linux: chmod and chown",
    href: "https://www.digitalocean.com/community/tutorials/how-to-set-permissions-linux",
    meta: "DigitalOcean · sole author",
  },
  {
    title: "How To Secure Apache with Let's Encrypt on Ubuntu",
    href: "https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu",
    meta: "DigitalOcean · sole author · updated 5 Jun 2026",
    note: "A long-running tutorial. I'm the author of record now.",
  },
  {
    title: "Build an AI Agent to Automate Document Analysis with Gradient",
    href: "https://www.digitalocean.com/community/tutorials/build-ai-agent-document-analysis-gradientai-platform",
    meta: "DigitalOcean · editor (author: Meher Vamsi)",
  },
];

export const essays: Piece[] = [
  {
    title: "SEO-to-GEO Identity Crisis: Fix the Traffic-Revenue Gap",
    href: "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306",
    meta: "Readers Club · 18 Dec 2025 · sponsored by Semrush",
  },
  {
    title: "How I Turn Zero-Click SERPs Into Measurable Brand Visibility",
    href: "https://medium.com/readers-club/how-i-turn-zero-click-serps-into-measurable-brand-visibility-91c53bbbb535",
    meta: "Readers Club · 10 Dec 2025",
  },
  {
    title: "Why Hybrid Content Is the New AI SEO Moat",
    href: "https://medium.com/@anishsingh20/why-hybrid-content-is-the-new-ai-seo-moat-ffd20f26c7b7",
    meta: "Medium · 22 Oct 2025",
  },
  {
    title: "How I Cracked AI Search & LLM Visibility Using OtterlyAI",
    href: "https://medium.com/readers-club/how-i-cracked-ai-search-llm-visibility-using-otterlyai-384cfc8524cd",
    meta: "Readers Club · 5 Aug 2025",
    note: "OtterlyAI is a confirmed client. This post is not marked as sponsored.",
  },
  {
    title: "I Finally Found the Most Optimal Time to Publish on Medium in 2025",
    href: "https://medium.com/readers-club/i-finally-found-the-most-optimal-time-to-publish-on-medium-in-2025-8da764e77a21",
    meta: "Readers Club",
  },
  {
    title: "OpenAI's New Operator and Agents is Finally Here",
    href: "https://medium.com/readers-club/openai-operator-and-agents-bbde7714eaea",
    meta: "Readers Club",
  },
  {
    title: "Top 6 Online Platforms That Pay You To Write",
    href: "https://medium.com/aimonks/top-6-online-platforms-that-pay-you-to-write-6f7e0a186e14",
    meta: "AI monks.io",
  },
  {
    title: "How to use the Linux cat command",
    href: "https://www.hostinger.com/tutorials/author/anishsingh/",
    meta: "Hostinger Tutorials · 25 Feb 2019 · author archive",
  },
];

export const press: Piece[] = [
  {
    title: "Scalable content refresh workflow",
    href: "https://autonomous.activecampaign.com/stories/scalable-content-refresh-workflow",
    meta: "ActiveCampaign Autonomous · Maddy Osman · 21 May 2026",
    note: "Turnaround fell from about a day to a few hours, 60 to 70 percent less production time. Output went from 1 or 2 to 4 or 5 updated pieces a day.",
  },
  {
    title: "How Anish used ChatGPT and Semrush",
    href: "https://www.allaboutai.com/interviews/how-anish-used-chatgpt-semrush-to-hit-3m-views/",
    meta: "AllAboutAI · written feature",
  },
  {
    title: "AI For Thought, with Muhammad Hassan Khan",
    href: "https://www.youtube.com/watch?v=R_XSFA9q7Dg",
    meta: "AllAboutAI podcast · my first podcast · about May 2025",
  },
];

/** Publication titles listed on my LinkedIn. No URLs there, so they are not linked. */
export const linkedInPublicationTitles = [
  "Reverse Morris Traversal",
  "Random Forests",
  "Binary tree to Binary search tree conversion using Sets in C++",
  "Activation functions and it's types- Which is better?",
  "Implementing Deep Learning in R using Keras and Tensorflow",
];

export const githubProjects = [
  {
    name: "Deep-Learning-in-R-using-Keras-and-Tensorflow",
    href: "https://github.com/anishsingh20/Deep-Learning-in-R-using-Keras-and-Tensorflow",
    note: "25 stars in the 2 Nov 2026 snapshot",
  },
  {
    name: "Analysis-of-Indian-Economy-Using-Shiny",
    href: "https://github.com/anishsingh20/Analysis-of-Indian-Economy-Using-Shiny",
    note: "10 stars in the 2 Nov 2026 snapshot",
  },
  {
    name: "Learning-k8s-for-CKA",
    href: "https://github.com/anishsingh20/Learning-k8s-for-CKA",
    note: "CKA study notes",
  },
  {
    name: "Playing-With-Ansible",
    href: "https://github.com/anishsingh20/Playing-With-Ansible",
    note: "Ansible practice",
  },
  {
    name: "llama2-chatbot-streamlit-fly-webapp",
    href: "https://github.com/anishsingh20/llama2-chatbot-streamlit-fly-webapp",
    note: "A small LLM chatbot",
  },
];

export const authorPages = [
  { label: "DigitalOcean author page", href: "https://www.digitalocean.com/community/users/asinghwalia" },
  { label: "Medium @anishsingh20", href: "https://medium.com/@anishsingh20" },
  { label: "Hostinger tutorials", href: "https://www.hostinger.com/tutorials/author/anishsingh/" },
  { label: "DataScience+", href: "https://datascienceplus.com/author/anish-singh-walia/" },
  { label: "GeeksforGeeks", href: "https://auth.geeksforgeeks.org/user/AnishSinghWalia/articles" },
  { label: "GitHub", href: "https://github.com/anishsingh20" },
];
