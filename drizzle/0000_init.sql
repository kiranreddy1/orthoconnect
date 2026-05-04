CREATE TABLE IF NOT EXISTS "assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"age" integer,
	"sex_at_birth" varchar(20),
	"height_cm" integer,
	"weight_kg" integer,
	"sport" varchar(50),
	"activity_frequency" varchar(20),
	"body_region" varchar(30),
	"body_subregion" varchar(50),
	"red_flags" jsonb,
	"onset" varchar(20),
	"duration" varchar(20),
	"pain_quality" varchar(20),
	"severity" integer,
	"worst_when" varchar(20),
	"worse_triggers" jsonb,
	"better_triggers" jsonb,
	"functional_impact" varchar(20),
	"progression" varchar(20),
	"free_text" text,
	"awareness_level" varchar(10),
	"computed_score" integer,
	"matched_patterns" jsonb,
	"modifiers_applied" jsonb,
	"reassess_email" varchar(255),
	"reassess_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp with time zone,
	CONSTRAINT "email_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"rating" integer,
	"message" text,
	"email" varchar(255),
	"reviewed" boolean DEFAULT false NOT NULL
);
