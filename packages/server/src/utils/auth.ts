import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '@/config';

export function jwtSign(id: string, expiresIn: string = '7d') {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn });
}

export async function hashPassword(password: string) {
  const encryptedPassword = await bcrypt.hash(password, 15);
  return encryptedPassword;
}
