import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE, type DrizzleDB } from '../db/drizzle.module';
import * as schema from '../db/schema';
import { and, desc, eq, gte, lt, type SQL } from 'drizzle-orm';
import { CreateCallHistoryDto } from './dto/create-call-history.dto';
import { FindCallHistoryDto } from './dto/find-call-history.dto';
import { Temporal } from '@js-temporal/polyfill';

@Injectable()
export class CallHistoryService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(dto: CreateCallHistoryDto) {
    const [callHistory] = await this.db
      .insert(schema.callHistories)
      .values({
        ...dto,
        startedAt: new Date(dto.startedAt),
        endedAt: new Date(dto.endedAt),
      })
      .returning();

    return callHistory;
  }

  async findAll(query: FindCallHistoryDto) {
    const { customerNumber, from, to } = query;
    const conditions: SQL[] = [];

    if (customerNumber) {
      conditions.push(eq(schema.customers.customerNumber, customerNumber));
    }

    if (from) {
      const day = new Date(
        Temporal.PlainDate.from(from)
          .toZonedDateTime('Europe/Berlin')
          .toInstant().epochMilliseconds,
      );
      conditions.push(gte(schema.callHistories.startedAt, day));
    }

    if (to) {
      const nextDay = new Date(
        Temporal.PlainDate.from(to)
          .add({ days: 1 })
          .toZonedDateTime('Europe/Berlin')
          .toInstant().epochMilliseconds,
      );
      conditions.push(lt(schema.callHistories.endedAt, nextDay));
    }

    return this.db
      .select({
        id: schema.callHistories.id,
        customerId: schema.callHistories.customerId,
        direction: schema.callHistories.direction,
        fromNumber: schema.callHistories.fromNumber,
        toNumber: schema.callHistories.toNumber,
        callNotes: schema.callHistories.callNotes,
        startedAt: schema.callHistories.startedAt,
        endedAt: schema.callHistories.endedAt,
        duration: schema.callHistories.duration,
      })
      .from(schema.callHistories)
      .leftJoin(
        schema.customers,
        eq(schema.callHistories.customerId, schema.customers.id),
      )
      .where(and(...conditions))
      .orderBy(desc(schema.callHistories.startedAt));
  }

  async findOne(id: number) {
    return this.db
      .select()
      .from(schema.callHistories)
      .where(eq(schema.callHistories.id, id));
  }

  // async update(id: number, updateCallHistoryDto: UpdateCallHistoryDto) {
  //   return `This action updates a #${id} callHistory`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} callHistory`;
  // }
}
