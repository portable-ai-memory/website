---
title: OpenAI / ChatGPT
description: PAM provider mapping for OpenAI ChatGPT exports
---

> *The mappings below reflect observed export structures as of February 2026, verified against official OpenAI
documentation and community-verified export data. OpenAI does not natively support PAM. These mappings are best-effort
compatibility guidance. Provider export formats may change without notice. Importers MUST be versioned.*

## How to export

1. Go to **ChatGPT Settings → Data Controls → Export Data**
2. You'll receive an email with a download link
3. Download and extract the ZIP file

## Export files

| File                        | Description                                                 |
|-----------------------------|-------------------------------------------------------------|
| `conversations.json`        | All conversation history as a JSON array with DAG structure |
| `chat.html`                 | Human-readable version (renders JSON via client-side JS)    |
| `user.json`                 | Account metadata (id, email, phone, plan)                   |
| `message_feedback.json`     | Thumbs-up/down ratings with text descriptions               |
| `shared_conversations.json` | Conversations shared via public link                        |
| `tool_messages.json`        | Tool-related responses and metadata                         |
| `*.dat`                     | DALL-E image assets (actually PNG files with C2PA metadata) |

:::tip[What you get]
Full conversation history with DAG structure. No memories — ChatGPT memories are not included in the export as of
February 2026.
:::

## Field mappings

### Conversation-level mapping

| Provider field | PAM field                  | Transform                                       |
|----------------|----------------------------|-------------------------------------------------|
| `id`           | `provider.conversation_id` | direct                                          |
| `title`        | `title`                    | direct                                          |
| `create_time`  | `temporal.created_at`      | `datetime.fromtimestamp(v, tz=UTC).isoformat()` |
| `update_time`  | `temporal.updated_at`      | `datetime.fromtimestamp(v, tz=UTC).isoformat()` |
| —              | `provider.name`            | hardcode `"chatgpt"`                            |

### Message-level mapping

Messages are in `mapping[message_id]`, not a flat array. Traverse by following `parent` and `children` references.

| Provider field                            | PAM field                           | Transform                                                                |
|-------------------------------------------|-------------------------------------|--------------------------------------------------------------------------|
| `mapping[k].id`                           | `provider_message_id`               | direct                                                                   |
| `mapping[k].id`                           | `id`                                | generate UUID or use original                                            |
| `mapping[k].parent`                       | `parent_id`                         | map provider ID to PAM ID                                                |
| `mapping[k].children`                     | `children_ids`                      | map provider IDs to PAM IDs                                              |
| `mapping[k].message.author.role`          | `role`                              | `user`→`user`, `assistant`→`assistant`, `system`→`system`, `tool`→`tool` |
| `mapping[k].message.content.content_type` | `content.type`                      | `"text"`→`"text"`, `"multimodal_text"`→`"multipart"`                     |
| `mapping[k].message.content.parts[]`      | `content.text` or `content.parts[]` | join parts for text, split for multipart                                 |
| `mapping[k].message.create_time`          | `created_at`                        | Unix epoch float → ISO 8601                                              |
| `mapping[k].message.metadata.model_slug`  | `model`                             | direct if present                                                        |

:::caution[DAG structure]
The `mapping` field is a graph, not a list. Some conversations have multiple root nodes or orphaned messages. Walk the
graph from root nodes, following `children` links. Entries where `message` is `null` are structural placeholders — skip
them.
:::

:::note[Timestamps and content]

- Some messages have `create_time: 0` or `null`. Use the conversation-level `create_time` as a fallback.
- `parts[]` may contain strings, dicts (for images), or `null` entries. Filter `null` values before processing.
- DALL-E image data is in `message.metadata` with a `request_id` linking to `*.dat` files in the export.
:::

## SDK Converters

PAM import support for ChatGPT is provided by official SDK Converters maintained by the PAM project. See
the [Importing Guide](/interop/importing/) for general import instructions and
the [Provider Overview](/providers/overview/) for the full compatibility matrix.