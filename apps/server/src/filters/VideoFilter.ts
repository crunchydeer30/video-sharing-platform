import { Prisma } from '@prisma/client';
import { PrismaFilter } from './types';
import BaseFilter from './BaseFilter';

type AllowedFields = keyof Omit<Prisma.VideoWhereInput, 'OR' | 'AND' | 'WHERE'>;
type FilteringParams = {
  [key in AllowedFields]?: PrismaFilter<Prisma.VideoWhereInput[key]>;
};
type AllowedIncludeParams = (keyof Prisma.VideoInclude)[];

class VideoFilter extends BaseFilter<FilteringParams> {
  protected allowedFilters: FilteringParams = {
    id: ['equals'],
    title: ['contains'],
    channelId: ['equals']
  };

  protected allowedIncludes: AllowedIncludeParams = [
    'channel',
    'ProcessingDetails',
    'comments'
  ];
}

export default VideoFilter;
