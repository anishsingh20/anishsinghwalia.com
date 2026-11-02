export type Station = {
  id: string;
  name: string;
  blurb: string;
  href: string;
};

/** Collectibles in the Game Room. Each one opens a real page. */
export const stations: Station[] = [
  {
    id: "pager",
    name: "The pager",
    blurb: "SRE years at Nutanix, then American Express cloud operations.",
    href: "/experience",
  },
  {
    id: "kettlebell",
    name: "The kettlebell",
    blurb: "Calisthenics, running, and the hills around Dehradun.",
    href: "/about#off-hours",
  },
  {
    id: "keyword",
    name: "The keyword",
    blurb: "Tutorials and essays built to be found.",
    href: "/work",
  },
  {
    id: "badge",
    name: "The badge",
    blurb: "Brands and clients on the wall.",
    href: "/clients",
  },
  {
    id: "flag",
    name: "The summit flag",
    blurb: "Position #1. This is the part where you write to him.",
    href: "/contact",
  },
];
