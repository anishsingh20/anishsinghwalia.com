/**
 * Off-the-clock facts.
 * Hiking, trekking, skipping, running, calisthenics, and mountains are hobbies
 * he has stated. Do not add summit names, distances, or rep counts.
 */

export type Hobby = {
  id: string;
  title: string;
  line: string;
  art: "hike" | "trek" | "calisthenics" | "rope" | "run" | "peak";
};

export const hobbies: Hobby[] = [
  {
    id: "hiking",
    title: "Hiking",
    line: "Out on foot. Dehradun sits in the Himalayan foothills, which is the landscape he actually lives in.",
    art: "hike",
  },
  {
    id: "trekking",
    title: "Trekking",
    line: "The longer days outside. Trekking is one of the things he loves, and the route notes are still his to tell.",
    art: "trek",
  },
  {
    id: "calisthenics",
    title: "Calisthenics",
    line: "Bodyweight work at home, twice a day. He uses AI to design the sessions. His README still calls him a fitness freak, especially calisthenics.",
    art: "calisthenics",
  },
  {
    id: "skipping",
    title: "Skipping",
    line: "Jump rope. He loves skipping, and this card leaves the counting to him.",
    art: "rope",
  },
  {
    id: "running",
    title: "Running",
    line: "In the gym or outdoors. That part is in his own GitHub README.",
    art: "run",
  },
  {
    id: "mountains",
    title: "Mountains",
    line: "“When AI writes my blogs… I'll be in the mountains.” He lives close enough to mean it.",
    art: "peak",
  },
];

export const alsoOffClock = [
  "On weekends he cooks, and he has asked ChatGPT for biryani and beetroot patty recipes.",
  "He follows investing closely: PE ratios, earnings reports, valuation models.",
];

export const mountainQuote =
  "When AI writes my blogs… I'll be in the mountains.";
