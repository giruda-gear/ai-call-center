import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import {
  AnalyzeMessageResult,
  OllamaChatResponse,
  OllamaEmbedResponse,
} from './types/ai.types';

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

    const data = (await response.json()) as OllamaChatResponse;

    return { message: data.message.content };
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
        format: {
          type: 'object',
          properties: {
            intent: {
              type: 'string',
              enum: [
                'COVERAGE_INQUIRY',
                'CONTRACT_INQUIRY',
                'CALL_HISTORY_INQUIRY',
                'GENERAL_INQUIRY',
              ],
            },
            needsPolicySearch: {
              type: 'boolean',
            },
          },
        },
        required: ['intent', 'needsPolicySearch'],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama');
    }

    const data = (await response.json()) as OllamaChatResponse;
    console.log(data);
    return JSON.parse(data.message.content) as AnalyzeMessageResult;
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

    const data = (await response.json()) as OllamaEmbedResponse;
    return data.embeddings[0];
  }
}
