---
title: Complete Memory Store
description: A full PAM memory store with multiple types, relations, and integrity
---

A complete PAM memory store demonstrating multiple memory types, semantic relations, conversations index, and integrity
verification.

## Example

```json
{
  "schema": "portable-ai-memory",
  "schema_version": "1.0",
  "spec_uri": "https://portable-ai-memory.org/spec/v1.0",
  "export_id": "e47ac10b-58cc-4372-a567-0e02b2c3d479",
  "exported_by": "pam-converter/1.0.0",
  "export_date": "2026-02-15T22:00:00Z",
  "owner": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "did": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    "created_at": "2024-06-01T10:00:00Z"
  },
  "memories": [
    {
      "id": "mem-001-identity",
      "type": "identity",
      "custom_type": null,
      "status": "active",
      "content": "User is fluent in multiple languages, communicates frequently in both English and Spanish, and demonstrates strong technical expertise across networking, database administration, and software development.",
      "content_hash": "sha256:d08b457fe9df78c0186ba99956a3111f9b0566a31ea0350fa39858ffe7aa82d0",
      "summary": "Multilingual tech professional",
      "tags": [
        "identity",
        "language",
        "technical"
      ],
      "confidence": {
        "initial": 1.0,
        "current": 1.0,
        "decay_model": "none",
        "last_reinforced": "2026-02-15T20:00:00Z"
      },
      "temporal": {
        "created_at": "2024-06-01T10:00:00Z",
        "updated_at": "2026-02-15T20:00:00Z",
        "valid_from": "2024-06-01T10:00:00Z",
        "valid_until": null,
        "superseded_by": null
      },
      "provenance": {
        "platform": "claude",
        "platform_user_id": null,
        "conversation_ref": "conv-001",
        "message_ref": null,
        "extraction_method": "llm_inference",
        "extracted_at": "2024-06-15T14:00:00Z",
        "extractor": "pam-converter/1.0.0"
      },
      "access": {
        "visibility": "private",
        "exportable": true,
        "shared_with": []
      },
      "embedding_ref": "emb-001",
      "metadata": {
        "language": "en",
        "domain": "personal"
      }
    },
    {
      "id": "mem-002-skill",
      "type": "skill",
      "custom_type": null,
      "status": "active",
      "content": "User manages over 15 Scrapy web scraping projects with approximately 80 services running as systemd processes, collecting data from government portals and e-commerce platforms.",
      "content_hash": "sha256:ee0752a43e7b432002ea04d7ac7f6d515dbf295795e6c2b1879971679436a8f0",
      "summary": "Scrapy expert with 15+ production projects",
      "tags": [
        "scrapy",
        "web-scraping",
        "python",
        "systemd",
        "production"
      ],
      "confidence": {
        "initial": 0.95,
        "current": 0.95,
        "decay_model": "time_linear",
        "last_reinforced": "2026-02-10T15:00:00Z"
      },
      "temporal": {
        "created_at": "2024-08-01T10:00:00Z",
        "updated_at": "2026-02-10T15:00:00Z",
        "valid_from": "2023-01-01T00:00:00Z",
        "valid_until": null,
        "superseded_by": null
      },
      "provenance": {
        "platform": "chatgpt",
        "platform_user_id": null,
        "conversation_ref": "conv-002",
        "message_ref": "msg-042",
        "extraction_method": "llm_inference",
        "extracted_at": "2024-08-01T12:00:00Z",
        "extractor": "pam-converter/1.0.0"
      },
      "access": {
        "visibility": "shared",
        "exportable": true,
        "shared_with": [
          {
            "entity": "agent-work-assistant",
            "permissions": [
              "read"
            ]
          }
        ]
      },
      "embedding_ref": "emb-002",
      "metadata": {
        "language": "en",
        "domain": "technical"
      }
    },
    {
      "id": "mem-003-project",
      "type": "project",
      "custom_type": null,
      "status": "active",
      "content": "User is actively developing a personal AI assistant system with sophisticated memory capabilities and distributed architecture, including chat integration and tool server management.",
      "content_hash": "sha256:f58bf2771ccf5f2770e0bbbc5632a6d4ede7051ba54e6f599f59dafbafd62bf3",
      "summary": "Building personal AI assistant system",
      "tags": [
        "ai-assistant",
        "memory",
        "distributed",
        "chat-integration"
      ],
      "confidence": {
        "initial": 1.0,
        "current": 1.0,
        "decay_model": "none",
        "last_reinforced": "2026-02-15T22:00:00Z"
      },
      "temporal": {
        "created_at": "2025-06-01T10:00:00Z",
        "updated_at": "2026-02-15T22:00:00Z",
        "valid_from": "2025-06-01T10:00:00Z",
        "valid_until": null,
        "superseded_by": null
      },
      "provenance": {
        "platform": "claude",
        "platform_user_id": null,
        "conversation_ref": "conv-003",
        "message_ref": null,
        "extraction_method": "llm_inference",
        "extracted_at": "2025-06-15T14:00:00Z",
        "extractor": "pam-converter/1.0.0"
      },
      "access": {
        "visibility": "private",
        "exportable": true,
        "shared_with": []
      },
      "embedding_ref": "emb-003",
      "metadata": {
        "language": "en",
        "domain": "technical"
      }
    },
    {
      "id": "mem-004-preference",
      "type": "preference",
      "custom_type": null,
      "status": "active",
      "content": "User values systematic approaches to problem-solving and prefers comprehensive technical documentation over simplified explanations.",
      "content_hash": "sha256:191046caf76449b18bd0323524537d737f9c6042d71bbbe5ba46e4d8663c266a",
      "summary": "Prefers comprehensive technical docs",
      "tags": [
        "preference",
        "documentation",
        "systematic"
      ],
      "confidence": {
        "initial": 0.9,
        "current": 0.88,
        "decay_model": "time_linear",
        "last_reinforced": "2026-01-20T10:00:00Z"
      },
      "temporal": {
        "created_at": "2024-09-15T10:00:00Z",
        "updated_at": "2026-01-20T10:00:00Z",
        "valid_from": "2024-09-15T10:00:00Z",
        "valid_until": null,
        "superseded_by": null
      },
      "provenance": {
        "platform": "chatgpt",
        "platform_user_id": null,
        "conversation_ref": null,
        "message_ref": null,
        "extraction_method": "llm_inference",
        "extracted_at": "2024-09-15T12:00:00Z",
        "extractor": "pam-converter/1.0.0"
      },
      "access": {
        "visibility": "private",
        "exportable": true,
        "shared_with": []
      },
      "embedding_ref": "emb-004",
      "metadata": {
        "language": "en",
        "domain": "personal"
      }
    },
    {
      "id": "mem-005-environment",
      "type": "environment",
      "custom_type": null,
      "status": "active",
      "content": "User works at a company that operates datacenter infrastructure and provides managed services, handling BGP routing, VLAN configuration, and multi-tenant datacenter operations.",
      "content_hash": "sha256:94c91fc81c864fec6b0af8aafcfd252e4787b622585ee8be143d17ea5129bc04",
      "summary": "Works at datacenter infrastructure company",
      "tags": [
        "datacenter",
        "bgp",
        "vlan",
        "networking",
        "managed-services"
      ],
      "confidence": {
        "initial": 1.0,
        "current": 1.0,
        "decay_model": "none",
        "last_reinforced": "2026-02-15T20:00:00Z"
      },
      "temporal": {
        "created_at": "2024-07-01T10:00:00Z",
        "updated_at": "2026-02-15T20:00:00Z",
        "valid_from": "2023-01-01T00:00:00Z",
        "valid_until": null,
        "superseded_by": null
      },
      "provenance": {
        "platform": "claude",
        "platform_user_id": null,
        "conversation_ref": "conv-001",
        "message_ref": null,
        "extraction_method": "llm_inference",
        "extracted_at": "2024-07-01T14:00:00Z",
        "extractor": "pam-converter/1.0.0"
      },
      "access": {
        "visibility": "shared",
        "exportable": true,
        "shared_with": [
          {
            "entity": "agent-work-assistant",
            "permissions": [
              "read"
            ]
          }
        ]
      },
      "embedding_ref": "emb-005",
      "metadata": {
        "language": "en",
        "domain": "professional"
      }
    }
  ],
  "relations": [
    {
      "id": "rel-001",
      "from": "mem-002-skill",
      "to": "mem-005-environment",
      "type": "related_to",
      "confidence": 0.95,
      "created_at": "2024-08-01T12:00:00Z"
    },
    {
      "id": "rel-002",
      "from": "mem-003-project",
      "to": "mem-002-skill",
      "type": "extends",
      "confidence": 0.85,
      "created_at": "2025-06-15T14:00:00Z"
    },
    {
      "id": "rel-003",
      "from": "mem-004-preference",
      "to": "mem-001-identity",
      "type": "supports",
      "confidence": 0.8,
      "created_at": "2024-09-15T12:00:00Z"
    }
  ],
  "conversations_index": [
    {
      "id": "conv-001",
      "platform": "claude",
      "title": "Initial setup and infrastructure discussion",
      "message_count": 2,
      "temporal": {
        "created_at": "2024-06-01T10:00:00Z",
        "updated_at": "2024-06-01T16:00:00Z"
      },
      "tags": [
        "infrastructure",
        "networking",
        "datacenter"
      ],
      "derived_memories": [
        "mem-001-identity",
        "mem-005-environment"
      ],
      "storage": {
        "type": "file",
        "ref": "conversations/conv-001.json",
        "format": "json"
      }
    },
    {
      "id": "conv-002",
      "platform": "chatgpt",
      "title": "Scrapy architecture and scaling discussion",
      "message_count": 45,
      "temporal": {
        "created_at": "2024-08-01T10:00:00Z",
        "updated_at": "2024-08-01T14:00:00Z"
      },
      "tags": [
        "scrapy",
        "web-scraping",
        "scaling"
      ],
      "derived_memories": [
        "mem-002-skill"
      ],
      "storage": {
        "type": "file",
        "ref": "conversations/conv-002.json",
        "format": "json"
      }
    },
    {
      "id": "conv-003",
      "platform": "claude",
      "title": "AI assistant architecture and memory system design",
      "message_count": 120,
      "temporal": {
        "created_at": "2025-06-01T10:00:00Z",
        "updated_at": "2025-06-15T18:00:00Z"
      },
      "tags": [
        "ai-assistant",
        "memory-architecture",
        "distributed-systems"
      ],
      "derived_memories": [
        "mem-003-project"
      ],
      "storage": {
        "type": "file",
        "ref": "conversations/conv-003.json",
        "format": "json"
      }
    }
  ],
  "integrity": {
    "canonicalization": "RFC8785",
    "checksum": "sha256:5aabd44a251cdbb47c49a43e9723fa9154ea4ca0672e7841ada92e275b0afd94",
    "total_memories": 5
  },
  "export_type": "full",
  "type_registry": "https://portable-ai-memory.org/types/",
  "signature": {
    "algorithm": "Ed25519",
    "public_key": "z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    "value": "eyJhbGciOiJFZERTQSJ9_EXAMPLE_SIGNATURE_Rk9SIERFTU9OU1RSQVRJT04gT05MWQ",
    "signed_at": "2026-02-15T22:00:01Z",
    "key_id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
  }
}
```

