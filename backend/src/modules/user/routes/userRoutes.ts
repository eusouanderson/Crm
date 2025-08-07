import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from '@/modules/user/controllers/userController';
import { Hono } from 'hono';

export const userRoutes = new Hono();

userRoutes.get('/', getUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);
userRoutes.post('/', createUserHandler);
userRoutes.put('/:id', updateUserHandler);
userRoutes.delete('/:id', deleteUserHandler);
