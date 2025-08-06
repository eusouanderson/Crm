import { categories } from '@/database/schema/categories';
import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

export const transactions = table('transactions', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  title: t.varchar('title', { length: 255 }).notNull(),
  amount: t.numeric('amount', { precision: 10, scale: 2 }).notNull(),
  type: t.text('type').$type<'income' | 'expense'>().notNull(),
  categoryId: t.uuid('category_id').references(() => categories.id),
  date: t.timestamp('date', { withTimezone: true }).defaultNow(),
  isRecurring: t.boolean('is_recurring').default(false),
  description: t.text('description'),
  createdAt: t.timestamp('created_at', { withTimezone: true }).defaultNow(),
});
