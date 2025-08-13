import { crypt } from '@/middlewares/passwordBycript';
import {
  ApiResponse,
  NewUser,
  NewUserSchema,
  UserSchema,
  UsersSchema,
} from '@/modules/user/@types/userTypes';
import * as repo from '@/modules/user/repositories/userRepository';
import z from 'zod';

export async function createUser(data: unknown): Promise<ApiResponse<typeof UserSchema>> {
  try {
    const validatedData = NewUserSchema.parse(data);

    const hashedPassword = await crypt({ password: validatedData.password });
    const userWithHashedPassword = {
      ...validatedData,
      password: hashedPassword,
    };

    const created = await repo.insertUser(userWithHashedPassword);
    if (!created) {
      return { success: false, error: 'Error creating user' };
    }

    return { success: true, data: created };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        errors: e.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }

    return { success: false, error: (e as Error).message };
  }
}

// Corrigido para retornar ApiResponse de array de usuários
export async function getUsers(): Promise<ApiResponse<typeof UsersSchema>> {
  try {
    const list = await repo.selectUsers();
    return { success: true, data: list };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function getUserById(id: number): Promise<ApiResponse<typeof UserSchema>> {
  try {
    const user = await repo.selectUserById(id);
    if (!user) throw new Error('User not Found');
    return { success: true, data: user };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateUserById(
  id: number,
  data: Partial<NewUser>
): Promise<ApiResponse<typeof UserSchema>> {
  try {
    const updated = await repo.updateUser(id, data);
    if (!updated) throw new Error('Error Update');
    return { success: true, data: updated };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

const DeleteResponseSchema = z.object({
  message: z.string(),
  id: z.number(),
});

export async function deleteUserById(
  id: number
): Promise<ApiResponse<typeof DeleteResponseSchema>> {
  try {
    const deleted = await repo.deleteUser(id);

    if (!deleted) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: { message: 'User deleted', id } };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
