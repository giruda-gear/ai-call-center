import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module.js';
import * as schema from '../db/schema.js';

@Injectable()
export class PolicyService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}
  private chunkText(text: string, chunkSize = 500): string[] {
    const chunk: string[] = [];

    for (let i = 0; i < chunkSize; i++) {
      chunk.push(text.slice(i, i + chunkSize));
    }

    return chunk;
  }

  async ingestPolicy(policyId: number) {
    const [policy] = await this.db
      .select()
      .from(schema.policies)
      .where(eq(schema.policies.id, policyId));
  }
}
