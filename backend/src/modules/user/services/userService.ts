import { crypt } from '@/middlewares/passwordBycript';
import { ApiResponse, NewUser, User } from '@/modules/user/@types/userTypes.';
import * as repo from '@/modules/user/repositories/userRepository';

export async function createUser(data: NewUser): Promise<ApiResponse<User>> {
  try {
    if (!data.password) {
      throw new Error('Password required');
    }
    const hashedPassword = await crypt({ password: data.password });
    const userWithHashedPassword = { ...data, password: hashedPassword };
    const created = await repo.insertUser(userWithHashedPassword);
    if (!created) throw new Error('Erro create user');

    return { success: true, data: created };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const list = await repo.selectUsers();
    return { success: true, data: list };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function getUserById(id: number): Promise<ApiResponse<User>> {
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
): Promise<ApiResponse<User>> {
  try {
    const updated = await repo.updateUser(id, data);
    if (!updated) throw new Error('Error Update');
    return { success: true, data: updated };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteUserById(
  id: number
): Promise<ApiResponse<{ message: string; id: number }>> {
  try {
    const deleted = await repo.deleteUser(id);
    console.log(deleted);
    if (!deleted) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: { message: 'User deleted', id } };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
