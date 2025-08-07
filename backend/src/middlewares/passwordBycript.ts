import bcrypt from 'bcryptjs';

const saltRounds = 12;

export async function crypt({ password }: { password: string }): Promise<string> {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

export async function decrypt({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
