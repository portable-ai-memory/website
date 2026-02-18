---
title: Reference Implementation
description: Overview of the PAM reference implementation and its capabilities
---

:::caution[Coming Soon]
The PAM reference implementation is under development.
:::

The PAM reference implementation is delivered as **language-specific SDKs**. Each SDK provides the five capabilities
defined in [spec §23](/spec/v1.0/#23-reference-implementation):

## Capabilities

1. **Platform extractors** — Parse exports from ChatGPT, Claude, Gemini, Copilot, and Grok into PAM format. These extractors auto-detect the provider's export format and map fields to the PAM schema.

2. **Converter** — Convert provider exports to PAM format with auto-detection. The `pam convert` CLI tool processes exports and outputs valid, schema-compliant PAM memory stores with computed content hashes. See [Converters](/tools/converters/) for available SDKs, CLI usage, and programmatic API details.

3. **Validator** — Schema validation using the `pam validate` CLI command to verify memory stores conform to PAM schemas. See [Validation Guide](/tools/validation-guide/) for comprehensive validation details and rules.

4. **Integrity checker** — Verify checksums and consistency rules to ensure memory stores maintain data integrity and conform to all normalization requirements. See [Integrity & Signatures](/interop/integrity/) for details on validation, verification, and consistency checks.

5. **Signature tools** — Sign and verify exports with `pam sign` and `pam verify` commands to authenticate and ensure the authenticity of memory stores. See [Integrity & Signatures](/interop/integrity/) for cryptographic signing details.

The Python SDK is the first reference implementation and will serve as the canonical example of correct PAM handling.
