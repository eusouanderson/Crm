import { z } from 'zod';

// Schemas
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const NewUserSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must have at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must have at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters' }),
});

// ApiResponse
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([
    z.object({
      success: z.literal(true),
      data: dataSchema,
    }),
    z.object({
      success: z.literal(false),
      error: z.string(),
      errors: z
        .array(
          z.object({
            field: z.string(),
            message: z.string(),
          })
        )
        .optional(),
    }),
  ]);

export type ApiResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;
export type User = z.infer<typeof UserSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
