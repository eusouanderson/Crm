import * as t from 'drizzle-orm/pg-core';

export const monthlySummary = t.pgTable('monthly_summary', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  year: t.numeric('year').notNull(),
  month: t.numeric('month').notNull(),
  totalIncome: t.numeric('total_income', { precision: 10, scale: 2 }).notNull(),
  totalExpense: t.numeric('total_expense', { precision: 10, scale: 2 }).notNull(),
  balance: t.numeric('balance', { precision: 10, scale: 2 }).notNull(),
  generatedAt: t.timestamp('generated_at').defaultNow(),
});
