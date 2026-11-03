import { award, site, socials, audiences } from "@data/site";
import { faqs } from "@data/faq";
import { formats } from "@data/formats";
import { headlineClients } from "@data/clients";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioning}`,
    "",
    `${site.jobTitle} at ${site.employer}. Based in ${site.location.label}.`,
    `Bachelor's degree, Information Technology, Vellore Institute of Technology, 2015 to 2019.`,
    "",
    "I was an SRE at Nutanix (intern, SRE, Sr. SRE) and a cloud consultant for the American Express Cloud and Infrastructure Operations team in India. I joined DigitalOcean as a Senior Technical Writer in September 2023 and became Senior Technical Content Strategist II and Team Lead in September 2025.",
    "",
    `Companies I've worked with include ${headlineClients.join(", ")}. The work is for ${audiences.join(", ").toLowerCase()}.`,
    "",
    "Numbers: 3,000,000+ average monthly readers on Medium, 35,000+ newsletter subscribers, two Medium Top Writer badges, 347 DigitalOcean tutorials.",
    "",
    `Recognition: ${award.short}. ${award.how} ${award.href}`,
    "",
    "Hobbies: hiking, trekking, calisthenics, skipping (jump rope), running, and the mountains. I live in Dehradun, in the Himalayan foothills.",
    "",
    `Contact: ${site.email}`,
    "",
    "## What I make",
    ...formats.map((format) => `- ${format.title}: ${format.line}${format.example ? ` Example: ${format.example.href.startsWith("/") ? site.url + format.example.href : format.example.href}` : ""}`),
    "",
    "## Pages",
    ...[
      ["/", "Home"],
      ["/services", "Services"],
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
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
