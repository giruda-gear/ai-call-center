import { z } from 'zod';

export const OllamaChatResponseSchema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
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
