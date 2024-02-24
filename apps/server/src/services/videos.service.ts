import prisma from '../config/prisma';
import { v4 as uuid } from 'uuid';
import createHttpError from 'http-errors';

const create = async (file: Express.Multer.File, accountId: string) => {
  const id = uuid();

  const channel = await prisma.channel.findUnique({
    where: {
      accountId
    }
  });

  if (!channel) throw createHttpError(404, 'Channel not found');

  const video = await prisma.video.create({
    data: {
      id,
      title: file.originalname,
      url: file.path,
      channelId: channel.id
    }
  });

  await prisma.processingDetails.create({
    data: {
      videoId: video.id
    }
  });
};

export default {
  create
};
