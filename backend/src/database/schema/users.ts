import * as t from 'drizzle-orm/pg-core';
import { pgTable as table } from 'drizzle-orm/pg-core';

export const users = table('users', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: t.varchar('first_name', { length: 256 }),
  lastName: t.varchar('last_name', { length: 256 }),
  email: t.varchar().notNull().unique(),
  password: t.varchar(),
});
