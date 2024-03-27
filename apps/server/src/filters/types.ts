import { Prisma } from '@prisma/client';

export type PrismaFilter<T> = T extends Prisma.StringFilter | string
  ? (keyof Prisma.StringFilter)[]
  : T extends Prisma.BoolFilter | boolean
    ? (keyof Prisma.BoolFilter)[]
    : T extends Prisma.DateTimeFilter | Date
      ? (keyof Prisma.DateTimeFilter)[]
      : never;
