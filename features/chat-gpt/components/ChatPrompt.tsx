"use client";

import { useEffect, useState } from "react";
import { ModelSelect, MODELS } from "./ModelSelect";
import { PromptInput } from "./PromptInput";
import { Button } from "@/components/Button";
import { PromptResponse } from "@/features/types";
import { Heading } from "@/components/Heading";
import Loader from "@/components/Loader";

export function ChatPrompt() {
  const [model, setModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [tokens, setTokens] = useState(0);
  const [isPending, setPending] = useState(false);

  const onPromptSubmit = async () => {
    setPending(true);

    const body = {
      model: model.name,
      prompt,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const responseData: PromptResponse = await response.json();

      setResponse(responseData.response);
      setTokens(responseData.tokens);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2">
        <ModelSelect selectedModel={model} onModelSelect={setModel} />
      </div>
      <div className="mb-2 w-full">
        <PromptInput
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
      </div>
      <Button
        colorScheme={!isPending ? "emerald" : "slate"}
        onClick={onPromptSubmit}
        disabled={isPending}
      >
        Submit
      </Button>
      {(response || isPending) && (
        <div className="mt-8 w-full max-w-5xl">
          <Heading className="mb-4">Response ({tokens} tokens)</Heading>
          <div className="border border-slate-300 p-4 rounded-md flex flex-col">
            {!!response && !isPending && <span>{response}</span>}
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
