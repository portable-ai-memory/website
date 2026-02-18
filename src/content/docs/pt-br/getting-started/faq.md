---
title: FAQ
description: Perguntas frequentes sobre o formato Portable AI Memory, compatibilidade e uso
---

## O que é o PAM em uma frase?

PAM é um formato JSON aberto que permite mover suas memórias de IA (preferências, habilidades, contexto) entre
provedores como ChatGPT, Claude, Gemini e qualquer outra ferramenta de IA.

## O PAM é um formato de armazenamento?

Não. PAM é um formato de intercâmbio — ele define como as memórias são exportadas e importadas entre sistemas. Não é um
schema de banco de dados nem um formato de armazenamento em tempo de execução. Pense nele como o vCard para contatos ou
o iCalendar para eventos: uma representação portátil que qualquer sistema pode ler e escrever.

## Como o PAM é diferente de simplesmente exportar JSON do meu provedor?

As exportações de provedores são proprietárias e incompatíveis. A exportação do ChatGPT tem uma estrutura diferente da
do Claude, que é diferente da do Gemini. Nenhuma delas pode ser carregada em outro provedor.

O PAM normaliza todas elas em um formato consistente único com memórias tipadas, rastreamento de proveniência, hashes de
integridade e um schema definido. Um arquivo PAM do ChatGPT se parece exatamente com um arquivo PAM do Claude — é isso
que torna a migração possível. Consulte [Mapeamentos de Provedores](/pt-br/providers/overview/) para as diferenças específicas
entre os formatos de provedores.

## O PAM exige suporte do provedor?

Não. O PAM funciona via SDK Converters oficiais que leem os arquivos de exportação dos provedores. Os
provedores não precisam suportar o PAM nativamente. Você exporta seus dados usando o recurso de exportação existente do
provedor, e então um SDK Converter os transforma no formato PAM. Consulte o [Guia de Interop](/pt-br/interop/importing/) para ver
como os conversores funcionam.

## O que acontece quando um provedor muda seu formato de exportação?

Os conversores são versionados. Cada conversor declara qual versão do formato de exportação do provedor ele suporta.
Quando um formato muda, uma nova versão do conversor é criada, enquanto a antiga continua funcionando para exportações
mais antigas. A spec exige que os importadores sejam versionados e resilientes a variações de formato.
Consulte [Mapeamentos de Provedores](/pt-br/providers/overview/) para o status atual dos conversores.

## Como exporto meus dados do ChatGPT, Claude ou Gemini?

Cada provedor tem um processo de exportação diferente:

- **ChatGPT**: Settings → Data controls → Export data
- **Claude**: Settings → Account → Export data (fornece `chat_messages` como JSON)
- **Gemini**: Via [Google Takeout](https://takeout.google.com/) selecionando "Gemini Apps"
- **Copilot**: Via exportação de dados da conta ou Microsoft Graph API

O mapeamento detalhado campo a campo para cada provedor está na seção [Provedores](/pt-br/providers/overview/).

## Posso editar meu arquivo PAM?

Sim. Os arquivos PAM são JSON simples — você pode abrir, ler, editar e excluir qualquer coisa com um editor de texto ou
qualquer ferramenta JSON. Quer remover uma memória que a IA inferiu incorretamente? Exclua a entrada. Quer corrigir
algo? Edite o campo `content` e recompute o `content_hash`. O formato foi projetado para ser legível por humanos e
controlado pelo usuário.

## Quais tipos de memória o PAM suporta?

Os tipos integrados são: `fact`, `preference`, `skill`, `context`, `relationship`, `goal`, `instruction`, `identity`,
`environment` e `project`. Você também pode definir tipos personalizados usando `type: "custom"` com um campo
`custom_type` (por exemplo, `"custom_type": "medical_condition"`). Cada memória tem um campo `type` que a categoriza.
Consulte a [Especificação](/pt-br/spec/v1.0/) para as definições completas de tipos.

## E o meu histórico de conversas?

O PAM lida com conversas separadamente das memórias. As conversas são armazenadas como arquivos complementares usando um
formato normalizado que suporta recursos como ramificações (para provedores como o OpenAI que permitem ramificações de
conversa) e conteúdo multipart (texto, código, imagens). Elas são referenciadas no memory store via
`conversations_index`. Consulte o [schema de Conversations](/pt-br/schema/conversations/) para detalhes.

## O PAM é aberto?

Sim. O texto da especificação está licenciado sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Os schemas
JSON e o código de referência estão licenciados sob [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Tudo está
no [GitHub](https://github.com/portable-ai-memory/portable-ai-memory).

## Posso usar o PAM localmente?

Sim. PAM é um formato JSON sem dependência de servidor. Você pode criar, validar e ler arquivos PAM totalmente offline
usando ferramentas JSON padrão. Consulte o [Quick Start](/pt-br/getting-started/quick-start/) para validar seu primeiro
arquivo em três etapas.

## O PAM está pronto para produção?

A especificação está em **v1.0 Published**. Os schemas JSON validam conforme o Draft 2020-12. Exemplos e mapeamentos de
provedores estão documentados. SDK Converters e uma implementação de referência estão em desenvolvimento. A
spec está pronta para implementação — as ferramentas estão em fase de atualização.

## Por que hashing determinístico?

Os hashes de conteúdo permitem verificação de integridade sem uma autoridade central. Qualquer parte pode verificar
independentemente que o conteúdo da memória não foi adulterado, recomputando o hash usando as regras de normalização da
spec (trim, lowercase, normalização NFC, recolher espaços em branco, depois SHA-256). Isso importa para a confiança — se
você receber um arquivo PAM, pode provar que seu conteúdo não foi alterado.
Consulte [Verificação de Integridade](/pt-br/interop/integrity/) para o processo completo.

## Como o PAM se relaciona com o MCP?

Eles são complementares. O [MCP](https://modelcontextprotocol.io/) (Model Context Protocol) é um protocolo em tempo de
execução para interação com ferramentas de IA — ele define como as ferramentas se comunicam em tempo real. O PAM é um
formato de intercâmbio de dados para memória persistida do usuário — ele define como as memórias são armazenadas e
transferidas entre sistemas. Eles resolvem problemas diferentes e podem coexistir: uma ferramenta de IA poderia usar MCP
para operações em tempo de execução e PAM para importar/exportar contexto do usuário.

## Como posso contribuir?

O PAM é conduzido pela comunidade. Você pode contribuir reportando problemas, propondo mudanças na spec, construindo
SDK Converters ou melhorando a documentação. Consulte [Contribuindo](/pt-br/governance/contributing/) para detalhes e
o [repositório no GitHub](https://github.com/portable-ai-memory/portable-ai-memory) para o código-fonte.
