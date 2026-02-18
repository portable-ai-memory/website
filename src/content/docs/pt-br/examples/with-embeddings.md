---
title: Com Embeddings
description: Arquivo complementar de embeddings para busca vetorial
---

Os embeddings PAM são armazenados em um arquivo complementar separado. Isso mantém o memory store principal leve,
enquanto oferece suporte a sistemas que necessitam de busca vetorial. Este exemplo fornece embeddings para todas as 5
memórias do [Complete Memory Store](/pt-br/examples/complete-memory-store/).

## Exemplo

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
Este exemplo usa um modelo fictício de 8 dimensões para facilitar a leitura. Modelos de embedding reais normalmente
produzem vetores de 256 a 3072 dimensões.
:::

## Campos Principais

- **`schema`** / **`schema_version`** — Identifica este arquivo como um arquivo de embeddings PAM
  (`portable-ai-memory-embeddings`, versão `1.0`)
- **`embeddings[].id`** — Identificador único do embedding (ex: `emb-001`), referenciado pelo campo `embedding_ref` no
  objeto de memória correspondente no memory store
- **`embeddings[].memory_id`** — Vincula de volta ao objeto de memória correspondente (ex: `mem-001-identity`)
- **`embeddings[].model`** — Modelo de embedding usado para gerar o vetor (`example-model-8d` neste exemplo)
- **`embeddings[].dimensions`** — Dimensionalidade do vetor, deve corresponder ao comprimento do array `vector` (8
  neste exemplo)
- **`embeddings[].vector`** — O vetor de embedding propriamente dito, como um array de floats
- **`embeddings[].created_at`** — Quando o embedding foi gerado; útil para detectar embeddings desatualizados após a
  atualização do conteúdo da memória

O arquivo de embeddings é validado contra [
`portable-ai-memory-embeddings.schema.json`](/schemas/portable-ai-memory-embeddings.schema.json).
