import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { AiService } from '../ai/ai.service.js';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module.js';
import * as schema from '../db/schema.js';

@Injectable()
export class PolicyService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDB,
    private readonly aiService: AiService,
  ) {}

  private chunkText(text: string, chunkSize = 500): string[] {
    const chunks: string[] = [];

    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks;
  }

  async ingestPolicy(policyId: number) {
    const [policy] = await this.db
      .select()
      .from(schema.policies)
      .where(eq(schema.policies.id, policyId));

    if (!policy) {
      throw new NotFoundException(`Policy ${policyId} not found.`);
    }

    await this.db
      .delete(schema.policyChunks)
      .where(eq(schema.policyChunks.policyId, policy.id));

    const chunks = this.chunkText(policy.content);

    for (const chunk of chunks) {
      const embedding = await this.aiService.embed(chunk);

      await this.db.insert(schema.policyChunks).values({
        policyId: policy.id,
        content: chunk,
        embedding,
      });
    }

    return {
      policyId,
      chunksCreated: chunks.length,
    };
  }
}
