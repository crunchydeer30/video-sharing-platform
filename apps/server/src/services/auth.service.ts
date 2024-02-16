import { prismaDefault } from '../config/prisma';
import { LoginBody } from '@shared/schemas';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const login = async (data: LoginBody) => {
  const account = await prismaDefault.account.findUnique({
    where: {
      email: data.email
    }
  });

  if (!account) throw createHttpError(401, 'Account with this email not found');

  const passwordMatch = await comparePasswords(data.password, account.password);

  if (!passwordMatch) throw createHttpError(401, 'Invalid password');

  return account;
};

export const comparePasswords = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export default { login };
