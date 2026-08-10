'use client';

import { useState } from 'react';
import { FileText, Terminal, Database, Cloud, Copy, Check, Sparkles, Globe } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

function CheatSheetSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center font-serif">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function CommandCard({ command, description, example, isLinkList = false }: { command: string; description: string; example: string; isLinkList?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (textToCopy: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textArea);
  };

  const renderExample = () => {
    if (isLinkList) {
      const links = example.split('\n');
      return (
        <div className="flex flex-col space-y-2">
          {links.map((link: string, i: number) => (
            <a
              key={i}
              href={`https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-mono text-sm hover:underline flex items-center"
            >
              <Globe className="w-3 h-3 mr-2" />
              {link}
            </a>
          ))}
        </div>
      );
    }
    return (
      <code className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-mono text-sm whitespace-pre-wrap break-words">
        {example}
      </code>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300">
      <div>
        <div className="flex justify-between items-start mb-3">
          <code className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm sm:text-base break-words">
            {command}
          </code>
          <button
            onClick={() => handleCopy(command)}
            className={`p-2 rounded-md transition-colors duration-200 ${
              copied
                ? 'bg-[#1D8A70] dark:bg-[#3CBF9C] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label="Copy command"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-500 dark:text-gray-400 text-sm mb-1">
          {isLinkList ? "Links:" : "Example:"}
        </h4>
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 rounded p-2">
          {renderExample()}
          {!isLinkList && (
            <button
              onClick={() => handleCopy(example)}
              className="ml-2 p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Copy example"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OllamaCheatSheetArticle() {
  const cheatSheetData = [
    {
      category: 'Model Management',
      icon: <Database className="w-6 h-6 mr-3 text-[#A8672E] dark:text-[#D08F52]" />,
      commands: [
        {
          command: 'ollama pull <model_name>',
          description: 'Downloads a model from the Ollama library.',
          example: 'ollama pull llama3',
        },
        {
          command: 'ollama list',
          description: 'Lists all models that you have downloaded.',
          example: 'ollama list',
        },
        {
          command: 'ollama rm <model_name>',
          description: 'Deletes a model from your local machine.',
          example: 'ollama rm llama3',
        },
        {
          command: 'ollama cp <source_model> <new_name>',
          description: 'Creates a copy of a model.',
          example: 'ollama cp llama3 my-llama3-copy',
        },
      ],
    },
    {
      category: 'Running Models',
      icon: <Terminal className="w-6 h-6 mr-3 text-[#1D8A70] dark:text-[#3CBF9C]" />,
      commands: [
        {
          command: 'ollama run <model_name>',
          description: 'Starts a conversation with a model.',
          example: 'ollama run llama3',
        },
        {
          command: 'ollama run <model_name> "Your prompt"',
          description: 'Runs a model with a single prompt and exits.',
          example: 'ollama run llama3 "What is the capital of France?"',
        },
        {
          command: '/set verbose',
          description: 'Inside a chat, toggles verbose mode to see more details.',
          example: '/set verbose'
        },
        {
          command: '/show info',
          description: 'Inside a chat, shows information about the current model.',
          example: '/show info'
        },
      ],
    },
    {
      category: 'Modelfile Commands',
      icon: <FileText className="w-6 h-6 mr-3 text-purple-500" />,
      commands: [
        {
          command: 'ollama create <model_name> -f ./Modelfile',
          description: 'Creates a model from a Modelfile.',
          example: 'ollama create my-custom-model -f ./Modelfile',
        },
        {
          command: 'FROM <base_model>',
          description: '(In Modelfile) Specifies the base model to use.',
          example: 'FROM llama3',
        },
        {
          command: 'PARAMETER <name> <value>',
          description: '(In Modelfile) Sets a parameter for the model.',
          example: 'PARAMETER temperature 0.7',
        },
        {
          command: 'SYSTEM """..."""',
          description: '(In Modelfile) Sets a system-level message.',
          example: 'SYSTEM """You are a helpful AI assistant."""',
        },
      ],
    },
    {
      category: 'API & Server',
      icon: <Cloud className="w-6 h-6 mr-3 text-yellow-500" />,
      commands: [
        {
          command: 'ollama serve',
          description: 'Starts the Ollama server. It usually runs in the background.',
          example: 'ollama serve',
        },
        {
          command: "curl http://localhost:11434/api/generate -d '{ ... }'",
          description: 'Use the API to generate a response. (Check docs for JSON).',
          example: `curl http://localhost:11434/api/generate -d '{ "model": "llama3", "prompt": "Why is the sky blue?" }'`,
        },
        {
          command: 'curl http://localhost:11434/api/tags',
          description: 'Fetches the list of local models via the API.',
          example: `curl http://localhost:11434/api/tags`,
        },
      ],
    },
    {
      category: 'Advanced Tips & Useful Tools',
      icon: <Sparkles className="w-6 h-6 mr-3 text-cyan-500" />,
      commands: [
        {
          command: 'Tool Calling / Internet Access',
          description: 'Models can\'t access the internet directly. Use "Tool Calling" with a library like ollama-python to have the model request external data (e.g., search results), which your code provides.',
          example: `// Your Python code detects this request from the model\n// then calls a search API and feeds results back in.`,
        },
        {
          command: 'Open WebUI (Docker)',
          description: 'A powerful, self-hosted web UI for Ollama. Supports RAG, multi-model chat, and more. Run with Docker for an easy setup.',
          example: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main',
        },
        {
          command: 'Important Websites',
          description: "Official resources for documentation, updates, community tools, and SOPHIE's Daddy Blog.",
          example: 'ollama.com\ngithub.com/ollama/ollama\nopenwebui.com\nsophie-ai-finance.com',
        },
      ],
    },
  ];

  return (
    <ArticleFrame slug="ollama-cheat-sheet-complete-command-reference">
      <div className="space-y-12">
        {cheatSheetData.map((section, index) => (
          <CheatSheetSection key={index} title={section.category} icon={section.icon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.commands.map((cmd, cmdIndex) => (
                <CommandCard
                  key={cmdIndex}
                  command={cmd.command}
                  description={cmd.description}
                  example={cmd.example}
                  isLinkList={cmd.command === 'Important Websites'}
                />
              ))}
            </div>
          </CheatSheetSection>
        ))}
      </div>
    </ArticleFrame>
  );
}
