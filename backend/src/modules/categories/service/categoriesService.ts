import {
  ApiResponse,
  Categories,
  CategoriesResponse,
  CategoriesResponseSchema,
  NewCategories,
} from '@/modules/categories/@types/categoriesTypes';

import * as categoriesRepo from '@/modules/categories/repositories/categoriesRepository';

function toCategoriesResponse(data: Categories): CategoriesResponse {
  return CategoriesResponseSchema.parse(data);
}

export async function findAllCategories(): Promise<ApiResponse<CategoriesResponse[]>> {
  try {
    const categories = await categoriesRepo.findAllCategories();
    const validated = categories.map(toCategoriesResponse);
    return { success: true, data: validated };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function findCategoryById(id: number): Promise<ApiResponse<CategoriesResponse>> {
  try {
    const category = await categoriesRepo.findCategoryById(id);
    if (!category) throw new Error('Category not found');
    return { success: true, data: toCategoriesResponse(category) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function createCategory(
  data: NewCategories
): Promise<ApiResponse<CategoriesResponse>> {
  try {
    const created = await categoriesRepo.insertCategory(data);
    if (!created) throw new Error('Failed to create category');
    return { success: true, data: toCategoriesResponse(created) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function updateCategory(
  id: number,
  data: Partial<NewCategories>
): Promise<ApiResponse<CategoriesResponse>> {
  try {
    const updated = await categoriesRepo.updateCategory(id, data);
    if (!updated) throw new Error('Failed to update category');
    return { success: true, data: toCategoriesResponse(updated) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  try {
    const deleted = await categoriesRepo.deleteCategory(id);
    if (!deleted) throw new Error('Failed to delete category');
    return { success: true, data: null };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
