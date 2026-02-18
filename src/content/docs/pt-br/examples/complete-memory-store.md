---
title: Memory Store Completo
description: Um memory store PAM completo com múltiplos tipos, relações e integridade
---

Um memory store PAM completo demonstrando múltiplos tipos de memória, relações semânticas, índice de conversas e verificação de integridade.

## Exemplo

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

## Seções Principais

### Owner

O bloco `owner` identifica o usuário com um UUID único e um Identificador Descentralizado (DID) W3C opcional. O esquema `did:key` codifica a chave pública Ed25519 diretamente no identificador, permitindo identidade auto-soberana sem um registro.

### Memórias

Cinco memórias demonstrando diferentes tipos:

- **mem-001-identity** — tipo `identity`: profissional de tecnologia multilíngue, originado do Claude, `decay_model: "none"` (fatos de identidade não decaem)
- **mem-002-skill** — tipo `skill`: expertise em web scraping com Scrapy, originado do ChatGPT em uma mensagem específica (`msg-042`), `decay_model: "time_linear"` e `visibility: "shared"` com um agente assistente de trabalho
- **mem-003-project** — tipo `project`: desenvolvimento de sistema de assistente de IA, originado do Claude, confiança `1.0` sem decaimento
- **mem-004-preference** — tipo `preference`: prefere documentação técnica abrangente, originado do ChatGPT, confiança decaiu de `0.9` para `0.88` ao longo do tempo
- **mem-005-environment** — tipo `environment`: trabalho em infraestrutura de datacenter, originado do Claude, `visibility: "shared"` com o mesmo agente assistente de trabalho

Cada memória inclui rastreamento completo de proveniência (`platform`, `conversation_ref`, `extraction_method`, `extractor`), pontuação de confiança com modelos de decaimento, campos de ciclo de vida temporal e controle de acesso.

### Relações

Três relacionamentos semânticos formando um grafo de conhecimento:

- `mem-002-skill` → `mem-005-environment` (`related_to`, confiança: 0.95) — a habilidade em Scrapy está contextualmente ligada ao ambiente de datacenter
- `mem-003-project` → `mem-002-skill` (`extends`, confiança: 0.85) — o projeto de assistente de IA se baseia na expertise em Scrapy
- `mem-004-preference` → `mem-001-identity` (`supports`, confiança: 0.8) — a preferência por documentação reforça o perfil de identidade

### Índice de Conversas

Referências a três arquivos de conversa complementares com rastreamento de memórias derivadas. Cada entrada registra quais memórias foram extraídas daquela conversa (`derived_memories`), além da localização de armazenamento, plataforma e contagem de mensagens. `conv-001` corresponde ao [Exemplo de Conversa](/pt-br/examples/conversation/).

### Integridade

Checksum canonicalizado com RFC 8785 (JCS) sobre todas as 5 memórias para detecção de adulteração. As memórias são ordenadas por `id` antes da canonicalização. O campo `total_memories` fornece uma verificação rápida de contagem independente do checksum.

### Assinatura

Assinatura criptográfica Ed25519 para verificação de autenticidade. A assinatura cobre um payload de `{checksum, export_id, export_date, owner_id}` canonicalizado com RFC 8785 — não apenas o checksum — para prevenir ataques de replay. O `value` aqui é um placeholder apenas para fins de demonstração.
