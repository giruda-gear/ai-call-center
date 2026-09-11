import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import * as schema from '../db/schema';

@Injectable()
export class ContractsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findByCustomerId(customerId: number) {
    return this.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.customerId, customerId));
  }
}
