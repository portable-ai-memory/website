---
title: Implementação de Referência
description: Visão geral da implementação de referência do PAM e suas funcionalidades
---

A implementação de referência do PAM é distribuída como **SDKs específicos por linguagem**. O [SDK Python](https://github.com/portable-ai-memory/python-sdk) é o primeiro release oficial. Cada SDK oferece as funcionalidades definidas na [spec §23](/pt-br/spec/v1.0/#23-reference-implementation):

## Funcionalidades disponíveis

1. **Extratores de plataforma** — Processam exportações do ChatGPT, Claude, Gemini, Copilot e Grok para o formato PAM. Detectam automaticamente o formato de exportação do provedor e mapeiam os campos para o schema PAM.

2. **Conversor** — Converte exportações de provedores para bundles PAM com `pam convert`. Gera memory stores válidos e em conformidade com o schema, com content hashes calculados e arquivos de conversas complementares. Consulte [SDK Converters](/pt-br/tools/converters/) para detalhes.

3. **Validador** — Validação profunda com `pam validate` — vai além da verificação de schema para verificar content hashes, referências cruzadas, ordenação temporal e blocos de integridade. Consulte o [Guia de Validação](/pt-br/tools/validation-guide/) para detalhes.

4. **Verificador de integridade** — Verifica checksums e regras de consistência (normalização de content hashes, checksums do bloco de integridade, unicidade de IDs). Executa automaticamente como parte de `pam validate --deep` (habilitado por padrão).

5. **Inspetor** — Inspeciona arquivos PAM com `pam inspect` para obter um resumo do conteúdo (contagem de memórias por tipo, relações, índice de conversas, status de integridade).

## Funcionalidades planejadas

- **Ferramentas de assinatura** — Assinar e verificar exportações para autenticação e detecção de adulteração. Definido na [spec §23](/pt-br/spec/v1.0/#23-reference-implementation) mas ainda não implementado.

## Instalação

```bash
pip install portable-ai-memory        # SDK core
pip install 'portable-ai-memory[cli]' # + CLI (comando pam)
```

O [SDK Python](https://github.com/portable-ai-memory/python-sdk) serve como exemplo canônico do tratamento correto do PAM.
