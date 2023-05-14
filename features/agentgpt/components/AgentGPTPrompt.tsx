"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { AgentGPTRequest } from "@/features/types";
import { Heading } from "@/components/Heading";
import Loader from "@/components/Loader";
import { PromptInput } from "@/features/chat-gpt/components/PromptInput";
import { AgentMessage } from "./AgentMessage";
import { AgentSettings, ToolsConfig } from "./AgentSettings";
import { tools } from "../constants";
import { SearchProvider } from "../types";

export function AgentGPTPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<Array<string>>([]);
  const [isPending, setPending] = useState(false);
  const [settings, setSettings] = useState<AgentGPTRequest["params"]>({
    temperature: 0,
    maxTokens: 512,
    calculator: true,
    webBrowser: true,
    search: true,
    searchProvider: SearchProvider.BING,
  });

  const onPromptSubmit = async () => {
    setPending(true);

    const body: AgentGPTRequest = {
      goal: prompt,
      params: settings,
    };

    try {
      setResponse([]);

      const response = await fetch("/api/agentgpt", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const responseData = response.body;

      if (!responseData) {
        return;
      }

      const decoder = new TextDecoder();
      const reader = responseData.getReader();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();

        const message = decoder.decode(value);
        done = doneReading;

        if (message.length) {
          setResponse((prev) => [...prev, message]);
        }
      }

      setPending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const toolsList: Array<ToolsConfig> = tools.map((tool) => ({
    ...tool,
    enabled: settings[tool.key],
    onChange: (state) =>
      setSettings((prev) => ({ ...prev, [tool.key]: state })),
  }));

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2">
        <AgentSettings
          temperature={settings.temperature}
          setTemperature={(temperature) =>
            setSettings((prev) => ({ ...prev, temperature }))
          }
          maxTokens={settings.maxTokens}
          setMaxTokens={(maxTokens) =>
            setSettings((prev) => ({ ...prev, maxTokens }))
          }
          tools={toolsList}
          searchProvider={settings.searchProvider}
          setSearchProvider={(provider) =>
            setSettings((prev) => ({ ...prev, searchProvider: provider }))
          }
        />
      </div>
      <div className="mb-2 w-full">
        <PromptInput
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Write a weather report for Wrocław, Poland, today"
        />
      </div>
      <Button
        colorScheme={!isPending ? "emerald" : "slate"}
        onClick={onPromptSubmit}
        disabled={isPending}
      >
        Submit
      </Button>
      {!!response.length && (
        <div className="mt-8 w-full max-w-5xl">
          <Heading className="mb-4">Response</Heading>
          <div className="border border-slate-300 p-4 rounded-md flex flex-col">
            {response.map((res) => (
              <AgentMessage message={res} key={res} />
            ))}
            {isPending && (
              <div className="self-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
