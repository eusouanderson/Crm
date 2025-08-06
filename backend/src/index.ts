import { errorHandler } from '@/middlewares/errorHandler';
import UserRoutes from '@/modules/user/routes/users';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RegExpRouter } from 'hono/router/reg-exp-router';
import { SmartRouter } from 'hono/router/smart-router';
import { TrieRouter } from 'hono/router/trie-router';

const app = new Hono({
  router: new SmartRouter({
    routers: [new RegExpRouter(), new TrieRouter()],
  }),
});

app.use('*', cors());
app.use('*', errorHandler());

app.route('/users', UserRoutes);

app.get('/', (c) => c.text('message: Api is running!'));

serve({
  fetch: app.fetch,
  port: 3005,
});
export default app;
