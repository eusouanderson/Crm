import { NewUser, User } from '@/modules/user/models/userModel';
import * as repo from '@/modules/user/repositories/userRepository';

import { ApiResponse, GetUsersParams } from '@/modules/user/models/userModel';

export async function createUser(user: NewUser): Promise<ApiResponse<User>> {
  try {
    const created = await repo.insertUser(user);
    if (!created) return { success: false, error: 'Falha ao criar usuário.' };
    return { success: true, data: created };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Erro interno ao criar usuário.' };
  }
}

export async function getUsers(params: GetUsersParams): Promise<ApiResponse<User[]>> {
  try {
    const users = await repo.selectUsers(params);
    return { success: true, data: users };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Erro ao buscar usuários.' };
  }
}

export async function getUserById(id: number): Promise<ApiResponse<User>> {
  try {
    const user = await repo.selectUserById(id);
    if (!user) return { success: false, error: 'Usuário não encontrado.' };
    return { success: true, data: user };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Erro ao buscar usuário.' };
  }
}

export async function updateUser(id: number, data: Partial<NewUser>): Promise<ApiResponse<User>> {
  try {
    const updated = await repo.updateUserById(id, data);
    if (!updated) return { success: false, error: 'Falha ao atualizar usuário.' };
    return { success: true, data: updated };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Erro interno ao atualizar usuário.' };
  }
}

export async function deleteUser(id: number): Promise<ApiResponse<null>> {
  try {
    if (await hasDependents(id)) {
      return {
        success: false,
        error: 'Usuário não pode ser deletado pois possui usuários dependentes.',
      };
    }

    const deleted = await repo.deleteUserById(id);
    if (!deleted) return { success: false, error: 'Falha ao deletar usuário.' };
    return { success: true, data: null };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: 'Erro interno ao deletar usuário.' };
  }
}

async function hasDependents(userId: number): Promise<boolean> {
  const dependents = await repo.findUsersByInvitee(userId);
  return dependents.length > 0;
}
