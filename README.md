# Portable AI Memory (PAM) — Documentation Website

Documentation website for the [Portable AI Memory (PAM)](https://portable-ai-memory.org) specification — an open, vendor-neutral interchange format for AI user memories.

PAM lets you export, migrate, and own your AI context across providers like ChatGPT, Claude, Gemini, Copilot, and others.

## Live Site

**[portable-ai-memory.org](https://portable-ai-memory.org)**

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Git](https://git-scm.com/) with submodule support

## Getting Started

```bash
# Clone with submodule (content-source)
git clone --recurse-submodules https://github.com/portable-ai-memory/website.git
cd website

# Install dependencies
npm install

# Start dev server (syncs schemas automatically)
npm run dev
```

The site will be available at `http://localhost:4321`.

## Build

```bash
npm run build        # production build (output: dist/)
npm run preview      # preview production build locally
```

The build automatically syncs schemas from the `content-source` submodule before compiling.

## Updating Content Source

The spec content comes from the [portable-ai-memory](https://github.com/portable-ai-memory/portable-ai-memory) repository via a git submodule at `content-source/`.

To pull the latest spec changes:

```bash
cd content-source
git pull origin master
cd ..

# Schemas sync automatically on next build/dev, but you can sync manually:
./scripts/sync-schemas.sh
```

## Project Structure

```
src/
├── content/docs/          # Markdown/MDX documentation pages
│   ├── getting-started/   # Quick start and FAQ
│   ├── spec/              # PAM specification v1.0
│   ├── schema/            # JSON Schema reference
│   ├── providers/         # Provider-specific guides (OpenAI, Anthropic, etc.)
│   ├── interop/           # Import/export and integrity
│   ├── examples/          # PAM file examples
│   ├── tools/             # SDK converters and validator
│   ├── governance/        # About, license, contributing, versioning
│   └── pt-br/             # Portuguese (Brazil) translations
├── components/            # Astro components (diagrams, cards)
└── styles/                # Custom CSS (design tokens in custom.css)
public/
├── schemas/               # JSON Schema files (synced from content-source)
├── _headers               # Cloudflare Pages security headers
└── _redirects             # Cloudflare Pages redirects
scripts/
└── sync-schemas.sh        # Schema sync script (runs automatically on build)
content-source/            # Git submodule — spec repo
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes
4. Verify the build passes: `npm run build`
5. Commit and push: `git push origin my-feature`
6. Open a Pull Request

For content and spec contributions, see the [contributing guide](https://portable-ai-memory.org/governance/contributing/).

## Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) — static site generation
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting and deployment
- Languages: English (default), Portuguese (Brazil)

## License

- **Specification text**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **JSON schemas, code, and website**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

See [LICENSE](./LICENSE) for details.

## Links

- [Specification](https://portable-ai-memory.org/spec/v1.0/)
- [JSON Schema Reference](https://portable-ai-memory.org/schema/overview/)
- [GitHub — Spec Repository](https://github.com/portable-ai-memory/portable-ai-memory)
