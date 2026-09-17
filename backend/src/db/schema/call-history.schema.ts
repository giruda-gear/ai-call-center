import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { customers } from './customer.schema';
import { index } from 'drizzle-orm/pg-core';

export const callHistories = pgTable(
  'call_histories',
  {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id').references(() => customers.id),
    direction: varchar('direction', { length: 20 }).notNull(),
    fromNumber: varchar('from_number', { length: 30 }).notNull(),
    toNumber: varchar('to_number', { length: 30 }).notNull(),
    callNotes: text('call_notes'),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    endedAt: timestamp('ended_at', { withTimezone: true }).notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('call_histories_customer_id_idx').on(table.customerId)],
);
