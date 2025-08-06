import { users } from '@/database/schema/users';
import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';

async function main() {
  const db = drizzle(process.env.DATABASE_URL);
  await seed(db, { users });
}

main();
