---
title: xAI / Grok
description: PAM provider mapping for xAI Grok exports
---

> *The mappings below reflect observed export structures as of February 2026, verified against real export data. xAI
does
not natively support PAM. These mappings are best-effort compatibility guidance. Provider export formats may change
without notice. Importers MUST be versioned.*

## How to export

1. Go to **grok.com** → Account settings → **Download your data**
2. Download and extract the ZIP file

## Export files

The ZIP contains files under `ttl/30d/export_data/<user_uuid>/`:

| File                         | Description                                                        |
|------------------------------|--------------------------------------------------------------------|
| `prod-grok-backend.json`     | Main file: conversations, projects, tasks, media posts             |
| `prod-mc-auth-mgmt-api.json` | User profile and sessions                                          |
| `prod-mc-billing.json`       | Credits balance                                                    |
| `prod-mc-asset-server/`      | Uploaded files referenced by asset UUID (code, images, PDFs, etc.) |

:::tip[What you get]
Full conversation history with DAG structure, projects with custom personalities, and media posts. Asset files (uploads)
are stored as UUID-named directories containing a `content` file with no extension.
:::

## Field mappings

### Conversation-level mapping

Conversations are wrapped: each item is `{"conversation": {...}, "responses": [...]}`.

| Provider field                    | PAM field                         | Transform         |
|-----------------------------------|-----------------------------------|-------------------|
| `conversation.id`                 | `provider.conversation_id`        | direct            |
| `conversation.title`              | `title`                           | direct            |
| `conversation.create_time`        | `temporal.created_at`             | direct (ISO 8601) |
| `conversation.modify_time`        | `temporal.updated_at`             | direct (ISO 8601) |
| `conversation.user_id`            | `provider.account_id`             | direct            |
| `conversation.starred`            | `raw_metadata.starred`            | preserve          |
| `conversation.system_prompt_name` | `raw_metadata.system_prompt_name` | preserve          |
| —                                 | `provider.name`                   | hardcode `"grok"` |

### Message-level mapping

Each response is wrapped: `{"response": {...}, "share_link": {...}}`.

| Provider field                      | PAM field             | Transform                                                                                |
|-------------------------------------|-----------------------|------------------------------------------------------------------------------------------|
| `response._id`                      | `provider_message_id` | direct                                                                                   |
| `response._id`                      | `id`                  | generate UUID or use original                                                            |
| `response.parent_response_id`       | `parent_id`           | map provider ID → PAM ID                                                                 |
| —                                   | `children_ids`        | reconstruct by inverting parent_response_id                                              |
| `response.sender`                   | `role`                | see [Role Normalization](#role-normalization)                                            |
| `response.message`                  | `content.text`        | direct                                                                                   |
| `response.create_time`              | `created_at`          | BSON → `datetime.fromtimestamp(int(v["$date"]["$numberLong"])/1000, tz=UTC).isoformat()` |
| `response.model`                    | `model`               | direct                                                                                   |
| `response.cited_web_search_results` | `citations`           | map each `{url, title, preview}` to Citation `{url, title, snippet}` (`preview` → `snippet`) |
| `response.generated_image_urls`     | `attachments`         | map each URL to Attachment with `type: "image"`                                          |
| `response.file_attachments`         | `attachments`         | map each asset UUID                                                                      |
| `response.web_search_results`      | `raw_metadata.web_search_results`      | preserve                                                |
| `response.thinking_trace`          | `raw_metadata.thinking_trace`          | preserve                                                |
| `response.thinking_start_time`     | `raw_metadata.thinking_start_time`     | preserve                                                |
| `response.thinking_end_time`       | `raw_metadata.thinking_end_time`       | preserve                                                |
| `response.agent_thinking_traces`   | `raw_metadata.agent_thinking_traces`   | preserve                                                |
| `response.steps`                   | `raw_metadata.steps`                   | preserve (tool execution chain)                         |
| `response.query`                   | `raw_metadata.query`                   | preserve                                                |
| `response.query_type`              | `raw_metadata.query_type`              | preserve                                                |
| `response.xpost_ids`              | `raw_metadata.xpost_ids`              | preserve                                                |
| `response.webpage_urls`           | `raw_metadata.webpage_urls`           | preserve                                                |
| `response.card_attachments_json`  | `raw_metadata.card_attachments_json`  | preserve                                                |
| `response.error`                  | `raw_metadata.error`                  | preserve                                                |
| `response.metadata`               | `raw_metadata.grok_metadata`          | preserve (renamed to avoid collision)                   |

### Role normalization

Four distinct sender values have been observed: `"human"`, `"assistant"`, `"ASSISTANT"` (uppercase), and model names
such as `"grok-3"`. Normalization MUST be case-insensitive. Treat any value that is not `"human"` (case-insensitive)
as `"assistant"`.

| Provider value        | PAM normalized value |
|-----------------------|----------------------|
| `human`               | `user`               |
| `assistant`           | `assistant`          |
| `ASSISTANT`           | `assistant`          |
| `grok-3` (model name) | `assistant`          |
| any non-`human` value | `assistant`          |

### Timestamp handling

Grok uses **two different timestamp formats** within the same file:

| Level        | Format                                  | Transform                                                                         |
|--------------|-----------------------------------------|-----------------------------------------------------------------------------------|
| Conversation | ISO 8601                                | direct                                                                            |
| Message      | BSON `{"$date":{"$numberLong":"<ms>"}}` | `datetime.fromtimestamp(int(v["$date"]["$numberLong"])/1000, tz=UTC).isoformat()` |

Two separate parsers are needed for the same file.

## Critical notes

- **Wrapper nesting**: Every conversation is `{conversation, responses}` and every response is `{response, share_link}`.
  Must unwrap twice.
- **DAG structure**: `parent_response_id` is present on most messages. Supports branching conversations. `children_ids`
  must be reconstructed by inverting parent references.
- **Empty messages**: Some responses have `message: ""` (empty string). These are typically image generation responses
  where the content is in `generated_image_urls`.
- **Steps = tool use chain**: `steps[]` contains structured tool execution with `tagged_text` and
  `tool_usage_results`. This is Grok's equivalent of function calling. Preserve in `raw_metadata`.
- **Thinking traces**: Two mechanisms — `thinking_trace` (inline string) and `agent_thinking_traces[]` (array). Both may
  be present on the same response. Preserve in `raw_metadata`.
- **Asset files**: Uploads are stored as UUID-named directories in `prod-mc-asset-server/`, each containing a `content`
  file with no extension. Use content inspection to determine type.

## SDK Converters

PAM import support for Grok is provided by official SDK Converters maintained by the PAM project. See
the [Importing Guide](/interop/importing/) for general import instructions and
the [Provider Overview](/providers/overview/) for the full compatibility matrix.
