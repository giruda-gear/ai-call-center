import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 100 }).notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
