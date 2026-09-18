import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import * as schema from '../db/schema';
import { CreateContractDto } from './dto/create_contract.dto';
import { generateContractNumber } from './util/contract-number.util';
import { UpdateContractDto } from './dto/update_contract.dto';

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

  async update(contractNumber: string, dto: UpdateContractDto) {
    return this.db
      .update(schema.contracts)
      .set({ ...dto, contractNumber })
      .where(eq(schema.contracts.contractNumber, contractNumber))
      .returning();
  }

  async remove(contractNumber: string) {
    const [deleted] = await this.db
      .delete(schema.contracts)
      .where(eq(schema.contracts.contractNumber, contractNumber))
      .returning({ contractNumber: schema.contracts.contractNumber });

    if (!deleted) {
      throw new NotFoundException(`Contract ${contractNumber} is not found.`);
    }
  }
}
