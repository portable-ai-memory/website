---
title: FAQ
description: Frequently asked questions about the Portable AI Memory format, compatibility, and usage
---

## What is PAM in one sentence?

PAM is an open JSON format that lets you move your AI memories (preferences, skills, context) between providers like
ChatGPT, Claude, Gemini, and any other AI tool.

## Is PAM a storage format?

No. PAM is an interchange format — it defines how memories are exported and imported between systems. It's not a
database schema or a runtime storage format. Think of it like vCard for contacts or iCalendar for events: a portable
representation that any system can read and write.

## How is PAM different from just exporting JSON from my provider?

Provider exports are proprietary and incompatible. ChatGPT's export has a different structure than Claude's, which is
different from Gemini's. None of them can be loaded into another provider.

PAM normalizes all of these into one consistent format with typed memories, provenance tracking, integrity hashes, and a
defined schema. A PAM file from ChatGPT looks exactly like a PAM file from Claude — that's what makes migration
possible. See [Provider Mappings](/providers/overview/) for the specific differences between provider formats.

## Does PAM require provider support?

No. PAM works via official SDK Converters that read provider export files. Providers do not need to natively support
PAM. You export your data using the provider's existing export feature, then an SDK Converter transforms it into PAM format.
See the [Interop Guide](/interop/importing/) for how converters work.

## What happens when a provider changes their export format?

Converters are versioned. Each converter declares which version of the provider's export format it supports. When a
format changes, a new converter version is created while the old one continues to work for older exports. The spec
requires importers to be versioned and resilient to format variations. See [Provider Mappings](/providers/overview/) for
current converter status.

## How do I export my data from ChatGPT, Claude, or Gemini?

Each provider has a different export process:

- **ChatGPT**: Settings → Data controls → Export data
- **Claude**: Settings → Account → Export data (provides `chat_messages` as JSON)
- **Gemini**: Via [Google Takeout](https://takeout.google.com/) selecting "Gemini Apps"
- **Copilot**: Via account data export or Microsoft Graph API

Detailed field-by-field mapping for each provider is in the [Providers](/providers/overview/) section.

## Can I edit my PAM file?

Yes. PAM files are plain JSON — you can open, read, edit, and delete anything with a text editor or any JSON tool. Want
to remove a memory the AI inferred incorrectly? Delete the entry. Want to correct something? Edit the `content` field
and recompute the `content_hash`. The format is designed to be human-readable and user-controlled.

## What memory types does PAM support?

The built-in types are: `fact`, `preference`, `skill`, `context`, `relationship`, `goal`, `instruction`, `identity`,
`environment`, and `project`. You can also define custom types by setting `type` to `"custom"` and providing a
`custom_type` field (e.g., `"custom_type": "medical_condition"`). See the [Specification](/spec/v1.0/) for the full
type definitions.

## What about my conversation history?

PAM handles conversations separately from memories. Conversations are stored as companion files using a normalized
format that supports features like branching (for providers like OpenAI that allow conversation branches) and multipart
content (text, code, images). They're referenced from the memory store via `conversations_index`. See
the [Conversations schema](/schema/conversations/) for details.

## Is PAM open?

Yes. The specification text is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). JSON schemas
and reference code are licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Everything is
on [GitHub](https://github.com/portable-ai-memory/portable-ai-memory).

## Can I use PAM locally?

Yes. PAM is a JSON format with no server dependency. You can create, validate, and read PAM files entirely offline using
standard JSON tooling. See the [Quick Start](/getting-started/quick-start/) to validate your first file in three steps.

## Is PAM production-ready?

The specification is at **v1.0 Published**. The JSON schemas validate against Draft 2020-12. Examples and provider
mappings
are documented. SDK Converters and a reference implementation are under development. The spec is ready for
implementation — the tooling is catching up.

## Why deterministic hashing?

Content hashes enable integrity verification without a central authority. Any party can independently verify that memory
content has not been tampered with by recomputing the hash using the spec's normalization rules (trim, lowercase, NFC
normalize, collapse whitespace, then SHA-256). This matters for trust — if you receive a PAM file, you can prove its
contents haven't been altered. See [Integrity Verification](/interop/integrity/) for the full process.

## How does PAM relate to MCP?

They are complementary. [MCP](https://modelcontextprotocol.io/) (Model Context Protocol) is a runtime protocol for AI
tool interaction — it defines how tools communicate in real-time. PAM is a data interchange format for persisted user
memory — it defines how memories are stored and transferred between systems. They solve different problems and can
coexist: an AI tool could use MCP for runtime operations and PAM for importing/exporting user context.

## How can I contribute?

PAM is community-driven. You can contribute by reporting issues, proposing spec changes, building SDK Converters, or
improving documentation. See [Contributing](/governance/contributing/) for details and
the [GitHub repository](https://github.com/portable-ai-memory/portable-ai-memory) for the source.