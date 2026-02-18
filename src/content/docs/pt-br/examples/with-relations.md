---
title: Com Relations
description: Demonstrando relacionamentos semânticos entre memórias
---

O PAM suporta relações semânticas entre memórias por meio do array `relations`. Cada relação especifica um vínculo
direcional entre duas memórias com um tipo e uma pontuação de confiança opcional.

## Exemplo

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

## Tipos de Relação

| Tipo           | Semântica                                                                    |
|----------------|------------------------------------------------------------------------------|
| `supports`     | A origem fornece evidência para o alvo                                       |
| `contradicts`  | A origem conflita com o alvo (útil para rastrear mudanças de entendimento)   |
| `extends`      | A origem adiciona detalhes ao alvo                                           |
| `supersedes`   | A origem substitui o alvo                                                    |
| `related_to`   | Relacionamento semântico geral                                               |
| `derived_from` | A origem foi inferida a partir do alvo                                       |

## Campos

| Campo        | Tipo             | Obrigatório | Descrição                                     |
|--------------|------------------|-------------|-----------------------------------------------|
| `id`         | `string`         | sim         | Identificador único da relação                |
| `from`       | `string`         | sim         | ID da memória de origem                       |
| `to`         | `string`         | sim         | ID da memória de destino                      |
| `type`       | `string`         | sim         | Tipo de relação (veja acima)                  |
| `confidence` | `number \| null` | não         | Confiança no relacionamento [0.0–1.0]         |
| `created_at` | `string`         | sim         | Timestamp ISO 8601                            |

Consulte a [spec §13](/pt-br/spec/v1.0/#13-relations) para a semântica completa de relações.
