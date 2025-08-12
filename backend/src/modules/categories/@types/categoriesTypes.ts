import { z } from 'zod';

export const CategoriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable(),
  type: z.enum(['income', 'expense']),
  createdAt: z.date(),
});

export const CategoriesResponseSchema = CategoriesSchema.omit({ createdAt: true });

export type Categories = z.infer<typeof CategoriesSchema>;
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;
export type NewCategories = Omit<Categories, 'id' | 'createdAt'>;

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };
