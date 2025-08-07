import app from '@/index';
import { describe, expect, it } from 'bun:test';

const baseURL = 'http://localhost:3000';

let createdUserEmail = `testuser${Date.now()}@example.com`;
let createdUserPassword = 'Test@1234';

describe('🔐 Auth routes', () => {
  it('POST /auth/register → should create user', async () => {
    const res = await app.request(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: createdUserEmail,
        password: createdUserPassword,
      }),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { email: string };
    };

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('success', true);
    expect(json.data.email).toBe(createdUserEmail);
  });

  it('POST /auth/login → should authenticate user', async () => {
    const res = await app.request(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: createdUserEmail,
        password: createdUserPassword,
      }),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { email: string };
    };

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('success', true);
    expect(json.data).toHaveProperty('email', createdUserEmail);
  });
  it('POST /auth/recovery → should recover password for user', async () => {
    const recoveryEmail = createdUserEmail;
    const newPassword = 'NovaSenha456';

    const res = await app.request(`${baseURL}/auth/recovery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: recoveryEmail,
        newPassword,
      }),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { email: string; password: string };
    };

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('success', true);
    expect(json.data).toHaveProperty('email', recoveryEmail);
  });
});
