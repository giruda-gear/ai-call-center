import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const policies = pgTable('policies', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 20 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
