import { Hono } from 'hono';
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from '../controllers/userController';

const userRoutes = new Hono();

userRoutes.get('/', getUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);
userRoutes.post('/', createUserHandler);
userRoutes.put('/:id', updateUserHandler);
userRoutes.delete('/:id', deleteUserHandler);

export default userRoutes;
