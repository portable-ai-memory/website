#!/usr/bin/env node
// Generates llms.txt (index) and llms-full.txt (full content) from English docs.
// Reads sidebar structure from src/sidebar.mjs as the single source of truth.

import {readFileSync, writeFileSync, existsSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {sidebar} from '../src/sidebar.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const DOCS_DIR = join(ROOT_DIR, 'src/content/docs');
const OUTPUT_DIR = join(ROOT_DIR, 'public');
const SITE_URL = 'https://portable-ai-memory.org';

// --- Helpers ---

function slugToFile(slug) {
    // slug: "spec/v1.0" -> file: "spec/v1-0.md" or "spec/v1-0.mdx"
    const normalized = slug.replace(/\./g, '-');
    for (const ext of ['.md', '.mdx']) {
        const path = join(DOCS_DIR, normalized + ext);
        if (existsSync(path)) return path;
    }
    return null;
}

function slugToUrl(slug) {
    return `${SITE_URL}/${slug}/`;
}

function getFrontmatterField(content, field) {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return '';
    const line = fmMatch[1].split('\n').find(l => l.startsWith(field + ':'));
    if (!line) return '';
    return line.slice(field.length + 1).trim().replace(/^['"]|['"]$/g, '');
}

function stripFrontmatter(content) {
    return content.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^import .*\n/gm, '');
}

// --- Generate ---

function generate() {
    let index = `# Portable AI Memory (PAM)

> An open, vendor-neutral interchange format for AI user memories. Export, migrate, and own your AI context across providers.

PAM defines a JSON-based format that lets users move their AI memories between assistants like ChatGPT, Claude, Gemini, Copilot, and others. Think vCard for AI memories.

`;
    let full = `# Portable AI Memory (PAM) — Full Documentation

> An open, vendor-neutral interchange format for AI user memories. Export, migrate, and own your AI context across providers.

`;

    for (const section of sidebar) {
        const slugs = section.items
            .map(item => item.slug)
            .filter(slug => slug !== 'index');

        if (slugs.length === 0) continue;

        index += `## ${section.label}\n\n`;

        for (const slug of slugs) {
            const filePath = slugToFile(slug);
            if (!filePath) {
                console.warn(`Warning: no file found for slug "${slug}"`);
                continue;
            }

            const content = readFileSync(filePath, 'utf8');
            const title = getFrontmatterField(content, 'title');
            const desc = getFrontmatterField(content, 'description');
            const url = slugToUrl(slug);

            if (!title) continue;

            // Index entry
            index += `- [${title}](${url}): ${desc}\n`;

            // Full content entry
            full += `---\n\n## ${title}\n\nSource: ${url}\n\n${stripFrontmatter(content)}\n`;
        }

        index += '\n';
    }

    writeFileSync(join(OUTPUT_DIR, 'llms.txt'), index);
    console.log('Generated: llms.txt');

    writeFileSync(join(OUTPUT_DIR, 'llms-full.txt'), full);
    console.log('Generated: llms-full.txt');
}

generate();
