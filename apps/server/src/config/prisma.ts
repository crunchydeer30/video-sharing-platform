import { PrismaClient } from '@prisma/client';
import config from '.';

const prisma = new PrismaClient().$extends({
  query: {
    account: {
      async findMany({ args, query }) {
        const results = await query(args);
        for (const account of results) {
          delete account.password;
          account.image = config.AWS_S3_BUCKET + account.image;
        }
        return results;
      },
      async findUnique({ args, query }) {
        const result = await query(args);
        if (result) {
          delete result.password;
          result.image = config.AWS_S3_BUCKET + result.image;
        }
        return result;
      }
    }
  }
});

export const prismaDefault = new PrismaClient();

export default prisma;
