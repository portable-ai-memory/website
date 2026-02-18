---
title: Exemplo de Conversa
description: Uma conversa normalizada importada de um provedor
---

Uma conversa normalizada importada do Claude, demonstrando o schema de conversa PAM. Isto corresponde a
`conv-001` no exemplo [Complete Memory Store](/pt-br/examples/complete-memory-store/).

## Exemplo

```json
{
  "schema": "portable-ai-memory-conversation",
  "schema_version": "1.0",
  "id": "conv-001",
  "provider": {
    "name": "claude",
    "conversation_id": "28d595a3-5db0-492d-a49a-af74f13de505",
    "account_id": "acc-uuid",
    "export_format_version": "2025.01"
  },
  "title": "Initial setup and infrastructure discussion",
  "temporal": {
    "created_at": "2024-06-01T10:00:00Z",
    "updated_at": "2024-06-01T16:00:00Z"
  },
  "participants": [
    {
      "role": "user",
      "name": "User"
    },
    {
      "role": "assistant",
      "name": "Claude"
    }
  ],
  "messages": [
    {
      "id": "msg-001",
      "provider_message_id": "uuid-from-claude",
      "role": "user",
      "content": {
        "type": "text",
        "text": "Preciso configurar a infraestrutura de rede do datacenter com isolamento VLAN e BGP."
      },
      "created_at": "2024-06-01T10:00:00Z",
      "parent_id": null,
      "children_ids": [
        "msg-002"
      ],
      "model": null,
      "is_thought": false,
      "token_count": 18,
      "attachments": [],
      "citations": [],
      "tool_calls": [],
      "raw_metadata": {}
    },
    {
      "id": "msg-002",
      "provider_message_id": "uuid-from-claude-2",
      "role": "assistant",
      "content": {
        "type": "text",
        "text": "Vamos definir a topologia de rede começando pelo isolamento de VLANs por tenant e a configuração BGP para upstream."
      },
      "created_at": "2024-06-01T10:01:00Z",
      "parent_id": "msg-001",
      "children_ids": [],
      "model": "claude-3-opus-20240229",
      "is_thought": false,
      "token_count": 52,
      "attachments": [],
      "citations": [],
      "tool_calls": [],
      "raw_metadata": {}
    }
  ],
  "model": "claude-3-opus-20240229",
  "system_instruction": null,
  "is_archived": false,
  "tags": [
    "infrastructure",
    "networking",
    "datacenter"
  ],
  "import_metadata": {
    "importer": "pam-converter/1.0.0",
    "importer_version": "claude-importer/2025.01",
    "imported_at": "2026-02-15T22:00:00Z",
    "source_file": "conversations.json",
    "source_checksum": "sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  }
}
```

## Seções Principais

### Provider

Identifica a plataforma de origem (`claude`), o ID original da conversa atribuído pelo Claude (`28d595a3-...`) e a
versão do formato de exportação (`2025.01`). O `export_format_version` é utilizado pelos importadores para selecionar a
lógica de parsing correta, já que os formatos de exportação dos provedores podem mudar ao longo do tempo.

### Participants

Dois participantes com papéis normalizados: `user` e `assistant`. O PAM normaliza os valores de papel específicos de
cada provedor (as exportações do Claude usam `human`/`assistant`; o ChatGPT usa `user`/`assistant`) em um vocabulário
consistente.

### Messages

Duas mensagens demonstrando a estrutura de thread:

- **msg-001** — Mensagem do usuário com `parent_id: null` (mensagem raiz) e `children_ids: ["msg-002"]` apontando para a
  resposta. A mensagem do usuário tem `model: null` pois não foi gerada por um modelo.
- **msg-002** — Resposta do assistente com `parent_id: "msg-001"` apontando de volta para a mensagem do usuário,
  `model: "claude-3-opus-20240229"` identificando o modelo que a gerou, e `children_ids` vazio indicando que é um
  nó folha.

As conversas do Claude são lineares (sem ramificações), então `parent_id`/`children_ids` formam uma cadeia simples. Para
conversas com ramificações (como no ChatGPT), uma mensagem pode ter múltiplos filhos, cada um representando uma
bifurcação diferente na conversa. O schema de conversa PAM suporta tanto estruturas lineares quanto DAG usando os mesmos
campos.

### Import Metadata

Registra a versão do importador (`claude-importer/2025.01`), o arquivo de origem (`conversations.json`) e um checksum
SHA-256 do arquivo de origem para rastreabilidade. Isso permite a detecção de reimportação e a auditoria de qual
exportação de origem uma conversa foi derivada.
