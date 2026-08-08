---
path: ai-ml/database-agents-mcp-langgraph
title: "Database Agents with MCP and LangChain"
articleSlug: database-agents-mcp-langchain
date: 2025-06-22
labels: [AI/ML]
related: []
---

## Overview

A guide to architecting production-grade database agents by fusing the Model Context Protocol (MCP) for standardized tool communication with LangGraph for stateful agent orchestration — covering context provisioning strategies and the defense-in-depth security posture required before letting an LLM execute queries against a real database.

## The MCP Foundation

MCP is an open standard that solves the M×N integration problem: instead of custom connectors for every model-to-tool pair, it creates a universal interface, turning the problem into a scalable M+N solution &mdash; the &ldquo;USB-C for AI.&rdquo; It uses a client-server architecture: MCP clients (AI agents) initiate requests, MCP servers expose APIs, tools, or data sources. Core primitives are Tools (executable functions), Resources (structured data streams), and Prompts (reusable instruction templates).

A minimal MCP database server exposes three tools: `list_tables()`, `get_schema_for_tables()`, and `execute_safe_query()` — the last hardcoded to reject anything that isn't a `SELECT` statement.

## The LangGraph Brain

LangChain evolved from simple chains to LangGraph, a framework for stateful, cyclic agents giving developers explicit control over the reasoning loop: explicit state (exactly what the agent carries between steps), cyclic workflows (multi-step reasoning that can adapt and recover from errors), and full observability for production use. A typical graph defines an `AgentState`, wires a SQL toolkit into a ReAct agent, and loops between a reasoning node and a tool-execution node until a final answer is reached.

## Mastering Context Provisioning

SQL generation quality is entirely dependent on the context given to the LLM. Four techniques, each with distinct trade-offs:

| Technique | Pros | Cons |
|---|---|---|
| Prompt Engineering | Simple for small, stable schemas; fine-grained control | Unmanageable at scale; exceeds token limits; hardcoded |
| Database Comments | Metadata lives with the data, version-controlled | Needs DB modification rights; limited expressiveness |
| RAG on Documentation | Handles vast unstructured context; decouples docs from prompt | Adds architectural complexity; retrieval errors possible |
| Curated Views | Drastically simplifies schema reasoning, improves accuracy | High setup/maintenance effort; limits ad-hoc flexibility |

Beyond the table-level techniques, four complementary strategies compose into a full pipeline: **Dynamic Schema Selection** (only retrieve schema for tables relevant to the query), **Semantic Layer** (enrich raw schemas with business context), **Few-Shot Prompting** (dynamically select similar question/SQL example pairs), and **Error Correction Tools** (retriever tools that catch misspellings in high-cardinality columns before SQL generation). The key strategy: it's not about providing more information, it's about providing the *right* information at the *right* time — schema discovery → semantic enrichment → few-shot guidance → error correction.

## The Integrated Architecture

LangGraph acts as the orchestration &ldquo;brain,&rdquo; MCP as the standardized &ldquo;nervous system&rdquo; connecting to tool &ldquo;limbs.&rdquo; End-to-end flow: User Interface → LangGraph Agent (Brain) → MCP Client → Custom MCP Server (Limb) → Database. This separation of concerns lets orchestration logic and tool implementation scale and update independently, and any MCP-compliant tool can plug into any LangGraph agent.

## Productionization & Security

Executing LLM-generated code against a database is inherently risky — a production system needs defense-in-depth across every layer, since prompt instructions alone are not enough:

| Layer | Control | Rationale |
|---|---|---|
| Database | Strict read-only permissions (dedicated SELECT-only user) | The most critical line of defense |
| Database | Row-level security / views | Enforces &ldquo;need-to-know&rdquo; data segregation |
| Application | Keyword filtering (reject DELETE/DROP/UPDATE) | Deterministic failsafe, immune to prompt injection |
| Application | Pre-execution validation (e.g., LangChain's QuerySQLCheckerTool) | Cost-effective circuit breaker for syntax errors |
| LLM | Prompt-level guardrails | Hardens default model behavior |
| Access | User-based context filtering | Prevents the LLM from seeing unauthorized data structures |

## Key Takeaways

- The article's central design principle is that MCP and LangGraph solve two genuinely different problems — MCP standardizes *how* an agent talks to tools, LangGraph governs *when and why* it decides to call them — and treating them as substitutes rather than complements is the mistake the &ldquo;brain and nervous system&rdquo; framing is meant to head off.
- Context provisioning is presented as a pipeline, not a single technique choice: the four table-level strategies (prompt engineering, comments, RAG, curated views) address *what* metadata exists, while dynamic selection, semantic layering, few-shot examples, and error correction address *when and how much* of it reaches the LLM — conflating these two concerns is what causes both token-limit blowouts and hallucinated columns.
- The security section's core argument is that no single layer is sufficient on its own — prompt-level guardrails are explicitly framed as the weakest control (model behavior, not a hard constraint), which is why database-level read-only permissions are called the most critical line of defense: the layers are ordered by how hard they are to bypass, not how easy they are to implement.

## Related Reading

- [Database Agents with MCP and LangChain](/articles/database-agents-mcp-langchain)
