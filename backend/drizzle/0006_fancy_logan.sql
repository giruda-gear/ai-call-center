ALTER TABLE "call_histories" RENAME COLUMN "type" TO "direction";--> statement-breakpoint
ALTER TABLE "call_histories" RENAME COLUMN "summary" TO "call_notes";--> statement-breakpoint
ALTER TABLE "call_histories" ALTER COLUMN "customer_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "from_number" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "to_number" varchar(30) NOT NULL;--> statement-breakpoint
CREATE INDEX "call_histories_customer_id_idx" ON "call_histories" USING btree ("customer_id");