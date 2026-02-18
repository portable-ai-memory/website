---
title: Schema de Conversas
description: O schema normalizado de conversas do PAM — estrutura padronizada para históricos de chat importados
---

O Conversations schema define o formato normalizado para armazenamento de conversas independente de provedor. Exports
brutos de provedores (OpenAI, Anthropic, Google, Microsoft, xAI) são analisados e normalizados para este formato.
Conversas armazenadas neste formato são referenciadas por `conversations_index` no memory store.

Este formato preserva o grafo completo de mensagens, incluindo ramificações (DAG) de provedores como OpenAI.

## Download

[portable-ai-memory-conversation.schema.json](/schemas/portable-ai-memory-conversation.schema.json)

Schema: JSON Schema Draft 2020-12 · License: Apache 2.0

## Root Fields

### Required

| Field            | Type                            | Description                                                                                 |
|------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| `schema`         | `string`                        | Deve ser `"portable-ai-memory-conversation"`                                                     |
| `schema_version` | `string`                        | Versão do schema. Deve corresponder à versão do memory-store schema                              |
| `id`             | `string`                        | Identificador único da conversa. Recomenda-se UUID v4. Referenciado por `conversations_index`    |
| `provider`       | [`ProviderInfo`](#providerinfo) | Informações do provedor de origem e identificadores originais                               |
| `temporal`       | `object`                        | Timestamps. Campo obrigatório: `created_at` (ISO 8601). Opcional: `updated_at`              |
| `messages`       | [`Message[]`](#message)         | Array de mensagens normalizadas                                                             |

### Optional

| Field                | Type                                | Default | Description                                                                                   |
|----------------------|-------------------------------------|---------|-----------------------------------------------------------------------------------------------|
| `title`              | `string \| null`                    | `null`  | Título legível da conversa obtido do export do provedor                                       |
| `participants`       | [`Participant[]`](#participant)     | `[]`    | Participantes — tipicamente usuário + assistente, pode incluir system ou tool                 |
| `model`              | `string \| null`                    | `null`  | Modelo primário utilizado (ex.: `gpt-4o`, `claude-3-opus-20240229`). Pode variar por mensagem |
| `system_instruction` | `string \| null`                    | `null`  | System prompt ou instrução ativa para esta conversa                                           |
| `is_archived`        | `boolean`                           | `false` | Se foi arquivada pelo usuário na plataforma de origem                                         |
| `tags`               | `string[]`                          | `[]`    | Tags ou tópicos. Padrão: `^[a-z0-9][a-z0-9_-]*$`                                              |
| `raw_metadata`       | `object`                            | `{}`    | Metadados específicos do provedor preservados literalmente. Não interpretados pelo PAM        |
| `import_metadata`    | [`ImportMetadata`](#importmetadata) | —       | Metadados sobre o processo de importação                                                      |

## Definitions

### ProviderInfo

Informações do provedor de origem. Preserva identificadores originais para rastreabilidade.

| Field                   | Type             | Required | Description                                                                                                                                                                                      |
|-------------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                  | `string`         | yes      | Identificador do provedor. Deve usar nomes de produto (`chatgpt`, `claude`, `gemini`, `copilot`, `grok`), não nomes de empresa. Mesmo namespace que `provenance.platform` no memory-store schema |
| `conversation_id`       | `string \| null` | no       | ID original da conversa do export do provedor                                                                                                                                                    |
| `account_id`            | `string \| null` | no       | ID da conta do usuário na plataforma do provedor                                                                                                                                                 |
| `export_format_version` | `string \| null` | no       | Versão do formato de export do provedor (ex.: `2025-01-export`). Usado para selecionar o parser correto                                                                                          |

### Participant

| Field         | Type             | Required | Description                                          |
|---------------|------------------|----------|------------------------------------------------------|
| `role`        | `string`         | yes      | `"user"`, `"assistant"`, `"system"` ou `"tool"`      |
| `name`        | `string \| null` | no       | Nome de exibição, se disponível                      |
| `provider_id` | `string \| null` | no       | Identificador do participante específico do provedor |

### Message

Uma única mensagem normalizada. Para conversas lineares, as mensagens estão em ordem cronológica. Para conversas com
ramificação (ex.: OpenAI), use `parent_id` e `children_ids` para reconstruir o DAG.

#### Required fields

| Field        | Type     | Description                                                                                                                                                                                                                      |
|--------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`         | `string` | ID único da mensagem dentro desta conversa. Recomenda-se UUID v4                                                                                                                                                                 |
| `role`       | `string` | Role normalizado: `"user"`, `"assistant"`, `"system"`, `"tool"`. Valores específicos do provedor são mapeados (ex.: `human` → `user`, `AI` → `assistant`). Veja [Provider Mappings](/pt-br/providers/overview/) para a tabela completa |
| `created_at` | `string` | Timestamp ISO 8601. Convertido a partir do formato do provedor (Unix epoch para OpenAI, ISO para os demais)                                                                                                                      |

#### Optional fields

| Field                 | Type                                | Default | Description                                                                                                              |
|-----------------------|-------------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------|
| `provider_message_id` | `string \| null`                    | `null`  | ID original da mensagem do export do provedor                                                                            |
| `content`             | [`MessageContent`](#messagecontent) | —       | Conteúdo da mensagem. Pode ser texto simples ou multipart                                                                |
| `parent_id`           | `string \| null`                    | `null`  | ID da mensagem pai para reconstrução do DAG. `null` para mensagens raiz                                                  |
| `children_ids`        | `string[]`                          | `[]`    | IDs das mensagens filhas. Múltiplos filhos indicam ramificação                                                           |
| `model`               | `string \| null`                    | `null`  | Modelo que gerou esta mensagem (mensagens do assistente)                                                                 |
| `is_thought`          | `boolean`                           | `false` | Etapa interna de raciocínio/pensamento (Gemini `isThought`, Claude extended thinking). Não faz parte da conversa visível |
| `token_count`         | `integer \| null`                   | `null`  | Contagem de tokens, se disponível no provedor                                                                            |
| `attachments`         | [`Attachment[]`](#attachment)       | `[]`    | Arquivos, imagens ou outros anexos                                                                                       |
| `citations`           | [`Citation[]`](#citation)           | `[]`    | Citações ou fontes referenciadas por esta mensagem                                                                       |
| `tool_calls`          | [`ToolCall[]`](#toolcall)           | `[]`    | Chamadas de tool/função feitas pelo assistente                                                                           |
| `raw_metadata`        | `object`                            | `{}`    | Metadados específicos do provedor preservados literalmente                                                               |

### MessageContent

Conteúdo normalizado de mensagem. Suporta tanto texto simples quanto conteúdo multipart.

| Field   | Type                            | Required | Description                                                                      |
|---------|---------------------------------|----------|----------------------------------------------------------------------------------|
| `type`  | `string`                        | yes      | `"text"` (conteúdo no campo `text`) ou `"multipart"` (conteúdo no array `parts`) |
| `text`  | `string \| null`                | no       | Conteúdo de texto simples. Usado quando `type` é `"text"`                        |
| `parts` | [`ContentPart[]`](#contentpart) | no       | Array de partes de conteúdo. Usado quando `type` é `"multipart"`                 |

### ContentPart

Uma única parte de conteúdo multipart.

| Field       | Type             | Required | Description                                                                |
|-------------|------------------|----------|----------------------------------------------------------------------------|
| `type`      | `string`         | yes      | `"text"`, `"image"`, `"code"`, `"file"`, `"audio"`, `"video"`              |
| `text`      | `string \| null` | no       | Conteúdo de texto (para partes `text` e `code`)                            |
| `language`  | `string \| null` | no       | Linguagem de programação (para partes `code`)                              |
| `mime_type` | `string \| null` | no       | Tipo MIME (para partes de conteúdo binário)                                |
| `ref`       | `string \| null` | no       | Referência a arquivo externo (caminho, URL ou referência de armazenamento) |

### Attachment

Arquivo ou anexo de mídia em uma mensagem.

| Field         | Type              | Required | Description                                             |
|---------------|-------------------|----------|---------------------------------------------------------|
| `type`        | `string`          | yes      | `"file"`, `"image"`, `"audio"`, `"video"`, `"document"` |
| `name`        | `string \| null`  | no       | Nome original do arquivo                                |
| `mime_type`   | `string \| null`  | no       | Tipo MIME                                               |
| `size_bytes`  | `integer \| null` | no       | Tamanho do arquivo em bytes                             |
| `ref`         | `string \| null`  | no       | Referência ao arquivo armazenado                        |
| `provider_id` | `string \| null`  | no       | Identificador do anexo específico do provedor           |

### Citation

Uma citação ou fonte referenciada por uma mensagem.

| Field     | Type             | Required | Description               |
|-----------|------------------|----------|---------------------------|
| `title`   | `string \| null` | no       | Título da fonte citada    |
| `url`     | `string \| null` | no       | URL da fonte citada       |
| `snippet` | `string \| null` | no       | Trecho relevante da fonte |

### ToolCall

Uma chamada de tool ou função feita pelo assistente.

| Field    | Type                       | Required | Description                                |
|----------|----------------------------|----------|--------------------------------------------|
| `id`     | `string \| null`           | no       | Identificador da chamada de tool           |
| `name`   | `string`                   | yes      | Nome da tool ou função chamada             |
| `input`  | `object \| string \| null` | no       | Parâmetros de entrada passados para a tool |
| `output` | `string \| null`           | no       | Saída retornada pela tool                  |

### ImportMetadata

Metadados sobre o processo de importação. Permite depuração e reimportação.

| Field              | Type             | Required | Description                                                                  |
|--------------------|------------------|----------|------------------------------------------------------------------------------|
| `importer`         | `string \| null` | no       | Identificador do sistema importador. Formato: `system/version`               |
| `importer_version` | `string \| null` | no       | Versão do importador específica do provedor (ex.: `openai-importer/2025.01`) |
| `imported_at`      | `string \| null` | no       | Timestamp ISO 8601 da importação                                             |
| `source_file`      | `string \| null` | no       | Caminho ou identificador do arquivo de origem                                |
| `source_checksum`  | `string \| null` | no       | SHA-256 do arquivo de origem. Padrão: `^sha256:[a-f0-9]{64}$`                |

## Relacionado

- [Exemplo de Conversa](/pt-br/examples/conversation/)
- [Mapeamentos de Provedores](/pt-br/providers/overview/) — Mapeamento campo a campo de cada provedor
- [Spec §25](/pt-br/spec/v1.0/#25-normalized-conversation-format) — Definição normativa do formato
