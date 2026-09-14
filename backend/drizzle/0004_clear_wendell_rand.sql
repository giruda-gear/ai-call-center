ALTER TABLE "contracts" RENAME COLUMN "created_ at" TO "created_at";--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "start_date" date;--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;