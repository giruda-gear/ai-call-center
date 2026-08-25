import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import { DRIZZLE } from 'src/db/drizzle.module';
import type { DrizzleDB } from 'src/db/drizzle.module';

@Injectable()
export class CustomersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findById(id: number) {
    const [customer] = await this.db
      .select()
      .from(schema.customers)
      .where(eq(schema.customers.id, id));

    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }
}
