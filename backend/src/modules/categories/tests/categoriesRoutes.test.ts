import app from '@/index';
import { describe, expect, it } from 'bun:test';

describe('📂 Categories routes', () => {
  let createdCategoryId: number;

  it('GET /categories/list should respond correctly with expected structure', async () => {
    const res = await app.request('http://localhost:3000/categories/list');
    const json = (await res.json()) as {
      success: boolean;
      data: Array<{
        id: number;
        type: 'income' | 'expense';
        name: string;
        color: string;
      }>;
    };

    expect(res.status).toBe(200);
    expect(json).toHaveProperty('success', true);
    expect(Array.isArray(json.data)).toBe(true);

    for (const category of json.data) {
      expect(category).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          type: expect.any(String),
          name: expect.any(String),
          color: expect.any(String),
        })
      );
    }
  });

  it('POST /categories/create should create a new category', async () => {
    const newCategory = {
      type: 'income',
      name: 'Teste',
      color: '#654564',
    };

    const res = await app.request('http://localhost:3000/categories/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { id: number; type: string; name: string; color: string };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        type: newCategory.type,
        name: newCategory.name,
        color: newCategory.color,
      })
    );

    createdCategoryId = json.data.id;
  });

  it('GET /categories/find/:id should return the correct category', async () => {
    const res = await app.request(`http://localhost:3000/categories/find/${createdCategoryId}`);
    const json = (await res.json()) as {
      success: boolean;
      data: { id: number; type: string; name: string; color: string };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: createdCategoryId,
        type: 'income',
        name: 'Teste',
        color: '#654564',
      })
    );
  });

  it('PUT /categories/update/:id should update the category', async () => {
    const updatedCategory = {
      type: 'expense',
      name: 'Atualizado',
      color: '#123456',
    };

    const res = await app.request(`http://localhost:3000/categories/update/${createdCategoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { id: number; type: string; name: string; color: string };
    };

    expect(json).toHaveProperty('success', true);
    expect(json.data).toEqual(
      expect.objectContaining({
        id: createdCategoryId,
        type: updatedCategory.type,
        name: updatedCategory.name,
        color: updatedCategory.color,
      })
    );
  });

  it('DELETE /categories/delete/:id should delete the category', async () => {
    const res = await app.request(`http://localhost:3000/categories/delete/${createdCategoryId}`, {
      method: 'DELETE',
    });

    const json = (await res.json()) as {
      success: boolean;
      data: { message: string; id: number };
    };

    expect(json).toEqual({
      success: true,
      data: { message: 'Category deleted', id: createdCategoryId },
    });

    // Verifica se foi realmente deletada
    const getRes = await app.request(`http://localhost:3000/categories/find/${createdCategoryId}`);
    const getJson = (await getRes.json()) as { success: boolean; error: string };

    expect(getJson).toHaveProperty('success', false);
    expect(getJson.error).toContain('Category not found');
  });

  it('GET /categories/find/:id with invalid ID should return error', async () => {
    const invalidId = 999999;
    const res = await app.request(`http://localhost:3000/categories/find/${invalidId}`);
    const json = (await res.json()) as { success: boolean; error: string };

    expect(json).toHaveProperty('success', false);
    expect(json.error).toContain('Category not found');
  });
});
