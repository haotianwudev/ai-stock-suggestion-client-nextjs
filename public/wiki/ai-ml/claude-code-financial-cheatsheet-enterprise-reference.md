# Claude Code Financial Cheatsheet

## Overview
A comprehensive enterprise reference for using Claude Code in quantitative finance workflows. Master CLI execution flags, slash commands, MCP architecture, sub-agent patterns, and security guardrails for building institutional-grade algorithmic trading systems.

## 1. CLI Execution Flags
Claude Code can be initialized with various flags to configure its environment.
- `--model`: Specify the underlying Claude model (e.g. `claude-3-7-sonnet-20250219`).
- `--tools`: Define which MCP (Model Context Protocol) servers to expose to the agent.
- `--read-only`: Force the agent into a read-only mode to prevent accidental deletion of backtest logs.

## 2. Slash Commands
- `/goal`: Sets a long-running goal for the agent, preventing it from yielding until the objective is complete. Useful for running extensive backtests.
- `/schedule`: Schedules a background cron job for the agent to wake up and check market conditions.
- `/learn`: Instructs the agent to persist a newly learned market structure quirk to its permanent memory.

## 3. Sub-Agent Patterns
In complex quantitative workflows, you should avoid monolithic agents. Instead, use a swarm of sub-agents:
1. **Data Agent:** Specialized in fetching and cleaning time-series data via SQL.
2. **Quant Agent:** Specialized in fitting mathematical models (e.g., GARCH) to the data.
3. **Execution Agent:** Specialized in taking the model's signals and generating FIX protocol messages.

## 4. Security Guardrails
When giving an LLM access to a terminal, security is paramount.
- Always run Claude Code inside an isolated Docker container with zero network access to production trading servers.
- Use the `accidental-data-loss-prevention` skill to require human confirmation before executing `DROP TABLE` or `rm -rf` commands.
