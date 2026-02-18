---
title: Sobre o PAM
description: Missão e objetivos de design do Portable AI Memory
---

## Missão

Portable AI Memory (PAM) é uma especificação aberta para intercâmbio de memórias de IA de forma independente de fornecedor. Ela existe para dar aos usuários a propriedade e a portabilidade do contexto que os assistentes de IA constroem sobre eles.

Hoje, cada provedor de IA armazena suas preferências, habilidades e contexto em um formato proprietário que não pode ser transferido. O PAM define um formato comum para que suas memórias possam acompanhá-lo — entre ChatGPT, Claude, Gemini, Copilot, modelos locais e qualquer provedor futuro.

## Objetivos de design

O PAM foi projetado para ser:

- **Baseado em JSON** — JSON padrão, legível e editável por qualquer linguagem de programação
- **Determinístico** — [content hashing](/pt-br/interop/integrity/#per-memory-content-hash)
  e [canonicalização](/pt-br/interop/integrity/#file-level-integrity-block) produzem resultados consistentes e reproduzíveis
- **Verificável** — hashes SHA-256, blocos de integridade
  e [assinaturas opcionais](/pt-br/interop/integrity/#cryptographic-signatures) permitem detecção de adulteração sem uma autoridade central
- **Extensível** —
  novos [tipos de memória](/pt-br/schema/memory-store/#memorytype), [tipos de relação](/pt-br/schema/memory-store/#relationobject) e
  campos de metadados podem ser adicionados sem quebrar implementações existentes
- **Independente de provedor** — sem dependência de qualquer provedor, plataforma ou serviço de IA específico

## O que o PAM não é

- O PAM **não é um protocolo de tempo de execução** — é um formato de intercâmbio de dados. Para comunicação de ferramentas de IA em tempo de execução,
  veja o [MCP](https://modelcontextprotocol.io/)
- O PAM **não é uma especificação de armazenamento** — ele define como as memórias são trocadas, não como são armazenadas internamente.
  Implementações devem usar bancos de dados e precisam suportar exportação/importação usando o formato PAM
- O PAM **não é afiliado nem endossado por** nenhum provedor de IA

## Governança

O PAM é desenvolvido como um projeto open-source. Alterações na especificação são propostas via issues no GitHub, discutidas
publicamente e integradas via pull request após revisão. Veja [Contribuindo](/pt-br/governance/contributing/) para saber como participar
e a [Política de Versionamento](/pt-br/governance/versioning/) para saber como as mudanças são gerenciadas.
