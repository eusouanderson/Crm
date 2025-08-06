import { db } from '@/database/db';

async function testConnection() {
  try {
    const res = await db.execute(`SELECT 1`);
    if (res) {
      console.log('✅ DB conectado:');
    }
  } catch (error) {
    console.error('❌ Erro na conexão com DB:', error);
  }
}
testConnection();
