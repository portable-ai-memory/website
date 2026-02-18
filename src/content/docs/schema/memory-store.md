---
title: Memory Store Schema
description: The core PAM memory store schema — fields, types, relations, and integrity verification
---

The Memory Store is the root document of every PAM export and the only required file. It contains all user memories,
relations, conversations index, integrity verification, and optional cryptographic signatures.

## Download

[portable-ai-memory.schema.json](/schemas/portable-ai-memory.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

### Required

| Field            | Type                              | Description                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| `schema`         | `string`                          | MUST be `"portable-ai-memory"`                |
| `schema_version` | `string`                          | Semantic version. Current: `"1.0"`            |
| `owner`          | [`Owner`](#owner)                 | The individual who owns these memories        |
| `memories`       | [`MemoryObject[]`](#memoryobject) | Array of memory objects — the primary payload |

### Optional

| Field                 | Type                                                  | Default  | Description                                                                      |
|-----------------------|-------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| `spec_uri`            | `string \| null`                                      | `null`   | URI of the specification version. Serves as identifier, not a fetchable resource |
| `export_id`           | `string \| null`                                      | `null`   | UUID v4 for this export. Enables tracking and duplicate detection                |
| `exported_by`         | `string \| null`                                      | `null`   | System that generated the export. Format: `system-name/major.minor.patch`        |
| `export_date`         | `string`                                              | —        | ISO 8601 timestamp of export                                                     |
| `relations`           | [`RelationObject[]`](#relationobject)                 | `[]`     | Semantic relationships between memories                                          |
| `conversations_index` | [`ConversationIndexEntry[]`](#conversationindexentry) | `[]`     | Lightweight conversation references                                              |
| `integrity`           | [`IntegrityBlock`](#integrityblock)                   | —        | Integrity verification block                                                     |
| `export_type`         | `"full" \| "incremental"`                             | `"full"` | Full or incremental (delta) export                                               |
| `base_export_id`      | `string \| null`                                      | `null`   | For incremental: `export_id` of the base export                                  |
| `since`               | `string \| null`                                      | `null`   | For incremental: only memories after this timestamp                              |
| `type_registry`       | `string \| null`                                      | `null`   | URI of the custom type registry                                                  |
| `signature`           | [`SignatureBlock`](#signatureblock)                   | `null`   | Cryptographic signature for authenticity                                         |

### Conditional

When `signature` is present (not null), `export_id` and `export_date` become **required** (enforced by the schema via
`if/then`).

## Definitions

### Owner

The individual who owns these memories. For cross-platform identity resolution, the `did` field SHOULD be populated with
a W3C Decentralized Identifier.

| Field        | Type             | Required | Description                                              |
|--------------|------------------|----------|----------------------------------------------------------|
| `id`         | `string`         | yes      | Unique owner identifier (SHOULD be UUID v4)              |
| `did`        | `string \| null` | no       | W3C Decentralized Identifier for cross-platform identity |
| `created_at` | `string`         | no       | ISO 8601 timestamp when the owner record was created     |

### MemoryObject

A single portable memory unit — the fundamental unit of PAM.

#### Required fields

| Field          | Type                                  | Description                                                                                                           |
|----------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `id`           | `string`                              | Unique identifier. SHOULD be UUID v4                                                                                  |
| `type`         | [`MemoryType`](#memorytype)           | Memory type from the closed taxonomy                                                                                  |
| `content`      | `string`                              | Natural language content — the primary semantic payload                                                               |
| `content_hash` | `string`                              | SHA-256 of normalized content ([spec §6](/spec/v1.0/#6-content-hash-normalization)). Pattern: `^sha256:[a-f0-9]{64}$` |
| `temporal`     | [`TemporalBlock`](#temporalblock)     | Temporal metadata. `created_at` is required                                                                           |
| `provenance`   | [`ProvenanceBlock`](#provenanceblock) | Origin metadata. `platform` is required                                                                               |

#### Conditional fields

| Field         | Type             | Condition                        | Description                                                        |
|---------------|------------------|----------------------------------|--------------------------------------------------------------------|
| `custom_type` | `string \| null` | Required when `type == "custom"` | Custom type identifier. MUST be `null` when type is not `"custom"` |

#### Optional fields

| Field           | Type                                  | Default    | Description                                      |
|-----------------|---------------------------------------|------------|--------------------------------------------------|
| `status`        | [`MemoryStatus`](#memorystatus)       | `"active"` | Lifecycle state                                  |
| `summary`       | `string \| null`                      | `null`     | Short summary for display                        |
| `tags`          | `string[]`                            | `[]`       | Lowercase tags. Pattern: `^[a-z0-9][a-z0-9_-]*$` |
| `confidence`    | [`ConfidenceBlock`](#confidenceblock) | —          | System-computed confidence scoring               |
| `access`        | [`AccessBlock`](#accessblock)         | —          | Access control for multi-agent scenarios         |
| `embedding_ref` | `string \| null`                      | `null`     | Reference to entry in embeddings file            |
| `metadata`      | [`MetadataBlock`](#metadatablock)     | —          | Additional metadata (extensible)                 |

### MemoryType

Closed taxonomy of memory types:

| Type           | Description                                         |
|----------------|-----------------------------------------------------|
| `fact`         | Objective, verifiable information about the user    |
| `preference`   | User preference, taste, or stated desire            |
| `skill`        | Competency, expertise, or demonstrated ability      |
| `context`      | Situational or temporal context                     |
| `relationship` | Relation to another person, entity, or organization |
| `goal`         | Active objective or aspiration                      |
| `instruction`  | How the user wants to be treated or addressed       |
| `identity`     | Personal identity information                       |
| `environment`  | Technical or physical environment details           |
| `project`      | Active project or initiative                        |
| `custom`       | Extensible type. Requires `custom_type` field       |

### MemoryStatus

Lifecycle states:

| Status       | Description                           |
|--------------|---------------------------------------|
| `active`     | Current and valid. Default state      |
| `superseded` | Replaced by a newer memory            |
| `deprecated` | Still valid but no longer prioritized |
| `retracted`  | Explicitly invalidated by the user    |
| `archived`   | Retained for historical purposes only |

### TemporalBlock

| Field           | Type             | Required | Description                             |
|-----------------|------------------|----------|-----------------------------------------|
| `created_at`    | `string`         | yes      | ISO 8601 timestamp of creation          |
| `updated_at`    | `string \| null` | no       | Last update timestamp                   |
| `valid_from`    | `string \| null` | no       | When this memory becomes valid          |
| `valid_until`   | `string \| null` | no       | When this memory expires                |
| `superseded_by` | `string \| null` | no       | ID of the memory that replaced this one |

### ProvenanceBlock

Origin tracking for auditability and cross-platform conflict resolution.

| Field               | Type             | Required | Description                                                                                                        |
|---------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------|
| `platform`          | `string`         | yes      | Source platform identifier. Pattern: `^[a-z0-9_-]{2,32}$` (e.g., `chatgpt`, `claude`, `gemini`)                   |
| `platform_user_id`  | `string \| null` | no       | User ID on source platform                                                                                         |
| `conversation_ref`  | `string \| null` | no       | Reference to `conversations_index` entry                                                                           |
| `message_ref`       | `string \| null` | no       | Reference to specific message                                                                                      |
| `extraction_method` | `string \| null` | no       | How the memory was extracted: `llm_inference`, `explicit_user_input`, `api_export`, `browser_extraction`, `manual` |
| `extracted_at`      | `string \| null` | no       | ISO 8601 timestamp of extraction                                                                                   |
| `extractor`         | `string \| null` | no       | System that performed extraction                                                                                   |

### ConfidenceBlock

System-computed confidence scoring. NOT user-defined priority.

| Field             | Type             | Required | Description                                            |
|-------------------|------------------|----------|--------------------------------------------------------|
| `initial`         | `number`         | no       | Confidence at extraction time [0.0–1.0]                |
| `current`         | `number`         | no       | Current confidence after decay/reinforcement [0.0–1.0] |
| `decay_model`     | `string \| null` | no       | `"time_linear"`, `"time_exponential"`, or `"none"`     |
| `last_reinforced` | `string \| null` | no       | ISO 8601 timestamp of last reinforcement               |

### AccessBlock

Access control for multi-agent and federated scenarios.

| Field         | Type                            | Default     | Description                                    |
|---------------|---------------------------------|-------------|------------------------------------------------|
| `visibility`  | `string`                        | `"private"` | `"private"`, `"shared"`, or `"public"`         |
| `exportable`  | `boolean`                       | `true`      | Whether this memory may be included in exports |
| `shared_with` | [`AccessGrant[]`](#accessgrant) | `[]`        | List of access grants                          |

### AccessGrant

| Field         | Type       | Required | Description                               |
|---------------|------------|----------|-------------------------------------------|
| `entity`      | `string`   | yes      | Identifier of the entity granted access   |
| `permissions` | `string[]` | yes      | Array of: `"read"`, `"write"`, `"delete"` |

### MetadataBlock

Additional metadata. Allows `additionalProperties` for extensibility.

| Field           | Type             | Description                                          |
|-----------------|------------------|------------------------------------------------------|
| `language`      | `string \| null` | BCP 47 language tag (e.g., `"en"`, `"pt-BR"`)        |
| `domain`        | `string \| null` | Knowledge domain (e.g., `"technical"`, `"personal"`) |
| *custom fields* | *any*            | Implementations MAY add additional fields            |

### RelationObject

A semantic relationship between two memory objects, forming edges in a knowledge graph.

| Field        | Type             | Required | Description                                                                      |
|--------------|------------------|----------|----------------------------------------------------------------------------------|
| `id`         | `string`         | yes      | Unique identifier                                                                |
| `from`       | `string`         | yes      | Source memory ID                                                                 |
| `to`         | `string`         | yes      | Target memory ID                                                                 |
| `type`       | `string`         | yes      | `supports`, `contradicts`, `extends`, `supersedes`, `related_to`, `derived_from` |
| `confidence` | `number \| null` | no       | Confidence in this relationship [0.0–1.0]                                        |
| `created_at` | `string`         | yes      | ISO 8601 timestamp                                                               |

### ConversationIndexEntry

Lightweight index entry for a conversation. Full message history is stored externally as companion files.

| Field              | Type                                    | Required | Description                                                      |
|--------------------|-----------------------------------------|----------|------------------------------------------------------------------|
| `id`               | `string`                                | yes      | Unique conversation identifier                                   |
| `platform`         | `string`                                | yes      | Source platform identifier. Pattern: `^[a-z0-9_-]{2,32}$`       |
| `temporal`         | `object`                                | yes      | Temporal metadata (`created_at` required, `updated_at` optional) |
| `title`            | `string \| null`                        | no       | Conversation title                                               |
| `message_count`    | `integer \| null`                       | no       | Number of messages                                               |
| `tags`             | `string[]`                              | no       | Tags or topics. Pattern: `^[a-z0-9][a-z0-9_-]*$`                 |
| `derived_memories` | `string[]`                              | no       | IDs of memories derived from this conversation (advisory)        |
| `storage`          | [`StorageReference`](#storagereference) | no       | Reference to full conversation data                              |

### StorageReference

Reference to external storage for large data objects.

| Field    | Type             | Required | Description                                                        |
|----------|------------------|----------|--------------------------------------------------------------------|
| `type`   | `string`         | yes      | `"file"`, `"database"`, `"object_storage"`, `"vector_db"`, `"uri"` |
| `ref`    | `string`         | yes      | Path, URI, or identifier to the stored data                        |
| `format` | `string \| null` | no       | Data format: `"json"`, `"jsonl"`, `"csv"`, `"parquet"`             |

### IntegrityBlock

Integrity verification. Checksum is SHA-256 of the canonicalized memories array using RFC 8785 (JCS). Memories are
sorted by `id` ascending before canonicalization.

| Field              | Type      | Required | Description                                               |
|--------------------|-----------|----------|-----------------------------------------------------------|
| `canonicalization` | `string`  | no       | Default: `"RFC8785"`. Currently the only supported method |
| `checksum`         | `string`  | yes      | SHA-256 of canonicalized memories. Format: `sha256:<hex>` |
| `total_memories`   | `integer` | yes      | MUST equal the length of the `memories` array             |

### SignatureBlock

Cryptographic signature over the export. The signature payload is `{checksum, export_id, export_date, owner_id}`
canonicalized with RFC 8785 ([spec §18.3](/spec/v1.0/#183-signature-computation)).

| Field        | Type             | Required | Description                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------|
| `algorithm`  | `string`         | yes      | `Ed25519` (recommended), `ES256`, `ES384`, `RS256`, `RS384`, `RS512` |
| `public_key` | `string`         | yes      | Public key of the signer                                             |
| `value`      | `string`         | yes      | Base64url-encoded signature (RFC 4648 §5)                            |
| `signed_at`  | `string`         | yes      | ISO 8601 timestamp                                                   |
| `key_id`     | `string \| null` | no       | Key identifier. If `owner.did` is present, SHOULD be a DID URL       |

## Related

- [Complete Memory Store Example](/examples/complete-memory-store/)
- [Minimal Example](/examples/minimal/)
- [Spec §3–11](/spec/v1.0/#3-root-structure) — Normative field definitions