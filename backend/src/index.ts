import { errorHandler } from '@/middlewares/errorHandler';
import { userRoutes } from '@/modules/user/routes/userRoutes';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RegExpRouter } from 'hono/router/reg-exp-router';
import { SmartRouter } from 'hono/router/smart-router';
import { TrieRouter } from 'hono/router/trie-router';
import { authRoutes } from './modules/auth/routes/authRoutes';

const app = new Hono({
  router: new SmartRouter({
    routers: [new RegExpRouter(), new TrieRouter()],
  }),
});

app.use('*', cors());
app.use('*', errorHandler());

app.route('/users', userRoutes);
app.route('/auth', authRoutes);

app.get('/', (c) => c.text('message: Api is running!'));

serve({
  fetch: app.fetch,
  port: 3005,
});
export default app;
