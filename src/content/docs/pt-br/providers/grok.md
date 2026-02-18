---
title: xAI / Grok
description: Mapeamento de provedor PAM para exportações do xAI Grok
---

> *Os mapeamentos abaixo refletem estruturas de exportação observadas em fevereiro de 2026, verificados com dados reais de exportação. O xAI
não oferece suporte nativo ao PAM. Esses mapeamentos são orientações de compatibilidade com base no melhor esforço. Os formatos de exportação dos provedores podem mudar
sem aviso prévio. Os importadores DEVEM ser versionados.*

## Como exportar

1. Acesse **grok.com** → Configurações da conta → **Download your data**
2. Baixe e extraia o arquivo ZIP

## Arquivos de exportação

O ZIP contém arquivos em `ttl/30d/export_data/<user_uuid>/`:

| Arquivo                      | Descrição                                                          |
|------------------------------|--------------------------------------------------------------------|
| `prod-grok-backend.json`     | Arquivo principal: conversas, projetos, tarefas, posts de mídia    |
| `prod-mc-auth-mgmt-api.json` | Perfil do usuário e sessões                                        |
| `prod-mc-billing.json`       | Saldo de créditos                                                  |
| `prod-mc-asset-server/`      | Arquivos enviados referenciados por UUID de asset (código, imagens, PDFs, etc.) |

:::tip[O que você recebe]
Histórico completo de conversas com estrutura DAG, projetos com personalidades customizadas e posts de mídia. Arquivos de asset (uploads)
são armazenados como diretórios nomeados por UUID contendo um arquivo `content` sem extensão.
:::

## Mapeamento de campos

### Mapeamento em nível de conversa

As conversas são encapsuladas: cada item é `{"conversation": {...}, "responses": [...]}`.

| Campo do provedor                 | Campo PAM                         | Transformação      |
|-----------------------------------|-----------------------------------|--------------------|
| `conversation.id`                 | `provider.conversation_id`        | direto             |
| `conversation.title`              | `title`                           | direto             |
| `conversation.create_time`        | `temporal.created_at`             | direto (ISO 8601)  |
| `conversation.modify_time`        | `temporal.updated_at`             | direto (ISO 8601)  |
| `conversation.user_id`            | `provider.account_id`             | direto             |
| `conversation.starred`            | `raw_metadata.starred`            | preservar          |
| `conversation.system_prompt_name` | `raw_metadata.system_prompt_name` | preservar          |
| —                                 | `provider.name`                   | fixo `"grok"`      |

### Mapeamento em nível de mensagem

Cada resposta é encapsulada: `{"response": {...}, "share_link": {...}}`.

