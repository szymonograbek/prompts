import { AutoGPTRequest, autoGPTRequestSchema } from "@/features/types";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { AutoGPT } from "langchain/experimental/autogpt";
import { BingSerpAPI, ReadFileTool, WriteFileTool } from "langchain/tools";
import { InMemoryFileStore } from "langchain/stores/file/in_memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BabyAGI } from "langchain/experimental/babyagi";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChainTool, SerpAPI, Tool } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { AgentAction, LLMResult } from "langchain/schema";

const todoPrompt = PromptTemplate.fromTemplate(
  "You are a planner who is an expert at coming up with a todo list for a given objective. Come up with a todo list for this objective: {objective}"
);

const tools = [
  new ChainTool({
    name: "TODO",
    chain: new LLMChain({
      llm: new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
      prompt: todoPrompt,
    }),
    description:
      "useful for when you need to come up with todo lists. Input: an objective to create a todo list for. Output: a todo list for that objective. Please be very clear what the objective is!",
  }),
  new BingSerpAPI(process.env.BING_SERP_API_KEY),
];

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestBody: AutoGPTRequest = await request.json();

  const parseResult = autoGPTRequestSchema.safeParse(requestBody);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 }
    );
  }

  const agentExecutor = await initializeAgentExecutorWithOptions(
    tools,
    new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
    {
      agentType: "zero-shot-react-description",
      agentArgs: {
        prefix: `You are an AI who performs one task based on the following objective: {objective}. Take into account these previously completed tasks: {context}.`,
        suffix: `Question: {task}
  {agent_scratchpad}`,
        inputVariables: ["objective", "task", "context", "agent_scratchpad"],
      },
    }
  );

  const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());

  const babyAGI = BabyAGI.fromLLM({
    llm: new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" }),
    executionChain: agentExecutor, // an agent executor is a chain
    vectorstore: vectorStore,
    maxIterations: 3,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          console.log("token", { token });
        },

        handleLLMStart(llm: { name: string }, _prompts: string[]) {
          console.log("handleLLMStart", { llm });
        },

        handleChainStart(chain: { name: string }) {
          console.log("handleChainStart", { chain });
        },

        handleAgentAction(action: AgentAction) {
          console.log("handleAgentAction", action);
        },

        handleToolStart(tool: { name: string }) {
          console.log("handleToolStart", { tool });
        },

        handleLLMEnd: (output: LLMResult) => {
          console.log("llm end", { output });
        },
      },
    ],
  });

  const response = await babyAGI.call({
    objective: requestBody.goal,
  });

  return NextResponse.json(response, { status: 200 });
}
