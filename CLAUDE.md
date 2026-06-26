# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing + documentation website for **ChanGPT** ("帶點禪味的 AI" — a Zen-flavored Buddhist Q&A / semantic-search AI product). It is a [Docusaurus 3](https://docusaurus.io/) static site, **not** the product app itself (the app lives at `app.changpt.org`). Content is primarily Traditional Chinese (`zh-Hant` is the only locale); keep that voice when editing user-facing copy.

## Commands

The README uses `yarn`, but there is no committed `yarn.lock` — only `package-lock.json`, so this is an npm project. Use npm:

```bash
npm install          # install deps (Node >= 20)
npm start            # dev server with live reload (docusaurus start)
npm run build        # static build into build/  (onBrokenLinks: 'warn' — broken internal links warn, do not fail the build)
npm run serve        # serve the built site locally
npm run clear        # clear the .docusaurus cache (use when the dev server behaves oddly)
npm run deploy       # build + push to gh-pages (GitHub Pages). Needs GIT_USER=<user> or USE_SSH=true
```

There are no tests or linters configured. `build` is the de-facto correctness check: it type-checks config via `// @ts-check` JSDoc and throws on any broken internal link.

## Architecture

Standard Docusaurus classic-preset layout. Three content surfaces, each sourced differently:

- **Docs** (`docs/`) — Markdown rendered through the sidebar in `sidebars.js`. The sidebar is hand-curated (`docsSidebar`: intro, then a "Partner API" category of `partner_api` + `api_reference`); adding a doc file does **not** auto-add it to the sidebar. Doc ids/titles come from front-matter.
- **Blog** (`blog/`) — date-prefixed Markdown posts (`YYYY-MM-DD-slug.md`), with `authors.yml` and `tags.yml`. RSS/Atom feeds are generated.
- **Pages** (`src/pages/`) — `index.js` is the React homepage; `demo.md` and `research.md` are standalone Markdown routes (`/demo`, `/research`). Markdown files in `src/pages/` become routes directly, bypassing the docs sidebar.

Site-wide config lives in **`docusaurus.config.js`**: title/tagline, navbar, footer, the `zh-Hant` locale, fonts, and SEO metadata. Navbar/footer links are defined here — when you add or rename a page, update the links here too or you risk a broken-link build failure.

### Homepage composition

`src/pages/index.js` (`Home`) renders, in order:
1. `HomepageHero` (inline in `index.js`) — enso logo + wordmark + CTA buttons.
2. `HomepageFeatures` (`src/components/HomepageFeatures/index.js`) — the **four brand pillars** (禪意智慧 / AI 技術 / 佛法經典 / 慈悲關懷), driven by the `FeatureList` array with gold PNG icons from `static/img/feat-*.png`.
3. `ExploreSection` (inline in `index.js`) — three link cards (Docs / Research / Demo), driven by an inline `items` array.

Feature/explore content is data arrays inside these components — edit the arrays, not JSX, to change cards. Styling is CSS Modules (`*.module.css`) plus the brand theme in `src/css/custom.css`. Copy and visual design trace back to a "ChanGPT brand sheet" (see commit `9e80a0d`); preserve the ink + gold palette and Zen tone.

### Static assets & API examples

`static/` is copied verbatim to the site root. Notably `static/examples/partner_api/` holds runnable Python samples (`client.py`, `demo*.py`, `requirements.txt`) for ChanGPT's **OpenAI-compatible Partner API** (OAuth 2.0 auth, threads, SSE streaming). The docs link to these by pathname (e.g. `pathname:///examples/partner_api/README.md`); keep the example files and the prose in `docs/partner_api.md` / `docs/api_reference.md` in sync. `build/` and `.docusaurus/` are generated and gitignored — never edit them.
