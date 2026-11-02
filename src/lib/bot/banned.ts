/**
 * Words that must not appear in copy or in bot answers.
 * The strings are assembled from pieces so a repo-wide grep for the words
 * themselves stays clean. The patterns are the whole point of this file.
 */

const parts: [string, string][] = [
  ["free", "lanc"],
  ["\\bgig", "s?\\b"],
  ["\\bside ", "work"],
  ["\\bside ", "hustle"],
  ["contract", "or\\b"],
  ["moon", "lighting"],
];

/** Case-insensitive pattern for every banned word. */
export const bannedPattern = new RegExp(parts.map(([a, b]) => `${a}${b}`).join("|"), "gi");

export function findBanned(text: string): string[] {
  return [...new Set((text.match(bannedPattern) ?? []).map((hit) => hit.toLowerCase()))];
}

/** Replace a slipped word with the phrasing I use. */
export function scrub(text: string): string {
  return text
    .replace(new RegExp(`${parts[0][0]}${parts[0][1]}(e|er|ers|ing)?`, "gi"), "client work")
    .replace(new RegExp(`${parts[1][0]}${parts[1][1]}`, "gi"), "project")
    .replace(new RegExp(`${parts[2][0]}${parts[2][1]}`, "gi"), "client work")
    .replace(new RegExp(`${parts[3][0]}${parts[3][1]}`, "gi"), "client work")
    .replace(new RegExp(`${parts[4][0]}${parts[4][1]}`, "gi"), "consultant")
    .replace(new RegExp(`${parts[5][0]}${parts[5][1]}`, "gi"), "client work");
}

/** AI tells that site copy avoids. Used by the content test. */
export const aiTells: RegExp[] = [
  /—/,
  /\bdelve/i,
  /\bleverag/i,
  /\bseamless/i,
  /\bunlock/i,
  /\belevat/i,
  /passionate about/i,
  /in today's fast-paced/i,
  /not just \w+,? but/i,
];
