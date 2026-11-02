import { originNote } from "@data/about";
import { clients, headlineClients } from "@data/clients";
import { experience, topSkills, tools as researchTools } from "@data/experience";
import { formats } from "@data/formats";
import { hobbies, mountainQuote } from "@data/hobbies";
import { metrics, site, socials } from "@data/site";
import { testimonials } from "@data/testimonials";
import { essays, githubProjects, press, tutorials } from "@data/writing";
import type { BotEvent, ChatTurn } from "./agent";
import { scrub } from "./banned";
import { fact } from "./knowledge";
import { digitalOceanProfile, githubProfile, mediumPosts } from "./live";
import { searchNotes } from "./knowledge";

/**
 * Keyless mode. No model, so the router picks an intent from the question and
 * answers from structured facts plus the live fetchers. Every answer is a real
 * sentence with a link, not a dump of notes.
 */

type Source = { title: string; url: string };
type Reply = { text: string; sources: Source[]; status?: string };

const LINKS = {
  linkedin: "https://www.linkedin.com/in/anish-singh-walia/",
  medium: "https://medium.com/@anishsingh20",
  github: "https://github.com/anishsingh20",
  digitalocean: "https://www.digitalocean.com/community/users/asinghwalia",
  contact: `${site.url}/contact`,
};

const link = (label: string, url: string) => `[${label}](${url})`;

