import { db } from '@/database/db';
import { users } from '@/database/schema/users';
import { User } from '@/modules/user/@types/userTypes';
import { eq } from 'drizzle-orm';

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function updateUserPassword(
  email: string,
  hashedPassword: string
): Promise<User | undefined> {
  const [updated] = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email))
    .returning();

  return updated;
}
