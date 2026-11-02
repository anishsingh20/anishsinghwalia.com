// One-time local setup: copy .env.example to .env.local if it isn't there yet.
import { copyFileSync, existsSync } from "node:fs";

const [major] = process.versions.node.split(".").map(Number);
if (major < 20) {
  console.error(`Node ${process.versions.node} is too old. Install Node 20 or newer (nvm use, or https://nodejs.org).`);
  process.exit(1);
}

if (existsSync(".env.local")) {
  console.log(".env.local already exists. Nothing to do.");
} else {
  copyFileSync(".env.example", ".env.local");
  console.log("Created .env.local from .env.example.");
  console.log("Everything runs without keys. Add LLM_API_KEY to turn on the model, and SMTP_* to send contact mail.");
}
console.log("Next: npm run dev, then open http://localhost:3847");
