#!/usr/bin/env node
// Generates dist/_headers with SHA-256 hashes for inline scripts in the CSP.
// Must run AFTER `astro build` so dist/ HTML files exist.

import {readFileSync, writeFileSync, readdirSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {createHash} from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist');
const HEADERS_SRC = join(ROOT_DIR, 'public/_headers');
const HEADERS_OUT = join(DIST_DIR, '_headers');

function walkHtml(dir) {
    const files = [];
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) files.push(...walkHtml(full));
        else if (entry.name.endsWith('.html')) files.push(full);
    }
    return files;
}

function getInlineScriptHashes() {
    const hashes = new Set();
    const re = /<script\b[^>]*>([^<]+)<\/script>/g;

    for (const file of walkHtml(DIST_DIR)) {
        const html = readFileSync(file, 'utf8');
        let m;
        while ((m = re.exec(html)) !== null) {
            if (m[0].includes(' src=')) continue;
            const hash = createHash('sha256').update(m[1]).digest('base64');
            hashes.add(`'sha256-${hash}'`);
        }
    }
    return [...hashes].sort();
}

const hashes = getInlineScriptHashes();
console.log(`Found ${hashes.length} unique inline script hash(es)`);

const src = readFileSync(HEADERS_SRC, 'utf8');
const csp = src.replace(
    /script-src\s+'[^;]+/,
    `script-src 'self' 'wasm-unsafe-eval' ${hashes.join(' ')}`
);
writeFileSync(HEADERS_OUT, csp);
console.log('Generated: dist/_headers with CSP script hashes');
