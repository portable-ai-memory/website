---
title: Anthropic / Claude
description: Mapeamento de provedor PAM para exportações do Anthropic Claude
---

> *Os mapeamentos abaixo refletem estruturas de exportação observadas em fevereiro de 2026, verificados com base em uma exportação real contendo
90 conversas e 5134 partes de conteúdo. A Anthropic não oferece suporte nativo ao PAM. Estes mapeamentos são orientações de compatibilidade com base no melhor esforço. Os formatos de exportação dos provedores podem mudar sem aviso prévio. Os importadores DEVEM ser versionados.*

## Como exportar

1. Acesse **Configurações do Claude → Privacidade → Exportar Dados**
2. Baixe o arquivo ZIP
3. Extraia para encontrar `conversations.json`, `memories.json`, `projects.json`, `users.json`

## Arquivos de exportação

| Arquivo              | Descrição                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------|
| `conversations.json` | Array de objetos de conversa com `chat_messages`                                               |
| `memories.json`      | Memórias do usuário — `conversations_memory` (string) e `project_memories` (dict de UUID para texto) |
| `projects.json`      | Projetos — `uuid`, `name`, `description`, `prompt_template`, `docs`, `creator`                 |
| `users.json`         | Informações da conta — `uuid`, `full_name`, `email_address`, `verified_phone_number`           |

:::tip[O que você recebe]
Histórico completo de conversas, memórias do usuário (de conversas + específicas de projetos), informações da conta e projetos. O Claude é uma das exportações mais completas disponíveis.
:::

## Mapeamento de campos

### Mapeamento no nível da conversa

| Campo do provedor | Campo PAM                  | Transformação              |
|--------------------|----------------------------|---------------------------|
| `uuid`             | `provider.conversation_id` | direto                    |
| `name`             | `title`                    | direto                    |
| `summary`          | `raw_metadata.summary`     | preservar em raw_metadata |
| `created_at`       | `temporal.created_at`      | direto (já em ISO 8601)   |
| `updated_at`       | `temporal.updated_at`      | direto                    |
| `account.uuid`     | `provider.account_id`      | direto                    |
| —                  | `provider.name`            | fixo `"claude"`           |

### Mapeamento no nível da mensagem

| Campo do provedor             | Campo PAM                 | Transformação                                                   |
|-------------------------------|---------------------------|-----------------------------------------------------------------|
| `chat_messages[].uuid`        | `provider_message_id`     | direto                                                          |
| `chat_messages[].uuid`        | `id`                      | gerar UUID ou usar o original                                   |
| `chat_messages[].sender`      | `role`                    | `"human"`→`"user"`, `"assistant"`→`"assistant"`                 |
| `chat_messages[].text`        | `content.text`            | direto                                                          |
| `chat_messages[].content`     | `content.parts[]`         | se não vazio, mapear para multipart (veja mapeamento de tipo de conteúdo abaixo) |
| `chat_messages[].created_at`  | `created_at`              | direto (já em ISO 8601)                                         |
| `chat_messages[].updated_at`  | `raw_metadata.updated_at` | preservar em raw_metadata                                       |
| `chat_messages[].attachments` | `attachments`             | mapear cada um para objeto Attachment                            |
| `chat_messages[].files`       | `attachments`             | mesclar com array de attachments                                 |
| —                             | `parent_id`               | `null` (conversas do Claude são lineares)                       |
| —                             | `children_ids`            | `[]` (conversas do Claude são lineares)                         |

### Mapeamento de tipo de conteúdo

O array `content[]` do Claude contém blocos estruturados com um campo `type`. Cinco tipos foram observados:

| `content[].type` do provedor | `ContentPart.type` PAM | Campos-chave                                   | Transformação                                                                                                                 |
|-------------------------------|------------------------|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `text`                        | `text`                 | `text`, `citations[]`                          | Mapear `text` diretamente. Mapear `citations[]` para `citations[]` no nível da mensagem.                                                    |
| `thinking`                    | `text`                 | `thinking`, `summaries[]`, `cut_off`           | Mapear `thinking` para `text`. Definir `is_thought: true` na mensagem. Preservar `summaries` e `cut_off` em `raw_metadata`.    |
| `tool_use`                    | —                      | `name`, `input`, `id`                          | Mapear para `tool_calls[]` no nível da mensagem com `name`, `input`, `id`.                                                           |
| `tool_result`                 | —                      | `tool_use_id`, `name`, `content[]`, `is_error` | Mapear para uma mensagem com role `tool`. O `content[]` aninhado pode conter tipo `knowledge` com `title`, `url` — mapear para `citations[]`. |
| `token_budget`                | —                      | (sem dados úteis)                              | Descartar. Gerenciamento interno de tokens do Claude.                                                                                |

Todas as partes de conteúdo podem incluir `start_timestamp`, `stop_timestamp` (temporização por parte) e `flags` (observado sempre como
`null`). Preservar em `raw_metadata` se necessário.

#### Exemplo de `tool_use`

```json
{
  "type": "tool_use",
  "name": "web_search",
  "input": { "query": "..." },
  "id": null,
  "message": "Searching the web"
}
```

Mapeia para `tool_calls[]` do PAM:

```json
{
  "name": "web_search",
  "input": { "query": "..." },
  "id": null
}
```

#### Exemplo de `tool_result`

```json
{
  "type": "tool_result",
  "tool_use_id": null,
  "name": "web_search",
  "content": [
    {
      "type": "knowledge",
      "title": "Page Title",
      "url": "https://example.com"
    }
  ],
  "is_error": false
}
```

Itens aninhados com `content[].type: "knowledge"` mapeiam para `citations[]` do PAM:

```json
{
  "title": "Page Title",
  "url": "https://example.com"
}
```

### Mapeamento de memórias

`memories.json` contém um array de elemento único com os seguintes campos:

| Campo do provedor      | Destino PAM                    | Transformação                                                                                                                                                                  |
|------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conversations_memory` | `memories[]` (type: `context`) | Analisar a string em memórias individuais. Este é um bloco único de texto — dividir heuristicamente ou armazenar como uma única memória.                                                        |
| `project_memories`     | `memories[]` (type: `project`) | Cada chave é um UUID de projeto, o valor é texto estruturado com seções (Purpose, Current state, Key learnings, Tools). Analisar seções ou armazenar como uma única memória por projeto. |
| `account_uuid`         | `owner.id` ou referência cruzada | Vincula a `users.json[].uuid`                                                                                                                                               |

:::caution[Bugs comuns de importação]

- O campo de array de mensagens é `chat_messages`, não `messages` — esta é uma fonte frequente de erros
- Os valores de remetente são `"human"` e `"assistant"`, não `"user"` e `"assistant"` — normalize `"human"` para `"user"`
- Tanto `attachments[]` quanto `files[]` existem nas mensagens e podem conter dados diferentes — mescle ambos no
  `attachments[]` do PAM
:::

:::note[Conversas lineares]
As conversas do Claude não se ramificam. Nenhuma travessia de DAG é necessária. Defina `parent_id: null` e `children_ids: []` para todas
as mensagens. O campo `summary` (resumo gerado por IA) não está presente em todas as conversas — preserve em `raw_metadata`.
:::

## SDK Converters

O suporte a importação PAM para Claude é fornecido pelos SDK Converters oficiais mantidos pelo projeto PAM. Consulte
o [Guia de Importação](/pt-br/interop/importing/) para instruções gerais de importação e
a [Visão Geral de Provedores](/pt-br/providers/overview/) para a matriz de compatibilidade completa.
