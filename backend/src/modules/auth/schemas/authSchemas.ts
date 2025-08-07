import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Nome não pode ter mais de 50 caracteres' }),
  lastName: z
    .string()
    .min(2, { message: 'Sobrenome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Sobrenome não pode ter mais de 50 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    .max(100, { message: 'Senha não pode ter mais de 100 caracteres' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

export const recoverySchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  newPassword: z
    .string()
    .min(6, { message: 'Nova senha deve ter pelo menos 6 caracteres' })
    .max(100, { message: 'Nova senha não pode ter mais de 100 caracteres' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecoveryInput = z.infer<typeof recoverySchema>;
