import { db } from '@/database/db';
import { users } from '@/database/schema/users';
import { GetUsersParams, NewUser, User } from '@/modules/user/models/userModel';
import { eq, like, or } from 'drizzle-orm';

export async function insertUser(user: NewUser): Promise<User | undefined> {
  const [created] = await db.insert(users).values(user).returning();
  return created;
}

export async function selectUsers(params: GetUsersParams): Promise<User[]> {
  const { search, limit = 10, offset = 0 } = params;
  return await db
    .select()
    .from(users)
    .where(
      search
        ? or(
            like(users.firstName, `%${search}%`),
            like(users.lastName, `%${search}%`),
            like(users.email, `%${search}%`)
          )
        : undefined
    )
    .limit(limit)
    .offset(offset);
}

export async function selectUserById(id: number): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function updateUserById(
  id: number,
  data: Partial<NewUser>
): Promise<User | undefined> {
  const [updated] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return updated;
}

export async function deleteUserById(id: number): Promise<User | undefined> {
  const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
  return deleted;
}

export async function findUsersByInvitee(inviteeId: number) {
  return await db.select().from(users).where(eq(users.invitee, inviteeId));
}
