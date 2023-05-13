import { z } from "zod";
import { SearchProvider } from "./agentgpt/types";

export const promptRequestSchema = z.object({
  prompt: z.string(),
  model: z.string(),
  params: z.object({
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(1).max(4000),
  }),
});

export type PromptRequest = z.infer<typeof promptRequestSchema>;

export interface PromptResponse {
  response: string;
  tokens: number;
}

export const agentGPTRequestSchema = z.object({
  goal: z.string(),
  params: z.object({
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(1).max(4000),
    calculator: z.boolean(),
    webBrowser: z.boolean(),
    search: z.boolean(),
    searchProvider: z.nativeEnum(SearchProvider),
  }),
});

export type AgentGPTRequest = z.infer<typeof agentGPTRequestSchema>;

export interface AgentGPTResponse {}
