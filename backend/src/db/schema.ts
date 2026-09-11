import {
  date,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

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

export const contracts = pgTable('contracts', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  contractNumber: varchar('contract_number', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 20 }).notNull(),
  endData: date('end_date'),
  createAt: timestamp('created_ at').defaultNow().notNull(),
});
