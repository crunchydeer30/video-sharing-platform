import { Prisma } from '@prisma/client';
import { PrismaFilter } from './types';
import BaseFilter from './BaseFilter';

type AllowedFields = keyof Omit<Prisma.VideoWhereInput, 'OR' | 'AND' | 'WHERE'>;
type FilteringParams = {
  [key in AllowedFields]?: PrismaFilter<Prisma.VideoWhereInput[key]>;
};

class VideoFilter extends BaseFilter<FilteringParams> {
  protected filterParams: FilteringParams = {
    id: ['equals'],
    title: ['contains'],
    channelId: ['equals'],
    createdAt: ['contains']
  };

  // public buildFilters(query: { [key: string]: string }) {
  //   const filters: { [key: string]: string } = {};

  //   for (const [key, value] of Object.entries(query)) {
  //     if (key in this.filterParams) {
  //       const allowed_operators = this.filterParams[key as AllowedFields];
  //       const operator = Object.keys(value)[0];
  //       if (
  //         operator &&
  //         allowed_operators &&
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  //         allowed_operators.includes(operator as any)
  //       ) {
  //         filters[key as AllowedFields] = value;
  //       }
  //     }
  //   }

  //   return filters;
  // }
}

export default VideoFilter;
