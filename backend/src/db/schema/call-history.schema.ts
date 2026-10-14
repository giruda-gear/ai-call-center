import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

import { customers } from './customer.schema.js';

export const callHistories = pgTable(
  'call_histories',
  {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id').references(() => customers.id),

    direction: varchar('direction', { length: 20 }).notNull(),
    fromNumber: varchar('from_number', { length: 30 }).notNull(),
    toNumber: varchar('to_number', { length: 30 }).notNull(),

    customerRequestSummary: text('customer_request_summary'),
    actionTaken: text('action_taken'),
    disposition: varchar('disposition', { length: 20 }),
    nextStep: text('next_step'),

    callNotes: text('call_notes'),

    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    endedAt: timestamp('ended_at', { withTimezone: true }),
    duration: integer('duration'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('call_histories_customer_id_idx').on(table.customerId)],
);
