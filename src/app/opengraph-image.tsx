import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Anish Singh Walia — Technical Content Strategist for AI-native and B2B companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/anish-og.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c0b0a",
          color: "#f4efe6",
          padding: 64,
          alignItems: "center",
          gap: 48,
        }}
      >
        <img src={src} width={280} height={280} style={{ borderRadius: 140, objectFit: "cover" }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ color: "#ffb088", fontSize: 22, letterSpacing: 3 }}>ANISH SINGH WALIA</div>
          <div style={{ fontSize: 54, lineHeight: 1.05, marginTop: 16 }}>
            Technical content for companies that need to be found.
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#c4b8aa" }}>
            Team Lead at DigitalOcean · anishsinghwalia.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
