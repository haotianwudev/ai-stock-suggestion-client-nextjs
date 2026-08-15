---
path: ai-ml/evolution-autonomous-execution-function-calling-agentic-harnesses
title: The Evolution of Autonomous Execution
articleSlug: evolution-autonomous-execution-function-calling-agentic-harnesses
date: 2026-03-18
labels: ["Generative AI"]
related: []
---

## Overview
A comprehensive technical deep-dive into the evolution of AI tool-calling architectures in quantitative finance. From legacy JSON function calling and Model Context Protocol (MCP) to programmatic Turing-complete code execution and modern agent harnesses with skills-based context management.

## 1. Legacy Function Calling (JSON)
The first generation of AI agents interacted with external systems via JSON function calling. 
The LLM outputs a strictly formatted JSON object matching a predefined schema. The application intercepts this JSON, executes the corresponding Python or C++ function, and returns the result to the LLM. 
While robust, this approach requires developers to hardcode every single possible tool the AI might need, severely limiting its autonomy.

## 2. Model Context Protocol (MCP)
To solve the scalability issues of JSON function calling, Anthropic introduced the Model Context Protocol. MCP provides a standardized way for AI models to connect to external data sources and tools. 
Instead of hardcoding functions into the application, developers build standalone MCP Servers that expose their capabilities. The AI agent acts as an MCP Client, dynamically discovering and invoking tools across multiple servers.

## 3. Turing-Complete Code Execution
The most significant leap in autonomous execution is allowing the LLM to write and execute code (Python/Bash) directly in a secure sandbox.
Instead of calling a pre-built `fetch_stock_price` function, the LLM can write a Python script that uses the `yfinance` library to fetch the price, perform complex pandas transformations, and generate a matplotlib chart. This makes the agent's capabilities virtually unbounded.

## 4. Skills-Based Agent Harnesses
As agents gained Turing-complete execution, managing their context window became the primary challenge. If you give an agent access to every API and database, its context window fills with irrelevant schemas.
Modern harnesses solve this using "Skills." A Skill is a bundle of instructions, tools, and context that is dynamically loaded *only when needed*. If the user asks about BigQuery, the harness injects the `bigquery-sql` skill. This keeps the agent focused, efficient, and less prone to hallucination.

## Related Reading

- [The Evolution of Autonomous Execution: From Legacy Function Calling to Agentic Skills-Based Harnesses](/articles/evolution-autonomous-execution-function-calling-agentic-harnesses)
- [Watch on YouTube](https://youtu.be/N1wOqSyN4ZA)
