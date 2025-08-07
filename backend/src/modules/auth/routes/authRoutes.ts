import {
  loginHandler,
  recoverPasswordHandler,
  registerHandler,
} from '@/modules/auth/controllers/authControllers';
import { Hono } from 'hono';

export const authRoutes = new Hono();

authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.post('/recovery', recoverPasswordHandler);
