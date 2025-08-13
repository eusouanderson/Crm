import {
  ApiResponseSchema,
  NewUserSchema,
  UserSchema,
  UsersSchema,
} from '@/modules/user/@types/userTypes';
import { describe, expect, it } from 'bun:test';
import { z } from 'zod';

describe('👤 UserTypes Zod Schemas', () => {
  it('UserSchema should validate a correct user', () => {
    const validUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
    };

    expect(() => UserSchema.parse(validUser)).not.toThrow();
  });

  it('UserSchema should throw on invalid user', () => {
    const invalidUser = {
      id: 'a', // invalid type
      firstName: 'J',
      lastName: '',
      email: 'invalid-email',
      password: '',
    };

    expect(() => UserSchema.parse(invalidUser)).toThrow(z.ZodError);
  });

  it('UsersSchema should validate an array of users', () => {
    const users = [
      { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com', password: '123456' },
      { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@test.com', password: 'abcdef' },
    ];
    expect(() => UsersSchema.parse(users)).not.toThrow();
  });

  it('NewUserSchema should validate correct new user', () => {
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'password',
    };
    expect(() => NewUserSchema.parse(newUser)).not.toThrow();
  });

  it('NewUserSchema should throw on invalid new user', () => {
    const invalidNewUser = {
      firstName: 'J',
      lastName: 'D',
      email: 'not-an-email',
      password: '123',
    };
    expect(() => NewUserSchema.parse(invalidNewUser)).toThrow(z.ZodError);
  });

  it('ApiResponseSchema should validate success response', () => {
    const schema = ApiResponseSchema(UserSchema);
    const validResponse = {
      success: true,
      data: { id: 1, firstName: 'An', lastName: 'Br', email: 'a@b.com', password: '123456' },
    };
    expect(() => schema.parse(validResponse)).not.toThrow();
  });

  it('ApiResponseSchema should validate failure response', () => {
    const schema = ApiResponseSchema(UserSchema);
    const invalidResponse = {
      success: false,
      error: 'Some error',
      errors: [{ field: 'email', message: 'Invalid' }],
    };
    expect(() => schema.parse(invalidResponse)).not.toThrow();
  });

  it('ApiResponseSchema should throw on invalid response', () => {
    const schema = ApiResponseSchema(UserSchema);
    const wrongResponse = { success: true, data: null };
    expect(() => schema.parse(wrongResponse)).toThrow(z.ZodError);
  });
});
