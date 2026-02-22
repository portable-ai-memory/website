// Sidebar configuration — single source of truth for astro.config.mjs and scripts.
// Each section has a label, optional translations, and items with slug + label + optional translations.

export const sidebar = [
    {
        label: 'Getting Started',
        translations: {'pt-BR': 'Primeiros Passos', fr: 'Pour Commencer'},
        items: [
            {label: 'What is PAM?', translations: {'pt-BR': 'O que é PAM?', fr: 'Qu\'est-ce que PAM ?'}, slug: 'index'},
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral', fr: 'Vue d\'ensemble'}, slug: 'getting-started/overview'},
            {label: 'Quick Start', translations: {'pt-BR': 'Início Rápido', fr: 'Démarrage rapide'}, slug: 'getting-started/quick-start'},
            {label: 'FAQ', translations: {'pt-BR': 'Perguntas Frequentes', fr: 'FAQ'}, slug: 'getting-started/faq'},
        ],
    },
    {
        label: 'Specification',
        translations: {'pt-BR': 'Especificação', fr: 'Spécification'},
        items: [
            {label: 'Spec v1.0', translations: {'pt-BR': 'Spec v1.0', fr: 'Spec v1.0'}, slug: 'spec/v1.0'},
            {label: 'Changelog', translations: {'pt-BR': 'Changelog', fr: 'Changelog'}, slug: 'spec/changelog'},
        ],
    },
    {
        label: 'Schema',
        translations: {'pt-BR': 'Schema', fr: 'Schéma'},
        items: [
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral', fr: 'Vue d\'ensemble'}, slug: 'schema/overview'},
            {label: 'Memory Store', translations: {'pt-BR': 'Armazenamento de Memórias', fr: 'Stockage de Mémoires'}, slug: 'schema/memory-store'},
            {label: 'Conversations', translations: {'pt-BR': 'Conversas', fr: 'Conversations'}, slug: 'schema/conversations'},
            {label: 'Embeddings', translations: {'pt-BR': 'Embeddings', fr: 'Embeddings'}, slug: 'schema/embeddings'},
        ],
    },
    {
        label: 'Examples',
        translations: {'pt-BR': 'Exemplos', fr: 'Exemples'},
        items: [
            {label: 'Overview', translations: {'pt-BR': 'Visão Geral', fr: 'Vue d\'ensemble'}, slug: 'examples/overview'},
            {label: 'Minimal', translations: {'pt-BR': 'Mínimo', fr: 'Minimal'}, slug: 'examples/minimal'},
            {label: 'Complete Memory Store', translations: {'pt-BR': 'Armazenamento Completo', fr: 'Stockage de Mémoires complet'}, slug: 'examples/complete-memory-store'},
            {label: 'Conversation', translations: {'pt-BR': 'Conversa', fr: 'Conversation'}, slug: 'examples/conversation'},
            {label: 'With Relations', translations: {'pt-BR': 'Com Relações', fr: 'Avec des Relations'}, slug: 'examples/with-relations'},
            {label: 'With Embeddings', translations: {'pt-BR': 'Com Embeddings', fr: 'Avec des Embeddings'}, slug: 'examples/with-embeddings'},
        ],
    },
    {
        label: 'Providers',
        translations: {'pt-BR': 'Provedores', fr: 'Fournisseurs'},
        items: [
            {label: 'Overview & Compatibility', translations: {'pt-BR': 'Visão Geral e Compatibilidade', fr: 'Vue d\'ensemble et Compatibilité'}, slug: 'providers/overview'},
            {label: 'OpenAI / ChatGPT', slug: 'providers/openai'},
            {label: 'Anthropic / Claude', slug: 'providers/anthropic'},
            {label: 'Google / Gemini', slug: 'providers/google'},
            {label: 'Microsoft / Copilot', slug: 'providers/microsoft'},
            {label: 'xAI / Grok', slug: 'providers/grok'},
        ],
    },
    {
        label: 'Interop Guide',
        translations: {'pt-BR': 'Guia de Interoperabilidade', fr: 'Guide d\'Interopérabilité'},
        items: [
            {label: 'Importing', translations: {'pt-BR': 'Importação', fr: 'Importation'}, slug: 'interop/importing'},
            {label: 'Exporting', translations: {'pt-BR': 'Exportação', fr: 'Exportation'}, slug: 'interop/exporting'},
            {label: 'Integrity Verification', translations: {'pt-BR': 'Verificação de Integridade', fr: 'Vérification d\'Intégrité'}, slug: 'interop/integrity'},
        ],
    },
    {
        label: 'Tools',
        translations: {'pt-BR': 'Ferramentas', fr: 'Outils'},
        items: [
            {label: 'Validator', translations: {'pt-BR': 'Validador', fr: 'Validateur'}, slug: 'tools/validator'},
            {label: 'Validation Guide', translations: {'pt-BR': 'Guia de Validação', fr: 'Guide de Validation'}, slug: 'tools/validation-guide'},
            {label: 'SDK Converters', translations: {'pt-BR': 'SDK Converters', fr: 'SDK Converters'}, slug: 'tools/converters'},
            {label: 'Reference Implementation', translations: {'pt-BR': 'Implementação de Referência', fr: 'Implémentation de Référence'}, slug: 'tools/reference-implementation'},
        ],
    },
    {
        label: 'Governance',
        translations: {'pt-BR': 'Governança', fr: 'Gouvernance'},
        items: [
            {label: 'About PAM', translations: {'pt-BR': 'Sobre o PAM', fr: 'À propos de PAM'}, slug: 'governance/about'},
            {label: 'Versioning Policy', translations: {'pt-BR': 'Política de Versionamento', fr: 'Politique de Versionnement'}, slug: 'governance/versioning'},
            {label: 'Contributing', translations: {'pt-BR': 'Contribuindo', fr: 'Contribuer'}, slug: 'governance/contributing'},
            {label: 'License', translations: {'pt-BR': 'Licença', fr: 'Licence'}, slug: 'governance/license'},
        ],
    },
    {
        label: 'Blog',
        translations: {'pt-BR': 'Blog', fr: 'Blog'},
        items: [
            {label: 'The AI Memory Portability Problem', translations: {'pt-BR': 'O Problema da Portabilidade de Memória IA', fr: 'Le Problème de la Portabilité de la Mémoire IA'}, slug: 'blog/ai-memory-portability-problem'},
        ],
    },
];
