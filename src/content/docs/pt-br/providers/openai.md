---
title: OpenAI / ChatGPT
description: Mapeamento de provedor PAM para exportações do OpenAI ChatGPT
---

> *Os mapeamentos abaixo refletem estruturas de exportação observadas em fevereiro de 2026, verificados com base na
documentação oficial da OpenAI e dados de exportação validados pela comunidade. A OpenAI não oferece suporte nativo ao PAM. Estes mapeamentos são orientações de compatibilidade com base no melhor esforço. Os formatos de exportação dos provedores podem mudar sem aviso prévio. Os importadores DEVEM ser versionados.*

## Como exportar

1. Acesse **Configurações do ChatGPT → Controles de Dados → Exportar Dados**
2. Você receberá um e-mail com um link para download
3. Baixe e extraia o arquivo ZIP

## Arquivos de exportação

| Arquivo                     | Descrição                                                          |
|-----------------------------|--------------------------------------------------------------------|
| `conversations.json`        | Todo o histórico de conversas como um array JSON com estrutura DAG |
| `chat.html`                 | Versão legível por humanos (renderiza JSON via JS no lado cliente) |
| `user.json`                 | Metadados da conta (id, email, telefone, plano)                    |
| `message_feedback.json`     | Avaliações positivas/negativas com descrições em texto             |
| `shared_conversations.json` | Conversas compartilhadas via link público                          |
| `tool_messages.json`        | Respostas e metadados relacionados a ferramentas                   |
| `*.dat`                     | Assets de imagens DALL-E (na verdade arquivos PNG com metadados C2PA) |

:::tip[O que você recebe]
Histórico completo de conversas com estrutura DAG. Sem memórias — as memórias do ChatGPT não são incluídas na exportação até fevereiro de 2026.
:::

## Mapeamento de campos

### Mapeamento no nível da conversa

| Campo do provedor | Campo PAM                  | Transformação                                   |
|--------------------|----------------------------|-------------------------------------------------|
| `id`               | `provider.conversation_id` | direto                                          |
| `title`            | `title`                    | direto                                          |
| `create_time`      | `temporal.created_at`      | `datetime.fromtimestamp(v, tz=UTC).isoformat()` |
| `update_time`      | `temporal.updated_at`      | `datetime.fromtimestamp(v, tz=UTC).isoformat()` |
| —                  | `provider.name`            | fixo `"chatgpt"`                                |

### Mapeamento no nível da mensagem

As mensagens estão em `mapping[message_id]`, não em um array simples. Percorra seguindo as referências `parent` e `children`.

| Campo do provedor                         | Campo PAM                           | Transformação                                                            |
|-------------------------------------------|-------------------------------------|--------------------------------------------------------------------------|
| `mapping[k].id`                           | `provider_message_id`               | direto                                                                   |
| `mapping[k].id`                           | `id`                                | gerar UUID ou usar o original                                            |
| `mapping[k].parent`                       | `parent_id`                         | mapear ID do provedor para ID PAM                                        |
| `mapping[k].children`                     | `children_ids`                      | mapear IDs do provedor para IDs PAM                                      |
| `mapping[k].message.author.role`          | `role`                              | `user`→`user`, `assistant`→`assistant`, `system`→`system`, `tool`→`tool` |
| `mapping[k].message.content.content_type` | `content.type`                      | `"text"`→`"text"`, `"multimodal_text"`→`"multipart"`                     |
| `mapping[k].message.content.parts[]`      | `content.text` ou `content.parts[]` | juntar parts para texto, separar para multipart                          |
| `mapping[k].message.create_time`          | `created_at`                        | Unix epoch float → ISO 8601                                              |
| `mapping[k].message.metadata.model_slug`  | `model`                             | direto se presente                                                       |

:::caution[Estrutura DAG]
O campo `mapping` é um grafo, não uma lista. Algumas conversas possuem múltiplos nós raiz ou mensagens órfãs. Percorra
o grafo a partir dos nós raiz, seguindo os links `children`. Entradas onde `message` é `null` são placeholders estruturais — ignore-as.
:::

:::note[Timestamps e conteúdo]

- Algumas mensagens possuem `create_time: 0` ou `null`. Use o `create_time` no nível da conversa como fallback.
- `parts[]` pode conter strings, dicts (para imagens) ou entradas `null`. Filtre valores `null` antes do processamento.
- Dados de imagens DALL-E estão em `message.metadata` com um `request_id` vinculado aos arquivos `*.dat` na exportação.
:::

## SDK Converters

O suporte a importação PAM para ChatGPT é fornecido pelos SDK Converters oficiais mantidos pelo projeto PAM. Consulte
o [Guia de Importação](/pt-br/interop/importing/) para instruções gerais de importação e
a [Visão Geral de Provedores](/pt-br/providers/overview/) para a matriz de compatibilidade completa.
