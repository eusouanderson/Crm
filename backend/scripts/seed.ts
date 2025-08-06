import { users } from '@/database/schema/users';
import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';

async function main() {
  const db = drizzle(process.env.DATABASE_URL);

  await seed(db, { users });

  await db.execute(
    `SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;`
  );

  console.log('Seed completo e sequência sincronizada.');
}

main().catch(console.error);
