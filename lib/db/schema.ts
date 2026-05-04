import { pgTable, uuid, timestamp, integer, varchar, text, jsonb, boolean } from 'drizzle-orm/pg-core';

export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),

  age: integer('age'),
  sexAtBirth: varchar('sex_at_birth', { length: 20 }),
  heightCm: integer('height_cm'),
  weightKg: integer('weight_kg'),
  sport: varchar('sport', { length: 50 }),
  activityFrequency: varchar('activity_frequency', { length: 20 }),

  bodyRegion: varchar('body_region', { length: 30 }),
  bodySubregion: varchar('body_subregion', { length: 50 }),
  redFlags: jsonb('red_flags').$type<string[]>(),
  onset: varchar('onset', { length: 20 }),
  duration: varchar('duration', { length: 20 }),
  painQuality: varchar('pain_quality', { length: 20 }),
  severity: integer('severity'),
  worstWhen: varchar('worst_when', { length: 20 }),
  worseTriggers: jsonb('worse_triggers').$type<string[]>(),
  betterTriggers: jsonb('better_triggers').$type<string[]>(),
  functionalImpact: varchar('functional_impact', { length: 20 }),
  progression: varchar('progression', { length: 20 }),
  freeText: text('free_text'),

  awarenessLevel: varchar('awareness_level', { length: 10 }),
  computedScore: integer('computed_score'),
  matchedPatterns: jsonb('matched_patterns').$type<string[]>(),
  modifiersApplied: jsonb('modifiers_applied').$type<Array<{ id: string; factor: number; reason: string }>>(),

  reassessEmail: varchar('reassess_email', { length: 255 }),
  reassessAt: timestamp('reassess_at', { withTimezone: true }),
});

export const emailSubscribers = pgTable('email_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
});

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  rating: integer('rating'),
  message: text('message'),
  email: varchar('email', { length: 255 }),
  reviewed: boolean('reviewed').default(false).notNull(),
});

export type Assessment = typeof assessments.$inferSelect;
export type NewAssessment = typeof assessments.$inferInsert;
export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
