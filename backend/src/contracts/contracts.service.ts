import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import * as schema from '../db/schema';
import { CreateContractDto } from './dto/create_contract.dto';
import { generateContractNumber } from './util/contract-number.util';

@Injectable()
export class ContractsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(dto: CreateContractDto) {
    const contractNumber = generateContractNumber(dto.type);
    const [contract] = await this.db
      .insert(schema.contracts)
      .values({ ...dto, contractNumber })
      .returning();

    return contract;
  }

  async findByCustomerNumber(customerNumber: string) {
    const [customer] = await this.db
      .select({ id: schema.customers.id })
      .from(schema.customers)
      .where(eq(schema.customers.customerNumber, customerNumber));

    if (!customer) throw new NotFoundException('Customer not found');

    return this.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.customerId, customer.id));
  }
}
