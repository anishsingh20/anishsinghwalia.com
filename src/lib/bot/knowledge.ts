import { aboutParagraphs, originNote } from "@data/about";
import { clients } from "@data/clients";
import { certifications, education, experience, languages, stack, tools, topSkills } from "@data/experience";
import { faqs } from "@data/faq";
import { formats } from "@data/formats";
import { alsoOffClock, hobbies } from "@data/hobbies";
import { metrics, site, socials, audiences } from "@data/site";
import { testimonials } from "@data/testimonials";
import { engagements } from "@data/engagements";
import { mediaItems } from "@data/media";
import { essays, githubProjects, press, tutorials } from "@data/writing";
import { loadKnowledge, scoreChunks, type Chunk } from "@/lib/ask";

/**
 * The curated knowledge base: the markdown notes in knowledge/ plus the
 * structured facts the site itself renders from data/. High trust.
 */

export type Topic =
  | "identity"
  | "role"
  | "career"
  | "clients"
  | "testimonials"
  | "formats"
  | "writing"
  | "numbers"
  | "hobbies"
  | "education"
  | "hire"
  | "press"
  | "github"
  | "technical"
  | "contact";

export function fact(topic: Topic): string {
  switch (topic) {
    case "identity":
      return [
        `${site.name} writes content of every kind for AI-native companies and brands, and is ${site.jobTitle} at ${site.employer}. Based in ${site.location.label}.`,
        ...aboutParagraphs,
      ].join("\n");
    case "role":
      return `${site.jobTitle} at ${site.employer}, since September 2025 (Senior Technical Writer there from September 2023). He leads a content team and owns the core infrastructure and AI inference tutorial programs. ${site.employerUrl}/community/users/asinghwalia`;
    case "career":
      return experience
        .map((group) =>
          `${group.org}${group.span ? ` (${group.span})` : ""}:\n` +
          group.roles.map((role) => `- ${role.title}, ${role.start} to ${role.end} (${role.duration}), ${role.location}.${role.summary ? ` ${role.summary}` : ""}`).join("\n"),
        )
        .join("\n") + `\n\nHow he got here: ${originNote}`;
    case "clients":
      return clients.map((client) => `- ${client.name} (${client.tag}): ${client.brief}${client.link ? ` ${client.link.href}` : ""}`).join("\n") +
        `\nThe work is for ${audiences.join(", ").toLowerCase()}. Describe it as client work or companies he has worked with.`;
    case "testimonials":
      return testimonials
        .filter((item) => item.quote)
        .map((item) => `${item.name}${item.role ? `, ${item.role}` : ""}${item.company ? ` at ${item.company}` : ""} (${item.dateLabel}, ${item.relationship}): "${item.quote}"`)
        .join("\n\n") + `\nAll recommendations: ${site.recommendationsUrl}`;
    case "formats":
      return [
        "Three engagements:",
        ...engagements.map((item) => `- ${item.title}: ${item.deliverable}`),
        "Formats:",
        ...formats.map((item) => `- ${item.title}: ${item.line}${item.example ? ` Example: ${item.example.label} (${item.example.href})` : ""}`),
        "Newsletters too, through Medium, 35,000+ subscribers.",
      ].join("\n");
    case "writing":
      return [
        "DigitalOcean tutorials (sample):",
        ...tutorials.map((item) => `- ${item.title} (${item.meta}) ${item.href}`),
        "Medium essays and earlier tutorials:",
        ...essays.map((item) => `- ${item.title} (${item.meta}) ${item.href}`),
      ].join("\n");
    case "numbers":
      return metrics.map((metric) => `${metric.value} ${metric.label}`).join("; ") + ".";
    case "hobbies":
      return hobbies.map((hobby) => `- ${hobby.title}: ${hobby.line}`).join("\n") + "\n" + alsoOffClock.join("\n") + "\nNo summit names, distances, or rep counts are published.";
    case "education":
      return education.map((item) => `${item.school}${item.credential ? `, ${item.credential}` : ""}, ${item.years}`).join("\n") +
        `\nLanguages: ${languages.join(", ")}. Certifications: ${certifications.join(", ")}.`;
    case "hire":
      return `Book an intro call${site.bookingUrl ? ` at ${site.bookingUrl}` : ""}, use the contact form at /contact, or email ${site.email}. The form asks for name, email, company, project type, and a message; budget and timeline are optional. He does not publish prices; describe the project and he replies with how he would do it.`;
    case "press":
      return [
        ...mediaItems.map((item) => `- ${item.outlet}: ${item.title} (${item.category}, ${item.meta}) ${item.href}${item.note ? ` ${item.note}` : ""}`),
        ...press.map((item) => `- ${item.title} (${item.meta}) ${item.href}${item.note ? ` ${item.note}` : ""}`),
      ].join("\n");
    case "github":
      return githubProjects.map((item) => `- ${item.name}: ${item.note} ${item.href}`).join("\n") + "\nProfile: https://github.com/anishsingh20";
    case "technical":
      return `Before writing full-time he was an SRE at Nutanix (intern, SRE, Sr. SRE) and a cloud consultant for the American Express Cloud and Infrastructure Operations team in India. LinkedIn top skills: ${topSkills.join(", ")}. Search and research tools: ${tools.join(", ")}. Stack: ${stack.join(", ")}. Sole-author DigitalOcean tutorials cover LLM inference benchmarking, BYOM dedicated inference, RAG agents with MCP, GPT-4o on GPU Droplets, Postgres on Kubernetes, Argo CD and GitOps, bastion hosts, Linux permissions, and Let's Encrypt on Apache.`;
    case "contact":
      return `Email: ${site.email}. Contact form: /contact. Profiles: ${socials.map((item) => `${item.label} ${item.href}`).join("; ")}.`;
  }
}

export const topicList: Topic[] = [
  "identity", "role", "career", "clients", "testimonials", "formats", "writing", "numbers", "hobbies", "education", "hire", "press", "github", "technical", "contact",
];

/** Search the markdown notes and return the best chunks. */
export async function searchNotes(query: string, limit = 4): Promise<Chunk[]> {
  const chunks = await loadKnowledge();
  return scoreChunks(query, chunks)
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.chunk);
}

export function faqText() {
  return faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n");
}
