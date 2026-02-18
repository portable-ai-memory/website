---
title: Conversations Schema
description: The PAM normalized conversation schema — standardized structure for imported chat histories
---

The Conversations schema defines the normalized format for provider-agnostic conversation storage. Raw provider
exports (OpenAI, Anthropic, Google, Microsoft, xAI) are parsed and normalized into this format. Conversations stored in
this format are referenced by `conversations_index` in the memory store.

This format preserves the full message graph including branching (DAG) from providers like OpenAI.

## Download

[portable-ai-memory-conversation.schema.json](/schemas/portable-ai-memory-conversation.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

### Required

| Field            | Type                            | Description                                                                            |
|------------------|---------------------------------|----------------------------------------------------------------------------------------|
| `schema`         | `string`                        | MUST be `"portable-ai-memory-conversation"`                                            |
| `schema_version` | `string`                        | Schema version. MUST match the memory-store schema version                             |
| `id`             | `string`                        | Unique conversation identifier. SHOULD be UUID v4. Referenced by `conversations_index` |
| `provider`       | [`ProviderInfo`](#providerinfo) | Source provider information and original identifiers                                   |
| `temporal`       | `object`                        | Timestamps. Required field: `created_at` (ISO 8601). Optional: `updated_at`            |
| `messages`       | [`Message[]`](#message)         | Array of normalized messages                                                           |

### Optional

| Field                | Type                                | Default | Description                                                                           |
|----------------------|-------------------------------------|---------|---------------------------------------------------------------------------------------|
| `title`              | `string \| null`                    | `null`  | Human-readable conversation title from provider export                                |
| `participants`       | [`Participant[]`](#participant)     | `[]`    | Participants — typically user + assistant, may include system or tool                 |
| `model`              | `string \| null`                    | `null`  | Primary model used (e.g., `gpt-4o`, `claude-3-opus-20240229`). May change per-message |
| `system_instruction` | `string \| null`                    | `null`  | System prompt or instruction active for this conversation                             |
| `is_archived`        | `boolean`                           | `false` | Whether archived by the user in the source platform                                   |
| `tags`               | `string[]`                          | `[]`    | Tags or topics. Pattern: `^[a-z0-9][a-z0-9_-]*$`                                      |
| `raw_metadata`       | `object`                            | `{}`    | Provider-specific metadata preserved verbatim. Not interpreted by PAM                 |
| `import_metadata`    | [`ImportMetadata`](#importmetadata) | —       | Metadata about the import process                                                     |

## Definitions

### ProviderInfo

Source provider information. Preserves original identifiers for traceability.

| Field                   | Type             | Required | Description                                                                                                                                                                           |
|-------------------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                  | `string`         | yes      | Provider identifier. MUST use product names (`chatgpt`, `claude`, `gemini`, `copilot`, `grok`), not company names. Same namespace as `provenance.platform` in the memory-store schema. Pattern: `^[a-z0-9_-]{2,32}$` |
| `conversation_id`       | `string \| null` | no       | Original conversation ID from the provider export                                                                                                                                     |
| `account_id`            | `string \| null` | no       | User account ID on the provider platform                                                                                                                                              |
| `export_format_version` | `string \| null` | no       | Version of the provider export format (e.g., `2025-01-export`). Used to select the correct parser                                                                                     |

### Participant

| Field         | Type             | Required | Description                                      |
|---------------|------------------|----------|--------------------------------------------------|
| `role`        | `string`         | yes      | `"user"`, `"assistant"`, `"system"`, or `"tool"` |
| `name`        | `string \| null` | no       | Display name if available                        |
| `provider_id` | `string \| null` | no       | Provider-specific participant identifier         |

### Message

A single normalized message. For linear conversations, messages are in chronological order. For branching
conversations (e.g., OpenAI), use `parent_id` and `children_ids` to reconstruct the DAG.

#### Required fields

| Field        | Type     | Description                                                                                                                                                                                                        |
|--------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`         | `string` | Unique message ID within this conversation. SHOULD be UUID v4                                                                                                                                                      |
| `role`       | `string` | Normalized role: `"user"`, `"assistant"`, `"system"`, `"tool"`. Provider-specific values are mapped (e.g., `human` → `user`, `AI` → `assistant`). See [Provider Mappings](/providers/overview/) for the full table |
| `created_at` | `string` | ISO 8601 timestamp. Converted from provider format (Unix epoch for OpenAI, ISO for others)                                                                                                                         |

#### Optional fields

| Field                 | Type                                | Default | Description                                                                                                       |
|-----------------------|-------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------|
| `provider_message_id` | `string \| null`                    | `null`  | Original message ID from the provider export                                                                      |
| `content`             | [`MessageContent`](#messagecontent) | —       | Message content. May be text or multipart                                                                         |
| `parent_id`           | `string \| null`                    | `null`  | Parent message ID for DAG reconstruction. `null` for root messages                                                |
| `children_ids`        | `string[]`                          | `[]`    | Child message IDs. Multiple children indicate branching                                                           |
| `model`               | `string \| null`                    | `null`  | Model that generated this message (assistant messages)                                                            |
| `is_thought`          | `boolean`                           | `false` | Internal thinking/reasoning step (Gemini `isThought`, Claude extended thinking). Not part of visible conversation |
| `token_count`         | `integer \| null`                   | `null`  | Token count if available from provider                                                                            |
| `attachments`         | [`Attachment[]`](#attachment)       | `[]`    | Files, images, or other attachments                                                                               |
| `citations`           | [`Citation[]`](#citation)           | `[]`    | Citations or sources referenced by this message                                                                   |
| `tool_calls`          | [`ToolCall[]`](#toolcall)           | `[]`    | Tool/function calls made by the assistant                                                                         |
| `raw_metadata`        | `object`                            | `{}`    | Provider-specific metadata preserved verbatim                                                                     |

### MessageContent

Normalized message content. Supports both simple text and multipart content.

| Field   | Type                            | Required | Description                                                                    |
|---------|---------------------------------|----------|--------------------------------------------------------------------------------|
| `type`  | `string`                        | yes      | `"text"` (content in `text` field) or `"multipart"` (content in `parts` array) |
| `text`  | `string \| null`                | no       | Simple text content. Used when `type` is `"text"`                              |
| `parts` | [`ContentPart[]`](#contentpart) | no       | Array of content parts. Used when `type` is `"multipart"`                      |

### ContentPart

A single part of multipart content.

| Field       | Type             | Required | Description                                                   |
|-------------|------------------|----------|---------------------------------------------------------------|
| `type`      | `string`         | yes      | `"text"`, `"image"`, `"code"`, `"file"`, `"audio"`, `"video"` |
| `text`      | `string \| null` | no       | Text content (for `text` and `code` parts)                    |
| `language`  | `string \| null` | no       | Programming language (for `code` parts)                       |
| `mime_type` | `string \| null` | no       | MIME type (for binary content parts)                          |
| `ref`       | `string \| null` | no       | Reference to external file (path, URL, or storage ref)        |

### Attachment

File or media attachment on a message.

| Field         | Type              | Required | Description                                             |
|---------------|-------------------|----------|---------------------------------------------------------|
| `type`        | `string`          | yes      | `"file"`, `"image"`, `"audio"`, `"video"`, `"document"` |
| `name`        | `string \| null`  | no       | Original filename                                       |
| `mime_type`   | `string \| null`  | no       | MIME type                                               |
| `size_bytes`  | `integer \| null` | no       | File size in bytes                                      |
| `ref`         | `string \| null`  | no       | Reference to the stored file                            |
| `provider_id` | `string \| null`  | no       | Provider-specific attachment identifier                 |

### Citation

A citation or source referenced by a message.

| Field     | Type             | Required | Description                      |
|-----------|------------------|----------|----------------------------------|
| `title`   | `string \| null` | no       | Title of the cited source        |
| `url`     | `string \| null` | no       | URL of the cited source          |
| `snippet` | `string \| null` | no       | Relevant excerpt from the source |

### ToolCall

A tool or function call made by the assistant.

| Field    | Type                       | Required | Description                         |
|----------|----------------------------|----------|-------------------------------------|
| `id`     | `string \| null`           | no       | Tool call identifier                |
| `name`   | `string`                   | yes      | Name of the tool or function called |
| `input`  | `object \| string \| null` | no       | Input parameters passed to the tool |
| `output` | `string \| null`           | no       | Output returned by the tool         |

### ImportMetadata

Metadata about the import process. Enables debugging and re-import.

| Field              | Type             | Required | Description                                                           |
|--------------------|------------------|----------|-----------------------------------------------------------------------|
| `importer`         | `string \| null` | no       | Importer system identifier. Format: `system/version`                  |
| `importer_version` | `string \| null` | no       | Provider-specific importer version (e.g., `openai-importer/2025.01`)  |
| `imported_at`      | `string \| null` | no       | ISO 8601 timestamp of import                                          |
| `source_file`      | `string \| null` | no       | Original source file path or identifier                               |
| `source_checksum`  | `string \| null` | no       | SHA-256 of the original source file. Pattern: `^sha256:[a-f0-9]{64}$` |

## Related

- [Conversation Example](/examples/conversation/)
- [Provider Mappings](/providers/overview/) — Field-by-field mapping from each provider
- [Spec §25](/spec/v1.0/#25-normalized-conversation-format) — Normative format definition