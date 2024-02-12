import { Request, Response, NextFunction } from 'express';
import { validate as vldt, ValidationError } from 'class-validator';
import {
  plainToInstance,
  ClassConstructor,
  instanceToPlain
} from 'class-transformer';
import { ErrorSchema } from './errorHandler';

export interface RequestSchema {
  body?: ClassConstructor<unknown>;
  query?: ClassConstructor<unknown>;
  params?: ClassConstructor<unknown>;
}

export const validate =
  (schema: RequestSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        const transformedBody = plainToInstance(schema.body, req.body);
        const errors = await vldt(transformedBody as object, {
          stopAtFirstError: true
        });
        if (errors.length) return res.status(400).json(parseErrors(errors));
        req.body = instanceToPlain(transformedBody);
      }

      if (schema.params) {
        const transformedParams = plainToInstance(schema.params, req.params);
        const errors = await vldt(transformedParams as object);
        if (errors.length) return res.status(400).json(parseErrors(errors));
        req.params = instanceToPlain(transformedParams);
      }

      if (schema.query) {
        const transformedQuery = plainToInstance(schema.query, req.query);
        const errors = await vldt(transformedQuery as object);
        if (errors.length) return res.status(400).json(parseErrors(errors));
        req.query = instanceToPlain(transformedQuery);
      }

      return next();
    } catch (e: unknown) {
      return res.status(500).json(e);
    }
  };

const parseErrors = (errors: ValidationError[]): ErrorSchema => {
  const firstError = errors[0];
  const message = firstError.constraints
    ? Object.values(firstError.constraints)[0]
    : 'Validation failed';
  return {
    code: 400,
    message: message.charAt(0).toUpperCase() + message.slice(1)
  };
};
