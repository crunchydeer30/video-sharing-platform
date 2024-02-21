import { Channel } from '@prisma/client';
import {
  ChannelCreateBody,
  ChannelUpdateBody,
  ChannelListQuery
} from '@shared/schemas';
import prisma from '../config/prisma';
import createHttpError from 'http-errors';
import ShortUniqueId from 'short-unique-id';

const listChannelsParams = (query: ChannelListQuery) => {
  const { forAccount, forHandle, forTitle } = query;

  const filters = [];

  if (forAccount) filters.push({ accountId: forAccount });
  if (forHandle) filters.push({ handle: forHandle });
  if (forTitle) filters.push({ title: forTitle });

  return filters;
};

export const list = async (query: ChannelListQuery): Promise<Channel[]> => {
  const filters = listChannelsParams(query);

  const channels = await prisma.channel.findMany({
    where: {
      AND: filters
    }
  });
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

export const getByAccountId = async (accountId: string): Promise<Channel> => {
  const channel = await prisma.channel.findUnique({
    where: {
      accountId
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

export const update = async (
  channelId: string,
  data: ChannelUpdateBody,
  accountId: string
): Promise<Channel> => {
  const channel = await getById(channelId);
  if (!channel) throw createHttpError(404, 'Channel not found');
  if (channel.accountId !== accountId)
    throw createHttpError(403, 'You are not the owner of this channel');

  const updatedChannel = await prisma.channel.update({
    where: {
      id: channelId
    },
    data: {
      title: data.title || channel.title,
      handle: data.handle || channel.handle,
      description: data.description || channel.description
    }
  });

  return updatedChannel;
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
  list,
  getById,
  getByAccountId,
  create,
  remove,
  update
};
