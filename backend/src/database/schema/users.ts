import * as t from 'drizzle-orm/pg-core';
import { AnyPgColumn, pgTable as table } from 'drizzle-orm/pg-core';

export const users = table(
  'users',
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar('first_name', { length: 256 }),
    lastName: t.varchar('last_name', { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
  },
  (table) => [t.uniqueIndex('email_idx').on(table.email)]
);
