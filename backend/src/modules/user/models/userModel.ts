import { users } from '@/database/schema/users';

export type User = typeof users.$inferSelect;
export type NewUser = Omit<User, 'id'>;

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

export type GetUsersParams = {
  search?: string;
  limit?: number;
  offset?: number;
};
