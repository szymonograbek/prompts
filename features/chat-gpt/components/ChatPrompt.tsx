"use client";

import { useState } from "react";
import { ModelSelect, MODELS } from "./ModelSelect";
import { PromptInput } from "./PromptInput";
import { Button } from "@/components/Button";
import { PromptRequest, PromptResponse } from "@/features/types";
import { Heading } from "@/components/Heading";
import Loader from "@/components/Loader";
import { ChatSettings } from "./ChatSettings";
import { getChatResponse } from "../actions/chat";

export function ChatPrompt() {
  const [model, setModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [tokens, setTokens] = useState(0);
  const [isPending, setPending] = useState(false);
  const [openAIParams, setOpenAIParams] = useState<PromptRequest["params"]>({
    temperature: 0,
    maxTokens: 256,
  });

  const onPromptSubmit = async () => {
    setPending(true);

    const params: PromptRequest = {
      model: model.name,
      prompt,
      params: openAIParams,
    };

    try {
      const { response, tokens } = await getChatResponse(params);

      setResponse(response);
      setTokens(tokens);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="mb-2 flex">
        <div className="mr-2">
          <ModelSelect selectedModel={model} onModelSelect={setModel} />
        </div>
        <ChatSettings
          temperature={openAIParams.temperature}
          setTemperature={(temp) =>
            setOpenAIParams((prev) => ({ ...prev, temperature: temp }))
          }
          maxTokens={openAIParams.maxTokens}
          setMaxTokens={(tokens) =>
            setOpenAIParams((prev) => ({ ...prev, maxTokens: tokens }))
          }
        />
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
            {!!response && !isPending && (
              <span className="whitespace-pre-wrap">{response}</span>
            )}
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
