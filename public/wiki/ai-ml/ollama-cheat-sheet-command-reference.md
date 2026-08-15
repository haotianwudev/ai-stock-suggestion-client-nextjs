---
path: ai-ml/ollama-cheat-sheet-command-reference
title: Ollama Cheat Sheet: Complete Command Reference
articleSlug: ollama-cheat-sheet-complete-command-reference
date: 2025-07-04
labels: ["AI/ML"]
related: []
---

## Overview

A quick-reference command sheet for [Ollama](https://ollama.com), the tool for running large language models locally. Covers model management, running models interactively, writing Modelfiles, using the local HTTP API, and advanced tips like tool calling and self-hosted web UIs.

## Model Management

| Command | Description |
|---|---|
| `ollama pull <model_name>` | Downloads a model from the Ollama library |
| `ollama list` | Lists all locally downloaded models |
| `ollama rm <model_name>` | Deletes a model from your local machine |
| `ollama cp <source_model> <new_name>` | Creates a copy of a model |

## Running Models

| Command | Description |
|---|---|
| `ollama run <model_name>` | Starts an interactive conversation with a model |
| `ollama run <model_name> "Your prompt"` | Runs a model with a single prompt and exits |
| `/set verbose` | Inside a chat, toggles verbose mode for more detail |
| `/show info` | Inside a chat, shows info about the current model |

## Modelfile Commands

A Modelfile is Ollama's equivalent of a Dockerfile — it defines a custom model configuration.

| Command | Description |
|---|---|
| `ollama create <model_name> -f ./Modelfile` | Builds a model from a Modelfile |
| `FROM <base_model>` | Specifies the base model to build on |
| `PARAMETER <name> <value>` | Sets a model parameter, e.g. `temperature 0.7` |
| `SYSTEM """..."""` | Sets a system-level message for the model |

## API & Server

Ollama exposes a local HTTP API (default port `11434`) once `ollama serve` is running:

- `curl http://localhost:11434/api/generate -d '{ "model": "llama3", "prompt": "..." }'` — generate a response programmatically.
- `curl http://localhost:11434/api/tags` — fetch the list of locally available models.

## Advanced Tips

- **Tool Calling / Internet Access** — local models can't reach the internet directly; use "Tool Calling" with a library like `ollama-python` so your own code fetches external data (e.g., search results) and feeds it back to the model.
- **Open WebUI (Docker)** — a self-hosted web UI for Ollama supporting RAG and multi-model chat, run via a single `docker run` command against `ghcr.io/open-webui/open-webui`.
- **Important Websites** — ollama.com, github.com/ollama/ollama, openwebui.com.

## Key Takeaways

- The command set splits cleanly into two layers: local CLI/model-lifecycle commands (pull/list/rm/run) for interactive use, and the HTTP API (`/api/generate`, `/api/tags`) for programmatic integration — most real applications end up using the API layer exclusively once past initial experimentation.
- Modelfiles are the mechanism for making a pulled base model reusable and shareable with custom parameters or a system prompt baked in, rather than having to pass the same flags/prompt every time `ollama run` is invoked.
- Tool Calling is the documented workaround for Ollama's core limitation (no native internet access) — it shifts responsibility for external data-fetching to the calling application's code, not the model itself.

## Related Reading

- [Ollama Cheat Sheet](/articles/ollama-cheat-sheet-complete-command-reference)
