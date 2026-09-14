ALTER TABLE "contracts" ALTER COLUMN "contract_number" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "type" varchar(20);