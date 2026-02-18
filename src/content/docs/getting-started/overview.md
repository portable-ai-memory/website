---
title: Overview
description: How PAM is structured, what a memory looks like, and where to start
---

You've seen what PAM does — it lets you move your AI memories between providers. This page explains how the pieces fit
together so you know where to look when you need details.

## How PAM is structured

PAM is not one monolithic file. It's a small set of related JSON files:

```
memory-store.json          <- required, the root document
├── conversations/         <- optional companion files
│   ├── conversation-1.json
│   └── conversation-2.json
└── embeddings.json        <- optional companion file
```

**Memory Store** (`memory-store.json`) is the root document and the only required file. It contains all user memories —
preferences, skills, facts, experiences, goals, context. Each memory includes provenance (where it came from), temporal
data (when it was created or updated), and a content hash for integrity verification.

**Conversations** are companion files that hold normalized conversation history imported from providers. They're stored
separately because conversations are large and not always needed. The memory store references them via
`conversations_index`. Conversations support branching (DAG structure) for providers like OpenAI that allow conversation
branches.

**Embeddings** are an optional companion file containing vector embeddings for semantic search. They're separated by
design — not every consumer of PAM needs or supports embeddings. Keeping them separate means the core format stays
lightweight and tool-agnostic.

## Inside a memory

Each memory in the store is a JSON object. Here's a single entry:

```json
{
  "id": "mem-001",
  "type": "skill",
  "content": "User is a cloud infrastructure engineer",
  "content_hash": "sha256:e1bae3ec291c99eced01fc91b4152a0cef541fccf2034fc11b3f90f4e4d79b6e",
  "confidence": {
    "initial": 0.95,
    "current": 0.95,
    "decay_model": "none"
  },
  "temporal": {
    "created_at": "2026-02-15T00:00:00Z"
  },
  "provenance": {
    "platform": "chatgpt",
    "extraction_method": "llm_inference"
  }
}
```

- **type** — What kind of memory: `fact`, `preference`, `skill`, `context`, `relationship`, `goal`, `instruction`,
  `identity`, `environment`, `project`, or `custom` (with a `custom_type` field for extensibility)
- **content** — The human-readable memory text
- **content_hash** — SHA-256 of the normalized content (trim, lowercase, NFC normalize, collapse whitespace). Enables
  tamper detection without a central authority
- **confidence** — An object with `initial` and `current` scores (0.0–1.0), plus optional `decay_model` and
  `last_reinforced` timestamp
- **provenance** — Where this memory came from: which platform, and the `extraction_method` used (`llm_inference`,
  `explicit_user_input`, `api_export`, `browser_extraction`, or `manual`)

For the full list of fields, see the [Memory Store schema](/schema/memory-store/).

## Relations and integrity

**Relations** connect memories to each other. A memory can be `supports`, `contradicts`, `extends`, `supersedes`,
`related_to`, or `derived_from` relative to another. This creates a graph of knowledge, not just a flat list. Relations
use `from` and `to` fields referencing memory IDs. See the [spec section on relations](/spec/v1.0/#13-relations) for details.

**Integrity** works at two levels. Each memory has its own `content_hash` for individual verification. The full memory
store can also include a top-level `integrity` block that covers the entire file via
canonicalization ([JCS / RFC 8785](https://www.rfc-editor.org/rfc/rfc8785)). Anyone receiving a PAM file can verify
nothing was altered. See [Integrity Verification](/interop/integrity/) for the full process.

## Who uses PAM

**If you're building an AI tool** — implement PAM import to let users bring their context from other assistants.
Implement PAM export so users can leave without losing their data. Start with the [Schema](/schema/overview/)
and [Examples](/examples/overview/).

**If you're building SDK Converters** — write importers that transform provider exports (ChatGPT, Claude, Gemini) into PAM
format. See [Provider Mappings](/providers/overview/) for field-by-field guides and [Interop Guide](/interop/importing/)
for detection heuristics.

**If you're a user who wants control** — export your data from your AI provider, run it through an SDK Converter,
and you'll have a readable JSON file with everything the AI knew about you.
See [Quick Start](/getting-started/quick-start/).

## Next steps

- **[Quick Start](/getting-started/quick-start/)** — Validate your first PAM file in 3 steps
- **[Spec v1.0](/spec/v1.0/)** — Full technical specification with normative requirements
- **[Examples](/examples/overview/)** — Real PAM files from minimal to complete
- **[FAQ](/getting-started/faq/)** — Common questions about the format
