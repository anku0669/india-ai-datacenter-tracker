# 🇮🇳 India Data Center Tracker

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://anku0669.github.io/india-ai-datacenter-tracker/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/anku0669/india-ai-datacenter-tracker/pulls)

> A live, independent tracker of AI and hyperscale data centers across India — capacity, power draw, water consumption, national context, and community impact. Modeled after the U.S. project [Brockovich Data Center Reporting](https://www.brockovichdatacenter.com/), adapted for the Indian market with data compiled from public disclosures, government filings, and investigative journalism.

**🌐 Live site:** [anku0669.github.io/india-ai-datacenter-tracker](https://anku0669.github.io/india-ai-datacenter-tracker/)

---

## 📖 What's Inside

| Page | What it covers |
|------|----------------|
| **Home** (`index.html`) | Hero stats, live interactive map of 10 major hubs, hub cards, announcement timeline, and links to every analysis page |
| **Power** (`power.html`) | India's total 533 GW grid, generation mix, and how data centers (1.9 GW today → 12 GW by 2030) compare |
| **Water** (`water.html`) | India's 2,116 BCM total water resources, per-capita stress, and data center draw (150B → 358B litres/year) |
| **Environment** (`environment.html`) | Carbon, diesel generators, land use, desalination brine, e-waste, and heat-island effects |
| **Benefits** (`benefits.html`) | Digital sovereignty, $150B+ investment, jobs, renewable energy forcing function, cooling innovation |
| **Concerns** (`concerns.html`) | Water stress, regulatory gaps, grid strain, weather risk, community friction, equity dimensions |
| **Scaling Up** (`scaling.html`) | Cons of building even more: renewable lag, agriculture competition, displacement, stranded assets, chip imports, regulatory scramble |
| **Outcomes** (`outcomes.html`) | Best-case vs. worst-case scenarios for India by 2030 |
| **References** (`references.html`) | Every source, linked and cited — KPMG, SBI, CEA, CWC, Down To Earth, Eco-Business, Scroll.in, and more |

---

## 🗺️ The Map

The home page features a **live interactive map** (Leaflet.js) of 10 major Indian data center hubs — Mumbai, Chennai, Hyderabad, Delhi NCR, Bengaluru, Pune, Visakhapatnam, Odisha, Jamnagar and Thane — color-coded by status:

- 🟢 **Operational** — live and running
- 🟡 **Under Construction** — actively being built
- 🔴 **Planned / Proposed** — announced, pending approval or construction

Each marker shows capacity (live + pipeline MW), operators, investment size, a sourced summary, and its citation. The map uses a premium dark basemap with glowing markers and hover popups.

---

## 📊 Key Figures (August 2026)

| Metric | Value |
|--------|-------|
| Installed data center capacity | **1.9 GW** (FY26) |
| Announced pipeline (next 5 years) | **4.5 GW** |
| Projected capacity by 2030 | **12 GW** |
| India's total power capacity | **533 GW** |
| Data centers' share of national grid | **0.36%** today, ~1.4% by 2030 |
| India's total annual water resources | **2,116 BCM** |
| Data centers' share of total water | **~0.007%** nationally |
| Facilities in water-stressed regions | **~75%** |
| Announced AI infrastructure investment | **US $150B+** |

---

## 🛠️ Tech Stack

Plain HTML/CSS/JS — no build step, no framework, no backend.

- **Tailwind CSS** (CDN) — utility-first styling
- **Leaflet.js** (CDN) — interactive maps
- **Chart.js** (CDN) — capacity, water, and national-comparison charts
- **Inter** (Google Fonts) — typography
- **`data.js`** — the entire editable dataset as plain JavaScript objects

---

## ✏️ Updating the Data

All facts live in [`data.js`](./data.js) as plain JavaScript objects — no database, no build step. To add or correct a hub:

1. Edit `DATA_CENTERS` in `data.js` (add lat/lng, operators, capacity, status, a sourced note, and a `source` citation).
2. Update `NATIONAL_STATS`, `INDIA_POWER`, `INDIA_WATER`, `CAPACITY_TIMELINE`, or `WATER_TIMELINE` if you have newer figures.
3. Open a pull request. **Please include a source link for any new figure.**

---

## 🚀 Deployment

This repo deploys automatically to **GitHub Pages** on every push to `main` (Settings → Pages → Deploy from branch → `main` / root).

To deploy elsewhere for free:
- **Vercel / Netlify:** import this GitHub repo directly — no build command needed (static site), output directory `/`.
- **Cloudflare Pages:** same — connect the repo, no build command, publish directory `/`.

---

## ⚠️ Disclaimer

This is an independent, open-source community-awareness project. It is **not** affiliated with any data center operator, Indian government body, or the original Brockovich Data Center Reporting initiative. Figures are best-effort estimates compiled from public sources and may contain errors — corrections are welcome via GitHub issues or pull requests.

---

## 📄 License

MIT — free to use, fork, and adapt with attribution.
