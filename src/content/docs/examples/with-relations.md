---
title: With Relations
description: Demonstrating semantic relationships between memories
---

PAM supports semantic relations between memories via the `relations` array. Each relation specifies a directional link
between two memories with a type and optional confidence score.

## Example

```json
{
  "schema": "portable-ai-memory",
  "schema_version": "1.0",
  "export_date": "2026-02-17T00:00:00Z",
  "owner": {
    "id": "user-123"
  },
  "memories": [
    {
      "id": "mem-001",
      "type": "skill",
      "content": "User is a cloud infrastructure engineer",
      "content_hash": "sha256:e1bae3ec291c99eced01fc91b4152a0cef541fccf2034fc11b3f90f4e4d79b6e",
      "temporal": { "created_at": "2026-02-15T00:00:00Z" },
      "provenance": { "platform": "chatgpt" }
    },
    {
      "id": "mem-002",
      "type": "preference",
      "content": "User prefers terraform over cloudformation",
      "content_hash": "sha256:85613bb561dda27606c3a2f3eb0e606f40f53af0fab0da60b2b95ed92ac1d890",
      "temporal": { "created_at": "2026-02-15T00:00:00Z" },
      "provenance": { "platform": "chatgpt" }
    }
  ],
  "relations": [
    {
      "id": "rel-001",
      "from": "mem-002",
      "to": "mem-001",
      "type": "derived_from",
      "confidence": 0.9,
      "created_at": "2026-02-15T00:00:00Z"
    }
  ]
}
```

## Relation Types

| Type           | Semantics                                                         |
|----------------|-------------------------------------------------------------------|
| `supports`     | Source provides evidence for target                               |
| `contradicts`  | Source conflicts with target (useful for tracking belief changes) |
| `extends`      | Source adds detail to target                                      |
| `supersedes`   | Source replaces target                                            |
| `related_to`   | General semantic relationship                                     |
| `derived_from` | Source was inferred from target                                   |

## Fields

| Field        | Type             | Required | Description                              |
|--------------|------------------|----------|------------------------------------------|
| `id`         | `string`         | yes      | Unique identifier for the relation       |
| `from`       | `string`         | yes      | Source memory ID                         |
| `to`         | `string`         | yes      | Target memory ID                         |
| `type`       | `string`         | yes      | Relation type (see above)                |
| `confidence` | `number \| null` | no       | Confidence in the relationship [0.0–1.0] |
| `created_at` | `string`         | yes      | ISO 8601 timestamp                       |

See [spec §13](/spec/v1.0/#13-relations) for full relation semantics.