import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, cosineDistance, desc, eq, gt, sql } from 'drizzle-orm';

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

  async searchPolicyChunks(query: string, policyType?: string) {
    const queryEmbedding = await this.aiService.embed(query);

    const similarity = sql<number>`
    1 - (${cosineDistance(schema.policyChunks.embedding, queryEmbedding)})`;
    // SQL filtering + vector search together
    return this.db
      .select({
        id: schema.policyChunks.id,
        policyId: schema.policyChunks.policyId,
        policyTitle: schema.policies.title,
        policyType: schema.policies.type,
        content: schema.policyChunks.content,
        similarity, // 1 - (policy_chunks.embedding <=> queryEmbedding)
      })
      .from(schema.policyChunks)
      .innerJoin(
        schema.policies,
        eq(schema.policies.id, schema.policyChunks.policyId),
      )
      .where(
        and(
          gt(similarity, 0.7),
          policyType ? eq(schema.policies.type, policyType) : undefined,
        ),
      )
      .orderBy(desc(similarity))
      .limit(3);
  }

  private chunkText(text: string, chunkSize = 500): string[] {
    const chunks: string[] = [];

    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks;
  }
}
