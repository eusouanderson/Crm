import { errorHandler } from '@/middlewares/errorHandler';
import { userRoutes } from '@/modules/user/routes/userRoutes';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
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

app.use('*', logger());

app.route('/users', userRoutes);
app.route('/auth', authRoutes);

app.get('/', (c) => c.text('message: Api is running!'));

export default app;
