# Confirm before this goes live

Facts on the site come from the LinkedIn export, the recommendation transcription, the public dossier, and the banner. These are the ones that still need a yes from Anish.

## Numbers that disagree

- LinkedIn About says **3,000,000+ average monthly readers**. The banner says **35,000+ subscribers** and **200,000+ monthly views**. Both are on the site, labeled with their source.
- The AllAboutAI interview title and write-up have also been summarized as 2–3 million monthly views. That third figure is not displayed.
- Medium Top Writer is shown as **2×**, from the banner and Medium bio. The categories were not found.
- DigitalOcean tutorial count **347**, and GitHub **322 public repos / 497 followers**, are the 2 November 2026 snapshot.
- A LinkedIn follower count from a search snippet (about 22,392) is **not** shown. Say if you want one.
- Readers Club's follower count is not shown.

## Wording

- Education is **Bachelor's degree, Information Technology, Vellore Institute of Technology, 2015–2019**. It is not labeled CS or B.Tech.
- Gautam international school, 2013–2015, is listed with no credential, matching the export.
- The About text keeps your "7+ years" sentence. The timeline uses the dated LinkedIn roles (Nutanix is 4 years 8 months, which includes the American Express consulting engagement).
- "AI super user" and "geek at heart" are short chips on the homepage, grounded in the tools and the GitHub README, not a formal title.

## Names and quotes

- Company spelling **Datalpulse** follows your transcription. The recommendation is about a proxy experiment. Confirm that spelling.
- **Daria Sukhorosolova** follows your transcription.
- Klaus-M. Schremser's quote follows `research/testimonials.md`. If the live LinkedIn text differs, replace the string in `data/testimonials.ts`.
- Nadia's quote uses "digestible", as transcribed. Her card includes Founder and Digital Marketing & Growth Consultant.
- Abby Wang has no job title in the transcription. The card leads with **Pollo AI**.
- Evgeniia Novikova is on the testimonials page with name and title only. The recommendation text was not in the screenshot.
- Shiva Vinodkumar is excluded. The profile toggle was off.
- Ellipses are LinkedIn's cutoff. Do not complete them in the data file.

## Not on the site, on purpose

- Tool-review posts (AI Studios, Zawa.ai, BeautyPlus, Ideogram, and the June 2026 multi-market video post) are not client logos. OtterlyAI is a client because Klaus-M. Schremser's recommendation says so. The Medium OtterlyAI review is not marked sponsored. The list lives in `data/clients.ts` as `unconfirmedToolPosts` and is not rendered.
- Instagram `cali_br20` and the YouTube channel from the GitHub README were unverified and are not linked.
- No X/Twitter profile was found.
- Family details from the AllAboutAI interview are not mentioned.
- Hobbies are hiking, trekking, calisthenics, skipping, running, and the mountains, plus weekend cooking and investing. No summit names, distances, or rep counts. Twice-a-day bodyweight training and the mountain line are from the AllAboutAI interview, which returned 403 when it was fetched. Confirm those sentences.
- The contact form sends to **waliaanish1997@gmail.com** (the GitHub address). A different address on the LinkedIn export is not published.

## Still worth doing outside the repo

- Buy `anishsinghwalia.com` if the RDAP check is still clear, and point it here.
- Add this URL to LinkedIn, Medium, GitHub, and the DigitalOcean profile so the name consolidates.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Paste any full recommendation text you want extended. The data file is `data/testimonials.ts`.
