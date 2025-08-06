import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

export const categories = table('categories', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.text('name').notNull(),
  color: t.text('color'),
  type: t.text('type').$type<'income' | 'expense'>().notNull(),
  createdAt: t.timestamp('created_at', { withTimezone: true }).defaultNow(),
});
