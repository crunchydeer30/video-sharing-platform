import prisma from '../config/prisma';
import { AccountCreateBody } from '@shared/schemas';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { NonSensitiveAccount } from '@shared/schemas';

const getAll = async (): Promise<NonSensitiveAccount[]> => {
  const accounts = await prisma.account.findMany();
  return accounts;
};

const getById = async (id: string): Promise<NonSensitiveAccount> => {
  const account = await prisma.account.findUnique({
    where: {
      id
    }
  });
  if (!account) throw createHttpError(404, 'Account not found');

  return account;
};

const create = async (
  data: AccountCreateBody
): Promise<NonSensitiveAccount> => {
  const accountExits = await prisma.account.findUnique({
    where: {
      email: data.email
    }
  });

  if (accountExits)
    throw createHttpError(409, 'Account with email already exists');

  const account = await prisma.account.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password)
    }
  });

  return account;
};

export const remove = async (id: string): Promise<void> => {
  const account = await prisma.account.findUnique({
    where: {
      id
    }
  });

  if (!account) throw createHttpError(404, 'Account not found');

  await prisma.account.delete({
    where: {
      id
    }
  });
};

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

export default {
  create,
  getById,
  getAll,
  remove
};
