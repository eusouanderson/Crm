import { Hono } from 'hono';

const authRouter = new Hono();
authRouter.get('/', (c) => c.text('Auth API is running in authRouter!'));

authRouter.post('/login', (c) => {
  return c.json({ message: 'Login endpoint' });
});

authRouter.post('/register', (c) => {
  return c.json({ message: 'Register endpoint' });
});

export default authRouter;
