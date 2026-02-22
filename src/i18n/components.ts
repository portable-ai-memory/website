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
        available: 'Available',
        comingSoon: 'Coming soon',
        planned: 'Planned',
        pythonDesc: 'Official SDK: CLI and library for converting, validating, and building PAM files',
        typescriptDesc: 'Node.js package for PAM conversion and validation',
        goDesc: 'Native Go module for PAM processing',
        rustDesc: 'PAM reader/writer for Rust',
        javaDesc: 'JVM library for PAM integration',
        csharpDesc: '.NET library for PAM support',

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
        available: 'Disponível',
        comingSoon: 'Em breve',
        planned: 'Planejado',
        pythonDesc: 'SDK oficial: CLI e biblioteca para converter, validar e construir arquivos PAM',
        typescriptDesc: 'Pacote Node.js para conversão e validação PAM',
        goDesc: 'Módulo Go nativo para processamento PAM',
        rustDesc: 'Leitor/escritor PAM para Rust',
        javaDesc: 'Biblioteca JVM para integração PAM',
        csharpDesc: 'Biblioteca .NET para suporte PAM',

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
    fr: {
        // SolutionDiagram
        solutionAriaLabel: 'Diagramme montrant PAM comme hub universel : les fournisseurs d\'IA à gauche exportent vers le format PAM au centre, qui importe ensuite vers n\'importe quelle destination à droite.',
        universalFormat: 'Format Universel',
        anyAiAssistant: 'N\'importe quelle IA',
        localLlm: 'LLM Local',
        customTools: 'Outils Personnalisés',
        backupArchive: 'Sauvegarde / Archive',

        // HowItWorksDiagram
        howItWorksAriaLabel: 'Diagramme en 4 étapes : Exportez vos données, Convertissez en PAM, Votre fichier PAM, Importez n\'importe où.',
        step1Title: 'Exportez vos données',
        step1Desc: 'Téléchargez depuis votre fournisseur d\'IA',
        step2Title: 'Convertissez en PAM',
        step2Desc: 'Le SDK Converter transforme le format',
        step3Title: 'Votre fichier PAM',
        step3Desc: 'JSON standard — inspectez, éditez, sauvegardez',
        step4Title: 'Importez n\'importe où',
        step4Desc: 'Chargez dans n\'importe quel outil d\'IA compatible',

        // SchemaArchitectureDiagram
        schemaAriaLabel: 'Diagramme de l\'architecture des schémas PAM : Memory Store comme fichier central requis, avec les fichiers compagnons optionnels Conversations et Embeddings connectés via conversations_index et embedding_ref.',
        required: 'Requis',
        optional: 'Optionnel',
        memoryStore: 'Memory Store',
        conversations: 'Conversations',
        embeddings: 'Embeddings',

        // SdkCards
        available: 'Disponible',
        comingSoon: 'Bientôt disponible',
        planned: 'Planifié',
        pythonDesc: 'SDK officiel : CLI et bibliothèque pour convertir, valider et construire des fichiers PAM',
        typescriptDesc: 'Package Node.js pour la conversion et la validation PAM',
        goDesc: 'Module Go natif pour le traitement PAM',
        rustDesc: 'Lecteur/écrivain PAM pour Rust',
        javaDesc: 'Bibliothèque JVM pour l\'intégration PAM',
        csharpDesc: 'Bibliothèque .NET pour le support PAM',

        // HomepageCards
        providerIntro: 'PAM fonctionne avec n\'importe quel fournisseur ou outil d\'IA via les SDK Converters.',
        providerDisclaimer: 'Basé sur les formats d\'exportation observés. Les fournisseurs ne prennent pas en charge PAM nativement. Convertisseurs disponibles via le SDK.',
        officialBadge: 'Officiel',
        browseProviders: 'Voir les Fournisseurs',
        readSpec: 'Lire la Spec',
        viewSchema: 'Voir le Schéma',
        seeExamples: 'Voir les Exemples',
        quickStart: 'Commencer',
        specDescription: 'Spécification technique complète v1.0',
        schemaDescription: 'JSON Schema Draft 2020-12',
        examplesDescription: 'Du minimal au complet',
        quickStartDescription: 'Validez votre premier fichier PAM',
    },
} as const;

export type TranslationKeys = keyof typeof translations[''];

export function useTranslations(locale: string = '') {
    return translations[locale as keyof typeof translations] || translations[''];
}
