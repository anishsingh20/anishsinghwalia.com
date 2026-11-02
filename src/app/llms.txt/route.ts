import { site, socials } from "@data/site";
import { faqs } from "@data/faq";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioning}`,
    "",
    `${site.jobTitle} at ${site.employer}. Based in ${site.location.label}.`,
    `Bachelor's degree, Information Technology, Vellore Institute of Technology, 2015–2019.`,
    "",
    "He came up as an SRE at Nutanix (intern, SRE, Sr. SRE) and as cloud consultant for American Express Cloud and Infrastructure Operations in India, then joined DigitalOcean as a Senior Technical Writer in September 2023 and became Senior Technical Content Strategist II and Team Lead in September 2025.",
    "",
    "Hobbies he has stated: hiking, trekking, calisthenics, skipping (jump rope), running, and the mountains. He lives in Dehradun, in the Himalayan foothills. No summit names or rep counts are published.",
    "",
    `Contact: ${site.email}`,
    "",
    "## Pages",
    ...[
      ["/", "Home"],
      ["/about", "About"],
      ["/experience", "Experience"],
      ["/clients", "Clients"],
      ["/testimonials", "Testimonials"],
      ["/work", "Writing and press"],
      ["/game", "Game Room"],
      ["/ask", "Ask me anything"],
      ["/contact", "Work with me"],
    ].map(([path, label]) => `- [${label}](${site.url}${path})`),
    "",
    "## Profiles",
    ...socials.map((item) => `- [${item.label}](${item.href})`),
    "",
    "## FAQ",
    ...faqs.flatMap((faq) => ["", `### ${faq.question}`, faq.answer]),
    "",
    "Readership figures conflict and both are public: LinkedIn About says 3,000,000+ average monthly readers. His banner says 35,000+ subscribers and 200,000+ monthly views.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
