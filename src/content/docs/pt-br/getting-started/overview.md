---
title: Visão Geral
description: Como o PAM é estruturado, como uma memória se parece e por onde começar
---

Você já viu o que o PAM faz — ele permite mover suas memórias de IA entre provedores. Esta página explica como as peças
se encaixam para que você saiba onde procurar quando precisar de detalhes.

## Como o PAM é estruturado

O PAM não é um arquivo monolítico. É um pequeno conjunto de arquivos JSON relacionados:

```
memory-store.json          <- obrigatório, o documento raiz
├── conversations/         <- arquivos complementares opcionais
│   ├── conversation-1.json
│   └── conversation-2.json
└── embeddings.json        <- arquivo complementar opcional
```

**Memory Store** (`memory-store.json`) é o documento raiz e o único arquivo obrigatório. Ele contém todas as memórias do
usuário — preferências, habilidades, fatos, experiências, objetivos, contexto. Cada memória inclui proveniência (de onde
veio), dados temporais (quando foi criada ou atualizada) e um hash de conteúdo para verificação de integridade.

**Conversations** são arquivos complementares que armazenam o histórico de conversas normalizado importado dos
provedores. São armazenados separadamente porque as conversas são grandes e nem sempre são necessárias. O memory store
os referencia via `conversations_index`. As conversas suportam ramificações (estrutura DAG) para provedores como o
OpenAI que permitem ramificações de conversa.

**Embeddings** são um arquivo complementar opcional contendo embeddings vetoriais para busca semântica. São separados
por design — nem todo consumidor de PAM precisa ou suporta embeddings. Mantê-los separados significa que o formato
principal permanece leve e independente de ferramentas.

## Dentro de uma memória

Cada memória no store é um objeto JSON. Aqui está uma entrada única:

```json
{
  "id": "mem-001",
  "type": "skill",
  "content": "User is a cloud infrastructure engineer",
  "content_hash": "sha256:e1bae3ec291c99eced01fc91b4152a0cef541fccf2034fc11b3f90f4e4d79b6e",
  "confidence": {
    "initial": 0.95,
    "current": 0.95,
    "decay_model": "none"
  },
  "temporal": {
    "created_at": "2026-02-15T00:00:00Z"
  },
  "provenance": {
    "platform": "chatgpt",
    "extraction_method": "llm_inference"
  }
}
```

- **type** — Que tipo de memória: `fact`, `preference`, `skill`, `context`, `relationship`, `goal`, `instruction`,
  `identity`, `environment`, `project`, ou `custom` (com um campo `custom_type` para extensibilidade)
- **content** — O texto legível da memória
- **content_hash** — SHA-256 do conteúdo normalizado (trim, lowercase, normalização NFC, recolher espaços em branco).
  Permite detecção de adulteração sem uma autoridade central
- **confidence** — Um objeto com scores `initial` e `current` (0.0–1.0), mais `decay_model` e `last_reinforced`
  opcionais
- **provenance** — De onde veio esta memória: qual plataforma, e o `extraction_method` usado (`llm_inference`,
  `explicit_user_input`, `api_export`, `browser_extraction` ou `manual`)

Para a lista completa de campos, consulte o [schema do Memory Store](/pt-br/schema/memory-store/).

## Relações e integridade

**Relations** conectam memórias entre si. Uma memória pode ser `supports`, `contradicts`, `extends`, `supersedes`,
`related_to` ou `derived_from` outra. Isso cria um grafo de conhecimento, não apenas uma lista plana. As relações usam os campos `from` e
`to` referenciando IDs de memória. Consulte a [seção da spec sobre relations](/pt-br/spec/v1.0/#13-relations) para detalhes.

**Integrity** funciona em dois níveis. Cada memória tem seu próprio `content_hash` para verificação individual. O memory
store completo também pode incluir um bloco `integrity` de nível superior que cobre o arquivo inteiro via
canonicalização ([JCS / RFC 8785](https://www.rfc-editor.org/rfc/rfc8785)). Qualquer pessoa que receba um arquivo PAM
pode verificar que nada foi alterado. Consulte [Verificação de Integridade](/pt-br/interop/integrity/) para o processo
completo.

## Quem usa o PAM

**Se você está construindo uma ferramenta de IA** — implemente a importação PAM para que os usuários possam trazer seu
contexto de outros assistentes. Implemente a exportação PAM para que os usuários possam sair sem perder seus dados.
Comece pelo [Schema](/pt-br/schema/overview/) e pelos [Exemplos](/pt-br/examples/overview/).

**Se você está construindo SDK Converters** — escreva importadores que transformem exportações de provedores (ChatGPT,
Claude, Gemini) no formato PAM. Consulte [Mapeamentos de Provedores](/pt-br/providers/overview/) para guias campo a campo e
o [Guia de Interop](/pt-br/interop/importing/) para heurísticas de detecção.

**Se você é um usuário que quer controle** — exporte seus dados do seu provedor de IA, passe-os por um SDK Converter
e você terá um arquivo JSON legível com tudo o que a IA sabia sobre você. Consulte
o [Quick Start](/pt-br/getting-started/quick-start/).

## Próximos passos

- **[Quick Start](/pt-br/getting-started/quick-start/)** — Valide seu primeiro arquivo PAM em 3 etapas
- **[Spec v1.0](/pt-br/spec/v1.0/)** — Especificação técnica completa com requisitos normativos
- **[Exemplos](/pt-br/examples/overview/)** — Arquivos PAM reais, do mínimo ao completo
- **[FAQ](/pt-br/getting-started/faq/)** — Perguntas frequentes sobre o formato
