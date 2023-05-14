import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { BingSerpAPI, SerpAPI, Tool } from "langchain/tools";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAIChat } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { WebBrowser } from "langchain/tools/webbrowser";
import { Calculator } from "langchain/tools/calculator";
import { AgentGPTRequest, agentGPTRequestSchema } from "@/features/types";
import { AgentStreamMessage } from "@/features/agentgpt/constants";
import { SearchProvider } from "@/features/agentgpt/types";

const openAIModel = "gpt-3.5-turbo";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requestBody: AgentGPTRequest = await request.json();

  const parseResult = agentGPTRequestSchema.safeParse(requestBody);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 }
    );
  }

  const {
    calculator,
    search,
    searchProvider,
    webBrowser,
    temperature,
    maxTokens,
  } = requestBody.params;

  const model = new OpenAIChat({
    temperature: temperature,
    modelName: openAIModel,
    maxTokens: maxTokens,
  });

  const embeddings = new OpenAIEmbeddings();

  const tools: Tool[] = [];

  if (search) {
    if (searchProvider === SearchProvider.GOOGLE) {
      tools.push(new SerpAPI(process.env.SERPAPI_API_KEY));
    } else {
      tools.push(new BingSerpAPI(process.env.BING_SERP_API_KEY));
    }
  }

  if (calculator) {
    tools.push(new Calculator());
  }

  if (webBrowser) {
    const browser = new WebBrowser({ model, embeddings });
    browser.description = `useful for when you need to find something on or summarize a webpage. input should be a comma separated list of "ONE valid http URL including protocol","what you want to find on the page".`;
    tools.push(browser);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const startMessage = encoder.encode(AgentStreamMessage.Start);
      controller.enqueue(startMessage);

      const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        maxIterations: 3,
        verbose: false,
      });

      const input = requestBody.goal;

      await executor.run(input, [
        {
          handleAgentAction(action) {
            const actionMessage = encoder.encode(
              `${AgentStreamMessage.AgentAction} ${action.log}`
            );
            controller.enqueue(actionMessage);
          },
          handleAgentEnd(action) {
            const actionMessage = encoder.encode(
              `${AgentStreamMessage.AgentEnd} ${action.log}`
            );
            controller.enqueue(actionMessage);
            controller.close();
          },
          handleToolEnd(output) {
            const actionMessage = encoder.encode(
              `${AgentStreamMessage.ToolEnd} ${output}`
            );
            controller.enqueue(actionMessage);
          },
        },
      ]);
    },
  });

  return new NextResponse(stream);
}
