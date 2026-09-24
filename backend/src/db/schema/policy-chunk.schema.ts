import { integer, pgTable, serial, text, vector } from 'drizzle-orm/pg-core';
import { policies } from './policy.schema';
import { timestamp } from 'drizzle-orm/pg-core';

export const policyChunks = pgTable('policy_chunks', {
  id: serial('id').primaryKey(),
  policyId: integer('policy_id')
    .notNull()
    .references(() => policies.id),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 768 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
