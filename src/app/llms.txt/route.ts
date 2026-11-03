import { award, icp, lastUpdated, site, socials, audiences } from "@data/site";
import { engagements } from "@data/engagements";
import { buyerFaqs, caseStudies } from "@data/services";
import { faqs } from "@data/faq";
import { formats } from "@data/formats";
import { mediaItems } from "@data/media";
import { headlineClients } from "@data/clients";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioning}`,
    "",
    "This site is built to be cited by AI answers, which is the service I sell.",
    "",
    `${site.jobTitle} at ${site.employer}. Based in ${site.location.label}.`,
    `Bachelor's degree, Information Technology, Vellore Institute of Technology, 2015 to 2019.`,
    "",
    "I was an SRE at Nutanix (intern, SRE, Sr. SRE) and a cloud consultant for the American Express Cloud and Infrastructure Operations team in India. I joined DigitalOcean as a Senior Technical Writer in September 2023 and became Senior Technical Content Strategist II and Team Lead in September 2025.",
    "",
    "## Ideal client",
    icp,
    `The work is for ${audiences.join(", ").toLowerCase()}.`,
    `Companies I've worked with include ${headlineClients.join(", ")}.`,
    "",
    "## Offers",
    ...engagements.map((item) => `- ${item.title}: ${item.deliverable}`),
    "",
    "## Formats",
    ...formats.map((format) => `- ${format.title}: ${format.line}${format.example ? ` Example: ${format.example.href.startsWith("/") ? site.url + format.example.href : format.example.href}` : ""}`),
    "",
    "## Case studies",
    ...caseStudies.map((study) => `- ${study.company} (${study.year}, ${study.format}, ${study.role}): ${study.summary}. ${site.url}/work/${study.slug} ${study.link.href}`),
    "",
    "## Press, podcasts, awards",
    ...mediaItems.map((item) => `- ${item.outlet}: ${item.title} (${item.category}, ${item.meta}) ${item.href}`),
    "",
    "Numbers: 3,000,000+ average monthly readers on Medium, 35,000+ newsletter subscribers, two Medium Top Writer badges, 347 DigitalOcean tutorials.",
    "",
    `Recognition: ${award.short}. ${award.how} ${award.href}`,
    "",
    `Contact: ${site.email}. Form: ${site.url}/contact.${site.bookingUrl ? ` Book an intro call: ${site.bookingUrl}` : ""}`,
    "",
    "## Pages",
    ...[
      ["/", "Home"],
      ["/work", "Work"],
      ["/services", "Services"],
      ["/about", "About"],
      ["/media", "Media"],
      ["/experience", "Experience"],
      ["/clients", "Clients"],
      ["/testimonials", "Testimonials"],
      ["/game", "Game Room"],
      ["/ask", "Ask me anything"],
      ["/contact", "Work with me"],
    ].map(([path, label]) => `- [${label}](${site.url}${path})`),
    "",
    "## Case study URLs",
    ...caseStudies.map((study) => `- [${study.company}](${site.url}/work/${study.slug})`),
    "",
    "## Profiles",
    ...socials.map((item) => `- [${item.label}](${item.href})`),
    "",
    "## FAQ",
    ...[...buyerFaqs, ...faqs.filter((faq) => !buyerFaqs.some((b) => b.question === faq.question))].flatMap((faq) => ["", `### ${faq.question}`, faq.answer]),
    "",
    `Last Updated: ${lastUpdated}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
