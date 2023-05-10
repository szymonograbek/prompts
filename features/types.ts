import { z } from "zod";

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

export const autoGPTRequestSchema = z.object({
  goal: z.string(),
});

export type AutoGPTRequest = z.infer<typeof autoGPTRequestSchema>;

export interface AutoGPTResponse {}
