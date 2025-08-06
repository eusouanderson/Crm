import app from '@/index';
import { describe, expect, it } from 'bun:test';

describe('Users routes', () => {
  let createdUserId: number;

  it('GET /users should respond correctly with expected structure', async () => {
    const res = await app.request('http://localhost/users');
    const json = (await res.json()) as {
      success: boolean;
      data: Array<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }>;
    };

    expect(json).toHaveProperty('success', true);
    expect(Array.isArray(json.data)).toBe(true);

    for (const user of json.data) {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        })
      );
    }
  });

  it('POST /users should create a new user', async () => {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
    };

    const res = await app.request('http://localhost/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: expect.any(String),
      })
    );

    createdUserId = json.data.id;
  });

  it('GET /users/:id should return the correct user', async () => {
    const res = await app.request(`http://localhost/users/${createdUserId}`);
    const json = (await res.json()) as {
      success: boolean;
      data: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: createdUserId,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: expect.any(String),
      })
    );
  });

  it('PUT /users/:id should update the user', async () => {
    const updatedUser = {
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated@example.com',
      password: 'newpassword123',
    };

    const res = await app.request(`http://localhost/users/${createdUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: createdUserId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        password: expect.any(String),
      })
    );
  });

  it('DELETE /users/:id should delete the user', async () => {
    const baseUrl = 'http://localhost:3000';

    const deleteRes = await app.request(`${baseUrl}/users/${createdUserId}`, {
      method: 'DELETE',
    });

    const deleteJson = (await deleteRes.json()) as {
      success: boolean;
      data: {
        message: string;
        id: number;
      };
    };

    expect(deleteJson).toEqual({
      success: true,
      data: { message: 'User deleted', id: createdUserId },
    });

    const getRes = await app.request(`${baseUrl}/users/${createdUserId}`);
    const getJson = (await getRes.json()) as {
      success: boolean;
      error?: string;
    };

    expect(getJson).toHaveProperty('success', false);
    expect(getJson.error).toContain('User not Found');
  });

  it('GET /users/:id with invalid ID should return error', async () => {
    const invalidId = 999999;
    const res = await app.request(`http://localhost/users/${invalidId}`);
    const json = (await res.json()) as {
      success: boolean;
      error: string;
    };

    expect(json).toHaveProperty('success', false);
    expect(json.error).toContain('User not Found');
  });
});
