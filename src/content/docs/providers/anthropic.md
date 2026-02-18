---
title: Anthropic / Claude
description: PAM provider mapping for Anthropic Claude exports
---

> *The mappings below reflect observed export structures as of February 2026, verified against a real export containing
90 conversations and 5134 content parts. Anthropic does not natively support PAM. These mappings are best-effort
compatibility guidance. Provider export formats may change without notice. Importers MUST be versioned.*

## How to export

1. Go to **Claude Settings → Privacy → Export Data**
2. Download the ZIP file
3. Extract to find `conversations.json`, `memories.json`, `projects.json`, `users.json`

## Export files

| File                 | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| `conversations.json` | Array of conversation objects with `chat_messages`                                            |
| `memories.json`      | User memories — `conversations_memory` (string) and `project_memories` (dict of UUID to text) |
| `projects.json`      | Projects — `uuid`, `name`, `description`, `prompt_template`, `docs`, `creator`                |
| `users.json`         | Account info — `uuid`, `full_name`, `email_address`, `verified_phone_number`                  |

:::tip[What you get]
Full conversation history, user memories (conversations + project-specific), account info, and projects. Claude is one
of the most complete exports available.
:::

## Field mappings

### Conversation-level mapping

| Provider field | PAM field                  | Transform                 |
|----------------|----------------------------|---------------------------|
| `uuid`         | `provider.conversation_id` | direct                    |
| `name`         | `title`                    | direct                    |
| `summary`      | `raw_metadata.summary`     | preserve in raw_metadata  |
| `created_at`   | `temporal.created_at`      | direct (already ISO 8601) |
| `updated_at`   | `temporal.updated_at`      | direct                    |
| `account.uuid` | `provider.account_id`      | direct                    |
| —              | `provider.name`            | hardcode `"claude"`       |

### Message-level mapping

| Provider field                | PAM field                 | Transform                                                       |
|-------------------------------|---------------------------|-----------------------------------------------------------------|
| `chat_messages[].uuid`        | `provider_message_id`     | direct                                                          |
| `chat_messages[].uuid`        | `id`                      | generate UUID or use original                                   |
| `chat_messages[].sender`      | `role`                    | `"human"`→`"user"`, `"assistant"`→`"assistant"`                 |
| `chat_messages[].text`        | `content.text`            | direct                                                          |
| `chat_messages[].content`     | `content.parts[]`         | if non-empty, map to multipart (see content type mapping below) |
| `chat_messages[].created_at`  | `created_at`              | direct (already ISO 8601)                                       |
| `chat_messages[].updated_at`  | `raw_metadata.updated_at` | preserve in raw_metadata                                        |
| `chat_messages[].attachments` | `attachments`             | map each to Attachment object                                   |
| `chat_messages[].files`       | `attachments`             | merge with attachments array                                    |
| —                             | `parent_id`               | `null` (Claude conversations are linear)                        |
| —                             | `children_ids`            | `[]` (Claude conversations are linear)                          |

### Content type mapping

Claude's `content[]` array contains structured blocks with a `type` field. Five types have been observed:

| Provider `content[].type` | PAM `ContentPart.type` | Key fields                                     | Transform                                                                                                                 |
|---------------------------|------------------------|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `text`                    | `text`                 | `text`, `citations[]`                          | Map `text` directly. Map `citations[]` to message-level `citations[]`.                                                    |
| `thinking`                | `text`                 | `thinking`, `summaries[]`, `cut_off`           | Map `thinking` to `text`. Set `is_thought: true` on the message. Preserve `summaries` and `cut_off` in `raw_metadata`.    |
| `tool_use`                | —                      | `name`, `input`, `id`                          | Map to message-level `tool_calls[]` with `name`, `input`, `id`.                                                           |
| `tool_result`             | —                      | `tool_use_id`, `name`, `content[]`, `is_error` | Map to a `tool` role message. Nested `content[]` may contain `knowledge` type with `title`, `url` — map to `citations[]`. |
| `token_budget`            | —                      | (no useful data)                               | Discard. Internal Claude token management.                                                                                |

All content parts may include `start_timestamp`, `stop_timestamp` (per-part timing) and `flags` (observed always as
`null`). Preserve in `raw_metadata` if needed.

#### `tool_use` example

```json
{
  "type": "tool_use",
  "name": "web_search",
  "input": { "query": "..." },
  "id": null,
  "message": "Searching the web"
}
```

Maps to PAM `tool_calls[]`:

```json
{
  "name": "web_search",
  "input": { "query": "..." },
  "id": null
}
```

#### `tool_result` example

```json
{
  "type": "tool_result",
  "tool_use_id": null,
  "name": "web_search",
  "content": [
    {
      "type": "knowledge",
      "title": "Page Title",
      "url": "https://example.com"
    }
  ],
  "is_error": false
}
```

Nested `content[].type: "knowledge"` items map to PAM `citations[]`:

```json
{
  "title": "Page Title",
  "url": "https://example.com"
}
```

### Memories mapping

`memories.json` contains a single-element array with the following fields:

| Provider field         | PAM target                     | Transform                                                                                                                                                                  |
|------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conversations_memory` | `memories[]` (type: `context`) | Parse string into individual memories. This is a single block of text — split heuristically or store as one memory.                                                        |
| `project_memories`     | `memories[]` (type: `project`) | Each key is a project UUID, value is structured text with sections (Purpose, Current state, Key learnings, Tools). Parse sections or store as a single memory per project. |
| `account_uuid`         | `owner.id` or cross-reference  | Links to `users.json[].uuid`                                                                                                                                               |

:::caution[Common import bugs]

- The message array field is `chat_messages`, not `messages` — this is a frequent source of errors
- Sender values are `"human"` and `"assistant"`, not `"user"` and `"assistant"` — normalize `"human"` to `"user"`
- Both `attachments[]` and `files[]` exist on messages and may contain different data — merge both into PAM
  `attachments[]`
:::

:::note[Linear conversations]
Claude conversations do not branch. No DAG traversal is needed. Set `parent_id: null` and `children_ids: []` for all
messages. The `summary` field (AI-generated overview) is not present on all conversations — preserve in `raw_metadata`.
:::

## SDK Converters

PAM import support for Claude is provided by official SDK Converters maintained by the PAM project. See
the [Importing Guide](/interop/importing/) for general import instructions and
the [Provider Overview](/providers/overview/) for the full compatibility matrix.