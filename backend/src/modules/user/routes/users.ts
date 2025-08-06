import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from '@/modules/user/controllers/userController';
import { Hono } from 'hono';

const userRoutes = new Hono();

userRoutes.get('/', getUsersHandler);
userRoutes.post('/', createUserHandler);
userRoutes.get('/:id', getUserByIdHandler);
userRoutes.put('/:id', updateUserHandler);
userRoutes.delete('/:id', deleteUserHandler);

export default userRoutes;
