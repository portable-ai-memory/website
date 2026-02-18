---
title: Embeddings Schema
description: O schema complementar de embeddings do PAM — estrutura para representações vetoriais vinculadas a memórias
---

O Embeddings schema define um arquivo complementar opcional para embeddings vetoriais associados a objetos de memória.
Objetos de memória referenciam embeddings por meio do campo `embedding_ref`. Embeddings podem ser regenerados a partir do
conteúdo da memória a qualquer momento usando qualquer modelo — o campo `content` no objeto de memória é sempre a fonte
autoritativa do conteúdo semântico, nunca o embedding.

## Download

[portable-ai-memory-embeddings.schema.json](/schemas/portable-ai-memory-embeddings.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

| Field            | Type                                    | Required | Description                                                         |
|------------------|-----------------------------------------|----------|---------------------------------------------------------------------|
| `schema`         | `string`                                | yes      | Deve ser `"portable-ai-memory-embeddings"`                          |
| `schema_version` | `string`                                | yes      | Versão do schema. Deve corresponder à versão do memory-store schema |
| `embeddings`     | [`EmbeddingObject[]`](#embeddingobject) | yes      | Array de objetos de embedding                                       |

## Definitions

### EmbeddingObject

Um único vetor de embedding associado a um objeto de memória. Cada memória deve ter no máximo um embedding
correspondente — o campo `memory_id` deve ser único em todos os objetos de embedding.

#### Required fields

| Field        | Type      | Description                                                                                               |
|--------------|-----------|-----------------------------------------------------------------------------------------------------------|
| `id`         | `string`  | Identificador único. Referenciado por `memory.embedding_ref` no memory store                              |
| `memory_id`  | `string`  | ID do objeto de memória associado                                                                         |
| `model`      | `string`  | Identificador do modelo de embedding (ex.: `text-embedding-3-small`, `voyage-3`, `nomic-embed-text-v1.5`) |
| `dimensions` | `integer` | Dimensionalidade do vetor de embedding                                                                    |
| `created_at` | `string`  | Timestamp ISO 8601 de quando este embedding foi gerado                                                    |

#### Optional fields

| Field     | Type               | Default | Description                                                                                                                                  |
|-----------|--------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `vector`  | `number[] \| null` | `null`  | O vetor de embedding. Pode ser `null` se armazenado externamente via `storage`                                                               |
| `storage` | `object \| null`   | `null`  | Referência a armazenamento externo. Campos obrigatórios: `type` (`"file"`, `"database"`, `"object_storage"`, `"vector_db"`, `"uri"`) e `ref` |

## Normative Rules

Estas regras são definidas em [spec §12](/pt-br/spec/v1.0/#12-embeddings):

1. Embeddings podem ser omitidos inteiramente de um export
2. Quando omitidos, `embedding_ref` nos objetos de memória deve ser `null`
3. Consumidores não devem falhar se `embedding_ref` for `null` ou se `embeddings.json` estiver ausente
4. Consumidores podem regenerar embeddings a partir do campo `content` a qualquer momento usando qualquer modelo
5. O campo `content` é sempre a fonte autoritativa do conteúdo semântico, nunca o embedding
6. Cada objeto de memória deve ter no máximo um embedding correspondente — `memory_id` deve ser único

## Relacionado

- [Exemplo com Embeddings](/pt-br/examples/with-embeddings/)
- [Spec §12](/pt-br/spec/v1.0/#12-embeddings) — Regras normativas de embedding
