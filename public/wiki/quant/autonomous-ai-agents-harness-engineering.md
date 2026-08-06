# Autonomous AI Agents: Harness Engineering

## Overview
A detailed architectural overview of Harness Engineering—the operational infrastructure that wraps around non-deterministic LLMs to deploy fault-tolerant, autonomous AI agents in rigorous domains like quantitative finance.

## The Autonomy Equation
- **Model + Harness = Autonomous Agent.** The competitive moat in quantitative finance is no longer just the underlying LLM; it's the scaffolding that provides progressive context delivery, deterministic constraints, and self-correcting feedback loops.
- **Operational Mantra:** "Debug the environment, not the model."

## Standard Harness Components
- **Execution Runtime:** The foundational loop intercepting intents, invoking tools, and verifying programmatic outputs.
- **Secure Sandboxes:** Isolated environments (like E2B MicroVMs or Daytona OCI containers) for secure code execution.
- **Memory & Compaction:** Dynamically summarizes historical actions to mitigate context rot.
- **Authorization Fabric:** Deterministic security gates enforcing strict policy constraints (OAuth/RBAC).
- **Observability Tracing:** Instrumentation capturing real-time execution metrics and reasoning trees.
- **Filesystem Workspace:** Durable storage for collaboration and state tracking across multi-day tasks.

## Tools, Skills & MCP
- **Raw Tools vs Curated Skills:** Raw tools are atomic generic capabilities (e.g., `execute_bash`), whereas curated skills are execution strategies encapsulating domain expertise (e.g., a "Database Migration" skill) to guide tool combinations.
- **Model Context Protocol (MCP):** The universal standard connecting AI agents to external data. MCP standardizes discovery, authentication, and dynamic tool invocation, drastically improving latency and token efficiency through progressive disclosure.

## Recursive Autonomy & Graph Execution
- **Recursive Autonomy:** Advanced harnesses empower AI to invoke skills that autonomously call other sub-skills. Strict Recursion Guards (Max Depth/Children) prevent runaway compute costs.
- **LangGraph Architecture:** Conceptualizes agent workflows as cyclical, directed graphs. Unconstrained agency is localized within strictly bounded nodes, with conditional edges routing outputs through deterministic compliance verification loops (e.g., "Ralph Loops") before market execution.
