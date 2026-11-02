/**
 * Off the clock. Hiking, trekking, skipping, running, calisthenics, and the mountains
 * are the hobbies I've named publicly. No summit names, distances, or rep counts.
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
    line: "Out on foot. Dehradun is in the Himalayan foothills, so the trail starts close to home.",
    art: "hike",
  },
  {
    id: "trekking",
    title: "Trekking",
    line: "The longer days outside. Ask me about the routes in person.",
    art: "trek",
  },
  {
    id: "calisthenics",
    title: "Calisthenics",
    line: "Bodyweight work at home, twice a day. I use AI to design the sessions. My GitHub README still says fitness freak.",
    art: "calisthenics",
  },
  {
    id: "skipping",
    title: "Skipping",
    line: "Jump rope. I love it. I don't publish the counts.",
    art: "rope",
  },
  {
    id: "running",
    title: "Running",
    line: "In the gym or outdoors. It's in my GitHub README too.",
    art: "run",
  },
  {
    id: "mountains",
    title: "Mountains",
    line: "“When AI writes my blogs… I'll be in the mountains.” I live close enough to mean it.",
    art: "peak",
  },
];

export const alsoOffClock = [
  "On weekends I cook. I've asked ChatGPT for biryani and beetroot patty recipes.",
  "I follow investing: PE ratios, earnings reports, valuation models.",
];

export const mountainQuote = "When AI writes my blogs… I'll be in the mountains.";
