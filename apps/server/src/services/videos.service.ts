import prisma from '../config/prisma';
import { v4 as uuid } from 'uuid';
import createHttpError from 'http-errors';
import { TranscodingStatus } from '@prisma/client';
import VideoFilter from '../filters/VideoFilter';

const list = async (query: object) => {
  console.log(query);
  const filter = new VideoFilter();
  const filterQuery = filter.buildFilters(query);
  const includeQuery = filter.buildIncludes(query);

  const videos = await prisma.video.findMany({
    where: filterQuery,
    include: includeQuery,
    orderBy: {
      createdAt: 'desc'
    }
  });
  return videos;
};

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
      url: `/${id}/master.m3u8`,
      channelId: channel.id
    }
  });

  await prisma.processingDetails.create({
    data: {
      videoId: video.id
    }
  });

  return video;
};

export const updateTranscodingStatus = async (
  videoId: string,
  resolution: number,
  status: TranscodingStatus
) => {
  await prisma.processingDetails.update({
    where: {
      videoId
    },
    data: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [`status_${resolution}p`]: status
    }
  });
};

export const updateThumbnail = async (videoId: string, thumbnail: string) => {
  await prisma.video.update({
    where: {
      id: videoId
    },
    data: {
      thumbnail
    }
  });
};

export const updatePreview = async (videoId: string, preview: string) => {
  await prisma.video.update({
    where: {
      id: videoId
    },
    data: {
      preview
    }
  });
};

export default {
  list,
  create,
  updateTranscodingStatus
};
