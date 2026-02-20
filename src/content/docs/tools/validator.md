---
title: Validator
description: Validate PAM memory store, conversation, and embedding files against the official JSON Schemas
---

:::note[Online validator]
The browser-based PAM validator is planned for a future release.
:::

## Validate with the PAM SDK

The official [Python SDK](https://github.com/portable-ai-memory/python-sdk) is the recommended way to validate PAM files. It performs deep validation beyond schema compliance — verifying content hashes, cross-references, integrity blocks, and temporal consistency.

```bash
pip install 'portable-ai-memory[cli]'
pam validate memory-store.json
```

For programmatic usage, bundle validation, and all available options, see the [Validation Guide](/tools/validation-guide/).

### What the SDK validates

| Check | What it verifies |
|---|---|
| Schema compliance | Required fields, correct types, valid enums |
| Content hashes | Each `content_hash` matches actual content per [spec §6](/spec/v1.0/#6-content-hash-normalization) normalization |
| Integrity block | `total_memories` count and aggregate checksum |
| Cross-references | Relations, `conversation_ref`, `superseded_by`, and `derived_memories` point to existing objects |
| Temporal ordering | `created_at` ≤ `updated_at`, `valid_from` ≤ `valid_until` |
| ID uniqueness | No duplicate memory, relation, or conversation IDs |
| Custom types | `type='custom'` requires `custom_type` and vice versa |
| Status consistency | `superseded` status ↔ `superseded_by` field |
| Conversation DAG | Message `parent_id` and `children_ids` consistency |

### Without the SDK

If you can't use Python, you can validate against the JSON Schemas directly with any JSON Schema Draft 2020-12 validator. See the [Validation Guide](/tools/validation-guide/) for `jsonschema` and `ajv` examples. Manual validation only checks schema compliance.
