import { Prisma } from '@prisma/client';
import { PrismaFilter } from './types';
import BaseFilter from './BaseFilter';

type AllowedFilters = keyof Omit<
  Prisma.ChannelWhereInput,
  'AND' | 'OR' | 'WHERE' | 'NOT'
>;

type AllowedIncludes = (keyof Prisma.ChannelInclude)[];

type FilteringParams = {
  [key in AllowedFilters]?: PrismaFilter<Prisma.ChannelWhereInput[key]>;
};

class ChannelsFilter extends BaseFilter<FilteringParams> {
  protected allowedFilters: FilteringParams = {
    accountId: ['equals'],
    handle: ['equals', 'contains']
  };

  protected allowedIncludes: AllowedIncludes = ['videos', 'subscribers'];
}

export default ChannelsFilter;
