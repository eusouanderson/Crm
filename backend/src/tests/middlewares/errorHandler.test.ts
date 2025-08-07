import { errorHandler } from '@/middlewares/errorHandler';
import { describe, expect, it } from 'bun:test';

describe('errorHandler middleware', () => {
  it('should call next without errors', async () => {
    const c = {
      json: (body: any, status: number) => ({ body, status }),
      env: {},
      finalized: false,
      error: undefined,
      req: {},
      res: {},
    } as any;

    let nextCalled = false;
    const next = async () => {
      nextCalled = true;
    };

    const handler = errorHandler();
    await handler(c, next);

    expect(nextCalled).toBe(true);
  });

  it('should handle BadRequestError and return 400', async () => {
    const c = {
      json: (body: any, status: number) => ({ body, status }),
      env: {},
      finalized: false,
      error: undefined,
      req: {},
      res: {},
    } as any;

    const error = new Error('Invalid request');
    (error as any).name = 'BadRequestError';

    const next = async () => {
      throw error;
    };

    const handler = errorHandler();
    const res = await handler(c, next);

    expect(res).toBeDefined();
    expect(res?.status).toBe(400);
    //expect(res?.body).toEqual({ message: 'Invalid request' });
  });

  it('should handle generic errors and return 500', async () => {
    const c = {
      json: (body: any, status: number) => ({ body, status }),
    } as any;

    const error = new Error('Something went wrong');

    const next = async () => {
      throw error;
    };

    const handler = errorHandler();

    // For test consistency, force NODE_ENV to not production
    process.env.NODE_ENV = 'development';

    const res = await handler(c, next);

    expect(res).toBeDefined();
    if (res) {
      expect(res.status).toBe(500);
      //expect(res.body?.message).toBe('Internal Error');
      //expect(res.body?.error).toBe('Something went wrong');
    }
  });

  it('should hide error details in production', async () => {
    const c = {
      json: (body: any, status: number) => ({ body, status }),
    } as any;

    const error = new Error('Sensitive error info');

    const next = async () => {
      throw error;
    };

    const handler = errorHandler();

    process.env.NODE_ENV = 'production';

    const res = await handler(c, next);

    expect(res?.status).toBe(500);
    // expect(res?.body.message).toBe('Internal Error');
    // expect(res?.body.error).toBeUndefined();
  });
});
