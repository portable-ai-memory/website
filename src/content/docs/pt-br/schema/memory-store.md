---
title: Memory Store Schema
description: O schema central do memory store do PAM — campos, tipos, relações e verificação de integridade
---

O Memory Store é o documento raiz de todo export PAM e o único arquivo obrigatório. Ele contém todas as memórias do
usuário, relações, índice de conversas, verificação de integridade e assinaturas criptográficas opcionais.

## Download

[portable-ai-memory.schema.json](/schemas/portable-ai-memory.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

### Required

| Field            | Type                              | Description                                      |
|------------------|-----------------------------------|--------------------------------------------------|
| `schema`         | `string`                          | Deve ser `"portable-ai-memory"`                  |
| `schema_version` | `string`                          | Versão semântica. Atual: `"1.0"`                 |
| `owner`          | [`Owner`](#owner)                 | O indivíduo proprietário dessas memórias         |
| `memories`       | [`MemoryObject[]`](#memoryobject) | Array de objetos de memória — o payload primário |

### Optional

| Field                 | Type                                                  | Default  | Description                                                                            |
|-----------------------|-------------------------------------------------------|----------|----------------------------------------------------------------------------------------|
| `spec_uri`            | `string \| null`                                      | `null`   | URI da versão da especificação. Serve como identificador, não como recurso recuperável |
| `export_id`           | `string \| null`                                      | `null`   | UUID v4 deste export. Permite rastreamento e detecção de duplicatas                    |
| `exported_by`         | `string \| null`                                      | `null`   | Sistema que gerou o export. Formato: `system-name/major.minor.patch`                   |
| `export_date`         | `string`                                              | —        | Timestamp ISO 8601 do export                                                           |
| `relations`           | [`RelationObject[]`](#relationobject)                 | `[]`     | Relacionamentos semânticos entre memórias                                              |
| `conversations_index` | [`ConversationIndexEntry[]`](#conversationindexentry) | `[]`     | Referências leves de conversas                                                         |
| `integrity`           | [`IntegrityBlock`](#integrityblock)                   | —        | Bloco de verificação de integridade                                                    |
| `export_type`         | `"full" \| "incremental"`                             | `"full"` | Export completo ou incremental (delta)                                                 |
| `base_export_id`      | `string \| null`                                      | `null`   | Para incremental: `export_id` do export base                                           |
| `since`               | `string \| null`                                      | `null`   | Para incremental: somente memórias posteriores a este timestamp                        |
| `type_registry`       | `string \| null`                                      | `null`   | URI do registro de tipos customizados                                                  |
| `signature`           | [`SignatureBlock`](#signatureblock)                   | `null`   | Assinatura criptográfica para autenticidade                                            |

### Conditional

Quando `signature` está presente (não nulo), `export_id` e `export_date` tornam-se **obrigatórios** (aplicado pelo
schema via `if/then`).

## Definitions

### Owner

O indivíduo proprietário dessas memórias. Para resolução de identidade entre plataformas, recomenda-se preencher o campo `did` com um W3C Decentralized Identifier.

| Field        | Type             | Required | Description                                                    |
|--------------|------------------|----------|----------------------------------------------------------------|
| `id`         | `string`         | yes      | Identificador único do proprietário (recomenda-se UUID v4)     |
| `did`        | `string \| null` | no       | W3C Decentralized Identifier para identidade entre plataformas |
| `created_at` | `string`         | no       | Timestamp ISO 8601 de criação do registro do proprietário      |

### MemoryObject

Uma única unidade de memória portável — a unidade fundamental do PAM.

#### Required fields

| Field          | Type                                  | Description                                                                                                            |
|----------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `id`           | `string`                              | Identificador único. Recomenda-se UUID v4                                                                              |
| `type`         | [`MemoryType`](#memorytype)           | Tipo de memória da taxonomia fechada                                                                                   |
| `content`      | `string`                              | Conteúdo em linguagem natural — o payload semântico primário                                                           |
| `content_hash` | `string`                              | SHA-256 do conteúdo normalizado ([spec §6](/pt-br/spec/v1.0/#6-content-hash-normalization)). Padrão: `^sha256:[a-f0-9]{64}$` |
| `temporal`     | [`TemporalBlock`](#temporalblock)     | Metadados temporais. `created_at` é obrigatório                                                                        |
| `provenance`   | [`ProvenanceBlock`](#provenanceblock) | Metadados de origem. `platform` é obrigatório                                                                          |

#### Conditional fields

| Field         | Type             | Condition                             | Description                                                                       |
|---------------|------------------|---------------------------------------|-----------------------------------------------------------------------------------|
| `custom_type` | `string \| null` | Obrigatório quando `type == "custom"` | Identificador de tipo customizado. Deve ser `null` quando o tipo não é `"custom"` |

#### Optional fields

| Field           | Type                                  | Default    | Description                                         |
|-----------------|---------------------------------------|------------|-----------------------------------------------------|
| `status`        | [`MemoryStatus`](#memorystatus)       | `"active"` | Estado do ciclo de vida                             |
| `summary`       | `string \| null`                      | `null`     | Resumo curto para exibição                          |
| `tags`          | `string[]`                            | `[]`       | Tags em minúsculas. Padrão: `^[a-z0-9][a-z0-9_-]*$` |
| `confidence`    | [`ConfidenceBlock`](#confidenceblock) | —          | Pontuação de confiança computada pelo sistema       |
| `access`        | [`AccessBlock`](#accessblock)         | —          | Controle de acesso para cenários multi-agente       |
| `embedding_ref` | `string \| null`                      | `null`     | Referência à entrada no arquivo de embeddings       |
| `metadata`      | [`MetadataBlock`](#metadatablock)     | —          | Metadados adicionais (extensível)                   |

### MemoryType

Taxonomia fechada de tipos de memória:

| Type           | Description                                       |
|----------------|---------------------------------------------------|
| `fact`         | Informação objetiva e verificável sobre o usuário |
| `preference`   | Preferência, gosto ou desejo declarado do usuário |
| `skill`        | Competência, expertise ou habilidade demonstrada  |
| `context`      | Contexto situacional ou temporal                  |
| `relationship` | Relação com outra pessoa, entidade ou organização |
| `goal`         | Objetivo ativo ou aspiração                       |
| `instruction`  | Como o usuário deseja ser tratado ou interpelado  |
| `identity`     | Informação de identidade pessoal                  |
| `environment`  | Detalhes do ambiente técnico ou físico            |
| `project`      | Projeto ativo ou iniciativa                       |
| `custom`       | Tipo extensível. Requer o campo `custom_type`     |

### MemoryStatus

Estados do ciclo de vida:

| Status       | Description                              |
|--------------|------------------------------------------|
| `active`     | Atual e válido. Estado padrão            |
| `superseded` | Substituído por uma memória mais recente |
| `deprecated` | Ainda válido, mas sem prioridade         |
| `retracted`  | Explicitamente invalidado pelo usuário   |
| `archived`   | Retido apenas para fins históricos       |

### TemporalBlock

| Field           | Type             | Required | Description                         |
|-----------------|------------------|----------|-------------------------------------|
| `created_at`    | `string`         | yes      | Timestamp ISO 8601 de criação       |
| `updated_at`    | `string \| null` | no       | Timestamp da última atualização     |
| `valid_from`    | `string \| null` | no       | Quando esta memória se torna válida |
| `valid_until`   | `string \| null` | no       | Quando esta memória expira          |
| `superseded_by` | `string \| null` | no       | ID da memória que substituiu esta   |

### ProvenanceBlock

Rastreamento de origem para auditabilidade e resolução de conflitos entre plataformas.

| Field               | Type             | Required | Description                                                                                                       |
|---------------------|------------------|----------|-------------------------------------------------------------------------------------------------------------------|
| `platform`          | `string`         | yes      | Identificador da plataforma de origem. Padrão: `^[a-z0-9_-]{2,32}$` (ex.: `chatgpt`, `claude`, `gemini`)         |
| `platform_user_id`  | `string \| null` | no       | ID do usuário na plataforma de origem                                                                             |
| `conversation_ref`  | `string \| null` | no       | Referência à entrada em `conversations_index`                                                                     |
| `message_ref`       | `string \| null` | no       | Referência a uma mensagem específica                                                                              |
| `extraction_method` | `string \| null` | no       | Como a memória foi extraída: `llm_inference`, `explicit_user_input`, `api_export`, `browser_extraction`, `manual` |
| `extracted_at`      | `string \| null` | no       | Timestamp ISO 8601 da extração                                                                                    |
| `extractor`         | `string \| null` | no       | Sistema que realizou a extração                                                                                   |

### ConfidenceBlock

Pontuação de confiança computada pelo sistema. NÃO é prioridade definida pelo usuário.

| Field             | Type             | Required | Description                                       |
|-------------------|------------------|----------|---------------------------------------------------|
| `initial`         | `number`         | no       | Confiança no momento da extração [0.0–1.0]        |
| `current`         | `number`         | no       | Confiança atual após decaimento/reforço [0.0–1.0] |
| `decay_model`     | `string \| null` | no       | `"time_linear"`, `"time_exponential"` ou `"none"` |
| `last_reinforced` | `string \| null` | no       | Timestamp ISO 8601 do último reforço              |

### AccessBlock

Controle de acesso para cenários multi-agente e federados.

| Field         | Type                            | Default     | Description                                  |
|---------------|---------------------------------|-------------|----------------------------------------------|
| `visibility`  | `string`                        | `"private"` | `"private"`, `"shared"` ou `"public"`        |
| `exportable`  | `boolean`                       | `true`      | Se esta memória pode ser incluída em exports |
| `shared_with` | [`AccessGrant[]`](#accessgrant) | `[]`        | Lista de concessões de acesso                |

### AccessGrant

| Field         | Type       | Required | Description                                    |
|---------------|------------|----------|------------------------------------------------|
| `entity`      | `string`   | yes      | Identificador da entidade com acesso concedido |
| `permissions` | `string[]` | yes      | Array de: `"read"`, `"write"`, `"delete"`      |

### MetadataBlock

Metadados adicionais. Permite `additionalProperties` para extensibilidade.

| Field           | Type             | Description                                                |
|-----------------|------------------|------------------------------------------------------------|
| `language`      | `string \| null` | Tag de idioma BCP 47 (ex.: `"en"`, `"pt-BR"`)              |
| `domain`        | `string \| null` | Domínio do conhecimento (ex.: `"technical"`, `"personal"`) |
| *custom fields* | *any*            | Implementações podem adicionar campos adicionais           |

### RelationObject

Um relacionamento semântico entre dois objetos de memória, formando arestas em um grafo de conhecimento.

| Field        | Type             | Required | Description                                                                      |
|--------------|------------------|----------|----------------------------------------------------------------------------------|
| `id`         | `string`         | yes      | Identificador único                                                              |
| `from`       | `string`         | yes      | ID da memória de origem                                                          |
| `to`         | `string`         | yes      | ID da memória de destino                                                         |
| `type`       | `string`         | yes      | `supports`, `contradicts`, `extends`, `supersedes`, `related_to`, `derived_from` |
| `confidence` | `number \| null` | no       | Confiança neste relacionamento [0.0–1.0]                                         |
| `created_at` | `string`         | yes      | Timestamp ISO 8601                                                               |

### ConversationIndexEntry

Entrada de índice leve para uma conversa. O histórico completo de mensagens é armazenado externamente como arquivos
complementares.

| Field              | Type                                    | Required | Description                                                      |
|--------------------|-----------------------------------------|----------|------------------------------------------------------------------|
| `id`               | `string`                                | yes      | Identificador único da conversa                                  |
| `platform`         | `string`                                | yes      | Identificador da plataforma de origem                            |
| `temporal`         | `object`                                | yes      | Metadados temporais (`created_at` obrigatório, `updated_at` opcional) |
| `title`            | `string \| null`                        | no       | Título da conversa                                               |
| `message_count`    | `integer \| null`                       | no       | Número de mensagens                                              |
| `tags`             | `string[]`                              | no       | Tags ou tópicos. Padrão: `^[a-z0-9][a-z0-9_-]*$`                |
| `derived_memories` | `string[]`                              | no       | IDs de memórias derivadas desta conversa (informativo)           |
| `storage`          | [`StorageReference`](#storagereference) | no       | Referência aos dados completos da conversa                       |

### StorageReference

Referência a armazenamento externo para objetos de dados grandes.

| Field    | Type             | Required | Description                                                        |
|----------|------------------|----------|--------------------------------------------------------------------|
| `type`   | `string`         | yes      | `"file"`, `"database"`, `"object_storage"`, `"vector_db"`, `"uri"` |
| `ref`    | `string`         | yes      | Caminho, URI ou identificador para os dados armazenados            |
| `format` | `string \| null` | no       | Formato dos dados: `"json"`, `"jsonl"`, `"csv"`, `"parquet"`       |

### IntegrityBlock

Verificação de integridade. O checksum é SHA-256 do array de memórias canonicalizado usando RFC 8785 (JCS). As memórias
são ordenadas por `id` em ordem crescente antes da canonicalização.

| Field              | Type      | Required | Description                                                   |
|--------------------|-----------|----------|---------------------------------------------------------------|
| `canonicalization` | `string`  | no       | Padrão: `"RFC8785"`. Atualmente o único método suportado      |
| `checksum`         | `string`  | yes      | SHA-256 das memórias canonicalizadas. Formato: `sha256:<hex>` |
| `total_memories`   | `integer` | yes      | Deve ser igual ao comprimento do array `memories`             |

### SignatureBlock

Assinatura criptográfica sobre o export. O payload da assinatura é `{checksum, export_id, export_date, owner_id}`
canonicalizado com RFC 8785 ([spec §18.3](/pt-br/spec/v1.0/#183-signature-computation)).

| Field        | Type             | Required | Description                                                                     |
|--------------|------------------|----------|---------------------------------------------------------------------------------|
| `algorithm`  | `string`         | yes      | `Ed25519` (recomendado), `ES256`, `ES384`, `RS256`, `RS384`, `RS512`            |
| `public_key` | `string`         | yes      | Chave pública do signatário                                                     |
| `value`      | `string`         | yes      | Assinatura codificada em Base64url (RFC 4648 §5)                                |
| `signed_at`  | `string`         | yes      | Timestamp ISO 8601                                                              |
| `key_id`     | `string \| null` | no       | Identificador da chave. Se `owner.did` estiver presente, recomenda-se uma DID URL |

## Relacionado

- [Exemplo de Memory Store Completo](/pt-br/examples/complete-memory-store/)
- [Exemplo Mínimo](/pt-br/examples/minimal/)
- [Spec §3–11](/pt-br/spec/v1.0/#3-root-structure) — Definições normativas de campos
