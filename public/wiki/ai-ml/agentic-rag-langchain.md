---
path: ai-ml/agentic-rag-langchain
title: Agentic RAG with LangChain
articleSlug: architecting-agentic-retrieval-systems-langchain-proprietary-wikis
date: 2026-08-15
labels: ["Quantitative Finance", "AI & Machine Learning"]
related: []
---

## Overview

Standard RAG (Retrieval-Augmented Generation) — a linear, single-shot pipeline of "retrieve then generate" — breaks down against dense stochastic calculus, multi-document synthesis, and permission-gated internal wikis. **Agentic RAG** replaces the static pipeline with a continuous control loop (Retrieve → Reason → Decide → Act), letting the system rewrite queries, decompose multi-hop questions, and refuse to answer rather than silently hallucinate when evidence is insufficient.

## Key Concepts

- **Standard RAG** — a linear, deterministic pipeline: one semantic search pass feeds the LLM directly. Fails at multi-hop reasoning and fails *silently* (hallucinates) when context is weak.
- **Agentic RAG** — an iterative control loop that autonomously evaluates evidence, rewrites queries, and decomposes problems. Fails *loudly*: it backtracks or escalates rather than guessing.
- **Custom Wiki Toolkit** — instead of one monolithic "search everything" tool, a specialized `BaseToolkit` exposing Semantic Search, Direct Page Lookup (by Document ID), and Metadata Filtering as separate tools.
- **Entitlement Drift** — the risk of enforcing access control only at ingestion time. Proprietary quant wikis hold alpha-generating signals, so the wiki tool must re-check the invoking user's permissions at *query* time, not just when the vector store was built.
- **Math-Aware Chunking** — naive text splitters (`RecursiveCharacterTextSplitter`) fragment LaTeX formulas mid-equation, severing a variable (e.g. `d_2`) from the preceding definition (`d_1`) it depends on. `LatexTextSplitter`, `MarkdownHeaderTextSplitter`, and semantic chunking preserve that structure instead.
- **LangGraph** — a stateful alternative to simple `AgentExecutor` loops, providing persistent state, human-in-the-loop checkpointing, and controlled loop budgets for multi-step financial reasoning.
- **Hierarchical Swarm** — a multi-agent pattern splitting cognitive load across an Orchestrator (delegation), Quant Researcher (retrieval), Code Generator (implementation), and Risk/Critic (validation), communicating via Pydantic schemas.

## Tool Creation Methods

| Method | Strategy | Best For |
|---|---|---|
| `@tool` Decorator | Wraps a function, infers schema from type hints | Rapid prototyping, single-input retrieval |
| `StructuredTool` | `from_function` with an injected Pydantic schema | Complex, multi-parameter inputs needing strict validation |
| `BaseTool` Subclassing | Manual `_run` implementation | Custom tools needing state management or deep error handling |
| `BaseToolkit` | Groups multiple `BaseTool` instances | Exposing an entire wiki API as one coherent toolkit |

## Chunking Strategies for Quantitative Text

| Strategy | Mechanism | Quant Application |
|---|---|---|
| `RecursiveCharacterTextSplitter` | Splits by `\n\n`, `\n`, space | Detrimental to math — breaks multi-line equations |
| `LatexTextSplitter` | Splits along LaTeX environments | Preserves equations, proofs, matrices |
| `MarkdownHeaderTextSplitter` | Groups by heading hierarchy | Maintains structure of research papers |
| Semantic Chunking | Groups by embedding similarity | Keeps explanatory text coupled to its formula |

## Formulas

The canonical example of why naive chunking fails — the Black-Scholes-Merton call price and its dependent terms:

$$
C = S_t N(d_1) - K e^{-rt} N(d_2)
$$

$$
d_1 = \frac{\ln(S_t/K) + (r + \sigma^2/2)t}{\sigma\sqrt{t}}, \qquad d_2 = d_1 - \sigma\sqrt{t}
$$

A splitter that breaks the text between these lines hands the LLM `d_2` with no access to `d_1`'s definition — guaranteeing a hallucinated derivation.

## Key Takeaways

- Agentic RAG's core advantage over standard RAG isn't better retrieval — it's **loud failure**: backtracking and escalating instead of confidently synthesizing an answer from insufficient context.
- Access control for proprietary wikis must be enforced at **query time**, not just ingestion — otherwise entitlement drift silently leaks alpha-generating content.
- Never let a generic text splitter touch mathematical content; use `LatexTextSplitter` or semantic chunking so dependent variables stay with their definitions.
- LangGraph's state + checkpointing is what makes multi-step, human-in-the-loop financial reasoning workflows reliable rather than one-shot brittle.
- Hierarchical swarms (Orchestrator / Researcher / Coder / Critic) scale better than a single do-everything agent because each role has a narrow, verifiable responsibility.

## Related Reading

- [Architecting Agentic Retrieval Systems: Integrating LangChain with Proprietary Wikis for Quantitative Finance](/articles/architecting-agentic-retrieval-systems-langchain-proprietary-wikis)
