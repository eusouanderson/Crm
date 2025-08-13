import { Context } from 'hono';
import { z } from 'zod';

import {
  categoriesSchema,
  idParamSchema,
  updateCategorySchema,
} from '@/modules/categories/schemas/categoriesSchemas';

import {
  createCategory,
  deleteCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
} from '@/modules/categories/service/categoriesService';

async function handleRequest<T>(
  c: Context,
  schema: z.ZodSchema<T>,
  serviceFn: (data: T) => Promise<any>
) {
  try {
    let data;
    try {
      data = await c.req.json();
    } catch (e) {
      console.error('Erro ao processar JSON do corpo da requisição:', e);
      return c.json(
        {
          success: false,
          message: 'Corpo da requisição inválido ou malformado',
        },
        400
      );
    }

    const validatedData = schema.parse(data);
    const result = await serviceFn(validatedData);
    return c.json(result, result.success ? 200 : 400);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: 'Erro de validação',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        400
      );
    }

    console.error('Erro interno:', error);
    return c.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
      500
    );
  }
}

export const createCategoryHandler = (c: Context) =>
  handleRequest(c, categoriesSchema, createCategory);

export const updateCategoryHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const idValidated = idParamSchema.parse({ id: Number(id) });

    const data = await c.req.json();
    const validatedData = updateCategorySchema.parse(data);

    const result = await updateCategory(idValidated.id, validatedData);
    return c.json(result, result.success ? 200 : 400);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: 'Erro de validação',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        400
      );
    }
    console.error('Erro interno:', error);
    return c.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
      500
    );
  }
};

export const findCategoryByIdHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const idValidated = idParamSchema.parse({ id: Number(id) });

    const result = await findCategoryById(idValidated.id);
    if (!result.success) return c.json(result, 400);
    return c.json(result, 200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: 'Erro de validação',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        400
      );
    }
    console.error('Erro interno:', error);
    return c.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
      500
    );
  }
};

export const findAllCategoriesHandler = async (c: Context) => {
  try {
    const result = await findAllCategories();
    return c.json(result, result.success ? 200 : 400);
  } catch (error) {
    console.error('Erro interno:', error);
    return c.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
      500
    );
  }
};

export const deleteCategoryHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const idValidated = idParamSchema.parse({ id: Number(id) });

    const result = await deleteCategory(idValidated.id);

    if (result.success) {
      return c.json(
        {
          success: true,
          data: {
            message: 'Category deleted',
            id: idValidated.id,
          },
        },
        200
      );
    }

    return c.json(result, 400);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          message: 'Erro de validação',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        400
      );
    }
    console.error('Erro interno:', error);
    return c.json(
      {
        success: false,
        message: 'Erro interno do servidor',
      },
      500
    );
  }
};
