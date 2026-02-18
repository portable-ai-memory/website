# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Documentation website for **Portable AI Memory (PAM)** — an open, vendor-neutral interchange format for AI user
memories. Built with Astro + Starlight, deployed to Cloudflare Pages at `portable-ai-memory.org`.

## Build Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server
npm run build        # production build (output: dist/)
npm run preview      # preview production build
```

## Architecture

- **Stack**: Astro + Starlight (static site, no SSR)
- **Content**: Markdown/MDX files under `src/content/docs/` following Starlight conventions
- **Sidebar/nav**: Configured in `astro.config.mjs`
- **Static assets**: `public/schemas/` serves the 3 JSON Schema files; `public/_redirects` for Cloudflare Pages
  redirects
- **Source content**: `content-source/` is a git submodule pointing to the spec repo (`portable-ai-memory`) — website
  content under `src/content/docs/` is derived from it

## Key Constraints

- **Never invent spec content** — all technical details come from `content-source/` files (spec.md, schemas,
  importer-mappings.md, examples)
- SHA-256 hashes must be computed per spec Section 6 normalization: trim → lowercase → NFC normalize → collapse
  whitespace → sha256 hex digest
- Schema descriptions must be extracted from schema files' own `description` fields
- Provider mappings must be extracted from `content-source/importer-mappings.md`
- No marketing language, analytics, tracking, or commercial tone — this is a technical standard
- Dual license: spec text is CC BY 4.0, schemas and code are Apache 2.0
- Do not reference GINES or any specific product in website content (the spec author attribution is fine)
- Do not claim native provider support — always "SDK Converters" / "observed formats"

## Site Config

- `site: 'https://portable-ai-memory.org'` in Astro config
- `output: 'static'`
- `/spec` redirects to `/spec/v1.0`
- `/schema` redirects to `/schema/overview`
