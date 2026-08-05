# 🇮🇳 India Data Center Tracker

A live, independent tracker of AI and hyperscale data centers across India — capacity, power draw, water consumption, and community impact. Modeled after the U.S. project [Brockovich Data Center Reporting](https://www.brockovichdatacenter.com/), adapted for the Indian market with data compiled from public disclosures, government filings, and investigative journalism.

**Live site:** enabled automatically via GitHub Pages on push to `main` — check the repo's **Settings → Pages** tab (or the Actions run) for the published URL, typically `https://anku0669.github.io/india-ai-datacenter-tracker/`.

## What's inside

- **Live map** (Leaflet.js) of 10 major Indian data center hubs — Mumbai, Chennai, Hyderabad, Delhi NCR, Bengaluru, Pune, Visakhapatnam, Odisha, Jamnagar and Thane — color-coded by status (operational / under construction / planned).
- **Capacity & water charts** (Chart.js) showing India's growth from 0.78 GW (FY23) to a projected 12 GW (FY30), and national data center water use from ~150 billion litres (2025) to a projected ~358 billion litres (2030).
- **Hub cards** with operators, live/pipeline MW, investment size, and a sourced summary for each location.
- **Long-form sections** covering power consumption, water consumption, benefits to India, risks and concerns, policy gaps, community reactions, and a comparison to the U.S. Brockovich dataset.
- **Full references list** — every figure is sourced and linked.

## Tech stack

Plain HTML/CSS/JS. No build step, no framework, no backend — just `index.html`, `styles.css`, `app.js`, and `data.js` (the editable dataset). Uses Tailwind (CDN), Leaflet.js (CDN), and Chart.js (CDN).

## Updating the data

All facts live in [`data.js`](./data.js) as plain JavaScript objects — no database, no build step. To add or correct a hub:

1. Edit `DATA_CENTERS` in `data.js` (add lat/lng, operators, capacity, status, a sourced note, and a `source` citation).
2. Update `NATIONAL_STATS`, `CAPACITY_TIMELINE`, or `WATER_TIMELINE` if you have newer national figures.
3. Open a pull request. Please include a source link for any new figure.

## Deployment

This repo deploys automatically to **GitHub Pages** via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`, using the official `actions/configure-pages` + `actions/deploy-pages` flow (no manual settings toggle required — the workflow enables Pages itself on first run).

To deploy elsewhere for free:
- **Vercel / Netlify:** import this GitHub repo directly — no build command needed (static site), output directory `/`.
- **Cloudflare Pages:** same — connect the repo, no build command, publish directory `/`.

## Disclaimer

This is an independent, open-source community-awareness project. It is **not** affiliated with any data center operator, Indian government body, or the original Brockovich Data Center Reporting initiative. Figures are best-effort estimates compiled from public sources and may contain errors — corrections are welcome via GitHub issues or pull requests.