| Campo do provedor                   | Campo PAM             | Transformação                                                                            |
|-------------------------------------|-----------------------|------------------------------------------------------------------------------------------|
| `response._id`                      | `provider_message_id` | direto                                                                                   |
| `response._id`                      | `id`                  | gerar UUID ou usar o original                                                            |
| `response.parent_response_id`       | `parent_id`           | mapear ID do provedor → ID PAM                                                          |
| —                                   | `children_ids`        | reconstruir invertendo parent_response_id                                                |
| `response.sender`                   | `role`                | veja [Normalização de Role](#normalização-de-role)                                       |
| `response.message`                  | `content.text`        | direto                                                                                   |
| `response.create_time`              | `created_at`          | BSON → `datetime.fromtimestamp(int(v["$date"]["$numberLong"])/1000, tz=UTC).isoformat()` |
| `response.model`                    | `model`               | direto                                                                                   |
| `response.cited_web_search_results` | `citations`           | mapear cada `{url, title, preview}` para Citation `{url, title, snippet}` (`preview` → `snippet`) |
| `response.generated_image_urls`     | `attachments`         | mapear cada URL para Attachment com `type: "image"`                                      |
| `response.file_attachments`         | `attachments`         | mapear cada UUID de asset                                                                |
| `response.web_search_results`      | `raw_metadata.web_search_results`      | preservar                                               |
| `response.thinking_trace`          | `raw_metadata.thinking_trace`          | preservar                                               |
| `response.thinking_start_time`     | `raw_metadata.thinking_start_time`     | preservar                                               |
| `response.thinking_end_time`       | `raw_metadata.thinking_end_time`       | preservar                                               |
| `response.agent_thinking_traces`   | `raw_metadata.agent_thinking_traces`   | preservar                                               |
| `response.steps`                   | `raw_metadata.steps`                   | preservar (cadeia de execução de ferramentas)            |
| `response.query`                   | `raw_metadata.query`                   | preservar                                               |
| `response.query_type`              | `raw_metadata.query_type`              | preservar                                               |
| `response.xpost_ids`              | `raw_metadata.xpost_ids`              | preservar                                               |
| `response.webpage_urls`           | `raw_metadata.webpage_urls`           | preservar                                               |
| `response.card_attachments_json`  | `raw_metadata.card_attachments_json`  | preservar                                               |
| `response.error`                  | `raw_metadata.error`                  | preservar                                               |
| `response.metadata`               | `raw_metadata.grok_metadata`          | preservar (renomeado para evitar colisão)               |

### Normalização de role

Quatro valores distintos de sender foram observados: `"human"`, `"assistant"`, `"ASSISTANT"` (maiúsculo) e nomes de modelo
como `"grok-3"`. A normalização DEVE ser case-insensitive. Trate qualquer valor que não seja `"human"` (case-insensitive)
como `"assistant"`.

| Valor do provedor     | Valor normalizado PAM |
|-----------------------|-----------------------|
| `human`               | `user`                |
| `assistant`           | `assistant`           |
| `ASSISTANT`           | `assistant`           |
| `grok-3` (nome do modelo) | `assistant`      |
| qualquer valor não-`human` | `assistant`     |

### Tratamento de timestamps

O Grok usa **dois formatos diferentes de timestamp** dentro do mesmo arquivo:

| Nível        | Formato                                 | Transformação                                                                     |
|--------------|-----------------------------------------|-----------------------------------------------------------------------------------|
| Conversa     | ISO 8601                                | direto                                                                            |
| Mensagem     | BSON `{"$date":{"$numberLong":"<ms>"}}` | `datetime.fromtimestamp(int(v["$date"]["$numberLong"])/1000, tz=UTC).isoformat()` |

Dois parsers separados são necessários para o mesmo arquivo.

## Notas importantes

- **Encapsulamento aninhado**: Toda conversa é `{conversation, responses}` e toda resposta é `{response, share_link}`.
  É necessário desencapsular duas vezes.
- **Estrutura DAG**: `parent_response_id` está presente na maioria das mensagens. Suporta conversas com ramificação. `children_ids`
  deve ser reconstruído invertendo as referências de parent.
- **Mensagens vazias**: Algumas respostas têm `message: ""` (string vazia). Normalmente são respostas de geração de imagem
  onde o conteúdo está em `generated_image_urls`.
- **Steps = cadeia de uso de ferramentas**: `steps[]` contém execução estruturada de ferramentas com `tagged_text` e
  `tool_usage_results`. Este é o equivalente do Grok ao function calling. Preservar em `raw_metadata`.
- **Thinking traces**: Dois mecanismos — `thinking_trace` (string inline) e `agent_thinking_traces[]` (array). Ambos podem
  estar presentes na mesma resposta. Preservar em `raw_metadata`.
- **Arquivos de asset**: Uploads são armazenados como diretórios nomeados por UUID em `prod-mc-asset-server/`, cada um contendo um arquivo `content`
  sem extensão. Use inspeção de conteúdo para determinar o tipo.

## SDK Converters

O suporte de importação PAM para o Grok é fornecido pelos SDK Converters oficiais mantidos pelo projeto PAM. Consulte
o [Guia de Importação](/pt-br/interop/importing/) para instruções gerais de importação e
a [Visão Geral de Provedores](/pt-br/providers/overview/) para a matriz completa de compatibilidade.
