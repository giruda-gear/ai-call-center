import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, ilike, or } from 'drizzle-orm';
import * as schema from '../db/schema';

import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { generateCustomerNumber } from './utils/generate-customer-number';

@Injectable()
export class CustomersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(dto: CreateCustomerDto) {
    const customerNumber = generateCustomerNumber();
    const [customer] = await this.db
      .insert(schema.customers)
      .values({ ...dto, customerNumber })
      .returning();
    return customer;
  }

  async findAll(query?: string) {
    if (!query) {
      return this.db.select().from(schema.customers);
    }

    return this.db
      .select()
      .from(schema.customers)
      .where(
        or(
          ilike(schema.customers.customerNumber, `%${query}`),
          ilike(schema.customers.name, `%${query}`),
          ilike(schema.customers.email, `%${query}`),
          ilike(schema.customers.phone, `%${query}`),
        ),
      );
  }

  async findById(id: number) {
    const [customer] = await this.db
      .select()
      .from(schema.customers)
      .where(eq(schema.customers.id, id));

    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async findByCustomerNumber(customerNumber: string) {
    const [customer] = await this.db
      .select()
      .from(schema.customers)
      .where(eq(schema.customers.customerNumber, customerNumber));

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
