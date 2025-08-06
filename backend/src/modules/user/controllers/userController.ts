import { Context } from 'hono';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from '../services/userService';

export async function createUserHandler(c: Context) {
  const data = await c.req.json();
  const result = await createUser(data);
  return c.json(result, result.success ? 201 : 400);
}

export async function getUsersHandler(c: Context) {
  const result = await getUsers();
  return c.json(result, result.success ? 200 : 500);
}

export async function getUserByIdHandler(c: Context) {
  const id = Number(c.req.param('id'));
  const result = await getUserById(id);
  return c.json(result, result.success ? 200 : 404);
}

export async function updateUserHandler(c: Context) {
  const id = Number(c.req.param('id'));
  const data = await c.req.json();
  const result = await updateUserById(id, data);
  return c.json(result, result.success ? 200 : 400);
}

export async function deleteUserHandler(c: Context) {
  const id = Number(c.req.param('id'));
  const result = await deleteUserById(id);

  return c.json(result, result.success ? 200 : 400);
}
