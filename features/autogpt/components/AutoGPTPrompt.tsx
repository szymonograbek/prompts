"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  AutoGPTRequest,
  PromptRequest,
  PromptResponse,
} from "@/features/types";
import { Heading } from "@/components/Heading";
import Loader from "@/components/Loader";
import { PromptInput } from "@/features/chat-gpt/components/PromptInput";

export function AutoGPTPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isPending, setPending] = useState(false);

  const onPromptSubmit = async () => {
    setPending(true);

    const body: AutoGPTRequest = {
      goal: prompt,
    };

    try {
      const response = await fetch("/api/autogpt", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const responseData: PromptResponse = await response.json();

      setResponse(responseData.response);
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
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
          <Heading className="mb-4">Response</Heading>
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
