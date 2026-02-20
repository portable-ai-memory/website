---
title: "The AI Memory Portability Problem: Why Your Context is Trapped"
description: "Your AI assistant knows your preferences, your projects, your communication style. But try switching platforms and all of that knowledge disappears. Here's why AI memory portability matters and what we can do about it."
head:
  - tag: meta
    attrs:
      name: keywords
      content: "ai memory portability, export ai chat history, ai context, portable ai memory, PAM, open standard, data portability standard, memory interchange format, EU Data Act compliance"
  - tag: meta
    attrs:
      property: og:title
      content: "The AI Memory Portability Problem: Why Your Context is Trapped"
  - tag: meta
    attrs:
      property: og:description
      content: "Why AI platforms lock in user memory data, how the EU is regulating portability, and how the PAM specification defines a vendor-neutral interchange format."
  - tag: meta
    attrs:
      property: og:type
      content: article
  - tag: meta
    attrs:
      property: og:url
      content: "https://portable-ai-memory.org/blog/ai-memory-portability-problem"
  - tag: meta
    attrs:
      property: og:image
      content: "https://portable-ai-memory.org/images/blog/ai-memory-portability-problem.png"
  - tag: meta
    attrs:
      property: og:image:width
      content: "1200"
  - tag: meta
    attrs:
      property: og:image:height
      content: "630"
  - tag: meta
    attrs:
      property: og:image:alt
      content: "Diagram showing AI memory silos (ChatGPT, Claude, Gemini) connected through PAM universal format to any destination"
  - tag: meta
    attrs:
      property: og:locale
      content: en_US
  - tag: meta
    attrs:
      property: article:author
      content: "Daniel Ginês"
  - tag: meta
    attrs:
      property: article:published_time
      content: "2026-02-20T00:00:00Z"
  - tag: meta
    attrs:
      property: article:section
      content: Standards
  - tag: link
    attrs:
      rel: canonical
      href: "https://portable-ai-memory.org/blog/ai-memory-portability-problem"
  - tag: meta
    attrs:
      name: twitter:card
      content: summary_large_image
  - tag: meta
    attrs:
      name: twitter:title
      content: "The AI Memory Portability Problem"
  - tag: meta
    attrs:
      name: twitter:description
      content: "Your AI memories are trapped in proprietary silos. Here's why that matters and how PAM fixes it."
  - tag: meta
    attrs:
      name: twitter:image
      content: "https://portable-ai-memory.org/images/blog/ai-memory-portability-problem.png"
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The AI Memory Portability Problem: Why Your Context is Trapped",
        "author": {
          "@type": "Person",
          "name": "Daniel Gines"
        },
        "datePublished": "2026-02-20",
        "publisher": {
          "@type": "Organization",
          "name": "Portable AI Memory"
        },
        "description": "Why AI memory portability is the next critical challenge in the AI industry, and how an open interchange format can solve it."
      }
---

![The AI Memory Portability Problem — proprietary silos vs PAM universal format](/images/blog/ai-memory-portability-problem.svg)

After three years with ChatGPT, you've built something valuable without realizing it. Your AI knows you prefer concise answers. It knows you're a Python developer, that you work in infrastructure, that you like your code comments in English even though you speak Portuguese. It remembers your project names, your architectural decisions, your communication style.

Now try taking any of that to Claude. Or Gemini. Or any other platform.

You can't.

Sure, most platforms let you export your data — conversation logs, saved memories, account information. But what you get back is raw material, not usable knowledge. The relationships between facts, the inferences built over months of interaction, the context that makes a memory useful — none of that survives the export. And even if it did, there's no standard format that another platform could import. When you switch, you don't lose the data — you lose the understanding.

This is the AI memory portability problem, and it's about to become one of the most important issues in the AI industry.

## The new lock-in is not the model — it's the memory

For the past two years, the competitive focus in AI has been on model capabilities: reasoning benchmarks, context window sizes, multimodal support. But as models converge in capability, the real differentiation is shifting somewhere else entirely: memory.

