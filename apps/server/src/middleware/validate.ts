import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body as object,
        query: req.query as object,
        params: req.params as object
      });
      return next();
    } catch (e: unknown) {
      return res.status(400).json(e);
    }
  };
