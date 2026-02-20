---
title: Validator
description: Valide arquivos PAM de memory store, conversas e embeddings contra os JSON Schemas oficiais
---

:::note[Validator online]
O validator PAM no navegador está planejado para um release futuro.
:::

## Validar com o SDK PAM

O [SDK oficial Python](https://github.com/portable-ai-memory/python-sdk) é a forma recomendada de validar arquivos PAM. Ele realiza validação profunda além da conformidade de schema — verificando content hashes, referências cruzadas, blocos de integridade e consistência temporal.

```bash
pip install 'portable-ai-memory[cli]'
pam validate memory-store.json
```

Para uso programático, validação de bundles e todas as opções disponíveis, consulte o [Guia de Validação](/pt-br/tools/validation-guide/).

### O que o SDK valida

| Verificação | O que é verificado |
|---|---|
| Conformidade de schema | Campos obrigatórios, tipos corretos, enums válidos |
| Content hashes | Cada `content_hash` corresponde ao conteúdo real conforme normalização da [spec §6](/pt-br/spec/v1.0/#6-content-hash-normalization) |
| Bloco de integridade | Contagem `total_memories` e checksum agregado |
| Referências cruzadas | Relations, `conversation_ref`, `superseded_by` e `derived_memories` apontam para objetos existentes |
| Ordenação temporal | `created_at` ≤ `updated_at`, `valid_from` ≤ `valid_until` |
| Unicidade de IDs | Sem IDs duplicados de memórias, relações ou conversas |
| Tipos custom | `type='custom'` exige `custom_type` e vice-versa |
| Consistência de status | Status `superseded` ↔ campo `superseded_by` |
| DAG de conversas | Consistência de `parent_id` e `children_ids` nas mensagens |

### Sem o SDK

Se você não pode usar Python, é possível validar diretamente contra os JSON Schemas com qualquer validador JSON Schema Draft 2020-12. Consulte o [Guia de Validação](/pt-br/tools/validation-guide/) para exemplos com `jsonschema` e `ajv`. A validação manual verifica apenas conformidade de schema.
