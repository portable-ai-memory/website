---
title: Microsoft / Copilot
description: Mapeamento de provedor PAM para exportações do Microsoft Copilot
---

> *Os mapeamentos abaixo refletem estruturas de exportação observadas em fevereiro de 2026, verificadas com uma exportação real contendo
4 arquivos CSV do Microsoft Privacy Dashboard. A Microsoft não oferece suporte nativo ao PAM. Esses mapeamentos são
orientações de compatibilidade com base no melhor esforço. Os formatos de exportação do provedor podem mudar sem aviso prévio. Os importadores DEVEM ser versionados.*

## Como exportar

1. Acesse o **Microsoft Privacy Dashboard** em [account.microsoft.com/privacy](https://account.microsoft.com/privacy)
2. Solicite uma exportação de dados para atividade do Copilot
3. Baixe a exportação — ela contém arquivos CSV para diferentes tipos de atividade

## Arquivos de exportação

| Arquivo                                      | Colunas                                       | Descrição                                          |
|----------------------------------------------|-----------------------------------------------|----------------------------------------------------|
| `copilot-activity-history.csv`               | `Conversation, Time, Author, Message`         | Histórico principal de conversas com mensagens completas |
| `copilot-chat-activity.csv`                  | `CreatedAt, MessageContent, Author, ChatName` | Atividade específica de chat com nomes de conversa |
| `copilot-in-Microsoft-365-apps-activity.csv` | `CreatedAt, MessageContent, Author, ChatName` | Interações em apps M365 (pode estar vazio)         |
| `windows-apps-copilot-activity-history.csv`  | `Timestamp, ClientApp, Prompt`                | Apenas prompts de apps Windows (sem respostas)     |

:::tip[O que você recebe]
Histórico de conversas a partir de arquivos CSV. Sem memórias. Sem IDs de mensagem — UUIDs devem ser gerados. O arquivo M365 frequentemente
está vazio.
:::

## Mapeamentos de campos

### Formato CSV A: `copilot-activity-history.csv` (principal)

| Coluna CSV       | Campo PAM                  | Transformação                                           |
|------------------|----------------------------|---------------------------------------------------------|
| `Conversation`   | `title`                    | direto (nome/tópico da conversa)                        |
| `Time`           | `created_at`               | parse ISO 8601 (`2026-02-17T14:36:11`)                  |
| `Author`         | `role`                     | `"user"`→`"user"`, `"AI"`→`"assistant"`                 |
| `Message`        | `content.text`             | direto                                                  |
| —                | `provider.name`            | fixo `"copilot"`                                        |
| —                | `provider.conversation_id` | gerar a partir do valor de `Conversation` + agrupamento por sessão |

### Formato CSV B: `copilot-chat-activity.csv`

| Coluna CSV       | Campo PAM       | Transformação                               |
|------------------|-----------------|---------------------------------------------|
| `ChatName`       | `title`         | direto                                      |
| `CreatedAt`      | `created_at`    | parse `M/D/YYYY H:MM:SS +HH:MM` para ISO 8601 |
| `Author`         | `role`          | `"user"`→`"user"`, outro→`"assistant"`      |
| `MessageContent` | `content.text`  | direto                                      |
| —                | `provider.name` | fixo `"copilot"`                            |

:::caution[Dois layouts de colunas CSV]
`copilot-activity-history.csv` usa `Conversation/Time/Author/Message`, enquanto `copilot-chat-activity.csv` usa
`CreatedAt/MessageContent/Author/ChatName`. Detecte o layout examinando a linha de cabeçalho.
:::

:::note[Desafios na importação]

- **Valores de Author**: O formato activity-history usa `"user"` e `"AI"`. O formato chat-activity usa `"user"` e
  o nome de exibição do assistente. Mapeie qualquer autor diferente de `"user"` para `role: "assistant"`.
- **Sem IDs de mensagem**: As exportações CSV não contêm IDs de mensagem ou conversa. Gere UUIDs e agrupe mensagens por
  valor de `Conversation`/`ChatName` combinado com proximidade temporal.
- **Formatos de timestamp diferem**: Use um parser de datas flexível (como `dateutil`) e faça o parse de forma defensiva.
- **CSV de apps Windows**: Contém apenas prompts do usuário (sem respostas da IA) — útil para histórico de prompts, mas não consegue produzir
  conversas completas.
:::

## SDK Converters

O suporte à importação PAM para Microsoft Copilot é fornecido pelos SDK Converters oficiais mantidos pelo projeto PAM. Consulte
o [Guia de Importação](/pt-br/interop/importing/) para instruções gerais de importação e
a [Visão Geral de Provedores](/pt-br/providers/overview/) para a matriz completa de compatibilidade.
