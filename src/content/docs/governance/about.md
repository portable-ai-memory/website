---
title: About PAM
description: Mission and design goals of Portable AI Memory
---

## Mission

Portable AI Memory (PAM) is an open specification for vendor-neutral AI memory interchange. It exists to give users
ownership and portability of the context that AI assistants build about them.

Today, every AI provider stores your preferences, skills, and context in a proprietary format that cannot be
transferred. PAM defines a common format so your memories can move with you — between ChatGPT, Claude, Gemini, Copilot,
local models, and any future provider.

## Design goals

PAM is designed to be:

- **JSON-based** — standard JSON, readable and writable by any programming language
- **Deterministic** — [content hashing](/interop/integrity/#per-memory-content-hash)
  and [canonicalization](/interop/integrity/#file-level-integrity-block) produce consistent, reproducible results
- **Verifiable** — SHA-256 hashes, integrity blocks,
  and [optional signatures](/interop/integrity/#cryptographic-signatures) enable tamper detection without a central
  authority
- **Extensible** —
  new [memory types](/schema/memory-store/#memorytype), [relation types](/schema/memory-store/#relationobject), and
  metadata fields can be added without breaking existing implementations
- **Provider-independent** — no dependency on any specific AI provider, platform, or service

## What PAM is not

- PAM is **not a runtime protocol** — it is a data interchange format. For runtime AI tool communication,
  see [MCP](https://modelcontextprotocol.io/)
- PAM is **not a storage specification** — it defines how memories are exchanged, not how they are stored internally.
  Implementations should use databases and must support export/import using PAM format
- PAM is **not affiliated with or endorsed by** any AI provider

## Governance

PAM is developed as an open-source project. Changes to the specification are proposed via GitHub issues, discussed
publicly, and merged via pull request after review. See [Contributing](/governance/contributing/) for how to participate
and the [Versioning Policy](/governance/versioning/) for how changes are managed.