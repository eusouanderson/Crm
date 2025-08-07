import { loginSchema, recoverySchema, registerSchema } from '@/modules/auth/schemas/authSchemas';
import { loginUser, recoverPassword, registerUser } from '@/modules/auth/service/authService';
import { Context } from 'hono';
import { z } from 'zod';

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

export const registerHandler = (c: Context) => handleRequest(c, registerSchema, registerUser);
export const loginHandler = (c: Context) => handleRequest(c, loginSchema, loginUser);
export const recoverPasswordHandler = (c: Context) =>
  handleRequest(c, recoverySchema, recoverPassword);
