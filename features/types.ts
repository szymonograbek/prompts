import { z } from "zod";

export const promptRequestSchema = z.object({
  prompt: z.string(),
  model: z.string(),
});

export type PromptRequest = z.infer<typeof promptRequestSchema>;

export interface PromptResponse {
  response: string;
  tokens: number;
}
