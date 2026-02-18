---
title: Changelog
description: Histórico de versões e changelog da especificação Portable AI Memory
---

Todas as mudanças notáveis na especificação PAM estão documentadas aqui. O formato é baseado
em [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## v1.0.0 (2026-02-17)

### Adicionado

- Especificação completa PAM v1.0 (`spec.md`) com 26 seções e 6 apêndices
- JSON Schema (Draft 2020-12) para memory store, embeddings e conversations
- Mapeamentos de importação de providers para ChatGPT, Claude, Gemini, Copilot e Grok
- Integridade de conteúdo via SHA-256 hashing e canonicalização RFC 8785
- Assinaturas criptográficas com suporte a Ed25519/ECDSA
- Integração com identidade descentralizada (W3C DID)
- Suporte a exportação/importação incremental
- Arquivos de exemplo validados para memory store, conversations e embeddings
