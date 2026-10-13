import { z } from 'zod';

export const OllamaTollCallSchema = z.object({
  id: z.string(),
  function: z.object({
    index: z.number(),
    name: z.string(),
    arguments: z.record(z.string(), z.unknown()),
  }),
});

export const OllamaChatResponseSchema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
    tool_calls: z.array(OllamaTollCallSchema).optional(),
  }),
});

export const OllamaEmbedResponseSchema = z.object({
  embeddings: z.array(z.array(z.number())),
});

export const CustomerIntentSchema = z.enum([
  'COVERAGE_INQUIRY',
  'CONTRACT_INQUIRY',
  'CALL_HISTORY_INQUIRY',
  'GENERAL_INQUIRY',
]);

export const AnalyzeResultSchema = z.object({
  intent: CustomerIntentSchema,
  needsPolicySearch: z.boolean(),
});
