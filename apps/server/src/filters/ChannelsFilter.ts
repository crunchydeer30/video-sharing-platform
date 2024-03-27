import { Prisma } from '@prisma/client';
import { PrismaFilter } from './types';
import BaseFilter from './BaseFilter';

type AllowedFields = keyof Omit<
  Prisma.ChannelWhereInput,
  'AND' | 'OR' | 'WHERE' | 'NOT'
>;
type FilteringParams = {
  [key in AllowedFields]?: PrismaFilter<Prisma.ChannelWhereInput[key]>;
};

class ChannelsFilter extends BaseFilter<FilteringParams> {
  protected filterParams: FilteringParams = {
    accountId: ['equals'],
    handle: ['equals', 'contains']
  };
}

export default ChannelsFilter;
