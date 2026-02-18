---
title: Visão Geral de Provedores e Compatibilidade
description: Matriz de compatibilidade PAM mostrando campos suportados e status de conversão para cada provedor de IA
---

> *Os caminhos de interoperabilidade descritos aqui refletem formatos de exportação observados e estratégias de extração em fevereiro de 2026. Os provedores de IA não oferecem suporte nativo ao PAM. Os importadores DEVEM tratar esses mapeamentos como orientações de compatibilidade com base no melhor esforço. Os formatos de exportação dos provedores podem mudar sem aviso prévio. Os importadores DEVEM ser versionados e resilientes a variações de formato.*

## Provedores suportados

| Provedor                                     | Método de Exportação               | Cobertura PAM                         |
|----------------------------------------------|------------------------------------|---------------------------------------|
| [OpenAI / ChatGPT](/pt-br/providers/openai/)       | `conversations.json` via Configurações | Completa: conversas (sem memórias) |
| [Anthropic / Claude](/pt-br/providers/anthropic/)  | Exportação JSON via Configurações  | Completa: conversas e memórias        |
| [Google / Gemini](/pt-br/providers/google/)        | Google Takeout                     | Parcial: apenas conversas             |
| [Microsoft / Copilot](/pt-br/providers/microsoft/) | CSV do Privacy Dashboard           | Parcial: apenas conversas             |
| [xAI / Grok](/pt-br/providers/grok/)               | Exportação de dados via grok.com   | Completa: conversas, projetos, assets |

Todos os caminhos de importação usam SDK Converters oficiais mantidos pelo projeto PAM. Os provedores não oferecem suporte nativo ao PAM.

## Como funcionam as importações de provedores

1. **Exporte** seus dados do provedor (consulte as páginas individuais de cada provedor para instruções)
2. **Execute** o SDK Converter para aquele provedor
3. O converter **normaliza** os dados para o formato PAM
4. **Valide** a saída contra o JSON Schema do PAM

Consulte o [Guia de Importação](/pt-br/interop/importing/) para o pipeline completo e o algoritmo de auto-detecção.

:::note[Política de versão de formato]
Os formatos de exportação dos provedores mudam sem aviso prévio. Todos os importadores DEVEM ser versionados:

1. Crie uma nova versão do importador quando um formato mudar (ex.: `openai-importer/2026.01`)
2. Mantenha versões anteriores para reprocessar exportações antigas
3. Detecte automaticamente a versão do formato quando possível, usando diferenças de schema ou presença de campos
:::
