import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  query: {
    account: {
      async findMany({ args, query }) {
        const result = await query(args);
        for (const account of result) {
          delete account.password;
        }
        return result;
      }
    }
  }
});

export default prisma;
