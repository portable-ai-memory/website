---
title: Google / Gemini
description: PAM provider mapping for Google Gemini exports
---

> *The mappings below reflect observed export structures verified against community-verified export data and Google
Takeout documentation. Google does not natively support PAM. These mappings are best-effort compatibility guidance.
Provider export formats may change without notice. Importers MUST be versioned.*

## How to export

1. Go to [takeout.google.com](https://takeout.google.com)
2. Deselect all, then select **My Activity → Gemini Apps**
3. Click "Multiple formats" and change the format from HTML to **JSON**
4. Request the export and download the resulting archive
5. The relevant file is at `Takeout/My Activity/Gemini Apps/MyActivity.json`

:::caution[Common mistake]
Select "My Activity → Gemini Apps", not a separate "Gemini" product listing. Selecting the wrong product produces an
empty or HTML-only export. The format must also be explicitly changed to JSON — the default is HTML.
:::

## Export files

| File                                              | Description                          |
|---------------------------------------------------|--------------------------------------|
| `Takeout/My Activity/Gemini Apps/MyActivity.json` | Single JSON array of activity events |

:::tip[What you get]
Conversation history reconstructed from activity events. No memories. Responses may be truncated or omitted entirely —
data loss in exported response content is expected.
:::

## Export structure

The Takeout format is an **activity log**, not a conversation archive. Each entry records a single interaction with a
timestamp and conversation URL. To reconstruct full conversations, an importer must group entries by conversation ID (
extracted from the `titleUrl` field) and sort by `time`.

## Field mappings

### Activity event mapping

Each array element is a single prompt-response exchange:

| Provider field | PAM field                  | Transform                                                   |
|----------------|----------------------------|-------------------------------------------------------------|
| `titleUrl`     | `provider.conversation_id` | extract conversation ID from URL path (`/app/c/<id>`)       |
| —              | `title`                    | extract from first user message per conversation, or `null` |
| `time`         | `created_at`               | direct (already ISO 8601)                                   |
| —              | `provider.name`            | hardcode `"gemini"`                                         |

### Message mapping — variant A (`details` array)

Some exports use a `details` array of named key-value pairs:

```json
{
  "header": "Gemini",
  "title": "Used Gemini Apps",
  "titleUrl": "https://gemini.google.com/app/c/<conversation_id>",
  "time": "2024-02-17T22:05:10.123Z",
  "products": ["Gemini Apps"],
  "details": [
    { "name": "Request", "value": "User prompt here" },
    { "name": "Response", "value": "Gemini response here" }
  ]
}
```

| Provider field    | PAM field      | Transform                                        |
|-------------------|----------------|--------------------------------------------------|
| `details[].value` | `content.text` | direct                                           |
| `details[].name`  | `role`         | `"Request"`→`"user"`, `"Response"`→`"assistant"` |

### Message mapping — variant B (`userInteractions` array)

Other exports use a `userInteractions` array with serialized JSON strings:

```json
{
  "header": "Gemini",
  "title": "Used Gemini Apps",
  "titleUrl": "https://gemini.google.com/app/c/<conversation_id>",
  "time": "2024-01-26T12:45:12.686Z",
  "products": ["Gemini Apps"],
  "userInteractions": [
    {
      "userInteraction": {
        "endpoint": 2,
        "request": "[{...}]",
        "response": "[{...}]"
      }
    }
  ]
}
```

| Provider field                                | PAM field      | Transform                                    |
|-----------------------------------------------|----------------|----------------------------------------------|
| `userInteractions[].userInteraction.request`  | `content.text` | parse JSON string, extract text              |
| `userInteractions[].userInteraction.response` | `content.text` | parse JSON string, extract text              |
| —                                             | `role`         | `request`→`"user"`, `response`→`"assistant"` |

:::caution[Two format variants]
Both `details` and `userInteractions` variants can appear in the same file. Detect per entry which variant is present.
The `title` field in each entry is always `"Used Gemini Apps"`, not a conversation title — generate a title from the
first user message instead.
:::

:::note[Data quality]

- Empty exports are common — having "Gemini App Activity" paused in Google account settings produces an empty file
- Gemini Takeout frequently truncates or omits response text entirely — this data loss cannot be recovered
- Each entry is a single exchange, not a full conversation — group by conversation ID from `titleUrl` and sort by `time`
:::

## SDK Converters

PAM import support for Gemini is provided by official SDK Converters maintained by the PAM project. See
the [Importing Guide](/interop/importing/) for general import instructions and
the [Provider Overview](/providers/overview/) for the full compatibility matrix.