import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import { DRIZZLE } from 'src/db/drizzle.module';
import type { DrizzleDB } from 'src/db/drizzle.module';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(dto: CreateCustomerDto) {
    const [customer] = await this.db
      .insert(schema.customers)
      .values(dto)
      .returning();
    return customer;
  }

  async findAll() {
    const customers = await this.db.select().from(schema.customers);
    return customers;
  }

  async findById(id: number) {
    const [customer] = await this.db
      .select()
      .from(schema.customers)
      .where(eq(schema.customers.id, id));

    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const [customer] = await this.db
      .update(schema.customers)
      .set(dto)
      .where(eq(schema.customers.id, id))
      .returning();

    if (!customer) throw new NotFoundException('Customer not found');

    return customer;
  }
  async remove(id: number) {
    const [customer] = await this.db
      .delete(schema.customers)
      .where(eq(schema.customers.id, id))
      .returning();

    if (!customer) throw new NotFoundException('Customer not found');

    return customer;
  }
}
