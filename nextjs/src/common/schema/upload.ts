import { z } from "zod";

export const LLMResponseSchema = z.object({
  id: z.string(),
  timestamp: z.string().datetime(),
  model: z.string(),
  prompt_tokens: z.number().nullable(),
  completion_tokens: z.number().nullable(),
  total_tokens: z.number().nullable(),
  response_time_ms: z.number(),
  status: z.string(),
  cost_usd: z.number(),
  temperature: z.number(),
  max_tokens: z.number(),
  prompt_template: z.string(),
  output: z.string().nullable(),
  evaluation_metrics: z
    .object({
      relevance_score: z.number(),
      factual_accuracy: z.number(),
      coherence_score: z.number(),
      response_quality: z.number(),
    })
    .nullable(),
  error: z
    .object({
      type: z.string(),
      message: z.string(),
    })
    .nullable(),
});

export const UploadSchema = z.object({
  responses: z.array(LLMResponseSchema),
});

export type Upload = z.infer<typeof UploadSchema>;
export type LLMResponse = z.infer<typeof LLMResponseSchema>;
