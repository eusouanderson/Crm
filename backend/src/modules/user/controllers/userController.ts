import { GetUsersParams, NewUser } from '@/modules/user/models/userModel';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '@/modules/user/services/userService';
import { Context } from 'hono';

// Criar usuário
export async function createUserHandler(c: Context) {
  const userData = await c.req.json<NewUser>();
  const result = await createUser(userData);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  return c.json(result.data, 201);
}

export async function getUsersHandler(c: Context) {
  const query = c.req.query();

  const params: GetUsersParams = {
    search: query.search,
    limit: query.limit ? Number(query.limit) : undefined,
    offset: query.offset ? Number(query.offset) : undefined,
  };

  const result = await getUsers(params);

  if (!result.success) {
    return c.json({ error: result.error }, 500);
  }

  return c.json(result.data);
}

// Buscar usuário por ID
export async function getUserByIdHandler(c: Context) {
  const id = Number(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({ error: 'ID inválido.' }, 400);
  }

  const result = await getUserById(id);

  if (!result.success) {
    return c.json({ error: result.error }, 404);
  }

  return c.json(result.data);
}

// Atualizar usuário
export async function updateUserHandler(c: Context) {
  const id = Number(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({ error: 'ID inválido.' }, 400);
  }

  const data = await c.req.json<Partial<NewUser>>();
  const result = await updateUser(id, data);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  return c.json(result.data);
}

// Deletar usuário
export async function deleteUserHandler(c: Context) {
  const id = Number(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({ error: 'ID inválido.' }, 400);
  }

  const result = await deleteUser(id);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  return c.json({ message: 'Usuário deletado com sucesso.' });
}
