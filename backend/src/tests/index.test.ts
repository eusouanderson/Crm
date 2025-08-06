import app from '@/index';
import { describe, expect, it } from 'bun:test';

describe('API root endpoint', () => {
  it('GET / should return API running message', async () => {
    const res = await app.request('http://localhost/');
    const text = await res.text();

    expect(res.status).toBe(200);
    expect(text).toBe('message: Api is running!');
  });
});
