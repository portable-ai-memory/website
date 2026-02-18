---
title: Microsoft / Copilot
description: PAM provider mapping for Microsoft Copilot exports
---

> *The mappings below reflect observed export structures as of February 2026, verified against a real export containing
4 CSV files from the Microsoft Privacy Dashboard. Microsoft does not natively support PAM. These mappings are
best-effort compatibility guidance. Provider export formats may change without notice. Importers MUST be versioned.*

## How to export

1. Go to the **Microsoft Privacy Dashboard** at [account.microsoft.com/privacy](https://account.microsoft.com/privacy)
2. Request a data export for Copilot activity
3. Download the export — it contains CSV files for different activity types

## Export files

| File                                         | Columns                                       | Description                                    |
|----------------------------------------------|-----------------------------------------------|------------------------------------------------|
| `copilot-activity-history.csv`               | `Conversation, Time, Author, Message`         | Main conversation history with full messages   |
| `copilot-chat-activity.csv`                  | `CreatedAt, MessageContent, Author, ChatName` | Chat-specific activity with conversation names |
| `copilot-in-Microsoft-365-apps-activity.csv` | `CreatedAt, MessageContent, Author, ChatName` | M365 app interactions (may be empty)           |
| `windows-apps-copilot-activity-history.csv`  | `Timestamp, ClientApp, Prompt`                | Windows app prompts only (no responses)        |

:::tip[What you get]
Conversation history from CSV files. No memories. No message IDs — UUIDs must be generated. The M365 file is frequently
empty.
:::

## Field mappings

### CSV format A: `copilot-activity-history.csv` (primary)

| CSV Column     | PAM field                  | Transform                                             |
|----------------|----------------------------|-------------------------------------------------------|
| `Conversation` | `title`                    | direct (conversation name/topic)                      |
| `Time`         | `created_at`               | parse ISO 8601 (`2026-02-17T14:36:11`)                |
| `Author`       | `role`                     | `"user"`→`"user"`, `"AI"`→`"assistant"`               |
| `Message`      | `content.text`             | direct                                                |
| —              | `provider.name`            | hardcode `"copilot"`                                  |
| —              | `provider.conversation_id` | generate from `Conversation` value + session grouping |

### CSV format B: `copilot-chat-activity.csv`

| CSV Column       | PAM field       | Transform                                   |
|------------------|-----------------|---------------------------------------------|
| `ChatName`       | `title`         | direct                                      |
| `CreatedAt`      | `created_at`    | parse `M/D/YYYY H:MM:SS +HH:MM` to ISO 8601 |
| `Author`         | `role`          | `"user"`→`"user"`, other→`"assistant"`      |
| `MessageContent` | `content.text`  | direct                                      |
| —                | `provider.name` | hardcode `"copilot"`                        |

:::caution[Two CSV column layouts]
`copilot-activity-history.csv` uses `Conversation/Time/Author/Message`, while `copilot-chat-activity.csv` uses
`CreatedAt/MessageContent/Author/ChatName`. Detect the layout by examining the header row.
:::

:::note[Import challenges]

- **Author values**: The activity-history format uses `"user"` and `"AI"`. The chat-activity format uses `"user"` and
  the assistant's display name. Map any non-`"user"` author to `role: "assistant"`.
- **No message IDs**: CSV exports contain no message or conversation IDs. Generate UUIDs and group messages by
  `Conversation`/`ChatName` value combined with time proximity.
- **Timestamp formats differ**: Use a flexible date parser (such as `dateutil`) and parse defensively.
- **Windows app CSV**: Only contains user prompts (no AI responses) — useful for prompt history but cannot produce
  complete conversations.
:::

## SDK Converters

PAM import support for Microsoft Copilot is provided by official SDK Converters maintained by the PAM project. See
the [Importing Guide](/interop/importing/) for general import instructions and
the [Provider Overview](/providers/overview/) for the full compatibility matrix.