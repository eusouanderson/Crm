import { crypt, decrypt } from '@/middlewares/passwordBycript';
import {
  ApiResponse,
  Auth,
  AuthResponse,
  AuthResponseSchema,
  NewAuth,
} from '@/modules/auth/@types/authTypes';
import * as authRepo from '@/modules/auth/repositories/authRepository';
import * as userRepo from '@/modules/user/repositories/userRepository';

type LoginPayload = { email: string; password: string };
type RecoverPayload = { email: string; newPassword: string };

function toAuthResponse(auth: Auth): AuthResponse {
  return AuthResponseSchema.parse(auth);
}

export async function registerUser(data: NewAuth): Promise<ApiResponse<AuthResponse>> {
  try {
    if (!data.password) throw new Error('Password is required');
    const existingUser = await authRepo.findUserByEmail(data.email);

    if (existingUser) throw new Error('Email is already registered');
    const hashed = await crypt({ password: data.password });

    const created = await userRepo.insertUser({ ...data, password: hashed });
    if (!created) throw new Error('Failed to create user');

    return { success: true, data: toAuthResponse(created) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function loginUser({
  email,
  password,
}: LoginPayload): Promise<ApiResponse<AuthResponse>> {
  try {
    const user = await authRepo.findUserByEmail(email);
    if (!user || !user.password) throw new Error('Invalid credentials');

    const passwordMatch = await decrypt({ password, hash: user.password });
    if (!passwordMatch) throw new Error('Invalid credentials');

    return { success: true, data: toAuthResponse(user) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function recoverPassword({
  email,
  newPassword,
}: RecoverPayload): Promise<ApiResponse<AuthResponse>> {
  try {
    const user = await authRepo.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const hashed = await crypt({ password: newPassword });
    const updated = await authRepo.updateUserPassword(email, hashed);
    if (!updated) throw new Error('Password update failed');

    return { success: true, data: toAuthResponse(updated) };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}
