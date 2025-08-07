import { db } from '@/database/db';
import { users } from '@/database/schema/users';
import { NewUser, User } from '@/modules/user/@types/userTypes';
import { eq } from 'drizzle-orm';

export async function insertUser(data: NewUser): Promise<User | undefined> {
  const [created] = await db.insert(users).values(data).returning();
  return created;
}

export async function selectUsers(): Promise<User[]> {
  return await db.select().from(users);
}

export async function selectUserById(id: number): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function updateUser(id: number, data: Partial<NewUser>): Promise<User | undefined> {
  const [updated] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return updated;
}

export async function deleteUser(id: number): Promise<{ message: string; id: number } | null> {
  const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
  if (!deleted) return null;
  return { message: 'User deleted', id };
}