export async function keylessAnswer(message: string, history: ChatTurn[], emit: (event: BotEvent) => void) {
  const question = message.trim();
  const q = normalize(question);
  const previous = normalize(history.filter((turn) => turn.role === "user").slice(-1)[0]?.content ?? "");

  const reply = await route(q, previous, question);
  await stream(scrub(reply.text), emit);
  emit({ type: "sources", items: dedupe(reply.sources).slice(0, 4) });
  emit({ type: "done", mode: "keyless", toolCalls: reply.status ? [reply.status] : [] });
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[“”"']/g, "'").replace(/\s+/g, " ").trim();
}

function dedupe(items: Source[]) {
  const seen = new Set<string>();
  return items.filter((item) => (seen.has(item.url) ? false : (seen.add(item.url), true)));
}

async function stream(text: string, emit: (event: BotEvent) => void) {
  const pieces = text.split(/(?<=[.!?])\s+(?=[A-Z[])/);
  for (let index = 0; index < pieces.length; index += 1) {
    emit({ type: "delta", text: (index ? " " : "") + pieces[index] });
    if (pieces.length > 1) await new Promise((resolve) => setTimeout(resolve, 40));
  }
}

const has = (q: string, ...words: (string | RegExp)[]) =>
  words.some((word) => (typeof word === "string" ? q.includes(word) : word.test(q)));

const ABOUT_ANISH = /\b(anish|he|his|him|you|your|walia|digitalocean|nutanix|amex|american express|medium|github|linkedin|semrush|otterly|pollo|tanot|datalpulse|tutorial|client|hire|work|write|writer|content|video|newsletter|ghostwrit|podcast|press|hobby|hobbies|hik|trek|calisthenic|mountain|vit|vellore|dehradun|india|email|contact|skill|stack|tool|engineer|sre|cloud|experience|career|job|role|team|lead|rate|price|cost|budget|number|reader|subscriber|view|follower|repo|project|education|degree|study|language|testimonial|recommend|linkedin|format|infographic|carousel|deep dive|article|blog|post|book|read|do you|does he|is he|are you|can you|what do|who)\b/;

async function route(q: string, previous: string, original: string): Promise<Reply> {
  if (has(q, /\b(phone|mobile|whatsapp|cell)\b/, /\b(home )?address\b/, /where (exactly )?does he live\b/, /\b(salary|how much (does|did) (he|anish) (earn|make)|family|wife|girlfriend|married|kids|children|age|birthday|date of birth|passport|aadhaar)\b/)) {
    return {
      text: `I don't share private details like that. Anish's public email is ${site.email}, and the ${link("contact form", LINKS.contact)} reaches him directly. He is based in Dehradun, India, and that is as specific as I get.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
    };
  }

  if (has(q, /\b(hi|hello|hey|yo|good (morning|afternoon|evening))\b/) && q.split(" ").length <= 4) {
    return {
      text: `Hi. I answer questions about Anish Singh Walia: his work, career, clients, numbers, hobbies, and how to work with him. Try "What does Anish do?" or "Who has he worked with?"`,
      sources: [],
    };
  }

  if (has(q, /\b(price|pricing|rate|rates|cost|charge|fee|fees|budget|how much)\b/) && !has(q, /\b(reader|subscriber|view|tutorial|follower)/)) {
    return {
      text: `Anish doesn't publish prices. Pricing depends on the format, the depth, and how often you need it. The fastest route is the ${link("contact form", LINKS.contact)}: say what the company does, which format you want, and what it is for. He writes back with how he would do it. The form also has optional budget and timeline fields.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
    };
  }

  if (has(q, /\b(hire|hiring|work with (him|you|anish)|start a project|commission|book (him|you)|engage|collaborat\w*|available|availability|get in touch|reach (him|you|out)|contact)\b/)) {
    return {
      text: `Use the ${link("contact form", LINKS.contact)} or email ${site.email}. Tell him the company, the format you need, and what it's for, and he replies with how he would approach it. He works with B2B, SaaS, AI-native, and developer-tool companies alongside his full-time role at DigitalOcean. Companies he has worked with include ${listify(headlineClients)}.`,
      sources: [{ title: "Contact", url: LINKS.contact }, { title: "Clients", url: `${site.url}/clients` }],
    };
  }

  if (has(q, /\bemail\b/)) {
    return {
      text: `His public email is ${site.email}. The ${link("contact form", LINKS.contact)} goes to the same inbox and asks the right questions up front.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
    };
  }

  if (has(q, /\b(latest|newest|recent|last|new)\b.*\b(medium|post|article|essay|blog|story|wrote|written|publish)/, /\b(medium|post|article|essay|blog|story)\b.*\b(latest|newest|recent|last)\b/, /what (is|has) he (been )?(writing|published|posted)/)) {
    const { posts, error } = await mediumPosts(5);
    if (!posts.length) {
      return {
        text: `I couldn't reach Anish's Medium feed just now${error ? ` (${error})` : ""}. His posts are at ${link("medium.com/@anishsingh20", LINKS.medium)}. The site lists a few of the essays too, like "${essays[0].title}".`,
        sources: [{ title: "Medium", url: LINKS.medium }],
        status: "medium_feed",
      };
    }
    const latest = posts[0];
    const others = posts.slice(1, 4).map((post) => link(post.title, post.url)).join(", ");
    return {
      text: `His most recent Medium post is ${link(latest.title, latest.url)}, published ${shortDate(latest.date)}.${latest.snippet ? ` It opens: "${latest.snippet.slice(0, 160).trim()}..."` : ""}${others ? ` Before that: ${others}.` : ""} The full feed is at ${link("medium.com/@anishsingh20", LINKS.medium)}.`,
      sources: [{ title: latest.title, url: latest.url }, { title: "Medium", url: LINKS.medium }],
      status: "medium_feed",
    };
  }

  if (has(q, /\bgithub\b/, /\b(repo|repos|repositories|open source|open-source|code he)\b/, /\b(stars|followers)\b/)) {
    const { profile, error } = await githubProfile();
    const curated = githubProjects.slice(0, 3).map((project) => `${link(project.name, project.href)} (${project.note})`).join(", ");
    if (!profile) {
      return {
        text: `GitHub didn't answer just now${error ? ` (${error})` : ""}. Anish is ${link("anishsingh20 on GitHub", LINKS.github)}. Projects the site points to: ${curated}.`,
        sources: [{ title: "GitHub", url: LINKS.github }],
        status: "github_profile",
      };
    }
    const top = profile.topRepos.slice(0, 3).map((repo) => `${link(repo.name, repo.url)} (${repo.stars} stars${repo.language ? `, ${repo.language}` : ""})`).join(", ");
    const recent = profile.recentRepos[0];
    return {
      text: `Anish is ${link("anishsingh20 on GitHub", profile.url)}: ${profile.publicRepos} public repos and ${profile.followers} followers right now.${profile.bio ? ` His bio reads "${profile.bio.trim()}".` : ""} Most-starred: ${top}.${recent ? ` Most recently updated: ${link(recent.name, recent.url)} on ${shortDate(recent.updated)}.` : ""}`,
      sources: [{ title: "GitHub", url: profile.url }],
      status: "github_profile",
    };
  }

  if (has(q, /\b(how many|number of|count)\b.*\btutorial/, /\btutorials?\b.*\b(how many|count|number)\b/, /\b347\b/)) {
    const { profile } = await digitalOceanProfile();
    const live = profile.tutorialCount ? `The ${link("DigitalOcean author page", profile.url)} shows ${profile.tutorialCount} tutorials right now.` : `The site lists 347, from his ${link("DigitalOcean author page", profile.url)}.`;
    return {
      text: `${live} That count covers tutorials he wrote or refreshed as the author of record. Recent sole-author pieces include ${link(tutorials[0].title, tutorials[0].href)} and ${link(tutorials[2].title, tutorials[2].href)}.`,
      sources: [{ title: "DigitalOcean author page", url: profile.url }],
      status: "digitalocean_profile",
    };
  }

  if (has(q, /\b(medium)\b.*\b(stat|number|reader|view|subscriber|top writer|follower|audience|big|large|traffic)/, /\b(reader|readers|views|subscribers|newsletter subscribers|top writer|audience|traffic|numbers|stats|metrics|how big)\b/)) {
    const byId = Object.fromEntries(metrics.map((metric) => [metric.id, metric]));
    return {
      text: `The numbers Anish publishes: ${byId.readers.value} ${byId.readers.label}, ${byId.subscribers.value} ${byId.subscribers.label}, ${byId.views.value} ${byId.views.label}, ${byId["top-writer"].value} ${byId["top-writer"].label}, and ${byId.tutorials.value} ${byId.tutorials.label}. The Medium figures are from his ${link("Medium profile", LINKS.medium)}; the tutorial count is from his ${link("DigitalOcean author page", LINKS.digitalocean)}.`,
      sources: [{ title: "Medium", url: LINKS.medium }, { title: "DigitalOcean author page", url: LINKS.digitalocean }],
    };
  }

  if (has(q, /\b(nutanix|sre|site reliability|american express|amex|consultant|before digitalocean|engineering background|was he an engineer|used to do)\b/)) {
    const nutanix = experience.find((group) => group.id === "nutanix");
    const roles = nutanix?.roles.map((role) => `${role.title.replace(/ for American Express.*$/, " for American Express")} (${role.start} to ${role.end})`).reverse().join("; ");
    return {
      text: `Before he wrote full-time, Anish spent ${nutanix?.span ?? "4 years 8 months"} at Nutanix in Pune: ${roles}. The American Express role was a cloud consulting engagement for their Cloud and Infrastructure Operations team in India, through Nutanix. That is why the code in his tutorials runs. Full timeline on the ${link("experience page", `${site.url}/experience`)} and ${link("LinkedIn", LINKS.linkedin)}.`,
      sources: [{ title: "Experience", url: `${site.url}/experience` }, { title: "LinkedIn", url: LINKS.linkedin }],
    };
  }

  if (has(q, /\b(current (job|role|title|position)|job title|what does (he|anish) do|what do you do|where does (he|anish) work|who is anish|who's anish|tell me about (him|anish)|what is his role|what is he|introduce|day job|team lead|digitalocean role|at digitalocean)\b/) && !has(q, /\b(outside|off the clock|off-hours|free time|spare time|hobb)/)) {
    const digitalocean = experience.find((group) => group.id === "digitalocean");
    const lead = digitalocean?.roles[0];
    return {
      text: `Anish is ${site.jobTitle} at DigitalOcean, since ${lead?.start ?? "September 2025"}. He joined as Senior Technical Writer in September 2023 and now leads a content team and owns the core infrastructure and AI inference tutorial programs. Outside the day job he is a technical content creator for B2B, SaaS, AI-native, and developer-tool companies: deep dives, tutorials, videos, infographics, LinkedIn posts, ghostwriting, and newsletters. He lives in Dehradun, India. More on the ${link("about page", `${site.url}/about`)} and his ${link("DigitalOcean author page", LINKS.digitalocean)}.`,
      sources: [{ title: "About", url: `${site.url}/about` }, { title: "DigitalOcean author page", url: LINKS.digitalocean }],
    };
  }

  if (has(q, /\b(testimonials?|recommend\w*|reviews?|what do (people|clients) say|feedback)\b/)) {
    const quoted = testimonials.filter((item) => item.quote && item.company).slice(0, 2);
    const lines = quoted.map((item) => `${item.name}, ${item.role} at ${item.company}: "${item.quote}"`).join(" ");
    return {
      text: `${testimonials.filter((item) => item.quote).length} people have written recommendations for him. Two of them: ${lines} All of them are on the ${link("testimonials page", `${site.url}/testimonials`)} and on ${link("LinkedIn", site.recommendationsUrl)}.`,
      sources: [{ title: "Testimonials", url: `${site.url}/testimonials` }, { title: "LinkedIn recommendations", url: site.recommendationsUrl }],
    };
  }

  if (has(q, /\b(client|clients|companies|brands|worked with|work with|customers|who has he (worked|written) for|portfolio)\b/)) {
    const named = clients.filter((client) => client.group === "client").map((client) => `${client.name} (${thirdPerson(client.detail.replace(/\.$/, ""))})`);
    return {
      text: `Anish has worked with B2B, SaaS, and AI-native companies such as ${listify(headlineClients)}. The specifics: ${named.join("; ")}. Semrush also sponsored his Medium essay ${link("SEO-to-GEO Identity Crisis", "https://medium.com/readers-club/seo-geo-identity-crisis-fix-traffic-revenue-gap-9e4154003306")}. Each of these people left a recommendation, on the ${link("testimonials page", `${site.url}/testimonials`)}.`,
      sources: [{ title: "Clients", url: `${site.url}/clients` }, { title: "Testimonials", url: `${site.url}/testimonials` }],
    };
  }

  if (has(q, /\b(podcast|press|interview|featured|media|case study|activecampaign|allaboutai)\b/)) {
    const items = press.map((item) => `${link(item.title, item.href)} (${item.meta.split(" · ").slice(0, 2).join(", ")})${item.note ? `. ${item.note}` : ""}`).join(" ");
    return {
      text: `Three places to look. ${items} Full list on the ${link("work page", `${site.url}/work`)}.`,
      sources: press.map((item) => ({ title: item.title, url: item.href })),
    };
  }

  if (has(q, /\b(hobby|hobbies|free time|spare time|off the clock|off-hours|weekends?|fun|outside (of )?work|hik(e|es|ing)|trek\w*|mountains?|calisthenics?|pull-?ups?|skipping|jump rope|runs?|running|cooks?|cooking|invest\w*|fitness|workouts?)\b/)) {
    const named = hobbies.map((hobby) => hobby.title.toLowerCase());
    return {
      text: `${capitalize(listify(named))}. He lives in Dehradun, in the Himalayan foothills, so the trail starts close to home. Calisthenics is bodyweight work at home, twice a day, with sessions he designs using AI. His GitHub README still says "fitness freak". On weekends he cooks; he's asked ChatGPT for biryani and beetroot patty recipes. He follows investing: PE ratios, earnings reports, valuation models. He doesn't publish summit names, distances, or rep counts. His line on it: "${mountainQuote}" More on the ${link("about page", `${site.url}/about#off-hours`)}.`,
      sources: [{ title: "About", url: `${site.url}/about#off-hours` }],
    };
  }

  if (has(q, /\b(vit|vellore|college|university|degree|study|studied|education|graduate|school|b\.?tech|bachelor)\b/)) {
    return {
      text: `Anish has a Bachelor's degree in Information Technology from Vellore Institute of Technology, ${site.education.years}. He wrote about data science on DataScience+ while he was still studying, then joined Nutanix as an SRE intern in 2018. Timeline on the ${link("experience page", `${site.url}/experience`)}.`,
      sources: [{ title: "Experience", url: `${site.url}/experience` }],
    };
  }

  if (has(q, /\b(where (is|does) (he|anish)|based|location|live|city|country|timezone|time zone|remote)\b/)) {
    return {
      text: `Dehradun, Uttarakhand, India, in the Himalayan foothills. He works remotely for DigitalOcean and with clients in other time zones. Email and the ${link("contact form", LINKS.contact)} are the way in.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
    };
  }

  if (has(q, /\b(speak|language|languages|hindi|english|punjabi)\b/) && !has(q, /\b(programming|python|go|javascript|code)\b/)) {
    return {
      text: `${fact("education").split("Languages: ")[1]?.split(". Certifications")[0] ?? "English and Hindi"}, per his LinkedIn. His writing is in English. Profile: ${link("LinkedIn", LINKS.linkedin)}.`,
      sources: [{ title: "LinkedIn", url: LINKS.linkedin }],
    };
  }

  if (has(q, /\b(video|videos|youtube|film)\b/)) {
    const video = formats.find((format) => format.id === "video");
    return {
      text: `Yes. ${thirdPerson(video?.line ?? "")} The example on the site is ${link("how he helped a five-person team rebuild its video library", video?.example?.href ?? LINKS.medium)}. He also appeared on the ${link("AI For Thought podcast", press[2].href)}. All formats are on the ${link("what-I-make section", `${site.url}/#what-i-make`)}.`,
      sources: [{ title: video?.example?.label ?? "Medium", url: video?.example?.href ?? LINKS.medium }],
    };
  }

  if (has(q, /\b(newsletter|subscribe|substack)\b/)) {
    return {
      text: `His newsletter runs through Medium, with 35,000+ subscribers. You can subscribe from ${link("medium.com/@anishsingh20", LINKS.medium)}. For clients he writes newsletters too; that is one of the formats on the ${link("what-I-make section", `${site.url}/#what-i-make`)}.`,
      sources: [{ title: "Medium", url: LINKS.medium }],
    };
  }

  if (has(q, /\b(ghostwrit\w*|ghost writ\w*|linkedin posts?|short-form|short form|carousels?|infographics?|thought leadership|personal brand\w*|rebrand\w*)\b/)) {
    const ghost = formats.find((format) => format.id === "ghostwriting");
    const carousel = formats.find((format) => format.id === "carousels");
    return {
      text: `Yes. Ghostwriting: ${thirdPerson(ghost?.line ?? "")} The clearest example is Renu Sharma at Tanot Solutions, whose LinkedIn rebrand he wrote; her note is on the ${link("testimonials page", `${site.url}/testimonials#renu-sharma`)}. Infographics and carousels: ${thirdPerson(carousel?.line ?? "")} Nadia Fernández wrote about ${link("the carousel they made", `${site.url}/testimonials#nadia-fernandez`)}. For his own profile, see ${link("how he uses Semrush with ChatGPT", formats.find((format) => format.id === "linkedin")?.example?.href ?? LINKS.linkedin)}.`,
      sources: [{ title: "Testimonials", url: `${site.url}/testimonials` }],
    };
  }

  if (has(q, /\b(format|formats|what (does|can) (he|anish) (make|do|produce|create|write)|services|offers?|offerings|what kinds? of content|types? of content|deliverables?)\b/)) {
    const list = formats.map((format) => format.title.toLowerCase());
    return {
      text: `${capitalize(listify(list))}. All of it for B2B, SaaS, AI-native, and developer-tool companies, backed by an engineering background. Each format has a real example on the ${link("home page", `${site.url}/#what-i-make`)}, like ${link(formats[0].example?.label ?? "", formats[0].example?.href ?? site.url)}.`,
      sources: [{ title: "What I make", url: `${site.url}/#what-i-make` }],
    };
  }

  if (has(q, /semrush.*chatgpt|chatgpt.*semrush/)) {
    const post = formats.find((format) => format.id === "linkedin");
    return {
      text: `Two things. On LinkedIn he posted ${link("how he uses Semrush with ChatGPT", post?.example?.href ?? LINKS.linkedin)}: the experiment and the result. AllAboutAI then ran a written feature, ${link("How Anish used ChatGPT and Semrush", press[1].href)}, about the Medium growth behind it. Semrush later sponsored his essay ${link("SEO-to-GEO Identity Crisis", essays[0].href)}.`,
      sources: [{ title: "LinkedIn post", url: post?.example?.href ?? LINKS.linkedin }, { title: press[1].title, url: press[1].href }],
    };
  }

  if (has(q, /\b(technical|how deep|kubernetes|k8s|linux|docker|inference|llm|gpu|rag|devops|gitops|argo|postgres|skills|stack|tools|semrush|ahrefs|profound|seo|geo|search console)\b/)) {
    return {
      text: `Deep enough to run it. Anish was an SRE at Nutanix for over four years before writing full-time. His LinkedIn top skills are ${listify(topSkills)}. His sole-author DigitalOcean tutorials cover ${link("LLM inference benchmarking", tutorials[0].href)}, ${link("RAG agents with MCP", tutorials[2].href)}, ${link("Postgres on Kubernetes", tutorials[5].href)}, and ${link("Argo CD and GitOps", tutorials[6].href)}. For search and research he uses ${listify(researchTools.slice(0, 5))}.`,
      sources: [{ title: "DigitalOcean author page", url: LINKS.digitalocean }, { title: "Work", url: `${site.url}/work` }],
    };
  }

  if (has(q, /\b(career|history|story|journey|background|how did he (start|get)|timeline|path|experience)\b/)) {
    return {
      text: `${originNote} Full timeline: Nutanix from 2018 to 2023 (SRE intern, SRE, Sr. SRE, then cloud consultant for American Express), DigitalOcean since September 2023 (Senior Technical Writer, then ${site.jobTitle} from September 2025). The ${link("experience page", `${site.url}/experience`)} has every role and date.`,
      sources: [{ title: "Experience", url: `${site.url}/experience` }, { title: "LinkedIn", url: LINKS.linkedin }],
    };
  }

  if (has(q, /\b(tutorial|tutorials|docs|documentation|best (article|piece|post)|favourite|favorite|should i read|writing|wrote|written|publish)\b/)) {
    const picks = tutorials.slice(0, 3).map((item) => link(item.title, item.href)).join("; ");
    return {
      text: `Start with the DigitalOcean tutorials: ${picks}. On Medium, the sponsored essay ${link(essays[0].title, essays[0].href)} shows the long-form side. The ${link("work page", `${site.url}/work`)} has the rest.`,
      sources: [{ title: "Work", url: `${site.url}/work` }],
    };
  }

  if (has(q, /\b(social|profiles|links|linkedin|where can i (find|follow)|follow)\b/)) {
    return {
      text: `${socials.map((item) => link(item.label, item.href)).join(", ")}. LinkedIn is where he posts most often; Medium is where the long essays go.`,
      sources: socials.map((item) => ({ title: item.label, url: item.href })),
    };
  }

  if (!ABOUT_ANISH.test(q) || has(q, /\b(capital of|weather|recipe for|write (me )?(a|some) (python|javascript|code|poem|essay)|translate|solve|calculate|stock price|bitcoin|who won|president|prime minister|define|meaning of life)\b/)) {
    return {
      text: `I only answer questions about Anish Singh Walia, so I'll pass on that one. Things I can help with: what he makes, who he has worked with, his career before DigitalOcean, his numbers, his hobbies, and how to start a project with him.`,
      sources: [],
    };
  }

  const notes = await searchNotes(original, 3);
  if (notes.length) {
    const best = notes[0];
    const body = best.text.replace(/\s+/g, " ").trim();
    return {
      text: `From Anish's notes (${best.title}): ${trimTo(body, 420)} If that doesn't cover it, the ${link("contact form", LINKS.contact)} goes straight to him.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
      status: "knowledge_base",
    };
  }

  if (previous) {
    return {
      text: `I don't have anything specific on that. Ask me about his work, clients, career, numbers, hobbies, or how to hire him, or use the ${link("contact form", LINKS.contact)} to ask Anish directly.`,
      sources: [{ title: "Contact", url: LINKS.contact }],
    };
  }
  return {
    text: `I couldn't find that in Anish's notes or his live profiles. The ${link("contact form", LINKS.contact)} goes straight to him, and he does reply.`,
    sources: [{ title: "Contact", url: LINKS.contact }],
  };
}

/** Site copy is first person. The bot talks about Anish, so flip the pronouns. */
function thirdPerson(text: string) {
  return text
    .replace(/\bI've\b/g, "he's")
    .replace(/\bI'll\b/g, "he'll")
    .replace(/\bI'm\b/g, "he's")
    .replace(/\bI\b/g, "he")
    .replace(/\bmy\b/gi, "his")
    .replace(/\bme\b/g, "him")
    .replace(/\bwe were\b/g, "they were")
    .replace(/\bwe\b/g, "they")
    .replace(/(^|[.!?]\s+)he\b/g, "$1He")
    .replace(/(^|[.!?]\s+)his\b/g, "$1His");
}

function listify(items: readonly string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function trimTo(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "), max - 60) + 1).trim()}`;
}

function shortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
