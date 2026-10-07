import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';

import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module.js';
import {
  AnalyzeResultSchema,
  OllamaChatResponseSchema,
  OllamaEmbedResponseSchema,
} from './schemas/ai.schema.js';

@Injectable()
export class AiService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async chat(message: string) {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3:8b',
        messages: [{ role: 'user', content: message }],
        stream: false,
        think: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama');
    }

    const json: unknown = await response.json();

    const data = OllamaChatResponseSchema.parse(json);

    return {
      message: data.message.content,
    };
  }

  async analyze(message: string) {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3:8b',
        messages: [
          {
            role: 'system',
            content: `
You classify customer inquiries for an insurance call center.

COVERAGE_INQUIRY:
Questions about insurance coverage, benefits, exclusions, or whether a treatment or service is covered.

CONTRACT_INQUIRY:
Questions about the customer's insurance contract, contract status, start date, or end date.

CALL_HISTORY_INQUIRY:
Questions about previous calls or customer service interactions.

GENERAL_INQUIRY:
Questions that do not fit the categories above.

Set needsPolicySearch to true when answering the question requires information from insurance policy documents.
    `.trim(),
          },
          { role: 'user', content: message },
        ],
        stream: false,
        think: false,
        format: z.toJSONSchema(AnalyzeResultSchema), // tell Ollama what to generate
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama');
    }

    const json: unknown = await response.json();

    const data = OllamaChatResponseSchema.parse(json);

    const parsed: unknown = JSON.parse(data.message.content);
    // validate what ollama returned
    return AnalyzeResultSchema.parse(parsed);
  }

  async embed(text: string): Promise<number[]> {
    const response = await fetch('http://localhost:11434/api/embed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }

    const json: unknown = await response.json();

    const data = OllamaEmbedResponseSchema.parse(json);

    return data.embeddings[0];
  }

  async generateAnswer(message: string, context: string) {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3:8b',
        messages: [
          {
            role: 'system',
            content: `
You are an assistant for an insurance call center.

Answer the customer's question using only the provided policy context.

If the context does not contain enough information to answer the question,
say that the available policy information is insufficient.

Policy context:
${context}
          `.trim(),
          },
          {
            role: 'user',
            content: message,
          },
        ],
        stream: false,
        think: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama');
    }

    const json: unknown = await response.json();
    const data = OllamaChatResponseSchema.parse(json);

    return data.message.content;
  }
}
