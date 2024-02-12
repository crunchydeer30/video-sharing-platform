import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: AnyZodObject) =>
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

export default validate;
