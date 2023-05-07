import {
  PromptRequest,
  PromptResponse,
  promptRequestSchema,
} from "@/features/types";
import { NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";

import { HumanChatMessage, LLMResult } from "langchain/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export const runtime = "edge";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestBody: PromptRequest = await request.json();

  const parseResult = promptRequestSchema.safeParse(requestBody);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 }
    );
  }

  let tokens = 0;

  const chat = new ChatOpenAI({
    temperature: 0,
    modelName: requestBody.model,
    callbacks: [
      {
        handleLLMEnd: (output: LLMResult) => {
          tokens += output.llmOutput?.tokenUsage.totalTokens;
          console.log("tokenUsage", { tokenUsage: output.llmOutput });
        },
      },
    ],
  });

  const chatResponse = await chat.call([
    new HumanChatMessage(requestBody.prompt),
  ]);

  const response: PromptResponse = {
    response: chatResponse.text,
    tokens: tokens,
  };

  return NextResponse.json(response, { status: 200 });
}
