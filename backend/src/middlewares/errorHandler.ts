import type { Context } from 'hono';

export function errorHandler() {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (err: any) {
      console.log('Error ...', err);

      if (err.name == 'BadRequestError') {
        return c.json({ message: err.message }, 400);
      }
      return c.json(
        {
          message: 'Internal Error',
          error: process.env.NODE_ENV === 'production' ? undefined : err.message,
        },
        500
      );
    }
  };
}
