import * as bcryptService from '@/middlewares/passwordBycript';
import { describe, expect, it } from 'bun:test';

describe('🔐 Bcrypt Service', () => {
  const testPassword = 'MyS3cretPass!';

  it('should hash password with crypt()', async () => {
    const hash = await bcryptService.crypt({ password: testPassword });
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
    expect(hash).not.toBe(testPassword);
  });

  it('should verify correct password with verifyPassword()', async () => {
    const hash = await bcryptService.crypt({ password: testPassword });
    const isValid = await bcryptService.verifyPassword(testPassword, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password with verifyPassword()', async () => {
    const hash = await bcryptService.crypt({ password: testPassword });
    const isValid = await bcryptService.verifyPassword('wrongpass', hash);
    expect(isValid).toBe(false);
  });

  it('should verify password with decrypt()', async () => {
    const hash = await bcryptService.crypt({ password: testPassword });
    const isValid = await bcryptService.decrypt({ password: testPassword, hash });
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password with decrypt()', async () => {
    const hash = await bcryptService.crypt({ password: testPassword });
    const isValid = await bcryptService.decrypt({ password: 'wrongpass', hash });
    expect(isValid).toBe(false);
  });
});
