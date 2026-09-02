ALTER TABLE "customers" ADD COLUMN "customer_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_customer_number_unique" UNIQUE("customer_number");