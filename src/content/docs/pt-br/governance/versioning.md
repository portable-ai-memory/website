---
title: Política de Versionamento
description: Política de versionamento da especificação PAM, incluindo compatibilidade retroativa e regras de depreciação
---

O PAM segue o versionamento semântico para a especificação:

## Versões Maiores (ex.: 1.0 → 2.0)

Mudanças que quebram compatibilidade em campos obrigatórios ou na estrutura do schema. Exemplos:

- Remover ou renomear campos obrigatórios
- Alterar a estrutura de objetos principais
- Modificar o algoritmo de content hash

Versões maiores recebem uma URL permanente própria (ex.: `/spec/v2.0`). Versões anteriores permanecem acessíveis.

## Versões Menores (ex.: 1.0 → 1.1)

Adições compatíveis com versões anteriores. Exemplos:

- Novos campos opcionais
- Novos tipos de memória
- Novos tipos de relação
- Mapeamentos adicionais de provedores

Arquivos PAM válidos existentes continuam válidos após atualizações de versão menor.

## Versões de Correção (ex.: 1.0.0 → 1.0.1)

Apenas esclarecimentos e erratas. Sem alterações no schema ou no comportamento obrigatório.

## Processo

1. Alterações são propostas via issues no GitHub
2. A discussão acontece publicamente na issue
3. Alterações na spec são enviadas como pull requests
4. PRs exigem um período de revisão pública antes da integração
5. Novas versões são marcadas com tags no repositório da spec
