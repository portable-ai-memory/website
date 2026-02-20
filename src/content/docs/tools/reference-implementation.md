---
title: Reference Implementation
description: Overview of the PAM reference implementation and its capabilities
---

The PAM reference implementation is delivered as **language-specific SDKs**. The [Python SDK](https://github.com/portable-ai-memory/python-sdk) is the first official release. Each SDK provides the capabilities defined in [spec §23](/spec/v1.0/#23-reference-implementation):

## Available capabilities

1. **Platform extractors** — Parse exports from ChatGPT, Claude, Gemini, Copilot, and Grok into PAM format. Auto-detect the provider's export format and map fields to the PAM schema.

2. **Converter** — Convert provider exports to PAM bundles with `pam convert`. Outputs valid, schema-compliant memory stores with computed content hashes and companion conversation files. See [SDK Converters](/tools/converters/) for details.

3. **Validator** — Deep validation with `pam validate` — goes beyond schema checks to verify content hashes, cross-references, temporal ordering, and integrity blocks. See [Validation Guide](/tools/validation-guide/) for details.

4. **Integrity checker** — Verify checksums and consistency rules (content hash normalization, integrity block checksums, ID uniqueness). Runs automatically as part of `pam validate --deep` (enabled by default).

5. **Inspector** — Inspect PAM files with `pam inspect` to get a summary of contents (memory counts by type, relations, conversations index, integrity status).

## Planned capabilities

- **Signature tools** — Sign and verify exports for authentication and tamper detection. Defined in [spec §23](/spec/v1.0/#23-reference-implementation) but not yet implemented.

## Install

```bash
pip install portable-ai-memory        # core SDK
pip install 'portable-ai-memory[cli]' # + CLI (pam command)
```

The [Python SDK](https://github.com/portable-ai-memory/python-sdk) serves as the canonical example of correct PAM handling.
