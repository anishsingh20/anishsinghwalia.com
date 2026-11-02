# anishsinghwalia.com

My personal site. I'm Anish Singh Walia: technical content creator, Senior Technical Content Strategist II and Team Lead at DigitalOcean, former SRE. The site shows what I make (deep dives, tutorials, video, infographics, LinkedIn posts, ghostwriting, newsletters), the companies I've worked with, what they said, and how to start a project.

Next.js 15, React 19, TypeScript, Tailwind v4, three.js for the game room. Runs on DigitalOcean App Platform or Vercel.

## Run it on a Mac

You need Node 20 or newer. Check with `node --version`. If you don't have it, install from [nodejs.org](https://nodejs.org) or run `nvm use` (there's an `.nvmrc`).

```bash
npm install
npm run setup
npm run dev
```

Open [http://localhost:3847](http://localhost:3847). That's it. No keys needed: the contact form uses a mock transport and the Ask bot runs in keyless mode (live Medium, GitHub, and DigitalOcean data plus the notes in `knowledge/`). The terminal prints `[ask] mode=keyless` or `[ask] mode=agent` on the first question so you know which one is running.

Other commands:

```bash
npm test            # vitest: facts, banned words, bot, contact form
npm run eval:bot    # 30 real questions through the bot, report in eval/results.md
npm run lint
npm run typecheck
npm run build && npm start
```

## Pages

`/`, `/about`, `/experience`, `/clients`, `/testimonials`, `/work`, `/game`, `/ask`, `/contact`. Also `sitemap.xml`, `robots.txt`, `llms.txt`, and an Open Graph image.

Everything people read lives in `data/`. The bot's notes live in `knowledge/`. `CONFIRM.md` lists the facts I should double-check before treating the site as final.

## The Ask bot

`/ask` is a server-side agent (`src/lib/bot/`). With `LLM_API_KEY` set it runs a tool-calling loop against any OpenAI-compatible endpoint and streams the answer. Tools:

- `knowledge_base`: the curated notes and the structured facts from `data/`. Always called first.
- `medium_feed`, `github_profile`, `digitalocean_profile`: live, keyless fetchers with a 30 to 60 minute cache.
- `web_search`: Tavily, Brave, Serper, or Exa, whichever key is present. Queries are biased with my name.
- `fetch_page`: readable text from a URL, SSRF-safe.

Without a key it uses an intent router over the same facts and live fetchers. Both modes refuse private details (phone, address, salary), deflect off-topic questions, cite inline links, and run through a word filter so the bot never describes my client work with words I don't use. Rate limit: 20 questions per IP per 10 minutes.

`npm run eval:bot` asks 30 questions (current job, Nutanix and American Express, clients, tutorial count, Medium numbers, latest post, hobbies, hiring, VIT, podcasts, GitHub, formats, off-topic, private info) and writes `eval/results.md` and `eval/results.json`. It exits 1 if any case fails.

## Environment

All optional. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Production: `https://anishsinghwalia.com` |
| `CONTACT_TO` | Inbox for the form. Default `waliaanish1997@gmail.com` |
| `CONTACT_FROM` | From address on the message. For Gmail, the same account as `SMTP_USER` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Mail server. Gmail: `smtp.gmail.com`, `587`, an app password |
| `CONTACT_TRANSPORT` | `mock` accepts the form without sending. Automatic when SMTP is not set |
| `LLM_BASE_URL` | OpenAI-compatible base. Default `https://inference.do-ai.run/v1` |
| `LLM_API_KEY` | Model key. Empty means keyless mode |
| `LLM_MODEL` | Model slug. Default `llama3.3-70b-instruct` |
| `TAVILY_API_KEY`, `BRAVE_SEARCH_API_KEY`, `SERPER_API_KEY`, `EXA_API_KEY` | Web search for the bot. Set one |
| `SEARCH_PROVIDER` | Force one provider when several keys are set |
| `GITHUB_TOKEN` | Optional. Higher GitHub API rate limit |

Never commit `.env.local`. It's in `.gitignore`.

## Deploy

**DigitalOcean App Platform.** `deploy/app.yaml` is the spec. Add `SMTP_USER`, `SMTP_PASS`, `LLM_API_KEY`, and a search key as encrypted env vars in the dashboard. Point `anishsinghwalia.com` at the app. The start script reads `PORT`.

**Vercel.** Import the repo, framework preset Next.js, add the same env vars.

## Tests

`npm test` checks: the contact address, that the other inbox appears nowhere, recommendation quotes match the transcription word for word, every game station links to a real page, the bot answers and refusals, and a banned-word scan over source, notes, config, docs, and the built HTML in `.next` when a build exists.

## License

[MIT](LICENSE). Copyright 2026 Anish Singh Walia.
