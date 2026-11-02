/**
 * Company marks in /public/logos. SVGs are brand marks from the simple-icons
 * set, filled with each brand's colour. PNGs are the companies' own site icons.
 * Everything renders on a light chip at the same height, so dark marks stay legible.
 */

export type BrandLogo = {
  src: string;
  /** Rendered height inside the chip, in Tailwind height units. Wide marks need less. */
  size?: "sm" | "md";
};

export const brandLogos: Record<string, BrandLogo> = {
  DigitalOcean: { src: "/logos/digitalocean.svg" },
  Semrush: { src: "/logos/semrush.svg" },
  Nutanix: { src: "/logos/nutanix.svg" },
  "American Express": { src: "/logos/american-express.svg" },
  Hostinger: { src: "/logos/hostinger.svg" },
  "Tanot Solutions": { src: "/logos/tanot-solutions.png" },
  DataImpulse: { src: "/logos/dataimpulse.png" },
  OtterlyAI: { src: "/logos/otterlyai.png" },
  "Pollo AI": { src: "/logos/pollo-ai.png" },
  "La Isla Designs": { src: "/logos/la-isla-designs.png" },
  DataForSEO: { src: "/logos/dataforseo.png" },
  GeeksforGeeks: { src: "/logos/geeksforgeeks.svg" },
  ActiveCampaign: { src: "/logos/activecampaign.png" },
  AllAboutAI: { src: "/logos/allaboutai.png" },
  Medium: { src: "/logos/medium.svg" },
  GitHub: { src: "/logos/github.svg" },
  YouTube: { src: "/logos/youtube.svg" },
};

/** Two-letter fallback for a company that has no mark on file. */
export function monogram(name: string): string {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
