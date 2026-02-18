---
title: Implementação de Referência
description: Visão geral da implementação de referência do PAM e suas funcionalidades
---

:::caution[Em breve]
A implementação de referência do PAM está em desenvolvimento.
:::

A implementação de referência do PAM é distribuída como **SDKs específicos por linguagem**. Cada SDK oferece as cinco funcionalidades definidas na [spec §23](/pt-br/spec/v1.0/#23-reference-implementation):

## Funcionalidades

1. **Extratores de plataforma** — Processam exportações do ChatGPT, Claude, Gemini, Copilot e Grok para o formato PAM. Esses extratores detectam automaticamente o formato de exportação do provedor e mapeiam os campos para o schema PAM.

2. **Conversor** — Converte exportações de provedores para o formato PAM com detecção automática. A ferramenta CLI `pam convert` processa exportações e gera memory stores PAM válidos, em conformidade com o schema e com content hashes calculados. Consulte [Converters](/pt-br/tools/converters/) para os SDKs disponíveis, uso da CLI e detalhes da API programática.

3. **Validador** — Validação de schema usando o comando CLI `pam validate` para verificar se os memory stores estão em conformidade com os schemas PAM. Consulte o [Guia de Validação](/pt-br/tools/validation-guide/) para detalhes abrangentes sobre validação e regras.

4. **Verificador de integridade** — Verifica checksums e regras de consistência para garantir que os memory stores mantenham a integridade dos dados e estejam em conformidade com todos os requisitos de normalização. Consulte [Integridade e Assinaturas](/pt-br/interop/integrity/) para detalhes sobre validação, verificação e checagens de consistência.

5. **Ferramentas de assinatura** — Assina e verifica exportações com os comandos `pam sign` e `pam verify` para autenticar e garantir a autenticidade dos memory stores. Consulte [Integridade e Assinaturas](/pt-br/interop/integrity/) para detalhes sobre assinatura criptográfica.

O SDK Python é a primeira implementação de referência e servirá como exemplo canônico do tratamento correto do PAM.