OpenAI understood this early. On [April 10, 2025](https://openai.com/index/memory-and-new-controls-for-chatgpt/), ChatGPT's memory expanded from simple saved facts to referencing your entire conversation history. By [June 3](https://openai.com/index/memory-and-new-controls-for-chatgpt/), even free users got a lightweight version. The message was clear: the more you use ChatGPT, the harder it becomes to leave.

This isn't accidental. As Mem0's CEO Taranjeet Singh [told TechCrunch](https://techcrunch.com/2025/10/28/mem0-raises-24m-from-yc-peak-xv-and-basis-set-to-build-the-memory-layer-for-ai-apps/) when announcing their $24M raise: "Memory is becoming one of their key moats now that LLMs are getting commoditized." The major AI labs are building memory systems, but they have little incentive to make them portable or interoperable. Your accumulated context is the new switching cost.

The pain is real enough that a new category of tools has emerged to address it. [MemoryPlugin](https://memoryplugin.com) offers a browser extension for cross-platform memory sync. [Context Pack](https://context-pack.com) helps transfer context between ChatGPT and Claude. [AI Context Flow](https://plurality.network/ai-context-flow/) builds a universal context layer across AI platforms. But they're all building proprietary bridges between proprietary silos — each with its own format, its own limitations, and no interoperability between them.

## What you actually lose when you switch

To understand the scale of the problem, consider what a mature AI memory contains:

**Identity and preferences.** Your name, role, language, communication style, formatting preferences, how technical you want answers to be.

**Professional context.** Your tech stack, your company, your projects, the architectural decisions you've made, the constraints you work within.

**Relational knowledge.** Facts that only make sense in connection with other facts — that your project uses React because you evaluated Vue and Svelte first, and that decision was shaped by your team's TypeScript experience and the need for a mature ecosystem of UI libraries.

**Temporal knowledge.** Things that were true at a point in time — you were migrating from AWS to GCP in Q3, your team adopted Kubernetes in Q4, your company restructured the platform team in January.

None of this knowledge has a standard representation. ChatGPT stores it internally. Claude derives it from conversation history. Gemini uses its own format. There is no `contacts.vcf` equivalent for AI memories. No `calendar.ics`. No OPML. No universal format that any platform can read and write.

## Everyone talks about portable memory — nobody ships the format

The irony is that the industry already agrees this is a problem.

Mem0 explicitly pitches itself as a "[memory passport](https://techcrunch.com/2025/10/28/mem0-raises-24m-from-yc-peak-xv-and-basis-set-to-build-the-memory-layer-for-ai-apps/)" — your AI memory traveling with you across apps and agents, just like email or logins. They raised $24M on this vision. But Mem0's API is a proprietary service, not an open interchange format. Your memory travels through Mem0, not independently.

Letta (formerly MemGPT) created the Agent File (.af) format for serializing stateful AI agents. While .af includes editable memory sections with user preferences and personality, it's designed for agent persistence across sessions — not for portable user context across different AI systems.

Cognee built a knowledge graph engine for AI agent memory. Excellent infrastructure. But when you ingest data into Cognee, it lives in Cognee's internal representation.

Each of these projects solves a piece of the puzzle. None of them defines what a portable AI memory file should look like. They're building increasingly sophisticated containers, but there's no standard shipping label.

## The regulatory pressure is already here

This isn't just a developer concern — it's becoming a regulatory one.

The [EU Data Act](https://digital-strategy.ec.europa.eu/en/policies/data-act), with core provisions in effect since September 12, 2025, mandates that cloud and data processing service providers facilitate switching between providers, remove technical and contractual barriers to portability, and support standardized export formats. Switching fees must be fully [eliminated by January 2027](https://www.lw.com/en/insights/eu-data-act-significant-new-switching-requirements-due-to-take-effect-for-data-processing-services), and existing long-term contracts must be adapted by September 2027. The direction is clear: vendor lock-in of user data is on a regulatory collision course.

The [EU AI Act](https://artificialintelligenceact.eu/), reaching full enforcement in August 2026, adds transparency requirements for AI systems. Meanwhile, the European Commission is actively debating [whether to classify ChatGPT under the Digital Services Act](https://www.pymnts.com/cpi-posts/eu-wrestles-with-how-to-apply-the-digital-services-act-to-chatgpt/) — and with ChatGPT now [approaching 900 million weekly active users](https://techcrunch.com/2026/02/15/india-has-100m-weekly-active-chatgpt-users-sam-altman-says/), the DMA's [scheduled review in May 2026](https://www.techpolicy.press/will-the-eu-designate-ai-under-the-digital-markets-act/) may well bring generative AI platforms into scope as a new core platform service category. Researchers at the London School of Economics have already [argued this is necessary](https://www.techpolicy.press/will-the-eu-designate-ai-under-the-digital-markets-act/) to address the competition dynamics of the AI market.

The question isn't whether AI platforms will face pressure to support memory portability. It's whether the industry defines the standard proactively, or whether regulators impose one.

## What a real standard needs

A viable AI memory interchange format needs to handle several things that existing approaches don't:

**Structured memory types.** Not just raw conversation dumps, but typed memories: facts, preferences, skills, goals, relationships, project context. A downstream system needs to know whether "User prefers dark mode" is a preference or a fact, because each has different implications for how it should be applied.

**Provenance.** Where did this memory come from? Which platform? Which conversation? Was it explicitly stated by the user or inferred by the AI? Provenance matters for trust: a memory the user typed should carry more weight than one an AI inferred from a side comment.

**Temporal lifecycle.** Memories aren't permanent. A preference can change. A project can end. A fact can be superseded. Any format that doesn't model time — creation, expiration, supersession — will accumulate stale knowledge that degrades the AI's usefulness over time.

**Integrity.** If I export 500 memories from ChatGPT and import them into Claude, how do I verify nothing was lost or corrupted in transit? Content hashes and checksums aren't optional — they're essential for any format that claims to be reliable.

**Separation of conversations from memories.** Raw conversation logs are not memories. They're the raw material from which memories are derived. A good format needs to represent both: the conversations as they happened, and the structured knowledge extracted from them.

No format will get everything right on the first version. These are the requirements we think matter most — and the ones most neglected by existing approaches.

## Introducing PAM: Portable AI Memory

This is the problem that Portable AI Memory (PAM) was designed to solve.

PAM is an open specification — not a product, not a service, not an API — that defines a vendor-neutral interchange format for AI user memories. Think of it as what vCard is for contacts, or iCalendar is for events, but for the knowledge your AI has accumulated about you.

The specification defines three composable JSON schemas:

- **Memory Store** — Structured memories with types, confidence scores, temporal lifecycle, provenance tracking, cross-references, and integrity verification. Each memory carries a content hash for deduplication and a semantic type from a closed taxonomy (fact, preference, skill, context, relationship, goal, instruction, identity, environment, project).

- **Conversation** — Normalized conversation logs with a provider-agnostic message format, DAG structure for branching conversations, tool calls, citations, and multipart content. This is where the raw material lives.

- **Embeddings** — Vector representations linked to specific memories, stored inline or by reference to external vector stores.

An integrity block with RFC 8785 canonicalization ensures that when you export 500 memories and import them elsewhere, you can cryptographically verify that every single one arrived intact.

Here's what a single PAM memory looks like:

```json
{
  "id": "mem-042",
  "type": "preference",
  "content": "User prefers concise, technical answers without excessive explanation",
  "content_hash": "sha256:a1b2c3...",
  "provenance": {
    "platform": "chatgpt",
    "extraction_method": "llm_inference",
    "conversation_ref": "conv-2025-03-15"
  },
  "temporal": {
    "created_at": "2025-03-15T10:30:00Z",
    "updated_at": "2025-11-20T14:15:00Z"
  },
  "confidence": {
    "current": 0.92,
    "decay_model": "time_exponential"
  },
  "tags": ["communication", "formatting"]
}
```

Every field exists for a reason. The `type` tells downstream systems how to apply this memory. The `provenance` tells them how much to trust it. The `temporal` block tells them when it was last confirmed. The `confidence` block models how certainty changes over time. And the `content_hash` lets them verify integrity after transit.

## What PAM doesn't do

PAM is a file format, not a platform. It's important to be clear about what it doesn't cover:

**No real-time sync.** PAM defines a static interchange format — a `.pam.json` file. It does not define a sync protocol, a streaming API, or a real-time update mechanism. If you need live sync across platforms, you need a product like MemoryPlugin or AI Context Flow on top.

**No memory extraction.** PAM doesn't decide what should be a memory. Converting raw conversations into structured memories requires judgment — usually from an LLM. The PAM SDK provides converters for platform exports and a structure for the results, but the extraction intelligence is a separate concern.

**No access control enforcement.** PAM includes an access control schema (visibility levels, shared permissions), but enforcement is the responsibility of the consuming system. PAM describes the policy; it doesn't enforce it.

**No embedding generation.** The embeddings schema stores vectors and links them to memories, but PAM doesn't generate embeddings. That depends on which model and dimensions you choose.

These limitations are deliberate. A format that tries to be a platform ends up as neither. PAM stays in its lane — define the structure, verify the integrity, leave the rest to the ecosystem.

The full specification, JSON schemas, examples, and a Python SDK are published at [portable-ai-memory.org](https://portable-ai-memory.org). The SDK includes converters for major AI platform exports, deep validation beyond JSON Schema (cross-references, temporal consistency, content hash verification), and a CLI for quick operations.

## The vCard analogy — and why it matters

When vCard was introduced in 1995, every email client and address book had its own proprietary contact format. Contacts were trapped in Outlook, in Lotus Notes, in Palm Pilots. The solution wasn't a universal contacts service — it was a universal contacts file. A `.vcf` file that any application could read and write.

vCard didn't need a vcard-outlook-loader or a vcard-palm-sync service. The format was good enough, and open enough, that each application implemented support independently. The standard succeeded because it was simple, precise, and didn't try to be a product.

PAM follows the same philosophy. It doesn't compete with Mem0, Cognee, or Letta — it feeds them. Export from ChatGPT, convert to PAM, import into any system that implements a PAM loader. The spec is the value. The SDK makes adoption easy. The rest is up to the ecosystem.

## What happens next

The AI memory portability problem will be solved. The only question is how. Either the major platforms will define interoperability on their own terms (unlikely — their incentive is lock-in), regulators will mandate it with potentially rigid technical requirements (possible — the EU is already headed there), or the developer community will converge on an open standard that makes portability the default.

PAM is our contribution to the third option. The specification is published. The schemas are validated. The SDK works today. What's needed now is adoption — developers building converters, memory systems accepting PAM as an input format, and users demanding the right to own their AI context.

Your AI memories are yours. They shouldn't be trapped.

---

*PAM is an open specification released under Creative Commons. The Python SDK is Apache 2.0 licensed. Both are available at [portable-ai-memory.org](https://portable-ai-memory.org) and [GitHub](https://github.com/portable-ai-memory).*

*[Daniel Ginês](mailto:dangines@gmail.com) is the creator of PAM and a DevOps engineer.*
