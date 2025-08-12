import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must have at least 2 characters' })
    .max(50, { message: 'Name cannot have more than 50 characters' }),

  color: z
    .string()
    .min(2, { message: 'Color must have at least 2 characters' })
    .max(50, { message: 'Color cannot have more than 50 characters' })
    .nullable()
    .optional()
    .default(null),

  type: z.enum(['income', 'expense'] as const),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must have at least 2 characters' })
    .max(50, { message: 'Name cannot have more than 50 characters' })
    .optional(),

  color: z
    .string()
    .min(2, { message: 'Color must have at least 2 characters' })
    .max(50, { message: 'Color cannot have more than 50 characters' })
    .nullable()
    .optional()
    .default(null),

  type: z.enum(['income', 'expense'] as const).optional(),
});

// Para validar o parâmetro id na rota (ex: /categories/:id)
export const idParamSchema = z.object({
  id: z.number().int().positive(),
});

// Alias para facilitar importação e uso genérico
export const categoriesSchema = createCategorySchema;
export const registerSchema = createCategorySchema;
