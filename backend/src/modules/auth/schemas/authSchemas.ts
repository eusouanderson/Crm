import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must have at least 2 characters' })
    .max(50, { message: 'First name cannot have more than 50 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must have at least 2 characters' })
    .max(50, { message: 'Last name cannot have more than 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must have at least 6 characters' })
    .max(100, { message: 'Password cannot have more than 100 characters' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const recoverySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  newPassword: z
    .string()
    .min(6, { message: 'New password must have at least 6 characters' })
    .max(100, { message: 'New password cannot have more than 100 characters' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecoveryInput = z.infer<typeof recoverySchema>;
