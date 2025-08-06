import authRoutes from '@/modules/user/routes/auth';
import { Hono } from 'hono';

const routes = new Hono();

routes.route('/auth', authRoutes);

export default routes;
