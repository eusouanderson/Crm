import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RegExpRouter } from 'hono/router/reg-exp-router';
import { SmartRouter } from 'hono/router/smart-router';
import { TrieRouter } from 'hono/router/trie-router';
import { errorHandler } from './src/middlewares/errorHandler';
import routes from './src/modules/user/routes';

async function testConnection() {
  try {
    //const res = await db.execute(`SELECT 1`);
    console.log('✅ DB conectado:');
  } catch (error) {
    console.error('❌ Erro na conexão com DB:', error);
  }
}

const app = new Hono({
  router: new SmartRouter({
    routers: [new RegExpRouter(), new TrieRouter()],
  }),
});

app.use('*', cors());
app.use('*', errorHandler());

app.route('/', routes);

app.get('/', (c) => c.text('message: Api is running!'));

testConnection();

serve(app);