## Key Sections

### Owner

The `owner` block identifies the user with a unique UUID and an optional W3C Decentralized Identifier (DID). The
`did:key` scheme encodes the Ed25519 public key directly in the identifier, enabling self-sovereign identity without a
registry.

### Memories

Five memories demonstrating different types:

- **mem-001-identity** — `identity` type: multilingual tech professional, sourced from Claude, `decay_model: "none"` (
  identity facts do not decay)
- **mem-002-skill** — `skill` type: Scrapy web scraping expertise, sourced from ChatGPT at a specific message (
  `msg-042`), `decay_model: "time_linear"` and `visibility: "shared"` with a work assistant agent
- **mem-003-project** — `project` type: AI assistant system development, sourced from Claude, confidence `1.0` with no
  decay
- **mem-004-preference** — `preference` type: prefers comprehensive technical docs, sourced from ChatGPT, confidence has
  decayed from `0.9` to `0.88` over time
- **mem-005-environment** — `environment` type: datacenter infrastructure work, sourced from Claude,
  `visibility: "shared"` with the same work assistant agent

Each memory includes full provenance tracking (`platform`, `conversation_ref`, `extraction_method`, `extractor`),
confidence scoring with decay models, temporal lifecycle fields, and access control.

### Relations

Three semantic relationships forming a knowledge graph:

- `mem-002-skill` → `mem-005-environment` (`related_to`, confidence: 0.95) — the Scrapy skill is contextually linked to
  the datacenter environment
- `mem-003-project` → `mem-002-skill` (`extends`, confidence: 0.85) — the AI assistant project builds on Scrapy
  expertise
- `mem-004-preference` → `mem-001-identity` (`supports`, confidence: 0.8) — the documentation preference reinforces the
  identity profile

### Conversations Index

References to three companion conversation files with derived memory tracking. Each entry records which memories were
extracted from that conversation (`derived_memories`), plus storage location, platform, and message count. `conv-001`
corresponds to the [Conversation Example](/examples/conversation/).

### Integrity

RFC 8785 (JCS) canonicalized checksum over all 5 memories for tamper detection. Memories are sorted by `id` before
canonicalization. The `total_memories` field provides a quick count check independent of the checksum.

### Signature

Ed25519 cryptographic signature for authenticity verification. The signature covers a payload of
`{checksum, export_id, export_date, owner_id}` canonicalized with RFC 8785 — not just the checksum — to prevent replay
attacks. The `value` here is a placeholder for demonstration purposes only.