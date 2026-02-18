---
title: Provider Overview & Compatibility
description: PAM compatibility matrix showing supported fields and conversion status for each AI provider
---

> *The interoperability paths described here reflect observed export formats and extraction strategies as of February 2026. AI providers do not natively support PAM. Importers SHOULD treat these mappings as best-effort compatibility guidance. Provider export formats may change without notice. Importers MUST be versioned and resilient to format variations.*

## Supported providers

| Provider                                     | Export Method                      | PAM Coverage                          |
|----------------------------------------------|------------------------------------|---------------------------------------|
| [OpenAI / ChatGPT](/providers/openai/)       | `conversations.json` from Settings | Full: conversations (no memories)     |
| [Anthropic / Claude](/providers/anthropic/)  | JSON export from Settings          | Full: conversations and memories      |
| [Google / Gemini](/providers/google/)        | Google Takeout                     | Partial: conversations only           |
| [Microsoft / Copilot](/providers/microsoft/) | Privacy Dashboard CSV              | Partial: conversations only           |
| [xAI / Grok](/providers/grok/)               | Data export from grok.com          | Full: conversations, projects, assets |

All import paths use official SDK Converters maintained by the PAM project. Providers do not natively support PAM.

## How provider imports work

1. **Export** your data from the provider (see individual provider pages for instructions)
2. **Run** the SDK Converter for that provider
3. The converter **normalizes** the data into PAM format
4. **Validate** the output against the PAM schema

See the [Importing Guide](/interop/importing/) for the full pipeline and auto-detection algorithm.

:::note[Format version policy]
Provider export formats change without notice. All importers MUST be versioned:

1. Create a new importer version when a format changes (e.g., `openai-importer/2026.01`)
2. Keep old versions for re-processing older exports
3. Auto-detect format version when possible using schema differences or field presence
:::