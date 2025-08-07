import { z } from 'zod';

export const AuthSchema = z.object({
  id: z.number(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  password: z.string().nullable(),
});

export type Auth = z.infer<typeof AuthSchema>;

export type NewAuth = Omit<Auth, 'id'>;

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };
