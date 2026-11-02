# Anish Singh Walia

Personal site for Anish Singh Walia, technical content strategist and team lead at DigitalOcean. It is built to introduce him to a brand or a hiring manager: who he is, who he has worked with, what people say, and how to start a project.

Stack: Next.js, TypeScript, Tailwind CSS. It runs on DigitalOcean App Platform or Vercel.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:3847](http://127.0.0.1:3847).

```bash
npm test
npm run build
npm start
```

Copy `.env.example` to `.env.local` when you want email delivery or the live model. With no keys, the contact form uses a mock transport and the Ask bot answers from `knowledge/`.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Production: `https://anishsinghwalia.com` |
| `CONTACT_TO` | Inbox for the form. Default `waliaanish1997@gmail.com` |
| `CONTACT_FROM` | From address on the message. For Gmail, use the same account as `SMTP_USER` |
| `SMTP_HOST` | SMTP server. Gmail: `smtp.gmail.com` |
| `SMTP_PORT` | `587` for STARTTLS. `465` turns on implicit TLS |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password or Gmail app password |
| `CONTACT_TRANSPORT` | Set to `mock` to accept the form without sending. Visitors still see a normal thank-you |
| `LLM_BASE_URL` | OpenAI-compatible base. DigitalOcean Serverless Inference: `https://inference.do-ai.run/v1` |
| `LLM_API_KEY` | Inference key. Empty keeps the on-site notes fallback |
| `LLM_MODEL` | Model slug from the DigitalOcean control panel, for example `llama3.3-70b-instruct` |

## Deploy

### DigitalOcean App Platform

`deploy/app.yaml` is a starting spec. Set `SMTP_USER`, `SMTP_PASS`, and `LLM_API_KEY` as encrypted env vars in the dashboard, point the domain `anishsinghwalia.com` at the app, and use Node. The start script reads `PORT` (App Platform sets it; the spec uses 8080). Gmail needs an app password in `SMTP_PASS`, with `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`.

### Vercel

Import the repo. Framework preset Next.js. Add the same env vars. `npm run build` is the build command.

## Where the words live

Editable content is in `data/`. The Ask bot reads `knowledge/`. `CONFIRM.md` lists facts Anish should check before treating the site as final.

Pages: `/`, `/about`, `/experience`, `/clients`, `/testimonials`, `/work`, `/game`, `/ask`, `/contact`. Also `sitemap.xml`, `robots.txt`, and `llms.txt`.

## License

[MIT](LICENSE). Copyright 2026 Anish Singh Walia.
