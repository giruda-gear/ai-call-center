import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  customerNumber: varchar('customer_number', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
