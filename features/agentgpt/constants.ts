import { z } from "zod";

export const AgentStreamMessage = {
  Start: "Agent Start",
  AgentAction: "Agent Action:",
  AgentEnd: "Agent End:",
  ToolEnd: "Tool End:",
} as const;

const toolsSchema = z.object({
  key: z.string(),
  name: z.string(),
});

export type Tool = z.infer<typeof toolsSchema>;

export const tools = [
  {
    key: "calculator",
    name: "Calculator",
  },
  {
    key: "webBrowser",
    name: "Web Browser",
  },
  {
    key: "search",
    name: "Search",
  },
] as const;
