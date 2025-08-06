ALTER TABLE "users" DROP CONSTRAINT "users_invitee_users_id_fk";
--> statement-breakpoint
DROP INDEX "email_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "invitee";