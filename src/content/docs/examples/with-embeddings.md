---
title: With Embeddings
description: Companion embeddings file for vector search
---

PAM embeddings are stored in a separate companion file. This keeps the core memory store lightweight while supporting
systems that need vector search. This example provides embeddings for all 5 memories in
the [Complete Memory Store](/examples/complete-memory-store/).

## Example

```json
{
  "schema": "portable-ai-memory-embeddings",
  "schema_version": "1.0",
  "embeddings": [
    {
      "id": "emb-001",
      "memory_id": "mem-001-identity",
      "model": "example-model-8d",
      "dimensions": 8,
      "created_at": "2026-02-15T22:01:00Z",
      "vector": [
        0.0123,
        -0.0456,
        0.0789,
        -0.0234,
        0.0567,
        -0.0891,
        0.0345,
        -0.0678
      ]
    },
    {
      "id": "emb-002",
      "memory_id": "mem-002-skill",
      "model": "example-model-8d",
      "dimensions": 8,
      "created_at": "2026-02-15T22:01:00Z",
      "vector": [
        0.0234,
        -0.0567,
        0.0891,
        -0.0123,
        0.0456,
        -0.0789,
        0.0678,
        -0.0345
      ]
    },
    {
      "id": "emb-003",
      "memory_id": "mem-003-project",
      "model": "example-model-8d",
      "dimensions": 8,
      "created_at": "2026-02-15T22:01:00Z",
      "vector": [
        0.0345,
        -0.0678,
        0.0123,
        -0.0456,
        0.0789,
        -0.0234,
        0.0567,
        -0.0891
      ]
    },
    {
      "id": "emb-004",
      "memory_id": "mem-004-preference",
      "model": "example-model-8d",
      "dimensions": 8,
      "created_at": "2026-02-15T22:01:00Z",
      "vector": [
        0.0456,
        -0.0789,
        0.0234,
        -0.0567,
        0.0891,
        -0.0123,
        0.0345,
        -0.0678
      ]
    },
    {
      "id": "emb-005",
      "memory_id": "mem-005-environment",
      "model": "example-model-8d",
      "dimensions": 8,
      "created_at": "2026-02-15T22:01:00Z",
      "vector": [
        0.0567,
        -0.0891,
        0.0345,
        -0.0678,
        0.0123,
        -0.0456,
        0.0789,
        -0.0234
      ]
    }
  ]
}
```

:::note
This example uses a fictional 8-dimensional model for readability. Real embedding models typically produce 256–3072
dimensional vectors.
:::

## Key Fields

- **`schema`** / **`schema_version`** — Identifies this as a PAM embeddings file (`portable-ai-memory-embeddings`,
  version `1.0`)
- **`embeddings[].id`** — Unique embedding identifier (e.g. `emb-001`), referenced by the `embedding_ref` field in the
  corresponding memory object in the memory store
- **`embeddings[].memory_id`** — Links back to the corresponding memory object (e.g. `mem-001-identity`)
- **`embeddings[].model`** — Embedding model used to generate the vector (`example-model-8d` in this demo)
- **`embeddings[].dimensions`** — Vector dimensionality, must match the length of the `vector` array (8 in this demo)
- **`embeddings[].vector`** — The actual embedding vector as an array of floats
- **`embeddings[].created_at`** — When the embedding was generated; useful for detecting stale embeddings after memory
  content is updated

The embeddings file validates against [
`portable-ai-memory-embeddings.schema.json`](/schemas/portable-ai-memory-embeddings.schema.json).