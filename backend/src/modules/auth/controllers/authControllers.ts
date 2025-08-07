import { loginUser, recoverPassword, registerUser } from '@/modules/auth/service/authService';
import { Context } from 'hono';

export async function registerHandler(c: Context) {
  const data = await c.req.json();
  const result = await registerUser(data);
  return c.json(result, result.success ? 201 : 400);
}

export async function loginHandler(c: Context) {
  const data = await c.req.json();
  const result = await loginUser(data);
  return c.json(result, result.success ? 200 : 401);
}

export async function recoverPasswordHandler(c: Context) {
  const data = await c.req.json();
  const result = await recoverPassword(data);
  return c.json(result, result.success ? 200 : 400);
}
