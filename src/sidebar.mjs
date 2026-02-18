// Sidebar configuration — single source of truth for astro.config.mjs and scripts.
// Each section has a label, optional translations, and items with slug + label + optional translations.

export const sidebar = [
    {
        label: 'Getting Started',
        translations: {'pt-BR': 'Primeiros Passos'},
        items: [
            {label: 'What is PAM?', translations: {'pt-BR': 'O que é PAM?'}, slug: 'index'},
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral'}, slug: 'getting-started/overview'},
            {label: 'Quick Start', translations: {'pt-BR': 'Início Rápido'}, slug: 'getting-started/quick-start'},
            {label: 'FAQ', translations: {'pt-BR': 'Perguntas Frequentes'}, slug: 'getting-started/faq'},
        ],
    },
    {
        label: 'Specification',
        translations: {'pt-BR': 'Especificação'},
        items: [
            {label: 'Spec v1.0', translations: {'pt-BR': 'Spec v1.0'}, slug: 'spec/v1.0'},
            {label: 'Changelog', translations: {'pt-BR': 'Changelog'}, slug: 'spec/changelog'},
        ],
    },
    {
        label: 'Schema',
        translations: {'pt-BR': 'Schema'},
        items: [
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral'}, slug: 'schema/overview'},
            {label: 'Memory Store', translations: {'pt-BR': 'Armazenamento de Memórias'}, slug: 'schema/memory-store'},
            {label: 'Conversations', translations: {'pt-BR': 'Conversas'}, slug: 'schema/conversations'},
            {label: 'Embeddings', translations: {'pt-BR': 'Embeddings'}, slug: 'schema/embeddings'},
        ],
    },
    {
        label: 'Examples',
        translations: {'pt-BR': 'Exemplos'},
        items: [
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral'}, slug: 'examples/overview'},
            {label: 'Minimal', translations: {'pt-BR': 'Mínimo'}, slug: 'examples/minimal'},
            {label: 'Complete Memory Store', translations: {'pt-BR': 'Armazenamento Completo'}, slug: 'examples/complete-memory-store'},
            {label: 'Conversation', translations: {'pt-BR': 'Conversa'}, slug: 'examples/conversation'},
            {label: 'With Relations', translations: {'pt-BR': 'Com Relações'}, slug: 'examples/with-relations'},
            {label: 'With Embeddings', translations: {'pt-BR': 'Com Embeddings'}, slug: 'examples/with-embeddings'},
        ],
    },
    {
        label: 'Providers',
        translations: {'pt-BR': 'Provedores'},
        items: [
            {label: 'Overview & Compatibility', translations: {'pt-BR': 'Visão Geral e Compatibilidade'}, slug: 'providers/overview'},
            {label: 'OpenAI / ChatGPT', slug: 'providers/openai'},
            {label: 'Anthropic / Claude', slug: 'providers/anthropic'},
            {label: 'Google / Gemini', slug: 'providers/google'},
            {label: 'Microsoft / Copilot', slug: 'providers/microsoft'},
            {label: 'xAI / Grok', slug: 'providers/grok'},
        ],
    },
    {
        label: 'Interop Guide',
        translations: {'pt-BR': 'Guia de Interoperabilidade'},
        items: [
            {label: 'Importing', translations: {'pt-BR': 'Importação'}, slug: 'interop/importing'},
            {label: 'Exporting', translations: {'pt-BR': 'Exportação'}, slug: 'interop/exporting'},
            {label: 'Integrity Verification', translations: {'pt-BR': 'Verificação de Integridade'}, slug: 'interop/integrity'},
        ],
    },
    {
        label: 'Tools',
        translations: {'pt-BR': 'Ferramentas'},
        items: [
            {label: 'Validator', translations: {'pt-BR': 'Validador'}, slug: 'tools/validator'},
            {label: 'Validation Guide', translations: {'pt-BR': 'Guia de Validação'}, slug: 'tools/validation-guide'},
            {label: 'SDK Converters', translations: {'pt-BR': 'SDK Converters'}, slug: 'tools/converters'},
            {label: 'Reference Implementation', translations: {'pt-BR': 'Implementação de Referência'}, slug: 'tools/reference-implementation'},
        ],
    },
    {
        label: 'Governance',
        translations: {'pt-BR': 'Governança'},
        items: [
            {label: 'About PAM', translations: {'pt-BR': 'Sobre o PAM'}, slug: 'governance/about'},
            {label: 'Versioning Policy', translations: {'pt-BR': 'Política de Versionamento'}, slug: 'governance/versioning'},
            {label: 'Contributing', translations: {'pt-BR': 'Contribuindo'}, slug: 'governance/contributing'},
            {label: 'License', translations: {'pt-BR': 'Licença'}, slug: 'governance/license'},
        ],
    },
];
