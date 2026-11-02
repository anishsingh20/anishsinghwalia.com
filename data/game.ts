/**
 * The cabin. Each object you walk up to opens a real page.
 * Positions are block coordinates inside the cabin. The interior is
 * 12 blocks wide (x 1..12) and 9 deep (z 1..9). The door is on the z=10 wall.
 */

export type StationKind =
  | "desk"
  | "bookshelf"
  | "pager"
  | "kettlebell"
  | "badges"
  | "map"
  | "mailbox"
  | "fireplace";

export type Station = {
  id: string;
  kind: StationKind;
  name: string;
  /** The line shown in the cabin when you open the object. First person. */
  blurb: string;
  /** Short facts shown in the panel. */
  facts: string[];
  href: string;
  cta: string;
  /** Block position of the object. */
  x: number;
  z: number;
};

export const stations: Station[] = [
  {
    id: "desk",
    kind: "desk",
    name: "My desk",
    blurb:
      "This is where the content gets made. Deep dives, tutorials, video scripts, LinkedIn posts, newsletters. 347 DigitalOcean tutorials came off this desk too.",
    facts: [
      "Senior Technical Content Strategist II and Team Lead at DigitalOcean",
      "Tutorials on LLM inference, Postgres on Kubernetes, Argo CD, Linux permissions",
      "Medium essays on SEO, AI search, and the tools I test",
    ],
    href: "/work",
    cta: "See the writing",
    x: 2.5,
    z: 1.5,
  },
  {
    id: "pager",
    kind: "pager",
    name: "The pager",
    blurb:
      "Four years and eight months at Nutanix. SRE intern, SRE, Sr. SRE, then cloud consulting for American Express. I kept the pager.",
    facts: [
      "Nutanix, January 2019 to August 2023",
      "Cloud Consultant for American Express Cloud and Infrastructure Operations, 2022 to 2023",
      "Joined DigitalOcean as a Senior Technical Writer in September 2023",
    ],
    href: "/experience",
    cta: "Read the timeline",
    x: 1.5,
    z: 5.5,
  },
  {
    id: "badges",
    kind: "badges",
    name: "The wall",
    blurb:
      "Companies I've worked with. DigitalOcean, Semrush, Nutanix, American Express, and Hostinger are the five on my LinkedIn banner.",
    facts: [
      "Client work for Semrush, OtterlyAI, Datalpulse, Tanot Solutions, and Pollo AI",
      "Tutorials for Hostinger, DataScience+, and GeeksforGeeks",
      "Every name has a public source",
    ],
    href: "/clients",
    cta: "See the companies",
    x: 7,
    z: 0.5,
  },
  {
    id: "bookshelf",
    kind: "bookshelf",
    name: "The bookshelf",
    blurb:
      "What clients wrote after we worked together. Eight LinkedIn recommendations, quoted as they were written.",
    facts: [
      "Daria Sukhorosolova, Semrush",
      "Klaus-M. Schremser, OtterlyAI",
      "Andrew Byzov, Datalpulse",
    ],
    href: "/testimonials",
    cta: "Read the recommendations",
    x: 11.5,
    z: 1.5,
  },
  {
    id: "kettlebell",
    kind: "kettlebell",
    name: "The kettlebell",
    blurb:
      "Calisthenics twice a day, at home. Then hiking, trekking, skipping, and running. Dehradun sits in the Himalayan foothills, so the mountains are close.",
    facts: ["Bodyweight training, twice a day", "Hiking and trekking", "Weekend cooking"],
    href: "/about#off-hours",
    cta: "Off the clock",
    x: 11.5,
    z: 6.5,
  },
  {
    id: "map",
    kind: "map",
    name: "The trail map",
    blurb:
      "Have a question about me? There's a bot on the Ask page that reads my notes and checks the live web. It says so when it doesn't know.",
    facts: ["Current role and past jobs", "Clients and testimonials", "How to start a project"],
    href: "/ask",
    cta: "Ask me anything",
    x: 0.5,
    z: 8,
  },
  {
    id: "fireplace",
    kind: "fireplace",
    name: "The fireplace",
    blurb:
      "I live in Dehradun, Uttarakhand. Bachelor's in Information Technology from VIT, 2015 to 2019. I started writing online in 2017.",
    facts: ["Dehradun, Uttarakhand, India", "Vellore Institute of Technology", "Hindi, English, Punjabi, some German"],
    href: "/about",
    cta: "About me",
    x: 12.5,
    z: 4,
  },
  {
    id: "mailbox",
    kind: "mailbox",
    name: "The mailbox",
    blurb:
      "Need a deep dive, a video, a tutorial set, or someone to write your LinkedIn? Tell me about the company and the project. I'll write back.",
    facts: ["Long-form articles, tutorials, and docs", "Video, infographics, and LinkedIn posts", "Ghostwriting, newsletters, and content strategy"],
    href: "/contact",
    cta: "Work with me",
    x: 9.5,
    z: 9.5,
  },
];

/** Where the avatar starts, just inside the door. */
export const spawn = { x: 6.5, z: 8 };

export const controls = {
  move: "W A S D or the arrow keys to walk",
  look: "Drag to look around, scroll to zoom",
  interact: "E, Enter, or tap Open when you're next to something",
};
