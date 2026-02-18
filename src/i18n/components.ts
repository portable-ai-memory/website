// Centralized UI translations for custom components.
// Add new locales by extending each section below.

const translations = {
    '': {
        // SolutionDiagram
        solutionAriaLabel: 'Diagram showing PAM as a universal hub: AI providers on the left export to PAM format in the center, which then imports into any destination on the right.',
        universalFormat: 'Universal Format',
        anyAiAssistant: 'Any AI Assistant',
        localLlm: 'Local LLM',
        customTools: 'Custom Tools',
        backupArchive: 'Backup / Archive',

        // HowItWorksDiagram
        howItWorksAriaLabel: 'Flowchart showing 4 steps: Export your data, Convert to PAM, Your PAM file, Import anywhere.',
        step1Title: 'Export your data',
        step1Desc: 'Download from your AI provider',
        step2Title: 'Convert to PAM',
        step2Desc: 'SDK Converter transforms the format',
        step3Title: 'Your PAM file',
        step3Desc: 'Standard JSON — inspect, edit, back up',
        step4Title: 'Import anywhere',
        step4Desc: 'Load into any compatible AI tool',

        // SchemaArchitectureDiagram
        schemaAriaLabel: 'Diagram showing PAM schema architecture: Memory Store as the central required file, with optional Conversations and Embeddings companion files connected via conversations_index and embedding_ref.',
        required: 'Required',
        optional: 'Optional',
        memoryStore: 'Memory Store',
        conversations: 'Conversations',
        embeddings: 'Embeddings',

        // SdkCards
        comingSoon: 'Coming soon',
        planned: 'Planned',
        pythonDesc: 'CLI and library for converting, validating, and reading PAM files',
        typescriptDesc: 'Node.js package with full PAM support including schema validation',
        goDesc: 'Native Go module for high-performance PAM processing',
        rustDesc: 'Zero-copy PAM reader/writer with compile-time schema checks',
        javaDesc: 'JVM library for enterprise PAM integration',
        csharpDesc: '.NET library for PAM conversion and validation',

        // HomepageCards
        providerIntro: 'PAM works with any AI provider or tool via SDK Converters.',
        providerDisclaimer: 'Based on observed export formats. Providers do not natively support PAM. Converters available via SDK.',
        officialBadge: 'Official',
        browseProviders: 'Browse Providers',
        readSpec: 'Read the Spec',
        viewSchema: 'View Schema',
        seeExamples: 'See Examples',
        quickStart: 'Get Started',
        specDescription: 'Full technical specification v1.0',
        schemaDescription: 'JSON Schema Draft 2020-12',
        examplesDescription: 'From minimal to complete',
        quickStartDescription: 'Validate your first PAM file',
    },
    'pt-br': {
        // SolutionDiagram
        solutionAriaLabel: 'Diagrama mostrando o PAM como hub universal: provedores de IA à esquerda exportam para o formato PAM no centro, que então importa para qualquer destino à direita.',
        universalFormat: 'Formato Universal',
        anyAiAssistant: 'Qualquer IA',
        localLlm: 'LLM Local',
        customTools: 'Ferramentas Custom',
        backupArchive: 'Backup / Arquivo',

        // HowItWorksDiagram
        howItWorksAriaLabel: 'Fluxograma com 4 etapas: Exporte seus dados, Converta para PAM, Seu arquivo PAM, Importe em qualquer lugar.',
        step1Title: 'Exporte seus dados',
        step1Desc: 'Baixe do seu provedor de IA',
        step2Title: 'Converta para PAM',
        step2Desc: 'O SDK Converter transforma o formato',
        step3Title: 'Seu arquivo PAM',
        step3Desc: 'JSON padrão — inspecione, edite, faça backup',
        step4Title: 'Importe em qualquer lugar',
        step4Desc: 'Carregue em qualquer ferramenta de IA compatível',

        // SchemaArchitectureDiagram
        schemaAriaLabel: 'Diagrama da arquitetura de schemas do PAM: Memory Store como arquivo central obrigatório, com arquivos complementares opcionais Conversations e Embeddings conectados via conversations_index e embedding_ref.',
        required: 'Obrigatório',
        optional: 'Opcional',
        memoryStore: 'Memory Store',
        conversations: 'Conversations',
        embeddings: 'Embeddings',

        // SdkCards
        comingSoon: 'Em breve',
        planned: 'Planejado',
        pythonDesc: 'CLI e biblioteca para converter, validar e ler arquivos PAM',
        typescriptDesc: 'Pacote Node.js com suporte completo a PAM incluindo validação de schema',
        goDesc: 'Módulo Go nativo para processamento PAM de alta performance',
        rustDesc: 'Leitor/escritor PAM zero-copy com verificação de schema em tempo de compilação',
        javaDesc: 'Biblioteca JVM para integração PAM empresarial',
        csharpDesc: 'Biblioteca .NET para conversão e validação PAM',

        // HomepageCards
        providerIntro: 'O PAM funciona com qualquer provedor ou ferramenta de IA através dos SDK Converters.',
        providerDisclaimer: 'Baseado em formatos de exportação observados. Os provedores não suportam PAM nativamente. Conversores disponíveis via SDK.',
        officialBadge: 'Oficial',
        browseProviders: 'Ver Provedores',
        readSpec: 'Ler a Spec',
        viewSchema: 'Ver Schema',
        seeExamples: 'Ver Exemplos',
        quickStart: 'Começar',
        specDescription: 'Especificação técnica completa v1.0',
        schemaDescription: 'JSON Schema Draft 2020-12',
        examplesDescription: 'Do mínimo ao completo',
        quickStartDescription: 'Valide seu primeiro arquivo PAM',
    },
} as const;

export type TranslationKeys = keyof typeof translations[''];

export function useTranslations(locale: string = '') {
    return translations[locale as keyof typeof translations] || translations[''];
}
