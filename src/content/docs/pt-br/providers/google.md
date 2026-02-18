---
title: Google / Gemini
description: Mapeamento de provedor PAM para exportações do Google Gemini
---

> *Os mapeamentos abaixo refletem estruturas de exportação observadas, verificadas com dados de exportação validados pela comunidade e documentação do Google
Takeout. O Google não oferece suporte nativo ao PAM. Esses mapeamentos são orientações de compatibilidade com base no melhor esforço.
Os formatos de exportação do provedor podem mudar sem aviso prévio. Os importadores DEVEM ser versionados.*

## Como exportar

1. Acesse [takeout.google.com](https://takeout.google.com)
2. Desmarque tudo, depois selecione **My Activity → Gemini Apps**
3. Clique em "Multiple formats" e altere o formato de HTML para **JSON**
4. Solicite a exportação e baixe o arquivo resultante
5. O arquivo relevante está em `Takeout/My Activity/Gemini Apps/MyActivity.json`

:::caution[Erro comum]
Selecione "My Activity → Gemini Apps", e não uma listagem separada do produto "Gemini". Selecionar o produto errado produz uma
exportação vazia ou somente em HTML. O formato também deve ser explicitamente alterado para JSON — o padrão é HTML.
:::

## Arquivos de exportação

| Arquivo                                           | Descrição                                      |
|---------------------------------------------------|------------------------------------------------|
| `Takeout/My Activity/Gemini Apps/MyActivity.json` | Array JSON único de eventos de atividade       |

:::tip[O que você recebe]
Histórico de conversas reconstruído a partir de eventos de atividade. Sem memórias. As respostas podem estar truncadas ou totalmente omitidas —
perda de dados no conteúdo das respostas exportadas é esperada.
:::

## Estrutura da exportação

O formato do Takeout é um **log de atividade**, não um arquivo de conversas. Cada entrada registra uma única interação com um
timestamp e URL da conversa. Para reconstruir conversas completas, um importador deve agrupar entradas por ID de conversa (
extraído do campo `titleUrl`) e ordenar por `time`.

## Mapeamentos de campos

### Mapeamento de eventos de atividade

Cada elemento do array é uma única troca de prompt e resposta:

| Campo do provedor | Campo PAM                  | Transformação                                                |
|--------------------|----------------------------|--------------------------------------------------------------|
| `titleUrl`         | `provider.conversation_id` | extrair ID da conversa do caminho da URL (`/app/c/<id>`)     |
| —                  | `title`                    | extrair da primeira mensagem do usuário por conversa, ou `null` |
| `time`             | `created_at`               | direto (já é ISO 8601)                                       |
| —                  | `provider.name`            | fixo `"gemini"`                                              |

### Mapeamento de mensagens — variante A (array `details`)

Algumas exportações usam um array `details` de pares chave-valor nomeados:

```json
{
  "header": "Gemini",
  "title": "Used Gemini Apps",
  "titleUrl": "https://gemini.google.com/app/c/<conversation_id>",
  "time": "2024-02-17T22:05:10.123Z",
  "products": ["Gemini Apps"],
  "details": [
    { "name": "Request", "value": "User prompt here" },
    { "name": "Response", "value": "Gemini response here" }
  ]
}
```

| Campo do provedor | Campo PAM      | Transformação                                    |
|--------------------|----------------|--------------------------------------------------|
| `details[].value`  | `content.text` | direto                                           |
| `details[].name`   | `role`         | `"Request"`→`"user"`, `"Response"`→`"assistant"` |

### Mapeamento de mensagens — variante B (array `userInteractions`)

Outras exportações usam um array `userInteractions` com strings JSON serializadas:

```json
{
  "header": "Gemini",
  "title": "Used Gemini Apps",
  "titleUrl": "https://gemini.google.com/app/c/<conversation_id>",
  "time": "2024-01-26T12:45:12.686Z",
  "products": ["Gemini Apps"],
  "userInteractions": [
    {
      "userInteraction": {
        "endpoint": 2,
        "request": "[{...}]",
        "response": "[{...}]"
      }
    }
  ]
}
```

| Campo do provedor                            | Campo PAM      | Transformação                                |
|----------------------------------------------|----------------|----------------------------------------------|
| `userInteractions[].userInteraction.request`  | `content.text` | fazer parse da string JSON, extrair texto    |
| `userInteractions[].userInteraction.response` | `content.text` | fazer parse da string JSON, extrair texto    |
| —                                             | `role`         | `request`→`"user"`, `response`→`"assistant"` |

:::caution[Duas variantes de formato]
Ambas as variantes `details` e `userInteractions` podem aparecer no mesmo arquivo. Detecte por entrada qual variante está presente.
O campo `title` em cada entrada é sempre `"Used Gemini Apps"`, não um título de conversa — gere um título a partir da
primeira mensagem do usuário.
:::

:::note[Qualidade dos dados]

- Exportações vazias são comuns — ter "Gemini App Activity" pausado nas configurações da conta Google produz um arquivo vazio
- O Takeout do Gemini frequentemente trunca ou omite completamente o texto da resposta — essa perda de dados não pode ser recuperada
- Cada entrada é uma única troca, não uma conversa completa — agrupe por ID de conversa do `titleUrl` e ordene por `time`
:::

## SDK Converters

O suporte à importação PAM para Gemini é fornecido pelos SDK Converters oficiais mantidos pelo projeto PAM. Consulte
o [Guia de Importação](/pt-br/interop/importing/) para instruções gerais de importação e
a [Visão Geral de Provedores](/pt-br/providers/overview/) para a matriz completa de compatibilidade.
