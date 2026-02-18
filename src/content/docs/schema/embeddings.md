---
title: Embeddings Schema
description: The PAM embeddings companion schema — structure for vector representations linked to memories
---

The Embeddings schema defines an optional companion file for vector embeddings associated with memory objects. Memory
objects reference embeddings via the `embedding_ref` field. Embeddings MAY be regenerated from memory content at any
time using any model — the `content` field in the memory object is always the authoritative source of semantic content,
never the embedding.

## Download

[portable-ai-memory-embeddings.schema.json](/schemas/portable-ai-memory-embeddings.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

| Field            | Type                                    | Required | Description                                                |
|------------------|-----------------------------------------|----------|------------------------------------------------------------|
| `schema`         | `string`                                | yes      | MUST be `"portable-ai-memory-embeddings"`                  |
| `schema_version` | `string`                                | yes      | Schema version. MUST match the memory-store schema version |
| `embeddings`     | [`EmbeddingObject[]`](#embeddingobject) | yes      | Array of embedding objects                                 |

## Definitions

### EmbeddingObject

A single embedding vector associated with a memory object. Each memory MUST have at most one corresponding embedding —
the `memory_id` field MUST be unique across all embedding objects.

#### Required fields

| Field        | Type      | Description                                                                                      |
|--------------|-----------|--------------------------------------------------------------------------------------------------|
| `id`         | `string`  | Unique identifier. Referenced by `memory.embedding_ref` in the memory store                      |
| `memory_id`  | `string`  | ID of the associated memory object                                                               |
| `model`      | `string`  | Embedding model identifier (e.g., `text-embedding-3-small`, `voyage-3`, `nomic-embed-text-v1.5`) |
| `dimensions` | `integer` | Dimensionality of the embedding vector                                                           |
| `created_at` | `string`  | ISO 8601 timestamp of when this embedding was generated                                          |

#### Optional fields

| Field     | Type               | Default | Description                                                                                                                        |
|-----------|--------------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| `vector`  | `number[] \| null` | `null`  | The embedding vector. MAY be `null` if stored externally via `storage`                                                             |
| `storage` | `object \| null`   | `null`  | External storage reference. Required fields: `type` (`"file"`, `"database"`, `"object_storage"`, `"vector_db"`, `"uri"`) and `ref` |

## Normative Rules

These rules are defined in [spec §12](/spec/v1.0/#12-embeddings):

1. Embeddings MAY be omitted entirely from an export
2. When omitted, `embedding_ref` in memory objects MUST be `null`
3. Consumers MUST NOT fail if `embedding_ref` is `null` or if `embeddings.json` is missing
4. Consumers MAY regenerate embeddings from the `content` field at any time using any model
5. The `content` field is ALWAYS the authoritative source of semantic content, never the embedding
6. Each memory object MUST have at most one corresponding embedding — `memory_id` MUST be unique

## Related

- [With Embeddings Example](/examples/with-embeddings/)
- [Spec §12](/spec/v1.0/#12-embeddings) — Normative embedding rules