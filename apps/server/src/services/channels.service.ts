import { Channel } from '@prisma/client';
import { ChannelCreateBody } from '@shared/schemas';
import prisma from '../config/prisma';
import createHttpError from 'http-errors';
import ShortUniqueId from 'short-unique-id';

export const getAll = async (): Promise<Channel[]> => {
  const channels = await prisma.channel.findMany();
  return channels;
};

export const getById = async (id: string): Promise<Channel> => {
  const channel = await prisma.channel.findUnique({
    where: {
      id
    }
  });
  if (!channel) throw createHttpError(404, 'Channel not found');
  return channel;
};

export const create = async (
  data: ChannelCreateBody,
  accountId: string
): Promise<Channel> => {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId
    }
  });

  if (!account) throw createHttpError(404, 'Account not found');

  const channelExists = await prisma.channel.findUnique({
    where: {
      accountId: accountId
    }
  });

  if (channelExists)
    throw createHttpError(409, 'Users are allowed to have only one channel');

  const channel = await prisma.channel.create({
    data: {
      title: data.title || account.email,
      handle: data.handle || '@user-' + new ShortUniqueId({ length: 10 }).rnd(),
      accountId: accountId,
      image: account.image
    }
  });
  return channel;
};

export const remove = async (
  channelId: string,
  userId: string
): Promise<void> => {
  const channel = await getById(channelId);

  if (!channel) throw createHttpError(404, 'Channel not found');

  if (channel.accountId !== userId)
    throw createHttpError(403, 'You are not the owner of this channel');

  await prisma.channel.delete({
    where: {
      id: channelId
    }
  });
};

export default {
  getAll,
  getById,
  create,
  remove
};
