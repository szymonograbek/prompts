"use server";

import {
  PromptRequest,
  PromptResponse,
  promptRequestSchema,
} from "@/features/types";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, LLMResult } from "langchain/schema";
import { fromZodError } from "zod-validation-error";

export async function getChatResponse(params: PromptRequest) {
  const parseResult = promptRequestSchema.safeParse(params);

  if (!parseResult.success) {
    throw fromZodError(parseResult.error);
  }

  let tokens = 0;

  const chat = new ChatOpenAI({
    temperature: params.params.temperature,
    maxTokens: params.params.maxTokens,
    modelName: params.model,
    callbacks: [
      {
        handleLLMEnd: (output: LLMResult) => {
          tokens += output.llmOutput?.tokenUsage.totalTokens;
          console.log("tokenUsage", { tokenUsage: output.llmOutput });
        },
      },
    ],
  });

  const chatResponse = await chat.call([new HumanChatMessage(params.prompt)]);

  const response: PromptResponse = {
    response: chatResponse.text,
    tokens: tokens,
  };

  return response;
}
