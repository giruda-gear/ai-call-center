ALTER TABLE "call_histories" ALTER COLUMN "ended_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "call_histories" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "call_histories" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "call_histories" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "call_histories" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "customer_request_summary" text;--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "action_taken" text;--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "disposition" varchar(20);--> statement-breakpoint
ALTER TABLE "call_histories" ADD COLUMN "next_step" text;